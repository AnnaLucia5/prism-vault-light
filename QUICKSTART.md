# Quick Start Guide

Get up and running with Encrypted Salary Compare in 5 minutes!

## ⚡ Fast Setup

### 1. Install Dependencies (2 minutes)

```bash
# Clone or navigate to project
cd pro5

# Install contract dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Start Local Environment (1 minute)

```bash
# Start local blockchain (Terminal 1)
npx hardhat node
```

Keep this terminal running. Open a new terminal and continue:

```bash
# Deploy contracts (Terminal 2)
npx hardhat deploy --network localhost
```

### 3. Start Frontend (1 minute)

```bash
# Start frontend with mock FHEVM (Terminal 3)
cd frontend
npm run dev:mock
```

### 4. Open Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 First Time Usage

### Connect Your Wallet

1. Click "Connect Wallet" in the top right
2. Select MetaMask (or your preferred wallet)
3. Approve the connection

**Note**: For local testing, import a Hardhat test account:
- Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- This account has test ETH on local network

### Submit Your Salary

1. Enter a salary amount (e.g., `65000`)
2. Click "Submit Salary"
3. Confirm the transaction
4. Wait for confirmation

### Compare with Another User

**For Testing**: Use multiple accounts to simulate two users

1. In MetaMask, switch to a different account
2. Submit a different salary (e.g., `58000`)
3. Switch back to first account
4. Enter the second account's address
5. Click "Compare Salaries"
6. Click "Decrypt Result" to see who earns more

## 🧪 Quick Test

Run automated tests to verify everything works:

```bash
# In project root
npm test
```

You should see all tests passing ✅

## 📱 Test Accounts

For local testing, use these Hardhat accounts:

**Account #0** (Deployer)
- Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

**Account #1** (Alice)
- Address: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
- Private Key: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`

**Account #2** (Bob)
- Address: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`
- Private Key: `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a`

## 🎯 Common Use Cases

### Scenario 1: Two Colleagues

**Alice** (Account #1):
1. Submit salary: $65,000
2. Get Bob's address
3. Compare with Bob
4. Decrypt: "You earn MORE!" ✅

**Bob** (Account #2):
1. Submit salary: $58,000
2. Wait for Alice to compare
3. View same comparison
4. Decrypt: "You earn LESS" 📉

### Scenario 2: Update Salary

1. Submit initial salary: $50,000
2. Get promotion! 🎉
3. Update salary: $70,000
4. Compare again with updated amount

## 🔍 Troubleshooting

### "Contract Not Deployed"
→ Run `npx hardhat deploy --network localhost`

### "Wallet Connection Failed"
→ Make sure MetaMask is installed and unlocked

### "Transaction Failed"
→ Check you have enough test ETH in your account

### "Frontend Won't Start"
→ Make sure you're in the `frontend/` directory

### "Module Not Found"
→ Run `npm install` in both root and frontend directories

## 🚀 Next Steps

✅ Basic setup complete! Now you can:

1. **Explore the Code**
   - Check out `contracts/SalaryCompare.sol`
   - Look at `frontend/components/SalaryCompareDemo.tsx`

2. **Run Tests**
   ```bash
   npm test
   ```

3. **Deploy to Sepolia**
   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md)

4. **Customize**
   - Change UI colors
   - Add more features
   - Integrate with your own contracts

## 📚 Learn More

- [README.md](./README.md) - Full documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [Frontend README](./frontend/README.md) - Frontend details

## 💡 Pro Tips

1. **Use Multiple Browser Profiles** for testing with multiple users
2. **Check Console** for detailed error messages
3. **Clear Browser Cache** if you see stale data
4. **Use Hardhat Console** to interact with contracts directly:
   ```bash
   npx hardhat console --network localhost
   ```

## 🎉 Success!

If you can submit a salary and compare it, you're all set! 

The application is using Fully Homomorphic Encryption to keep all salary data private while still enabling comparisons.

Happy comparing! 🔐💰

