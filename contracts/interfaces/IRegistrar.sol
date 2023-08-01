// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

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
}
