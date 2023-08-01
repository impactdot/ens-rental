// setup script

import { ethers } from "hardhat";
import { BigNumber } from "ethers";
// should figure out the best way to import this:
import { getTokenId } from "../utils/getTokenId";
import {
    getBaseRegistrarImplementationContract,
    getRentManagerContract,
    getENSRentalNFTContract,
} from "./contract_getters";
import RentManagerInfo from "../deployments/goerli/RentManager.json";
import ENSRentalNFTInfo from "../deployments/goerli/ENSRentalNFT.json";

// this script should be run after the deploy script
async function setup() {
    const [owner1, lender] = await ethers.getSigners();
    const ENSRentalNFTContract = await getENSRentalNFTContract(lender);
    console.log("got here");
    // some of the comments below should be uncommented when the code is ready
    const prev_owner = await ENSRentalNFTContract.owner();
    console.log("prev owner of the nft smart contract is", prev_owner);
    const transaction = await ENSRentalNFTContract.setOwner(
        RentManagerInfo.address
    );
    console.log("waiting ...");
    await transaction.wait(3);
    const owner = await ENSRentalNFTContract.owner();
    console.log("new owner of the nft is", owner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
setup().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
