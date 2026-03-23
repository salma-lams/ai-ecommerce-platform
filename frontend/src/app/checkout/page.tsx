"use client";

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '@/lib/api';
import CheckoutForm from '@/components/checkout/CheckoutForm';

// Initialize Stripe outside component render to avoid recreating the object
// Make sure NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is in your frontend .env
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializePayment() {
      // Mocking a cart with 1 item for testing
      const cartItems = [{ product_id: "1", quantity: 1 }];
      
      const data = await createPaymentIntent(cartItems);
      
      if (data && data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        setError("Could not initialize secure payment connection.");
      }
    }

    initializePayment();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3faff] dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl tracking-tight">
            Secure Checkout
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Complete your order with end-to-end encryption.
          </p>
        </div>

        {error ? (
          <div className="max-w-md mx-auto p-4 bg-red-50 text-red-600 rounded-lg text-center font-medium">
            {error}
          </div>
        ) : !clientSecret ? (
          <div className="flex justify-center my-20 animate-pulse text-gray-400 font-semibold tracking-widest text-sm uppercase">
            Initializing Payment Gateway...
          </div>
        ) : (
          <Elements 
            stripe={stripePromise} 
            options={{ 
              clientSecret,
              appearance: {
                theme: 'flat',
                variables: {
                  colorPrimary: '#000000',
                  colorBackground: '#ffffff',
                  colorText: '#30313d',
                  colorDanger: '#df1b41',
                  spacingUnit: '4px',
                  borderRadius: '8px',
                }
              }
            }}
          >
            <CheckoutForm amount={9900} />
          </Elements>
        )}
        
      </div>
    </div>
  );
}
