

import React, { CSSProperties } from 'react';
import { GameInfo, UserProfile, ActiveSection, MenuItemKey } from './types'; // MenuItemKey might be needed if structure changed

/**
 * @typedef IconProps
 * @property {string} [className] - Optional CSS class names.
 * @property {CSSProperties} [style] - Optional inline styles.
 */
interface IconProps {
  className?: string;
  style?: CSSProperties;
}

// Using #00E0FF (Cortex Blue) for primary interactive icons
/**
 * CortexArenaIcon component (Brain Icon).
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const CortexArenaIcon: React.FC<IconProps> = React.memo(({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5C9.04 4.5 6.587 6.077 5.385 8.25M12 4.5C14.96 4.5 17.413 6.077 18.615 8.25M12 4.5V9M12 9c2.485 0 4.5 2.015 4.5 4.5s-2.015 4.5-4.5 4.5S7.5 15.985 7.5 13.5 9.515 9 12 9zm0 0c-2.61.348-4.256 2.074-4.586 4.5M12 9c2.61.348 4.256 2.074 4.586 4.5m-9.172 0C3.001 13.5 3 13.75 3 14c0 1.933 1.567 3.5 3.5 3.5s3.5-1.567 3.5-3.5c0-.25 0-.499-.088-.73m5.176 0c.088.23.088.48.088.73 0 1.933 1.567 3.5 3.5 3.5s3.5-1.567 3.5-3.5c0-.25 0-.499-.088-.73M7.5 16.5c0 .937.156 1.834.436 2.664M16.5 16.5c0 .937-.156 1.834-.436 2.664M12 21.75c1.47 0 2.844-.453 4-1.22M12 21.75c-1.47 0-2.844-.453-4-1.22" />
  </svg>
));

/**
 * MyAccountIcon component.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const MyAccountIcon: React.FC<IconProps> = React.memo(({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
));

/**
 * RulesIcon component.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const RulesIcon: React.FC<IconProps> = React.memo(({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
));

/**
 * SparksMarketIcon component.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const SparksMarketIcon: React.FC<IconProps> = React.memo(({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
));

/**
 * NeuronsLeagueIcon component.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const NeuronsLeagueIcon: React.FC<IconProps> = React.memo(({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
));

/**
 * EventsIcon component.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const EventsIcon: React.FC<IconProps> = React.memo(({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
  </svg>
));

/**
 * AdminIcon component.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const AdminIcon: React.FC<IconProps> = React.memo(({ className = "w-5 h-5 mr-3 text-[#00E0FF]", style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
));

/**
 * SparkIcon component.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const SparkIcon: React.FC<IconProps> = React.memo(({ className = "w-6 h-6 text-[#FFD700]", style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
));

/**
 * NeuronIcon component.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const NeuronIcon: React.FC<IconProps> = React.memo(({ className = "w-6 h-6 text-[#A100FF]", style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.03 1.125 0 1.13.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5h7.5M8.25 7.5V9a.75.75 0 01-.75.75H5.625a.75.75 0 01-.75-.75V7.5m7.5 0V9A.75.75 0 0015 9.75h2.625a.75.75 0 00.75-.75V7.5M8.25 15V18a.75.75 0 00.75.75h5.25a.75.75 0 00.75-.75V15M8.25 15h7.5M8.25 15A2.25 2.25 0 006 17.25v.75a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 18v-.75a2.25 2.25 0 00-2.25-2.25M15 15A2.25 2.25 0 0117.25 12.75v-.75a2.25 2.25 0 012.25-2.25" />
  </svg>
));

/**
 * WalletIcon component.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const WalletIcon: React.FC<IconProps> = React.memo(({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6.75A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V12m18 0v-6A2.25 2.25 0 0018.75 3.75H5.25A2.25 2.25 0 003 6v6m18 0c0 1.632-.534 3.123-1.428 4.319M3 12c0 1.632.534 3.123 1.428 4.319" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 9.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
));

/**
 * CookieIcon component.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const CookieIcon: React.FC<IconProps> = React.memo(({ className = "w-5 h-5 text-[#FFD700]", style }) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 21a11.217 11.217 0 01-5.064-1.254 11.246 11.246 0 01-4.436-4.436C2.062 13.527 2.013 11.22 3.107 9.387c1.093-1.832 3.018-2.924 5.039-3.208C9.916 5.92 11.396 5.5 12.75 5.5c.348 0 .692.019 1.031.056C15.228 5.707 16.57 6.18 17.65 7.028c1.616 1.282 2.55 3.28 2.55 5.472 0 1.56-.476 3.031-1.348 4.301-.873 1.27-2.022 2.298-3.372 2.946A11.173 11.173 0 0112.75 21z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 8.25a.75.75 0 100-1.5.75.75 0 000 1.5zM9 12a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 12a.75.75 0 100-1.5.75.75 0 000 1.5zM11.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 14.25a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
));

/**
 * DefaultUserIcon for chat avatars and fallbacks.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const DefaultUserIcon: React.FC<IconProps> = React.memo(({ className = "w-full h-full text-[#F4F4F4]", style }) => (
    <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
));

// Chat related icons
/**
 * SendIcon for chat message submission.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const SendIcon: React.FC<IconProps> = React.memo(({ className = "w-5 h-5 text-[#00E0FF]", style }) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 16.571V11.5a1 1 0 011-1h.094a1 1 0 01.866.517l1.581 2.805L16.615 4.65A1 1 0 0015.93 3.03l-5.036-.478z" />
    </svg>
));

/**
 * BlockIcon for user blocking functionality.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const BlockIcon: React.FC<IconProps> = React.memo(({ className = "w-4 h-4 text-red-400", style }) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
));

/**
 * ReportIcon for reporting users or content.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const ReportIcon: React.FC<IconProps> = React.memo(({ className = "w-4 h-4 text-yellow-400", style }) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
));

/**
 * GameIcon for generic game representation.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const GameIcon: React.FC<IconProps> = React.memo(({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M3 7.5h18M3 12h18M3 16.5h18M3 21h18M7.5 3v18M12 3v18M16.5 3v18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25h2.25v2.25H5.25V5.25zm0 9h2.25v2.25H5.25v-2.25zm9-9h2.25v2.25H14.25V5.25zm0 9h2.25v2.25H14.25v-2.25z" />
  </svg>
));

/**
 * ChatIcon for accessing chat features.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const ChatIcon: React.FC<IconProps> = React.memo(({ className = "w-5 h-5", style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.682-3.091c-.375.023-.75.036-1.125.036H6.615c-1.136 0-2.097-.847-2.193-1.98A18.723 18.723 0 013.75 12.75c0-1.02.261-1.967.734-2.796A18.723 18.723 0 016.615 9H9.75a.75.75 0 01.75.75v.75M12.75 8.25v-1.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5m0 0H12.75m0 0A18.723 18.723 0 0118.75 9.75M6 12a18.723 18.723 0 0112.75 0" />
  </svg>
));


/**
 * ChallengeIcon for duel invitations.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const ChallengeIcon: React.FC<IconProps> = React.memo(({ className = "w-5 h-5", style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
));


/**
 * QuickMatchIcon for matchmaking.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const QuickMatchIcon: React.FC<IconProps> = React.memo(({ className = "w-5 h-5", style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3V7.5a3 3 0 013-3h13.5a3 3 0 013 3v3.75a3 3 0 01-3 3m-13.5 0h13.5M12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
  </svg>
));

/**
 * AcademyIcon for ClashMind Academy.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const AcademyIcon: React.FC<IconProps> = React.memo(({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
));

/**
 * GroupIcon for group chat functionality.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const GroupIcon: React.FC<IconProps> = React.memo(({ className = "w-5 h-5 text-[#00E0FF]", style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
));

/**
 * SearchIcon for search functionality.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const SearchIcon: React.FC<IconProps> = React.memo(({ className = "w-5 h-5 text-[#00E0FF]", style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
));

/**
 * MoreVerticalIcon for context menus or additional options.
 * @param {IconProps} props - Component props.
 * @returns {JSX.Element}
 */
