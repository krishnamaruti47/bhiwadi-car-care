'use client'
import { useState } from 'react';
import Header from '../components/Header';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

export default function ReviewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50">
      <Header onBookNow={() => setIsModalOpen(true)} />
      
      <div className="pt-12 pb-24">
        {/* Page Title */}
        <div className="text-center mb-12 px-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Customer Stories</h1>
            <p className="text-xl text-slate-500">See why 500+ Maruti Owners in Bhiwadi trust us.</p>
        </div>
        
        <Reviews />
      </div>

      <Footer onBookNow={() => setIsModalOpen(true)} />
      
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        preSelectedService="General Inquiry"
      />
    </main>
  );
}