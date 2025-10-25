import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Clock,
  Users,
  Shield,
  Target,
  Home,
  ChevronLeft,
  Zap,
} from "lucide-react";

const AllCourseDetail = () => {
  const location = useLocation(); //access current state
  const navigate = useNavigate();//handle back or redirect actions
  const { course, isLiveClass } = location.state || {};

  // Redirect if no course data
  if (!course) {
    navigate("/courses");
    return null;
  }

  const handleBuyNow = () => {
    alert(
      `Thank you for purchasing ${course.title}! Redirecting to payment...`
    );
  };

  const handleRegisterNow = () => {
    alert(
      `Successfully registered for ${course.title}! We'll send you the joining details.`
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-6 px-4">
      {/* Back to Home Button - Visible only on mobile */}
      <div className="md:hidden sticky top-16 z-40 bg-white/80 backdrop-blur-sm border-b border-purple-100 mb-4">
        <div className="container mx-auto px-4 py-3">
          <Link
            to="/"
            className="flex items-center text-purple-600 hover:text-purple-700 transition-colors font-medium text-sm"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <button
          onClick={handleBack}
          className="hidden md:flex items-center text-purple-700 hover:text-purple-900 mb-4 transition-all text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to{" "}
          {isLiveClass ? "Live Classes" : "Courses"}
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Course Header */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {course.level}
                </span>
                {course.featured && (
                  <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                    <Zap className="w-3 h-3 inline mr-1" />
                    Featured
                  </span>
                )}
                {isLiveClass && (
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      course.status === "live"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {course.status === "live"
                      ? "🔴 Live Now"
                      : "⏰ " + course.time}
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {course.title}
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {course.description}
              </p>

              <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span>{course.rating} Rating</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-purple-600 mr-1" />
                  <span>
                    {course.students?.toLocaleString() || course.enrolled}{" "}
                    {isLiveClass ? "enrolled" : "students"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-purple-600 mr-1" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {course.instructor
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {course.instructor}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isLiveClass ? "Live Instructor" : "Course Instructor"}
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing & Enrollment */}
            <div className="bg-purple-50 rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-3xl font-bold text-green-600">
                    {course.price}
                  </span>
                  {course.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {course.originalPrice}
                    </span>
                  )}
                </div>
                {course.discount > 0 && (
                  <span className="text-sm text-red-600 font-medium">
                    Save {course.discount}% today!
                  </span>
                )}
              </div>

              <button
                onClick={isLiveClass ? handleRegisterNow : handleBuyNow}
                className={`w-full py-4 rounded-xl hover:scale-105 transition-all font-bold text-lg mb-4 ${
                  isLiveClass
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {isLiveClass ? "Register Now" : "Buy Now"}
              </button>

              <div className="text-sm text-gray-600 space-y-2">
                {isLiveClass ? (
                  <>
                    <p>✅ {course.duration} live session</p>
                    <p>✅ Interactive Q&A with instructor</p>
                    <p>✅ Recording available after session</p>
                    <p>✅ Downloadable resources</p>
                    <p>✅ Certificate of participation</p>
                    <p>✅ Limited to {course.maxStudents} students</p>
                  </>
                ) : (
                  <>
                    <p>✅ {course.duration} of content</p>
                    <p>✅ {course.videoCount} video lectures</p>
                    <p>✅ {course.articleCount} articles</p>
                    <p>✅ {course.downloadCount} downloadable resources</p>
                    <p>✅ {course.exercises} coding exercises</p>
                    <p>✅ {course.projects} real-world projects</p>
                    <p>✅ Certificate of completion</p>
                    <p>✅ Lifetime access</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* What You'll Learn */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              {isLiveClass ? "Session Highlights" : "What You'll Learn"}
            </h2>
            <div className="grid gap-2">
              {course.subjects?.map((subject, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 bg-green-50 rounded-lg"
                >
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700 text-sm">{subject}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Benefits */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              {isLiveClass ? "What's Included" : "Course Benefits"}
            </h2>
            <div className="grid gap-2">
              {course.benefits?.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 bg-blue-50 rounded-lg"
                >
                  <span className="text-blue-500 mr-2">🎯</span>
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourseDetail;
