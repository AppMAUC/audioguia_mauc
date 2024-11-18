// useAccessibility.ts
import { useState, useEffect } from "react";

export const useAccessibility = () => {
  const sizes = ["df", "sm", "md", "lg"];
  const [fontSize, setFontSize] = useState<number>(0); // "sm", "md", ou "lg"
  const [spacing, setSpacing] = useState<number>(0); // "sm", "md", ou "lg"
  const reset = () => {
    setLocalStorage("fontSize", 0);
    setLocalStorage("spacing", 0);
    setFontSize(0);
    setSpacing(0);
  };
  const setLocalStorage = (key: string, value: number) => {
    localStorage.setItem(key, value.toString());
  };

  const applyAccessibilitySettings = (fontSize: string, spacing: string) => {
    document.documentElement.style.setProperty(
      "--font-size",
      `var(--font-size-${fontSize})`
    );
    document.documentElement.style.setProperty(
      "--h1-size",
      `var(--h1-size-${fontSize})`
    );
    document.documentElement.style.setProperty(
      "--h2-size",
      `var(--h2-size-${fontSize})`
    );
    document.documentElement.style.setProperty(
      "--title-like-3",
      `var(--title-like-3-${fontSize})`
    );
    document.documentElement.style.setProperty(
      "--title-like-4",
      `var(--title-like-4-${fontSize})`
    );
    document.documentElement.style.setProperty(
      "--spacing",
      `var(--spacing-${spacing})`
    );
    document.documentElement.style.setProperty(
      "--spacing-0",
      `var(--spacing-0-${spacing})`
    );
    document.documentElement.style.setProperty(
      "--spacing-5",
      `var(--spacing-5-${spacing})`
    );
    document.documentElement.style.setProperty(
      "--spacing-10",
      `var(--spacing-10-${spacing})`
    );
    document.documentElement.style.setProperty(
      "--spacing",
      `var(--spacing-15-${spacing})`
    );
    document.documentElement.style.setProperty(
      "--spacing-25",
      `var(--spacing-25${spacing})`
    );
  };

  const changeFontSize = () =>
    setFontSize((prev) => (prev + 1 > 3 ? 0 : prev + 1));

  const changeSpacing = () =>
    setSpacing((prev) => (prev + 1 > 3 ? 0 : prev + 1));

  const startConfig = () => {
    const localFontSize = localStorage.getItem("fontSize") as string;
    const localSpacing = localStorage.getItem("spacing") as string;

    if (localFontSize) {
      setFontSize(parseInt(localFontSize));
    } else {
      setFontSize(0);
    }
    if (localSpacing) {
      setSpacing(parseInt(localSpacing));
    } else {
      setSpacing(0);
    }
  };

  useEffect(() => {
    startConfig();
  }, []);

  useEffect(() => {
    setLocalStorage("fontSize", fontSize);
    setLocalStorage("spacing", spacing);
    applyAccessibilitySettings(sizes[fontSize], sizes[spacing]);
  }, [fontSize, spacing]);

  return {
    fontSize,
    spacing,
    changeFontSize,
    changeSpacing,
    reset,
    startConfig,
  };
};
