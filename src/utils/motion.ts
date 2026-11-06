import { Variants } from 'framer-motion';

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', delay = 0): Variants => ({
  hidden: {
    y: direction === 'up' ? 24 : direction === 'down' ? -24 : 0,
    x: direction === 'left' ? 24 : direction === 'right' ? -24 : 0,
    opacity: 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 120,
      duration: 0.8,
      delay,
    },
  },
});

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};
