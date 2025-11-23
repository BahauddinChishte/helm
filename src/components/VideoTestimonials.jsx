import { useState } from 'react';

export default function VideoTestimonials({ testimonials }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideo = (testimonial) => {
    setSelectedVideo(testimonial);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <section className="w-full py-20" style={{ backgroundColor: '#343A5A' }}>
        <div className="w-full px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex flex-col items-center text-center">
                <button
                  onClick={() => openVideo(testimonial)}
                  className="relative group mb-6 cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-orange/50 rounded-full"
                  aria-label={`Play video testimonial from ${testimonial.name}`}
                >
                  <div className="relative w-64 h-64 rounded-full overflow-hidden">
                    <img
                      src={testimonial.thumbnail}
                      alt={testimonial.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-10 h-10 text-brand-orange ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </button>

                <div className="mb-4">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {testimonial.name}
                  </h3>
                  <p className="text-white text-base mb-1">
                    {testimonial.title}
                  </p>
                  <a
                    href={testimonial.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-orange hover:text-orange-400 transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    {testimonial.website}
                  </a>
                </div>

                <p className="text-white text-base italic leading-relaxed max-w-sm">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={selectedVideo.videoUrl}
              title={`Video testimonial from ${selectedVideo.name}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
