import Link from 'next/link';

export default function About() {
  return (
    <section className="py-24 bg-white border-t border-slate-100" id="about">
      <div className="w-full px-6 md:px-12">
        
        {/* Sub-headline (Centered) */}
        <h4 className="text-center text-blue-700 font-bold text-xl mb-4 uppercase tracking-wider">
          About KrishnaMarutiZone
        </h4>
        
        {/* Main Headline (Centered) */}
        <h2 className="text-center text-4xl md:text-2xl font-black text-slate-900 mb-8 leading-tight max-w-5xl mx-auto">
          One Stop Destination For All Maruti Suzuki Services In Rewari
        </h2>
        
        {/* Paragraph Text (Justified) */}
        <p className="text-justify text-slate-600 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-light">
          BhiwadiCarCare is the ultimate marketplace and aggregator for all Maruti car services in Bhiwadi. 
          We specialize exclusively in <strong className="font-semibold text-slate-900">Maruti Suzuki</strong> vehicles, ensuring factory-standard care for everything from an 
          Alto to a Grand Vitara. Whether you are searching for periodic servicing, need roadside assistance, 
          seeking car inspection services, or looking for denting and painting in Bhiwadi, we have got you covered.
        </p>

      </div>
    </section>
  );
}