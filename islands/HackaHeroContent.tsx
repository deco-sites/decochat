import { Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import Button from "../components/Button.tsx";

interface Props {
  endDate: string;
  title: string;
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
    <div class="flex flex-col items-center text-center">
      <h1 class="text-4xl md:text-8xl max-w-2xl text-primary-light font-semibold mb-6">
        {title}
      </h1>
      <p class="text-xl text-dc-50 max-w-3xl mx-auto">
        {description}
      </p>

      {/* Highlight Points */}
      <div class="flex items-center gap-6 my-12">
        {highlights.map((highlight, index) => (
          <>
            <div class="flex items-center gap-2">
              <span class="material-icons text-2xl text-primary-light">
                {highlight.icon}
              </span>
              <span class="text-lg text-dc-50">
                {highlight.text}
              </span>
            </div>
            {index < highlights.length - 1 && (
              <div class="h-6 w-px bg-dc-50/20" />
            )}
          </>
        ))}
      </div>

      <Button
        variant="outline-light"
        size="lg"
        href={ctaLink}
      >
        {ctaText}
      </Button>

      {/* Countdown Timer */}
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 grid grid-cols-4 gap-2 max-w-3xl sm:max-w-xl mx-auto mb-6">
        <div class="bg-primary-light rounded-2xl p-4">
          <div class="text-3xl font-semibold text-primary-dark mb-2">
            {timeLeft.value.days}
          </div>
          <div class="text-primary-dark/80">Days</div>
        </div>
        <div class="bg-primary-light rounded-2xl p-4">
          <div class="text-3xl font-semibold text-primary-dark mb-2">
            {timeLeft.value.hours}
          </div>
          <div class="text-primary-dark/80">Hours</div>
        </div>
        <div class="bg-primary-light rounded-2xl p-4">
          <div class="text-3xl font-semibold text-primary-dark mb-2">
            {timeLeft.value.minutes}
          </div>
          <div class="text-primary-dark/80">Minutes</div>
        </div>
        <div class="bg-primary-light rounded-2xl p-4">
          <div class="text-3xl font-semibold text-primary-dark mb-2">
            {timeLeft.value.seconds}
          </div>
          <div class="text-primary-dark/80">Seconds</div>
        </div>
      </div>
    </div>
  );
}
