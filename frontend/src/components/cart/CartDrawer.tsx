"use client";

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeItem, updateQuantity, cartTotal, cartCount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 animate-in fade-in"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform transition duration-500 ease-in-out animate-in slide-in-from-right sm:duration-700">
          <div className="flex h-full flex-col bg-white shadow-2xl dark:bg-[#0a0a0a]">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-8 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Your Bag</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">{cartCount} Items Selected</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-8 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 italic">"Style waits for no one. Start filling your bag."</p>
                  <button 
                    onClick={onClose}
                    className="text-[11px] font-black uppercase tracking-widest text-[#5bbfe8] hover:text-[#4aaed6] transition-colors underline underline-offset-8"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 relative">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-contain p-2 group-hover:scale-110 transition-transform"
                          unoptimized
                        />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between text-sm font-bold text-gray-900 dark:text-white">
                          <h3 className="uppercase tracking-tight truncate max-w-[150px]">{item.name}</h3>
                          <p className="ml-4 tabular-nums">£{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        
                        <div className="mt-4 flex flex-1 items-end justify-between">
                          <div className="flex items-center border border-gray-100 dark:border-white/10 rounded-lg overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-400 transition-colors"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-xs font-bold tabular-nums dark:text-white border-x border-gray-100 dark:border-white/10">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-400 transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-800 px-8 py-10 space-y-6 bg-gray-50/50 dark:bg-white/[0.02]">
                <div className="flex justify-between text-base font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                  <span>Subtotal</span>
                  <span className="tabular-nums">£{cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shipping & taxes calculated at checkout.</p>
                <div className="pt-2">
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="flex items-center justify-center rounded-2xl bg-black dark:bg-white px-6 py-5 text-[13px] font-black uppercase tracking-[0.2em] text-white dark:text-black shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
