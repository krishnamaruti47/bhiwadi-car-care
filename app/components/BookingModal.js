'use client'
import { X, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function BookingModal({ isOpen, onClose, serviceName }) {
  // Added 'carModel' to state
  const [formData, setFormData] = useState({ name: '', phone: '', carModel: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. SAVE TO DATABASE (Now includes car_model)
      const { error } = await supabase
        .from('bookings')
        .insert([
          { 
            customer_name: formData.name, 
            phone_number: formData.phone, 
            service_type: serviceName,
            car_model: formData.carModel, // <--- Saving Car Model
            status: 'Lead (WhatsApp)'
          }
        ]);

      if (error) throw error;

      // 2. SEND EMAIL ALERT (New Step)
      // We don't await this because we don't want to slow down the WhatsApp redirect
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          carModel: formData.carModel,
          service: serviceName
        })
      });

      // 3. REDIRECT TO WHATSAPP (Message updated)
      // "Hello... I have a Swift Dzire..."
      const message = `Hello Krishna Maruti Zone, my name is ${formData.name}. I have a *${formData.carModel}* and I am interested in *${serviceName}*. My number is ${formData.phone}.`;
      
      const whatsappUrl = `https://wa.me/919053777040?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      
      onClose();
      setFormData({ name: '', phone: '', carModel: '' });

    } catch (err) {
      console.error('Error saving booking:', err);
      // Fallback message includes car model too
      const fallbackMsg = `Hi, I have a ${formData.carModel} and want to book ${serviceName}`;
      window.open(`https://wa.me/919053777040?text=${encodeURIComponent(fallbackMsg)}`, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="bg-blue-600 p-6 flex justify-between items-start">
          <div>
            <h3 className="text-white text-xl font-bold">Quick Details</h3>
            <p className="text-blue-100 text-sm mt-1">Tell us about your car</p>
          </div>
          <button onClick={onClose} className="text-blue-100 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="e.g. Rahul Kumar"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* --- NEW CAR MODEL INPUT --- */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Car Model</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="e.g. Swift Dzire, Brezza, WagonR"
              value={formData.carModel}
              onChange={(e) => setFormData({...formData, carModel: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input 
              required
              type="tel" 
              pattern="[0-9]{10}"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none"
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
              <>Saving... <Loader2 className="animate-spin" /></>
            ) : (
              'Continue to WhatsApp'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}