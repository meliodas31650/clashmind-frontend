
import React from 'react';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import { UserProfile } from '../../types';
import { SparkIcon, WalletIcon } from '../../constants';
import useTranslation from '../../hooks/useTranslation';

interface WalletPageProps {
  currentUser: UserProfile | null;
}

const MemoizedGlassCard = React.memo(GlassCard);
const MemoizedButton = React.memo(Button);

const WalletPage: React.FC<WalletPageProps> = React.memo(({ currentUser }) => {
  const { t } = useTranslation();
  const currentSparks = currentUser?.sparks || 0;

  const handleDeposit = () => alert(t('walletPage.depositAlert', { defaultValue: 'Deposit functionality (not implemented). This would integrate with a payment gateway.'}));
  const handleWithdraw = () => alert(t('walletPage.withdrawAlert', { defaultValue: 'Withdraw functionality (not implemented). Requires KYC and backend processing.'}));
  const handleTransactionHistory = () => alert(t('walletPage.historyAlert', { defaultValue: 'Transaction History (not implemented).'}));
  const handleSetLimits = () => alert(t('walletPage.limitsAlert', { defaultValue: 'Set Gambling Limits (not implemented). Access responsible gaming tools.'}));

  return (
    <div className="p-4 md:p-6 h-full flex flex-col bg-transparent text-[#F4F4F4]">
      <div className="flex items-center mb-6 md:mb-8">
        <WalletIcon className="w-10 h-10 md:w-12 md:h-12 text-[#FFD700] mr-3 md:mr-4" style={{filter: 'drop-shadow(0 0 5px rgba(255,215,0,0.5))'}} />
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-[#FFD700]" style={{textShadow: '0 0 6px rgba(255,215,0,0.7), 0 0 10px rgba(255,215,0,0.4)'}}>
          {t('walletPage.title', { defaultValue: 'My Wallet' })}
        </h2>
      </div>

      {currentUser?.isGuest ? (
        <MemoizedGlassCard className="text-center">
          <p className="text-xl text-yellow-400 mb-3">{t('walletPage.guestModeTitle', { defaultValue: 'Guest Mode Active' })}</p>
          <p className="text-[#F4F4F4]/80">{t('walletPage.guestModeMessage', { defaultValue: 'Wallet features are disabled for guest accounts. Please sign up or log in to manage your Sparks.'})}</p>
        </MemoizedGlassCard>
      ) : (
        <>
          <MemoizedGlassCard className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <p className="text-sm text-[#F4F4F4]/70">{t('walletPage.currentBalance', { defaultValue: 'Current Sparks Balance' })}</p>
                <p className="text-4xl md:text-5xl font-orbitron text-[#FFD700] flex items-center">
                  {currentSparks.toLocaleString()} <SparkIcon className="w-8 h-8 md:w-9 md:h-9 ml-2 text-[#FFD700]" />
                </p>
              </div>
              <div className={`text-sm py-1 px-3 rounded-full ${currentUser?.ageVerified ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                {currentUser?.ageVerified ? t('walletPage.ageVerified', { defaultValue: 'Age Verified' }) : t('walletPage.ageNotVerified', { defaultValue: 'Age Not Verified' })}
              </div>
            </div>
             {!currentUser?.ageVerified && (
                <p className="text-xs text-yellow-400 mt-3">{t('walletPage.verifyAgePrompt', { defaultValue: 'Please verify your age in Account Settings to enable all wallet features.'})}</p>
             )}
          </MemoizedGlassCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <MemoizedButton 
              onClick={handleDeposit} 
              variant="primary" 
              size="large" 
              className="w-full text-base md:text-lg"
              disabled={!currentUser?.ageVerified}
              title={!currentUser?.ageVerified ? t('walletPage.verifyToDepositTitle', {defaultValue: 'Verify age to deposit'}) : undefined}
            >
              {t('walletPage.depositSparks', { defaultValue: 'Deposit Sparks' })}
            </MemoizedButton>
            <MemoizedButton 
              onClick={handleWithdraw} 
              variant="secondary" 
              size="large" 
              className="w-full text-base md:text-lg"
              disabled={!currentUser?.ageVerified}
              title={!currentUser?.ageVerified ? t('walletPage.verifyToWithdrawTitle', {defaultValue: 'Verify age to withdraw'}) : undefined}
            >
              {t('walletPage.withdrawSparks', { defaultValue: 'Withdraw Sparks' })}
            </MemoizedButton>
            <MemoizedButton onClick={handleTransactionHistory} variant="ghost" size="medium" className="sm:col-span-1 w-full text-sm md:text-base">
              {t('walletPage.transactionHistory', { defaultValue: 'Transaction History' })}
            </MemoizedButton>
             <MemoizedButton onClick={handleSetLimits} variant="ghost" size="medium" className="sm:col-span-1 w-full !border-yellow-500/70 hover:!border-yellow-400 !text-yellow-400 text-sm md:text-base">
              {t('walletPage.setGamingLimits', { defaultValue: 'Set Gaming Limits' })}
            </MemoizedButton>
          </div>

          <MemoizedGlassCard className="mt-6 md:mt-8 text-sm text-[#F4F4F4]/80">
            <h4 className="text-md font-semibold text-[#FFD700] mb-2" style={{textShadow: '0 0 4px rgba(255,215,0,0.5)'}}>{t('walletPage.importantNotesTitle', { defaultValue: 'Important Notes:' })}</h4>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>{t('walletPage.note1', { defaultValue: 'All transactions are securely processed. Processing times may vary.'})}</li>
              <li>{t('walletPage.note2', { defaultValue: 'Withdrawals may require identity verification (KYC) for security and regulatory compliance.'})}</li>
              <li>{t('walletPage.note3', { defaultValue: 'Please ensure your payment information is up to date.'})}</li>
              <li>{t('walletPage.note4', {defaultValue: 'Play Responsibly. Set limits to manage your gaming activity.'})}</li>
            </ul>
          </MemoizedGlassCard>
        </>
      )}
       <div className="mt-auto pt-8 text-center text-xs text-[#F4F4F4]/60">
        <p>{t('walletPage.footerInfo', { defaultValue: 'ClashMind Wallet Protocol. Secure & Transparent.'})}</p>
        <p>{t('walletPage.footerWarning', { defaultValue: '18+ Only. Real money gaming involves risk. Terms apply.'})}</p>
      </div>
    </div>
  );
});

export default WalletPage;
