import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { elementalTypes, ElementalType } from '@/data/elementalTypes';
//import { useAuth } from '@/hooks/useAuth';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import Footer from './Footer';
import HeroSection from './HeroSection';
import Quiz from './Quiz';
import ElementalTypeDetail from './ElementalTypeDetail';
import AuthModal from './AuthModal';
import ProfilePage from './ProfilePage';
import ColorClassBooking from './ColorClassBooking';
import MembershipPlans from './MembershipPlans';
import ConsultationBooking from './ConsultationBooking';
import type { SavedHairColor } from './HairColorGuide';
import Blog from './Blog';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import TheInvisibleSelfBook from './TheInvisibleSelfBook';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import CorporatePartnerships from './CorporatePartnerships';
import PressPage from './PressPage';
import PressLogosStrip from './PressLogosStrip';


import AdminDashboard from './AdminDashboard';
import GiftMembership from './GiftMembership';
import GiftFreeQuiz from './GiftFreeQuiz';

const PENDING_PROFILE_RESULTS_KEY = 'pendingProfileResultsView';

function hasPendingProfileResults(): boolean {
  return (
    sessionStorage.getItem(PENDING_PROFILE_RESULTS_KEY) === 'true' ||
    localStorage.getItem(PENDING_PROFILE_RESULTS_KEY) === 'true'
  );
}

function setPendingProfileResults(): void {
  sessionStorage.setItem(PENDING_PROFILE_RESULTS_KEY, 'true');
  localStorage.removeItem(PENDING_PROFILE_RESULTS_KEY);
}

function clearPendingProfileResults(): void {
  sessionStorage.removeItem(PENDING_PROFILE_RESULTS_KEY);
  localStorage.removeItem(PENDING_PROFILE_RESULTS_KEY);
}

function getSavedQuizResults(profile: { elemental_type?: string | null; elemental_subtype?: string | null } | null) {
  if (profile?.elemental_type && profile?.elemental_subtype) {
    return { element: profile.elemental_type, subtype: profile.elemental_subtype };
  }
  const element = localStorage.getItem('pendingElementalType') || localStorage.getItem('userElement');
  const subtype = localStorage.getItem('pendingSubtype') || localStorage.getItem('userSubtype');
  if (element && subtype) return { element, subtype };
  return null;
}




import { Sparkles, ArrowRight, Crown } from 'lucide-react';


