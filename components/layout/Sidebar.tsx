

import React from 'react';
import { ActiveSection, MenuItemKey } from '../../types';
import OfficialClashMindLogo from '../ui/OfficialClashMindLogo';
import useTranslation from '../../hooks/useTranslation';

/**
 * @typedef SidebarProps
 * @property {MenuItemKey[]} menuItemKeys - Array of menu item configurations with translation keys.
 * @property {ActiveSection} activeItem - The currently active section ID.
 * @property {(sectionId: ActiveSection) => void} onNavigate - Callback function for navigation.
 */
interface SidebarProps {
  menuItemKeys: MenuItemKey[];
  activeItem: ActiveSection;
  onNavigate: (sectionId: ActiveSection) => void;
}

const MemoizedOfficialClashMindLogo = React.memo(OfficialClashMindLogo);

/**
 * Sidebar component for dashboard navigation.
 * Displays the application logo and a list of navigable menu items.
 * @param {SidebarProps} props - Component props.
 * @returns {JSX.Element} The rendered Sidebar component.
 */
const Sidebar: React.FC<SidebarProps> = React.memo(({ menuItemKeys, activeItem, onNavigate }) => {
  const { t } = useTranslation();

  return (
    <aside className="w-64 bg-gradient-to-b from-[#181C27]/90 to-[#10051C]/95 backdrop-blur-xl p-4 flex flex-col border-r-2 border-[#A100FF]/70 shadow-2xl shadow-[#A100FF]/25">
      <div className="mb-10 text-center pt-3 flex flex-col items-center">
        <MemoizedOfficialClashMindLogo size="tiny" className="mb-2 drop-shadow-[0_2px_10px_rgba(0,224,255,0.4)]"/>
        <p className="text-xs text-[#E0E7FF]/70 mt-1 font-medium tracking-wide">{t('sidebar.tagline')}</p>
      </div>
      <nav className="flex-grow">
        <ul>
          {menuItemKeys.map((item) => (
            <li key={item.id} className="mb-2.5"> {/* Slightly increased margin */}
              <button
                onClick={() => onNavigate(item.id as ActiveSection)}
                className={`
                  w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ease-in-out group
                  focus:outline-none focus:ring-2 focus:ring-[#FF00C8] focus:ring-opacity-75 relative
                  ${
                    activeItem === item.id
                      ? 'bg-gradient-to-r from-[#FF00C8]/30 to-[#A100FF]/20 text-[#00E0FF] shadow-inner shadow-black/30'
                      : 'text-[#BCC8DF] hover:bg-gradient-to-r hover:from-[#6A00FF]/30 hover:to-[#A100FF]/20 hover:text-[#E0E7FF]'
                  }
                `}
                aria-current={activeItem === item.id ? 'page' : undefined}
                aria-label={t(item.translationKey)}
              >
                {/* Active indicator bar */}
                {activeItem === item.id && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-3/4 w-1.5 bg-gradient-to-b from-[#FF00C8] to-[#00E0FF] rounded-r-full shadow-[0_0_8px_0px_#FF00C8]"></span>
                )}
                {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { 
                  className: `w-5 h-5 mr-3.5 transition-colors duration-200 ${activeItem === item.id ? 'text-[#00E0FF]' : 'text-[#A100FF]/90 group-hover:text-[#00E0FF]'}`
                })}
                <span className={`font-semibold tracking-wide ${activeItem === item.id ? 'text-[#00E0FF]' : 'group-hover:text-[#E0E7FF]'}`}>{t(item.translationKey)}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto text-center text-xs text-[#E0E7FF]/60 border-t border-[#A100FF]/20 pt-3">
        <p>&copy; {new Date().getFullYear()} ClashMind</p>
        <p>{t('sidebar.version')} 0.7.5 "Photon Grid"</p> 
      </div>
    </aside>
  );
});

export default Sidebar;