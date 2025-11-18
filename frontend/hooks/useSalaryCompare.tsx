"use client";

import { ethers } from "ethers";
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { FhevmInstance } from "@/fhevm/fhevmTypes";
import { FhevmDecryptionSignature } from "@/fhevm/FhevmDecryptionSignature";
import { GenericStringStorage } from "@/fhevm/GenericStringStorage";

import { SalaryCompareAddresses } from "@/abi/SalaryCompareAddresses";
import { SalaryCompareABI } from "@/abi/SalaryCompareABI";

export type ClearValueType = {
  handle: string;
  clear: string | bigint | boolean;
};

type SalaryCompareInfoType = {
  abi: typeof SalaryCompareABI.abi;
  address?: `0x${string}`;
  chainId?: number;
  chainName?: string;
};

function getSalaryCompareByChainId(
  chainId: number | undefined
): SalaryCompareInfoType {
  if (!chainId) {
    return { abi: SalaryCompareABI.abi };
  }

  const entry =
    SalaryCompareAddresses[chainId.toString() as keyof typeof SalaryCompareAddresses];

  if (!("address" in entry) || entry.address === ethers.ZeroAddress) {
    return { abi: SalaryCompareABI.abi, chainId };
  }

  return {
    address: entry?.address as `0x${string}` | undefined,
    chainId: entry?.chainId ?? chainId,
    chainName: entry?.chainName,
    abi: SalaryCompareABI.abi,
  };
}

