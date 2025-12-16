import React, { useState } from "react";
import { gs } from "../style/glassUi";
import { useTranslation } from "react-i18next";

const faqData = [
  {
    id: 1,
    question: "faq.question1",
    answer: "faq.answer1",
  },
  {
    id: 2,
    question: "faq.question2",
    answer: "faq.answer2",
  },
  {
    id: 3,
    question: "faq.question3",
    answer: "faq.answer3",
  },
  {
    id: 4,
    question: "faq.question4",
    answer: "faq.answer4",
  },
];

const FAQ = () => {
  const { t } = useTranslation();

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
    <div className="flex flex-col items-center px-4 py-12 mt-80">
      {/* title */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 max-w-4xl w-full">
        <h2 className="text-4xl sm:text-5xl font-medium text-gray-200 text-center sm:text-left">
          {t("faq.title")}
        </h2>

        <button
          onClick={toggleExpandAll}
          className="px-3 sm:px-5 py-2 text-xs md:text-sm font-medium text-gray-200 rounded-2xl shadow-sm shadow-white cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-300"
        >
          {expandAll ? `${t("faq.button2")}` : `${t("faq.button1")}`}
        </button>
      </div>

      {/* FAQ list */}
      <div className="w-full max-w-5xl rounded-xl shadow-md overflow-hidden">
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
  const { t } = useTranslation();

  return (
    <div className={`${!isLast ? "" : "rounded-b-2xl"}`}>
      {/* questions */}
      <button
        className="w-full py-5 px-6 flex justify-between items-center text-left shadow-xl shadow-black/30 cursor-pointer"
        onClick={onClick}
      >
        <span className="text-lg sm:text-2xl font-medium text-yellow-50 pr-4">
          {t(item.question)}
        </span>

        {/* expand/collapse */}
        <div className="cursor-pointer shrink-0 w-8 h-8 flex items-center justify-center rounded-full">
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
        <div className="px-6 py-5 text-gray-300 leading-relaxed">
          <p className="text-base sm:text-md">{t(item.answer)}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
