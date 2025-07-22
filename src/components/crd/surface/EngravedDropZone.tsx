import React from 'react';
import { Text } from '@react-three/drei';
import { Upload } from 'lucide-react';
import * as THREE from 'three';

interface EngravedDropZoneProps {
  visible: boolean;
  onFileSelect: (files: File[]) => void;
  position?: [number, number, number];
}

export const EngravedDropZone: React.FC<EngravedDropZoneProps> = ({
  visible,
  onFileSelect,
  position = [0, 0, 0.051]
}) => {
  // Handle file drop
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    onFileSelect(files);
  };

  if (!visible) return null;

  return (
    <group position={position}>
      {/* Engraved border - more visible */}
      <mesh>
        <ringGeometry args={[0.8, 0.95, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={1.0}
        />
      </mesh>
      
      {/* Inner dropzone surface - more visible */}
      <mesh>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* Upload icon (engraved) - more visible */}
      <mesh position={[0, 0.2, 0.001]}>
        <circleGeometry args={[0.18, 16]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={1.0}
          roughness={0.1}
        />
      </mesh>
      
      {/* Upload arrow lines (simplified engraved effect) - more visible */}
      <group position={[0, 0.2, 0.002]}>
        {/* Vertical line */}
        <mesh>
          <boxGeometry args={[0.03, 0.24, 0.008]} />
          <meshStandardMaterial 
            color="#666" 
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Arrow head */}
        <mesh position={[0, 0.1, 0]}>
          <coneGeometry args={[0.05, 0.08, 4]} />
          <meshStandardMaterial 
            color="#666"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
      
      {/* Text - more visible */}
      <Text
        position={[0, -0.2, 0.002]}
        fontSize={0.1}
        color="#888"
        anchorX="center"
        anchorY="middle"
        font="/fonts/roboto-mono-regular.woff"
      >
        DROP FILES HERE
      </Text>
      
      <Text
        position={[0, -0.35, 0.002]}
        fontSize={0.06}
        color="#777"
        anchorX="center"
        anchorY="middle"
        font="/fonts/roboto-mono-regular.woff"
      >
        Images • PSD • Video
      </Text>
      
      {/* Invisible interaction plane for future interaction */}
      <mesh>
        <circleGeometry args={[0.8, 32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
};