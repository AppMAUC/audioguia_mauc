// useAccessibility.ts
import { useState, useEffect } from "react";

export const useAccessibility = () => {
  const [fontSize, setFontSize] = useState("sm"); // "sm", "md", ou "lg"
  const [spacing, setSpacing] = useState("sm"); // "sm", "md", ou "lg"

  const reset = () => {
    setFontSize("sm");
    setSpacing("sm");
  };

  const setLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const applyAccessibilitySettings = (fontSize: string, spacing: string) => {
    document.documentElement.style.setProperty(
      "--font-size",
      `var(--font-mb-size-${fontSize})`
    );
    document.documentElement.style.setProperty(
      "--spacing",
      `var(--spacing-${spacing})`
    );
  };

  const increaseFontSize = () =>
    setFontSize((prev) => (prev === "sm" ? "md" : "lg"));

  const decreaseFontSize = () =>
    setFontSize((prev) => (prev === "lg" ? "md" : "sm"));

  const increaseSpacing = () =>
    setSpacing((prev) => (prev === "sm" ? "md" : "lg"));

  const decreaseSpacing = () =>
    setSpacing((prev) => (prev === "lg" ? "md" : "sm"));

  useEffect(() => {
    const localFontSize = localStorage.getItem("fontSize") as string;
    const localSpacing = localStorage.getItem("spacing") as string;

    if (localFontSize) {
      setFontSize(localFontSize);
    }
    if (localSpacing) {
      setSpacing(localSpacing);
    }
  }, []);

  useEffect(() => {
    setLocalStorage("fontSize", fontSize);
    setLocalStorage("spacing", spacing);
    applyAccessibilitySettings(fontSize, spacing);
  }, [fontSize, spacing]);

  return {
    fontSize,
    spacing,
    increaseFontSize,
    decreaseFontSize,
    increaseSpacing,
    decreaseSpacing,
    reset,
  };
};
