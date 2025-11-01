import React, { useState } from "react";
import {
  X,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
} from "lucide-react";

const AuthForms = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    birthDate: "",
    gender: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveUserDataToStorage = (userData) => {
    // Save user profile data
    localStorage.setItem("userProfile", JSON.stringify(userData));

    // Initialize user courses if not exists
    if (!localStorage.getItem("userCourses")) {
      const defaultCourses = [
        "Web Development Fundamentals",
        "React Masterclass",
        "Python Basics",
      ];
      localStorage.setItem("userCourses", JSON.stringify(defaultCourses));
    }

    // Initialize user progress if not exists
    if (!localStorage.getItem("userProgress")) {
      const defaultProgress = {
        completedLessons: 15,
        totalLessons: 45,
        averageScore: 85,
        certificates: 2,
        totalStudyHours: Math.floor(Math.random() * 100) + 10,
        lastActive: new Date().toISOString(),
      };
      localStorage.setItem("userProgress", JSON.stringify(defaultProgress));
    }

    // Initialize learning history
    if (!localStorage.getItem("learningHistory")) {
      const learningHistory = {
        accountCreated: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        totalLogins: 1,
        achievements: [
          "Fast Learner Badge",
          "Course Completer",
          "Active Student",
        ],
      };
      localStorage.setItem("learningHistory", JSON.stringify(learningHistory));
    } else {
      // Update last login and increment login count
      const existingHistory = JSON.parse(
        localStorage.getItem("learningHistory")
      );
      const updatedHistory = {
        ...existingHistory,
        lastLogin: new Date().toISOString(),
        totalLogins: (existingHistory.totalLogins || 0) + 1,
      };
      localStorage.setItem("learningHistory", JSON.stringify(updatedHistory));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let userData;

    if (isLogin) {
      // Mock login - in real app, you'd call your API
      userData = {
        fullName: "Demo User",
        email: formData.email,
        phone: "+855123456789",
        birthDate: "1995-05-15",
        gender: "Female",
        profilePicture: "",
        joined: new Date().toISOString(),
      };
    } else {
      // Mock signup - use actual form data
      userData = {
        fullName: formData.fullName || "New User",
        email: formData.email,
        phone: formData.phone || "+855000000000",
        birthDate: formData.birthDate || "2000-01-01",
        gender: formData.gender || "Prefer not to say",
        profilePicture: "",
        joined: new Date().toISOString(),
      };
    }

    // Save user data to localStorage for export
    saveUserDataToStorage(userData);

    onLoginSuccess(userData);
    onClose();
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      phone: "",
      birthDate: "",
      gender: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="p-6 border-b border-gray-200 shrink-0">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h2 className="text-2xl font-bold text-[#004F70]">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-gray-600 mt-2">
                {isLogin
                  ? "Sign in to your account"
                  : "Join our learning community"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#004F70] hover:text-[#003d56] transition-colors ml-4"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name - Only for Sign Up */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-[#004F70] mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-[#004F70] focus:border-transparent"
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#004F70] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-[#004F70] focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-[#004F70] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="w-full pl-10 pr-12 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-[#004F70] focus:border-transparent"
                    placeholder="Enter your password"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#004F70]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Additional Fields for Sign Up */}
              {!isLogin && (
                <>
                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-[#004F70] mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-[#004F70] focus:border-transparent"
                        placeholder="+855 123 456 789"
                      />
                    </div>
                  </div>

                  {/* Birth Date */}
                  <div>
                    <label className="block text-sm font-medium text-[#004F70] mb-2">
                      Birth Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) =>
                          handleInputChange("birthDate", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-[#004F70] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-[#004F70] mb-2">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-[#004F70] focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#004F70] text-white py-3 rounded-lg hover:bg-[#003d56] transition-all font-medium hover:scale-105 active:scale-95"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            {/* Switch Mode */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={switchMode}
                  className="text-[#004F70] hover:text-[#003d56] font-medium"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;
