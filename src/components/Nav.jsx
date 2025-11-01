import React, { useState } from "react"; 
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Info,
  FileText,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Home,
  BookOpen,
  Zap,
  HelpCircle,
  X,
  Menu,
  BarChart
} from "lucide-react";
import Logo from "./Logo";

const Nav = ({
  open,
  setOpen,
  userData,
  onLogout,
  onProfileClick,
  onShowAuth,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user has uploaded a custom profile picture
  const hasCustomProfilePicture = (profilePicture) => {
    if (!profilePicture) return false;
    const isBlobUrl = profilePicture.startsWith("blob:");
    const isExternalUrl =
      profilePicture.startsWith("http") &&
      !profilePicture.includes("i.pinimg.com") &&
      !profilePicture.includes("images.unsplash.com");
    return isBlobUrl || isExternalUrl;
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="bg-[#004F70] text-white shadow-2xl sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop Navigation - Home and Courses only */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  location.pathname === "/"
                    ? "bg-white text-[#004F70] shadow-lg"
                    : "text-white hover:bg-white/20 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                to="/course"
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  location.pathname === "/course"
                    ? "bg-white text-[#004F70] shadow-lg"
                    : "text-white hover:bg-white/20 hover:text-white"
                }`}
              >
                Courses
              </Link>

              {/* Login / User Dropdown */}
              {userData ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all text-white"
                  >
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                      {userData.profilePicture &&
                      hasCustomProfilePicture(userData.profilePicture) ? (
                        <img
                          src={userData.profilePicture}
                          alt="Profile"
                          className="w-full h-full object-cov er"
                        />
                      ) : (
                        <span className="text-[#004F70] font-bold text-sm">
                          {userData.fullName?.charAt(0) || "U"}
                        </span>
                      )}
                    </div>
                    <span className="font-medium">{userData.fullName || "User"}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                      {/* Profile */}
                      <button
                        onClick={() => {
                          onProfileClick();
                          navigate("/profile");
                          setDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        <User className="w-5 h-5 mr-3 text-[#004F70]" />
                        Profile
                      </button>

                      {/* About Us */}
                      <button
                        onClick={() => {
                          navigate("/about-us");
                          setDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        <Info className="w-5 h-5 mr-3 text-[#004F70]" />
                        About Us
                      </button>
                      {/* Terms & Conditions */}
                      <button
                        onClick={() => {
                          navigate("/terms-conditions");
                          setDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        <FileText className="w-5 h-5 mr-3 text-[#004F70]" />
                        Terms & Conditions
                      </button>
                      {/* feature */}
                      <button
                        onClick={() => {
                          navigate("/features");
                          setDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        <Zap className="w-5 h-5 mr-3 text-[#004F70]" />
                        Features
                      </button>
                      {/* Settings */}
                      <button
                        onClick={() => {
                          navigate("/settings");
                          setDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        <Settings className="w-5 h-5 mr-3 text-[#004F70]" />
                        Settings
                      </button>
                      {/*Help & Support*/}
                      <button
                        onClick={() => {
                          navigate("/help-support");
                          setDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        <HelpCircle className="w-5 h-5 mr-3 text-[#004F70]" />
                        Help & Support
                      </button>
                      {/*Dashboard*/}
                      <button
                        onClick={() => {
                          navigate("/dashboard");
                          setDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        <BarChart className="w-5 h-5 mr-3 text-[#004F70]" />
                        Dashboard
                      </button>
                      {/* Logout */}
                      <button
                        onClick={() => {
                          onLogout();
                          setDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-all"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => onShowAuth(true)}
                  className="px-6 py-2 bg-white text-[#004F70] rounded-lg hover:bg-gray-100 hover:scale-105 transition-all font-medium shadow-lg hover:shadow-xl"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all text-white"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
