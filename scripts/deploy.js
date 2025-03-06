const hre = require("hardhat");

async function main() {
  const RoryGeddesRegistry = await hre.ethers.getContractFactory("RoryGeddesRegistry");
  const registry = await RoryGeddesRegistry.deploy();

  await registry.waitForDeployment();

  console.log("RoryGeddesRegistry deployed to:", await registry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 