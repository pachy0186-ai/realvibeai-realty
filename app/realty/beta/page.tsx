"use client";

import { useState } from "react";
import Link from "next/link";

const FEATURE_BETA_FORM = process.env.NEXT_PUBLIC_FEATURE_BETA_FORM === 'true';

export default function BetaPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    brokerage: "",
    crm: "",
    leadVolume: "",
    metro: "",
    referralSource: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      setError(null);
      const response = await fetch("/api/beta-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(result.error || "Something went wrong. Please try again or contact us directly.");
      }
    } catch (error) {
      console.error("Beta signup error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!FEATURE_BETA_FORM) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Beta Program Coming Soon</h1>
          <p className="text-xl text-gray-600 mb-8">
            We're preparing an exclusive beta program for early adopters. Check back soon!
          </p>
          <Link
            href="/realty"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-900 to-blue-900 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">You're On the List!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your interest in the RealVibeAI Virtual ISA beta program. 
              We'll review your application and reach out within 24-48 hours to schedule your onboarding call.
            </p>
            <p className="text-gray-600 mb-8">
              Check your email at <strong>{formData.email}</strong> for next steps.
            </p>
            <Link
              href="/realty"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all inline-block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-blue-900 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join the Virtual ISA Beta
            </h1>
            <p className="text-xl opacity-90">
              Get early access to our AI Virtual ISA and help shape the future of automated appointment booking.
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-purple-50 p-8 border-b border-purple-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Beta Program Benefits:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700"><strong>50% off</strong> for the first 6 months</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700"><strong>Priority support</strong> with direct access to our team</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700"><strong>White-glove onboarding</strong> and CRM integration setup</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700"><strong>Influence product roadmap</strong> with your feedback</span>
              </li>
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="brokerage" className="block text-sm font-semibold text-gray-700 mb-2">
                Brokerage/Team Name *
              </label>
              <input
                type="text"
                id="brokerage"
                name="brokerage"
                required
                value={formData.brokerage}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="crm" className="block text-sm font-semibold text-gray-700 mb-2">
                Current CRM *
              </label>
              <select
                id="crm"
                name="crm"
                required
                value={formData.crm}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select your CRM</option>
                <option value="Follow Up Boss">Follow Up Boss</option>
                <option value="Lofty">Lofty</option>
                <option value="CINC">CINC</option>
                <option value="KvCORE">KvCORE</option>
                <option value="BoomTown">BoomTown</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="leadVolume" className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Lead Volume *
                </label>
                <select
                  id="leadVolume"
                  name="leadVolume"
                  required
                  value={formData.leadVolume}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select volume</option>
                  <option value="0-50">0-50 leads/month</option>
                  <option value="51-100">51-100 leads/month</option>
                  <option value="101-200">101-200 leads/month</option>
                  <option value="201-500">201-500 leads/month</option>
                  <option value="500+">500+ leads/month</option>
                </select>
              </div>
              <div>
                <label htmlFor="metro" className="block text-sm font-semibold text-gray-700 mb-2">
                  Metro Area
                </label>
                <input
                  type="text"
                  id="metro"
                  name="metro"
                  value={formData.metro}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Miami, Los Angeles"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="referralSource" className="block text-sm font-semibold text-gray-700 mb-2">
                How did you hear about us?
              </label>
              <input
                type="text"
                id="referralSource"
                name="referralSource"
                value={formData.referralSource}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="LinkedIn, referral, Google, etc."
              />
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Apply for Beta Access"}
            </button>

            <p className="text-sm text-gray-500 text-center mt-6">
              Limited spots available. We'll review your application and reach out within 24-48 hours.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
