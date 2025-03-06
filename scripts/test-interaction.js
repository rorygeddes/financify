const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const RoryGeddesRegistry = await hre.ethers.getContractFactory("RoryGeddesRegistry");
  
  // Deploy the contract
  console.log("Deploying contract...");
  const registry = await RoryGeddesRegistry.deploy();
  await registry.waitForDeployment();
  console.log("Contract deployed to:", await registry.getAddress());

  // Get a signer (account) to interact with the contract
  const [owner, addr1] = await hre.ethers.getSigners();
  
  // Register a domain
  console.log("\nRegistering domain 'rorygeddes.eth'...");
  const tx = await registry.registerDomain("rorygeddes.eth", {
    value: hre.ethers.parseEther("0.01")
  });
  await tx.wait();
  
  // Get domain owner
  const domainOwner = await registry.getDomainOwner("rorygeddes.eth");
  console.log("Domain owner:", domainOwner);
  
  // Get domain resolution
  const resolution = await registry.getDomainResolution("rorygeddes.eth");
  console.log("Domain resolves to:", resolution);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 