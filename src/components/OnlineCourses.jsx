// src/components/OnlineCourses.jsx
import React from "react";
import { Clock, Users, Star, Zap } from "lucide-react";

const OnlineCourses = ({ courses, handleCourseClick, searchAnimation }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {courses.map((course) => (
        <div
          key={course.id}
          className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group border border-gray-100 ${
            searchAnimation ? "animate-pulse" : ""
          }`}
          onClick={() => handleCourseClick(course, false)}
        >
          {/* Image */}
          <div
            className={`h-32 rounded-t-xl flex items-center overflow-hidden justify-center relative ${
              course.color || "bg-gray-100"
            }`}
          >
            <img
              src={course.image || course.img || "/placeholder.png"}
              alt={course.title}
              className="h-full w-full object-cover"
            />
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

          {/* Content */}
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-[#004F70] bg-blue-50 px-2 py-1 rounded">
                {course.category || "General"}
              </span>
              <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">
                {course.level || "Beginner"}
              </span>
            </div>

            <h3 className="text-sm font-semibold text-gray-800 mb-2 group-hover:text-[#004F70] transition-colors line-clamp-2 leading-tight">
              {course.title}
            </h3>

            <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {course.duration || "N/A"}
              </span>
              <span className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {(course.students || 0).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                <span className="text-xs font-medium text-gray-700">{course.rating || "0.0"}</span>
              </div>
              <span className="text-xs text-gray-500">
                by {course.instructor || "TBA"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-green-600">{course.price || "Free"}</span>
                {course.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
                )}
              </div>
              <button className="text-xs bg-[#004F70] text-white px-3 py-1 rounded hover:bg-[#5aa5b8] transition-colors font-medium">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OnlineCourses;
