
import React from 'react';
import { Link } from 'react-router-dom';
import { useResponsiveBreakpoints } from '@/hooks/useResponsiveBreakpoints';
import { ResponsiveCreate3DLayout } from './ResponsiveCreate3DLayout';
import { CRDButton, Typography } from '@/components/ui/design-system';
import { PixelDigital } from '@/components/ui/PixelDigital';
import { ScrollIndicator } from './ScrollIndicator';

interface UnifiedCreateHeroProps {
  onAnimationComplete?: () => void;
}

export const UnifiedCreateHero: React.FC<UnifiedCreateHeroProps> = ({ onAnimationComplete }) => {
  const { isShortScreen } = useResponsiveBreakpoints();

  // Short screen layout (height < 700px)
  if (isShortScreen) {
    return (
      <div className="relative min-h-screen bg-crd-darkest">
        <ResponsiveCreate3DLayout onAnimationComplete={onAnimationComplete}>
          <div className="relative z-10 flex flex-col justify-center min-h-screen">
            <div className="flex-1 flex flex-col justify-center">
              {/* Hero Content - Compact for short screens */}
              <div className="text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                {/* Main Heading - Compact */}
                <div className="mb-12">
                  <h1 className="leading-tight text-crd-white drop-shadow-lg">
                    <div className="flex justify-center items-center mb-2 text-3xl md:text-4xl">
                      <span className="text-gray-400 font-light">
                        From basketball legends to
                      </span>
                    </div>
                    <div className="flex justify-center items-center text-4xl md:text-5xl">
                      <span className="font-bold">
                        <PixelDigital className="inline">CRD</PixelDigital>
                        <span className="text-white"> art</span>
                        <span className="text-white font-bold"> that comes alive!</span>
                      </span>
                    </div>
                  </h1>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                
                {/* Inspirational tagline */}
                <div className="text-center px-6 mt-8">
                  <Typography 
                    variant="large-body" 
                    className="text-crd-lightGray max-w-3xl mx-auto mobile-body animate-fade-in"
                  >
                    From basketball legends to anime heroes, fantasy realms to family memories — craft CRDs that captivate hearts and soon share STRYs that bring your universe to life.
                  </Typography>
                </div>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <ScrollIndicator />
          </div>
        </ResponsiveCreate3DLayout>
      </div>
    );
  }

  // Normal screen layout (height >= 700px)
  return (
    <div className="relative min-h-screen bg-crd-darkest">
      <ResponsiveCreate3DLayout onAnimationComplete={onAnimationComplete}>
        <div className="relative z-10 flex flex-col justify-center min-h-screen">
          <div className="flex-1 flex flex-col justify-center">
            {/* Hero Content */}
            <div className="text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
              {/* Label */}
              <div className="mb-6 gradient-text-green-blue-purple font-bold tracking-wider text-sm uppercase">
                CUT, CRAFT & CREATE DIGITALLY
              </div>
              
              {/* Main Heading */}
              <div className="mb-12">
                <h1 className="leading-tight text-crd-white drop-shadow-lg">
                  <div className="flex justify-center items-center mb-4 text-4xl md:text-5xl lg:text-6xl">
                    <span className="text-gray-400 font-light">
                      From basketball legends to
                    </span>
                  </div>
                  <div className="flex justify-center items-center text-5xl md:text-6xl lg:text-7xl">
                    <span className="font-bold">
                      <PixelDigital className="inline">CRD</PixelDigital>
                      <span className="text-white"> art</span>
                      <span className="text-white font-bold"> that comes alive!</span>
                    </span>
                  </div>
                </h1>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center my-8">
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
              
              <div className="mt-8">
                {/* Inspirational tagline */}
                <div className="text-center px-6">
                  <Typography 
                    variant="large-body" 
                    className="text-crd-lightGray max-w-3xl mx-auto mobile-body animate-fade-in"
                  >
                    From basketball legends to anime heroes, fantasy realms to family memories — craft CRDs that captivate hearts and soon share STRYs that bring your universe to life.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <ScrollIndicator />
        </div>
      </ResponsiveCreate3DLayout>
    </div>
  );
};
