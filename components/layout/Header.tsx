

import React, { useMemo, useState } from 'react'; // Added useState for dropdown
import CurrencyDisplay from '../ui/CurrencyDisplay';
import { SparkIcon, NeuronIcon, ChatIcon, MyAccountIcon } from '../../constants';
import Button from '../ui/Button'; 
import LanguageSwitcher from '../ui/LanguageSwitcher'; 
import useTranslation from '../../hooks/useTranslation';
import { MenuItemKey, MatchmakingStatus, ActiveSection } from '../../types'; 

/**
 * @typedef HeaderProps
 * @property {number} sparks - User's current Sparks balance.
 * @property {number} neurons - User's current Neurons rating.
 * @property {string} username - User's username.
 * @property {string} [avatarUrl] - URL for the user's avatar.
 * @property {string} activeSectionLabel - Label for the currently active section.
 * @property {MenuItemKey[]} [menuItemKeys] - Optional. Used to translate activeSectionLabel.
 * @property {() => void} onLogout - Callback function for logout.
 * @property {(sectionId: ActiveSection) => void} onNavigate - Callback for navigating dashboard sections.
 * @property {number} [unreadPrivateMessagesCount=0] - Total count of unread private messages.
 * @property {MatchmakingStatus} [matchmakingStatus] - Current matchmaking status.
 * @property {() => void} [onOpenGlobalChat] - Callback to open global chat or message list.
 */
interface HeaderProps {
  sparks: number;
  neurons: number;
  username:string;
  avatarUrl?: string;
  activeSectionLabel: string; 
  menuItemKeys?: MenuItemKey[]; 
  onLogout: () => void; 
  onNavigate: (sectionId: ActiveSection) => void; 
  unreadPrivateMessagesCount?: number;
  matchmakingStatus?: MatchmakingStatus;
  onOpenGlobalChat?: () => void;
}

const MemoizedCurrencyDisplay = React.memo(CurrencyDisplay);
const MemoizedButton = React.memo(Button);
const MemoizedLanguageSwitcher = React.memo(LanguageSwitcher);

