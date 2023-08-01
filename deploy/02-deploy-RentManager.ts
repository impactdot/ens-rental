import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config";
import verify from "../utils/verify";
// import * as fs from "fs";

const deployRentManager: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network, artifacts } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    log("Deploying RentManager smart contract ...");
    const contractArgs: any[] = [
        // registrar address
        networkConfig[network.config.chainId!].registrar,
        "0x1c961fc6c950B4F7E7B2c18c8bE642C034cE1e1d",
    ];
    log("contractArgs:", contractArgs);
    // block confirmations
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;
    // the deployment itself
    const rentManager = await deploy("RentManager", {
        from: deployer,
        args: contractArgs,
        log: true,
        waitConfirmations: waitBlockConfirmations,
        gasLimit: 4000000,
    });
    log("----------------------------------------------------");
    log("RentManager deployed to:", rentManager.address);
    log("----------------------------------------------------");
    // Verify the deployment
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("Verifying...");
        await verify(rentManager.address, contractArgs);
    }

    log("Run RentManager with command:");
    const networkName = network.name == "hardhat" ? "localhost" : network.name;
    log(`yarn hardhat run scripts/script.ts --network ${networkName}`);
    log("----------------------------------------------------");
};
export default deployRentManager;
deployRentManager.tags = ["all", "RentManager"];
