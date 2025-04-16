import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "../sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  return (
    <html class="bg-dc-50">
      {/* Include default fonts and css vars */}
      <Theme colorScheme="any" />

      {/* Include Icons and manifest */}
      <Head>
        {/* Viewport meta tag for proper mobile scaling */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />

        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />

        {/* Material Icons font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />

        {/* GSAP */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js">
        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js">
        </script>

        {/* Switzer font */}
        <link href={asset("/fonts.css")} rel="stylesheet" />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        <style>
          {`
            .material-symbols-rounded {
              font-variation-settings:
              'FILL' 1,
              'wght' 400,
              'GRAD' 0,
              'opsz' 24
            }
          `}
        </style>
      </Head>

      {/* Rest of Preact tree */}
      <body class="bg-dc-50">
        <ctx.Component />
      </body>
    </html>
  );
});
