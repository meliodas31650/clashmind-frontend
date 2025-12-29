

import React from 'react';

export interface MenuItem {
  id: string;
  label: string; // This will be the translated label
  icon: React.ReactNode;
  path: string; 
}

/**
 * @interface MenuItemKey
 * @description Defines the structure for menu items using translation keys.
 * @property {string} id - Unique identifier for the menu item.
 * @property {string} translationKey - Key used for looking up the localized label.
 * @property {React.ReactNode} icon - Icon component for the menu item.
 * @property {string} path - Navigation path associated with the menu item.
 */
export interface MenuItemKey {
  id: string;
  translationKey: string; 
  icon: React.ReactNode;
  path: string; 
}


export interface UserProfile {
  id: string;
  username: string;
  avatarUrl?: string; 
  isOnline: boolean;
  sparks: number; 
  neurons: number; 
  gameHistory?: GameMatch[]; 
  stats?: UserStats; 
  isAdmin?: boolean; 
  isGuest?: boolean; 
  ageVerified?: boolean; 
  initialGamblingWarningAcknowledged?: boolean; 
}

export interface UserStats {
  wins: number;
  losses: number;
  draws: number;
  elo: number; 
}

export interface GameMatch {
  gameName: string;
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  date: string; 
  sparksWagered: number;
  neuronsChange: number;
}

export interface GameInfo {
  id: string;
  title: string;
  description: string; 
  imageUrl: string; 
  rules: string;
  caption: string;
  gameType: string;
  estimatedDuration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  starsToWin: number; 
}

export enum ActiveSection {
  CortexArena = 'CORTEX_ARENA',
  MyAccount = 'MY_ACCOUNT',
  RulesAndGames = 'RULES_AND_GAMES',
  SparksMarket = 'SPARKS_MARKET',
  NeuronsLeague = 'NEURONS_LEAGUE',
  Events = 'EVENTS',
  AdminPanel = 'ADMIN_PANEL',
  Wallet = 'WALLET', 
  MessagingHub = 'MESSAGING_HUB', 
  Academy = 'ACADEMY', 
}

export type AppView = 'landing' | 'auth' | 'dashboard' | 'restricted' | 'projectInfo';

export interface AuthFormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  ageConfirmation?: string; 
  general?: string;
}

export interface PlayingGameInfo {
  id: string;
  name: string;
}

export type ActiveConversationType = 'global' | 'private' | 'group';

export interface ChatMessage {
  id: string;
  userId: string; 
  username: string;
  avatarUrl?: string;
  text: string;
  timestamp: Date; 
  isSystem?: boolean; 
  isOwn?: boolean; // Added to simplify rendering logic
}

export interface PrivateConversationPreview {
  userId: string;
  userName: string;
  avatarUrl?: string;
  lastMessageSnippet?: string;
  lastMessageTimestamp?: Date;
  unreadCount?: number;
  isActive?: boolean; // Can be used to highlight the currently open chat
  isOnline?: boolean; // Added for online status indicator
}

export interface PrivateChatSession {
  userId: string; 
  userName: string;
  avatarUrl?: string;
  messages: ChatMessage[];
  isOnline?: boolean;
}

export interface GroupChatSession {
  groupId: string;
  groupName: string;
  avatarUrl?: string; // e.g., a generic group icon or user-settable
  members: UserProfile[]; // Simplified, could be just IDs
  messages: ChatMessage[];
  lastMessageTimestamp?: Date; // For sorting
  unreadCount?: number; // For notifications
}


export enum MatchmakingStatus {
  Idle = 'Idle',
  Searching = 'Searching...',
  OpponentFound = 'Opponent Found!',
  StartingGame = 'Starting Game...',
}

export enum UserInteractionOptions {
  Challenge = 'Challenge',
  ViewProfile = 'View Profile', // Placeholder
  BlockUser = 'Block User',
  UnblockUser = 'Unblock User', // Placeholder
  AddToGroup = 'Add to Group', // Placeholder
  ReportUser = 'Report User' // Placeholder
}

/**
 * @interface Translations
 * @description Defines the structure for translation strings. Can be nested.
 */
export interface Translations {
  [key: string]: string | Translations;
}

/**
 * @typedef DropDirection
 * @description Defines the possible directions a piece can be dropped from in Gravity Four.
 */
export type DropDirection = 'top' | 'bottom';