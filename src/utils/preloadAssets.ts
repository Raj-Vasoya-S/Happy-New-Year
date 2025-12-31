import manifest from '../../public/assets/asset-manifest.json';

export const preloadAssets = () => {
    return new Promise<void>((resolve) => {
        // Resolve base URL for production
        const baseUrl = import.meta.env.BASE_URL.endsWith('/')
            ? import.meta.env.BASE_URL
            : `${import.meta.env.BASE_URL}/`;

        const getPath = (path: string) => {
            const cleanPath = path.startsWith('/') ? path.slice(1) : path;
            return `${baseUrl}${cleanPath}`;
        };

        const imagesToLoad = [
            ...manifest.greeting_cards.map(getPath),
            ...manifest.flip_cards.map(getPath),
            ...Object.values(manifest.images).map(getPath),
        ];

        let loaded = 0;
        const total = imagesToLoad.length;

        if (total === 0) {
            resolve();
            return;
        }

        imagesToLoad.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loaded++;
                if (loaded === total) resolve();
            };
            img.onerror = () => {
                loaded++;
                if (loaded === total) resolve();
            };
        });
    });
};
