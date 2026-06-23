import { useState, useEffect } from 'react';
import { Review, ViewType } from '../types';
import { motion } from 'motion/react';
import { Star, ChevronRight, Award, Flame, Store, ArrowRight, Heart, ChevronLeft } from 'lucide-react';

interface HomeViewProps {
  reviews: Review[];
  setView: (view: ViewType) => void;
}

export default function HomeView({ reviews, setView }: HomeViewProps) {
  const specials = [
    {
      name: 'SPECIAL SAOJI BAG',
      tagline: 'Warm potli pouch with rich spiced Saoji gravy core and cheese blend.',
      image: '/images/veg_saoji_bag_1781813682604.jpg',
    },
    {
      name: 'MASTI ACHARI BAG',
      tagline: 'Puffed crispy pastry potlies stuffed with pickled seasonings and soft cheese melt.',
      image: '/images/veg_achari_bag_1781813699434.jpg',
    },
    {
      name: 'SAOJI PANEER TIKKA',
      tagline: 'Authentic Vidarbha hot pepper marinade on tandoor fire-baked cottage cheese.',
      image: '/images/saoji_paneer_1781813729457.jpg',
    },
    {
      name: 'MALAI CHAAP ROLL',
      tagline: 'Delectable mild-creamy cashew-yogurt marinade grilled soya chaap in thin roll.',
      image: '/images/malai_chaap_roll_1781813758787.jpg',
    },
    {
      name: 'MAKHANI MOMOS',
      tagline: 'Smoked veggie dumplings coated in silken buttery rich tomato cream gravy.',
      image: '/images/makhani_momos_1781813790131.jpg',
    }
  ];

  const franchises = [
    {
      id: 'f1',
      city: 'GONDIA - Near Gujarati School Road',
      title: 'Flagship Outlet',
      desc: '"The absolute heart of our culinary journey, smoky charcoal specialties, and traditional hospitality."',
      loc: '📍 Maharashtra, India'
    },
    {
      id: 'f2',
      city: 'GONDIA - Near South to Punjab, Sunny medical Road',
      title: 'Premium Outlet',
      desc: '"Bringing the absolute essence of Chef Piyush\'s recipes back to Agra, where his corporate journey began in the prestigious Oberoi Hotel."',
      loc: '📍 Uttar Pradesh, India'
    },
    {
      id: 'f3',
      city: 'COMING SOON',
      title: 'Your City Next?',
      desc: 'Our expansion team is currently evaluating multiple premium commercial spaces. Apply to bring premium pure vegetarian dining to your city.',
      loc: '📍 Future Hubs',
      isComingSoon: true
    }
  ];

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleCards = windowWidth >= 1024 ? 3 : windowWidth >= 768 ? 2 : 1;

  // 1. Specials state
  const [specialsIndex, setSpecialsIndex] = useState(0);
  const [isSpecialsHovered, setIsSpecialsHovered] = useState(false);
  
  useEffect(() => {
    if (isSpecialsHovered) return;
    const id = setInterval(() => {
      setSpecialsIndex((prev) => {
        const maxIdx = Math.max(0, specials.length - visibleCards);
        return prev >= maxIdx ? 0 : prev + 1;
      });
    }, 4500);
    return () => clearInterval(id);
  }, [isSpecialsHovered, visibleCards, specials.length]);

  const prevSpecial = () => {
    const maxIdx = Math.max(0, specials.length - visibleCards);
    setSpecialsIndex((prev) => (prev === 0 ? maxIdx : prev - 1));
  };
  
  const nextSpecial = () => {
    const maxIdx = Math.max(0, specials.length - visibleCards);
    setSpecialsIndex((prev) => (prev >= maxIdx ? 0 : prev + 1));
  };

  // 2. Reviews state
  const [reviewsIndex, setReviewsIndex] = useState(0);
  const [isReviewsHovered, setIsReviewsHovered] = useState(false);

  useEffect(() => {
    if (isReviewsHovered || reviews.length <= visibleCards) return;
    const id = setInterval(() => {
      setReviewsIndex((prev) => {
        const maxIdx = Math.max(0, reviews.length - visibleCards);
        return prev >= maxIdx ? 0 : prev + 1;
      });
    }, 4500);
    return () => clearInterval(id);
  }, [isReviewsHovered, visibleCards, reviews.length]);

  const prevReview = () => {
    const maxIdx = Math.max(0, reviews.length - visibleCards);
    setReviewsIndex((prev) => (prev === 0 ? maxIdx : prev - 1));
  };
  
  const nextReview = () => {
    const maxIdx = Math.max(0, reviews.length - visibleCards);
    setReviewsIndex((prev) => (prev >= maxIdx ? 0 : prev + 1));
  };

  // 3. Franchises state
  const [franchisesIndex, setFranchisesIndex] = useState(0);
  const [isFranchisesHovered, setIsFranchisesHovered] = useState(false);

  useEffect(() => {
    if (isFranchisesHovered || franchises.length <= visibleCards) return;
    const id = setInterval(() => {
      setFranchisesIndex((prev) => {
        const maxIdx = Math.max(0, franchises.length - visibleCards);
        return prev >= maxIdx ? 0 : prev + 1;
      });
    }, 4500);
    return () => clearInterval(id);
  }, [isFranchisesHovered, visibleCards, franchises.length]);

  const prevFranchise = () => {
    const maxIdx = Math.max(0, franchises.length - visibleCards);
    setFranchisesIndex((prev) => (prev === 0 ? maxIdx : prev - 1));
  };
  
  const nextFranchise = () => {
    const maxIdx = Math.max(0, franchises.length - visibleCards);
    setFranchisesIndex((prev) => (prev >= maxIdx ? 0 : prev + 1));
  };

  return (
    <div className="animate-fade-in text-on-surface">
      {/* Hero Header Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 md:px-12 relative overflow-hidden bg-gradient-to-b from-neutral-dark/40 to-neutral-dark/95">
        <div className="absolute inset-0 z-0 opacity-25">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCtc3g1vJOoJa4f1_ohF8QXX1ENib0ua0XVzD7Y7HTLGPBf7R7p2mtTPJiPClbRYlLLVtQ23Y_8QNPmMw9HkFRCnOFHqsi70ghj_ZBygNVSvGDdD4KyVsNOJnCvwMNkGZP5CC7NNqtp-Z6ufat9ox2EPKsC5rtQJ8tYKMVwCd82oNW2zGb_wBcvp9wsp9rShoLeOS2bGL7S1W7bvrqzcd9vlf2LQmf3ODKq_QBIv_g06_NmWoV3uQZ4_bXFM-ZvdXqfwAoGHkUaZQof')` }}
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 border border-primary/25 rounded-full text-primary font-sans text-xs font-bold tracking-widest uppercase mb-6"
          >
            <Flame size={14} className="text-primary-gold animate-pulse" />
            Pure Vegetarian Indian Fine Dining
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif text-5xl md:text-7xl font-bold text-on-surface tracking-tight leading-none mb-4"
          >
            MR. KHAO KHILAO <br />
             <span className="text-primary-gold italic font-medium">By. Chef Piyush Gupta</span>
            
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-sans text-on-surface-variant max-w-2xl mx-auto italic text-base md:text-lg tracking-normal my-4 leading-relaxed"
          >
            Taste se shuruaat... <br />
            <span className="text-primary-gold italic font-medium">Brand tak ka safar.</span> <br />
            "Passion, Hardwork, Creativity - Yeh hai hamara Recipe!" Experience the exquisite tandoor expertise of Gondia's celebrated fine dining hearth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <button 
              onClick={() => setView('menu')}
              className="bg-primary-gold hover:bg-primary-gold/90 text-neutral-dark font-sans text-xs font-bold tracking-widest px-8 py-3.5 uppercase transition-all duration-300 active:scale-95 shadow-lg shadow-primary-gold/15 flex items-center gap-2"
            >
              Explore Digital Menu <ChevronRight size={16} />
            </button>
            <button 
              onClick={() => setView('booking')}
              className="border border-outline hover:border-primary text-on-surface font-sans text-xs font-bold tracking-widest px-8 py-3.5 uppercase transition-all duration-300 active:scale-95 hover:bg-surface-container-high/20"
            >
              Reserve Table
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-55 animate-bounce">
          <span className="text-[9px] font-sans tracking-widest uppercase text-on-surface-variant">Scroll down</span>
          <div className="w-5 h-8 border-2 border-primary rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-primary-gold rounded-full" />
          </div>
        </div>
      </section>

      {/* Today's Special Section */}
      <section className="py-20 bg-surface-container/60 dark:bg-neutral-dark/95 border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary-gold font-sans text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Chef's Masterpieces
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">
              Specials
            </h2>
            <div className="h-0.5 w-16 bg-primary-gold mx-auto mb-4" />
            <p className="text-sm font-sans text-on-surface-variant leading-relaxed">
              Discover our chef's handpicked vegetarian delights, crafted with absolute passion and the finest ingredients for an unforgettable sensory culinary journey.
            </p>
          </div>

          {/* Today's Special Slideshow Container */}
          <div 
            className="relative group/slider px-4"
            onMouseEnter={() => setIsSpecialsHovered(true)}
            onMouseLeave={() => setIsSpecialsHovered(false)}
          >
            {/* Left Button */}
            <button
              onClick={prevSpecial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-x-0 z-20 bg-[#131110]/95 hover:bg-primary-gold text-white hover:text-neutral-dark p-3 rounded-full border border-primary-gold/30 shadow-xl transition-all duration-300 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 focus:opacity-100"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Button */}
            <button
              onClick={nextSpecial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-0 z-20 bg-[#131110]/95 hover:bg-primary-gold text-white hover:text-neutral-dark p-3 rounded-full border border-primary-gold/30 shadow-xl transition-all duration-300 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 focus:opacity-100"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>

            {/* Viewport content */}
            <div className="overflow-hidden py-4">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{
                  gap: '24px',
                  transform: `translateX(calc(-${specialsIndex * (100 / visibleCards)}% - ${specialsIndex * (24 - 24 / visibleCards)}px))`
                }}
              >
                {specials.map((spec, idx) => {
                  const isActive = idx >= specialsIndex && idx < specialsIndex + visibleCards;
                  return (
                    <div 
                      key={spec.name}
                      onClick={() => setView('menu')}
                      className={`glass-effect rounded-lg overflow-hidden group hover:border-primary-gold/40 transition-all duration-500 cursor-pointer shrink-0 
                        w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]
                        ${isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.98] blur-[0.5px]'}`}
                    >
                      <div className="h-64 overflow-hidden relative">
                        <img 
                          alt={spec.name} 
                          src={spec.image} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute top-4 right-4 bg-neutral-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-primary-gold font-sans text-[10px] font-bold tracking-wider border border-primary/20">
                          SIGNATURE
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-lg font-bold tracking-wide text-primary-gold mb-2 group-hover:text-primary transition-colors duration-300">
                          {spec.name}
                        </h3>
                        <p className="text-sm font-sans text-on-surface-variant leading-relaxed min-h-[40px]">
                          {spec.tagline}
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-xs font-bold text-primary group-hover:gap-3 transition-all duration-300">
                          Order from Digital Menu <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dots navigation indicator */}
            <div className="flex justify-center gap-2.5 mt-8 border-b border-outline-variant/10 pb-6">
              {Array.from({ length: specials.length - visibleCards + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSpecialsIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === specialsIndex ? 'w-8 bg-primary-gold' : 'w-2 bg-outline-variant/30 hover:bg-outline-variant/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Brand Story Section with Chef Piyush Gupta */}
      <section className="py-20 md:py-28 bg-surface-container-low dark:bg-surface-container-lowest border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait Image (Col: 5) */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 border border-primary-gold/25 -z-10 translate-x-3 translate-y-3 rounded group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
            <div className="h-[450px] md:h-[550px] rounded overflow-hidden shadow-2xl relative">
              <img 
                alt="Chef Piyush Gupta" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnuv27k85NVga_n_lKlEB5r0GDCC1XiJjCn4vmbitraVgLuf51TJ15pLhbssb8zBEiardb1Mw81tJmAsLvzfLl7i3sRlbyJW-9eaSBuzWjvcgFHcRdaSQrMFOOuELiE8c-Z5toGfdCUNSNro9vdo5BCNDYCitFF7GAoKsUeENdKYqlC4YAGOU1zdoeR1rcwdzdwBkdJjI21U-_Cy6RDyaE4mUfcT6I31i9FuugdfLPVtY-4-94zUeWIxtPXdhxAxEefI8RoYjLehxj" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-gold text-neutral-dark rounded-full flex items-center justify-center font-bold">
                  2018
                </div>
                <div>
                  <h4 className="text-white font-serif font-bold text-sm leading-none mb-1">Established Brand</h4>
                  <p className="text-on-surface-variant text-xs">Over 8 Years of Pure Veg Craft</p>
                </div>
              </div>
            </div>
          </div>

          {/* Biography Context (Col: 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-8 bg-primary-gold" />
              <span className="text-primary-gold font-sans text-xs font-bold uppercase tracking-[0.25em]">
                Master Chef & Founder
              </span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-on-surface">
              Chef Piyush Gupta
              <span className="block text-primary-gold text-xl md:text-2xl mt-2 italic font-normal">
                The Visionary behind 'Mr. Khao Khilao'
              </span>
            </h2>

            <div className="text-sm font-sans text-on-surface-variant flex flex-col gap-4 leading-relaxed">
              <p>
                At just 22 years of age, Chef Piyush Gupta made a brave choice. He left behind a safe, high-paying corporate path to follow his true passion—cooking. His professional culinary journey began at the prestigious, ultra-luxury <span className="text-primary font-semibold">Oberoi Hotel, Agra</span>, where he polished his skills alongside the finest Indian and international masters.
              </p>
              <p>
                In 2018, he established <span className="text-primary font-semibold">"Mr. Khao Khilao"</span>. For Chef Piyush, gourmet food is not just a commercial career; it is an intimate medium to share love and absolute happiness. What started as an ambitious vision has grown from a popular YouTube channel into highly successful physical outlets, bringing tandoor-baked dreams and pure vegetarian mastery to diners.
              </p>
              <blockquote className="border-l-4 border-primary-gold pl-4 py-1 italic text-primary-gold text-base font-medium my-2">
                "His mission is simple: to share happiness through every beautiful plate he serves."
              </blockquote>
              <p className="text-xs text-on-surface-variant/75 italic">
                Behind every exquisite dish lies a sacrifice, a dream, and an artistic heart full of pure passion for hospitality. Support your local chef.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="glass-effect p-4 rounded flex items-center gap-3">
                <Award className="text-primary-gold flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-serif font-bold text-sm text-primary">Estd. 2018</h4>
                  <p className="text-xs text-on-surface-variant">Culinary Excellence Heritage</p>
                </div>
              </div>
              <div className="glass-effect p-4 rounded flex items-center gap-3">
                <Store className="text-primary-gold flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-serif font-bold text-sm text-primary">100+ Recipes</h4>
                  <p className="text-xs text-on-surface-variant">Standardized Gourmet Craft</p>
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </section>

      {/* Reviews Showcase Section */}
      <section className="py-20 bg-surface-container/60 dark:bg-neutral-dark/95 border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-primary-gold font-sans text-xs font-bold uppercase tracking-widest mb-2 block">
                Guest Journal
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-on-surface">
                What Our Guests Say
              </h2>
              <p className="text-sm font-sans text-on-surface-variant mt-2 max-w-xl">
                Real experiences from our food lovers. Join the conversation and share your pure-veg journey with us.
              </p>
            </div>
            <button 
              onClick={() => setView('reviews')}
              className="bg-primary-gold hover:bg-primary-gold/90 text-neutral-dark text-xs font-bold uppercase tracking-widest px-6 py-3 shrink-0 active:scale-95 transition-all shadow-md"
            >
              Give Your Review
            </button>
          </div>

          {/* Reviews Slideshow Container */}
          <div 
            className="relative group/slider px-4"
            onMouseEnter={() => setIsReviewsHovered(true)}
            onMouseLeave={() => setIsReviewsHovered(false)}
          >
            {/* Left Button */}
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-x-0 z-20 bg-[#131110]/95 hover:bg-primary-gold text-white hover:text-neutral-dark p-3 rounded-full border border-primary-gold/30 shadow-xl transition-all duration-300 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 focus:opacity-100"
              aria-label="Previous Review"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Button */}
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-0 z-20 bg-[#131110]/95 hover:bg-primary-gold text-white hover:text-neutral-dark p-3 rounded-full border border-primary-gold/30 shadow-xl transition-all duration-300 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 focus:opacity-100"
              aria-label="Next Review"
            >
              <ChevronRight size={20} />
            </button>

            {/* Viewport content */}
            <div className="overflow-hidden py-4">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{
                  gap: '24px',
                  transform: `translateX(calc(-${reviewsIndex * (100 / visibleCards)}% - ${reviewsIndex * (24 - 24 / visibleCards)}px))`
                }}
              >
                {reviews.map((rev, idx) => {
                  const isActive = idx >= reviewsIndex && idx < reviewsIndex + visibleCards;
                  return (
                    <div 
                      key={rev.id} 
                      className={`glass-effect p-6 rounded-lg relative flex flex-col justify-between hover:border-primary/20 transition-all duration-500 shrink-0 
                        w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]
                        ${isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.98] blur-[0.5px]'}`}
                    >
                      <div>
                        <div className="flex text-primary-gold gap-1 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              fill={i < rev.rating ? 'currentColor' : 'transparent'} 
                              className={i < rev.rating ? 'text-primary-gold' : 'text-outline-variant'}
                            />
                          ))}
                        </div>
                        <h4 className="font-serif font-bold text-sm text-primary mb-2 italic">
                          "{rev.title}"
                        </h4>
                        <p className="text-xs font-sans text-on-surface-variant/90 leading-relaxed mb-6 min-h-[60px]">
                          {rev.feedback}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/10 mt-auto">
                        <div className="w-9 h-9 bg-primary/20 text-primary-gold rounded-full flex items-center justify-center font-sans text-xs font-bold border border-primary/20 shrink-0">
                          {rev.initials}
                        </div>
                        <div>
                          <h5 className="font-sans text-xs font-semibold text-on-surface leading-none text-left">{rev.name}</h5>
                          <span className="text-[10px] font-sans text-on-surface-variant mt-1 block text-left">Reviewed: {rev.dishName}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dots navigation indicator */}
            <div className="flex justify-center gap-2.5 mt-8 border-b border-outline-variant/10 pb-6">
              {Array.from({ length: Math.max(1, reviews.length - visibleCards + 1) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setReviewsIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === reviewsIndex ? 'w-8 bg-primary-gold' : 'w-2 bg-outline-variant/30 hover:bg-outline-variant/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Franchises Showcase Section */}
      <section className="py-20 bg-surface-container-low dark:bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary-gold font-sans text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Expansion Plan
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">
              Our Franchises
            </h2>
            <div className="h-0.5 w-16 bg-primary-gold mx-auto mb-4" />
            <p className="text-sm font-sans text-on-surface-variant leading-relaxed">
              Bringing the pure vegetarian gourmet delight of Chef Piyush Gupta's kitchen to new locations. We are growing beautifully!
            </p>
          </div>

           {/* Franchises Slideshow Container */}
          <div 
            className="relative group/slider px-4"
            onMouseEnter={() => setIsFranchisesHovered(true)}
            onMouseLeave={() => setIsFranchisesHovered(false)}
          >
            {/* Left Button */}
            <button
              onClick={prevFranchise}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-x-0 z-20 bg-[#131110]/95 hover:bg-primary-gold text-white hover:text-neutral-dark p-3 rounded-full border border-primary-gold/30 shadow-xl transition-all duration-300 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 focus:opacity-100"
              aria-label="Previous Franchise"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Button */}
            <button
              onClick={nextFranchise}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-0 z-20 bg-[#131110]/95 hover:bg-primary-gold text-white hover:text-neutral-dark p-3 rounded-full border border-primary-gold/30 shadow-xl transition-all duration-300 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 focus:opacity-100"
              aria-label="Next Franchise"
            >
              <ChevronRight size={20} />
            </button>

            {/* Viewport content */}
            <div className="overflow-hidden py-4">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{
                  gap: '24px',
                  transform: `translateX(calc(-${franchisesIndex * (100 / visibleCards)}% - ${franchisesIndex * (24 - 24 / visibleCards)}px))`
                }}
              >
                {franchises.map((fran, idx) => {
                  const isActive = idx >= franchisesIndex && idx < franchisesIndex + visibleCards;
                  return (
                    <div 
                      key={fran.id} 
                      className={`glass-effect p-6 rounded-lg flex flex-col justify-between shadow-md shrink-0 transition-all duration-500
                        w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-h-[300px]
                        ${fran.isComingSoon 
                          ? 'border-dashed border-2 border-outline-variant/40 hover:border-primary-gold/40' 
                          : 'border-l-4 border-l-primary-gold'}
                        ${isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.98] blur-[0.5px]'}`}
                    >
                      {fran.isComingSoon ? (
                        <div className="flex flex-col items-center justify-center text-center h-full py-4">
                          <div className="w-12 h-12 bg-primary/10 text-primary-gold rounded-full flex items-center justify-center mb-4">
                            <Store size={22} />
                          </div>
                          <h4 className="font-serif text-lg font-bold text-primary mb-2">{fran.title}</h4>
                          <p className="text-xs text-on-surface-variant max-w-xs mb-6 leading-relaxed">
                            {fran.desc}
                          </p>
                          <button 
                            onClick={() => setView('franchise')}
                            className="bg-primary-gold hover:bg-primary-gold/90 text-neutral-dark text-xs font-bold uppercase tracking-widest px-6 py-2.5 active:scale-95 transition-all text-center mt-auto shadow"
                          >
                            Apply for Franchise
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="text-left">
                            <span className="text-primary text-[10px] font-sans font-bold tracking-widest block mb-2">{fran.city}</span>
                            <h4 className="font-serif text-lg font-bold text-on-surface mb-2">{fran.title}</h4>
                            <p className="text-xs text-on-surface-variant italic leading-relaxed">
                              {fran.desc}
                            </p>
                          </div>
                          <p className="text-xs text-primary-gold font-medium mt-6 text-left">{fran.loc}</p>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dots navigation indicator */}
            <div className="flex justify-center gap-2.5 mt-8 pb-4">
              {Array.from({ length: Math.max(1, franchises.length - visibleCards + 1) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setFranchisesIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === franchisesIndex ? 'w-8 bg-primary-gold' : 'w-2 bg-outline-variant/30 hover:bg-outline-variant/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
