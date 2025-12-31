import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicContextType {
    isMuted: boolean;
    toggleMute: () => void;
}

const MusicContext = createContext<MusicContextType>({
    isMuted: false,
    toggleMute: () => { },
});

export const useMusicContext = () => useContext(MusicContext);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => setIsMuted((prev) => !prev);

    return (
        <MusicContext.Provider value={{ isMuted, toggleMute }}>
            {children}
        </MusicContext.Provider>
    );
};

export const MusicToggleButton: React.FC = () => {
    const { isMuted, toggleMute } = useMusicContext();

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            onClick={toggleMute}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#E8D5C4] to-[#D4C4B0] border-2 border-[#C69C6D] rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
            title={isMuted ? 'Unmute Music' : 'Mute Music'}
        >
            <AnimatePresence mode="wait">
                {isMuted ? (
                    <motion.div
                        key="muted"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl"
                    >
                        🔇
                    </motion.div>
                ) : (
                    <motion.div
                        key="unmuted"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl"
                    >
                        🔊
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};
