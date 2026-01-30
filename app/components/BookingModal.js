'use client'
import { X, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function BookingModal({ isOpen, onClose, serviceName }) {
  const [formData, setFormData] = useState({ name: '', phone: '', carModel: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // --- SMART ROUTING LOGIC ---
  const getDepartmentNumber = (service) => {
    // Convert to lowercase to make matching easier
    const s = service ? service.toLowerCase() : "";

    // 1. INSURANCE DEPARTMENT (...7046)
    // Matches: "Maruti Insurance Renewal", "Cashless Insurance Facility"
    if (s.includes('insurance') || s.includes('cashless') || s.includes('claim') || s.includes('renew')) {
      return "919053777046";
    }

    // 2. BODY SHOP (...7041)
    // Matches: "Bodyshop", "Denting & Painting"
    if (s.includes('body') || s.includes('denting') || s.includes('paint') || s.includes('scratch') || s.includes('accidental')) {
      return "919053777041";
    }

    // 3. SPARE PARTS (...7045)
    // Matches if you add a "Spare Parts" service later
    if (s.includes('part') || s.includes('accessory') || s.includes('accessories')) {
      return "919053777045";
    }

    // 4. SERVICE DEPARTMENT (...7042)
    // Matches: "Free & Paid Services", "Periodic Service", "AC Service", "Cleaning & Spa", 
    // "Wheels & Tyres", "General Inspection"
    if (
      s.includes('service') || 
      s.includes('periodic') || 
      s.includes('paid') || 
      s.includes('ac') || 
      s.includes('cooling') || 
      s.includes('cleaning') || 
      s.includes('spa') || 
      s.includes('wheel') || 
      s.includes('tyre') || 
      s.includes('alignment') || 
      s.includes('inspection') ||
      s.includes('maintenance')
    ) {
      return "919053777042";
    }

    // 5. DEFAULT / CUSTOMER CARE (...7043)
    // Matches anything else or generic "Contact Us"
    return "919053777043";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Prepare Data (Handle empty fields safely)
    const finalName = formData.name.trim() || "Anonymous Guest";
    const finalPhone = formData.phone.trim() || "Not Provided";
    const finalCar = formData.carModel.trim() || "Unknown Car";

    // 2. Get the correct phone number
    const targetPhoneNumber = getDepartmentNumber(serviceName);

    try {
      // 3. SAVE TO SUPABASE (Record the click even if fields are empty)
      const { error } = await supabase
        .from('bookings')
        .insert([
          { 
            customer_name: finalName, 
            phone_number: finalPhone, 
            service_type: serviceName,
            car_model: finalCar, 
            status: 'Lead (WhatsApp Click)'
          }
        ]);

      if (error) console.error("Supabase error (non-blocking):", error);

      // 4. SEND EMAIL ALERT (Fire and forget)
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: finalName,
          phone: finalPhone,
          carModel: finalCar,
          service: serviceName
        })
      });

      // 5. GENERATE WHATSAPP MESSAGE
      let message = `Hello Krishna Maruti Zone, I am interested in *${serviceName}*.`;
      
      // Only add personal details to the message if the user typed them
      if (formData.name.trim()) message += ` My name is ${formData.name}.`;
      if (formData.carModel.trim()) message += ` I have a ${formData.carModel}.`;

      const whatsappUrl = `https://wa.me/${targetPhoneNumber}?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Reset and Close
      onClose();
      setFormData({ name: '', phone: '', carModel: '' });

    } catch (err) {
      console.error('Error:', err);
      // Fallback: Open WhatsApp with the correct number even if DB fails
      window.open(`https://wa.me/${targetPhoneNumber}?text=Hi, I am interested in ${serviceName}`, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-blue-600 p-6 flex justify-between items-start">
          <div>
            <h3 className="text-white text-xl font-bold">Quick Details</h3>
            <p className="text-blue-100 text-sm mt-1">Optional: Share details for faster service</p>
          </div>
          <button onClick={onClose} className="text-blue-100 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Your Name (Optional)</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none transition"
              placeholder="e.g. Rahul Kumar"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Car Model (Optional)</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none transition"
              placeholder="e.g. Swift Dzire"
              value={formData.carModel}
              onChange={(e) => setFormData({...formData, carModel: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number (Optional)</label>
            <input 
              type="tel" 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none transition"
              placeholder="e.g. 9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <>Redirecting... <Loader2 className="animate-spin" /></>
            ) : (
              'Continue to WhatsApp'
            )}
          </button>
          
          <p className="text-xs text-center text-slate-400 mt-2">
            Clicking continue will open WhatsApp to chat with our expert.
          </p>
        </form>
      </div>
    </div>
  );
}