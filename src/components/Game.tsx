import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Choice, GameResult, GameState } from '../types';
import { useSound } from '../hooks/useSound';
import { getRandomQuote } from '../utils/quotes';
import ScoreBoard from './ScoreBoard';

interface GameProps {
  isDark: boolean;
}

const Game: React.FC<GameProps> = ({ isDark }) => {
  const { playPopSound, playWinSound, playLoseSound } = useSound();
  const [gameState, setGameState] = useState<GameState>({
    playerChoice: null,
    cpuChoice: null,
    result: null,
    playerScore: 0,
    cpuScore: 0,
    winStreak: 0,
    bestStreak: parseInt(localStorage.getItem('bestStreak') || '0'),
    isPlaying: false,
    showResult: false,
  });
  const [quote, setQuote] = useState(getRandomQuote());
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBigConfetti, setShowBigConfetti] = useState(false);

  const getChoiceEmoji = (choice: Choice): string => {
    switch (choice) {
      case 'rock': return '✊';
      case 'paper': return '✋';
      case 'scissors': return '✌️';
    }
  };

  const determineWinner = (player: Choice, cpu: Choice): GameResult => {
    if (player === cpu) return 'tie';
    if (
      (player === 'rock' && cpu === 'scissors') ||
      (player === 'paper' && cpu === 'rock') ||
      (player === 'scissors' && cpu === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const playGame = useCallback(async (playerChoice: Choice) => {
    playPopSound();
    setGameState(prev => ({ ...prev, isPlaying: true, playerChoice, showResult: false }));
    
    // Show loading state with suspense
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const cpuChoice: Choice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)] as Choice;
    const result = determineWinner(playerChoice, cpuChoice);
    
    let newPlayerScore = gameState.playerScore;
    let newCpuScore = gameState.cpuScore;
    let newWinStreak = gameState.winStreak;
    let newBestStreak = gameState.bestStreak;

    if (result === 'win') {
      newPlayerScore++;
      newWinStreak++;
      playWinSound();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
      
      if (newWinStreak > newBestStreak) {
        newBestStreak = newWinStreak;
        localStorage.setItem('bestStreak', newBestStreak.toString());
        setShowBigConfetti(true);
        setTimeout(() => setShowBigConfetti(false), 6000);
      }
    } else if (result === 'lose') {
      newCpuScore++;
      newWinStreak = 0;
      playLoseSound();
    } else {
      playPopSound();
    }

    setGameState(prev => ({
      ...prev,
      cpuChoice,
      result,
      playerScore: newPlayerScore,
      cpuScore: newCpuScore,
      winStreak: newWinStreak,
      bestStreak: newBestStreak,
      isPlaying: false,
      showResult: true,
    }));

    setQuote(getRandomQuote());
  }, [gameState.playerScore, gameState.cpuScore, gameState.winStreak, gameState.bestStreak, playPopSound, playWinSound, playLoseSound]);

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      playerChoice: null,
      cpuChoice: null,
      result: null,
      showResult: false,
    }));
    setQuote(getRandomQuote());
  };

  const getResultText = (result: GameResult | null): string => {
    switch (result) {
      case 'win': return 'You Win! 🎉';
      case 'lose': return 'You Lose! 😅';
      case 'tie': return "It's a Tie! 🤝";
      default: return '';
    }
  };

  const getResultColor = (result: GameResult | null): string => {
    if (isDark) {
      switch (result) {
        case 'win': return 'text-green-400';
        case 'lose': return 'text-red-400';
        case 'tie': return 'text-yellow-400';
        default: return 'text-gray-300';
      }
    } else {
      switch (result) {
        case 'win': return 'text-green-600';
        case 'lose': return 'text-red-600';
        case 'tie': return 'text-yellow-600';
        default: return 'text-gray-700';
      }
    }
  };

  const buttonClass = isDark 
    ? 'bg-gradient-to-br from-pink-500/20 to-purple-600/20 border-pink-500/30 hover:from-pink-500/30 hover:to-purple-600/30 hover:border-pink-400/50 text-white hover:shadow-pink-500/25' 
    : 'bg-gradient-to-br from-blue-100 to-purple-100 border-blue-200 hover:from-blue-200 hover:to-purple-200 hover:border-blue-300 text-gray-800 hover:shadow-blue-500/25';

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {(showConfetti || showBigConfetti) && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={showBigConfetti ? 300 : 150}
          recycle={false}
          colors={isDark ? ['#ec4899', '#8b5cf6', '#22d3ee', '#10b981'] : ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981']}
        />
      )}

      <ScoreBoard
        playerScore={gameState.playerScore}
        cpuScore={gameState.cpuScore}
        winStreak={gameState.winStreak}
        bestStreak={gameState.bestStreak}
        isDark={isDark}
      />

      {/* Enhanced Motivational Quote */}
      <motion.div
        className={`text-center mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
        key={quote}
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
      >
        <motion.p 
          className="text-lg md:text-xl font-medium italic"
          animate={{ 
            textShadow: isDark 
              ? '0 0 20px rgba(236, 72, 153, 0.3)' 
              : '0 0 10px rgba(139, 92, 246, 0.2)' 
          }}
        >
          "{quote}"
        </motion.p>
      </motion.div>

      {/* Enhanced Game Choices */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
        {/* Player Choice */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className={`font-semibold mb-4 text-lg ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Your Choice</p>
          <AnimatePresence>
            {gameState.playerChoice && (
              <motion.div
                className={`text-8xl p-6 rounded-full border-4 ${
                  isDark 
                    ? 'border-pink-500 bg-pink-500/10' 
                    : 'border-blue-500 bg-blue-500/10'
                } shadow-2xl`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  boxShadow: isDark 
                    ? '0 0 40px rgba(236, 72, 153, 0.6), 0 0 80px rgba(236, 72, 153, 0.3)'
                    : '0 0 40px rgba(59, 130, 246, 0.6), 0 0 80px rgba(59, 130, 246, 0.3)'
                }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {getChoiceEmoji(gameState.playerChoice)}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced VS */}
        <motion.div
          className={`text-5xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          VS
        </motion.div>

        {/* CPU Choice */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className={`font-semibold mb-4 text-lg ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>CPU Choice</p>
          <div className="text-8xl p-6">
            <AnimatePresence>
              {gameState.isPlaying ? (
                <motion.div
                  className={`${isDark ? 'text-cyan-400' : 'text-purple-500'}`}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: 0.5 },
                    scale: { repeat: Infinity, duration: 1 }
                  }}
                >
                  🤔
                </motion.div>
              ) : gameState.cpuChoice ? (
                <motion.div
                  className={`rounded-full border-4 ${
                    isDark 
                      ? 'border-cyan-500 bg-cyan-500/10' 
                      : 'border-purple-500 bg-purple-500/10'
                  } p-6 shadow-2xl`}
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ 
                    scale: 1, 
                    rotate: 0,
                    boxShadow: isDark 
                      ? '0 0 40px rgba(34, 211, 238, 0.6), 0 0 80px rgba(34, 211, 238, 0.3)'
                      : '0 0 40px rgba(139, 92, 246, 0.6), 0 0 80px rgba(139, 92, 246, 0.3)'
                  }}
                  exit={{ scale: 0, rotate: -180 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {getChoiceEmoji(gameState.cpuChoice)}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Loading Text */}
      <AnimatePresence>
        {gameState.isPlaying && (
          <motion.div
            className={`text-center mb-6 ${isDark ? 'text-pink-300' : 'text-purple-600'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.p 
              className="text-xl font-semibold"
              animate={{ 
                scale: [1, 1.05, 1],
                textShadow: isDark 
                  ? ['0 0 10px rgba(236, 72, 153, 0.5)', '0 0 20px rgba(236, 72, 153, 0.8)', '0 0 10px rgba(236, 72, 153, 0.5)']
                  : ['0 0 5px rgba(139, 92, 246, 0.3)', '0 0 15px rgba(139, 92, 246, 0.6)', '0 0 5px rgba(139, 92, 246, 0.3)']
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Shuffling hands... 🎲✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Result */}
      <AnimatePresence>
        {gameState.showResult && gameState.result && (
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.h2 
              className={`text-5xl font-bold ${getResultColor(gameState.result)}`}
              animate={{ 
                scale: [1, 1.1, 1],
                textShadow: gameState.result === 'win' 
                  ? ['0 0 20px rgba(34, 197, 94, 0.5)', '0 0 40px rgba(34, 197, 94, 0.8)', '0 0 20px rgba(34, 197, 94, 0.5)']
                  : gameState.result === 'lose'
                  ? ['0 0 20px rgba(239, 68, 68, 0.5)', '0 0 40px rgba(239, 68, 68, 0.8)', '0 0 20px rgba(239, 68, 68, 0.5)']
                  : ['0 0 20px rgba(251, 191, 36, 0.5)', '0 0 40px rgba(251, 191, 36, 0.8)', '0 0 20px rgba(251, 191, 36, 0.5)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {getResultText(gameState.result)}
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Choice Buttons */}
      <motion.div
        className="flex flex-wrap justify-center gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {(['rock', 'paper', 'scissors'] as Choice[]).map((choice, index) => (
          <motion.button
            key={choice}
            className={`${buttonClass} border-2 backdrop-blur-xl rounded-2xl p-6 text-6xl transition-all duration-300 shadow-xl hover:shadow-2xl`}
            onClick={() => playGame(choice)}
            disabled={gameState.isPlaying}
            whileHover={{ 
              scale: 1.08, 
              rotate: [-2, 2, -2, 0][index] || 0,
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300,
              delay: 1.2 + index * 0.1
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <motion.span
                animate={{ 
                  rotate: gameState.isPlaying ? [0, 5, -5, 0] : 0 
                }}
                transition={{ 
                  duration: 0.5, 
                  repeat: gameState.isPlaying ? Infinity : 0 
                }}
              >
                {getChoiceEmoji(choice)}
              </motion.span>
              <span className="text-lg font-semibold capitalize">{choice}</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Enhanced Play Again Button */}
      <AnimatePresence>
        {gameState.showResult && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.button
              className={`${buttonClass} border-2 backdrop-blur-xl rounded-full px-10 py-5 font-bold text-xl shadow-xl hover:shadow-2xl`}
              onClick={resetGame}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                y: [0, -8, 0],
                boxShadow: isDark 
                  ? ['0 10px 30px rgba(236, 72, 153, 0.3)', '0 20px 40px rgba(236, 72, 153, 0.5)', '0 10px 30px rgba(236, 72, 153, 0.3)']
                  : ['0 10px 30px rgba(59, 130, 246, 0.3)', '0 20px 40px rgba(59, 130, 246, 0.5)', '0 10px 30px rgba(59, 130, 246, 0.3)']
              }}
              transition={{ 
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                scale: { type: "spring", stiffness: 300 }
              }}
            >
              Play Again 🎮✨
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Game;