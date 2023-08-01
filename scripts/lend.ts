// script for lending and renting

import { ethers, getNamedAccounts } from "hardhat";
import { BigNumber } from "ethers";
// should figure out the best way to import this:
import { getTokenId } from "../utils/getTokenId";
import {
    getBaseRegistrarImplementationContract,
    getRentManagerContract,
    getENSRentalNFTContract,
} from "./contract_getters";
import RentManagerInfo from "../deployments/goerli/RentManager.json";

// this script should be run after the deploy script
async function lending() {
    const [owner1, lender] = await ethers.getSigners();
    console.log("lender address:", lender.address);
    console.log("lending process started ...");
    // change this part to msg.value or something, but for now it's just a hardcoded value
    const tokenIdString = getTokenId("cench");
    const tokenId: BigNumber = ethers.BigNumber.from(tokenIdString);
    const rentManagerContract = await getRentManagerContract(lender);
    // console.log("gave registrant to rent manager");
    console.log("Started lending registrant on the platform ...");
    // console.log(tokenId);
    const transaction = await rentManagerContract.lend(tokenId, 10000, 5);
    console.log(transaction);
    await transaction.wait(3);
    console.log("lended registrant on the platform");
    console.log("should receive the nft now");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
lending().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
