// ThemeProvider.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "default";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("default");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") as Theme;
    if (localTheme) {
      setTheme(localTheme);
      toggleTheme(localTheme);
    } else {
      setTheme("default");
      toggleTheme(theme);
    }
  }, []);

  const setLocalTheme = (newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setLocalTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};