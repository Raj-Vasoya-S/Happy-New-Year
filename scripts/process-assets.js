import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const PROJECT_ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.resolve(PROJECT_ROOT, '../asstes'); // Assuming 'asstes' is sibling to project root
const PUBLIC_ASSETS_DIR = path.resolve(PROJECT_ROOT, 'public/assets');

// Ensure public assets dir exists
if (!fs.existsSync(PUBLIC_ASSETS_DIR)) {
    fs.mkdirSync(PUBLIC_ASSETS_DIR, { recursive: true });
}

// Manifest object
const manifest = {
    videos: {},
    images: {},
    audio: {},
    greeting_cards: [],
    flip_cards: [],
    misc: {}
};

// Helper: Sanitize filename
function sanitize(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9.]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

// Helper: copy file
function copyAsset(sourcePath, category, logicalName) {
    if (!fs.existsSync(sourcePath)) {
        console.warn(`Missing: ${sourcePath}`);
        return null;
    }
    const ext = path.extname(sourcePath);
    const safeName = sanitize(logicalName) + ext;
    const destDir = path.join(PUBLIC_ASSETS_DIR, category);

    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    fs.copyFileSync(sourcePath, path.join(destDir, safeName));
    return `/assets/${category}/${safeName}`;
}

console.log('Processing Assets...');

// 1. Clips -> Videos
// asstes/Clip/V01.mp4 ...
const clips = ['V01.mp4', 'V02.mp4', 'V03.mp4', 'V04.mp4'];
clips.forEach((file, i) => {
    const p = path.join(SOURCE_DIR, 'Clip', file);
    const url = copyAsset(p, 'videos', `clip-${i + 1}`);
    if (url) manifest.videos[`clip${i + 1}`] = url;
});
// Loading clip
const loadingClipPath = path.join(SOURCE_DIR, 'Extra Clips & Images', 'loading bar clip.mp4');
const loadingUrl = copyAsset(loadingClipPath, 'videos', 'loading-bar');
if (loadingUrl) manifest.videos['loading'] = loadingUrl;


// 2. Songs -> Audio
// asstes/Songs/...
const songsDir = path.join(SOURCE_DIR, 'Songs');
if (fs.existsSync(songsDir)) {
    const songs = fs.readdirSync(songsDir).filter(f => f.endsWith('.mp3'));
    songs.forEach((song, i) => {
        const url = copyAsset(path.join(songsDir, song), 'audio', `song-${i + 1}`);
        if (url) manifest.audio[`track${i + 1}`] = url;
    });
}

// 3. Greeting Cards & Images
// asstes/Img
// "10 Great Love Quotes..." -> greeting-1
const imgDir = path.join(SOURCE_DIR, 'Img');
// Map specific known files if possible, or just bulk
// Let's identify the greeting card logic. 
// "Latter & Quick masage Images" seems to contain greeting card themes.
const letterDir = path.join(SOURCE_DIR, 'Latter & Quick masage Images');
if (fs.existsSync(letterDir)) {
    const files = fs.readdirSync(letterDir).filter(f => /\.(jpeg|jpg|png)$/i.test(f));
    files.forEach((f, i) => {
        const url = copyAsset(path.join(letterDir, f), 'images/cards', `theme-${i + 1}`);
        if (url) manifest.greeting_cards.push(url);
    });
}

// 4. Animal Images for Flip Cards
// asstes/Gif has gifs. asstes/Img has "Tsundere Cat", "oli", etc.
const animalImages = ['Tsundere Cat.jpeg', 'oli.jpeg', '^•^.jpeg', '🥺.jpeg']; // From file list
animalImages.forEach((f, i) => {
    const p = path.join(SOURCE_DIR, 'Gif', f); // Wait, check file list. They were in Img or Gif?
    // Step 19 showed "Tsundere Cat.jpeg" in "Gif"? No, Step 19 was list_dir of "asstes/Gif".
    // Wait, Step 18 was Gif list: Blush GIF, Cat Mouth open..., ILU V1, ILU V2, Kiss GIF.
    // Step 19 was Img list? Wait.
    // Let's re-verify Step ID 19 output.
});

// Re-verifying Step 19 output: list_dir "d:/Coding Projects/Happy New Year/asstes/Img"
// Content: "Let’s Go🐈.jpeg", "Tsundere Cat.jpeg", "^•^.jpeg", "oli.jpeg", "🥺.jpeg", download 1-9...
// OK, animals are in Img.

const animals = ['Tsundere Cat.jpeg', 'oli.jpeg', '^•^.jpeg', '🥺.jpeg', 'Let’s Go🐈.jpeg'];
animals.forEach((f, i) => {
    const p = path.join(imgDir, f);
    const url = copyAsset(p, 'images/animals', `animal-${i + 1}`);
    if (url) manifest.flip_cards.push(url);
});

// 5. GIFs
// asstes/Gif
const gifDir = path.join(SOURCE_DIR, 'Gif');
if (fs.existsSync(gifDir)) {
    const gifs = fs.readdirSync(gifDir).filter(f => f.endsWith('.gif'));
    gifs.forEach((f) => {
        const url = copyAsset(path.join(gifDir, f), 'images/gifs', f.replace('.gif', '')); // basic sanitize in copyAsset
        if (url) manifest.images[sanitize(f.replace('.gif', ''))] = url;
    });
}

// 6. Cassette/Stickers (Img)
const stickers = ['Cassette Mixtape Sticker.jpeg', 'Cassette Mixtape Sticker (1).jpeg', 'Mix Tape Audio Cassette Tape...'];
// Just fuzzy match "Cassette"
const imgFiles = fs.readdirSync(imgDir);
imgFiles.filter(f => f.toLowerCase().includes('cassette')).forEach((f, i) => {
    copyAsset(path.join(imgDir, f), 'images/stickers', `cassette-${i + 1}`);
});


// Write manifest
fs.writeFileSync(path.join(PUBLIC_ASSETS_DIR, 'asset-manifest.json'), JSON.stringify(manifest, null, 2));

console.log('Assets processed!');
