import React from "react";
import { Video } from "lucide-react";

const LiveCourses = ({ liveClasses, handleCourseClick, handleRegisterNow }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {liveClasses.map((classItem) => (
        <div
          key={classItem.id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer group"
          onClick={() => handleCourseClick(classItem, true)}
        >
          <div className="relative">
            <div
              className={`h-24 bg-gradient-to-brue ${classItem.color} rounded-t-xl flex items-center justify-center relative`}
            >
              <Video className="w-6 h-6 text-white" />
              {classItem.status === "live" && (
                <div className="absolute top-2 right-2 flex items-center bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                  LIVE
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
            <h3 className="text-sm font-semibold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors line-clamp-2 leading-tight">
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
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                {classItem.time}
              </span>
              <span className="text-xs font-medium text-gray-500">
                {classItem.level}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering card click
                handleRegisterNow(classItem, e);
              }}
              className="w-full text-xs bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition-colors font-medium"
            >
              Register Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveCourses;
