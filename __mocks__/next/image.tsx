import * as React from 'react';

// Simple mock for next/image in Jest unit tests
// Renders a native img so assertions work without Next.js optimization layer
const NextImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  // Preserve alt, src, width/height, etc.
  return <img {...props} />;
};

export default NextImage;
