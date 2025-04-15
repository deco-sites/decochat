import { useSignal } from "@preact/signals";
import Button from "../components/Button.tsx";
import type { ExperienceLevel } from "../sections/HackaRegistration.tsx";
import { useEffect, useRef, useState } from "preact/hooks";
import ReCAPTCHA from "site/sections/ReCAPTCHA.tsx";
export const RECAPTCHA_SITE_KEY = "6Le4oRkrAAAAAE510NaLMMvSoctvTpGKZKeo9h-x";
import { invoke } from "site/runtime.ts";

interface Props {
  buttonText: string;
  successMessage: string;
  errorMessage: string;
  experienceLevels: ExperienceLevel[];
}

export default function HackaRegistrationForm({
  buttonText,
  successMessage,
  errorMessage,
  experienceLevels,
}: Props) {
  const isSubmitting = useSignal(false);
  const isSuccess = useSignal(false);
  const isError = useSignal(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const formData = useSignal({
    fullName: "",
    email: "",
    linkedinUrl: "",
    experienceLevel: "",
  });

  const selectedLevel = experienceLevels.find(
    (level) => level.value === formData.value.experienceLevel,
  );

  // Close select when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setIsSelectOpen(false);
    }
  };

  // Add and remove click listener
  useEffect(() => {
    // Only add event listener on client-side
    if (typeof document !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  const handleSubmit = async (e: Event, token: string) => {
    e.preventDefault();

    if (isSubmitting.value) return;

    isSubmitting.value = true;
    isSuccess.value = false;
    isError.value = false;

    try {
      // Simulate API call
      const props = {
        recaptcha: token,
        data: JSON.stringify(formData.value),
      };

      await invoke.site.actions.submit(props);

      // Reset form and show success message
      formData.value = {
        fullName: "",
        email: "",
        linkedinUrl: "",
        experienceLevel: "",
      };
      isSuccess.value = true;
    } catch (_error) {
      console.log(_error);
      isError.value = true;
    } finally {
      isSubmitting.value = false;
    }
  };

  const handleInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const value = input.type === "checkbox" ? input.checked : input.value;
    formData.value = {
      ...formData.value,
      [input.name]: value,
    };
  };

  const FORM_ID = "contact-form";

  return (
    <div class="w-full max-w-xl mx-auto">
      {isSuccess.value
        ? (
          <div class="text-center space-y-6">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dc-100 text-dc-700 mb-4">
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 class="text-2xl font-medium text-primary-dark">
              Registration Confirmed!
            </h3>
            <p class="text-primary-dark/60">
              Thank you for registering. We're excited to have you join us!
            </p>
            <div class="p-4 bg-dc-100 border border-dc-200 rounded-xl text-dc-700">
              Once you're registered, feel free to{" "}
              <a
                href="https://discord.com/channels/985687648595243068/1042862479371423814"
                target="_blank"
                rel="noopener noreferrer"
                class="text-green-600 font-medium underline hover:text-green-900 transition-colors"
              >
                introduce yourself
              </a>{" "}
              and start connecting with potential{" "}
              <a
                href="https://discord.com/channels/985687648595243068/1042862479371423814"
                target="_blank"
                rel="noopener noreferrer"
                class="text-green-600 font-medium underline hover:text-green-900 transition-colors"
              >
                teammates
              </a>!
            </div>
          </div>
        )
        : (
          <>
            <form
              class="w-full"
              id={FORM_ID}
            >
              <div class="space-y-6">
                <div>
                  <label
                    for="fullName"
                    class="block text-primary-dark font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.value.fullName}
                    onInput={handleInput}
                    required
                    class="w-full px-4 py-3 bg-white border border-primary-dark/20 rounded-xl text-primary-dark placeholder-primary-dark/60 focus:outline-none focus:border-primary-dark/40 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    for="email"
                    class="block text-primary-dark font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.value.email}
                    onInput={handleInput}
                    required
                    class="w-full px-4 py-3 bg-white border border-primary-dark/20 rounded-xl text-primary-dark placeholder-primary-dark/60 focus:outline-none focus:border-primary-dark/40 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    for="linkedinUrl"
                    class="block text-primary-dark font-medium mb-2"
                  >
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    id="linkedinUrl"
                    name="linkedinUrl"
                    value={formData.value.linkedinUrl}
                    onInput={handleInput}
                    required
                    class="w-full px-4 py-3 bg-white border border-primary-dark/20 rounded-xl text-primary-dark placeholder-primary-dark/60 focus:outline-none focus:border-primary-dark/40 transition-colors"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label class="block text-primary-dark font-medium mb-2">
                    Pick Your Experience Level
                  </label>
                  <div class="relative" ref={selectRef}>
                    <button
                      type="button"
                      class={`w-full px-4 py-3 bg-white border border-primary-dark/20 rounded-xl text-left focus:outline-none focus:border-primary-dark/40 transition-colors ${
                        !formData.value.experienceLevel
                          ? "text-primary-dark/60"
                          : "text-primary-dark"
                      }`}
                      onClick={() => setIsSelectOpen(!isSelectOpen)}
                    >
                      {selectedLevel
                        ? selectedLevel.label
                        : "Select your experience level"}
                    </button>

                    {isSelectOpen && (
                      <div class="absolute z-10 w-full mt-2 bg-white border border-primary-dark/20 rounded-xl shadow-lg overflow-hidden">
                        {experienceLevels.map((level) => (
                          <button
                            type="button"
                            key={level.value}
                            class={`w-full px-4 py-3 text-left hover:bg-primary-dark/5 transition-colors ${
                              formData.value.experienceLevel === level.value
                                ? "bg-primary-dark/10"
                                : ""
                            }`}
                            onClick={() => {
                              formData.value = {
                                ...formData.value,
                                experienceLevel: level.value,
                              };
                              setIsSelectOpen(false);
                            }}
                          >
                            <div class="font-medium text-primary-dark">
                              {level.label}
                            </div>
                            <div class="text-sm text-primary-dark/60 mt-1">
                              {level.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    <input
                      type="hidden"
                      name="experienceLevel"
                      value={formData.value.experienceLevel}
                      required
                    />
                  </div>
                </div>

                {isError.value && (
                  <div class="p-4 bg-red-100 border border-red-200 rounded-xl text-red-800">
                    {errorMessage}
                  </div>
                )}
                <button
                  class="w-full"
                  disabled={isSubmitting.value}
                  onClick={(e) => {
                    e.preventDefault();
                    (globalThis as any).grecaptcha.enterprise.ready(
                      function () {
                        (globalThis as any).grecaptcha.enterprise.execute(
                          `${RECAPTCHA_SITE_KEY}`,
                          { action: "submit" },
                        ).then(function (token: string) {
                          handleSubmit(e, token);
                        });
                      },
                    );
                  }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                  >
                    {isSubmitting.value ? "Registering..." : buttonText}
                  </Button>
                </button>
              </div>
            </form>
            <ReCAPTCHA formId={FORM_ID} />
          </>
        )}
    </div>
  );
}
