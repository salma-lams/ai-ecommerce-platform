"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800" style={{background: '#f3faff'}}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Image 
              src="/images/logo1.png" 
              alt="ChicBoutiq" 
              width={110} 
              height={50} 
              
            />
          </Link>
        </div>

        {/* Navigation Links - Centered */}
        <div className="hidden md:flex items-center gap-10 text-[13px] font-bold uppercase tracking-[0.15em] text-gray-900 dark:text-white">
          <Link href="/" className="hover:text-[#5bbfe8] transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5bbfe8] transition-all group-hover:w-full" />
          </Link>
          <Link href="/products" className="hover:text-[#5bbfe8] transition-colors relative group">
            Shop
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5bbfe8] transition-all group-hover:w-full" />
          </Link>
          <Link href="/categories" className="hover:text-[#5bbfe8] transition-colors relative group">
            Categories
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5bbfe8] transition-all group-hover:w-full" />
          </Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <button className="text-gray-900 dark:text-white hover:text-[#5bbfe8] transition-colors p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          
          {/* User Account */}
          <Link href="/admin" className="hidden sm:block text-gray-900 dark:text-white hover:text-[#5bbfe8] transition-colors p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </Link>
          
          {/* Wishlist */}
          <Link href="/wishlist" className="hidden sm:block text-gray-900 dark:text-white hover:text-[#E8611A] transition-colors p-1">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </Link>
          
          {/* Bag / Cart */}
          <button 
            className="group relative flex items-center p-1"
            onClick={() => document.getElementById('toggle-cart')?.click()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white group-hover:text-[#5bbfe8] transition-colors"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#E8611A] text-[9px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-black">
              2
            </span>
          </button>

          {/* Mobile Menu */}
          <button className="md:hidden text-gray-900 dark:text-white hover:text-[#5bbfe8] transition-colors p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>

      </div>
    </nav>
  );
}

