import hre, { network, ethers } from "hardhat";

const verify = async (contractAddress: string, args: any[]) => {
    console.log("Verifying contract on Goerli...");
    try {
        await hre.run("verify:verify", {
            network: network.name,
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!");
        } else {
            console.log(e);
        }
    }
};

export default verify;
