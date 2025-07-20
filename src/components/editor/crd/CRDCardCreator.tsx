
import React, { useState, useRef, useEffect } from 'react';
import { InteractiveCardData } from '@/types/interactiveCard';
import { CRDButton } from '@/components/ui/design-system/Button';
import { Save, Download } from 'lucide-react';

interface CRDCardCreatorProps {
  initialCard?: InteractiveCardData;
  onSave: (card: InteractiveCardData) => void;
  onPreview: (card: InteractiveCardData) => void;
}

export const CRDCardCreator: React.FC<CRDCardCreatorProps> = ({
  initialCard,
  onSave,
  onPreview
}) => {
  const [currentCard, setCurrentCard] = useState<InteractiveCardData | null>(initialCard || null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!currentCard) return;
    
    setIsSaving(true);
    try {
      await onSave(currentCard);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    if (!currentCard) return;
    // Export logic here
    console.log('Exporting card:', currentCard);
  };

  return (
    <div className="h-full bg-crd-darkest">
      {/* Header with toolbar buttons */}
      <div className="bg-crd-darker border-b border-crd-mediumGray/20 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-crd-white">CRD Card Creator</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <CRDButton 
              variant="tool" 
              size="tool" 
              onClick={handleSave} 
              disabled={isSaving}
              className="text-themed-active-subdued hover:text-themed-active"
            >
              <Save className="w-4 h-4 mr-1.5" />
              {isSaving ? 'Saving...' : 'Save Card'}
            </CRDButton>
            
            <CRDButton 
              variant="tool" 
              size="tool" 
              onClick={handleExport}
              className="text-themed-active-subdued hover:text-themed-active"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Export
            </CRDButton>
          </div>
        </div>
      </div>

      {/* Main editor content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Tools */}
        <div className="w-64 bg-crd-darker border-r border-crd-mediumGray/20 flex flex-col">
          <div className="p-4 border-b border-crd-mediumGray/20">
            <h3 className="text-sm font-semibold text-crd-white mb-3">Tools</h3>
            <div className="space-y-2">
              <CRDButton variant="tool" size="tool" className="w-full justify-start">
                Add Text
              </CRDButton>
              <CRDButton variant="tool" size="tool" className="w-full justify-start">
                Add Image
              </CRDButton>
              <CRDButton variant="tool" size="tool" className="w-full justify-start">
                Add Shape
              </CRDButton>
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-crd-darkest flex items-center justify-center p-8">
          <div className="bg-white rounded-lg shadow-2xl" style={{ width: '350px', height: '490px' }}>
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <h2 className="text-2xl font-bold mb-2">Your Card</h2>
                <p className="text-sm opacity-80">Design your collectible here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 bg-crd-darker border-l border-crd-mediumGray/20 flex flex-col">
          <div className="p-4 border-b border-crd-mediumGray/20">
            <h3 className="text-sm font-semibold text-crd-white mb-3">Properties</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-crd-lightGray mb-1">
                  Card Title
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-crd-mediumGray/20 border border-crd-mediumGray/30 rounded text-crd-white text-sm"
                  placeholder="Enter card title..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-crd-lightGray mb-1">
                  Description
                </label>
                <textarea 
                  className="w-full px-3 py-2 bg-crd-mediumGray/20 border border-crd-mediumGray/30 rounded text-crd-white text-sm resize-none"
                  rows={3}
                  placeholder="Enter description..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-crd-lightGray mb-1">
                  Rarity
                </label>
                <select className="w-full px-3 py-2 bg-crd-mediumGray/20 border border-crd-mediumGray/30 rounded text-crd-white text-sm">
                  <option value="common">Common</option>
                  <option value="rare">Rare</option>
                  <option value="epic">Epic</option>
                  <option value="legendary">Legendary</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
