import { useState, useEffect } from 'react';
import { UserPlus, Trash2, User, RefreshCw, Check } from 'lucide-react';

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

export default function AdminSettings() {
  const [doctors, setDoctors] = useState([]);
  const [newDoc, setNewDoc] = useState({ name: '', role: '', specialty: '', experience: '', phone: '', image: '' });
  const [editingImage, setEditingImage] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('dentiva_doctors'));
    if (saved && saved.length > 0) {
      setDoctors(saved);
    } else {
      setDoctors(defaultDoctors);
      localStorage.setItem('dentiva_doctors', JSON.stringify(defaultDoctors));
    }
  }, []);

  const saveDoctors = (list) => {
    setDoctors(list);
    localStorage.setItem('dentiva_doctors', JSON.stringify(list));
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!newDoc.name || !newDoc.role) return;
    const updated = [...doctors, { ...newDoc, id: Date.now() }];
    saveDoctors(updated);
    setNewDoc({ name: '', role: '', specialty: '', experience: '', phone: '', image: '' });
  };

  const handleRemoveDoctor = (id) => {
    const updated = doctors.filter((doc) => doc.id !== id);
    saveDoctors(updated);
  };

  const handleUpdateImage = (id, newImageUrl) => {
    const updated = doctors.map((doc) => doc.id === id ? { ...doc, image: newImageUrl } : doc);
    saveDoctors(updated);
  };

  const handleResetDefaults = () => {
    saveDoctors(defaultDoctors);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Doctors & Specialists</h1>
          <p className="text-xs text-slate-500">Add, update photo URL, or remove doctors visible on homepage.</p>
        </div>
        <button
          onClick={handleResetDefaults}
          className="flex items-center gap-2 text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-2 rounded-xl transition"
        >
          <RefreshCw size={14} /> Reset Default Doctors
        </button>
      </div>

      {/* Add New Doctor Form */}
      <form onSubmit={handleAddDoctor} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <UserPlus size={16} className="text-[#5b7c65]" /> Add New Doctor
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] font-bold text-slate-600">Doctor Name</label>
            <input
              type="text"
              placeholder="e.g. Dr. Rajesh Sharma"
              value={newDoc.name}
              onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl mt-1 focus:ring-2 focus:ring-[#5b7c65]"
              required
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600">Role / Title</label>
            <input
              type="text"
              placeholder="e.g. Chief Dental Surgeon"
              value={newDoc.role}
              onChange={(e) => setNewDoc({ ...newDoc, role: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl mt-1 focus:ring-2 focus:ring-[#5b7c65]"
              required
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600">Specialty</label>
            <input
              type="text"
              placeholder="e.g. Dental Implants & Surgery"
              value={newDoc.specialty}
              onChange={(e) => setNewDoc({ ...newDoc, specialty: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl mt-1 focus:ring-2 focus:ring-[#5b7c65]"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600">Experience</label>
            <input
              type="text"
              placeholder="e.g. 12+ Years Exp"
              value={newDoc.experience}
              onChange={(e) => setNewDoc({ ...newDoc, experience: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl mt-1 focus:ring-2 focus:ring-[#5b7c65]"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600">Phone Number</label>
            <input
              type="text"
              placeholder="e.g. +91 9876543210"
              value={newDoc.phone}
              onChange={(e) => setNewDoc({ ...newDoc, phone: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl mt-1 focus:ring-2 focus:ring-[#5b7c65]"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600">Photo Image URL</label>
            <input
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={newDoc.image}
              onChange={(e) => setNewDoc({ ...newDoc, image: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl mt-1 focus:ring-2 focus:ring-[#5b7c65]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#5b7c65] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#4a6753] transition"
        >
          + Add Doctor
        </button>
      </form>

      {/* Current Doctor List with Photo Edit */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Current Doctor List ({doctors.length})</h2>

        <div className="divide-y divide-slate-100">
          {doctors.map((doc) => (
            <div key={doc.id} className="py-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                    {doc.image ? (
                      <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <User size={20} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{doc.name}</h3>
                    <p className="text-[11px] text-slate-500">{doc.role} • {doc.specialty}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveDoctor(doc.id)}
                  className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 border border-red-100 px-3 py-1.5 rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={13} /> Remove
                </button>
              </div>

              {/* Update Photo Input */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Paste Image URL here to update photo..."
                  value={editingImage[doc.id] !== undefined ? editingImage[doc.id] : (doc.image || '')}
                  onChange={(e) => setEditingImage({ ...editingImage, [doc.id]: e.target.value })}
                  className="flex-1 text-[11px] p-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#5b7c65]"
                />
                <button
                  onClick={() => handleUpdateImage(doc.id, editingImage[doc.id])}
                  className="bg-[#5b7c65] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#4a6753] flex items-center gap-1"
                >
                  <Check size={12} /> Save Photo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}