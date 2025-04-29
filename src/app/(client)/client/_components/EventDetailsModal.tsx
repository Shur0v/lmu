'use client'

import React from 'react'
import { formatDescriptionWithLinks } from '../../../utils/formatDescription'

interface Event {
  id: string
  title: string
  description?: string
  start: Date
  end: Date
}

interface EventDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  events: Event[]
  date: Date | null
}

export default function EventDetailsModal({ isOpen, onClose, events, date }: EventDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Events for {date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {events.map((event) => (
            <div key={event.id} className="mb-6 last:mb-0">
              <h3 className="text-lg font-semibold text-[#006198] mb-2">
                {event.title}
              </h3>
              <div className="text-sm text-gray-600 mb-2">
                {event.start.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })} - {event.end.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
              {event.description && (
                <div className="text-gray-700 text-sm whitespace-pre-wrap">
                  {formatDescriptionWithLinks(event.description)}
                </div>
              )}
            </div>
          ))}

          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full bg-[#006198] text-white py-2 px-4 rounded hover:bg-[#004d7a] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}