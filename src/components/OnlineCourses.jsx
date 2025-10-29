import React from "react";
import { Clock, Users, Star, Zap } from "lucide-react";

const OnlineCourses = ({ courses, featuredCourses, loading, handleCourseClick, handleBuyNow, searchAnimation }) => {
  const renderCourseCards = (coursesToRender) => {
    if (loading) {
      return Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-4 animate-pulse border border-gray-100">
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
      <div key={course.id} className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group border border-gray-100 ${searchAnimation ? "animate-pulse" : ""}`} onClick={() => handleCourseClick(course, false)}>
        <div className={`h-32 rounded-t-xl flex items-center overflow-hidden justify-center relative bg-gradient-to-br ${course.color}`}>
          <img src={course.img} className="h-full w-full"/>
          {course.featured && <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold"><Zap className="w-3 h-3 inline mr-1"/>Featured</div>}
          {course.discount > 0 && <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">{course.discount}% OFF</div>}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">{course.category}</span>
            <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">{course.level}</span>
          </div>

          <h3 className="text-sm font-semibold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors line-clamp-2 leading-tight">{course.title}</h3>

          <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
            <span className="flex items-center"><Clock className="w-3 h-3 mr-1"/> {course.duration}</span>
            <span className="flex items-center"><Users className="w-3 h-3 mr-1"/> {course.students.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center"><Star className="w-3 h-3 text-yellow-500 fill-current mr-1"/> <span className="text-xs font-medium text-gray-700">{course.rating}</span></div>
            <span className="text-xs text-gray-500">by {course.instructor}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-green-600">{course.price}</span>
              {course.originalPrice && <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>}
            </div>
            <button onClick={(e) => handleBuyNow(course, e)} className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors font-medium">Buy Now</button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      {featuredCourses.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-purple-800 flex items-center"><Zap className="w-5 h-5 mr-2 text-yellow-500"/>Featured Courses</h2>
            <span className="text-sm text-gray-500">Most Popular</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {renderCourseCards(featuredCourses)}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-purple-800 mb-4">All Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-500">{renderCourseCards(courses.filter(c => !c.featured))}</div>
      </div>
    </>
  );
};

export default OnlineCourses;
