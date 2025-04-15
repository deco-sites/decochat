import type { ImageWidget } from "apps/admin/widgets.ts";
import Badge from "../components/Badge.tsx";
import HackaRegistrationForm from "../islands/HackaRegistrationForm.tsx";

export interface ExperienceLevel {
  /**
   * @description The experience level value
   */
  value: string;
  /**
   * @description The experience level label
   */
  label: string;
  /**
   * @description The experience level description
   */
  description: string;
}

export interface Props {
  /**
   * @description The section ID
   * @default "register"
   */
  id?: string;
  /**
   * @description The section title
   * @default "Register Now"
   */
  title?: string;
  /**
   * @description The registration button text
   * @default "Submit Registration"
   */
  buttonText?: string;
  /**
   * @description The success message
   * @default "Registration successful! Check your email for confirmation."
   */
  successMessage?: string;
  /**
   * @description The error message
   * @default "Something went wrong. Please try again."
   */
  errorMessage?: string;
  /**
   * @description The badge text
   * @default "Register"
   */
  badgeText?: string;
  /**
   * @description The experience level options
   */
  experienceLevels?: ExperienceLevel[];
}

export default function HackaRegistration({
  title = "Register Now",
  buttonText = "Submit Registration",
  successMessage =
    "Registration successful! Check your email for confirmation.",
  errorMessage = "Something went wrong. Please try again.",
  badgeText = "Register",
  id = "register",
  experienceLevels = [
    {
      value: "nube",
      label: "Nube",
      description:
        "I have no idea what MCPs are—just point me in the right direction!",
    },
    {
      value: "non-technical",
      label: "Non-Technical AI Enthusiast",
      description:
        "I'm up on the latest AI trends but have zero coding experience.",
    },
    {
      value: "dev-exploring",
      label: "Dev Exploring AI",
      description:
        "I code for a living but want to learn how to build AI-driven solutions.",
    },
    {
      value: "ai-specialist",
      label: "AI Specialist",
      description:
        "I've developed AI systems or integrated AI frameworks extensively.",
    },
  ],
}: Props) {
  return (
    <div id={id} class="w-full bg-dc-50 px-4 py-24 md:py-40">
      <div class="max-w-[1200px] flex flex-col gap-16 mx-auto">
        <div class="text-center">
          <Badge text={badgeText} variant="primary" />
          <h2 class="text-3xl md:text-5xl text-primary-dark font-medium mt-6 mb-4">
            {title}
          </h2>
          <p class="text-primary-dark/60 text-lg max-w-2xl mx-auto ">
            Join our community of AI enthusiasts and developers. Whether you're
            just starting or you're an experienced professional, there's a place
            for you here.
          </p>
        </div>

        <div class="flex justify-center">
          <div class="w-fit bg-white/50 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-primary-dark/5 border border-primary-dark/10">
            <div class="relative min-w-[400px] md:min-w-[600px]">
              <HackaRegistrationForm
                buttonText={buttonText}
                successMessage={successMessage}
                errorMessage={errorMessage}
                experienceLevels={experienceLevels}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
