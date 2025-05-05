import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShare, FaXmark, FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp, FaLink } from 'react-icons/fa6';

interface ShareMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (platform: string) => void;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ isOpen, onClose, onShare }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-gradient-to-br from-neutral-900 to-neutral-800/90 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-neutral-700/50 shadow-2xl shadow-emerald-900/20"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <span className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center mr-3 shadow-lg shadow-emerald-500/20">
                  <FaShare className="text-white text-sm" />
                </span>
                <h3 className="text-xl font-semibold text-white">Compartir artículo</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-neutral-800/80 rounded-full transition-colors duration-200"
                aria-label="Cerrar menú de compartir"
              >
                <FaXmark />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <motion.button
                whileHover={{ scale: 1.05, y: -5, backgroundColor: 'rgba(29, 161, 242, 0.15)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onShare('twitter')}
                className="flex flex-col items-center justify-center p-4 bg-neutral-800/60 hover:bg-[#1DA1F2]/10 rounded-xl transition-all duration-300 border border-neutral-700/30 hover:border-[#1DA1F2]/30 shadow-lg shadow-neutral-900/20"
                aria-label="Compartir en Twitter"
              >
                <span className="text-[#1DA1F2] text-3xl mb-3">
                  <FaTwitter />
                </span>
                <span className="text-sm font-medium">Twitter</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -5, backgroundColor: 'rgba(24, 119, 242, 0.15)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onShare('facebook')}
                className="flex flex-col items-center justify-center p-4 bg-neutral-800/60 hover:bg-[#1877F2]/10 rounded-xl transition-all duration-300 border border-neutral-700/30 hover:border-[#1877F2]/30 shadow-lg shadow-neutral-900/20"
                aria-label="Compartir en Facebook"
              >
                <span className="text-[#1877F2] text-3xl mb-3">
                  <FaFacebook />
                </span>
                <span className="text-sm font-medium">Facebook</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -5, backgroundColor: 'rgba(10, 102, 194, 0.15)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onShare('linkedin')}
                className="flex flex-col items-center justify-center p-4 bg-neutral-800/60 hover:bg-[#0A66C2]/10 rounded-xl transition-all duration-300 border border-neutral-700/30 hover:border-[#0A66C2]/30 shadow-lg shadow-neutral-900/20"
                aria-label="Compartir en LinkedIn"
              >
                <span className="text-[#0A66C2] text-3xl mb-3">
                  <FaLinkedin />
                </span>
                <span className="text-sm font-medium">LinkedIn</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -5, backgroundColor: 'rgba(37, 211, 102, 0.15)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onShare('whatsapp')}
                className="flex flex-col items-center justify-center p-4 bg-neutral-800/60 hover:bg-[#25D366]/10 rounded-xl transition-all duration-300 border border-neutral-700/30 hover:border-[#25D366]/30 shadow-lg shadow-neutral-900/20"
                aria-label="Compartir en WhatsApp"
              >
                <span className="text-[#25D366] text-3xl mb-3">
                  <FaWhatsapp />
                </span>
                <span className="text-sm font-medium">WhatsApp</span>
              </motion.button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 8px 20px -4px rgba(16, 185, 129, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onShare('copy')}
              className="mt-2 w-full py-4 px-4 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl flex items-center justify-center gap-3 transition-all duration-300 font-medium shadow-xl shadow-emerald-900/30"
              aria-label="Copiar enlace del artículo"
            >
              <FaLink />
              <span>Copiar enlace</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareMenu;