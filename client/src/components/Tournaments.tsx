import React from 'react';
import { Trophy, Calendar, Users, DollarSign } from 'lucide-react';
import { upcomingTournaments } from '../data/mockData';

const Tournaments = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Tournaments
          </h2>
          <p className="text-xl text-gray-600">
            Join our competitive tournaments and win exciting prizes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingTournaments.map((tournament) => (
            <div 
              key={tournament.id}
              className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100"
            >
              <div className="bg-green-600 text-white p-6">
                <h3 className="text-2xl font-bold mb-2">{tournament.name}</h3>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{tournament.startDate} to {tournament.endDate}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Users size={20} className="text-gray-500" />
                      <span className="text-gray-600">Teams</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">{tournament.currentTeams}/{tournament.maxTeams}</span>
                      <div className="w-48 h-2 bg-gray-200 rounded-full mt-1">
                        <div 
                          className="h-full bg-green-600 rounded-full"
                          style={{ width: `${(tournament.currentTeams / tournament.maxTeams) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign size={20} className="text-gray-500" />
                      <span className="text-gray-600">Registration Fee</span>
                    </div>
                    <span className="font-semibold">Rs. {tournament.registrationFee}</span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Trophy size={20} className="text-yellow-500" />
                    Prize Pool
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">1st Place</span>
                      <span className="font-semibold">{tournament.prizes.first}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">2nd Place</span>
                      <span className="font-semibold">{tournament.prizes.second}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">3rd Place</span>
                      <span className="font-semibold">{tournament.prizes.third}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                  Register Team
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tournaments;