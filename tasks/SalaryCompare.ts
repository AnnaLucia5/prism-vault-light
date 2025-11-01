import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:submitSalary")
  .addParam("salary", "The salary amount to submit (in dollars)")
  .addOptionalParam("contract", "Contract address (optional, deploys new if not provided)")
  .setAction(async function (taskArguments: TaskArguments, { ethers, fhevm }) {
    const { salary, contract } = taskArguments;

    const [signer] = await ethers.getSigners();
    console.log(`👤 Using signer: ${signer.address}`);

    let salaryCompareAddress: string;
    let salaryCompare: any;

    if (contract) {
      console.log(`📄 Using existing contract at: ${contract}`);
      salaryCompare = await ethers.getContractAt("SalaryCompare", contract);
      salaryCompareAddress = contract;
    } else {
      console.log("🚀 Deploying new SalaryCompare contract...");
      const SalaryCompareFactory = await ethers.getContractFactory("SalaryCompare");
      salaryCompare = await SalaryCompareFactory.deploy();
      await salaryCompare.waitForDeployment();
      salaryCompareAddress = await salaryCompare.getAddress();
      console.log(`✅ Contract deployed at: ${salaryCompareAddress}`);
    }

    console.log(`💰 Submitting salary $${salary} for address ${signer.address}...`);

    try {
      const encryptedSalary = await fhevm
        .createEncryptedInput(salaryCompareAddress, signer.address)
        .add32(parseInt(salary))
        .encrypt();

      const tx = await salaryCompare.submitSalary(
        encryptedSalary.handles[0],
        encryptedSalary.inputProof
      );

      console.log(`⏳ Waiting for transaction confirmation...`);
      const receipt = await tx.wait();

      console.log(`✅ Salary submitted successfully!`);
      console.log(`📊 Transaction hash: ${tx.hash}`);
      console.log(`⛽ Gas used: ${receipt.gasUsed.toString()}`);
    } catch (error) {
      console.error(`❌ Error submitting salary:`, error);
      throw error;
    }
  });

task("task:compareSalaries")
  .addParam("other", "The address to compare with")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const { other } = taskArguments;
    const SalaryCompare = await ethers.getContractFactory("SalaryCompare");
    const salaryCompare = await SalaryCompare.deploy();
    await salaryCompare.waitForDeployment();
    
    const [signer] = await ethers.getSigners();
    
    console.log(`Comparing salary of ${signer.address} with ${other}...`);
    
    const tx = await salaryCompare.compareSalaries(other);
    await tx.wait();
    
    console.log(`Comparison completed! Transaction: ${tx.hash}`);
  });

task("task:getComparisonResult")
  .addParam("user1", "First user address")
  .addParam("user2", "Second user address")
  .setAction(async function (taskArguments: TaskArguments, { ethers, fhevm }) {
    const { user1, user2 } = taskArguments;
    const SalaryCompare = await ethers.getContractFactory("SalaryCompare");
    const salaryCompare = await SalaryCompare.deploy();
    await salaryCompare.waitForDeployment();
    const salaryCompareAddress = await salaryCompare.getAddress();
    
    const [signer] = await ethers.getSigners();
    
    console.log(`Getting comparison result between ${user1} and ${user2}...`);
    
    const encryptedResult = await salaryCompare.getComparisonResult(user1, user2);
    
    console.log(`Encrypted result: ${encryptedResult}`);
    console.log(`Decrypting result...`);
    
    // Decrypt the result
    const decryptedResult = await fhevm.userDecryptEbool(
      0, // FhevmType.ebool
      encryptedResult,
      salaryCompareAddress,
      signer
    );
    
    console.log(`Result (${user1} > ${user2}): ${decryptedResult}`);
  });

task("task:batchCompareSalaries")
  .addVariadicPositionalParam("others", "List of addresses to compare with")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const { others } = taskArguments;
    const SalaryCompare = await ethers.getContractFactory("SalaryCompare");
    const salaryCompare = await SalaryCompare.deploy();
    await salaryCompare.waitForDeployment();

    const [signer] = await ethers.getSigners();

    console.log(`Batch comparing salary of ${signer.address} with ${others.length} users...`);

    const tx = await salaryCompare.batchCompareSalaries(others);
    await tx.wait();

    console.log(`Batch comparison completed! Transaction: ${tx.hash}`);
  });

