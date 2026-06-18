import React, { useState } from 'react';
import { FranchiseInquiry } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Store, TrendingUp, Handshake, CheckSquare, Sparkles, AlertCircle, FileText } from 'lucide-react';

export default function FranchiseView() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [investmentRange, setInvestmentRange] = useState('₹15 Lakhs - ₹25 Lakhs');
  const [experience, setExperience] = useState('No prior experience, but passionate');
  const [message, setMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState<FranchiseInquiry | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !city) return;

    const data: FranchiseInquiry = {
      fullName,
      email,
      phone,
      city,
      investmentRange,
      experience
    };

    setInquirySubmitted(data);

    // Reset Inputs
    setFullName('');
    setEmail('');
    setPhone('');
    setCity('');
    setMessage('');
  };

  const criteriaList = [
    {
      title: 'Optimal Space Focus',
      desc: 'Minimum carpet space footprint of 400 - 800 sq.ft at a high footfall high-street or commercial shopping hub center.',
      icon: <Store className="text-primary-gold" size={20} />
    },
    {
      title: 'Standard Investment',
      desc: 'Investment starts from ₹15 Lakhs to ₹25 Lakhs covering state-of-the-art tandoor equipment, layout decor, and core signages.',
      icon: <TrendingUp className="text-primary-gold" size={20} />
    },
    {
      title: 'Our Partnership',
      desc: '360° training support from Chef Piyush Gupta, ingredient supply lines channel, and integrated local digital marketing campaigns.',
      icon: <Handshake className="text-primary-gold" size={20} />
    }
  ];

  const stepsList = [
    { num: '01', title: 'Form Verification', desc: 'Our expansion desk reviews your city potential.' },
    { num: '02', title: 'Consultation Call', desc: 'Direct strategy debate with Chef Piyush Gupta.' },
    { num: '03', title: 'Site Inspection', desc: 'Verifications of space visibility & lease bounds.' },
    { num: '04', title: 'Setup & Agreement', desc: 'Equpping modern kitchen & staff onboarding.' }
  ];

  return (
    <div className="animate-fade-in text-on-surface py-20 px-4 md:px-12 max-w-7xl mx-auto">
      
      {/* Title block */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-primary-gold font-sans text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
          Be Your Own Boss & Build Your Legacy
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-on-surface mb-3">
          Franchise Opportunities
        </h1>
        <p className="text-sm font-sans text-on-surface-variant max-w-lg mx-auto">
          "Taste se shuruaat... Brand tak ka safar." Partner with Chef Piyush Gupta and leverage the massive appeal of pure vegetarian tandoor specialties.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
        
        {/* Info Blocks / Criteria List Checklist (Col: 7) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Main highlights */}
          <div className="glass-effect p-6 rounded-lg">
            <h3 className="font-serif font-bold text-xl text-primary mb-2">Why Mr. Khao Khilao?</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
              Unlike ordinary fast-food counters, Mr. Khao Khilao is a polished vegetarian brand engineered around proprietary cooking processes, standardizing critical ingredient recipes (no dependence on high-priced master chef turnover).
            </p>
            
            <div className="flex flex-col gap-5">
              {criteriaList.map((crit, index) => (
                <div key={index} className="flex gap-4 p-4 rounded bg-surface-container-high/20 border border-outline-variant/10">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    {crit.icon}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-primary mb-1">{crit.title}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{crit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Franchise Roadmap Process Steps pipeline */}
          <div className="glass-effect p-6 rounded-lg">
            <h3 className="font-serif font-bold text-lg text-primary-gold mb-6 border-b border-outline-variant/10 pb-2">Onboarding Roadmap</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {stepsList.map((step) => (
                <div key={step.num} className="flex flex-col text-left gap-2 relative">
                  <span className="font-sans text-xl font-black text-primary-gold opacity-40">{step.num}</span>
                  <h4 className="font-serif font-bold text-xs text-primary">{step.title}</h4>
                  <p className="text-[10px] text-on-surface-variant leading-normal">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Form panel Submission (Col: 5) */}
        <div className="lg:col-span-5">
          <div className="glass-effect p-6 rounded-lg sticky top-24">
            
            <div className="flex items-center gap-2.5 mb-6 border-b border-outline-variant/15 pb-4">
              <FileText className="text-primary-gold" size={18} />
              <h3 className="font-serif font-bold text-sm text-primary tracking-wide">
                Apply for Franchise
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Applicant Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Anand Jain"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2.5 rounded focus:border-primary-gold focus:outline-none"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Contact Email *</label>
                <input
                  type="email"
                  required
                  placeholder="E.g., anand@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2.5 rounded focus:border-primary-gold focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Contact Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="E.g., +91 90022 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2.5 rounded focus:border-primary-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* City focus */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Focus City *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Gondia / Nagpur"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2.5 rounded focus:border-primary-gold focus:outline-none"
                  />
                </div>

                {/* Investment bounds */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Investment Budget *</label>
                  <select
                    value={investmentRange}
                    onChange={(e) => setInvestmentRange(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2.5 rounded text-on-surface focus:border-primary-gold focus:outline-none"
                  >
                    <option value="₹15 Lakhs - ₹25 Lakhs">₹15L - ₹25 Lakhs</option>
                    <option value="₹25 Lakhs - ₹35 Lakhs">₹25L - ₹35 Lakhs</option>
                    <option value="₹35 Lakhs+">₹35 Lakhs +</option>
                  </select>
                </div>
              </div>

              {/* Experience bounds */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Prior Restaurant Experience *</label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2.5 rounded text-on-surface focus:border-primary-gold focus:outline-none"
                >
                  <option value="No prior experience, but passionate">No prior experience, but passionate</option>
                  <option value="Have operated local fast food stall">Have operated local food outlet</option>
                  <option value="Run multiple food joints currently">Run multiple food joints currently</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-sans font-bold text-on-surface-variant uppercase tracking-wider">Message layout details (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Share details on proposed carpet space, locations details..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-surface-container-lowest border border-outline-variant/30 text-xs p-2 rounded focus:border-primary-gold focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-primary-gold hover:bg-primary-gold/90 text-neutral-dark text-xs font-bold uppercase tracking-widest py-3 mt-1 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <Sparkles size={14} /> Submit Franchise Request
              </button>

            </form>
          </div>
        </div>

      </div>

      {/* Franchise Success Confirmation Overlay modal */}
      <AnimatePresence>
        {inquirySubmitted && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#131313] border border-outline-variant/30 rounded-lg max-w-md w-full overflow-hidden shadow-2xl relative"
            >
              <div className="h-2 bg-gradient-to-r from-primary-gold via-primary to-primary-gold" />
              
              <div className="p-8 flex flex-col items-center text-center">
                
                <div className="w-12 h-12 bg-secondary-green/20 text-secondary-green rounded-full flex items-center justify-center mb-4">
                  <CheckSquare size={24} />
                </div>

                <span className="text-secondary-green font-sans text-[10px] font-bold tracking-widest uppercase mb-1">
                  Inquiry Accepted Successfully
                </span>

                <h3 className="font-serif text-2xl font-bold tracking-tight mb-4">
                  Application Under Desk Review
                </h3>
                
                <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                  Thank you <strong>{inquirySubmitted.fullName}</strong>. Your franchise alignment inquiry for <strong>{inquirySubmitted.city}</strong> has been assigned application ID <strong>MKK-FR-{Math.floor(1000 + Math.random() * 9000)}</strong>.
                </p>

                {/* Simulated sequence Checklist map */}
                <div className="w-full bg-[#181817] p-5 rounded border border-outline-variant/15 flex flex-col gap-3 font-sans text-left text-xs text-on-surface-variant leading-relaxed">
                  <h4 className="text-primary-gold font-serif font-extrabold text-[10px] uppercase tracking-wider mb-1">Simulated Approval Sequence:</h4>
                  <p className="flex items-center gap-2 text-secondary-green font-medium">
                    <span>✅</span> <span>1. Receipt of Franchise application</span>
                  </p>
                  <p className="flex items-center gap-2 opacity-65">
                    <span>⏳</span> <span>2. Territory zoning compliance audit (Pending)</span>
                  </p>
                  <p className="flex items-center gap-2 opacity-65">
                    <span>⏳</span> <span>3. Financial backing check clearance (Pending)</span>
                  </p>
                  <p className="flex items-center gap-2 opacity-50">
                    <span>🚫</span> <span>4. Brand agreement signing & Layout handover</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-on-surface-variant italic mt-5 leading-normal bg-outline-variant/5 p-2 rounded border border-outline-variant/10 text-left">
                  <AlertCircle size={14} className="text-primary-gold shrink-0" />
                  <span>A brand partner representative will call or mail on {inquirySubmitted.email} within 48 business hours.</span>
                </div>

                <button
                  type="button"
                  onClick={() => setInquirySubmitted(null)}
                  className="mt-8 bg-primary-gold hover:bg-primary-gold/90 text-neutral-dark text-xs font-bold uppercase tracking-widest py-3 px-12 transition-all duration-300 w-full"
                >
                  Close Pipeline Setup
                </button>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
