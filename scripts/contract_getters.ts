import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ContractInterface, Contract } from "ethers";
// for now it is goerli
import RentManagerInfo from "../deployments/goerli/RentManager.json";
import ENSRentalNFTInfo from "../deployments/goerli/ENSRentalNFT.json";
import { BaseRegImplABI } from "../utils/abiOfBaseRegistrarImplementation";

export async function getContract(
    abi: ContractInterface,
    address: string,
    signer: SignerWithAddress
): Promise<Contract> {
    const contractObj = new ethers.Contract(address, abi, signer);
    return contractObj;
}

export async function getRentManagerContract(
    signer: SignerWithAddress
): Promise<Contract> {
    const contractObj = new ethers.Contract(
        RentManagerInfo.address,
        RentManagerInfo.abi,
        signer
    );
    return contractObj;
}

export async function getBaseRegistrarImplementationContract(
    signer: SignerWithAddress
): Promise<Contract> {
    const contractObj = new ethers.Contract(
        "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
        BaseRegImplABI,
        signer
    );
    return contractObj;
}

export async function getENSRentalNFTContract(
    signer: SignerWithAddress
): Promise<Contract> {
    const contractObj = new ethers.Contract(
        ENSRentalNFTInfo.address,
        ENSRentalNFTInfo.abi,
        signer
    );
    return contractObj;
}
