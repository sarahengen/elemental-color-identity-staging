import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  elemental_type: string | null;
  elemental_subtype: string | null;
  quiz_completed_at: string | null;
  subtype_completed_at: string | null;
  membership_tier: string;
  membership_expires_at: string | null;
  wardrobe_analyzer_uses: number;
  wardrobe_analyzer_limit: number;
  created_at: string;
  updated_at: string;
}

interface UserSubscription {
  id: string;
  user_id: string;
  plan_id: string;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  status: string;
  billing_cycle: string;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  cancelled_at: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchSubscription(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
          await fetchSubscription(session.user.id);
        } else {
          setProfile(null);
          setSubscription(null);
          setLoading(false);
        }
      }
    );

    return () => authSubscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      }
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscription = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
      }
      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    if (error) throw error;

    // Create profile after signup
    if (data.user) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: data.user.id,
          email: email,
          full_name: fullName || null,
          membership_tier: 'free',
          wardrobe_analyzer_uses: 0,
          wardrobe_analyzer_limit: 3
        });

      if (profileError) console.error('Error creating profile:', profileError);
    }

    return data;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setProfile(null);
    setSubscription(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('user_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    setProfile(data);
    return data;
  };

  const saveElementalType = async (elementalType: string, elementalSubtype?: string, quizMode: string = 'full', quizAnswers?: any) => {
    if (!user) throw new Error('No user logged in');

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    const updates: Partial<UserProfile> = {
      elemental_type: elementalType,
      quiz_completed_at: new Date().toISOString()
    };

    if (elementalSubtype) {
      updates.elemental_subtype = elementalSubtype;
      updates.subtype_completed_at = new Date().toISOString();
    }

    // Save to quiz history
    try {
      await supabase
        .from('quiz_history')
        .insert({
          user_id: user.id,
          elemental_type: elementalType,
          elemental_subtype: elementalSubtype || null,
          quiz_mode: quizMode,
          quiz_answers: quizAnswers || null,
          completed_at: new Date().toISOString()
        });
    } catch (historyError) {
      console.error('Error saving quiz history:', historyError);
      // Continue even if history save fails
    }

    if (existingProfile) {
      // Update existing profile
      return updateProfile(updates);
    } else {
      // Create new profile
      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          user_id: user.id,
          email: user.email,
          membership_tier: 'free',
          wardrobe_analyzer_uses: 0,
          wardrobe_analyzer_limit: 3,
          ...updates
        })
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    }
  };


  const incrementWardrobeAnalyzerUse = async () => {
    if (!user || !profile) return false;

    // Check if user has reached their limit (case-insensitive)
    const tier = profile.membership_tier?.toLowerCase();
    const isPremium = tier === 'premium' || tier === 'professional';
    if (!isPremium && profile.wardrobe_analyzer_uses >= profile.wardrobe_analyzer_limit) {
      return false; // Limit reached
    }


    const { error } = await supabase
      .from('user_profiles')
      .update({ 
        wardrobe_analyzer_uses: profile.wardrobe_analyzer_uses + 1,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (error) {
      console.error('Error incrementing wardrobe analyzer use:', error);
      return false;
    }

    // Update local state
    setProfile(prev => prev ? { ...prev, wardrobe_analyzer_uses: prev.wardrobe_analyzer_uses + 1 } : null);
    return true;
  };

  const canUseWardrobeAnalyzer = () => {
    if (!profile) return true; // Allow non-logged in users
    const tier = profile.membership_tier?.toLowerCase();
    const isPremium = tier === 'premium' || tier === 'professional';
    return isPremium || profile.wardrobe_analyzer_uses < profile.wardrobe_analyzer_limit;
  };

  const getRemainingWardrobeUses = () => {
    if (!profile) return 3;
    const tier = profile.membership_tier?.toLowerCase();
    const isPremium = tier === 'premium' || tier === 'professional';
    if (isPremium) return Infinity;
    return Math.max(0, profile.wardrobe_analyzer_limit - profile.wardrobe_analyzer_uses);
  };


  const isPremiumMember = () => {
    // Check profile membership tier (case-insensitive comparison)
    const tier = profile?.membership_tier?.toLowerCase();
    if (tier === 'premium' || tier === 'professional') {
      return true;
    }
    // Also check if there's an active subscription as a fallback
    if (subscription?.status === 'active') {
      return true;
    }
    return false;
  };



  const refreshSubscription = async () => {
    if (user) {
      await fetchSubscription(user.id);
    }
  };

  return {
    user,
    session,
    profile,
    subscription,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    saveElementalType,
    refreshProfile: () => user && fetchProfile(user.id),
    refreshSubscription,
    incrementWardrobeAnalyzerUse,
    canUseWardrobeAnalyzer,
    getRemainingWardrobeUses,
    isPremiumMember
  };
}
