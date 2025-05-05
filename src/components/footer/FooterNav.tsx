import { motion } from 'framer-motion';
import Link from 'next/link';
import type { IconType } from 'react-icons';

interface NavEnlace {
  href: string;
  label: string;
  icon: IconType;
}

interface FooterNavProps {
  enlaces: NavEnlace[];
}

const FooterNav: React.FC<FooterNavProps> = ({ enlaces }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="space-y-5"
    >
      <h3 className="text-lg font-bold text-white relative inline-block">
        Enlaces Rápidos
        <motion.span 
          className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-300"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
      </h3>
      <ul className="space-y-3 bg-neutral-900/30 backdrop-blur-sm p-4 rounded-lg border-l-2 border-emerald-500/40">
        {enlaces.map((enlace, index) => {
          const Icon = enlace.icon;
          
          return (
            <motion.li 
              key={enlace.href}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
              className="transform transition-transform duration-300 hover:translate-x-1"
            >
              <Link href={enlace.href} className="text-gray-300 hover:text-emerald-300 transition-colors duration-300 flex items-center group">
                <motion.div 
                  className="mr-3 p-2 bg-neutral-800/80 rounded-md text-emerald-400 group-hover:bg-emerald-500/20 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
                <span className="font-medium">
                  {enlace.label}
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default FooterNav;