// src/components/LiveCourses.jsx
import React from "react";
import { Video } from "lucide-react";

const LiveCourses = ({ liveClasses, handleCourseClick, handleRegisterNow, onBack }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {liveClasses.map((classItem) => (
        <div
          key={classItem.id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer group"
          onClick={() => handleCourseClick(classItem, true)}
        >
          <div className="relative">
            <div className={`h-35 ${classItem.color} rounded-t-xl flex items-center justify-center relative`}>
              <img src={classItem.image || classItem.img} alt={classItem.title} className="h-full w-full object-cover absolute inset-0" />
              {/* <Video className="w-6 h-6 text-white z-10" /> */}
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
              <span>👥 {classItem.enrolled}/{classItem.maxStudents}</span>
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
              <span className="text-xs text-gray-500">⏱️ {classItem.duration}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-green-600">{classItem.price}</span>
                {classItem.originalPrice && (
                  <span className="text-xs text-gray-500 line-through">{classItem.originalPrice}</span>
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
      ))}
    </div>
  );
};

export default LiveCourses;
