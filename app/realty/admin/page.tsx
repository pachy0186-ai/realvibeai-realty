"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FEATURE_ADMIN = process.env.NEXT_PUBLIC_FEATURE_ADMIN === 'true';

interface Applicant {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  brokerage: string;
  crm: string;
  lead_volume: string;
  metro?: string;
  referral_source?: string;
  status?: 'pending' | 'approved' | 'rejected';
  created_at: string;
  admin_notes?: string;
}

interface Stats {
  overview: {
    totalSignups: number;
    byStatus: {
      pending: number;
      approved: number;
      rejected: number;
    };
    byMetro: Record<string, number>;
  };
  seats: Array<{
    metro: string;
    total_seats: number;
    claimed_seats: number;
  }>;
  recentSignups: Applicant[];
  roiMetrics: {
    totalAppointmentsBooked: number;
    avgResponseTime: string;
    leadConversionRate: string;
    hoursSaved: number;
  };
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [adminToken, setAdminToken] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (Phase D will use proper auth)
    if (password === "admin123" || password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAdminToken(password); // Use password as token for now
      fetchData(password);
    } else {
      alert("Invalid password");
    }
  };

  const fetchData = async (token: string) => {
    setLoading(true);
    try {
      // Fetch stats
      const statsRes = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Fetch applicants
      const applicantsRes = await fetch('/api/admin/applicants', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (applicantsRes.ok) {
        const applicantsData = await applicantsRes.json();
        setApplicants(applicantsData.applicants || []);
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: 'approved' | 'rejected' | 'pending') => {
    try {
      const res = await fetch('/api/admin/applicants', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        // Update local state
        setApplicants(prev => prev.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        ));
        // Refresh stats
        fetchData(adminToken);
        alert(`Applicant ${newStatus} successfully`);
      } else {
        alert('Failed to update applicant status');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update applicant status');
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

  const filteredApplicants = filterStatus === 'all' 
    ? applicants 
    : applicants.filter(app => (app.status || 'pending') === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Virtual ISA Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => fetchData(adminToken)}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                🔄 Refresh
              </button>
              <Link
                href="/realty"
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      )}

      {!loading && stats && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="text-sm text-gray-600 mb-2">Total Beta Signups</div>
              <div className="text-3xl font-bold text-gray-900">{stats.overview.totalSignups}</div>
              <div className="text-sm text-gray-600 mt-2">All time</div>
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="text-sm text-gray-600 mb-2">Pending Review</div>
              <div className="text-3xl font-bold text-yellow-600">{stats.overview.byStatus.pending}</div>
              <div className="text-sm text-gray-600 mt-2">Awaiting action</div>
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="text-sm text-gray-600 mb-2">Approved</div>
              <div className="text-3xl font-bold text-green-600">{stats.overview.byStatus.approved}</div>
              <div className="text-sm text-gray-600 mt-2">Active beta users</div>
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="text-sm text-gray-600 mb-2">Rejected</div>
              <div className="text-3xl font-bold text-red-600">{stats.overview.byStatus.rejected}</div>
              <div className="text-sm text-gray-600 mt-2">Not qualified</div>
            </div>
          </div>

          {/* Seat Availability */}
          <div className="bg-white rounded-2xl shadow mb-10">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Seat Availability by Metro</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.seats.length > 0 ? (
                  stats.seats.map((seat) => (
                    <div key={seat.metro} className="border border-gray-200 rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-2">{seat.metro}</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {seat.claimed_seats}/{seat.total_seats}
                      </div>
                      <div className="text-sm text-gray-600">
                        {seat.total_seats - seat.claimed_seats} available
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${(seat.claimed_seats / seat.total_seats) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center text-gray-500 py-4">
                    No seat data available. Seats will be created automatically when signups are submitted.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ROI Metrics (Placeholder) */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow mb-10 p-6 text-white">
            <h2 className="text-xl font-bold mb-6">ROI Metrics (Coming in Phase D)</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold">{stats.roiMetrics.totalAppointmentsBooked}</div>
                <div className="text-sm opacity-90">Appointments Booked</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{stats.roiMetrics.avgResponseTime}</div>
                <div className="text-sm opacity-90">Avg Response Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{stats.roiMetrics.leadConversionRate}</div>
                <div className="text-sm opacity-90">Lead Conversion Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{stats.roiMetrics.hoursSaved}</div>
                <div className="text-sm opacity-90">Hours Saved</div>
              </div>
            </div>
          </div>

          {/* Beta Applicants */}
          <div className="bg-white rounded-2xl shadow">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Beta Applicants</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                    filterStatus === 'all' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({applicants.length})
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                    filterStatus === 'pending' 
                      ? 'bg-yellow-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pending ({stats.overview.byStatus.pending})
                </button>
                <button
                  onClick={() => setFilterStatus('approved')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                    filterStatus === 'approved' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Approved ({stats.overview.byStatus.approved})
                </button>
                <button
                  onClick={() => setFilterStatus('rejected')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                    filterStatus === 'rejected' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Rejected ({stats.overview.byStatus.rejected})
                </button>
              </div>
            </div>
            <div className="p-6">
              {filteredApplicants.length > 0 ? (
                <div className="space-y-4">
                  {filteredApplicants.map((applicant) => (
                    <div key={applicant.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="font-semibold text-gray-900 text-lg">
                              {applicant.first_name} {applicant.last_name}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              (applicant.status || 'pending') === 'approved' 
                                ? 'bg-green-100 text-green-800'
                                : (applicant.status || 'pending') === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {(applicant.status || 'pending').toUpperCase()}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600 mb-3">
                            <div><strong>Email:</strong> {applicant.email}</div>
                            <div><strong>Phone:</strong> {applicant.phone}</div>
                            <div><strong>Brokerage:</strong> {applicant.brokerage}</div>
                            <div><strong>CRM:</strong> {applicant.crm}</div>
                            <div><strong>Lead Volume:</strong> {applicant.lead_volume}</div>
                            <div><strong>Metro:</strong> {applicant.metro || 'General'}</div>
                            {applicant.referral_source && (
                              <div className="col-span-2"><strong>Referral:</strong> {applicant.referral_source}</div>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            Applied: {new Date(applicant.created_at).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          {(applicant.status || 'pending') !== 'approved' && (
                            <button
                              onClick={() => handleStatusUpdate(applicant.id, 'approved')}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
                            >
                              ✓ Approve
                            </button>
                          )}
                          {(applicant.status || 'pending') !== 'rejected' && (
                            <button
                              onClick={() => handleStatusUpdate(applicant.id, 'rejected')}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
                            >
                              ✗ Reject
                            </button>
                          )}
                          {(applicant.status || 'pending') !== 'pending' && (
                            <button
                              onClick={() => handleStatusUpdate(applicant.id, 'pending')}
                              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-semibold rounded-lg transition-colors"
                            >
                              ↻ Reset
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-10">
                  No applicants found for the selected filter.
                </div>
              )}
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
                  This admin dashboard is only available in preview deployments with NEXT_PUBLIC_FEATURE_ADMIN=true. 
                  It will not be accessible in production.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
