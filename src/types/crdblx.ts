// CRDBLX (CRD Blocks) Type Definitions
import * as THREE from 'three';

// Core CRD Data Structure with CRDBLX System
export interface CRD_DNA {
  id: string;
  name: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  
  // CRDBLX System
  layers: LayerContainer[];
  maxLayers: 5;
  currentDepth: number;
  
  // 3D Slab Properties
  slabMaterial: 'crystal' | 'glass' | 'energy' | 'metal';
  embeddedDepth: number;      // How deep image sits in slab
  translucency: number;       // 0-1 opacity of slab
  
  // Embedded Image
  embeddedImage: {
    url: string;
    position: { x: number; y: number; z: number };
    scale: { x: number; y: number };
    opacity: number;
  };
  
  metadata: {
    createdBy: string;
    mintNumber?: number;
    crdTokenValue: number;
    timestamp: number;
  };
}

// Card Dimensions (2.5" x 3.5")
export interface CRDDimensions {
  // Physical measurements
  physical: { width: 2.5; height: 3.5; unit: 'inches' };
  
  // Pixel equivalents
  highRes: { width: 750; height: 1050; dpi: 300 };
  webRes: { width: 375; height: 525; dpi: 150 };
  
  // Three.js units for 3D
  threejs: {
    baseWidth: 2.5;
    baseHeight: 3.5;
    layerThickness: 0.15;  // Each layer height
    maxDepth: 0.75;        // 5 layers max
    gridUnit: 0.1;         // Snap precision
  };
}

// CRDBLX Layer System (5 Layers Maximum)
export interface CRDBlxSpecs {
  maxLayers: 5;
  layerThickness: 0.15; // Three.js units
  
  layerHeights: {
    layer1: 0.0;   // Base layer (always at bottom)
    layer2: 0.15;  // First elevated layer
    layer3: 0.30;  // Second elevated layer  
    layer4: 0.45;  // Third elevated layer
    layer5: 0.60;  // Top layer (maximum height)
  };
  
  // Slab enclosure dimensions
  enclosures: {
    singleLayer: { depth: 0.25 };
    twoLayer: { depth: 0.40 };
    threeLayer: { depth: 0.55 };
    fourLayer: { depth: 0.70 };
    fiveLayer: { depth: 0.85 };
  };
}

// Layer Container System
export interface LayerContainer {
  id: string;
  level: 1 | 2 | 3 | 4 | 5;
  zPosition: number; // 0, 0.15, 0.30, 0.45, 0.60
  
  // CRDBLX Building Properties
  gridSize: 0.1;
  buildingArea: {
    width: 2.4;
    height: 3.4;
    occupiedSpaces: GridSpace[];
  };
  
  elements: LayerElement[];
  effects: LayerEffect[];
  visible: boolean;
  locked: boolean;
}

// Grid-based Element System
export interface LayerElement {
  id: string;
  type: 'block' | 'image' | 'text' | 'effect' | 'decoration';
  
  // CRDBLX Grid Position
  gridPosition: {
    x: number; // Grid coordinates (0-24)
    y: number; // Grid coordinates (0-34) 
    z: number; // Layer level (1-5)
  };
  
  // Physical Properties
  size: {
    width: number;  // In grid units
    height: number; 
    depth: number;
  };
  
  // 3D Properties
  mesh?: THREE.Mesh;
  material: ElementMaterial;
  transparency: number;
  emissive: boolean;
  
  // CRDBLX Connections
  connections: ElementConnection[];
  supportedBy: string[]; // IDs of supporting elements
  supporting: string[]; // IDs of elements this supports
}

export interface GridSpace {
  x: number;
  y: number;
  elementId: string;
}

export interface LayerEffect {
  id: string;
  type: 'neon' | 'particle' | 'glow' | 'energy' | 'sparkle';
  intensity: number;
  color: string;
  animated: boolean;
}

export interface ElementMaterial {
  type: 'plastic' | 'metal' | 'glass' | 'energy' | 'neon';
  color: string;
  finish: 'matte' | 'glossy' | 'metallic' | 'transparent' | 'emissive';
  roughness: number;
  metalness: number;
}

export interface ElementConnection {
  connectedTo: string; // Element ID
  connectionType: 'stud' | 'technic' | 'magnet' | 'clip';
  position: { x: number; y: number; z: number };
}

// Block Type Definitions
export interface BlockType {
  id: string;
  name: string;
  size: [number, number]; // [width, height] in grid units
  icon: string;
  category: 'basic' | 'special' | 'technical';
  description?: string;
}

export interface ShapeType {
  id: string;
  name: string;
  description: string;
  icon: string;
  geometryFunction: string; // Function name to create geometry
}

// Touch gesture types for mobile
export interface TouchInfo {
  id: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  startTime: number;
}

export type GestureState = 'none' | 'pan' | 'pinch-zoom';

// Material library types
export type MaterialName = 
  | 'plastic-red' | 'plastic-blue' | 'plastic-green' | 'plastic-yellow' | 'plastic-white'
  | 'metal-silver' | 'metal-gold' | 'metal-copper'
  | 'glass-clear' | 'glass-frosted' | 'glass-tinted'
  | 'neon-blue' | 'neon-green' | 'neon-pink' | 'neon-purple';

// CRDBLX Mode Types
export type CRDBlxMode = '2d-edit' | '3d-builder' | 'isometric-view' | 'preview';

export interface CRDBlxViewport {
  mode: CRDBlxMode;
  camera: {
    position: THREE.Vector3;
    target: THREE.Vector3;
    zoom: number;
  };
  grid: {
    visible: boolean;
    snap: boolean;
    size: number;
  };
}