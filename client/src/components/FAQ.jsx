import React, { useState } from "react";
import { gs } from "../style/glassUi";

const faqData = [
  {
    id: 1,
    question: "What is Tailwind CSS?",
    answer:
      "Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.",
  },
  {
    id: 2,
    question: "What's new in Tailwind CSS v4.0?",
    answer:
      "Tailwind CSS v4.0 introduces lightning-fast build times, simplified configuration, improved developer experience, and enhanced customization options.",
  },
  {
    id: 3,
    question: "How do I install Tailwind CSS?",
    answer:
      "You can install Tailwind CSS via npm by running 'npm install -D tailwindcss' and then initializing it with 'npx tailwindcss init'.",
  },
  {
    id: 4,
    question: "Is Tailwind CSS compatible with React?",
    answer:
      "Yes, Tailwind CSS works perfectly with React and other JavaScript frameworks. You can use Tailwind's utility classes directly in your JSX elements.",
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState(null);
  const [expandAll, setExpandAll] = useState(false);

  const toggleItem = (id) => {
    if (expandAll) setExpandAll(false);
    setOpenId((prev) => (prev === id ? null : id));
  };

  const toggleExpandAll = () => {
    const newExpandAll = !expandAll;
    setExpandAll(newExpandAll);
    if (!newExpandAll) setOpenId(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* title */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-200">
          Frequently Asked Questions
        </h2>

        <button
          onClick={toggleExpandAll}
          className={`${gs.glass} px-4 py-2 text-sm font-medium text-gray-200 rounded-2xl cursor-pointer`}
        >
          {expandAll ? "Collapse All" : "Expand All"}
        </button>
      </div>

      {/* FAQ list */}
      <div className=" rounded-xl shadow-md overflow-hidden">
        {faqData.map((item, index) => (
          <FAQItem
            key={item.id}
            item={item}
            isOpen={expandAll || openId === item.id}
            onClick={() => toggleItem(item.id)}
            isLast={index === faqData.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ item, isOpen, onClick, isLast }) => {
  return (
    <div className={`${!isLast ? "" : "rounded-b-2xl"}`}>
      {/* questions */}
      <button
        className={`${gs.glassCard} w-full py-5 px-6 flex justify-between items-center text-left `}
        onClick={onClick}
      >
        <span className="text-lg font-medium text-gray-200 pr-4">
          {item.question}
        </span>

        {/* expand/collapse */}
        <div
          className={`${gs.glass} shrink-0 w-8 h-8 flex items-center justify-center rounded-full`}
        >
          <span className="text-gray-200 text-xl font-bold">
            {isOpen ? "−" : "+"}
          </span>
        </div>
      </button>

      {/* answer */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 py-5 text-gray-100 leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
