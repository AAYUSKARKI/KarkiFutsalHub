"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Search, CalendarIcon, MoreHorizontal, Save, X } from "lucide-react"
import React from "react"

interface Booking {
  id: string
  customerName: string
  phoneNumber: string
  date: string
  time: string
  duration: string
}

const mockBookings: Booking[] = [
  { id: "1", customerName: "John Doe", phoneNumber: "123-456-7890", date: "2023-05-20", time: "14:00", duration: "60" },
  {
    id: "2",
    customerName: "Jane Smith",
    phoneNumber: "987-654-3210",
    date: "2023-05-21",
    time: "16:00",
    duration: "90",
  },
  {
    id: "3",
    customerName: "Bob Johnson",
    phoneNumber: "555-555-5555",
    date: "2023-05-22",
    time: "10:00",
    duration: "120",
  },
]

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(mockBookings)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [showCalendar, setShowCalendar] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedBooking, setEditedBooking] = useState<Partial<Booking>>({})

  useEffect(() => {
    const filtered = bookings.filter(
      (booking) =>
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.phoneNumber.includes(searchTerm),
    )
    setFilteredBookings(filtered)
  }, [searchTerm, bookings])

  useEffect(() => {
    if (selectedDate) {
      const filtered = bookings.filter((booking) => booking.date === format(selectedDate, "yyyy-MM-dd"))
      setFilteredBookings(filtered)
    } else {
      setFilteredBookings(bookings)
    }
  }, [selectedDate, bookings])

  const startEditing = (booking: Booking) => {
    setEditingId(booking.id)
    setEditedBooking(booking)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditedBooking({})
  }

  const saveEditing = () => {
    if (editingId) {
      const updatedBookings = bookings.map(booking =>
        booking.id === editingId ? { ...booking, ...editedBooking } : booking
      )
      setBookings(updatedBookings)
      setEditingId(null)
      setEditedBooking({})
    }
  }

  const handleFieldChange = (field: keyof Booking, value: string) => {
    setEditedBooking(prev => ({ ...prev, [field]: value }))
  }

  const handleCancel = (id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id))
    setEditingId(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard - Bookings</h1>

      {/* Search and Date Filter (same as before) */}
      {/* ... */}

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Customer Name', 'Phone Number', 'Date', 'Time', 'Duration (min)', 'Actions'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                {/* Customer Name */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === booking.id ? (
                    <input
                      type="text"
                      value={editedBooking.customerName || ''}
                      onChange={(e) => handleFieldChange('customerName', e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    booking.customerName
                  )}
                </td>

                {/* Phone Number */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === booking.id ? (
                    <input
                      type="tel"
                      value={editedBooking.phoneNumber || ''}
                      onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    />
                  ) : (
                    booking.phoneNumber
                  )}
                </td>

                {/* Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === booking.id ? (
                    <input
                      type="date"
                      value={editedBooking.date || ''}
                      onChange={(e) => handleFieldChange('date', e.target.value)}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    booking.date
                  )}
                </td>

                {/* Time */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === booking.id ? (
                    <input
                      type="time"
                      value={editedBooking.time || ''}
                      onChange={(e) => handleFieldChange('time', e.target.value)}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    booking.time
                  )}
                </td>

                {/* Duration */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === booking.id ? (
                    <select
                      value={editedBooking.duration || ''}
                      onChange={(e) => handleFieldChange('duration', e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="30">30</option>
                      <option value="60">60</option>
                      <option value="90">90</option>
                      <option value="120">120</option>
                    </select>
                  ) : (
                    booking.duration
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  {editingId === booking.id ? (
                    <>
                      <button
                        onClick={saveEditing}
                        className="p-1 text-green-600 hover:bg-gray-100 rounded-full"
                        title="Save"
                      >
                        <Save className="h-5 w-5" />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="p-1 text-red-600 hover:bg-gray-100 rounded-full"
                        title="Cancel"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(booking)}
                        className="p-1 text-blue-600 hover:bg-gray-100 rounded-full"
                        title="Edit"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="p-1 text-red-600 hover:bg-gray-100 rounded-full"
                        title="Cancel Booking"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}