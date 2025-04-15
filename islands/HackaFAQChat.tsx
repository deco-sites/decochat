import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQItem[];
}

export default function HackaFAQChat({ faqs }: Props) {
  const openIndex = useSignal<number | null>(null);

  const handleQuestionClick = (index: number) => {
    if (openIndex.value === index) {
      openIndex.value = null;
    } else {
      openIndex.value = index;
    }
  };

  return (
    <div class="max-w-3xl mx-auto">
      <div class="space-y-3">
        {faqs.map((faq, index) => (
          <div
            class={`space-y-2 transition-all duration-300 ${
              openIndex.value === index ? "mb-4" : ""
            }`}
          >
            {/* Question */}
            <button
              onClick={() => handleQuestionClick(index)}
              class="flex justify-end w-full group items-start gap-2"
            >
              <div class="flex-1 flex justify-end">
                <div class="bg-dc-100 rounded-2xl rounded-tr-none px-6 py-4 max-w-[85%] text-left transition-colors duration-300 hover:bg-dc-200 relative group">
                  <span class="absolute -left-8 top-1/2 -translate-y-1/2 text-dc-700/30 transition-all duration-300 text-xl font-medium group-hover:text-dc-700/50">
                    {openIndex.value === index ? "−" : "+"}
                  </span>
                  <p class="text-dc-700 text-lg sm:text-xl">
                    {faq.question}
                  </p>
                </div>
              </div>
            </button>

            {/* Answer */}
            <div
              class={`flex justify-start transition-all duration-300 ${
                openIndex.value === index
                  ? "opacity-100 max-h-96"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}
            >
              <div class="bg-primary-dark rounded-2xl rounded-tl-none px-6 py-4 max-w-[85%]">
                <p class="text-primary-light text-lg sm:text-xl">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
