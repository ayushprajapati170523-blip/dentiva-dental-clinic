import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public Pages & Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import BookAppointment from './pages/BookAppointment';
import Payment from "./pages/payment";
import MyAppointment from './pages/MyAppointment';

// Admin Pages & Auth
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/admin/Login';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Appointments from './pages/admin/Appointments';
import AdminServices from './pages/admin/Services';
import AdminSettings from './pages/admin/Settings';

function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/book" element={<PublicLayout><BookAppointment /></PublicLayout>} />
        <Route path="/payment" element={<PublicLayout><Payment /></PublicLayout>} />
        <Route path="/my-appointment" element={<PublicLayout><MyAppointment /></PublicLayout>} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}