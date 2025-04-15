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
  /**
   * @description The badge text
   * @default "Prizes"
   */
  badgeText?: string;
}

export default function HackaPrizes({
  title = "Prizes & Recognition",
  description =
    "Your chance to win money, credits, premium access, and a spot in Deco's Agent Catalog.",
  prizes = [
    {
      position: "1st Place",
      items: [
        { text: "$1,000 in credits on our platform", icon: "redeem" },
        { text: "4 premium seats for 6 months", icon: "workspace_premium" },
        { text: "Featured placement in the Deco Agent Catalog", icon: "star" },
      ],
      variant: "gold",
    },
    {
      position: "2nd Place",
      items: [
        { text: "$500 in credits on our platform", icon: "redeem" },
        { text: "2 premium seats for 6 months", icon: "workspace_premium" },
        { text: "Inclusion in the Deco Agent Catalog", icon: "star" },
      ],
      variant: "silver",
    },
    {
      position: "3rd Place",
      items: [
        { text: "$250 in credits on our platform", icon: "redeem" },
        { text: "1 premium seat for 3 months", icon: "workspace_premium" },
      ],
      variant: "bronze",
    },
  ],
  id = "prizes",
  badgeText = "Prizes",
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
      bg: "bg-yellow-light",
      border: "border-yellow-dark/20",
      text: "text-yellow-dark",
      icon: "text-yellow-dark",
      trophy: "emoji_events",
    },
    silver: {
      bg: "bg-primary-light",
      border: "border-primary-dark/20",
      text: "text-primary-dark",
      icon: "text-primary-dark",
      trophy: "military_tech",
    },
    bronze: {
      bg: "bg-purple-light",
      border: "border-purple-dark/20",
      text: "text-purple-dark",
      icon: "text-purple-dark",
      trophy: "workspace_premium",
    },
  };

  return (
    <div class="w-full bg-dc-50 p-4">
      <div class="mx-auto">
        <div
          ref={sectionRef}
          id={id}
          class="relative bg-primary-dark rounded-3xl px-4 md:px-20 py-24 md:py-40"
        >
          <div class="max-w-[1200px] mx-auto">
            <div
              ref={contentRef}
              class="text-center mb-16 md:mb-24"
            >
              <Badge text={badgeText} variant="yellow" />
              <h2 class="text-3xl md:text-5xl text-primary-light font-medium mt-6 mb-8">
                {title}
              </h2>
              <p class="text-lg md:text-xl text-primary-light/80 max-w-3xl mx-auto">
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
                    class={`${style.bg} border-2 ${style.border} rounded-3xl p-12 relative overflow-hidden backdrop-blur-sm min-h-[360px] flex flex-col`}
                  >
                    {/* Trophy Icon */}
                    <div class="absolute -right-6 -top-6 w-24 h-24 flex items-center justify-center opacity-10">
                      <span
                        class={`material-symbols-rounded text-[96px] ${style.icon}`}
                      >
                        {style.trophy}
                      </span>
                    </div>

                    {/* Position */}
                    <div class={`text-4xl font-medium ${style.text} mb-8`}>
                      {prize.position}
                    </div>

                    {/* Prize Items */}
                    <div class="space-y-6 flex-1">
                      {prize.items.map((item) => (
                        <div class="flex items-center gap-4">
                          <span
                            class={`material-symbols-rounded text-2xl ${style.icon}`}
                          >
                            {item.icon}
                          </span>
                          <span class={`${style.text} text-lg sm:text-xl`}>
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
      </div>
    </div>
  );
}
