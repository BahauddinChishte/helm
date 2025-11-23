import { useState } from 'react';

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 md:space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`overflow-hidden transition-all rounded-lg md:rounded-none ${
            openIndex === index ? 'bg-white shadow-lg' : ''
          }`}
          style={{ backgroundColor: openIndex === index ? 'white' : '#E2E5EE' }}
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-4 py-3 sm:px-5 sm:py-4 md:px-6 text-left flex items-center justify-between transition-colors"
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-brand-navy pr-3 sm:pr-4 text-base sm:text-xl md:text-2xl lg:text-[26px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {faq.question}
            </span>
            {openIndex === index ? (
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-brand-navy flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-brand-navy flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            )}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-[1000px]' : 'max-h-0'
            }`}
          >
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6 text-brand-slate leading-relaxed whitespace-pre-line text-sm sm:text-base" style={{ lineHeight: '1.7', fontFamily: 'Montserrat, sans-serif' }}>
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