/**
 * Header component for the dashboard.
 * Displays user currency, profile information, the active section label, and a language switcher.
 * Includes indicators for unread messages and matchmaking status.
 * @param {HeaderProps} props - Component props.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header: React.FC<HeaderProps> = React.memo(({ 
  sparks, 
  neurons, 
  username, 
  avatarUrl, 
  activeSectionLabel, 
  menuItemKeys,
  onLogout,
  onNavigate,
  unreadPrivateMessagesCount = 0,
  matchmakingStatus = MatchmakingStatus.Idle,
  onOpenGlobalChat
}) => {
  const { t } = useTranslation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const effectiveAvatarUrl = useMemo(() => {
    return avatarUrl || `https://ui-avatars.com/api/?name=${username.replace(/\s/g, '+')}&background=0A0D14&color=00E0FF&bold=true&font-size=0.33`;
  }, [avatarUrl, username]);

  const displayLabel = useMemo(() => {
    const menuItem = menuItemKeys?.find(item => item.id === activeSectionLabel || item.translationKey === activeSectionLabel);
    if (menuItem?.translationKey) {
      return t(menuItem.translationKey);
    }
    // Handle cases where activeSectionLabel might be an ActiveSection enum value directly
    const directLabel = Object.values(ActiveSection).includes(activeSectionLabel as ActiveSection)
                        ? activeSectionLabel.replace(/_/g, ' ') 
                        : activeSectionLabel;

    return activeSectionLabel.includes('.') ? t(activeSectionLabel) : directLabel; 
  }, [activeSectionLabel, menuItemKeys, t]); // Added missing closing brace for useMemo callback

  const matchmakingMessage = useMemo(() => {
    switch (matchmakingStatus) {
      case MatchmakingStatus.Searching: return t('matchmaking.searching');
      case MatchmakingStatus.OpponentFound: return t('matchmaking.opponentFound');
      case MatchmakingStatus.StartingGame: return t('matchmaking.startingGame');
      default: return '';
    }
  }, [matchmakingStatus, t]);

  return (
    <header className="h-20 bg-transparent px-4 md:px-6 flex justify-between items-center border-b-2 border-[#A100FF]/50 shrink-0">
      <div className="flex items-center">
        <h2 className="text-xl md:text-2xl font-orbitron font-bold text-[#00E0FF] uppercase tracking-wider" style={{textShadow: '0 0 5px #00E0FF, 0 0 10px #A100FF40'}}>{displayLabel}</h2> 
        {matchmakingMessage && (
          <span className="ml-3 md:ml-4 text-sm text-yellow-300 animate-pulse font-semibold bg-[#FFD700]/10 px-2 py-0.5 rounded-md">{matchmakingMessage}</span>
        )}
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <MemoizedLanguageSwitcher />
        
        {onOpenGlobalChat && (
        <button 
            onClick={onOpenGlobalChat} 
            className="relative p-2 rounded-full hover:bg-gradient-to-tr hover:from-[#6A00FF]/40 hover:to-[#A100FF]/30 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF00C8] focus:ring-offset-2 focus:ring-offset-[#10051C]"
            aria-label={t('chat.openMessages')}
            title={t('chat.openMessages')}
        >
            <ChatIcon className={`w-6 h-6 transition-colors ${unreadPrivateMessagesCount > 0 ? 'text-[#FF00C8] animate-pulse' : 'text-[#00E0FF]/90 hover:text-[#00E0FF]'}`} />
            {unreadPrivateMessagesCount > 0 && (
            <span className="absolute top-0 right-0 block h-3.5 w-3.5 transform -translate-y-1 translate-x-1 border-2 border-[#10051C] rounded-full">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-red-600"></span>
            </span>
            )}
        </button>
        )}

        <MemoizedCurrencyDisplay
          amount={sparks}
          label={t('currency.sparks')}
          icon={<SparkIcon className="w-6 h-6 text-[#FFD700]" />}
          amountClassName="text-lg text-[#FFD700]" 
          labelClassName="text-xs text-[#E0E7FF]/80"
          backgroundClassName="bg-[#181C27]/80 hover:bg-[#10051C]/70 transition-colors" 
        />
        <MemoizedCurrencyDisplay
          amount={neurons}
          label={t('currency.neurons')}
          icon={<NeuronIcon className="w-6 h-6 text-[#A100FF]" />}
          amountClassName="text-lg text-[#A100FF]" 
          labelClassName="text-xs text-[#E0E7FF]/80"
          backgroundClassName="bg-[#181C27]/80 hover:bg-[#10051C]/70 transition-colors"
        />
        <div className="relative">
          <button 
            onClick={() => setIsProfileDropdownOpen(prev => !prev)}
            onBlur={() => setTimeout(() => setIsProfileDropdownOpen(false), 150)} 
            className="flex items-center space-x-2 md:space-x-3 p-1.5 md:p-2 rounded-xl hover:bg-gradient-to-tr hover:from-[#6A00FF]/40 hover:to-[#A100FF]/30 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF00C8] focus:ring-offset-2 focus:ring-offset-[#10051C]"
            aria-haspopup="true"
            aria-expanded={isProfileDropdownOpen}
            aria-controls="profile-dropdown"
          >
            <img 
              src={effectiveAvatarUrl} 
              alt={username} 
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-[#181C27] group-hover:border-[#FF00C8] transition-colors"
            />
            <span className="hidden md:inline text-[#E0E7FF] font-semibold text-sm">{username}</span>
            <MyAccountIcon className="w-5 h-5 text-[#E0E7FF]/80 group-hover:text-[#00E0FF] transition-colors hidden md:block" />
          </button>
          {isProfileDropdownOpen && (
            <div 
              id="profile-dropdown"
              className="absolute right-0 mt-2.5 w-52 bg-gradient-to-br from-[#10051C] to-[#181C27] backdrop-blur-lg rounded-xl shadow-2xl border-2 border-[#A100FF]/70 p-2 z-50 animate-fadeIn"
              onMouseDown={(e) => e.preventDefault()} 
            >
              <button 
                  onClick={() => { onNavigate(ActiveSection.MyAccount); setIsProfileDropdownOpen(false); }}
                  className="w-full text-left px-3.5 py-2.5 text-sm text-[#E0E7FF] hover:bg-[#FF00C8]/30 hover:text-[#00E0FF] rounded-lg transition-colors flex items-center"
              >
                  <MyAccountIcon className="w-4 h-4 mr-2.5 text-[#00E0FF]/90" /> {t('header.myProfile')}
              </button>
              <MemoizedButton 
                  onClick={() => { onLogout(); setIsProfileDropdownOpen(false); }} 
                  variant="danger" 
                  size="small"
                  className="w-full mt-1.5 !bg-red-700/80 hover:!bg-red-600/90 !text-sm"
              >
                  {t('header.logout')}
              </MemoizedButton>
            </div>
          )}
        </div>
      </div>
      <style>{`
         @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.15s ease-out forwards; }
      `}</style>
    </header>
  );
});

export default Header;