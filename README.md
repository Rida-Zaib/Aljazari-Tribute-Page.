# Al-Jazari: The Book of Ingenious Devices

An interactive, illuminated-manuscript tribute to **Ismail al-Jazari** (1136–1206) — the Artuqid court engineer whose 1206 treatise, *The Book of Knowledge of Ingenious Mechanical Devices*, described fifty machines in exacting detail, centuries before the steam engine.

The page behaves like a real book: a 3D page-turn you click, swipe or arrow-key through, synthesized paper-whoosh audio (no sound files — pure Web Audio), and nine interactive animated diagrams of his actual mechanisms (the crank-and-connecting-rod, the elephant clock, the segmental gear, and more), each with a one-click expanded full-screen view.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** for dev server and build
- **Tailwind CSS v4** for styling
- **lucide-react** for icons
- No backend, no database, no API keys — it's a fully static site.

## Running it locally

**Prerequisites:** [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install --legacy-peer-deps
npm run dev
```

`--legacy-peer-deps` is needed once, on the first install — this project's `vite` and `esbuild` versions have a peer-dependency mismatch that plain `npm install` refuses, even though the two work together fine in practice.

The terminal will print a local URL, usually:

```
➜  Local:   http://localhost:3000/
```

Open that link in a browser. Press `Ctrl+C` in the terminal to stop the server.

### Do I need a Gemini API key?

**No.** Nothing in this app calls the Gemini API or any other external service — every page, image, animation and sound is generated or bundled locally. If you see a `GEMINI_API_KEY` mentioned in `.env.example`, that's just unused boilerplate left over from the AI Studio project template this was originally scaffolded from; you can ignore or delete it.

## Other commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Build an optimized production bundle into `dist/` |
| `npm run preview` | Serve the production build from `dist/` locally, to sanity-check it before deploying |
| `npm run lint` | Type-check the whole project with `tsc --noEmit` |

## Deploying it

After `npm run build`, the `dist/` folder is a complete static site — upload it as-is to **Vercel**, **Netlify**, **GitHub Pages**, or any static host. There's no server-side code to configure.

## Project structure

```
src/
├── components/
│   ├── Book.tsx                 # Page-turn engine: spreads, z-index/flip logic, keyboard & swipe nav
│   ├── FolioModal.tsx           # Full manuscript-plate inspector (zoom, tabs: working/reasoning/history)
│   ├── IslamicRosette.tsx       # The spinning geometric medallion on the cover
│   ├── *Simulation.tsx          # 9 animated SVG diagrams of al-Jazari's actual mechanisms,
│   │                             each with an "Expand" button that opens a full-screen view
│   └── pages/                   # One component per manuscript page (cover, life, timeline,
│                                   plates, historians' commentary, legacy, back cover)
├── data/
│   └── manuscriptData.ts        # All plate content: captions, reasoning, history, kinematics
├── utils/
│   └── audio.ts                 # Synthesizes the page-turn "whoosh" from filtered noise
└── index.css                   # Palette, fonts, and the 3D flip/perspective CSS
```

## Credits

Built as a tribute project. Portrait and manuscript-plate images are used for educational, non-commercial purposes; the animated diagrams and all code are original.
