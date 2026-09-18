import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ShieldCheck, HeartPulse, User, Phone, Sparkles, Shield } from 'lucide-react';

const defaultServices = [
  { id: 1, title: 'Dental Implants', price: 1200, description: 'Permanent, natural-looking replacement roots and teeth.' },
  { id: 2, title: 'Cosmetic Dentistry', price: 450, description: 'Veneers, bonding, and total smile aesthetic enhancements.' },
  { id: 3, title: 'Root Canals', price: 650, description: 'Painless procedure to clear infection and save natural teeth.' },
  { id: 4, title: 'Teeth Whitening', price: 250, description: 'Professional laser whitening for immediate, radiant results.' },
  { id: 5, title: 'Dental X-Rays', price: 100, description: 'High-precision digital imaging for comprehensive oral diagnostics.' },
  { id: 6, title: 'Braces & Implants', price: 1800, description: 'Orthodontic solutions and structural alignment care.' }
];

const defaultDoctors = [
  {
    id: 1,
    name: 'Dr. Elena Rostova',
    role: 'Chief Dental Surgeon',
    specialty: 'Implantology & Reconstructive Surgery',
    experience: '14+ Years Exp',
    phone: '+91 9876543210',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 2,
    name: 'Dr. Marcus Vance',
    role: 'Senior Orthodontist',
    specialty: 'Clear Aligners & Pediatric Braces',
    experience: '10+ Years Exp',
    phone: '+91 9876543211',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 3,
    name: 'Dr. Sarah Jenkins',
    role: 'Cosmetic Specialist',
    specialty: 'Veneers & Digital Smile Design',
    experience: '8+ Years Exp',
    phone: '+91 9876543212',
    image: 'https://images.unsplash.com/photo-1594824813566-88855ce78c4c?auto=format&fit=crop&q=80&w=300'
  }
];

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const savedDocs = JSON.parse(localStorage.getItem('dentiva_doctors'));
    if (savedDocs && savedDocs.length > 0) {
      setDoctors(savedDocs);
    } else {
      setDoctors(defaultDoctors);
      localStorage.setItem('dentiva_doctors', JSON.stringify(defaultDoctors));
    }

    const savedServices = JSON.parse(localStorage.getItem('dentiva_services'));
    if (savedServices && savedServices.length > 0) {
      setServices(savedServices);
    } else {
      setServices(defaultServices);
      localStorage.setItem('dentiva_services', JSON.stringify(defaultServices));
    }
  }, []);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-[#5b7c65] text-xs font-bold border border-emerald-100">
              <Sparkles size={14} /> Modern & Gentle Dental Care
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              A Healthier Smile Starts With <span className="text-[#5b7c65]">Gentle Care.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
              Experience advanced dental treatments with painless procedures, expert specialists, and transparent appointment scheduling.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/book"
                className="w-full sm:w-auto bg-[#5b7c65] text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-[#4a6753] transition shadow-lg shadow-[#5b7c65]/20 flex items-center justify-center gap-2"
              >
                <Calendar size={18} /> Book Appointment
              </Link>
              <Link
                to="/my-appointment"
                className="w-full sm:w-auto bg-white text-slate-700 px-8 py-3.5 rounded-xl font-bold text-sm border border-slate-200 hover:bg-slate-50 transition flex items-center justify-center gap-2"
              >
                Check Booking Status
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-[320px] sm:h-[400px] bg-slate-200 rounded-3xl overflow-hidden shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000"
                alt="Modern Clinic"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>
            
            <div className="absolute -bottom-6 right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-[#5b7c65] rounded-xl">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase">Verified Staff</p>
                <p className="text-sm font-bold text-slate-900">100% Certified Dentists</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="bg-emerald-100/70 text-[#5b7c65] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            OUR SERVICES
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">Comprehensive Dental Solutions</h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            From routine cleanings to advanced surgeries, we provide high-quality care tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div key={srv.id} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-emerald-50 text-[#5b7c65] rounded-xl flex items-center justify-center font-bold">
                    <Shield size={20} />
                  </div>
                  <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                    ${srv.price}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{srv.title || srv.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {srv.description || 'Professional dental care and clinical service.'}
                </p>
              </div>
              
              <Link
                to="/book"
                className="text-xs font-bold text-[#5b7c65] hover:underline inline-block pt-2"
              >
                Book This Service →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Doctors Section */}
      <section className="py-16 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-10">
          <div className="space-y-3">
            <span className="bg-emerald-100/70 text-[#5b7c65] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              EXPERT TEAM
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Meet Our Dental Specialists</h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Our doctors bring decades of combined clinical expertise and gentle bedside care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <div key={doc.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 text-center flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-slate-100 border-2 border-[#5b7c65]/20 shadow-inner">
                    {doc.image ? (
                      <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <User size={36} />
                      </div>
                    )}
                  </div>

                  <span className="inline-block text-[10px] bg-emerald-50 text-[#5b7c65] font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                    {doc.experience || 'Specialist'}
                  </span>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{doc.name}</h3>
                    <p className="text-xs font-bold text-slate-600">{doc.role}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{doc.specialty}</p>
                  </div>
                </div>

                {doc.phone && (
                  <p className="text-xs font-semibold text-[#5b7c65] flex items-center justify-center gap-1.5 pt-3 border-t border-slate-100 mt-2">
                    <Phone size={12} /> {doc.phone}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#5b7c65] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <h2 className="text-3xl font-extrabold">Ready to Experience Painless Dental Care?</h2>
          <p className="text-sm text-emerald-100 max-w-xl mx-auto">
            Book your appointment online in under 2 minutes with instant slot verification.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 bg-white text-[#5b7c65] px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-emerald-50 transition shadow-md"
          >
            <Calendar size={18} /> Schedule Your Visit
          </Link>
        </div>
      </section>
    </div>
  );
}