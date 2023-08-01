// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@ensdomains/ens-contracts/contracts/registry/ENS.sol";
import "@ensdomains/ens-contracts/contracts/registry/ReverseRegistrar.sol";

contract Testing {
    ENS public ens = ENS(0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e);
    ReverseRegistrar public reverseRegistrar;

    constructor(address _reverseRegistrar) {
        reverseRegistrar = ReverseRegistrar(_reverseRegistrar);
    }

    function rent(bytes32 node, address owner) public payable {
        // Set controller to this contract
        ens.setOwner(node, owner);
        // Reverse register domain to renter's address
        // ens.owner(node);
    }

    function test(bytes32 node) public view returns (address) {
        return ens.owner(node);
    }
}
