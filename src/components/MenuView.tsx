import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types';
import { INITIAL_MENU } from '../data/menu';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Flame, Star, Plus, Minus, Trash2, ShieldCheck, Ticket, X } from 'lucide-react';

interface MenuViewProps {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQty: (itemId: string, qty: number) => void;
  clearCart: () => void;
}

export default function MenuView({ cart, addToCart, removeFromCart, updateCartQty, clearCart }: MenuViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderName, setOrderName] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [tableNumber, setTableNumber] = useState('');

  const categories = [
    { label: 'All Dishes', value: 'all' },
    { label: 'BBQ Soya Chaap', value: 'bbq-soya-chaap' },
    { label: 'BYO Bag (Potli)', value: 'byo-bag' },
    { label: 'BBQ Paneer', value: 'bbq-paneer' },
    { label: 'Tandoori Rolls', value: 'tandoori-rolls' },
    { label: 'BBQ Momos', value: 'bbq-momos' },
    { label: 'combos & gravies', value: 'mkk-special-combos' }
  ];

  const filteredMenu = INITIAL_MENU.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartItemsCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartSubtotal = cart.reduce((acc, curr) => acc + (curr.menuItem.price * curr.quantity), 0);
  const packagingCharge = cartItemsCount * 10; // ₹10 per item
  const gstAmount = Math.round(cartSubtotal * 0.05); // 5% GST
  const grandTotal = cartSubtotal + packagingCharge + gstAmount;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderName || !orderPhone) return;
    setIsOrderPlaced(true);
  };

  const resetOrderProcess = () => {
    clearCart();
    setIsOrderPlaced(false);
    setIsCartOpen(false);
    setOrderName('');
    setOrderPhone('');
    setTableNumber('');
  };

  return (
    <div className="animate-fade-in text-on-surface py-20 px-4 md:px-12 max-w-7xl mx-auto">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-primary-gold font-sans text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
          Fresh, Healthy & Pure Veg
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-on-surface mb-3">
          Our Digital Menu
        </h1>
        <p className="text-sm font-sans text-on-surface-variant max-w-lg mx-auto">
          From smoky traditional tandoor specialties to rich buttery combinations. Select dishes to build your perfect offline dining experience.
        </p>
      </div>

      {/* Search & Action Panel */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between mb-8">
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`text-[10px] md:text-xs font-bold tracking-wider uppercase px-4 py-2 border transition-colors duration-300 ${
                activeCategory === cat.value
                  ? 'bg-primary-gold text-neutral-dark border-primary-gold'
                  : 'bg-surface-container-high/20 border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search our specialities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant/45 focus:border-primary-gold focus:outline-none rounded py-2 px-10 text-xs text-on-surface brightness-95"
          />
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/70" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary text-[10px] uppercase font-bold"
            >
              clear
            </button>
          )}
        </div>

      </div>

      {/* Grid Layout of Dishes */}
      {filteredMenu.length === 0 ? (
        <div className="text-center py-24 glass-effect rounded">
          <p className="text-sm text-on-surface-variant italic mb-4">No culinary creations match your query.</p>
          <button 
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            className="bg-primary-gold text-neutral-dark text-xs font-bold uppercase tracking-widest px-6 py-2"
          >
            Show All Dishes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMenu.map((item) => {
            const inCart = cart.find(c => c.menuItem.id === item.id);
            return (
              <motion.div
                key={item.id}
                layout
                className="glass-effect rounded-lg overflow-hidden flex flex-col justify-between group border border-outline-variant/10 hover:border-primary-gold/20 transition-all duration-300"
              >
                <div>
                  {/* Dish Cover Image */}
                  <div className="h-52 overflow-hidden relative">
                    <img 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      src={item.image}
                    />
                    
                    {/* Floating Indicators */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {item.isChefSpecial && (
                        <span className="bg-primary-gold text-neutral-dark font-sans text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-sm flex items-center gap-1 shadow">
                          <Star size={10} fill="currentColor" /> Chef Special
                        </span>
                      )}
                      {item.isSpicy && (
                        <span className="bg-spicy-red text-white font-sans text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-sm flex items-center gap-1 shadow">
                          <Flame size={10} /> Spicy
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 bg-neutral-dark/80 backdrop-blur-md p-1.5 rounded-full border border-primary/25">
                      <div className="pure-veg-indicator" title="100% Pure Veg Certificate">
                        <div className="pure-veg-dot"></div>
                      </div>
                    </div>
                  </div>

                  {/* Context block */}
                  <div className="p-5">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-serif font-bold text-base text-primary tracking-wide">
                        {item.name}
                      </h3>
                      <span className="text-sm font-bold text-primary-gold font-mono shrink-0">
                        ₹{item.price}
                      </span>
                    </div>
                    <p className="text-xs font-sans text-on-surface-variant leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Add to order trigger */}
                <div className="px-5 pb-5 pt-2 border-t border-outline-variant/10 flex items-center justify-between gap-3">
                  {inCart ? (
                    <div className="flex items-center justify-between w-full bg-surface-container-high/40 rounded p-1.5 border border-outline-variant/20">
                      <button 
                        onClick={() => updateCartQty(item.id, inCart.quantity - 1)}
                        className="w-7 h-7 bg-surface-container-highest rounded flex items-center justify-center text-primary hover:bg-primary-gold hover:text-neutral-dark transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-mono text-xs font-bold text-on-surface">{inCart.quantity}</span>
                      <button 
                        onClick={() => updateCartQty(item.id, inCart.quantity + 1)}
                        className="w-7 h-7 bg-surface-container-highest rounded flex items-center justify-center text-primary hover:bg-primary-gold hover:text-neutral-dark transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-surface-container-high/20 hover:bg-primary-gold hover:text-neutral-dark text-on-surface-variant font-sans text-[10px] font-bold uppercase tracking-widest py-2 px-4 transition-all duration-300 active:scale-95 border border-outline-variant/30 hover:border-primary-gold flex items-center justify-center gap-2"
                    >
                      Add to Order
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Sticky Cart Button (Bottom Right) */}
      <AnimatePresence>
        {cartItemsCount > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-primary-gold text-neutral-dark p-4 rounded-full flex items-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-spicy-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            </div>
            <div className="text-left font-sans text-xs">
              <p className="font-extrabold leading-none uppercase tracking-widest">Order Summary</p>
              <p className="text-[10px] font-bold font-mono text-neutral-dark/85 mt-1">₹{grandTotal} total</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Sidebar Modal / Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
            
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-neutral-dark text-on-surface border-l border-outline-variant/20 shadow-2xl flex flex-col justify-between">
              
              {/* Header */}
              <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="text-primary" size={20} />
                  <h3 className="font-serif text-lg font-bold text-primary">Your Order Cart</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full text-on-surface-variant hover:text-primary transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex-1 flex flex-col justify-between gap-6">
                
                {isOrderPlaced ? (
                  /* Success Feedback Block */
                  <div className="flex flex-col items-center justify-center text-center py-8">
                    <div className="w-16 h-16 bg-secondary-green/20 text-secondary-green border border-secondary-green/30 rounded-full flex items-center justify-center mb-6">
                      <ShieldCheck size={36} />
                    </div>
                    <span className="text-secondary-green font-sans text-xs font-bold uppercase tracking-wider mb-2">Order Confirmed</span>
                    <h4 className="font-serif text-2xl font-bold mb-4">Jai Shree Krishna! <br />Your order is cooking.</h4>
                    
                    <div className="bg-surface-container-low/40 p-5 rounded border border-outline-variant/20 text-xs text-on-surface-variant max-w-xs mt-3 flex flex-col gap-2 leading-relaxed">
                      <p>👤 <strong>Guest Name:</strong> {orderName}</p>
                      <p>📞 <strong>Phone:</strong> {orderPhone}</p>
                      {tableNumber && <p>🪑 <strong>Table assigned:</strong> {tableNumber}</p>}
                      <p>🔥 <strong>Status:</strong> Kitchen Preparing</p>
                      <p className="border-t border-outline-variant/10 pt-3 mt-1 font-mono text-primary">💰 Paid Total: ₹{grandTotal}</p>
                    </div>
                    
                    <button
                      onClick={resetOrderProcess}
                      className="mt-8 bg-primary-gold hover:bg-primary-gold/90 text-neutral-dark text-xs font-bold uppercase tracking-widest px-8 py-3 active:scale-95 transition-all text-center"
                    >
                      Confirm & Clear Cart
                    </button>
                  </div>
                ) : (
                  /* Cart Items List */
                  <div>
                    {cart.length === 0 ? (
                      <div className="text-center py-16">
                        <p className="text-xs text-on-surface-variant italic mb-4">Your order list is empty.</p>
                        <button 
                          onClick={() => setIsCartOpen(false)}
                          className="border border-outline px-4 py-2 text-xs font-bold uppercase tracking-widest hover:border-primary text-on-surface"
                        >
                          Select Dishes
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {cart.map((item) => (
                          <div 
                            key={item.menuItem.id}
                            className="flex items-center justify-between gap-4 py-3 border-b border-outline-variant/10"
                          >
                            <img 
                              alt={item.menuItem.name}
                              src={item.menuItem.image}
                              className="w-12 h-12 object-cover rounded shrink-0 border border-outline-variant/20"
                            />
                            
                            <div className="flex-1 text-left">
                              <h5 className="font-serif text-xs font-semibold text-primary">{item.menuItem.name}</h5>
                              <p className="text-[10px] font-mono text-on-surface-variant mt-1">₹{item.menuItem.price} each</p>
                            </div>

                            {/* Qty selectors */}
                            <div className="flex items-center gap-2 shrink-0">
                              <button 
                                onClick={() => updateCartQty(item.menuItem.id, item.quantity - 1)}
                                className="w-6 h-6 bg-surface-container-high rounded flex items-center justify-center text-primary-gold hover:bg-primary-gold hover:text-neutral-dark"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="font-mono text-xs text-center min-w-4">{item.quantity}</span>
                              <button 
                                onClick={() => updateCartQty(item.menuItem.id, item.quantity + 1)}
                                className="w-6 h-6 bg-surface-container-high rounded flex items-center justify-center text-primary-gold hover:bg-primary-gold hover:text-neutral-dark"
                              >
                                <Plus size={10} />
                              </button>
                              
                              <button 
                                onClick={() => removeFromCart(item.menuItem.id)}
                                className="p-1 text-on-surface-variant hover:text-spicy-red ml-1"
                                title="Remove item"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer Calculations & Form */}
              {cart.length > 0 && !isOrderPlaced && (
                <div className="p-6 border-t border-outline-variant/20 bg-surface-container-low/40">
                  <div className="flex flex-col gap-2 text-xs text-on-surface-variant mb-4 border-b border-outline-variant/10 pb-4">
                    <div className="flex justify-between">
                      <span>Items Subtotal:</span>
                      <span className="font-mono">₹{cartSubtotal}</span>
                    </div>
                    <div className="flex justify-between items-center" title="₹10 per item premium sealing">
                      <span>Airtight Packaging:</span>
                      <span className="font-mono">₹{packagingCharge}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Integrated GST (5%):</span>
                      <span className="font-mono">₹{gstAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-primary border-t border-dashed border-outline-variant/20 pt-2.5 mt-1">
                      <span>Grand Total:</span>
                      <span className="font-mono text-primary-gold">₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* Checkout inputs */}
                  <form onSubmit={handleCheckout} className="flex flex-col gap-3">
                    <h5 className="font-serif text-xs font-bold uppercase text-primary tracking-wider">Checkout & Table Sync</h5>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        required
                        value={orderName}
                        onChange={(e) => setOrderName(e.target.value)}
                        className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2 rounded text-on-surface"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        required
                        value={orderPhone}
                        onChange={(e) => setOrderPhone(e.target.value)}
                        className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2 rounded text-on-surface"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Table Number (Optional)"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2 rounded text-on-surface w-full"
                    />
                    
                    <button
                      type="submit"
                      className="w-full bg-primary-gold hover:bg-primary-gold/90 text-neutral-dark text-xs font-bold uppercase tracking-widest py-3 active:scale-95 transition-all text-center shadow-lg shadow-primary-gold/15 flex items-center justify-center gap-1.5 mt-2"
                    >
                      <Ticket size={14} /> Place Cook Order
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
