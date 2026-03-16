import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../useLanguage';
import { useTranslation } from '../useTranslation';
import styles from './LanguageSelector.module.css';
import brasilFlag from '../../../assets/icons/brasilFlag.svg?react';
import ukFlag from '../../../assets/icons/ukFlag.svg?react';
import ArrowLeft from '../../../assets/icons/arrow-left.svg?react';

const languages = [
    { code: 'pt-BR', name: 'Português', flag: brasilFlag },
    { code: 'en', name: 'English', flag: ukFlag }
];

const LanguageSelector: React.FC = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { language, toggleLanguage } = useLanguage();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentLanguage = languages.find(lang => lang.code === language) || languages[0];
    const CurrentFlag = currentLanguage.flag;

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button
                className={styles.selectorButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label={t('languageSelector.buttonAriaLabel', { language: currentLanguage.name })}
            >
                <span className={styles.flag}>
                    <CurrentFlag width={24} height={24} />
                </span>
                <span className={styles.languageName}>{currentLanguage.name}</span>
                <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>
                    <ArrowLeft width={16} height={16} />
                </span>
            </button>

            {isOpen && (
                <div className={styles.dropdown} role="listbox">
                    {languages.map((lang) => {
                        const Flag = lang.flag;
                        return (
                            <button
                                key={lang.code}
                                className={`${styles.dropdownItem} ${language === lang.code ? styles.selected : ''}`}
                                onClick={() => {
                                    toggleLanguage(lang.code as 'pt-BR' | 'en');
                                    setIsOpen(false);
                                }}
                                role="option"
                                aria-selected={language === lang.code}
                                aria-label={t('languageSelector.optionAriaLabel', { language: lang.name })}
                            >
                                <span className={styles.flag}>
                                    <Flag width={24} height={24} />
                                </span>
                                <span className={styles.languageName}>{lang.name}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;