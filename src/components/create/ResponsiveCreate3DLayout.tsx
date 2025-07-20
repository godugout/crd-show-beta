
import React, { useState } from 'react';
import { FloatingCard3D } from '@/components/ui/FloatingCard3D';
import { StarsBackground } from '@/components/ui/stars';
import { StudioPauseButton } from '@/components/studio/StudioPauseButton';
import { EnvironmentSwitcher, type SpaceEnvironment } from '@/components/studio/EnvironmentSwitcher';
import { AlignmentTutorial } from './AlignmentTutorial';

interface ResponsiveCreate3DLayoutProps {
  isPaused: boolean;
  onTogglePause: () => void;
  className?: string;
}

export const ResponsiveCreate3DLayout: React.FC<ResponsiveCreate3DLayoutProps> = ({
  isPaused,
  onTogglePause,
  className = ''
}) => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [spaceEnvironment, setSpaceEnvironment] = useState<SpaceEnvironment>('starfield');

  // Show tutorial automatically on first visit (optional)
  React.useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('crd-alignment-tutorial-seen');
    if (!hasSeenTutorial) {
      const timer = setTimeout(() => {
        setShowTutorial(true);
        localStorage.setItem('crd-alignment-tutorial-seen', 'true');
      }, 2000); // Show after 2 seconds
      return () => clearTimeout(timer);
    }
  }, []);
  return (
    <div 
      className={`fixed inset-0 z-0 ${className}`}
      style={{ cursor: 'grab' }}
      onMouseDown={(e) => {
        e.currentTarget.style.cursor = 'grabbing';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.cursor = 'grab';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.cursor = 'grab';
      }}
    >
      {/* Full Screen Starry Background with 3D Animation */}
      <div className="absolute inset-0">
        <StarsBackground>
          <FloatingCard3D 
            isPaused={isPaused}
            onTogglePause={onTogglePause}
            showPauseButton={false}
            onShowTutorial={() => setShowTutorial(true)}
            spaceEnvironment={spaceEnvironment}
            onSpaceEnvironmentChange={setSpaceEnvironment}
          />
        </StarsBackground>
      </div>

      {/* Control Buttons */}
      <div className="absolute bottom-6 right-6 z-[100] flex gap-3">
        <StudioPauseButton 
          isPaused={isPaused} 
          onTogglePause={onTogglePause} 
        />
        <EnvironmentSwitcher
          currentEnvironment={spaceEnvironment}
          onEnvironmentChange={setSpaceEnvironment}
        />
      </div>

      {/* Alignment Tutorial Overlay */}
      <AlignmentTutorial 
        isVisible={showTutorial}
        onClose={() => setShowTutorial(false)}
      />
    </div>
  );
};
