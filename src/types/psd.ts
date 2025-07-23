
export interface PSDFile {
  id: string;
  name: string;
  originalUrl: string;
  width: number;
  height: number;
  layerCount: number;
  fileSize: number;
  uploadedAt: Date;
  metadata?: Record<string, any>;
}

export interface PSDLayer {
  id: string;
  name: string;
  type: 'text' | 'image' | 'shape' | 'group' | 'folder' | 'background' | 'adjustment';
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  width: number;
  height: number;
  content?: {
    text?: string;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    imageData?: string;
  };
  styleProperties?: {
    opacity?: number;
    blendMode?: string;
    effects?: any[];
  };
  visible: boolean;
  opacity?: number;
  children?: PSDLayer[];
  imageUrl?: string; // URL after converting to PNG
  textContent?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  blendMode?: string;
  rawData?: any; // Original layer data from ag-psd
  isProcessed?: boolean;
}

export interface PSDProcessingResult {
  psdData: any;
  layers: PSDLayer[];
  totalLayers: number;
  processedLayers: number;
}

export interface LayerExportOptions {
  format: 'png' | 'jpg' | 'webp';
  quality?: number;
  transparency?: boolean;
  scale?: number;
}

export interface CRDElement {
  id: string;
  name: string;
  elementType: 'image' | 'text' | 'shape' | 'background';
  imageUrl: string;
  thumbnailUrl?: string;
  width: number;
  height: number;
  config: {
    originalLayer?: PSDLayer;
    position?: { x: number; y: number };
    scale?: number;
    rotation?: number;
    opacity?: number;
    blendMode?: string;
  };
  metadata: {
    sourceFile?: string;
    layerName?: string;
    extractedAt: Date;
    tags?: string[];
  };
  creatorId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CRDFrame {
  id: string;
  name: string;
  category: string;
  description?: string;
  frameConfig: {
    width: number;
    height: number;
    elements: {
      elementId: string;
      position: { x: number; y: number };
      scale: number;
      rotation: number;
      opacity: number;
      zIndex: number;
      locked?: boolean;
    }[];
    background?: {
      type: 'color' | 'gradient' | 'image';
      value: string;
    };
    effects?: {
      type: string;
      settings: Record<string, any>;
    }[];
  };
  isPublic: boolean;
  priceCents?: number;
  ratingAverage?: number;
  ratingCount?: number;
  downloadCount?: number;
  tags?: string[];
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}
