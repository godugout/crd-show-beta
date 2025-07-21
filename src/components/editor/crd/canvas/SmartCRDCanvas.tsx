// Smart CRD Canvas - Mode-aware canvas that switches between 2D and 3D CRDBLX modes
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { CRDCanvas } from './CRDCanvas';
import { CRDBlxCanvas } from './CRDBlxCanvas';
import { CRDToolbar } from '../toolbar/CRDToolbar';
import { ToolbarHotZone } from '../toolbar/ToolbarHotZone';
import { CRDBottomInfoBar } from './CRDBottomInfoBar';
import { useGridPreferences } from '@/hooks/useGridPreferences';
import { useAutoHideToolbar } from '@/hooks/useAutoHideToolbar';
import type { CRD_DNA } from '@/types/crdblx';

interface SmartCRDCanvasProps {
  template: string;
  colorPalette: string;
  typography: string;
  effects: string[];
  cardTitle: string;
  cardDescription: string;
  playerImage: string | null;
  playerStats: Record<string, string>;
  previewMode: 'edit' | 'preview' | 'print';
  onImageUpload?: (files: File[]) => void;
  // Sidebar awareness
  leftSidebarCollapsed?: boolean;
  rightSidebarCollapsed?: boolean;
  isMobile?: boolean;
  // Frame props
  selectedFrame?: any;
  frameContent?: Record<string, any>;
  // CRDBLX props
  crdData?: CRD_DNA;
  onCRDDataChange?: (data: CRD_DNA) => void;
}

export const SmartCRDCanvas: React.FC<SmartCRDCanvasProps> = (props) => {
  // State management
  const [is3DMode, setIs3DMode] = useState(false);
  const [zoom, setZoom] = useState(150);
  const [showRulers, setShowRulers] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  
  // Grid preferences with persistence
  const { gridType, showGrid, setGridType, setShowGrid } = useGridPreferences();
  
  // Auto-hide toolbar
  const { 
    getToolbarClasses, 
    getHotZoneProps, 
    onMouseEnter: onToolbarMouseEnter, 
    onMouseLeave: onToolbarMouseLeave 
  } = useAutoHideToolbar();

  // Canvas controls
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 25, 300));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 25, 25));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoom(150);
  }, []);

  const handleLockToggle = useCallback(() => {
    setIsLocked(!isLocked);
  }, [isLocked]);

  const handleToggle3D = useCallback(() => {
    setIs3DMode(!is3DMode);
    
    // Reset certain state when switching modes
    if (!is3DMode) {
      // Switching to 3D - prepare 3D state
      setZoom(100); // 3D works better at 100%
      setShowGrid(true); // Show grid for building
      setGridType('isometric'); // Use isometric grid for 3D
    } else {
      // Switching to 2D - restore 2D defaults
      setZoom(150);
    }
  }, [is3DMode, setShowGrid, setGridType]);

  // Default CRD data if none provided
  const defaultCRDData: CRD_DNA = {
    id: 'default-crd',
    name: props.cardTitle || 'Untitled CRD',
    rarity: 'Common',
    layers: [
      {
        id: 'layer-1',
        level: 1,
        zPosition: 0,
        gridSize: 0.1,
        buildingArea: {
          width: 2.4,
          height: 3.4,
          occupiedSpaces: []
        },
        elements: [],
        effects: [],
        visible: true,
        locked: false
      }
    ],
    maxLayers: 5,
    currentDepth: 0.15,
    slabMaterial: 'crystal',
    embeddedDepth: 0,
    translucency: 0.85,
    embeddedImage: {
      url: props.playerImage || '',
      position: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1 },
      opacity: 1
    },
    metadata: {
      createdBy: 'user',
      crdTokenValue: 100,
      timestamp: Date.now()
    }
  };

  const currentCRDData = props.crdData || defaultCRDData;

  return (
    <div className="relative h-full w-full overflow-hidden bg-transparent flex flex-col">
      {/* Hot Zone for Toolbar Auto-Show */}
      <ToolbarHotZone {...getHotZoneProps()} />
      
      {/* Enhanced Toolbar with 3D Toggle */}
      <CRDToolbar 
        zoom={zoom} 
        onZoomIn={handleZoomIn} 
        onZoomOut={handleZoomOut} 
        onZoomReset={handleZoomReset} 
        showGrid={showGrid} 
        onGridToggle={() => setShowGrid(!showGrid)} 
        gridType={gridType} 
        onGridTypeChange={setGridType} 
        showRulers={showRulers} 
        onRulersToggle={() => setShowRulers(!showRulers)}
        isLocked={isLocked}
        onLockToggle={handleLockToggle}
        is3DMode={is3DMode}
        onToggle3D={handleToggle3D}
        className={getToolbarClasses()}
        onMouseEnter={onToolbarMouseEnter}
        onMouseLeave={onToolbarMouseLeave}
      />

      {/* Mode Indicator */}
      {is3DMode && (
        <div className="absolute top-4 left-4 bg-purple-900/90 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2 z-20">
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
          <span>3D CRDBLX Builder</span>
        </div>
      )}

      {/* Smart Canvas Area - Mode Switching */}
      <div className="flex-1 relative">
        {is3DMode ? (
          // 3D CRDBLX Canvas
          <CRDBlxCanvas
            crdData={currentCRDData}
            onCRDDataChange={props.onCRDDataChange}
            zoom={zoom}
            showGrid={showGrid}
            gridType={gridType}
            onImageUpload={props.onImageUpload}
          />
        ) : (
          // 2D Traditional Canvas
          <CRDCanvas
            template={props.template}
            colorPalette={props.colorPalette}
            typography={props.typography}
            effects={props.effects}
            cardTitle={props.cardTitle}
            cardDescription={props.cardDescription}
            playerImage={props.playerImage}
            playerStats={props.playerStats}
            previewMode={props.previewMode}
            onImageUpload={props.onImageUpload}
            leftSidebarCollapsed={props.leftSidebarCollapsed}
            rightSidebarCollapsed={props.rightSidebarCollapsed}
            isMobile={props.isMobile}
            selectedFrame={props.selectedFrame}
            frameContent={props.frameContent}
          />
        )}
      </div>

      {/* Bottom Info Bar */}
      <CRDBottomInfoBar
        selectedTemplate={props.template}
        colorPalette={props.colorPalette}
        effects={props.effects}
      />
    </div>
  );
};