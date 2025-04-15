import Icon from "./ui/Icon.tsx";

export interface Props {
  /**
   * @description The badge text
   * @title Badge Text
   */
  text: string;
  /**
   * @description The badge variant/color scheme
   * @title Badge Color
   */
  variant?: "yellow" | "purple" | "primary";
  /**
   * @description Whether to use dark variant (inverted colors)
   */
  isDark?: boolean;
  /**
   * @description The Material Icons name to display
   * @title Icon
   */
  icon?: string;
  /**
   * @description The size of the icon in pixels
   */
  iconSize?: number;
}

export default function Badge({
  text,
  variant = "yellow",
  isDark = false,
  icon,
  iconSize = 16,
}: Props) {
  const variantClasses = {
    yellow: {
      light: {
        bg: "bg-yellow-light",
        text: "text-yellow-dark",
      },
      dark: {
        bg: "bg-yellow-dark",
        text: "text-yellow-light",
      },
    },
    purple: {
      light: {
        bg: "bg-purple-light",
        text: "text-purple-dark",
      },
      dark: {
        bg: "bg-purple-dark",
        text: "text-purple-light",
      },
    },
    primary: {
      light: {
        bg: "bg-primary-light",
        text: "text-primary-dark",
      },
      dark: {
        bg: "bg-primary-dark",
        text: "text-primary-light",
      },
    },
  };

  const { bg, text: textColor } =
    variantClasses[variant][isDark ? "dark" : "light"];

  return (
    <div
      class={`px-4 py-1 ${bg} rounded-full inline-flex justify-center items-center gap-2`}
    >
      {icon && (
        <span
          class={`material-icons ${textColor}`}
          style={{ fontSize: `${iconSize}px` }}
        >
          {icon}
        </span>
      )}
      <div
        class={`justify-center ${textColor} text-base font-medium leading-tight`}
      >
        {text}
      </div>
    </div>
  );
}
