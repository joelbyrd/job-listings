import React, { ElementType, HTMLAttributes } from "react";

export interface PillProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode; // Main content inside the pill
  beforeElement?: React.ReactNode; // Element to render before the pill content
  afterElement?: React.ReactNode; // Element to render after the pill content
  as?: ElementType; // Allows specifying the element type (e.g., 'li', 'div', etc.)
  onClick?: () => void; // Click handler, determines if the Pill is clickable
  bgColorClass?: string; // use to override default background color
  colorClass?: string; // use to override default text color
  fontClass?: string; // use to override default font size and weight
  paddingClass?: string; // use to override default content padding
  className?: string; // Additional classes for the outer container
  contentClassName?: string; // Additional classes for the inner content span
}

const Pill: React.FC<PillProps> = ({
  children,
  beforeElement,
  afterElement,
  as,
  onClick,
  bgColorClass,
  colorClass,
  fontClass,
  paddingClass,
  className,
  contentClassName,
  ...rest
}) => {
  const isClickable = !!onClick; // Check if the Pill is clickable
  const Component = as || (isClickable ? "button" : "span"); // Default element
  const bgColor = bgColorClass || "bg-teal-light dark:bg-teal-dark";
  const color = colorClass || "text-teal dark:text-gray-light";
  const font = fontClass || "text-xs font-bold";
  const padding = paddingClass || "px-3 py-1";

  return (
    <Component
      className={`flex items-center overflow-hidden ${bgColor} ${color} ${font} rounded ${
        isClickable
          ? "hover:bg-teal hover:text-white dark:hover:bg-teal-darker hover:cursor-pointer focus:ring-2 focus:ring-teal-400"
          : ""
      } ${className || ""}`} // Append additional className if provided
      onClick={onClick}
      {...rest}
    >
      {/* Before Element */}
      {beforeElement}

      {/* Main Content */}
      <span className={`${padding} ${contentClassName || ""}`}>{children}</span>

      {/* After Element */}
      {afterElement}
    </Component>
  );
};

export default Pill;
