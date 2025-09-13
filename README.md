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
- npm run test

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

If missing, the app falls back to included sample at `/metadata/sample/index.json`.

### Samples Included

- 6 sample metadata files in `public/metadata/sample/1.json` ... `/6.json`
- Sample images mapped to `/public/images/collection/ComfyUI_*.png` (replace with your real images)

## Pages

- `/` Home: Hero, featured tokens, story, highlights, hierarchy, experiences, CTAs.
- `/gallery`: Grid with "Load more", search by Breed, facet filters, sort (ID/alpha/rarity); URL-synced filters.
- `/token/:id`: Large image, attributes, rarity summary (if present), external links, share, prev/next.
- `/traits`: Trait charts + linkable values and a full trait catalog reference.
- `/breeds`: Complete breed lists by rarity tier (Common → Legendary).
- `/report`: Observed traits report from current metadata.
- `/mint`: Wallet connect (WalletConnect), contract-driven mint (requires env + ABI).
- `/faq`, `/about`, `/legal/terms`, `/legal/privacy` and 404.

## Minting

Provide:
- VITE_CONTRACT_ADDRESS (0x…)
- VITE_CHAIN_ID, VITE_RPC_URL
- VITE_WALLETCONNECT_PROJECT_ID

Default ABI expects `mint(uint256 quantity)` payable; replace in `src/components/mint/MintPanel.tsx` if your function differs.

## Image Base

Set `VITE_IMAGE_BASE` to:
- `/images/collection` (local)
- `ipfs://YOUR_CID` (builds `https://ipfs.io/ipfs/YOUR_CID/{id}.png`)

## SEO

`react-helmet-async` handles defaults + per-page tags. Update `public/sitemap.xml` with your production domain.

## Accessibility

- Keyboard navigable
- Gold focus ring for high visibility
- Strong contrast on dark palette

## CI and Deployment (GitHub + Vercel recommended)

This repo includes:
- `.github/workflows/ci.yml`: builds and tests on every push/PR.
- `.github/workflows/deploy-vercel.yml`: deploys to Vercel on push to `main`.

Steps:
1) Create a new GitHub repo and push this project.
2) In GitHub → Settings → Secrets and variables → Actions, add:
   - `VERCEL_TOKEN`: from your Vercel account (Account Settings → Tokens).
   - `VERCEL_ORG_ID`: your Vercel organization ID.
   - `VERCEL_PROJECT_ID`: the Vercel project ID (create a Vercel project connected to your GitHub repo).
3) Commit to `main`. The workflow will build and publish a production deployment on Vercel.
4) Set your custom domain in Vercel. Update `public/sitemap.xml` to your domain.

Note: GitHub Pages is possible for SPAs, but requires path-base adjustments (`vite` base) and SPA rewrites. Vercel is recommended for this app (already includes `vercel.json` SPA rewrites).

## Troubleshooting

- Gallery empty: ensure `/public/metadata/index.json` lists IDs and files exist.
- Images not loading: confirm `VITE_IMAGE_BASE` and {id}.png files (or IPFS CID) are correct.
- Wallet connect issues: verify `VITE_WALLETCONNECT_PROJECT_ID` and `VITE_RPC_URL`.