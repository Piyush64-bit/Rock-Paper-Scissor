import React from 'react';
import { motion } from 'framer-motion';
import { FloatingShape } from '../types';

interface FloatingShapesProps {
  isDark: boolean;
}

const FloatingShapes: React.FC<FloatingShapesProps> = ({ isDark }) => {
  const shapes: FloatingShape[] = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 120 + 60,
    color: isDark 
      ? ['bg-pink-500/15', 'bg-cyan-500/15', 'bg-purple-500/15', 'bg-green-500/15', 'bg-yellow-500/15'][Math.floor(Math.random() * 5)]
      : ['bg-blue-300/25', 'bg-pink-300/25', 'bg-purple-300/25', 'bg-green-300/25', 'bg-yellow-300/25'][Math.floor(Math.random() * 5)],
    duration: Math.random() * 25 + 20,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute rounded-full blur-2xl ${shape.color}`}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            x: [0, 150, -150, 0],
            y: [0, -150, 150, 0],
            scale: [1, 1.3, 0.7, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Additional sparkle effects for dark mode */}
      {isDark && Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;