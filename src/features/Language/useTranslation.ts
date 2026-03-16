import { useLanguage } from './useLanguage';
import ptBrTranslations from './i18n/locales/pt-BR/pt-BR.json';
import enTranslations from './i18n/locales/en/en.json';

const translations = {
    'pt-BR': ptBrTranslations,
    'en': enTranslations
};

export const useTranslation = () => {
    const { language } = useLanguage();

    const t = (key: string, params?: Record<string, string | number>): string => {
        const keys = key.split('.');
        let value: any = translations[language || 'pt-BR'] || translations['pt-BR'];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Tradução não encontrada: ${key}`);
                return key;
            }
        }

        if (typeof value === 'string') {
            if (params) {
                return value.replace(/\{\{(\w+)\}\}/g, (_, param) => {
                    return String(params[param] || '');
                });
            }
            return value;
        }

        return key;
    };

    return { t };
};