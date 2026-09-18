import { useState, useEffect } from 'react';
import { Plus, Trash2, Sparkles, Syringe, Shield, Smile, FileText, Check } from 'lucide-react';

const defaultServices = [
  { id: 1, title: 'Dental Implants', desc: 'Permanent, natural-looking replacement roots and teeth.', price: '$1,200', icon: 'Shield' },
  { id: 2, title: 'Cosmetic Dentistry', desc: 'Veneers, bonding, and total smile aesthetic enhancements.', price: '$450', icon: 'Sparkles' },
  { id: 3, title: 'Root Canals', desc: 'Painless procedure to clear infection and save natural teeth.', price: '$650', icon: 'Syringe' },
  { id: 4, title: 'Teeth Whitening', desc: 'Professional laser whitening for immediate, radiant results.', price: '$250', icon: 'Sparkles' },
  { id: 5, title: 'Dental X-Rays', desc: 'High-precision digital imaging for comprehensive oral diagnostics.', price: '$100', icon: 'FileText' },
  { id: 6, title: 'Braces & Implants', desc: 'Orthodontic solutions and structural alignment care.', price: '$1,800', icon: 'Smile' },
];

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newService, setNewService] = useState({ title: '', desc: '', price: '' });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dentiva_services'));
    if (stored && stored.length > 0) {
      setServices(stored);
    } else {
      setServices(defaultServices);
      localStorage.setItem('dentiva_services', JSON.stringify(defaultServices));
    }
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newService.title || !newService.desc) return;
    
    const item = {
      id: Date.now(),
      title: newService.title,
      desc: newService.desc,
      price: newService.price || 'Contact for price',
      icon: 'Shield',
    };
    const updated = [item, ...services];
    setServices(updated);
    localStorage.setItem('dentiva_services', JSON.stringify(updated));
    setNewService({ title: '', desc: '', price: '' });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    localStorage.setItem('dentiva_services', JSON.stringify(updated));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Services Management</h1>
          <p className="text-slate-500">Add, view, or remove clinical offerings.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#5b7c65] text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-[#4a6753] transition shadow-sm"
        >
          <Plus size={18} /> {isAdding ? 'Close Form' : 'Add New Service'}
        </button>
      </div>

      {/* Add Service Modal/Form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border border-slate-200 shadow-md mb-8 space-y-4 max-w-xl">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Create New Treatment</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Service Title</label>
            <input
              type="text"
              required
              placeholder="e.g., Pediatric Checkup"
              value={newService.title}
              onChange={(e) => setNewService({ ...newService, title: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b7c65]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Cost / Price</label>
            <input
              type="text"
              placeholder="e.g., $150 or Free Consultation"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b7c65]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              rows="3"
              required
              placeholder="Brief details about the treatment..."
              value={newService.desc}
              onChange={(e) => setNewService({ ...newService, desc: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b7c65]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition flex items-center gap-2"
          >
            <Check size={18} /> Save Service
          </button>
        </form>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-[#eaf2ec] text-[#5b7c65] rounded-lg flex items-center justify-center font-bold">
                  <Shield size={24} />
                </div>
                <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                  {service.price}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.desc}</p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => handleDelete(service.id)}
                className="text-slate-400 hover:text-red-600 transition flex items-center gap-1 text-sm font-medium"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}