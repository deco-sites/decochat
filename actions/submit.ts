import { verifyCaptcha } from "site/sdk/recaptcha.ts";
import { getSupabaseClient } from "site/clients/supabase.ts";

export type Props = {
    recaptcha: string;
    data: string;
};

export default async function action(props: Props, _req: Request, _ctx: unknown): Promise<void> {
    const recaptchaToken = props.recaptcha;
    const isCaptchaValid = (await verifyCaptcha(recaptchaToken.toString()));
    console
    if (!isCaptchaValid) {
        throw new Error("Invalid reCAPTCHA token");
    }
    const { data, error }  = await getSupabaseClient().from("form_submission").insert({
      data: JSON.parse(props.data),
      site_id: 16085,
    });
    if (error) {
        throw new Error(error.message);
    }
  };