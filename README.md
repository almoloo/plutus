# Puluts
Web3 DApp: User Profiles & Donations

This project was created for the **Avalanche Frontier: Decentralized Consumer Application Hackathon.**
## Overview
This project aims to build a decentralized application (DApp) where users can create profiles using Particle Auth and receive crypto donations. The DApp leverages Solidity for smart contracts and React for the frontend.

[View Demo »](https://plutus-ashy.vercel.app/)

## Features
1. ### User Authentication:
- Users can log in using their Google, Twitter, email, etc. (via Particle Auth
- Wallet addresses serve as unique identifiers.

2. ### Profile Creation:
- Authenticated users can create their profiles.
- Profile information includes name, bio, profile picture, etc.
- All data saves on Avalanche network (Fuji Testnet)

3. ### Profile Viewing: 
- Other users can view profiles.
- Profiles are publicly accessible via wallet addresses.

4. ### Crypto Donations:
- Users can donate cryptocurrency (AVAX) to other profiles.
- Donations are recorded with Puluts smart contract.

5. ### Owner’s Fee
- The smart contract is ownable.
- The owner can set a fee percentage for each donation received.

## Technologies used
1. NextJS
2. Solidity
3. Covalent Unified API to get smart contract events and show "New Users" and "Latest Transactions" on the dashboard

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Contributing
Contributions are welcome! Feel free to submit pull requests or open issues.

## Contact Us
For any inquiries or feedback, feel free to reach out to us:


## License
Distributed under the MIT License. See `LICENSE.txt` for more information.

Ali Mousavi - [@almoloo](https://twitter.com/almoloo) - amousavig@icloud.com

Hossein Arabi - [@hossein-79](https://github.com/Hossein-79) - ho.arabi79@gmail.com
