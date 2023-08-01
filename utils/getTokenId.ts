import { ethers } from "ethers";
const BigNumber = ethers.BigNumber;
const utils = ethers.utils;

export function getTokenId(name: string) {
    const labelHash = utils.keccak256(utils.toUtf8Bytes(name));
    const tokenId = BigNumber.from(labelHash).toString();
    return tokenId;
}

console.log(getTokenId("depressed"));
