

import React, { useState, useRef, useEffect } from 'react';
import { ActiveSection, GameInfo, UserProfile, PrivateChatSession, ChatMessage, ActiveConversationType, GroupChatSession } from '../../types';
import GameShowcase from '../game/GameShowcase';
import GlassCard from '../ui/GlassCard';
import NeuronsLeagueInfo from '../info/NeuronsLeagueInfo'; 
import LeaderboardDisplay from '../ui/LeaderboardDisplay'; 
import AdminPlaceholder from '../admin/AdminPlaceholder';
import WalletPage from '../pages/WalletPage'; 
import Button from '../ui/Button'; 
import { QuickMatchIcon, SendIcon, DefaultUserIcon, GLOBAL_CHAT_ID, GLOBAL_CHAT_NAME } from '../../constants'; 
import { useT } from "../../src/contexts/I18nLiveContext";
import MessagingHubView from '../messaging/MessagingHubView'; 
import AcademyPlaceholderView from '../info/AcademyPlaceholderView';

interface MainContentAreaProps {
  activeSection: ActiveSection;
  games: GameInfo[];
  onPlayGame?: (gameId: string, gameName: string) => void;
  allUsers?: UserProfile[]; 
  currentUser?: UserProfile | null; 
  onQuickMatch?: () => void;

  // Props for MessagingHubView & embedded Global Chat
  globalChatMessages: ChatMessage[];
  privateConversations: Record<string, PrivateChatSession>;
  groupConversations: Record<string, GroupChatSession>;
  activeConversationId: string | null;
  activeConversationType: ActiveConversationType | null;
  unreadMessages: Record<string, number>;
  blockedUserIds: string[];
  showCreateGroupModal: boolean;
  onOpenConversation: (id: string, type: ActiveConversationType) => void;
  onSendMessage: (conversationId: string, conversationType: ActiveConversationType, text: string) => void;
  onChallengeUser: (opponentId: string, gameId: string, gameName: string) => void;
  onCreateGroup: (groupName: string, memberIds: string[]) => void;
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
  onSetShowCreateGroupModal: (show: boolean) => void;
}

const MemoizedGlassCard = React.memo(GlassCard);
const MemoizedGameShowcase = React.memo(GameShowcase);
const MemoizedNeuronsLeagueInfo = React.memo(NeuronsLeagueInfo); 
const MemoizedLeaderboardDisplay = React.memo(LeaderboardDisplay); 
const MemoizedAdminPlaceholder = React.memo(AdminPlaceholder);
const MemoizedWalletPage = React.memo(WalletPage);
const MemoizedButton = React.memo(Button);
const MemoizedMessagingHubView = React.memo(MessagingHubView);
const MemoizedAcademyPlaceholderView = React.memo(AcademyPlaceholderView);


const SectionTitle: React.FC<{ title: string; subtitle?: string; titleClassName?: string; subtitleClassName?: string }> = React.memo(({ title, subtitle, titleClassName, subtitleClassName }) => (
  <div className="mb-6 md:mb-8 px-4 md:px-6 pt-4 md:pt-6"> 
    <h2 className={`text-3xl md:text-4xl font-orbitron font-bold text-[#FFD700] tracking-wide ${titleClassName}`} style={{textShadow: '0 0 6px rgba(255,215,0,0.7), 0 0 10px rgba(255,215,0,0.5)'}}>{title}</h2>
    {subtitle && <p className={`text-[#E0E7FF]/80 text-base md:text-lg mt-1.5 ${subtitleClassName}`}>{subtitle}</p>}
  </div>
));

