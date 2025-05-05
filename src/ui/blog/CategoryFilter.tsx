import React from 'react';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: { id: string; nombre: string; icono: React.ReactNode }[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  isMobile?: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  isMobile = false
}) => {
  return (
    <div className={`space-y-2 ${isMobile ? 'flex flex-wrap gap-2' : ''}`}>
      {categories.map(category => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center ${isMobile ? 'mr-2 mb-2' : 'w-full'} px-3 py-2 rounded-md transition-colors ${
            selectedCategory === category.id
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-neutral-300 hover:bg-neutral-800/70 border border-transparent'
          }`}
        >
          <span className="mr-2 flex items-center justify-center">{category.icono}</span>
          <span className="text-sm">{category.nombre}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;