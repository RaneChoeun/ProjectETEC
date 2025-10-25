import React from "react";
import { ExternalLink } from "lucide-react";
import { FaFacebookF, FaTiktok, FaTelegramPlane, FaEnvelope } from "react-icons/fa";
import Logo from "./Logo";
//3 run when user click onAboutUs, onTermCondition, onSetting
const Footer = ({ onAboutUs, onTermsConditions, onSettings }) => {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (platform) => {
    const socialLinks = {
      facebook: "https://web.facebook.com/?_rdc=1&_rdr#",
      tiktok: "https://tiktok.com/@yourprofile",
      telegram: "https://t.me/yourchannel",
      email: "mailto:contact@clclearning.com",
    };

    window.open(socialLinks[platform], "_blank");
  };

  const handleLinkClick = (action) => {
    if (action) {
      action();
    }
  };

  return (
    <footer className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              {/* <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-purple-800 font-bold text-lg">CLC</span>
              </div>
              <h3 className="text-2xl font-bold">CLC Learning</h3> */}
              <Logo />
            </div>
            <p className="text-purple-200 mb-4 leading-relaxed">
              Empowering learners through quality education. Join thousands of
              students who have transformed their careers with our expert-led
              courses and live classes.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <button
                onClick={() => handleSocialClick("facebook")}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                aria-label="Visit our Facebook page"
              >
                <FaFacebookF className="w-5 h-5 text-white group-hover:text-blue-400" />
              </button>

              {/* TikTok */}
              <button
                onClick={() => handleSocialClick("tiktok")}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                aria-label="Visit our TikTok profile"
              >
                <FaTiktok className="w-5 h-5 text-white group-hover:text-pink-500" />
              </button>

              {/* Telegram */}
              <button
                onClick={() => handleSocialClick("telegram")}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                aria-label="Join our Telegram channel"
              >
                <FaTelegramPlane className="w-5 h-5 text-white group-hover:text-blue-500" />
              </button>

              {/* Email */}
              <button
                onClick={() => handleSocialClick("email")}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                aria-label="Send us an email"
              >
                <FaEnvelope className="w-5 h-5 text-white group-hover:text-red-400" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleLinkClick(onAboutUs)}
                  className="text-purple-200 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <ExternalLink className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick(onTermsConditions)}
                  className="text-purple-200 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <ExternalLink className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick(onSettings)}
                  className="text-purple-200 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <ExternalLink className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Settings
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Contact Info
            </h4>
            <div className="space-y-3 text-purple-200">
              <p className="flex items-center">
                <FaEnvelope className="w-4 h-4 mr-2" />
                contact@clclearning.com
              </p>
              <p>📍 Phnom Penh, Cambodia</p>
              <p>🕒 Mon - Fri: 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-300 text-sm mb-4 md:mb-0">
              &copy; {currentYear} CLC Learning. All rights reserved.
            </p>
            <p className="text-purple-200 text-sm flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Empowering learners through quality education
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
