import React, { useState } from "react";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Course from "./pages/Course";
import AuthForms from "./components/AuthForms";
import ProfileForm from "./components/ProfileForm";
import AboutUs from "./pages/AboutUs";
import TermsConditions from "./pages/TermsConditions";
import Features from "./pages/Feactures";
import Settings from "./pages/Settings";
import AllCourseDetail from "./pages/AllCourseDetail";
import { LanguageContext } from "./components/LanguageContext";
import { translations } from "./components/Translatation";
import Dashboard from "./pages/Dashboard";
// Component to handle footer visibility
const FooterHandler = ({ onAboutUs, onTermsConditions, onSettings }) => {
  const location = useLocation();

  // Don't show footer on course pages for better UX
  if (location.pathname === "/course") {
    return null;
  }

  return (
    <Footer
      onAboutUs={onAboutUs}
      onTermsConditions={onTermsConditions}
      onSettings={onSettings}
    />
  );
};

function App() {
  const [open, setOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [userData, setUserData] = useState(null);
  const { languag } = useContext(LanguageContext);
  const t = translations[languag];

  const handleLoginSuccess = (userData) => {
    setUserData(userData);
    setShowAuth(false);
  };

  const handleUpdateProfile = (updatedProfileData) => {
    setUserData((prev) => ({
      ...prev,
      ...updatedProfileData,
    }));
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setUserData(null);
      setCurrentView("home");
      alert("You have been logged out successfully.");
    }
  };

  const handleShowAuth = () => {
    setShowAuth(true);
  };

  const handleProfileClick = () => {
    if (userData) {
      setShowProfile(true);
    } else {
      setShowAuth(true);
    }
  };

  const handleAboutUs = () => {
    setCurrentView("about");
  };

  const handleTermsConditions = () => {
    setCurrentView("terms");
  };

  const handleMoreFeatures = () => {
    setCurrentView("features");
  };

  const handleSettings = () => {
    setCurrentView("settings");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "about":
        return <AboutUs onBack={handleBackToHome} />;
      case "terms":
        return <TermsConditions onBack={handleBackToHome} />;
      case "features":
        return <Features onBack={handleBackToHome} />;
      case "settings":
        return <Settings onBack={handleBackToHome} />;
      default:
        return (
          <Home
            userData={userData}
            onAboutUs={handleAboutUs}
            onTermsConditions={handleTermsConditions}
            onMoreFeatures={handleMoreFeatures}
            onSettings={handleSettings}
            onCourseDetail={() => (window.location.href = "/course")}
          />
        );
    }
  };

  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        {/* Navigation */}
        <Nav
          userData={userData}
          onLogout={handleLogout}
          onProfileClick={handleProfileClick}
          onAboutUs={handleAboutUs}
          onTermsConditions={handleTermsConditions}
          onMoreFeatures={handleMoreFeatures}
          onSettings={handleSettings}
          onShowAuth={handleShowAuth}
          open={open}
          setOpen={setOpen}
        />

        <main className="grow">
          <Routes>
            <Route path="/" element={renderCurrentView()} />
            <Route path="/course" element={<Course />} />
            <Route
              path="/course-detail"
              element={
                <AllCourseDetail
                  userData={userData}
                  onShowAuth={handleShowAuth}
                  onShowProfile={() => setShowProfile(true)} // Make sure this is added
                />
              }
            />
            <Route path="/about-us" element={<AboutUs onBack={handleBackToHome} />}/>
            <Route path="/about-us" element={<AboutUs onBack={handleBackToHome} />}/>
            <Route path="/help-support" element={<AboutUs onBack={handleBackToHome} />}/>
            <Route path="/terms-conditions"element={<TermsConditions onBack={handleBackToHome} />}/>
            <Route path="/features" element={<Features onBack={handleBackToHome} />}/>
            <Route path="/settings" element={<Settings onBack={handleBackToHome} />}/>
            <Route path="/dashboard" element={<Dashboard />} onBack={handleBackToHome} />
            <Route
              path="/profile"
              element={
                <ProfileForm
                   userData={userData}
                   onClose={() => setShowProfile(false)}
                   onUpdateProfile={handleUpdateProfile}
                />
                }
            />
          </Routes>
        </main>

        {/* Auth Forms Modal */}
        <AuthForms
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          onLoginSuccess={handleLoginSuccess}
        />

        {/* Profile Form Modal */}
        {showProfile && userData && (
          <ProfileForm
            userData={userData}
            onClose={() => setShowProfile(false)}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
