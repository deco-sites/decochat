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
  description?: string;
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
   * @description The MCP card title
   * @default "Model Context Protocols"
   */
  mcpTitle?: string;
  /**
   * @description The MCP card description
   * @default "Enhance AI capabilities with protocols that enable real-time data access and system interactions."
   */
  mcpDescription?: string;
  /**
   * @description The MCP card icon (Material Icons name)
   * @default "memory"
   */
  mcpIcon?: string;
  /**
   * @description The Agent card title
   * @default "AI Agents"
   */
  agentTitle?: string;
  /**
   * @description The Agent card description
   * @default "Autonomous AI assistants that can understand context, make decisions, and execute complex tasks."
   */
  agentDescription?: string;
  /**
   * @description The Agent card icon (Material Icons name)
   * @default "smart_toy"
   */
  agentIcon?: string;
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
  /**
   * @description The MCP badge text
   * @default "MCPs"
   */
  mcpBadgeText?: string;
  /**
   * @description The Agent badge text
   * @default "AI Agents"
   */
  agentBadgeText?: string;
}

export default function HackaAITech({
  title = "MCPs & AI Agents",
  description =
    "Combine the power of Model Context Protocols (MCPs) and AI Agents to create intelligent solutions that can understand, reason, and act.",
  mcpTitle = "Model Context Protocols",
  mcpDescription =
    "Enhance AI capabilities with protocols that enable real-time data access and system interactions.",
  mcpIcon = "memory",
  agentTitle = "AI Agents",
  agentDescription =
    "Autonomous AI assistants that can understand context, make decisions, and execute complex tasks.",
  agentIcon = "smart_toy",
  mcpCapabilities = [
    {
      title: "Access real-time external data",
      icon: "data_object",
      variant: "purple",
    },
    {
      title: "Execute actions in outside systems",
      icon: "integration_instructions",
      variant: "purple",
    },
    {
      title: "Handle diverse content formats",
      icon: "format_shapes",
      variant: "purple",
    },
    {
      title: "Autonomously tackle complex tasks",
      icon: "psychology",
      variant: "purple",
    },
  ],
  agentCapabilities = [
    {
      title: "Act as specialized assistants",
      icon: "support_agent",
      variant: "yellow",
    },
    {
      title: "Automate multi-step tasks",
      icon: "account_tree",
      variant: "yellow",
    },
    {
      title: "Seamlessly integrate data sources",
      icon: "hub",
      variant: "yellow",
    },
    {
      title: "Continuously learn and improve",
      icon: "trending_up",
      variant: "yellow",
    },
  ],
  serverImage,
  id = "tech",
  mcpBadgeText = "MCPs",
  agentBadgeText = "AI Agents",
}: Props) {
  return (
    <div
      id={id}
      class="w-full bg-dc-50 px-4 py-20 md:py-32"
    >
      <div class="max-w-[1440px] mx-auto">
        <HackaAITechContent
          title={title}
          description={description}
          mcpTitle={mcpTitle}
          mcpDescription={mcpDescription}
          mcpIcon={mcpIcon}
          agentTitle={agentTitle}
          agentDescription={agentDescription}
          agentIcon={agentIcon}
          mcpCapabilities={mcpCapabilities}
          agentCapabilities={agentCapabilities}
          mcpBadgeText={mcpBadgeText}
          agentBadgeText={agentBadgeText}
        />
      </div>
    </div>
  );
}
