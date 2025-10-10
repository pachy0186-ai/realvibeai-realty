import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { realtyMetadata } from "../../lib/seo_metadata";

export const metadata: Metadata = realtyMetadata;

export default function RealtyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-banner-realvibeai.jpg"
            alt="RealVibeAI Realty Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Image
              src="/logo-realvibeai-realty.png"
              alt="RealVibeAI Realty Logo"
              width={120}
              height={120}
              className="mx-auto mb-6"
            />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up leading-tight">
            AI-Powered Lead Generation
            <span className="block text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
              That Actually Works
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto animate-fade-in-up leading-relaxed">
            Stop chasing cold leads. Our intelligent system automatically qualifies prospects, sends personalized follow-ups,
            and delivers hot leads directly to your inbox. Built for real estate professionals who want to close more deals
            with less effort.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
            <Link
              href="/realty/pricing"
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              See plans & get started
            </Link>
            <Link
              href="/realty/contact"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-purple-600 font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300"
            >
              Book a demo
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
            <div className="text-gray-300">
              <div className="text-2xl font-bold text-green-400">2 min</div>
              <div className="text-sm">Setup Time</div>
            </div>
            <div className="text-gray-300">
              <div className="text-2xl font-bold text-blue-400">24/7</div>
              <div className="text-sm">AI Working</div>
            </div>
            <div className="text-gray-300">
              <div className="text-2xl font-bold text-purple-400">Significantly</div>
              <div className="text-sm">More Closings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Complete Lead Generation System
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From initial contact to closing, our AI handles every step of lead nurturing.
              Automatic qualification, personalized follow-ups, and intelligent prioritization—all working 24/7 to grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Lead Scoring</h3>
              <p className="text-gray-600 leading-relaxed">
                Every lead gets scored as Hot, Warm, or Cold within seconds. Our AI analyzes 50+ data points
                including urgency, budget indicators, and engagement patterns to prioritize your follow-ups.
              </p>
              <div className="mt-4 text-sm text-purple-600 font-semibold">
                → Significantly reduce time spent on unqualified leads
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLi
