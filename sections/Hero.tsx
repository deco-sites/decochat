import type { ImageWidget } from "apps/admin/widgets.ts";
import { useEffect, useRef } from "preact/hooks";
import { initGSAP } from "../deps.ts";
import Button from "../components/Button.tsx";

export interface Props {
  /**
   * @description The main logo image
   * @title Logo
   */
  logo: ImageWidget;
  /**
   * @description The subtitle text below the title
   */
  subtitle: string;
  /**
   * @description The main hero image for desktop
   */
  heroImage: ImageWidget;
  /**
   * @description The main hero image for mobile
   */
  heroImageMobile: ImageWidget;
  /**
   * @description The background pattern image
   */
  backgroundImage: ImageWidget;
  /**
   * @description Primary button text
   */
  primaryButtonText: string;
  /**
   * @description Primary button link
   */
  primaryButtonLink?: string;
  /**
   * @description Secondary button text
   */
  secondaryButtonText: string;
  /**
   * @description Secondary button link
   */
  secondaryButtonLink?: string;
}

export default function Hero({
  logo = "https://placehold.co/200x80",
  subtitle = "",
  heroImage = "https://placehold.co/1363x497",
  heroImageMobile = heroImage,
  backgroundImage = "",
  primaryButtonText = "Try now",
  primaryButtonLink = "#",
  secondaryButtonText = "Learn more",
  secondaryButtonLink = "#",
}: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const gsapInstance = initGSAP();
    if (!gsapInstance?.gsap) return;

    const { gsap } = gsapInstance;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(contentRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
    })
      .from(imageRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
      }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={heroRef}
      class="w-full bg-dc-50 px-4 pt-4 pb-16 md:pb-32"
    >
      <div class="mx-auto">
        <div class="relative min-h-[600px] max-h-[700px] md:min-h-[900px] md:max-h-[1000px] bg-primary-light rounded-3xl flex flex-col gap-14 md:gap-24 items-center overflow-hidden">
          {/* Background pattern */}
          {backgroundImage && (
            <div
              class="absolute inset-0 z-0 opacity-50"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                mixBlendMode: "multiply",
              }}
            />
          )}
          <div
            ref={contentRef}
            class="flex flex-col items-center z-10 pt-12 md:pt-24"
          >
            <img
              src={logo}
              alt="Logo"
              class="h-12 md:h-24 w-auto object-contain mb-4 md:mb-6"
            />

            {subtitle && (
              <p class="text-center text-2xl sm:text-3xl text-primary-dark font-medium max-w-xl px-4">
                {subtitle}
              </p>
            )}
          </div>

          <div class="relative w-full flex-1 md:h-[600px] flex items-start justify-center">
            <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20 w-[90%] sm:w-fit">
              <div class="flex flex-col md:flex-row gap-2 bg-white px-3 md:px-4 py-3 rounded-2xl w-full sm:w-fit sm:rounded-full [box-shadow:0px_71px_20px_0px_rgba(1,19,7,0.00),0px_45px_18px_0px_rgba(1,19,7,0.02),0px_26px_15px_0px_rgba(1,19,7,0.07),0px_11px_11px_0px_rgba(1,19,7,0.11),0px_3px_6px_0px_rgba(1,19,7,0.13)]">
                <a
                  href={primaryButtonLink}
                  class="px-4 md:px-6 py-2 bg-primary-dark text-primary-light rounded-full hover:bg-opacity-90 transition-colors text-base"
                >
                  {primaryButtonText}
                </a>
                <a
                  href={secondaryButtonLink}
                  class="px-4 md:px-6 py-2 bg-dc-200 text-dc-700 rounded-full hover:bg-opacity-90 transition-colors text-base"
                >
                  {secondaryButtonText}
                </a>
              </div>
            </div>

            <picture class="w-full h-full flex items-start justify-center">
              <source media="(min-width: 768px)" srcset={heroImage} />
              <img
                ref={imageRef}
                class="w-full h-full object-cover opacity-90 max-w-[1400px]"
                src={heroImageMobile}
                alt="Hero illustration"
                style={{
                  objectPosition: "center top",
                }}
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
}
