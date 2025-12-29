

import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  interactive?: boolean; // New prop to enable hover effects
}

const GlassCard: React.FC<GlassCardProps> = React.memo(({ children, className = '', onMouseEnter, onMouseLeave, interactive = false, ...rest }) => {
  return (
    <div 
      className={`
        bg-[#181C27]/75 backdrop-blur-lg 
        border-2 border-[#A100FF]/60 
        rounded-2xl p-6 md:p-8 
        shadow-xl shadow-[#A100FF]/15 
        transition-all duration-300 ease-in-out
        ${interactive ? 'hover:border-[#FF00C8]/80 hover:shadow-[#FF00C8]/20 hover:scale-[1.01]' : ''}
        ${className}
      `}
      // Slightly darker base, increased border width, refined opacity, standard padding
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      {children}
    </div>
  );
});

export default GlassCard;