import { Phone, MapPin, CheckCircle, MessageCircle, Mail } from 'lucide-react';

export default function Footer({ onBookNow }) {
  // This link tells Google Maps to search for your specific address
  const MAP_LINK = "https://share.google/ohN5KnD0y4Gc2jJw0";
  const EMAIL_ADDRESS = "'Service@krishnamaruti.co.in'"; 

  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white text-2xl font-black tracking-tight mb-6">KRISHNA<span className="text-blue-500">MARUTIZONE</span></h4>
            <p className="mb-6 max-w-sm text-slate-400">
              The most reliable car workshop in Rewari. We use advanced diagnostic tools and genuine spare parts to ensure your car runs like new.
            </p>
            <div className="flex items-center gap-4">
                {/* Phone Button */}
                <a href="tel:+919053777040" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition text-white" title="Call Us">
                    <Phone size={18} />
                </a>
                {/* WhatsApp Button */}
                <a href="https://wa.me/919053777040" target="_blank" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-green-600 transition text-white" title="Chat on WhatsApp">
                    <MessageCircle size={18} />
                </a>
                {/* Email Button */}
                <a href={`mailto:${EMAIL_ADDRESS}`} className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition text-white" title="Email Us">
                    <Mail size={18} />
                </a>
                {/* Map Button */}
                <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-500 transition text-white" title="View on Google Maps">
                    <MapPin size={18} />
                </a>
            </div>
          </div>
          
          {/* --- UPDATED SERVICES SECTION START --- */}
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-sm">
                <li><button onClick={() => onBookNow('Periodic Service')} className="hover:text-blue-400 transition text-left">Periodic Service</button></li>
                <li><button onClick={() => onBookNow('Accidental Repair (Bodyshop)')} className="hover:text-blue-400 transition text-left">Accidental Repair (Bodyshop)</button></li>
                <li><button onClick={() => onBookNow('Insurance Claims & Renewal')} className="hover:text-blue-400 transition text-left">Insurance Claims & Renewal</button></li>
                <li><button onClick={() => onBookNow('Denting & Painting')} className="hover:text-blue-400 transition text-left">Denting & Painting</button></li>
                <li><button onClick={() => onBookNow('AC Repair')} className="hover:text-blue-400 transition text-left">AC Service & Repair</button></li>
            </ul>
          </div>
          {/* --- UPDATED SERVICES SECTION END --- */}

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 group cursor-pointer">
                    <MapPin className="text-blue-500 shrink-0 mt-1 group-hover:text-white transition" size={18} />
                    <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition">
                        Opposite POLICE LINE, Rewari, Haryana 123401
                    </a>
                </li>
                <li className="flex items-center gap-3 group">
                    <Phone className="text-blue-500 shrink-0 group-hover:text-white transition" size={18} />
                    <span><a href="tel:+919053777040" className="group-hover:text-white transition">+91 9053777040</a></span>
                </li>
                <li className="flex items-center gap-3 group">
                    <Mail className="text-blue-500 shrink-0 group-hover:text-white transition" size={18} />
                    <span><a href={`mailto:${EMAIL_ADDRESS}`} className="group-hover:text-white transition">{EMAIL_ADDRESS}</a></span>
                </li>
                <li className="flex items-center gap-3">
                    <CheckCircle className="text-blue-500 shrink-0" size={18} />
                    <span>Mon - Sun: 09:00 AM - 08:00 PM</span>
                </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Krishna Maruti Car Zone. All rights reserved.
        </div>
    </footer>
  );
}