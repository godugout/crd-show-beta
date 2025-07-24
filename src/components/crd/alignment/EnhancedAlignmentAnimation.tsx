import React, { useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

interface EnhancedAlignmentAnimationProps {
  isTriggered: boolean;
  isPlaying: boolean;
  animationProgress: number;
  onCardControlUpdate?: (params: { 
    position: THREE.Vector3; 
    rotation: THREE.Euler; 
    controlTaken: boolean 
  }) => void;
  currentCardPosition?: THREE.Vector3;
  currentCardRotation?: THREE.Euler;
  onAnimationComplete?: () => void;
}

type AnimationPhase = 'capture' | 'rotation' | 'descent' | 'tilt' | 'complete';

interface AnimationState {
  phase: AnimationPhase;
  startPosition: THREE.Vector3;
  startRotation: THREE.Euler;
  phaseProgress: number;
  totalDuration: number;
}

export const EnhancedAlignmentAnimation: React.FC<EnhancedAlignmentAnimationProps> = ({
  isTriggered,
  isPlaying,
  animationProgress,
  onCardControlUpdate,
  currentCardPosition = new THREE.Vector3(0, 0, 0),
  currentCardRotation = new THREE.Euler(0, 0, 0),
  onAnimationComplete
}) => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    phase: 'capture',
    startPosition: new THREE.Vector3(),
    startRotation: new THREE.Euler(),
    phaseProgress: 0,
    totalDuration: 5000 // 5 second total animation
  });

  // Phase durations (as percentages of total)
  const PHASE_DURATIONS = {
    capture: 0.05,   // 5% - instant capture
    rotation: 0.4,   // 40% - full rotation 
    descent: 0.25,   // 25% - move down
    tilt: 0.25,      // 25% - tilt forward
    complete: 0.05   // 5% - hold final position
  };

  // Capture starting position when triggered
  useEffect(() => {
    if (isTriggered && animationState.phase === 'capture') {
      console.log('🌌 Enhanced alignment: Capturing starting position');
      setAnimationState(prev => ({
        ...prev,
        startPosition: currentCardPosition.clone(),
        startRotation: currentCardRotation.clone(),
        phase: 'rotation'
      }));
    }
  }, [isTriggered, currentCardPosition, currentCardRotation, animationState.phase]);

  // Calculate current animation phase based on progress
  const getCurrentPhase = useCallback((progress: number): { phase: AnimationPhase; phaseProgress: number } => {
    let cumulativeProgress = 0;
    
    for (const [phase, duration] of Object.entries(PHASE_DURATIONS)) {
      const phaseEnd = cumulativeProgress + duration;
      if (progress <= phaseEnd) {
        const phaseProgress = (progress - cumulativeProgress) / duration;
        return { phase: phase as AnimationPhase, phaseProgress: Math.max(0, Math.min(1, phaseProgress)) };
      }
      cumulativeProgress = phaseEnd;
    }
    
    return { phase: 'complete', phaseProgress: 1 };
  }, []);

  // Update animation based on progress
  useEffect(() => {
    if (!isTriggered || !isPlaying || !onCardControlUpdate) return;

    const { phase, phaseProgress } = getCurrentPhase(animationProgress);
    
    // Update phase if changed
    if (phase !== animationState.phase) {
      console.log(`🌌 Enhanced alignment: Phase change ${animationState.phase} → ${phase}`);
      setAnimationState(prev => ({ ...prev, phase, phaseProgress }));
    }

    // Calculate position and rotation based on current phase
    let targetPosition = animationState.startPosition.clone();
    let targetRotation = animationState.startRotation.clone();

    switch (phase) {
      case 'capture':
        // Keep starting position
        break;

      case 'rotation': {
        // Complete 360° rotation from starting rotation
        const rotationProgress = phaseProgress;
        targetRotation.y = animationState.startRotation.y + (Math.PI * 2 * rotationProgress);
        break;
      }

      case 'descent': {
        // Move down by 2 units
        targetPosition.y = animationState.startPosition.y - (2 * phaseProgress);
        // Keep final rotation from previous phase
        targetRotation.y = animationState.startRotation.y + (Math.PI * 2);
        break;
      }

      case 'tilt': {
        // Tilt forward 45 degrees
        targetPosition.y = animationState.startPosition.y - 2; // Final descent position
        targetRotation.y = animationState.startRotation.y + (Math.PI * 2); // Final rotation
        targetRotation.x = THREE.MathUtils.degToRad(45 * phaseProgress); // Tilt forward
        break;
      }

      case 'complete': {
        // Hold final position
        targetPosition.y = animationState.startPosition.y - 2;
        targetRotation.y = animationState.startRotation.y + (Math.PI * 2);
        targetRotation.x = THREE.MathUtils.degToRad(45);
        
        // Trigger completion callback
        if (phaseProgress >= 1 && onAnimationComplete) {
          onAnimationComplete();
        }
        break;
      }
    }

    // Apply smooth easing
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const easedProgress = easeInOutCubic(phaseProgress);
    
    // Interpolate to target values
    if (phase !== 'capture') {
      onCardControlUpdate({
        position: targetPosition,
        rotation: targetRotation,
        controlTaken: true
      });
    }

  }, [
    isTriggered, 
    isPlaying, 
    animationProgress, 
    animationState, 
    getCurrentPhase, 
    onCardControlUpdate,
    onAnimationComplete
  ]);

  // Reset when animation stops
  useEffect(() => {
    if (!isPlaying && isTriggered) {
      console.log('🌌 Enhanced alignment: Animation stopped, releasing control');
      if (onCardControlUpdate) {
        onCardControlUpdate({
          position: new THREE.Vector3(0, 0, 0),
          rotation: new THREE.Euler(0, 0, 0),
          controlTaken: false
        });
      }
    }
  }, [isPlaying, isTriggered, onCardControlUpdate]);

  // Reset state when animation resets
  useEffect(() => {
    if (animationProgress === 0 && !isPlaying) {
      setAnimationState(prev => ({
        ...prev,
        phase: 'capture',
        phaseProgress: 0
      }));
    }
  }, [animationProgress, isPlaying]);

  return (
    <div className="fixed top-4 right-4 z-30 pointer-events-none">
      {/* Debug info for development */}
      {process.env.NODE_ENV === 'development' && isTriggered && (
        <div className="bg-black/80 text-white p-3 rounded-lg text-sm space-y-1">
          <div className="font-bold text-orange-400">Enhanced Alignment</div>
          <div>Phase: {animationState.phase}</div>
          <div>Progress: {Math.round(animationProgress * 100)}%</div>
          <div>Phase Progress: {Math.round(animationState.phaseProgress * 100)}%</div>
        </div>
      )}
    </div>
  );
};
