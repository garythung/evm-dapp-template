# evm react template

My template for getting EVM dapps off the ground. Uses Next.js, React, and Tailwind CSS. Some things I included:

- Imports treat `~` as if it is `src`. E.g. to import `src/a/b/c/index.tsx`, `import "~/a/b/c"`.
- `useWallet` hook to pull account information.
- `useContractAddress` hook to fetch address for network.
- `useMultiCall` hook to interact with MakerDAO multicall.
- `useGetter` hook to use SWR with Axios.
- A basic mobile-friendly application layout.
- A basic `Button` with some styling.
- Toast notification components.
- `NetworkWarning` component for when not on mainnet.
- `ERC20`, `ERC721`, `ERC1155` ABIs.
- Precommit hook to compile TypeScript.
- Prepush hook to run the linter.

## Getting started

Create a copy of the environment file and fill in your values.

```
cp .env.example .env.local
```

Install packages.

```
npm install
```

Run dev server.
```
npm run dev
```

## Tech stack
* [React](https://reactjs.org)
* [Next.js](https://nextjs.org)
* [Tailwind CSS](https://tailwindcss.com)
* [Ethers](https://docs.ethers.io)
* [RainbowKit](https://rainbowkit.com)
* [wagmi](https://wagmi.sh)
