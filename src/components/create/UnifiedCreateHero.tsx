
import React, { useState, useEffect } from 'react';
import { ResponsiveCreate3DLayout } from './ResponsiveCreate3DLayout';
import { Link } from 'react-router-dom';
import { CRDButton } from '@/components/ui/design-system/Button';
import { PixelDigital } from '@/components/ui/PixelDigital';
import { ChevronDown } from 'lucide-react';
import { useResponsiveBreakpoints } from '@/hooks/useResponsiveBreakpoints';
import { useMobileFeatures } from '@/hooks/useMobileFeatures';

interface UnifiedCreateHeroProps {
  onAnimationComplete?: () => void;
}

export const UnifiedCreateHero: React.FC<UnifiedCreateHeroProps> = ({ onAnimationComplete }) => {
  const [isPaused, setIsPaused] = useState(false);
  const { isMobile } = useResponsiveBreakpoints();
  const { hapticLight } = useMobileFeatures();

  const handleTogglePause = () => {
    setIsPaused(prev => !prev);
  };

  const handleAnimationComplete = () => {
    console.log('🚀 UnifiedCreateHero: Animation complete, forwarding to parent');
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  const scrollToStudio = () => {
    if (isMobile) {
      hapticLight();
    }
    const studioSection = document.getElementById('studio-section');
    studioSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full overflow-hidden h-screen bg-crd-darkest">
      {/* 3D Background */}
      <ResponsiveCreate3DLayout 
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
        onAnimationComplete={handleAnimationComplete}
      />
      
      {/* Hero Content Overlay - Standardized spacing like StandardHero */}
      <div className="relative z-10 min-h-[60vh] max-h-[90vh] flex flex-col justify-center text-center py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Label */}
          <div className="mb-6 gradient-text-green-blue-purple font-bold tracking-wider text-sm uppercase animate-fade-in">
            CUT, CRAFT & CREATE DIGITALLY
          </div>
          
          {/* Main Heading - Standardized mb-6 */}
          <div className="mb-6">
            <h1 className="leading-tight text-crd-white drop-shadow-lg animate-fade-in">
              {isMobile ? (
                // Mobile: Optimized with better line breaks
                <div className="text-center">
                  <div className="flex justify-center items-center mb-1 text-base">
                    <span className="text-gray-400 font-light text-center">
                      From <span className="paper-scraps">paper scraps</span><br />
                      and <span className="cardboard-text">cardboard</span> to
                    </span>
                  </div>
                  <div className="flex justify-center items-center text-xl mt-2">
                    <span className="font-bold text-center">
                      <PixelDigital className="inline">digital</PixelDigital><br />
                      <span className="text-white">art that comes alive!</span>
                    </span>
                  </div>
                </div>
              ) : (
                // Desktop: Original layout
                <>
                  <div className="flex justify-center items-center mb-4 text-3xl md:text-4xl lg:text-5xl">
                    <span className="text-gray-400 font-light">From <span className="paper-scraps">paper scraps</span> and <span className="cardboard-text">cardboard</span> to</span>
                  </div>
                  <div className="flex justify-center items-center text-4xl md:text-5xl lg:text-6xl">
                    <span className="font-bold">
                      <PixelDigital className="inline">digital</PixelDigital>
                      <span className="text-white"> art that comes alive!</span>
                    </span>
                  </div>
                </>
              )}
            </h1>
          </div>
          
          {/* CTA Buttons - Standardized mb-10 spacing */}
          <div className="mb-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/create/crd" className="w-full sm:w-auto">
              <CRDButton 
                size={isMobile ? "default" : "lg"}
                variant="create"
                className={`${isMobile ? "min-w-[180px] text-base" : "min-w-[200px]"} w-full sm:w-auto`}
              >
                Start Creating
              </CRDButton>
            </Link>
            <Link to="/frames" className="w-full sm:w-auto">
              <CRDButton 
                variant="outline" 
                size={isMobile ? "default" : "lg"}
                className={`${isMobile ? "min-w-[180px] text-base" : "min-w-[200px]"} w-full sm:w-auto`}
              >
                Browse Frames
              </CRDButton>
            </Link>
          </div>
          
          {/* Animated Tagline */}
          <div className="animate-fade-in">
            <p className={`font-caveat italic text-center text-crd-orange ${
              isMobile ? "text-lg leading-tight" : "text-2xl md:text-3xl"
            }`}>
              "No glue needed."
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToStudio}
        className={`absolute left-1/2 transform -translate-x-1/2 text-crd-lightGray hover:text-crd-white transition-colors animate-bounce ${
          isMobile ? "bottom-4 p-2" : "bottom-8 p-3"
        }`}
        aria-label="Scroll to 3D studio"
      >
        <ChevronDown className={isMobile ? "w-5 h-5" : "w-6 h-6"} />
      </button>
    </div>
  );
};
