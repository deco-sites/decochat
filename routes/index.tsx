import Hero from "../sections/Hero.tsx";
import Features from "../islands/Features.tsx";
import Integrations from "../sections/Integrations.tsx";
import CTA from "../sections/CTA.tsx";
import Footer from "../sections/Footer.tsx";

export default function Home() {
  return (
    <div class="w-full min-h-screen bg-dc-50">
      <Hero
        title="Build AI agents that work with your tools and data"
        subtitle="Empower your team with AI"
        heroImage="https://placehold.co/1363x497"
        primaryButtonText="Try now"
        secondaryButtonText="Learn more"
      />
      <Features
        title="Everything you need to become an AI-first organization"
        badgeText="How it works"
        badgeIcon="info"
        features={[
          {
            badgeText: "Autonomy",
            badgeVariant: "primary",
            badgeIcon: "smart_toy",
            title: "Anyone can solve problems and automate work with AI",
            image: "https://placehold.co/380x329",
            bgColor: "bg-primary-light",
          },
          {
            badgeText: "Context",
            badgeVariant: "purple",
            badgeIcon: "data_object",
            title:
              "Unified data & global strategy embedded in every interaction",
            image: "https://placehold.co/419x309",
            bgColor: "bg-purple-light",
          },
          {
            badgeText: "Governance",
            badgeVariant: "yellow",
            badgeIcon: "security",
            title: "Full control over usage, permissions, and cost",
            image: "https://placehold.co/419x431",
            bgColor: "bg-yellow-light",
          },
        ]}
      />
      <Integrations
        title="Connect all your data quickly and securely"
        badgeText="Integrations"
        badgeIcon="integration_instructions"
        logos={Array(48).fill({
          image: "https://placehold.co/60x60",
          alt: "Integration logo",
        })}
        floatingLogos={Array(6).fill({
          image: "https://placehold.co/74x74",
          alt: "Floating integration logo",
        })}
      />
      <CTA
        title="Finally, your team leveraging AI productivity without the risks"
        buttonText="Try now"
      />
      <Footer />
    </div>
  );
}
