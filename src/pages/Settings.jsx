import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Check,
  Download,
  Moon,
  Sun,
  Monitor,
  Save,
} from "lucide-react";

const Settings = ({ onBack }) => {
  const [settings, setSettings] = useState({
    // Account Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,

    // Appearance
    theme: "light",
    language: "english",
    fontSize: "medium",

    // Privacy & Security
    twoFactorAuth: false,
    dataExport: false,
    autoLogout: true,
    showOnlineStatus: true,

    // Notification Preferences
    courseUpdates: true,
    liveClassReminders: true,
    assignmentDeadlines: true,
    promotionalEmails: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("appSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    applyTheme(settings.theme);
  }, [settings.theme]);

  const applyTheme = (theme) => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.style.setProperty("--bg-primary", "#1f2937");
      root.style.setProperty("--bg-secondary", "#374151");
      root.style.setProperty("--text-primary", "#f9fafb");
      root.style.setProperty("--text-secondary", "#d1d5db");
    } else if (theme === "auto") {
      // Check system preference
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (isDarkMode) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else {
      root.classList.remove("dark");
      root.style.removeProperty("--bg-primary");
      root.style.removeProperty("--bg-secondary");
      root.style.removeProperty("--text-primary");
      root.style.removeProperty("--text-secondary");
    }
  };

  const applyFontSize = (size) => {
    const root = document.documentElement;
    switch (size) {
      case "small":
        root.style.fontSize = "14px";
        break;
      case "medium":
        root.style.fontSize = "16px";
        break;
      case "large":
        root.style.fontSize = "18px";
        break;
      default:
        root.style.fontSize = "16px";
    }
  };

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSelectChange = (setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));

    // Apply changes immediately for certain settings
    if (setting === "theme") {
      applyTheme(value);
    }
    if (setting === "fontSize") {
      applyFontSize(value);
    }
  };

  const handleDataExport = () => {
    setSettings((prev) => ({ ...prev, dataExport: true }));

    // Simulate data export process
    setTimeout(() => {
      // Create and download a mock data file
      const data = {
        userData: {
          name: "User",
          email: "user@example.com",
          joined: new Date().toISOString(),
          courses: ["Web Development", "React Masterclass", "Python Basics"],
        },
        settings: settings,
        exportDate: new Date().toISOString(),
      };

      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `clc-learning-data-${new Date().getTime()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert("Your data has been exported successfully!");
      setSettings((prev) => ({ ...prev, dataExport: false }));
    }, 2000);
  };

  const handleTwoFactorAuth = () => {
    setSettings((prev) => ({ ...prev, twoFactorAuth: true }));

    // Simulate 2FA setup process
    setTimeout(() => {
      alert(
        "Two-Factor Authentication has been enabled successfully! You will receive a verification code on your registered email for future logins."
      );
    }, 1000);
  };

  const handleSaveSettings = () => {
    setIsSaving(true);

    // Save to localStorage
    localStorage.setItem("appSettings", JSON.stringify(settings));

    // Apply all settings
    applyTheme(settings.theme);
    applyFontSize(settings.fontSize);

    // Show notifications based on settings
    if (settings.emailNotifications) {
      console.log("Email notifications enabled");
    }
    if (settings.smsNotifications) {
      console.log("SMS notifications enabled");
    }
    if (settings.pushNotifications) {
      // Request browser notification permission
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    }

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully! All changes have been applied.");
      onBack();
    }, 1500);
  };

  const ThemeOption = ({ value, icon, label, currentTheme }) => (
    <button
      onClick={() => handleSelectChange("theme", value)}
      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
        currentTheme === value
          ? "border-purple-500 bg-purple-50 dark:bg-purple-900 dark:border-purple-400"
          : "border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500"
      }`}
    >
      {icon}
      <span className="font-medium text-gray-700 dark:text-gray-200">
        {label}
      </span>
      {currentTheme === value && (
        <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 ml-auto" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 mb-6 transition-all hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 dark:text-purple-200 mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Manage your account preferences and privacy settings
          </p>

          <div className="space-y-6">
            {/* Account Settings */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">
                Account Settings
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      Email Notifications
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive updates via email
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("emailNotifications")}
                    className={`w-12 h-6 rounded-full transition-all ${
                      settings.emailNotifications
                        ? "bg-purple-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <div
                      className={`bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform ${
                        settings.emailNotifications
                          ? "transform translate-x-7"
                          : "transform translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      SMS Notifications
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive updates via SMS
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("smsNotifications")}
                    className={`w-12 h-6 rounded-full transition-all ${
                      settings.smsNotifications
                        ? "bg-purple-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <div
                      className={`bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform ${
                        settings.smsNotifications
                          ? "transform translate-x-7"
                          : "transform translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      Push Notifications
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive browser notifications
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("pushNotifications")}
                    className={`w-12 h-6 rounded-full transition-all ${
                      settings.pushNotifications
                        ? "bg-purple-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <div
                      className={`bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform ${
                        settings.pushNotifications
                          ? "transform translate-x-7"
                          : "transform translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">
                Appearance
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 dark:text-gray-200 font-medium mb-2 block">
                    Theme
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <ThemeOption
                      value="light"
                      icon={<Sun className="w-5 h-5 text-yellow-500" />}
                      label="Light"
                      currentTheme={settings.theme}
                    />
                    <ThemeOption
                      value="dark"
                      icon={<Moon className="w-5 h-5 text-blue-400" />}
                      label="Dark"
                      currentTheme={settings.theme}
                    />
                    <ThemeOption
                      value="auto"
                      icon={<Monitor className="w-5 h-5 text-gray-500" />}
                      label="Auto"
                      currentTheme={settings.theme}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      Language
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Interface language
                    </p>
                  </div>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      handleSelectChange("language", e.target.value)
                    }
                    className="border border-purple-300 dark:border-purple-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="chinese">Chinese</option>
                  </select>
                </div>

                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      Font Size
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Text size preference
                    </p>
                  </div>
                  <select
                    value={settings.fontSize}
                    onChange={(e) =>
                      handleSelectChange("fontSize", e.target.value)
                    }
                    className="border border-purple-300 dark:border-purple-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">
                Privacy & Security
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      Two-Factor Authentication
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Extra security for your account
                    </p>
                  </div>
                  <button
                    onClick={handleTwoFactorAuth}
                    disabled={settings.twoFactorAuth}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      settings.twoFactorAuth
                        ? "bg-green-600 text-white cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    {settings.twoFactorAuth ? "Enabled" : "Enable"}
                  </button>
                </div>

                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      Data Export
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Download your personal data
                    </p>
                  </div>
                  <button
                    onClick={handleDataExport}
                    disabled={settings.dataExport}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                      settings.dataExport
                        ? "bg-green-600 text-white cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {settings.dataExport ? "Exporting..." : "Export Data"}
                  </button>
                </div>

                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      Auto Logout
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Log out after 30 minutes of inactivity
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("autoLogout")}
                    className={`w-12 h-6 rounded-full transition-all ${
                      settings.autoLogout
                        ? "bg-purple-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <div
                      className={`bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform ${
                        settings.autoLogout
                          ? "transform translate-x-7"
                          : "transform translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      Course Updates
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      New content and announcements
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("courseUpdates")}
                    className={`w-12 h-6 rounded-full transition-all ${
                      settings.courseUpdates
                        ? "bg-purple-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <div
                      className={`bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform ${
                        settings.courseUpdates
                          ? "transform translate-x-7"
                          : "transform translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      Live Class Reminders
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Upcoming live sessions
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("liveClassReminders")}
                    className={`w-12 h-6 rounded-full transition-all ${
                      settings.liveClassReminders
                        ? "bg-purple-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <div
                      className={`bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform ${
                        settings.liveClassReminders
                          ? "transform translate-x-7"
                          : "transform translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Save Settings Button */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={onBack}
              className="px-6 py-3 border border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
