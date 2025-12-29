

import React from 'react';

interface CurrencyDisplayProps {
  amount: number;
  label: string;
  icon: React.ReactNode;
  className?: string; 
  labelClassName?: string; 
  amountClassName?: string; 
  backgroundClassName?: string; 
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = React.memo(({ 
  amount, 
  label, 
  icon, 
  className = '', 
  labelClassName = 'text-[#F4F4F4]/80', 
  amountClassName = '', 
  backgroundClassName = 'bg-[#1F1F2B]/70' // Grey Cortex base, fits synthwave
}) => {
  return (
    <div className={`flex items-center space-x-2 p-2.5 rounded-xl shadow-inner shadow-black/20 ${backgroundClassName} ${className}`}>
      <div className="flex-shrink-0 scale-90">
        {icon}
      </div>
      <div>
        <span className={`block text-xl font-bold tracking-tight ${amountClassName}`}>
          {amount.toLocaleString()}
        </span>
        <span className={`block text-xs font-medium opacity-80 uppercase tracking-wider ${labelClassName}`}>{label}</span>
      </div>
    </div>
  );
});

export default CurrencyDisplay;