export const MoreVerticalIcon: React.FC<IconProps> = React.memo(({ className = "w-5 h-5 text-[#00E0FF]", style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
  </svg>
));


/**
 * @constant MENU_ITEMS_KEYS
 * @description Array of menu item configurations using translation keys for labels.
 * Each item includes an ID, a translation key for its label, an icon component, and a path.
 * @type {MenuItemKey[]}
 */
export const MENU_ITEMS_KEYS: MenuItemKey[] = [
  { id: ActiveSection.CortexArena, translationKey: 'menu.cortexArena', icon: <CortexArenaIcon className="w-5 h-5 mr-3" />, path: '/arena' },
  { id: ActiveSection.MessagingHub, translationKey: 'menu.messagingHub', icon: <ChatIcon className="w-5 h-5 mr-3" />, path: '/messaging' },
  { id: ActiveSection.Wallet, translationKey: 'menu.wallet', icon: <WalletIcon className="w-5 h-5 mr-3" />, path: '/wallet' },
  { id: ActiveSection.Academy, translationKey: 'menu.academy', icon: <AcademyIcon className="w-5 h-5 mr-3" />, path: '/academy' },
  { id: ActiveSection.RulesAndGames, translationKey: 'menu.rulesAndGames', icon: <RulesIcon className="w-5 h-5 mr-3" />, path: '/rules' },
  { id: ActiveSection.SparksMarket, translationKey: 'menu.sparksMarket', icon: <SparksMarketIcon className="w-5 h-5 mr-3" />, path: '/market' },
  { id: ActiveSection.NeuronsLeague, translationKey: 'menu.neuronsLeague', icon: <NeuronsLeagueIcon className="w-5 h-5 mr-3" />, path: '/league' },
];

export const AVAILABLE_GAMES: GameInfo[] = [
  {
    id: 'forms-fights',
    title: 'Forms Fights',
    description: 'Match complex 3D geometric shapes faster than your opponent. Wager Sparks for rewards!',
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    rules: 'Players are presented with a target 3D form. Multiple other forms appear, and the player must select the one matching the target. Speed and accuracy are key. Rounds increase in complexity. Sparks wagered are awarded to the winner.',
    caption: "Shape logic into strategy. Win Sparks!",
    gameType: "Spatial Reasoning",
    estimatedDuration: "3-5 min",
    difficulty: "Medium",
    starsToWin: 10
  },
  {
    id: 'gravity-four',
    title: 'Gravity Four',
    description: 'A strategic connect-four variant with a central gravity line. Wager Sparks, win big with foresight and tactical play.',
    imageUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    rules: 'Players drop tokens from top or bottom towards a central Gravity Line. Align 4 tokens horizontally, vertically, or diagonally. The Gravity Line (row 3 from bottom) acts as a blocker; tokens stack towards it but do not cross. Each player has 2 mins total and 30s per turn. Timeouts lead to loss.',
    caption: "Connect under pressure. Play for Sparks.",
    gameType: "Abstract Strategy",
    estimatedDuration: "5-10 min",
    difficulty: "Medium",
    starsToWin: 15 // Default 2 Sparks from spec -> 15 per player, winner gets 30.
  },
  {
    id: 'calcul-rush',
    title: 'Calcul Rush',
    description: 'Solve arithmetic challenges at high speed. Test your mental math and win Sparks.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    rules: 'Equations appear on screen, and players must input the correct answer before time runs out. Difficulty and speed increase with each correct answer. Outscore your opponent to win the wagered Sparks.',
    caption: "Speed meets precision. Dominate for Sparks.",
    gameType: "Mental Math",
    estimatedDuration: "2-4 min",
    difficulty: "Hard",
    starsToWin: 12
  },
  {
    id: 'logic-link',
    title: 'LogicLink',
    description: 'Forge logical connections to solve puzzles. Compete for Sparks rewards.',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    rules: 'Players are given a set of items (images, words, symbols) and must identify underlying logical links or complete a sequence. Levels involve increasingly abstract relationships. The sharpest mind wins the Sparks.',
    caption: "Every link matters. Every Spark counts.",
    gameType: "Logic Puzzle",
    estimatedDuration: "5-12 min",
    difficulty: "Hard",
    starsToWin: 18
  },
  {
    id: 'memory-mind',
    title: 'Memory Mind',
    description: 'En 2 minutes, enchaîne un maximum de séquences mémorisées en 10 secondes, puis réponds à des questions piégeuses générées dynamiquement.',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', // Kept original image, still fitting
    rules: 'Temps total : 2 minutes. Chaque séquence est affichée pendant 10 secondes. Répondez ensuite à 3-5 questions aléatoires. Séquence suivante si le temps le permet. Marquez des points pour chaque bonne réponse + bonus pour séquence parfaite.',
    caption: "Le défi ultime de mémoire rapide.",
    gameType: "Cognitive Speed & Recall",
    estimatedDuration: "2 min",
    difficulty: "Hard",
    starsToWin: 10
  },
];

export const PLACEHOLDER_USERS: UserProfile[] = [
  { id: 'user1', username: 'LogicWeaver', avatarUrl: 'https://picsum.photos/seed/user1/40/40', isOnline: true, sparks: 1250, neurons: 1500, ageVerified: true },
  { id: 'user2', username: 'CortexConq', avatarUrl: 'https://picsum.photos/seed/user2/40/40', isOnline: true, sparks: 800, neurons: 1200, ageVerified: true },
  { id: 'user3', username: 'SynapseStar', avatarUrl: 'https://picsum.photos/seed/user3/40/40', isOnline: false, sparks: 2500, neurons: 1800, ageVerified: true },
  { id: 'user4', username: 'PatternPrime', avatarUrl: 'https://picsum.photos/seed/user4/40/40', isOnline: true, sparks: 500, neurons: 900, ageVerified: true },
  { id: 'user5', username: 'MindSculptor', avatarUrl: 'https://picsum.photos/seed/user5/40/40', isOnline: true, sparks: 3000, neurons: 2200, ageVerified: true },
  { id: 'adminUser', username: 'meliodas', avatarUrl: 'https://picsum.photos/seed/admin/40/40', isOnline: true, sparks: 9999, neurons: 9999, isAdmin: true, ageVerified: true },
  { id: 'user6', username: 'GridRunnerX', avatarUrl: 'https://picsum.photos/seed/user6/40/40', isOnline: true, sparks: 1750, neurons: 1600, ageVerified: true },
  { id: 'user7', username: 'SynthWaveRider', avatarUrl: 'https://picsum.photos/seed/user7/40/40', isOnline: true, sparks: 950, neurons: 1100, ageVerified: true },
];

/**
 * Determines the Neuron tier based on the number of Neurons.
 * @param {number} neurons - The number of Neurons.
 * @returns {string} The corresponding Neuron tier name.
 */
export const getNeuronTier = (neurons: number): string => {
  if (neurons >= 4000) return "Conscience Ascendante";
  if (neurons >= 2500) return "Cortex Éveillé";
  if (neurons >= 1500) return "Réseau Actif";
  if (neurons >= 1000) return "Connexion Stable";
  if (neurons >= 500) return "Synapse Naissante";
  return "Neural Spark";
};

// Player colors for Gravity Four - Galactic Version
export const PLAYER1_COLOR_BG_GALACTIC = "bg-gradient-to-br from-orange-500 to-red-600";
export const PLAYER1_COLOR_BORDER_GALACTIC = "border-red-300";
export const PLAYER1_TEXT_COLOR_GALACTIC = "text-orange-400";
export const PLAYER1_GLOW_GALACTIC = "shadow-[0_0_12px_3px_rgba(255,100,0,0.7)]";

export const PLAYER2_COLOR_BG_GALACTIC = "bg-gradient-to-br from-cyan-400 to-blue-600";
export const PLAYER2_COLOR_BORDER_GALACTIC = "border-blue-300";
export const PLAYER2_TEXT_COLOR_GALACTIC = "text-cyan-300";
export const PLAYER2_GLOW_GALACTIC = "shadow-[0_0_12px_3px_rgba(0,200,255,0.7)]";

export const GRAVITY_LINE_BORDER_COLOR_GALACTIC = "border-cyan-400";
export const GRAVITY_LINE_BG_PULSE_COLOR_GALACTIC = "bg-cyan-500/30";

export const NEURON_PARTICIPATION_REWARD = 1;

// Memory Mind Game Constants
export const MEMORY_MIND_GAME_DURATION = 120; // 2 minutes
export const MEMORY_MIND_SEQUENCE_DISPLAY_TIME = 10; // 10 seconds
export const MEMORY_MIND_MIN_QUESTIONS = 3;
export const MEMORY_MIND_MAX_QUESTIONS = 5;
export const MEMORY_MIND_CORRECT_ANSWER_SCORE = 10; // e.g. 10 points per correct answer
export const MEMORY_MIND_SEQUENCE_BONUS_SCORE = 50; // e.g. 50 bonus points for all correct in a sequence
export const MEMORY_MIND_DEFAULT_SPARK_WAGER = 10; // Default wager for Memory Mind
export const MEMORY_MIND_ITEMS = [ // Sample items for sequences
  '🟥', '🟩', '🟦', '🟨', '🟪', '🟧', // Colors
  '🍎', '🍌', '🍇', '🍓', '🥝', '🍍', // Fruits
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', // Digits
  'CAT', 'DOG', 'SUN', 'MOON', 'STAR', 'CODE' // Simple words
];
export const MEMORY_MIND_SEQUENCE_LENGTH_MIN = 5;
export const MEMORY_MIND_SEQUENCE_LENGTH_MAX = 8;
export const MEMORY_MIND_QUESTION_OPTIONS = 4; // Number of options for MCQ

// Theme Colors for Memory Mind
export const MEMORY_MIND_DEEP_PURPLE_BG = 'bg-gradient-to-br from-purple-800 via-indigo-900 to-purple-900'; // "violet profond"
export const MEMORY_MIND_DEEP_PURPLE_TEXT = 'text-purple-300';
export const MEMORY_MIND_GOLD_ACCENT = 'text-yellow-400'; // "éclairs dorés" - for text, highlights
export const MEMORY_MIND_GOLD_BORDER = 'border-yellow-400'; // "éclairs dorés" - for borders
export const MEMORY_MIND_GOLD_BUTTON_BG = 'bg-yellow-500 hover:bg-yellow-400';
export const MEMORY_MIND_GOLD_BUTTON_TEXT = 'text-purple-900';

// General Neuron Rewards (can be overridden by game-specific)
export const NEURON_WIN_GENERAL = 20;
export const NEURON_LOSS_GENERAL = -5;
export const NEURON_DRAW_GENERAL = 5;

// Chat-related constants
export const GLOBAL_CHAT_ID = 'global';
export const GLOBAL_CHAT_NAME = 'Global Chat';
export const MAX_MESSAGE_LENGTH = 500;
export const CHAT_POLL_INTERVAL = 5000; // ms, for simulated receiving messages