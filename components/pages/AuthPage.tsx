

import React, { useState, useCallback, CSSProperties } from 'react';
import Button from '../ui/Button';
import { UserProfile, AuthFormErrors } from '../../types';
import { PLACEHOLDER_USERS } from '../../constants'; 
import OfficialClashMindLogo from '../ui/OfficialClashMindLogo'; 

interface AuthPageProps {
  onLoginSuccess: (userData: UserProfile) => void;
  onNavigateToLanding: () => void;
}

const MemoizedButton = React.memo(Button);
const MemoizedOfficialClashMindLogo = React.memo(OfficialClashMindLogo);

const AuthPage: React.FC<AuthPageProps> = React.memo(({ onLoginSuccess, onNavigateToLanding }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    ageConfirmation: false,
  });
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name as keyof AuthFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors: AuthFormErrors = {};
    if (!isLogin && !formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"; // Increased length
    if (!isLogin && formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!isLogin && !formData.ageConfirmation) newErrors.ageConfirmation = "You must confirm your age and agreement.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, isLogin]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => { // Made async for potential await
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    setIsLoading(false);
    if (isLogin) {
      const existingUser = PLACEHOLDER_USERS.find(u => u.username.toLowerCase() === (formData.email.split('@')[0].toLowerCase() || "LogicWeaver") );
      onLoginSuccess(existingUser || { ...PLACEHOLDER_USERS[0], ageVerified: true, initialGamblingWarningAcknowledged: true });
    } else {
      const newUser: UserProfile = {
        id: String(Date.now()),
        username: formData.username,
        avatarUrl: `https://ui-avatars.com/api/?name=${formData.username.replace(/\s/g, '+')}&background=0A0D14&color=00E0FF&bold=true`,
        isOnline: true,
        sparks: 100, 
        neurons: 500, 
        ageVerified: true,
        initialGamblingWarningAcknowledged: true,
      };
      onLoginSuccess(newUser); 
    }
  }, [validateForm, isLogin, formData, onLoginSuccess]);

  const inputBaseClass = "w-full px-4 py-3.5 bg-[#0A0D14]/70 border-2 border-[#A100FF]/60 rounded-xl text-[#E0E7FF] placeholder-[#E0E7FF]/50 focus:outline-none transition-all duration-200 ease-in-out";
  const inputFocusClass = "focus:ring-2 focus:ring-[#FF00C8] focus:border-[#FF00C8]/70 focus:bg-[#0A0D14]/80";
  const inputErrorClass = "border-red-500/70 focus:ring-red-500/50";
  const errorTextClass = "text-sm text-red-400 mt-1.5"; 

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-transparent p-4 overflow-y-auto">
      <div className="flex flex-col md:flex-row w-full max-w-4xl min-h-[75vh] md:min-h-[auto] rounded-3xl shadow-2xl shadow-[#A100FF]/50 overflow-hidden border-2 border-[#A100FF]/30"> {/* Added main border */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 md:p-12 cortex-arena-bg relative overflow-hidden">
           <div className="absolute inset-0 bg-black/70 backdrop-blur-xl z-0"></div>
           <div className="relative z-10 text-center">
            <MemoizedOfficialClashMindLogo size="medium" className="mb-6 drop-shadow-[0_3px_12px_rgba(0,224,255,0.4)]" />
            <p className="mt-4 text-xl text-[#E0E7FF]/90 leading-relaxed">
              Where minds collide. Wager and win on the digital grid.
            </p>
            <p className="mt-3 text-sm text-[#E0E7FF]/70">
              18+ Only. Play Responsibly. Your Intellect is Your Asset.
            </p>
          </div>
        </div>

        <div 
            className="w-full md:w-1/2 bg-gradient-to-br from-[#181C27] to-[#10051C] p-6 md:p-10 flex flex-col justify-center glow-border-gold-global" 
            style={{borderImageSource: 'linear-gradient(to bottom, #00E0FF, #A100FF, #FF00C8)'}} // Maintained existing border image
        >
          <div className="w-full max-w-md mx-auto">
            <div className="md:hidden mb-8 text-center"> 
              <MemoizedOfficialClashMindLogo size="medium" className="drop-shadow-[0_3px_12px_rgba(0,224,255,0.4)]" />
            </div>
            <div className="flex mb-8 border-b-2 border-[#A100FF]/40">
              <button 
                onClick={() => { setIsLogin(true); setErrors({}); }}
                className={`flex-1 py-3.5 text-lg font-orbitron transition-all duration-200 ease-in-out relative
                            ${isLogin ? 'text-[#00E0FF] font-semibold' : 'text-[#E0E7FF]/70 hover:text-[#00E0FF]'}`}
              >
                Sign In
                {isLogin && <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00E0FF] to-[#A100FF] rounded-t-sm"></span>}
              </button>
              <button 
                onClick={() => { setIsLogin(false); setErrors({}); }}
                className={`flex-1 py-3.5 text-lg font-orbitron transition-all duration-200 ease-in-out relative
                            ${!isLogin ? 'text-[#00E0FF] font-semibold' : 'text-[#E0E7FF]/70 hover:text-[#00E0FF]'}`}
              >
                Sign Up
                 {!isLogin && <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00E0FF] to-[#A100FF] rounded-t-sm"></span>}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-[#E0E7FF]/90 mb-1.5">Username</label>
                  <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className={`${inputBaseClass} ${errors.username ? inputErrorClass : inputFocusClass}`} placeholder="Enter your username" />
                  {errors.username && <p className={errorTextClass}>{errors.username}</p>}
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#E0E7FF]/90 mb-1.5">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={`${inputBaseClass} ${errors.email ? inputErrorClass : inputFocusClass}`} placeholder="Enter your email" />
                {errors.email && <p className={errorTextClass}>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#E0E7FF]/90 mb-1.5">Password</label>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className={`${inputBaseClass} ${errors.password ? inputErrorClass : inputFocusClass}`} placeholder="Enter your password" />
                {errors.password && <p className={errorTextClass}>{errors.password}</p>}
              </div>
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#E0E7FF]/90 mb-1.5">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={`${inputBaseClass} ${errors.confirmPassword ? inputErrorClass : inputFocusClass}`} placeholder="Confirm your password" />
                    {errors.confirmPassword && <p className={errorTextClass}>{errors.confirmPassword}</p>}
                  </div>
                  <div className="mt-5">
                    <label htmlFor="ageConfirmation" className="flex items-start text-sm text-[#E0E7FF]/80">
                      <input 
                        type="checkbox" 
                        name="ageConfirmation" 
                        id="ageConfirmation" 
                        checked={formData.ageConfirmation} 
                        onChange={handleChange} 
                        className="h-5 w-5 rounded border-gray-400 text-[#FF00C8] bg-gray-700 focus:ring-[#FF00C8]/60 mr-2.5 mt-0.5 shrink-0 appearance-none checked:bg-[#FF00C8] checked:border-transparent relative"
                      />
                      <span className="leading-tight">
                        I confirm I am 18 years of age or older (or legal age of majority in my jurisdiction) and I have read and agree to the 
                        <a href="/project-info#terms-real-money" target="_blank" rel="noopener noreferrer" className="text-[#00E0FF] hover:underline"> Terms & Conditions</a> and 
                        <a href="/project-info#responsible-gaming" target="_blank" rel="noopener noreferrer" className="text-[#00E0FF] hover:underline"> Responsible Gaming Policy</a>.
                      </span>
                    </label>
                    {errors.ageConfirmation && <p className={errorTextClass}>{errors.ageConfirmation}</p>}
                  </div>
                </>
              )}
              
              {errors.general && <p className={`${errorTextClass} text-center font-semibold`}>{errors.general}</p>}

              <MemoizedButton type="submit" variant="primary" size="large" className="w-full mt-6 !text-base" isLoading={isLoading}>
                {isLoading ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? 'Sign In' : 'Create Account')}
              </MemoizedButton>
            </form>
            
            <p className="mt-8 text-center text-sm text-[#E0E7FF]/70">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={() => { setIsLogin(!isLogin); setErrors({}); }} className="font-semibold text-[#00E0FF] hover:underline ml-1.5 focus:outline-none focus:ring-1 focus:ring-[#00E0FF] rounded-sm p-0.5">
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
             <p className="mt-5 text-center text-sm">
                <button onClick={onNavigateToLanding} className="text-[#E0E7FF]/60 hover:text-[#00E0FF] hover:underline focus:outline-none focus:ring-1 focus:ring-[#00E0FF] rounded-sm p-0.5">
                    &larr; Back to Landing Page
                </button>
            </p>
          </div>
        </div>
      </div>
       <style>{`
          input[type="checkbox"]:checked::before {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 0.9rem;
            color: #10051C; /* Dark color for checkmark */
            font-weight: bold;
          }
      `}</style>
    </div>
  );
});

export default AuthPage;