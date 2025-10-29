import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, PlayCircle, Home, ChevronLeft, Search, X, Zap } from "lucide-react";
import seedData from "../seed/seedData.js";
import seedDataLive from "../seed/seedDataLive.js";
import OnlineCourses from "../components/OnlineCourses.jsx";
import LiveCourses from "../components/LiveCourses.jsx";

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
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Enhance online courses
        const enhancedCourses = seedData.map((course, index) => {
          const instructors = ["Dr. Sarah Johnson", "Prof. Mike Chen", "Emily Davis", "Alex Rodriguez", "Dr. James Wilson"];
          const categories = ["web development", "mobile development", "data science", "machine learning", "design"];
          const hasDiscount = index % 3 === 0;
          const discountRate = hasDiscount ? [20, 30, 40, 50][index % 4] : 0;
          const originalPrice = 199 + (index % 5) * 50;
          const finalPrice = hasDiscount ? originalPrice * (1 - discountRate / 100) : originalPrice;
          const isFeatured = index < 8;

          return {
            ...course,
            id: course.id,
            title: `Course ${course.id}: ${course.title} Masterclass`,
            img: course.image,
            price: `$${finalPrice.toFixed(2)}`,
            originalPrice: hasDiscount ? `$${originalPrice.toFixed(2)}` : null,
            discount: discountRate,
            instructor: instructors[index % instructors.length],
            category: categories[index % categories.length],
            level: ["Beginner", "Intermediate", "Advanced"][index % 3],
            featured: isFeatured,
            color: `from-${["purple", "blue", "green", "pink", "orange", "indigo"][index % 6]}-500 to-${["purple","blue","green","pink","orange","indigo"][(index+2)%6]}-600`,
          };
        });

        setCourses(enhancedCourses);
        setFeaturedCourses(enhancedCourses.filter(c => c.featured));
        setLiveClasses(seedDataLive);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleCourseClick = (course, isLiveClass = false) => {
    navigate("/course-detail", { state: { course, isLiveClass } });
  };

  const handleBuyNow = (course, e) => {
    e.stopPropagation();
    alert(`Thank you for purchasing ${course.title}! Redirecting to payment...`);
  };

  const handleRegisterNow = (classItem, e) => {
    e.stopPropagation();
    alert(`Successfully registered for ${classItem.title}! We'll send you the joining details.`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchAnimation(true);
    setTimeout(() => setSearchAnimation(false), 500);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchAnimation(true);
    setTimeout(() => setSearchAnimation(false), 500);
  };

  const filteredCourses = courses.filter(course => {
    return searchTerm
      ? course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
  });

  const uniqueInstructors = [...new Set(courses.map(c => c.instructor))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-6">
      {/* Mobile Back Button */}
      <div className="md:hidden sticky top-16 z-40 bg-white/80 backdrop-blur-sm border-b border-purple-100 mb-4">
        <div className="container mx-auto px-4 py-3">
          <Link to="/" className="flex items-center text-purple-600 hover:text-purple-700 transition-colors font-medium text-sm">
            <ChevronLeft className="w-5 h-5 mr-1" />
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-800 mb-2">All Courses</h1>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Discover {courses.length} online courses and {liveClasses.length} live classes to advance your skills
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-xl shadow-sm p-1 inline-flex">
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-6 py-2 rounded-lg transition-all text-sm font-medium ${activeTab === "courses" ? "bg-purple-600 text-white shadow-md" : "text-gray-600 hover:text-purple-700"}`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Online Courses ({courses.length})
            </button>
            <button
              onClick={() => setActiveTab("live")}
              className={`px-6 py-2 rounded-lg transition-all text-sm font-medium ${activeTab === "live" ? "bg-purple-600 text-white shadow-md" : "text-gray-600 hover:text-purple-700"}`}
            >
              <PlayCircle className="w-4 h-4 inline mr-2" />
              Live Classes ({liveClasses.length})
            </button>
          </div>
        </div>

        {/* Search */}
        {activeTab === "courses" && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses, instructors, or categories..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
                {searchTerm && (
                  <button onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === "courses" ? (
          <OnlineCourses
            courses={filteredCourses}
            featuredCourses={featuredCourses}
            loading={loading}
            handleCourseClick={handleCourseClick}
            handleBuyNow={handleBuyNow}
            searchAnimation={searchAnimation}
          />
        ) : (
          <LiveCourses
            liveClasses={liveClasses}
            handleCourseClick={handleCourseClick}
            handleRegisterNow={handleRegisterNow}
          />
        )}

        {/* Mobile Bottom Back */}
        <div className="md:hidden flex justify-center mt-8 pt-6 border-t border-purple-100">
          <Link to="/" className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium shadow-lg">
            <Home className="w-5 h-5 mr-2" />
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Course;
