import React, { useEffect, useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, fullName: string) => Promise<void>;
}
//

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSignIn, onSignUp }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  /** True when opened from the profile-purchase buy path (Quiz sets pendingProfilePurchase). */
  const [forToolsAccess, setForToolsAccess] = useState(false);

  /** Prefill from quiz email-capture (`pendingFirstName` / `pendingEmail`). */
  const applyQuizPrefill = () => {
    const first = localStorage.getItem('pendingFirstName')?.trim() || '';
    const last = localStorage.getItem('pendingLastName')?.trim() || '';
    const pendingEmail = localStorage.getItem('pendingEmail')?.trim() || '';
    const name = [first, last].filter(Boolean).join(' ');
    if (name) setFullName(name);
    if (pendingEmail) setEmail(pendingEmail);
  };

  useEffect(() => {
    if (!isOpen) return;
    const purchaseIntent = localStorage.getItem('pendingProfilePurchase') === 'true';
    setForToolsAccess(purchaseIntent);
    if (purchaseIntent) setMode('signup');
    applyQuizPrefill();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === 'signin') {
        await onSignIn(email, password);
        // Wait a bit for session to be fully established before closing
        await new Promise(resolve => setTimeout(resolve, 500));
        onClose();
      } else {
        await onSignUp(email, password, fullName);
        // If the project's "Confirm email" setting is on, onSignUp won't have a
        // session yet (see AuthContext.signUp) and already toasted what to do
        // next — just close the modal either way.
        await new Promise(resolve => setTimeout(resolve, 500));
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    setPassword('');
    setError(null);
    setSuccess(null);
    // Keep quiz-collected name/email; re-apply in case fields were cleared.
    applyQuizPrefill();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-serif text-white mb-2">
            {mode === 'signin'
              ? 'Welcome'
              : forToolsAccess
                ? 'Create Your Account'
                : 'Create Account'}
          </h2>
          <p className="text-gray-300 text-sm">
            {mode === 'signin'
              ? 'to your elemental nature'
              : forToolsAccess
                ? 'Everything in one place. Your quiz results. Your purchases.'
                : 'Join to save your elemental type and preferences'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm">
              {success}
            </div>
          )}

          {mode === 'signup' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50"
                />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={loading}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                minLength={6}
                disabled={loading}
                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              mode === 'signin' ? 'Sign In' : forToolsAccess ? 'Set Up Account' : 'Create Account'
            )}
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
              <button
                type="button"
                onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                disabled={loading}
                className="ml-2 text-gray-900 font-medium hover:underline disabled:opacity-50"
              >
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;