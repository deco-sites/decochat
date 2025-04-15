import type { ImageWidget } from "apps/admin/widgets.ts";
import Badge from "../components/Badge.tsx";
import AnimatedSponsors from "../islands/AnimatedSponsors.tsx";

interface Sponsor {
  /**
   * @description The sponsor's name
   */
  name: string;
  /**
   * @description The sponsor's logo URL
   */
  logo: ImageWidget;
  /**
   * @description The sponsor's website URL
   */
  url: string;
  /**
   * @description The sponsor's tier
   */
  tier: "platinum" | "gold" | "silver" | "bronze";
}

export interface Props {
  /**
   * @description The section title
   * @default "Our Sponsors"
   */
  title?: string;
  /**
   * @description The section description
   */
  description?: string;
  /**
   * @description The sponsors list
   */
  sponsors?: Sponsor[];
  /**
   * @description The section id for anchor links
   * @default "sponsors"
   */
  id?: string;
  /**
   * @description The badge text
   * @default "Sponsors"
   */
  badgeText?: string;
}

const tierConfig = {
  platinum: {
    title: "Platinum Sponsors",
    class: "col-span-full",
    logoClass: "h-24 md:h-32",
  },
  gold: {
    title: "Gold Sponsors",
    class: "col-span-full md:col-span-6",
    logoClass: "h-20 md:h-24",
  },
  silver: {
    title: "Silver Sponsors",
    class: "col-span-6 md:col-span-4",
    logoClass: "h-16 md:h-20",
  },
  bronze: {
    title: "Bronze Sponsors",
    class: "col-span-4 md:col-span-3",
    logoClass: "h-12 md:h-16",
  },
};

export default function HackaSponsors({
  title = "Our Sponsors",
  description =
    "We're grateful to our sponsors who make this hackathon possible. Their support enables us to provide prizes, resources, and a great experience for all participants.",
  sponsors = [
    {
      name: "Deco.cx",
      logo: "https://deco.cx/logo.svg",
      url: "https://deco.cx",
      tier: "platinum",
    },
    // Add more sponsors here when available
  ],
  id = "sponsors",
  badgeText = "Sponsors",
}: Props) {
  return (
    <div
      id={id}
      class="w-full bg-dc-50 px-4 md:px-20 py-16 md:py-32"
    >
      <div class="max-w-[1200px] mx-auto">
        <div class="text-center mb-16 md:mb-24">
          <Badge text={badgeText} variant="primary" />
          <h2 class="text-3xl md:text-5xl text-dc-900 font-medium mt-6 mb-8">
            {title}
          </h2>
          <p class="text-lg sm:text-xl text-dc-800 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <AnimatedSponsors sponsors={sponsors} />
      </div>
    </div>
  );
}
