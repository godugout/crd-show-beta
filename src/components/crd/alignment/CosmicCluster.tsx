
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CosmicClusterProps {
  visible: boolean;
  intensity?: number;
}

export const CosmicCluster: React.FC<CosmicClusterProps> = ({
  visible,
  intensity = 1.0
}) => {
  const meshRef = useRef<THREE.Points>(null);
  
  // Create very subtle dark particles instead of bright ones
  const particles = useMemo(() => {
    const count = 50; // Much fewer particles
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (meshRef.current && visible) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  if (!visible) return null;

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        color="#333333" // Very dark particles
        transparent
        opacity={0.3 * intensity} // Very low opacity
        depthWrite={false}
      />
    </points>
  );
};
