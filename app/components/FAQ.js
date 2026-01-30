'use client'
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    question: "Do you offer free pickup and drop?",
    answer: "Yes! We offer free pickup and drop service anywhere in areas within 15 kms of Rewari."
  },
  {
    question: "Do you use genuine parts?",
    answer: "Absolutely. We use 100% genuine OEM/OES spare parts. We can also provide the old parts back to you upon request."
  },
  {
    question: "How long does a general service take?",
    answer: "A standard periodic service takes about 4-6 hours. If you book a morning slot, you will get your car back by evening."
  },
  {
    question: "Do you provide a warranty on repairs?",
    answer: "Yes, we provide a 1-month warranty on service labor and specific warranties on spare parts as per the manufacturer."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-slate-800">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-gray-400" />}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}