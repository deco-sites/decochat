export const RECAPTCHA_SITE_KEY = "6Le4oRkrAAAAAE510NaLMMvSoctvTpGKZKeo9h-x";
export const RECAPTCHA_SECRET = Deno.env.get("RECAPTCHA_SECRET");

/**
 * Verifies the reCAPTCHA token with the Google reCAPTCHA API.
 * @param token - The reCAPTCHA token to be verified.
 * @returns A promise that resolves to a boolean indicating whether the token is valid.
 */
export function verifyCaptcha(token: string): Promise<boolean> {
  return fetch(
    `https://recaptchaenterprise.googleapis.com/v1/projects/groovy-reducer-456918-u0/assessments?key=${RECAPTCHA_SECRET}`,
    {
      method: "POST",
      body: JSON.stringify({
        "event": {
          "token": `${token}`,
          "siteKey": `${RECAPTCHA_SITE_KEY}`,
        }
      })
    },
  )
    .then((response) => response.json() as Promise<{ success: boolean }>)
    .then((data) => {
      return data.success;
    });
}
