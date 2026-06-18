import React, { useState } from 'react';
import { Booking } from '../types';
import { INITIAL_TABLES, RestaurantTable } from '../data/menu';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, Gift, CheckSquare, Sparkles, AlertCircle, MapPin } from 'lucide-react';

interface BookingViewProps {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
}

export default function BookingView({ bookings, addBooking }: BookingViewProps) {
  const [tables, setTables] = useState<RestaurantTable[]>(INITIAL_TABLES);
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(
    INITIAL_TABLES.find((t) => t.status === 'selected') || null
  );

  const [date, setDate] = useState('2026-06-25');
  const [time, setTime] = useState('08:00 PM');
  const [guestsCount, setGuestsCount] = useState(2);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialOccasion, setSpecialOccasion] = useState('');
  const [cuisineInterests, setCuisineInterests] = useState<string[]>([]);
  const [lastConfirmedBooking, setLastConfirmedBooking] = useState<Booking | null>(null);

  const timeSlots = [
    '12:30 PM', '01:30 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM'
  ];

  const handleTableClick = (table: RestaurantTable) => {
    if (table.status === 'occupied') return;
    
    // Deselect old selected, select new one
    const updated = tables.map((t) => {
      if (t.id === table.id) {
        return { ...t, status: 'selected' as const };
      }
      if (t.id === selectedTable?.id) {
        return { ...t, status: 'available' as const };
      }
      return t;
    });

    setTables(updated);
    setSelectedTable(table);
    // Auto-adjust guest count to fit table cap if needed
    if (guestsCount > table.capacity) {
      setGuestsCount(table.capacity);
    }
  };

  const handleCuisineToggle = (cuisine: string) => {
    if (cuisineInterests.includes(cuisine)) {
      setCuisineInterests(cuisineInterests.filter((c) => c !== cuisine));
    } else {
      setCuisineInterests([...cuisineInterests, cuisine]);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable || !fullName || !phone) return;

    const newBooking: Booking = {
      id: 'BKR-' + Math.floor(100000 + Math.random() * 900000),
      tableId: selectedTable.id,
      tableName: selectedTable.name,
      tableSeats: selectedTable.capacity,
      date,
      time,
      guestsCount,
      cuisineInterests,
      specialOccasion,
      isConfirmed: true
    };

    // Store in global parent state
    addBooking(newBooking);

    // Turn selected table to occupied
    setTables(tables.map((t) => t.id === selectedTable.id ? { ...t, status: 'occupied' as const } : t));
    setSelectedTable(null);

    // Show ticket receipt
    setLastConfirmedBooking(newBooking);
  };

  const cuisinesList = [
    'BBQ Soya Chaap Chunks',
    'Special Soya Potlies',
    'Rich Paneer Skewers',
    'Combos & Laccha Parathas'
  ];

  return (
    <div className="animate-fade-in text-on-surface py-20 px-4 md:px-12 max-w-7xl mx-auto">
      
      {/* Introduction Banner header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-primary-gold font-sans text-xs font-bold uppercase tracking-[0.25em] mb-2.5 block">
          Elegant Table Reservation
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-on-surface mb-3">
          Interactive Table Allocation
        </h1>
        <p className="text-sm font-sans text-on-surface-variant max-w-lg mx-auto">
          Explore the visual layout of our Gondia Main Road flagship restaurant below, click an available table, and book your secure vegetarian seating.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
        
        {/* Interactive Floor Plan Map (Col: 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="glass-effect p-6 rounded-lg">
            
            <div className="flex items-center justify-between mb-4 border-b border-outline-variant/10 pb-4">
              <div className="flex items-center gap-2">
                <MapPin className="text-primary-gold" size={18} />
                <h3 className="font-serif font-bold text-sm text-primary tracking-wide">Restaurant Interactive Seating Plan</h3>
              </div>
              <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span className="w-3.5 h-3.5 bg-neutral-dark border border-outline-variant/30 block rounded-sm" /> Available
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span className="w-3.5 h-3.5 bg-[#353535] opacity-45 block rounded-sm" /> Occupied
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <span className="w-3.5 h-3.5 bg-primary-gold block rounded-sm shadow-md shadow-primary-gold/30" /> Selected
                </div>
              </div>
            </div>

            {/* Simulated stage/screen representing tandoor pit hearth or entrance */}
            <div className="w-full bg-surface-container-high/40 border border-outline-variant/10 rounded py-2.5 text-center mb-8 text-[10px] font-sans font-bold uppercase tracking-widest text-primary-gold flex items-center justify-center gap-2">
              <Sparkles size={11} className="text-primary-gold" /> Traditional Charcoal Tandoor Pit Hearth Stage <Sparkles size={11} className="text-primary-gold" />
            </div>

            {/* Grid Map layout representing exact locations */}
            <div className="grid grid-cols-6 grid-rows-4 gap-4 aspect-[4/3] bg-neutral-dark/40 border border-outline-variant/10 p-6 rounded relative">
              {tables.map((tbl) => {
                const isAvail = tbl.status === 'available';
                const isSel = tbl.status === 'selected';
                const isOcc = tbl.status === 'occupied';

                let bgClass = 'bg-surface-container-high border border-outline-variant/20 cursor-pointer hover:border-primary-gold/40 text-on-surface hover:scale-102';
                if (isSel) bgClass = 'table-selected font-bold scale-102';
                if (isOcc) bgClass = 'table-occupied';

                return (
                  <button
                    key={tbl.id}
                    onClick={() => handleTableClick(tbl)}
                    disabled={isOcc}
                    className={`${tbl.positionClass} ${bgClass} rounded flex flex-col justify-center items-center gap-1 p-2 transition-all duration-300 relative group`}
                    title={`${tbl.name} (${tbl.capacity} Seats)`}
                  >
                    <span className="font-serif text-sm font-semibold tracking-tight">{tbl.name}</span>
                    <span className="text-[9px] font-sans opacity-75">{tbl.capacity} Seats</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-xs text-on-surface-variant italic mt-5 leading-normal bg-outline-variant/5 p-3 rounded border border-outline-variant/10">
              <AlertCircle size={14} className="text-primary-gold shrink-0" />
              <span>Table booking allocations are frozen 15 minutes before show time. Maximum fine dining stay duration of 2.5 hours.</span>
            </div>

          </div>
        </div>

        {/* Dynamic Reservation Form (Col: 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-effect p-6 rounded-lg sticky top-24">
            
            <div className="flex items-center gap-2 mb-6 border-b border-outline-variant/15 pb-4">
              <Calendar className="text-primary-gold" size={18} />
              <h3 className="font-serif font-bold text-sm text-primary tracking-wide">
                Seating Details
              </h3>
            </div>

            {selectedTable ? (
              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                <div className="bg-primary/5 border border-primary/25 rounded p-3 text-xs leading-normal text-on-surface flex items-center justify-between">
                  <p>📍 <strong>Assigned Seating:</strong> {selectedTable.name}</p>
                  <p>👥 Max {selectedTable.capacity} Seats</p>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Aarav Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2.5 rounded focus:border-primary-gold focus:outline-none glow-gold"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Phone / SMS For Confirmation *</label>
                  <input
                    type="tel"
                    required
                    placeholder="E.g., +91 80005 89080"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2.5 rounded focus:border-primary-gold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Choose Date *</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2 rounded text-on-surface"
                    />
                  </div>

                  {/* Guests count */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Guests Count *</label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2 rounded text-on-surface"
                    >
                      {Array.from({ length: selectedTable.capacity }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i + 1 === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Slots selectors */}
                <div className="flex flex-col gap-2 mt-1">
                  <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Available Timing Slots *</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`text-[10px] font-bold py-1.5 border rounded transition-all duration-200 ${
                          time === slot
                            ? 'bg-primary-gold text-neutral-dark border-primary-gold'
                            : 'bg-surface-container-high/20 border-outline-variant/20 hover:border-primary text-on-surface-variant'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cuisines interest checkboxes */}
                <div className="flex flex-col gap-2 mt-1">
                  <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Pre-Order Interest (Optional)</label>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-on-surface-variant">
                    {cuisinesList.map((cuisine) => (
                      <label key={cuisine} className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={cuisineInterests.includes(cuisine)}
                          onChange={() => handleCuisineToggle(cuisine)}
                          className="accent-primary-gold rounded text-neutral-dark"
                        />
                        {cuisine}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Occasion */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Celebration notes (Optional)</label>
                  <input
                    type="text"
                    placeholder="E.g., Birthday, Anniversary, Business Meet"
                    value={specialOccasion}
                    onChange={(e) => setSpecialOccasion(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2 rounded focus:border-primary-gold focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary-gold hover:bg-primary-gold/90 text-neutral-dark text-xs font-bold uppercase tracking-widest py-3.5 mt-2 transition-all duration-300 active:scale-95 text-center flex items-center justify-center gap-2"
                >
                  Confirm Table Booking Booking
                </button>
              </form>
            ) : (
              <div className="text-center py-10 flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-outline-variant/20 flex items-center justify-center text-primary-gold">
                  <Users size={20} />
                </div>
                <p className="text-xs text-on-surface-variant italic max-w-xs leading-relaxed">
                  Please click and select any available table on the interactive seating plan layout to begin details allocation.
                </p>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Ticket Overlay Receipt Confirmation */}
      <AnimatePresence>
        {lastConfirmedBooking && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#131313] text-on-surface border border-outline-variant/30 rounded-lg max-w-md w-full overflow-hidden shadow-2xl relative"
            >
              
              {/* Gold Top Banner decor */}
              <div className="h-2 bg-gradient-to-r from-primary-gold via-primary to-primary-gold" />

              <div className="p-8 flex flex-col items-center">
                
                <div className="w-12 h-12 bg-secondary-green/20 text-secondary-green rounded-full flex items-center justify-center mb-4">
                  <CheckSquare size={24} />
                </div>
                
                <span className="text-secondary-green font-sans text-[10px] font-bold tracking-widest uppercase mb-1">
                  Reserved, confirmation SMS sent!
                </span>
                
                <h3 className="font-serif text-2xl font-bold tracking-tight text-center mb-6">
                  Fine Dining Seating Ticket
                </h3>

                {/* Simulated perforated ticket dividers */}
                <div className="w-full flex items-center gap-2 my-2 opacity-50">
                  <div className="h-px bg-outline-variant/30 flex-1" />
                  <div className="w-2.5 h-2.5 bg-neutral-dark border border-outline-variant/30 rounded-full shrink-0" />
                  <div className="h-px bg-outline-variant/30 flex-1" />
                </div>

                <div className="w-full bg-[#181817] p-5 rounded border border-outline-variant/15 flex flex-col gap-3 font-sans text-xs text-on-surface-variant leading-normal">
                  <p className="flex justify-between">
                    <span>Ticket Reference:</span>
                    <strong className="text-primary-gold font-mono">{lastConfirmedBooking.id}</strong>
                  </p>
                  <p className="flex justify-between">
                    <span>Table Assigned:</span>
                    <strong>{lastConfirmedBooking.tableName}</strong>
                  </p>
                  <p className="flex justify-between">
                    <span>Date & Time:</span>
                    <strong>{lastConfirmedBooking.date} at {lastConfirmedBooking.time}</strong>
                  </p>
                  <p className="flex justify-between">
                    <span>Guests Allotment:</span>
                    <strong>{lastConfirmedBooking.guestsCount} Seats</strong>
                  </p>
                  {lastConfirmedBooking.specialOccasion && (
                    <p className="flex justify-between">
                      <span>Celebrations:</span>
                      <strong className="italic text-primary">{lastConfirmedBooking.specialOccasion}</strong>
                    </p>
                  )}
                  {lastConfirmedBooking.cuisineInterests.length > 0 && (
                    <div className="border-t border-outline-variant/10 pt-3 mt-1 text-center">
                      <span className="opacity-75 block text-[10px] uppercase font-bold tracking-widest mb-1.5">Pre-Order Interest:</span>
                      <p className="text-primary text-[10px] font-bold">{lastConfirmedBooking.cuisineInterests.join(', ')}</p>
                    </div>
                  )}
                </div>

                {/* Ticket bottom perforated divider */}
                <div className="w-full flex items-center gap-2 my-5 opacity-50">
                  <div className="h-px bg-outline-variant/30 flex-1" />
                  <div className="w-2.5 h-2.5 bg-neutral-dark border border-outline-variant/30 rounded-full shrink-0" />
                  <div className="h-px bg-outline-variant/30 flex-1" />
                </div>

                <div className="text-center font-sans">
                  <h4 className="font-serif font-bold text-sm text-primary leading-tight">Chef Piyush Gupta</h4>
                  <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest mt-1">Mr. Khao Khilao Flagship, Gondia</p>
                </div>

                <button
                  type="button"
                  onClick={() => setLastConfirmedBooking(null)}
                  className="mt-8 bg-primary-gold hover:bg-primary-gold/90 text-neutral-dark text-xs font-bold uppercase tracking-widest py-3 px-12 transition-all duration-300"
                >
                  Done
                </button>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
