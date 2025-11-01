import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Star,
  Clock,
  Users,
  Search,
  BookOpen,
  PlayCircle,
  Zap,
  X,
  Home,
  ChevronLeft,
  Video,
} from "lucide-react";
import seedData from "../seed/seedData.js";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("courses");
  const [searchAnimation, setSearchAnimation] = useState(false);
  const navigate = useNavigate();

  // Fetch all data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Enhanced courses data with detailed information
        const enhancedCourses = seedData.map((course, index) => {
          const courseCategories = [
            "web development",
            "mobile development",
            "data science",
            "machine learning",
            "programming",
            "design",
            "business",
            "cybersecurity",
          ];

          const instructors = [
            "Dr. Sarah Johnson",
            "Prof. Mike Chen",
            "Emily Davis",
            "Alex Rodriguez",
            "Dr. James Wilson",
            "Lisa Thompson",
            "Marcus Brown",
            "Dr. Amanda Lee",
            "Robert Garcia",
            "Jennifer Martinez",
          ];

          const subjectsList = [
            "HTML, CSS, JavaScript Fundamentals",
            "React and Modern Frontend Development",
            "Node.js and Backend Development",
            "Database Design and Management",
            "RESTful API Development",
            "Version Control with Git",
            "Deployment and DevOps Basics",
            "Testing and Debugging",
            "Performance Optimization",
            "Security Best Practices",
            "Mobile App Development",
            "Cloud Computing",
            "Machine Learning Algorithms",
            "Data Analysis and Visualization",
            "UI/UX Design Principles",
          ];

          const benefitsList = [
            "Build real-world projects for your portfolio",
            "Career guidance and interview preparation",
            "Lifetime access to course materials",
            "Certificate of completion",
            "Community support and networking",
            "Regular content updates",
            "One-on-one mentoring sessions",
            "Job placement assistance",
            "Flexible learning schedule",
            "Industry-recognized certification",
            "Code reviews and feedback",
            "Project-based learning approach",
            "Access to exclusive resources",
            "Career coaching sessions",
            "Networking opportunities",
          ];

          const isFeatured = index < 8;
          const hasDiscount = index % 3 === 0;
          const discountRate = hasDiscount ? [20, 30, 40, 50][index % 4] : 0;
          const originalPrice = 199 + (index % 5) * 50;
          const finalPrice = hasDiscount
            ? originalPrice * (1 - discountRate / 100)
            : originalPrice;

          return {
            id: course.id,
            title: `Course ${course.id}: ${course.title
              .split(" ")
              .slice(0, 4)
              .join(" ")} Masterclass`,
            description:
              course.body +
              " This comprehensive course will take you from beginner to advanced level with hands-on projects and real-world applications.",
            price: `$${finalPrice.toFixed(2)}`,
            originalPrice: hasDiscount ? `$${originalPrice.toFixed(2)}` : null,
            discount: discountRate,
            img: course.image,
            duration: `${4 + (index % 6)} weeks`,
            rating: (4 + Math.random() * 0.9).toFixed(1),
            students: Math.floor(Math.random() * 5000) + 1000,
            instructor: instructors[index % instructors.length],
            category: courseCategories[index % courseCategories.length],
            level: ["Beginner", "Intermediate", "Advanced"][index % 3],
            language: ["English", "Spanish", "French", "German"][index % 4],
            featured: isFeatured,
            type: "online",
            videoCount: 45 + (index % 20),
            articleCount: 12 + (index % 8),
            downloadCount: 25 + (index % 15),
            exercises: 15 + (index % 10),
            projects: 3 + (index % 3),
            color: `bg-[#004F70]`,
            subjects: subjectsList.slice(0, 6 + (index % 5)),
            benefits: benefitsList.slice(0, 8 + (index % 4)),
            requirements: [
              "Basic computer knowledge",
              "Internet connection",
              "Dedication to learn",
              "No prior experience needed",
            ].slice(0, 2 + (index % 2)),
            whatYouGet: [
              "Lifetime access to all course materials",
              "Certificate of completion",
              "Downloadable resources and code",
              "Community access",
              "Instructor support",
              "Career guidance",
            ].slice(0, 4 + (index % 2)),
          };
        });

        // Create featured courses (first 8 courses)
        const featured = enhancedCourses.slice(0, 8).map((course) => ({
          ...course,
          badge: "Featured",
          badgeColor: "bg-yellow-500",
        }));

        // Create live classes data
        const liveClassesData = [
          {
            id: 101,
            title: "Web Development Live Bootcamp",
            instructor: "Sarah Johnson",
            time: "Live Now",
            students: 45,
            duration: "2 hours",
            price: "$49.99",
            originalPrice: "$99.99",
            discount: 50,
            color: "bg-[#004F70]",
            status: "live",
            description:
              "Join this interactive web development session and build a real project with expert guidance.",
            category: "web development",
            level: "Intermediate",
            maxStudents: 50,
            enrolled: 45,
            subjects: [
              "Live Coding",
              "Project Building",
              "Q&A Session",
              "Code Review",
            ],
            benefits: [
              "Real-time feedback",
              "Interactive learning",
              "Networking",
              "Certificate",
            ],
          },
          {
            id: 102,
            title: "React Masterclass Workshop",
            instructor: "Mike Chen",
            time: "Starts in 30 min",
            students: 28,
            duration: "1.5 hours",
            price: "$29.99",
            color: "bg-[#004F70]",
            status: "upcoming",
            description:
              "Master React with this hands-on workshop and build modern web applications.",
            category: "web development",
            level: "Advanced",
            maxStudents: 40,
            enrolled: 28,
            subjects: [
              "React Hooks",
              "State Management",
              "Performance",
              "Best Practices",
            ],
            benefits: ["Expert guidance", "Code along", "Resources", "Support"],
          },
          {
            id: 103,
            title: "Python for Data Science",
            instructor: "Emily Davis",
            time: "Starts in 1 hour",
            students: 32,
            duration: "2 hours",
            price: "Free",
            color: "bg-[#004F70]",
            status: "upcoming",
            description:
              "Learn Python for data analysis and visualization in this comprehensive live class.",
            category: "data science",
            level: "Beginner",
            maxStudents: 100,
            enrolled: 32,
            subjects: [
              "Python Basics",
              "Pandas",
              "Data Visualization",
              "Projects",
            ],
            benefits: [
              "Free access",
              "Beginner friendly",
              "Hands-on",
              "Certificate",
            ],
          },
          {
            id: 104,
            title: "UI/UX Design Live Session",
            instructor: "Alex Rodriguez",
            time: "Tomorrow, 2:00 PM",
            students: 18,
            duration: "3 hours",
            price: "$79.99",
            originalPrice: "$129.99",
            discount: 38,
            color: "bg-[#004F70]",
            status: "scheduled",
            description:
              "Design beautiful and user-friendly interfaces with expert guidance.",
            category: "design",
            level: "Intermediate",
            maxStudents: 30,
            enrolled: 18,
            subjects: [
              "Design Principles",
              "Figma Tutorial",
              "User Research",
              "Prototyping",
            ],
            benefits: [
              "Design feedback",
              "Portfolio project",
              "Resources",
              "Mentorship",
            ],
          },
          {
            id: 105,
            title: "Mobile App Development",
            instructor: "Dr. James Wilson",
            time: "Live Now",
            students: 22,
            duration: "2.5 hours",
            price: "$59.99",
            color: "bg-[#004F70]",
            status: "live",

            description:
              "Build cross-platform mobile apps with React Native in this intensive session.",
            category: "mobile development",
            level: "Intermediate",
            maxStudents: 35,
            enrolled: 22,
            subjects: ["React Native", "Mobile UI", "APIs", "Deployment"],
            benefits: ["Live coding", "App building", "Q&A", "Resources"],
          },
        ];

        setCourses(enhancedCourses);
        setFeaturedCourses(featured);
        setLiveClasses(liveClassesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Get unique instructors for search suggestions
  const uniqueInstructors = [
    ...new Set(courses.map((course) => course.instructor)),
  ];

  // Filter courses based on search
  const filteredCourses = courses.filter((course) => {
    return searchTerm
      ? course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.category.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
  });

  const handleCourseClick = (course, isLiveClass = false) => {
    navigate("/course-detail", {
      state: {
        course: course,
        isLiveClass: isLiveClass,
      },
    });
  };

  const handleRegisterNow = (classItem, e) => {
    e.stopPropagation();
    alert(
      `Successfully registered for ${classItem.title}! We'll send you the joining details.`
    );
  };

  // Handle search with animation
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchAnimation(true);
    setTimeout(() => setSearchAnimation(false), 500);
  };

  // Clear search term
  const clearSearch = () => {
    setSearchTerm("");
    setSearchAnimation(true);
    setTimeout(() => setSearchAnimation(false), 500);
  };

  // Render course cards for grid view
  const renderCourseCards = (coursesToRender) => {
    if (loading) {
      return Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-4 animate-pulse border border-gray-100"
        >
          <div className="h-32 bg-gray-300 rounded-lg mb-3"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded mb-3"></div>
          <div className="flex justify-between">
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
      ));
    }

    return coursesToRender.map((course) => (
      <div
        key={course.id}
        className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group border border-gray-100 ${
          searchAnimation ? "animate-pulse" : ""
        }`}
        onClick={() => handleCourseClick(course, false)}
      >
        {/* Course Image */}
        <div className="relative">
          <div
            className={`h-32 rounded-t-xl flex items-center overflow-hidden justify-center relative ${course.color}`}
          >
            <img src={course.img} className="h-full w-full" />
            {course.featured && (
              <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                <Zap className="w-3 h-3 inline mr-1" />
                Featured
              </div>
            )}
            {course.discount > 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                {course.discount}% OFF
              </div>
            )}
          </div>
        </div>

        {/* Course Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium text-[#004F70] bg-blue-50 px-2 py-1 rounded">
              {course.category}
            </span>
            <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">
              {course.level}
            </span>
          </div>

          <h3 className="text-sm font-semibold text-gray-800 mb-2 group-hover:text-[#004F70] transition-colors line-clamp-2 leading-tight">
            {course.title}
          </h3>
          <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {course.duration}
            </span>
            <span className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {course.students.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
              <span className="text-xs font-medium text-gray-700">
                {course.rating}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              by {course.instructor}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-green-600">
                {course.price}
              </span>
              {course.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {course.originalPrice}
                </span>
              )}
            </div>
            <button className="text-xs bg-[#004F70] text-white px-3 py-1 rounded hover:bg-[#5aa5b8] transition-colors font-medium">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    ));
  };

  // Render live classes
  const renderLiveClasses = () => {
    return liveClasses.map((classItem) => (
      <div
        key={classItem.id}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer group"
        onClick={() => handleCourseClick(classItem, true)}
      >
        <div className="relative">
          <div
            className={`h-24 ${classItem.color} rounded-t-xl flex items-center justify-center relative`}
          >
            <Video className="w-6 h-6 text-white" />
            {classItem.status === "live" && (
              <div className="absolute top-2 right-2">
                <div className="flex items-center bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                  LIVE
                </div>
              </div>
            )}
            {classItem.discount > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                {classItem.discount}% OFF
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-2 group-hover:text-[#004F70] transition-colors line-clamp-2 leading-tight">
            {classItem.title}
          </h3>

          <div className="flex items-center text-xs text-gray-500 mb-2">
            <span>👤 {classItem.instructor}</span>
            <span className="mx-2">•</span>
            <span>
              👥 {classItem.enrolled}/{classItem.maxStudents}
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span
              className={`text-xs font-medium px-2 py-1 rounded ${
                classItem.status === "live"
                  ? "bg-red-100 text-red-600"
                  : classItem.status === "upcoming"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-blue-100 text-[#004F70]"
              }`}
            >
              {classItem.time}
            </span>
            <span className="text-xs text-gray-500">
              ⏱️ {classItem.duration}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-green-600">
                {classItem.price}
              </span>
              {classItem.originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  {classItem.originalPrice}
                </span>
              )}
            </div>
            <button
              onClick={(e) => handleRegisterNow(classItem, e)}
              className={`text-xs px-3 py-1 rounded transition-colors font-medium ${
                classItem.status === "live"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-[#004F70] text-white hover:bg-[#5aa5b8]"
              }`}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-blue from-blue-50 via-white to-blue-100 py-6">
      {/* Back to Home Button - Visible only on mobile */}
      <div className="md:hidden sticky top-16 z-40 bg-white/80 backdrop-blur-sm border-b border-blue-100 mb-4">
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
          <h1 className="text-2xl md:text-3xl font-bold text-[#004F70] mb-2">
            All course
          </h1>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Discover {courses.length} online courses and {liveClasses.length}{" "}
            live classes to advance your skills
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

        {/* Search and Filters - Only for courses */}
        {activeTab === "courses" && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses, instructors (e.g., Dr. Sarah Johnson), or categories..."
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

            {/* Active Filters Display */}
            {searchTerm && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#004F70]">
                    Active Search:
                  </span>
                  <button
                    onClick={clearSearch}
                    className="text-xs text-[#004F70] hover:text-[#5aa5b8] transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                    {uniqueInstructors.some((instructor) =>
                      instructor
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) ? (
                      <>Instructor: "{searchTerm}"</>
                    ) : (
                      <>Search: "{searchTerm}"</>
                    )}
                    <button
                      onClick={clearSearch}
                      className="ml-1 hover:text-yellow-900 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-gray-600">
                Showing {filteredCourses.length} of {courses.length} courses
                {searchTerm && (
                  <span className="text-[#004F70] font-medium">
                    {" "}
                    {uniqueInstructors.some((instructor) =>
                      instructor
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) ? (
                      <>by instructor "{searchTerm}"</>
                    ) : (
                      <>for "{searchTerm}"</>
                    )}
                  </span>
                )}
              </p>
              {featuredCourses.length > 0 && (
                <div className="flex items-center space-x-1 text-xs text-[#004F70]">
                  <Zap className="w-3 h-3" />
                  <span>{featuredCourses.length} featured courses</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === "courses" ? (
          <>
            {/* Search Results Section - Show above featured when searching */}
            {searchTerm && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#004F70] flex items-center">
                    <Search className="w-5 h-5 mr-2 text-[#004F70]" />
                    Search Results for "{searchTerm}"
                    <span className="text-sm font-normal text-gray-600 ml-2">
                      ({filteredCourses.length} results)
                    </span>
                  </h2>
                </div>
                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {renderCourseCards(filteredCourses)}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-4xl mb-2">🔍</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      No courses found
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      No courses found for "{searchTerm}"
                    </p>
                    <button
                      onClick={clearSearch}
                      className="px-4 py-2 bg-[#004F70] text-white rounded-lg hover:bg-[#5aa5b8] transition-colors text-sm"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Featured Courses Section - Always show but after search results */}
            {featuredCourses.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#004F70] flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                    Featured Courses
                  </h2>
                  <span className="text-sm text-gray-500">Most Popular</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {renderCourseCards(featuredCourses)}
                </div>
              </div>
            )}

            {/* All Courses Section - Show only when not searching */}
            {!searchTerm && (
              <div>
                <h2 className="text-xl font-bold text-[#004F70] mb-4">
                  All Courses
                </h2>
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-500 ${
                    searchAnimation ? "opacity-70" : "opacity-100"
                  }`}
                >
                  {renderCourseCards(
                    courses.filter((course) => !course.featured)
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Live Classes Section */
          <div>
            <h2 className="text-xl font-bold text-[#004F70] mb-4">
              Live Classes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {renderLiveClasses()}
            </div>
          </div>
        )}

        {/* Alternative Back Button at bottom for mobile */}
        <div className="md:hidden flex justify-center mt-8 pt-6 border-t border-blue-100">
          <Link
            to="/"
            className="flex items-center px-6 py-3 bg-[#004F70] text-white rounded-lg hover:bg-[#5aa5b8] transition-all font-medium shadow-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Course;
