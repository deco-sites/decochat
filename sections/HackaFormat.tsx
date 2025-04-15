import type { ImageWidget } from "apps/admin/widgets.ts";
import { useEffect, useRef } from "preact/hooks";
import { initGSAP } from "../deps.ts";
import Badge from "../components/Badge.tsx";

interface Highlight {
  /**
   * @description The highlight title
   */
  title: string;
  /**
   * @description The highlight datetime or location
   */
  info: string;
  /**
   * @description The Material Icons name for the highlight
   */
  icon: string;
}

interface Support {
  /**
   * @description The support title
   */
  title: string;
  /**
   * @description The support description
   */
  description: string;
  /**
   * @description The Material Icons name for the support
   */
  icon: string;
}

interface TimelineEvent {
  /**
   * @description The event date
   */
  date: string;
  /**
   * @description The event title
   */
  title: string;
  /**
   * @description The event items/activities
   */
  items: Array<{
    /**
     * @description The item content that supports HTML
     * @format rich-text
     */
    content: string;
  }>;
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
   * @description The key highlights
   */
  highlights?: Highlight[];
  /**
   * @description What we provide items
   */
  supportItems?: Support[];
  /**
   * @description The timeline events
   */
  timelineEvents?: TimelineEvent[];
  /**
   * @description The section id for anchor links
   * @default "format"
   */
  id?: string;
  /**
   * @description The badge text
   * @default "Event Details"
   */
  badgeText?: string;
}

