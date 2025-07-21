
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResponsiveBreakpoints } from '@/hooks/useResponsiveBreakpoints';
import { CRDButton } from '@/components/ui/design-system/Button';
import { ScrollIndicator } from './ScrollIndicator';
import { ResponsiveCreate3DLayout } from './ResponsiveCreate3DLayout';

interface UnifiedCreateHeroProps {
  onAnimationComplete?: () => void;
}

export const UnifiedCreateHero: React.FC<UnifiedCreateHeroProps> = ({ onAnimationComplete }) => {
  const { isMobile, isShortScreen } = useResponsiveBreakpoints();
  const [isPaused, setIsPaused] = useState(false);

  const handleTogglePause = () => {
    setIsPaused(prev => !prev);
  };

  const handleAnimationComplete = () => {
    console.log('🎬 UnifiedCreateHero: Animation complete, forwarding to parent');
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden snap-start bg-gradient-to-b from-crd-darkest to-crd-darker">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <ResponsiveCreate3DLayout
          isPaused={isPaused}
          onTogglePause={handleTogglePause}
          onAnimationComplete={handleAnimationComplete}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <div className="mb-4 text-crd-blue font-bold tracking-wider text-xs sm:text-sm uppercase animate-fade-in">
          CUT, CRAFT & CREATE DIGITALLY
        </div>

        {/* Main Heading */}
        <div className="mb-6 text-center">
          <h1 className="leading-tight text-white drop-shadow-lg animate-fade-in">
            <div className="flex flex-wrap justify-center items-center mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="text-gray-300 font-light">
                From <span className="text-yellow-400">paper scraps</span> and <span className="text-orange-400">cardboard</span> to
              </span>
            </div>
            <div className="flex justify-center items-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="font-bold">
                CRD art <span className="gradient-text-themed">that comes alive!</span>
              </span>
            </div>
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-gray-300 text-lg sm:text-xl mb-8 text-center max-w-2xl animate-fade-in animation-delay-200">
          Transform your ideas into interactive 3D collectibles.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
          <Link to="/create/crd">
            <CRDButton 
              size={isMobile ? "default" : "lg"}
              variant="create"
              className="min-w-[200px] bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white font-bold border-0"
            >
              Start Creating
            </CRDButton>
          </Link>
          <Link to="/templates">
            <CRDButton 
              variant="outline" 
              size={isMobile ? "default" : "lg"}
              className="min-w-[200px] bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
            >
              Browse Templates
            </CRDButton>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <ScrollIndicator isVisible={true} />
      </div>
    </section>
  );
};
