// CRD V1 Type Definitions - 2D CSS-based card creation
export interface CardTemplate {
  id: string;
  name: string;
  category: 'sports' | 'entertainment' | 'custom';
  preview: string;
  description: string;
  layout: {
    playerImageArea: { x: number; y: number; w: number; h: number };
    playerNameArea: { x: number; y: number; w: number; h: number };
    teamArea?: { x: number; y: number; w: number; h: number };
    statsArea?: { x: number; y: number; w: number; h: number };
    logoArea?: { x: number; y: number; w: number; h: number };
  };
  styles: {
    backgroundImage?: string;
    backgroundGradient?: string;
    backgroundColor?: string;
    borderStyle?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    fontFamily: string;
    primaryTextColor: string;
    secondaryTextColor?: string;
    accentColor?: string;
  };
  cssClass: string;
}

export interface CardV1 {
  id: string;
  title: string;
  
  // Player Information
  playerName?: string;
  team?: string;
  position?: string;
  jerseyNumber?: string;
  
  // Images
  playerImage?: string;
  backgroundImage?: string;
  logoImage?: string;
  
  // Stats (flexible key-value pairs)
  stats?: Record<string, string | number>;
  
  // Template and styling
  template: CardTemplate;
  
  // CSS-based effects (NO WebGL/3D)
  effects: {
    holographic: boolean; // CSS gradient animation
    chrome: boolean;      // CSS metallic effect  
    glow: boolean;        // CSS box-shadow
    vintage: boolean;     // CSS sepia filter
    foil: boolean;        // CSS shimmer effect
  };
  
  // Display case (unlockable progression system)
  displayCase: CardCase;
  
  // Metadata
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    isPublic: boolean;
    tags?: string[];
  };
}

export interface CardCase {
  id: string;
  name: string;
  description: string;
  unlockRequirement: number; // cards created to unlock
  cssClass: string;
  preview: string;
  protection: {
    uv: boolean;
    moisture: boolean;
    dust: boolean;
    scratches: boolean;
  };
}

// Standard card dimensions - 2.5" x 3.5"
export const CARD_DIMENSIONS = {
  // Physical measurements
  physical: {
    width: 2.5,
    height: 3.5,
    unit: 'inches'
  },
  
  // CSS pixel equivalents for different displays
  css: {
    // Standard display (72 DPI equivalent)
    standard: { width: 250, height: 350 },
    // High resolution display
    highRes: { width: 375, height: 525 },
    // Print quality
    print: { width: 750, height: 1050 }
  },
  
  // Aspect ratio
  aspectRatio: 5/7 // 2.5:3.5 simplified
} as const;

// Template categories for organization
export type TemplateCategory = 'sports' | 'entertainment' | 'custom';

// Card effect types
export type CardEffect = 'holographic' | 'chrome' | 'glow' | 'vintage' | 'foil';

// Grid system for layout precision
export interface LayoutGrid {
  columns: 24; // 24-column grid system
  rows: 34;    // Maintains aspect ratio
  gutterSize: 4; // pixels
}

// Color themes for templates
export interface CardColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
  };
  border: string;
}

// Font options for templates  
export interface CardFontTheme {
  heading: {
    family: string;
    weight: number;
    size: string;
  };
  body: {
    family: string;
    weight: number;
    size: string;
  };
  accent: {
    family: string;
    weight: number;
    size: string;
  };
}