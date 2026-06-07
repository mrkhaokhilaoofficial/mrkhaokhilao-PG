import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from '../ui/SectionTitle'
import { fadeUp, staggerContainer } from '../../animations/variants'

gsap.registerPlugin(ScrollTrigger)

const timelineSteps = [
  {
    year: '2018',
    title: 'Secure Job Decision',
    description: 'At 22, Chef Piyush made the bold decision to leave a secure, well-paying job and pursue his true calling — cooking.',
    icon: '💼',
    color: '#B3B3B3',
  },
  {
    year: '2019',
    title: 'Oberoi Hotel Experience',
    description: 'Began his professional journey at The Oberoi Hotel, Agra — working alongside top Indian and International chefs and mastering 5-star techniques.',
    icon: '⭐',
    color: '#FFD700',
  },
  {
    year: '2020',
    title: 'Multi-City Culinary Learning',
    description: 'Traveled across 5+ cities — absorbing diverse cuisines, regional flavours, and premium hospitality standards at every stop.',
    icon: '🗺️',
    color: '#FFA726',
  },
  {
    year: '2021',
    title: 'Recipe Content Creation',
    description: 'Launched the "Mr. Khilao Khilao" YouTube channel — sharing 100+ authentic recipes. Content crossed 1M+ views, connecting with food lovers everywhere.',
    icon: '📱',
    color: '#FF7A00',
  },
  {
    year: '2023',
    title: 'Mr. Khao Khilao Launch',
    description: 'Opened the flagship outlet at Railtoly, Gondia — turning years of passion, skill and sacrifice into a premium, customer-loved food brand.',
    icon: '🔥',
    color: '#FF7A00',
    isActive: true,
  },
  {
    year: 'Future',
    title: 'Franchise Expansion',
    description: 'Expanding to Nagpur, Amravati, Wardha and beyond — building a trusted multi-city franchise network across Vidarbha and Maharashtra.',
    icon: '🚀',
    color: '#FFD700',
    isFuture: true,
  },
]

const JourneyTimeline = () => {
  const lineRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      )

      // Step dots glow on scroll
      gsap.utils.toArray('.timeline-dot').forEach((dot, i) => {
        gsap.fromTo(
          dot,
          { boxShadow: '0 0 0px rgba(255,122,0,0)', scale: 0.8 },
          {
            boxShadow: '0 0 16px rgba(255,122,0,0.7)',
            scale: 1,
            scrollTrigger: {
              trigger: dot,
              start: 'top 75%',
              end: 'top 60%',
              scrub: true,
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" ref={sectionRef} className="py-16 md:py-24 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="The Story"
          title="Our"
          highlight="Journey"
          subtitle="From a dream in a 5-star kitchen to a premium brand loved by thousands."
        />

        {/* Desktop Timeline */}
        <div className="hidden lg:block mt-16 relative">
          {/* Line */}
          <div className="absolute top-10 left-0 right-0 h-0.5 bg-white/5">
            <div
              ref={lineRef}
              className="h-full bg-gradient-to-r from-muted via-orange-primary to-orange-primary"
            />
          </div>

          <div className="grid grid-cols-6 gap-4 relative">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Dot */}
                <div
                  className={`timeline-dot relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center text-3xl
                    border-2 transition-all duration-500 cursor-default
                    ${step.isActive
                      ? 'bg-orange-primary border-orange-primary shadow-orange-glow'
                      : step.isFuture
                        ? 'bg-bg-card border-dashed border-orange-primary/40'
                        : 'bg-bg-card border-white/10 group-hover:border-orange-primary/50'
                    }`}
                >
                  {step.icon}
                  {step.isFuture && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-primary animate-pulse" />
                  )}
                </div>

                {/* Year badge */}
                <span
                  className="mt-3 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: `${step.color}20`, color: step.color, border: `1px solid ${step.color}30` }}
                >
                  {step.year}
                </span>

                {/* Title */}
                <h3 className="mt-2 font-poppins font-bold text-sm text-white group-hover:text-orange-primary transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-1 text-muted text-xs leading-relaxed font-inter">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet — Vertical Timeline */}
        <div className="lg:hidden mt-12 relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10" />
          <div
            className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-orange-primary to-transparent"
            style={{ height: '60%' }}
          />

          <div className="space-y-8 pl-16">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Dot */}
                <div
                  className={`absolute -left-10 top-1 timeline-dot w-8 h-8 rounded-xl flex items-center justify-center text-sm
                    border transition-all duration-300
                    ${step.isActive ? 'bg-orange-primary border-orange-primary shadow-orange-glow' : 'bg-bg-card border-white/20'}`}
                >
                  {step.icon}
                </div>

                <div className="bg-bg-card border border-white/5 rounded-xl p-4 hover:border-orange-primary/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-poppins font-bold text-white text-sm">{step.title}</h3>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: `${step.color}20`, color: step.color }}
                    >
                      {step.year}
                    </span>
                  </div>
                  <p className="text-muted text-xs leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default JourneyTimeline
