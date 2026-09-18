import { ShieldCheck, Award, HeartHandshake, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const team = [
  {
    name: 'Dr. Elena Rostova',
    role: 'Chief Dental Surgeon',
    spec: 'Implantology & Reconstructive Surgery',
    exp: '14+ Years Exp',
  },
  {
    name: 'Dr. Marcus Vance',
    role: 'Senior Orthodontist',
    spec: 'Clear Aligners & Pediatric Braces',
    exp: '10+ Years Exp',
  },
  {
    name: 'Dr. Sarah Jenkins',
    role: 'Cosmetic Specialist',
    spec: 'Veneers & Digital Smile Design',
    exp: '8+ Years Exp',
  },
];

const coreValues = [
  {
    title: 'Patient Comfort First',
    desc: 'We utilize gentle techniques and modern sedation to ensure pain-free procedures.',
    icon: HeartHandshake,
  },
  {
    title: 'Advanced Diagnostic Tech',
    desc: '3D imaging and low-radiation digital X-rays for pinpoint accuracy.',
    icon: ShieldCheck,
  },
  {
    title: 'Certified Specialists',
    desc: 'Continuous training and board-certified dental professionals in every discipline.',
    icon: Award,
  },
];

export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-slate-900 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#5b7c65] bg-slate-800 px-4 py-1.5 rounded-full border border-slate-700">
            About Dentiva Clinic
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-6 mb-4">
            Redefining the Dental Experience
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Founded on the principle of stress-free healthcare, Dentiva combines cutting-edge dental technology with personal, compassionate care.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-6xl mx-auto -mt-10 px-4 relative z-10 mb-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#5b7c65]">15+</p>
            <p className="text-sm font-medium text-slate-600 mt-1">Years of Service</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">12k+</p>
            <p className="text-sm font-medium text-slate-600 mt-1">Happy Patients</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#5b7c65]">99.4%</p>
            <p className="text-sm font-medium text-slate-600 mt-1">Satisfaction Rate</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">6</p>
            <p className="text-sm font-medium text-slate-600 mt-1">Dental Specialists</p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="max-w-6xl mx-auto px-4 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Why Patients Choose Dentiva
          </h2>
          <p className="text-slate-600">
            We believe going to the dentist should be a comfortable, transparent, and rejuvenating experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((value, idx) => {
            const Icon = value.icon;
            return (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200/70 shadow-sm">
                <div className="w-12 h-12 bg-[#eaf2ec] text-[#5b7c65] rounded-xl flex items-center justify-center mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Meet the Doctors Section */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5b7c65] bg-[#eaf2ec] px-4 py-1.5 rounded-full">
              Expert Team
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-4 mb-3">
              Meet Our Dental Specialists
            </h2>
            <p className="text-slate-600">
              Our doctors bring decades of combined clinical expertise and gentle bedside care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((doctor, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center hover:shadow-lg transition">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-5 flex items-center justify-center text-slate-400">
                  <Users size={40} />
                </div>
                <span className="text-xs font-semibold text-[#5b7c65] bg-[#eaf2ec] px-3 py-1 rounded-full">
                  {doctor.exp}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-1">{doctor.name}</h3>
                <p className="text-sm font-semibold text-slate-700 mb-1">{doctor.role}</p>
                <p className="text-xs text-slate-500 mb-6">{doctor.spec}</p>
              </div>
            ))}
          </div>

          {/* Booking CTA Banner */}
          <div className="mt-16 bg-slate-900 rounded-2xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready for a Healthy, Radiant Smile?</h3>
              <p className="text-slate-400 text-sm">Schedule your consultation with our specialists today.</p>
            </div>
            <Link
              to="/book"
              className="bg-[#5b7c65] hover:bg-[#4a6753] text-white px-8 py-3.5 rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap transition shadow-md"
            >
              Book Appointment <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}