import React, { ReactNode } from 'react';

export const formatDescriptionWithLinks = (description: string): ReactNode => {
  if (!description) return '';

  // More comprehensive regex for URLs
  const urlRegex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/gi;

  // Convert line breaks to <br> tags and handle URLs
  const parts = description.split(/\n/);
  
  return parts.map((part, lineIndex) => {
    const words = part.split(urlRegex);
    const matches = part.match(urlRegex);
    let currentIndex = 0;
    
    const formattedLine = words.reduce((acc: (string | React.ReactElement)[], word, index) => {
      if (word) {
        acc.push(word);
      }
      if (matches && currentIndex < matches.length) {
        const url = matches[currentIndex];
        const href = url.startsWith('http') ? url : `https://${url}`;
        acc.push(
          <a
            key={`${lineIndex}-${currentIndex}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline break-all"
          >
            {url}
          </a>
        );
        currentIndex++;
      }
      return acc;
    }, []);

    // Add line breaks between paragraphs
    return (
      <React.Fragment key={lineIndex}>
        {formattedLine}
        {lineIndex < parts.length - 1 && <br />}
      </React.Fragment>
    );
  });
}; 