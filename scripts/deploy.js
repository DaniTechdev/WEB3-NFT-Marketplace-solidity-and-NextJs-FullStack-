const hre = require("hardhat");

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy(); // Use await here

  await nftMarketplace.deployed();

  // const address = await deployedContract.address; // Corrected line
  console.log(`nftMarketPlace deployed to: ${nftMarketplace.address}`);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
