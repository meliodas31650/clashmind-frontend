
import React from 'react';
import useTranslation from '../../hooks/useTranslation';
import Button from './Button'; // Assuming Button component is available

const MemoizedButton = React.memo(Button);

/**
 * LanguageSwitcher component.
 * Provides UI for users to change the application's language.
 * Uses a simple button-based approach for switching between 'en' and 'fr'.
 * @returns {JSX.Element} The rendered LanguageSwitcher component.
 */
const LanguageSwitcher: React.FC = React.memo(() => {
  const { language, setLanguage, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fr' : 'en';
    setLanguage(newLang);
  };

  return (
    <div className="flex items-center">
      <MemoizedButton
        onClick={toggleLanguage}
        variant="ghost"
        size="small"
        className="border-[#00E0FF]/50 hover:border-[#00E0FF] text-[#00E0FF] px-2 py-1 md:px-3"
        title={t('header.language')}
        aria-label={t('header.language') + ': ' + (language === 'en' ? 'English' : 'Français')}
      >
        <span className="text-xs md:text-sm font-medium">{language.toUpperCase()}</span>
      </MemoizedButton>
    </div>
  );
});

export default LanguageSwitcher;
