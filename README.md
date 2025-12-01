# Encrypted Salary Compare

A privacy-preserving salary comparison application built with Fully Homomorphic Encryption (FHE) using Zama's FHEVM.

## 🔐 Overview

Encrypted Salary Compare allows two colleagues to compare their salaries without revealing the actual amounts to each other. Using FHE technology, salary data is encrypted on the client-side and all comparisons are performed on encrypted data, ensuring complete privacy.

## ✨ Features

### 🔐 Privacy & Security
- **End-to-End Encryption**: Salaries encrypted client-side using Zama FHEVM
- **Zero-Knowledge Comparisons**: Compare without revealing actual values
- **Access Control**: Only participants can view comparison results
- **Reentrancy Protection**: Smart contract secured against reentrant attacks
- **Input Validation**: Comprehensive address and data validation

### 🚀 User Experience
- **Modern UI**: Beautiful, responsive interface built with Next.js 15
- **Wallet Integration**: Seamless connection with Rainbow Kit
- **Real-time Feedback**: Live status updates and progress indicators
- **Error Recovery**: Automatic retry mechanisms for network issues
- **Smart Validation**: Real-time address format checking and guidance

### ⚡ Performance & Reliability
- **Multi-network Support**: Works on Sepolia testnet and local Hardhat
- **Batch Operations**: Compare with multiple users in single transaction
- **State Management**: Robust state synchronization and error recovery
- **Automatic Cleanup**: Smart cleanup of stale decryption data
- **Connection Resilience**: Handles network interruptions gracefully

### 🛠️ Developer Features
- **TypeScript**: Full type safety throughout the application
- **Comprehensive Testing**: Hardhat tests for contracts and components
- **Modular Architecture**: Clean separation of concerns
- **Extensible Design**: Easy to add new comparison features
- **Well-Documented**: Extensive inline documentation and guides
- **Advanced State Management**: Robust state synchronization and automatic recovery
- **Error Resilience**: Multi-layer error handling with retry mechanisms
- **Security Hardened**: Reentrancy protection and comprehensive validation

## 🛠️ Technology Stack

- **Smart Contracts**: Solidity with FHEVM library
- **Frontend**: Next.js 15, React 19, TypeScript
- **Blockchain**: Ethereum (Sepolia testnet and local Hardhat)
- **Wallet**: Rainbow Kit for wallet connection
- **Encryption**: Zama FHEVM (Fully Homomorphic Encryption)
- **Testing**: Hardhat, Chai

## 📋 Prerequisites

- Node.js >= 20
- npm >= 7.0.0
- MetaMask or compatible Web3 wallet

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install contract dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Run Local Development Environment

```bash
# Terminal 1: Start local Hardhat node
npx hardhat node

# Terminal 2: Deploy contracts
npx hardhat deploy --network localhost

# Terminal 3: Start frontend
cd frontend
npm run dev:mock
```

### 3. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage Guide

### Step 1: Connect Wallet
Click the "Connect Wallet" button in the top right corner and select your wallet.

### Step 2: Submit Your Salary
1. Enter your salary amount in the input field
2. Click "Submit Salary"
3. Confirm the transaction in your wallet
4. Your salary is now encrypted and stored on-chain

### Step 3: Compare with Another User
1. Enter the Ethereum address of the person you want to compare with
2. Click "Compare Salaries"
3. Confirm the transaction
4. Both users must have submitted their salaries before comparison

### Step 4: View Results
1. Click "Decrypt Result" to see who earns more
2. The result will show whether you earn MORE or LESS than the other person
3. Actual salary amounts remain private

## 🧪 Testing

### Run Local Tests
```bash
npm test
```

### Run Sepolia Tests
```bash
# First deploy to Sepolia
npx hardhat deploy --network sepolia

# Then run tests
npm run test:sepolia
```

## 📁 Project Structure

```
pro5/
├── contracts/
│   └── SalaryCompare.sol         # Main smart contract
├── deploy/
│   └── deploy.ts                  # Deployment script
├── test/
│   ├── SalaryCompare.ts          # Local tests
│   └── SalaryCompareSepolia.ts   # Sepolia tests
├── tasks/
│   └── SalaryCompare.ts          # Hardhat tasks
├── frontend/
│   ├── app/                       # Next.js app directory
│   ├── components/                # React components
│   ├── hooks/                     # Custom React hooks
│   ├── fhevm/                     # FHEVM integration
│   └── public/                    # Static assets
└── README.md
```

## 🔒 Security Features

1. **End-to-End Encryption**: Salary data is encrypted on the client-side before leaving the user's device
2. **FHE Computation**: All comparisons are performed on encrypted data
3. **Access Control**: Only participants can view comparison results
4. **Privacy Preservation**: Actual salary values are never exposed

## 🌐 Deployment

### Deploy to Sepolia Testnet

1. Configure your `.env` file:
```env
PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=your_sepolia_rpc_url
```

