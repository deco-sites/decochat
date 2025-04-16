import { Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { VNode } from "preact";
import Button from "../components/Button.tsx";
import { JSX } from "preact";

interface Props {
  endDate: string;
  title: string;
  /**
   * @description Hero description that supports HTML content
   * @format rich-text
   */
  description: string;
  ctaText: string;
  ctaLink: string;
  /**
   * @description Highlight points to display below the button
   */
  highlights?: {
    /**
     * @description The text to display
     */
    text: string;
    /**
     * @description Material icon name
     */
    icon: string;
    /**
     * @description Optional URL for the highlight text
     */
    link?: string;
  }[];
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function HackaHeroContent({
  endDate,
  title,
  description,
  ctaText,
  ctaLink,
  highlights = [
    {
      text: "100% remote",
      icon: "public",
    },
    {
      text: "April 24",
      icon: "event",
    },
    {
      text: "$1,000 in prizes",
      icon: "emoji_events",
    },
  ],
}: Props) {
  const timeLeft = useSignal<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(endDate) - +new Date();

      if (difference > 0) {
        timeLeft.value = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div class="flex flex-col items-start sm:items-center text-left sm:text-center">
      <h1 class="text-4xl md:text-6xl lg:text-7xl max-w-2xl text-primary-light font-semibold mb-3 md:mb-6 opacity-0 animate-fade-up [animation-delay:400ms]">
        {title}
      </h1>
      <p
        class="text-lg md:text-xl text-dc-50 max-w-3xl sm:mx-auto mb-6 md:mb-12 pr-2 sm:px-2 md:px-4 opacity-0 animate-fade-up [animation-delay:600ms]"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {/* Highlight Points */}
      <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-6 md:mb-12 opacity-0 animate-fade-up [animation-delay:800ms]">
        {highlights.map((highlight, index) => (
          <>
            <div class="flex items-center gap-2">
              <span class="material-symbols-rounded text-lg md:text-2xl text-primary-light">
                {highlight.icon}
              </span>
              {highlight.link
                ? (
                  <a
                    href={highlight.link}
                    class="text-lg md:text-lg text-dc-50 hover:text-purple-light transition-colors"
                  >
                    {highlight.text}
                  </a>
                )
                : (
                  <span class="text-lg md:text-lg text-dc-50">
                    {highlight.text}
                  </span>
                )}
            </div>
            {index < highlights.length - 1 && (
              <div class="hidden sm:block h-6 w-px bg-dc-50/20" />
            )}
          </>
        ))}
      </div>

      <div class="mb-8 md:mb-0 opacity-0 animate-fade-up [animation-delay:1000ms]">
        <Button
          variant="outline-light"
          size="lg"
          href={ctaLink}
          onClick={(e: MouseEvent) => {
            e.preventDefault();
            const targetId = ctaLink.replace("#", "");
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          {ctaText}
        </Button>
      </div>

      {/* Countdown Timer */}
      <div class="w-full mt-4 md:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-3xl sm:max-w-xl sm:mx-auto pr-2 sm:px-2 md:px-4 opacity-0 animate-fade-up [animation-delay:1200ms]">
        <div class="bg-primary-light/10 rounded-xl md:rounded-2xl p-2 md:p-4">
          <div class="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-light mb-0 md:mb-2">
            {timeLeft.value.days}
          </div>
          <div class="text-lg md:text-lg text-primary-light/80">Days</div>
        </div>
        <div class="bg-primary-light/10 rounded-xl md:rounded-2xl p-2 md:p-4">
          <div class="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-light mb-0 md:mb-2">
            {timeLeft.value.hours}
          </div>
          <div class="text-lg md:text-lg text-primary-light/80">Hours</div>
        </div>
        <div class="bg-primary-light/10 rounded-xl md:rounded-2xl p-2 md:p-4">
          <div class="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-light mb-0 md:mb-2">
            {timeLeft.value.minutes}
          </div>
          <div class="text-lg md:text-lg text-primary-light/80">Minutes</div>
        </div>
        <div class="bg-primary-light/10 rounded-xl md:rounded-2xl p-2 md:p-4">
          <div class="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-light mb-0 md:mb-2">
            {timeLeft.value.seconds}
          </div>
          <div class="text-lg md:text-lg text-primary-light/80">Seconds</div>
        </div>
      </div>
    </div>
  );
}
