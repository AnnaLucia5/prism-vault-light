import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;
  const { network } = hre;

  log(`Deploying SalaryCompare to ${network.name}...`);

  const deployedSalaryCompare = await deploy("SalaryCompare", {
    from: deployer,
    log: true,
    gasLimit: 5000000, // Increased for FHEVM operations
    waitConfirmations: network.name === "hardhat" ? 1 : 3,
  });

  log(`✅ SalaryCompare deployed at: ${deployedSalaryCompare.address}`);
  log(`📊 Deployment transaction: ${deployedSalaryCompare.transactionHash}`);

  // Verify contract on Etherscan for non-local networks
  if (network.name !== "hardhat" && network.name !== "localhost") {
    try {
      log("🔍 Verifying contract on Etherscan...");
      await hre.run("verify:verify", {
        address: deployedSalaryCompare.address,
        constructorArguments: [],
      });
      log("✅ Contract verified successfully");
    } catch (error) {
      log("⚠️ Contract verification failed:", error);
    }
  }

  // Log deployment summary
  log("\n📋 Deployment Summary:");
  log(`   Network: ${network.name}`);
  log(`   Contract: SalaryCompare`);
  log(`   Address: ${deployedSalaryCompare.address}`);
  log(`   Deployer: ${deployer}`);
};
export default func;
func.id = "deploy_salaryCompare"; // id required to prevent reexecution
func.tags = ["SalaryCompare"];
