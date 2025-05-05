import React from 'react';
import { FaStar } from 'react-icons/fa';

interface ProjectFeatureBadgeProps {
  position?: 'top-right' | 'inline';
}

const ProjectFeatureBadge: React.FC<ProjectFeatureBadgeProps> = ({ position = 'top-right' }) => {
  if (position === 'inline') {
    return (
      <div className="bg-emerald-300 text-neutral-900 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
        <FaStar className="text-yellow-500" />
        Destacado
      </div>
    );
  }
  
  return (
    <div className="absolute top-0 right-0 bg-emerald-300 text-neutral-900 text-xs font-bold px-3 py-1 rounded-bl-lg z-10 flex items-center gap-1 shadow-md">
      <FaStar className="text-yellow-500" />
      Destacado
    </div>
  );
};

export default ProjectFeatureBadge;