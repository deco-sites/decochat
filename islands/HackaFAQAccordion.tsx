import { useSignal } from "@preact/signals";

interface FAQItem {
  question: string;
  answer: string;
  icon: string;
}

interface Props {
  faqs: FAQItem[];
}

export default function HackaFAQAccordion({ faqs }: Props) {
  const openIndex = useSignal<number | null>(null);

  const toggleFAQ = (index: number) => {
    openIndex.value = openIndex.value === index ? null : index;
  };

  return (
    <div class="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          class={`bg-dc-800 rounded-2xl transition-all duration-300 ${
            openIndex.value === index
              ? "bg-opacity-100"
              : "bg-opacity-50 hover:bg-opacity-70"
          }`}
        >
          <button
            class="w-full px-8 py-6 flex items-center justify-between gap-4 text-left"
            onClick={() => toggleFAQ(index)}
            aria-expanded={openIndex.value === index}
          >
            <div class="flex items-center gap-4">
              <span class="material-icons text-2xl text-dc-100">
                {faq.icon}
              </span>
              <span class="text-xl text-dc-50 font-medium">
                {faq.question}
              </span>
            </div>
            <span
              class={`material-icons text-2xl text-dc-100 transition-transform duration-300 ${
                openIndex.value === index ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>
          </button>
          <div
            class={`px-8 pb-6 overflow-hidden transition-all duration-300 ${
              openIndex.value === index
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
            style={{
              marginLeft: "calc(2rem + 24px)",
            }}
          >
            <p class="text-dc-100">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
