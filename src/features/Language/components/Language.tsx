// src/features/language/components/LanguageDisplay.tsx
import React, { useEffect, useState } from "react";

const LanguageDisplay: React.FC = () => {
  const [language, setLanguage] = useState<string>("");
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const userLanguage = navigator.language;
    const userLanguages = navigator.languages;

    setLanguage(userLanguage);
    setLanguages([...userLanguages]);
  }, []);

  return (
    <div>
      <h2>Idioma do Dispositivo</h2>
      <p>Idioma preferido: {language}</p>
      <p>Lista de idiomas preferidos: {languages.join(", ")}</p>
    </div>
  );
};

export default LanguageDisplay;
