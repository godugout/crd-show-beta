
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

      {/* Scroll Priority Zone - Bottom area that disables 3D controls and allows page scrolling */}
      <div 
        id="scroll-priority-zone"
        className="absolute bottom-0 left-0 right-0 h-32 z-50 pointer-events-auto"
        style={{ 
          background: 'transparent',
          cursor: 'default' // Override the grab cursor
        }}
        onMouseEnter={(e) => {
          // Ensure cursor is default when entering this zone
          e.currentTarget.style.cursor = 'default';
          document.body.style.cursor = 'default';
        }}
        onMouseLeave={(e) => {
          // Reset cursor when leaving this zone
          document.body.style.cursor = '';
        }}
        onWheel={(e) => {
          // Allow normal page scrolling in this zone
          e.stopPropagation();
          window.scrollBy(0, e.deltaY);
        }}
        onMouseDown={(e) => {
          // Completely prevent 3D controls from activating in this zone
          e.stopPropagation();
          e.preventDefault();
        }}
        onMouseMove={(e) => {
          // Prevent 3D controls from activating in this zone and ensure cursor stays default
          e.stopPropagation();
          e.currentTarget.style.cursor = 'default';
        }}
        onMouseUp={(e) => {
          // Prevent 3D controls from activating in this zone
          e.stopPropagation();
        }}
        onDragStart={(e) => {
          // Disable drag functionality completely in this zone
          e.preventDefault();
        }}
        onTouchStart={(e) => {
          // Prevent touch controls on mobile
          e.stopPropagation();
        }}
        onTouchMove={(e) => {
          // Allow touch scrolling on mobile
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
