import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Lock, Mail, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo credentials check
    if (email === 'admin@dentiva.com' && password === 'admin123') {
      localStorage.setItem('dentiva_auth', 'true');
      setError('');
      navigate('/admin');
    } else {
      setError('Invalid credentials. Use admin@dentiva.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#eaf2ec] text-[#5b7c65] rounded-xl flex items-center justify-center mx-auto mb-4">
            <Activity size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Staff Portal</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to access clinic management</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="email"
                required
                placeholder="admin@dentiva.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b7c65]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b7c65]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5b7c65] text-white py-3 rounded-lg font-semibold hover:bg-[#4a6753] transition shadow-md"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
          Demo Credentials: <span className="font-semibold text-slate-700">admin@dentiva.com</span> / <span className="font-semibold text-slate-700">admin123</span>
        </div>
      </div>
    </div>
  );
}