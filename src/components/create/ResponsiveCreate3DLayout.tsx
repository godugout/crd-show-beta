
import React, { useState } from 'react';
import { FloatingCard3D } from '@/components/ui/FloatingCard3D';
import { StarsBackground } from '@/components/ui/stars';
import { StudioPauseButton } from '@/components/studio/StudioPauseButton';
import { RefreshCw } from 'lucide-react';
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
          />
        </StarsBackground>
      </div>

      {/* Control Buttons */}
      <div className="absolute bottom-6 right-6 z-[100] flex gap-3">
        <StudioPauseButton 
          isPaused={isPaused} 
          onTogglePause={onTogglePause} 
        />
        <button
          onClick={() => window.location.reload()}
          className="group text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center border"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.12) 100%)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px) saturate(180%)'
          }}
          title="Refresh Page"
        >
          <RefreshCw className="w-4 h-4 transition-transform group-hover:scale-110" />
        </button>
      </div>

      {/* Alignment Tutorial Overlay */}
      <AlignmentTutorial 
        isVisible={showTutorial}
        onClose={() => setShowTutorial(false)}
      />
    </div>
  );
};
