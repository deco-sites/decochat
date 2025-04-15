import { useEffect, useRef } from "preact/hooks";
import { initGSAP } from "../deps.ts";
import Badge from "../components/Badge.tsx";
import type { TechCapability } from "../sections/HackaAITech.tsx";

interface Props {
  title: string;
  description: string;
  mcpCapabilities: TechCapability[];
  agentCapabilities: TechCapability[];
}

export default function HackaAITechContent({
  title,
  description,
  mcpCapabilities,
  agentCapabilities,
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
          <Badge text="MCPs" variant="purple" />
          <Badge text="AI Agents" variant="yellow" />
        </div>
        <h2 class="text-3xl md:text-5xl text-dc-900 font-medium mt-6 mb-8">
          {title}
        </h2>
        <p class="text-lg md:text-xl text-dc-700 max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 mb-16">
        <div class="bg-white rounded-3xl p-8 shadow-sm">
          <h3 class="text-2xl text-dc-900 font-medium mb-8 flex items-center gap-3">
            <span class="material-icons text-purple-dark">architecture</span>
            Model Context Protocols
          </h3>
          <div
            ref={mcpRef}
            class="space-y-4"
          >
            {mcpCapabilities.map((capability) => (
              <div class="bg-purple-light/20 rounded-2xl p-6 flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-purple-light flex items-center justify-center flex-shrink-0">
                  <span class="material-icons text-2xl text-purple-dark">
                    {capability.icon}
                  </span>
                </div>
                <h4 class="text-xl text-dc-900 font-medium">
                  {capability.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        <div class="bg-white rounded-3xl p-8 shadow-sm">
          <h3 class="text-2xl text-dc-900 font-medium mb-8 flex items-center gap-3">
            <span class="material-icons text-yellow-dark">smart_toy</span>
            AI Agents
          </h3>
          <div
            ref={agentRef}
            class="space-y-4"
          >
            {agentCapabilities.map((capability) => (
              <div class="bg-yellow-light/20 rounded-2xl p-6 flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-yellow-light flex items-center justify-center flex-shrink-0">
                  <span class="material-icons text-2xl text-yellow-dark">
                    {capability.icon}
                  </span>
                </div>
                <h4 class="text-xl text-dc-900 font-medium">
                  {capability.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div class="relative">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-yellow-400 rounded-2xl blur opacity-30">
        </div>
        <pre
          ref={codeRef}
          class="relative w-full h-full bg-[#1a1b26] rounded-2xl p-6 font-mono text-sm md:text-base leading-relaxed text-gray-100 overflow-x-auto"
        >
          <code>{codeExample}</code>
        </pre>
      </div>
    </div>
  );
}
