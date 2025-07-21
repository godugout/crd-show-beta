import React from 'react';
import { CircularProgressIndicator } from './CircularProgressIndicator';

export const CircularProgressDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-crd-darkest flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-8">Circular Progress Indicator Demo</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
          {/* Small size */}
          <div className="text-center">
            <div className="mb-4">
              <CircularProgressIndicator size={16} className="mx-auto" />
            </div>
            <p className="text-crd-lightGray">Small (16px)</p>
          </div>
          
          {/* Medium size */}
          <div className="text-center">
            <div className="mb-4">
              <CircularProgressIndicator size={32} className="mx-auto" />
            </div>
            <p className="text-crd-lightGray">Medium (32px)</p>
          </div>
          
          {/* Large size */}
          <div className="text-center">
            <div className="mb-4">
              <CircularProgressIndicator size={64} className="mx-auto" />
            </div>
            <p className="text-crd-lightGray">Large (64px)</p>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-crd-dark rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Features:</h3>
          <ul className="text-crd-lightGray text-left space-y-2">
            <li>• 8 rotating arrows in circular pattern</li>
            <li>• CRD orange-green-blue gradient flow animation</li>
            <li>• Staggered pulse animations for each arrow</li>
            <li>• Smooth 2-second rotation cycle</li>
            <li>• Customizable size and styling</li>
          </ul>
        </div>
      </div>
    </div>
  );
};