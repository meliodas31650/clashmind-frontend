
import React from 'react';

interface OfficialClashMindLogoProps {
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
}

// Ensure 'clashmind-official-logo.png' in the root public folder is the new official logo image.
const LOGO_SRC = "/clashmind-official-logo.png"; 

const OfficialClashMindLogo: React.FC<OfficialClashMindLogoProps> = React.memo(({ size = 'medium', className = '' }) => {
  let sizeClasses = '';
  // Adjust these Tailwind classes to best match the logo's aspect ratio and desired visual size
  switch (size) {
    case 'tiny': // For very small contexts, e.g. maybe a small icon version if available
      sizeClasses = 'w-20 md:w-24'; 
      break;
    case 'small': // e.g., Sidebar, smaller headers
      sizeClasses = 'w-28 md:w-32'; 
      break;
    case 'medium': // e.g., AuthPage header, ProjectInfo header
      sizeClasses = 'w-36 md:w-48';
      break;
    case 'large': // e.g., LandingPage hero
      sizeClasses = 'w-48 md:w-64';
      break;
    case 'xlarge': // For very prominent display
      sizeClasses = 'w-64 md:w-80';
      break;
    default:
      sizeClasses = 'w-36 md:w-48';
  }

  return (
    <img 
      src={LOGO_SRC} 
      alt="ClashMind Logo" 
      className={`${sizeClasses} h-auto ${className}`} // h-auto maintains aspect ratio
    />
  );
});

export default OfficialClashMindLogo;