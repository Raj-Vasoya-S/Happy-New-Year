import manifest from '../../public/assets/asset-manifest.json';

// Helper to resolve paths correctly in production (GitHub Pages)
const getAssetPath = (path: string) => {
    // If it's a full URL, return as is
    if (path.startsWith('http')) return path;

    // Determine base URL
    const baseUrl = import.meta.env.BASE_URL;

    // Clean paths to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

    return `${cleanBase}${cleanPath}`;
};

export interface CardData {
    id: string;
    type: 'greeting' | 'reflection' | 'music' | 'flip' | 'seal';
    content?: string;
    image?: string;
    audio?: string;
    frontText?: string;
    backText?: string;
    backImage?: string;
}

export const CARDS: CardData[] = [
    {
        id: 'greeting-1',
        type: 'greeting',
        content: "New year, new days… but the same feeling.\nIf I'm moving forward in life,\nI want it to be with you beside me. ✨",
        image: getAssetPath(manifest.greeting_cards[0])
    },
    {
        id: 'reflection-1',
        type: 'reflection',
        content: "Goals for 2026\nBucket List",
    },
    {
        id: 'music-mix',
        type: 'music',
        content: "Dedicated To You\nSongs That Match Your Vibes 🎵",
    },
    {
        id: 'flip-1',
        type: 'flip',
        frontText: "A Few Things I Want To Say To You ✨",
        backText: "You make moments feel lighter 💛",
        backImage: getAssetPath(manifest.flip_cards[0])
    },
    {
        id: 'flip-2',
        type: 'flip',
        frontText: "Simple, honest & heartfelt",
        backText: "January begins, and so does my promise—\nTo choose you in every season,\nIn every version of me,\nAgain and again. 🤍",
        backImage: getAssetPath(manifest.flip_cards[1])
    },
    {
        id: 'flip-3',
        type: 'flip',
        frontText: "One Last Note",
        backText: "2026 isn't just a new year for me,\nIt's a step closer to us,\nCloser to the love I already know,\nAnd the future I want—with you. 🌙💫",
        backImage: getAssetPath(manifest.flip_cards[2])
    },
    {
        id: 'final-seal',
        type: 'seal',
        content: "Seal our promise for 2026",
    }
];

export const MUSIC_TRACKS = [
    { id: 'track-1', title: 'Harleys In Hawaii', src: getAssetPath(manifest.audio.track1) },
    { id: 'track-2', title: 'Sahiba', src: getAssetPath(manifest.audio.track2) },
    { id: 'track-3', title: 'Radha Rani', src: getAssetPath(manifest.audio.track3) },
];

export const APP_CONFIG = {
    landingText: "Ready for 2026?",
    landingQuote: "A new chapter is waiting to be written...",
    landingProgress: "closing 2025 on a good note...",
    landingGif: getAssetPath(manifest.images['cat-mouth-open-close-gif']),
    finalMessage: "Happy New Year! May 2026 be kind, exciting, and full of promise. 💫"
};
