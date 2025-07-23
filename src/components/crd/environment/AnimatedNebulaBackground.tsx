
import React from 'react';

interface AnimatedNebulaBackgroundProps {
  intensity?: number;
}

export const AnimatedNebulaBackground: React.FC<AnimatedNebulaBackgroundProps> = ({ 
  intensity = 1.0 
}) => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(138, 43, 226, ${0.4 * intensity}) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 105, 180, ${0.3 * intensity}) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 140, 0, ${0.2 * intensity}) 0%, transparent 50%)
        `,
        animation: 'nebula-gradient-cycle 12s ease-in-out infinite',
        opacity: intensity,
      }}
    >
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(45deg, 
              hsl(262 83% 58% / ${0.1 * intensity}), 
              hsl(25 95% 53% / ${0.1 * intensity})
            )
          `,
          animation: 'nebula-color-shift 10s ease-in-out infinite alternate',
        }}
      />
      
      {/* Pulsing accent spots */}
      <div 
        className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full blur-xl"
        style={{
          background: `radial-gradient(circle, hsl(262 83% 58% / ${0.2 * intensity}) 0%, transparent 70%)`,
          animation: 'nebula-pulse 8s ease-in-out infinite',
        }}
      />
      
      <div 
        className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full blur-xl"
        style={{
          background: `radial-gradient(circle, hsl(25 95% 53% / ${0.15 * intensity}) 0%, transparent 70%)`,
          animation: 'nebula-pulse 6s ease-in-out infinite reverse',
        }}
      />
    </div>
  );
};
