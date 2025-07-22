
import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/design-system/Typography';
import { CRDButton } from '@/components/ui/design-system/CRDButton';
import { ResponsiveModelViewer } from '@/components/3d/ResponsiveModelViewer';
import { useResponsiveBreakpoints } from '@/hooks/useResponsiveBreakpoints';

interface UnifiedCreateHeroProps {
  onAnimationComplete?: () => void;
}

export const UnifiedCreateHero: React.FC<UnifiedCreateHeroProps> = ({ onAnimationComplete }) => {
  const { isMobile, isTablet } = useResponsiveBreakpoints();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const modelVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        delay: 0.4
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

      {/* Dynamic Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,81,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,81,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onAnimationComplete={onAnimationComplete}
          className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-8 lg:gap-16 items-center`}
        >
          {/* Left Column - Hero Content */}
          <div className={`${isMobile ? 'text-center' : 'text-left'} space-y-8`}>
            <motion.div variants={itemVariants} className="space-y-6">
              <Typography
                variant="hero"
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight"
              >
                Create Cards That{' '}
                <span className="bg-gradient-to-r from-crd-green via-crd-blue to-crd-purple bg-clip-text text-transparent">
                  Come Alive
                </span>
              </Typography>
              
              <Typography
                variant="large-body"
                className="font-playfair text-xl sm:text-2xl lg:text-3xl text-gray-300 italic leading-relaxed font-semibold"
              >
                "Where imagination meets innovation,{' '}
                <span className="text-gray-200">every card tells a story</span>"
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <Typography
                variant="large-body"
                className="text-lg sm:text-xl text-crd-lightGray leading-relaxed max-w-2xl"
              >
                Professional card creation tools meet cutting-edge 3D technology. 
                Import your designs, add depth and motion, then mint collectibles that collectors actually treasure.
              </Typography>

              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 ${isMobile ? 'items-center' : 'items-start'}`}>
                <CRDButton
                  variant="primary"
                  size="large"
                  className="w-full sm:w-auto bg-gradient-to-r from-crd-green to-crd-blue hover:from-crd-blue hover:to-crd-green transform hover:scale-105 transition-all duration-300"
                >
                  Start Creating
                </CRDButton>
                
                <CRDButton
                  variant="outline"
                  size="large"
                  className="w-full sm:w-auto border-crd-mediumGray text-crd-white hover:bg-crd-mediumGray/20"
                >
                  View Gallery
                </CRDButton>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-8 text-sm text-crd-lightGray">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-crd-green rounded-full animate-pulse"></div>
                <span>Upload PSD files</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-crd-blue rounded-full animate-pulse"></div>
                <span>Add 3D depth</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-crd-purple rounded-full animate-pulse"></div>
                <span>Mint & collect</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - 3D Model Viewer */}
          {!isMobile && (
            <motion.div
              variants={modelVariants}
              className="relative h-[600px] lg:h-[700px]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-crd-green/5 to-transparent rounded-3xl"></div>
              <ResponsiveModelViewer
                className="w-full h-full"
                autoRotate={true}
                showControls={false}
                cardData={{
                  frontImage: "/placeholder.svg",
                  playerName: "Demo Card",
                  teamName: "CARDSHOW",
                  position: "Creator",
                  stats: { overall: 99 }
                }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Mobile 3D Model - Bottom positioned */}
      {isMobile && (
        <motion.div
          variants={modelVariants}
          className="relative mt-12 h-[400px] w-full max-w-md mx-auto"
        >
          <ResponsiveModelViewer
            className="w-full h-full"
            autoRotate={true}
            showControls={false}
            cardData={{
              frontImage: "/placeholder.svg",
              playerName: "Demo Card",
              teamName: "CARDSHOW",
              position: "Creator",
              stats: { overall: 99 }
            }}
          />
        </motion.div>
      )}
    </section>
  );
};
