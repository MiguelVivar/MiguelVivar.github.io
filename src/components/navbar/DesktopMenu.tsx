import React from 'react';
import { motion } from 'framer-motion';
import NavLink from './NavLink';
import ContactButton from './ContactButton';
import { IconType } from 'react-icons';

interface DesktopMenuProps {
  links: {
    href: string;
    label: string;
    icon: IconType;
  }[];
  currentPath: string;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ links, currentPath }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="hidden lg:flex items-center space-x-4">
      {links.map((link, index) => (
        <motion.div
          key={link.href}
          variants={itemVariants}
          custom={index}
        >
          <NavLink 
            href={link.href}
            label={link.label}
            icon={link.icon}
            isActive={currentPath === link.href}
          />
        </motion.div>
      ))}
      
      <motion.div
        variants={itemVariants}
        custom={links.length}
        className="hidden md:block"
      >
        <ContactButton isActive={currentPath === '/contacto'} />
      </motion.div>
    </div>
  );
};

export default DesktopMenu;