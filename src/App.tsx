import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import Game from './components/Game';
import FloatingShapes from './components/FloatingShapes';
import Footer from './components/Footer';

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const backgroundClass = isDark
    ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
    : 'bg-gradient-to-br from-blue-100 via-pink-50 to-purple-100';

  return (
    <div className={`min-h-screen ${backgroundClass} transition-all duration-1000 relative overflow-hidden`}>
      <FloatingShapes isDark={isDark} />
      
      {/* Dark Mode Toggle */}
      <motion.button
        className={`fixed top-6 right-6 z-50 p-3 rounded-full ${
          isDark 
            ? 'bg-pink-500/20 border border-pink-500/30 text-pink-400 hover:bg-pink-500/30' 
            : 'bg-white/20 border border-white/30 text-purple-600 hover:bg-white/30'
        } backdrop-blur-xl transition-all duration-300 shadow-lg`}
        onClick={toggleDarkMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
      >
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </motion.button>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Animated Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.h1
            className={`text-4xl md:text-6xl font-bold mb-4 ${
              isDark
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
            }`}
            style={{
              filter: isDark 
                ? 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.3))'
                : 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3)) drop-shadow(0 0 20px rgba(139, 92, 246, 0.2))'
            }}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Rock ✊ Paper ✋ Scissors ✌️
          </motion.h1>
          <motion.h2
            className={`text-2xl md:text-3xl font-semibold ${
              isDark 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300' 
                : 'text-gray-700'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              filter: isDark 
                ? 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.3))'
                : 'none'
            }}
          >
            Showdown
          </motion.h2>
        </motion.div>

        {/* Game Component */}
        <Game isDark={isDark} />

        {/* Footer */}
        <Footer isDark={isDark} />
      </div>
    </div>
  );
}

export default App;