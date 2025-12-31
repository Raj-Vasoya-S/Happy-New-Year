import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { APP_CONFIG } from '../../data/cards';
import type { CardData } from '../../data/cards';
import manifest from '../../../public/assets/asset-manifest.json';
import confetti from 'canvas-confetti';

const FinalSeal: React.FC<{ data: CardData }> = () => {
    const [sealed, setSealed] = useState(false);
    const [showRestart, setShowRestart] = useState(false);

    const handleSeal = () => {
        console.log('Sealing letter...');
        setSealed(true);

        // Trigger confetti celebration!
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = window.setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);

        setTimeout(() => setShowRestart(true), APP_CONFIG.finalMessage.length * 60 + 1000);
    };

    const handleRestart = () => {
        window.location.reload();
    };

    return (
        <div className="text-center pb-20">
            {!sealed ? (
                <div className="space-y-6">
                    {/* Cat visual */}
                    <div className="flex justify-center mb-4">
                        <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-md border border-gray-200/50">
                            <img src={manifest.images['cat-mouth-open-close-gif']} className="w-full h-full object-contain" alt="icon" />
                        </div>
                    </div>

                    <p className="text-lg font-serif italic text-[#5D4037] mb-4">Hey dear,</p>
                    <h3 className="text-2xl font-serif text-[#5D4037] mb-4">One Last Note</h3>
                    <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed mb-6">
                        As the new year begins, I just wanted to share a few good thoughts with you.
                        <br /><br />
                        I hope the coming year brings you peace, growth, and many small wins.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSeal}
                        className="relative px-10 py-4 bg-[#5D4037] text-white font-serif text-lg tracking-wider rounded-full shadow-lg overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            SEAL IT 🔒
                        </span>
                        <div className="absolute inset-0 bg-[#8B4513] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </motion.button>
                </div>
            ) : (
                <div className="space-y-8 max-w-lg mx-auto bg-gradient-to-br from-[#2C2C2C] to-[#1A1A1A] p-10 rounded-2xl shadow-2xl">
                    <div className="flex items-center justify-center gap-2 text-[#8B7355] mb-4">
                        <span className="text-lg">Sealed</span>
                        <span className="text-xl">💌</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-2xl md:text-3xl font-serif text-gray-300 leading-relaxed min-h-[100px]"
                    >
                        <Typewriter text={APP_CONFIG.finalMessage} speed={50} />
                    </motion.div>

                    {showRestart && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={handleRestart}
                            className="text-sm text-gray-400 hover:text-[#D4A574] underline underline-offset-4 tracking-widest uppercase transition-colors"
                        >
                            RESTART THE JOURNEY
                        </motion.button>
                    )}
                </div>
            )}
        </div>
    );
};

const Typewriter: React.FC<{ text: string; speed?: number }> = ({ text, speed = 40 }) => {
    const [displayed, setDisplayed] = useState('');

    React.useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayed((prev) => prev + text.charAt(index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);

    return <span>{displayed}<span className="animate-blink">|</span></span>;
};

export default FinalSeal;
