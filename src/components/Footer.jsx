import { Link } from 'react-router-dom';
import { Activity, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 font-extrabold text-2xl text-white tracking-tight mb-4">
              <Activity className="text-[#5b7c65]" size={28} />
              <span>DENTIVA</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Providing modern, painless, and gentle dental care in a state-of-the-art environment. Your health and smile are our top priorities.
            </p>
            <div className="flex gap-4">
              <Link to="/book" className="text-xs font-semibold bg-[#5b7c65] text-white px-4 py-2 rounded hover:bg-[#4a6753] transition">
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">About Us & Team</Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-white transition">Book Appointment</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#5b7c65] transition">Admin Staff Portal</Link>
              </li>
            </ul>
          </div>

          {/* Services List */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Key Services</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Dental Implants</li>
              <li>Cosmetic Dentistry</li>
              <li>Root Canal Treatment</li>
              <li>Laser Teeth Whitening</li>
              <li>Digital Dental X-Rays</li>
              <li>Braces & Aligners</li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Clinic Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#5b7c65] shrink-0 mt-0.5" />
                <span>124 Medical Heights Blvd, Suite 300</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#5b7c65] shrink-0" />
                <span>+1 (555) 234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#5b7c65] shrink-0" />
                <span>contact@dentivaclinic.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-[#5b7c65] shrink-0 mt-0.5" />
                <span>Mon - Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 2:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dentiva Dental Clinic. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Patient Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}