export const useSalaryCompare = (parameters: {
  instance: FhevmInstance | undefined;
  fhevmDecryptionSignatureStorage: GenericStringStorage;
  eip1193Provider: ethers.Eip1193Provider | undefined;
  chainId: number | undefined;
  ethersSigner: ethers.JsonRpcSigner | undefined;
  ethersReadonlyProvider: ethers.ContractRunner | undefined;
  sameChain: RefObject<(chainId: number | undefined) => boolean>;
  sameSigner: RefObject<
    (ethersSigner: ethers.JsonRpcSigner | undefined) => boolean
  >;
}) => {
  const {
    instance,
    fhevmDecryptionSignatureStorage,
    chainId,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
  } = parameters;

  // States
  const [mySalary, setMySalary] = useState<string | undefined>(undefined);
  const [clearMySalary, setClearMySalary] = useState<ClearValueType | undefined>(undefined);
  const [comparisonResult, setComparisonResult] = useState<string | undefined>(undefined);
  const [clearComparisonResult, setClearComparisonResult] = useState<ClearValueType | undefined>(undefined);
  const [hasSalary, setHasSalary] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [isDecryptingSalary, setIsDecryptingSalary] = useState<boolean>(false);
  const [isDecryptingComparison, setIsDecryptingComparison] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [comparisonAddress, setComparisonAddress] = useState<string>("");
  const [retryCount, setRetryCount] = useState<number>(0);
  const [refreshRetryCount, setRefreshRetryCount] = useState<number>(0);

  // State change detection and auto-reset
  const prevMySalaryRef = useRef<string | undefined>(undefined);
  const prevComparisonResultRef = useRef<string | undefined>(undefined);

  // Refs
  const salaryCompareRef = useRef<SalaryCompareInfoType | undefined>(undefined);
  const isSubmittingRef = useRef<boolean>(isSubmitting);
  const isComparingRef = useRef<boolean>(isComparing);
  const isDecryptingSalaryRef = useRef<boolean>(isDecryptingSalary);
  const isDecryptingComparisonRef = useRef<boolean>(isDecryptingComparison);
  const clearMySalaryRef = useRef<ClearValueType>(undefined);
  const clearComparisonResultRef = useRef<ClearValueType>(undefined);

  // Contract info
  const salaryCompare = useMemo(() => {
    const c = getSalaryCompareByChainId(chainId);
    salaryCompareRef.current = c;

    if (!c.address) {
      setMessage(`SalaryCompare deployment not found for chainId=${chainId}.`);
    }

    return c;
  }, [chainId]);

  const isDeployed = useMemo(() => {
    if (!salaryCompare) {
      return undefined;
    }
    return Boolean(salaryCompare.address) && salaryCompare.address !== ethers.ZeroAddress;
  }, [salaryCompare]);

  // Check if user has submitted salary
  const checkHasSalary = useCallback(() => {
    if (!salaryCompare.address || !ethersReadonlyProvider || !ethersSigner) {
      return;
    }

    const contract = new ethers.Contract(
      salaryCompare.address,
      salaryCompare.abi,
      ethersReadonlyProvider
    );

    contract
      .hasSalary(ethersSigner.address)
      .then((has: boolean) => {
        setHasSalary(has);
        if (has) {
          refreshMySalary();
        }
      })
      .catch((e: Error) => {
        setMessage("Failed to check salary status: " + e.message);
      });
  }, [salaryCompare.address, ethersReadonlyProvider, ethersSigner]);

  useEffect(() => {
    checkHasSalary();
  }, [checkHasSalary]);

  // State change detection and auto-reset
  useEffect(() => {
    if (prevMySalaryRef.current !== mySalary) {
      // My salary changed, clear related decryption state
      if (prevMySalaryRef.current && clearMySalaryRef.current?.handle === prevMySalaryRef.current) {
        setClearMySalary(undefined);
        clearMySalaryRef.current = undefined;
        setMessage("Salary data updated. Previous decryption cleared.");
      }
      prevMySalaryRef.current = mySalary;
    }
  }, [mySalary]);

  useEffect(() => {
    if (prevComparisonResultRef.current !== comparisonResult) {
      // Comparison result changed, clear related decryption state
      if (prevComparisonResultRef.current && clearComparisonResultRef.current?.handle === prevComparisonResultRef.current) {
        setClearComparisonResult(undefined);
        clearComparisonResultRef.current = undefined;
        setMessage("Comparison data updated. Previous decryption cleared.");
      }
      prevComparisonResultRef.current = comparisonResult;
    }
  }, [comparisonResult]);

  // Refresh my salary
  const refreshMySalary = useCallback(async () => {
    if (!salaryCompare.address || !ethersReadonlyProvider || !ethersSigner) {
      setMySalary(undefined);
      return;
    }

    const contract = new ethers.Contract(
      salaryCompare.address,
      salaryCompare.abi,
      ethersReadonlyProvider
    );

    try {
      const has = await contract.hasSalary(ethersSigner.address);
      setHasSalary(has);

      if (!has) {
        setMySalary(undefined);
        setMessage("You have not submitted a salary yet. Please submit your encrypted salary first.");
        return;
      }

      const value: string = await contract.getMySalary();
      setMySalary(value);

      // Auto-decrypt if possible
      if (value && value !== ethers.ZeroHash) {
        setMessage("Salary retrieved successfully. You can now decrypt it.");
      }
    } catch (error) {
      console.error("Error refreshing salary:", error);

      // Provide specific error messages based on error type
      const errorMessage = error instanceof Error ? error.message : String(error);

      if ((errorMessage.includes("network") || errorMessage.includes("connection")) && refreshRetryCount < 2) {
        // Retry network errors up to 2 times
        setRefreshRetryCount(prev => prev + 1);
        setMessage(`Network error: Retrying connection (${refreshRetryCount + 1}/3)...`);

        setTimeout(() => {
          refreshMySalary();
        }, 2000); // Wait 2 seconds before retry
        return;
      } else if (errorMessage.includes("timeout") && refreshRetryCount < 1) {
        // Retry timeout errors once
        setRefreshRetryCount(prev => prev + 1);
        setMessage(`Request timeout: Retrying (${refreshRetryCount + 1}/2)...`);

        setTimeout(() => {
          refreshMySalary();
        }, 3000); // Wait 3 seconds before retry
        return;
      }

      // Final error messages
      if (errorMessage.includes("network") || errorMessage.includes("connection")) {
        setMessage("Network error: Unable to connect to blockchain after retries. Please check your internet connection.");
      } else if (errorMessage.includes("timeout")) {
        setMessage("Request timeout: The blockchain network is busy. Please try again later.");
      } else if (errorMessage.includes("not submitted")) {
        setMessage("No salary found: You haven't submitted your salary yet.");
      } else {
        setMessage("Failed to retrieve salary information. Please try again or contact support if the problem persists.");
      }

      setMySalary(undefined);
      setHasSalary(false);
      setRefreshRetryCount(0); // Reset retry count on final failure
    }
  }, [salaryCompare.address, salaryCompare.abi, ethersReadonlyProvider, ethersSigner]);

  // Submit salary
  const submitSalary = useCallback(
    (salary: number) => {
      if (isSubmittingRef.current) {
        return;
      }

      if (!salaryCompare.address || !instance || !ethersSigner || salary <= 0) {
        return;
      }

      const thisChainId = chainId;
      const thisContractAddress = salaryCompare.address;
      const thisEthersSigner = ethersSigner;
      const thisContract = new ethers.Contract(
        thisContractAddress,
        salaryCompare.abi,
        thisEthersSigner
      );

      isSubmittingRef.current = true;
      setIsSubmitting(true);
      setMessage(`Submitting salary...`);

      const run = async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));

        const isStale = () =>
          thisContractAddress !== salaryCompareRef.current?.address ||
          !sameChain.current(thisChainId) ||
          !sameSigner.current(thisEthersSigner);

        try {
          const input = instance.createEncryptedInput(
            thisContractAddress,
            thisEthersSigner.address
          );
          input.add32(salary);

          const enc = await input.encrypt();

          if (isStale()) {
            setMessage(`Submission cancelled`);
            return;
          }

          setMessage(`Sending transaction...`);

          const tx: ethers.TransactionResponse = await thisContract.submitSalary(
            enc.handles[0],
            enc.inputProof
          );

          setMessage(`Waiting for transaction: ${tx.hash}...`);

          const receipt = await tx.wait();

          setMessage(`Salary submitted successfully! Status: ${receipt?.status}`);

          if (isStale()) {
            return;
          }

          setHasSalary(true);
          refreshMySalary();
        } catch (e) {
          setMessage(`Failed to submit salary: ${(e as Error).message}`);
        } finally {
          isSubmittingRef.current = false;
          setIsSubmitting(false);
        }
      };

      run();
    },
    [
      ethersSigner,
      salaryCompare.address,
      salaryCompare.abi,
      instance,
      chainId,
      refreshMySalary,
      sameChain,
      sameSigner,
    ]
  );

  // Decrypt my salary
  const decryptMySalary = useCallback(() => {
    if (isDecryptingSalaryRef.current) {
      return;
    }

    if (!salaryCompare.address || !instance || !ethersSigner || !mySalary) {
      return;
    }

    // Check for already decrypted or stale data
    if (mySalary === clearMySalaryRef.current?.handle) {
      setMessage("Salary already decrypted.");
      return;
    }

    // Additional state synchronization check
    if (clearMySalary && clearMySalary.handle === mySalary) {
      setMessage("Salary decryption already completed.");
      return;
    }

    if (mySalary === ethers.ZeroHash) {
      setClearMySalary({ handle: mySalary, clear: BigInt(0) });
      clearMySalaryRef.current = { handle: mySalary, clear: BigInt(0) };
      return;
    }

    const thisChainId = chainId;
    const thisContractAddress = salaryCompare.address;
    const thisSalaryHandle = mySalary;
    const thisEthersSigner = ethersSigner;

    isDecryptingSalaryRef.current = true;
    setIsDecryptingSalary(true);
    setMessage("Decrypting salary...");

    const run = async () => {
      const isStale = () =>
        thisContractAddress !== salaryCompareRef.current?.address ||
        !sameChain.current(thisChainId) ||
        !sameSigner.current(thisEthersSigner);

      try {
        const sig: FhevmDecryptionSignature | null =
          await FhevmDecryptionSignature.loadOrSign(
            instance,
            [salaryCompare.address as `0x${string}`],
            ethersSigner,
            fhevmDecryptionSignatureStorage
          );

        if (!sig) {
          setMessage("Unable to build FHEVM decryption signature");
          return;
        }

        if (isStale()) {
          setMessage("Decryption cancelled");
          return;
        }

        const res = await instance.userDecrypt(
          [{ handle: thisSalaryHandle, contractAddress: thisContractAddress }],
          sig.privateKey,
          sig.publicKey,
          sig.signature,
          sig.contractAddresses,
          sig.userAddress,
          sig.startTimestamp,
          sig.durationDays
        );

        if (isStale()) {
          return;
        }

        setClearMySalary({ handle: thisSalaryHandle, clear: res[thisSalaryHandle] });
        clearMySalaryRef.current = {
          handle: thisSalaryHandle,
          clear: res[thisSalaryHandle],
        };

        setMessage(`Your salary: $${res[thisSalaryHandle].toString()}`);
        setRetryCount(0); // Reset retry count on success
      } catch (e) {
        const error = e as Error;
        if (retryCount < 2) {
          setRetryCount(prev => prev + 1);
          setMessage(`Decryption failed, retrying... (${retryCount + 1}/3)`);
          setTimeout(() => run(), 1000); // Retry after 1 second
          return;
        }
        setMessage(`Decryption failed after ${retryCount + 1} attempts: ${error.message}`);
        setRetryCount(0);
      } finally {
        isDecryptingSalaryRef.current = false;
        setIsDecryptingSalary(false);
      }
    };

    run();
  }, [
    fhevmDecryptionSignatureStorage,
    ethersSigner,
    salaryCompare.address,
    instance,
    mySalary,
    chainId,
    sameChain,
    sameSigner,
  ]);

  // Compare salaries
  const compareSalaries = useCallback(
    (otherAddress: string) => {
      if (isComparingRef.current) {
        return;
      }

      if (!salaryCompare.address || !instance || !ethersSigner || !otherAddress) {
        return;
      }

      // Multi-layer address validation
      if (!otherAddress || typeof otherAddress !== 'string') {
        setMessage("Address is required and must be a valid string");
        return;
      }

      // Check if address starts with 0x
      if (!otherAddress.startsWith('0x')) {
        setMessage("Ethereum address must start with '0x'");
        return;
      }

      // Check address length (42 characters for Ethereum addresses)
      if (otherAddress.length !== 42) {
        setMessage("Ethereum address must be exactly 42 characters long");
        return;
      }

      // Use ethers library for comprehensive validation
      if (!ethers.isAddress(otherAddress)) {
        setMessage("Invalid Ethereum address format. Please check and try again.");
        return;
      }

      // Prevent self-comparison
      if (otherAddress.toLowerCase() === ethersSigner.address.toLowerCase()) {
        setMessage("You cannot compare your salary with yourself");
        return;
      }

      const thisChainId = chainId;
      const thisContractAddress = salaryCompare.address;
      const thisEthersSigner = ethersSigner;
      const thisContract = new ethers.Contract(
        thisContractAddress,
        salaryCompare.abi,
        thisEthersSigner
      );

      isComparingRef.current = true;
      setIsComparing(true);
      setComparisonAddress(otherAddress);
      setMessage(`Comparing salaries...`);

      const run = async () => {
        const isStale = () =>
          thisContractAddress !== salaryCompareRef.current?.address ||
          !sameChain.current(thisChainId) ||
          !sameSigner.current(thisEthersSigner);

        try {
          setMessage(`Sending comparison request...`);

          const tx: ethers.TransactionResponse = await thisContract.compareSalaries(otherAddress);

          setMessage(`Waiting for transaction: ${tx.hash}...`);

          const receipt = await tx.wait();

          setMessage(`Comparison completed! Status: ${receipt?.status}`);

          if (isStale()) {
            return;
          }

          // Get comparison result
          const result = await thisContract.getComparisonResult(
            thisEthersSigner.address,
            otherAddress
          );
          setComparisonResult(result);
        } catch (e) {
          setMessage(`Comparison failed: ${(e as Error).message}`);
        } finally {
          isComparingRef.current = false;
          setIsComparing(false);
        }
      };

      run();
    },
    [
      ethersSigner,
      salaryCompare.address,
      salaryCompare.abi,
      instance,
      chainId,
      sameChain,
      sameSigner,
    ]
  );

  // Decrypt comparison result
  const decryptComparisonResult = useCallback(() => {
    if (isDecryptingComparisonRef.current) {
      return;
    }

    if (!salaryCompare.address || !instance || !ethersSigner || !comparisonResult) {
      return;
    }

    // Check for already decrypted or stale data
    if (comparisonResult === clearComparisonResultRef.current?.handle) {
      setMessage("Comparison result already decrypted.");
      return;
    }

    // Additional state synchronization check
    if (clearComparisonResult && clearComparisonResult.handle === comparisonResult) {
      setMessage("Comparison result decryption already completed.");
      return;
    }

    const thisChainId = chainId;
    const thisContractAddress = salaryCompare.address;
    const thisResultHandle = comparisonResult;
    const thisEthersSigner = ethersSigner;

    isDecryptingComparisonRef.current = true;
    setIsDecryptingComparison(true);
    setMessage("Decrypting comparison result...");

    const run = async () => {
      const isStale = () =>
        thisContractAddress !== salaryCompareRef.current?.address ||
        !sameChain.current(thisChainId) ||
        !sameSigner.current(thisEthersSigner);

      try {
        const sig: FhevmDecryptionSignature | null =
          await FhevmDecryptionSignature.loadOrSign(
            instance,
            [salaryCompare.address as `0x${string}`],
            ethersSigner,
            fhevmDecryptionSignatureStorage
          );

        if (!sig) {
          setMessage("Unable to build FHEVM decryption signature");
          return;
        }

        if (isStale()) {
          setMessage("Decryption cancelled");
          return;
        }

        const res = await instance.userDecrypt(
          [{ handle: thisResultHandle, contractAddress: thisContractAddress }],
          sig.privateKey,
          sig.publicKey,
          sig.signature,
          sig.contractAddresses,
          sig.userAddress,
          sig.startTimestamp,
          sig.durationDays
        );

        if (isStale()) {
          return;
        }

        setClearComparisonResult({ handle: thisResultHandle, clear: res[thisResultHandle] });
        clearComparisonResultRef.current = {
          handle: thisResultHandle,
          clear: res[thisResultHandle],
        };

        const resultText = res[thisResultHandle]
          ? "You earn MORE than the other person!"
          : "You earn LESS than the other person!";
        setMessage(resultText);
      } catch (e) {
        setMessage(`Decryption failed: ${(e as Error).message}`);
      } finally {
        isDecryptingComparisonRef.current = false;
        setIsDecryptingComparison(false);
      }
    };

    run();
  }, [
    fhevmDecryptionSignatureStorage,
    ethersSigner,
    salaryCompare.address,
    instance,
    comparisonResult,
    chainId,
    sameChain,
    sameSigner,
  ]);

  return {
    contractAddress: salaryCompare.address,
    isDeployed,
    hasSalary,
    mySalary,
    clearMySalary: clearMySalary?.clear,
    isSalaryDecrypted: mySalary && mySalary === clearMySalary?.handle,
    comparisonResult,
    clearComparisonResult: clearComparisonResult?.clear,
    isComparisonDecrypted: comparisonResult && comparisonResult === clearComparisonResult?.handle,
    comparisonAddress,
    isSubmitting,
    isComparing,
    isDecryptingSalary,
    isDecryptingComparison,
    message,
    canSubmit: salaryCompare.address && instance && ethersSigner && !isSubmitting,
    canCompare: salaryCompare.address && instance && ethersSigner && hasSalary && !isComparing,
    canDecryptSalary: salaryCompare.address && instance && ethersSigner && mySalary && mySalary !== ethers.ZeroHash && !isDecryptingSalary && mySalary !== clearMySalary?.handle,
    canDecryptComparison: salaryCompare.address && instance && ethersSigner && comparisonResult && !isDecryptingComparison && comparisonResult !== clearComparisonResult?.handle,
    submitSalary,
    compareSalaries,
    decryptMySalary,
    decryptComparisonResult,
    refreshMySalary,
    checkHasSalary,
  };
};

