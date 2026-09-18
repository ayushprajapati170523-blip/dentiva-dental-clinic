import { useState, useEffect } from 'react';
import { Calendar, DollarSign, Users, Clock, Filter } from 'lucide-react';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'lastWeek', 'lastMonth'

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dentiva_appointments')) || [];
    setAppointments(stored);
  }, []);

  // Date Filter Calculation
  const filteredAppointments = appointments.filter((app) => {
    if (filter === 'all') return true;
    const appDate = new Date(app.date || app.createdAt);
    const now = new Date();
    
    if (filter === 'lastWeek') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      return appDate >= oneWeekAgo && appDate <= now;
    }
    if (filter === 'lastMonth') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1);
      return appDate >= oneMonthAgo && appDate <= now;
    }
    return true;
  });

  // Dynamic Metrics Calculation
  const totalAppointments = filteredAppointments.length;
  const totalPatients = new Set(filteredAppointments.map((a) => a.email || a.phone)).size;
  const totalRevenue = filteredAppointments.reduce((sum, a) => sum + (Number(a.fee) || 50), 0);
  const pendingAppointments = filteredAppointments.filter((a) => a.status === 'Pending' || !a.status).length;

  return (
    <div className="space-y-8">
      {/* Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Real-time performance analytics for Dentiva Clinic.</p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-sm">
          <Filter size={18} className="text-[#5b7c65]" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm font-semibold text-slate-700 bg-transparent focus:outline-none"
          >
            <option value="all">All Time</option>
            <option value="lastWeek">Last 7 Days</option>
            <option value="lastMonth">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-500 text-sm font-medium">Total Appointments</span>
            <div className="p-2.5 bg-[#eaf2ec] text-[#5b7c65] rounded-lg"><Calendar size={20} /></div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{totalAppointments}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-500 text-sm font-medium">Total Revenue</span>
            <div className="p-2.5 bg-[#eaf2ec] text-[#5b7c65] rounded-lg"><DollarSign size={20} /></div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">${totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-500 text-sm font-medium">Total Patients</span>
            <div className="p-2.5 bg-[#eaf2ec] text-[#5b7c65] rounded-lg"><Users size={20} /></div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{totalPatients}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-500 text-sm font-medium">Pending Requests</span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg"><Clock size={20} /></div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{pendingAppointments}</p>
        </div>
      </div>
    </div>
  );
}