export interface Props {
  /**
   * @description The button text
   */
  children: string;
  /**
   * @description The button variant
   */
  variant?: "primary" | "secondary" | "outline";
  /**
   * @description The button size
   */
  size?: "sm" | "md" | "lg";
  /**
   * @description Optional href for link buttons
   */
  href?: string;
  /**
   * @description Optional click handler
   */
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
}: Props) {
  const Tag = href ? "a" : "button";

  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-primary-dark text-primary-light hover:bg-primary-dark/90 focus:ring-primary-dark",
    secondary: "bg-dc-200 text-dc-800 hover:bg-dc-300 focus:ring-dc-400",
    outline:
      "border border-primary-dark text-primary-dark hover:bg-primary-dark/10 focus:ring-primary-dark",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${
    sizeClasses[size]
  }`;

  return (
    <Tag
      href={href}
      onClick={onClick}
      class={classes}
    >
      {children}
    </Tag>
  );
}
