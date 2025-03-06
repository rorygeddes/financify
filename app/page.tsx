'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLaunchApp = async () => {
    setIsLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      router.push('/dashboard');
    } else {
      router.push('/register');
    }
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Financify
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          The future of financial management. Pay bills, invest, and manage your money - all in one place.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
          <div className="p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all">
            <h3 className="text-xl font-semibold mb-2">Easy Payments</h3>
            <p className="text-gray-400">Pay bills, send money, and manage transactions with just a few clicks.</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all">
            <h3 className="text-xl font-semibold mb-2">Smart Investing</h3>
            <p className="text-gray-400">Invest your money easily and track your investments in real-time.</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all">
            <h3 className="text-xl font-semibold mb-2">Bill Management</h3>
            <p className="text-gray-400">Never miss a payment with our automated bill tracking system.</p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all">
            <h3 className="text-xl font-semibold mb-2">Secure & Fast</h3>
            <p className="text-gray-400">Built on blockchain technology for maximum security and transparency.</p>
          </div>
        </div>

        <div className="mt-12 space-y-4 md:space-y-0 md:space-x-4">
          <button 
            onClick={handleLaunchApp}
            disabled={isLoading}
            className="block w-full md:w-auto md:inline-block px-8 py-4 text-lg bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:opacity-90 transition-opacity duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Launch App'}
          </button>
          <Link 
            href="/register" 
            className="block w-full md:w-auto md:inline-block px-8 py-4 text-lg border border-purple-500 rounded-full hover:bg-purple-500/10 transition-all duration-300"
          >
            Register Now
          </Link>
        </div>
      </div>
    </main>
  );
}
