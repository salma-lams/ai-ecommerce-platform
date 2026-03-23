'use client';

import { useState } from 'react';

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hidden button to toggle cart from external, typically managed by global state (Zustand/Context) */}
      <button 
        id="toggle-cart" 
        className="hidden" 
        onClick={() => setIsOpen(!isOpen)}
        aria-hidden="true"
      ></button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-[70] w-full max-w-md transform bg-white shadow-2xl transition-transform duration-500 ease-in-out dark:bg-gray-950 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Bag</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" className="text-gray-300 dark:text-gray-700 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">Your bag is empty.</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Add items to get started.</p>
            <button 
              onClick={() => setIsOpen(false)}
              className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Continue Shopping
            </button>
          </div>

          <div className="border-t border-gray-200 p-6 dark:border-gray-800">
            <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-100 mb-4">
              <p>Subtotal</p>
              <p>$0.00</p>
            </div>
            <a href="/checkout" className="flex w-full items-center justify-center rounded-full bg-black px-6 py-4 text-base font-semibold text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Checkout
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
