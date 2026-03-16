import React, { useEffect, useState } from "react";
import { useTranslation } from "../useTranslation";

const LanguageDisplay: React.FC = () => {
  const { t } = useTranslation();
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
      <h2>{t('languageDisplay.title')}</h2>
      <p>{t('languageDisplay.preferred')} {language}</p>
      <p>{t('languageDisplay.list')} {languages.join(", ")}</p>
    </div>
  );
};

export default LanguageDisplay;