# New Year 2026 Interactive Card

A romantic, interactive web experience built for "Happy New Year 2026". 

## Features
- **Scroll Journey**: A vertical story unfolding through animations.
- **Interactive Cards**:
  - Greeting Card
  - Reflection Question
  - Music Player (Cassette style)
  - Flip Cards with surprises
  - Final Seal with typing animation
- **Tech Stack**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion.

## Project Structure
```
src/
├── components/       # UI Components (CardStack, specific cards)
├── data/            # Content configuration (cards.ts)
├── styles/          # Global styles & theme
├── utils/           # Asset preloading
└── App.tsx          # Main entry
public/assets/       # Organized media assets
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Locally**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Asset Handling
Assets are located in `public/assets/` and mapped via `public/assets/asset-manifest.json`.
- **Videos**: `public/assets/videos/`
- **Audio**: `public/assets/audio/`
- **Images**: `public/assets/images/`

## Deployment
This project is ready for static hosting (Vercel, Netlify, GitHub Pages).
A GitHub Actions workflow is included in `.github/workflows/ci-deploy.yml`.
