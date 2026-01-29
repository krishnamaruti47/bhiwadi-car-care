'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Star, User, Send, Loader2 } from 'lucide-react';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });

  // 1. Fetch Reviews on Load
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setReviews(data);
    setLoading(false);
  };

  // 2. Handle Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!formData.name || !formData.comment) {
      alert("Please fill in all fields");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from('reviews')
      .insert([formData]);

    if (error) {
      alert('Error submitting review');
    } else {
      // Success: Reset form and refresh list
      setFormData({ name: '', rating: 5, comment: '' });
      fetchReviews(); 
    }
    setSubmitting(false);
  };

  return (
    <section className="py-20 bg-white" id="reviews">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Customer Reviews</h2>
          <p className="text-slate-500">See what our customers are saying about us.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT: Review Form */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 h-fit">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Write a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Star Rating Selector */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Your Rating</label>
                <div className="flex gap-2 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={28} 
                      className={`transition ${star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      onClick={() => setFormData({...formData, rating: star})}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name</label>
                <input 
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Your Review</label>
                <textarea 
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  placeholder="Share your experience..."
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                />
              </div>

              <button 
                disabled={submitting}
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Submit Review</>}
              </button>
            </form>
          </div>

          {/* RIGHT: Display Reviews */}
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? (
              <div className="text-center py-10 text-gray-400">Loading reviews...</div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">No reviews yet. Be the first to write one!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                        <div className="flex gap-0.5">
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} size={12} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                           ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  );
}