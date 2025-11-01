import React from "react";
import { ArrowLeft } from "lucide-react";

const AboutUs = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-[#004F70] hover:text-[#003d56] mb-6 transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#004F70] mb-6">
            About Us
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#004F70] mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We are dedicated to providing quality programming education to
                everyone, regardless of their background or experience level.
                Our mission is to make coding accessible and enjoyable for all
                learners.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#004F70] mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To create a world where anyone can learn to code and build
                amazing digital solutions. We believe in empowering individuals
                through technology education.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-[#004F70] mb-4">Our Team</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {["Men Chhorvy", "Lai Rong", "Choeun Rane"].map(
                (member, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-[#004F70] rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold">
                      {member
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <h4 className="font-semibold text-[#004F70]">{member}</h4>
                    <p className="text-sm text-gray-600">Presenter</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
