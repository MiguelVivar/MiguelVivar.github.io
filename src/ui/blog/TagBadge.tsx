import React from 'react';

interface TagBadgeProps {
  tag: string;
  onClick?: () => void;
  isSelected?: boolean;
}

const TagBadge: React.FC<TagBadgeProps> = ({ tag, onClick, isSelected = false }) => {
  const baseClasses = "text-xs px-3 py-1 rounded-full transition-all duration-200";
  const interactiveClasses = onClick ? "cursor-pointer hover:shadow-sm" : "";
  const selectedClasses = isSelected
    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500"
    : "bg-neutral-800 text-neutral-400 border-neutral-700";
  
  return (
    <span 
      className={`${baseClasses} ${interactiveClasses} ${selectedClasses} border`}
      onClick={onClick}
    >
      {tag}
    </span>
  );
};

export default TagBadge;