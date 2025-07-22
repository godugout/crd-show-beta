
import React from 'react';
import { CRDViewer } from '@/components/crd/CRDViewer';
import { useResponsiveBreakpoints } from '@/hooks/useResponsiveBreakpoints';
import { type SpaceEnvironment } from '@/components/studio/EnvironmentSwitcher';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

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

  // Adjust intensity and quality based on device type - Enable controls for all devices
  const getDeviceConfig = () => {
    switch (deviceType) {
      case 'mobile':
        return { intensity: 0.7, autoRotate: false, enableControls: true };
      case 'tablet':
        return { intensity: 0.8, autoRotate: false, enableControls: true };
      case 'large-desktop':
        return { intensity: 1.2, autoRotate: false, enableControls: true };
      default:
        return { intensity: 1, autoRotate: false, enableControls: true };
    }
  };

  const deviceConfig = getDeviceConfig();

  console.log('🎮 FloatingCard3D: Component rendering', { deviceConfig, isPaused, spaceEnvironment });

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {(() => {
        console.log('🎮 FloatingCard3D: About to render without Suspense');
        console.log('🎮 FloatingCard3D: Props check:', { deviceConfig, isPaused, spaceEnvironment });
        
        try {
          return (
            <ErrorBoundary 
              fallbackComponent={({ error, retry }) => (
                <div className="text-white text-center absolute inset-0 flex items-center justify-center bg-red-900/20">
                  <div>
                    <p className="text-xl mb-2">❌ 3D Animation Error</p>
                    <p className="text-sm mb-4">Error: {error.message}</p>
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center mb-4">
                      <div className="w-32 h-44 bg-gray-800 rounded-lg border border-gray-600 shadow-2xl transform rotate-12 animate-pulse"></div>
                    </div>
                    <button onClick={retry} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                      Retry 3D Animation
                    </button>
                  </div>
                </div>
              )}
            >
              <CRDViewer
                mode="alignment"
                intensity={deviceConfig.intensity}
                lightingPreset="studio"
                pathTheme="neutral"
                autoRotate={deviceConfig.autoRotate}
                enableControls={deviceConfig.enableControls}
                enableGlassCase={true}
                showModeText={false}
                hideAlignmentControls={true}
                className="w-full h-full min-h-screen"
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
            </ErrorBoundary>
          );
        } catch (error) {
          console.error('❌ FloatingCard3D: Immediate error:', error);
          return (
            <div className="absolute inset-0 flex items-center justify-center bg-red-900/20">
              <div className="text-white text-center">
                <p className="text-xl mb-2">❌ Critical 3D Error</p>
                <p className="text-sm mb-4">Failed to initialize 3D viewer</p>
                <div className="w-32 h-44 bg-gray-800 rounded-lg border border-gray-600 shadow-2xl transform rotate-12 animate-pulse"></div>
              </div>
            </div>
          );
        }
      })()}
    </div>
  );
};
