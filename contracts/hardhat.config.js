require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.19",
    networks: {
        goerli: {
            url: "https://goerli.gateway.tenderly.co",
            // aivest
            accounts: ["input the private key here"],
        },
    }
};
