import { HardhatUserConfig } from "hardhat/config";
import "hardhat-dependency-compiler"; // Helps with error matchers
import "@nomiclabs/hardhat-ethers";  // Required for custom errors
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";  // This import provides the typechain types
import "hardhat-gas-reporter";
import "solidity-coverage";

// Extend the config type to include typechain
interface ExtendedHardhatConfig extends HardhatUserConfig {
  typechain?: {
    outDir?: string;
    target?: string;
  };
}

const config: ExtendedHardhatConfig = {
  solidity: "0.8.28",
  typechain: {  // Now properly typed
    outDir: "typechain-types",
    target: "ethers-v5"
  },
  networks: {
    hardhat: {}
  }
};

export default config;