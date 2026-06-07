import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaStar, FaMotorcycle, FaMapMarkerAlt } from 'react-icons/fa'
import { HiClock } from 'react-icons/hi'
import { drivers } from '../../data/drivers'
import { fadeUp } from '../../animations/variants'

const MapPlaceholder = () => (
  <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden map-gradient border border-white/5">
    {/* Grid */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,122,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.08) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }}
    />

    {/* Roads */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="none">
      {/* Main roads */}
      <line x1="0" y1="125" x2="400" y2="125" stroke="rgba(255,122,0,0.15)" strokeWidth="8" />
      <line x1="200" y1="0" x2="200" y2="250" stroke="rgba(255,122,0,0.15)" strokeWidth="6" />
      <line x1="0" y1="70" x2="400" y2="70" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
      <line x1="0" y1="180" x2="400" y2="180" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
      <line x1="100" y1="0" x2="100" y2="250" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
      <line x1="300" y1="0" x2="300" y2="250" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />

      {/* Route line — orange */}
      <motion.path
        d="M 340 220 L 300 180 L 300 125 L 200 125 L 200 90 L 60 90"
        stroke="#FF7A00"
        strokeWidth="3"
        strokeDasharray="8 4"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: 'easeInOut' }}
      />

      {/* Driver position */}
      <motion.circle
        cx="300"
        cy="150"
        r="8"
        fill="#FF7A00"
        animate={{ cx: [300, 270, 240, 200, 200], cy: [150, 135, 125, 125, 100] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.circle
        cx="300"
        cy="150"
        r="14"
        fill="rgba(255,122,0,0.2)"
        animate={{ r: [14, 20, 14], cx: [300, 270, 240, 200, 200], cy: [150, 135, 125, 125, 100] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </svg>

    {/* Outlet pin */}
    <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
      <div className="w-8 h-8 bg-orange-primary rounded-full flex items-center justify-center border-2 border-white shadow-orange-glow">
        <FaMapMarkerAlt className="text-white text-xs" />
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-white text-[9px] font-bold bg-bg-primary/80 px-1.5 py-0.5 rounded">
        MKK Outlet
      </div>
    </div>

    {/* Customer pin */}
    <div className="absolute top-1/3 left-1/6 -translate-x-1/2 -translate-y-1/2">
      <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-white">
        <span className="text-xs">🏠</span>
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-white text-[9px] font-bold bg-bg-primary/80 px-1.5 py-0.5 rounded">
        Your Location
      </div>
    </div>

    {/* Map label */}
    <div className="absolute bottom-3 right-3">
      <span className="px-2 py-1 bg-bg-primary/80 backdrop-blur-sm rounded-lg text-muted text-xs border border-white/5">
        Gondia, Maharashtra
      </span>
    </div>
  </div>
)

const LiveDeliveryMap = () => {
  const activeDriver = drivers.find(d => d.status === 'On Delivery')

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-bg-card border border-white/5 rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="font-poppins font-bold text-white text-base">Live Delivery Tracking</p>
        <span className="flex items-center gap-1.5 text-success text-xs font-semibold">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
          Live
        </span>
      </div>

      <MapPlaceholder />

      {/* Driver Info */}
      {activeDriver && (
        <div className="mt-4 flex items-center justify-between gap-3 p-4 bg-bg-secondary rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <img
              src={activeDriver.avatar}
              alt={activeDriver.name}
              className="w-12 h-12 rounded-xl border-2 border-orange-primary/30 object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <p className="font-poppins font-bold text-white text-sm">{activeDriver.name}</p>
                <div className="flex items-center gap-0.5">
                  <FaStar className="text-gold text-xs" />
                  <span className="text-gold text-xs font-bold">{activeDriver.rating}</span>
                </div>
              </div>
              <p className="text-muted text-xs mt-0.5">
                <FaMotorcycle className="inline mr-1 text-orange-primary" />
                {activeDriver.vehicle}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end text-orange-primary text-sm font-bold">
              <HiClock />
              {activeDriver.eta}
            </div>
            <p className="text-muted text-xs mt-0.5">ETA</p>
            <button className="mt-2 w-9 h-9 bg-orange-primary/10 border border-orange-primary/30 rounded-xl flex items-center justify-center text-orange-primary hover:bg-orange-primary hover:text-white transition-all ml-auto">
              <FaPhone className="text-xs" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default LiveDeliveryMap
