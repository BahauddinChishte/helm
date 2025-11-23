import { useState, useEffect } from 'react';

export default function TestimonialCarousel({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const cardsPerView = 3;

  useEffect(() => {
    if (!isAutoPlaying || !testimonials?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + cardsPerView;
        return nextIndex >= testimonials.length ? 0 : nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - cardsPerView;
      return newIndex < 0 ? Math.max(0, testimonials.length - cardsPerView) : newIndex;
    });
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + cardsPerView;
      return nextIndex >= testimonials.length ? 0 : nextIndex;
    });
    setIsAutoPlaying(false);
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
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

        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={currentIndex + index}
                className="rounded-3xl shadow-lg p-6 lg:p-8 relative flex flex-col"
                style={{ backgroundColor: '#E9ECFE', minHeight: '400px' }}
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

                <div className="flex flex-col items-center text-center pt-2">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                    <img
                      src={testimonial.image || 'https://via.placeholder.com/160'}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-bold text-xl lg:text-2xl mb-1" style={{ color: '#1a202c' }}>
                    {testimonial.name}
                  </h3>
                  <p className="text-sm lg:text-base mb-6" style={{ color: '#4a5568' }}>
                    {testimonial.role}
                  </p>

                  <blockquote className="text-base lg:text-lg leading-relaxed flex-1" style={{ color: '#1a202c' }}>
                    "{testimonial.quote}"
                  </blockquote>
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
