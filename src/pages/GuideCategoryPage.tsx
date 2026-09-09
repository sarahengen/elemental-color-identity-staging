import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useLocation, useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppProvider } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import Quiz from '@/components/Quiz';
import ElementalGuideCategorySections from '@/components/ElementalGuideCategorySections';
import PageAnchorNav from '@/components/PageAnchorNav';
import GuideCrossPillarLinks from '@/components/GuideCrossPillarLinks';
import { GUIDE_CATEGORY_ANCHORS } from '@/lib/guideCategoryAnchors';
import { toast } from '@/components/ui/use-toast';
import { navigateFromDetachedPage, navigateToElementOnTypesPage } from '@/lib/detachedPageNavigation';
import { isGuideCategorySlug, type GuideCategorySlug } from '@/lib/guideCategoryRoutes';
import { useSavedHairColors } from '@/hooks/useSavedHairColors';
import { hasWorkshopAccess } from '@/lib/workshopAccess';
import LockedOverlay from '@/components/LockedOverlay';

const ADMIN_EMAILS = ['sarahjengen@gmail.com', 'beymustcode@gmail.com'];

const TITLE_LABEL: Record<GuideCategorySlug, string> = {
  style: 'Style',
  philosophy: 'Philosophy',
  career: 'Career',
  growth: 'Growth',
  living: 'Living',
  relationships: 'Relationships',
  arts: 'Arts',
};

const GuideCategoryPageInner: React.FC = () => {
  const { category: categoryParam } = useParams<{ category: string }>();
  const category = categoryParam as GuideCategorySlug | undefined;

  const {
    user,
    profile,
    signIn,
    signUp,
    saveElementalType,
    refreshProfile,
    isPremiumMember,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userElement, setUserElement] = useState<string | null>(null);
  const [userSubtype, setUserSubtype] = useState<string | null>(null);

  const { savedHairColors, handleSaveHairColor, handleRemoveHairColor } = useSavedHairColors(user, profile);

  const valid = category && isGuideCategorySlug(category);

  useEffect(() => {
    if (valid) {
      document.title = `${TITLE_LABEL[category]} Guides | Elemental Color Identity`;
    }
    window.scrollTo(0, 0);
  }, [valid, category]);

  useEffect(() => {
    if (profile?.elemental_type) setUserElement(profile.elemental_type);
    if (profile?.elemental_subtype) setUserSubtype(profile.elemental_subtype);
  }, [profile]);

  useEffect(() => {
    if (!user) {
      const e = localStorage.getItem('userElement');
      const s = localStorage.getItem('userSubtype');
      if (e) setUserElement(e);
      if (s) setUserSubtype(s);
    }
  }, [user]);

  useEffect(() => {
    const raw = location.hash.replace(/^#/, '');
    if (!raw) return;
    const hash = raw === 'incantations' ? 'mantras' : raw;
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
    return () => clearTimeout(t);
  }, [location.hash, category]);

  const handleNavigate = useCallback(
    (section: string) => {
      navigateFromDetachedPage(navigate, section);
    },
    [navigate]
  );

  const handleUpgrade = useCallback(() => {
    handleNavigate('membership');
  }, [handleNavigate]);

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

  const handleQuizComplete = async (element: string, subtype?: string) => {
    setUserElement(element);
    if (subtype) setUserSubtype(subtype);
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

  const headerSection = useMemo(() => {
    if (!valid) return 'pro-guides';
    return `guides-${category}`;
  }, [valid, category]);

  if (!valid) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        onOpenQuiz={() => setShowQuiz(true)}
        activeSection={headerSection}
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

      <div className="pt-4 pb-4 px-6 max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-amber-100 mb-4">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-800">Workshop members</span>
            <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-white">
              Workshop
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2">{TITLE_LABEL[category]} guides</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Full guides for this theme—use the pills to jump to a section, then explore Style or Career growth below.
          </p>
        </div>
      </div>

      <PageAnchorNav items={GUIDE_CATEGORY_ANCHORS[category]} ariaLabel={`${TITLE_LABEL[category]} guide sections`} />

      <GuideCrossPillarLinks currentCategory={category} className="py-6 mb-2" />

      {(() => {
        const guideSections = (
          <ElementalGuideCategorySections
            category={category}
            isPremiumMember={isPremiumMember}
            userElement={userElement}
            userSubtype={userSubtype}
            user={user}
            savedHairColors={savedHairColors}
            onSaveHairColor={handleSaveHairColor}
            onRemoveHairColor={handleRemoveHairColor}
            onStartQuiz={() => setShowQuiz(true)}
            onUpgrade={handleUpgrade}
          />
        );

        if (hasWorkshopAccess(profile)) return guideSections;

        return (
          <div className="max-w-5xl mx-auto px-6 pb-16">
            <LockedOverlay
              title={`Explore the ${TITLE_LABEL[category]} guides`}
              description="For all 16 subtypes. 35 guides. Interactive tools. 7 libraries"
              icon={<Zap className="h-7 w-7 text-white" />}
              ctaLabel="Reveal the whole map"
              note="Included with Elemental Color Workshop"
              gradientFrom="#8b5cf6"
              gradientTo="#6366f1"
              onUnlock={() => {
                if (!user) {
                  setShowAuthModal(true);
                  return;
                }
                navigate('/elemental-color-workshop');
              }}
            >
              {guideSections}
            </LockedOverlay>
          </div>
        );
      })()}

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
    </div>
  );
};

const GuideCategoryPage: React.FC = () => (
  <AuthProvider>
    <AppProvider>
      <GuideCategoryPageInner />
    </AppProvider>
  </AuthProvider>
);

export default GuideCategoryPage;
