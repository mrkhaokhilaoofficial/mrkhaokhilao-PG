import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHandshake, FaFire, FaCheckCircle, FaArrowLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

const ApplyFranchise = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentLocation: '',
    targetCity: '',
    budget: '',
    experience: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated submission logic
    setSubmitted(true)
    setTimeout(() => {
      navigate('/')
    }, 3500)
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
            <FaHandshake className="text-white text-xl" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-poppins font-extrabold text-white">
          Franchise <span className="text-gradient-orange">Partnership</span>
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          Apply to build your business backed by the fastest growing brand in Vidarbha.
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
              <h3 className="font-poppins font-bold text-white text-2xl">Application Submitted!</h3>
              <p className="text-muted text-sm max-w-sm mx-auto">
                Thank you for applying, {formData.name}. Our franchise partnership team will review your details and contact you within 24 hours.
              </p>
              <p className="text-orange-primary text-xs font-semibold animate-pulse mt-6">
                Redirecting to home page in a few seconds...
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Details */}
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
                    placeholder="Your name"
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
                    Contact Number *
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
                  <label htmlFor="currentLocation" className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Current City *
                  </label>
                  <input
                    type="text"
                    id="currentLocation"
                    name="currentLocation"
                    required
                    value={formData.currentLocation}
                    onChange={handleChange}
                    placeholder="e.g. Nagpur, Bhandara"
                    className="w-full bg-bg-secondary border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-orange-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="targetCity" className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Target City/Area *
                  </label>
                  <input
                    type="text"
                    id="targetCity"
                    name="targetCity"
                    required
                    value={formData.targetCity}
                    onChange={handleChange}
                    placeholder="City you want franchise in"
                    className="w-full bg-bg-secondary border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-orange-primary/50 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                    Investment Budget *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-bg-secondary border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-primary/50 transition-colors"
                  >
                    <option value="" disabled>Select your budget range</option>
                    <option value="5-10" className="bg-bg-card text-white">₹5 Lakhs - ₹10 Lakhs</option>
                    <option value="10-15" className="bg-bg-card text-white">₹10 Lakhs - ₹15 Lakhs</option>
                    <option value="15-20" className="bg-bg-card text-white">₹15 Lakhs - ₹20 Lakhs</option>
                    <option value="20+" className="bg-bg-card text-white">₹20 Lakhs +</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                  Food Business Experience *
                </label>
                <select
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full bg-bg-secondary border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-primary/50 transition-colors"
                >
                  <option value="" disabled>Do you have past F&B experience?</option>
                  <option value="none" className="bg-bg-card text-white">No prior experience</option>
                  <option value="less-2" className="bg-bg-card text-white">Yes, less than 2 years</option>
                  <option value="more-2" className="bg-bg-card text-white">Yes, more than 2 years</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">
                  Additional Details & Queries
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details about your background, property availability, or queries..."
                  className="w-full bg-bg-secondary border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-orange-primary/50 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div>
                <Button type="submit" variant="primary" fullWidth size="lg">
                  Submit Application 🔥
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default ApplyFranchise
