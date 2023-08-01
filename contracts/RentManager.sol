// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./ENS_NFT.sol";
import "./ENSRegistryWithFallback.sol";

interface IRegistrar {
    /**
     * @dev Reclaim ownership of a name in ENS, if you own it in the registrar.
     */
    function reclaim(uint256 id, address owner) external;

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function ownerOf(uint256 tokenId) external view returns (address owner);
}

interface IENSRegistryWithFallback {
    function _setOwner(bytes32 node, address owner) internal;
}

/**
 * @title RentManager should implement ERC721 token receiver interface
 * @dev Interface for any contract that wants to support safeTransfers
 * from ERC721 asset contracts.
 */
contract RentManager is IERC721Receiver {
    // when this event is emitted, the frontend should update the array and delete the ens from the array
    event ENSRented(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId,
        uint256 rentPrice,
        uint256 rentPeriod
    );

    event ENSReturned(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    // when this event is emitted, the frontend should update the array and add the ens to the array
    event ENSListed(
        address indexed lender,
        uint256 indexed tokenId,
        uint256 rentPrice,
        uint256 rentPeriod
    );

    ENSRentalNFT public nftContract;
    IRegistrar public registrar;
    IENSRegistryWithFallback public ensRegistry =
        IENSRegistryWithFallback(0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e);

    // we need to get the _nftAddress of the ENS from somewhere
    constructor(address _registrarAddress, address _nftAddress) {
        registrar = IRegistrar(_registrarAddress);
        nftContract = ENSRentalNFT(_nftAddress);
        // maybe in the future change the IERC721 interface to IBaseRegistrar interface
    }

    // struct to keep the data on renters and their period
    struct Rental {
        address renter;
        uint256 rentEndTime;
    }
    struct Listing {
        address originalOwner;
        uint256 rentPrice;
        uint256 rentPeriod;
        bool isRented;
    }
    // maybe we can delete the ensRentals mapping and just use ensListings?
    mapping(uint256 => Rental) public ensRentals;
    mapping(uint256 => Listing) public ensListings;
    // ensDomains will primarily be used to get all the available for rent ens
    mapping(uint256 => address) public ensDomains;

    // rent function
    // give: tokenId(uint256) and msg.value that is bigger than rentPrice
    // IMPORTANT: FOLLOW THE CHECKS EFFECT ORDER
    function rent(uint256 tokenId) external payable {
        // check if the ens is already rentedterm
        require(
            ensListings[tokenId].isRented == false,
            "The ENS is already rented"
        );
        // check if the renter has enough balance
        require(
            msg.value >= ensListings[tokenId].rentPrice,
            "The amount you sent is not enough"
        );
        // other checks ...

        // set the ensRentals and ensListings mapping
        ensRentals[tokenId] = Rental(
            msg.sender,
            block.timestamp + ensListings[tokenId].rentPeriod * 1 days
        );
        ensListings[tokenId].isRented = true;
        // transfer the rentPrice to the owner
        payable(msg.sender).transfer(ensListings[tokenId].rentPrice);
        // transfer the ens to the renter
        registrar.reclaim(tokenId, msg.sender);
        delete ensDomains[tokenId];
        // emit event
        emit ENSRented(
            address(this),
            msg.sender,
            tokenId,
            ensListings[tokenId].rentPrice,
            ensListings[tokenId].rentPeriod
        );
    }

    // forceEndRent function - a function to force end the rent and return it to this smart contract
    // give: tokenId(uint256)
    function forceEndRent(uint256 tokenId) external {
        // maybe make require based on calling the (ENSRegistryWithFallback) owner function - returns controller
        // but this will take more gas, so this way could work, but a security concern??
        require(
            msg.sender == ensRentals[tokenId].renter,
            "You are not the renter"
        );
        // returning the ens manager back to this smart contract
        registrar.safeTransferFrom(msg.sender, address(this), tokenId);
        // update all the mappings
        ensListings[tokenId].isRented = false;
        delete ensRentals[tokenId];
        delete ensDomains[tokenId];
        // emit event
        emit ENSReturned(msg.sender, address(this), tokenId);
    }

    // this function should be called ONLY when the rent ends and we want to return the registrant back to the original owner.
    // call safeTransferFrom
    // give: from (address), to (address) and tokenId (uint256)
    // msg.sender should be equal to the original owner.
    function giveBack(uint256 tokenId) external {
        // check if the caller of this function has the nft certificate
        // we can delete the requirement below to allow other people to return the ens to the original owner, probably for some reward
        // require(
        //     nftContract.ownerOf(tokenId) == msg.sender,
        //     "You are not the original owner"
        // );
        // check if is not currently rented, the rent has ended and etc.
        require(
            ensRentals[tokenId].rentEndTime < block.timestamp,
            "The rent period has not ended yet"
        );
        registrar.safeTransferFrom(
            address(this),
            nftContract.ownerOf(tokenId),
            tokenId
        );
        // update all the mappings
        delete ensListings[tokenId];
        delete ensRentals[tokenId];
        delete ensDomains[tokenId];
        // emit event
        emit ENSReturned(address(this), msg.sender, tokenId);
        // burn the nft
        nftContract.burn(tokenId);
    }

    function list(
        uint256 tokenId,
        uint256 rentPrice,
        uint256 rentPeriod
    ) external {
        // when someone lends an ens, he would call baseregimpl.safeTransferFrom and also call rentmanager.lend, which will give him an nft that will serve as a proof of original ownership
        // then, in the giveback function we can check if the msg.sender is the original owner or the lender: msg.sender == ownerOf(nftId)

        // mint unique nft and give it to the lender
        // if we set tokenId of our nft equal to tokenid of ens, then we can check if the msg.sender is the original owner or the lender: msg.sender == ownerOf(nftId) straight away, no need to store the mapping of tokenId => nftId
        // pass it all the data that we need to store in the nft

        // CHECK THAT THE USER HAS LENT THE ENS TO THIS CONTRACT, SO HE DID SAFETRANSFERFROM FIRST
        require(
            registrar.ownerOf(tokenId) == address(this),
            "You did not lend the ENS to this contract. You have to do this first"
        );
        nftContract.safeMint(
            msg.sender,
            tokenId,
            "NFT belonging to the lender, serves as proof of ownership",
            "",
            block.timestamp + rentPeriod * 1 days,
            rentPrice
        );
        // updating the listings
        ensListings[tokenId] = Listing(
            msg.sender,
            rentPrice,
            rentPeriod,
            false
        );
        ensDomains[tokenId] = msg.sender;
        // emit event
        emit ENSListed(msg.sender, tokenId, rentPrice, rentPeriod);
    }

    /**
     * @dev Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
     * by `operator` from `from`, this function is called.
     *
     * It must return its Solidity selector to confirm the token transfer.
     * If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
     *
     * The selector can be obtained in Solidity with `IERC721Receiver.onERC721Received.selector`.
     */
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external returns (bytes4) {
        // Handle the ERC721 token received here
        // The function must return the ERC721_RECEIVED value to confirm that the transfer was successful
        return this.onERC721Received.selector;
    }

    receive() external payable {}
}
