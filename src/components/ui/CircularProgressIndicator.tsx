import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CircularProgressIndicatorProps {
  size?: number;
  className?: string;
}

export const CircularProgressIndicator: React.FC<CircularProgressIndicatorProps> = ({ 
  size = 16, 
  className = '' 
}) => {
  // Create arrows arranged in a circle, each pointing to the next position
  const arrowCount = 12;
  const arrows = Array.from({ length: arrowCount }, (_, i) => {
    const angle = (i * (360 / arrowCount)); // Distribute evenly around circle
    const radian = (angle * Math.PI) / 180;
    const radius = size * 0.4; // Position on outer circle line
    
    // Calculate arrow position
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    
    return {
      x,
      y,
      rotation: angle, // Direct angle rotation for circular flow
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
      
      {/* Ring of arrows - each pointing to next position */}
      <div className="absolute inset-0 flex items-center justify-center">
        {arrows.map((arrow, index) => (
          <ChevronRight
            key={index}
            className="absolute text-white animate-arrowPulse"
            style={{
              width: size * 0.15,
              height: size * 0.15,
              left: `calc(50% + ${arrow.x}px - ${size * 0.075}px)`,
              top: `calc(50% + ${arrow.y}px - ${size * 0.075}px)`,
              transform: `rotate(${arrow.rotation}deg)`,
              animationDelay: `${arrow.delay}s`,
              filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))',
              strokeWidth: 2.5
            }}
          />
        ))}
      </div>
    </div>
  );
};