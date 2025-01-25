import React from 'react';
import { Gift, Award, TrendingUp, Star } from 'lucide-react';
import { mockUser, MEMBERSHIP_TIERS, CREDITS_FOR_ONE_HOUR } from '../data/mockData';

const RewardsDisplay = () => {
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

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Your Rewards</h3>
          <p className="text-gray-600">Earn credits and unlock exclusive benefits</p>
        </div>
        <div className="flex items-center gap-2">
          <Gift className="text-green-600" size={24} />
          <span className="text-xl font-bold text-green-600">{mockUser.totalCredits} Credits</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Award className="text-green-600" size={24} />
            <h4 className="text-lg font-semibold">Membership Level</h4>
          </div>
          <p className="text-3xl font-bold text-green-700">{mockUser.membershipLevel}</p>
          <p className="text-sm text-gray-600 mt-2">
            {MEMBERSHIP_TIERS[mockUser.membershipLevel].creditMultiplier}x credit multiplier
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="text-blue-600" size={24} />
            <h4 className="text-lg font-semibold">Total Bookings</h4>
          </div>
          <p className="text-3xl font-bold text-blue-700">{mockUser.bookingsCount}</p>
          {nextTierInfo && (
            <p className="text-sm text-gray-600 mt-2">
              {nextTierInfo.bookingsNeeded} more to reach {nextTierInfo.name}
            </p>
          )}
        </div>

        <div className="bg-purple-50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Star className="text-purple-600" size={24} />
            <h4 className="text-lg font-semibold">Free Hours</h4>
          </div>
          <p className="text-3xl font-bold text-purple-700">{freeHoursAvailable}</p>
          <p className="text-sm text-gray-600 mt-2">
            Available to redeem
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6">
        <h4 className="text-lg font-semibold mb-4">Membership Benefits</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(MEMBERSHIP_TIERS).map(([tier, { minBookings, creditMultiplier }]) => (
            <div 
              key={tier}
              className={`flex items-center justify-between p-4 rounded-lg ${
                tier === mockUser.membershipLevel 
                  ? 'bg-white shadow-md border-2 border-green-500' 
                  : 'bg-white/50'
              }`}
            >
              <div>
                <p className="font-semibold">{tier}</p>
                <p className="text-sm text-gray-600">{minBookings}+ bookings</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">{creditMultiplier}x</p>
                <p className="text-sm text-gray-600">credits</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardsDisplay;