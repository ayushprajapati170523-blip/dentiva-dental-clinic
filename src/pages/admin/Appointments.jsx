import { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, CreditCard, Send, Check } from 'lucide-react';

export default function StaffAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [notifiedId, setNotifiedId] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dentiva_appointments')) || [];
    setAppointments(stored);
  }, []);

  const saveAppointments = (updated) => {
    setAppointments(updated);
    localStorage.setItem('dentiva_appointments', JSON.stringify(updated));
  };

  const togglePaymentAndConfirm = (id) => {
    const updated = appointments.map((app) => {
      if (app.id === id) {
        const isPaidNow = app.paymentStatus !== 'Paid';
        return {
          ...app,
          paymentStatus: isPaidNow ? 'Paid' : 'Unpaid',
          status: isPaidNow ? 'Confirmed' : 'Pending',
          confirmedAt: isPaidNow ? new Date().toLocaleString() : null,
          notified: isPaidNow
        };
      }
      return app;
    });

    saveAppointments(updated);

    // Show temporary notification alert for staff
    setNotifiedId(id);
    setTimeout(() => setNotifiedId(null), 3000);
  };

  const updateBookingStatus = (id, newStatus) => {
    const updated = appointments.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    saveAppointments(updated);
  };

  const filtered = appointments.filter((app) => {
    const matchesSearch =
      app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone?.includes(searchTerm) ||
      app.txnRef?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'All') return matchesSearch;
    if (filterStatus === 'Paid') return matchesSearch && app.paymentStatus === 'Paid';
    if (filterStatus === 'Unpaid') return matchesSearch && app.paymentStatus !== 'Paid';
    return matchesSearch && app.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments Management</h1>
          <p className="text-xs text-slate-500">Verify payments, confirm slots & notify patients.</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#5b7c65]"
          >
            <option value="All">All Appointments</option>
            <option value="Paid">Payment: Paid</option>
            <option value="Unpaid">Payment: Unpaid / Pending</option>
            <option value="Confirmed">Booking: Confirmed</option>
            <option value="Cancelled">Booking: Cancelled</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Search patient, phone, or Txn Ref..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5b7c65]"
        />
        <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase font-semibold">
              <tr>
                <th className="p-4">Patient</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Doctor & Service</th>
                <th className="p-4">Txn Ref ID</th>
                <th className="p-4">Payment Verification</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 text-xs">
                    No appointments found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4">
                      <p className="font-bold text-slate-900">{app.name}</p>
                      <p className="text-xs text-slate-500">{app.phone}</p>
                    </td>

                    <td className="p-4">
                      <p className="font-medium text-slate-800">{app.date}</p>
                      <p className="text-xs text-slate-500">{app.time}</p>
                    </td>

                    <td className="p-4">
                      <p className="font-medium text-slate-800">{app.doctor || 'General Consultation'}</p>
                      <p className="text-xs text-slate-500">{app.service}</p>
                    </td>

                    <td className="p-4">
                      <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                        {app.txnRef || 'N/A'}
                      </span>
                    </td>

                    {/* Toggle Payment & Trigger Notification */}
                    <td className="p-4">
                      <button
                        onClick={() => togglePaymentAndConfirm(app.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                          app.paymentStatus === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200'
                        }`}
                        title="Click to Verify Payment and Notify Patient"
                      >
                        <CreditCard size={13} />
                        {app.paymentStatus === 'Paid' ? 'Paid & Verified' : 'Mark as Paid'}
                      </button>

                      {notifiedId === app.id && (
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1 animate-fade-in">
                          <Send size={10} /> Confirmation Sent!
                        </span>
                      )}
                    </td>

                    {/* Booking Status Badge */}
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1 ${
                          app.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : app.status === 'Cancelled'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {app.status === 'Confirmed' && <Check size={12} />}
                        {app.status || 'Pending'}
                      </span>
                    </td>

                    {/* Manual Controls */}
                    <td className="p-4 text-right space-x-2">
                      {app.status !== 'Confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(app.id, 'Confirmed')}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg border border-emerald-200"
                          title="Approve Appointment"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      {app.status !== 'Cancelled' && (
                        <button
                          onClick={() => updateBookingStatus(app.id, 'Cancelled')}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200"
                          title="Cancel Appointment"
                        >
                          <XCircle size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}