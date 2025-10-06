import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Lead Qualification Solutions - RealVibeAI Realty',
  description: 'Discover how our AI-powered lead qualification system automatically scores prospects as Hot, Warm, or Cold with detailed reasoning. Built for solo real estate agents.',
  keywords: 'AI lead qualification, real estate lead scoring, automated lead analysis, CRM integration',
  openGraph: {
    title: 'AI Lead Qualification Solutions - RealVibeAI Realty',
    description: 'Discover how our AI-powered lead qualification system automatically scores prospects as Hot, Warm, or Cold with detailed reasoning.',
    url: 'https://www.realvibeai.com/realty/solutions',
    siteName: 'RealVibeAI Realty',
    images: [
      {
        url: 'https://www.realvibeai.com/hero-banner-realvibeai.jpg',
        width: 1200,
        height: 630,
        alt: 'RealVibeAI Realty - AI Lead Qualification Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            AI-Powered Solutions for Real Estate Agents
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Discover how RealVibeAI transforms your lead management process with intelligent automation, 
            precise qualification, and actionable insights that help you close more deals.
          </p>
        </div>
      </section>

      {/* Lead Qualification Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Smart Lead Qualification
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our advanced AI analyzes every lead interaction to provide instant Hot, Warm, or Cold scoring. 
                No more guessing which prospects deserve your immediate attention.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Hot Leads</h3>
                    <p className="text-gray-600">Ready to buy or sell immediately. High engagement, specific requirements, timeline within 30 days.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Warm Leads</h3>
                    <p className="text-gray-600">Interested but need nurturing. Moderate engagement, exploring options, timeline 30-90 days.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Cold Leads</h3>
                    <p className="text-gray-600">Early research phase. Low engagement, general inquiries, timeline beyond 90 days or unclear.</p>
                  </div>
                </div>
              </div>

              <Link
                href="/realty/contact"
                className="btn-primary"
              >
                See Lead Qualification in Action
              </Link>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sample AI Analysis</h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-red-600 bg-red-100 px-2 py-1 rounded">HOT LEAD</span>
                  <span className="text-sm text-gray-500">Score: 92/100</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">John & Sarah Martinez</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Looking for 3BR home in Westfield, budget $450-500K, pre-approved, need to move by March 15th for job relocation.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>AI Reasoning:</strong> Specific requirements, confirmed budget, urgent timeline, pre-approved financing. 
                  High probability of conversion within 30 days.
                  <div className="mt-1 text-xs text-blue-600 italic">
                    AI-generated—may be imperfect. Use your judgment.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Staging Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Before & After</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Empty Room</p>
                    <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Before Staging</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">AI Staged</p>
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-32 rounded-lg flex items-center justify-center">
                      <span className="text-gray-700 text-sm">After Staging</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Professional staging in minutes, not days. Multiple style options available.
                  <span className="block mt-1 text-blue-600 italic">
                    AI-generated—may be imperfect. Use your judgment.
                  </span>
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                AI-Powered Virtual Staging
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Transform empty or outdated spaces into beautifully staged rooms that help buyers visualize 
                the potential of any property. Our AI staging technology creates professional results in minutes.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Multiple design styles (Modern, Traditional, Minimalist)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">High-resolution output ready for MLS and marketing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Results in under 5 minutes per room</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Cost-effective alternative to physical staging</span>
                </div>
              </div>

              <Link
                href="/realty/virtual-staging"
                className="btn-primary"
              >
                Explore Virtual Staging
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics & Insights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real-Time Analytics & Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Make data-driven decisions with comprehensive analytics that track your lead quality, 
              conversion rates, and time savings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Analytics Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lead Quality Trends</h3>
              <p className="text-gray-600">
                Track the quality of your leads over time. Identify which sources provide the highest-quality prospects 
                and optimize your marketing spend accordingly.
              </p>
            </div>

            {/* Analytics Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Conversion Tracking</h3>
              <p className="text-gray-600">
                Monitor your conversion rates from lead to closing. See how AI qualification improves your 
                success rate and helps you focus on the right opportunities.
              </p>
            </div>

            {/* Analytics Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Time Savings Report</h3>
              <p className="text-gray-600">
                Quantify exactly how much time you're saving by not pursuing cold leads. 
                See your productivity gains and ROI from AI-powered qualification.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 p-8 rounded-xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Sample Analytics Dashboard
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">87%</div>
                <div className="text-sm text-gray-600">Lead Quality Score</div>
                <div className="text-xs text-green-600 mt-1"> + 23% from last month </div>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">3.2h</div>
                <div className="text-sm text-gray-600">Daily Time Saved</div>
                <div className="text-xs text-green-600 mt-1"> +45% efficiency gain </div>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">42%</div>
                <div className="text-sm text-gray-600">Conversion Rate</div>
                <div className="text-xs text-green-600 mt-1"> +18% improvement </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              RealVibeAI works with your existing tools and workflows. No need to change your entire system.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Integration logos would go here */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-12 bg-gray-200 rounded mb-3"></div>
              <p className="text-sm text-gray-600">Popular CRMs</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-12 bg-gray-200 rounded mb-3"></div>
              <p className="text-sm text-gray-600">Lead Sources</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-12 bg-gray-200 rounded mb-3"></div>
              <p className="text-sm text-gray-600">Email Platforms</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-12 bg-gray-200 rounded mb-3"></div>
              <p className="text-sm text-gray-600">MLS Systems</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Don't see your platform? We're constantly adding new integrations.
            </p>
            <Link
              href="/realty/contact"
              className="btn-secondary"
            >
              Request Integration
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Lead Management?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join hundreds of agents who are already saving time and closing more deals with AI-powered solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/realty/contact"
              className="btn-primary bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4"
            >
              Start Free Trial
            </Link>
            <Link
              href="/realty/pricing"
              className="btn-secondary border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
