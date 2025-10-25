import React, { useState } from "react";
import {
  //icon
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
  //prop passed from parent component
  //isOpen:shows or hides the modal.
  //onClose: function to close the popup.
  //onLoginSuccess: function triggered when login or signup succeeds.

  const [isLogin, setIsLogin] = useState(true); 
  const [showPassword, setShowPassword] = useState(false);//
  const [formData, setFormData] = useState({
    //stores input data like
    fullName: "",
    email: "",
    password: "",
    phone: "",
    birthDate: "",
    gender: "",
  });
 //update the form data whenever a user types or changes SO
  const handleInputChange = (field, value) => {
    //field : the name of the form 
    //value: what the user typed in the input box
    setFormData((prev) => ({//update React state
      // take previous form data(prev) and copy in ...pre
      ...prev,//keep old data safe
      //and replace just one field with the new value
      
      [field]: value,
      //dynamic key
      //it change only field we update
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //no reload page when you submit a form

    let userData;

    if (isLogin) {
      // Mock login - in real app, you'd call your API
      // fake user account just for testing 
      userData = {
        fullName: "Demo User",
        email: formData.email,// real input during login
        phone: "+855123456789",
        birthDate: "1995-05-15",
        gender: "Female",
        profilePicture:
          "https://i.pinimg.com/736x/85/77/80/8577804deccd8993f0b397632441b656.jpg",
      };
    } else {
      // Mock signup - use actual form data
      userData = {
        fullName: formData.fullName || "New User",
        email: formData.email,
        phone: formData.phone || "+855000000000",
        birthDate: formData.birthDate || "2000-01-01",
        gender: formData.gender || "Prefer not to say",
        profilePicture:
          "https://i.pinimg.com/736x/85/77/80/8577804deccd8993f0b397632441b656.jpg",
      };
    }

    onLoginSuccess(userData);// passed from the parent component
    // Tell parent login/sign up worked
    onClose();//close login/signup after submit
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-700 hover:text-purple-900 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-purple-700">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin
              ? "Sign in to your account"
              : "Join our learning community"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name - Only for Sign Up */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2">
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
                  className="w-full pl-10 pr-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                placeholder="Enter your email"
                required //must fill
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                placeholder="Enter your password"
                required
                minLength="6"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600"
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
                <label className="block text-sm font-medium text-purple-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    placeholder="+855 123 456 789"
                  />
                </div>
              </div>

              {/* Birth Date */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">
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
                    className="w-full pl-10 pr-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all font-medium hover:scale-105 active:scale-95"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Switch Mode */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={switchMode}
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;
