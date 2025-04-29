'use client'

import React, { useEffect, useState } from 'react'
import EventApis from '../../../API/EventApi'
import { formatDescriptionWithLinks } from '../../../utils/formatDescription'
import { toast } from 'react-hot-toast'

interface Event {
  id: string
  name: string
  description?: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
}

export default function EventsClient() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await EventApis.getAllEvents()
      if (response.success && response.data) {
        setEvents(response.data)
      } else {
        toast.error('Failed to fetch events')
      }
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('Failed to fetch events')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Events</h1>
      <div className="grid gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
            {event.description && (
              <div className="text-gray-600 mb-4">
                {formatDescriptionWithLinks(event.description)}
              </div>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div>
                <span className="font-medium">Start:</span>{' '}
                {new Date(`${event.startDate}T${event.startTime}`).toLocaleString()}
              </div>
              <div>
                <span className="font-medium">End:</span>{' '}
                {new Date(`${event.endDate}T${event.endTime}`).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="text-center text-gray-500">No events found</div>
        )}
      </div>
    </div>
  )
} 