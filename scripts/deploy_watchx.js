// scripts/deploy.js
const { ethers, upgrades } = require("hardhat");
require("dotenv").config(); 

async function main() {
  const WatchxFutureNFT = await ethers.getContractFactory("WatchxFutureNFT");
  const deployerAccount = process.env.DEPLOYER_ACCOUNT
  const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;
  if (!deployerAccount || !deployerPrivateKey) {
    throw new Error("need set DEPLOYER_ACCOUNT and DEPLOYER_PRIVATE_KEY ");
  }
  const name = "WatchX Future";  
  const symbol = "WatchXFuture"; 
  const wallet = new ethers.Wallet(deployerPrivateKey, ethers.provider);

  console.log("Deploying WatchxFutureNFT...");
  const watchxFutureNFT = await upgrades.deployProxy(WatchxFutureNFT, [deployerAccount, name, symbol], {
    initializer: "initialize",
  });
  await watchxFutureNFT.waitForDeployment();
  console.log("watchxFutureNFT deployProxy to:", watchxFutureNFT.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
