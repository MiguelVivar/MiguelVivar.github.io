import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import HeroHeader from './HeroHeader';
import ProfileImage from './ProfileImage';
import TechStack from './TechStack';

interface HeroSectionProps {
  roles: string[];
  heroTextX: MotionValue<number>;
  heroTextY: MotionValue<number>;
  profileRotateX: MotionValue<number>;
  profileRotateY: MotionValue<number>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  roles, 
  heroTextX, 
  heroTextY, 
  profileRotateX, 
  profileRotateY 
}) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="w-full max-w-7xl mx-auto py-16 sm:py-24 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Hero text section with subtle movement */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ x: heroTextX, y: heroTextY }}
            className="flex-1 space-y-6 sm:space-y-8 text-center md:text-left relative"
          >
            {/* Subtle accent border */}
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-emerald-400 to-transparent opacity-60 hidden md:block"></div>
            
            <HeroHeader roles={roles} />
            
            {/* Additional decorative accent */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "40%" }}
              transition={{ delay: 1, duration: 1 }}
              className="h-0.5 bg-gradient-to-r from-emerald-300 to-transparent hidden md:block"
            />
          </motion.div>

          {/* Profile image section with 3D card effect */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ 
              rotateX: profileRotateX, 
              rotateY: profileRotateY,
              perspective: 1000
            }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center md:justify-end relative"
          >
            {/* Glowing background for profile */}
            <motion.div 
              className="absolute inset-0 bg-emerald-400/5 rounded-full blur-2xl transform scale-90"
              animate={{ 
                scale: [0.9, 0.95, 0.9],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Animated border */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-emerald-300/30"
              animate={{
                boxShadow: [
                  "0 0 10px 5px rgba(52, 211, 153, 0.1)",
                  "0 0 20px 10px rgba(52, 211, 153, 0.15)",
                  "0 0 10px 5px rgba(52, 211, 153, 0.1)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <ProfileImage />
          </motion.div>
        </div>
        
        {/* Floating tech badges at bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-12 md:mt-16 max-w-5xl mx-auto"
        >
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="backdrop-blur-sm bg-neutral-800/30 p-5 rounded-xl border border-gray-700/30 shadow-lg hover:shadow-emerald-500/10 transition-shadow duration-500"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-400/50"></div>
              <h3 className="text-center text-emerald-300 font-semibold tracking-wide">Tecnologías que domino</h3>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-400/50"></div>
            </div>
            <TechStack />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;