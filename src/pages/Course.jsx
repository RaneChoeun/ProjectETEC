// src/pages/Course.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, PlayCircle, Search, X, Home, ChevronLeft } from "lucide-react";
import seedData from "../seed/seedData";
import seedDataLive from "../seed/seedDataLive";
import { loadCourses } from "../seed/storage"; // ✅ import loadCourses
import OnlineCourses from "../components/OnlineCourses";
import LiveCourses from "../components/LiveCourses";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("courses");
  const [searchAnimation, setSearchAnimation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Load saved courses from localStorage
        const storedCourses = loadCourses();
        // Combine seed data and stored courses
        const allCourses = [...seedData, ...storedCourses];
        setCourses(allCourses);
        setFeaturedCourses(allCourses.slice(0, 4));
        setLiveClasses(seedDataLive);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.instructor && course.instructor.toLowerCase().includes(searchTerm.toLowerCase())) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseClick = (course, isLive = false) => {
    navigate("/course-detail", { state: { course, isLiveClass: isLive } });
  };

  const handleRegisterNow = (classItem, e) => {
    e.stopPropagation();
    alert(`Successfully registered for ${classItem.title}!`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchAnimation(true);
    setTimeout(() => setSearchAnimation(false), 500);
  };

  const clearSearch = () => setSearchTerm("");

  return (
    <div className="min-h-screen bg-gradient-to-blue from-blue-50 via-white to-blue-100 py-6">
      {/* Back Button for mobile */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-sm border-b border-blue-100 mb-4">
        <div className="container mx-auto px-4 py-3">
          <Link
            to="/"
            className="flex items-center text-[#004F70] hover:text-[#5aa5b8] transition-colors font-medium text-sm"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#004F70] mb-2">All Courses</h1>
          <p className="text-gray-600 text-sm">
            Discover {courses.length} online courses and {liveClasses.length} live classes
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-xl shadow-sm p-1 inline-flex">
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-6 py-2 rounded-lg transition-all text-sm font-medium ${
                activeTab === "courses"
                  ? "bg-[#004F70] text-white shadow-md"
                  : "text-gray-600 hover:text-[#004F70]"
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Online Courses ({courses.length})
            </button>
            <button
              onClick={() => setActiveTab("live")}
              className={`px-6 py-2 rounded-lg transition-all text-sm font-medium ${
                activeTab === "live"
                  ? "bg-[#004F70] text-white shadow-md"
                  : "text-gray-600 hover:text-[#004F70]"
              }`}
            >
              <PlayCircle className="w-4 h-4 inline mr-2" />
              Live Classes ({liveClasses.length})
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {activeTab === "courses" && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search courses, instructors, or categories..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004F70] focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === "courses" ? (
          <OnlineCourses
            courses={filteredCourses.length ? filteredCourses : courses}
            handleCourseClick={handleCourseClick}
            searchAnimation={searchAnimation}
          />
        ) : (
          <LiveCourses
            liveClasses={liveClasses}
            handleCourseClick={handleCourseClick}
            handleRegisterNow={handleRegisterNow}
          />
        )}
      </div>
    </div>
  );
};

export default Course;
