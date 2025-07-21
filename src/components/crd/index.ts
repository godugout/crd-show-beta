// Main CRD System Exports - V1 (2D Only)
export { LightingRig } from './lighting/LightingRig';
export { CRDControlPanel } from './controls/CRDControlPanel';
export { CRDStickyFooter } from './controls/CRDStickyFooter';

// Premium Styles System
export { StyleSelector, StyleTile } from './styles/StyleSelector';
export { StyleRegistry, CRDVisualStyles } from './styles/StyleRegistry';
export type { CRDVisualStyle } from './styles/StyleRegistry';

// Types
export type {
  AnimationMode,
  MaterialMode,
  LightingPreset,
  PathTheme,
  CRDTransform,
  CRDViewerConfig,
  PetInteractionEvent,
  VirtualSpaceConfig
} from './types/CRDTypes';

// Future: Achievement Pet System Integration
// export { AchievementPet } from './pet/AchievementPet';
// export { PetEvolution } from './pet/PetEvolution';

// Future: Virtual Spaces Integration  
// export { SportsArenaSpace } from './spaces/SportsArenaSpace';
// export { SciFiArcadeSpace } from './spaces/SciFiArcadeSpace';
// export { NaturePreserveSpace } from './spaces/NaturePreserveSpace';

// Future: Duel System Integration
// export { CardDuelViewer } from './duel/CardDuelViewer';
// export { DuelAnimations } from './duel/DuelAnimations';