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
    const huziAddr = "0x29f561e528AD59975d5cF4dd3A2c82901c80d6ce";
    const huzi = await hre.ethers.getContractAt("Huziguanbi", huziAddr);
    // get huzi total supply
    let totalSupply = await huzi.totalSupply();
    console.log("totalSupply: ", totalSupply.toString());

    // safemint to specific address with uri
    const uri = "https://maroon-few-barracuda-392.mypinata.cloud/ipfs/Qmf59QZjCvQkDCGLESxpmGbZ9pi6rEkSc7rMrvotHbB1HB"
    // get address from command line

    const to = addr;
    const tx = await huzi.safeMint(to, uri);
    console.log("tx: ", tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
