
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
}

export const ResponsiveCreate3DLayout: React.FC<ResponsiveCreate3DLayoutProps> = ({
  isPaused,
  onTogglePause,
  className = ''
}) => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [spaceEnvironment, setSpaceEnvironment] = useState<SpaceEnvironment>('starfield');

  // Removed auto-play tutorial functionality - tutorial only shows when button is clicked
  return (
    <div 
      className={`fixed inset-0 z-0 ${className}`}
      style={{ cursor: 'grab' }}
      onMouseDown={(e) => {
        // Don't capture events in the bottom scroll zone
        const bottomZone = window.innerHeight - 150; // 150px from bottom
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
          />
        </StarsBackground>
      </div>

      {/* Scroll Priority Zone - Bottom area that allows page scrolling */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-auto"
        style={{ 
          background: 'transparent',
          cursor: 'default'
        }}
        onWheel={(e) => {
          // Allow normal page scrolling in this zone
          e.stopPropagation();
          window.scrollBy(0, e.deltaY);
        }}
        onMouseDown={(e) => {
          // Prevent 3D controls from activating in this zone
          e.stopPropagation();
        }}
        onMouseMove={(e) => {
          // Prevent 3D controls from activating in this zone
          e.stopPropagation();
        }}
      />

      {/* Alignment Tutorial Overlay */}
      <AlignmentTutorial 
        isVisible={showTutorial}
        onClose={() => setShowTutorial(false)}
      />
    </div>
  );
};
