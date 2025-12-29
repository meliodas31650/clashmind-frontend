
import { useContext } from 'react';
import { LocalizationContext } from '../contexts/LocalizationContext';

/**
 * Custom hook `useTranslation`.
 * Provides easy access to the localization context (language, setLanguage function, and translation function `t`).
 * Throws an error if used outside of a `LocalizationProvider`.
 * @returns {{
 *  language: string;
 *  setLanguage: (lang: string) => void;
 *  t: (key: string, replacements?: {[key: string]: string | number}) => string;
 * }} The localization context values.
 * @throws {Error} If the hook is used outside a LocalizationProvider.
 */
const useTranslation = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LocalizationProvider');
  }
  return context;
};

export default useTranslation;
