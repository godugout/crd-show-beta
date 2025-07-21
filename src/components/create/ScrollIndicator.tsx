
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  isVisible?: boolean;
  className?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ 
  isVisible = true, 
  className = '' 
}) => {
  if (!isVisible) return null;

  return (
    <div className={`flex justify-center pointer-events-none ${className}`}>
      <div className="flex flex-col items-center animate-bounce">
        {/* Three stacked arrows close together */}
        <ChevronDown 
          className="w-6 h-6 text-gray-300 -mb-3" 
          strokeWidth={2}
        />
        <ChevronDown 
          className="w-6 h-6 text-gray-300 -mb-3" 
          strokeWidth={2}
        />
        <ChevronDown 
          className="w-6 h-6 text-gray-300" 
          strokeWidth={2}
        />
      </div>
    </div>
  );
};
