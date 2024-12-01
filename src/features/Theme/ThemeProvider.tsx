// ThemeProvider.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAccessibility } from "../Accessibility/useAccessibility";

type Theme = "light" | "dark" | "default";
type Size = "mb" | "dk";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: (newTheme: Theme) => void;
  sizeWidth: Size;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("default");
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [sizeWidth, setSizeWidth] = useState<Size>("mb");
  const { startConfig } = useAccessibility();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (width > 1024) {
      setSize("dk");
      setSizeWidth("dk");
    } else {
      setSize("mb");
      setSizeWidth("mb");
    }
  }, [width]);

  useEffect(() => {
    startConfig();
  }, []);

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

  const setSize = (newSize: Size) => {
    document.documentElement.setAttribute("size", newSize);
  };

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setLocalTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, sizeWidth }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
