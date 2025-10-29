"use client";

import { useState } from "react";
import Link from "next/link";

const FEATURE_ADMIN = process.env.NEXT_PUBLIC_FEATURE_ADMIN === 'true';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement proper authentication
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  if (!FEATURE_ADMIN) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-xl text-gray-600 mb-8">
            This page is not available in production.
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-900 to-blue-900 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-6 py-3 rounded-full transition-all"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-6">
            Preview environment only. Not available in production.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <Link
              href="/realty"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="text-sm text-gray-600 mb-2">Total Leads</div>
            <div className="text-3xl font-bold text-gray-900">1,247</div>
            <div className="text-sm text-green-600 mt-2">+12% this week</div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="text-sm text-gray-600 mb-2">Qualified</div>
            <div className="text-3xl font-bold text-gray-900">342</div>
            <div className="text-sm text-green-600 mt-2">+8% this week</div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="text-sm text-gray-600 mb-2">Appointments</div>
            <div className="text-3xl font-bold text-gray-900">89</div>
            <div className="text-sm text-green-600 mt-2">+15% this week</div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="text-sm text-gray-600 mb-2">Show Rate</div>
            <div className="text-3xl font-bold text-gray-900">84%</div>
            <div className="text-sm text-gray-600 mt-2">Stable</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow mb-10">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-gray-900">John Smith</div>
                  <div className="text-sm text-gray-600">john.smith@example.com</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-600">Qualified</div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">sarah.j@example.com</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-blue-600">Appointment Booked</div>
                  <div className="text-xs text-gray-500">4 hours ago</div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-gray-900">Mike Davis</div>
                  <div className="text-sm text-gray-600">mike.davis@example.com</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-600">Engaged</div>
                  <div className="text-xs text-gray-500">6 hours ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Beta Signups */}
        <div className="bg-white rounded-2xl shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Beta Signups</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-gray-900">Emily Chen</div>
                  <div className="text-sm text-gray-600">emily.chen@realty.com • Follow Up Boss • 101-200 leads/month</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Today, 10:30 AM</div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-gray-900">Robert Williams</div>
                  <div className="text-sm text-gray-600">robert.w@broker.com • Lofty • 201-500 leads/month</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Yesterday, 3:15 PM</div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-gray-900">Lisa Martinez</div>
                  <div className="text-sm text-gray-600">lisa.m@team.com • CINC • 500+ leads/month</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Yesterday, 11:45 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="mt-10 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Preview Environment Only</h3>
              <p className="text-yellow-700">
                This admin dashboard is only available in preview deployments. It will not be accessible in production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
