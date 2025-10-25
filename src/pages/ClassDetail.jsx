import React from "react";
import { ArrowLeft, Clock, Users, User, CheckCircle } from "lucide-react";

const ClassDetail = ({ item, onBack }) => {
  if (!item) return null;

  const handleRegisterNow = () => {
    alert(`Successfully registered for ${item.title}! We'll contact you soon.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-purple-700 hover:text-purple-900 mb-6 transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
            {item.title}
          </h1>
          <p className="text-gray-600 text-lg mb-6">{item.body}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-gray-700">{item.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-gray-700">
                {item.enrolled}/{item.maxStudents} enrolled
              </span>
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-gray-700">{item.instructor}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-gray-700">Live Sessions</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="text-3xl font-bold text-green-600">
                {item.price}
              </span>
              <span className="text-gray-500 text-sm ml-2">
                complete course
              </span>
            </div>
            <button
              onClick={handleRegisterNow}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all font-semibold text-lg"
            >
              Register Now
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Class Schedule
          </h2>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-lg text-purple-700 font-semibold">
              📅 {item.schedule} • ⏰ {item.duration} Program
            </p>
            <p className="text-gray-600 mt-2">
              Live interactive sessions with {item.instructor}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {item.subjects.map((subject, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-purple-50 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{subject}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">
            Why Join This Class?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {item.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start p-3 bg-green-50 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;
