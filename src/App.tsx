import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Services = React.lazy(() => import('./pages/Services'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Blog = React.lazy(() => import('./pages/Blog'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="w-full min-h-screen pt-24 flex flex-col"
        >
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </motion.div>
      </AnimatePresence>
      <ChatWidget />
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/*" element={
            <PublicLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/blog" element={<Blog />} />
              </Routes>
            </PublicLayout>
          } />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}
