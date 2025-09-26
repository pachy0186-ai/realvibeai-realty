'use client';

import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>RealVibeAI Realty | AI-Powered Lead Qualification for Real Estate Agents</title>
        <meta name="description" content="AI that qualifies leads for you (Hot/Warm/Cold) and saves you time. Transparent pricing, 10-minute setup, privacy-first approach for solo real estate agents." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: { 
  isMobileMenuOpen: boolean; 
  setIsMobileMenuOpen: (open: boolean) => void; 
}) {
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
            />
            <span className="text-xl font-bold text-gray-900">
              RealVibeAI Realty
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/realty"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/realty/solutions"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Solutions
            </Link>
            <Link
              href="/realty/virtual-staging"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Virtual Staging
            </Link>
            <Link
              href="/realty/pricing"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/realty/contact"
              className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-purple-600 focus:outline-none focus:text-purple-600"
              aria-label="Open menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
              <Link
                href="/realty"
                className="text-gray-700 hover:text-purple-600 block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/realty/solutions"
                className="text-gray-700 hover:text-purple-600 block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link
                href="/realty/virtual-staging"
                className="text-gray-700 hover:text-purple-600 block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Virtual Staging
              </Link>
              <Link
                href="/realty/pricing"
                className="text-gray-700 hover:text-purple-600 block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/realty/contact"
                className="bg-purple-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition-colors mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/logo-realvibeai-realty.png"
                alt="RealVibeAI Realty"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg font-bold">RealVibeAI Realty</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              AI-powered lead qualification that saves real estate agents time and helps them focus on hot prospects. 
              Transparent pricing, privacy-first approach.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/realty/solutions" className="text-gray-400 hover:text-white transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/realty/virtual-staging" className="text-gray-400 hover:text-white transition-colors">
                  Virtual Staging
                </Link>
              </li>
              <li>
                <Link href="/realty/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/realty/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © 2024 RealVibeAI Realty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
