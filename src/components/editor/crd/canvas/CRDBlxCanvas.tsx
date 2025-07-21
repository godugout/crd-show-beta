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
}

export const CRDBlxCanvas: React.FC<CRDBlxCanvasProps> = ({
  crdData,
  onCRDDataChange,
  zoom,
  showGrid,
  gridType,
  onImageUpload
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

      {/* 3D Controls Overlay */}
      <div className="absolute top-20 right-4 bg-black/75 rounded-lg p-3 text-white text-sm space-y-2 z-15">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">Camera:</span>
          <button 
            onClick={() => engine3D?.setCameraMode('isometric')}
            className="px-2 py-1 bg-blue-600 rounded text-xs"
          >
            ISO
          </button>
          <button 
            onClick={() => engine3D?.setCameraMode('top')}
            className="px-2 py-1 bg-gray-600 rounded text-xs"
          >
            TOP
          </button>
        </div>
      </div>

      {/* Layer Controls */}
      <div className="absolute bottom-24 left-4 bg-black/75 rounded-lg p-3 text-white z-14">
        <div className="text-xs text-gray-400 mb-2">Layers ({crdData.layers.length}/5)</div>
        <div className="flex space-x-2">
          {[1,2,3,4,5].map(layer => (
            <button
              key={layer}
              onClick={() => engine3D?.setLayerVisibility(layer, true)}
              className={`w-8 h-8 rounded text-xs ${
                layer <= crdData.layers.length 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-600 text-gray-400'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      {/* Selection Info */}
      {selectedElement && (
        <div className="absolute top-20 left-4 bg-green-900/90 text-white px-3 py-1 rounded text-sm z-16">
          Selected: {selectedElement}
        </div>
      )}
    </div>
  );
};