export default function HackaFormat({
  title = "Event Format",
  description =
    "Join us for an exciting hackathon where you'll learn about AI Agents and MCPs, build innovative solutions, and compete for prizes.",
  highlights = [
    {
      title: "Technical Introduction & Mentorship",
      info: "April 25, starting 1:00pm UTC",
      icon: "schedule",
    },
    {
      title: "Submission Deadline",
      info: "April 26, 3:00pm UTC",
      icon: "task_alt",
    },
    {
      title: "Winner Announcements",
      info: "April 26, 7:00pm UTC (on our Discord, recording available)",
      icon: "emoji_events",
    },
    {
      title: "Where",
      info: "deco.cx/discord",
      icon: "chat",
    },
    {
      title: "Prizes",
      info: "Over $1,000 in credits and more",
      icon: "redeem",
    },
  ],
  supportItems = [
    {
      title: "Office Hours",
      description: "Drop into our AI channel for extra help (schedule TBA)",
      icon: "support_agent",
    },
    {
      title: "Async Feedback",
      description: "Post questions anytime—mentors will respond ASAP",
      icon: "forum",
    },
    {
      title: "Official Results",
      description: "Winners announced live, with replays if you miss it",
      icon: "celebration",
    },
  ],
  timelineEvents = [
    {
      date: "April 25",
      title: "Hackathon Officially Opens",
      items: [
        {
          content:
            "Join our <a href='https://deco.cx/discord' class='underline hover:text-purple-light transition-colors'>Discord</a> and explore the Deco platform",
        },
        {
          content:
            "(Time TBA): Intro to MCPs & AI Agents (theory + practical demos), also accessible async",
        },
        {
          content:
            "(Time TBA): Demo of the <a href='https://deco.chat' class='underline hover:text-purple-light transition-colors'>Deco platform</a> (tour of <a href='https://deco.chat' class='underline hover:text-purple-light transition-colors'>Deco.chat</a> & <a href='https://deco.host' class='underline hover:text-purple-light transition-colors'>Deco.host</a>), with technical and non-technical resources",
        },
        {
          content:
            "Start brainstorming and building! Work solo or in teams and ask mentors for feedback and join Office Hours",
        },
      ],
    },
    {
      date: "April 26",
      title: "Demo Submission and Results Announcement",
      items: [
        {
          content:
            "Record a short demo video of your solution (submission details at the event)",
        },
        {
          content: "Winners revealed",
        },
        {
          content: "Prizes awarded",
        },
      ],
    },
  ],
  id = "format",
  badgeText = "Event Details",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
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
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        });
      }

      // Animate support items
      const items = supportRef.current?.children;
      if (items) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: supportRef.current,
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
          stagger: 0.3,
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
      class="w-full bg-dc-50 px-4 md:px-20 py-24 md:py-32"
    >
      <div class="max-w-[1200px] mx-auto">
        {/* Top section: Main content on left, Highlights on right */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 mb-16 md:mb-24">
          {/* Main Content */}
          <div
            ref={contentRef}
            class="text-left order-1"
          >
            <Badge text={badgeText} variant="primary" />
            <h2 class="text-3xl md:text-5xl text-primary-dark font-medium mt-6 mb-8">
              {title}
            </h2>
            <p class="text-lg md:text-xl text-dc-600 max-w-3xl">
              {description}
            </p>
          </div>

          {/* Key Highlights */}
          <div class="h-full flex flex-col order-2">
            <div
              ref={highlightsRef}
              class="space-y-4 h-full flex flex-col justify-center"
            >
              {highlights.map((highlight) => (
                <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 flex items-center gap-4 border border-primary-dark/10">
                  <div class="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-dc-100 flex items-center justify-center flex-shrink-0">
                    <span class="material-symbols-rounded text-xl md:text-2xl text-dc-700">
                      {highlight.icon}
                    </span>
                  </div>
                  <div>
                    <h4 class="text-primary-dark font-medium">
                      {highlight.title}
                    </h4>
                    <p class="text-lg sm:text-xl text-primary-dark/60">
                      {highlight.info}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Events in 2 columns */}
        <div class="mb-16 md:mb-24">
          <div
            ref={timelineRef}
            class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
          >
            {timelineEvents.map((event, index) => (
              <div
                class={`backdrop-blur-sm rounded-2xl p-8 border ${
                  index === 0
                    ? "bg-primary-light border-primary-light"
                    : "bg-yellow-light border-yellow-light"
                }`}
              >
                <div class="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                  <div class="flex items-center gap-3 whitespace-nowrap">
                    <div
                      class={`w-10 h-10 rounded-lg flex items-center justify-center font-medium ${
                        index === 0
                          ? "bg-primary-dark text-primary-light"
                          : "bg-yellow-dark text-yellow-light"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h4
                      class={`text-xl font-medium ${
                        index === 0 ? "text-primary-dark" : "text-yellow-dark"
                      }`}
                    >
                      {event.date}
                    </h4>
                  </div>
                  <div
                    class={`hidden md:block w-8 h-[2px] ${
                      index === 0 ? "bg-primary-dark/20" : "bg-yellow-dark/20"
                    }`}
                  >
                  </div>
                  <h4
                    class={`text-xl font-medium ${
                      index === 0 ? "text-primary-dark" : "text-yellow-dark"
                    }`}
                  >
                    {event.title}
                  </h4>
                </div>
                <div
                  class={`space-y-8 relative before:absolute before:left-[6px] before:top-0 before:bottom-0 before:w-[2px] ${
                    index === 0
                      ? "before:bg-primary-dark/20"
                      : "before:bg-yellow-dark/20"
                  }`}
                >
                  {event.items.map((item) => (
                    <div
                      class={`flex items-start gap-4 group pl-6 text-lg sm:text-xl ${
                        index === 0
                          ? "text-primary-dark/90"
                          : "text-yellow-dark/90"
                      }`}
                    >
                      <div
                        class={`absolute left-[6px] w-3 h-3 rounded-full mt-[8px] -translate-x-[6px] group-hover:scale-150 transition-transform ${
                          index === 0
                            ? "bg-primary-dark/50"
                            : "bg-yellow-dark/50"
                        }`}
                      >
                      </div>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What We Provide */}
        <div>
          <h3 class="text-2xl md:text-3xl text-primary-dark font-medium mb-6 md:mb-8 text-center">
            What We Provide
          </h3>
          <div
            ref={supportRef}
            class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {supportItems.map((item) => (
              <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-primary-dark/10">
                <div class="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-dc-100 flex items-center justify-center mb-4">
                  <span class="material-symbols-rounded text-xl md:text-2xl text-dc-700">
                    {item.icon}
                  </span>
                </div>
                <h4 class="text-lg md:text-xl text-primary-dark font-medium mb-2">
                  {item.title}
                </h4>
                <p class="text-lg sm:text-xl text-primary-dark/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
