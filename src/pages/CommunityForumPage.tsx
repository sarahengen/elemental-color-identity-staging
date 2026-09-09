import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, Link, useLocation, NavLink } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppProvider } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommunityForum from '@/components/CommunityForum';
import PremiumGate from '@/components/PremiumGate';
import AuthModal from '@/components/AuthModal';
import Quiz from '@/components/Quiz';
import ProfilePurchaseCheckout from '@/components/ProfilePurchaseCheckout';
import { MessageSquare, Crown, ArrowLeft, TreePine } from 'lucide-react';
import { navigateFromDetachedPage, navigateToElementOnTypesPage } from '@/lib/detachedPageNavigation';
import { toast } from '@/components/ui/use-toast';
import { ELEMENTAL_SUBTYPE_ARCHETYPE_NAMES } from '@/data/elementalSubtypeArchetypes';
import {
  getSubtypeProfilePriceUsd,
  hasSubtypeProfileAccess,
} from '@/lib/subtypeProfileAccess';

const ADMIN_EMAILS = ['sarahjengen@gmail.com', 'beymustcode@gmail.com'];

const CommunityForumPageInner: React.FC = () => {
  const {
    user,
    profile,
    signIn,
    signUp,
    saveElementalType,
    refreshProfile,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isRootsForum = location.pathname.includes('/community-forum/roots');
  const canAccessRoots = hasSubtypeProfileAccess(profile);
  const profilePriceUsd = getSubtypeProfilePriceUsd();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showProfileCheckout, setShowProfileCheckout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleUnlockRoots = useCallback(() => {
    if (!user) {
      localStorage.setItem('pendingProfilePurchase', 'true');
      setShowAuthModal(true);
      return;
    }
    if (profile?.elemental_type && profile?.elemental_subtype) {
      setShowProfileCheckout(true);
      return;
    }
    setShowQuiz(true);
  }, [user, profile?.elemental_type, profile?.elemental_subtype]);

  useEffect(() => {
    if (!user || !profile) return;
    if (localStorage.getItem('pendingProfilePurchase') !== 'true') return;
    if (hasSubtypeProfileAccess(profile)) {
      localStorage.removeItem('pendingProfilePurchase');
      return;
    }
    localStorage.removeItem('pendingProfilePurchase');
    if (profile.elemental_type && profile.elemental_subtype) {
      setShowProfileCheckout(true);
    } else {
      setShowQuiz(true);
    }
  }, [user, profile]);

  useEffect(() => {
    if (isRootsForum) {
      document.title = 'Roots Forum | Elemental Color Identity';
    } else {
      document.title = 'Elemental Community Forum | Elemental Color Identity';
    }
    window.scrollTo(0, 0);
  }, [isRootsForum]);

  const forumNavClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
      isActive
        ? 'bg-blue-600 text-white shadow-md ring-1 ring-blue-700/80 [&_svg]:shrink-0 [&_svg]:text-white'
        : 'bg-white text-gray-700 hover:bg-violet-50 border border-violet-100 [&_svg]:shrink-0 [&_svg]:text-gray-600'
    }`;

  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);
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
        toast({ title: 'Results Saved!', description: 'Your quiz results have been saved to your account.' });
      } catch (e) {
        console.error(e);
      }
    }
    await refreshProfile();
  };

  const handleSignUp = async (email: string, password: string, fullName: string) => {
    await signUp(email, password, fullName);
    const pendingType = localStorage.getItem('pendingElementalType');
    const pendingSubtype = localStorage.getItem('pendingSubtype');
    const pendingQuizMode = localStorage.getItem('pendingQuizMode') || 'full';
    if (pendingType) {
      setTimeout(async () => {
        try {
          await saveElementalType(pendingType, pendingSubtype || undefined, pendingQuizMode as 'full' | 'subtype');
          localStorage.removeItem('pendingElementalType');
          localStorage.removeItem('pendingSubtype');
          localStorage.removeItem('pendingQuizMode');
          localStorage.removeItem('userElement');
          localStorage.removeItem('userSubtype');
        } catch (e) {
          console.error(e);
        }
      }, 1000);
    }
  };

  const handleNavigate = useCallback(
    (section: string) => {
      if (section === 'community') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      navigateFromDetachedPage(navigate, section);
    },
    [navigate]
  );

  const handleQuizComplete = async (element: string, subtype?: string) => {
    if (user) {
      try {
        await saveElementalType(element, subtype, 'full');
        await refreshProfile();
        toast({
          title: 'Results Saved!',
          description: 'Your elemental color type has been saved to your profile and quiz history.',
        });
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error Saving Results',
          description: 'Your results are shown but could not be saved. Please try again.',
          variant: 'destructive',
        });
      }
    } else {
      localStorage.setItem('userElement', element);
      if (subtype) localStorage.setItem('userSubtype', subtype);
      localStorage.setItem('pendingElementalType', element);
      localStorage.setItem('pendingQuizMode', 'full');
      if (subtype) localStorage.setItem('pendingSubtype', subtype);
      toast({
        title: 'Results Ready!',
        description: 'Sign in to save your results permanently and track your quiz history.',
      });
    }
  };

  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  return (
    <div className="min-h-screen bg-white">
      <Header
        onOpenQuiz={() => setShowQuiz(true)}
        activeSection="community"
        onNavigate={handleNavigate}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        user={user}
        profile={profile}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenProfile={() => (user ? navigate('/') : setShowAuthModal(true))}
        isAdmin={!!isAdmin}
        onOpenAdmin={() => {
          navigate('/');
          window.setTimeout(() => {
            document.getElementById('admin')?.scrollIntoView({ behavior: 'smooth' });
          }, 200);
        }}
      />

      <section className="py-20 px-6 bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
                {isRootsForum ? (
                  <TreePine className="w-5 h-5 text-emerald-600" />
                ) : (
                  <MessageSquare className="w-5 h-5 text-violet-500" />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {isRootsForum ? 'Premium Feature' : 'Community Feature'}
                </span>
                {isRootsForum && !canAccessRoots && <Crown className="w-4 h-4 text-amber-500" />}
              </div>
              <h1 className="text-4xl font-serif text-gray-900 mb-4">
                {isRootsForum ? 'Roots Forum' : 'Elemental Community Forum'}
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                {isRootsForum
                  ? 'Threads organized by element and the sixteen elemental archetypes.'
                  : 'Find your elemental tribe! Connect with fellow elemental types, share your results, get feedback, and discuss elemental color strategies with our vibrant community.'}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-10">
                <NavLink to="/community-forum" end className={forumNavClass}>
                  <MessageSquare className="w-4 h-4" />
                  Community
                </NavLink>
                <NavLink to="/community-forum/roots" end className={forumNavClass}>
                  <TreePine className="w-4 h-4" />
                  Roots
                </NavLink>
              </div>
            </div>

          {isRootsForum ? (
            canAccessRoots ? (
              <CommunityForum
                user={user}
                profile={profile}
                onAuthRequired={() => setShowAuthModal(true)}
                forumMode="roots"
              />
            ) : (
              <PremiumGate
                title="Unlock Roots Forum"
                description="Unlock your profile to access all sixteen Root forums organized by elemental archetype."
                features={[
                  'All sixteen Root forums by elemental archetype',
                  'Weekly private Root ritual check-in',
                  'Root-specific challenges and wisdom library',
                  'Sacred reactions beyond likes',
                ]}
                icon={<TreePine className="w-4 h-4 text-white" />}
                gradientFrom="#10B981"
                gradientTo="#059669"
                featuresLabel="Included with your Profile:"
                ctaLabel="Unlock Your Profile"
                pricingHint={`One-time $${profilePriceUsd} • No subscription required`}
                onUpgrade={handleUnlockRoots}
              />
            )
          ) : (
            <CommunityForum
              user={user}
              profile={profile}
              onAuthRequired={() => setShowAuthModal(true)}
              forumMode="public"
            />
          )}
        </div>
      </section>

      <Footer
        onNavigate={handleNavigate}
        onSelectType={(elementId) => navigateToElementOnTypesPage(navigate, elementId)}
      />

      {showQuiz && (
        <Quiz
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
          user={user}
          onOpenAuth={() => setShowAuthModal(true)}
          onSaveResult={async (element, subtype) => {
            await saveElementalType(element, subtype, 'full');
            await refreshProfile();
          }}
        />
      )}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSignIn={handleSignIn}
          onSignUp={handleSignUp}
        />
      )}
      {showProfileCheckout && user && profile?.elemental_type && profile?.elemental_subtype && (
        <ProfilePurchaseCheckout
          user={user}
          elementalType={profile.elemental_type}
          elementalSubtype={profile.elemental_subtype}
          subtypeLabel={
            ELEMENTAL_SUBTYPE_ARCHETYPE_NAMES[profile.elemental_subtype] ||
            profile.elemental_subtype
          }
          onSuccess={async () => {
            setShowProfileCheckout(false);
            await refreshProfile();
            toast({
              title: 'Profile Unlocked!',
              description: 'You now have access to the Roots Forum.',
            });
          }}
          onCancel={() => setShowProfileCheckout(false)}
        />
      )}
    </div>
  );
};

const CommunityForumPage: React.FC = () => (
  <AuthProvider>
    <AppProvider>
      <CommunityForumPageInner />
    </AppProvider>
  </AuthProvider>
);

export default CommunityForumPage;
