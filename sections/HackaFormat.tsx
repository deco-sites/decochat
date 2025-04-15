import type { ImageWidget } from "apps/admin/widgets.ts";
import { useEffect, useRef } from "preact/hooks";
import { initGSAP } from "../deps.ts";
import Badge from "../components/Badge.tsx";

interface FormatPoint {
  /**
   * @description The format point title
   */
  title: string;
  /**
   * @description The format point description
   */
  description: string;
  /**
   * @description The Material Icons name for the point
   */
  icon: string;
}

interface TimelineEvent {
  /**
   * @description The event date/time
   */
  datetime: string;
  /**
   * @description The event title
   */
  title: string;
  /**
   * @description The event description
   */
  description: string;
  /**
   * @description The Material Icons name for the event
   */
  icon: string;
}

export interface Props {
  /**
   * @description The section title
   * @default "Event Format"
   */
  title?: string;
  /**
   * @description The section description
   */
  description?: string;
  /**
   * @description The format points
   */
  formatPoints?: FormatPoint[];
  /**
   * @description The timeline events
   */
  timelineEvents?: TimelineEvent[];
  /**
   * @description The section id for anchor links
   * @default "format"
   */
  id?: string;
}

export default function HackaFormat({
  title = "Event Format",
  description =
    "This Hackathon is asynchronous, so you can work on your own schedule and collaborate with teammates around the globe. Just make sure you meet the submission deadline. We provide:",
  formatPoints = [
    {
      title: "Office Hours",
      description:
        "Stop by our AI channel for extra help with your project (schedule TBA).",
      icon: "schedule",
    },
    {
      title: "Async Feedback",
      description:
        "Post your questions anytime, and our mentors will respond as soon as possible.",
      icon: "forum",
    },
    {
      title: "Official Results",
      description:
        "Winners announced on Discord at the designated time, with recordings for those who can't attend live.",
      icon: "emoji_events",
    },
  ],
  timelineEvents = [
    {
      datetime: "April 24 (00:00 UTC)",
      title: "Hackathon Opens",
      description: "Access our Discord and the Deco platform.",
      icon: "rocket_launch",
    },
    {
      datetime: "Time TBA",
      title: "Introduction to MCPs & AI Agents",
      description:
        "Theoretical foundations + practical examples, also available asynchronously.",
      icon: "school",
    },
    {
      datetime: "Time TBA",
      title: "Technical Demo of the Deco platform",
      description:
        "Tour of Deco.chat & Deco.host, also available asynchronously.",
      icon: "code",
    },
    {
      datetime: "Until April 25 (23:59 UTC)",
      title: "Project Development",
      description:
        "Work solo or in teams. Get async feedback from mentors and join Office Hours.",
      icon: "engineering",
    },
    {
      datetime: "April 26 (15:00 UTC)",
      title: "Results Announcement",
      description:
        "Winners revealed, prizes awarded, and demo recordings available to all participants.",
      icon: "celebration",
    },
  ],
  id = "format",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formatRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

      // Animate format points
      const points = formatRef.current?.children;
      if (points) {
        gsap.from(points, {
          scrollTrigger: {
            trigger: formatRef.current,
            start: "top bottom",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        });
      }

      // Animate timeline
      const events = timelineRef.current?.children;
      if (events) {
        gsap.from(events, {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top bottom",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          y: 30,
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
      class="w-full bg-dc-50 px-4 md:px-20 py-16 md:py-32"
    >
      <div class="max-w-[1200px] mx-auto">
        <div
          ref={contentRef}
          class="text-center mb-16 md:mb-24"
        >
          <Badge text="Format & Timeline" variant="primary" />
          <h2 class="text-3xl md:text-5xl text-dc-900 font-medium mt-6 mb-8">
            {title}
          </h2>
          <p class="text-lg md:text-xl text-dc-800 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 md:mb-24">
          <div
            ref={formatRef}
            class="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {formatPoints.map((point) => (
              <div class="bg-white rounded-2xl p-6 shadow-sm">
                <div class="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                  <span class="material-icons text-2xl text-primary-dark">
                    {point.icon}
                  </span>
                </div>
                <h3 class="text-xl text-dc-900 font-medium mb-2">
                  {point.title}
                </h3>
                <p class="text-dc-700">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div class="relative">
          <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-primary-dark/20">
          </div>
          <div
            ref={timelineRef}
            class="relative space-y-12"
          >
            {timelineEvents.map((event, index) => (
              <div
                class={`flex flex-col md:flex-row gap-8 md:gap-16 items-start ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div class={`flex-1 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                  <div class="text-sm text-primary-dark/60 mb-1">
                    {event.datetime}
                  </div>
                  <h3 class="text-xl text-dc-900 font-medium mb-2">
                    {event.title}
                  </h3>
                  <p class="text-dc-700">
                    {event.description}
                  </p>
                </div>
                <div class="relative flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md z-10">
                  <span class="material-icons text-2xl text-primary-dark">
                    {event.icon}
                  </span>
                </div>
                <div class="flex-1 md:invisible md:hidden"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
