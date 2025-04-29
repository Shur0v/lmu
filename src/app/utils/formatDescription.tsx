import React from 'react';

export const formatDescriptionWithLinks = (description: string) => {
  if (!description) return '';

  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Split the text by URLs and map through the parts
  return description.split(urlRegex).map((part, index) => {
    // Check if this part is a URL
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}; 