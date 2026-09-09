import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PressPage from '@/components/PressPage';
import AuthModal from '@/components/AuthModal';
import Quiz from '@/components/Quiz';
import { navigateFromDetachedPage, navigateToElementOnTypesPage } from '@/lib/detachedPageNavigation';

const PressPageInner: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    profile,
    signIn,
    signUp,
    saveElementalType,
    refreshProfile,
  } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Always land at the top when opening / navigating to Press
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ADMIN_EMAILS = ['sarahjengen@gmail.com', 'beymustcode@gmail.com'];
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  const handleNavigate = (section: string) => {
    if (section === 'press') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigateFromDetachedPage(navigate, section);
  };


  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);
  };

  const handleSignUp = async (email: string, password: string, fullName: string) => {
    await signUp(email, password, fullName);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onOpenQuiz={() => setShowQuiz(true)}
        activeSection="press"
        onNavigate={(section) => {
          if (section === 'press') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            handleNavigate(section);
          }
        }}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        user={user}
        profile={profile}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenProfile={() => (user ? handleNavigate('home') : setShowAuthModal(true))}
        isAdmin={!!isAdmin}
        onOpenAdmin={() => handleNavigate('admin')}
      />

      <PressPage
        onBack={() => navigate('/')}
        onStartQuiz={() => setShowQuiz(true)}
        onNavigate={handleNavigate}
      />

      <Footer
        onSelectType={(elementId) => navigateToElementOnTypesPage(navigate, elementId)}
        onNavigate={(section) => {
          if (section === 'press') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            handleNavigate(section);
          }
        }}
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

const PressPageRoute: React.FC = () => {
  return (
    <AuthProvider>
      <PressPageInner />
    </AuthProvider>
  );
};

export default PressPageRoute;
