import type { ImageWidget } from "apps/admin/widgets.ts";
import { useEffect, useRef } from "preact/hooks";
import { initGSAP } from "../deps.ts";
import Badge from "../components/Badge.tsx";

interface Highlight {
  /**
   * @description The highlight text
   */
  text: string;
  /**
   * @description The Material Icons name for the highlight
   */
  icon: string;
}

export interface Props {
  /**
   * @description The section title
   * @default "What's This Hackathon About?"
   */
  title?: string;
  /**
   * @format rich-text
   * @description The section description
   */
  description?: string;
  /**
   * @description The key highlights
   */
  highlights?: Highlight[];
  /**
   * @description The section id for anchor links
   * @default "about"
   */
  id?: string;
  /**
   * @description The badge text
   * @default "About"
   */
  badgeText?: string;
}

export default function HackaAbout({
  title = "What's This Hackathon About?",
  description =
    "We're bringing developers together from around the world for a hands-on experience in building MCPs and AI Agents. This is your chance to learn the core concepts, experiment with real solutions, and take your AI skills to the next level. Plus, you'll get mentorship from the deco team and become eligible for awesome prizes.",
  highlights = [
    {
      text:
        "100% remote & asynchronous: Work at your own pace, wherever you are in the world.",
      icon: "public",
    },
    {
      text: "Submission Deadline: April 25, 23:59 UTC.",
      icon: "event",
    },
    {
      text:
        "Winner Announcements: April 26, 15:00 UTC on our Discord (recorded for anyone who can't attend live).",
      icon: "emoji_events",
    },
    {
      text: "Where: deco's Discord server",
      icon: "forum",
    },
    {
      text: "Awesome prizes",
      icon: "star",
    },
  ],
  id = "about",
  badgeText = "About",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

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
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate highlights
      const highlights = highlightsRef.current?.children;
      if (highlights) {
        gsap.from(highlights, {
          scrollTrigger: {
            trigger: highlightsRef.current,
            start: "top bottom",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          x: 50,
          opacity: 0,
          duration: 0.6,
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

  return (
    <div
      ref={sectionRef}
      id={id}
      class="w-full bg-dc-50 px-4 py-24 md:py-40"
    >
      <div class="max-w-[1440px] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div ref={contentRef} class="max-w-xl">
            <Badge text={badgeText} variant="primary" />
            <h2 class="text-3xl md:text-5xl text-dc-800 font-medium mt-6 mb-8">
              {title}
            </h2>
            <p
              class="text-lg sm:text-xl text-dc-600"
              dangerouslySetInnerHTML={{
                __html:
                  `<div class="space-y-0 text-lg sm:text-xl text-dc-600 md:leading-[1.5]">${description}</div>`,
              }}
            >
            </p>
          </div>

          <div class="space-y-8">
            <div
              ref={highlightsRef}
              class="space-y-4"
            >
              {highlights.map((highlight) => (
                <div class="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm">
                  <div class="w-12 h-12 rounded-xl bg-dc-100 flex items-center justify-center flex-shrink-0">
                    <span class="material-symbols-rounded text-2xl text-dc-700">
                      {highlight.icon}
                    </span>
                  </div>
                  <p class="text-lg sm:text-xl text-dc-700 flex-1">
                    {highlight.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
