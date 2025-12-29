
import React from 'react';

/**
 * @typedef SkeletonLoaderProps
 * @property {'text' | 'avatar' | 'title' | 'card' | 'button' | 'custom'} type - The type of skeleton placeholder to render.
 * @property {string} [className] - Optional additional CSS classes for custom styling.
 * @property {React.CSSProperties} [style] - Optional inline styles.
 */
interface SkeletonLoaderProps {
  type: 'text' | 'avatar' | 'title' | 'card' | 'button' | 'custom';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SkeletonLoader component.
 * Displays an animated placeholder to indicate loading content.
 * Styled with a synthwave shimmer effect.
 * @param {SkeletonLoaderProps} props - Component props.
 * @returns {JSX.Element} The rendered SkeletonLoader component.
 */
const SkeletonLoader: React.FC<SkeletonLoaderProps> = React.memo(({ type, className = '', style }) => {
  const baseClass = "bg-[#2A2F45]/50 animate-shimmer"; // Synthwave-friendly base color for skeleton
  let typeClasses = "";

  switch (type) {
    case 'text':
      typeClasses = "h-4 rounded"; // Default text line
      break;
    case 'title':
      typeClasses = "h-6 w-3/4 rounded";
      break;
    case 'avatar':
      typeClasses = "w-12 h-12 rounded-full";
      break;
    case 'card':
      typeClasses = "w-full h-48 rounded-lg";
      break;
    case 'button':
      typeClasses = "h-10 w-24 rounded-lg";
      break;
    case 'custom':
      // For custom, rely entirely on className passed in for dimensions
      typeClasses = "";
      break;
    default:
      typeClasses = "h-4 rounded";
  }

  // Shimmer animation style (can be global or component-specific)
  // Ensure this animation is defined in global CSS or a style tag if not using Tailwind's JIT for @keyframes
  // For simplicity, including it here. In a larger app, this would be in a global CSS file.
  const shimmerKeyframes = `
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
  `;
  const shimmerStyle = {
    backgroundImage: 'linear-gradient(to right, #2A2F45/50 0%, #394264/50 20%, #2A2F45/50 40%, #2A2F45/50 100%)',
    backgroundSize: '2000px 100%',
    animation: 'shimmer 2s infinite linear',
  };

  return (
    <>
      <style>{shimmerKeyframes}</style>
      <div 
        className={`${baseClass} ${typeClasses} ${className}`} 
        style={{ ...shimmerStyle, ...style }}
        aria-busy="true"
        aria-live="polite"
      />
    </>
  );
});

export default SkeletonLoader;
