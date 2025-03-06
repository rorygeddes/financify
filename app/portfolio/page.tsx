import React from 'react';
import Link from 'next/link';

export default function Portfolio() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          My Ethereum Portfolio
        </h1>
        <div className="mt-8 space-y-4">
          <p className="text-lg text-gray-300">
            Welcome to my Ethereum portfolio. Here you'll find information about my blockchain projects and activities.
          </p>
          {/* Add your portfolio content here */}
        </div>
        <div className="mt-8">
          <Link 
            href="/" 
            className="inline-block px-8 py-4 text-lg bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:opacity-90 transition-opacity duration-300 shadow-lg hover:shadow-xl"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
} 