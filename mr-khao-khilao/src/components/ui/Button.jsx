import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-gradient-to-r from-orange-primary to-orange-secondary text-white hover:shadow-orange-glow hover:brightness-110',
  secondary: 'border border-orange-primary text-orange-primary hover:bg-orange-primary hover:text-white',
  ghost: 'text-white hover:text-orange-primary hover:bg-white/5',
  gold: 'bg-gradient-to-r from-gold to-orange-secondary text-black font-bold hover:brightness-110',
  danger: 'bg-danger text-white hover:brightness-110',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  icon,
  iconPosition = 'left',
}) => {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-semibold
        transition-all duration-200 cursor-pointer select-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </motion.button>
  )
}

export default Button
