
import React, { useState } from 'react';
import { FloatingCard3D } from '@/components/ui/FloatingCard3D';
import { StarsBackground } from '@/components/ui/stars';
import { StudioPauseButton } from '@/components/studio/StudioPauseButton';
import { RefreshCw } from 'lucide-react';
import { AlignmentTutorial } from './AlignmentTutorial';
import { type SpaceEnvironment } from '@/components/studio/EnvironmentSwitcher';

interface ResponsiveCreate3DLayoutProps {
  isPaused: boolean;
  onTogglePause: () => void;
  className?: string;
  onAnimationComplete?: () => void;
}

export const ResponsiveCreate3DLayout: React.FC<ResponsiveCreate3DLayoutProps> = ({
  isPaused,
  onTogglePause,
  className = '',
  onAnimationComplete
}) => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [spaceEnvironment, setSpaceEnvironment] = useState<SpaceEnvironment>('starfield');

  const handleAnimationComplete = () => {
    console.log('🚀 ResponsiveCreate3DLayout: Animation complete, forwarding to parent');
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  return (
    <div 
      className={className}
      style={{ cursor: 'grab' }}
      onMouseDown={(e) => {
        // Don't capture events in the bottom scroll zone (starting from scroll indicator)
        const bottomZone = window.innerHeight - 180; // 180px from bottom to include scroll indicator
        if (e.clientY > bottomZone) return;
        
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
            onAnimationComplete={handleAnimationComplete}
          />
        </StarsBackground>
      </div>


      {/* Alignment Tutorial Overlay */}
      <AlignmentTutorial 
        isVisible={showTutorial}
        onClose={() => setShowTutorial(false)}
      />
    </div>
  );
};