const ArenaGlobalChat: React.FC<{
  messages: ChatMessage[];
  currentUser: UserProfile | null;
  onSendMessage: (text: string) => void;
}> = React.memo(({ messages, currentUser, onSendMessage }) => {
  const { t } = useT();
  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim() && currentUser) { // Ensure user is logged in to send
      onSendMessage(chatInput.trim());
      setChatInput('');
    }
  };

  const getAvatar = (msg?: ChatMessage) => {
      if (msg?.userId === currentUser?.id) return currentUser?.avatarUrl;
      if (msg) return msg.avatarUrl;
      return undefined;
  };
  
  const defaultAvatar = (name?: string) => {
    if(!name) return undefined; // Should not happen if msg.username exists
    return `https://ui-avatars.com/api/?name=${name.replace(/\s/g, '+').substring(0,1)}&background=10051C&color=00E0FF&bold=true&font-size=0.5`;
  };

  return (
    // Increased height for more prominence: h-80 md:h-96
    <MemoizedGlassCard className="mt-6 md:mt-8 mx-4 md:mx-6 p-0 flex flex-col h-96 md:h-[28rem] border-[#A100FF]/40 shadow-[#A100FF]/10 interactive={false}">
      <h4 className="text-base font-orbitron text-[#FFD700] p-3 border-b-2 border-[#A100FF]/30 text-center bg-gradient-to-r from-[#10051C]/70 to-[#181C27]/70 rounded-t-2xl shadow-sm" style={{textShadow: '0 0 4px rgba(255,215,0,0.5)'}}>
        {GLOBAL_CHAT_NAME}
      </h4>
      <div className="flex-grow overflow-y-auto p-3 space-y-2.5 text-sm"> {/* Slightly larger base text */}
        {messages.map(msg => {
          const isOwn = msg.userId === currentUser?.id;
          const msgAvatar = getAvatar(msg) || defaultAvatar(msg.username);
          if (msg.isSystem) {
            return (
              <div key={msg.id} className="text-center my-1.5">
                <span className="text-xs text-purple-300/90 italic bg-purple-900/40 px-2.5 py-1 rounded-lg shadow-sm">
                  {msg.text}
                </span>
              </div>
            );
          }
          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
              {!isOwn && (
                msgAvatar ?
                <img src={msgAvatar} alt={msg.username} className="w-8 h-8 rounded-full flex-shrink-0 border-2 border-[#A100FF]/30 self-start" />
                : <DefaultUserIcon className="w-8 h-8 rounded-full flex-shrink-0 border-2 border-[#A100FF]/30 text-gray-500 bg-gray-700 p-0.5 self-start" />
              )}
              <div className={`max-w-[75%] md:max-w-[80%] p-3 rounded-xl shadow-md ${isOwn ? 'bg-gradient-to-br from-[#FF00C8]/70 to-[#A100FF]/60 rounded-br-md' : 'bg-gradient-to-br from-[#6A00FF]/70 to-[#A100FF]/60 rounded-bl-md'}`}>
                {!isOwn && <span className="text-xs font-semibold text-[#00E0FF] block mb-0.5">{msg.username}</span>}
                <p className="text-base break-words whitespace-pre-wrap leading-normal">{msg.text}</p> {/* Normal leading for readability */}
              </div>
               {isOwn && currentUser?.avatarUrl && (
                 <img src={currentUser.avatarUrl} alt={currentUser.username} className="w-8 h-8 rounded-full flex-shrink-0 border-2 border-[#FF00C8]/40 self-start" />
               )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="p-3 border-t-2 border-[#A100FF]/30 flex items-center gap-2 bg-gradient-to-r from-[#10051C]/70 to-[#181C27]/70 rounded-b-2xl">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder={currentUser ? t('chat.typeMessagePlaceholder') : "Log in to chat"}
          className="flex-grow bg-[#0A0D14]/70 border-2 border-[#6A00FF]/50 text-[#E0E7FF] placeholder-[#E0E7FF]/60 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#FF00C8] focus:border-transparent outline-none text-base transition-all"
          disabled={!currentUser}
        />
        <MemoizedButton type="submit" variant="primary" size="medium" className="!p-3" disabled={!currentUser || !chatInput.trim()}>
          <SendIcon className="w-6 h-6" />
        </MemoizedButton>
      </form>
    </MemoizedGlassCard>
  );
});

const CortexArenaView: React.FC<{ 
  games: GameInfo[]; 
  onPlayGame?: (gameId: string, gameName: string) => void; 
  onQuickMatch?: () => void;
  // Props for embedded global chat
  globalChatMessages: ChatMessage[];
  currentUser: UserProfile | null;
  onSendMessage: (conversationId: string, conversationType: ActiveConversationType, text: string) => void;
}> = React.memo(({ games, onPlayGame, onQuickMatch, globalChatMessages, currentUser, onSendMessage }) => {
  const { t } = useT();
  return (
    <div className="h-full w-full rounded-lg p-1 flex flex-col cortex-arena-bg"> {/* Applied cortex-arena-bg here */}
      <div className="flex justify-between items-center mb-4 md:mb-6 px-4 md:px-6 pt-4 md:pt-6">
        <SectionTitle title="CORTEX ARENA" subtitle="Challenge your mind. Wager Sparks. Conquer rivals." titleClassName="!mb-0" subtitleClassName="!mt-0.5" />
        {onQuickMatch && (
          <MemoizedButton 
            onClick={onQuickMatch} 
            variant="secondary" 
            size="medium"
            leftIcon={<QuickMatchIcon className="w-5 h-5 mr-2" />}
            className="animate-pulse hover:animate-none shadow-lg shadow-[#A100FF]/40 hover:shadow-[#A100FF]/60"
          >
            {t('matchmaking.quickMatchButton')}
          </MemoizedButton>
        )}
      </div>
      <div className="px-4 md:px-6 flex-grow">
        <MemoizedGameShowcase games={games} onPlayGame={onPlayGame} />
      </div>
      <ArenaGlobalChat 
        messages={globalChatMessages} 
        currentUser={currentUser}
        onSendMessage={(text) => onSendMessage(GLOBAL_CHAT_ID, 'global', text)}
      />
    </div>
  );
});

const MyAccountView: React.FC<{ currentUser: UserProfile | null }> = React.memo(({ currentUser }) => {
  const { t } = useT();
  return (
  <div className="p-4 md:p-6"> 
    <SectionTitle title={t('menu.myAccount').toUpperCase()} subtitle={`Manage your profile, ${currentUser?.username || 'Gridrunner'}.`} />
    <MemoizedGlassCard>
      <p className="text-[#E0E7FF]/80">Account details, verification status (KYC), and settings will be available here.</p>
      {currentUser && !currentUser.isGuest && (
        <div className="mt-4 space-y-2.5 text-[#E0E7FF]">
          <p><strong>Username:</strong> <span className="text-[#00E0FF] font-semibold">{currentUser.username}</span></p>
          <p><strong>Sparks Balance:</strong> <span className="text-[#FFD700] font-bold">{currentUser.sparks?.toLocaleString()} ⚡</span> (Real Value)</p>
          <p><strong>Neurons Rating:</strong> <span className="text-[#A100FF] font-bold">{currentUser.neurons?.toLocaleString()} 🧠</span> (Skill)</p>
          <p><strong>Age Verified:</strong> <span className={`font-semibold ${currentUser.ageVerified ? "text-green-400" : "text-yellow-400"}`}>{currentUser.ageVerified ? "Yes" : "Pending Verification"}</span></p>
          {currentUser.isAdmin && <p className="text-green-300 font-bold tracking-wider">ROLE: ADMINISTRATOR</p>}
        </div>
      )}
       {currentUser?.isGuest && (
         <p className="mt-4 text-yellow-300">You are currently playing as a guest. Log in or sign up to save progress, access your wallet, and play for real value!</p>
       )}
       <div className="mt-8 border-t-2 border-[#A100FF]/40 pt-6">
          <h4 className="text-lg font-orbitron text-[#FFD700] mb-2.5" style={{textShadow: '0 0 4px rgba(255,215,0,0.5)'}}>{t('myAccount.gameWagerHistory')}</h4>
          <p className="text-sm text-[#E0E7FF]/70">Detailed records of your game history and Spark transactions will be accessible here.</p>
       </div>
       <div className="mt-6">
          <h4 className="text-lg font-orbitron text-[#FFD700] mb-2.5" style={{textShadow: '0 0 4px rgba(255,215,0,0.5)'}}>{t('myAccount.submitFeedback')}</h4>
          <p className="text-sm text-[#E0E7FF]/70">Help us improve ClashMind! A dedicated feedback system will be available soon.</p>
       </div>
    </MemoizedGlassCard>
  </div>
  );
});

const RulesAndGamesView: React.FC<{ games: GameInfo[] }> = React.memo(({ games }) => {
  const { t } = useT();
  return (
  <div className="p-4 md:p-6"> 
    <SectionTitle title={t('menu.rulesAndGames').toUpperCase()} subtitle={t('landingPage.heroSubtitle')} />
    <div className="space-y-8">
      {games.map(game => (
        <MemoizedGlassCard key={game.id} className="hover:border-[#FF00C8]/80 hover:shadow-[#FF00C8]/20" interactive={true}>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-1">
              <img 
                src={game.imageUrl || `https://source.unsplash.com/random/400x300/?${game.id},abstract,futuristic`} 
                alt={game.title} 
                className="w-full h-48 object-cover rounded-xl shadow-lg border-2 border-[#A100FF]/30"
              />
            </div>
            <div className="md:col-span-2">
              <h4 className="text-2xl font-orbitron text-[#00E0FF] mb-2">{game.title}</h4>
              <p className="text-sm text-[#E0E7FF]/80 mb-3 leading-relaxed">{game.description}</p>
              
              <div className="mb-4">
                <h5 className="text-md font-semibold text-[#FFD700] mb-1.5" style={{textShadow: '0 0 3px rgba(255,215,0,0.4)'}}>{t('gameShowcase.duelDetails')}</h5>
                <ul className="text-xs text-[#E0E7FF]/70 space-y-1">
                  <li><strong>{t('gameShowcase.type')}:</strong> {game.gameType}</li>
                  <li><strong>{t('gameShowcase.duration')}:</strong> {game.estimatedDuration}</li>
                  <li>
                    <strong>{t('gameShowcase.difficulty')}:</strong> 
                    <span className={`font-semibold ml-1 ${
                      game.difficulty === 'Easy' ? 'text-green-300' : 
                      game.difficulty === 'Medium' ? 'text-yellow-300' : 
                      game.difficulty === 'Hard' ? 'text-orange-300' :
                      'text-red-400'}`}>{game.difficulty}</span>
                  </li>
                  <li><strong>{t('gameShowcase.defaultWager')}:</strong> {game.starsToWin} {t('currency.sparks')} <span className="text-yellow-400">⚡</span></li> 
                </ul>
              </div>

              <div>
                <h5 className="text-md font-semibold text-[#FFD700] mb-1.5" style={{textShadow: '0 0 3px rgba(255,215,0,0.4)'}}>{t('gameShowcase.rulesAndInfo')}:</h5>
                <div className="text-xs text-[#E0E7FF]/75 bg-[#0A0D14]/50 p-3 rounded-md border border-[#6A00FF]/40 max-h-32 overflow-y-auto whitespace-pre-line leading-relaxed">
                  {game.rules}
                </div>
              </div>
            </div>
          </div>
        </MemoizedGlassCard>
      ))}
    </div>
  </div>
  );
});

const SparksMarketView: React.FC = React.memo(() => (
  <div className="p-4 md:p-6"> 
    <SectionTitle title="SPARKS MARKET" subtitle="Fuel your duels. Customize your experience." />
    <MemoizedGlassCard className="text-center">
      <p className="text-2xl md:text-3xl text-[#FFD700] font-orbitron animate-pulse mb-4" style={{textShadow: '0 0 7px rgba(255,215,0,0.7)'}}>⚡ Sparks Store & Rewards Hub! ⚡</p>
      <p className="text-[#E0E7FF]/80 mb-3">The Sparks Market is where you can securely purchase Sparks with real money to fund your wagers in the Cortex Arena.</p>
      <p className="text-[#E0E7FF]/80">Additionally, redeem unique avatar customizations, game themes, and other exclusive items with your earned Sparks or through special promotions.</p>
      <p className="text-sm text-yellow-300 mt-4 font-semibold">(Feature Coming Soon)</p>
    </MemoizedGlassCard>
  </div>
));

const EventsView: React.FC = React.memo(() => (
  <div className="p-4 md:p-6"> 
    <SectionTitle title="EVENTS" subtitle="Participate in special Grid challenges." />
    <MemoizedGlassCard className="text-center">
       <p className="text-2xl md:text-3xl text-[#FF00C8] font-orbitron animate-pulse mb-4">🗓️ Grid Tournaments Incoming! 🗓️</p>
      <p className="text-[#E0E7FF]/80">Upcoming tournaments, seasonal events, and special Grid challenges with larger Spark prize pools will be announced here. Stay tuned for exciting competitions with exclusive rewards!</p>
    </MemoizedGlassCard>
  </div>
));


const MainContentArea: React.FC<MainContentAreaProps> = React.memo(({
  activeSection,
  games,
  onPlayGame,
  allUsers,
  currentUser,
  onQuickMatch,
  // Chat props
  globalChatMessages,
  privateConversations,
  groupConversations,
  activeConversationId,
  activeConversationType,
  unreadMessages,
  blockedUserIds,
  showCreateGroupModal,
  onOpenConversation,
  onSendMessage,
  onChallengeUser,
  onCreateGroup,
  onBlockUser,
  onUnblockUser,
  onSetShowCreateGroupModal
}) => {
  switch (activeSection) {
    case ActiveSection.CortexArena:
      return <CortexArenaView 
                games={games} 
                onPlayGame={onPlayGame} 
                onQuickMatch={onQuickMatch} 
                globalChatMessages={globalChatMessages}
                currentUser={currentUser}
                onSendMessage={onSendMessage}
             />;
    case ActiveSection.MessagingHub: 
      return <MemoizedMessagingHubView
                currentUser={currentUser}
                globalChatMessages={globalChatMessages}
                privateConversations={privateConversations}
                groupConversations={groupConversations} 
                activeConversationId={activeConversationId}
                activeConversationType={activeConversationType}
                unreadMessages={unreadMessages}
                allUsers={allUsers || []} 
                blockedUserIds={blockedUserIds} 
                showCreateGroupModal={showCreateGroupModal} 
                onOpenConversation={onOpenConversation}
                onSendMessage={onSendMessage}
                onChallengeUser={onChallengeUser}
                availableGames={games} // Pass available games for duel selection
                onCreateGroup={onCreateGroup} 
                onBlockUser={onBlockUser} 
                onUnblockUser={onUnblockUser} 
                onSetShowCreateGroupModal={onSetShowCreateGroupModal} 
             />;
    case ActiveSection.Wallet: 
      return <div className="p-0"><MemoizedWalletPage currentUser={currentUser} /></div>; // Adjusted padding to WalletPage itself
    case ActiveSection.Academy:
      return <MemoizedAcademyPlaceholderView />;
    case ActiveSection.MyAccount:
      return <MyAccountView currentUser={currentUser} />;
    case ActiveSection.RulesAndGames:
      return <RulesAndGamesView games={games} />;
    case ActiveSection.SparksMarket:
      return <SparksMarketView />;
    case ActiveSection.NeuronsLeague:
      return (
        <div className="p-4 md:p-6"> 
          <SectionTitle title="NEURONS LEAGUE" subtitle="Climb the ranks. Become a legend." />
          <MemoizedNeuronsLeagueInfo />
          {allUsers && <MemoizedLeaderboardDisplay users={allUsers} currentUser={currentUser} />}
        </div>
      );
    case ActiveSection.Events:
      return <EventsView />;
    case ActiveSection.AdminPanel:
      if (currentUser?.isAdmin) {
        return <MemoizedAdminPlaceholder />;
      }
      return (
        <div className="p-4 md:p-6"> 
            <SectionTitle title="ACCESS DENIED" subtitle="Unauthorized Access Attempt Detected." />
            <MemoizedGlassCard>
                <p className="text-red-400 text-lg font-semibold">You do not have the required clearance to access the Admin Panel.</p>
                <p className="text-[#E0E7FF]/70 mt-2">This section is restricted to authorized ClashMind administrators only. If you believe this is an error, please contact support.</p>
            </MemoizedGlassCard>
        </div>
      );
    default:
      return <CortexArenaView 
                games={games} 
                onPlayGame={onPlayGame} 
                onQuickMatch={onQuickMatch} 
                globalChatMessages={globalChatMessages}
                currentUser={currentUser}
                onSendMessage={onSendMessage}
             />;
  }
});

export default MainContentArea;