import type { ImageWidget } from "apps/admin/widgets.ts";
import Badge from "../components/Badge.tsx";

export interface Props {
  /**
   * @description The section title
   * @default "Who is it for?"
   */
  title?: string;
  /**
   * @description The section description
   * @default "We believe anyone can solve problems and automate work with AI—no heavy coding skills required! Our platform, deco.chat, features plug-and-play integrations and a conversational assistant that sets up Agents for you. If you're more experienced or just love to tinker, you'll have full access to our framework to build new MCPs, integrate unique data sources, and create complex Agents."
   */
  description?: string;
  /**
   * @description The badge text
   * @default "Calling All Devs & Non-Devs"
   */
  badgeText?: string;
  /**
   * @description The section id for anchor links
   * @default "who-is-it-for"
   */
  id?: string;
  /**
   * @description The section image
   */
  image?: ImageWidget;
}

export default function HackaWhoIsItFor({
  title = "Who is it for?",
  description =
    "We believe anyone can solve problems and automate work with AI—no heavy coding skills required! Our platform, deco.chat, features plug-and-play integrations and a conversational assistant that sets up Agents for you. If you're more experienced or just love to tinker, you'll have full access to our framework to build new MCPs, integrate unique data sources, and create complex Agents.",
  badgeText = "Calling All Devs & Non-Devs",
  id = "who-is-it-for",
  image,
}: Props) {
  return (
    <div
      id={id}
      class="w-full bg-dc-50 px-4 md:px-20 py-24 md:py-32"
    >
      <div class="max-w-[1200px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left Side - Content */}
          <div>
            <Badge text={badgeText} variant="primary" />
            <h2 class="text-3xl md:text-5xl text-primary-dark font-medium mt-6 mb-8">
              {title}
            </h2>
            {description.split("! ").map((paragraph, index) => (
              <p class="text-lg text-primary-dark/80 leading-relaxed mb-6 last:mb-0">
                {paragraph +
                  (index < description.split("! ").length - 1 ? "!" : "")}
              </p>
            ))}
          </div>

          {/* Right Side - Image */}
          <div class="lg:h-full flex items-center justify-center">
            {image && (
              <img
                src={image}
                alt="Who is it for illustration"
                class="w-full max-w-xl rounded-3xl border border-dc-200"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
