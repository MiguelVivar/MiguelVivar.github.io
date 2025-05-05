import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { redesSociales } from '../../data/redes';
import Image from 'next/image';

interface ImageMetadata {
  src: string;
  width: number;
  height: number;
  type: string;
}

interface AuthorProfileProps {
  name: string;
  image: string | ImageMetadata;
  description: string;
  role?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    website?: string;
    email?: string;
  };
  imageWidth?: number;
  imageHeight?: number;
}

const AuthorProfile: React.FC<AuthorProfileProps> = ({ 
  name, 
  image, 
  description,
  role = "Autor",
  socialLinks = {},
  imageWidth = 100,
  imageHeight = 100
}) => {
  // Determinar qué redes mostrar - usar las proporcionadas o las del sistema
  const linkedinUrl = socialLinks.linkedin || redesSociales.find(red => red.nombre === "LinkedIn")?.enlace;
  const githubUrl = socialLinks.github || redesSociales.find(red => red.nombre === "GitHub")?.enlace;
  const instagramUrl = socialLinks.instagram || redesSociales.find(red => red.nombre === "Instagram")?.enlace;
  
  // Asegurar que la imagen se maneje correctamente, sea una URL o un módulo importado
  const imgSrc = typeof image === 'string' ? image : image.src;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-12 pt-8 border-t border-neutral-700/30"
    >
      <motion.div 
        className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-gradient-to-br from-neutral-800/70 to-neutral-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-neutral-700/30 hover:shadow-emerald-500/10 transition-all duration-300"
        whileHover={{ y: -3 }}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, delay: 0.2 }}
          className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full p-1 shadow-lg shadow-emerald-900/30"
        >
          <div className="w-full h-full bg-neutral-900 rounded-full overflow-hidden">
            <Image 
              src={imgSrc} 
              alt={name} 
              className="w-full h-full object-cover" 
              width={imageWidth}
              height={imageHeight}
            />
          </div>
        </motion.div>
        
        <div className="text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 mb-2"
              >
                {role}
              </motion.span>
              <motion.h5 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-medium text-2xl text-white mb-1"
              >
                {name}
              </motion.h5>
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-neutral-300 text-pretty"
          >
            {description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center sm:justify-start mt-4 space-x-4"
          >
            {socialLinks.github || githubUrl ? (
              <motion.a 
                href={socialLinks.github || githubUrl}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub del autor"
              >
                <FaGithub size={20} />
              </motion.a>
            ) : null}
            
            {socialLinks.linkedin || linkedinUrl ? (
              <motion.a 
                href={socialLinks.linkedin || linkedinUrl}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn del autor"
              >
                <FaLinkedin size={20} />
              </motion.a>
            ) : null}
            
            {socialLinks.instagram || instagramUrl ? (
              <motion.a 
                href={socialLinks.instagram || instagramUrl}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Instagram del autor"
              >
                <FaInstagram size={20} />
              </motion.a>
            ) : null}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthorProfile;