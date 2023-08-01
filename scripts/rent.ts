// script for lending and renting

import { ethers } from "hardhat";
// should figure out the best way to import this:
import { RentManagerABI } from "../utils/abiOfRentManager";
import { getTokenId } from "../utils/getTokenId";
import { ensNFT } from "../utils/abiOfENSNFT";

// this script should be run after the deploy script
async function renting() {
    // this value should be set after we deploy the RentManager contract
    const rentManagerContract = await getRentManagerContract(lender);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
renting().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
