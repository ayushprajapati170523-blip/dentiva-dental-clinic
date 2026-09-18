import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, UserCheck } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'My Appointment', path: '/my-appointment', icon: UserCheck },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#5b7c65] flex items-center justify-center text-white shadow-md shadow-[#5b7c65]/20">
              <span className="font-extrabold text-xl tracking-wider">D</span>
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 tracking-tight block leading-tight">
                Dentiva
              </span>
              <span className="text-[10px] font-semibold text-[#5b7c65] tracking-widest uppercase block">
                Dental Clinic
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                    isActive(link.path)
                      ? 'bg-[#eaf2ec] text-[#5b7c65]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {Icon && <Icon size={16} />}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/book"
              className="bg-[#5b7c65] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#4a6753] transition shadow-md shadow-[#5b7c65]/20 flex items-center gap-2"
            >
              <Calendar size={16} />
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-semibold ${
                isActive(link.path)
                  ? 'bg-[#eaf2ec] text-[#5b7c65]'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2">
            <Link
              to="/book"
              onClick={() => setIsOpen(false)}
              className="w-full bg-[#5b7c65] text-white px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}