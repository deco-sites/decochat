import type { ImageWidget } from "apps/admin/widgets.ts";
import { useEffect, useRef } from "preact/hooks";
import { initGSAP } from "../deps.ts";
import Badge from "../components/Badge.tsx";

interface ProjectIdea {
  /**
   * @description The project title
   */
  title: string;
  /**
   * @description The project description
   */
  description: string;
  /**
   * @description The Material Icons name for the project
   */
  icon: string;
  /**
   * @description The color variant for the project card
   */
  variant: "primary" | "purple" | "yellow" | "green";
}

export interface Props {
  /**
   * @description The section title
   * @default "Project Ideas"
   */
  title?: string;
  /**
   * @description The section description
   */
  description?: string;
  /**
   * @description The project ideas list
   */
  ideas?: ProjectIdea[];
  /**
   * @description The section id for anchor links
   * @default "ideas"
   */
  id?: string;
}

export default function HackaIdeas({
  title = "Project Ideas",
  description =
    "Need inspiration? Here are a few sample use cases. Feel free to create any type of solution that showcases MCPs and AI Agents on the Deco platform!",
  ideas = [
    {
      title: "Personal Finance Assistant",
      description:
        "Automates spending analysis and savings strategies. Helps users track expenses, set budgets, and receive personalized financial advice.",
      icon: "account_balance",
      variant: "primary",
    },
    {
      title: "Content Research Agent",
      description:
        "Gathers and summarizes data from multiple sources. Perfect for content creators, researchers, and journalists needing comprehensive insights.",
      icon: "search",
      variant: "purple",
    },
    {
      title: "Code Review Assistant",
      description:
        "Spots bugs and suggests optimizations for developers. Analyzes code quality, identifies potential issues, and recommends improvements.",
      icon: "code",
      variant: "yellow",
    },
    {
      title: "Health Monitoring Agent",
      description:
        "Tracks health metrics, identifies trends, and recommends improvements. Helps users maintain a healthy lifestyle with personalized guidance.",
      icon: "monitor_heart",
      variant: "green",
    },
  ],
  id = "ideas",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ideasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsapInstance = initGSAP();
    if (!gsapInstance?.gsap || !gsapInstance?.ScrollTrigger) return;

    const { gsap, ScrollTrigger } = gsapInstance;

    const ctx = gsap.context(() => {
      // Animate content
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate ideas
      const ideas = ideasRef.current?.children;
      if (ideas) {
        gsap.from(ideas, {
          scrollTrigger: {
            trigger: ideasRef.current,
            start: "top bottom",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, []);

  const variantStyles = {
    primary: {
      bg: "bg-primary-light",
      icon: "text-primary-dark",
      title: "text-primary-dark",
      description: "text-primary-dark/70",
      pattern: "from-primary-dark/10 to-transparent",
    },
    purple: {
      bg: "bg-purple-light",
      icon: "text-purple-dark",
      title: "text-purple-dark",
      description: "text-purple-dark/70",
      pattern: "from-purple-dark/10 to-transparent",
    },
    yellow: {
      bg: "bg-yellow-light",
      icon: "text-yellow-dark",
      title: "text-yellow-dark",
      description: "text-yellow-dark/70",
      pattern: "from-yellow-dark/10 to-transparent",
    },
    green: {
      bg: "bg-green-100",
      icon: "text-green-800",
      title: "text-green-800",
      description: "text-green-800/70",
      pattern: "from-green-800/10 to-transparent",
    },
  };

  return (
    <div
      ref={sectionRef}
      id={id}
      class="w-full bg-dc-50 px-4 md:px-20 py-16 md:py-32"
    >
      <div class="max-w-[1200px] mx-auto">
        <div
          ref={contentRef}
          class="text-center mb-16 md:mb-24"
        >
          <Badge text="Ideas" variant="purple" />
          <h2 class="text-3xl md:text-5xl text-dc-900 font-medium mt-6 mb-8">
            {title}
          </h2>
          <p class="text-lg md:text-xl text-dc-800 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div
          ref={ideasRef}
          class="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {ideas.map((idea) => {
            const style = variantStyles[idea.variant];
            return (
              <div
                class={`${style.bg} rounded-3xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
              >
                {/* Background Pattern */}
                <div
                  class={`absolute inset-0 bg-gradient-to-br ${style.pattern} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Content */}
                <div class="relative z-10">
                  <div class="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center mb-6">
                    <span class={`material-icons text-3xl ${style.icon}`}>
                      {idea.icon}
                    </span>
                  </div>

                  <h3 class={`text-2xl font-medium mb-4 ${style.title}`}>
                    {idea.title}
                  </h3>

                  <p class={`${style.description}`}>
                    {idea.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
