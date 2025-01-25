import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CreditCard, AlertCircle, Phone, User, Gift } from 'lucide-react';
import { court, generateTimeSlots, type TimeSlot, mockUser, CREDIT_PER_BOOKING, CREDITS_FOR_ONE_HOUR, MEMBERSHIP_TIERS } from '../data/mockData';

const BookingSystem = () => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('60');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [useCredits, setUseCredits] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setIsLoading(true);
      setTimeout(() => {
        setTimeSlots(generateTimeSlots(selectedDate));
        setIsLoading(false);
      }, 500);
    }
  }, [selectedDate]);

  const calculateCreditsEarned = () => {
    const baseCredits = CREDIT_PER_BOOKING;
    const multiplier = MEMBERSHIP_TIERS[mockUser.membershipLevel].creditMultiplier;
    return Math.round(baseCredits * multiplier);
  };

  const calculateTotal = () => {
    const basePrice = (court.hourlyRate * parseInt(selectedDuration)) / 60;
    if (useCredits) {
      const creditsNeeded = (CREDITS_FOR_ONE_HOUR * parseInt(selectedDuration)) / 60;
      if (mockUser.totalCredits >= creditsNeeded) {
        return 0;
      }
    }
    return basePrice;
  };

  const handleBooking = () => {
    if (bookingStep === 1) {
      if (!customerName || !phoneNumber) {
        alert('Please fill in your details');
        return;
      }
      setBookingStep(2);
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const creditsEarned = calculateCreditsEarned();
      alert(`Booking successful! You've earned ${creditsEarned} credits. Please complete the payment within 15 minutes to confirm your slot.`);
      setIsLoading(false);
      setCustomerName('');
      setPhoneNumber('');
      setSelectedDate('');
      setSelectedTime('');
      setSelectedDuration('60');
      setUseCredits(false);
      setBookingStep(1);
    }, 1000);
  };

  const canUseCredits = () => {
    const creditsNeeded = (CREDITS_FOR_ONE_HOUR * parseInt(selectedDuration)) / 60;
    return mockUser.totalCredits >= creditsNeeded;
  };

  const today = new Date().toISOString().split('T')[0];

  const renderTimeSlots = () => {
    const timeGroups = [
      { label: 'Morning', slots: timeSlots.filter(slot => parseInt(slot.time.split(':')[0]) >= 6 && parseInt(slot.time.split(':')[0]) < 12) },
      { label: 'Afternoon', slots: timeSlots.filter(slot => parseInt(slot.time.split(':')[0]) >= 12 && parseInt(slot.time.split(':')[0]) < 17) },
      { label: 'Evening', slots: timeSlots.filter(slot => parseInt(slot.time.split(':')[0]) >= 17 && parseInt(slot.time.split(':')[0]) <= 22) }
    ];

    return (
      <div className="space-y-6">
        {timeGroups.map((group) => (
          <div key={group.label} className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="text-lg font-semibold mb-3 text-gray-700">{group.label}</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {group.slots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`
                    relative p-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${selectedTime === slot.time
                      ? 'bg-green-600 text-white shadow-lg scale-105'
                      : slot.available
                        ? 'bg-white border-2 border-gray-200 hover:border-green-500 text-gray-700 hover:shadow'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {slot.time}
                  {!slot.available && (
                    <div className="absolute inset-0 bg-gray-200/80 backdrop-blur-[1px] rounded-lg flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-600">Booked</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Slot
          </h2>
          <p className="text-xl text-gray-600">
            Simple and quick booking process
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Court Information */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-64">
              <img 
                src={court.image} 
                alt={court.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{court.name}</h3>
                  <p className="text-white/90">Premium FIFA approved facility</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-lg">Features:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {court.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center text-gray-600 bg-green-50 rounded-lg p-2"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                <p className="text-sm mb-1">Hourly Rate</p>
                <p className="text-3xl font-bold">
                  Rs. {court.hourlyRate}
                </p>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Earn Credits</span>
                  <div className="flex items-center gap-1">
                    <Gift size={16} className="text-blue-600" />
                    <span className="font-semibold text-blue-600">
                      {calculateCreditsEarned()} per booking
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  As a {mockUser.membershipLevel} member, you earn {MEMBERSHIP_TIERS[mockUser.membershipLevel].creditMultiplier}x credits
                </p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                bookingStep === 1 ? 'bg-green-600' : 'bg-gray-300'
              }`}>1</div>
              <div className="flex-1 h-1 bg-gray-200 rounded-full">
                <div className={`h-full bg-green-600 rounded-full transition-all duration-500 ${
                  bookingStep === 2 ? 'w-full' : 'w-0'
                }`}></div>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                bookingStep === 2 ? 'bg-green-600' : 'bg-gray-300'
              }`}>2</div>
            </div>

            {bookingStep === 1 ? (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-6">Your Details</h3>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="tel"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-6">Select Date & Time</h3>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Select Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="date"
                      min={today}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Select Time
                    </label>
                    {isLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading available slots...</p>
                      </div>
                    ) : (
                      renderTimeSlots()
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Duration
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['60', '90', '120'].map((duration) => (
                      <button
                        key={duration}
                        onClick={() => setSelectedDuration(duration)}
                        className={`p-3 rounded-lg text-sm font-medium transition-all duration-200
                          ${selectedDuration === duration
                            ? 'bg-green-600 text-white shadow-lg'
                            : 'bg-white border-2 border-gray-200 hover:border-green-500 text-gray-700'
                          }
                        `}
                      >
                        {duration} mins
                      </button>
                    ))}
                  </div>
                </div>

                {canUseCredits() && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="useCredits"
                        checked={useCredits}
                        onChange={(e) => setUseCredits(e.target.checked)}
                        className="rounded text-green-600 focus:ring-green-500 w-4 h-4"
                      />
                      <label htmlFor="useCredits" className="text-sm text-gray-700 flex items-center gap-2">
                        <Gift size={16} className="text-blue-600" />
                        Use credits for free booking
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      You have enough credits for a free booking!
                    </p>
                  </div>
                )}
              </div>
            )}

            {bookingStep === 2 && selectedDate && selectedTime && (
              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CreditCard size={20} className="text-green-600" />
                  Booking Summary
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-medium">{customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span className="font-medium">{phoneNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{selectedDuration} minutes</span>
                  </div>
                  {useCredits ? (
                    <div className="flex items-center gap-2 text-green-600 font-semibold mt-4">
                      <Gift size={16} />
                      <span>Using credits for free booking</span>
                    </div>
                  ) : (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Total Amount:</span>
                        <span className="text-2xl font-bold text-green-600">
                          Rs. {calculateTotal()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-blue-600 text-sm">
                        <Gift size={14} />
                        <span>You'll earn {calculateCreditsEarned()} credits</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button 
              className={`w-full mt-8 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-300`}
              onClick={handleBooking}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : bookingStep === 1 ? (
                <>Next</>
              ) : (
                <>
                  <CreditCard size={20} />
                  {useCredits ? 'Confirm Free Booking' : 'Confirm Booking'}
                </>
              )}
            </button>

            {bookingStep === 2 && (
              <button 
                className="w-full mt-4 border border-gray-300 text-gray-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-300"
                onClick={() => setBookingStep(1)}
              >
                Back to Details
              </button>
            )}

            <div className="mt-6 flex items-start gap-2 text-sm text-gray-600 bg-yellow-50 p-4 rounded-lg">
              <AlertCircle size={16} className="mt-0.5 text-yellow-600" />
              <p>
                Please note that bookings are tentative until payment is completed. 
                Unpaid slots will be released after 15 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSystem;