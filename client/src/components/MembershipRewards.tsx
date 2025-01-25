import React from 'react';
import { Gift, Award, TrendingUp, Star, Shield, Clock, Trophy, Crown } from 'lucide-react';
import { mockUser, MEMBERSHIP_TIERS, CREDITS_FOR_ONE_HOUR } from '../data/mockData';

const MembershipRewards = () => {
  const nextTier = () => {
    const tiers = Object.entries(MEMBERSHIP_TIERS);
    const currentTierIndex = tiers.findIndex(([tier]) => tier === mockUser.membershipLevel);
    if (currentTierIndex < tiers.length - 1) {
      const nextTierData = tiers[currentTierIndex + 1];
      return {
        name: nextTierData[0],
        bookingsNeeded: nextTierData[1].minBookings - mockUser.bookingsCount
      };
    }
    return null;
  };

  const nextTierInfo = nextTier();
  const freeHoursAvailable = Math.floor(mockUser.totalCredits / CREDITS_FOR_ONE_HOUR);
  const progressToNextTier = nextTierInfo 
    ? ((mockUser.bookingsCount / nextTierInfo.bookingsNeeded) * 100).toFixed(0)
    : 100;

  const membershipColors = {
    Bronze: 'from-amber-500 to-amber-700',
    Silver: 'from-gray-400 to-gray-600',
    Gold: 'from-yellow-400 to-yellow-600',
    Platinum: 'from-purple-400 to-purple-600'
  };

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Membership Benefits
          </h2>
          <p className="text-xl text-gray-600">
            Unlock exclusive rewards and privileges
          </p>
        </div>

        {/* Current Status Card */}
        <div className={`bg-gradient-to-r ${membershipColors[mockUser.membershipLevel]} p-8 rounded-2xl shadow-xl text-white mb-12`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Crown size={40} className="text-yellow-300" />
              <div>
                <h3 className="text-2xl font-bold">{mockUser.membershipLevel} Member</h3>
                <p className="opacity-90">Enjoy {MEMBERSHIP_TIERS[mockUser.membershipLevel].creditMultiplier}x credit multiplier</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{mockUser.totalCredits}</div>
              <p className="opacity-90">Total Credits</p>
            </div>
          </div>

          {nextTierInfo && (
            <div className="bg-black/20 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span>Progress to {nextTierInfo.name}</span>
                <span>{progressToNextTier}%</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${progressToNextTier}%` }}
                ></div>
              </div>
              <p className="text-sm mt-2 opacity-90">
                {nextTierInfo.bookingsNeeded} more bookings to reach {nextTierInfo.name}
              </p>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="text-blue-600" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold">Free Hours</h4>
                <p className="text-3xl font-bold text-blue-600">{freeHoursAvailable}</p>
              </div>
            </div>
            <p className="text-gray-600">Available to redeem anytime</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold">Total Bookings</h4>
                <p className="text-3xl font-bold text-green-600">{mockUser.bookingsCount}</p>
              </div>
            </div>
            <p className="text-gray-600">Lifetime bookings made</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Gift className="text-purple-600" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold">Credits Per Booking</h4>
                <p className="text-3xl font-bold text-purple-600">
                  {MEMBERSHIP_TIERS[mockUser.membershipLevel].creditMultiplier * 100}
                </p>
              </div>
            </div>
            <p className="text-gray-600">Based on your current tier</p>
          </div>
        </div>

        {/* Membership Tiers */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold mb-8">Membership Tiers & Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(MEMBERSHIP_TIERS).map(([tier, { minBookings, creditMultiplier }]) => (
              <div 
                key={tier}
                className={`rounded-xl p-6 transform transition-all duration-300 ${
                  tier === mockUser.membershipLevel 
                    ? 'bg-gradient-to-br ' + membershipColors[tier] + ' text-white scale-105 shadow-lg' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Shield size={24} className={tier === mockUser.membershipLevel ? 'text-white' : 'text-gray-600'} />
                  <h4 className="text-lg font-semibold">{tier}</h4>
                </div>
                <div className="space-y-3">
                  <p className={`text-3xl font-bold ${tier === mockUser.membershipLevel ? 'text-white' : 'text-gray-900'}`}>
                    {creditMultiplier}x
                  </p>
                  <p className={tier === mockUser.membershipLevel ? 'text-white/90' : 'text-gray-600'}>
                    Credit Multiplier
                  </p>
                  <p className={tier === mockUser.membershipLevel ? 'text-white/90' : 'text-gray-600'}>
                    {minBookings}+ bookings required
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105">
            Book Now & Earn Credits
          </button>
          <p className="mt-4 text-gray-600">
            Every booking brings you closer to the next tier!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MembershipRewards;