import { motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'

const SectionTitle = ({ tag, title, highlight, subtitle, center = true, className = '' }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`${center ? 'text-center' : ''} ${className}`}
    >
      {tag && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-orange-primary/10 border border-orange-primary/20 text-orange-primary text-sm font-semibold tracking-widest uppercase mb-4">
          {tag}
        </span>
      )}
      <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
        {title}{' '}
        {highlight && (
          <span className="text-gradient-orange">{highlight}</span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted text-base md:text-lg max-w-2xl mx-auto font-inter">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionTitle
