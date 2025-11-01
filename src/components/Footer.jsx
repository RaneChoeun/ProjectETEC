import React from "react";
import { Facebook, MessageCircle, Mail, ExternalLink } from "lucide-react";
import Logo from "./Logo";

const Footer = ({ onAboutUs, onTermsConditions, onSettings }) => {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (platform) => {
    // You can replace these with your actual social media links
    const socialLinks = {
      facebook: "https://facebook.com/yourpage",
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
    <footer className="bg-[#004F70] text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Logo />
            </div>
            <p className="text-white/90 mb-4 leading-relaxed">
              Empowering learners through quality education. Join thousands of
              students who have transformed their careers with our expert-led
              courses and live classes.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <button
                onClick={() => handleSocialClick("facebook")}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-5 h-5 text-white group-hover:text-blue-100" />
              </button>

              {/* TikTok */}
              <button
                onClick={() => handleSocialClick("tiktok")}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                aria-label="Visit our TikTok profile"
              >
                <MessageCircle className="w-5 h-5 text-white group-hover:text-pink-100" />
              </button>

              {/* Telegram */}
              <button
                onClick={() => handleSocialClick("telegram")}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                aria-label="Join our Telegram channel"
              >
                <Mail className="w-5 h-5 text-white group-hover:text-blue-100" />
              </button>

              {/* Email */}
              <button
                onClick={() => handleSocialClick("email")}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                aria-label="Send us an email"
              >
                <Mail className="w-5 h-5 text-white group-hover:text-red-100" />
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
                  className="text-white/90 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <ExternalLink className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick(onTermsConditions)}
                  className="text-white/90 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <ExternalLink className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick(onSettings)}
                  className="text-white/90 hover:text-white transition-colors duration-300 flex items-center group"
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
            <div className="space-y-3 text-white/90">
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                contact@clclearning.com
              </p>
              <p>📍 Phnom Penh, Cambodia</p>
              <p>🕒 Mon - Fri: 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-sm mb-4 md:mb-0">
              &copy; {currentYear} CLC Learning. All rights reserved.
            </p>
            <p className="text-white/90 text-sm flex items-center">
              <span className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></span>
              Empowering learners through quality education
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
