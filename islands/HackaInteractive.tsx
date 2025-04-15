import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { initGSAP } from "../deps.ts";

interface Props {
  id: string;
  children: preact.ComponentChildren;
}

export default function HackaInteractive({ id, children }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

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

      // Animate items
      const items = itemsRef.current?.children;
      if (items) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: itemsRef.current,
            start: "top bottom",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
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
    <div ref={sectionRef} id={id}>
      <div ref={contentRef} class="content-wrapper">
        {children}
      </div>
      <div ref={itemsRef} class="items-wrapper">
        {children}
      </div>
    </div>
  );
}
