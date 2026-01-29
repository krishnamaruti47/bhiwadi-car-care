'use client'
import { Phone, Menu, X } from 'lucide-react'; // Added X for close icon
import { useState } from 'react';
import Link from 'next/link'; // Use Next.js Link for faster navigation

export default function Header({ onBookNow }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-blue-700 tracking-tighter cursor-pointer">
          MARUTI<span className="text-slate-900">CARZONE</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600 uppercase tracking-wide">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/reviews" className="hover:text-blue-600 transition">Reviews</Link>
          <Link href="/faqs" className="hover:text-blue-600 transition">FAQs</Link>
          <Link href="/#contact" className="hover:text-blue-600 transition">Contact</Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+919876543210" className="flex items-center gap-2 text-slate-600 font-medium hover:text-blue-600">
            <Phone size={18} /> <span>+91 9053777041</span>
          </a>
          <button 
            onClick={onBookNow}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-700">
                {isMobileMenuOpen ? <X size={28}/> : <Menu size={28} />}
            </button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-lg absolute w-full left-0">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 font-medium border-b border-gray-50">Home</Link>
            <Link href="/reviews" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 font-medium border-b border-gray-50">Reviews</Link>
            <Link href="/faqs" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 font-medium border-b border-gray-50">FAQs</Link>
            <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 font-medium border-b border-gray-50">Contact</Link>
            <button onClick={() => {onBookNow(); setIsMobileMenuOpen(false)}} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold mt-2">Book Appointment</button>
        </div>
      )}
    </nav>
  );
}