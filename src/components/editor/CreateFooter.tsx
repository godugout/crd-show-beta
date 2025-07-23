import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Book, Users, MessageSquare } from 'lucide-react';

export const CreateFooter = () => {
  return (
    <footer className="bg-surface-dark border-t border-surface-medium/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Creator Resources */}
        <div className="flex items-center gap-6">
          <Link 
            to="/help" 
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            <HelpCircle size={16} />
            Help
          </Link>
          <Link 
            to="/tutorials" 
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            <Book size={16} />
            Tutorials
          </Link>
          <Link 
            to="/community" 
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            <Users size={16} />
            Community
          </Link>
          <Link 
            to="/feedback" 
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            <MessageSquare size={16} />
            Feedback
          </Link>
        </div>

        {/* Status & Version */}
        <div className="flex items-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-crd-green rounded-full"></div>
            All systems operational
          </span>
          <span>v2.0 Beta</span>
        </div>
      </div>
    </footer>
  );
};