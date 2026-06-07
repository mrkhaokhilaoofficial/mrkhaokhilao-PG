// Framer Motion animation variants

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const slideLeft = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const slideRight = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
}

export const cardHover = {
  rest: { scale: 1, boxShadow: '0 4px 24px rgba(0,0,0,0.4)' },
  hover: {
    scale: 1.03,
    boxShadow: '0 8px 40px rgba(255, 122, 0, 0.3)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

export const floatAnimation = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, 3, -2, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const pulseGlow = {
  animate: {
    boxShadow: [
      '0 0 10px rgba(255, 122, 0, 0.3)',
      '0 0 30px rgba(255, 122, 0, 0.7)',
      '0 0 10px rgba(255, 122, 0, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const navbarGlass = {
  transparent: {
    background: 'rgba(13, 13, 13, 0)',
    backdropFilter: 'blur(0px)',
    boxShadow: 'none',
  },
  glass: {
    background: 'rgba(13, 13, 13, 0.85)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)',
  },
}
