'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';

interface LanguageData {
  name: string;
  percentage: number;
  color: string;
}

interface LanguageChartProps {
  languages: LanguageData[];
  isLoading?: boolean;
}

const LanguageChart: React.FC<LanguageChartProps> = ({ 
  languages, 
  isLoading = false 
}) => {
  return (
    <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50 hover:border-emerald-500/30 transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
          <FaCode className="text-xl text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Lenguajes más utilizados</h3>
          <p className="text-sm text-gray-400">Distribución por porcentaje de código</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-neutral-700 rounded animate-pulse"></div>
              <div className="h-2 bg-neutral-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {languages.map((language, index) => (
            <motion.div
              key={language.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {/* Language Name and Percentage */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: language.color }}
                  />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    {language.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-white">
                  {language.percentage}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${language.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.3 + index * 0.1,
                    ease: "easeOut" 
                  }}
                  className="h-full rounded-full transition-all duration-300"
                  style={{ 
                    background: `linear-gradient(90deg, ${language.color}, ${language.color}dd)` 
                  }}
                />
              </div>
            </motion.div>
          ))}

          {/* Total Line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-4 mt-4 border-t border-neutral-700"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-400">Total</span>
              <span className="text-sm font-bold text-emerald-400">
                {languages.reduce((sum, lang) => sum + lang.percentage, 0)}%
              </span>
            </div>
          </motion.div>

          {/* Circular Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex justify-center mt-6"
          >
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-neutral-700"
                />
                
                {/* Progress circles for each language */}
                {languages.map((language, index) => {
                  const previousPercentages = languages
                    .slice(0, index)
                    .reduce((sum, lang) => sum + lang.percentage, 0);
                  
                  const circumference = 2 * Math.PI * 40;
                  const strokeDasharray = `${(language.percentage / 100) * circumference} ${circumference}`;
                  const strokeDashoffset = -((previousPercentages / 100) * circumference);
                  
                  return (
                    <motion.circle
                      key={language.name}
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={language.color}
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      initial={{ strokeDasharray: `0 ${circumference}` }}
                      animate={{ strokeDasharray }}
                      transition={{ 
                        duration: 2, 
                        delay: 0.5 + index * 0.2,
                        ease: "easeOut" 
                      }}
                    />
                  );
                })}
              </svg>
              
              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">Code</div>
                  <div className="text-xs text-gray-400">Languages</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LanguageChart;
