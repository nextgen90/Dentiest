import { Stethoscope, Activity, Sparkles, Smile } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import heroImg1 from '../assets/hero_dental_clinic.png';
import blogInvisalignImg from '../assets/blog_invisalign.png';
import heroImg2 from '../assets/hero_dental_2.png';

const services = [
  {
    icon: <Sparkles size={28} className="text-primary" />,
    title: 'Cosmetic Dentistry',
    description: 'Professional teeth whitening, porcelain veneers, and complete smile makeovers to boost your confidence.',
    image: heroImg1
  },
  {
    icon: <Activity size={28} className="text-primary" />,
    title: 'Dental Implants',
    description: 'Permanent, natural-looking tooth replacements using advanced titanium implants and 3D guided surgery.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop'
  },
  {
    icon: <Smile size={28} className="text-primary" />,
    title: 'Invisalign & Orthodontics',
    description: 'Discreet clear aligners to straighten your teeth without the hassle of traditional metal braces.',
    image: blogInvisalignImg
  },
  {
    icon: <Stethoscope size={28} className="text-primary" />,
    title: 'Preventative Care',
    description: 'Routine exams, digital x-rays, and professional cleanings to maintain optimal oral health.',
    image: heroImg2
  }
];

export default function Services() {
  return (
    <div className="w-full bg-surface pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text mb-6">
            Comprehensive <span className="text-primary">Dental Services</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            From routine checkups to full mouth restorations, our team provides state-of-the-art care tailored to your unique needs.
          </p>
        </div>

        <div className="space-y-12">
          {services.map((service, idx) => (
            <div key={idx} className={`medical-card overflow-hidden flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} bg-white`}>
              
              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h2 className="text-3xl font-bold text-text mb-4">{service.title}</h2>
                <p className="text-text-muted leading-relaxed text-lg mb-8">{service.description}</p>
                <div>
                  <NavLink to="/blog" className="inline-flex text-sm font-semibold text-primary hover:text-secondary transition-colors items-center gap-2">
                    Learn More &rarr;
                  </NavLink>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
