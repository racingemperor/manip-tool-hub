# Embodied Tools

Next.js + React + TypeScript site for an embodied intelligence tool hub.

## Tech Stack

- Next.js static export
- React components
- TypeScript data files
- Tailwind CSS with project-specific CSS tokens
- GitHub Pages deployment through GitHub Actions

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

The static export is generated in `out/`.

## Content

- Tool content: `data/tools.ts`
- Leaderboard rows: `data/leaderboard.ts`
- Dataset entries: `data/datasets.ts`
- Tool images: `public/assets/tools/`

Add a new tool by adding a new object to `data/tools.ts`, placing images under `public/assets/tools/<slug>/`, and adding a leaderboard row only when the tool has real source-reported metrics.
