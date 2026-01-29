'use client'
import { useState, useEffect } from 'react'; // <--- Added useEffect here
import { supabase } from '../../lib/supabase';
import { X, CheckCircle, Loader2 } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, preSelectedService }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    car: '',
    service: 'General Service'
  });

  // --- THE FIX: Update form when the prop changes ---
  useEffect(() => {
    if (preSelectedService) {
      setFormData(prev => ({ ...prev, service: preSelectedService }));
    }
  }, [preSelectedService]);
  // ------------------------------------------------

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('bookings')
      .insert([{ 
          customer_name: formData.name, 
          phone_number: formData.phone, 
          car_model: formData.car,
          service_type: formData.service 
      }]);

    setLoading(false);

    if (error) {
      alert('Something went wrong. Please call us directly.');
      console.error(error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: '', phone: '', car: '', service: 'General Service' });
        onClose();
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition">
          <X size={24} />
        </button>

        {success ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Received!</h3>
            <p className="text-slate-500">Our team will call you within 15 minutes to confirm details.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Book Appointment</h2>
            <p className="text-slate-500 mb-6 text-sm">Fill details for <span className="font-bold text-blue-600">{formData.service}</span></p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                <input 
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
                <input 
                  required
                  type="tel"
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Car Model</label>
                <input 
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="e.g. Swift Dzire 2018"
                  value={formData.car}
                  onChange={e => setFormData({...formData, car: e.target.value})}
                />
              </div>

              {/* Hidden Service Field (So user sees it but cannot change it easily if you want strict booking) */}
              <div className="hidden">
                 <input value={formData.service} readOnly />
              </div>

              <button 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Confirm Booking'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}