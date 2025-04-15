import type { ImageWidget } from "apps/admin/widgets.ts";
import Badge from "../components/Badge.tsx";
import HackaHeroContent from "../islands/HackaHeroContent.tsx";
import HackaHeroInteractive from "../islands/HackaHeroInteractive.tsx";

export interface Props {
  /**
   * @description The hero title
   * @default "Deco.cx Hackathon"
   */
  title?: string;
  /**
   * @format rich-text
   * @description The hero description
   */
  description?: string;
  /**
   * @description The CTA button text
   * @default "Register Now"
   */
  ctaText?: string;
  /**
   * @description The CTA button link
   * @default "#register"
   */
  ctaLink?: string;
  /**
   * @description The hackathon end date
   * @format datetime
   */
  endDate?: string;
  /**
   * @description The section id for anchor links
   * @default "hero"
   */
  id?: string;
  /**
   * @description The badge text
   * @default "Hackathon"
   */
  badgeText?: string;
  /**
   * @description The badge color variant
   * @default "purple"
   */
  badgeVariant?: "yellow" | "purple" | "primary";
  /**
   * @description Use dark mode for the badge (inverted colors)
   * @default true
   */
  badgeIsDark?: boolean;
  /**
   * @description Background image for the hero section
   */
  backgroundImage?: ImageWidget;
  /**
   * @description Highlight points to display below the button
   */
  highlights?: {
    /**
     * @description The text to display
     */
    text: string;
    /**
     * @description Material icon name
     */
    icon: string;
    /**
     * @description Optional URL for the highlight text
     */
    link?: string;
  }[];
}

export default function HackaHero({
  title = "Deco.cx Hackathon",
  description =
    "Join us in building the future of e-commerce with Model Context Protocols and AI Agents. Create innovative solutions, win prizes, and showcase your skills!",
  ctaText = "Register Now",
  ctaLink = "#register",
  endDate = "2024-03-31T23:59:59",
  id = "hero",
  badgeText = "Hackathon",
  badgeVariant = "purple",
  badgeIsDark = true,
  backgroundImage,
  highlights = [
    {
      text: "100% remote",
      icon: "public",
    },
    {
      text: "April 24",
      icon: "event",
    },
    {
      text: "$1,000 in prizes",
      icon: "emoji_events",
    },
  ],
}: Props) {
  return (
    <div class="w-full bg-dc-50 p-4 h-screen">
      <div class="mx-auto h-full">
        <div
          id={id}
          class="relative flex flex-col h-full bg-primary-dark rounded-3xl px-4 sm:px-8 lg:px-16 xl:px-20 overflow-hidden"
        >
          {/* Background Image */}
          {backgroundImage && (
            <div class="absolute inset-0 w-full h-full">
              <img
                src={backgroundImage}
                alt="Hero background"
                class="w-full h-full object-cover opacity-20"
                loading="eager"
              />
              <div class="absolute inset-0 bg-gradient-to-b from-primary-dark/80 to-primary-dark">
                <HackaHeroInteractive />
              </div>
            </div>
          )}

          <div class="flex-1 flex items-center justify-center relative z-10">
            <div class="max-w-[1200px] mx-auto text-primary-light opacity-0 animate-fade-up">
              <div class="text-center mb-6 md:mb-8 opacity-0 animate-fade-up [animation-delay:200ms]">
                <Badge
                  text={badgeText}
                  variant={badgeVariant}
                  isDark={badgeIsDark}
                />
              </div>

              <HackaHeroContent
                title={title}
                description={description}
                ctaText={ctaText}
                ctaLink={ctaLink}
                endDate={endDate}
                highlights={highlights}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
