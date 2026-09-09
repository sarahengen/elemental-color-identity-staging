import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { runQueryWithTimeout } from '@/lib/supabaseQuery';
import { hasWorkshopAccess } from '@/lib/workshopAccess';
import { User, Session } from '@supabase/supabase-js';
import { toast } from '@/components/ui/use-toast';

const PROFILE_QUERY_TIMEOUT_MS = 12000;
const SUBSCRIPTION_QUERY_TIMEOUT_MS = 12000;

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  elemental_type: string | null;
  elemental_subtype: string | null;
  membership_tier: string;
  subtype_profile_unlocked?: boolean | null;
  subtype_profile_purchased_at?: string | null;
  workshop_unlocked?: boolean | null;
  workshop_purchased_at?: string | null;
  quiz_completed_at: string | null;
  subtype_completed_at: string | null;
  wardrobe_analyzer_uses: number;
  saved_hair_colors: any[] | null;
  saved_palette_colors?: any[] | null;
  created_at: string;
  updated_at: string;
}

interface Subscription {
  id: string;
  status: string;
  plan_id: string;
  billing_cycle: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  subscription: Subscription | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
  saveElementalType: (elementalType: string, subtype?: string, quizMode?: 'full' | 'subtype') => Promise<void>;
  incrementWardrobeAnalyzerUse: () => Promise<void>;
  canUseWardrobeAnalyzer: () => boolean;
  getRemainingWardrobeUses: () => number;
  isPremiumMember: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);
  const profileFetchInFlight = useRef<Promise<void> | null>(null);
  const subscriptionFetchInFlight = useRef<Promise<void> | null>(null);

  // Helper: forcefully clear a stale/invalid session from storage and reset state
  const clearStaleSession = async (reason: string) => {
    console.warn(`🧹 AuthContext: Clearing stale session — reason: ${reason}`);
    
    // Reset all auth state
    setUser(null);
    setProfile(null);
    setSubscription(null);
    
    // Remove the auth token from localStorage directly
    try {
      const storageKey = 'elemental-color-auth';
      localStorage.removeItem(storageKey);
      console.log('🧹 AuthContext: Removed auth token from localStorage');
    } catch (e) {
      console.error('🧹 AuthContext: Error removing from localStorage:', e);
    }
    
    // Also try supabase.auth.signOut to clean up any internal state
    // Use { scope: 'local' } to only clear local session without calling the server
    // (since the token is already invalid, a server call would fail)
    try {
      await supabase.auth.signOut({ scope: 'local' });
      console.log('🧹 AuthContext: Local sign-out completed');
    } catch (e) {
      // signOut itself might fail if session is already invalid — that's OK
      console.warn('🧹 AuthContext: signOut during cleanup failed (expected):', e);
    }
  };

  // Helper: check if an error is a stale/invalid session error
  const isSessionError = (error: any): boolean => {
    if (!error) return false;
    const msg = (error.message || error.msg || '').toLowerCase();
    return (
      msg.includes('refresh token') ||
      msg.includes('invalid token') ||
      msg.includes('token not found') ||
      msg.includes('session not found') ||
      msg.includes('jwt expired') ||
      msg.includes('invalid jwt') ||
      msg.includes('not authenticated') ||
      error.code === 'refresh_token_not_found' ||
      error.code === 'session_not_found' ||
      error.status === 401 ||
      error.status === 403
    );
  };


  // Fetch profile (uses 'id' as primary key matching auth.users.id)
  const fetchProfile = async (userId: string, retryCount = 0): Promise<void> => {
    if (profileFetchInFlight.current) {
      return profileFetchInFlight.current;
    }

    const run = async () => {
      try {
        const { data, error, timedOut } = await runQueryWithTimeout(
          'AuthContext profile',
          () =>
            supabase.from('user_profiles').select('*').eq('id', userId).maybeSingle(),
          PROFILE_QUERY_TIMEOUT_MS
        );

        if (timedOut) {
          console.warn(
            '⚠️ AuthContext: Profile fetch timed out — app continues without profile. Check VITE_SUPABASE_* on famous.ai and that user_profiles exists.'
          );
          return;
        }

        if (error) {
          console.error('❌ AuthContext: Error fetching profile:', error);
          return;
        }

      if (!data) {
        console.log('🔍 AuthContext: No profile found');
        
        // Profile doesn't exist yet - trigger might still be creating it
        if (retryCount < 2) {
          console.log(`⏳ AuthContext: Profile not found, retrying in 500ms... (attempt ${retryCount + 1}/3)`);
          await new Promise(resolve => setTimeout(resolve, 500));
          return fetchProfile(userId, retryCount + 1);
        }
        
        // After retries, try to create it manually
        console.warn('⚠️ AuthContext: Profile not found after retries, attempting manual creation...');
        
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        
        if (!currentUser) {
          console.error('❌ AuthContext: No user found when trying to create profile');
          return;
        }

        console.log('🔍 AuthContext: Attempting to insert profile...');
        const { data: newProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert({
            id: userId,
            email: currentUser.email || null,
            full_name: currentUser.user_metadata?.full_name || null,
            membership_tier: 'free',
            wardrobe_analyzer_uses: 0,
          })
          .select()
          .maybeSingle();

        console.log('🔍 AuthContext: Insert result - newProfile:', newProfile, 'createError:', createError);

        if (createError) {
          console.error('❌ AuthContext: Error creating profile:', createError);
          console.error('💡 Make sure RLS policies allow INSERT for authenticated users');
          console.error('💡 Or set up the database trigger for automatic profile creation');
          return;
        }

        if (newProfile) {
          console.log('✅ AuthContext: Profile created manually');
          setProfile(newProfile);
        }
        return;
      }

        setProfile(data);
      } catch (error) {
        console.error('❌ AuthContext: Unexpected error fetching profile:', error);
      }
    };

    profileFetchInFlight.current = run().finally(() => {
      profileFetchInFlight.current = null;
    });
    return profileFetchInFlight.current;
  };

  const fetchSubscription = async (userId: string): Promise<void> => {
    if (subscriptionFetchInFlight.current) {
      return subscriptionFetchInFlight.current;
    }

    const run = async () => {
      try {
        const { data, error, timedOut } = await runQueryWithTimeout(
          'AuthContext subscription',
          () =>
            supabase
              .from('user_subscriptions')
              .select('*')
              .eq('user_id', userId)
              .eq('status', 'active')
              .maybeSingle(),
          SUBSCRIPTION_QUERY_TIMEOUT_MS
        );

        if (timedOut) {
          console.warn(
            '⚠️ AuthContext: Subscription fetch timed out — treating as no active subscription.'
          );
          setSubscription(null);
          return;
        }

        if (error) {
          console.error('❌ AuthContext: Error fetching subscription:', error);
          setSubscription(null);
          return;
        }

        setSubscription(data ?? null);
      } catch (error) {
        console.error('❌ AuthContext: Unexpected error fetching subscription:', error);
        setSubscription(null);
      }
    };

    subscriptionFetchInFlight.current = run().finally(() => {
      subscriptionFetchInFlight.current = null;
    });
    return subscriptionFetchInFlight.current;
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const refreshSubscription = async () => {
    if (user) {
      await fetchSubscription(user.id);
    }
  };

  // Initialize auth state
  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    console.log('🔐 AuthContext: Initializing...');

    const initializeAuth = async () => {
      console.log('🔐 AuthContext: Checking for existing session...');
      
      try {
        // Set a timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          if (mounted && !initialCheckComplete) {
            console.warn('⚠️ AuthContext: Session check timed out after 10 seconds');
            setLoading(false);
            setInitialCheckComplete(true);
          }
        }, 8000);

        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ AuthContext: Error getting session:', error);
          
          // KEY FIX: If the error is a stale/invalid session error,
          // clear the corrupted session from storage so the app doesn't
          // keep retrying with bad tokens
          if (isSessionError(error)) {
            console.warn('🧹 AuthContext: Detected stale session during init, clearing...');
            await clearStaleSession('getSession returned auth error: ' + error.message);
          }
          
          if (mounted) {
            setLoading(false);
            setInitialCheckComplete(true);
          }
          return;
        }

        if (session?.user) {
          console.log('✅ AuthContext: Session found for user:', session.user.email);
          console.log('🔑 Session expires at:', new Date(session.expires_at! * 1000).toLocaleString());
          
          // ADDITIONAL CHECK: Verify the session is actually valid by calling getUser()
          // getSession() may return a cached session even if the refresh token is stale
          try {
            const { data: { user: verifiedUser }, error: userError } = await supabase.auth.getUser();
            
            if (userError || !verifiedUser) {
              console.warn('⚠️ AuthContext: Session exists but user verification failed:', userError?.message);
              // The session is stale — clear it
              await clearStaleSession('getUser verification failed: ' + (userError?.message || 'no user returned'));
              if (mounted) {
                setLoading(false);
                setInitialCheckComplete(true);
              }
              return;
            }
            
            console.log('✅ AuthContext: User verified successfully:', verifiedUser.email);
          } catch (verifyError: any) {
            console.warn('⚠️ AuthContext: User verification threw error:', verifyError?.message);
            await clearStaleSession('getUser threw error: ' + verifyError?.message);
            if (mounted) {
              setLoading(false);
              setInitialCheckComplete(true);
            }
            return;
          }
          
          if (mounted) {
            setUser(session.user);
            // Fetch profile and subscription in parallel
            await Promise.all([
              fetchProfile(session.user.id),
              fetchSubscription(session.user.id)
            ]);
          }
        } else {
          console.log('ℹ️ AuthContext: No active session found');
          
          // Even if getSession returns no error and no session,
          // there might be stale tokens in localStorage. Clean them up.
          try {
            const storageKey = 'elemental-color-auth';
            const storedData = localStorage.getItem(storageKey);
            if (storedData) {
              console.warn('🧹 AuthContext: Found orphaned auth data in localStorage, removing...');
              localStorage.removeItem(storageKey);
            }
          } catch (e) {
            // Ignore localStorage errors
          }
        }
      } catch (error: any) {
        console.error('❌ AuthContext: Error initializing auth:', error);
        
        // If the init itself throws (e.g., network error during token refresh),
        // check if it's a session-related error and clean up
        if (isSessionError(error)) {
          await clearStaleSession('initializeAuth threw session error: ' + error.message);
        }
      } finally {
        clearTimeout(timeoutId);
        if (mounted) {
          console.log('✅ AuthContext: Initialization complete');
          setLoading(false);
          setInitialCheckComplete(true);
        }
      }
    };


    initializeAuth();

    // Listen for auth state changes
    console.log('👂 AuthContext: Setting up auth state listener');
    
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`🔔 AuthContext: Auth event "${event}" received`);
        
        if (session?.user) {
          console.log('👤 User:', session.user.email);
          console.log('🔑 Session expires at:', new Date(session.expires_at! * 1000).toLocaleString());
        }

        if (!mounted) {
          console.log('⏭️ AuthContext: Component unmounted, ignoring event');
          return;
        }

        // Handle auth events
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('✅ AuthContext: User signed in');
          setUser(session.user);
          await Promise.all([
            fetchProfile(session.user.id),
            fetchSubscription(session.user.id)
          ]);
          setLoading(false);
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 AuthContext: User signed out');
          setUser(null);
          setProfile(null);
          setSubscription(null);
          setLoading(false);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          console.log('🔄 AuthContext: Token auto-refreshed');
          setUser(session.user);
          // Refresh profile/subscription on token refresh
          await Promise.all([
            fetchProfile(session.user.id),
            fetchSubscription(session.user.id)
          ]);
          // Make sure we're not stuck in loading state
          setLoading(false);
          setInitialCheckComplete(true);
        } else if (event === 'USER_UPDATED' && session?.user) {
          console.log('🔄 AuthContext: User data updated');
          setUser(session.user);
          await fetchProfile(session.user.id);
        }
      }
    );

    return () => {
      console.log('🧹 AuthContext: Cleaning up...');
      mounted = false;
      clearTimeout(timeoutId);
      authSubscription.unsubscribe();
      console.log('✅ AuthContext: Cleanup complete');
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting sign in for:', email);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user && data.session) {
        console.log('✅ Sign in successful');
        setUser(data.user);
        
        await Promise.all([
          fetchProfile(data.user.id),
          fetchSubscription(data.user.id)
        ]);
        
        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in.',
        });
      }
    } catch (error: any) {
      console.error('❌ Sign in error:', error);
      toast({
        title: 'Sign in failed',
        description: error.message || 'Please check your credentials and try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      console.log('📝 Attempting sign up for:', email);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        console.log('✅ Sign up successful');
        console.log('ℹ️ Profile will be created automatically by database trigger');
        
        // Supabase email confirmation is disabled, so signUp returns an active
        // session — sign the user in right away. (Mailchimp handles welcome/verification.)
        if (data.session) {
          setUser(data.user);
          // Wait a moment for trigger to create profile, then fetch
          await new Promise(resolve => setTimeout(resolve, 500));
          await fetchProfile(data.user.id);
        }

        // Send welcome email via Resend (fire and forget - don't block signup)
        try {
          console.log('📧 Sending welcome email to:', email);
          const { data: emailData, error: emailError } = await supabase.functions.invoke('send-welcome-email', {
            body: { email, fullName },
          });
          
          if (emailError) {
            console.error('⚠️ Welcome email failed (non-blocking):', emailError);
          } else {
            console.log('✅ Welcome email sent successfully:', emailData);
          }
        } catch (emailErr) {
          // Don't let email failure block the signup process
          console.error('⚠️ Welcome email error (non-blocking):', emailErr);
        }

        toast({
          title: 'Account created!',
          description: "Welcome to Elemental Color — you're all set.",
        });
      }
    } catch (error: any) {
      console.error('❌ Sign up error:', error);
      toast({
        title: 'Sign up failed',
        description: error.message || 'Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const signOut = async () => {
    try {
      console.log('👋 Attempting sign out');
      const { error } = await supabase.auth.signOut();
      
      // Even if signOut returns an error (e.g., session already invalid),
      // we still want to clear local state
      if (error) {
        console.warn('⚠️ Sign out had an error (clearing local state anyway):', error.message);
      }

      setUser(null);
      setProfile(null);
      setSubscription(null);
      
      // Also ensure localStorage is cleaned up
      try {
        localStorage.removeItem('elemental-color-auth');
      } catch (e) {
        // Ignore
      }

      console.log('✅ Sign out successful');
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      });
    } catch (error: any) {
      console.error('❌ Sign out error:', error);
      
      // CRITICAL: Even if signOut throws, force-clear local state
      // This prevents the user from being stuck in a broken auth state
      setUser(null);
      setProfile(null);
      setSubscription(null);
      try {
        localStorage.removeItem('elemental-color-auth');
      } catch (e) {
        // Ignore
      }
      
      toast({
        title: 'Signed out',
        description: 'You have been signed out (session was already expired).',
      });
    }
  };


  const saveElementalType = async (
    elementalType: string,
    subtype?: string,
    quizMode: 'full' | 'subtype' = 'full'
  ) => {
    if (!user) return;

    try {
      console.log('💾 Saving elemental type:', elementalType, subtype);
      
      const updates: any = {
        elemental_type: elementalType,
      };

      if (quizMode === 'full') {
        updates.quiz_completed_at = new Date().toISOString();
      }

      if (subtype) {
        updates.elemental_subtype = subtype;
        updates.subtype_completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      // Insert into quiz_history — ignore errors if table doesn't exist yet
      try {
        await supabase.from('quiz_history').insert({
          user_id: user.id,
          elemental_type: elementalType,
          elemental_subtype: subtype,
          quiz_mode: quizMode,
        });
      } catch (historyError) {
        console.warn('Could not save to quiz_history (table may not exist):', historyError);
      }


      console.log('✅ Elemental type saved successfully');
      await refreshProfile();
    } catch (error) {
      console.error('❌ Error saving elemental type:', error);
      throw error;
    }
  };

  const incrementWardrobeAnalyzerUse = async () => {
    if (!user || !profile) return;

    try {
      console.log('📈 Incrementing wardrobe analyzer use count');
      const newCount = (profile.wardrobe_analyzer_uses || 0) + 1;
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ wardrobe_analyzer_uses: newCount })
        .eq('id', user.id);

      if (error) throw error;
      
      console.log('✅ Wardrobe analyzer use count updated:', newCount);
      await refreshProfile();
    } catch (error) {
      console.error('❌ Error incrementing wardrobe analyzer use:', error);
    }
  };

  const canUseWardrobeAnalyzer = () => {
    if (!profile) return false;
    if (isPremiumMember()) return true;
    return (profile.wardrobe_analyzer_uses || 0) < 3;
  };

  //

  const getRemainingWardrobeUses = () => {
    if (!profile) return 0;
    if (isPremiumMember()) return Infinity;
    return Math.max(0, 3 - (profile.wardrobe_analyzer_uses || 0));
  };

  const isPremiumMember = () => {
    // Workshop purchasers and legacy premium tiers share expression-tier access.
    return hasWorkshopAccess(profile);
  };

  const value: AuthContextType = {
    user,
    profile,
    subscription,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
    refreshSubscription,
    saveElementalType,
    incrementWardrobeAnalyzerUse,
    canUseWardrobeAnalyzer,
    getRemainingWardrobeUses,
    isPremiumMember,
  };

  // CRITICAL: Only block rendering during INITIAL check
  // After initial check is done, always render children (even if loading)
  if (loading && !initialCheckComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};