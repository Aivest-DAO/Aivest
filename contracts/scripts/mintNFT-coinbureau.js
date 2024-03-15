// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    // get env variables
    const addr = process.env.ADDR;
    console.log("addr: ", addr);
    // get deployed huziguanbi contract at specific address
    const nftADDR = "0x0BcE6c2411CD4403bAAa04855146a165F6dA3552";
    const nftInstance = await hre.ethers.getContractAt("AIvestDAO", nftADDR);
    // get huzi total supply
    let totalSupply = await nftInstance.totalSupply();
    console.log("totalSupply: ", totalSupply.toString());

    // safemint to specific address with uri
    const uri = "https://maroon-few-barracuda-392.mypinata.cloud/ipfs/QmUjbKRdLFGPyDtdwtNoXGboo8JyKLJRnHds3XhqxE9srE"
    // get address from command line

    const to = addr;
    const tx = await nftInstance.safeMint(to, uri);
    console.log("tx: ", tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
