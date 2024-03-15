// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20Token4Factory.sol";

contract ERC20TokenFactory {
    address public owner;
    mapping(address => bool) public hasMinted;
    address[] public deployedTokens;
    address public aivestdao;

    event ERC20TokenCreated(address indexed tokenAddress, string name, string symbol);
    event TokensBought(address indexed buyer, address indexed token, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(address _aivestdao) {
        owner = msg.sender;
        aivestdao = _aivestdao;
    }

    function createERC20Token(string memory _name, string memory _symbol, uint8 _decimals, uint256 _initialSupply) public onlyOwner {
        require(!hasMinted[address(this)], "Token already minted");
        hasMinted[address(this)] = true;

        ERC20Token4Factory newToken = new ERC20Token4Factory(_name, _symbol, _decimals, _initialSupply, address(this));

        deployedTokens.push(address(newToken));

        emit ERC20TokenCreated(address(newToken), _name, _symbol);
    }

    function withdrawTokens(address _tokenAddress) public onlyOwner {
        ERC20Token4Factory token = ERC20Token4Factory(_tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");

        token.transfer(owner, balance);
    }

    function buy(address _tokenAddress, uint256 _amount) public {
        require(isDeployedToken(_tokenAddress), "Token not found");

        ERC20Token4Factory deployedToken = ERC20Token4Factory(_tokenAddress);
        uint256 deployedTokenAmount = _amount * (10**deployedToken.decimals());

        // Transfer AivestDAO tokens from the user to the contract
        ERC20Token4Factory aivestdaoToken = ERC20Token4Factory(aivestdao);
        uint256 aivestdaoBalance = aivestdaoToken.balanceOf(msg.sender);
        uint256 aivestdaoTokenAmount = _amount * (10**aivestdaoToken.decimals());
        require(aivestdaoBalance >= aivestdaoTokenAmount, "Insufficient AivestDAO token balance");

        aivestdaoToken.transferFrom(msg.sender, aivestdao, aivestdaoTokenAmount);

        // Transfer the deployed tokens from the contract to the user
        deployedToken.transfer(msg.sender, deployedTokenAmount);

        emit TokensBought(msg.sender, _tokenAddress, deployedTokenAmount);
    }


    function isDeployedToken(address _tokenAddress) internal view returns (bool) {
        for (uint256 i = 0; i < deployedTokens.length; i++) {
            if (deployedTokens[i] == _tokenAddress) {
                return true;
            }
        }
        return false;
    }

    function getDeployedTokens() public view returns (address[] memory) {
        return deployedTokens;
    }

}
