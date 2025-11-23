import { useState, useEffect, useRef } from 'react';

export default function TestimonialCarousel({ testimonials }) {
  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const containerRef = useRef(null);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setOffset((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (offset >= testimonials.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setOffset(0);
      }, 800);
    }
  }, [offset, testimonials.length]);

  const goToPrevious = () => {
    setIsTransitioning(true);
    setOffset((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setOffset((prev) => prev + 1);
  };

  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="flex items-center gap-8">
        <button
          onClick={goToPrevious}
          className="hidden lg:flex w-14 h-14 items-center justify-center rounded-full transition-colors shadow-lg flex-shrink-0"
          style={{ backgroundColor: '#6B63B5' }}
          aria-label="Previous testimonials"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex-1 overflow-hidden" ref={containerRef}>
          <div
            className="flex gap-6"
            style={{
              transform: `translateX(calc(-${offset * (100 / 3)}% - ${offset * 1.5}rem))`,
              transition: isTransitioning ? 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
            }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="relative flex-shrink-0 pt-12"
                style={{ width: 'calc(33.333% - 1rem)' }}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 z-20">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={testimonial.image || 'https://via.placeholder.com/160'}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div
                  className="rounded-3xl shadow-lg px-6 lg:px-8 pt-[64px] pb-6 relative flex flex-col h-full"
                  style={{ backgroundColor: '#E9ECFE', minHeight: '280px' }}
                >
                  <div className="absolute left-6 top-6">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9B8FD9' }}>
                      <svg
                        className="w-7 h-7 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <h3 className="font-bold mb-1" style={{ color: '#1a202c', fontSize: '16px' }}>
                      {testimonial.name}
                    </h3>
                    <p className="mb-4" style={{ color: '#4a5568', fontSize: '13px' }}>
                      {testimonial.role}
                    </p>

                    <blockquote className="leading-relaxed flex-1" style={{ color: '#1a202c', fontSize: '14px' }}>
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex lg:hidden justify-center gap-3 mt-8">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 flex items-center justify-center rounded-full transition-colors shadow-md"
              style={{ backgroundColor: '#6B63B5' }}
              aria-label="Previous testimonials"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 flex items-center justify-center rounded-full transition-colors shadow-md"
              style={{ backgroundColor: '#6B63B5' }}
              aria-label="Next testimonials"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <button
          onClick={goToNext}
          className="hidden lg:flex w-14 h-14 items-center justify-center rounded-full transition-colors shadow-lg flex-shrink-0"
          style={{ backgroundColor: '#6B63B5' }}
          aria-label="Next testimonials"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