import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { navigateToDetachedSection } from '@/lib/crossPageNavigation';
import { isHiddenInEntryPhase, isFullLaunch } from '@/lib/launchConfig';
import { hasWorkshopAccess } from '@/lib/workshopAccess';
import { hasSubtypeProfileAccess } from '@/lib/subtypeProfileAccess';
import { navigateToElementOnTypesPage } from '@/lib/detachedPageNavigation';
import SubtypeProfilePreview from './SubtypeProfilePreview';
import TestimonialCarousel from './TestimonialCarousel';
import SarahProfile from './SarahProfile';
import ProfilePurchaseSuccess from './ProfilePurchaseSuccess';
import { SavedPaletteColor, readLocalPalette, writeLocalPalette } from '@/lib/savedPalette';
const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    profile,
    subscription,
    loading,
    signIn,
    signUp,
    signOut,
    saveElementalType,
    refreshProfile,
    refreshSubscription,
    isPremiumMember
  } = useAuth();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showSubtypeQuiz, setShowSubtypeQuiz] = useState(false);
  const [quizInitialResults, setQuizInitialResults] = useState<{ element: string; subtype: string } | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState<{ element: string; subtype: string } | null>(null);
  const purchaseSuccessPending = useRef(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userElement, setUserElement] = useState<string | null>(null);
  const [userSubtype, setUserSubtype] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ElementalType | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedHairColors, setSavedHairColors] = useState<SavedHairColor[]>([]);
  // ── My Saved Palette feature ──
  const [savedPaletteColors, setSavedPaletteColors] = useState<SavedPaletteColor[]>([]);
  useEffect(() => {
    if (user) {
      if (Array.isArray(profile?.saved_palette_colors)) setSavedPaletteColors(profile.saved_palette_colors);
    } else {
      setSavedPaletteColors(readLocalPalette());
    }
  }, [user, profile]);
  const persistPalette = async (updated: SavedPaletteColor[]) => {
    setSavedPaletteColors(updated);
    if (user) {
      await supabase.from('user_profiles').update({ saved_palette_colors: updated }).eq('id', user.id);
    } else {
      writeLocalPalette(updated);
    }
  };
  const handleSavePaletteColor = async (color: SavedPaletteColor) => {
    if (savedPaletteColors.some(c => c.id === color.id)) return;
    await persistPalette([...savedPaletteColors, color]);
    toast({ title: 'Saved to My Palette', description: `${color.name} added to your palette.` });
  };
  const handleRemovePaletteColor = async (colorId: string) => {
    await persistPalette(savedPaletteColors.filter(c => c.id !== colorId));
    toast({ title: 'Removed', description: 'Color removed from My Palette.' });
  };
  const [showBlog, setShowBlog] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showGiftQuiz, setShowGiftQuiz] = useState(false);
  const [showCorporate, setShowCorporate] = useState(false);
  const [showPress, setShowPress] = useState(false);
  const [giftPlans, setGiftPlans] = useState<any[]>([]);



  // Admin email check
  const ADMIN_EMAILS = ['sarahjengen@gmail.com', 'beymustcode@gmail.com'];
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  //
  // Fetch saved hair colors from database
  useEffect(() => {
    if (user) {
      fetchSavedHairColors();
    } else {
      // Load from localStorage for non-authenticated users
      const localColors = localStorage.getItem('savedHairColors');
      if (localColors) {
        try {
          setSavedHairColors(JSON.parse(localColors));
        } catch (e) {
          console.error('Error parsing saved hair colors:', e);
        }
      }
    }
  }, [user]);
  const fetchSavedHairColors2 = async () => {
    if (!user) return;
    try {
      const {
        data,
        error
      } = await supabase.from('saved_hair_colors').select('*').eq('user_id', user.id).order('saved_at', {
        ascending: false
      });
      if (error) {
        // Table might not exist, use profile field instead
        if (profile?.saved_hair_colors) {
          setSavedHairColors(profile.saved_hair_colors);
        }
      } else {
        setSavedHairColors(data || []);
      }
    } catch (error) {
      console.error('Error fetching saved hair colors:', error);
      // Fallback to profile field
      if (profile?.saved_hair_colors) {
        setSavedHairColors(profile.saved_hair_colors);
      }
    }
  };
  const handleSaveHairColor2 = async (color: SavedHairColor) => {
    if (!user) {
      // Save to localStorage for non-authenticated users
      const updated = [...savedHairColors, color];
      setSavedHairColors(updated);
      localStorage.setItem('savedHairColors', JSON.stringify(updated));
      toast({
        title: 'Color saved!',
        description: `${color.name} has been added to your favorites.`
      });
      return;
    }
    try {
      // Try to save to dedicated table first
      const {
        error
      } = await supabase.from('saved_hair_colors').insert({
        user_id: user.id,
        color_id: color.id,
        name: color.name,
        hex: color.hex,
        description: color.description,
        undertone: color.undertone,
        intensity: color.intensity,
        category: color.category,
        element_id: color.elementId,
        subtype_id: color.subtypeId,
        saved_at: color.savedAt
      });
      if (error) {
        console.log('Table insert failed, using profile fallback:', error);
        // Fallback: save to profile as JSON
        const updated = [...savedHairColors, color];
        await supabase.from('user_profiles').update({
          saved_hair_colors: updated
        }).eq('id', user.id);
        setSavedHairColors(updated);
      } else {
        setSavedHairColors(prev => [...prev, color]);
      }
      toast({
        title: 'Color saved!',
        description: `${color.name} has been added to your favorites.`
      });
    } catch (error) {
      console.error('Error saving hair color:', error);
      toast({
        title: 'Error',
        description: 'Failed to save color. Please try again.',
        variant: 'destructive'
      });
    }
  };
  const handleRemoveHairColor2 = async (colorId: string) => {
    if (!user) {
      // Remove from localStorage for non-authenticated users
      const updated = savedHairColors.filter(c => c.id !== colorId);
      setSavedHairColors(updated);
      localStorage.setItem('savedHairColors', JSON.stringify(updated));
      toast({
        title: 'Color removed',
        description: 'The color has been removed from your favorites.'
      });
      return;
    }
    try {
      // Try to delete from dedicated table first
      const {
        error
      } = await supabase.from('saved_hair_colors').delete().eq('user_id', user.id).eq('color_id', colorId);
      if (error) {
        // Fallback: update profile JSON
        const updated = savedHairColors.filter(c => c.id !== colorId);
        await supabase.from('user_profiles').update({
          saved_hair_colors: updated
        }).eq('id', user.id);
        setSavedHairColors(updated);
      } else {
        setSavedHairColors(prev => prev.filter(c => c.id !== colorId));
      }
      toast({
        title: 'Color removed',
        description: 'The color has been removed from your favorites.'
      });
    } catch (error) {
      console.error('Error removing hair color:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove color. Please try again.',
        variant: 'destructive'
      });
    }
  };

  // This is a partial fix for the AppLayout component
  // Add this to replace the fetchSavedHairColors function in your AppLayout.tsx

  const fetchSavedHairColors = async () => {
    if (!user) return;
    try {
      // Try to fetch from saved_hair_colors table without ordering by saved_at
      const {
        data,
        error
      } = await supabase.from('saved_hair_colors').select('*').eq('user_id', user.id);
      if (error) {
        // Table might not exist or have different structure, use profile field instead
        console.log('Saved hair colors table error, using profile fallback:', error);
        if (profile?.saved_hair_colors) {
          setSavedHairColors(profile.saved_hair_colors);
        }
      } else {
        // Sort in memory if data exists
        const sorted = (data || []).sort((a, b) => {
          // Try to sort by created_at or id as fallback
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });
        setSavedHairColors(sorted);
      }
    } catch (error) {
      console.error('Error fetching saved hair colors:', error);
      // Fallback to profile field
      if (profile?.saved_hair_colors) {
        setSavedHairColors(profile.saved_hair_colors);
      }
    }
  };
  const handleSaveHairColor = async (color: SavedHairColor) => {
    if (!user) {
      // Save to localStorage for non-authenticated users
      const updated = [...savedHairColors, color];
      setSavedHairColors(updated);
      localStorage.setItem('savedHairColors', JSON.stringify(updated));
      toast({
        title: 'Color saved!',
        description: `${color.name} has been added to your favorites.`
      });
      return;
    }
    try {
      // Try to save to dedicated table first
      const {
        error
      } = await supabase.from('saved_hair_colors').insert({
        user_id: user.id,
        color_id: color.id,
        name: color.name,
        hex: color.hex,
        description: color.description,
        undertone: color.undertone,
        intensity: color.intensity,
        category: color.category,
        element_id: color.elementId,
        subtype_id: color.subtypeId
        // Removed saved_at since it doesn't exist - will use created_at default
      });
      if (error) {
        console.log('Table insert failed, using profile fallback:', error);
        // Fallback: save to profile as JSON
        const updated = [...savedHairColors, color];
        await supabase.from('user_profiles').update({
          saved_hair_colors: updated
        }).eq('id', user.id);
        setSavedHairColors(updated);
      } else {
        setSavedHairColors(prev => [...prev, color]);
      }
      toast({
        title: 'Color saved!',
        description: `${color.name} has been added to your favorites.`
      });
    } catch (error) {
      console.error('Error saving hair color:', error);
      toast({
        title: 'Error',
        description: 'Failed to save color. Please try again.',
        variant: 'destructive'
      });
    }
  };
  const handleRemoveHairColor = async (colorId: string) => {
    if (!user) {
      // Remove from localStorage for non-authenticated users
      const updated = savedHairColors.filter(c => c.id !== colorId);
      setSavedHairColors(updated);
      localStorage.setItem('savedHairColors', JSON.stringify(updated));
      toast({
        title: 'Color removed',
        description: 'The color has been removed from your favorites.'
      });
      return;
    }
    try {
      // Try to delete from dedicated table first
      const {
        error
      } = await supabase.from('saved_hair_colors').delete().eq('user_id', user.id).eq('color_id', colorId);
      if (error) {
        console.log('Table delete failed, using profile fallback:', error);
        // Fallback: update profile JSON
        const updated = savedHairColors.filter(c => c.id !== colorId);
        await supabase.from('user_profiles').update({
          saved_hair_colors: updated
        }).eq('id', user.id);
        setSavedHairColors(updated);
      } else {
        setSavedHairColors(prev => prev.filter(c => c.id !== colorId));
      }
      toast({
        title: 'Color removed',
        description: 'The color has been removed from your favorites.'
      });
    } catch (error) {
      console.error('Error removing hair color:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove color. Please try again.',
        variant: 'destructive'
      });
    }
  };

  // Sync user element and subtype from profile
  useEffect(() => {
    if (profile?.elemental_type) {
      setUserElement(profile.elemental_type);
    }
    if (profile?.elemental_subtype) {
      setUserSubtype(profile.elemental_subtype);
    }
  }, [profile]);
  // Load from localStorage for non-authenticated users
  useEffect(() => {
    if (!user) {
      const savedElement = localStorage.getItem('userElement');
      const savedSubtype = localStorage.getItem('userSubtype');
      if (savedElement) setUserElement(savedElement);
      if (savedSubtype) setUserSubtype(savedSubtype);
    }
  }, [user]);

  // Handle ?section=... query param (used when navigating back from detached
  // routes like /press to a page managed by state flags here, e.g. About or Contact).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');

    // Gifted Free Quiz deep link (?quiz=1) — auto-open the quiz for recipients.
    if (params.get('quiz') === '1') {
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', cleanUrl);
      setTimeout(() => setShowQuiz(true), 50);
      return;
    }

    if (!section) return;

    // Clean the query param from the URL so reloads/back don't re-trigger it
    const cleanUrl = window.location.pathname + window.location.hash;
    window.history.replaceState({}, '', cleanUrl);

    // Defer so state is ready
    setTimeout(() => {
      if (section === 'about') {
        setShowAbout(true); setShowBlog(false); setShowContact(false); setShowBook(false);
        setSelectedType(null); setShowProfile(false); setActiveSection('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (section === 'contact') {
        setShowContact(true); setShowAbout(false); setShowBlog(false); setShowBook(false);
        setSelectedType(null); setShowProfile(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (section === 'blog') {
        setShowBlog(true); setShowAbout(false); setShowContact(false); setShowBook(false);
        setSelectedType(null); setShowProfile(false); setActiveSection('blog');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (section === 'book') {
        setShowBook(true); setShowBlog(false); setShowAbout(false); setShowContact(false);
        setSelectedType(null); setShowProfile(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (section === 'terms') {
        setShowTerms(true); setShowPrivacy(false); setShowAdmin(false); setShowBook(false);
        setShowBlog(false); setShowAbout(false); setShowContact(false);
        setSelectedType(null); setShowProfile(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (section === 'privacy') {
        setShowPrivacy(true); setShowTerms(false); setShowAdmin(false); setShowBook(false);
        setShowBlog(false); setShowAbout(false); setShowContact(false);
        setSelectedType(null); setShowProfile(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (section === 'corporate') {
        // Corporate Partnerships temporarily hidden
        return;
      } else if (section === 'gift-quiz') {
        setShowGiftQuiz(true);
      } else {
        // Plain scroll target on the home page
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userType = userElement ? elementalTypes.find(t => t.id === userElement) : null;
  const userSubtypeData = userType && userSubtype ? userType.subtypes.find(s => s.id === userSubtype) : null;

  const handleQuizComplete = async (element: string, subtype?: string) => {
    setUserElement(element);
    if (subtype) {
      setUserSubtype(subtype);
    }

    // Determine quiz mode based on whether we started with an element
    const quizMode = showSubtypeQuiz ? 'subtype' : 'full';

    // Save to database if user is logged in
    if (user) {
      try {
        await saveElementalType(element, subtype, quizMode);
        // Refresh profile to ensure we have the latest data
        await refreshProfile();
        toast({
          title: 'Results Saved!',
          description: 'Your elemental color type has been saved to your profile and quiz history.'
        });
      } catch (error) {
        console.error('Error saving elemental type:', error);
        toast({
          title: 'Error Saving Results',
          description: 'Your results are shown but could not be saved. Please try again.',
          variant: 'destructive'
        });
      }
    } else {
      // Save to localStorage for non-authenticated users
      localStorage.setItem('userElement', element);
      if (subtype) {
        localStorage.setItem('userSubtype', subtype);
      }
      // Store pending results to save when user logs in
      localStorage.setItem('pendingElementalType', element);
      localStorage.setItem('pendingQuizMode', quizMode);
      if (subtype) {
        localStorage.setItem('pendingSubtype', subtype);
      }
      toast({
        title: 'Results Ready!',
        description: 'Sign in to save your results permanently and track your quiz history.'
      });
    }
  };
  const handleStartSubtypeQuiz = () => {
    setShowSubtypeQuiz(true);
  };

  /** Home banner CTA: buyers → own subtype page; others → quiz results + purchase. */
  const handleViewMyProfile = () => {
    if (!userElement) return;

    if (hasSubtypeProfileAccess(profile) && userSubtype) {
      navigate(`/elemental-types?element=${encodeURIComponent(userElement)}&subtype=${encodeURIComponent(userSubtype)}`);
      return;
    }

    if (userSubtype) {
      setQuizInitialResults({ element: userElement, subtype: userSubtype });
      setShowQuiz(true);
      return;
    }

    // Element only — open the element detail until they finish the subtype quiz
    const type = elementalTypes.find((t) => t.id === userElement);
    if (type) {
      setSelectedType(type);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closeQuiz = () => {
    setShowQuiz(false);
    setQuizInitialResults(null);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    // Don't leave a stale email-link intent — it re-opens sign-in on every refresh.
    if (!user) {
      clearPendingProfileResults();
    }
  };

  // Drop legacy localStorage flag from older builds (it persisted across every visit).
  useEffect(() => {
    localStorage.removeItem(PENDING_PROFILE_RESULTS_KEY);
  }, []);

  // "Get My Full Profile" email CTA (?purchase=profile): signed in → quiz results
  // dialog; not signed in → auth modal, then results after login/signup.
  const openProfileResultsFromEmail = () => {
    if (!user) {
      setPendingProfileResults();
      setShowAuthModal(true);
      return;
    }

    clearPendingProfileResults();
    const results = getSavedQuizResults(profile);
    if (results) {
      setQuizInitialResults(results);
    }
    setShowQuiz(true);
  };

  // Handle email CTA deep links: ?quiz=1 (retake) and ?purchase=profile (results + buy).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quiz = params.get('quiz');
    const purchase = params.get('purchase');
    if (!quiz && !purchase) return;

    // Clean the query so reloads/back don't re-trigger it.
    const cleanUrl = window.location.pathname + window.location.hash;
    window.history.replaceState({}, '', cleanUrl);

    if (quiz) {
      // Retake only — drop any stale "full profile" intent and never prompt sign-in here.
      clearPendingProfileResults();
      setShowAuthModal(false);
      setShowQuiz(true);
      return;
    }

    if (purchase === 'profile') {
      // Set synchronously so the resolver effect below can pick it up on the same load.
      setPendingProfileResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stripe return_url after a redirect-based profile payment (?profile-purchase=success).
  // Flag it now; the resolver below shows the thank-you once the profile has loaded.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('profile-purchase') !== 'success') return;
    const cleanUrl = window.location.pathname + window.location.hash;
    window.history.replaceState({}, '', cleanUrl);
    purchaseSuccessPending.current = true;
    refreshProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resolve the post-purchase thank-you once we know the buyer's subtype.
  useEffect(() => {
    if (!purchaseSuccessPending.current || loading) return;
    const results = getSavedQuizResults(profile);
    if (!results) return;
    purchaseSuccessPending.current = false;
    setPurchaseSuccess(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, loading]);

  // Resolve pending email profile link once auth (+ profile when needed) has loaded.
  useEffect(() => {
    if (showQuiz || showSubtypeQuiz) return;
    if (!hasPendingProfileResults()) return;
    if (loading) return;

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Wait for profile fetch when results may only exist in the database.
    if (!getSavedQuizResults(profile) && profile === null && user) return;

    openProfileResultsFromEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, profile, loading, showQuiz, showSubtypeQuiz]);
  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);

    // Check for pending elemental type from quiz taken before login
    const pendingType = localStorage.getItem('pendingElementalType');
    const pendingSubtype = localStorage.getItem('pendingSubtype');
    const pendingQuizMode = localStorage.getItem('pendingQuizMode') || 'full';
    if (pendingType) {
      try {
        await saveElementalType(pendingType, pendingSubtype || undefined, pendingQuizMode as 'full' | 'subtype');
        localStorage.removeItem('pendingElementalType');
        localStorage.removeItem('pendingSubtype');
        localStorage.removeItem('pendingQuizMode');
        localStorage.removeItem('userElement');
        localStorage.removeItem('userSubtype');
        toast({
          title: 'Results Saved!',
          description: 'Your quiz results have been saved to your account and quiz history.'
        });
      } catch (error) {
        console.error('Error saving pending elemental type:', error);
      }
    }

    // Refresh profile to load saved results from database
    await refreshProfile();
  };
  const handleSignUp = async (email: string, password: string, fullName: string) => {
    await signUp(email, password, fullName);

    // Check for pending elemental type from quiz taken before signup
    const pendingType = localStorage.getItem('pendingElementalType');
    const pendingSubtype = localStorage.getItem('pendingSubtype');
    const pendingQuizMode = localStorage.getItem('pendingQuizMode') || 'full';
    if (pendingType) {
      // Wait a bit for the profile to be created
      setTimeout(async () => {
        try {
          await saveElementalType(pendingType, pendingSubtype || undefined, pendingQuizMode as 'full' | 'subtype');
          localStorage.removeItem('pendingElementalType');
          localStorage.removeItem('pendingSubtype');
          localStorage.removeItem('pendingQuizMode');
          localStorage.removeItem('userElement');
          localStorage.removeItem('userSubtype');
          toast({
            title: 'Results Saved!',
            description: 'Your quiz results have been saved to your new account and quiz history.'
          });
        } catch (error) {
          console.error('Error saving pending elemental type after signup:', error);
        }
      }, 1000);
    }
  };
  const handleSignOut = async () => {
    await signOut();
    setUserElement(null);
    setUserSubtype(null);
    setShowProfile(false);
  };
  const scrollToSection = (section: string) => {
    if (section === 'gift-quiz') {
      setShowGiftQuiz(true);
      return;
    }
    if (navigateToDetachedSection(navigate, section)) {
      return;
    }
    if (isHiddenInEntryPhase(section)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }
    // Handle blog navigation specially - show blog page
    if (section === 'blog') {
      setShowBlog(true);
      setShowAbout(false);
      setShowContact(false);
      setShowBook(false);
      setSelectedType(null);
      setShowProfile(false);
      setActiveSection('blog');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    // Handle about navigation specially - show about page
    if (section === 'about') {
      setShowAbout(true);
      setShowBlog(false);
      setShowContact(false);
      setShowBook(false);
      setSelectedType(null);
      setShowProfile(false);
      setActiveSection('about');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    // Handle contact navigation specially - show contact page
    if (section === 'contact') {
      setShowContact(true);
      setShowAbout(false);
      setShowBlog(false);
      setShowBook(false);
      setSelectedType(null);
      setShowProfile(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    // Handle book navigation specially - show book page
    if (section === 'book') {
      setShowBook(true);
      setShowBlog(false);
      setShowAbout(false);
      setShowContact(false);
      setSelectedType(null);
      setShowProfile(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    // Handle admin navigation
    if (section === 'admin') {
      setShowAdmin(true);
      setShowBook(false);
      setShowBlog(false);
      setShowAbout(false);
      setShowContact(false);
      setSelectedType(null);
      setShowProfile(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    // Handle terms navigation
    if (section === 'terms') {
      setShowTerms(true);
      setShowPrivacy(false);
      setShowAdmin(false);
      setShowBook(false);
      setShowBlog(false);
      setShowAbout(false);
      setShowContact(false);
      setSelectedType(null);
      setShowProfile(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    // Handle privacy navigation
    if (section === 'privacy') {
      setShowPrivacy(true);
      setShowTerms(false);
      setShowAdmin(false);
      setShowBook(false);
      setShowBlog(false);
      setShowAbout(false);
      setShowContact(false);
      setSelectedType(null);
      setShowProfile(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    // Corporate Partnerships temporarily hidden — ignore deep links
    if (section === 'corporate') {
      return;
    }
    // Handle press page navigation — use the dedicated /press route so the URL is shareable
    if (section === 'press') {
      navigate('/press');
      window.setTimeout(() => window.scrollTo(0, 0), 0);
      return;
    }

    setShowBlog(false);
    setShowAbout(false);
    setShowContact(false);
    setShowBook(false);
    setShowAdmin(false);
    setShowTerms(false);
    setShowPrivacy(false);
    setShowCorporate(false);
    setShowPress(false);
    setSelectedType(null);
    setShowProfile(false);

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const handleFooterSelectType = (elementId: string) => {
    navigateToElementOnTypesPage(navigate, elementId);
  };

  const handleSubscriptionChange = () => {
    refreshProfile();
    refreshSubscription();
  };

  // Handle quiz start from profile page with mode
  const handleStartQuizFromProfile = (mode?: 'full' | 'subtype') => {
    setShowProfile(false);
    if (mode === 'subtype' && userElement) {
      setShowSubtypeQuiz(true);
    } else {
      setShowQuiz(true);
    }
  };

  // Show profile page
  if (showProfile && user) {
    return <div className="min-h-screen bg-gray-50">
        <ProfilePage user={user} profile={profile} onBack={() => setShowProfile(false)} onSignOut={handleSignOut} onStartQuiz={handleStartQuizFromProfile} onProfileUpdate={refreshProfile} savedHairColors={savedHairColors} onRemoveHairColor={handleRemoveHairColor} />

        {showQuiz && <Quiz onComplete={handleQuizComplete} onClose={closeQuiz} initialResults={quizInitialResults} user={user} onOpenAuth={() => setShowAuthModal(true)} onSaveResult={async (element, subtype) => {
        await saveElementalType(element, subtype, 'full');
        await refreshProfile();
      }} />}
        {showSubtypeQuiz && userElement && <Quiz onComplete={handleQuizComplete} onClose={() => setShowSubtypeQuiz(false)} initialElement={userElement} user={user} onOpenAuth={() => setShowAuthModal(true)} onSaveResult={async (element, subtype) => {
        await saveElementalType(element, subtype, 'subtype');
        await refreshProfile();
      }} />}
        {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} onSignIn={handleSignIn} onSignUp={handleSignUp} />}

      </div>;
  }

  // If viewing a specific elemental type detail
  if (selectedType) {
    return <div className="min-h-screen bg-gray-50">
        <Header onOpenQuiz={() => setShowQuiz(true)} activeSection={activeSection} onNavigate={section => {
        setSelectedType(null);
        scrollToSection(section);
      }} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} user={user} profile={profile} onOpenAuth={() => setShowAuthModal(true)} onOpenProfile={() => user ? setShowProfile(true) : setShowAuthModal(true)} isAdmin={!!isAdmin} onOpenAdmin={() => scrollToSection('admin')} />
        <ElementalTypeDetail type={selectedType} onBack={() => setSelectedType(null)} isPremium={isPremiumMember()} hasWorkshopAccess={hasWorkshopAccess(profile)} userElement={userElement} userSubtype={userSubtype} hasSubtypeProfileUnlocked={profile?.subtype_profile_unlocked === true} profile={profile} onUnlockWorkshop={() => {
        if (!user) {
          setShowAuthModal(true);
          return;
        }
        navigate('/elemental-color-workshop');
      }} onUpgradeToPremium={() => {
        setSelectedType(null);
        scrollToSection('membership');
      }} onNavigate={(section) => {
        setSelectedType(null);
        setTimeout(() => {
          const el = document.getElementById(section);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }} />

        <Footer onSelectType={handleFooterSelectType} onNavigate={section => {
        setSelectedType(null);
        scrollToSection(section);
      }} />


        {showQuiz && <Quiz onComplete={handleQuizComplete} onClose={closeQuiz} initialResults={quizInitialResults} />}
        {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} onSignIn={handleSignIn} onSignUp={handleSignUp} />}
      </div>;
  }

  // If viewing the blog
  if (showBlog) {
    return <div className="min-h-screen bg-white">
        <Header onOpenQuiz={() => setShowQuiz(true)} activeSection={activeSection} onNavigate={section => {
        setShowBlog(false);
        scrollToSection(section);
      }} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} user={user} profile={profile} onOpenAuth={() => setShowAuthModal(true)} onOpenProfile={() => user ? setShowProfile(true) : setShowAuthModal(true)} isAdmin={!!isAdmin} onOpenAdmin={() => scrollToSection('admin')} />
        <Blog onBack={() => {
        setShowBlog(false);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }} />
        <Footer onSelectType={handleFooterSelectType} onNavigate={section => {
        if (section === 'blog') return;
        setShowBlog(false);
        scrollToSection(section);
      }} />

        {showQuiz && <Quiz onComplete={handleQuizComplete} onClose={closeQuiz} initialResults={quizInitialResults} user={user} onOpenAuth={() => setShowAuthModal(true)} onSaveResult={async (element, subtype) => {
        await saveElementalType(element, subtype, 'full');
        await refreshProfile();
      }} />}
        {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} onSignIn={handleSignIn} onSignUp={handleSignUp} />}
      </div>;
  }

  // If viewing the about page
  if (showAbout) {
    return <div className="min-h-screen bg-white">
        <Header onOpenQuiz={() => setShowQuiz(true)} activeSection={activeSection} onNavigate={section => {
        setShowAbout(false);
        scrollToSection(section);
      }} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} user={user} profile={profile} onOpenAuth={() => setShowAuthModal(true)} onOpenProfile={() => user ? setShowProfile(true) : setShowAuthModal(true)} isAdmin={!!isAdmin} onOpenAdmin={() => scrollToSection('admin')} />
        <AboutUs onBack={() => {
        setShowAbout(false);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }} onStartQuiz={() => setShowQuiz(true)} onNavigate={section => {
        setShowAbout(false);
        // For special pages (about, contact, blog, book, terms, privacy, corporate), scrollToSection handles them via state flags
        if (['about', 'contact', 'blog', 'book', 'terms', 'privacy', 'corporate'].includes(section)) {
          scrollToSection(section);
        } else {
          // For sections on the main page, we need a timeout to allow React to re-render the main page first
          setShowBlog(false);
          setShowContact(false);
          setShowBook(false);
          setShowAdmin(false);
          setShowTerms(false);
          setShowPrivacy(false);
          setShowCorporate(false);
          setSelectedType(null);
          setShowProfile(false);
          setTimeout(() => {
            const el = document.getElementById(section);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }
      }} />
        <Footer onSelectType={handleFooterSelectType} onNavigate={section => {
        if (section === 'about') return;
        setShowAbout(false);
        scrollToSection(section);
      }} />

        {showQuiz && <Quiz onComplete={handleQuizComplete} onClose={closeQuiz} initialResults={quizInitialResults} user={user} onOpenAuth={() => setShowAuthModal(true)} onSaveResult={async (element, subtype) => {
        await saveElementalType(element, subtype, 'full');
        await refreshProfile();
      }} />}
        {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} onSignIn={handleSignIn} onSignUp={handleSignUp} />}
      </div>;
  }

  // If viewing the contact page
  if (showContact) {
    return <div className="min-h-screen bg-white">
        <Header onOpenQuiz={() => setShowQuiz(true)} activeSection={activeSection} onNavigate={section => {
        setShowContact(false);
        scrollToSection(section);
      }} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} user={user} profile={profile} onOpenAuth={() => setShowAuthModal(true)} onOpenProfile={() => user ? setShowProfile(true) : setShowAuthModal(true)} isAdmin={!!isAdmin} onOpenAdmin={() => scrollToSection('admin')} />
        <ContactUs onBack={() => {
        setShowContact(false);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }} onStartQuiz={() => setShowQuiz(true)} onNavigate={section => {
        setShowContact(false);
        // For special pages (about, contact, blog, book, terms, privacy, corporate), scrollToSection handles them via state flags
        if (['about', 'contact', 'blog', 'book', 'terms', 'privacy', 'corporate'].includes(section)) {
          scrollToSection(section);
        } else {
          // For sections on the main page, we need a timeout to allow React to re-render the main page first
          setShowBlog(false);
          setShowAbout(false);
          setShowBook(false);
          setShowAdmin(false);
          setShowTerms(false);
          setShowPrivacy(false);
          setShowCorporate(false);
          setSelectedType(null);
          setShowProfile(false);
          setTimeout(() => {
            const el = document.getElementById(section);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }
      }} />
        <Footer onSelectType={handleFooterSelectType} onNavigate={section => {
        if (section === 'contact') return;
        setShowContact(false);
        scrollToSection(section);
      }} />

        {showQuiz && <Quiz onComplete={handleQuizComplete} onClose={closeQuiz} initialResults={quizInitialResults} user={user} onOpenAuth={() => setShowAuthModal(true)} onSaveResult={async (element, subtype) => {
        await saveElementalType(element, subtype, 'full');
        await refreshProfile();
      }} />}
        {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} onSignIn={handleSignIn} onSignUp={handleSignUp} />}
      </div>;
  }

  // If viewing the book page
  if (showBook) {
    return <div className="min-h-screen bg-white">
        <Header onOpenQuiz={() => setShowQuiz(true)} activeSection={activeSection} onNavigate={section => {
        setShowBook(false);
        scrollToSection(section);
      }} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} user={user} profile={profile} onOpenAuth={() => setShowAuthModal(true)} onOpenProfile={() => user ? setShowProfile(true) : setShowAuthModal(true)} isAdmin={!!isAdmin} onOpenAdmin={() => scrollToSection('admin')} />
        <TheInvisibleSelfBook onBack={() => {
        setShowBook(false);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }} onStartQuiz={() => setShowQuiz(true)} onNavigate={section => {
        setShowBook(false);
        scrollToSection(section);
      }} />
        <Footer onSelectType={handleFooterSelectType} onNavigate={section => {
        if (section === 'book') return;
        setShowBook(false);
        scrollToSection(section);
      }} />

        {showQuiz && <Quiz onComplete={handleQuizComplete} onClose={closeQuiz} initialResults={quizInitialResults} user={user} onOpenAuth={() => setShowAuthModal(true)} onSaveResult={async (element, subtype) => {
        await saveElementalType(element, subtype, 'full');
        await refreshProfile();
      }} />}
        {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} onSignIn={handleSignIn} onSignUp={handleSignUp} />}
      </div>;
  }

  // If viewing the admin dashboard
  if (showAdmin) {
    return <div className="min-h-screen bg-gray-50">
        <AdminDashboard user={user} onBack={() => {
        setShowAdmin(false);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }} />
        {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} onSignIn={handleSignIn} onSignUp={handleSignUp} />}
      </div>;
  }

  // If viewing the Terms of Service page
  if (showTerms) {
    return <div className="min-h-screen bg-white">
        <Header onOpenQuiz={() => setShowQuiz(true)} activeSection={activeSection} onNavigate={section => {
        setShowTerms(false);
        scrollToSection(section);
      }} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} user={user} profile={profile} onOpenAuth={() => setShowAuthModal(true)} onOpenProfile={() => user ? setShowProfile(true) : setShowAuthModal(true)} isAdmin={!!isAdmin} onOpenAdmin={() => scrollToSection('admin')} />
        <TermsOfService onBack={() => {
        setShowTerms(false);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }} onNavigate={section => {
        setShowTerms(false);
        scrollToSection(section);
      }} />
        <Footer onSelectType={handleFooterSelectType} onNavigate={section => {
        if (section === 'terms') return;
        setShowTerms(false);
        scrollToSection(section);
      }} />

        {showQuiz && <Quiz onComplete={handleQuizComplete} onClose={closeQuiz} initialResults={quizInitialResults} user={user} onOpenAuth={() => setShowAuthModal(true)} onSaveResult={async (element, subtype) => {
        await saveElementalType(element, subtype, 'full');
        await refreshProfile();
      }} />}
        {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} onSignIn={handleSignIn} onSignUp={handleSignUp} />}
      </div>;
  }

  // If viewing the Privacy Policy page
  if (showPrivacy) {
    return <div className="min-h-screen bg-white">
        <Header onOpenQuiz={() => setShowQuiz(true)} activeSection={activeSection} onNavigate={section => {
        setShowPrivacy(false);
        scrollToSection(section);
      }} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} user={user} profile={profile} onOpenAuth={() => setShowAuthModal(true)} onOpenProfile={() => user ? setShowProfile(true) : setShowAuthModal(true)} isAdmin={!!isAdmin} onOpenAdmin={() => scrollToSection('admin')} />
        <PrivacyPolicy onBack={() => {
        setShowPrivacy(false);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }} onNavigate={section => {
        setShowPrivacy(false);
        scrollToSection(section);
      }} />
        <Footer onSelectType={handleFooterSelectType} onNavigate={section => {
        if (section === 'privacy') return;
        setShowPrivacy(false);
        scrollToSection(section);
      }} />

        {showQuiz && <Quiz onComplete={handleQuizComplete} onClose={closeQuiz} initialResults={quizInitialResults} user={user} onOpenAuth={() => setShowAuthModal(true)} onSaveResult={async (element, subtype) => {
        await saveElementalType(element, subtype, 'full');
        await refreshProfile();
      }} />}
        {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} onSignIn={handleSignIn} onSignUp={handleSignUp} />}
      </div>;
  }

  // If viewing the Corporate Partnerships page
  if (showCorporate) {
    return <div className="min-h-screen bg-white">
        <Header onOpenQuiz={() => setShowQuiz(true)} activeSection={activeSection} onNavigate={section => {
        setShowCorporate(false);
        scrollToSection(section);
      }} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} user={user} profile={profile} onOpenAuth={() => setShowAuthModal(true)} onOpenProfile={() => user ? setShowProfile(true) : setShowAuthModal(true)} isAdmin={!!isAdmin} onOpenAdmin={() => scrollToSection('admin')} />
        <CorporatePartnerships onBack={() => {
        setShowCorporate(false);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }} onNavigate={section => {
        setShowCorporate(false);
        // For special pages (about, contact, blog, book, terms, privacy, corporate), scrollToSection handles them via state flags
        if (['about', 'contact', 'blog', 'book', 'terms', 'privacy', 'corporate'].includes(section)) {
          scrollToSection(section);
        } else {
          // For sections on the main page, we need a timeout to allow React to re-render the main page first
          // Reset all show states so the main page renders
          setShowBlog(false);
          setShowAbout(false);
          setShowContact(false);
          setShowBook(false);
          setShowAdmin(false);
          setShowTerms(false);
          setShowPrivacy(false);
          setSelectedType(null);
          setShowProfile(false);
          setTimeout(() => {
            const el = document.getElementById(section);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }
      }} />

        <Footer onSelectType={handleFooterSelectType} onNavigate={section => {
        if (section === 'corporate') return;
        setShowCorporate(false);
        scrollToSection(section);
      }} />

        {showQuiz && <Quiz onComplete={handleQuizComplete} onClose={closeQuiz} initialResults={quizInitialResults} user={user} onOpenAuth={() => setShowAuthModal(true)} onSaveResult={async (element, subtype) => {
        await saveElementalType(element, subtype, 'full');
        await refreshProfile();
      }} />}
        {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} onSignIn={handleSignIn} onSignUp={handleSignUp} />}
      </div>;
  }

  // If viewing the Press page
  if (showPress) {
    return <div className="min-h-screen bg-white">
        <Header onOpenQuiz={() => setShowQuiz(true)} activeSection={activeSection} onNavigate={section => {
        setShowPress(false);
        scrollToSection(section);
      }} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} user={user} profile={profile} onOpenAuth={() => setShowAuthModal(true)} onOpenProfile={() => user ? setShowProfile(true) : setShowAuthModal(true)} isAdmin={!!isAdmin} onOpenAdmin={() => scrollToSection('admin')} />
        <PressPage onBack={() => {
        setShowPress(false);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }} onStartQuiz={() => setShowQuiz(true)} onNavigate={section => {
        setShowPress(false);
        if (['about', 'contact', 'blog', 'book', 'terms', 'privacy', 'corporate', 'press'].includes(section)) {
          scrollToSection(section);
        } else {
          setShowBlog(false);
          setShowAbout(false);
          setShowContact(false);
          setShowBook(false);
          setShowAdmin(false);
          setShowTerms(false);
          setShowPrivacy(false);
          setShowCorporate(false);
          setSelectedType(null);
          setShowProfile(false);
          setTimeout(() => {
            const el = document.getElementById(section);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }
      }} />
        <Footer onSelectType={handleFooterSelectType} onNavigate={section => {
        if (section === 'press') return;
        setShowPress(false);
        scrollToSection(section);
      }} />

        {showQuiz && <Quiz onComplete={handleQuizComplete} onClose={closeQuiz} initialResults={quizInitialResults} user={user} onOpenAuth={() => setShowAuthModal(true)} onSaveResult={async (element, subtype) => {
        await saveElementalType(element, subtype, 'full');
        await refreshProfile();
      }} />}
        {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} onSignIn={handleSignIn} onSignUp={handleSignUp} />}
      </div>;
  }



  return <div className="min-h-screen bg-white">
      <Header onOpenQuiz={() => setShowQuiz(true)} activeSection={activeSection} onNavigate={scrollToSection} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} user={user} profile={profile} onOpenAuth={() => setShowAuthModal(true)} onOpenProfile={() => user ? setShowProfile(true) : setShowAuthModal(true)} isAdmin={!!isAdmin} onOpenAdmin={() => scrollToSection('admin')} />

      {/* Hero Section */}
      <div id="home">
        <HeroSection
          onStartQuiz={() => setShowQuiz(true)}
          onExploreTypes={() => navigate('/elemental-types')}
          onJoinMembership={() => scrollToSection('membership')}
          onGiftQuiz={() => setShowGiftQuiz(true)}
        />
      </div>

      {/* User Type Banner (if determined) — quiz result, moved above the As Featured In strip */}
      {userType && <section className="py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{
          background: `linear-gradient(135deg, ${userSubtypeData?.colors[0].hex || userType.colors[0].hex}20, ${userSubtypeData?.colors[1].hex || userType.colors[1].hex}20)`
        }}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
              backgroundColor: userSubtypeData?.colors[0].hex || userType.colors[0].hex
            }}>
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Your Elemental Type</p>
                  <h3 className="text-2xl font-serif text-gray-900">
                    {userSubtypeData ? userSubtypeData.name : userType.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {userType.name} Element • {userType.season} Season
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={handleViewMyProfile} className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                  View My Profile
                  <ArrowRight className="w-4 h-4" />
                </button>
                {!userSubtype && <button onClick={handleStartSubtypeQuiz} className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors">
                    Find My Subtype
                  </button>}
                {!user && <button onClick={() => setShowAuthModal(true)} className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors">
                    Save Results
                  </button>}
              </div>
            </div>
          </div>
        </section>}

      {/* As Featured In — press logos */}
      <PressLogosStrip />


      {/* How It Works — moved directly under the hero & stats */}

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">How It Works</h2>

            {/* Stats graphic — moved here from below the hero header */}
            <div className="mt-8 mb-8 grid grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl md:text-4xl font-serif text-gray-900">4</div>
                <div className="text-sm text-gray-500">Elements</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-serif text-gray-900">16</div>
                <div className="text-sm text-gray-500">Subtypes</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-serif text-gray-900">192</div>
                <div className="text-sm text-gray-500">Colors</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-serif text-gray-900">4</div>
                <div className="text-sm text-gray-500">Seasons</div>
              </div>
            </div>

            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Discover your Elemental Color subtype. Yours maps your inner nature in 3 simple steps.
            </p>
          </div>



          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <span className="text-2xl font-serif text-amber-600">1</span>
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-3">Take the Quiz</h3>
              <p className="text-gray-600">
                Answer 12 thoughtful questions, then 6 more to find your specific subtype.
              </p>

            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                <span className="text-2xl font-serif text-teal-600">2</span>
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-3">Discover Your Type</h3>
              <p className="text-gray-600">Learn your elemental subtype. You have a dominant element and a secondary influence.</p>

            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <span className="text-2xl font-serif text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-3">Express Yourself</h3>
              <p className="text-gray-600">Embody your elemental type through your color palette and 35 energy guides.</p>
            </div>

          </div>
          </div>

      </section>






      {/* See What Your Result Looks Like — sample subtype profile preview (below How It Works) */}

      <SubtypeProfilePreview
        onStartQuiz={() => setShowQuiz(true)}
        onJoinMembership={() => scrollToSection('membership')}
      />




      {/* Client Testimonials — rotating carousel (managed from Admin) */}
      <TestimonialCarousel onStartQuiz={() => setShowQuiz(true)} />

      {/* Founder profile — Sarah J Engen */}
      <SarahProfile />

      {/* Primary Start the Free Quiz CTA — under Meet the Founder */}
      <section className="pb-20 px-6 bg-white text-center">
        <button onClick={() => setShowQuiz(true)} className="inline-flex items-center gap-3 px-14 py-6 bg-black text-white rounded-full font-bold text-xl tracking-wide hover:bg-neutral-800 transition-all shadow-2xl hover:shadow-black/40 hover:scale-105 ring-4 ring-neutral-300/50">
          Start the Free Quiz
          <ArrowRight className="w-6 h-6" />
        </button>
      </section>




      {/* Alice Bailey quote — leads into membership */}
      <section className="py-16 px-6 bg-gradient-to-br from-amber-50 via-white to-rose-50">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-serif text-gray-800 text-xl md:text-2xl leading-relaxed italic">
            &ldquo;Know thyself, for in thyself is to be found all that there is to be known.&rdquo;
          </blockquote>
          <p className="mt-5 text-sm md:text-base font-medium text-gray-500 not-italic tracking-wide">
            &mdash; Alice Bailey
          </p>
        </div>
      </section>

      {/* Premium Membership Section — hidden in entry/workshop launch (client rebrand). Code preserved for later use. */}
      {isFullLaunch() && (
      <section id="membership" className="py-20 px-6 bg-gradient-to-br from-amber-50 via-white to-rose-50">
        <div className="max-w-7xl mx-auto">
          <MembershipPlans user={user} onAuthRequired={() => setShowAuthModal(true)} currentSubscription={subscription} onSubscriptionChange={handleSubscriptionChange} onOpenGift={() => {
          if (!user) {
            setShowAuthModal(true);
            return;
          }
          // Fetch plans for gift modal
          supabase.from('membership_plans').select('*').eq('is_active', true).order('price_monthly', {
            ascending: true
          }).then(({
            data
          }) => {
            if (data) {
              const parsed = data.map((p: any) => ({
                ...p,
                features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features
              }));
              setGiftPlans(parsed);
            }
            setShowGiftModal(true);
          });
        }} />
        </div>
      </section>
      )}

      {/* One-on-One Consultations Section — moved to the Workshop page. Hidden here, code preserved for later use. */}
      {isFullLaunch() && (
      <section id="consultations" className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <ConsultationBooking user={user} onAuthRequired={() => setShowAuthModal(true)} isPremium={isPremiumMember()} />
        </div>
      </section>
      )}


      {/* Elemental Color Classes Section — hidden in entry/workshop launch. Code preserved for later use. */}
      {isFullLaunch() && (
      <section id="classes" className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <ColorClassBooking user={user} onAuthRequired={() => setShowAuthModal(true)} />
        </div>
      </section>
      )}


      {/* Ready to Discover Your Colors CTA — hidden per client request. Code preserved for later use.
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 md:p-16">
            <Sparkles className="w-12 h-12 mx-auto text-amber-400 mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
              Ready to Discover Your Colors?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              Take our free quiz to discover your elemental type and subtype, then use the camera analyzer 
              to find perfect matches for your wardrobe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowQuiz(true)} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg">
                Start the Free Quiz
                <ArrowRight className="w-5 h-5" />
              </button>
              {isFullLaunch() && (
              <button onClick={() => scrollToSection('membership')} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full font-medium hover:from-amber-600 hover:to-rose-600 transition-colors">
                <Crown className="w-5 h-5" />
                Go Premium
              </button>
              )}
              {!user && <button onClick={() => setShowAuthModal(true)} className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors">
                  Create Account
                </button>}
            </div>
          </div>
        </div>
      </section>
      */}

      <Footer onSelectType={handleFooterSelectType} onNavigate={scrollToSection} />



      {/* Quiz Modal */}
      {showQuiz && <Quiz onComplete={handleQuizComplete} onClose={closeQuiz} initialResults={quizInitialResults} user={user} onOpenAuth={() => setShowAuthModal(true)} onSaveResult={async (element, subtype) => {
      await saveElementalType(element, subtype, 'full');
      await refreshProfile();
    }} />}

      {/* Subtype Quiz Modal */}
      {showSubtypeQuiz && userElement && <Quiz onComplete={handleQuizComplete} onClose={() => setShowSubtypeQuiz(false)} initialElement={userElement} user={user} onOpenAuth={() => setShowAuthModal(true)} onSaveResult={async (element, subtype) => {
      await saveElementalType(element, subtype, 'subtype');
      await refreshProfile();
    }} />}


      {/* Auth Modal */}
      {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} onSignIn={handleSignIn} onSignUp={handleSignUp} />}

      {/* Gift Membership Modal */}
      {showGiftModal && <GiftMembership user={user} profile={profile} plans={giftPlans} onClose={() => setShowGiftModal(false)} onAuthRequired={() => { setShowGiftModal(false); setShowAuthModal(true); }} />}

      {/* Gift the Free Quiz Modal */}
      {showGiftQuiz && <GiftFreeQuiz user={user} profile={profile} onClose={() => setShowGiftQuiz(false)} />}

      {/* Post-purchase thank-you (Stripe redirect return) */}
      {purchaseSuccess && (
        <ProfilePurchaseSuccess
          elementalType={purchaseSuccess.element}
          elementalSubtype={purchaseSuccess.subtype}
          email={user?.email}
          onClose={() => setPurchaseSuccess(null)}
        />
      )}
    </div>;

};
export default AppLayout;