import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Menu, X } from 'lucide-react';
import { BookingModal } from './BookingModal';
import { useModalStore } from '../store';

const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'Services', path: '/services' },
  { title: 'Gallery', path: '/gallery' },
  { title: 'Blog', path: '/blog' },
];

export const Header: React.FC = () => {
  const { isBookingOpen, openBooking, closeBooking } = useModalStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-slate-900 shadow-xl py-4' : 'bg-slate-900/95 backdrop-blur-md py-6'
        } top-0`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <NavLink to="/" className="text-3xl font-display font-bold flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
              <span className="text-2xl">+</span>
            </div>
            <span className="text-white tracking-tight">ApexDental</span>
          </NavLink>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                className={({ isActive }) => 
                  `text-base font-medium transition-colors hover:text-secondary ${
                    isActive ? 'text-secondary border-b-2 border-secondary' : 'text-slate-300'
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button 
            onClick={openBooking}
            className="hidden md:flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl text-base font-bold hover:bg-secondary transition-colors shadow-lg hover:shadow-primary/30"
          >
            <Calendar size={16} />
            Book Appointment
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 shadow-2xl border-t border-slate-800 p-6 flex flex-col gap-6">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-white hover:text-secondary p-2"
              >
                {link.title}
              </NavLink>
            ))}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                openBooking();
              }}
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold w-full mt-2"
            >
              <Calendar size={16} />
              Book Appointment
            </button>
          </div>
        )}
      </header>
      
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </>
  );
};
