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
    <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none ${className}`}>
      <div className="flex flex-col items-center space-y-2 animate-bounce">
        {/* Scroll text */}
        <span className="text-sm text-gray-400 font-medium tracking-wide uppercase">
          Scroll Down
        </span>
        
        {/* Animated chevron */}
        <div className="relative">
          <ChevronDown 
            className="w-6 h-6 text-gray-300 animate-pulse" 
            strokeWidth={2}
          />
          {/* Glow effect */}
          <ChevronDown 
            className="w-6 h-6 text-primary absolute top-0 left-0 opacity-30 animate-ping" 
            strokeWidth={1}
          />
        </div>
        
        {/* Additional scroll indicator dots */}
        <div className="flex flex-col space-y-1">
          <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};