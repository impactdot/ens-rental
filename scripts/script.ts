import { ethers } from "hardhat";
// should figure out the best way to import this:
import { BaseRegImplABI } from "../utils/abiOfBaseRegistrarImplementation";
import { getTokenId } from "../utils/getTokenId";
// import "@nomiclabs/hardhat-ethers";

// this script should be run after the deploy script
async function main() {
    const RentManagerAddress = "0xffe5f049Afb38172B626B27f974CeC3f8932f5A8";
    const [signer, renter] = await ethers.getSigners();
    // technically, we can leave this address hardcoded, because it won't change much???
    const BaseRegImplAddress = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";
    // change this part to msg.value or something, but for now it's just a hardcoded value
    const tokenId = getTokenId("foreverlost");
    console.log(tokenId);
    // connecting to BaseRegistrarImplementation contract
    const BaseRegImplContract = new ethers.Contract(
        BaseRegImplAddress,
        BaseRegImplABI,
        signer
    );
    // write it this way because the safeTransferFrom function is overloaded
    await BaseRegImplContract["safeTransferFrom(address,address,uint256)"](
        signer.address,
        RentManagerAddress,
        tokenId
    );
    console.log("transferred registrant to other address");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
