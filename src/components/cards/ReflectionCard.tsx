import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { CardData } from '../../data/cards';
import { triggerHaptic } from '../../utils/haptics';

const ReflectionCard: React.FC<{ data: CardData }> = () => {
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    const handleNext = () => {
        window.scrollBy({ top: window.innerHeight * 0.5, behavior: 'smooth' });
    };

    const toggleItem = (idx: number) => {
        triggerHaptic('light');
        setCheckedItems(prev =>
            prev.includes(idx)
                ? prev.filter(i => i !== idx)
                : [...prev, idx]
        );
    };

    const bucketItems = [
        { icon: "🌍", text: "Visit a place you've\nalways wanted to see" },
        { icon: "📚", text: "Learn or read more\nconsistently" },
        { icon: "💪", text: "Take better care of your\nmind and body" },
        { icon: "❤️", text: "Spend quality time with\npeople who matter" }
    ];

    return (
        <div className="relative bg-gradient-to-br from-[#F5E6D3] to-[#E8D5C4] p-8 rounded-2xl shadow-xl border-2 border-[#C69C6D]/30">
            {/* Header */}
            <div className="text-center mb-6">
                <h3 className="text-2xl font-serif text-[#5D4037] mb-1">
                    Goals for 2026
                </h3>
                <p className="text-lg font-serif italic text-[#D32F2F]">
                    Bucket List
                </p>
            </div>

            {/* Checklist Items */}
            <div className="space-y-4 mb-6">
                {bucketItems.map((item, idx) => {
                    const isChecked = checkedItems.includes(idx);
                    return (
                        <div
                            key={idx}
                            className="flex items-start gap-3 cursor-pointer group"
                            onClick={() => toggleItem(idx)}
                        >
                            <div className={`w-5 h-5 mt-0.5 border-2 rounded flex-shrink-0 transition-colors flex items-center justify-center
                                ${isChecked ? 'bg-[#D32F2F] border-[#D32F2F]' : 'border-[#C69C6D] bg-white/50'}
                            `}>
                                {isChecked && <span className="text-white text-xs">✓</span>}
                            </div>
                            <div className={`flex items-start gap-2 flex-1 transition-opacity ${isChecked ? 'opacity-50' : 'opacity-100'}`}>
                                <span className="text-xl">{item.icon}</span>
                                <p className={`text-sm text-[#5D4037] leading-relaxed whitespace-pre-line transition-all
                                    ${isChecked ? 'line-through decoration-[#D32F2F]/50' : ''}
                                `}>
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Dotted separator */}
            <div className="border-t border-dashed border-[#C69C6D]/40 my-6" />

            {/* Footer prompt */}
            <div className="text-center space-y-4">
                <p className="text-sm text-gray-600 italic">
                    Ready to step into 2026?
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="px-8 py-3 bg-[#D32F2F] text-white rounded-full font-serif text-sm tracking-wider hover:bg-[#B71C1C] transition-colors shadow-md"
                >
                    LET'S GO! →
                </motion.button>
            </div>
        </div>
    );
};

export default ReflectionCard;
