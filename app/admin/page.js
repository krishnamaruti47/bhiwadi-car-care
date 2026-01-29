'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Lock, LogOut, Loader2, AlertCircle } from 'lucide-react';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loginError, setLoginError] = useState('');

  // 1. Check if user is already logged in on page load
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch bookings only if logged in
  useEffect(() => {
    if (session) fetchBookings();
  }, [session]);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (data) setBookings(data);
    if (error) console.error("Error fetching bookings:", error);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
        setLoginError('Invalid email or password');
        setLoading(false);
    }
    // If success, the onAuthStateChange hook above handles the redirect
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setBookings([]); // Clear sensitive data from screen
  };

  // --- RENDER: LOADING STATE ---
  if (loading && !session) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );
  }

  // --- RENDER: LOGIN FORM (If not logged in) ---
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm border border-gray-200">
          <div className="flex justify-center mb-6 text-blue-600">
            <div className="p-3 bg-blue-50 rounded-full">
                <Lock size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center text-slate-800">Admin Portal</h2>
          <p className="text-slate-500 text-center mb-6 text-sm">Sign in to manage bookings</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <input 
                    type="email" 
                    placeholder="admin@bhiwadicars.com" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            
            {loginError && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    <AlertCircle size={16} /> {loginError}
                </div>
            )}

            <button 
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center"
            >
                {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER: DASHBOARD (If logged in) ---
  return (
    <div className="min-h-screen bg-gray-50 text-slate-800">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-8 py-4 flex justify-between items-center">
        <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-xs text-slate-500">{session.user.email}</p>
        </div>
        <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition text-sm font-medium px-4 py-2 hover:bg-red-50 rounded-lg"
        >
            <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Booking Table */}
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Date</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Customer</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Contact</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Vehicle</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Service</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="p-12 text-center text-gray-400">
                            No bookings found in the database.
                        </td>
                    </tr>
                ) : (
                    bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-blue-50/50 transition duration-150">
                        <td className="p-4 text-slate-500 text-sm whitespace-nowrap">
                            {new Date(booking.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            <div className="text-xs text-slate-400 mt-1">
                                {new Date(booking.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </td>
                        <td className="p-4 font-medium text-slate-900">{booking.customer_name}</td>
                        <td className="p-4 text-blue-600 font-mono text-sm">
                            <a href={`tel:${booking.phone_number}`} className="hover:underline flex items-center gap-1">
                                {booking.phone_number}
                            </a>
                        </td>
                        <td className="p-4 text-slate-700">{booking.car_model}</td>
                        <td className="p-4">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase inline-block shadow-sm">
                                {booking.service_type}
                            </span>
                        </td>
                         <td className="p-4">
                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold uppercase inline-block shadow-sm">
                                {booking.status || 'Pending'}
                            </span>
                        </td>
                    </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}