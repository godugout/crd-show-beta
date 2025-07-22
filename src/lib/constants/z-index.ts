/**
 * Z-Index Constants for Consistent Layering
 * 
 * This file defines standardized z-index values to ensure proper layering
 * across the entire application. Use these constants instead of arbitrary values.
 */

export const Z_INDEX = {
  // Base layers (0-9)
  BASE: 0,
  BEHIND: -1,
  
  // Content layers (10-19)
  CONTENT: 10,
  OVERLAY_CONTENT: 20,
  
  // UI Element layers (20-39)
  PROGRESS_INDICATORS: 30,
  DROPZONE: 30,
  STATUS_MESSAGES: 35,
  
  // Interactive Elements (40-59)
  EFFECTS: 40,
  ALIGNMENT_SYSTEM: 40,
  TOOLTIPS: 50,
  
  // Fixed UI Elements (50-99)
  FIXED_UI: 50,
  NAVIGATION: 60,
  DEBUG_OVERLAY: 70,
  
  // Modals and Overlays (100-999)
  MODAL_BACKDROP: 100,
  MODAL_CONTENT: 110,
  TOAST: 200,
  
  // Core App Controls (1000+)
  CORE_CONTROLS: 1000,    // Play/pause, compass, main controls
  CRITICAL_UI: 9999,      // Emergency overlays, critical indicators
} as const;

export type ZIndexLevel = typeof Z_INDEX[keyof typeof Z_INDEX];

/**
 * Helper function to get z-index class name
 */
export const getZIndexClass = (level: ZIndexLevel): string => {
  return `z-[${level}]`;
};

/**
 * Component-specific z-index mapping for easy reference
 */
export const COMPONENT_Z_INDEX = {
  // 3D and Background
  STARS_BACKGROUND: Z_INDEX.BASE,
  FLOATING_CARD_3D: Z_INDEX.BASE,
  THREE_JS_CANVAS: Z_INDEX.OVERLAY_CONTENT,
  
  // Core Controls (always on top together)
  PAUSE_BUTTON: Z_INDEX.CORE_CONTROLS,
  GALACTIC_COMPASS: Z_INDEX.CORE_CONTROLS,
  STUDIO_CONTROLS: Z_INDEX.CORE_CONTROLS,
  
  // Navigation and Menus
  NAVIGATION_BAR: Z_INDEX.NAVIGATION,
  DROPDOWN_MENU: Z_INDEX.NAVIGATION + 10,
  
  // Status and Progress
  PROGRESS_INDICATOR: Z_INDEX.PROGRESS_INDICATORS,
  STATUS_MESSAGE: Z_INDEX.STATUS_MESSAGES,
  
  // Interactive Elements
  DROPZONE: Z_INDEX.DROPZONE,
  ALIGNMENT_SYSTEM: Z_INDEX.ALIGNMENT_SYSTEM,
  EFFECTS: Z_INDEX.EFFECTS,
  
  // Overlays and Modals
  TUTORIAL_BACKDROP: Z_INDEX.MODAL_BACKDROP,
  TUTORIAL_CONTENT: Z_INDEX.MODAL_CONTENT,
  
  // Debug and Dev Tools
  DEBUG_OVERLAY: Z_INDEX.DEBUG_OVERLAY,
  DEV_LOGIN: Z_INDEX.DEBUG_OVERLAY,
  PERFORMANCE_MONITOR: Z_INDEX.DEBUG_OVERLAY,
  
  // Critical UI
  VIEWING_CONDITIONS: Z_INDEX.CRITICAL_UI,
  ERROR_BOUNDARY: Z_INDEX.CRITICAL_UI,
} as const;