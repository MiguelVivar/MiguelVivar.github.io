import React from 'react';
import TagBadge from './TagBadge';

interface TagsFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  isMobile?: boolean;
}

const TagsFilter: React.FC<TagsFilterProps> = ({ 
  tags, 
  selectedTags, 
  onTagToggle,
  isMobile = false 
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${isMobile ? '' : 'max-h-48 overflow-y-auto pr-2'}`}>
      {tags.map(tag => (
        <TagBadge
          key={tag}
          tag={tag}
          isSelected={selectedTags.includes(tag)}
          onClick={() => onTagToggle(tag)}
        />
      ))}
    </div>
  );
};

export default TagsFilter;