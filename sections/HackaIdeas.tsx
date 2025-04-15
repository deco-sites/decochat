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
  variant: "primary" | "purple" | "yellow";
}

interface Example {
  /**
   * @description The example title
   */
  title: string;
  /**
   * @description First image for the example
   */
  image1: ImageWidget;
  /**
   * @description Second image for the example
   */
  image2: ImageWidget;
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
   * @description The project ideas
   */
  ideas?: ProjectIdea[];
  /**
   * @description The section id for anchor links
   * @default "ideas"
   */
  id?: string;
  /**
   * @description The badge text
   * @default "Ideas"
   */
  badgeText?: string;
  /**
   * @description The examples section title
   */
  examplesTitle?: string;
  /**
   * @description The examples to display
   */
  examples?: Example[];
}

export default function HackaIdeas({
  title = "Need a spark? Try one of these:",
  description =
    "Or dream up your own AI solution—anything that showcases MCPs and / or Agents is fair game!",
  ideas = [
    {
      title: "Personal Finance Assistant",
      description: "Automates spending analysis and savings tips",
      icon: "account_balance",
      variant: "primary",
    },
    {
      title: "Content Research Agent",
      description: "Gathers and summarizes data from multiple sources",
      icon: "search",
      variant: "purple",
    },
    {
      title: "Code Review Assistant",
      description: "Spots bugs, suggests optimizations",
      icon: "code",
      variant: "yellow",
    },
    {
      title: "Health Monitoring Agent",
      description:
        "Tracks metrics, identifies trends, offers personalized advice",
      icon: "monitor_heart",
      variant: "primary",
    },
  ],
  id = "ideas",
  badgeText = "Ideas",
  examples = [
    {
      title: "Example of MCP Servers",
      image1: "",
      image2: "",
    },
    {
      title: "Example Agent",
      image1: "",
      image2: "",
    },
  ],
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
      bg: "bg-primary-dark",
      text: "text-primary-light",
      accent: "bg-primary-light",
      icon: "text-primary-dark",
    },
    purple: {
      bg: "bg-purple-dark",
      text: "text-purple-light",
      accent: "bg-purple-light",
      icon: "text-purple-dark",
    },
    yellow: {
      bg: "bg-yellow-dark",
      text: "text-yellow-light",
      accent: "bg-yellow-light",
      icon: "text-yellow-dark",
    },
  };

  return (
    <div
      ref={sectionRef}
      id={id}
      class="w-full bg-dc-50 px-4 md:px-20 py-16 md:py-32"
    >
      <div class="max-w-[1200px] mx-auto">
        <div ref={contentRef} class="mb-16">
          <div class="text-center mb-12">
            <Badge text={badgeText} variant="purple" />
            <h2 class="text-3xl md:text-5xl text-primary-dark font-medium mt-6">
              {title}
            </h2>
          </div>

          {/* Ideas Grid */}
          <div class="max-w-4xl mx-auto">
            <div
              ref={ideasRef}
              class="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {ideas.map((idea) => {
                const style = variantStyles[idea.variant];
                return (
                  <div class="flex items-start gap-4 md:gap-6 group bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-primary-dark/10">
                    <div
                      class={`w-12 md:w-14 h-12 md:h-14 rounded-xl ${style.accent} flex items-center justify-center flex-shrink-0`}
                    >
                      <span
                        class={`material-symbols-rounded text-2xl md:text-3xl ${style.icon}`}
                      >
                        {idea.icon}
                      </span>
                    </div>
                    <div>
                      <h3 class="text-lg md:text-xl font-medium text-primary-dark group-hover:text-primary transition-colors duration-300 mb-2">
                        {idea.title}
                      </h3>
                      <p class="text-lg sm:text-xl text-primary-dark/80">
                        {idea.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Examples Section */}
        <div class="bg-primary-dark rounded-3xl p-6 md:p-12">
          <div class="text-center mb-8 md:mb-12">
            <p class="text-lg md:text-xl text-primary-light/80">
              {description}
            </p>
          </div>

          <div class="max-w-5xl mx-auto px-4 md:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {examples.map((example) => (
                <div>
                  <h4 class="text-xl font-medium text-primary-light mb-8 text-center">
                    {example.title}
                  </h4>
                  {example.image1 && (
                    <img
                      src={example.image1}
                      alt={example.title}
                      class="w-full rounded-xl"
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
