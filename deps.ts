import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// GSAP types
declare global {
  interface Window {
    gsap: typeof gsap;
    ScrollTrigger: typeof ScrollTrigger;
  }
}

export type GSAP = typeof gsap;
export type ScrollTriggerType = typeof ScrollTrigger;

// Helper function to initialize GSAP
export function initGSAP() {
  if (typeof window === "undefined") return null;

  if (!gsap || !ScrollTrigger) {
    console.warn("GSAP or ScrollTrigger not loaded");
    return null;
  }

  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}
