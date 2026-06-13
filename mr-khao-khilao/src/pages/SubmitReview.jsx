import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaStar, FaFire, FaCheckCircle, FaArrowLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { menuItems } from '../data/menuItems'
import Button from '../components/ui/Button'

const SubmitReview = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    dish: '',
    rating: 5,
    review: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [hoverRating, setHoverRating] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated submission logic
    setSubmitted(true)
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-bg-primary text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(217,75,0,0.2) 0%, transparent 70%)' }}
        />
      </div>

      <div className="absolute top-8 left-8 z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-orange-primary transition-colors text-sm font-semibold">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-primary to-orange-secondary flex items-center justify-center shadow-orange-glow">
            <FaFire className="text-white text-xl" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-poppins font-extrabold text-white">
          Share Your <span className="text-gradient-orange">Experience</span>
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          Your feedback helps us perfect our authentic recipes.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-bg-card border border-white/5 rounded-3xl p-8 shadow-card"
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="flex justify-center">
                <FaCheckCircle className="text-success text-6xl animate-bounce" />
              </div>
              <h3 className="font-poppins font-bold text-white text-2xl">Thank You, {formData.name}!</h3>
              <p className="text-muted text-sm max-w-sm mx-auto">
                Your review has been successfully submitted. We appreciate your valuable feedback.
              </p>
              <p className="text-orange-primary text-xs font-semibold animate-pulse mt-6">
                Redirecting to home page in a few seconds...
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Details */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-bg-secondary border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-orange-primary/50 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-bg-secondary border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-orange-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-bg-secondary border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-orange-primary/50 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Gondia, Nagpur"
                    className="w-full bg-bg-secondary border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-orange-primary/50 transition-colors"
                  />
                </div>
              </div>

              {/* Select Dish */}
              <div>
                <label htmlFor="dish" className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                  Select Dish *
                </label>
                <select
                  id="dish"
                  name="dish"
                  required
                  value={formData.dish}
                  onChange={handleChange}
                  className="w-full bg-bg-secondary border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-primary/50 transition-colors"
                >
                  <option value="" disabled>Choose a dish you ordered</option>
                  {menuItems.map(item => (
                    <option key={item.id} value={item.name} className="bg-bg-card text-white">
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Star Selection */}
              <div>
                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                  Overall Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1
                    return (
                      <label key={i} className="cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          className="hidden"
                          value={ratingValue}
                          onClick={() => setFormData(prev => ({ ...prev, rating: ratingValue }))}
                        />
                        <FaStar
                          className="text-2xl transition-all duration-150"
                          style={{
                            color: ratingValue <= (hoverRating || formData.rating) ? '#E5B13C' : 'rgba(255,255,255,0.1)'
                          }}
                          onMouseEnter={() => setHoverRating(ratingValue)}
                          onMouseLeave={() => setHoverRating(null)}
                        />
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label htmlFor="review" className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                  Write Your Review *
                </label>
                <textarea
                  id="review"
                  name="review"
                  required
                  rows="4"
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Tell us about the flavor, freshness, spices..."
                  className="w-full bg-bg-secondary border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-orange-primary/50 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div>
                <Button type="submit" variant="primary" fullWidth size="lg">
                  Submit Review 🔥
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default SubmitReview
