# ens_rental

The protocol allows users to give **registrar** permissions of ENS handles to the smart contract, which in turn makes the handle available for others to rent out. Renting period can be chosen using days, weeks and months, however the max period of rental is capped by the initial owner.

In order to retrieve the handle from the renter, a liqudation like mechanism is used. This gives the **controller** permissions back to the initial owner. However, **registrar** permissions stay with the smart contract, until the initial owner retrieves it. Initial owner may wish to keep the handle on the market, for which an option to do so is provided.

// To change as per requirements

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell

npx hardhat help

npx hardhat test

REPORT_GAS=true

npx hardhat node

npx hardhat run scripts/deploy.ts

```

Run these to deploy the ENSRentalNFT smart contract and RentManager after.

```shell

npx hardhat deploy --tags ensNFT

npx hardhat deploy --tags RentManager

```

## .env configuration:

```shell

PRIVATE_KEY_1=used as a deployer of the RentManager smart contract and ...

PRIVATE_KEY_2=potential client

GOERLI_RPC_URL=RPC URL to connect to Goerli

TENDERLY_URL=URL for Tenderly testing (not used currently)

ETHERSCAN_API_KEY=for verification on etherscan

COINMARKETCAP_API_KEY= (not used currently)

```
