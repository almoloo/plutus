// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ownable {
    address payable public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Must be owner");
        _;
    }

    constructor() {
        owner = payable( msg.sender);
    }

    function TransferOwnership(address _newOwner) public onlyOwner {
        owner = payable(_newOwner);
    }
}