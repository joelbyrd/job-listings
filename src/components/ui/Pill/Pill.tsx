import React, { ElementType, HTMLAttributes } from "react";

export interface PillProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode; // Main content inside the pill
  beforeElement?: React.ReactNode; // Element to render before the pill content
  afterElement?: React.ReactNode; // Element to render after the pill content
  as?: ElementType; // Allows specifying the element type (e.g., 'li', 'div', etc.)
  onClick?: () => void; // Click handler, determines if the Pill is clickable
  className?: string; // Additional classes for the outer container
  contentClassName?: string; // Additional classes for the inner content span
}

const Pill: React.FC<PillProps> = ({
  children,
  beforeElement,
  afterElement,
  as,
  onClick,
  className,
  contentClassName,
  ...rest
}) => {
  const isClickable = !!onClick; // Check if the Pill is clickable
  const Component = as || (isClickable ? "button" : "span"); // Default element

  return (
    <Component
      className={`flex items-center overflow-hidden bg-teal-light text-teal text-xs font-bold rounded ${
        isClickable
          ? "hover:bg-teal hover:text-white hover:cursor-pointer focus:ring-2 focus:ring-teal-400"
          : ""
      } ${className || ""}`} // Append additional className if provided
      onClick={onClick}
      {...rest}
    >
      {/* Before Element */}
      {beforeElement}

      {/* Main Content */}
      <span className={`px-3 py-1 ${contentClassName || ""}`}>{children}</span>

      {/* After Element */}
      {afterElement}
    </Component>
  );
};

export default Pill;
