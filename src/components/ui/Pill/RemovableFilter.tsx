import React from "react";
import Pill, { PillProps } from "./Pill";

interface RemovableFilterProps extends Omit<PillProps, "afterElement"> {
  onRemove?: () => void;
}

const RemovableFilter: React.FC<RemovableFilterProps> = ({
  children,
  onRemove = () => {
    console.warn("onRemove is not defined. The remove button does nothing.");
  }, // Default to a no-op with a warning
  as = "li", // Default to 'li' (most common use case)
  ...rest
}) => {
  return (
    <Pill
      as={as}
      afterElement={
        <button
          type="button"
          className="bg-teal h-full px-2 hover:bg-gray-dark focus:outline-none transition-colors flex items-center"
          aria-label="Remove filter"
          onClick={onRemove}
        >
          <img
            src="./images/icon-remove.svg"
            alt="Remove"
            className="w-3 h-3"
          />
        </button>
      }
      {...rest}
    >
      {children}
    </Pill>
  );
};

export default RemovableFilter;
