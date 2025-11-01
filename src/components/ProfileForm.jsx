import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Edit,
  Save,
  Camera,
  User,
  BookOpen,
  Users,
  ChevronRight,
  PlayCircle,
  Clock,
  CheckCircle,
  Zap,
  Video,
  Menu,
} from "lucide-react";
import AuthForms from "./AuthForms";

const ProfileForm = ({ userData, onClose, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState("courses");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    gender: "",
    birthDate: "",
    phone: "",
    profilePicture: "",
  });
  const [learningData, setLearningData] = useState({
    purchasedCourses: [],
    registeredLiveClasses: [],
  });

  const fileInputRef = useRef(null);

  // Check if user is authenticated
  const isAuthenticated = () => {
    return userData !== null && userData !== undefined;
  };

  // Get user's learning data from localStorage or DOM
  const getUserLearningData = () => {
    if (!isAuthenticated()) {
      return { purchasedCourses: [], registeredLiveClasses: [] };
    }

    try {
      // Get from localStorage (persists across sessions)
      let purchasedCourses = JSON.parse(
        localStorage.getItem("userPurchasedCourses") || "[]"
      );
      let registeredLiveClasses = JSON.parse(
        localStorage.getItem("userRegisteredLiveClasses") || "[]"
      );

      // If localStorage is empty, try to get from the current page DOM
      if (purchasedCourses.length === 0) {
        purchasedCourses = getCoursesFromDOM();
      }
      if (registeredLiveClasses.length === 0) {
        registeredLiveClasses = getLiveClassesFromDOM();
      }

      return { purchasedCourses, registeredLiveClasses };
    } catch (error) {
      console.error("Error loading user learning data:", error);
      return { purchasedCourses: [], registeredLiveClasses: [] };
    }
  };

  // Get courses from DOM by looking for course elements
  const getCoursesFromDOM = () => {
    const courses = [];

    // Method 1: Look for course cards in the DOM
    const courseElements = document.querySelectorAll(
      [
        "[data-course]",
        '[class*="course"]',
        '[class*="Course"]',
        ".course-card",
        ".course-item",
        ".purchased-course",
      ].join(",")
    );

    courseElements.forEach((element) => {
      const title =
        element.getAttribute("data-course-title") ||
        element.querySelector("h1, h2, h3, h4, h5, h6")?.textContent ||
        element.textContent;
      if (title && !courses.includes(title)) {
        courses.push(title.trim());
      }
    });

    // Method 2: Check for any elements with course data
    const courseDataElements = document.querySelectorAll("[data-course-id]");
    courseDataElements.forEach((element) => {
      const title =
        element.getAttribute("data-course-title") || element.textContent;
      if (title && !courses.includes(title)) {
        courses.push(title.trim());
      }
    });

    // Method 3: Look for purchase buttons that indicate ownership
    const purchaseButtons = document.querySelectorAll(
      [
        '[data-purchased="true"]',
        '[class*="purchased"]',
        ".enrolled",
        ".owned",
      ].join(",")
    );

    purchaseButtons.forEach((button) => {
      const courseTitle =
        button.closest("[data-course]")?.getAttribute("data-course-title") ||
        button.closest(".course-card")?.querySelector("h1, h2, h3, h4, h5, h6")
          ?.textContent;
      if (courseTitle && !courses.includes(courseTitle)) {
        courses.push(courseTitle.trim());
      }
    });

    return courses.slice(0, 10); // Limit to 10 courses
  };

  // Get live classes from DOM
  const getLiveClassesFromDOM = () => {
    const liveClasses = [];

    // Method 1: Look for live class elements
    const liveClassElements = document.querySelectorAll(
      [
        "[data-live-class]",
        '[class*="live"]',
        '[class*="Live"]',
        ".live-class",
        ".webinar",
        ".workshop",
      ].join(",")
    );

    liveClassElements.forEach((element) => {
      const title =
        element.getAttribute("data-live-class-title") ||
        element.querySelector("h1, h2, h3, h4, h5, h6")?.textContent ||
        element.textContent;
      if (title && !liveClasses.includes(title)) {
        liveClasses.push(title.trim());
      }
    });

    // Method 2: Look for registered/joined classes
    const registeredElements = document.querySelectorAll(
      [
        '[data-registered="true"]',
        '[class*="registered"]',
        '[class*="joined"]',
        ".enrolled",
      ].join(",")
    );

    registeredElements.forEach((element) => {
      const classTitle =
        element
          .closest("[data-live-class]")
          ?.getAttribute("data-live-class-title") ||
        element.closest(".live-class")?.querySelector("h1, h2, h3, h4, h5, h6")
          ?.textContent;
      if (classTitle && !liveClasses.includes(classTitle)) {
        liveClasses.push(classTitle.trim());
      }
    });

    return liveClasses.slice(0, 10); // Limit to 10 live classes
  };

  // Get course progress from localStorage
  const getCourseProgress = (courseTitle) => {
    try {
      const progressData = JSON.parse(
        localStorage.getItem("userCourseProgress") || "{}"
      );
      return (
        progressData[courseTitle] || {
          progress: Math.floor(Math.random() * 100),
          completedLessons: Math.floor(Math.random() * 10),
          totalLessons: 10,
        }
      );
    } catch (error) {
      return {
        progress: Math.floor(Math.random() * 100),
        completedLessons: Math.floor(Math.random() * 10),
        totalLessons: 10,
      };
    }
  };

  // Get live class schedule
  const getLiveClassSchedule = (classTitle) => {
    // Generate realistic schedule data
    const daysFromNow = Math.floor(Math.random() * 14);
    const classDate = new Date();
    classDate.setDate(classDate.getDate() + daysFromNow);

    const hours = 9 + Math.floor(Math.random() * 8); // Between 9 AM and 5 PM
    const minutes = Math.random() > 0.5 ? 0 : 30;

    const status =
      daysFromNow === 0
        ? "live now"
        : daysFromNow < 0
        ? "completed"
        : "upcoming";

    return {
      date: classDate.toISOString().split("T")[0],
      time: `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`,
      status: status,
    };
  };

  // Simulate purchasing a course (call this when user buys a course)
  const simulateCoursePurchase = (courseTitle) => {
    const currentCourses = JSON.parse(
      localStorage.getItem("userPurchasedCourses") || "[]"
    );
    if (!currentCourses.includes(courseTitle)) {
      currentCourses.push(courseTitle);
      localStorage.setItem(
        "userPurchasedCourses",
        JSON.stringify(currentCourses)
      );
      setLearningData((prev) => ({
        ...prev,
        purchasedCourses: currentCourses,
      }));
    }
  };

  // Simulate registering for a live class (call this when user registers)
  const simulateLiveClassRegistration = (classTitle) => {
    const currentClasses = JSON.parse(
      localStorage.getItem("userRegisteredLiveClasses") || "[]"
    );
    if (!currentClasses.includes(classTitle)) {
      currentClasses.push(classTitle);
      localStorage.setItem(
        "userRegisteredLiveClasses",
        JSON.stringify(currentClasses)
      );
      setLearningData((prev) => ({
        ...prev,
        registeredLiveClasses: currentClasses,
      }));
    }
  };

  // Update course progress
  const updateCourseProgress = (courseTitle, progress) => {
    const progressData = JSON.parse(
      localStorage.getItem("userCourseProgress") || "{}"
    );
    progressData[courseTitle] = progress;
    localStorage.setItem("userCourseProgress", JSON.stringify(progressData));
  };

  useEffect(() => {
    if (userData) {
      setProfileData({
        fullName: userData.fullName || "Men Chhorvy",
        gender: userData.gender || "",
        birthDate: userData.birthDate || "",
        phone: userData.phone || "",
        profilePicture: userData.profilePicture || "",
      });

      // Load learning data
      const { purchasedCourses, registeredLiveClasses } = getUserLearningData();
      setLearningData({
        purchasedCourses,
        registeredLiveClasses,
      });
    }
  }, [userData]);

  const handleEditProfile = () => setIsEditing(true);

  const handleSaveProfile = () => {
    if (onUpdateProfile) {
      onUpdateProfile(profileData);
    }

    // Save to localStorage as well
    localStorage.setItem("userProfile", JSON.stringify(profileData));

    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    if (userData) {
      setProfileData({
        fullName: userData.fullName || "Men Chhorvy",
        gender: userData.gender || "",
        birthDate: userData.birthDate || "",
        phone: userData.phone || "",
        profilePicture: userData.profilePicture || "",
      });
    }
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProfilePictureChange = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, etc.)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image smaller than 5MB");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({
        ...prev,
        profilePicture: imageUrl,
      }));

      // Save to localStorage
      const profile = JSON.parse(localStorage.getItem("userProfile") || "{}");
      profile.profilePicture = imageUrl;
      localStorage.setItem("userProfile", JSON.stringify(profile));
    }
  };

  const handleRemoveProfilePicture = () => {
    setProfileData((prev) => ({
      ...prev,
      profilePicture: "",
    }));

    // Remove from localStorage
    const profile = JSON.parse(localStorage.getItem("userProfile") || "{}");
    delete profile.profilePicture;
    localStorage.setItem("userProfile", JSON.stringify(profile));
  };

  const handleLoginSuccess = (userData) => {
    setShowAuthModal(false);
    // Reload learning data after login
    const { purchasedCourses, registeredLiveClasses } = getUserLearningData();
    setLearningData({
      purchasedCourses,
      registeredLiveClasses,
    });
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleContinueCourse = (courseTitle) => {
    // Update progress when continuing a course
    const currentProgress = getCourseProgress(courseTitle);
    const newProgress = Math.min(100, currentProgress.progress + 10);
    const newCompletedLessons = Math.min(
      10,
      currentProgress.completedLessons + 1
    );

    updateCourseProgress(courseTitle, {
      progress: newProgress,
      completedLessons: newCompletedLessons,
      totalLessons: 10,
    });

    alert(`Continuing with ${courseTitle} - Progress: ${newProgress}%`);
    // Refresh the learning data to show updated progress
    const { purchasedCourses, registeredLiveClasses } = getUserLearningData();
    setLearningData({
      purchasedCourses,
      registeredLiveClasses,
    });
  };

  const handleJoinLiveClass = (classTitle) => {
    const schedule = getLiveClassSchedule(classTitle);
    if (schedule.status === "completed") {
      alert(`This live class "${classTitle}" has already been completed.`);
    } else if (schedule.status === "live now") {
      alert(`Joining live class: ${classTitle}`);
      // Mark as completed after joining
      setTimeout(() => {
        const schedule = getLiveClassSchedule(classTitle);
        schedule.status = "completed";
        alert(`Live class "${classTitle}" marked as completed!`);
      }, 1000);
    } else {
      alert(
        `Live class "${classTitle}" is scheduled for ${schedule.date} at ${schedule.time}`
      );
    }
  };

  // Add demo data button for testing
  const addDemoData = () => {
    const demoCourses = [
      "React Fundamentals Course",
      "JavaScript Masterclass",
      "Web Development Bootcamp",
      "Python for Beginners",
      "Advanced CSS Techniques",
    ];

    const demoLiveClasses = [
      "Live React Workshop",
      "JavaScript Q&A Session",
      "Web Development Career Talk",
      "Python Data Analysis Live",
      "CSS Grid Live Tutorial",
    ];

    localStorage.setItem("userPurchasedCourses", JSON.stringify(demoCourses));
    localStorage.setItem(
      "userRegisteredLiveClasses",
      JSON.stringify(demoLiveClasses)
    );

    setLearningData({
      purchasedCourses: demoCourses,
      registeredLiveClasses: demoLiveClasses,
    });

    alert("Demo learning data added!");
  };

  const { purchasedCourses, registeredLiveClasses } = learningData;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-[#004F70]">
              Your Profile
            </h2>
            <div className="flex items-center gap-2">
              {!isEditing && isAuthenticated() && (
                <button
                  onClick={handleEditProfile}
                  className="hidden md:flex items-center text-[#004F70] hover:text-[#003d56] font-medium transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </button>
              )}
              <button
                onClick={onClose}
                className="text-[#004F70] hover:text-[#003d56] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Profile Info */}
            <div className="lg:w-1/3">
              {/* Mobile Menu Button */}
              {isAuthenticated() && !isEditing && (
                <div className="lg:hidden mb-4">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-full flex items-center justify-between bg-[#004F70] text-white px-4 py-3 rounded-lg"
                  >
                    <span className="font-medium">
                      {activeTab === "courses" ? "My Courses" : "Live Classes"}
                    </span>
                    <Menu className="w-5 h-5" />
                  </button>

                  {/* Mobile Menu Dropdown */}
                  {isMobileMenuOpen && (
                    <div className="absolute left-4 right-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                      <button
                        onClick={() => {
                          setActiveTab("courses");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 border-b border-gray-100 ${
                          activeTab === "courses"
                            ? "bg-[#004F70] text-white"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Purchased Courses ({purchasedCourses.length})
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("liveClasses");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 ${
                          activeTab === "liveClasses"
                            ? "bg-red-500 text-white"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Live Classes ({registeredLiveClasses.length})
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-4 border-white bg-gray-100 mb-3 flex items-center justify-center">
                    {profileData.profilePicture ? (
                      <img
                        src={profileData.profilePicture}
                        alt="Profile"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <User className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />
                    )}
                    {isEditing && (
                      <button
                        onClick={handleProfilePictureChange}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                      >
                        <Camera className="w-4 h-4 md:w-6 md:h-6 text-white" />
                      </button>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={handleProfilePictureChange}
                        className="text-sm text-[#004F70] hover:text-[#003d56] font-medium transition-colors"
                      >
                        {profileData.profilePicture
                          ? "Change Photo"
                          : "Add Photo"}
                      </button>
                      {profileData.profilePicture && (
                        <button
                          onClick={handleRemoveProfilePicture}
                          className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Learning Stats */}
              {isAuthenticated() && !isEditing && (
                <div className="bg-linear-to-br from-[#004F70] to-[#003d56] text-white rounded-xl p-4 mb-6">
                  <h4 className="font-semibold mb-3 text-sm md:text-base">
                    Your Learning Journey
                  </h4>
                  <div className="space-y-2 text-xs md:text-sm">
                    <div className="flex justify-between">
                      <span>Courses Purchased:</span>
                      <span className="font-bold">
                        {purchasedCourses.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Live Classes:</span>
                      <span className="font-bold">
                        {registeredLiveClasses.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Learning:</span>
                      <span className="font-bold">
                        {purchasedCourses.length + registeredLiveClasses.length}
                      </span>
                    </div>
                  </div>

                  {/* Demo Data Button */}
                  {purchasedCourses.length === 0 &&
                    registeredLiveClasses.length === 0 && (
                      <button
                        onClick={addDemoData}
                        className="w-full mt-3 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-all font-medium text-sm"
                      >
                        Add Demo Learning Data
                      </button>
                    )}
                </div>
              )}

              {/* Quick Action Buttons */}
              {isAuthenticated() && !isEditing && (
                <div className="space-y-3 mb-6">
                  <Link
                    to="/course"
                    onClick={onClose}
                    className="flex items-center justify-between w-full bg-linear-to-r from-[#004F70] to-[#003d56] text-white px-3 py-2 md:px-4 md:py-3 rounded-lg hover:shadow-lg transition-all font-medium group text-sm md:text-base"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Browse More Courses</span>
                    </div>
                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/course?type=live"
                    onClick={onClose}
                    className="flex items-center justify-between w-full bg-linear-to-r from-red-500 to-red-600 text-white px-3 py-2 md:px-4 md:py-3 rounded-lg hover:shadow-lg transition-all font-medium group text-sm md:text-base"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <Users className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Find Live Classes</span>
                    </div>
                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}

              {/* Profile Information */}
              <div className="space-y-3 md:space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-[#004F70] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    readOnly={!isEditing}
                    className={`w-full p-2 md:p-3 border rounded-lg transition-all text-sm md:text-base ${
                      isEditing
                        ? "border-blue-300 bg-white text-gray-800 focus:ring-2 focus:ring-[#004F70] focus:border-transparent"
                        : "border-blue-300 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-[#004F70] mb-1">
                    Gender
                  </label>
                  {isEditing ? (
                    <select
                      value={profileData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full p-2 md:p-3 border border-blue-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-[#004F70] focus:border-transparent transition-all text-sm md:text-base"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={profileData.gender || "Not specified"}
                      readOnly
                      className="w-full p-2 md:p-3 border border-blue-300 rounded-lg bg-gray-50 text-gray-600 text-sm md:text-base"
                    />
                  )}
                </div>

                {/* Birth Date */}
                <div>
                  <label className="block text-sm font-medium text-[#004F70] mb-1">
                    Birth Date
                  </label>
                  <input
                    type={isEditing ? "date" : "text"}
                    value={
                      isEditing
                        ? profileData.birthDate
                        : profileData.birthDate || "Not specified"
                    }
                    onChange={(e) =>
                      handleInputChange("birthDate", e.target.value)
                    }
                    readOnly={!isEditing}
                    className={`w-full p-2 md:p-3 border rounded-lg transition-all text-sm md:text-base ${
                      isEditing
                        ? "border-blue-300 bg-white text-gray-800 focus:ring-2 focus:ring-[#004F70] focus:border-transparent"
                        : "border-blue-300 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-[#004F70] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    readOnly={!isEditing}
                    className={`w-full p-2 md:p-3 border rounded-lg transition-all text-sm md:text-base ${
                      isEditing
                        ? "border-blue-300 bg-white text-gray-800 focus:ring-2 focus:ring-[#004F70] focus:border-transparent"
                        : "border-blue-300 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>

                {/* Email (Read-only) */}
                {userData?.email && (
                  <div>
                    <label className="block text-sm font-medium text-[#004F70] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userData.email}
                      readOnly
                      className="w-full p-2 md:p-3 border border-blue-300 rounded-lg bg-gray-50 text-gray-600 text-sm md:text-base"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div
                  className={`flex gap-2 md:gap-3 pt-3 md:pt-4 ${
                    isEditing ? "justify-between" : "justify-center"
                  }`}
                >
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 bg-gray-500 text-white py-2 md:py-3 rounded-lg hover:bg-gray-600 transition-all font-medium hover:scale-105 active:scale-95 text-sm md:text-base"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="flex-1 bg-[#004F70] text-white py-2 md:py-3 rounded-lg hover:bg-[#003d56] transition-all font-medium flex items-center justify-center hover:scale-105 active:scale-95 text-sm md:text-base"
                      >
                        <Save className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />{" "}
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={onClose}
                      className="bg-[#004F70] text-white py-2 md:py-3 px-6 md:px-8 rounded-lg hover:bg-[#003d56] transition-all font-medium hover:scale-105 active:scale-95 text-sm md:text-base"
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - My Learning */}
            {isAuthenticated() && !isEditing && (
              <div className="lg:w-2/3 bg-gray-50 rounded-xl p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-[#004F70] mb-4 md:mb-6">
                  Your Learning Journey
                </h3>

                {/* Tabs */}
                <div className="hidden lg:flex border-b border-gray-200 mb-4 md:mb-6">
                  <button
                    onClick={() => setActiveTab("courses")}
                    className={`px-3 md:px-4 py-2 font-medium border-b-2 transition-all text-sm md:text-base ${
                      activeTab === "courses"
                        ? "border-[#004F70] text-[#004F70]"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Purchased Courses ({purchasedCourses.length})
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("liveClasses")}
                    className={`px-3 md:px-4 py-2 font-medium border-b-2 transition-all text-sm md:text-base ${
                      activeTab === "liveClasses"
                        ? "border-red-500 text-red-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Live Classes ({registeredLiveClasses.length})
                    </div>
                  </button>
                </div>

                {/* Purchased Courses Tab */}
                {activeTab === "courses" && (
                  <div>
                    {purchasedCourses.length > 0 ? (
                      <div className="grid gap-3 md:gap-4">
                        {purchasedCourses.map((course, index) => {
                          const progress = getCourseProgress(course);
                          return (
                            <div
                              key={index}
                              className="bg-white rounded-lg p-3 md:p-4 border border-gray-200 hover:shadow-md transition-all"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#004F70] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Video className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h4 className="font-semibold text-gray-800 text-sm md:text-lg truncate">
                                      {course}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                                      <span>
                                        {progress.completedLessons}/
                                        {progress.totalLessons} lessons
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleContinueCourse(course)}
                                  className="bg-[#004F70] text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-[#003d56] transition-all flex items-center gap-2 text-xs md:text-sm w-full sm:w-auto justify-center"
                                >
                                  <PlayCircle className="w-3 h-3 md:w-4 md:h-4" />
                                  Continue
                                </button>
                              </div>
                              <div className="mt-3">
                                <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                                  <div
                                    className="bg-[#004F70] h-1.5 md:h-2 rounded-full transition-all"
                                    style={{ width: `${progress.progress}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between text-xs md:text-sm text-gray-600 mt-1">
                                  <span>{progress.progress}% complete</span>
                                  <span>
                                    {progress.completedLessons}/
                                    {progress.totalLessons} lessons
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 md:py-12">
                        <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-3 md:mb-4" />
                        <h4 className="text-base md:text-lg font-semibold text-gray-600 mb-2">
                          No courses purchased yet
                        </h4>
                        <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">
                          Courses you purchase will appear here automatically
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Link
                            to="/course"
                            onClick={onClose}
                            className="bg-[#004F70] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-[#003d56] transition-all font-medium text-sm md:text-base"
                          >
                            Browse Courses
                          </Link>
                          <button
                            onClick={addDemoData}
                            className="bg-yellow-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-yellow-600 transition-all font-medium text-sm md:text-base"
                          >
                            Add Demo Courses
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Registered Live Classes Tab */}
                {activeTab === "liveClasses" && (
                  <div>
                    {registeredLiveClasses.length > 0 ? (
                      <div className="grid gap-3 md:gap-4">
                        {registeredLiveClasses.map((liveClass, index) => {
                          const schedule = getLiveClassSchedule(liveClass);
                          const isCompleted = schedule.status === "completed";
                          const isLiveNow = schedule.status === "live now";

                          return (
                            <div
                              key={index}
                              className="bg-white rounded-lg p-3 md:p-4 border border-gray-200 hover:shadow-md transition-all"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Zap className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h4 className="font-semibold text-gray-800 text-sm md:text-lg truncate">
                                      {liveClass}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                                      <Clock className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                                      <span>
                                        {isCompleted
                                          ? "Completed"
                                          : isLiveNow
                                          ? "Live Now"
                                          : "Scheduled"}{" "}
                                        • {schedule.date} at {schedule.time}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleJoinLiveClass(liveClass)}
                                  className={`px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all flex items-center gap-2 text-xs md:text-sm w-full sm:w-auto justify-center ${
                                    isCompleted
                                      ? "bg-gray-500 text-white hover:bg-gray-600"
                                      : isLiveNow
                                      ? "bg-green-500 text-white hover:bg-green-600"
                                      : "bg-red-500 text-white hover:bg-red-600"
                                  }`}
                                  disabled={isCompleted}
                                >
                                  {isCompleted ? (
                                    <>
                                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                                      Completed
                                    </>
                                  ) : isLiveNow ? (
                                    <>
                                      <PlayCircle className="w-3 h-3 md:w-4 md:h-4" />
                                      Join Now
                                    </>
                                  ) : (
                                    <>
                                      <PlayCircle className="w-3 h-3 md:w-4 md:h-4" />
                                      Join Class
                                    </>
                                  )}
                                </button>
                              </div>
                              {!isCompleted && (
                                <div className="mt-3 flex items-center justify-between text-xs md:text-sm">
                                  <span
                                    className={`font-medium flex items-center gap-1 ${
                                      isLiveNow
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    <Zap className="w-3 h-3 md:w-4 md:h-4" />
                                    {isLiveNow
                                      ? "Live Now - Join Immediately!"
                                      : "Upcoming Live Session"}
                                  </span>
                                  <span className="text-gray-500">
                                    {schedule.date} at {schedule.time}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 md:py-12">
                        <Users className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-3 md:mb-4" />
                        <h4 className="text-base md:text-lg font-semibold text-gray-600 mb-2">
                          No live classes registered yet
                        </h4>
                        <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">
                          Live classes you register for will appear here
                          automatically
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Link
                            to="/course?type=live"
                            onClick={onClose}
                            className="bg-red-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-red-600 transition-all font-medium text-sm md:text-base"
                          >
                            Browse Live Classes
                          </Link>
                          <button
                            onClick={addDemoData}
                            className="bg-yellow-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-yellow-600 transition-all font-medium text-sm md:text-base"
                          >
                            Add Demo Classes
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Not Authenticated Message */}
            {!isAuthenticated() && !isEditing && (
              <div className="lg:col-span-2 bg-yellow-50 border border-yellow-200 rounded-xl p-6 md:p-8 text-center">
                <User className="w-12 h-12 md:w-16 md:h-16 text-yellow-500 mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-yellow-800 mb-2">
                  Sign In Required
                </h3>
                <p className="text-yellow-700 mb-4 md:mb-6 text-sm md:text-base">
                  Please sign in to view your learning progress and access
                  courses
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-[#004F70] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-[#003d56] transition-all font-medium text-sm md:text-base"
                >
                  Sign In Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthForms
        isOpen={showAuthModal}
        onClose={handleCloseAuthModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default ProfileForm;
