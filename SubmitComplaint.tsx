
import React from 'react';
import { Link } from 'react-router-dom';
import { User, UserRole, Complaint, ComplaintStatus } from '../types';

interface DashboardProps {
  user: User;
  complaints: Complaint[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, complaints }) => {
  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === ComplaintStatus.PENDING).length,
    inProgress: complaints.filter(c => c.status === ComplaintStatus.IN_PROGRESS || c.status === ComplaintStatus.ASSIGNED).length,
    resolved: complaints.filter(c => c.status === ComplaintStatus.RESOLVED).length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 font-medium">Monitoring {complaints.length} records in your workspace.</p>
        </div>
        {user.role === UserRole.USER && (
          <Link to="/submit" className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center">
            <span className="text-xl mr-2">+</span> New Complaint
          </Link>
        )}
      </div>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Files', val: stats.total, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: '📂' },
          { label: 'Awaiting Action', val: stats.pending, color: 'text-amber-600', bg: 'bg-amber-50', icon: '⏳' },
          { label: 'In Progress', val: stats.inProgress, color: 'text-blue-600', bg: 'bg-blue-50', icon: '⚙️' },
          { label: 'Resolved', val: stats.resolved, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: '✅' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-20 h-20 ${s.bg} rounded-bl-[3rem] -mr-8 -mt-8 opacity-50 transition-all group-hover:scale-110`}></div>
            <div className="relative z-10">
              <div className="text-2xl mb-4">{s.icon}</div>
              <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{s.label}</div>
              <div className={`text-4xl font-black ${s.color}`}>{s.val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Table Card */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white/50">
          <h3 className="text-lg font-black text-slate-900">Recent Complaints</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Reference</th>
                <th className="px-8 py-5">Subject & Category</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Submission Date</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-300 italic font-medium">
                    No records found in this category.
                  </td>
                </tr>
              ) : (
                complaints.map(c => (
                  <tr key={c.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-8 py-6">
                      <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{c.id}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900">{c.title}</div>
                      <div className="text-xs text-indigo-500 font-bold mt-0.5">{c.category}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        c.status === ComplaintStatus.RESOLVED ? 'bg-emerald-100 text-emerald-700' :
                        c.status === ComplaintStatus.PENDING ? 'bg-amber-100 text-amber-700' :
                        'bg-indigo-100 text-indigo-700'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-slate-500">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link to={`/complaint/${c.id}`} className="inline-flex items-center px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors">
                        Manage
                      </Link>
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
};

export default Dashboard;
