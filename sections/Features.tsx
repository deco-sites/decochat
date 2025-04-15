import type { ImageWidget } from "apps/admin/widgets.ts";
import { useEffect, useRef } from "preact/hooks";
import { initGSAP } from "../deps.ts";
import Badge from "../components/Badge.tsx";

export interface FeatureCard {
  /**
   * @description The badge text for the feature
   */
  badgeText: string;
  /**
   * @description The badge variant/color
   */
  badgeVariant: "primary" | "purple" | "yellow";
  /**
   * @description The Material Icons name for the badge (optional)
   */
  badgeIcon?: string;
  /**
   * @description The feature title
   */
  title: string;
  /**
   * @description The feature image
   */
  image: ImageWidget;
  /**
   * @description The background color class
   */
  bgColor: string;
}

export interface Props {
  /**
   * @description The section title
   */
  title: string;
  /**
   * @description The section badge text
   * @default "How it works"
   */
  badgeText?: string;
  /**
   * @description The section badge icon (Material Icons name)
   */
  badgeIcon?: string;
  /**
   * @description The features to display
   */
  features: FeatureCard[];
  /**
   * @description The section id for anchor links
   * @default "features"
   */
  id?: string;
}

export default function Features({
  title = "Everything you need to become an AI-first organization",
  badgeText = "How it works",
  badgeIcon = "",
  features = [
    {
      badgeText: "Autonomy",
      badgeVariant: "primary",
      badgeIcon: "smart_toy",
      title: "Anyone can solve problems and automate work with AI",
      image: "https://placehold.co/380x329",
      bgColor: "bg-primary-light",
    },
    {
      badgeText: "Context",
      badgeVariant: "purple",
      badgeIcon: "data_object",
      title: "Unified data & global strategy embedded in every interaction",
      image: "https://placehold.co/419x309",
      bgColor: "bg-purple-light",
    },
    {
      badgeText: "Governance",
      badgeVariant: "yellow",
      badgeIcon: "security",
      title: "Full control over usage, permissions, and cost",
      image: "https://placehold.co/419x431",
      bgColor: "bg-yellow-light",
    },
  ],
  id = "features",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const gsapInstance = initGSAP();
    if (!gsapInstance?.gsap || !gsapInstance?.ScrollTrigger) return;

    const { gsap, ScrollTrigger } = gsapInstance;

    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate cards
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top center+=100",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id={id}
      class="self-stretch bg-dc-50 px-4 md:px-20 py-16 md:py-32 flex flex-col justify-center items-center gap-8 md:gap-14 overflow-hidden"
    >
      <div class="w-full max-w-[1500px] mx-auto flex flex-col justify-center items-center gap-8 md:gap-14">
        <div class="flex flex-col justify-start items-center gap-4 md:gap-6">
          <Badge text={badgeText} variant="yellow" icon={badgeIcon} />
          <h2
            ref={titleRef}
            class="text-center text-dc-800 text-3xl md:text-5xl max-w-3xl font-medium leading-tight px-4"
          >
            {title}
          </h2>
        </div>

        <div
          ref={cardsRef}
          class="self-stretch rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-hidden px-0 md:px-4"
        >
          {features.map((feature) => (
            <div
              class={`min-h-[450px] md:min-h-[530px] px-4 md:px-8 pt-6 md:pt-8 ${feature.bgColor} rounded-3xl flex flex-col items-center overflow-hidden relative`}
            >
              <div class="w-full flex flex-col justify-start items-start gap-4 md:gap-6 mb-4">
                <Badge
                  text={feature.badgeText}
                  variant={feature.badgeVariant}
                  isDark={true}
                  icon={feature.badgeIcon}
                />
                <div class="w-full text-dc-900 text-2xl md:text-3xl font-medium leading-tight">
                  {feature.title}
                </div>
              </div>
              <img
                class="absolute bottom-0 left-0 right-0 w-full h-auto max-h-64 md:max-h-80 object-contain"
                src={feature.image}
                alt={feature.badgeText}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
