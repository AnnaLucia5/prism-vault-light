# Project Structure

Complete overview of the Encrypted Salary Compare project structure.

## 📁 Directory Structure

```
pro5/
├── contracts/                    # Smart contracts
│   └── SalaryCompare.sol        # Main contract
│
├── deploy/                       # Deployment scripts
│   └── deploy.ts                # Contract deployment
│
├── test/                        # Test files
│   ├── SalaryCompare.ts        # Local tests
│   └── SalaryCompareSepolia.ts # Sepolia tests
│
├── tasks/                       # Hardhat tasks
│   ├── accounts.ts             # Account management
│   └── SalaryCompare.ts        # Contract tasks
│
├── frontend/                    # Frontend application
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── providers.tsx       # App providers
│   │   ├── globals.css         # Global styles
│   │   └── icon.svg            # App icon
│   │
│   ├── components/             # React components
│   │   ├── SalaryCompareDemo.tsx    # Main app component
│   │   └── ErrorNotDeployed.tsx     # Error display
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useSalaryCompare.tsx     # Contract interaction
│   │   ├── useInMemoryStorage.tsx   # Storage hook
│   │   └── metamask/                # MetaMask hooks
│   │       ├── Eip6963Types.ts
│   │       ├── useEip6963.tsx
│   │       ├── useMetaMaskEthersSigner.tsx
│   │       └── useMetaMaskProvider.tsx
│   │
│   ├── fhevm/                  # FHEVM integration
│   │   ├── useFhevm.tsx                    # FHEVM instance hook
│   │   ├── FhevmDecryptionSignature.ts     # Decryption signatures
│   │   ├── fhevmTypes.ts                   # Type definitions
│   │   ├── GenericStringStorage.ts         # Storage interface
│   │   ├── userFhevm.test.tsx             # FHEVM tests
│   │   └── internal/                       # Internal utilities
│   │       ├── constants.ts
│   │       ├── fhevm.ts
│   │       ├── fhevmTypes.ts
│   │       ├── PublicKeyStorage.ts
│   │       ├── RelayerSDKLoader.ts
│   │       └── mock/
│   │           └── fhevmMock.ts
│   │
│   ├── abi/                    # Contract ABIs
│   │   ├── SalaryCompareABI.ts         # Contract ABI
│   │   └── SalaryCompareAddresses.ts   # Deployed addresses
│   │
│   ├── public/                 # Static assets
│   │   ├── salary-logo.svg     # App logo
│   │   └── salary-icon.png     # Favicon
│   │
│   ├── scripts/                # Build scripts
│   │   ├── genabi.mjs          # Generate ABI files
│   │   ├── deploy-hardhat-node.sh      # Deploy script
│   │   └── is-hardhat-node-running.mjs  # Check node
│   │
│   ├── wagmi.config.ts         # Wagmi configuration
│   ├── package.json            # Frontend dependencies
│   ├── tsconfig.json           # TypeScript config
│   ├── tailwind.config.ts      # Tailwind config
│   ├── next.config.ts          # Next.js config
│   ├── postcss.config.mjs      # PostCSS config
│   ├── eslint.config.mjs       # ESLint config
│   ├── vitest.config.ts        # Vitest config
│   └── README.md               # Frontend docs
│
├── .github/                    # GitHub workflows
│   └── workflows/
│       ├── main.yml
│       ├── manual.yml
│       └── manual-windows.yml
│
├── .vscode/                    # VS Code settings
│   ├── settings.json
│   └── extensions.json
│
├── Configuration Files
├── .eslintignore              # ESLint ignore
├── .eslintrc.yml              # ESLint config
├── .gitignore                 # Git ignore
├── .prettierignore            # Prettier ignore
├── .prettierrc.yml            # Prettier config
├── .solcover.js               # Solidity coverage
├── .solhint.json              # Solhint config
├── .solhintignore             # Solhint ignore
├── hardhat.config.ts          # Hardhat config
├── tsconfig.json              # TypeScript config
├── package.json               # Project dependencies
│
└── Documentation
    ├── README.md              # Main documentation
    ├── QUICKSTART.md          # Quick start guide
    ├── DEPLOYMENT.md          # Deployment guide
    ├── FEATURES.md            # Features specification
    ├── PROJECT_STRUCTURE.md   # This file
    └── LICENSE                # License file
```

## 📦 Key Files

### Smart Contract Files

#### `contracts/SalaryCompare.sol`
Main smart contract implementing encrypted salary comparison logic.

**Key Features**:
- Encrypted salary storage
- Private comparison logic
- Access control
- Event emission

#### `deploy/deploy.ts`
Hardhat deployment script for the SalaryCompare contract.

**Functionality**:
- Deploys contract to specified network
- Logs deployment address
- Saves deployment artifacts

### Test Files

#### `test/SalaryCompare.ts`
Comprehensive local tests for the smart contract.

**Test Coverage**:
- Salary submission
- Salary comparison
- Result decryption
- Access control
- Error cases
- Edge cases

#### `test/SalaryCompareSepolia.ts`
Integration tests for Sepolia testnet.

**Test Coverage**:
- End-to-end flows
- Network interactions
- Real blockchain testing

### Frontend Files

#### `frontend/app/layout.tsx`
Root layout component with Rainbow Kit integration.

