import React from "react";
import { ArrowLeft } from "lucide-react";

const Features = ({ onBack }) => {
  const features = [
    {
      icon: "📱",
      title: "Mobile App",
      description: "Learn on the go with our mobile application",
    },
    {
      icon: "📚",
      title: "Offline Access",
      description: "Download courses and learn without internet",
    },
    {
      icon: "📊",
      title: "Advanced Analytics",
      description: "Track your progress with detailed insights",
    },
    {
      icon: "👥",
      title: "Community Features",
      description: "Connect with other learners and mentors",
    },
    {
      icon: "🏆",
      title: "Achievement System",
      description: "Earn badges and certificates for your progress",
    },
    {
      icon: "💼",
      title: "Career Services",
      description: "Get help with job placement and career growth",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-purple-700 hover:text-purple-900 mb-6 transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">
            Platform Features
          </h1>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-purple-50 rounded-xl p-6 text-center"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-purple-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-purple-100 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-700">
              We're constantly working on new features to enhance your learning
              experience. Stay tuned for AI-powered coding assistance, live
              project collaborations, and personalized learning paths!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