2. Deploy:
```bash
npx hardhat deploy --network sepolia
```

3. Update frontend configuration with deployed contract address

## 📝 Smart Contract API

### Functions

#### `submitSalary(externalEuint32 inputEuint32, bytes calldata inputProof)`
Submit an encrypted salary.

#### `getMySalary() returns (euint32)`
Retrieve your own encrypted salary.

#### `compareSalaries(address otherUser)`
Compare your salary with another user's salary.

#### `batchCompareSalaries(address[] calldata otherUsers)`
Compare your salary with multiple users in a single transaction.

#### `getComparisonResult(address user1, address user2) returns (ebool)`
Get the encrypted comparison result.

#### `updateSalary(externalEuint32 inputEuint32, bytes calldata inputProof)`
Update your encrypted salary.

#### `hasComparison(address user1, address user2) returns (bool)`
Check if a comparison has been performed between two users.

### Events

- `SalarySubmitted(address indexed user)`
- `SalaryCompared(address indexed user1, address indexed user2)`
- `SalaryUpdated(address indexed user)`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the BSD-3-Clause-Clear License.

## 📈 Project Development

This project was developed following a comprehensive software engineering approach:

### Development Methodology
- **Agile Development**: 25+ commits simulating real-world development workflow
- **Bug Lifecycle**: Intentionally introduced and systematically resolved 5 categories of bugs
- **Quality Assurance**: Multi-layer testing and validation throughout development
- **Security-First**: Implemented reentrancy protection and access controls
- **Performance Optimization**: State management and error recovery mechanisms

### Bug Categories Resolved
1. **State Management**: Fixed dependency array issues in React hooks
2. **Access Control**: Restored proper authorization checks in smart contracts
3. **FHE Permissions**: Corrected encrypted data access controls
4. **Input Validation**: Enhanced user input sanitization and validation
5. **Error Handling**: Implemented comprehensive error recovery systems

## 🙏 Acknowledgments

- [Zama](https://zama.ai) for FHEVM technology
- [Rainbow Kit](https://www.rainbowkit.com/) for wallet integration
- [Hardhat](https://hardhat.org/) for development environment
- [Vercel](https://vercel.com) for hosting and deployment platform

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### "Invalid Ethereum address format"
- **Cause**: Entered address doesn't follow Ethereum address format
- **Solution**: Ensure addresses start with "0x" and contain exactly 42 characters

#### "Network error: Unable to connect to blockchain"
- **Cause**: Network connectivity issues or RPC endpoint problems
- **Solution**: Check internet connection and try again; the app will automatically retry

#### "Comparison not found: This comparison has not been performed yet"
- **Cause**: Attempting to view results before performing comparison
- **Solution**: Both users must submit salaries and perform comparison first

#### "Access denied: You can only view comparisons you are part of"
- **Cause**: Attempting to view comparison results without being a participant
- **Solution**: Only the two users involved in a comparison can view its results

#### "Reentrant call detected"
- **Cause**: Multiple simultaneous operations attempted
- **Solution**: Wait for current operation to complete before starting new ones

### Performance Tips

- Use a stable internet connection for best experience
- MetaMask or compatible wallet recommended
- Sepolia testnet provides faster transaction confirmation than mainnet

## 📧 Support

For issues and questions, please open an issue on the GitHub repository.

## 🎥 Demo Video

Watch our comprehensive demonstration video showing the Encrypted Salary Compare application in action:

[🔗 **Live Demo Video**](https://github.com/AnnaLucia5/prism-vault-light/raw/main/selfprivate.mp4)

The video demonstrates:
- Complete user workflow from wallet connection to salary comparison
- Privacy-preserving salary submission using FHEVM encryption
- Secure comparison without revealing actual salary amounts
- Real-time decryption and result interpretation
- Error handling and user experience features
- Batch comparison functionality
- Advanced state management and recovery mechanisms

## 🌐 Live Deployment

**Vercel Deployment**: [https://selfprivate.vercel.app/](https://selfprivate.vercel.app/)

The application is fully deployed and accessible online with all features functional.

## 📋 Contract Information

### Sepolia Testnet Deployment
- **Contract Address**: `0x76bD869D7F8Dd7DBbAcF219a3F5c17C25f9d7089`
- **Network**: Ethereum Sepolia Testnet
- **Block Explorer**: [View on Etherscan](https://sepolia.etherscan.io/address/0x76bD869D7F8Dd7DBbAcF219a3F5c17C25f9d7089)

### Local Development
- **Local Network**: Hardhat localhost
- **Contract Address**: Deployed automatically during local setup

## 🔗 Links

- [Zama FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Rainbow Kit Documentation](https://www.rainbowkit.com/docs/introduction)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Live Application Demo](https://selfprivate.vercel.app/)
- [GitHub Repository](https://github.com/AnnaLucia5/prism-vault-light)
