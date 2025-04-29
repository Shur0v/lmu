'use client'

import React from 'react'
import { formatInTimeZone } from 'date-fns-tz'

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

// Helper function to format description with clickable links
const formatDescriptionWithLinks = (description: string) => {
  // This regex will match:
  // 1. URLs starting with http:// or https://
  // 2. URLs starting with www.
  // 3. Any domain name with a dot extension
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/?[^\s]*)?)/g
  return description.split(urlRegex).filter(Boolean).map((part, i) => {
    if (part.match(urlRegex)) {
      const href = part.startsWith('http') ? part : part.startsWith('www.') ? `http://${part}` : `http://${part}`
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#006198] hover:underline"
        >
          {part}
        </a>
      )
    }
    return part
  })
}

export default function EventDetailsModal({ isOpen, onClose, events, date }: EventDetailsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-lg max-w-[500px] w-full max-h-[90vh] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#344053]">
              Events for {date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h2>
            <button 
              onClick={onClose}
              className="text-[#344053] hover:text-[#006198] text-xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {events.length > 0 ? (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="p-3 rounded-lg bg-[#f8f9fb] last:mb-0">
                  <h3 className="text-base font-semibold text-[#006198] mb-1">
                    {event.title}
                  </h3>
                  <div className="text-[#4A4C56] text-sm mb-2">
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
                    <div className="text-[#344053] text-sm whitespace-pre-wrap">
                      {formatDescriptionWithLinks(event.description)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-[#344053] py-8">
              No events scheduled for this day
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-[#006198] text-white text-base rounded-lg hover:bg-[#004d7a] transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Scrollbar Styles */}
      <style jsx global>{`
        /* Custom Scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  )
}