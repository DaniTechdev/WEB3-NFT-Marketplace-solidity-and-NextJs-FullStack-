const hre = require("hardhat");

async function main() {
  const Chatapp = await hre.ethers.getContractFactory("ChatApp");
  const deployedContract = await Chatapp.deploy(); // Use await here

  await deployedContract.deployed();

  // const address = await deployedContract.address; // Corrected line
  console.log(`CrowdFunding deployed to: ${deployedContract.address}`);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
