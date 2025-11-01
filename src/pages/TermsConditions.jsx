import React from "react";
import { ArrowLeft } from "lucide-react";

const TermsConditions = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-[#004F70] hover:text-[#003d56] mb-6 transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#004F70] mb-6">
            Terms & Conditions
          </h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-[#004F70] mb-3">
                1. Enrollment Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By enrolling in any course, you agree to complete the payment
                process and abide by the course guidelines. Refunds are
                available within 30 days of purchase if you haven't accessed
                more than 20% of the course content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#004F70] mb-3">
                2. User Responsibilities
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Users are responsible for maintaining the confidentiality of
                their account information and for all activities that occur
                under their account. You agree to notify us immediately of any
                unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#004F70] mb-3">
                3. Intellectual Property
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All course materials, including videos, text, code examples, and
                documentation, are protected by copyright and may not be
                redistributed without explicit permission from the course
                instructors.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#004F70] mb-3">
                4. Privacy Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We respect your privacy and are committed to protecting your
                personal information. We collect only necessary data to provide
                and improve our services, and we never share your information
                with third parties without your consent.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
