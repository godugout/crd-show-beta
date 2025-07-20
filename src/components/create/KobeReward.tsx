import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface KobeRewardProps {
  onAnimationComplete: () => void;
}

export const KobeReward: React.FC<KobeRewardProps> = ({ onAnimationComplete }) => {
  const [showReward, setShowReward] = useState(false);
  const [hasBeenTriggered, setHasBeenTriggered] = useState(false);

  useEffect(() => {
    // Show reward after 3 seconds (when animation typically completes)
    const timer = setTimeout(() => {
      setShowReward(true);
      onAnimationComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  const handleUnlockReward = () => {
    setHasBeenTriggered(true);
  };

  if (!showReward) return null;

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
      {!hasBeenTriggered ? (
        // Unlock button
        <div className="bg-gradient-to-r from-crd-orange/20 to-crd-gold/20 backdrop-blur-sm rounded-lg p-4 border border-crd-orange/30 animate-pulse">
          <div className="text-center">
            <div className="text-2xl mb-2">🏆</div>
            <p className="text-white text-sm mb-3 font-semibold">Animation Complete!</p>
            <p className="text-white/70 text-xs mb-4">You've unlocked a practice card</p>
            <button
              onClick={handleUnlockReward}
              className="bg-crd-orange hover:bg-crd-orange/80 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 mx-auto"
            >
              Claim Reward <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        // Draggable Kobe card with arrow
        <div className="relative">
          {/* Arrow pointing to dropzone */}
          <div className="absolute -right-32 top-1/2 transform -translate-y-1/2 flex items-center">
            <div className="text-white/70 text-sm mr-2 whitespace-nowrap">
              Drag to CRD editor →
            </div>
            <svg
              width="60"
              height="30"
              viewBox="0 0 60 30"
              className="text-crd-orange"
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="currentColor"
                  />
                </marker>
              </defs>
              <path
                d="M 5 15 Q 30 5 55 15"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Draggable Kobe card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-crd-orange/50 shadow-lg">
            <p className="text-white/70 text-xs mb-2 text-center">Practice Card Unlocked!</p>
            <div
              className="w-20 h-28 rounded border-2 border-dashed border-crd-orange/50 overflow-hidden cursor-grab hover:border-crd-orange transition-colors bg-cover bg-center relative group"
              style={{ backgroundImage: `url(/lovable-uploads/7a70c708-b669-4cb2-b5db-df422389b32b.png)` }}
              draggable
              onDragStart={(e) => {
                // Set drag data for the CRD editor to recognize
                e.dataTransfer.setData('application/json', JSON.stringify({
                  type: 'example-card',
                  imageUrl: '/lovable-uploads/7a70c708-b669-4cb2-b5db-df422389b32b.png',
                  name: 'kobe-card-example.png'
                }));
              }}
              title="Drag this onto the CRD editor to use Kobe Bryant example"
            >
              <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center">
                <span className="text-white text-xs font-bold mb-1 group-hover:text-crd-orange transition-colors">
                  Kobe
                </span>
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};