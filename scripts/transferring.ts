// script for giving registrant to rent manager

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

// this script should be run after the deploy script
async function transferring() {
    const [owner1, lender] = await ethers.getSigners();
    console.log("lender address:", lender.address);
    console.log("safeTransferFrom process started ...");
    // change this part to msg.value or something, but for now it's just a hardcoded value
    const tokenIdString = getTokenId("cench");
    const tokenId: BigNumber = ethers.BigNumber.from(tokenIdString);
    // connecting to BaseRegistrarImplementation contract
    const BaseRegImplContract = await getBaseRegistrarImplementationContract(
        lender
    );
    // write it this way because the safeTransferFrom function is overloaded
    console.log("started giving registrant to rent manager ...");
    const transaction = await BaseRegImplContract[
        "safeTransferFrom(address,address,uint256)"
    ](lender.address, RentManagerInfo.address, tokenId);
    console.log("waiting ...");
    await transaction.wait(3);
    console.log("gave registrant to rent manager");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
transferring().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
