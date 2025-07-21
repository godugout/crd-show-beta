
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResponsiveBreakpoints } from '@/hooks/useResponsiveBreakpoints';
import { useParallaxScroll } from '@/hooks/useParallaxScroll';
import { CRDButton } from '@/components/ui/design-system/Button';
import { PixelDigital } from '@/components/ui/PixelDigital';
import { ScrollIndicator } from './ScrollIndicator';
import { ResponsiveCreate3DLayout } from './ResponsiveCreate3DLayout';

interface UnifiedCreateHeroProps {
  onAnimationComplete?: () => void;
}

export const UnifiedCreateHero: React.FC<UnifiedCreateHeroProps> = ({ onAnimationComplete }) => {
  const { isMobile, isShortScreen } = useResponsiveBreakpoints();
  const [isPaused, setIsPaused] = useState(false);
  const parallax = useParallaxScroll();

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
    <section className="relative w-full h-screen overflow-hidden snap-start">
      {/* Parallax Background Layer */}
      <div 
        className="absolute inset-0 will-change-transform"
        style={{ 
          transform: parallax.backgroundTransform,
          opacity: parallax.contentOpacity 
        }}
      >
        <ResponsiveCreate3DLayout
          isPaused={isPaused}
          onTogglePause={handleTogglePause}
          onAnimationComplete={handleAnimationComplete}
        />
      </div>

      {/* Content Layer with Parallax */}
      <div 
        className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
        style={{ opacity: parallax.contentOpacity }}
      >
        {/* Label */}
        <div className="mb-4 gradient-text-green-blue-purple font-bold tracking-wider text-xs sm:text-sm uppercase">
          CUT, CRAFT & CREATE DIGITALLY
        </div>

        {/* Main Heading with Parallax CRD Effect */}
        <div 
          className="mb-6 text-center will-change-transform"
          style={{ transform: parallax.crdTransform }}
        >
          <h1 className="leading-tight text-crd-white drop-shadow-lg">
            <div className="flex justify-center items-center mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="text-gray-400 font-light">
                From <span className="paper-scraps">paper scraps</span> and <span className="cardboard-text">cardboard</span> to
              </span>
            </div>
            <div className="flex justify-center items-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="font-bold">
                <PixelDigital className="inline">digital</PixelDigital>
                <span className="text-white"> art that comes alive!</span>
              </span>
            </div>
          </h1>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center my-6">
          <Link to="/create/crd">
            <CRDButton 
              size={isMobile ? "default" : "lg"}
              variant="create"
              className="min-w-[200px]"
            >
              Start Creating
            </CRDButton>
          </Link>
          <Link to="/templates">
            <CRDButton 
              variant="outline" 
              size={isMobile ? "default" : "lg"}
              className="min-w-[200px]"
            >
              Browse Templates
            </CRDButton>
          </Link>
        </div>

        {/* Animated Tagline with Parallax */}
        <div 
          className="mt-8 will-change-transform"
          style={{ transform: parallax.taglineTransform }}
        >
          <p className="font-caveat text-2xl md:text-3xl lg:text-4xl italic text-center text-crd-orange animate-fade-in">
            "No glue needed."
          </p>
        </div>
      </div>

      {/* Scroll Indicator with Fade Animation */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-500"
        style={{ 
          opacity: parallax.showScrollIndicator ? 1 : 0,
          pointerEvents: parallax.showScrollIndicator ? 'auto' : 'none'
        }}
      >
        <ScrollIndicator isVisible={parallax.showScrollIndicator} />
      </div>

      {/* Parallax Transition Overlay */}
      <div 
        className="absolute inset-0 z-5 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent ${60 - parallax.scrollProgress * 40}%, hsl(var(--crd-darkest)) ${80 - parallax.scrollProgress * 20}%)`,
          opacity: parallax.scrollProgress * 0.8
        }}
      />
    </section>
  );
};
