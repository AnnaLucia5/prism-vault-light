# Getting Started Checklist

Use this checklist to get your Encrypted Salary Compare system up and running!

## 📋 Pre-Setup Checklist

Before you begin, make sure you have:

- [ ] Node.js version 20 or higher installed
- [ ] npm version 7.0.0 or higher installed
- [ ] MetaMask or compatible Web3 wallet installed in browser
- [ ] Basic understanding of Ethereum and smart contracts
- [ ] Code editor (VS Code recommended)

Check your versions:
```bash
node --version  # Should be >= 20
npm --version   # Should be >= 7.0.0
```

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies ⏱️ ~2 minutes

```bash
# Navigate to project directory
cd pro5

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

**Checkpoint**: You should see `node_modules` folders in both root and frontend directories.

### Step 2: Start Local Blockchain ⏱️ ~30 seconds

Open a new terminal window and run:

```bash
npx hardhat node
```

**Checkpoint**: You should see a list of test accounts with private keys.

**Important**: Keep this terminal window open!

### Step 3: Deploy Smart Contract ⏱️ ~30 seconds

Open another new terminal window and run:

```bash
npx hardhat deploy --network localhost
```

**Checkpoint**: You should see "SalaryCompare contract: 0x..." with an address.

### Step 4: Start Frontend ⏱️ ~1 minute

```bash
cd frontend
npm run dev:mock
```

**Checkpoint**: You should see "Ready - started server on 0.0.0.0:3000"

### Step 5: Open Application ⏱️ ~10 seconds

Open your browser and go to: [http://localhost:3000](http://localhost:3000)

**Checkpoint**: You should see the Encrypted Salary Compare interface.

## 🎮 First Time Usage

### Connect Your Wallet

1. [ ] Click "Connect Wallet" button in the top right corner
2. [ ] Select MetaMask (or your preferred wallet)
3. [ ] Approve the connection request
4. [ ] Wallet address should appear in the button

**Troubleshooting**: If you don't see the connect button, refresh the page.

### Import Test Account (For Local Testing)

1. [ ] Open MetaMask
2. [ ] Click on the account icon
3. [ ] Select "Import Account"
4. [ ] Paste this private key: 
   ```
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
5. [ ] This account has test ETH on local network

**Note**: This is Account #0 from Hardhat test accounts. Never use this key on mainnet!

### Submit Your First Salary

1. [ ] Enter a salary amount (e.g., `65000`)
2. [ ] Click "Submit Salary"
3. [ ] Confirm transaction in MetaMask
4. [ ] Wait for "Salary submitted successfully!" message
5. [ ] You should see your encrypted salary displayed

**Expected Time**: 15-30 seconds

### Compare with Another User

For testing, you'll need two accounts:

**Account 1 (Already imported)**:
- [ ] Submit salary: `65000`
- [ ] Note this account's address

**Account 2 (Import another test account)**:
- [ ] Import another test account with private key:
  ```
  0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
  ```
- [ ] Submit salary: `58000`
- [ ] Note this account's address

**Back to Account 1**:
- [ ] Switch to Account 1 in MetaMask
- [ ] Enter Account 2's address in comparison field
- [ ] Click "Compare Salaries"
- [ ] Confirm transaction
- [ ] Wait for confirmation

### Decrypt Results

- [ ] Click "Decrypt Result"
- [ ] Sign the decryption request in MetaMask
- [ ] Wait for decryption
- [ ] You should see: "You earn MORE!" (since 65000 > 58000)

## ✅ Verification Checklist

Ensure everything is working:

- [ ] Wallet connects successfully
- [ ] Can submit salary without errors
- [ ] Encrypted salary is displayed
- [ ] Can compare with another address
- [ ] Comparison completes successfully
- [ ] Can decrypt and see result
- [ ] Result is correct (based on submitted salaries)

## 🧪 Run Tests

To verify the smart contract is working correctly:

```bash
# In project root directory
npm test
```

**Expected Output**: All tests should pass (6 tests)

```
  SalaryCompare
    ✔ should allow a user to submit an encrypted salary
    ✔ should allow two users to compare salaries
    ✔ should show correct comparison when Bob earns more
    ✔ should allow users to update their salary
    ✔ should not allow comparing without submitting salary
    ✔ should not allow viewing comparison result by unauthorized user

  6 passing
```

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to wallet"
**Solution**: 
- [ ] Ensure MetaMask is installed
- [ ] Check that MetaMask is unlocked
- [ ] Try refreshing the page
- [ ] Check browser console for errors

### Issue: "Contract not deployed"
**Solution**:
- [ ] Ensure Hardhat node is running
- [ ] Run deployment script again: `npx hardhat deploy --network localhost`
- [ ] Check that you're on the correct network in MetaMask (Localhost 8545)

### Issue: "Transaction failed"
**Solution**:
- [ ] Check that you have enough test ETH
- [ ] Ensure you're on the correct network
- [ ] Try resetting MetaMask account (Settings → Advanced → Reset Account)
- [ ] Check Hardhat node terminal for errors

### Issue: "Module not found"
**Solution**:
- [ ] Run `npm install` in project root
- [ ] Run `npm install` in frontend directory
- [ ] Delete `node_modules` and reinstall
- [ ] Check Node.js version (must be >= 20)

### Issue: "Port already in use"
**Solution**:
- [ ] Kill process on port 3000: `npx kill-port 3000`
- [ ] Or use different port: `PORT=3001 npm run dev:mock`

## 📖 Next Steps

Once everything is working locally:

1. **Explore the Code**
   - [ ] Read `contracts/SalaryCompare.sol`
   - [ ] Check `frontend/components/SalaryCompareDemo.tsx`
   - [ ] Review `frontend/hooks/useSalaryCompare.tsx`

2. **Customize**
   - [ ] Change colors in `tailwind.config.ts`
   - [ ] Modify UI in `SalaryCompareDemo.tsx`
   - [ ] Add your own features

3. **Deploy to Testnet**
   - [ ] Read `DEPLOYMENT.md`
   - [ ] Get Sepolia test ETH
   - [ ] Deploy to Sepolia
   - [ ] Test on public testnet

4. **Learn More**
   - [ ] Read `FEATURES.md` for technical details
   - [ ] Check `PROJECT_STRUCTURE.md` for codebase overview
   - [ ] Review `README.md` for comprehensive documentation

## 🎯 Success Criteria

You're ready to move forward when:

- ✅ All tests passing
- ✅ Can submit salary locally
- ✅ Can compare salaries
- ✅ Can decrypt results
- ✅ No console errors
- ✅ Wallet connects smoothly

## 📞 Need Help?

If you're stuck:

1. Check the error message in browser console (F12)
2. Check Hardhat node terminal output
3. Read the documentation files:
   - `README.md` - Main documentation
   - `QUICKSTART.md` - Quick setup guide
   - `DEPLOYMENT.md` - Deployment help
4. Review the code comments
5. Open an issue on GitHub

## 🎉 Congratulations!

If you've completed this checklist, you now have a fully functional encrypted salary comparison system running locally!

You can:
- 🔐 Submit encrypted salaries
- 🔍 Compare with others
- ✨ Decrypt results privately
- 🚀 Deploy to testnet
- 🛠️ Customize and extend

**Happy comparing!** 💰🔒

---

**Estimated Total Time**: 10-15 minutes  
**Difficulty**: Beginner-friendly  
**Support**: Full documentation available

