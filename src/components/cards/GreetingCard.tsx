import React from 'react';
import type { CardData } from '../../data/cards';

const GreetingCard: React.FC<{ data: CardData }> = ({ data }) => {
    return (
        <div className="relative bg-gradient-to-br from-[#F5E6D3] to-[#E8D5C4] p-6 rounded-2xl shadow-xl border-2 border-[#C69C6D]/30">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C69C6D] to-transparent opacity-50" />

            {/* Header */}
            <div className="text-center mb-4 pb-3 border-b-2 border-dashed border-[#C69C6D]/30">
                <h2 className="text-3xl font-serif text-[#D32F2F] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                    HAPPY NEW YEAR TO YOU!
                </h2>
                <p className="text-xs text-gray-500 italic mt-1">
                    Thanks for being part of my 2025, now let's make 2026 even better!
                </p>
            </div>

            {/* Image Section */}
            <div className="relative mb-4 rounded-xl overflow-hidden border-4 border-white shadow-md">
                {data.image && (
                    <img
                        src={data.image}
                        alt="New Year Greeting"
                        className="w-full h-64 object-cover select-none"
                        loading="lazy"
                    />
                )}
            </div>

            {/* Content */}
            <div className="text-center space-y-3">
                <p className="font-serif text-base leading-relaxed text-[#5D4037] whitespace-pre-wrap">
                    {data.content}
                </p>

                {/* Footer decoration */}
                <div className="pt-3 border-t border-dashed border-[#C69C6D]/30">
                    <p className="text-xs text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
                        <span>—</span>
                        <span>MADE WITH CARE</span>
                        <span>✨</span>
                        <span>—</span>
                    </p>
                </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-2 right-2 text-2xl">🎄</div>
            <div className="absolute bottom-2 left-2 text-2xl">🍓</div>
        </div>
    );
};

export default GreetingCard;
