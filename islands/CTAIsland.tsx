import { useEffect, useRef } from "preact/hooks";
import { initGSAP } from "../deps.ts";
import Button from "../components/Button.tsx";

export interface Props {
  /**
   * @description The CTA title
   */
  title: string;
  /**
   * @description The CTA button text
   */
  buttonText: string;
}

export default function CTAIsland({
  title = "Finally, your team leveraging AI productivity without the risks",
  buttonText = "Try now",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsapInstance = initGSAP();
    if (!gsapInstance?.gsap || !gsapInstance?.ScrollTrigger) return;

    const { gsap, ScrollTrigger } = gsapInstance;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
      },
    });

    tl.from(contentRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      class="self-stretch flex flex-col justify-start items-start"
    >
      <div class="self-stretch px-20 pt-32 inline-flex justify-center items-center gap-14">
        <div class="flex-1 h-96 px-10 py-20 relative bg-primary-light rounded-[40px] inline-flex flex-col justify-center items-center gap-20 overflow-hidden">
          <div class="absolute left-[-37px] top-[935.09px] w-[971px] h-[1449px] origin-top-left -rotate-90 opacity-50 bg-yellow-300" />

          <div
            ref={contentRef}
            class="flex flex-col justify-start items-center gap-6 z-10"
          >
            <h2 class="text-center text-primary-dark text-5xl font-medium leading-[50.40px]">
              {title}
            </h2>
            <Button variant="primary">{buttonText}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
