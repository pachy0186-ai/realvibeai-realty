import Image from "next/image";
import Link from "next/link";

export default function VirtualStagingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            AI-Powered Virtual Staging
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Transform empty or outdated spaces into beautifully staged rooms in minutes. 
            Help buyers visualize the potential of any property with professional AI staging.
          </p>
          <Link
            href="/realty/contact"
            className="btn-primary bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4"
          >
            Try Virtual Staging Free
          </Link>
        </div>
      </section>

      {/* Before/After Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See the Transformation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI staging technology creates stunning, realistic room designs that help properties sell faster and for higher prices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Living Room Example */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Living Room</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2 text-center">Before</p>
                  <div className="bg-gray-300 h-48 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0" />
                      </svg>
                      <span className="text-gray-500 text-sm">Empty Room</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2 text-center">After AI Staging</p>
                  <div className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 h-48 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3" />
                      </svg>
                      <span className="text-purple-600 text-sm">Modern Furnished</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Modern style with neutral colors, perfect for attracting young professionals
              </p>
            </div>

            {/* Bedroom Example */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Master Bedroom</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2 text-center">Before</p>
                  <div className="bg-gray-300 h-48 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0" />
                      </svg>
                      <span className="text-gray-500 text-sm">Outdated Decor</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2 text-center">After AI Staging</p>
                  <div className="bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 h-48 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0" />
                      </svg>
                      <span className="text-green-600 text-sm">Luxury Bedroom</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Elegant traditional style that appeals to families and mature buyers
              </p>
            </div>
          </div>

          {/* Kitchen Example */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Kitchen & Dining</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2 text-center">Before</p>
                  <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0" />
                      </svg>
                      <span className="text-gray-500">Bare Kitchen</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2 text-center">After AI Staging</p>
                  <div className="bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100 h-64 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-orange-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                      <span className="text-orange-600">Warm & Inviting</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Warm, inviting kitchen with dining setup that showcases the space's potential for entertaining
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose AI Virtual Staging?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Traditional staging can cost thousands and take weeks. Our AI solution delivers professional results instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cost-Effective</h3>
              <p className="text-gray-600">
                Save thousands compared to traditional staging. No furniture rental, no setup fees, no monthly costs. 
                One-time staging that lasts throughout your listing period.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600">
                Get professionally staged photos in under 5 minutes per room. No waiting for furniture delivery 
                or setup crews. Perfect for last-minute listing needs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Multiple Styles</h3>
              <p className="text-gray-600">
                Choose from Modern, Traditional, Minimalist, and Luxury styles. Target different buyer demographics 
                with the same property using different staging approaches.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">High Quality Output</h3>
              <p className="text-gray-600">
                Professional-grade images ready for MLS, marketing materials, and social media. 
                High resolution output that looks realistic and appealing to buyers.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy to Use</h3>
              <p className="text-gray-600">
                Simply upload your empty room photos and select your preferred style. 
                Our AI handles the rest. No design experience required.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Proven Results</h3>
              <p className="text-gray-600">
                Staged homes sell 73% faster and for 10% more than unstaged homes. 
                Our AI staging provides the same benefits at a fraction of the cost.
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-8 py-6 bg-gray-50 border-b">
              <h3 className="text-2xl font-semibold text-gray-900 text-center">
                Traditional vs AI Virtual Staging
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Traditional Staging</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">AI Virtual Staging</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Cost</td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">$2,000 - $5,000+</td>
                    <td className="px-6 py-4 text-sm text-green-600 text-center font-semibold">$50 - $200</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Time to Complete</td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">1-2 weeks</td>
                    <td className="px-6 py-4 text-sm text-green-600 text-center font-semibold">5 minutes</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Flexibility</td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">Limited changes</td>
                    <td className="px-6 py-4 text-sm text-green-600 text-center font-semibold">Unlimited revisions</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Style Options</td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">1 style per staging</td>
                    <td className="px-6 py-4 text-sm text-green-600 text-center font-semibold">Multiple styles available</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Maintenance</td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-center">Ongoing cleaning & upkeep</td>
                    <td className="px-6 py-4 text-sm text-green-600 text-center font-semibold">None required</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How AI Virtual Staging Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced AI technology analyzes your space and creates realistic, professional staging in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Photos</h3>
              <p className="text-gray-600">
                Upload high-quality photos of your empty or outdated rooms. 
                Best results with good lighting and clear angles.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Style</h3>
              <p className="text-gray-600">
                Select from Modern, Traditional, Minimalist, or Luxury styles 
                based on your target buyer demographic.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Processing</h3>
              <p className="text-gray-600">
                Our AI analyzes the space, lighting, and architecture to create 
                realistic furniture placement and decor.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Download Results</h3>
              <p className="text-gray-600">
                Receive high-resolution staged photos ready for MLS, 
                marketing materials, and social media promotion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Stage Your Next Listing?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Transform empty spaces into buyer magnets with professional AI staging. 
            Get started with your free trial today.
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

          <div className="mt-8 text-sm text-gray-300">
            No credit card required • 5 free staging credits • Professional results guaranteed
          </div>
        </div>
      </section>
    </div>
  );
}
