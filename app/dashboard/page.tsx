'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/navigation';

interface UserProfile {
  avatar_url?: string;
  username?: string;
}

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          router.push('/');
          return;
        }

        if (!session) {
          router.push('/');
          return;
        }

        const user = session.user;
        console.log('Session user:', user);

        // Get the provider-specific data
        const metadata = user.user_metadata;
        console.log('User metadata:', metadata);

        const profile = {
          avatar_url: metadata?.picture || metadata?.avatar_url,
          username: metadata?.name || metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]
        };

        console.log('Setting profile:', profile);
        setUserProfile(profile);
      } catch (error) {
        console.error('Error in checkSession:', error);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event);
      
      if (event === 'SIGNED_IN' && session?.user) {
        const user = session.user;
        const metadata = user.user_metadata;
        
        const profile = {
          avatar_url: metadata?.picture || metadata?.avatar_url,
          username: metadata?.name || metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]
        };
        
        setUserProfile(profile);
      } else if (event === 'SIGNED_OUT') {
        setUserProfile(null);
        router.push('/');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </main>
    );
  }

  if (!userProfile) {
    router.push('/');
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
          
          <div className="flex items-center bg-gray-800/50 rounded-full px-4 py-2 border border-gray-700">
            {userProfile.avatar_url ? (
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500">
                <Image
                  src={userProfile.avatar_url}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center ring-2 ring-purple-500">
                <span className="text-lg">?</span>
              </div>
            )}
            <span className="text-gray-200 font-medium ml-3">
              {userProfile.username}
            </span>
            <button
              onClick={handleSignOut}
              className="ml-4 text-gray-400 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl p-6 mb-8 backdrop-blur-sm border border-gray-700">
          <h2 className="text-xl text-gray-300 mb-2">Total Balance</h2>
          <p className="text-4xl font-bold">$1,234.56 USDC</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all">
            <h3 className="text-lg font-semibold mb-2">Send Payment</h3>
            <p className="text-gray-400">Transfer funds to another account</p>
          </button>
          
          <button className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all">
            <h3 className="text-lg font-semibold mb-2">Pay Bills</h3>
            <p className="text-gray-400">View and pay pending bills</p>
          </button>
          
          <button className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500 transition-all">
            <h3 className="text-lg font-semibold mb-2">Invest</h3>
            <p className="text-gray-400">Grow your wealth</p>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
              <div>
                <h3 className="font-medium">Electricity Bill</h3>
                <p className="text-sm text-gray-400">Paid to: Energy Corp</p>
              </div>
              <span className="text-red-400">-$85.00</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
              <div>
                <h3 className="font-medium">Investment Return</h3>
                <p className="text-sm text-gray-400">Staking Rewards</p>
              </div>
              <span className="text-green-400">+$12.45</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
              <div>
                <h3 className="font-medium">Deposit</h3>
                <p className="text-sm text-gray-400">From: Bank Transfer</p>
              </div>
              <span className="text-green-400">+$500.00</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 