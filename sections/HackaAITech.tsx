import type { ImageWidget } from "apps/admin/widgets.ts";
import HackaAITechContent from "../islands/HackaAITechContent.tsx";

export interface TechCapability {
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
  /**
   * @description The variant color for the capability
   */
  variant: "purple" | "yellow";
}

export interface Props {
  /**
   * @description The section title
   * @default "MCPs & AI Agents"
   */
  title?: string;
  /**
   * @description The section description
   */
  description?: string;
  /**
   * @description The MCP capabilities
   */
  mcpCapabilities?: TechCapability[];
  /**
   * @description The Agent capabilities
   */
  agentCapabilities?: TechCapability[];
  /**
   * @description The MCP server example image
   */
  serverImage?: ImageWidget;
  /**
   * @description The section id for anchor links
   * @default "tech"
   */
  id?: string;
}

export default function HackaAITech({
  title = "MCPs & AI Agents",
  description =
    "Combine the power of Model Context Protocols (MCPs) and AI Agents to create intelligent solutions that can understand, reason, and act.",
  mcpCapabilities = [
    {
      title: "Access real-time external data",
      description: "",
      icon: "data_object",
      variant: "purple",
    },
    {
      title: "Execute actions in outside systems",
      description: "",
      icon: "integration_instructions",
      variant: "purple",
    },
    {
      title: "Handle diverse content formats",
      description: "",
      icon: "format_shapes",
      variant: "purple",
    },
    {
      title: "Autonomously tackle complex tasks",
      description: "",
      icon: "psychology",
      variant: "purple",
    },
  ],
  agentCapabilities = [
    {
      title: "Act as specialized assistants",
      description: "",
      icon: "support_agent",
      variant: "yellow",
    },
    {
      title: "Automate multi-step tasks",
      description: "",
      icon: "account_tree",
      variant: "yellow",
    },
    {
      title: "Seamlessly integrate data sources",
      description: "",
      icon: "hub",
      variant: "yellow",
    },
    {
      title: "Continuously learn and improve",
      description: "",
      icon: "trending_up",
      variant: "yellow",
    },
  ],
  serverImage,
  id = "tech",
}: Props) {
  return (
    <div
      id={id}
      class="w-full bg-dc-50 px-4 py-24 md:py-40"
    >
      <div class="max-w-[1440px] mx-auto">
        <HackaAITechContent
          title={title}
          description={description}
          mcpCapabilities={mcpCapabilities}
          agentCapabilities={agentCapabilities}
        />
      </div>
    </div>
  );
}
