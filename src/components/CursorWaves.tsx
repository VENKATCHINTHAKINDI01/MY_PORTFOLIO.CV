import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Wave {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
}

const rainbowColors = [
  'hsl(0, 100%, 60%)',
  'hsl(30, 100%, 60%)',
  'hsl(60, 100%, 50%)',
  'hsl(120, 100%, 50%)',
  'hsl(180, 100%, 50%)',
  'hsl(240, 100%, 60%)',
  'hsl(280, 100%, 60%)',
  'hsl(320, 100%, 60%)',
];

export const CursorWaves = () => {
  const [waves, setWaves] = useState<Wave[]>([]);
  const [colorIndex, setColorIndex] = useState(0);

  const lastPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const createWave = useCallback((x: number, y: number) => {
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 20) return;

    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const newWave: Wave = {
      id: Date.now() + Math.random(),
      x,
      y,
      angle,
      color: rainbowColors[colorIndex],
    };

    setWaves((prev) => [...prev.slice(-18), newWave]);
    setColorIndex((prev) => (prev + 1) % rainbowColors.length);
    lastPos.current = { x, y };
  }, [colorIndex]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        createWave(e.clientX, e.clientY);
        rafRef.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [createWave]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {waves.map((wave) => (
          <motion.div
            key={wave.id}
            initial={{
              x: wave.x - 60,
              y: wave.y - 60,
              scale: 0.4,
              opacity: 0.7,
              rotate: wave.angle,
              filter: 'blur(0px)',
            }}
            animate={{
              scale: 4.8,
              opacity: 0,
              rotate: wave.angle + 60,
              filter: 'blur(8px)',
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.6,
              ease: 'easeOut',
            }}
            className="absolute w-[120px] h-[120px] rounded-full"
            style={{
              background: `
                radial-gradient(
                  circle,
                  ${wave.color}80 0%,
                  ${wave.color}30 35%,
                  transparent 70%
                )
              `,
              boxShadow: `
                0 0 40px ${wave.color}55,
                inset 0 0 20px ${wave.color}40
              `,
              mixBlendMode: 'screen',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Cursor Core Glow */}
      <motion.div
        className="absolute w-[90px] h-[90px] rounded-full"
        animate={{
          x: lastPos.current.x - 45,
          y: lastPos.current.y - 45,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
        style={{
          background: `radial-gradient(circle, ${rainbowColors[colorIndex]}40 0%, transparent 65%)`,
          filter: 'blur(6px)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};
