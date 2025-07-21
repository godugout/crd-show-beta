
import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, RotateCw, RotateCcw } from 'lucide-react';

interface GalacticCompassProps {
  onRotate: (direction: 'clockwise' | 'counterclockwise') => void;
  onTranslate: (direction: 'up' | 'down' | 'left' | 'right') => void;
  className?: string;
}

export const GalacticCompass: React.FC<GalacticCompassProps> = ({
  onRotate,
  onTranslate,
  className = ''
}) => {
  const [activeDirection, setActiveDirection] = useState<string | null>(null);
  const [needleRotation, setNeedleRotation] = useState(0);

  // Animate the compass needle
  useEffect(() => {
    const interval = setInterval(() => {
      setNeedleRotation(prev => (prev + 1) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleAction = (action: () => void, direction: string) => {
    setActiveDirection(direction);
    action();
    setTimeout(() => setActiveDirection(null), 150);
  };

  const buttonBaseClasses = "p-2 rounded-full glass-medium backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 group";
  const iconBaseClasses = "w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-300";

  return (
    <div className={`relative w-32 h-32 ${className}`}>
      {/* Outer Ring - Glass */}
      <div className="absolute inset-0 rounded-full glass-light border border-white/20">
        
        {/* Cardinal Direction Markers */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-blue-500/40 rounded-full"></div>
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-blue-500/40 rounded-full"></div>
        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-3 h-1 bg-blue-500/40 rounded-full"></div>
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-1 bg-blue-500/40 rounded-full"></div>

        {/* Inner Compass Disc - Glass Morphism */}
        <div className="absolute inset-4 rounded-full glass-medium backdrop-blur-lg border border-white/30 flex items-center justify-center">
          
          {/* Compass Needles */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Blue needle (North) */}
            <div 
              className="absolute w-0.5 h-8 bg-gradient-to-t from-blue-600/70 to-blue-500/70 rounded-full origin-bottom transform -translate-y-2"
              style={{ transform: `rotate(${needleRotation}deg) translateY(-8px)` }}
            />
            
            {/* Orange needle (South) */}
            <div 
              className="absolute w-0.5 h-8 bg-gradient-to-t from-orange-600/70 to-orange-500/70 rounded-full origin-bottom transform translate-y-2"
              style={{ transform: `rotate(${needleRotation + 180}deg) translateY(-8px)` }}
            />
            
            {/* Green needle (East) */}
            <div 
              className="absolute w-0.5 h-8 bg-gradient-to-t from-green-600/70 to-green-500/70 rounded-full origin-bottom transform translate-x-2"
              style={{ transform: `rotate(${needleRotation + 90}deg) translateY(-8px)` }}
            />
          </div>
          
          {/* Center Dot */}
          <div className="w-2 h-2 bg-white/80 rounded-full z-10"></div>
        </div>
      </div>

      {/* Directional Buttons */}
      {/* Up Button */}
      <button
        onClick={() => handleAction(() => onTranslate('up'), 'up')}
        className={`absolute -top-2 left-1/2 transform -translate-x-1/2 ${buttonBaseClasses} ${
          activeDirection === 'up' ? 'scale-95 shadow-glow-blue' : 'hover:shadow-glow-blue'
        }`}
      >
        <ChevronUp className={iconBaseClasses} />
      </button>

      {/* Down Button */}
      <button
        onClick={() => handleAction(() => onTranslate('down'), 'down')}
        className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${buttonBaseClasses} ${
          activeDirection === 'down' ? 'scale-95 shadow-glow-blue' : 'hover:shadow-glow-blue'
        }`}
      >
        <ChevronDown className={iconBaseClasses} />
      </button>

      {/* Left Button */}
      <button
        onClick={() => handleAction(() => onTranslate('left'), 'left')}
        className={`absolute -left-2 top-1/2 transform -translate-y-1/2 ${buttonBaseClasses} ${
          activeDirection === 'left' ? 'scale-95 shadow-glow-blue' : 'hover:shadow-glow-blue'
        }`}
      >
        <ChevronLeft className={iconBaseClasses} />
      </button>

      {/* Right Button */}
      <button
        onClick={() => handleAction(() => onTranslate('right'), 'right')}
        className={`absolute -right-2 top-1/2 transform -translate-y-1/2 ${buttonBaseClasses} ${
          activeDirection === 'right' ? 'scale-95 shadow-glow-blue' : 'hover:shadow-glow-blue'
        }`}
      >
        <ChevronRight className={iconBaseClasses} />
      </button>

      {/* Rotation Buttons */}
      {/* Clockwise Rotation */}
      <button
        onClick={() => handleAction(() => onRotate('clockwise'), 'clockwise')}
        className={`absolute -top-2 -right-2 ${buttonBaseClasses} ${
          activeDirection === 'clockwise' ? 'scale-95 shadow-glow-orange' : 'hover:shadow-glow-orange'
        }`}
      >
        <RotateCw className={`${iconBaseClasses} group-hover:shadow-glow-orange`} />
      </button>

      {/* Counterclockwise Rotation */}
      <button
        onClick={() => handleAction(() => onRotate('counterclockwise'), 'counterclockwise')}
        className={`absolute -top-2 -left-2 ${buttonBaseClasses} ${
          activeDirection === 'counterclockwise' ? 'scale-95 shadow-glow-green' : 'hover:shadow-glow-green'
        }`}
      >
        <RotateCcw className={`${iconBaseClasses} group-hover:shadow-glow-green`} />
      </button>
    </div>
  );
};
