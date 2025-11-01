import { SalaryCompareDemo } from "@/components/SalaryCompareDemo";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 items-center sm:items-start w-full">
          <SalaryCompareDemo />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Encrypted Salary Compare</h3>
              <p className="text-gray-600 text-sm">
                Private salary comparison using Fully Homomorphic Encryption (FHE).
                Compare salaries without revealing actual amounts.
              </p>
            </div>

            <div>
              <h4 className="text-md font-semibold text-gray-800 mb-4">Resources</h4>
              <div className="space-y-2 text-sm">
                <a
                  href="https://docs.zama.ai/fhevm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Zama FHEVM Docs
                </a>
                <a
                  href="https://www.rainbowkit.com/docs/introduction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Rainbow Kit Docs
                </a>
                <a
                  href="https://github.com/AnnaLucia5/prism-vault-light"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View on GitHub
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-md font-semibold text-gray-800 mb-4">Live Demo</h4>
              <div className="space-y-2 text-sm">
                <a
                  href="https://pro5-psi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors font-medium"
                >
                  🌐 Live Application
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Deployed</span>
                </a>
                <div className="text-gray-600">
                  Contract: <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">0x76bD869D7F8Dd7DBbAcF219a3F5c17C25f9d7089</code>
                </div>
                <div className="text-gray-600 text-xs">
                  Sepolia Testnet
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>Built with ❤️ using Zama FHEVM • Licensed under BSD-3-Clause-Clear</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
