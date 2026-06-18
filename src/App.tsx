import { useState, useEffect } from 'react';
import { ViewType, CartItem, MenuItem, Review, Booking } from './types';
import { INITIAL_REVIEWS } from './data/menu';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import MenuView from './components/MenuView';
import BookingView from './components/BookingView';
import ReviewsView from './components/ReviewsView';
import FranchiseView from './components/FranchiseView';

const BG_IMAGES = [
  '/src/assets/images/fresh_veggies_1_1781813858718.jpg',
  '/src/assets/images/veg_tandoor_feast_1781812906145.jpg',
  '/src/assets/images/fresh_veggies_2_1781813876198.jpg',
  '/src/assets/images/classic_paneer_tikka_1781812841149.jpg',
  '/src/assets/images/veg_saoji_bag_1781813682604.jpg',
  '/src/assets/images/veg_achari_bag_1781813699434.jpg'
];

export default function App() {
  const [currentView, setView] = useState<ViewType>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bgIndex, setBgIndex] = useState(0);
  const [isThemeDark, setIsThemeDark] = useState(true);

  useEffect(() => {
    const rootElement = document.documentElement;
    if (isThemeDark) {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
  }, [isThemeDark]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BG_IMAGES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Cart operations
  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.menuItem.id === item.id);
      if (existing) {
        return prevCart.map((c) => 
          c.menuItem.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prevCart, { menuItem: item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((c) => c.menuItem.id !== itemId));
  };

  const updateCartQty = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((c) => (c.menuItem.id === itemId ? { ...c, quantity: qty } : c))
    );
  };

  const clearCart = () => setCart([]);

  // Mock Database persistence state insertions
  const addReview = (review: Review) => {
    setReviews((prev) => [review, ...prev]);
  };

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [booking, ...prev]);
  };

  // View renderer switch Router
  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView reviews={reviews} setView={setView} />;
      case 'menu':
        return (
          <MenuView
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateCartQty={updateCartQty}
            clearCart={clearCart}
          />
        );
      case 'booking':
        return <BookingView bookings={bookings} addBooking={addBooking} />;
      case 'reviews':
        return <ReviewsView reviews={reviews} addReview={addReview} />;
      case 'franchise':
        return <FranchiseView />;
      default:
        return <HomeView reviews={reviews} setView={setView} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-site font-sans text-on-surface flex flex-col justify-between selection:bg-primary-gold selection:text-neutral-dark overflow-x-hidden transition-colors duration-500">
      
      {/* Cinematic Dynamic Background Slideshow with fading fresh vegetables and vegetarian dishes */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-bg-site transition-colors duration-500">
        {BG_IMAGES.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 transition-all duration-[2500ms] ease-in-out ${
              idx === bgIndex
                ? isThemeDark ? 'opacity-[0.38] scale-103' : 'opacity-[0.26] scale-103'
                : 'opacity-0 scale-100'
            }`}
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
        {/* Dark/Cream Vignette Overlay - No backdrop blur to keep background images clearly visible and sharp */}
        <div className={`absolute inset-0 transition-colors duration-500 ${
          isThemeDark
            ? 'bg-gradient-to-b from-black/55 via-black/35 to-black/75'
            : 'bg-gradient-to-b from-white/60 via-stone-100/35 to-white/70'
        }`} />
      </div>

      {/* Dynamic Header */}
      <Header 
        currentView={currentView} 
        setView={setView} 
        isThemeDark={isThemeDark} 
        setIsThemeDark={setIsThemeDark} 
      />
      
      {/* Primary Page Canvas */}
      <main className="relative z-10 flex-grow pt-16">
        {renderActiveView()}
      </main>

      {/* Corporate bottom column */}
      <Footer />

    </div>
  );
}

