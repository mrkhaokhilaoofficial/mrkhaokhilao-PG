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
  // ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dishName || !title || !feedback) return;

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
    const formData = new FormData();

    formData.append("name", name);
    formData.append("dishName", dishName);
    formData.append("rating", rating.toString());
    formData.append("title", title);
    formData.append("feedback", feedback);

    await fetch(
      "https://script.google.com/macros/s/AKfycbyTZMdWYaTuZLWiasjt3anIQmPeHDGnune72ydYOJR6HE0u5c7VmPsGQ5-2XOOMqqtA/exec",
      {
        method: "POST",
        mode: "no-cors",
        body: formData
      }
    );
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
            <div className="text-center">

  <h3 className="font-serif text-2xl font-bold text-on-surface mb-3">
    Loved Your Meal?
  </h3>

  <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
    Share your experience with Mr. Khao Khilao on Google Reviews.
    Your feedback helps us grow and helps other food lovers discover us.
  </p>

  {/* REVIEW FORM DISABLED TEMPORARILY
      WILL BE RE-ENABLED WHEN BACKEND IS IMPLEMENTED

  {isSubmitted ? (
    ...
  ) : (
    <form onSubmit={handleSubmit}>
      ...
    </form>
  )}

  */}

  <div className="flex justify-center mb-6">
    <img
      src="/images/google-review-qr.png"
      alt="Google Review QR"
      className="w-64 h-64 bg-white p-3 rounded-lg shadow-lg"
    />
  </div>

  <p className="text-xs uppercase tracking-widest text-primary-gold font-semibold mb-4">
    Scan To Leave A Google Review
  </p>

  <div className="flex items-center mb-4">
    <div className="flex-1 border-t border-outline-variant/20"></div>
    <span className="px-4 text-primary-gold font-bold">OR</span>
    <div className="flex-1 border-t border-outline-variant/20"></div>
  </div>

  <a
    href="PASTE_GOOGLE_REVIEW_LINK_HERE"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center w-full bg-primary-gold hover:bg-primary-gold/90 text-neutral-dark text-sm font-bold uppercase tracking-widest py-3 rounded transition-all duration-300"
  >
    Leave A Google Review
  </a>

</div>
            
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
