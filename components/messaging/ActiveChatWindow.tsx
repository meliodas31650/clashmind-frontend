
import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, ChatMessage, ActiveConversationType, GameInfo, PrivateChatSession, GroupChatSession, UserInteractionOptions } from '../../types';
import Button from '../ui/Button';
import { SendIcon, ChallengeIcon, BlockIcon, DefaultUserIcon, MoreVerticalIcon, ChatIcon } from '../../constants';
import useTranslation from '../../hooks/useTranslation';

interface ActiveChatWindowProps {
  currentUser: UserProfile | null;
  conversationId: string | null;
  conversationType: ActiveConversationType | null;
  conversationDetails: PrivateChatSession | GroupChatSession | { userName: string, avatarUrl?: string, messages: ChatMessage[], userId?: string, groupId?: string } | null;
  onSendMessage: (conversationId: string, conversationType: ActiveConversationType, text: string) => void;
  onChallengeUser?: (opponentId: string, gameId: string, gameName: string) => void;
  availableGames?: GameInfo[];
  onBlockUser?: (userId: string) => void; 
  blockedUserIds?: string[]; 
}

const MemoizedButton = React.memo(Button);

const formatDate = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ActiveChatWindow: React.FC<ActiveChatWindowProps> = ({
  currentUser,
  conversationId,
  conversationType,
  conversationDetails,
  onSendMessage,
  onChallengeUser,
  availableGames = [],
  onBlockUser,
  blockedUserIds = [],
}) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showGameSelection, setShowGameSelection] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [conversationDetails?.messages]);

  useEffect(() => { 
    setMessage('');
    setShowGameSelection(false);
    setShowContextMenu(false);
  }, [conversationId, conversationType]);

  // Close context menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setShowContextMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [contextMenuRef]);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && conversationId && conversationType && currentUser) {
      onSendMessage(conversationId, conversationType, message.trim());
      setMessage('');
    }
  };

  const opponentId = (conversationType === 'private' && conversationDetails && 'userId' in conversationDetails) ? conversationDetails.userId : null;
  const isOpponentBlocked = opponentId ? blockedUserIds.includes(opponentId) : false;

  const handleContextMenuAction = (action: UserInteractionOptions) => {
    setShowContextMenu(false);
    if (action === UserInteractionOptions.Challenge && opponentId && onChallengeUser) {
      setShowGameSelection(true);
    } else if (action === UserInteractionOptions.BlockUser && opponentId && onBlockUser) {
      onBlockUser(opponentId);
    }
  };
  
  const getAvatar = (msg?: ChatMessage, details?: typeof conversationDetails) => {
      if (msg?.userId === currentUser?.id) return currentUser?.avatarUrl;
      if (msg) return msg.avatarUrl;
      if (details && 'avatarUrl' in details) return details.avatarUrl;
      return undefined;
  };
  
  const defaultAvatar = (name?: string) => {
    if(!name) return undefined;
    const initial = name.substring(0, conversationType === 'group' ? 2 : 1);
    return `https://ui-avatars.com/api/?name=${initial.replace(/\s/g, '+')}&background=10051C&color=FFD700&bold=true&font-size=0.5&size=128`;
  };


  if (!conversationId || !conversationType || !conversationDetails || !currentUser) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-[#0A0D14] to-[#10051C] p-6 text-center">
        <ChatIcon className="w-32 h-32 text-[#A100FF]/25 mb-8 animate-pulse" style={{filter: 'drop-shadow(0 0 20px rgba(161,0,255,0.3))'}} />
        <p className="text-xl md:text-2xl text-[#E0E7FF]/80 font-orbitron tracking-wider">{t('messagingHub.selectConversation')}</p>
        <p className="text-base md:text-lg text-[#E0E7FF]/60 mt-2">{t('messagingHub.selectConversationPrompt')}</p>
      </div>
    );
  }
  
  let conversationName = "Chat";
  if (conversationDetails) {
    if ('userName' in conversationDetails && conversationDetails.userName) {
      conversationName = conversationDetails.userName;
    } else if ('groupName' in conversationDetails && (conversationDetails as GroupChatSession).groupName) {
      conversationName = (conversationDetails as GroupChatSession).groupName;
    } else if (conversationId === 'global') {
      conversationName = t('messagingHub.globalChat');
    }
  }
  const conversationAvatar = getAvatar(undefined, conversationDetails) || defaultAvatar(conversationName);

  return (
    <div className="flex-grow flex flex-col bg-gradient-to-br from-[#0A0D14] to-[#10051C] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b-2 border-[#A100FF]/40 bg-gradient-to-r from-[#10051C]/90 to-[#181C27]/90 backdrop-blur-md shadow-lg shrink-0 min-h-[72px]">
        <div className="flex items-center">
          <img src={conversationAvatar} alt={conversationName} className="w-11 h-11 rounded-full mr-3.5 border-2 border-[#A100FF]/50 shadow-sm" />
          <div>
            <h3 className="text-lg md:text-xl font-orbitron font-semibold text-[#FFD700] tracking-wide" style={{textShadow: '0 0 4px rgba(255,215,0,0.6)'}}>{conversationName}</h3>
            {conversationType === 'private' && (conversationDetails as PrivateChatSession).isOnline && (
              <div className="flex items-center mt-0.5">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full mr-1.5 ring-1 ring-green-300/70"></span>
                <span className="text-xs text-green-300/90">Online</span>
              </div>
            )}
          </div>
        </div>
        {conversationType === 'private' && opponentId && (
          <div className="relative" ref={contextMenuRef}>
            <MemoizedButton onClick={() => setShowContextMenu(prev => !prev)} variant="ghost" size="small" className="!p-2.5 !border-transparent hover:!bg-[#A100FF]/20" title={t('messagingHub.userOptions')}>
              <MoreVerticalIcon className="w-6 h-6 text-[#00E0FF]/90 hover:text-[#00E0FF]" />
            </MemoizedButton>
            {showContextMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-[#10051C] to-[#181C27] border-2 border-[#A100FF]/60 rounded-xl shadow-2xl z-50 py-1.5 animate-fadeIn">
                {onChallengeUser && (
                    <button onClick={() => handleContextMenuAction(UserInteractionOptions.Challenge)} className="w-full text-left px-4 py-2.5 text-sm text-[#E0E7FF]/90 hover:bg-[#6A00FF]/40 hover:text-[#00E0FF] transition-colors flex items-center rounded-md">
                        <ChallengeIcon className="w-4.5 h-4.5 mr-3 text-[#FFD700]" /> {t('chat.challengeUserShort', { username: conversationName })}
                    </button>
                )}
                {onBlockUser && !isOpponentBlocked && (
                     <button onClick={() => handleContextMenuAction(UserInteractionOptions.BlockUser)} className="w-full text-left px-4 py-2.5 text-sm text-red-300 hover:bg-red-700/40 hover:text-red-200 transition-colors flex items-center rounded-md">
                        <BlockIcon className="w-4.5 h-4.5 mr-3" /> {t('messagingHub.blockUserShort', { username: conversationName })}
                    </button>
                )}
                 {onBlockUser && isOpponentBlocked && ( 
                     <button onClick={() => { /* onUnblockUser(opponentId) */ alert(t('messagingHub.unblockNotImplemented')); setShowContextMenu(false); }} className="w-full text-left px-4 py-2.5 text-sm text-green-300 hover:bg-green-700/40 hover:text-green-200 transition-colors flex items-center rounded-md">
                        <BlockIcon className="w-4.5 h-4.5 mr-3 transform rotate-45" /> {t('messagingHub.unblockUserShort', { username: conversationName })}
                    </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 md:p-5 space-y-4">
        {conversationDetails.messages.map((msg) => {
          const isOwn = msg.userId === currentUser.id;
          const msgAvatar = getAvatar(msg) || defaultAvatar(msg.username);

          if (msg.isSystem) {
            return (
              <div key={msg.id} className="text-center my-3">
                <span className="text-xs text-purple-300/95 italic bg-purple-900/60 px-3.5 py-1.5 rounded-lg shadow-sm">
                  {msg.text} ({formatDate(msg.timestamp)})
                </span>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex items-end gap-3 group ${isOwn ? 'justify-end' : 'justify-start'}`}>
              {!isOwn && (
                msgAvatar ? 
                <img src={msgAvatar} alt={msg.username} className="w-9 h-9 rounded-full self-start flex-shrink-0 border-2 border-[#A100FF]/50 shadow-sm" />
                : <DefaultUserIcon className="w-9 h-9 rounded-full self-start flex-shrink-0 border-2 border-[#A100FF]/50 text-gray-400 bg-gray-700/70 p-1 shadow-sm" />
              )}
              <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                {!isOwn && <span className="text-xs mb-1 ml-1 font-semibold text-[#00E0FF] tracking-wide">{msg.username}</span>}
                <div className={`max-w-[85%] md:max-w-[90%] p-3.5 rounded-2xl shadow-lg transition-shadow hover:shadow-xl
                    ${isOwn 
                      ? 'bg-gradient-to-br from-[#FF00C8]/80 to-[#A100FF]/70 text-[#F0F3FF] rounded-br-lg' 
                      : 'bg-gradient-to-br from-[#6A00FF]/90 to-[#A100FF]/80 text-[#E0E7FF] rounded-bl-lg'
                    }`}>
                  <p className="text-base break-words whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  <span className={`text-xs text-[#E0E7FF]/70 block mt-2 ${isOwn ? 'text-right' : 'text-left'}`}>{formatDate(msg.timestamp)}</span>
                </div>
              </div>
              {isOwn && (
                currentUser.avatarUrl ?
                <img src={currentUser.avatarUrl} alt={currentUser.username} className="w-9 h-9 rounded-full self-start flex-shrink-0 border-2 border-[#FF00C8]/60 shadow-sm" />
                : <DefaultUserIcon className="w-9 h-9 rounded-full self-start flex-shrink-0 border-2 border-[#FF00C8]/60 text-gray-300 bg-gray-600/70 p-1 shadow-sm" />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 border-t-2 border-[#A100FF]/40 flex gap-3 items-center bg-gradient-to-r from-[#10051C]/95 to-[#181C27]/95 backdrop-blur-md shrink-0">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isOpponentBlocked && conversationType === 'private' ? t('messagingHub.userBlockedInputDisabled') : t('chat.typeMessagePlaceholder')}
          aria-label={t('chat.messageInputLabel')}
          className="flex-grow bg-[#0A0D14]/80 border-2 border-[#6A00FF]/70 text-[#E0E7FF] placeholder-[#E0E7FF]/60 px-4 py-3.5 rounded-xl 
                     focus:ring-2 focus:ring-[#FF00C8] focus:border-transparent outline-none transition-all duration-200 text-base shadow-inner shadow-black/30"
          disabled={isOpponentBlocked && conversationType === 'private'}
        />
        <MemoizedButton type="submit" variant="primary" size="large" className="!p-3.5" disabled={isOpponentBlocked && conversationType === 'private' || !message.trim()}>
          <SendIcon className="w-6 h-6" />
        </MemoizedButton>
      </form>

      {showGameSelection && opponentId && onChallengeUser && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 z-[60]">
          <div className="bg-gradient-to-br from-[#10051C] to-[#181C27] p-6 rounded-2xl border-2 border-[#FFD700]/80 shadow-2xl max-w-md w-full">
            <h4 className="text-xl font-orbitron font-semibold text-yellow-300 mb-6 text-center tracking-wide">{t('chat.selectGameForDuel')}</h4>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2 -mr-2">
              {availableGames.map(game => (
                <MemoizedButton 
                  key={game.id} 
                  onClick={() => { onChallengeUser(opponentId, game.id, game.title); setShowGameSelection(false);}}
                  variant="ghost"
                  className="w-full justify-start text-left !border-purple-600/70 hover:!border-yellow-300 hover:!bg-purple-700/50 py-3 px-4 text-base"
                >
                  {game.title} <span className="text-sm ml-auto text-yellow-300/95">({game.starsToWin} {t('currency.sparks')})</span>
                </MemoizedButton>
              ))}
            </div>
            <MemoizedButton onClick={() => setShowGameSelection(false)} variant="danger" size="medium" className="w-full mt-6">
              {t('common.cancel')}
            </MemoizedButton>
          </div>
        </div>
      )}
       <style>{`
         @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.15s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ActiveChatWindow;
