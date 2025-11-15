# Encrypted Salary Compare

A privacy-preserving salary comparison application built with Fully Homomorphic Encryption (FHE) using Zama's FHEVM.

## 🔐 Overview

Encrypted Salary Compare allows two colleagues to compare their salaries without revealing the actual amounts to each other. Using FHE technology, salary data is encrypted on the client-side and all comparisons are performed on encrypted data, ensuring complete privacy.

## ✨ Features

- **Private Salary Submission**: Submit your salary as encrypted data
- **Secure Comparison**: Compare salaries without revealing actual values
- **Encrypted Results**: Get comparison results that only you can decrypt
- **Rainbow Wallet Integration**: Easy wallet connection with modern UI
- **Full Privacy**: All sensitive data remains encrypted throughout the entire process
- **Real-time Notifications**: Get instant feedback on comparison status
- **Multi-network Support**: Works on Sepolia testnet and local Hardhat network

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

## 🙏 Acknowledgments

- [Zama](https://zama.ai) for FHEVM technology
- [Rainbow Kit](https://www.rainbowkit.com/) for wallet integration
- [Hardhat](https://hardhat.org/) for development environment

## 📧 Support

For issues and questions, please open an issue on the GitHub repository.

## 🌐 Live Demo

- **Vercel Deployment**: [https://pro5-psi.vercel.app/](https://pro5-psi.vercel.app/)
- **Demo Video**: [private.mp4](private.mp4) (GitHub repository asset)

## 🏗️ Testnet Deployment

**Sepolia Testnet Contract Address**: `0x76bD869D7F8Dd7DBbAcF219a3F5c17C25f9d7089`

### Contract Verification
The smart contract has been deployed and verified on Sepolia testnet. All salary comparison operations are performed using Fully Homomorphic Encryption, ensuring that salary data remains private throughout the comparison process.

## 🔗 Links

- [Zama FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Rainbow Kit Documentation](https://www.rainbowkit.com/docs/introduction)
- [Hardhat Documentation](https://hardhat.org/docs)
