const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RoryGeddesRegistry", function () {
  let registry;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the contract
    const RoryGeddesRegistry = await ethers.getContractFactory("RoryGeddesRegistry");
    registry = await RoryGeddesRegistry.deploy();
  });

  describe("Domain Registration", function () {
    it("Should allow users to register a domain", async function () {
      const domainName = "test.eth";
      const registrationFee = ethers.parseEther("0.01");

      await registry.connect(addr1).registerDomain(domainName, { value: registrationFee });
      
      expect(await registry.getDomainOwner(domainName)).to.equal(addr1.address);
    });

    it("Should not allow registering an already registered domain", async function () {
      const domainName = "test.eth";
      const registrationFee = ethers.parseEther("0.01");

      await registry.connect(addr1).registerDomain(domainName, { value: registrationFee });
      
      await expect(
        registry.connect(addr2).registerDomain(domainName, { value: registrationFee })
      ).to.be.revertedWith("Domain already registered");
    });

    it("Should not allow registering without sufficient payment", async function () {
      const domainName = "test.eth";
      const insufficientFee = ethers.parseEther("0.005");

      await expect(
        registry.connect(addr1).registerDomain(domainName, { value: insufficientFee })
      ).to.be.revertedWith("Insufficient payment");
    });
  });

  describe("Domain Resolution", function () {
    it("Should allow domain owner to update resolution", async function () {
      const domainName = "test.eth";
      const registrationFee = ethers.parseEther("0.01");

      await registry.connect(addr1).registerDomain(domainName, { value: registrationFee });
      await registry.connect(addr1).setDomainResolution(domainName, addr2.address);

      expect(await registry.getDomainResolution(domainName)).to.equal(addr2.address);
    });

    it("Should not allow non-owners to update resolution", async function () {
      const domainName = "test.eth";
      const registrationFee = ethers.parseEther("0.01");

      await registry.connect(addr1).registerDomain(domainName, { value: registrationFee });
      
      await expect(
        registry.connect(addr2).setDomainResolution(domainName, addr2.address)
      ).to.be.revertedWith("Not domain owner");
    });
  });

  describe("Contract Management", function () {
    it("Should allow owner to withdraw funds", async function () {
      const domainName = "test.eth";
      const registrationFee = ethers.parseEther("0.01");

      await registry.connect(addr1).registerDomain(domainName, { value: registrationFee });

      const initialBalance = await ethers.provider.getBalance(owner.address);
      await registry.connect(owner).withdraw();
      const finalBalance = await ethers.provider.getBalance(owner.address);

      expect(finalBalance).to.be.gt(initialBalance);
    });

    it("Should not allow non-owners to withdraw funds", async function () {
      const domainName = "test.eth";
      const registrationFee = ethers.parseEther("0.01");

      await registry.connect(addr1).registerDomain(domainName, { value: registrationFee });

      await expect(
        registry.connect(addr1).withdraw()
      ).to.be.revertedWithCustomError(registry, "OwnableUnauthorizedAccount");
    });
  });
}); 