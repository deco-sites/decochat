import type { ImageWidget } from "apps/admin/widgets.ts";
import Badge from "../components/Badge.tsx";
import HackaHeroContent from "../islands/HackaHeroContent.tsx";

export interface Props {
  /**
   * @description The hero title
   * @default "Deco.cx Hackathon"
   */
  title?: string;
  /**
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
    <div class="w-full bg-dc-50 p-4 min-h-screen">
      <div class="mx-auto h-full">
        <div
          id={id}
          class="relative flex flex-col justify-center items-center h-full bg-primary-dark rounded-3xl px-4 md:px-20 py-16 md:py-32"
        >
          <div class="max-w-[1200px] mx-auto text-primary-light">
            <div class="text-center mb-6 md:mb-8">
              <Badge text={badgeText} variant="primary" />
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
  );
}
