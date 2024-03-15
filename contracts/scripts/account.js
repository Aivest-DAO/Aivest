// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // generate three new account with same mnemonic
    const mnemonic = "song science major van tattoo gorilla entry mushroom myth inmate long control"

    const account = hre.ethers.Wallet.fromPhrase(mnemonic);
    console.log(account.address);
    console.log(account.privateKey);

    const account2 = account.derivePath("m/44'/60'/0'/0/1");
    console.log(account2.address);
    console.log(account2.privateKey);

    const account3 = account.derivePath("m/44'/60'/0'/0/2");
    console.log(account3.address);
    console.log(account3.privateKey);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
