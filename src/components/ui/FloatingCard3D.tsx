
import React from 'react';
import { CRDViewer } from '@/components/crd/CRDViewer';
import { useResponsiveBreakpoints } from '@/hooks/useResponsiveBreakpoints';
import { type SpaceEnvironment } from '@/components/studio/EnvironmentSwitcher';

interface FloatingCard3DProps {
  isPaused?: boolean;
  onTogglePause?: () => void;
  onReset?: () => void;
  showPauseButton?: boolean;
  onShowTutorial?: () => void;
  spaceEnvironment?: SpaceEnvironment;
  onSpaceEnvironmentChange?: (environment: SpaceEnvironment) => void;
  onAnimationComplete?: () => void;
}

export const FloatingCard3D: React.FC<FloatingCard3DProps> = ({ 
  isPaused, 
  onTogglePause,
  onReset,
  showPauseButton = false,
  onShowTutorial,
  spaceEnvironment = 'starfield',
  onSpaceEnvironmentChange,
  onAnimationComplete
}) => {
  const { deviceType, isShortScreen } = useResponsiveBreakpoints();

  // Adjust intensity, quality, and initial zoom based on device type
  const getDeviceConfig = () => {
    switch (deviceType) {
      case 'mobile':
        return { intensity: 0.7, autoRotate: false, enableControls: true, initialCameraDistance: 15 };
      case 'tablet':
        return { intensity: 0.8, autoRotate: false, enableControls: true, initialCameraDistance: 13 };
      case 'large-desktop':
        return { intensity: 1.2, autoRotate: false, enableControls: true, initialCameraDistance: 8 };
      default: // desktop
        return { intensity: 1, autoRotate: false, enableControls: true, initialCameraDistance: 10 };
    }
  };

  const deviceConfig = getDeviceConfig();

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <CRDViewer
        mode="alignment"
        intensity={deviceConfig.intensity}
        lightingPreset="studio"
        pathTheme="neutral"
        autoRotate={deviceConfig.autoRotate}
        enableControls={deviceConfig.enableControls}
        enableGlassCase={false}
        showModeText={false}
        hideAlignmentControls={true}
        initialCameraDistance={deviceConfig.initialCameraDistance}
        className="w-full h-full"
        isPaused={isPaused}
        onTogglePause={onTogglePause}
        onAlignmentReset={onReset}
        showPauseButton={showPauseButton}
        onShowTutorial={onShowTutorial}
        spaceEnvironment={spaceEnvironment}
        onSpaceEnvironmentChange={onSpaceEnvironmentChange}
        onAlignmentStateChange={(state) => {
          console.log('🔄 FloatingCard3D: Animation state change', {
            progress: state.animationProgress,
            isPlaying: state.isPlaying
          });
          
          // Trigger completion when animation reaches the end and stops playing
          if (state.animationProgress >= 1 && !state.isPlaying && onAnimationComplete) {
            console.log('🎯 FloatingCard3D: Animation completed, triggering callback');
            onAnimationComplete();
          }
        }}
      />
    </div>
  );
};
