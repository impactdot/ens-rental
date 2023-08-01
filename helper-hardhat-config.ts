export interface networkConfigItem {
    name?: string;
    registrar?: string;
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem;
}

export const VERIFICATION_BLOCK_CONFIRMATIONS = 5;

export const networkConfig: networkConfigInfo = {
    5: {
        name: "goerli",
        registrar: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
    },
    1: {
        name: "mainnet",
        registrar: "",
    },
    // add mainnet and other networks here
};

export const developmentChains = ["hardhat", "localhost"];
