import { ComponentChildren } from "preact";

interface GooeyFilterProps {
  id?: string;
  strength?: number;
}

export default function GooeyFilter({
  id = "goo-filter",
  strength = 10,
}: GooeyFilterProps) {
  return (
    <svg class="hidden absolute">
      <defs>
        <filter id={id}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={strength}
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
  );
}
