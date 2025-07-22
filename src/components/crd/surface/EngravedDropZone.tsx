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
      {/* Engraved border */}
      <mesh>
        <ringGeometry args={[0.8, 0.85, 32]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.8}
          roughness={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Inner dropzone surface */}
      <mesh>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.6}
          roughness={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Upload icon (engraved) */}
      <mesh position={[0, 0.2, 0.001]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial 
          color="#333" 
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      
      {/* Upload arrow lines (simplified engraved effect) */}
      <group position={[0, 0.2, 0.002]}>
        {/* Vertical line */}
        <mesh>
          <boxGeometry args={[0.02, 0.2, 0.005]} />
          <meshStandardMaterial color="#555" />
        </mesh>
        
        {/* Arrow head */}
        <mesh position={[0, 0.08, 0]}>
          <coneGeometry args={[0.04, 0.06, 4]} />
          <meshStandardMaterial color="#555" />
        </mesh>
      </group>
      
      {/* Text */}
      <Text
        position={[0, -0.2, 0.002]}
        fontSize={0.08}
        color="#666"
        anchorX="center"
        anchorY="middle"
        font="/fonts/roboto-mono-regular.woff"
      >
        DROP FILES HERE
      </Text>
      
      <Text
        position={[0, -0.35, 0.002]}
        fontSize={0.05}
        color="#555"
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