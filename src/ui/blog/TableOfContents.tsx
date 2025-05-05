import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaList, FaXmark } from 'react-icons/fa6';

interface TableItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TableItem[];
  show: boolean;
  onClose: () => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items, show, onClose }) => {
  return (
    <AnimatePresence>
      {show && items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed left-16 md:left-24 top-1/2 transform -translate-y-1/2 z-40 bg-neutral-900/90 backdrop-blur-lg border border-neutral-800/70 rounded-xl shadow-2xl shadow-emerald-900/20 p-6 max-w-xs max-h-[70vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center">
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center mr-3 shadow-md shadow-emerald-500/20">
                <FaList className="text-white text-sm" />
              </span>
              <h3 className="text-lg font-semibold text-white">Contenido</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-neutral-800/80 rounded-full text-neutral-400 hover:text-white transition-colors duration-300"
              aria-label="Cerrar tabla de contenido"
            >
              <FaXmark size={14} />
            </button>
          </div>
          <ul className="space-y-3 mt-4">
            {items.map((item, index) => (
              <motion.li 
                key={index} 
                className={`${item.level === 2 ? '' : 'pl-4'} ${item.level === 4 ? 'pl-8' : ''}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: index * 0.05 }
                }}
              >
                <a 
                  href={`#${item.id}`}
                  className={`block hover:text-emerald-400 transition text-sm ${
                    item.level === 2 
                      ? 'font-medium text-white border-l-2 border-emerald-400 pl-3 py-1' 
                      : item.level === 3 
                        ? 'text-neutral-300 py-1 hover:pl-1 transition-all duration-300' 
                        : 'text-neutral-400 hover:pl-1 transition-all duration-300'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(item.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      onClose();
                    }
                  }}
                >
                  {item.text}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TableOfContents;