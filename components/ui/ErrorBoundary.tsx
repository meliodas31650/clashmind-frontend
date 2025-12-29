
import React, { Component, ErrorInfo, ReactNode } from 'react';
import Button from './Button'; // Assuming Button is in the same directory or adjust path

/**
 * @interface ErrorBoundaryProps
 * @description Defines the expected props for ErrorBoundary. 
 * Fix: Made children optional to satisfy some TS environments that don't implicitly pass JSX children to props.
 * @property {ReactNode} [children] - The child components that this boundary will wrap.
 */
interface ErrorBoundaryProps {
  children?: ReactNode;
}

/**
 * @interface ErrorBoundaryState
 * @property {boolean} hasError - Indicates if an error has been caught.
 * @property {string} errorMessage - The error message to display.
 */
interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

/**
 * ErrorBoundary component.
 * Catches JavaScript errors in its child component tree, logs them, and displays a fallback UI.
 * Fix: Explicitly extending React.Component and using property initializer for state to ensure 'this.state' and 'this.props' are correctly typed.
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false, errorMessage: '' };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  /**
   * Updates state so the next render will show the fallback UI.
   * @param {Error} error - The error that was thrown.
   * @returns {ErrorBoundaryState} The new state.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  /**
   * Logs the error to an error reporting service (or console).
   * @param {Error} error - The error that was caught.
   * @param {ErrorInfo} errorInfo - An object with a componentStack key containing information about which component threw the error.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In a real app, you would log this to an error reporting service like Sentry, LogRocket, etc.
    console.error("ClashMind ErrorBoundary caught an error:", error, errorInfo);
    // You could also use a more sophisticated way to get translated error messages if needed here
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI - basic styling, can be enhanced
      // Attempt to use localStorage for language preference if context isn't available
      const lang = typeof window !== 'undefined' ? localStorage.getItem('clashMindLang') || 'en' : 'en';
      const title = lang === 'fr' ? "Erreur Inattendue du Protocole" : "Unexpected Protocol Error";
      const message1 = lang === 'fr' ? "Quelque chose s'est mal passé sur le Grid. Nos techniciens sont alertés." : "Something went wrong on the Grid. Our technicians have been alerted.";
      const message2 = lang === 'fr' ? "Veuillez essayer de rafraîchir la page ou de revenir plus tard." : "Please try refreshing the page or come back later.";
      const buttonText = lang === 'fr' ? "Rafraîchir le Grid" : "Refresh the Grid";
      const errorDetailsLabel = lang === 'fr' ? "Détails de l'erreur (pour le support) :" : "Error Details (for support):";


      return (
        <div className="fixed inset-0 bg-gradient-to-br from-[#0B0F1A] to-[#2D0F3E] text-[#F4F4F4] flex items-center justify-center p-4 z-[10000]">
          <div className="bg-[#1F1F2B]/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border-2 border-[#FF00C8] max-w-lg w-full text-center">
            <h1 className="text-3xl font-orbitron font-bold text-[#FF00C8] mb-4" style={{textShadow: '0 0 5px #FF00C8'}}>{title}</h1>
            <p className="text-lg text-[#F4F4F4]/90 mb-3">{message1}</p>
            <p className="text-md text-[#F4F4F4]/80 mb-6">{message2}</p>
            {this.state.errorMessage && (
                <div className="my-4 p-3 bg-[#0B0F1A]/70 border border-[#A100FF]/50 rounded-lg text-left text-xs">
                    <p className="font-semibold text-[#A100FF]">{errorDetailsLabel}</p>
                    <pre className="whitespace-pre-wrap break-all">{this.state.errorMessage}</pre>
                </div>
            )}
            <Button onClick={this.handleReload} variant="primary" size="large">
              {buttonText}
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
