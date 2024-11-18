import { useState, useEffect, createContext, ReactNode } from "react";

interface LanguageContextProps {
  language: Language | null;
  toggleLanguage: (newLanguage: Language) => void;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

type Language = "pt-BR" | "en" | "en-US" | "pt";

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language | null>("en");

  useEffect(() => {
    const localLanguage = localStorage.getItem("language");

    if (localLanguage) {
      setLanguage(localLanguage as Language);
    } else {
      const userLanguage = navigator.language;
      setLanguage(userLanguage as Language);
      toggleLanguage(userLanguage as Language);
    }
  }, []);

  const setLocalLanguage = (newLanguage: Language) => {
    localStorage.setItem("language", newLanguage);
  };

  const toggleLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setLocalLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
