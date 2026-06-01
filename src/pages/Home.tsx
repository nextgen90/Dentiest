import { useState, useEffect } from 'react';
import { ShieldCheck, Star, Clock, Calendar, CheckCircle2, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useModalStore } from '../store';
import { motion } from 'framer-motion';
import heroImg1 from '../assets/hero_dental_clinic.png';
import heroImg2 from '../assets/hero_dental_2.png';

const heroImages = [
  heroImg1,
  heroImg2,
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1974&auto=format&fit=crop"
];

const testimonials = [
  { name: "Sarah Jenkins", text: "Absolutely the best dental experience I've ever had. The staff is incredibly friendly and my veneers look completely natural." },
  { name: "Michael Chang", text: "I was terrified of the dentist for years until I found ApexDental. Their sedation options made my implant procedure a breeze." },
  { name: "Emily Rodriguez", text: "Clean, modern, and professional. Dr. Smith took the time to explain everything. Highly recommend for Invisalign!" },
  { name: "David Thompson", text: "Got a same-day crown done here. The technology they use is mind-blowing. Fast, painless, and perfect fit." },
  { name: "Jessica Lewis", text: "The teeth whitening results were immediate and amazing. The whole team made me feel so comfortable." },
  { name: "Robert Wilson", text: "Best pediatric dentist in town! My kids actually look forward to their checkups now." }
];

export default function Home() {
  const { openBooking } = useModalStore();
  const [currentImg, setCurrentImg] = useState(0);
  const [testiIndex, setTestiIndex] = useState(0);

  // Auto-sliding Hero Image
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto-sliding Testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestiIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextImg = () => setCurrentImg((prev) => (prev + 1) % heroImages.length);
  const prevImg = () => setCurrentImg((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="w-full bg-white pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-primary/5 pattern-dots pattern-primary pattern-bg-transparent pattern-size-4 pattern-opacity-10 z-0"></div>
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border shadow-sm text-sm font-semibold text-primary mb-6">
              <Star size={16} className="fill-secondary text-secondary" /> Rated 4.9/5 by 10,000+ Patients
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-extrabold text-text leading-tight mb-6 tracking-tight">
              Exceptional Care for a <br className="hidden md:block"/>
              <span className="primary-gradient-text">Healthy, Bright Smile</span>
            </h1>
            <p className="text-lg text-text-muted mb-8 max-w-xl mx-auto lg:mx-0">
              Experience world-class dentistry in a modern, comfortable environment. From routine cleanings to advanced implants, your oral health is our priority.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={openBooking}
                className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2"
              >
                <Calendar size={20} />
                Book Your Visit
              </button>
              <NavLink to="/services" className="w-full sm:w-auto bg-white text-text px-8 py-4 rounded-xl font-bold hover:bg-surface border border-border transition-all flex items-center justify-center">
                Explore Services
              </NavLink>
            </div>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-text-muted font-medium text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-accent" /> Accepts Major Insurance
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-accent" /> Emergency Care 24/7
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full relative"
          >
            <div className="absolute inset-0 bg-secondary/10 rounded-[2rem] transform translate-x-4 translate-y-4"></div>
            
            {/* Image Slider */}
            <div className="relative z-10 w-full h-[500px] rounded-[2rem] shadow-xl border-4 border-white overflow-hidden group">
              {heroImages.map((src, idx) => (
                <img 
                  key={idx}
                  src={src} 
                  alt="Professional Dental Care" 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentImg ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
              
              {/* Slider Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={prevImg} className="bg-white/80 backdrop-blur text-primary p-2 rounded-full hover:bg-white transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextImg} className="bg-white/80 backdrop-blur text-primary p-2 rounded-full hover:bg-white transition-colors">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            
            {/* Floating Trust Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-xl shadow-xl border border-border flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="font-bold text-text">Board Certified</p>
                <p className="text-xs text-text-muted">Master Dental Surgeons</p>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck size={32} className="text-primary" />,
                title: 'Advanced Technology',
                desc: 'We utilize state-of-the-art 3D imaging and painless laser dentistry for superior results.'
              },
              {
                icon: <Clock size={32} className="text-primary" />,
                title: 'Same-Day Treatments',
                desc: 'Crowns and emergency repairs completed in a single visit using our in-house lab.'
              },
              {
                icon: <Star size={32} className="text-primary" />,
                title: 'Comfort First Approach',
                desc: 'Enjoy a spa-like environment with sedation options for completely anxiety-free care.'
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="medical-card p-8 text-center group"
              >
                <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-text mb-3">{feature.title}</h3>
                <p className="text-text-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-text mb-4">Patient <span className="text-primary">Experiences</span></h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">Don't just take our word for it. Hear what our patients have to say about their transformations.</p>
          </div>

          <div className="relative overflow-hidden w-full pb-8">
            <div 
              className="flex transition-transform duration-700 ease-in-out items-stretch"
              style={{ transform: `translateX(-${testiIndex * (100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1))}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full shrink-0 px-3 md:w-1/2 lg:w-1/3">
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-sm flex flex-col justify-between h-full">
                    <div>
                      <Quote className="text-primary/20 mb-4" size={32} />
                      <p className="text-text-muted italic leading-relaxed text-sm lg:text-base">"{t.text}"</p>
                    </div>
                    <div className="mt-6 border-t border-border pt-4">
                      <h4 className="font-bold text-text">{t.name}</h4>
                      <div className="flex text-primary mt-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
