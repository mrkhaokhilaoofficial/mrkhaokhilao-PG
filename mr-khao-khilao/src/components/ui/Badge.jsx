const colorMap = {
  orange: 'bg-orange-primary/20 text-orange-primary border-orange-primary/30',
  gold: 'bg-gold/20 text-gold border-gold/30',
  green: 'bg-success/20 text-success border-success/30',
  red: 'bg-danger/20 text-danger border-danger/30',
  gray: 'bg-white/10 text-muted border-white/10',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

const Badge = ({ children, color = 'orange', className = '' }) => {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
        border ${colorMap[color]} ${className}
      `}
    >
      {children}
    </span>
  )
}

export default Badge
