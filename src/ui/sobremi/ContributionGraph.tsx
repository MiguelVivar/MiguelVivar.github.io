'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaFire, FaExclamationTriangle } from 'react-icons/fa';
import { fetchGitHubContributions } from '../../lib/githubApi';

interface ContributionGraphProps {
  isLoading?: boolean;
}

interface ContributionDay {
  date: string;
  contributions: number;
  level: number; // 0-4 intensity level
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ 
  isLoading = false 
}) => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [weeklyAverage, setWeeklyAverage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const loadContributions = async () => {
      if (isLoading) return;
      
      setDataLoading(true);
      setError(null);
      
      try {
        const data = await fetchGitHubContributions();
        
        setContributions(data.contributions);
        setCurrentStreak(data.currentStreak);
        setLongestStreak(data.longestStreak);
        setTotalContributions(data.totalContributions);
        setWeeklyAverage(data.weeklyAverage);
        
      } catch (error) {
        console.error('Error loading contributions:', error);
        setError('No se pudieron cargar los datos de contribuciones');
        
        // Fallback: generar datos simulados
        generateFallbackData();
      } finally {
        setDataLoading(false);
      }
    };

    const generateFallbackData = () => {
      const data: ContributionDay[] = [];
      const today = new Date();
      const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      
      for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
        const contributions = Math.floor(Math.random() * 15);
        const level = contributions === 0 ? 0 : Math.min(Math.floor(contributions / 3) + 1, 4);
        
        data.push({
          date: new Date(d).toISOString().split('T')[0],
          contributions,
          level
        });
      }
      
      setContributions(data);
      
      // Calcular estadísticas para datos simulados
      let current = 0;
      let longest = 0;
      let temp = 0;
      
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].contributions > 0) {
          temp++;
          if (i === data.length - 1 || current === 0) {
            current = temp;
          }
        } else {
          longest = Math.max(longest, temp);
          temp = 0;
        }
      }
      
      const total = data.reduce((sum, day) => sum + day.contributions, 0);
      
      setCurrentStreak(current);
      setLongestStreak(Math.max(longest, temp));
      setTotalContributions(total);
      setWeeklyAverage(Math.round(total / 52));
    };

    loadContributions();
  }, [isLoading]);

  const getContributionColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-neutral-800';
      case 1: return 'bg-emerald-900/50';
      case 2: return 'bg-emerald-700/70';
      case 3: return 'bg-emerald-500/90';
      case 4: return 'bg-emerald-400';
      default: return 'bg-neutral-800';
    }
  };

  const getWeeksArray = () => {
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    
    contributions.forEach((day, index) => {
      const dayOfWeek = new Date(day.date).getDay();
      
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      
      currentWeek.push(day);
      
      if (index === contributions.length - 1) {
        weeks.push(currentWeek);
      }
    });
    
    return weeks;
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const weeks = getWeeksArray();

  return (
    <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50 hover:border-emerald-500/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
            <FaCalendar className="text-xl text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Gráfico de Contribuciones</h3>
            <p className="text-sm text-gray-400">Actividad durante el último año</p>
          </div>
        </div>
          {!dataLoading && !error && (
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <FaFire className="text-orange-500" />
              <span className="text-gray-400">Racha actual:</span>
              <span className="text-white font-bold">{currentStreak} días</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="flex items-center gap-2 text-sm text-amber-400">
            <FaExclamationTriangle />
            <span>Usando datos simulados</span>
          </div>
        )}
      </div>

      {isLoading || dataLoading ? (
        <div className="space-y-4">
          <div className="h-32 bg-neutral-700 rounded animate-pulse"></div>
          <div className="flex gap-4">
            <div className="h-4 bg-neutral-700 rounded flex-1 animate-pulse"></div>
            <div className="h-4 bg-neutral-700 rounded flex-1 animate-pulse"></div>
            <div className="h-4 bg-neutral-700 rounded flex-1 animate-pulse"></div>
          </div>
        </div>      ) : (
        <>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center gap-2 text-sm text-amber-300"
            >
              <FaExclamationTriangle />
              <span>No se pudieron cargar los datos reales. Mostrando datos simulados.</span>
            </motion.div>
          )}
          
          {/* Contribution Graph */}
          <div className="relative overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                    const day = week.find(d => new Date(d.date).getDay() === dayIndex);
                    if (!day) {
                      return <div key={dayIndex} className="w-3 h-3" />;
                    }
                    
                    return (
                      <motion.div
                        key={day.date}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: weekIndex * 0.01 + dayIndex * 0.005 
                        }}
                        whileHover={{ scale: 1.3 }}
                        className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 ${getContributionColor(day.level)}`}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            
            {/* Days of week labels */}
            <div className="flex mt-2 text-xs text-gray-500">
              <div className="flex flex-col gap-1 mr-2">
                <div className="h-3 flex items-center">Dom</div>
                <div className="h-3"></div>
                <div className="h-3 flex items-center">Mar</div>
                <div className="h-3"></div>
                <div className="h-3 flex items-center">Vie</div>
                <div className="h-3"></div>
                <div className="h-3"></div>
              </div>
            </div>
          </div>

          {/* Tooltip */}
          {hoveredDay && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-10 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white shadow-lg pointer-events-none"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: '100%',
                marginBottom: '8px'
              }}
            >
              <div className="font-medium">{hoveredDay.contributions} contribuciones</div>
              <div className="text-gray-400">{formatDate(hoveredDay.date)}</div>
            </motion.div>
          )}

          {/* Legend */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Menos</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
                  />
                ))}
              </div>
              <span>Más</span>
            </div>
          </div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-neutral-700"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{totalContributions}</div>
              <div className="text-sm text-gray-400">Total contribuciones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{currentStreak}</div>
              <div className="text-sm text-gray-400">Racha actual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{longestStreak}</div>
              <div className="text-sm text-gray-400">Racha más larga</div>
            </div>            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{weeklyAverage}</div>
              <div className="text-sm text-gray-400">Promedio semanal</div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default ContributionGraph;
