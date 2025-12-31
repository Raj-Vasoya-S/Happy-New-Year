import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CARDS } from '../data/cards';
import GreetingCard from './cards/GreetingCard';
import ReflectionCard from './cards/ReflectionCard';
import MusicCard from './cards/MusicCard';
import FlipNote from './cards/FlipNote';
import FinalSeal from './Ending/FinalSeal';
import ProgressIndicator from './ProgressIndicator';

import Tilt from 'react-parallax-tilt';

const CardStack: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
                        if (index !== -1) {
                            setCurrentCardIndex(index);
                        }
                    }
                });
            },
            { threshold: 0.5, rootMargin: '-100px 0px' }
        );

        cardRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <ProgressIndicator currentIndex={currentCardIndex} total={CARDS.length} />

            {/* Parallax Background Particles */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <motion.div
                    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-10 text-2xl opacity-20"
                >✨</motion.div>
                <motion.div
                    animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 right-10 text-xl opacity-20"
                >🍂</motion.div>
                <motion.div
                    animate={{ y: [0, -40, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 left-1/4 text-3xl opacity-10"
                >🌸</motion.div>
            </div>

            <div ref={containerRef} className="relative w-full max-w-md mx-auto py-20 px-4 space-y-32 md:space-y-48 pb-64 z-10">
                {CARDS.map((card, index) => (
                    <CardWrapper
                        key={card.id}
                        index={index}
                        ref={(el) => { cardRefs.current[index] = el; }}
                    >
                        {/* Only apply Tilt to non-interactive heavy cards for better UX */}
                        {['greeting', 'flip'].includes(card.type) ? (
                            <Tilt
                                tiltMaxAngleX={5}
                                tiltMaxAngleY={5}
                                scale={1.02}
                                transitionSpeed={1000}
                                className="transform-style-3d"
                            >
                                {card.type === 'greeting' && <GreetingCard data={card} />}
                                {card.type === 'flip' && <FlipNote data={card} />}
                            </Tilt>
                        ) : (
                            <>
                                {card.type === 'reflection' && <ReflectionCard data={card} />}
                                {card.type === 'music' && <MusicCard data={card} />}
                                {card.type === 'seal' && <FinalSeal data={card} />}
                            </>
                        )}
                    </CardWrapper>
                ))}

                {/* Spacer for final scroll */}
                <div className="h-32" />
            </div>
        </>
    );
};

// Wrapper handling the reveal animation
const CardWrapper = React.forwardRef<HTMLDivElement, { children: React.ReactNode; index: number }>(
    ({ children }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full"
            >
                {children}
            </motion.div>
        );
    }
);

export default CardStack;
