"use client";

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

export default function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    // Call stripe.confirmPayment securely
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? 'An unknown error occurred');
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
      <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Payment Details</h3>
        
        <PaymentElement className="mb-6" />
        
        {errorMessage && (
          <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full py-4 px-6 bg-black dark:bg-white text-white dark:text-black rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {isProcessing ? 'Processing Processing...' : `Pay £${(amount / 100).toFixed(2)}`}
        </button>
      </div>
    </form>
  );
}
