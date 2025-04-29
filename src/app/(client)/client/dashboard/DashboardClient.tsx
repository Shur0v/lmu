'use client'

import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import EventApis from '../../../API/EventApi'

// Utility function to convert 12-hour time to 24-hour time
export const convert12to24 = (time12h: string): string => {
  try {
    if (!time12h) return '00:00'
    
    const [time, modifier] = time12h.split(' ')
    let [hours, minutes] = time.split(':')
    
    let hoursNum = parseInt(hours, 10)
    
    if (modifier === 'PM' && hoursNum < 12) {
      hoursNum += 12
    } else if (modifier === 'AM' && hoursNum === 12) {
      hoursNum = 0
    }
    
    return `${hoursNum.toString().padStart(2, '0')}:${minutes}`
  } catch (error) {
    console.error('Error converting time format:', error)
    return '00:00'
  }
}

// Utility function to convert 24-hour time to 12-hour time
export const convert24to12 = (time24h: string): string => {
  try {
    if (!time24h) return '12:00 AM'
    
    let [hours, minutes] = time24h.split(':')
    let hoursNum = parseInt(hours, 10)
    
    const period = hoursNum >= 12 ? 'PM' : 'AM'
    hoursNum = hoursNum % 12 || 12
    
    return `${hoursNum}:${minutes} ${period}`
  } catch (error) {
    console.error('Error converting time format:', error)
    return '12:00 AM'
  }
}

// Format date and time with timezone consideration
export const formatDateTime = (date: string, time: string, timezone: string = 'America/Cayman'): Date | null => {
  try {
    const [year, month, day] = date.split('-')
    const [hours, minutes] = time.split(':')
    
    // Create date in specified timezone
    const dateTime = new Date(Date.UTC(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
      parseInt(hours, 10),
      parseInt(minutes, 10)
    ))
    
    if (isNaN(dateTime.getTime())) {
      throw new Error('Invalid date or time')
    }
    
    return dateTime
  } catch (error) {
    console.error('Error formatting date and time:', error)
    return null
  }
}

export default function DashboardClient() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent, eventData: any) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await EventApis.createEvent(eventData)
      
      // Check if response status is in success range (200-299)
      if (response.status && response.status >= 200 && response.status < 300) {
        toast.success('Event created successfully!')
        router.push('/client/events')
        return
      }
      
      // If we get here, it's an error
      console.error('Event creation failed:', response)
      toast.error(response.message || 'Failed to create event')
      
    } catch (error: any) {
      console.error('Error creating event:', error)
      toast.error(error.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {/* Add your form here */}
    </div>
  )
} 