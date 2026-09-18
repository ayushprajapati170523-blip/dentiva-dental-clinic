import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Mail, Phone, FileText } from 'lucide-react';

export default function BookAppointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Dental Implants',
    date: '',
    time: '10:00 AM',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('dentiva_pending_booking', JSON.stringify(formData));
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
        <div className="border-b border-slate-100 pb-6 mb-8 text-center">
          <span className="text-xs font-bold text-[#5b7c65] uppercase bg-[#eaf2ec] px-3.5 py-1.5 rounded-full">
            Step 1 of 2
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-3">Schedule Your Visit</h1>
          <p className="text-slate-500 text-sm mt-1">Please enter your patient details and select a slot</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b7c65]"
                />
                <User size={18} className="absolute left-3 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b7c65]"
                />
                <Mail size={18} className="absolute left-3 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
              <div className="relative">
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b7c65]"
                />
                <Phone size={18} className="absolute left-3 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Dental Service</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b7c65] text-slate-700"
              >
                <option value="Dental Implants">Dental Implants</option>
                <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                <option value="Root Canals">Root Canals</option>
                <option value="Teeth Whitening">Teeth Whitening</option>
                <option value="Dental X-Rays">Dental X-Rays</option>
                <option value="Braces & Implants">Braces & Implants</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Appointment Date</label>
              <div className="relative">
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b7c65]"
                />
                <Calendar size={18} className="absolute left-3 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Time Slot</label>
              <div className="relative">
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b7c65] text-slate-700"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
                <Clock size={18} className="absolute left-3 top-3 text-slate-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Notes / Symptoms</label>
            <div className="relative">
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Describe any tooth pain, preferences, or questions..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b7c65]"
              ></textarea>
              <FileText size={18} className="absolute left-3 top-3 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5b7c65] text-white py-3.5 rounded-lg font-semibold hover:bg-[#4a6753] transition shadow-md text-base"
          >
            Confirm & Continue to Payment →
          </button>
        </form>
      </div>
    </div>
  );
}