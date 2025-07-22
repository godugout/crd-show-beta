
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CRDButton } from '@/components/ui/design-system/Button';
import { PixelDigital } from '@/components/ui/PixelDigital';
import { ChevronDown } from 'lucide-react';
import { ResponsiveCreate3DLayout } from './ResponsiveCreate3DLayout';

const scrollToStudio = () => {
  const studioSection = document.getElementById('studio-section');
  studioSection?.scrollIntoView({ behavior: 'smooth' });
};

interface UnifiedCreateHeroProps {
  onAnimationComplete?: () => void;
}

export const UnifiedCreateHero: React.FC<UnifiedCreateHeroProps> = ({ onAnimationComplete }) => {
  const [isPaused, setIsPaused] = useState(false);

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleAnimationComplete = () => {
    onAnimationComplete?.();
  };

  return (
    <div className="relative w-full h-screen bg-crd-darkest overflow-hidden">
      {/* 3D Background */}
      <ResponsiveCreate3DLayout
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
        onAnimationComplete={handleAnimationComplete}
      />
      
      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center">
        {/* Short Screen Layout (< 600px height) */}
        <div className="block short:block tall:hidden text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Label */}
          <div className="mb-4 gradient-text-green-blue-purple font-bold tracking-wider text-xs uppercase">
            CUT, CRAFT & CREATE DIGITALLY
          </div>
          
          {/* Compact Main Heading */}
          <div className="mb-4">
            <h1 className="leading-tight text-crd-white drop-shadow-lg">
              <div className="flex justify-center items-center mb-2 text-2xl md:text-3xl">
                <span className="text-gray-400 font-light">From <span className="paper-scraps">paper scraps</span> and <span className="cardboard-text">cardboard</span> to</span>
              </div>
              <div className="flex justify-center items-center text-3xl md:text-4xl">
                <span>
                  <PixelDigital className="inline">digital</PixelDigital>
                  <span className="text-white font-light"> CRD art that comes alive!</span>
                </span>
              </div>
            </h1>
          </div>
          
          {/* Compact CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center my-4">
            <Link to="/create/crd">
              <CRDButton 
                size="md" 
                variant="create"
                className="min-w-[160px]"
              >
                Start Creating
              </CRDButton>
            </Link>
            <Link to="/frames">
              <CRDButton 
                variant="outline" 
                size="md" 
                className="min-w-[160px]"
              >
                Browse Frames
              </CRDButton>
            </Link>
          </div>
          
          {/* Compact Tagline */}
          <div className="mt-4">
            <p className="font-caveat text-xl italic text-center text-crd-orange animate-fade-in">
              "No glue needed."
            </p>
          </div>
        </div>

        {/* Normal Screen Layout (>= 600px height) */}
        <div className="hidden tall:block text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Label */}
          <div className="mb-8 gradient-text-green-blue-purple font-bold tracking-wider text-sm uppercase">
            CUT, CRAFT & CREATE DIGITALLY
          </div>
          
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="leading-tight text-crd-white drop-shadow-lg">
              <div className="flex justify-center items-center mb-6 text-3xl md:text-4xl lg:text-5xl">
                <span className="text-gray-400 font-light">From <span className="paper-scraps">paper scraps</span> and <span className="cardboard-text">cardboard</span> to</span>
              </div>
              <div className="flex justify-center items-center text-4xl md:text-5xl lg:text-6xl">
                <span>
                  <PixelDigital className="inline">digital</PixelDigital>
                  <span className="text-white font-light"> CRD art that comes alive!</span>
                </span>
              </div>
            </h1>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center my-10">
            <Link to="/create/crd">
              <CRDButton 
                size="lg" 
                variant="create"
                className="min-w-[200px]"
              >
                Start Creating
              </CRDButton>
            </Link>
            <Link to="/frames">
              <CRDButton 
                variant="outline" 
                size="lg" 
                className="min-w-[200px]"
              >
                Browse Frames
              </CRDButton>
            </Link>
          </div>
          
          {/* Animated Tagline */}
          <div className="mt-10">
            <p className="font-caveat text-2xl md:text-3xl italic text-center text-crd-orange animate-fade-in">
              "No glue needed."
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToStudio}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-3 text-crd-lightGray hover:text-crd-white transition-colors animate-bounce"
          aria-label="Scroll to 3D studio"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
