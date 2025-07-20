
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
          />
        </StarsBackground>
      </div>

      {/* SCROLL PRIORITY ZONE - Complete bottom area for page scrolling only */}
      <div 
        id="scroll-priority-zone"
        className="absolute left-0 right-0 w-full z-50 pointer-events-auto"
        style={{ 
          bottom: 0,
          height: '180px', // Cover from scroll indicator to bottom
          background: 'transparent',
          cursor: 'default'
        }}
        onMouseEnter={() => {
          document.body.style.cursor = 'default';
        }}
        onMouseLeave={() => {
          document.body.style.cursor = '';
        }}
        onWheel={(e) => {
          // Only allow page scrolling - block everything else
          e.stopPropagation();
          e.preventDefault();
          window.scrollBy(0, e.deltaY);
        }}
        onMouseDown={(e) => {
          // Block all mouse down events
          e.stopPropagation();
          e.preventDefault();
          return false;
        }}
        onMouseMove={(e) => {
          // Block all mouse move events
          e.stopPropagation();
          e.preventDefault();
          return false;
        }}
        onMouseUp={(e) => {
          // Block all mouse up events
          e.stopPropagation();
          e.preventDefault();
          return false;
        }}
        onClick={(e) => {
          // Block all click events
          e.stopPropagation();
          e.preventDefault();
          return false;
        }}
        onDoubleClick={(e) => {
          // Block double click events
          e.stopPropagation();
          e.preventDefault();
          return false;
        }}
        onDrag={(e) => {
          // Block all drag events
          e.stopPropagation();
          e.preventDefault();
          return false;
        }}
        onDragStart={(e) => {
          // Block drag start
          e.stopPropagation();
          e.preventDefault();
          return false;
        }}
        onTouchStart={(e) => {
          // Block touch start for 3D controls
          e.stopPropagation();
        }}
        onTouchMove={(e) => {
          // Allow touch scrolling only
          e.stopPropagation();
        }}
        onTouchEnd={(e) => {
          // Block touch end for 3D controls
          e.stopPropagation();
        }}
        onContextMenu={(e) => {
          // Block right-click menu
          e.stopPropagation();
          e.preventDefault();
          return false;
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
