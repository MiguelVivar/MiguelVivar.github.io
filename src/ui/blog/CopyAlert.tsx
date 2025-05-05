'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

interface CopyAlertProps {
  isVisible: boolean;
  message?: string;
  onClose: () => void;
  autoCloseTime?: number;
}

const CopyAlert: React.FC<CopyAlertProps> = ({
  isVisible,
  message = 'Enlace copiado al portapapeles',
  onClose,
  autoCloseTime = 3000
}) => {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (isVisible) {
      timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoCloseTime, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-5 right-5 z-50"
        >
          <div className="bg-emerald-500/90 text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
            <div className="bg-white/20 rounded-full p-1.5 mr-3">
              <FaCheck className="text-white" />
            </div>
            <span className="font-medium text-sm">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CopyAlert;