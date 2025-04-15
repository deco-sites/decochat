// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_app from "./routes/_app.tsx";
import * as $index from "./routes/index.tsx";
import * as $AnimatedSponsors from "./islands/AnimatedSponsors.tsx";
import * as $CTAIsland from "./islands/CTAIsland.tsx";
import * as $Features from "./islands/Features.tsx";
import * as $HackaAITechContent from "./islands/HackaAITechContent.tsx";
import * as $HackaFAQAccordion from "./islands/HackaFAQAccordion.tsx";
import * as $HackaHeroContent from "./islands/HackaHeroContent.tsx";
import * as $HackaInteractive from "./islands/HackaInteractive.tsx";
import * as $HackaRegistrationForm from "./islands/HackaRegistrationForm.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_app.tsx": $_app,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/AnimatedSponsors.tsx": $AnimatedSponsors,
    "./islands/CTAIsland.tsx": $CTAIsland,
    "./islands/Features.tsx": $Features,
    "./islands/HackaAITechContent.tsx": $HackaAITechContent,
    "./islands/HackaFAQAccordion.tsx": $HackaFAQAccordion,
    "./islands/HackaHeroContent.tsx": $HackaHeroContent,
    "./islands/HackaInteractive.tsx": $HackaInteractive,
    "./islands/HackaRegistrationForm.tsx": $HackaRegistrationForm,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
