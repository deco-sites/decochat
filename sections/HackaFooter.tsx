import type { ImageWidget } from "apps/admin/widgets.ts";

interface FooterLink {
  /**
   * @description The link text
   */
  text: string;
  /**
   * @description The link URL
   */
  href: string;
}

interface FooterSection {
  /**
   * @description The section title
   */
  title: string;
  /**
   * @description The section links
   */
  links: FooterLink[];
}

export interface Props {
  /**
   * @description The footer logo
   */
  logo?: ImageWidget;
  /**
   * @description The footer logo link
   */
  logoLink?: string;
  /**
   * @description Social media links
   */
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    discord?: string;
  };
  /**
   * @description Footer sections with links
   */
  sections?: FooterSection[];
  /**
   * @description Copyright text
   * @default "© 2024 Deco.cx Hackathon. All rights reserved."
   */
  copyright?: string;
}

export default function HackaFooter({
  logo,
  logoLink = "#",
  socialLinks = {
    instagram: "#",
    twitter: "#",
    linkedin: "#",
    github: "#",
    discord: "#",
  },
  sections = [
    {
      title: "About",
      links: [
        { text: "Overview", href: "#overview" },
        { text: "MCPs", href: "#mcps" },
        { text: "AI Agents", href: "#agents" },
        { text: "Format", href: "#format" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Documentation", href: "https://docs.deco.cx" },
        { text: "GitHub", href: "https://github.com/deco-cx" },
        { text: "Discord", href: "#discord" },
        { text: "Blog", href: "https://deco.cx/blog" },
      ],
    },
    {
      title: "Participate",
      links: [
        { text: "Register", href: "#register" },
        { text: "Project Ideas", href: "#ideas" },
        { text: "Prizes", href: "#prizes" },
        { text: "FAQ", href: "#faq" },
      ],
    },
  ],
  copyright = "© 2024 Deco.cx Hackathon. All rights reserved.",
}: Props) {
  return (
    <footer class="w-full bg-dc-900 text-dc-50">
      {/* Main Footer Content */}
      <div class="max-w-[1500px] mx-auto px-4 md:px-20 pt-16 md:pt-24">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-12 md:pb-16">
          {/* Logo and Social Links */}
          <div class="md:col-span-3 space-y-8">
            {logo && (
              <a href={logoLink} class="block">
                <img
                  src={logo}
                  alt="Footer logo"
                  class="h-12 w-auto"
                  loading="lazy"
                />
              </a>
            )}
            <div class="flex gap-4">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-dc-100 hover:text-dc-50 transition-colors"
                  title="Follow us on Instagram"
                >
                  <span class="material-symbols-rounded text-2xl">
                    photo_camera
                  </span>
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-dc-100 hover:text-dc-50 transition-colors"
                  title="Follow us on Twitter"
                >
                  <span class="material-symbols-rounded text-2xl">
                    flutter_dash
                  </span>
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-dc-100 hover:text-dc-50 transition-colors"
                  title="Follow us on LinkedIn"
                >
                  <span class="material-symbols-rounded text-2xl">
                    business_center
                  </span>
                </a>
              )}
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-dc-100 hover:text-dc-50 transition-colors"
                  title="Visit our GitHub"
                >
                  <span class="material-symbols-rounded text-2xl">code</span>
                </a>
              )}
              {socialLinks.discord && (
                <a
                  href={socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-dc-100 hover:text-dc-50 transition-colors"
                  title="Join our Discord"
                >
                  <span class="material-symbols-rounded text-2xl">forum</span>
                </a>
              )}
            </div>
          </div>

          {/* Navigation Sections */}
          {sections.map((section) => (
            <div key={section.title} class="md:col-span-3">
              <h3 class="text-lg font-medium mb-6">{section.title}</h3>
              <ul class="space-y-4">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      class="text-dc-100 hover:text-dc-50 transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div class="border-t border-dc-800 py-8 text-center text-dc-100">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
