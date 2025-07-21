// CRD V1 Canvas - Clean 2D CSS-based card creation
import React, { useState, useCallback } from 'react';
import { CRDCanvas } from './CRDCanvas';
import { CRDToolbar } from '../toolbar/CRDToolbar';
import { ToolbarHotZone } from '../toolbar/ToolbarHotZone';
import { CRDBottomInfoBar } from './CRDBottomInfoBar';
import { useGridPreferences } from '@/hooks/useGridPreferences';
import { useAutoHideToolbar } from '@/hooks/useAutoHideToolbar';

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
}

export const SmartCRDCanvas: React.FC<SmartCRDCanvasProps> = (props) => {
  // V1 State management - 2D only
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

  console.log('🔍 CRD V1 Canvas rendering - 2D mode only');
  
  return (
    <div className="relative h-full w-full overflow-hidden bg-transparent flex flex-col">
      {/* Hot Zone for Toolbar Auto-Show */}
      <ToolbarHotZone {...getHotZoneProps()} />
      
      {/* V1 Toolbar - 2D Only */}
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
        // V1: No 3D mode
        is3DMode={false}
        onToggle3D={() => {}} // Disabled for V1
        onCameraMode={() => {}} // Disabled for V1
        onLayerToggle={() => {}} // Disabled for V1
        activeLayers={[]}
        className={getToolbarClasses()}
        onMouseEnter={onToolbarMouseEnter}
        onMouseLeave={onToolbarMouseLeave}
      />

      {/* V1 Canvas Area - 2D CSS-based */}
      <div className="flex-1 relative">
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