import blogInvisalignImg from '../assets/blog_invisalign.png';

const images = [
  { id: 0, url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop", title: 'Smile Makeover' },
  { id: 1, url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop', title: 'Modern Reception', category: 'Facility' },
  { id: 2, url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop", title: 'Dental Implants' },
  { id: 3, url: blogInvisalignImg, title: 'Invisalign Treatment' },
  { id: 4, url: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=1974&auto=format&fit=crop", title: 'Teeth Whitening' },
  { id: 5, url: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop", title: 'Full Restoration' },
];

const videos = [
  { id: 1, title: 'Invisalign Process', url: 'https://Dentiest.b-cdn.net/InShot_20260601_133149137.mp4' },
  { id: 2, title: 'Implant Surgery Walkthrough', url: 'https://Dentiest.b-cdn.net/InShot_20260601_133335648.mp4' },
  { id: 3, title: 'Clinic Tour', url: 'https://Dentiest.b-cdn.net/InShot_20260601_133514488.mp4' },
];

export default function Gallery() {
  return (
    <div className="w-full bg-surface pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text mb-6">
            Patient <span className="text-primary">Success Stories</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            See the transformative results of our advanced dental treatments. Real patients, real confidence.
          </p>
        </div>

        {/* Photo Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {images.map((img) => (
            <div key={img.id} className="medical-card bg-white overflow-hidden group cursor-pointer border border-border">
              <div className="aspect-[4/3] overflow-hidden relative bg-slate-100">
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text mb-2">{img.title}</h3>
                <p className="text-sm text-text-muted">Case Study {img.id + 1}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Showcase Section */}
        <div className="border-t border-border pt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-text mb-4">
              Treatment <span className="text-primary">Video Showcase</span>
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Watch our detailed walkthroughs of procedures and get a behind-the-scenes look at our clinic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="medical-card bg-white overflow-hidden border border-border">
                <div className="aspect-video bg-slate-900 relative">
                  <video 
                    src={video.url}
                    className="w-full h-full"
                    controls
                    controlsList="nodownload"
                    playsInline
                    preload="metadata"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-text">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
