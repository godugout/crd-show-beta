import { useState, useCallback, useRef } from 'react';
import * as THREE from 'three';

interface MovementFrame {
  timestamp: number;
  cameraPosition: THREE.Vector3;
  cameraTarget: THREE.Vector3;
  cardRotation: THREE.Euler;
}

interface UseCardMovementHistoryProps {
  maxHistoryLength?: number;
  recordingInterval?: number;
}

export const useCardMovementHistory = ({
  maxHistoryLength = 100,
  recordingInterval = 100 // Record every 100ms
}: UseCardMovementHistoryProps = {}) => {
  const [movementHistory, setMovementHistory] = useState<MovementFrame[]>([]);
  const [isRecording, setIsRecording] = useState(true);
  const [initialState, setInitialState] = useState<MovementFrame | null>(null);
  const lastRecordedTime = useRef<number>(0);

  // Record the initial state when tracking starts
  const recordInitialState = useCallback((
    cameraPosition: THREE.Vector3,
    cameraTarget: THREE.Vector3,
    cardRotation: THREE.Euler = new THREE.Euler(0, 0, 0)
  ) => {
    const frame: MovementFrame = {
      timestamp: Date.now(),
      cameraPosition: cameraPosition.clone(),
      cameraTarget: cameraTarget.clone(),
      cardRotation: cardRotation.clone()
    };
    
    setInitialState(frame);
    setMovementHistory([frame]);
    console.log('🎬 Initial card state recorded:', frame);
  }, []);

  // Record a movement frame
  const recordMovement = useCallback((
    cameraPosition: THREE.Vector3,
    cameraTarget: THREE.Vector3,
    cardRotation: THREE.Euler = new THREE.Euler(0, 0, 0)
  ) => {
    if (!isRecording) return;

    const now = Date.now();
    
    // Throttle recording to avoid too many frames
    if (now - lastRecordedTime.current < recordingInterval) return;
    
    lastRecordedTime.current = now;

    const frame: MovementFrame = {
      timestamp: now,
      cameraPosition: cameraPosition.clone(),
      cameraTarget: cameraTarget.clone(),
      cardRotation: cardRotation.clone()
    };

    setMovementHistory(prev => {
      const newHistory = [...prev, frame];
      
      // Keep history within max length
      if (newHistory.length > maxHistoryLength) {
        return newHistory.slice(-maxHistoryLength);
      }
      
      return newHistory;
    });
  }, [isRecording, recordingInterval, maxHistoryLength]);

  // Get a frame at a specific progress (0 = start, 1 = current)
  const getFrameAtProgress = useCallback((progress: number): MovementFrame | null => {
    if (movementHistory.length === 0) return null;
    
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const frameIndex = Math.floor(clampedProgress * (movementHistory.length - 1));
    
    return movementHistory[frameIndex] || null;
  }, [movementHistory]);

  // Reset to initial state
  const resetToInitial = useCallback((): MovementFrame | null => {
    console.log('🔄 Resetting to initial card state');
    return initialState;
  }, [initialState]);

  // Rewind to a specific point in time
  const rewindToProgress = useCallback((progress: number): MovementFrame | null => {
    const frame = getFrameAtProgress(progress);
    if (frame) {
      console.log(`⏪ Rewinding to ${(progress * 100).toFixed(1)}% of movement history`);
    }
    return frame;
  }, [getFrameAtProgress]);

  // Clear all history
  const clearHistory = useCallback(() => {
    setMovementHistory([]);
    setInitialState(null);
    console.log('🗑️ Movement history cleared');
  }, []);

  // Toggle recording
  const toggleRecording = useCallback(() => {
    setIsRecording(prev => {
      const newState = !prev;
      console.log(`📹 Movement recording ${newState ? 'started' : 'stopped'}`);
      return newState;
    });
  }, []);

  // Get history stats
  const getHistoryStats = useCallback(() => {
    if (movementHistory.length === 0) {
      return { totalFrames: 0, duration: 0, averageInterval: 0 };
    }

    const firstFrame = movementHistory[0];
    const lastFrame = movementHistory[movementHistory.length - 1];
    const duration = lastFrame.timestamp - firstFrame.timestamp;
    const averageInterval = duration / Math.max(1, movementHistory.length - 1);

    return {
      totalFrames: movementHistory.length,
      duration,
      averageInterval
    };
  }, [movementHistory]);

  return {
    // State
    movementHistory,
    isRecording,
    initialState,
    
    // Actions
    recordInitialState,
    recordMovement,
    resetToInitial,
    rewindToProgress,
    getFrameAtProgress,
    clearHistory,
    toggleRecording,
    
    // Utils
    getHistoryStats,
    hasHistory: movementHistory.length > 1,
    canRewind: movementHistory.length > 1
  };
};
