import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Clock,
  Users,
  BookOpen,
  Users as UsersIcon,
  Award,
  Globe,
  ArrowRight,
  PlayCircle,
} from "lucide-react";

const HomePage = ({
  open,
  setOpen,
  courses,
  classes,
  loading,
  onCourseDetail,
  onClassDetail,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://i.pinimg.com/736x/8d/37/99/8d3799e24be55bdfddb7a4fd8e4100d0.jpg",
    "https://i.pinimg.com/1200x/75/4c/a2/754ca2accdb8e560ea9bbd92afdbef6b.jpg",
    "https://i.pinimg.com/1200x/32/a8/fb/32a8fb6a7b353fb479524616a28a84d6.jpg",
  ];

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // const nextImage = () => {
  //   setCurrentImageIndex((current) =>
  //     current === heroImages.length - 1 ? 0 : current + 1
  //   );
  // };

  // const prevImage = () => {
  //   setCurrentImageIndex((current) =>
  //     current === 0 ? heroImages.length - 1 : current - 1
  //   );
  // };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const features = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Expert Courses",
      description: "Learn from industry experts",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <UsersIcon className="w-5 h-5" />,
      title: "Live Classes",
      description: "Interactive learning sessions",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Certification",
      description: "Get recognized certificates",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Global Community",
      description: "Join learners worldwide",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const SkeletonCard = () => (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse">
      <div className="h-4 bg-gray-200 rounded mb-3"></div>
      <div className="h-3 bg-gray-100 rounded mb-4"></div>
      <div className="flex justify-between">
        <div className="h-3 w-16 bg-gray-200 rounded"></div>
        <div className="h-3 w-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  const CourseCard = ({ course }) => (
    <div
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => onCourseDetail(course)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-relaxed">
              {course.title}
            </h3>
          </div>
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full ml-2 shrink-0">
            Popular
          </span>
        </div>
        <p className="text-gray-600 text-xs mb-4 line-clamp-2 leading-relaxed">
          {course.description.substring(0, 80)}...
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {course.duration}
            </span>
            <span className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {course.students}
            </span>
          </div>
          <span className="flex items-center text-yellow-600">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {course.rating}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">
            {course.price}
          </span>
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <PlayCircle className="w-4 h-4 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const ClassCard = ({ classItem }) => (
    <div
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => onClassDetail(classItem)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 text-sm leading-relaxed">
              {classItem.title}
            </h3>
          </div>
          <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full ml-2 shrink-0">
            Live
          </span>
        </div>
        <p className="text-gray-600 text-xs mb-4 line-clamp-2 leading-relaxed">
          {classItem.description.substring(0, 80)}...
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>👤 {classItem.instructor}</span>
            <span>🗓️ {classItem.schedule}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">
              {classItem.enrolled}/{classItem.maxStudents} seats
            </span>
            <span className="font-semibold text-gray-900">
              {classItem.price}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
            style={{
              width: `${(classItem.enrolled / classItem.maxStudents) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt={`Learning environment ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-blue from-gray-900/60 via-gray-900/40 to-gray-900/60" />
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {/* <button
          onClick={prevImage}
          className="absolute left-4 z-20 p-3 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-xl transition-all hover:scale-110 hidden sm:block"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 z-20 p-3 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-xl transition-all hover:scale-110 hidden sm:block"
        >
          <ChevronRight className="w-5 h-5" />
        </button> */}

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl w-full">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Start Your
              <span className="block bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-2">
                Knowledge Journey
              </span>
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 max-w-2xl mx-auto">
              Transform your future with our interactive learning platform
              designed for success.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center group p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 bg-linear-to-r ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-xs">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link
                to="/course"
                className="px-8 py-4 bg-white text-gray-900 rounded-xl hover:shadow-2xl transition-all font-semibold flex items-center group"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our most popular courses designed to help you master
              in-demand skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : courses
                  .slice(0, 4)
                  .map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Live Classes
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join interactive sessions with expert instructors and peer
              learners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : classes
                  .slice(0, 4)
                  .map((classItem) => (
                    <ClassCard key={classItem.id} classItem={classItem} />
                  ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
