import React, { useState } from 'react';
import { Howl } from 'howler';
import { motion } from 'framer-motion';
import { MUSIC_TRACKS } from '../../data/cards';
import type { CardData } from '../../data/cards';
import { useMusicContext } from '../MusicToggle';
// Assuming lucide-react might not be installed, using SVGs directly to be safe and reduce dependency friction if I missed it.

const MusicCard: React.FC<{ data: CardData }> = () => {
    const [activeTrack, setActiveTrack] = useState<string | null>(null);
    const [playing, setPlaying] = useState(false);
    const soundRef = React.useRef<Howl | null>(null);
    const { isMuted } = useMusicContext();

    const handlePlay = (trackId: string, src: string) => {
        if (isMuted) return; // Don't play if muted

        if (activeTrack === trackId && playing) {
            soundRef.current?.pause();
            setPlaying(false);
        } else {
            if (soundRef.current) {
                soundRef.current.stop();
            }
            const sound = new Howl({
                src: [src],
                html5: true, // Force HTML5 Audio to stream large files
                onend: () => setPlaying(false),
            });
            soundRef.current = sound;
            sound.play();
            setActiveTrack(trackId);
            setPlaying(true);
        }
    };

    // Stop audio on unmount
    React.useEffect(() => {
        return () => {
            soundRef.current?.stop();
        };
    }, []);

    // Pause audio when muted
    React.useEffect(() => {
        if (isMuted && playing) {
            soundRef.current?.pause();
            setPlaying(false);
        }
    }, [isMuted, playing]);

    return (
        <div className="space-y-6 w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center space-y-1 mb-6">
                <p className="text-sm text-[#D32F2F] italic">Dedicated To You</p>
                <h3 className="text-2xl font-serif text-[#5D4037]">
                    Songs That Match<br />Your Vibes 🎵
                </h3>
            </div>

            {MUSIC_TRACKS.map((track) => (
                <motion.div
                    key={track.id}
                    whileHover={{ scale: 1.02 }}
                    className={`
                relative p-5 rounded-xl border-2 transition-all cursor-pointer
                ${activeTrack === track.id && playing
                            ? 'bg-gradient-to-br from-[#8B7355] to-[#6D5B4A] border-[#5D4037] text-white shadow-xl'
                            : 'bg-gradient-to-br from-[#E8D5C4] to-[#D4C4B0] border-[#C69C6D]/40 text-[#5D4037] hover:border-[#C69C6D] shadow-md'
                        }
            `}
                    onClick={() => handlePlay(track.id, track.src)}
                >
                    {/* Cassette Design */}
                    <div className="flex items-center gap-4">
                        {/* Left Reel */}
                        <div className={`
                    w-14 h-14 rounded-full border-4 ${activeTrack === track.id && playing ? 'border-white/80' : 'border-[#5D4037]/40'
                            } flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300
                    ${activeTrack === track.id && playing ? 'animate-spin-slow' : ''}
                `}>
                            <div className={`w-3 h-3 ${activeTrack === track.id && playing ? 'bg-white' : 'bg-[#5D4037]'} rounded-full`} />
                        </div>

                        {/* Track Info */}
                        <div className="flex-1">
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-xs font-mono opacity-70">Type I / CrO2</span>
                                <span className="text-xs opacity-50">SIDE A</span>
                            </div>
                            <h4 className="font-bold text-base tracking-wide">{track.title}</h4>
                            <p className="text-xs opacity-80 mt-0.5">
                                {activeTrack === track.id && playing ? 'Now Playing...' : 'Tap to Play'}
                            </p>
                        </div>

                        {/* Play/Pause Icon */}
                        <div className="text-3xl">
                            {activeTrack === track.id && playing ? '❚❚' : '▶'}
                        </div>
                    </div>

                    {/* Decorative cassette tape window */}
                    <div className="mt-3 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20 rounded" />
                </motion.div>
            ))}
            <style>{`
        .animate-spin-slow {
            animation: spin 3s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default MusicCard;
