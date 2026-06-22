import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Phone, 
  Mail, 
  MapPin, 
  Heart
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#131110] text-[#fdfbf7] border-t border-[#c28d00]/25 py-12 md:py-16 relative z-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10 text-left">
        
        {/* Column 1: Brand & Description */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                alt="Mr. Khao Khilao Logo" 
                className="h-12 w-12 object-cover rounded-full border-2 border-[#e23e1d]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxODjpcYCxWNh61u0J9w8ocOXpWCQwlapSEaBRt9LrG6ODnFb1D-ho9Vt5P3dbJKowAMSar-r8y0dq3v_IEZIjuWziPfjMQQ79Y8NdRf7Y78szZExJlBLS4MDu25xyIRG0TtYwYRHHS7waHwxCZ-j5MKqc9RBEwlHcAtfLNFx3Nmu-HmYEBh8Eaha0TrhGqI_TjbGijEGLwtEFcFrDYdyix06RCxwLAo8GklbQRVBu8JhkNGiWEurXEPIIFVgrMgsl2irh89aY9S_H"
              />
              <span className="absolute -bottom-1 -right-1 bg-green-600 w-3.5 h-3.5 rounded-full border-2 border-[#131110] flex items-center justify-center" title="100% Pure Veg">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-[#e23e1d] leading-none tracking-wide">Mr. Khao</span>
              <span className="font-serif text-xl font-bold text-[#e23e1d] mt-1 leading-none tracking-wide">Khilao</span>
            </div>
          </div>
          <p className="text-sm font-sans text-[#aeaeae] leading-relaxed max-w-xs">
            A pure vegetarian destination where taste meets passion. Founded by Chef Piyush Gupta, we bring you gourmet flavors with local heart.
          </p>
          
          {/* Social links */}
          <div className="flex gap-3 mt-1">
            <a 
              href="https://instagram.com/mrkhaokhilao" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 rounded bg-white/5 border border-white/10 text-[#aeaeae] hover:text-[#ffb800] hover:border-[#ffb800]/30 transition-all"
              title="Instagram"
            >
              <Instagram size={15} />
            </a>
            <a 
              href="https://youtube.com/@mrkhaokhilao" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 rounded bg-white/5 border border-white/10 text-[#aeaeae] hover:text-[#e23e1d] hover:border-[#e23e1d]/30 transition-all"
              title="YouTube"
            >
              <Youtube size={15} />
            </a>
            <a 
              href="https://facebook.com/mrkhaokhilao" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 rounded bg-white/5 border border-white/10 text-[#aeaeae] hover:text-blue-400 hover:border-blue-400/30 transition-all"
              title="Facebook"
            >
              <Facebook size={15} />
            </a>
          </div>
        </div>

        

        {/* Column 3: Contact Us */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-lg font-bold text-[#e23e1d] tracking-wide border-b border-white/5 pb-2">Contact Us</h4>
          <div className="text-sm text-[#e5e5e5] flex flex-col gap-4">
            <div className="flex items-start gap-2.5">
              <MapPin size={17} className="text-[#e23e1d] shrink-0 mt-0.5" />
              <span className="leading-relaxed">Main Road, Gondia,<br />Maharashtra, India</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-[#e23e1d] shrink-0" />
              <span>
                <a href="tel:+918000589080" className="hover:text-[#ffb800] hover:underline transition-colors">
                  +91 80005 89080
                </a>
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={15} className="text-[#e23e1d] shrink-0" />
              <a href="mailto:support@mrkhaokhilao.com" className="hover:text-[#ffb800] text-xs hover:underline text-[#aeaeae] transition-colors">
                support@mrkhaokhilao.com
              </a>
            </div>
          </div>
        </div>

        {/* Column 4: Opening Hours */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-lg font-bold text-[#e23e1d] tracking-wide border-b border-white/5 pb-2">Opening Hours</h4>
          <div className="text-sm text-[#e5e5e5] flex flex-col gap-3 font-sans">
            <div>
              <p className="font-semibold text-white">Monday - Thursday</p>
              <p className="text-[#aeaeae] mt-0.5">11:00 AM - 9:30 PM</p>
            </div>
            <div>
              <p className="font-semibold text-white">Friday - Saturday</p>
              <p className="text-[#aeaeae] mt-0.5">11:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>

      </div>

      {/* Corporate subfooter */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-center gap-4 text-xs text-[#aeaeae]">
        <p className="flex items-center gap-1">
          © {new Date().getFullYear()} Mr. Khao Khilao | Pure Vegetarian Excellence in Gondia with <Heart size={10} className="inline text-[#e23e1d] fill-current" />
        </p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#ffb800] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#ffb800] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#ffb800] transition-colors">Franchise Inquiry</a>
        </div>
      </div>
    </footer>
  );
}
