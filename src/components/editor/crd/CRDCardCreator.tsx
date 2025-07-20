
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
      <div className="flex-1 p-6">
        <div className="text-center text-crd-lightGray">
          <p>CRD Card Creator Interface</p>
          <p className="text-sm mt-2">Interactive card creation tools will be loaded here</p>
        </div>
      </div>
    </div>
  );
};
