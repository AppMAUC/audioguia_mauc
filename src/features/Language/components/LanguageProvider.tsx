import { useState, useEffect, createContext, ReactNode } from "react";

type Language = "pt-BR" | "en";

interface LanguageContextProps {
  language: Language;
  toggleLanguage: (newLanguage: Language) => void;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>("pt-BR");

  useEffect(() => {
    const localLanguage = localStorage.getItem("language") as Language;
    if (localLanguage && (localLanguage === "pt-BR" || localLanguage === "en")) {
      setLanguage(localLanguage);
    }
  }, []);

  const toggleLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};