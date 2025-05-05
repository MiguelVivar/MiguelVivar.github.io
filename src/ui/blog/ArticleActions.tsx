import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShare } from 'react-icons/fa6';

interface ArticleActionsProps {
  isLiked: boolean;
  onLike: () => void;
  onShare: () => void;
}

const ArticleActions: React.FC<ArticleActionsProps> = ({
  isLiked,
  onLike,
  onShare
}) => {
  return (
    <div className="mt-12 pt-8 border-t border-neutral-700/30">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center">
          <span className="text-neutral-300 mr-3">¿Te ha resultado útil este artículo?</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLike}
            className={`p-3 rounded-full transition-all duration-300 shadow-lg ${
              isLiked
                ? 'bg-red-500 text-white shadow-red-600/30'
                : 'bg-neutral-800 text-red-400 hover:bg-red-500/20 shadow-red-900/10 hover:shadow-red-900/20'
            }`}
            aria-label={isLiked ? "Quitar me gusta" : "Me gusta"}
          >
            {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </motion.button>
        </div>
        
        <div className="flex space-x-3">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShare}
            className="bg-neutral-800 hover:bg-neutral-700 transition-all duration-300 p-3 rounded-full text-emerald-400 shadow-lg shadow-emerald-900/10 hover:shadow-emerald-900/20"
            aria-label="Compartir"
          >
            <FaShare size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ArticleActions;