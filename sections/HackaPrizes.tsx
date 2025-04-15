import type { ImageWidget } from "apps/admin/widgets.ts";
import { useEffect, useRef } from "preact/hooks";
import { initGSAP } from "../deps.ts";
import Badge from "../components/Badge.tsx";

interface PrizeItem {
  /**
   * @description The prize item text
   */
  text: string;
  /**
   * @description The Material Icons name for the item
   */
  icon: string;
}

interface Prize {
  /**
   * @description The prize position (1st, 2nd, 3rd)
   */
  position: string;
  /**
   * @description The prize items list
   */
  items: PrizeItem[];
  /**
   * @description The prize position color variant
   */
  variant: "gold" | "silver" | "bronze";
}

export interface Props {
  /**
   * @description The section title
   * @default "Prizes & Recognition"
   */
  title?: string;
  /**
   * @description The section description
   */
  description?: string;
  /**
   * @description The prizes list
   */
  prizes?: Prize[];
  /**
   * @description The section id for anchor links
   * @default "prizes"
   */
  id?: string;
}

export default function HackaPrizes({
  title = "Prizes & Recognition",
  description =
    "Your chance to win money, credits, premium access, and a spot in Deco's Agent Catalog.",
  prizes = [
    {
      position: "1st Place",
      items: [
        { text: "$1,000", icon: "payments" },
        { text: "$1,000 worth of deco credits", icon: "redeem" },
        { text: "2 premium seats for 6 months", icon: "workspace_premium" },
        { text: "Featured placement in the Deco Agent Catalog", icon: "star" },
        { text: "Surprise bonus", icon: "card_giftcard" },
      ],
      variant: "gold",
    },
    {
      position: "2nd Place",
      items: [
        { text: "$500 worth of deco credits", icon: "redeem" },
        { text: "2 premium seats for 6 months", icon: "workspace_premium" },
        { text: "Inclusion in the Deco Agent Catalog", icon: "star" },
      ],
      variant: "silver",
    },
    {
      position: "3rd Place",
      items: [
        { text: "$250 worth of deco credits", icon: "redeem" },
        { text: "2 premium seats for 3 months", icon: "workspace_premium" },
        { text: "Inclusion in the Deco Agent Catalog", icon: "star" },
      ],
      variant: "bronze",
    },
  ],
  id = "prizes",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prizesRef = useRef<HTMLDivElement>(null);

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

      // Animate prizes
      const prizes = prizesRef.current?.children;
      if (prizes) {
        gsap.from(prizes, {
          scrollTrigger: {
            trigger: prizesRef.current,
            start: "top bottom",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, []);

  const variantStyles = {
    gold: {
      bg: "bg-yellow-100",
      border: "border-yellow-300",
      text: "text-yellow-900",
      icon: "text-yellow-600",
      trophy: "emoji_events",
    },
    silver: {
      bg: "bg-gray-100",
      border: "border-gray-300",
      text: "text-gray-900",
      icon: "text-gray-600",
      trophy: "military_tech",
    },
    bronze: {
      bg: "bg-orange-100",
      border: "border-orange-300",
      text: "text-orange-900",
      icon: "text-orange-600",
      trophy: "workspace_premium",
    },
  };

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
          <Badge text="Prizes" variant="yellow" />
          <h2 class="text-3xl md:text-5xl text-primary-dark font-medium mt-6 mb-8">
            {title}
          </h2>
          <p class="text-lg md:text-xl text-primary-dark/80 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div
          ref={prizesRef}
          class="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {prizes.map((prize) => {
            const style = variantStyles[prize.variant];
            return (
              <div
                class={`${style.bg} border-2 ${style.border} rounded-3xl p-8 relative overflow-hidden`}
              >
                {/* Trophy Icon */}
                <div class="absolute -right-6 -top-6 w-24 h-24 flex items-center justify-center opacity-10">
                  <span class={`material-icons text-[96px] ${style.icon}`}>
                    {style.trophy}
                  </span>
                </div>

                {/* Position */}
                <div class={`text-2xl font-bold ${style.text} mb-6`}>
                  {prize.position}
                </div>

                {/* Prize Items */}
                <div class="space-y-4">
                  {prize.items.map((item) => (
                    <div class="flex items-center gap-3">
                      <span class={`material-icons ${style.icon}`}>
                        {item.icon}
                      </span>
                      <span class={style.text}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
