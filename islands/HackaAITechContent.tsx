import { useEffect, useRef } from "preact/hooks";
import { initGSAP } from "../deps.ts";
import Badge from "../components/Badge.tsx";
import type { TechCapability } from "../sections/HackaAITech.tsx";

interface Props {
  title: string;
  description: string;
  mcpTitle: string;
  mcpDescription: string;
  mcpIcon: string;
  agentTitle: string;
  agentDescription: string;
  agentIcon: string;
  mcpCapabilities: TechCapability[];
  agentCapabilities: TechCapability[];
  mcpBadgeText: string;
  agentBadgeText: string;
}

export default function HackaAITechContent({
  title,
  description,
  mcpTitle,
  mcpDescription,
  mcpIcon,
  agentTitle,
  agentDescription,
  agentIcon,
  mcpCapabilities,
  agentCapabilities,
  mcpBadgeText,
  agentBadgeText,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mcpRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);
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

      // Animate MCP capabilities
      const mcpItems = mcpRef.current?.children;
      if (mcpItems) {
        gsap.from(mcpItems, {
          scrollTrigger: {
            trigger: mcpRef.current,
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

      // Animate Agent capabilities
      const agentItems = agentRef.current?.children;
      if (agentItems) {
        gsap.from(agentItems, {
          scrollTrigger: {
            trigger: agentRef.current,
            start: "top bottom",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          x: 30,
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

  const codeExample = `class DecoAITech {
  constructor() {
    this.mcp = new MCPServer({
      tools: ["search", "calculate", "getWeather"],
      dataConnectors: ["api", "database", "stream"]
    });
    
    this.agent = new AIAgent({
      context: { /* business logic */ },
      capabilities: ["assist", "automate", "learn"]
    });
  }

  async process(input) {
    // MCP handles data and external connections
    const data = await this.mcp.fetchContext(input);
    
    // Agent processes and takes actions
    const result = await this.agent.execute(input, data);
    
    return this.formatResponse(result);
  }
}`;

  return (
    <div ref={sectionRef}>
      <div
        ref={contentRef}
        class="text-center mb-16 md:mb-24"
      >
        <div class="flex items-center justify-center gap-4">
          <Badge text={mcpBadgeText} variant="purple" />
          <Badge text={agentBadgeText} variant="yellow" />
        </div>
        <h2 class="text-3xl md:text-5xl text-dc-900 font-medium mt-6 mb-8">
          {title}
        </h2>
        <p class="text-lg md:text-xl text-dc-700 max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div class="bg-white rounded-3xl p-8 shadow-sm flex flex-col">
          <div class="min-h-[140px] mb-3">
            <h3 class="text-2xl text-dc-900 font-medium mb-4 flex items-center gap-3">
              <span class="material-symbols-rounded text-purple-dark">
                {mcpIcon}
              </span>
              {mcpTitle}
            </h3>
            <p class="text-dc-700 text-lg">
              {mcpDescription}
            </p>
          </div>
          <div
            ref={mcpRef}
            class="space-y-4"
          >
            {mcpCapabilities.map((capability) => (
              <div class="bg-purple-light/20 rounded-2xl p-6 flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-purple-light flex items-center justify-center flex-shrink-0">
                  <span class="material-symbols-rounded text-2xl text-purple-dark">
                    {capability.icon}
                  </span>
                </div>
                <div>
                  <h4 class="text-xl text-dc-900 font-medium">
                    {capability.title}
                  </h4>
                  {capability.description && (
                    <p class="text-dc-700 mt-1">
                      {capability.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div class="bg-white rounded-3xl p-8 shadow-sm flex flex-col">
          <div class="min-h-[140px] mb-3">
            <h3 class="text-2xl text-dc-900 font-medium mb-4 flex items-center gap-3">
              <span class="material-symbols-rounded text-yellow-dark">
                {agentIcon}
              </span>
              {agentTitle}
            </h3>
            <p class="text-dc-700 text-lg">
              {agentDescription}
            </p>
          </div>
          <div
            ref={agentRef}
            class="space-y-4"
          >
            {agentCapabilities.map((capability) => (
              <div class="bg-yellow-light/20 rounded-2xl p-6 flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-yellow-light flex items-center justify-center flex-shrink-0">
                  <span class="material-symbols-rounded text-2xl text-yellow-dark">
                    {capability.icon}
                  </span>
                </div>
                <div>
                  <h4 class="text-xl text-dc-900 font-medium">
                    {capability.title}
                  </h4>
                  {capability.description && (
                    <p class="text-dc-700 mt-1">
                      {capability.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
