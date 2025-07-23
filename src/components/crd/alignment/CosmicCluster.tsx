
import React from 'react';

interface CosmicClusterProps {
  visible: boolean;
  intensity?: number;
}

export const CosmicCluster: React.FC<CosmicClusterProps> = ({
  visible,
  intensity = 1.0
}) => {
  // Component disabled to remove bright nebula effect
  return null;
};