**Features**:
- Wallet connection button
- Global navigation
- Provider setup
- Custom branding

#### `frontend/app/page.tsx`
Home page component.

**Content**:
- Main application container
- Component composition

#### `frontend/components/SalaryCompareDemo.tsx`
Main application component with all functionality.

**Features**:
- Wallet connection check
- Salary submission form
- Comparison interface
- Decryption controls
- Status display
- Error handling

#### `frontend/hooks/useSalaryCompare.tsx`
Custom hook for contract interaction.

**Functionality**:
- Contract method calls
- Encryption/decryption
- State management
- Transaction handling
- Error handling

#### `frontend/fhevm/useFhevm.tsx`
Hook for FHEVM instance management.

**Features**:
- Instance creation
- Public key management
- Encryption utilities
- Mock support

### Configuration Files

#### `hardhat.config.ts`
Hardhat configuration for contract development.

**Settings**:
- Network configuration
- Solidity compiler version
- Plugin setup
- Gas reporting
- Contract verification

#### `frontend/wagmi.config.ts`
Wagmi configuration for Web3 integration.

**Settings**:
- Supported chains
- Wallet connectors
- App metadata
- SSR support

#### `frontend/tailwind.config.ts`
Tailwind CSS configuration.

**Customization**:
- Color scheme
- Typography
- Spacing
- Animations

#### `package.json` (Root)
Project dependencies and scripts.

**Scripts**:
- `compile`: Compile contracts
- `test`: Run tests
- `deploy`: Deploy contracts
- `clean`: Clean artifacts
- `lint`: Run linters

#### `frontend/package.json`
Frontend dependencies and scripts.

**Scripts**:
- `dev`: Development server
- `dev:mock`: Development with mock FHEVM
- `build`: Production build
- `start`: Production server
- `genabi`: Generate ABI files

## 🔄 Data Flow

### Salary Submission Flow
```
User Input → Frontend Validation → FHE Encryption →
Transaction Creation → Wallet Signature → Blockchain →
Event Emission → Frontend Update
```

### Comparison Flow
```
Address Input → Validation → Transaction Creation →
Contract Comparison (Encrypted) → Event Emission →
Result Storage → Frontend Retrieval → Decryption → Display
```

### Decryption Flow
```
User Request → Signature Creation → FHEVM Decryption →
Result Processing → UI Update
```

## 🔐 Security Layers

1. **Frontend**: Input validation, client-side encryption
2. **Transport**: HTTPS, encrypted payloads
3. **Blockchain**: Smart contract access control
4. **Storage**: On-chain encrypted data
5. **Decryption**: User-controlled signatures

## 🛠️ Development Workflow

### Local Development
1. Start Hardhat node
2. Deploy contracts
3. Generate ABI files
4. Start frontend
5. Test with MetaMask

### Testing
1. Write tests
2. Run local tests
3. Deploy to Sepolia
4. Run integration tests
5. Manual testing

### Deployment
1. Configure environment
2. Deploy to testnet
3. Verify contracts
4. Update frontend config
5. Deploy frontend
6. Test production

## 📊 Component Dependencies

### Contract Dependencies
- `@fhevm/solidity`: FHE operations
- `@zama-fhe/oracle-solidity`: Oracle integration

### Frontend Dependencies
- `@rainbow-me/rainbowkit`: Wallet connection
- `wagmi`: Ethereum hooks
- `viem`: Ethereum client
- `ethers`: Blockchain utilities
- `@zama-fhe/relayer-sdk`: FHE SDK
- `next`: React framework
- `react`: UI library
- `tailwindcss`: Styling

## 🔍 Important Paths

### Contract Artifacts
- Compiled: `artifacts/contracts/SalaryCompare.sol/`
- Deployed: `deployments/<network>/`
- Types: `types/`

### Frontend Build
- Development: `.next/`
- Production: `.next/`
- Static: `frontend/public/`

### Generated Files
- ABIs: `frontend/abi/`
- Types: `types/`

## 🎯 Entry Points

### Development
- **Backend**: `npx hardhat node`
- **Frontend**: `npm run dev:mock` (in frontend/)
- **Tests**: `npm test`

### Production
- **Deploy**: `npx hardhat deploy --network sepolia`
- **Frontend**: `npm run build && npm start` (in frontend/)

## 📝 Notes

- All TypeScript files use strict mode
- ESLint and Prettier configured for code quality
- Solhint configured for contract linting
- Git hooks not configured (optional)
- Environment files (.env) not tracked in git

## 🔄 Build Process

### Contracts
1. Compile Solidity → TypeScript types
2. Generate ABIs
3. Create deployment artifacts

### Frontend
1. TypeScript compilation
2. Next.js build
3. Asset optimization
4. Static generation

## 🚀 Quick Commands

```bash
# Development
npm install                    # Install dependencies
npx hardhat node              # Start local node
npx hardhat deploy            # Deploy contracts
cd frontend && npm run dev    # Start frontend

# Testing
npm test                      # Run all tests
npm run test:sepolia          # Test on Sepolia

# Production
npm run build                 # Build everything
npx hardhat deploy --network sepolia  # Deploy to Sepolia
cd frontend && npm run build  # Build frontend
```

---

**Last Updated**: November 2025  
**Version**: 1.0.0

