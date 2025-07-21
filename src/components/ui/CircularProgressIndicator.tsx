
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
  // Calculate positions for 8 arrows in a circle
  const arrows = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45) - 90; // Start from top (-90°), increment by 45°
    const radian = (angle * Math.PI) / 180;
    const radius = size * 0.6; // Radius relative to size
    
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    
    return {
      x,
      y,
      rotation: angle + 90, // Point outward from center
      delay: i * 0.125, // Stagger animation by 1/8 second
    };
  });

  return (
    <div 
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Gradient background ring */}
      <div
        className="absolute inset-0 rounded-full animate-[circularGradientFlow_2s_linear_infinite]"
        style={{
          background: `conic-gradient(from 0deg, 
            hsl(var(--crd-orange)), 
            hsl(var(--crd-green)), 
            hsl(var(--crd-blue)), 
            hsl(var(--crd-orange))
          )`,
          width: size,
          height: size,
          opacity: 0.3,
        }}
      />
      
      {/* Arrow icons positioned in circle */}
      {arrows.map((arrow, index) => (
        <ChevronDown
          key={index}
          className="absolute text-crd-orange animate-[arrowPulse_1.5s_ease-in-out_infinite]"
          style={{
            width: size * 0.25,
            height: size * 0.25,
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate(${arrow.x}px, ${arrow.y}px) rotate(${arrow.rotation}deg)`,
            animationDelay: `${arrow.delay}s`,
          }}
          strokeWidth={2}
        />
      ))}
    </div>
  );
};
