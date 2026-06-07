import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const StarRating = ({ rating, max = 5, size = 'sm', showNumber = false }) => {
  const sizeClass = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }[size]

  return (
    <div className="flex items-center gap-1">
      <div className={`flex items-center gap-0.5 ${sizeClass}`}>
        {Array.from({ length: max }, (_, i) => {
          const filled = i < Math.floor(rating)
          const half = !filled && i < rating
          return filled ? (
            <FaStar key={i} className="text-gold" />
          ) : half ? (
            <FaStarHalfAlt key={i} className="text-gold" />
          ) : (
            <FaRegStar key={i} className="text-muted" />
          )
        })}
      </div>
      {showNumber && (
        <span className={`text-white font-semibold ${sizeClass}`}>{rating}</span>
      )}
    </div>
  )
}

export default StarRating
