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
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`rounded-lg overflow-hidden transition-all ${
            openIndex === index ? 'bg-white shadow-lg' : 'bg-gray-100'
          }`}
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between transition-colors"
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-brand-navy text-lg pr-4">
              {faq.question}
            </span>
            {openIndex === index ? (
              <svg
                className="w-6 h-6 text-brand-navy flex-shrink-0"
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
                className="w-6 h-6 text-brand-navy flex-shrink-0"
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
              openIndex === index ? 'max-h-[800px]' : 'max-h-0'
            }`}
          >
            <div className="px-6 pb-5 text-brand-slate leading-relaxed whitespace-pre-line">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
