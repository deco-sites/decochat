import type { ImageWidget } from "apps/admin/widgets.ts";
import Badge from "../components/Badge.tsx";
import HackaRegistrationForm from "../islands/HackaRegistrationForm.tsx";

export interface Props {
  /**
   * @description The section title
   * @default "Register Now"
   */
  title?: string;
  /**
   * @description The section description
   */
  description?: string;
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
   * @description The section id for anchor links
   * @default "register"
   */
  id?: string;
}

export default function HackaRegistration({
  title = "Register Now",
  description =
    "Ready to showcase your skills? Register for the hackathon and get ready to build amazing AI solutions with MCPs and AI Agents!",
  buttonText = "Submit Registration",
  successMessage =
    "Registration successful! Check your email for confirmation.",
  errorMessage = "Something went wrong. Please try again.",
  id = "register",
}: Props) {
  return (
    <div class="w-full bg-dc-50 px-4 py-24 md:py-40">
      <div class="max-w-[1200px] mx-auto">
        <div class="text-center mb-16 md:mb-24">
          <Badge text="Register" variant="primary" />
          <h2 class="text-3xl md:text-5xl text-primary-dark font-medium mt-6 mb-8">
            {title}
          </h2>
          <p class="text-lg md:text-xl text-primary-dark/80 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <HackaRegistrationForm
          buttonText={buttonText}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
