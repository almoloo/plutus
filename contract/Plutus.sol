// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Ownable.sol';

contract Plutus is Ownable{

    struct UserProfile {
        string name;
        string public_email;
        string bio;
        string avatar_url;
        string cover_url;
        string links;
        bool isValue;
    }

    uint public contract_balance = 0;
    uint public contract_fee_percent = 0;

    mapping(address => UserProfile) user_list;

    modifier onlyRegistered() {
        require(user_list[msg.sender].isValue == true, "Must be registered User");
        _;
    }

    constructor() {
        super;
    }

    function RegisterUser(
        string memory _name, 
        string memory _public_email,
        string memory _bio,
        string memory _avatar_url,
        string memory _cover_url,
        string memory _links) public {
        user_list[msg.sender] = UserProfile(_name, _public_email, _bio, _avatar_url, _cover_url, _links, true);
    }

    function GetUser(address _wallet) public view returns(UserProfile memory) {
        return user_list[_wallet];
    }

    function Donate(address _wallet) public payable {
        require(user_list[_wallet].isValue);

        uint contract_fee = msg.value * contract_fee_percent / 100;
        contract_balance += contract_fee;

        bool sent = payable(_wallet).send(msg.value - contract_fee);
        require(sent, "Failed to send Ether");
    }
    
    function SetName(string memory _name) public onlyRegistered {
        user_list[msg.sender].name = _name;
    }

    function SetPublicEmail(string memory _email) public onlyRegistered {
        user_list[msg.sender].public_email = _email;
    }

    function SetBio(string memory _bio) public onlyRegistered {
        user_list[msg.sender].bio = _bio;
    }

    function SetAvatarUrl(string memory _avatar) public onlyRegistered {
        user_list[msg.sender].avatar_url = _avatar;
    }

    function SetCoverUrl(string memory _cover) public onlyRegistered {
        user_list[msg.sender].cover_url = _cover;
    }

    function SetLinks(string memory _links) public onlyRegistered {
        user_list[msg.sender].links = _links;
    }

    function SetContractFee(uint _new_percent) public onlyOwner {
        contract_fee_percent = _new_percent;
    }

    function WithdrawContractBalance() public onlyOwner {
        bool sent = owner.send(address(this).balance);
        contract_balance = 0;
        require(sent, "Failed to send Ether");
    }
}
