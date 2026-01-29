'use client'
import { useState } from 'react';
import Header from '../components/Header';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

export default function FAQPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50">
      <Header onBookNow={() => setIsModalOpen(true)} />
      
      <div className="pt-16 pb-24">
        <div className="text-center mb-12 px-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Common Questions</h1>
            <p className="text-xl text-slate-500">Everything you need to know about our service.</p>
        </div>
        <FAQ />
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