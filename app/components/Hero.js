import { Phone, CalendarCheck } from 'lucide-react';

export default function Hero({ onBookNow }) {
  return (
    <div className="relative bg-slate-900 text-white py-20 lg:py-32 px-4 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
         <img 
            src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30" 
            alt="Car Mechanic Workshop" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Serving Rewari and Nearby Areas
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
          Professional Car Care <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Without the Hassle</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Genuine parts, transparent pricing, and free pickup & drop. 
          We are Bhiwadi's most trusted multi-brand car workshop.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={onBookNow} 
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-600/30 hover:scale-105 transform duration-200"
          >
            <CalendarCheck size={20} />
            Book Service
          </button>
          <a 
            href="tel:+919053777040" 
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition"
          >
            <Phone size={20} /> 
            Call Expert
          </a>
        </div>
      </div>
    </div>
  );
}