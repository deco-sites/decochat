import { useCallback, useEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { JSX } from "preact";

interface PixelTrailProps {
  pixelSize: number;
  fadeDuration?: number;
  delay?: number;
  class?: string;
  pixelClassName?: string;
}

export default function PixelTrail({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  class: className,
  pixelClassName,
}: PixelTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const width = useSignal(0);
  const height = useSignal(0);
  const trailId = useRef(`trail-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    let timeoutId: number;

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        width.value = rect.width;
        height.value = rect.height;
      }
    };

    const debouncedUpdateDimensions = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 250);
    };

    updateDimensions();
    window.addEventListener("resize", debouncedUpdateDimensions);

    return () => {
      window.removeEventListener("resize", debouncedUpdateDimensions);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);

      const pixelElement = document.getElementById(
        `${trailId.current}-pixel-${x}-${y}`,
      );
      if (pixelElement) {
        pixelElement.style.opacity = "1";
        setTimeout(() => {
          pixelElement.style.opacity = "0";
        }, delay);
      }
    },
    [pixelSize, delay],
  );

  const columns = Math.ceil(width.value / pixelSize) || 0;
  const rows = Math.ceil(height.value / pixelSize) || 0;

  return (
    <div
      ref={containerRef}
      class={`absolute inset-0 w-full h-full pointer-events-auto ${
        className ?? ""
      }`}
      onMouseMove={handleMouseMove}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} class="flex">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId.current}-pixel-${colIndex}-${rowIndex}`}
              class={`transition-opacity duration-500 ${pixelClassName ?? ""}`}
              style={{
                width: `${pixelSize}px`,
                height: `${pixelSize}px`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
