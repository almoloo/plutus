# Puluts
Web3 DApp: User Profiles & Donations

This project was created for the **Avalanche Frontier: Decentralized Consumer Application Hackathon.**
## Overview
The Avalanche Profile Dapp is a revolutionary decentralized application (dapp) built on the Avalanche network, aiming to empower individuals to create and share their profiles securely and autonomously. Leveraging the capabilities of Particle Network Auth for authentication and the high-performance Avalanche blockchain for transactions, this dapp provides a seamless experience for users to showcase their work, talents, or interests while enabling them to receive donations in AVAX directly.

## How It Works
Users can create their profiles on the Plutus using Particle Network Auth, a decentralized authentication service that ensures secure login and data management. Once authenticated, users are assigned unique URLs corresponding to their profiles, which they can easily share on various social media platforms, websites, or digital portfolios.

Through their profiles, users can showcase their online presence and personal information. Moreover, the dapp allows users to receive donations in AVAX directly to support their work or endeavors. This seamless integration of profile creation, authentication, and donation support makes Plutus a powerful tool for content creators, artists, influencers, and individuals looking to monetize their online presence.

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

1. Sign up and get API keys on the following services: [Covalent](https://covalenthq.com), [Infura](https://covalenthq.com), [Particle](https://particle.network)
2. Clone the repo
   ```
   git clone https://github.com/almoloo/plutus
   ```
3. cd into the project folder and install the packages
   ```
   cd plutus
   npm install
   ```
4. Create a .env file in the root named .env and fill it with the following data
   ```
   NEXT_PUBLIC_TESTNET_CONTRACT_ADDRESS=0xE39eA7fdd4877996ddeFB8f512602505688e027B
   STARTING_BLOCK=30109957
   COVALENT_API_KEY=[YOUR_COVALENT_API_KEY]
   NEXT_PUBLIC_DOMAIN=https://localhost:3000
   INFURA_MAINNET_URL=[YOUR_INFURA_MAINNET_ENDPOINT]
   INFURA_TESTNET_URL=[YOUR_INFURA_TESTNET_ENDPOINT]
   NEXT_PUBLIC_DEFAULT_AVATAR=QmZMQQU7m1jsNDaG4CEdjfiv57uRxQyHK7v2Xawj9wZbRK
   NEXT_PUBLIC_DEFAULT_COVER=QmU7vxxCWfSdbTGeCpbTbd37ehkrWAUNimZFrYfxQsBgqh
   NEXT_PUBLIC_TESTNET_JSONRPC_PROVIDER=[PARTICLE_NETWORK_TESTNET_PROVIDER]
   NEXT_PUBLIC_AVALANCHE_JSONRPC_PROVIDER=[PARTICLE_NETWORK_MAINNET_PROVIDER]
   PARTICLE_SERVER_KEY=[YOUR_PARTICLE_SERVER_KEY]
   NEXT_PUBLIC_PARTICLE_PROJECT_ID=[YOUR_PARTICLE_PROJECT_ID]
   NEXT_PUBLIC_PARTICLE_CLIENT_KEY=[YOUR_PARTICLE_CLIENT_KEY]
   NEXT_PUBLIC_PARTICLE_APP_ID=[YOUR_PARTICLE_APP_ID]
   NEXT_PUBLIC_TESTNET=true
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
