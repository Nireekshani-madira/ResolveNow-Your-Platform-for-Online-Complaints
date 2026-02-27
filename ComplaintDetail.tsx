
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Complaint } from '../types';

interface SubmitComplaintProps {
  onSubmit: (comp: Omit<Complaint, 'id' | 'createdAt' | 'status' | 'messages' | 'aiSummary'>) => Promise<void>;
  user: User;
}

const CATEGORIES = [
  "Electronics & Tech",
  "Household Appliances",
  "Financial Services",
  "Health & Wellness",
  "Public Utilities",
  "Other"
];

const SubmitComplaint: React.FC<SubmitComplaintProps> = ({ onSubmit, user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: CATEGORIES[0],
    description: '',
    address: '',
    productDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        userId: user.id,
        userName: user.name,
      });
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-slate-900 mb-4">Register Complaint</h2>
        <p className="text-slate-500">Please provide all necessary details for a faster resolution.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Complaint Title</label>
              <input 
                required
                type="text" 
                placeholder="Brief summary of the issue"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
              <select 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Purchase/Service Date</label>
              <input 
                required
                type="date" 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                value={formData.productDate}
                onChange={e => setFormData({...formData, productDate: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Location/Address</label>
              <input 
                required
                type="text" 
                placeholder="Where did this occur?"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Issue Description</label>
              <textarea 
                required
                rows={6}
                placeholder="Detailed explanation of the problem..."
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="text-slate-400 font-bold hover:text-slate-600 transition"
          >
            Go Back
          </button>
          <button 
            type="submit"
            disabled={loading}
            className={`px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center space-x-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>AI Processing...</span>
              </>
            ) : (
              <span>Submit Complaint</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitComplaint;
