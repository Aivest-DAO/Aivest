const { ethers } = require("hardhat");

async function main() {
    const ERC20Token = await ethers.getContractFactory("ERC20Token");
    const aivest = await ERC20Token.deploy("AIVESTDAO", "AIVESTDAO", 18, ethers.parseEther("1000000000"));
    //
    await aivest.waitForDeployment();

    console.log(`AIvestDAO deployed to ${aivest.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
