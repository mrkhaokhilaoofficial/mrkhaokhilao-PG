import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaQuoteLeft, FaCheckCircle } from 'react-icons/fa'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { customerReviews } from '../../data/reviews'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'

const InitialAvatar = ({ initials, color }) => (
  <div
    className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-poppins font-extrabold text-white text-sm shrink-0"
    style={{ background: color, borderColor: 'rgba(255,122,0,0.3)', boxShadow: '0 0 12px rgba(255,122,0,0.15)' }}
  >
    {initials}
  </div>
)

const ReviewCard = ({ review }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className="bg-bg-card border border-white/5 rounded-2xl p-6 relative overflow-hidden hover:border-orange-primary/20 transition-colors"
    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
  >
    {/* Quote icon */}
    <FaQuoteLeft className="text-orange-primary/15 text-5xl absolute top-4 right-4" />

    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={i < review.rating ? 'text-gold' : 'text-muted'} />
      ))}
    </div>

    {/* Review text */}
    <p className="text-white/90 text-sm md:text-base leading-relaxed font-inter mb-6 relative z-10">
      "{review.review}"
    </p>

    {/* Dish tag */}
    <div className="mb-4">
      <span className="px-3 py-1 bg-orange-primary/10 border border-orange-primary/20 rounded-full text-orange-primary text-xs font-semibold">
        🍽️ {review.dish}
      </span>
    </div>

    {/* Customer info — initial avatar, no stock photo */}
    <div className="flex items-center gap-3">
      <InitialAvatar initials={review.initials} color={review.avatarColor} />
      <div>
        <div className="flex items-center gap-1.5">
          <p className="font-poppins font-bold text-white text-sm">{review.name}</p>
          {review.verified && <FaCheckCircle className="text-success text-xs" />}
        </div>
        <p className="text-muted text-xs">{review.location} · {review.date}</p>
      </div>
    </div>
  </motion.div>
)

const CustomerReviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(3)
  const intervalRef = useRef(null)

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 640) setSlidesToShow(1)
      else if (window.innerWidth < 1024) setSlidesToShow(2)
      else setSlidesToShow(3)
    }
    updateSlides()
    window.addEventListener('resize', updateSlides)
    return () => window.removeEventListener('resize', updateSlides)
  }, [])

  const totalSlides = Math.ceil(customerReviews.length / slidesToShow)

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides)
    }, 4000)
  }

  useEffect(() => {
    startAutoSlide()
    return () => clearInterval(intervalRef.current)
  }, [totalSlides])

  const goTo = (index) => {
    clearInterval(intervalRef.current)
    setCurrentSlide(index)
    startAutoSlide()
  }

  const prev = () => goTo((currentSlide - 1 + totalSlides) % totalSlides)
  const next = () => goTo((currentSlide + 1) % totalSlides)

  const visibleReviews = customerReviews.slice(
    currentSlide * slidesToShow,
    currentSlide * slidesToShow + slidesToShow
  )

  // Stats bar
  const avgRating = (customerReviews.reduce((s, r) => s + r.rating, 0) / customerReviews.length).toFixed(1)

  return (
    <section id="reviews" className="py-16 md:py-24 bg-bg-primary relative">
      <div className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,122,0,0.06), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          tag="What People Say"
          title="Customer"
          highlight="Reviews"
          subtitle={`Rated ${avgRating}/5 by over 1,800+ happy customers across Maharashtra.`}
        />

        {/* Slider */}
        <div className="mt-12 relative">
          <AnimatePresence mode="wait">
            <div key={currentSlide} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted hover:border-orange-primary hover:text-orange-primary transition-all"
              aria-label="Previous"
            >
              <HiChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalSlides }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-8 h-2.5 bg-orange-primary' : 'w-2.5 h-2.5 bg-white/20'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted hover:border-orange-primary hover:text-orange-primary transition-all"
              aria-label="Next"
            >
              <HiChevronRight size={20} />
            </button>
          </div>

          {/* Write a Review Button */}
          <div className="flex justify-center mt-8">
            <Link to="/reviews/new">
              <Button variant="primary" size="md">
                Write a Review ✍️
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-3 gap-4 bg-bg-card border border-white/5 rounded-2xl p-6"
        >
          {[
            { label: 'Average Rating', value: avgRating, suffix: '/5', icon: '⭐' },
            { label: 'Total Reviews', value: '1,842+', icon: '💬' },
            { label: 'Happy Customers', value: '1M+', icon: '😊' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="font-poppins font-extrabold text-2xl text-white">
                {stat.value}<span className="text-orange-primary">{stat.suffix}</span>
              </p>
              <p className="text-muted text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CustomerReviews
