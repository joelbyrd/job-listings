import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

type Theme = "light" | "dark" | "system";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("system");
  const [systemTheme, setSystemTheme] = useState<Theme>("light");

  useEffect(() => {
    // Determine system theme
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const currentSystemTheme = matchMedia.matches ? "dark" : "light";
    setSystemTheme(currentSystemTheme);

    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const initialTheme = savedTheme || "system";
    setTheme(initialTheme);
    applyTheme(initialTheme, currentSystemTheme);

    // Watch for system theme changes
    const handleSystemChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? "dark" : "light";
      setSystemTheme(newSystemTheme);
      if (theme === "system") {
        applyTheme("system", newSystemTheme);
      }
    };

    matchMedia.addEventListener("change", handleSystemChange);

    return () => {
      matchMedia.removeEventListener("change", handleSystemChange);
    };
  }, [theme]);

  const applyTheme = (selectedTheme: Theme, currentSystemTheme?: Theme) => {
    if (selectedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (selectedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      const resolvedTheme = currentSystemTheme || "light";
      if (resolvedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const handleThemeChange = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    applyTheme(selectedTheme, systemTheme);
  };

  // Determine the correct icon to display
  const getIcon = () => {
    if (theme === "system") {
      return systemTheme === "dark" ? (
        <MoonIcon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
      ) : (
        <SunIcon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
      );
    }
    return theme === "dark" ? (
      <MoonIcon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
    ) : (
      <SunIcon className="w-6 h-6 text-gray-800 dark:text-gray-300" />
    );
  };

  return (
    <div className="relative inline-block">
      <Menu as="div" className="relative">
        <MenuButton
          className="flex w-6 h-6 items-center justify-center p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          data-icon-button={theme}
          aria-label="Toggle Theme"
        >
          {getIcon()}
        </MenuButton>
        <MenuItems className="absolute right-0 mt-2 w-36 rounded-lg bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="p-1">
            <MenuItem
              as="button"
              onClick={() => handleThemeChange("light")}
              className="flex items-center w-full px-3 py-2 text-sm rounded text-gray-300 hover:bg-gray-700"
            >
              <SunIcon className="w-5 h-5 mr-2" />
              Light
            </MenuItem>
            <MenuItem
              as="button"
              onClick={() => handleThemeChange("dark")}
              className="flex items-center w-full px-3 py-2 text-sm rounded text-gray-300 hover:bg-gray-700"
            >
              <MoonIcon className="w-5 h-5 mr-2" />
              Dark
            </MenuItem>
            <MenuItem
              as="button"
              onClick={() => handleThemeChange("system")}
              className="flex items-center w-full px-3 py-2 text-sm rounded text-gray-300 hover:bg-gray-700"
            >
              <ComputerDesktopIcon className="w-5 h-5 mr-2" />
              System
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default ThemeToggle;
