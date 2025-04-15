import type { ImageWidget } from "apps/admin/widgets.ts";
import Badge from "../components/Badge.tsx";
import HackaFAQAccordion from "../islands/HackaFAQAccordion.tsx";

interface FAQItem {
  /**
   * @description The question text
   */
  question: string;
  /**
   * @description The answer text
   */
  answer: string;
  /**
   * @description The Material Icons name for the question
   */
  icon: string;
}

export interface Props {
  /**
   * @description The section title
   * @default "Frequently Asked Questions"
   */
  title?: string;
  /**
   * @description The section description
   */
  description?: string;
  /**
   * @description The FAQ items list
   */
  faqs?: FAQItem[];
  /**
   * @description The section id for anchor links
   * @default "faq"
   */
  id?: string;
}

export default function HackaFAQ({
  title = "Frequently Asked Questions",
  description =
    "Have questions about the hackathon? Find answers to common queries below. If you need further assistance, feel free to reach out to our team.",
  faqs = [
    {
      question: "What are the submission requirements?",
      answer:
        "Your project should demonstrate the use of MCPs and AI Agents on the Deco platform. Include a working demo, source code, and documentation explaining your solution. Make sure to highlight how your project leverages the platform's capabilities.",
      icon: "checklist",
    },
    {
      question: "Can I participate remotely?",
      answer:
        "Yes! The hackathon is fully remote and asynchronous. You can participate from anywhere in the world, working on your project at your own pace within the hackathon timeline.",
      icon: "public",
    },
    {
      question: "How will projects be evaluated?",
      answer:
        "Projects will be judged based on creativity, technical implementation, practical utility, and effective use of MCPs and AI Agents. The judging panel will also consider code quality, documentation, and presentation.",
      icon: "grade",
    },
    {
      question: "Is there a team size limit?",
      answer:
        "You can participate individually or in teams of up to 4 members. All team members should be registered on the platform and listed in the project submission.",
      icon: "group",
    },
    {
      question: "What resources are available?",
      answer:
        "You'll have access to documentation, starter templates, office hours with mentors, and a community Discord channel. We'll also provide workshops and technical support throughout the event.",
      icon: "library_books",
    },
    {
      question: "When will winners be announced?",
      answer:
        "Winners will be announced within two weeks after the submission deadline. Results will be shared on our website, social media, and directly with all participants via email.",
      icon: "emoji_events",
    },
  ],
  id = "faq",
}: Props) {
  return (
    <div
      id={id}
      class="w-full bg-dc-900 px-4 md:px-20 py-16 md:py-32"
    >
      <div class="max-w-[1200px] mx-auto">
        <div class="text-center mb-16 md:mb-24">
          <Badge text="FAQ" variant="yellow" />
          <h2 class="text-3xl md:text-5xl text-dc-50 font-medium mt-6 mb-8">
            {title}
          </h2>
          <p class="text-lg md:text-xl text-dc-100 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <HackaFAQAccordion faqs={faqs} />
      </div>
    </div>
  );
}
