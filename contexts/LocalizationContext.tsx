
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Translations } from '../types'; // Assuming Translations type is defined

/**
 * @typedef LocalizationContextType
 * @property {string} language - The current active language code (e.g., 'en', 'fr').
 * @property {(lang: string) => void} setLanguage - Function to set the active language.
 * @property {(key: string, replacements?: {[key: string]: string | number}) => string} t - Translation function.
 */
interface LocalizationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const defaultLanguage = 'en';
const supportedLanguages = ['en', 'fr']; // Add more as needed

export const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

/**
 * @typedef LocalizationProviderProps
 * @property {ReactNode} children - Child components to be wrapped by the provider.
 */
interface LocalizationProviderProps {
  children: ReactNode;
}

/**
 * LocalizationProvider component.
 * Manages the application's language state and provides translation capabilities to its children
 * through the LocalizationContext. It dynamically loads translation files using fetch.
 * @param {LocalizationProviderProps} props - Component props.
 */
export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [language, setCurrentLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('clashMindLang');
      return storedLang && supportedLanguages.includes(storedLang) ? storedLang : defaultLanguage;
    }
    return defaultLanguage;
  });
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const primaryLoadPath = `locales/${language}.json`; // Path relative to index.html

    fetch(primaryLoadPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} for ${primaryLoadPath}`);
        }
        return response.json();
      })
      .then(data => {
        setTranslations(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(`Failed to load translations for ${language} from ${primaryLoadPath}:`, error);
        // Fallback to default language if current one fails
        if (language !== defaultLanguage) {
          const fallbackLoadPath = `locales/${defaultLanguage}.json`;
          fetch(fallbackLoadPath)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} for ${fallbackLoadPath}`);
              }
              return response.json();
            })
            .then(data => setTranslations(data))
            .catch(err => console.error(`Failed to load default translations from ${fallbackLoadPath}:`, err))
            .finally(() => setIsLoading(false)); // Ensure loading is set to false after fallback attempt
        } else {
          setIsLoading(false); // If it was already default lang and failed, stop loading
        }
      });
  }, [language]);

  const setLanguage = useCallback((lang: string) => {
    if (supportedLanguages.includes(lang)) {
      setCurrentLanguage(lang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('clashMindLang', lang);
      }
    } else {
      console.warn(`Unsupported language: ${lang}. Defaulting to ${defaultLanguage}.`);
      setCurrentLanguage(defaultLanguage);
       if (typeof window !== 'undefined') {
        localStorage.setItem('clashMindLang', defaultLanguage);
      }
    }
  }, []);

  /**
   * Translation function.
   * Retrieves a string from the loaded translations based on a key.
   * Supports flat keys with dots (e.g., "menu.cortexArena") and nested keys.
   * @param {string} key - The key for the translation string (e.g., "greeting", "common.submit").
   * @param {{ [key: string]: string | number }} [replacements] - Optional key-value pairs for placeholder replacement.
   * @returns {string} The translated string, or the key itself if not found.
   */
  const t = useCallback((key: string, replacements?: { [key: string]: string | number }): string => {
    let textToReturn: string | undefined = undefined;

    // First, try to get the key directly if it exists as a flat key (e.g., "menu.cortexArena")
    if (translations && typeof translations === 'object' && key in translations) {
      const directValue = translations[key];
      if (typeof directValue === 'string') {
        textToReturn = directValue;
      }
    }

    // If not found as a flat key, try to navigate using dot notation for nested structures
    if (textToReturn === undefined) {
      const keys = key.split('.');
      let currentLevel: string | Translations | undefined = translations;
      for (const k of keys) {
        if (currentLevel && typeof currentLevel === 'object' && k in currentLevel) {
          currentLevel = (currentLevel as Translations)[k];
        } else {
          currentLevel = undefined; // Key path not found
          break;
        }
      }
      if (typeof currentLevel === 'string') {
        textToReturn = currentLevel;
      }
    }

    // If key is still not resolved to a string, return the key itself
    if (textToReturn === undefined) {
      // console.warn(`Translation key not found or not a string: ${key}`);
      return key;
    }

    // Apply replacements
    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        textToReturn = (textToReturn as string).replace(new RegExp(`{{${placeholder}}}`, 'g'), String(replacements[placeholder]));
      });
    }

    return textToReturn;
  }, [translations]);

  if (isLoading) {
    // Basic loading state, can be replaced with a more sophisticated loader/spinner
    return <div className="fixed inset-0 flex items-center justify-center bg-[#0B0F1A] text-[#00E0FF] text-xl font-orbitron">Loading Translations...</div>;
  }

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};
