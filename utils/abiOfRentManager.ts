export const RentManagerABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_registrarAddress",
                type: "address",
            },
            {
                internalType: "address",
                name: "_nftAddress",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "ensListings",
        outputs: [
            { internalType: "uint256", name: "rentPrice", type: "uint256" },
            {
                internalType: "uint256",
                name: "rentPeriod",
                type: "uint256",
            },
            { internalType: "bool", name: "isRented", type: "bool" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "ensRentals",
        outputs: [
            { internalType: "address", name: "renter", type: "address" },
            {
                internalType: "uint256",
                name: "rentEndTime",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "forceEndRent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "giveBack",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "uint256", name: "rentPrice", type: "uint256" },
            {
                internalType: "uint256",
                name: "rentPeriod",
                type: "uint256",
            },
        ],
        name: "lend",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "nftContract",
        outputs: [
            {
                internalType: "contract ENSRentalNFT",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "", type: "address" },
            { internalType: "address", name: "", type: "address" },
            { internalType: "uint256", name: "", type: "uint256" },
            { internalType: "bytes", name: "", type: "bytes" },
        ],
        name: "onERC721Received",
        outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "publicResolver",
        outputs: [
            {
                internalType: "contract IPublicResolver",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "registrar",
        outputs: [
            {
                internalType: "contract IRegistrar",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
        name: "rent",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    { stateMutability: "payable", type: "receive" },
];
