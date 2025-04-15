import { useSignal } from "@preact/signals";
import Button from "../components/Button.tsx";

interface Props {
  buttonText: string;
  successMessage: string;
  errorMessage: string;
}

export default function HackaRegistrationForm({
  buttonText,
  successMessage,
  errorMessage,
}: Props) {
  const isSubmitting = useSignal(false);
  const isSuccess = useSignal(false);
  const isError = useSignal(false);
  const formData = useSignal({
    name: "",
    email: "",
    github: "",
    experience: "",
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (isSubmitting.value) return;

    isSubmitting.value = true;
    isSuccess.value = false;
    isError.value = false;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form and show success message
      formData.value = {
        name: "",
        email: "",
        github: "",
        experience: "",
      };
      isSuccess.value = true;
    } catch (error) {
      isError.value = true;
    } finally {
      isSubmitting.value = false;
    }
  };

  const handleInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    formData.value = {
      ...formData.value,
      [input.name]: input.value,
    };
  };

  return (
    <form
      class="w-full max-w-xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div class="space-y-6">
        <div>
          <label
            for="name"
            class="block text-primary-dark font-medium mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.value.name}
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
            for="github"
            class="block text-primary-dark font-medium mb-2"
          >
            GitHub Profile
          </label>
          <input
            type="url"
            id="github"
            name="github"
            value={formData.value.github}
            onInput={handleInput}
            required
            class="w-full px-4 py-3 bg-white border border-primary-dark/20 rounded-xl text-primary-dark placeholder-primary-dark/60 focus:outline-none focus:border-primary-dark/40 transition-colors"
            placeholder="https://github.com/username"
          />
        </div>

        <div>
          <label
            for="experience"
            class="block text-primary-dark font-medium mb-2"
          >
            Experience Level
          </label>
          <select
            id="experience"
            name="experience"
            value={formData.value.experience}
            onChange={handleInput}
            required
            class="w-full px-4 py-3 bg-white border border-primary-dark/20 rounded-xl text-primary-dark focus:outline-none focus:border-primary-dark/40 transition-colors"
          >
            <option value="">Select your experience</option>
            <option value="beginner">Beginner (0-2 years)</option>
            <option value="intermediate">Intermediate (2-5 years)</option>
            <option value="advanced">Advanced (5+ years)</option>
          </select>
        </div>

        {isSuccess.value && (
          <div class="p-4 bg-green-100 border border-green-200 rounded-xl text-green-800">
            {successMessage}
          </div>
        )}

        {isError.value && (
          <div class="p-4 bg-red-100 border border-red-200 rounded-xl text-red-800">
            {errorMessage}
          </div>
        )}

        <button
          class="w-full"
          disabled={isSubmitting.value}
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
  );
}
