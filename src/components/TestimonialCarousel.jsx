import { useState, useEffect, useRef } from 'react';

export default function TestimonialCarousel({ testimonials }) {
  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

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

  const getGapSize = () => {
    if (typeof window === 'undefined') return 1.5;
    return window.innerWidth < 768 ? 1 : 1.5;
  };

  const getTransform = () => {
    if (isDesktop) {
      return `translateX(calc(-${offset * (100 / 3)}% - ${offset * 1}rem))`;
    }
    return `translateX(calc(-${offset * 100}% - ${offset * getGapSize()}rem))`;
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-4 md:gap-8">
        <button
          onClick={goToPrevious}
          className="hidden lg:flex w-12 h-12 md:w-14 md:h-14 items-center justify-center rounded-full transition-colors shadow-lg flex-shrink-0"
          style={{ backgroundColor: '#6B63B5' }}
          aria-label="Previous testimonials"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex-1 overflow-hidden" ref={containerRef}>
          <div
            className="flex gap-4 md:gap-6"
            style={{
              transform: getTransform(),
              transition: isTransitioning ? 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
            }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="relative flex-shrink-0 pt-12"
                style={{
                  width: isDesktop ? 'calc(33.333% - 1rem)' : '100%',
                  minWidth: isDesktop ? 'calc(33.333% - 1rem)' : '100%'
                }}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 z-20">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 md:border-4 border-white shadow-xl">
                    <img
                      src={testimonial.image || 'https://via.placeholder.com/160'}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div
                  className="rounded-2xl md:rounded-3xl shadow-lg px-4 sm:px-6 lg:px-8 pt-14 md:pt-[64px] pb-5 md:pb-6 relative flex flex-col h-full"
                  style={{ backgroundColor: '#E9ECFE', minHeight: '240px' }}
                >
                  <div className="absolute left-4 sm:left-6 top-4 sm:top-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9B8FD9' }}>
                      <svg
                        className="w-6 h-6 md:w-7 md:h-7 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <h3 className="font-bold mb-1 text-sm md:text-base" style={{ color: '#1a202c' }}>
                      {testimonial.name}
                    </h3>
                    <p className="mb-3 md:mb-4 text-xs md:text-sm" style={{ color: '#4a5568' }}>
                      {testimonial.role}
                    </p>

                    <blockquote className="leading-relaxed flex-1 text-xs md:text-sm" style={{ color: '#1a202c' }}>
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex lg:hidden justify-center gap-3 mt-6 md:mt-8">
            <button
              onClick={goToPrevious}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full transition-colors shadow-md"
              style={{ backgroundColor: '#6B63B5' }}
              aria-label="Previous testimonials"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full transition-colors shadow-md"
              style={{ backgroundColor: '#6B63B5' }}
              aria-label="Next testimonials"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <button
          onClick={goToNext}
          className="hidden lg:flex w-12 h-12 md:w-14 md:h-14 items-center justify-center rounded-full transition-colors shadow-lg flex-shrink-0"
          style={{ backgroundColor: '#6B63B5' }}
          aria-label="Next testimonials"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
