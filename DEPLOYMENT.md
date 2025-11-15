# Deployment Guide

This guide covers deploying the Encrypted Salary Compare application to various environments.

## 📋 Prerequisites

- Node.js >= 20
- npm >= 7.0.0
- Ethereum wallet with test ETH (for Sepolia deployment)
- WalletConnect Project ID (for frontend)

## 🔐 Environment Setup

### 1. Create Environment File

Create a `.env` file in the project root:

```bash
# Private key for deployment (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# RPC URLs
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
# or use Alchemy
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY

# Optional: Etherscan API key for contract verification
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 2. Frontend Environment

Create `frontend/.env.local`:

```bash
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
```

Get your WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).

## 🌐 Network Deployment

### Local Hardhat Network

Perfect for development and testing.

```bash
# Terminal 1: Start Hardhat node
npx hardhat node

# Terminal 2: Deploy contracts
npx hardhat deploy --network localhost

# Terminal 3: Start frontend
cd frontend
npm run dev:mock
```

The local network runs on `http://127.0.0.1:8545` with chain ID 31337.

### Sepolia Testnet

Production-like environment using Sepolia testnet.

#### Step 1: Get Test ETH

Get Sepolia test ETH from:
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)

#### Step 2: Deploy Contract

```bash
npx hardhat deploy --network sepolia
```

#### Step 3: Verify Contract (Optional)

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

#### Step 4: Generate Frontend ABI

```bash
cd frontend
npm run genabi
```

This will create:
- `frontend/abi/SalaryCompareABI.ts`
- `frontend/abi/SalaryCompareAddresses.ts`

#### Step 5: Test on Sepolia

```bash
npm run test:sepolia
```

## 🚀 Frontend Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Set root directory to `frontend`

3. **Configure Environment Variables**
   Add in Vercel dashboard:
   ```
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Other Platforms

#### Netlify

1. Build command: `npm run build`
2. Publish directory: `frontend/.next`
3. Add environment variables in Netlify dashboard

#### AWS Amplify

1. Connect GitHub repository
2. Set build settings:
   ```yaml
   version: 1
   applications:
     - appRoot: frontend
       frontend:
         phases:
           preBuild:
             commands:
               - npm install
           build:
             commands:
               - npm run build
         artifacts:
           baseDirectory: .next
           files:
             - '**/*'
   ```

#### Docker

1. **Create Dockerfile** in `frontend/`:
   ```dockerfile
   FROM node:20-alpine AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci

   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   FROM node:20-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   ```

2. **Build and Run**:
   ```bash
   docker build -t salary-compare-frontend ./frontend
   docker run -p 3000:3000 salary-compare-frontend
   ```

## ✅ Post-Deployment Checklist

- [ ] Smart contract deployed successfully
- [ ] Contract address updated in frontend
- [ ] ABI files generated
- [ ] Frontend environment variables configured
- [ ] Frontend deployed and accessible
- [ ] Wallet connection works
- [ ] Can submit salary
- [ ] Can compare salaries
- [ ] Can decrypt results
- [ ] Error handling works correctly

## 🧪 Testing Deployment

### Test Contract Functionality

```bash
# Submit a salary
npx hardhat task:submitSalary --salary 65000 --network sepolia

# Compare salaries
npx hardhat task:compareSalaries --other 0x... --network sepolia

# Get comparison result
npx hardhat task:getComparisonResult --user1 0x... --user2 0x... --network sepolia
```

### Test Frontend

1. Open deployed URL
2. Connect wallet
3. Submit a test salary
4. Compare with another address
5. Decrypt and verify results

## 🐛 Troubleshooting

### Contract Deployment Failed

**Issue**: Out of gas
**Solution**: Increase gas limit in `hardhat.config.ts`

**Issue**: Invalid private key
**Solution**: Check `.env` file, ensure no `0x` prefix

**Issue**: Insufficient funds
**Solution**: Add test ETH to your wallet

### Frontend Deployment Issues

**Issue**: Build fails
**Solution**: 
- Check Node.js version (must be >= 20)
- Run `npm install` to update dependencies
- Check for TypeScript errors

**Issue**: Wallet not connecting
**Solution**:
- Verify WalletConnect Project ID
- Check network configuration in `wagmi.config.ts`
- Clear browser cache

**Issue**: Contract not found
**Solution**:
- Run `npm run genabi` after deployment
- Check contract addresses in `SalaryCompareAddresses.ts`
- Ensure you're on the correct network

## 📊 Monitoring

### Contract Events

Monitor contract events using:

```bash
npx hardhat node --watch
```

### Frontend Analytics

Consider adding:
- [Vercel Analytics](https://vercel.com/analytics)
- [Google Analytics](https://analytics.google.com)
- Custom event tracking for user interactions

## 🔄 Updates and Maintenance

### Updating Smart Contracts

1. Make changes to contracts
2. Test locally
3. Deploy to Sepolia
4. Update frontend ABI
5. Test on Sepolia
6. Deploy frontend

### Updating Frontend

1. Make changes to frontend code
2. Test locally
3. Commit and push to GitHub
4. Vercel auto-deploys (or manual deploy for other platforms)

## 🔒 Security Considerations

### Private Keys
- Never commit `.env` files
- Use environment variables for sensitive data
- Consider using a hardware wallet for mainnet

### API Keys
- Rotate keys regularly
- Use separate keys for different environments
- Monitor API usage

### Smart Contracts
- Audit contracts before mainnet deployment
- Test thoroughly on testnet
- Consider a bug bounty program

## 📝 Mainnet Deployment (Future)

When ready for mainnet:

1. **Audit**: Get professional security audit
2. **Testing**: Extensive testing on testnet
3. **Gas Optimization**: Optimize contract for gas efficiency
4. **Insurance**: Consider smart contract insurance
5. **Monitoring**: Set up comprehensive monitoring
6. **Gradual Rollout**: Start with limited users

## 🔗 Resources

- [Hardhat Deployment](https://hardhat.org/hardhat-runner/docs/guides/deploying)
- [Vercel Deployment](https://vercel.com/docs)
- [Sepolia Testnet Info](https://sepolia.dev/)
- [WalletConnect Setup](https://cloud.walletconnect.com/)

