
# bottles in the web

A project for NUS-ISS IBF TFIP 2021 to explore other technologies. 

Built using Java, Angular and Solidity.

## Concept
To provide safe space to encourage journaling for mental health with no edits or deletes.

Something like a time capsule, but only for 24 hours. Rant or allow your emotions to flow. No one else can see them except yourself.

All messages have a countdown timer, and will delete after 24 hours, symbolising that no matter what, tomorrow will come and tomorrow will be better.

If even there was a message that you wanted to keep forever, a NFT minting function is provided. The colors are randomly chosen but the words and the NFT belongs to you. Floating along the web or blockchain like a bottle.
## Documentation

bottled --- backend functionality in Java

nft-contract --- NFT contract in Solidity

protoType --- frontend functionality in Angular

### bottled
Required ENV variables for database functionality in application.properties:

DO_User --- SQL DB Username

DO_PW --- SQL DB Password

DO_URL -- SQL DB URL (requires jdbc:mysql://hostname:hostport/database)

### nft-contract
Deploys on rinkeby testnet

Required ENV variables for deployment in hardhat.config.js:

ALCHEMY_API_URL --- Ethereum node URL
RINKEBY_PK --- Private key for account to deploy

### protoType
No required ENV variables

Requires Metamask available on browser to proceed.

