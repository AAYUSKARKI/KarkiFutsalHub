import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CreditCard, AlertCircle, Phone, User } from 'lucide-react';
import { court, generateTimeSlots, type TimeSlot } from '../data/mockData';

const BookingSystem = () => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('60');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  useEffect(() => {
    if (selectedDate) {
      setIsLoading(true);
      // Simulate API call to fetch available slots
      setTimeout(() => {
        setTimeSlots(generateTimeSlots(selectedDate));
        setIsLoading(false);
      }, 500);
    }
  }, [selectedDate]);

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

    // Simulate booking process
    setIsLoading(true);
    setTimeout(() => {
      alert('Booking successful! Please complete the payment within 15 minutes to confirm your slot.');
      setIsLoading(false);
      // Reset form
      setCustomerName('');
      setPhoneNumber('');
      setSelectedDate('');
      setSelectedTime('');
      setSelectedDuration('60');
      setBookingStep(1);
    }, 1000);
  };

  const calculateTotal = () => {
    return (court.hourlyRate * parseInt(selectedDuration)) / 60;
  };

  const today = new Date().toISOString().split('T')[0];

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
            <img 
              src={court.image} 
              alt={court.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">{court.name}</h3>
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
              <div className="text-center bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Hourly Rate</p>
                <p className="text-3xl font-bold text-green-600">
                  Rs. {court.hourlyRate}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
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

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Select Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 text-gray-400" size={20} />
                    <select
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      disabled={isLoading || !selectedDate}
                    >
                      <option value="">Choose time</option>
                      {timeSlots.map((slot) => (
                        <option 
                          key={slot.time} 
                          value={slot.time}
                          disabled={!slot.available}
                        >
                          {slot.time} {!slot.available && '(Booked)'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Duration
                  </label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                  >
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                    <option value="120">120 minutes</option>
                  </select>
                </div>
              </div>
            )}

            {bookingStep === 2 && selectedDate && selectedTime && (
              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Name: {customerName}</p>
                  <p>Phone: {phoneNumber}</p>
                  <p>Date: {selectedDate}</p>
                  <p>Time: {selectedTime}</p>
                  <p>Duration: {selectedDuration} minutes</p>
                  <p className="text-xl font-semibold text-green-700 mt-4">
                    Total: Rs. {calculateTotal()}
                  </p>
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
                <>Processing...</>
              ) : bookingStep === 1 ? (
                <>Next</>
              ) : (
                <>
                  <CreditCard size={20} />
                  Confirm Booking
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

            <div className="mt-6 flex items-start gap-2 text-sm text-gray-600">
              <AlertCircle size={16} className="mt-0.5" />
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