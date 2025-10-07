// app/legal/data-deletion/page.tsx

// Make this a fully static page so Vercel serves HTML (no lambda expected)
export const dynamic = 'force-static';
export const revalidate = false;

export default function DataDeletionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1>Data Deletion Policy</h1>
        <p className="text-gray-600 text-lg">Last Updated: September 27, 2025</p>

        <h2>Your Right to Data Deletion</h2>
        <p>
          At RealVibeAI Realty, we respect your privacy and your right to control your personal data.
          You have the right to request deletion of your personal information at any time.
        </p>

        <h2>What Data Can Be Deleted</h2>
        <p>Upon request, we will delete the following information:</p>
        <ul>
          <li><strong>Contact Information:</strong> Name, email address, phone number</li>
          <li><strong>Communication History:</strong> All emails, messages, and interaction records</li>
          <li><strong>Lead Data:</strong> Qualification scores, priority ratings, and AI analysis</li>
          <li><strong>Preferences:</strong> Communication settings and opt-in/opt-out choices</li>
          <li><strong>AI Interaction Logs:</strong> Records of AI-generated communications and decisions</li>
          <li><strong>Social Profile Data:</strong> Any enrichment data gathered from public sources</li>
        </ul>

        <h2>How to Request Data Deletion</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
          <h3 className="text-blue-900 mt-0">Submit a Deletion Request</h3>
          <p className="text-blue-800">
            Send an email to{' '}
            <a href="mailto:realvibeairealty@gmail.com" className="font-semibold">
              realvibeairealty@gmail.com
            </a>{' '}
            with:
          </p>
          <ul className="text-blue-800">
            <li><strong>Subject Line:</strong> "Data Deletion Request"</li>
            <li><strong>Your Name:</strong> Full name associated with your account</li>
            <li><strong>Email Address:</strong> The email address you want deleted</li>
            <li><strong>Verification:</strong> We may ask for additional verification for security</li>
          </ul>
        </div>

        <h2>Processing Timeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-purple-600 font-semibold">Step 1: Verification</h4>
            <p className="text-sm text-gray-600">1-2 business days</p>
            <p>We verify your identity to protect your data security.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-purple-600 font-semibold">Step 2: Processing</h4>
            <p className="text-sm text-gray-600">5-10 business days</p>
            <p>We locate and prepare all your data for deletion across our systems.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-purple-600 font-semibold">Step 3: Confirmation</h4>
            <p className="text-sm text-gray-600">Within 30 days</p>
            <p>We confirm completion and provide a deletion certificate.</p>
          </div>
        </div>

        <h2>Important Considerations</h2>

        <h3>Legal Retention Requirements</h3>
        <p>Some data may be retained if required by law, including:</p>
        <ul>
          <li>Financial transaction records (tax compliance)</li>
          <li>Legal dispute documentation</li>
          <li>Regulatory compliance records</li>
        </ul>

        <h3>Impact of Data Deletion</h3>
        <p>After data deletion:</p>
        <ul>
          <li>You will no longer receive any communications from us</li>
          <li>Your lead qualification history will be permanently removed</li>
          <li>Any AI-generated insights about your profile will be deleted</li>
          <li>You cannot recover this data once deleted</li>
        </ul>

        <h3>Partial Deletion Options</h3>
        <p>If you don&apos;t want complete deletion, you can request:</p>
        <ul>
          <li><strong>Communication Opt-Out:</strong> Stop receiving emails while keeping your data</li>
          <li><strong>AI Processing Opt-Out:</strong> Disable AI analysis while maintaining basic contact info</li>
          <li><strong>Specific Data Removal:</strong> Delete only certain types of information</li>
        </ul>

        <h2>Data Backup and Recovery</h2>
        <p>
          Please note that data may exist in backup systems for up to 90 days after deletion.
          These backups are secure and not accessible for normal operations, but complete
          removal from all backup systems may take up to 90 days.
        </p>

        <h2>Third-Party Data</h2>
        <p>
          If your data has been shared with third-party services (with your consent),
          we will notify these services of your deletion request. However, you may need
          to contact them directly to ensure complete removal from their systems.
        </p>

        <h2>Questions or Concerns</h2>
        <p>If you have questions about data deletion or need assistance with your request:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:realvibeairealty@gmail.com">realvibeairealty@gmail.com</a></li>
          <li><strong>Subject:</strong> "Data Deletion Support"</li>
          <li><strong>Response Time:</strong> Within 48 hours</li>
        </ul>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
          <h3 className="text-green-900 mt-0">Your Privacy Matters</h3>
          <p className="text-green-800 mb-0">
            We are committed to protecting your privacy and respecting your data rights.
            This deletion policy is part of our broader commitment to transparent,
            ethical data practices in real estate technology.
          </p>
        </div>
      </div>
    </div>
  );
}