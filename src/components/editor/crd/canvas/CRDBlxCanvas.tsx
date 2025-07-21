// CRDBLX 3D Canvas - Three.js powered 3D building interface
import React, { useRef, useEffect, useState } from 'react';
import { CRD3DEngine } from '../3d/CRD3DEngine';
import { CRDCanvasGrid } from './CRDCanvasGrid';
import type { CRD_DNA } from '@/types/crdblx';

interface CRDBlxCanvasProps {
  crdData: CRD_DNA;
  onCRDDataChange?: (data: CRD_DNA) => void;
  zoom: number;
  showGrid: boolean;
  gridType: string;
  onImageUpload?: (files: File[]) => void;
  onEngine3DReady?: (engine: any) => void;
}

export const CRDBlxCanvas: React.FC<CRDBlxCanvasProps> = ({
  crdData,
  onCRDDataChange,
  zoom,
  showGrid,
  gridType,
  onImageUpload,
  onEngine3DReady
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [engine3D, setEngine3D] = useState<CRD3DEngine | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  // Initialize 3D engine
  useEffect(() => {
    if (canvasRef.current && !engine3D) {
      const newEngine = new CRD3DEngine(canvasRef.current);
      
      // Set up event handlers
      newEngine.setEventHandlers({
        onElementSelect: setSelectedElement,
        onElementMove: (elementId, position) => {
          // Handle element movement
          console.log('Element moved:', elementId, position);
        }
      });

      setEngine3D(newEngine);
      onEngine3DReady?.(newEngine);

      // Load embedded image if available
      if (crdData.embeddedImage.url) {
        const texture = new (window as any).THREE.TextureLoader().load(crdData.embeddedImage.url);
        newEngine.embedImageInSlab(texture, crdData.embeddedDepth);
      }
    }

    return () => {
      if (engine3D) {
        engine3D.dispose();
      }
    };
  }, [canvasRef.current]);

  // Handle grid visibility
  useEffect(() => {
    if (engine3D) {
      engine3D.showBuildingGrid(showGrid);
    }
  }, [engine3D, showGrid]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (engine3D && canvasRef.current) {
        engine3D.resize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [engine3D]);

  return (
    <div className="relative w-full h-full bg-gray-900 overflow-hidden">
      {/* 3D Canvas Container */}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ 
          paddingTop: '4rem', // Account for toolbar
          paddingBottom: '5rem' // Account for bottom bar
        }}
      />


      {/* Selection Info */}
      {selectedElement && (
        <div className="absolute top-20 left-4 bg-green-900/90 text-white px-3 py-1 rounded text-sm z-10">
          Selected: {selectedElement}
        </div>
      )}
    </div>
  );
};