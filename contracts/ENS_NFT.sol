// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// need to add the metadata of the NFT capabilities
// check gas costs

contract ENSRentalNFT is
    ERC721,
    ERC721URIStorage,
    ERC721Burnable,
    AccessControl
{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC721("ENS Rental", "AVAT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        // _grantRole(MINTER_ROLE, msg.sender);
    }

    function giveRole(
        address _rentManager
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, _rentManager);
    }

    function safeMint(
        address to,
        uint256 tokenId,
        string memory _description,
        string memory _currentOwner,
        uint256 _expirationDate,
        uint256 _rentPrice
    ) public onlyRole(MINTER_ROLE) {
        _safeMint(to, tokenId);
        string memory json = string(
            abi.encodePacked(
                '{"name":"',
                "LenderNFT",
                '", "description":"',
                _description,
                '", "currentOwner":"',
                _currentOwner,
                '", "expirationDate":"',
                Strings.toString(_expirationDate),
                '", "rentalPrice":"',
                Strings.toString(_rentPrice),
                '"}'
            )
        );
        _setTokenURI(tokenId, json);
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
