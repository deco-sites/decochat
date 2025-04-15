import type { ImageWidget } from "apps/admin/widgets.ts";
import { useEffect, useRef } from "preact/hooks";
import { initGSAP } from "../deps.ts";
import Badge from "../components/Badge.tsx";

interface AgentCapability {
  /**
   * @description The capability title
   */
  title: string;
  /**
   * @description The capability description
   */
  description: string;
  /**
   * @description The Material Icons name for the capability
   */
  icon: string;
}

export interface Props {
  /**
   * @description The section title
   * @default "Why AI Agents?"
   */
  title?: string;
  /**
   * @description The section description
   */
  description?: string;
  /**
   * @description The agent capabilities
   */
  capabilities?: AgentCapability[];
  /**
   * @description The section id for anchor links
   * @default "agent"
   */
  id?: string;
}

export default function HackaAgent({
  title = "Why AI Agents?",
  description =
    "AI Agents combine powerful LLMs with reasoning and action-taking abilities. They can:",
  capabilities = [
    {
      title: "Act as specialized assistants",
      description:
        "Create domain-specific AI assistants that understand your business context and requirements.",
      icon: "support_agent",
    },
    {
      title: "Automate multi-step tasks",
      description:
        "Handle complex workflows by breaking them down into logical steps and executing them in sequence.",
      icon: "account_tree",
    },
    {
      title: "Seamlessly integrate data sources",
      description:
        "Connect and utilize multiple data sources and tools to provide comprehensive solutions.",
      icon: "hub",
    },
    {
      title: "Continuously learn and improve",
      description:
        "Adapt and enhance their capabilities based on interactions and feedback.",
      icon: "trending_up",
    },
  ],
  id = "agent",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);

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

      // Animate capabilities
      const capabilities = capabilitiesRef.current?.children;
      if (capabilities) {
        gsap.from(capabilities, {
          scrollTrigger: {
            trigger: capabilitiesRef.current,
            start: "top bottom",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        });
      }

      // Animate code
      if (codeRef.current) {
        gsap.from(codeRef.current, {
          scrollTrigger: {
            trigger: codeRef.current,
            start: "top bottom",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, []);

  const codeExample = `class DecoAgent {
  constructor() {
    this.tools = ["search", "calculate", "getWeather", "sendEmail"];
    this.context = {
      user: "dev@example.com",
      preferences: { /* ... */ }
    };
  }

  async processInput(userPrompt) {
    // Analyze intent
    const intent = await this.analyzeIntent(userPrompt);

    // Select the right tool
    const tool = this.selectTool(intent);

    // Execute the action
    const result = await tool.execute(userPrompt, this.context);

    return this.formatResponse(result);
  }
}`;

  return (
    <div
      ref={sectionRef}
      id={id}
      class="w-full bg-primary-light px-4 md:px-20 py-16 md:py-32"
    >
      <div class="max-w-[1200px] mx-auto">
        <div
          ref={contentRef}
          class="text-center mb-16 md:mb-24"
        >
          <Badge text="AI Agents" variant="yellow" />
          <h2 class="text-3xl md:text-5xl text-primary-dark font-medium mt-6 mb-8">
            {title}
          </h2>
          <p class="text-lg md:text-xl text-primary-dark/80 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          <div
            ref={capabilitiesRef}
            class="space-y-8"
          >
            {capabilities.map((capability) => (
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-yellow-light flex items-center justify-center flex-shrink-0">
                  <span class="material-icons text-2xl text-yellow-dark">
                    {capability.icon}
                  </span>
                </div>
                <div>
                  <h3 class="text-xl text-primary-dark font-medium mb-2">
                    {capability.title}
                  </h3>
                  <p class="text-primary-dark/70">
                    {capability.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div class="relative">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-primary-dark rounded-2xl blur opacity-30">
            </div>
            <pre
              ref={codeRef}
              class="relative w-full h-full bg-[#1a1b26] rounded-2xl p-6 font-mono text-sm md:text-base leading-relaxed text-gray-100 overflow-x-auto"
            >
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
