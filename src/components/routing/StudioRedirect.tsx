import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

export const StudioRedirect: React.FC = () => {
  const { cardId } = useParams<{ cardId?: string }>();
  
  if (cardId) {
    return <Navigate to={`/studio/demo/${cardId}`} replace />;
  }
  
  return <Navigate to="/studio/demo" replace />;
};