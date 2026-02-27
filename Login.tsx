
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';
import Login from './Login';

interface LandingPageProps {
  currentUser: User | null;
  onLogin: (user: User) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ currentUser, onLogin }) => {
  return (
    <div className="bg-[#b0bbc5]">
      {/* Hero Section - Exactly matching requested layout and image */}
      <section className="min-h-[90vh] flex items-center px-6 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Accurate SVG Illustration based on the provided screenshot */}
          <div className="relative order-2 lg:order-1 flex justify-center">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background Main Circle */}
              <circle cx="280" cy="350" r="230" fill="white" />
              
              {/* Left Side Folder Stack */}
              <g transform="translate(40, 230)">
                {[0, 1, 2, 3, 4].map(i => (
                  <path key={i} d={`M0 ${i*35} L0 ${i*35 + 25} L65 ${i*35 + 25} L65 ${i*35 + 5} L50 ${i*35} Z`} fill="#f39c12" transform="scale(1.1)" />
                ))}
              </g>

              {/* Background Clipboard */}
              <rect x="320" y="180" width="180" height="250" rx="10" fill="#a29bfe" />
              <rect x="330" y="190" width="160" height="230" rx="4" fill="white" />
              <rect x="370" y="170" width="80" height="20" rx="5" fill="#74b9ff" />
              <g transform="translate(350, 215)">
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                  <rect key={i} x="0" y={i*30} width={i % 2 === 0 ? "120" : "80"} height="6" rx="3" fill="#dfe6e9" />
                ))}
              </g>

              {/* Character Illustration */}
              <g transform="translate(200, 310)">
                {/* Body - Teal/Blue shirt */}
                <path d="M40 250 L160 250 L150 120 C150 70 50 70 50 120 Z" fill="#48dbfb" />
                {/* Face */}
                <circle cx="100" cy="80" r="50" fill="#ffdbac" />
                {/* Hair - Dark */}
                <path d="M50 80 C50 20 150 20 150 80 L150 110 L50 110 Z" fill="#2d3436" />
                {/* Eyes & Smile */}
                <circle cx="85" cy="85" r="3" fill="#2d3436" />
                <circle cx="115" cy="85" r="3" fill="#2d3436" />
                <path d="M90 105 Q100 115 110 105" stroke="#2d3436" strokeWidth="2.5" fill="none" />
                {/* Headphones */}
                <path d="M45 80 Q45 20 100 20 Q155 20 155 80" stroke="#2d3436" strokeWidth="9" fill="none" />
                <rect x="35" y="70" width="16" height="32" rx="5" fill="#5f27cd" />
                <rect x="149" y="70" width="16" height="32" rx="5" fill="#5f27cd" />
                {/* Mic wire */}
                <path d="M40 85 Q20 120 40 145" stroke="#2d3436" strokeWidth="3" fill="none" />
              </g>

              {/* Icons Floating Around */}
              {/* Message Bubble Icon (Purple) */}
              <g transform="translate(180, 350)">
                <rect width="45" height="35" rx="12" fill="#a29bfe" />
                <circle cx="15" cy="18" r="3" fill="white" />
                <circle cx="30" cy="18" r="3" fill="white" />
              </g>
              {/* Heart Icon (Pinkish) */}
              <path d="M280 480 Q290 460 310 480 Q320 495 300 515 Q280 495 290 480" fill="#fab1a0" transform="translate(30, 0)" />
              {/* Mail Icon (Grey/White) */}
              <rect x="250" y="325" width="35" height="22" rx="4" fill="#dfe6e9" />
              <path d="M250 325 L267.5 338 L285 325" stroke="white" strokeWidth="2.5" fill="none" />
              
              {/* Large Yellow Speech Bubble with Text Lines */}
              <g transform="translate(350, 465)">
                <rect width="190" height="90" rx="45" fill="#feca57" />
                <rect x="35" y="30" width="130" height="7" rx="3.5" fill="white" />
                <rect x="35" y="45" width="130" height="7" rx="3.5" fill="white" />
                <rect x="35" y="60" width="80" height="7" rx="3.5" fill="white" />
              </g>

              {/* Plant in Pot */}
              <g transform="translate(430, 525)">
                <rect x="10" y="45" width="45" height="55" fill="#f39c12" />
                <path d="M-10 45 Q30 -10 70 45" fill="#48dbfb" />
                <path d="M5 35 Q30 -20 55 35" fill="#00d2d3" />
              </g>

              {/* Laptop & Workspace */}
              <g transform="translate(140, 535)">
                <rect width="200" height="110" rx="12" fill="#ecf0f1" />
                <rect x="15" y="15" width="170" height="70" rx="5" fill="white" />
                <circle cx="100" cy="95" r="6" fill="#bdc3c7" />
              </g>
              
              {/* Small Coffee Mug */}
              <g transform="translate(410, 570)">
                 <rect width="35" height="45" rx="6" fill="#a29bfe" />
                 <path d="M35 12 Q48 12 48 22 Q48 32 35 32" stroke="#a29bfe" strokeWidth="5" fill="none" />
              </g>
            </svg>
          </div>

          {/* Right Side: Headline and CTA precisely as shown in image */}
          <div className="text-left order-1 lg:order-2">
            <h1 className="text-5xl lg:text-7xl font-semibold text-[#2d3436] mb-8 leading-tight">
              Empower Your Team,
            </h1>
            <p className="text-2xl lg:text-3xl text-[#2d3436] opacity-90 mb-12 max-w-xl leading-snug">
              Exceed Customer Expectations: Discover our Complaint Management Solution
            </p>
            <div className="flex">
              <Link 
                to={currentUser ? "/submit" : "/register"} 
                className="bg-[#2563eb] text-white px-10 py-4 rounded-md font-medium text-xl hover:bg-blue-700 transition-all shadow-xl active:scale-95"
              >
                Register your Complaint
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Simplified Footer without tech stack names as requested */}
      <section className="py-12 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center space-x-2">
              <span className="font-medium text-[#2d3436] text-2xl tracking-tight">ComplaintCare</span>
           </div>
           <div className="flex space-x-12">
              <a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition">Compliance</a>
              <a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition">Privacy</a>
              <a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition">SLA</a>
           </div>
           <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Enterprise Ready Platform</div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
