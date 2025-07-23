// Complete unified PSD layer interface for Cardshow platform
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
  imageUrl?: string;
  textContent?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  blendMode?: string;
  rawData?: any;
  isProcessed?: boolean;
}

export interface PSDProcessingResult {
  layers: PSDLayer[];
  totalLayers: number;
  processedLayers: number;
}

export interface GeneratedFrame {
  id: string;
  name: string;
  thumbnail: string;
  layers: PSDLayer[];
  metadata?: Record<string, any>;
}

// Re-export parser functions
export { parsePSD, layerToImageData, layerToBlob } from '@/services/psd/psdParser';

// Legacy function name for compatibility  
export { parsePSD as processPSDFile } from '@/services/psd/psdParser';