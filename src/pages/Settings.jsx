import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../components/LanguageContext";
import { translations } from "../components/Translatation";
import { ArrowLeft, Check, Download, Moon, Sun, Monitor, Save } from "lucide-react";

const Settings = ({ onBack }) => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const t = translations[language];

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    theme: "light",
    language: "english",
    fontSize: "medium",
    twoFactorAuth: false,
    dataExport: false,
    autoLogout: true,
    showOnlineStatus: true,
    courseUpdates: true,
    liveClassReminders: true,
    assignmentDeadlines: true,
    promotionalEmails: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  // Load settings from localStorage
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
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
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
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleSelectChange = (setting, value) => {
    setSettings((prev) => ({ ...prev, [setting]: value }));
    if (setting === "theme") applyTheme(value);
    if (setting === "fontSize") applyFontSize(value);
  };

  const handleDataExport = () => {
    setSettings((prev) => ({ ...prev, dataExport: true }));
    setTimeout(() => {
      const data = {
        userData: { name: "User", email: "user@example.com", joined: new Date().toISOString(), courses: ["Web Development", "React Masterclass", "Python Basics"] },
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

      alert(t.dataExported);
      setSettings((prev) => ({ ...prev, dataExport: false }));
    }, 2000);
  };

  const handleTwoFactorAuth = () => {
    setSettings((prev) => ({ ...prev, twoFactorAuth: true }));
    setTimeout(() => {
      alert(t.twoFactorEnabled);
    }, 1000);
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    localStorage.setItem("appSettings", JSON.stringify(settings));
    applyTheme(settings.theme);
    applyFontSize(settings.fontSize);

    setTimeout(() => {
      setIsSaving(false);
      alert(t.settingsSaved);
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
      <span className="font-medium text-gray-700 dark:text-gray-200">{label}</span>
      {currentTheme === value && <Check className="w-5 h-5 text-purple-600 dark:text-purple-400 ml-auto" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 mb-6 transition-all hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> {t.backToHome}
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 dark:text-purple-200 mb-2">{t.settings}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{t.settingsDescription}</p>

          <div className="space-y-6">
            {/* Account Settings */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">{t.accountSettings}</h2>
              <div className="space-y-4">
                {["emailNotifications", "smsNotifications", "pushNotifications"].map((key) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <div>
                      <span className="text-gray-700 dark:text-gray-200 font-medium">{t[key]}</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t[key + "Description"]}</p>
                    </div>
                    <button
                      onClick={() => handleToggle(key)}
                      className={`w-12 h-6 rounded-full transition-all ${
                        settings[key] ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <div
                        className={`bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform ${
                          settings[key] ? "transform translate-x-7" : "transform translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Appearance */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">{t.appearance}</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-700 dark:text-gray-200 font-medium mb-2 block">{t.theme}</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <ThemeOption value="light" icon={<Sun className="w-5 h-5 text-yellow-500" />} label={t.light} currentTheme={settings.theme} />
                    <ThemeOption value="dark" icon={<Moon className="w-5 h-5 text-blue-400" />} label={t.dark} currentTheme={settings.theme} />
                    <ThemeOption value="auto" icon={<Monitor className="w-5 h-5 text-gray-500" />} label={t.auto} currentTheme={settings.theme} />
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{t.language}</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.languageDescription}</p>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="border border-purple-300 dark:border-purple-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200"
                  >
                    <option value="english">English</option>
                    <option value="khmer">Khmer</option>
                    <option value="chinese">Chinese</option>
                    <option value="spanish">Spanish</option>
                    {/* <option value="german">Khmer</option> */}
                    
                  </select>
                </div>

                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{t.fontSize}</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.fontSizeDescription}</p>
                  </div>
                  <select
                    value={settings.fontSize}
                    onChange={(e) => handleSelectChange("fontSize", e.target.value)}
                    className="border border-purple-300 dark:border-purple-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200"
                  >
                    <option value="small">{t.small}</option>
                    <option value="medium">{t.medium}</option>
                    <option value="large">{t.large}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">{t.privacySecurity}</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{t.twoFactorAuth}</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.twoFactorAuthDescription}</p>
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
                    {settings.twoFactorAuth ? t.enabled : t.enable}
                  </button>
                </div>

                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{t.dataExport}</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.dataExportDescription}</p>
                  </div>
                  <button
                    onClick={handleDataExport}
                    disabled={settings.dataExport}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                      settings.dataExport ? "bg-green-600 text-white cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {settings.dataExport ? t.exporting : t.exportData}
                  </button>
                </div>

                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{t.autoLogout}</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.autoLogoutDescription}</p>
                  </div>
                  <button
                    onClick={() => handleToggle("autoLogout")}
                    className={`w-12 h-6 rounded-full transition-all ${settings.autoLogout ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"}`}
                  >
                    <div className={`bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform ${settings.autoLogout ? "transform translate-x-7" : "transform translate-x-1"}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">{t.notificationPreferences}</h2>
              <div className="space-y-4">
                {["courseUpdates", "liveClassReminders"].map((key) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <div>
                      <span className="text-gray-700 dark:text-gray-200 font-medium">{t[key]}</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t[key + "Description"]}</p>
                    </div>
                    <button
                      onClick={() => handleToggle(key)}
                      className={`w-12 h-6 rounded-full transition-all ${settings[key] ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"}`}
                    >
                      <div className={`bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform ${settings[key] ? "transform translate-x-7" : "transform translate-x-1"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Save Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={onBack}
              className="px-6 py-3 border border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all"
            >
              {t.cancel}
            </button>
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? t.saving : t.saveSettings}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
