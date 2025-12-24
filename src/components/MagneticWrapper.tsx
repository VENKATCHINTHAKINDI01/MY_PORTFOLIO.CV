import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

interface MagneticWrapperProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export const MagneticWrapper = ({ 
  children, 
  strength = 0.3,
  className = '' 
}: MagneticWrapperProps) => {
  const { ref, position, handlers } = useMagneticEffect(strength);

  return (
    <motion.div
      ref={ref}
      {...handlers}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
