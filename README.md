# fourHundred — Gilded Age Canine Portraits

A polished React + Vite + Tailwind + shadcn/ui application inspired by Moonbirds' layout and pacing (design reference only; no copied text/assets).  
This SPA delivers a marketing site, gallery with faceted filters, token detail pages, a traits explorer, and a mint flow via wagmi.

Note: You asked for Next.js App Router. This project is built on the provided Vite + React codebase with equivalent functionality, components, and pages.

## Tech

- React + Vite + TypeScript
- React Router (routes in src/App.tsx)
- Tailwind CSS + shadcn/ui
- wagmi + viem + WalletConnect
- zustand for lightweight state
- SEO via react-helmet-async
- Lucide icons

## Commands

- npm run dev
- npm run build
- npm run preview
- npm run lint

## Environment

Copy `.env.example` to `.env` and fill:

- VITE_CHAIN_ID (or NEXT_PUBLIC_CHAIN_ID)
- VITE_RPC_URL (or NEXT_PUBLIC_RPC_URL)
- VITE_WALLETCONNECT_PROJECT_ID (or NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID)
- VITE_CONTRACT_ADDRESS (or NEXT_PUBLIC_CONTRACT_ADDRESS)
- VITE_IMAGE_BASE or NEXT_PUBLIC_IMAGE_BASE: ipfs://YOUR_CID or /images/collection

## Data Model & Placement

- Metadata JSON files: `public/metadata/{id}.json` (OpenSea-compatible: attributes array with trait_type/value).
- Images: `public/images/collection/{id}.png` or IPFS via IMAGE_BASE.

### Manifest

Create `public/metadata/index.json` listing all IDs, e.g.:

```
[1,2,3,4,5, ..., 400]
```

The app first loads `/metadata/index.json`. If missing, it falls back to the included sample at `/metadata/sample/index.json`.

### Samples Included

- 5 sample metadata files in `public/metadata/sample/1.json` ... `/5.json`
- Sample images mapped to `/public/placeholder.svg`

Replace these with your real images/JSON and add `public/metadata/index.json`.

## Pages

- `/` Home: Hero, featured tokens, collection overview, roadmap, CTAs.
- `/gallery`: Grid with infinite "Load more", search by Breed, facets for core & derived traits, sort by ID/alpha/rarity; URL-synced filters.
- `/token/:id`: Large image, attributes, rarity summary (if present), external links, share, prev/next.
- `/traits`: Trait counts per category, clickable to jump to gallery filtered view.
- `/mint`: Wallet connect (WalletConnect), contract-driven mint button (requires env + ABI/function shape).
- `/faq`, `/about`, `/legal/terms`, `/legal/privacy`
- 404 page.

## Minting

By default the Mint button is disabled until you provide:
- VITE_CONTRACT_ADDRESS (0x…)
- VITE_CHAIN_ID, VITE_RPC_URL
- VITE_WALLETCONNECT_PROJECT_ID

The contract function used is `mint(uint256 quantity)` payable.  
If your contract differs (e.g., `publicMint` or a different arg list), update the ABI in `src/components/mint/MintPanel.tsx` (pass a custom ABI to the component or replace `DEFAULT_ABI`).

## Image Base

Set `VITE_IMAGE_BASE` to either:
- `/images/collection` (default, local)
- `ipfs://YOUR_CID` (builds `https://ipfs.io/ipfs/YOUR_CID/{id}.png`)

## SEO

SEO is handled via `react-helmet-async`. Each page sets title/description; extend as needed.

## Accessibility

- Keyboard accessible nav
- Proper aria labels on filter buttons and share controls
- High contrast dark palette with gold accents

## Deployment

- Vercel/Netlify/Render compatible (static SPA).  
- Ensure `public/metadata/index.json` and images are deployed.

## Extending

- Rarity: If your metadata includes `rarity_score` and `rarity_rank`, the UI will display them automatically.
- Filters: Supported traits are listed in `src/lib/metadata.ts` (CORE and DERIVED arrays). Add/remove as needed.
- Animations: Add your preferred reveal animations via Tailwind and small CSS transitions.

## Troubleshooting

- Gallery empty: Ensure `public/metadata/index.json` lists IDs and that each `public/metadata/{id}.json` exists and is valid JSON.
- Images not loading: Check `VITE_IMAGE_BASE` and that `{id}.png` files exist (or your IPFS CID is correct).
- Wallet connect issues: Verify `VITE_WALLETCONNECT_PROJECT_ID` and `VITE_RPC_URL`.