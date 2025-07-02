import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Trophy } from 'lucide-react';

interface ScoreBoardProps {
  playerScore: number;
  cpuScore: number;
  winStreak: number;
  bestStreak: number;
  isDark: boolean;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ 
  playerScore, 
  cpuScore, 
  winStreak, 
  bestStreak, 
  isDark 
}) => {
  const glassClass = isDark 
    ? 'bg-gray-800/20 border-pink-500/20 backdrop-blur-xl' 
    : 'bg-white/20 border-white/30 backdrop-blur-xl';

  return (
    <motion.div 
      className="flex flex-col md:flex-row gap-6 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      {/* Main Scoreboard */}
      <motion.div 
        className={`${glassClass} border rounded-2xl p-6 flex-1`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center justify-between">
          <div className="text-center">
            <motion.div 
              className={`text-2xl mb-2 ${isDark ? 'text-pink-400' : 'text-blue-600'}`}
              animate={{ scale: playerScore > cpuScore ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <User size={32} className="mx-auto mb-1" />
            </motion.div>
            <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Player</p>
            <motion.p 
              className={`text-3xl font-bold ${isDark ? 'text-pink-400' : 'text-blue-600'}`}
              key={playerScore}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {playerScore}
            </motion.p>
          </div>

          <div className={`text-4xl font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            VS
          </div>

          <div className="text-center">
            <motion.div 
              className={`text-2xl mb-2 ${isDark ? 'text-cyan-400' : 'text-purple-600'}`}
              animate={{ scale: cpuScore > playerScore ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Bot size={32} className="mx-auto mb-1" />
            </motion.div>
            <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>CPU</p>
            <motion.p 
              className={`text-3xl font-bold ${isDark ? 'text-cyan-400' : 'text-purple-600'}`}
              key={cpuScore}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {cpuScore}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Streak Counter */}
      <motion.div 
        className={`${glassClass} border rounded-2xl p-6 md:w-48`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="text-center">
          <Trophy size={32} className={`mx-auto mb-2 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`} />
          <p className={`font-semibold mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Win Streak</p>
          <motion.p 
            className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`}
            key={winStreak}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {winStreak}
          </motion.p>
          <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Best: {bestStreak}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScoreBoard;