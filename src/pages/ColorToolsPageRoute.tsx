import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ColorToolsPageContent from '@/components/ColorToolsPageContent';
import AuthModal from '@/components/AuthModal';
import Quiz from '@/components/Quiz';
import { elementalTypes } from '@/data/elementalTypes';
import { navigateFromDetachedPage, navigateToElementOnTypesPage } from '@/lib/detachedPageNavigation';
import { getSubtypeProfilePriceUsd, hasSubtypeProfileAccess } from '@/lib/subtypeProfileAccess';
import LockedOverlay from '@/components/LockedOverlay';
import { Camera } from 'lucide-react';

const ADMIN_EMAILS = ['sarahjengen@gmail.com', 'beymustcode@gmail.com'];

const ColorToolsPageInner: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    profile,
    signIn,
    signUp,
    saveElementalType,
    refreshProfile,
    isPremiumMember,
    getRemainingWardrobeUses,
    incrementWardrobeAnalyzerUse,
  } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userElement, setUserElement] = useState<string | null>(null);
  const [userSubtype, setUserSubtype] = useState<string | null>(null);

  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  useEffect(() => {
    document.title = 'Color Tools | Elemental Color Identity';
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

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
    const hash = location.hash.replace(/^#/, '');
    if (!hash) return;
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
    return () => clearTimeout(t);
  }, [location.hash]);

  const userType = useMemo(
    () => (userElement ? elementalTypes.find((t) => t.id === userElement) : null),
    [userElement]
  );

  const handleNavigate = useCallback(
    (section: string) => {
      if (section === 'color-tools') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (section === 'analyzer' || section === 'wardrobe') {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      navigateFromDetachedPage(navigate, section);
    },
    [navigate]
  );

  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);
    await refreshProfile();
  };

  const handleSignUp = async (email: string, password: string, fullName: string) => {
    await signUp(email, password, fullName);
    await refreshProfile();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        onOpenQuiz={() => setShowQuiz(true)}
        activeSection="color-tools"
        onNavigate={handleNavigate}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        user={user}
        profile={profile}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenProfile={() => (user ? navigate('/') : setShowAuthModal(true))}
        isAdmin={!!isAdmin}
        onOpenAdmin={() => navigateFromDetachedPage(navigate, 'admin')}
      />

      <div className="flex-1">
        {(() => {
          const toolsContent = (
            <ColorToolsPageContent
              userType={userType}
              userSubtype={userSubtype}
              user={user}
              onRequestAuth={() => setShowAuthModal(true)}
              isPremium={isPremiumMember()}
              remainingWardrobeUses={getRemainingWardrobeUses()}
              onUseWardrobeAnalyzer={async () => {
                await incrementWardrobeAnalyzerUse();
                return true;
              }}
              onUpgradeToPremium={() => navigateFromDetachedPage(navigate, 'membership')}
            />
          );

          if (hasSubtypeProfileAccess(profile)) return toolsContent;

          return (
            <div className="max-w-5xl mx-auto px-6 py-16">
              <LockedOverlay
                title="Explore the Color Tools"
                description="The Camera Color Analyzer and Wardrobe Analyzer come with your personalized Elemental Color Profile."
                features={[
                  'Real-time camera analysis against your palette',
                  'Upload your wardrobe for instant match scoring',
                  'Tailored to your elemental subtype',
                ]}
                icon={<Camera className="h-7 w-7 text-white" />}
                ctaLabel="Get My Full Profile"
                note={`One-time payment · $${getSubtypeProfilePriceUsd().toFixed(0)}`}
                gradientFrom="#7c3aed"
                gradientTo="#ec4899"
                onUnlock={() => {
                  if (!user) {
                    setShowAuthModal(true);
                    return;
                  }
                  navigate('/?purchase=profile');
                }}
              >
                {toolsContent}
              </LockedOverlay>
            </div>
          );
        })()}
      </div>

      <Footer
        onSelectType={(elementId) => navigateToElementOnTypesPage(navigate, elementId)}
        onNavigate={handleNavigate}
      />

      {showQuiz && (
        <Quiz
          onComplete={async (element, subtype) => {
            if (user) {
              await saveElementalType(element, subtype, 'full');
              await refreshProfile();
            } else {
              localStorage.setItem('userElement', element);
              if (subtype) localStorage.setItem('userSubtype', subtype);
            }
          }}
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

const ColorToolsPageRoute: React.FC = () => (
  <AuthProvider>
    <ColorToolsPageInner />
  </AuthProvider>
);

export default ColorToolsPageRoute;
