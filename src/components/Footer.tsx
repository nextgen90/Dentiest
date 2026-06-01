import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div>
          <div className="text-3xl font-display font-bold flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
              <span className="text-2xl">+</span>
            </div>
            <span className="text-white tracking-tight">ApexDental</span>
          </div>
          <p className="text-slate-400 text-base leading-relaxed mb-8">
            Providing world-class, comprehensive dental care in a state-of-the-art facility. Your smile is our top priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-xl mb-6 text-white">Quick Links</h4>
          <ul className="space-y-4">
            {['Home', 'Services', 'Patient Gallery', 'Blog', 'Patient Portal'].map((link, idx) => (
              <li key={idx}>
                <a href="#" className="text-slate-400 hover:text-secondary transition-colors text-base font-medium">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-xl mb-6 text-white">Contact Us</h4>
          <ul className="space-y-5">
            <li className="flex items-start gap-4 text-base text-slate-400">
              <MapPin size={20} className="text-secondary shrink-0 mt-0.5" />
              <span>123 Medical Center Blvd, Suite 400<br/>New York, NY 10001</span>
            </li>
            <li className="flex items-center gap-4 text-base text-slate-400">
              <Phone size={20} className="text-secondary shrink-0" />
              <span>1-800-DENTIST</span>
            </li>
            <li className="flex items-center gap-4 text-base text-slate-400">
              <Mail size={20} className="text-secondary shrink-0" />
              <span>care@apexdental.com</span>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-bold text-xl mb-6 text-white">Office Hours</h4>
          <ul className="space-y-4 text-base text-slate-400">
            <li className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="flex items-center gap-3"><Clock size={18} className="text-secondary" /> Mon - Thu</span>
              <span className="font-medium text-white">8:00 AM - 6:00 PM</span>
            </li>
            <li className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="flex items-center gap-3"><Clock size={18} className="text-secondary" /> Friday</span>
              <span className="font-medium text-white">8:00 AM - 4:00 PM</span>
            </li>
            <li className="flex items-center justify-between pb-3">
              <span className="flex items-center gap-3"><Clock size={18} className="text-secondary" /> Weekend</span>
              <span className="font-medium text-white">Emergency Only</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} Apex Dental Clinic. All rights reserved.
        </p>
        <div className="flex gap-8 text-sm text-slate-500 font-medium">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <NavLink to="/admin" className="hover:text-white transition-colors">Admin Login</NavLink>
        </div>
      </div>
    </footer>
  );
};
