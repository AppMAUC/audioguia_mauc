export const languages = [
    { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
];

export const defaultLanguage = 'pt-BR';

export const isLanguageSupported = (lang: string): boolean => {
    return languages.some(l => l.code === lang);
};