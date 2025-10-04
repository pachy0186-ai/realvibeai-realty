import Link from "next/link";

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Get answers to common questions about RealVibeAI's lead qualification, 
            virtual staging, and how our platform helps real estate agents succeed.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Getting Started */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Getting Started</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  How quickly can I get started with RealVibeAI?
                </h3>
                <p className="text-gray-600">
                  You can be up and running in under 10 minutes. Simply sign up for your free trial, 
                  connect your lead sources (we support most popular CRMs and lead capture forms), 
                  and our AI will start qualifying your leads immediately. No technical expertise required.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Do I need to change my existing workflow?
                </h3>
                <p className="text-gray-600">
                  Not at all. RealVibeAI integrates seamlessly with your current tools and processes. 
                  You'll continue receiving leads as usual, but now they'll come with AI-powered qualification 
                  scores and detailed reasoning to help you prioritize your follow-up efforts.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What if I'm not tech-savvy?
                </h3>
                <p className="text-gray-600">
                  RealVibeAI is designed for real estate agents, not tech experts. Our interface is intuitive, 
                  and we provide step-by-step guidance throughout the setup process. Plus, our support team 
                  is always available to help you get the most out of the platform.
                </p>
              </div>
            </div>
          </div>

          {/* Lead Qualification */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Lead Qualification</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  How accurate is the AI lead qualification?
                </h3>
                <p className="text-gray-600">
                  Our AI achieves 87% accuracy in lead qualification, continuously improving as it processes more data. 
                  The system analyzes multiple factors including engagement level, response patterns, timeline indicators, 
                  budget signals, and behavioral cues to provide reliable Hot/Warm/Cold scoring.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What makes a lead "Hot," "Warm," or "Cold"?
                </h3>
                <p className="text-gray-600 mb-4">
                  Our AI considers multiple factors to determine lead temperature:
                </p>
                <ul className="text-gray-600 space-y-2 ml-4">
                  <li><strong>Hot Leads:</strong> Ready to buy/sell within 30 days, specific requirements, confirmed budget, high engagement</li>
                  <li><strong>Warm Leads:</strong> Interested but need nurturing, exploring options, 30-90 day timeline, moderate engagement</li>
                  <li><strong>Cold Leads:</strong> Early research phase, general inquiries, timeline beyond 90 days or unclear, low engagement</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Can I customize the qualification criteria?
                </h3>
                <p className="text-gray-600">
                  Yes, with our Professional and Enterprise plans, you can set custom scoring rules based on your 
                  specific market and preferences. For example, you might prioritize certain price ranges, 
                  neighborhoods, or property types that align with your expertise.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What if the AI gets it wrong?
                </h3>
                <p className="text-gray-600">
                  You can provide feedback on any lead qualification, and our AI learns from your corrections. 
                  Over time, the system becomes more accurate for your specific business. We also provide detailed 
                  reasoning for each score, so you can make informed decisions even when you disagree with the AI.
                </p>
              </div>
            </div>
          </div>

          {/* Virtual Staging */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Virtual Staging</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  How realistic does the virtual staging look?
                </h3>
                <p className="text-gray-600">
                  Our AI creates photorealistic staging that's virtually indistinguishable from professional photography. 
                  The system understands lighting, perspective, and spatial relationships to place furniture and decor 
                  naturally within the space. Most buyers can't tell the difference between our AI staging and traditional staging.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What types of rooms can be staged?
                </h3>
                <p className="text-gray-600">
                  We can stage any interior space including living rooms, bedrooms, kitchens, dining rooms, 
                  home offices, bathrooms, and more. The AI works best with well-lit, clear photos that show 
                  the entire room from a good angle.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  How long does virtual staging take?
                </h3>
                <p className="text-gray-600">
                  Most staging requests are completed in under 5 minutes. Simply upload your photos, 
                  select your preferred style (Modern, Traditional, Minimalist, or Luxury), and download 
                  your high-resolution staged images ready for MLS and marketing materials.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Can I request revisions to the staging?
                </h3>
                <p className="text-gray-600">
                  Yes, you can request adjustments or try different styles at no additional cost. 
                  Each staging credit allows for unlimited revisions until you're satisfied with the result. 
                  We want you to have the perfect staging for your listing.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing & Plans */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pricing & Plans</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Is there really no setup fee?
                </h3>
                <p className="text-gray-600">
                  Correct. We believe in transparent pricing with no hidden costs. You pay only your monthly 
                  subscription fee and any optional add-ons you choose. No setup fees, no activation charges, 
                  no long-term contracts required.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What happens if I cancel my subscription?
                </h3>
                <p className="text-gray-600">
                  You can cancel anytime with no penalties. Your account remains active until the end of your 
                  current billing period, and you'll retain access to all your data and analytics. 
                  Any unused virtual staging credits will remain available if you reactivate your account later.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Do you offer discounts for annual payments?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer a 20% discount when you pay annually. This can save you significant money, 
                  especially on our Professional plan. Annual subscribers also receive priority support and 
                  early access to new features.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Privacy & Security</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  How do you protect my lead data?
                </h3>
                <p className="text-gray-600">
                  We use enterprise-grade security including SSL encryption, secure data centers, and regular 
                  security audits. Your lead data is never shared, sold, or used for any purpose other than 
                  providing you with qualification services. We're SOC 2 compliant and follow strict data protection protocols.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Do you sell my leads to other agents?
                </h3>
                <p className="text-gray-600">
                  Absolutely not. Your leads are yours, period. We never resell, share, or distribute your lead 
                  information to competitors or third parties. This is a core principle of our privacy-first approach 
                  and a key differentiator from other platforms.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Can I export my data if I leave?
                </h3>
                <p className="text-gray-600">
                  Yes, you own your data and can export it anytime. We provide easy export tools for your leads, 
                  qualification scores, analytics, and any other data you've generated on our platform. 
                  No data lock-in or export fees.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Support */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Support</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What kind of support do you provide?
                </h3>
                <p className="text-gray-600">
                  All plans include email support with responses within 24 hours. Professional plan subscribers 
                  get priority support with faster response times. Enterprise plan subscribers also receive phone 
                  support and dedicated account management.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Do you provide training on how to use the platform?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer comprehensive onboarding resources including video tutorials, best practices guides, 
                  and live training sessions. We also offer optional 1-on-1 training sessions for $99 to help you 
                  maximize your ROI and learn advanced features.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What if my CRM isn't supported?
                </h3>
                <p className="text-gray-600">
                  We support most popular real estate CRMs and are constantly adding new integrations. 
                  If your CRM isn't currently supported, we can often build a custom integration for $199. 
                  We also support CSV imports and manual lead entry as alternatives.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">
                Get detailed answers to your questions via email. We typically respond within 24 hours.
              </p>
              <Link
                href="/realty/contact"
                className="btn-secondary"
              >
                Contact Support
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Demo</h3>
              <p className="text-gray-600 mb-4">
                Schedule a personalized demo to see RealVibeAI in action and get your questions answered live.
              </p>
              <Link
                href="/realty/contact"
                className="btn-secondary"
              >
                Schedule Demo
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Try RealVibeAI risk-free with our 14-day free trial. No credit card required.
            </p>
            <Link
              href="/realty/contact"
              className="btn-primary text-lg px-8 py-4"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Questions Answered. Ready to Start?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join hundreds of agents who are already saving time and closing more deals with AI-powered lead qualification.
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
