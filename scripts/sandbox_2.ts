import { ethers } from "ethers";
import { RegistryABI } from "../utils/abiOfRegistry";
// Replace with your Ethereum address and Infura project ID
const address = "0xdf5d8aef3cda328a201975ff54980841fade05cc";
const projectId = "541df86e97e247bba4db4ac3077e0650";

// Connect to the Ethereum network using Infura
const provider = new ethers.providers.InfuraProvider("goerli", projectId);

// ENS Registry contract address
const registryAddress = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";

// Create an instance of the ENS Registry contract
const registryContract = new ethers.Contract(
    registryAddress,
    RegistryABI,
    provider
);

// Get all ENS domain names owned and controlled by the address
async function getOwnedDomains() {
    const domains = [];

    // Get the list of owned domains
    const ownedNodes = await registryContract.queryFilter(
        registryContract.filters.NewOwner(null, address),
        "latest"
    );

    // Loop through each owned domain
    for (const ownedNode of ownedNodes) {
        const node = ownedNode.args!.node;
        const resolverAddress = await registryContract.resolver(node);

        // Check if the address is also the controller of the domain
        if (resolverAddress === address) {
            const domainName = ethers.utils.parseBytes32String(node);

            domains.push(domainName);
        }
    }

    return domains;
    // console.log(ownedNodes);
}

// getOwnedDomains();
// Call the function to get the list of owned domains
getOwnedDomains()
    .then((domains) => {
        console.log("Owned domains:", domains);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
