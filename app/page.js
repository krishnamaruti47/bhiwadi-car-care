'use client'
import { useState } from 'react';
import { 
  Wrench, 
  Snowflake, 
  Car, 
  Sparkles, 
  CircleDot, 
  ClipboardCheck,
  // Add these 4 new ones:
  BadgeCheck,
  Shield,
  CreditCard,
  Hammer
} from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About'; 
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import { SERVICES } from '../lib/constants';
// import { Wrench, Snowflake, Car, Sparkles, CircleDot, ClipboardCheck } from 'lucide-react';

// const IconMap = { Wrench, Snowflake, Car, Sparkles, CircleDot, ClipboardCheck };

const IconMap = {
  Wrench: Wrench,
  Snowflake: Snowflake,
  Car: Car,
  Sparkles: Sparkles,
  CircleDot: CircleDot,
  ClipboardCheck: ClipboardCheck,
  // Add the mapping for the new ones here:
  BadgeCheck: BadgeCheck,     // <--- For "Free & Paid Services"
  Shield: Shield,             // <--- For "Insurance"
  CreditCard: CreditCard,     // <--- For "Cashless"
  Hammer: Hammer              // <--- For "Bodyshop"
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('General Service');

  const handleOpenBooking = (serviceName = 'General Service') => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Header onBookNow={() => handleOpenBooking()} />
      
      <Hero onBookNow={() => handleOpenBooking()} />

      {/* --- SERVICES SECTION (Balanced Size) --- */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12"> 
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Expert Services</h2>
            <p className="text-slate-600 max-w-4xl mx-auto text-xl font-light leading-relaxed">
              Specialized care for your Maruti Suzuki. From <span className="font-medium text-blue-600">Swift</span> to <span className="font-medium text-blue-600">Grand Vitara</span>, we handle it all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {SERVICES.map((service) => {
              const Icon = IconMap[service.icon];
              return (
                <div key={service.id} className="bg-white rounded-[1.5rem] shadow-sm hover:shadow-xl transition duration-300 border border-slate-200 overflow-hidden group flex flex-col h-full">
                  
                  {/* Balanced Image Height (h-64) */}
                  <div className="h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10"></div>
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                    <div className="absolute bottom-6 left-6 z-20 text-white">
                      <div className="bg-blue-600 w-fit p-2.5 rounded-xl mb-3 shadow-lg">
                         <Icon size={24} />
                      </div>
                      {/* Balanced Title Size */}
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8 flex flex-col flex-grow">
                    {/* Standard Readable Font Size */}
                    <p className="text-slate-600 text-lg leading-relaxed mb-8 flex-grow font-normal">{service.desc}</p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                       <span className="text-2xl font-black text-slate-900 tracking-tight">{service.price}</span>
                       <button 
                          onClick={() => handleOpenBooking(service.title)}
                          className="bg-blue-50 text-blue-700 px-8 py-3 rounded-xl text-base font-bold hover:bg-blue-600 hover:text-white transition shadow-sm"
                       >
                         Book Now
                       </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <About />

      {/* --- FOOTER --- */}
      <Footer onBookNow={handleOpenBooking} />

      {/* --- MODAL --- */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceName={selectedService}
      />
    </main>
  );
}