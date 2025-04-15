import { useEffect, useRef } from "preact/hooks";
import { initGSAP } from "../deps.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface Sponsor {
  name: string;
  logo: ImageWidget;
  url: string;
  tier: "platinum" | "gold" | "silver" | "bronze";
}

interface Props {
  sponsors: Sponsor[];
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

export default function AnimatedSponsors({ sponsors }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);

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

      // Animate sponsors
      const sponsorElements = sponsorsRef.current?.children;
      if (sponsorElements) {
        gsap.from(sponsorElements, {
          scrollTrigger: {
            trigger: sponsorsRef.current,
            start: "top bottom",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, []);

  // Group sponsors by tier
  const sponsorsByTier = sponsors.reduce((acc, sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = [];
    }
    acc[sponsor.tier].push(sponsor);
    return acc;
  }, {} as Record<string, Sponsor[]>);

  return (
    <div ref={sectionRef}>
      <div ref={sponsorsRef} class="space-y-16">
        {Object.entries(sponsorsByTier).map(([tier, tierSponsors]) => (
          <div key={tier} class="space-y-8">
            <h3 class="text-2xl text-dc-800 font-medium text-center">
              {tierConfig[tier as keyof typeof tierConfig].title}
            </h3>
            <div class="grid grid-cols-12 gap-8">
              {tierSponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  class={`${
                    tierConfig[tier as keyof typeof tierConfig].class
                  } bg-white rounded-2xl p-8 flex items-center justify-center group hover:shadow-lg transition-shadow duration-300`}
                >
                  <a
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-full h-full flex items-center justify-center"
                    title={`Visit ${sponsor.name}`}
                  >
                    <img
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      class={`${
                        tierConfig[tier as keyof typeof tierConfig].logoClass
                      } w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300`}
                      loading="lazy"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
