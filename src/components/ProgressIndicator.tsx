import React from 'react';
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
    currentIndex: number;
    total: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentIndex, total }) => {
    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
            {Array.from({ length: total }).map((_, idx) => (
                <motion.div
                    key={idx}
                    initial={{ scale: 0.8, opacity: 0.3 }}
                    animate={{
                        scale: currentIndex === idx ? 1.2 : 0.8,
                        opacity: currentIndex === idx ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-3 h-3 rounded-full border-2 cursor-pointer transition-colors ${currentIndex === idx
                            ? 'bg-[#D32F2F] border-[#D32F2F]'
                            : idx < currentIndex
                                ? 'bg-[#C69C6D] border-[#C69C6D]'
                                : 'bg-transparent border-[#C69C6D]/40'
                        }`}
                    title={`Card ${idx + 1} of ${total}`}
                />
            ))}
        </div>
    );
};

export default ProgressIndicator;
