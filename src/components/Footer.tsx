import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  return (
    <motion.footer 
      className={`mt-16 pb-8 text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <div className="flex items-center justify-center gap-4 mb-4">
        <motion.a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`${isDark ? 'text-pink-400 hover:text-pink-300' : 'text-blue-500 hover:text-blue-600'} transition-colors`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Linkedin size={24} />
        </motion.a>
        <motion.a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-purple-500 hover:text-purple-600'} transition-colors`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={24} />
        </motion.a>
      </div>
      <motion.p
        className={`text-sm ${isDark ? 'hover:text-pink-400' : 'hover:text-purple-600'} transition-colors cursor-default`}
        whileHover={{ scale: 1.05 }}
      >
        Built by Piyush 🚀 | Stay winning, stay coding
      </motion.p>
    </motion.footer>
  );
};

export default Footer;