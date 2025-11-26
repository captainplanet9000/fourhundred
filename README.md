# fourHundred NFT Gallery

A sophisticated web application designed to showcase a collection of 9,400 unique dog portraits from the Gilded Age.

## Features

- Full collection gallery with 9,400 tokens
- Metadata integration with IPFS
- Search and filter functionality
- Individual token detail pages
- Rarity viewer and trait display
- Pagination for large gallery
- Mobile optimization
- Loading states and error handling
- Comprehensive testing
- Performance optimization
- Web3 wallet integration

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_IPFS_GATEWAY=https://cloudflare-ipfs.com
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_NETWORK_ID=11155111
NEXT_PUBLIC_NETWORK_NAME=Sepolia
NEXT_PUBLIC_NETWORK_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_alchemy_api_key
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks and context
- **Web3 Integration**: RainbowKit, Wagmi, and ConnectKit
- **Testing**: Jest and React Testing Library

## Project Structure

```
dapp/
├── app/                    # Next.js app directory
│   ├── gallery/           # Gallery page
│   ├── token/             # Token detail pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Gallery/          # Gallery components
│   ├── TokenDetail/      # Token detail components
│   ├── UI/               # Reusable UI components
│   └── LoadingStates/    # Loading and error components
├── lib/                  # Utility libraries
│   ├── abi/              # Contract ABIs
│   ├── metadataService.ts # Metadata service
│   ├── utils.ts          # Utility functions
│   └── wagmi.ts          # Wagmi configuration
├── __tests__/            # Test files
├── public/               # Static assets
├── .env.local            # Environment variables
├── Dockerfile            # Production Docker config
├── Dockerfile.dev        # Development Docker config
├── docker-compose.yml    # Docker compose config
├── .dockerignore         # Docker ignore file
├── DEPLOYMENT.md         # Deployment guide
└── PROJECT_SUMMARY.md    # Project summary
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests and ensure they pass
6. Submit a pull request

## License

This project is licensed under the MIT License.