import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            No hidden fees, no surprise charges. Choose the plan that fits your business. 
            All plans include our core AI lead qualification features.
          </p>
          <div className="text-sm text-gray-300">
            ✓ Cancel anytime • ✓ No setup fees
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Starter Plan */}
            <div className="bg-white rounded-xl shadow-lg p-8 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Starter</h3>
                <p className="text-gray-600 mb-6">Perfect for new agents getting started</p>
                <div className="text-5xl font-bold text-gray-900 mb-2">$29</div>
                <div className="text-gray-600">per month</div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">AI Lead Qualification (Hot / Warm / Cold)</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Daily lead summaries by email</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">1 brand profile</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
<<<<<<< HEAD
                  <span className="text-gray-700">Email support</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">5 virtual staging credits (AI previews in minutes, final renders in 24–48 h)</span>
=======
                  <span className="text-gray-700">Standard support</span>
>>>>>>> 74b369d (feat: Align pricing language and CTAs across realty pages)
                </li>
              </ul>

              <Link
                href="/realty/pricing"
                className="w-full btn-secondary text-center block"
              >
                See plans & get started
              </Link>
            </div>

            {/* Professional Plan - Most Popular */}
            <div className="bg-white rounded-xl shadow-lg p-8 relative border-2 border-purple-500">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Professional</h3>
                <p className="text-gray-600 mb-6">Ideal for active solo agents</p>
                <div className="text-5xl font-bold text-purple-600 mb-2">$49</div>
                <div className="text-gray-600">per month</div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Everything in Starter</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Virtual Staging workflow access (24–48h turnaround)</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Up to 3 brand profiles</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
<<<<<<< HEAD
                  <span className="text-gray-700">Priority email support</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">20 virtual staging credits (AI previews in minutes, final renders in 24–48 h)</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">CRM integrations</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Custom lead scoring rules</span>
=======
                  <span className="text-gray-700">Priority support</span>
>>>>>>> 74b369d (feat: Align pricing language and CTAs across realty pages)
                </li>
              </ul>

              <Link
                href="/realty/pricing"
                className="w-full btn-primary text-center block"
              >
                See plans & get started
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl shadow-lg p-8 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-6">For high-volume agents and small teams</p>
                <div className="text-5xl font-bold text-gray-900 mb-2">$99</div>
                <div className="text-gray-600">per month</div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Everything in Professional</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Team onboarding & admin</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
<<<<<<< HEAD
                  <span className="text-gray-700">50 virtual staging credits (AI previews in minutes, final renders in 24–48 h)</span>
=======
                  <span className="text-gray-700">Custom integrations & SLAs</span>
>>>>>>> 74b369d (feat: Align pricing language and CTAs across realty pages)
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Volume discounts & dedicated success manager</span>
                </li>
              </ul>

              <Link
                href="/realty/pricing"
                className="w-full btn-secondary text-center block"
              >
                See plans & get started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Optional Add-ons
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your plan with additional features and services as needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add-on 1 */}
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Extra Staging Credits</h3>
              <div className="text-3xl font-bold text-purple-600 mb-2">$5</div>
              <div className="text-gray-600 mb-4">per credit</div>
              <p className="text-gray-600 text-sm">
                Need more virtual staging? Purchase additional credits as needed. 
                Credits never expire.
              </p>
            </div>

            {/* Add-on 2 */}
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Integration</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">$199</div>
              <div className="text-gray-600 mb-4">one-time setup</div>
              <p className="text-gray-600 text-sm">
                Need a custom integration with your CRM or lead source? 
                Our team will build it for you.
              </p>
            </div>

            {/* Add-on 3 */}
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Training & Onboarding</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">$99</div>
              <div className="text-gray-600 mb-4">one-time</div>
              <p className="text-gray-600 text-sm">
                1-on-1 training session to maximize your ROI and learn best practices 
                from our experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pricing Questions?
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our pricing and plans.
            </p>
          </div>

          <div className="space-y-8">
            {/* FAQ 1 */}
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-600">
                Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                and we'll prorate any billing adjustments on your next invoice.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What happens if I exceed my lead limit?
              </h3>
              <p className="text-gray-600">
                For the Starter plan, additional leads are processed at $0.50 per lead. We'll notify you before 
                you reach your limit. Professional and Enterprise plans have unlimited lead qualification.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Do virtual staging credits roll over?
              </h3>
              <p className="text-gray-600">
                Yes, unused virtual staging credits roll over to the next month and never expire. 
                You can also purchase additional credits anytime at $5 per credit.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Is there a setup fee?
              </h3>
              <p className="text-gray-600">
                No setup fees, ever. We believe in transparent pricing. The only costs are your monthly subscription 
                and any optional add-ons you choose.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What's your refund policy?
              </h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee. If you're not satisfied with RealVibeAI within your first 30 days, 
                we'll refund your payment in full, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Calculate Your ROI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how much time and money you can save with AI-powered lead qualification.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Without RealVibeAI</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time spent on cold leads (per week)</span>
                    <span className="font-semibold">15 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your hourly value</span>
                    <span className="font-semibold">$75</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weekly cost of wasted time</span>
                    <span className="font-semibold text-red-600">$1,125</span>
                  </div>
                  <div className="flex justify-between border-t pt-4">
                    <span className="text-gray-600 font-semibold">Monthly cost</span>
                    <span className="font-bold text-red-600 text-xl">$4,500</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">With RealVibeAI</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time spent on cold leads (per week)</span>
                    <span className="font-semibold">2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">RealVibeAI Professional plan</span>
                    <span className="font-semibold">$49</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weekly time savings value</span>
                    <span className="font-semibold text-green-600">$975</span>
                  </div>
                  <div className="flex justify-between border-t pt-4">
                    <span className="text-gray-600 font-semibold">Monthly savings</span>
                    <span className="font-bold text-green-600 text-xl">$3,851</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 p-6 bg-green-100 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">7,867% ROI</div>
              <p className="text-green-700">
                Based on saving 13 hours per week at $75/hour value
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Saving Time?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join hundreds of agents who are already qualifying leads smarter and closing more deals. 
            Start your free trial today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/realty/contact"
              className="btn-primary bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4"
            >
              Start Free Trial
            </Link>
            <Link
              href="/realty/contact"
              className="btn-secondary border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4"
            >
              Contact Sales
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-300">
            14-day free trial • No credit card required • 30-day money-back guarantee
          </div>
        </div>
      </section>
    </div>
  );
}
