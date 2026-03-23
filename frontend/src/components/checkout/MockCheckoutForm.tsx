"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MockCheckoutForm({ amount }: { amount: number }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleMockPay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment delay
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/'); // Go home or to a success page
      }, 2000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto p-12 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-green-100 dark:border-green-900/30 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-display">Payment Successful</h3>
        <p className="text-gray-500 dark:text-gray-400">Thank you for your order. Redirecting you...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30 flex items-center gap-4 animate-pulse">
        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shrink-0 font-bold italic">!</div>
        <p className="text-xs text-blue-700 dark:text-blue-300 font-medium leading-relaxed">
          <strong className="block uppercase tracking-wider mb-0.5 text-[10px]">Developer Demo Mode</strong>
          Stripe API keys are not configured. This is a secure simulation for UI testing.
        </p>
      </div>

      <form onSubmit={handleMockPay} className="space-y-6">
        <div className="p-8 bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-xl border border-gray-100 dark:border-white/5 relative overflow-hidden">
          {/* Decorative Gradient Background */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
          
          <h3 className="text-xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
            Payment Details
          </h3>
          
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Card Number</label>
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 text-gray-400 font-mono tracking-widest flex justify-between items-center transition-all hover:border-gray-300 dark:hover:border-white/20">
                <span>••••  ••••  ••••  4242</span>
                <div className="flex gap-1.5 opacity-40">
                  <div className="w-7 h-4 bg-blue-600 rounded-sm" />
                  <div className="w-7 h-4 bg-orange-500 rounded-sm" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Expiry Date</label>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 text-gray-400 font-mono transition-all hover:border-gray-300 dark:hover:border-white/20">
                  MM / YY
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">CVC</label>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 text-gray-400 font-mono transition-all hover:border-gray-300 dark:hover:border-white/20">
                  •••
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full mt-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-xs disabled:opacity-50 transition-all hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Authorizing...
              </span>
            ) : `Authorize £${(amount / 100).toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
}
