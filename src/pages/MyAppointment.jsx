import { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Calendar, MapPin, User, ShieldCheck, AlertCircle } from 'lucide-react';

export default function MyAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [searchPhone, setSearchPhone] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dentiva_appointments')) || [];
    setAppointments(stored);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  const userAppointments = appointments.filter(a => a.phone === searchPhone.trim());

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900">Check Your Appointment</h1>
          <p className="text-sm text-slate-500">Enter your registered mobile number to view status & confirmation pass.</p>
        </div>

        {/* Phone Search Form */}
        <form onSubmit={handleSearch} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex gap-3">
          <input
            required
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5b7c65]"
          />
          <button
            type="submit"
            className="bg-[#5b7c65] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#4a6753] transition text-sm"
          >
            Check Status
          </button>
        </form>

        {/* Results Section */}
        {searched && (
          <div className="space-y-4">
            {userAppointments.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm space-y-2">
                <AlertCircle size={32} className="mx-auto text-amber-500" />
                <p>No appointments found for this phone number.</p>
              </div>
            ) : (
              userAppointments.map((app) => (
                <div key={app.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg transition">
                  {/* Status Bar */}
                  <div className={`p-4 flex justify-between items-center ${
                    app.paymentStatus === 'Paid' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={20} />
                      <span className="font-bold text-sm uppercase tracking-wider">
                        {app.paymentStatus === 'Paid' ? 'Appointment Confirmed!' : 'Verification Pending'}
                      </span>
                    </div>
                    <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-mono">
                      Ref: {app.txnRef || 'N/A'}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-5">
                    {app.paymentStatus === 'Paid' ? (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-start gap-2">
                        <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-sm">Payment Verified Successfully!</p>
                          <p>Your appointment has been approved by the clinic staff. Please arrive 10 minutes before your slot.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2">
                        <Clock size={18} className="text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-sm">Payment Verification Underway</p>
                          <p>Staff is verifying your UTR / Transaction ID. This status will change to **Confirmed** shortly.</p>
                        </div>
                      </div>
                    )}

                    {/* Ticket Details */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <p className="text-slate-400 font-semibold uppercase">Patient Name</p>
                        <p className="font-bold text-slate-800 text-sm flex items-center gap-1">
                          <User size={14} /> {app.name}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-slate-400 font-semibold uppercase">Doctor / Service</p>
                        <p className="font-bold text-slate-800 text-sm">{app.doctor || app.service}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-slate-400 font-semibold uppercase">Date & Time</p>
                        <p className="font-bold text-slate-800 text-sm flex items-center gap-1">
                          <Calendar size={14} /> {app.date} at {app.time}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-slate-400 font-semibold uppercase">Clinic Location</p>
                        <p className="font-bold text-slate-800 text-sm flex items-center gap-1">
                          <MapPin size={14} /> Main Branch, Dentiva Clinic
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}