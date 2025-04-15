import type { ImageWidget } from "apps/admin/widgets.ts";
import { useEffect, useRef } from "preact/hooks";
import { initGSAP } from "../deps.ts";
import Badge from "../components/Badge.tsx";

interface MCPCapability {
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
   * @default "Why MCPs?"
   */
  title?: string;
  /**
   * @description The section description
   */
  description?: string;
  /**
   * @description The MCP capabilities
   */
  capabilities?: MCPCapability[];
  /**
   * @description The MCP server example image
   */
  serverImage?: ImageWidget;
  /**
   * @description The section id for anchor links
   * @default "mcp"
   */
  id?: string;
}

export default function HackaMCP({
  title = "Why MCPs?",
  description =
    "Model Context Protocols (MCPs) connect large language models (LLMs) to external data, tools, and APIs—massively expanding what AI can do. In essence, MCPs let your AI:",
  capabilities = [
    {
      title: "Access real-time external data",
      description:
        "Connect to databases, APIs, and live data streams to keep AI responses current and contextual.",
      icon: "data_object",
    },
    {
      title: "Execute actions in outside systems",
      description:
        "Trigger workflows, update records, and interact with external services seamlessly.",
      icon: "integration_instructions",
    },
    {
      title: "Handle diverse content formats",
      description:
        "Process and understand multiple data types including text, images, and structured data.",
      icon: "format_shapes",
    },
    {
      title: "Autonomously tackle complex tasks",
      description:
        "Chain multiple operations together to solve sophisticated problems independently.",
      icon: "psychology",
    },
  ],
  serverImage,
  id = "mcp",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

      // Animate image
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          scale: 0.9,
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
          <Badge text="MCPs" variant="purple" />
          <h2 class="text-3xl md:text-5xl text-dc-900 font-medium mt-6 mb-8">
            {title}
          </h2>
          <p class="text-lg md:text-xl text-dc-800 max-w-3xl mx-auto">
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
                <div class="w-12 h-12 rounded-xl bg-purple-light flex items-center justify-center flex-shrink-0">
                  <span class="material-icons text-2xl text-purple-dark">
                    {capability.icon}
                  </span>
                </div>
                <div>
                  <h3 class="text-xl text-dc-900 font-medium mb-2">
                    {capability.title}
                  </h3>
                  <p class="text-dc-700">
                    {capability.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            ref={imageRef}
            class="relative lg:h-full flex items-center justify-center"
          >
            {serverImage
              ? (
                <img
                  src={serverImage}
                  alt="MCP Server Example"
                  class="w-full h-auto max-w-lg rounded-2xl shadow-lg"
                />
              )
              : (
                <div class="w-full aspect-[4/3] max-w-lg bg-purple-light rounded-2xl shadow-lg flex items-center justify-center">
                  <span class="material-icons text-6xl text-purple-dark">
                    architecture
                  </span>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
