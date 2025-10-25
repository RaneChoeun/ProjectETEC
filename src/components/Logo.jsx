import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
    >
      {/* Logo Container */}
      <div className="relative">
        {/* Main Logo Shape */}
        <div className="w-12 h-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500">
          {/* Text Logo with Red C */}
          <div className="text-center">
            <div className="font-bold text-lg leading-none">
              <span className="text-white">C</span>
              <span className="text-red-500">L</span>
              <span className="text-white">C</span>
            </div>
            <div className="text-white/80 text-[8px] font-medium mt-0.5">
              LEARNING
            </div>
          </div>
        </div>

        {/* Accent Elements */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full shadow-lg animate-pulse"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full shadow-lg"></div>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-red-500/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-500 -z-10"></div>
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <h1 className="text-xl font-bold tracking-tight">
          <span className="">C</span>
          <span className="text-red-500">L</span>
          <span>C Learning</span>
        </h1>
        <p className="text-xs text-gray-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Learn • Grow • Succeed
        </p>
      </div>
    </Link>
  );
};

export default Logo;
