import Link from 'next/link';
import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectLinksProps {
  enlaces: Array<{
    tipo: string;
    url: string;
  }>;
}

const ProjectLinks: React.FC<ProjectLinksProps> = ({ enlaces }) => {
  return (
    <div className="flex space-x-3">
      {enlaces.map((enlace, index) => (
        <Link 
          key={index} 
          href={enlace.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${enlace.tipo === 'github' ? 'text-gray-400 hover:text-white' : 'text-emerald-300 hover:text-emerald-400'}`}
        >
          {enlace.tipo === 'github' ? (
            <>
              <FaGithub className="text-lg" />
              <span>Código</span>
            </>
          ) : (
            <>
              <FaExternalLinkAlt className="text-lg" />
              <span>Demo</span>
            </>
          )}
        </Link>
      ))}
    </div>
  );
};

export default ProjectLinks;