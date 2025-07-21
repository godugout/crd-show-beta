// CRD V1 Card Templates - Sports card templates for 2D creation
import type { CardTemplate } from '@/types/cardV1';

export const sportsTemplates: CardTemplate[] = [
  {
    id: 'classic-baseball',
    name: 'Classic Baseball',
    category: 'sports',
    preview: '/templates/classic-baseball-preview.jpg',
    description: 'Traditional baseball card design inspired by Topps classics',
    layout: {
      playerImageArea: { x: 20, y: 20, w: 210, h: 240 },
      playerNameArea: { x: 20, y: 270, w: 210, h: 30 },
      teamArea: { x: 20, y: 300, w: 210, h: 20 },
      statsArea: { x: 20, y: 325, w: 210, h: 15 }
    },
    styles: {
      backgroundGradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      borderColor: '#fbbf24',
      borderWidth: 2,
      borderRadius: 8,
      fontFamily: 'Roboto Slab',
      primaryTextColor: '#ffffff',
      secondaryTextColor: '#e5e7eb',
      accentColor: '#fbbf24'
    },
    cssClass: 'template-classic-baseball'
  },
  
  {
    id: 'modern-basketball',
    name: 'Modern Basketball',
    category: 'sports',
    preview: '/templates/modern-basketball-preview.jpg',
    description: 'Sleek modern basketball card with dynamic angles',
    layout: {
      playerImageArea: { x: 15, y: 15, w: 140, h: 200 },
      playerNameArea: { x: 160, y: 30, w: 75, h: 25 },
      teamArea: { x: 160, y: 55, w: 75, h: 18 },
      statsArea: { x: 160, y: 80, w: 75, h: 120 },
      logoArea: { x: 190, y: 220, w: 40, h: 40 }
    },
    styles: {
      backgroundGradient: 'linear-gradient(45deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
      borderColor: '#f59e0b',
      borderWidth: 1,
      borderRadius: 12,
      fontFamily: 'Inter',
      primaryTextColor: '#ffffff',
      secondaryTextColor: '#d1d5db',
      accentColor: '#f59e0b'
    },
    cssClass: 'template-modern-basketball'
  },

  {
    id: 'football-action',
    name: 'Football Action',
    category: 'sports',
    preview: '/templates/football-action-preview.jpg',
    description: 'Dynamic football card with action-focused layout',
    layout: {
      playerImageArea: { x: 10, y: 10, w: 230, h: 200 },
      playerNameArea: { x: 20, y: 220, w: 150, h: 30 },
      teamArea: { x: 170, y: 225, w: 60, h: 20 },
      statsArea: { x: 20, y: 255, w: 210, h: 80 }
    },
    styles: {
      backgroundGradient: 'linear-gradient(180deg, #059669 0%, #10b981 50%, #34d399 100%)',
      borderColor: '#ffffff',
      borderWidth: 3,
      borderRadius: 6,
      fontFamily: 'Oswald',
      primaryTextColor: '#ffffff',
      secondaryTextColor: '#f3f4f6',
      accentColor: '#fbbf24'
    },
    cssClass: 'template-football-action'
  },

  {
    id: 'soccer-fifa',
    name: 'Soccer FIFA Style',
    category: 'sports',
    preview: '/templates/soccer-fifa-preview.jpg',
    description: 'International soccer card inspired by FIFA designs',
    layout: {
      playerImageArea: { x: 25, y: 25, w: 120, h: 160 },
      playerNameArea: { x: 155, y: 40, w: 70, h: 22 },
      teamArea: { x: 155, y: 65, w: 70, h: 18 },
      statsArea: { x: 25, y: 195, w: 200, h: 140 }
    },
    styles: {
      backgroundColor: '#1f2937',
      borderColor: '#10b981',
      borderWidth: 2,
      borderRadius: 10,
      fontFamily: 'Nunito Sans',
      primaryTextColor: '#ffffff',
      secondaryTextColor: '#9ca3af',
      accentColor: '#10b981'
    },
    cssClass: 'template-soccer-fifa'
  },

  {
    id: 'hockey-ice',
    name: 'Hockey Ice',
    category: 'sports',
    preview: '/templates/hockey-ice-preview.jpg',
    description: 'Cool hockey card with ice-inspired design',
    layout: {
      playerImageArea: { x: 20, y: 20, w: 210, h: 180 },
      playerNameArea: { x: 20, y: 210, w: 210, h: 25 },
      teamArea: { x: 20, y: 240, w: 100, h: 20 },
      statsArea: { x: 130, y: 240, w: 100, h: 85 }
    },
    styles: {
      backgroundGradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #67e8f9 100%)',
      borderColor: '#f0f9ff',
      borderWidth: 2,
      borderRadius: 8,
      fontFamily: 'Rajdhani',
      primaryTextColor: '#0c4a6e',
      secondaryTextColor: '#0369a1',
      accentColor: '#f0f9ff'
    },
    cssClass: 'template-hockey-ice'
  }
];

export const getAllTemplates = (): CardTemplate[] => {
  return [...sportsTemplates];
};

export const getTemplateById = (id: string): CardTemplate | undefined => {
  return getAllTemplates().find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): CardTemplate[] => {
  return getAllTemplates().filter(template => template.category === category);
};