import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Info,
  FileText,
  MoreHorizontal,
  X,
  Settings,
  Menu,
  BookOpen,
  User,
  LogOut,
  ChevronDown,
  Home,
  Video,
  Users,
  Star,
  Clock,
  Award,
  HelpCircle,
} from "lucide-react";//react icon library
import Logo from "./Logo";

const Nav = ({
  open,
  setOpen,
  userData,
  onLogout,
  onProfileClick,
  onAboutUs,
  onTermsConditions,
  onMoreFeatures,
  onSettings,
  onShowAuth,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
 //Menu item have 2
  const sidebarMenuItems = [
    {
      name: "Profile",
      icon: <User className="w-5 h-5" />,
      action: onProfileClick,
      color: "text-blue-500",
    },
    {
      name: "About Us",
      icon: <Info className="w-5 h-5" />,
      action: onAboutUs,
      color: "text-blue-500",
    },
    {
      name: "Terms & Conditions",
      icon: <FileText className="w-5 h-5" />,
      action: onTermsConditions,
      color: "text-green-500",
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      action: onSettings,
      color: "text-gray-500",
    },
    {
      name: "Help & Support",
      icon: <HelpCircle className="w-5 h-5" />,
      action: () => alert("Help & Support"),
      color: "text-purple-500",
    },
  ];

  const publicMenuItems = [
    {
      name: "About Us",
      icon: <Info className="w-5 h-5" />,
      action: onAboutUs,
      color: "text-blue-500",
    },
    {
      name: "Terms & Conditions",
      icon: <FileText className="w-5 h-5" />,
      action: onTermsConditions,
      color: "text-green-500",
    },
    {
      name: "More Features",
      icon: <MoreHorizontal className="w-5 h-5" />,
      action: onMoreFeatures,
      color: "text-yellow-500",
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      action: onSettings,
      color: "text-gray-500",
    },
  ];

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-2xl sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            {/* Logo */}
            {/* <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-purple-600 font-bold text-lg">CLC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    CLC Learning
                  </span>
                </h1>
                <p className="text-xs text-purple-200 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn • Grow • Succeed
                </p>
              </div>
            </Link> */}

            {/* Desktop Navigation - Show Home and Course buttons only on desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  location.pathname === "/"//useLocation() hook to detect the current page.
                    ? "bg-white text-purple-600 shadow-lg"
                    : "text-purple-100 hover:bg-purple-500 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                to="/course"
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  location.pathname === "/course"
                    ? "bg-white text-purple-600 shadow-lg"
                    : "text-purple-100 hover:bg-purple-500 hover:text-white"
                }`}
              >
                Courses
              </Link>

              {/* User Menu or Login Button */}
              {userData ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
                  >
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-sm">
                        {userData.fullName?.charAt(0) || "U"}
                      </span>
                    </div>
                    <span className="font-medium">
                      {userData.fullName || "User"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-purple-100 py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-purple-50">
                        <p className="font-semibold text-gray-800">
                          {userData.fullName}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {userData.email}
                        </p>
                        <p className="text-xs text-purple-600 font-medium mt-1">
                          Premium Member
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {sidebarMenuItems.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              item.action();
                              setDropdownOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-purple-50 transition-all"
                          >
                            <div className={`${item.color} mr-3`}>
                              {item.icon}
                            </div>
                            <span>{item.name}</span>
                          </button>
                        ))}
                      </div>

                      {/* Logout */}
                      <div className="border-t border-purple-50 pt-2">
                        <button
                          onClick={() => {
                            onLogout();
                            setDropdownOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-all"
                        >
                          <LogOut className="w-5 h-5 mr-3" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => onShowAuth(true)}
                  className="px-6 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-100 hover:scale-105 transition-all font-medium shadow-lg hover:shadow-xl"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar - Simplified: Remove extra sections, keep only navigation */}
      <>
        {/* Backdrop */}
        {open && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 right-0 h-full z-40 bg-gradient-to-b from-white to-purple-50 shadow-2xl transition-all duration-500 ease-in-out transform ${
            open ? "translate-x-0 w-80" : "translate-x-full"
          } md:hidden`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-purple-100">
              <Link
                to="/"
                className="flex items-center space-x-2"
                onClick={() => setOpen(false)}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CLC</span>
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">CLC Learning</h2>
                  <p className="text-xs text-gray-500">
                    Learn • Grow • Succeed
                  </p>
                </div>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-purple-100 rounded-lg transition-all text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Info or Welcome - Simplified */}
            <div className="p-4 border-b border-purple-100">
              {userData ? (
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {userData.fullName?.charAt(0) || "U"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {userData.fullName}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {userData.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Welcome to CLC Learning
                  </h3>
                  <button
                    onClick={() => {
                      onShowAuth(true);
                      setOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2.5 rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    Login / Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Menu - Main Content */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-1">
                {/* Main Navigation - Keep Home and Courses */}
                <Link
                  to="/"
                  className="flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all group"
                  onClick={() => setOpen(false)}
                >
                  <Home className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="font-medium">Home</span>
                </Link>
                <Link
                  to="/course"
                  className="flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all group"
                  onClick={() => setOpen(false)}
                >
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium">All Courses</span>
                </Link>

                {/* User-specific or Public Menu */}
                {userData ? (
                  <>
                    {sidebarMenuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setOpen(false);
                        }}
                        className="flex items-center w-full text-left px-3 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all group"
                      >
                        <div className={`${item.color} mr-3`}>{item.icon}</div>
                        <span className="font-medium">{item.name}</span>
                      </button>
                    ))}
                  </>
                ) : (
                  <>
                    {publicMenuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setOpen(false);
                        }}
                        className="flex items-center w-full text-left px-3 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all group"
                      >
                        <div className={`${item.color} mr-3`}>{item.icon}</div>
                        <span className="font-medium">{item.name}</span>
                      </button>
                    ))}
                  </>
                )}

                {/* Logout for logged-in users */}
                {userData && (
                  <button
                    onClick={() => {
                      onLogout();
                      setOpen(false);
                    }}
                    className="flex items-center w-full text-left px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all group"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span className="font-medium">Logout</span>
                  </button>
                )}
              </div>
            </nav>

            {/* Footer - Simplified */}
            <div className="p-4 border-t border-purple-100">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-800">
                  {userData ? "Keep Learning! 🚀" : "Start Learning Today! 🎯"}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </>
    </>
  );
};

export default Nav;
