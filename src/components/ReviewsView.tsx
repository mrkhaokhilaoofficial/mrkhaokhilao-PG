import React, { useState } from 'react';
import { Review } from '../types';
import { Star, MessageSquareCode, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ReviewsViewProps {
  reviews: Review[];
  addReview: (review: Review) => void;
}

export default function ReviewsView({ reviews, addReview }: ReviewsViewProps) {
  const [name, setName] = useState('');
  // const [dishName, setDishName] = useState('Afghani Chaap');
  const [dishName, setDishName] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const dishesOptions = [
  //   'Afghani Chaap',
  //   'Cheese Chilly Bag',
  //   'Malai Paneer Tikka',
  //   'Saoji Chaap Roll',
  //   'Paneer Saoji Masala Combo',
  //   'Makhani Momos'
  
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !title || !feedback) return;

    // Get initials
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'G';

    const newReview: Review = {
      id: 'REV-' + Date.now(),
      name,
      dishName,
      rating,
      title,
      feedback,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      initials
    };

    addReview(newReview);
    setIsSubmitted(true);

    // Reset Form
    setName('');
    setDishName('');
    setTitle('');
    setFeedback('');
    setRating(5);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3500);
  };

  return (
    <div className="animate-fade-in text-on-surface py-20 px-4 md:px-12 max-w-7xl mx-auto">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-primary-gold font-sans text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
          Guest Testimonials & Feedback
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-on-surface mb-3">
          Guest Journal
        </h1>
        <p className="text-sm font-sans text-on-surface-variant max-w-lg mx-auto">
          We treat guest sentiments as our sacred standard. Share your culinary experiences and tandoor critique with Chef Piyush.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Guest Journal Submit Form (Col: 5) */}
        <div className="lg:col-span-5">
          <div className="glass-effect p-6 rounded-lg sticky top-24">
            
            <div className="flex items-center gap-2.5 mb-6 border-b border-outline-variant/15 pb-4">
              <MessageSquareCode className="text-primary-gold" size={18} />
              <h3 className="font-serif font-bold text-sm text-primary tracking-wide">Write Your Review</h3>
            </div>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <div className="w-12 h-12 bg-secondary-green/20 text-secondary-green rounded-full flex items-center justify-center mb-4 border border-secondary-green/25 animate-pulse">
                  <CheckCircle size={22} />
                </div>
                <h4 className="font-serif text-lg font-bold text-on-surface mb-1">Sent with Happiness!</h4>
                <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed">
                  Chef Piyush Gupta and the Mr. Khao Khilao team value your honest feedback which makes us better everyday.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    required
                    maxLength={35}
                    placeholder="E.g., Aarav Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2.5 rounded focus:border-primary-gold focus:outline-none glow-gold text-on-surface"
                  />
                </div>

                {/* Dish Experienced */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">
                  Dish Experienced *
                  </label>
                  <input
                  type="text"
                  required
                  maxLength={100}
                  placeholder="E.g., Afghani Chaap, Paneer Tikka, Makhani Momos"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2.5 rounded focus:border-primary-gold focus:outline-none"
                  />
                </div>
                {/* Rating selection stars */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Your Rating *</label>
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const value = i + 1;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setRating(value)}
                          className="p-1 hover:scale-110 active:scale-95 transition-transform"
                        >
                          <Star
                            size={20}
                            fill={value <= rating ? '#ffb800' : 'transparent'}
                            className={value <= rating ? 'text-[#ffb800]' : 'text-outline-variant/60'}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Title headline */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Review Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Phenomenal Taste! / Crispy & Savory"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2.5 rounded focus:border-primary-gold focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Describe your Experience *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us everything about the flavors, tandoor smoke, texture, etc..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2.5 rounded focus:border-primary-gold focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary-gold hover:bg-primary-gold/90 text-neutral-dark text-xs font-bold uppercase tracking-widest py-3 mt-2 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Sparkles size={14} /> Submit Guest Sentiment
                </button>

              </form>
            )}

          </div>
        </div>

        {/* Existing Reviews List (Col: 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h3 className="font-serif font-bold text-xl text-primary-gold border-b border-outline-variant/10 pb-2">
            Recent Feedback ({reviews.length})
          </h3>

          <div className="grid grid-cols-1 gap-6">
            {reviews.map((rev) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-effect p-6 rounded-lg relative hover:border-outline transition-all duration-300"
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div>
                    <h5 className="font-serif font-bold text-base text-primary">{rev.title}</h5>
                    <div className="flex text-primary-gold gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          fill={i < rev.rating ? 'currentColor' : 'transparent'}
                          className={i < rev.rating ? 'text-primary-gold' : 'text-outline-variant'}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] font-sans text-on-surface-variant bg-[#1a1a19] px-2 py-1 rounded border border-outline-variant/10">
                    {rev.date}
                  </span>
                </div>

                <p className="text-xs font-sans text-on-surface-variant/90 leading-relaxed mb-6">
                  {rev.feedback}
                </p>

                <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 text-primary-gold rounded-full flex items-center justify-center font-sans text-xs font-bold shrink-0 border border-primary/20">
                      {rev.initials}
                    </div>
                    <div>
                      <h4 className="font-sans text-xs font-semibold text-on-surface leading-none">{rev.name}</h4>
                      <span className="text-[10px] font-sans text-primary mt-1.5 block">Dishes: {rev.dishName}</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
