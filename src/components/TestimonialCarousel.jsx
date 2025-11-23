import { useState, useEffect } from 'react';

export default function TestimonialCarousel({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || !testimonials?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="rounded-3xl shadow-lg p-8 md:p-12 relative" style={{ backgroundColor: '#E9ECFE' }}>
        <div className="absolute left-8 top-8">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9B8FD9' }}>
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col items-center text-center pt-4 md:pt-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 md:mb-8 border-4 border-white shadow-lg">
            <img
              src={currentTestimonial.image || 'https://via.placeholder.com/160'}
              alt={currentTestimonial.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="font-bold text-2xl md:text-3xl mb-2" style={{ color: '#1a202c' }}>
            {currentTestimonial.name}
          </h3>
          <p className="text-base md:text-lg mb-8 md:mb-10" style={{ color: '#4a5568' }}>
            {currentTestimonial.role} {currentTestimonial.company && currentTestimonial.company}
          </p>

          <blockquote className="text-lg md:text-2xl leading-relaxed max-w-2xl" style={{ color: '#1a202c' }}>
            "{currentTestimonial.quote}"
          </blockquote>
        </div>

        <div className="flex justify-center gap-3 mt-10 md:mt-12">
          <button
            onClick={goToPrevious}
            className="w-12 h-12 flex items-center justify-center bg-white hover:bg-brand-orange hover:text-white rounded-full transition-colors shadow-md"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="w-12 h-12 flex items-center justify-center bg-white hover:bg-brand-orange hover:text-white rounded-full transition-colors shadow-md"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-brand-orange'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
