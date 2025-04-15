import type { ImageWidget } from "apps/admin/widgets.ts";
import Button from "../components/Button.tsx";

export interface Props {
  /**
   * @description The CTA title
   */
  title?: string;
  /**
   * @description The button text
   */
  buttonText?: string;
  /**
   * @description The button link
   */
  buttonLink?: string;
  /**
   * @description The background pattern image
   */
  backgroundImage?: ImageWidget;
}

export default function CTA({
  title = "Finally, your team leveraging AI productivity without the risks",
  buttonText = "Try now",
  buttonLink = "#",
  backgroundImage,
}: Props) {
  return (
    <div class="w-full relative z-10 px-4 md:px-20 -mb-16 md:-mb-32">
      <div class="max-w-[1500px] mx-auto">
        <div class="w-full bg-primary-light rounded-2xl md:rounded-3xl px-4 md:px-6 py-16 md:py-32 flex flex-col items-center justify-center gap-6 md:gap-8 relative overflow-hidden">
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

          <div class="max-w-3xl mx-auto text-center relative z-10 px-4">
            <h2 class="text-primary-dark text-3xl md:text-5xl font-medium leading-tight mb-6 md:mb-8">
              {title}
            </h2>
            <Button variant="primary" href={buttonLink}>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
