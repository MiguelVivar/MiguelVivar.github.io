'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGitAlt, FaBook, FaStar, FaCodeBranch } from 'react-icons/fa';
import { BiGitCommit } from 'react-icons/bi';

interface ActivityItem {
  type: 'commit' | 'repository' | 'star' | 'fork';
  message: string;
  date: string;
  repository?: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  isLoading?: boolean;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ 
  activities, 
  isLoading = false 
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'commit':
        return <BiGitCommit className="text-lg" />;
      case 'repository':
        return <FaBook className="text-lg" />;
      case 'star':
        return <FaStar className="text-lg" />;
      case 'fork':
        return <FaCodeBranch className="text-lg" />;
      default:
        return <FaGitAlt className="text-lg" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'commit':
        return 'from-green-500 to-green-600';
      case 'repository':
        return 'from-blue-500 to-blue-600';
      case 'star':
        return 'from-yellow-500 to-yellow-600';
      case 'fork':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Hoy';
    if (diffInDays === 1) return 'Ayer';
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    
    return date.toLocaleDateString('es-ES', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50 hover:border-emerald-500/30 transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg">
          <FaGitAlt className="text-xl text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Actividad Reciente</h3>
          <p className="text-sm text-gray-400">Últimas contribuciones y actividades</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-3 p-3 rounded-lg animate-pulse">
              <div className="w-8 h-8 bg-neutral-700 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
                <div className="h-3 bg-neutral-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ x: 5 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-700/30 transition-all duration-300 group cursor-pointer"
            >
              {/* Activity Icon */}
              <div className={`flex-shrink-0 p-2 rounded-lg bg-gradient-to-br ${getActivityColor(activity.type)} text-white group-hover:scale-110 transition-transform duration-300`}>
                {getActivityIcon(activity.type)}
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                  {activity.message}
                </p>
                
                <div className="flex items-center gap-2 mt-1">
                  {activity.repository && (
                    <span className="text-xs text-emerald-400 font-medium">
                      {activity.repository}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    {formatDate(activity.date)}
                  </span>
                </div>
              </div>

              {/* Time indicator */}
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 pt-4 border-t border-neutral-700"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {activities.length} actividades recientes
          </span>
          <motion.a
            href="https://github.com/MiguelVivar"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-300 flex items-center gap-1"
          >
            Ver más en GitHub
            <FaGitAlt className="text-xs" />
          </motion.a>
        </div>
      </motion.div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(64, 64, 64, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.7);
        }
      `}</style>
    </div>
  );
};

export default RecentActivity;
