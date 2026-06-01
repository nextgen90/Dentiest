import { useEffect, useState } from 'react';
import { Calendar, Phone, Mail, Clock, RefreshCw, BarChart3, Users, FileText } from 'lucide-react';

interface Appointment {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string | null;
  service: string;
  notes: string | null;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authForm, setAuthForm] = useState({ id: '', password: '' });
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authForm.id === 'apple' && authForm.password === 'apple@123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleStatusUpdate = (id: number, newStatus: string) => {
    // In a real app, this would be an API call: await fetch(`/api/appointments/${id}`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) })
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt));
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-surface flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-border w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-text mb-2">Admin Login</h1>
            <p className="text-text-muted text-sm">Please enter your credentials to access the dashboard.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Admin ID</label>
              <input 
                type="text" 
                value={authForm.id}
                onChange={e => setAuthForm({...authForm, id: e.target.value})}
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                value={authForm.password}
                onChange={e => setAuthForm({...authForm, password: e.target.value})}
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition-colors mt-4">
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const totalAppointments = appointments.length;
  const recentAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.createdAt);
    const now = new Date();
    return (now.getTime() - aptDate.getTime()) < 7 * 24 * 60 * 60 * 1000;
  }).length;
  
  const servicesCount = appointments.reduce((acc, apt) => {
    acc[apt.service] = (acc[apt.service] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topService = Object.keys(servicesCount).length > 0 
    ? Object.keys(servicesCount).reduce((a, b) => servicesCount[a] > servicesCount[b] ? a : b)
    : 'None';

  return (
    <div className="w-full min-h-screen bg-surface pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold text-text">Clinic Dashboard</h1>
            <p className="text-text-muted mt-1">Manage patient consultation requests and view real-time analytics.</p>
          </div>
          <button 
            onClick={fetchAppointments}
            className="flex items-center gap-2 bg-white border border-border px-4 py-2 rounded-lg hover:bg-surface transition-colors text-sm font-medium text-text shadow-sm"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin text-primary' : 'text-text-muted'} />
            Refresh
          </button>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-text-muted font-bold uppercase tracking-wider">Total Patients</p>
              <h3 className="text-2xl font-bold text-text">{totalAppointments}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-text-muted font-bold uppercase tracking-wider">New This Week</p>
              <h3 className="text-2xl font-bold text-text">{recentAppointments}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center">
              <BarChart3 size={24} />
            </div>
            <div>
              <p className="text-sm text-text-muted font-bold uppercase tracking-wider">Top Service</p>
              <h3 className="text-lg font-bold text-text truncate max-w-[150px]">{topService}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-border text-sm text-text-muted">
                  <th className="p-4 font-semibold">Patient</th>
                  <th className="p-4 font-semibold">Contact</th>
                  <th className="p-4 font-semibold">Service Requested</th>
                  <th className="p-4 font-semibold">Date & Time</th>
                  <th className="p-4 font-semibold">Submitted On</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading && appointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-text-muted">Loading records...</td>
                  </tr>
                ) : appointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-text-muted">No appointments found.</td>
                  </tr>
                ) : (
                  appointments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((apt) => (
                    <tr key={apt.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {apt.name.charAt(0)}
                          </div>
                          <span className="font-medium text-text">{apt.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1 text-xs text-text-muted">
                          <span className="flex items-center gap-1"><Phone size={12}/> {apt.phone}</span>
                          <span className="flex items-center gap-1"><Mail size={12}/> {apt.email}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-xs font-semibold border border-primary/10">
                          {apt.service}
                        </span>
                        {apt.notes && <p className="text-xs text-text-muted mt-2 max-w-xs truncate" title={apt.notes}>Note: {apt.notes}</p>}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1 text-text-muted">
                          <span className="flex items-center gap-2"><Calendar size={14} /> {new Date(apt.date).toLocaleDateString()}</span>
                          <span className="flex items-center gap-2"><Clock size={14} /> {apt.time || 'No time set'}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="flex items-center gap-1 text-text-muted text-xs">
                          <FileText size={14} /> {new Date(apt.createdAt).toLocaleDateString()}
                        </span>
                        <div className="mt-2 flex items-center gap-1">
                           <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                             apt.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                             apt.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                             'bg-yellow-100 text-yellow-700'
                           }`}>
                             {apt.status || 'Pending'}
                           </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleStatusUpdate(apt.id, 'Approved')}
                            className="bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 px-3 py-1.5 rounded text-xs font-bold transition-colors"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(apt.id, 'Rejected')}
                            className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded text-xs font-bold transition-colors"
                          >
                            Reject
                          </button>
                        </div>
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
