'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaCode, FaBook } from 'react-icons/fa';
import { BiGitCommit } from 'react-icons/bi';
import SectionTitle from './SectionTitle';
import GitHubStatsCard from './GitHubStatsCard';
import LanguageChart from './LanguageChart';
import ContributionGraph from './ContributionGraph';
import RecentActivity from './RecentActivity';
import { fetchAllGitHubData } from '../../lib/githubApi';

interface GitHubStats {
  totalRepositories: number;
  totalContributions: number;
  totalStars: number;
  totalFollowers: number;
  totalCommits: number;
  publicRepos: number;
}

interface LanguageData {
  name: string;
  percentage: number;
  color: string;
}

interface ActivityItem {
  type: 'commit' | 'repository' | 'star' | 'fork';
  message: string;
  date: string;
  repository?: string;
}

const GitHubDashboard: React.FC = () => {
  const [stats, setStats] = useState<GitHubStats>({
    totalRepositories: 0,
    totalContributions: 0,
    totalStars: 0,
    totalFollowers: 0,
    totalCommits: 0,
    publicRepos: 0
  });
  const [languages, setLanguages] = useState<LanguageData[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener datos reales de GitHub
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await fetchAllGitHubData();
        
        setStats(data.stats);
        setLanguages(data.languages);
        setRecentActivity(data.recentActivity);
        
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setError('Error al cargar datos de GitHub. Usando datos de respaldo.');
        
        // Fallback a datos simulados en caso de error
        setStats({
          totalRepositories: 42,
          totalContributions: 1248,
          totalStars: 156,
          totalFollowers: 89,
          totalCommits: 2340,
          publicRepos: 38
        });

        setLanguages([
          { name: 'TypeScript', percentage: 35, color: '#3178c6' },
          { name: 'JavaScript', percentage: 28, color: '#f7df1e' },
          { name: 'Python', percentage: 18, color: '#3776ab' },
          { name: 'CSS', percentage: 12, color: '#1572b6' },
          { name: 'HTML', percentage: 7, color: '#e34f26' }
        ]);

        setRecentActivity([
          {
            type: 'commit',
            message: 'feat: Implementar dashboard de GitHub',
            date: '2024-05-24',
            repository: 'MiguelVivar.github.io'
          },
          {
            type: 'repository',
            message: 'Creado nuevo repositorio: Portfolio-2024',
            date: '2024-05-23'
          },
          {
            type: 'commit',
            message: 'fix: Corregir responsive design en mobile',
            date: '2024-05-22',
            repository: 'e-commerce-app'
          },
          {
            type: 'star',
            message: 'Starred react-spring/react-spring',
            date: '2024-05-21'
          },
          {
            type: 'commit',
            message: 'docs: Actualizar documentación del proyecto',
            date: '2024-05-20',
            repository: 'api-rest-node'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const statsCards = [
    {
      title: 'Repositorios',
      value: stats.totalRepositories,
      icon: <FaBook className="text-2xl" />,
      color: 'from-blue-500 to-blue-600',
      suffix: ''
    },
    {
      title: 'Contribuciones',
      value: stats.totalContributions,
      icon: <BiGitCommit className="text-2xl" />,
      color: 'from-green-500 to-green-600',
      suffix: ''
    },
    {
      title: 'Stars Recibidas',
      value: stats.totalStars,
      icon: <FaStar className="text-2xl" />,
      color: 'from-yellow-500 to-yellow-600',
      suffix: ''
    },
    {
      title: 'Seguidores',
      value: stats.totalFollowers,
      icon: <FaUsers className="text-2xl" />,
      color: 'from-purple-500 to-purple-600',
      suffix: ''
    },
    {
      title: 'Commits Totales',
      value: stats.totalCommits,
      icon: <FaCodeBranch className="text-2xl" />,
      color: 'from-emerald-500 to-emerald-600',
      suffix: ''
    },
    {
      title: 'Repos Públicos',
      value: stats.publicRepos,
      icon: <FaCode className="text-2xl" />,
      color: 'from-teal-500 to-teal-600',
      suffix: ''
    }
  ];
  return (
    <section className="mb-20 relative">
      <SectionTitle 
        title="Dashboard" 
        subtitle="Personal" 
        description="Estadísticas y métricas de mi actividad en GitHub"
        icon={<FaGithub className="text-3xl text-emerald-400" />}
      />

      {/* Mensaje de error si hay problemas cargando datos */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-yellow-900/30 border border-yellow-600/50 rounded-lg"
        >
          <p className="text-yellow-200 text-sm">
            ⚠️ {error}
          </p>
        </motion.div>
      )}

      <div className="space-y-8">
        {/* Estadísticas Principales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4"
        >
          {statsCards.map((card, index) => (
            <GitHubStatsCard
              key={card.title}
              {...card}
              delay={index * 0.1}
              isLoading={isLoading}
            />
          ))}
        </motion.div>

        {/* Gráficos y Análisis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lenguajes más utilizados */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LanguageChart 
              languages={languages} 
              isLoading={isLoading}
            />
          </motion.div>

          {/* Actividad Reciente */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <RecentActivity 
              activities={recentActivity} 
              isLoading={isLoading}
            />
          </motion.div>
        </div>

        {/* Gráfico de Contribuciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ContributionGraph isLoading={isLoading} />
        </motion.div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl -z-10"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl -z-10"></div>
    </section>
  );
};

export default GitHubDashboard;
