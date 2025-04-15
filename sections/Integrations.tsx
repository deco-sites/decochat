import type { ImageWidget } from "apps/admin/widgets.ts";
import { useEffect, useRef } from "preact/hooks";
import { initGSAP } from "../deps.ts";
import Badge from "../components/Badge.tsx";
import Button from "../components/Button.tsx";

export interface IntegrationLogo {
  /**
   * @description The integration logo image
   */
  image: ImageWidget;
  /**
   * @description Alt text for the logo
   */
  alt: string;
}

export interface Props {
  /**
   * @description The section title
   */
  title: string;
  /**
   * @description The section badge text
   * @default "Integrations"
   */
  badgeText?: string;
  /**
   * @description The section badge icon (Material Icons name)
   */
  badgeIcon?: string;
  /**
   * @description The integration logos to display
   */
  logos: IntegrationLogo[];
  /**
   * @description The floating logos at the bottom
   */
  floatingLogos: IntegrationLogo[];
  /**
   * @description The "See all integrations" button link
   */
  buttonLink?: string;
}

export default function Integrations({
  title = "Connect all your data quickly and securely",
  badgeText = "Integrations",
  badgeIcon = "",
  logos = Array(48).fill({
    image: "https://placehold.co/60x60",
    alt: "Integration logo",
  }),
  floatingLogos = Array(6).fill({
    image: "https://placehold.co/74x74",
    alt: "Floating integration logo",
  }),
  buttonLink = "#",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsapInstance = initGSAP();
    if (!gsapInstance?.gsap || !gsapInstance?.ScrollTrigger) return;

    const { gsap, ScrollTrigger } = gsapInstance;

    // Animate grid logos
    const gridItems = gridRef.current?.children;
    if (gridItems) {
      gsap.from(Array.from(gridItems), {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: {
          amount: 1,
          grid: [8, 6],
          from: "center",
        },
        ease: "back.out(1.7)",
      });
    }

    // Animate floating logos
    const floatingItems = floatingRef.current?.children;
    if (floatingItems) {
      gsap.to(Array.from(floatingItems), {
        y: "random(-10, 10)",
        rotation: "random(-8, 8)",
        duration: "random(2, 3)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 0.5,
          from: "random",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      class="self-stretch bg-dc-50 px-4 md:px-20 pt-16 md:pt-32 mb-16 md:mb-32 relative flex flex-col justify-center items-center gap-16 md:gap-32 overflow-hidden"
    >
      <div class="w-full max-w-[1500px] mx-auto flex flex-col justify-center items-center gap-16 md:gap-32">
        <div class="flex flex-col justify-start items-center gap-4 md:gap-6 relative z-10">
          <Badge text={badgeText} variant="purple" icon={badgeIcon} />
          <div
            ref={floatingRef}
            class="absolute w-full h-full z-1"
            style={{ width: "130%", height: "150%" }}
          >
            {floatingLogos.map((logo, index) => {
              const positions = [
                { left: "-20%", top: "11%", scale: 0.8, rotate: -12 },
                { left: "108%", top: "11%", scale: 0.8, rotate: 12 },
                { left: "1%", top: "-7%", scale: 1.5, rotate: 10 },
                { left: "88%", top: "-7%", scale: 1.5, rotate: -10 },
                { left: "-6%", top: "40%", scale: 1.1, rotate: -5 },
                { left: "93%", top: "40%", scale: 1, rotate: 5 },
              ];
              const pos = positions[index] || positions[0];
              return (
                <div
                  class="w-24 h-24 bg-white rounded-3xl outline outline-1 outline-offset-[-1px] outline-dc-200 inline-flex justify-center items-center absolute hidden md:flex"
                  style={{
                    left: pos.left,
                    top: pos.top,
                    transform: `scale(${pos.scale}) rotate(${pos.rotate}deg)`,
                  }}
                >
                  <img
                    class="w-16 h-16 object-contain"
                    src={logo.image}
                    alt={logo.alt}
                  />
                </div>
              );
            })}
          </div>
          <h2 class="text-center text-dc-900 text-3xl md:text-5xl sm:max-w-xl font-medium leading-tight relative z-10 px-4">
            {title}
          </h2>
          <div class="relative z-10">
            <Button variant="outline" href={buttonLink}>
              See all integrations
            </Button>
          </div>
        </div>

        <div
          ref={gridRef}
          class="self-stretch -mx-4 md:mx-0 max-h-[400px] md:max-h-[600px] overflow-hidden"
        >
          <div class="inline-flex justify-center items-start gap-2 flex-wrap content-start px-4 md:px-0">
            {logos.map((logo) => (
              <div class="w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-3xl outline outline-[1.51px] outline-offset-[-1.51px] outline-dc-200 flex justify-center items-center gap-5 overflow-hidden">
                <img
                  class="w-10 h-10 md:w-16 md:h-16 object-contain"
                  src={logo.image}
                  alt={logo.alt}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div class="w-full h-1/2 left-0 bottom-0 absolute bg-gradient-to-b from-dc-50/0 to-dc-50" />
    </div>
  );
}
