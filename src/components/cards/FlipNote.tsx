import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { CardData } from '../../data/cards';

const FlipNote: React.FC<{ data: CardData }> = ({ data }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="w-full h-96 perspective-1000 cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
            <motion.div
                className="relative w-full h-full transition-all duration-700 transform-style-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-[#F5E6D3] to-[#E8D5C4] border-2 border-[#C69C6D]/30 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg transform transition-transform group-hover:scale-[1.01]">
                        <p className="text-xs text-gray-500 italic mb-3">simple, honest & heartfelt</p>
                        <h3 className="text-2xl font-serif text-[#5D4037] text-center mb-3">
                            {data.frontText}
                        </h3>
                        <p className="text-sm text-gray-600 uppercase tracking-widest opacity-60 mt-4">Tap to flip ↻</p>
                    </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <div className="w-full h-full bg-gradient-to-br from-[#F8BBD0] to-[#FCE4EC] rounded-2xl overflow-hidden shadow-xl relative border-2 border-pink-200/50">
                        {data.backImage && (
                            <img
                                src={data.backImage}
                                alt="Cute Surprise"
                                className="w-full h-full object-cover opacity-40"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-pink-700/40 to-transparent flex items-center justify-center p-8 text-center">
                            <p className="text-white font-serif text-lg md:text-xl font-medium drop-shadow-lg leading-relaxed whitespace-pre-line">
                                {data.backText}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
            <style>{`
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
        </div>
    );
};

export default FlipNote;
