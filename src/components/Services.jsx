import { useState, useEffect } from 'react';
import { Shield, Sparkles, Syringe, FileText, Smile, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultServices = [
  { id: 1, title: 'Dental Implants', desc: 'Permanent, natural-looking replacement roots and teeth.', price: '$1,200' },
  { id: 2, title: 'Cosmetic Dentistry', desc: 'Veneers, bonding, and total smile aesthetic enhancements.', price: '$450' },
  { id: 3, title: 'Root Canals', desc: 'Painless procedure to clear infection and save natural teeth.', price: '$650' },
  { id: 4, title: 'Teeth Whitening', desc: 'Professional laser whitening for immediate, radiant results.', price: '$250' },
  { id: 5, title: 'Dental X-Rays', desc: 'High-precision digital imaging for comprehensive oral diagnostics.', price: '$100' },
  { id: 6, title: 'Braces & Implants', desc: 'Orthodontic solutions and structural alignment care.', price: '$1,800' },
];

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dentiva_services'));
    if (stored && stored.length > 0) {
      setServices(stored);
    } else {
      setServices(defaultServices);
    }
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-[#5b7c65] uppercase bg-[#eaf2ec] px-4 py-1.5 rounded-full">
            Our Treatments
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4 mb-4">
            Comprehensive Dental Services & Pricing
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            We provide state-of-the-art treatments tailored to your dental health. Transparent pricing with zero hidden fees.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-7 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group"
            >
              <div>
                {/* Icon & Price Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-white text-[#5b7c65] rounded-xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:bg-[#5b7c65] group-hover:text-white transition-colors duration-200">
                    <Shield size={26} />
                  </div>
                  <span className="bg-[#eaf2ec] text-[#4a6753] font-bold text-sm px-3.5 py-1.5 rounded-full border border-[#d6e5d9]">
                    {service.price}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#5b7c65] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              {/* Book Action Button */}
              <Link
                to="/book"
                className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-200/60 text-sm font-semibold text-slate-800 hover:text-[#5b7c65] transition-colors"
              >
                <span>Schedule Treatment</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}