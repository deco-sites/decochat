import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import PixelTrail from "./PixelTrail.tsx";

interface Props {
  class?: string;
}

export default function HackaHeroInteractive({ class: className }: Props) {
  const screenSize = useSignal("xs");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1536) screenSize.value = "2xl";
      else if (width >= 1280) screenSize.value = "xl";
      else if (width >= 1024) screenSize.value = "lg";
      else if (width >= 768) screenSize.value = "md";
      else if (width >= 640) screenSize.value = "sm";
      else screenSize.value = "xs";
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div class={`absolute inset-0 ${className ?? ""}`}>
      <svg class="hidden absolute">
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={5}
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        class="absolute inset-0 z-0"
        style={{ filter: "url(#gooey-filter)" }}
      >
        <PixelTrail
          pixelSize={screenSize.value === "xs" || screenSize.value === "sm"
            ? 24
            : 32}
          fadeDuration={500}
          delay={0}
          pixelClassName="bg-white/20"
        />
      </div>
    </div>
  );
}
