import type { Handlers } from "$fresh/server.ts";
import { type DecoState } from "@deco/deco";
import { verifyCaptcha } from "site/sdk/recaptcha.ts";
import { getSupabaseClient } from "site/clients/supabase.ts";
const ZAPIER_WEBHOOK = Deno.env.get("ZAPIER_WEBHOOK");
export const handler: Handlers<null, DecoState> = {
  POST: async (req) => {
    const formData = Object.fromEntries((await req.formData()).entries());
    const recaptchaToken = formData["g-recaptcha-response"];
    const isCaptchaValid = !!recaptchaToken ||
      (await verifyCaptcha(recaptchaToken.toString()));
    if (!ZAPIER_WEBHOOK || !isCaptchaValid) {
      return new Response(null, {
        headers: {
          Location: "/",
        },
        status: 301,
      });
    }
    await getSupabaseClient().from("form_submission").insert({
      data: formData,
      site_id: 16085,
    });
    return new Response(null, {
      headers: {
        Location: `/obrigado`,
      },
      status: 302,
    });
  },
};
