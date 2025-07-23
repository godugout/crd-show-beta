
import React, { useState, useEffect } from 'react';
import { X, MousePointer2, Hand } from 'lucide-react';

interface AlignmentTutorialProps {
  isVisible: boolean;
  onClose: () => void;
}

interface TutorialStep {
  id: number;
  title: string;
  animation: string;
  duration: number;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Zoom In",
    animation: "zoom-gesture",
    duration: 3000
  },
  {
    id: 2,
    title: "Tilt Forward",
    animation: "tilt-gesture",
    duration: 3000
  },
  {
    id: 3,
    title: "Drag Up",
    animation: "drag-up-gesture",
    duration: 2000
  }
];

export const AlignmentTutorial: React.FC<AlignmentTutorialProps> = ({
  isVisible,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setCurrentStep(0);
      setIsPlaying(true);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isPlaying || !isVisible) return;

    const timer = setTimeout(() => {
      if (currentStep < tutorialSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsPlaying(false);
        // Auto-restart after a pause
        setTimeout(() => {
          setCurrentStep(0);
          setIsPlaying(true);
        }, 1000);
      }
    }, tutorialSteps[currentStep]?.duration || 3000);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-60 bg-black/90 hover:bg-black text-white p-2 rounded-full transition-colors border border-white/20"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Tutorial Content - Centered Higher */}
      <div className="relative w-full h-full flex items-center justify-center" style={{ marginTop: '-10vh' }}>
        <div className="relative">
          {/* Monolith Card */}
          <div className={`
            relative w-80 h-[28rem] rounded-2xl transition-all duration-1000 ease-out
            ${currentStep === 0 ? 'scale-110' : ''}
            ${currentStep === 1 ? 'transform-gpu perspective-1000' : ''}
            ${currentStep === 2 ? 'translate-y-[-10px]' : ''}
          `}
          style={{
            background: `linear-gradient(145deg, 
              hsl(0, 0%, 8%) 0%, 
              hsl(0, 0%, 2%) 30%, 
              hsl(0, 0%, 0%) 60%, 
              hsl(0, 0%, 5%) 100%)`,
            boxShadow: `
              inset 0 2px 0 rgba(255,255,255,0.1),
              inset 0 -2px 0 rgba(0,0,0,0.8),
              0 0 60px rgba(0,0,0,0.9),
              0 30px 60px rgba(0,0,0,0.7)
            `,
            border: '1px solid rgba(255,255,255,0.08)',
            ...(currentStep === 1 && {
              transform: 'rotateX(45deg) rotateY(5deg)'
            })
          }}>
            {/* Reflective surface overlay */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-40"
              style={{
                background: `linear-gradient(135deg, 
                  transparent 0%, 
                  rgba(255,255,255,0.15) 25%, 
                  transparent 50%, 
                  rgba(255,255,255,0.08) 75%, 
                  transparent 100%)`
              }}
            />
            
            {/* Subtle shimmer effect */}
            <div 
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `radial-gradient(ellipse at 30% 20%, 
                  rgba(255,255,255,0.1) 0%, 
                  transparent 50%)`
              }}
            />
            
            {/* Edge glow */}
            <div 
              className="absolute inset-0 rounded-2xl"
              style={{
                boxShadow: `
                  inset 0 0 30px rgba(100,150,255,0.1),
                  0 0 50px rgba(100,150,255,0.05)
                `
              }}
            />
          </div>

          {/* Zoom Indicator - Step 1 */}
          {currentStep === 0 && (
            <>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-white text-lg font-medium animate-pulse">
                160%+
              </div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
                Zoom
              </div>
            </>
          )}

          {/* Tilt Indicator - Step 2 */}
          {currentStep === 1 && (
            <>
              <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 text-white text-lg font-medium animate-pulse">
                45°+
              </div>
              <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 mt-6 text-white/60 text-sm">
                Tilt
              </div>
              {/* Angle arc indicator */}
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-8 border-l-2 border-t-2 border-white/40 rounded-tl-full rotate-45"></div>
            </>
          )}

          {/* Drag Up Indicator - Step 3 */}
          {currentStep === 2 && (
            <>
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-white text-lg font-medium animate-pulse">
                Drag Up
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-3xl animate-bounce">
                ↑
              </div>
              {/* Motion trail */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-t from-white/60 to-transparent animate-pulse"></div>
            </>
          )}

          {/* Animated Cursor */}
          <div className={`
            absolute transition-all duration-1000 pointer-events-none
            ${currentStep === 0 ? 'top-1/2 right-[-80px] animate-pulse' : ''}
            ${currentStep === 1 ? 'top-1/4 left-1/2 transform -translate-x-1/2 animate-pulse' : ''}
            ${currentStep === 2 ? 'bottom-[-60px] left-1/2 transform -translate-x-1/2 animate-bounce' : ''}
          `}>
            <div className="bg-white rounded-full p-3 shadow-lg border border-white/20">
              {currentStep === 0 && <MousePointer2 className="w-6 h-6 text-black" />}
              {(currentStep === 1 || currentStep === 2) && <Hand className="w-6 h-6 text-black" />}
            </div>
          </div>

          {/* Scroll wheel animation for zoom step */}
          {currentStep === 0 && (
            <div className="absolute top-1/2 right-[-60px] transform -translate-y-1/2">
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
                <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          )}

          {/* Drag gesture trail for tilt step */}
          {currentStep === 1 && (
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
};
