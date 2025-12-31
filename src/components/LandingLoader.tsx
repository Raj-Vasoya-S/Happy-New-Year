import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { APP_CONFIG } from '../data/cards';

import { triggerHaptic } from '../utils/haptics';

interface LandingLoaderProps {
    onComplete: () => void;
}

const LandingLoader: React.FC<LandingLoaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [clicks, setClicks] = useState(0);
    const [showMeow, setShowMeow] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 800);
                    return 100;
                }
                return prev + 1;
            });
        }, 40);

        return () => clearInterval(timer);
    }, [onComplete]);

    const handleCatClick = () => {
        triggerHaptic('light');
        setClicks(prev => prev + 1);

        if (clicks + 1 === 3) {
            triggerHaptic('success');
            setShowMeow(true);
            setTimeout(() => setShowMeow(false), 2000);
            setClicks(0);
        }
    };

    return (
        <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-gradient-to-b from-[#E8D5C4] to-[#F5E6D3] flex flex-col items-center justify-center p-6 overflow-hidden select-none"
        >
            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center space-y-6 max-w-sm">
                {/* Cat Sticker with subtle animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative cursor-pointer"
                    onClick={handleCatClick}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="w-32 h-32 bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-md border border-gray-200/50">
                        <img
                            src={APP_CONFIG.landingGif}
                            alt="Getting ready"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    {/* Meow Bubble */}
                    {showMeow && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: -40 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-4 right-[-20px] bg-white px-3 py-1 rounded-full shadow-lg border border-gray-200"
                        >
                            <span className="text-sm font-bold text-[#D32F2F]">Meow! 🐾</span>
                        </motion.div>
                    )}
                </motion.div>

                {/* Ready for 2026 Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-center space-y-2"
                >
                    <h1 className="text-3xl font-serif text-[#8B4513] mb-1">
                        {APP_CONFIG.landingText}
                    </h1>
                    <p className="text-sm text-gray-600 italic font-light">
                        {APP_CONFIG.landingQuote}
                    </p>
                </motion.div>

                {/* Progress Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="w-full space-y-3 mt-4"
                >
                    <p className="text-xs text-center text-gray-500 italic">
                        {APP_CONFIG.landingProgress}
                    </p>
                    <div className="relative">
                        <div className="w-full h-2.5 bg-white/60 rounded-full overflow-hidden shadow-sm border border-gray-200/30">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                                className="h-full bg-gradient-to-r from-[#D4A574] via-[#C4956C] to-[#A67B5B] rounded-full"
                            />
                        </div>
                    </div>
                    <p className="text-xs text-center text-gray-600 uppercase tracking-wider">
                        PREPARING SOMETHING FOR 2026... {progress}%
                    </p>
                </motion.div>
            </div>

            {/* Subtle decorative corner elements */}
            <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[#D4A574]/30 rounded-tl-xl" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#D4A574]/30 rounded-br-xl" />
        </motion.div>
    );
};

export default LandingLoader;
