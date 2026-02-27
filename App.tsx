
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { UserRole, Complaint, ComplaintStatus, User, Message } from './types';
import { api } from './services/apiService';

// Mock Agents for Admin Assignment
const MOCK_AGENTS: User[] = [
  { id: 'agent-1', name: 'Sarah Miller', email: 'sarah@reslovenow.com', role: UserRole.AGENT },
  { id: 'agent-2', name: 'David Chen', email: 'david@reslovenow.com', role: UserRole.AGENT },
];

// Views
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SubmitComplaint from './components/SubmitComplaint';
import ComplaintDetail from './components/ComplaintDetail';

// Protected Route Wrapper
const ProtectedRoute = ({ children, user, requiredRole }: { children: React.ReactNode, user: User | null, requiredRole?: UserRole }) => {
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== UserRole.ADMIN) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComplaints = async () => {
    if (!currentUser) return;
    const query = currentUser.role === UserRole.USER ? { userId: currentUser.id } : 
                  currentUser.role === UserRole.AGENT ? { assignedAgentId: currentUser.id } : {};
    const data = await api.getComplaints(query);
    setComplaints(data);
  };

  useEffect(() => {
    const saved = localStorage.getItem('reslovenow_user');
    if (saved) setCurrentUser(JSON.parse(saved));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (currentUser) fetchComplaints();
  }, [currentUser]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('reslovenow_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('reslovenow_user');
    setComplaints([]);
  };

  const handleAddComplaint = async (data: any) => {
    await api.createComplaint(data);
    await fetchComplaints();
  };

  const handleUpdateStatus = async (id: string, status: ComplaintStatus, agent?: User) => {
    await api.updateComplaintStatus(id, status, agent);
    await fetchComplaints();
  };

  const handleSendMessage = async (complaintId: string, text: string) => {
    if (!currentUser) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text,
      timestamp: new Date().toISOString()
    };
    await api.sendMessage(complaintId, newMessage);
    await fetchComplaints();
  };

  if (isLoading) return <div className="flex items-center justify-center h-screen bg-[#b0bbc5] font-medium text-slate-600">Loading ComplaintCare...</div>;

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <nav className="bg-[#1c2226] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-medium text-white tracking-wide">ComplaintCare</span>
              </Link>
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-sm font-normal text-white hover:opacity-80 transition">Home</Link>
                {currentUser ? (
                  <>
                    <Link to="/dashboard" className="text-sm font-normal text-white hover:opacity-80 transition">Dashboard</Link>
                    <button onClick={handleLogout} className="text-sm font-normal text-white hover:text-red-400 transition">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="text-sm font-normal text-white hover:opacity-80 transition">SignUp</Link>
                    <Link to="/login" className="text-sm font-normal text-white hover:opacity-80 transition">Login</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage currentUser={currentUser} onLogin={handleLogin} />} />
            <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} initialMode="login" />} />
            <Route path="/register" element={currentUser ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} initialMode="register" />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute user={currentUser}>
                <Dashboard user={currentUser!} complaints={complaints} />
              </ProtectedRoute>
            } />
            
            <Route path="/submit" element={
              <ProtectedRoute user={currentUser} requiredRole={UserRole.USER}>
                <SubmitComplaint onSubmit={handleAddComplaint} user={currentUser!} />
              </ProtectedRoute>
            } />
            
            <Route path="/complaint/:id" element={
              <ProtectedRoute user={currentUser}>
                <ComplaintDetail 
                  user={currentUser!} 
                  complaints={complaints} 
                  onUpdateStatus={handleUpdateStatus}
                  onSendMessage={handleSendMessage}
                  agents={MOCK_AGENTS}
                />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-slate-200 py-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
             <div className="flex justify-center space-x-8 mb-4 text-slate-400">
                <span className="text-xs uppercase font-bold tracking-widest">Enterprise Support</span>
                <span className="text-xs uppercase font-bold tracking-widest">Secure Handling</span>
                <span className="text-xs uppercase font-bold tracking-widest">Efficient Resolution</span>
             </div>
             <p className="text-slate-400 text-sm font-medium">© 2024 ComplaintCare. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
