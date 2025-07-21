
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface CircularProgressIndicatorProps {
  size?: number;
  className?: string;
}

export const CircularProgressIndicator: React.FC<CircularProgressIndicatorProps> = ({ 
  size = 16, 
  className = '' 
}) => {
  // Create more arrows for a denser ring effect
  const arrowCount = 12;
  const arrows = Array.from({ length: arrowCount }, (_, i) => {
    const angle = (i * (360 / arrowCount)) - 90; // Start from top, distribute evenly
    const radian = (angle * Math.PI) / 180;
    const radius = size * 0.4; // Position arrows on the outer circle line
    
    // Calculate arrow position
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    
    return {
      x,
      y,
      rotation: angle + 90 + (360 / arrowCount), // Point to next arrow position (clockwise)
      delay: i * (1.5 / arrowCount) // Stagger animation delays
    };
  });

  return (
    <div 
      className={`relative inline-flex ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Rotating gradient background ring */}
      <div 
        className="absolute inset-0 rounded-full animate-circularGradientFlow"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(
            from 0deg,
            #F97316 0deg,
            #45B26B 120deg,
            #3772FF 240deg,
            #F97316 360deg
          )`,
          mask: `radial-gradient(circle, transparent ${size * 0.28}px, black ${size * 0.32}px, black ${size * 0.48}px, transparent ${size * 0.52}px)`,
          WebkitMask: `radial-gradient(circle, transparent ${size * 0.28}px, black ${size * 0.32}px, black ${size * 0.48}px, transparent ${size * 0.52}px)`
        }}
      />
      
      {/* Ring of arrows */}
      <div className="absolute inset-0 flex items-center justify-center">
        {arrows.map((arrow, index) => (
          <ChevronDown
            key={index}
            className="absolute text-white animate-arrowPulse"
            style={{
              width: size * 0.2,
              height: size * 0.2,
              left: `calc(50% + ${arrow.x}px - ${size * 0.1}px)`,
              top: `calc(50% + ${arrow.y}px - ${size * 0.1}px)`,
              transform: `rotate(${arrow.rotation}deg)`,
              animationDelay: `${arrow.delay}s`,
              filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))',
              strokeWidth: 2.5
            }}
          />
        ))}
      </div>
      
      {/* Center dot for visual anchor */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
      >
        <div 
          className="rounded-full bg-white/10"
          style={{
            width: size * 0.2,
            height: size * 0.2
          }}
        />
      </div>
    </div>
  );
};
