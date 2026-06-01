import { Calendar, User } from 'lucide-react';
import blogInvisalignImg from '../assets/blog_invisalign.png';

const posts = [
  {
    id: 1,
    title: 'The Complete Guide to Invisalign: Is It Right for You?',
    excerpt: 'Discover everything you need to know about clear aligners, the process, the timeline, and whether you are a good candidate for this modern orthodontic solution.',
    date: 'Oct 12, 2023',
    author: 'Dr. Sarah Jenkins',
    category: 'Orthodontics',
    image: blogInvisalignImg
  },
  {
    id: 2,
    title: 'Dental Implants vs. Bridges: Making the Right Choice',
    excerpt: 'Missing a tooth? Learn the pros and cons of dental implants compared to traditional bridges, including longevity, cost, and bone health preservation.',
    date: 'Nov 05, 2023',
    author: 'Dr. Michael Chen',
    category: 'Restorative',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop'
  },
  {
    id: 3,
    title: '5 Secrets to Maintaining a Professional Teeth Whitening',
    excerpt: 'Just got your teeth professionally whitened? Follow these 5 crucial tips to ensure your bright smile lasts for years without fading.',
    date: 'Dec 18, 2023',
    author: 'Emily Rodriguez, RDH',
    category: 'Cosmetic',
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Blog() {
  return (
    <div className="w-full bg-surface pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text mb-6">
            Dental <span className="text-primary">Insights</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Stay informed with the latest tips, news, and advice from our expert dental team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="medical-card bg-white overflow-hidden flex flex-col cursor-pointer group">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-medium text-text-muted mb-4">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                </div>
                <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <span className="text-sm font-semibold text-primary">Read Article &rarr;</span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
