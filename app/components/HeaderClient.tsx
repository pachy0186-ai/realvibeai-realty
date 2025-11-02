"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SocialLinks from "./SocialLinks";

export default function HeaderClient() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/realty" className="flex items-center space-x-3">
            <Image
              src="/logo-realvibeai-realty.png"
              alt="RealVibeAI Realty"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
            <span className="text-xl font-bold text-gray-900">RealVibeAI Realty</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav aria-label="Primary" className="flex space-x-8">
              <Link href="/realty" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="/realty/solutions" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                Solutions
              </Link>
              <Link href="/realty/virtual-staging" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                Virtual Staging
              </Link>
              <Link href="/realty/pricing" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
                Pricing
              </Link>
              <Link href="/realty/contact" className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
                Contact
              </Link>
            </nav>
            <SocialLinks className="flex gap-3 ml-4" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-purple-600 focus:outline-none focus:text-purple-600"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link href="/realty" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/realty/solutions" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Solutions
              </Link>
              <Link href="/realty/virtual-staging" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Virtual Staging
              </Link>
              <Link href="/realty/pricing" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Pricing
              </Link>
              <Link
                href="/realty/contact"
                className="bg-purple-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition-colors mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-3 py-4 border-t border-gray-200 mt-4">
                <SocialLinks className="flex gap-4 justify-center" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}