import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config";
import verify from "../utils/verify";
// import * as fs from "fs";

// figure out how to export the address of the deployed contract
const deployENSRentalNFT: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    // const { deployments, getNamedAccounts, network, artifacts } = hre;
    const { deployments, getNamedAccounts, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    console.log(deployer);
    log("Deploying ENSRentalNFT smart contract ...");
    const contractArgs: any[] = [];
    // block confirmations
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;
    // the deployment itself
    const ensNFT = await deploy("ENSRentalNFT", {
        from: deployer,
        args: contractArgs,
        log: true,
        waitConfirmations: waitBlockConfirmations,
        gasLimit: 4000000,
    });
    log("----------------------------------------------------");
    log("ENSRentalNFT deployed to:", ensNFT.address);
    log("----------------------------------------------------");
    // Verify the deployment
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("Verifying...");
        await verify(ensNFT.address, contractArgs);
    }

    log("Run ENSNFT with command:");
    const networkName = network.name == "hardhat" ? "localhost" : network.name;
    log(`yarn hardhat run scripts/script.ts --network ${networkName}`);
    log("----------------------------------------------------");
    // const abi = JSON.stringify(artifacts.readArtifactSync("ENSRentalNFT").abi);
    // fs.writeFileSync("../utils/ensNFT_ABI.json", abi);
};
export default deployENSRentalNFT;
deployENSRentalNFT.tags = ["all", "ensNFT"];
