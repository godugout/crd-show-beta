
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AnimatedNebulaBackgroundProps {
  intensity?: number;
}

export const AnimatedNebulaBackground: React.FC<AnimatedNebulaBackgroundProps> = ({ 
  intensity = 1.0 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Animate the material colors over time
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      const time = state.clock.getElapsedTime();
      
      // Create animated color based on time
      const hue1 = (262 + Math.sin(time * 0.1) * 30) / 360; // Purple to blue range
      const hue2 = (25 + Math.sin(time * 0.08) * 15) / 360;  // Orange to red range
      
      // Interpolate between the two colors based on a sine wave
      const t = (Math.sin(time * 0.05) + 1) * 0.5; // 0 to 1
      const finalHue = hue1 * (1 - t) + hue2 * t;
      
      material.color.setHSL(finalHue, 0.8, 0.3 * intensity);
      material.opacity = 0.6 * intensity;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -50]}>
      <sphereGeometry args={[100, 32, 32]} />
      <meshBasicMaterial 
        transparent 
        opacity={0.6 * intensity}
        color={new THREE.Color().setHSL(262/360, 0.83, 0.58)}
      />
    </mesh>
  );
};
