import React from 'react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-100 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-8 font-bold text-xs uppercase tracking-widest"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
            Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Privacy & Policy</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-16">
          <section>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg space-y-6">
              <p>
                Tour Help Desk Inc. ("Tour Help Desk Inc.", "Company," "Us" or "We") values your
                privacy and is dedicated to safeguarding it through our adherence to this
                policy. This Privacy Notice and Policy (hereafter the "Policy") outlines the
                types of information we may gather from you or that you may furnish when
                utilizing www.TourHelpDesk.com and the Company's mobile website, or any content,
                features, and services offered on or through TourHelpDesk.com, as well as our
                procedures for collecting, utilizing, maintaining, safeguarding, sharing, and
                divulging that information.
              </p>

              <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">This Policy applies to information we gather:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>When you access the Website, App, and/or utilize our online services;</li>
                <li>Through email, text, and other electronic communications between you and this Website or App; and</li>
                <li>When you engage with our advertisements and applications available on third-party websites and services if those applications or advertisements contain links to this Policy.</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">This Policy does not cover information collected by:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Us offline or through any other means, including on any other website operated by the Company or any third party; or</li>
                <li>Any third party, including through any application or content (including advertising) that may link to or be accessible from or on the Website.</li>
              </ul>

              <p>
                Please review this Policy attentively to understand our protocols and practices
                regarding your information and how we will handle it. Kindly check the Policy
                periodically for updates.
              </p>

              <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">Children under the Age of 13</h2>
              
              <p>
                Our Website is not intended for, intentionally targeted to, or designed for use
                by children under 13 years of age. We do not knowingly or intentionally collect
                personal information from children under 13. If you are under 13, refrain from
                using or providing any information on or through this Website, the App, or any
                of their features; do not register on the Website, make any purchases through
                the Website, utilize any of the interactive or public comment features of this
                Website, or provide any information about yourself to us, including your name,
                address, telephone number, email address, or any screen name or user name you
                may use. If we become aware of collecting or receiving personal information from
                a child under 13 without verification of parental consent, we will erase that
                information. If you suspect we may have any information from or about a child
                under 13, please contact us at email care@TourHelpDesk.com
              </p>

              <h2 className="text-2xl font-black text-slate-900 mt-12 mb-6">INFORMATION WE COLLECT ABOUT YOU AND HOW WE COLLECT IT</h2>
              
              <p>
                We gather various types of information from and about users of our Website,
                including:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Information through which you may be personally identified, such as name, residential address, postal address, email address, telephone number, credit card numbers or other payment details, or any other identifier by which you may be contacted online or offline ("personal information");</li>
                <li>Information about you that does not individually identify you;</li>
                <li>Details about your internet connection and IP address, the devices you use to access our Website, browser type and language, and access dates/times, referring website addresses, and other usage particulars;</li>
                <li>Categories of personal information specified in subdivision (e) of Section 1798.80 of the California Civil Code, such as name, physical description, address, telephone number, and medical or health insurance information;</li>
                <li>Characteristics of protected classifications under state or federal law, such as age, gender, marital status, medical condition, and disability information;</li>
                <li>Information you provide on our Website to facilitate travel arrangements for yourself or another person, including but not limited to, your username, password, location, zip/postal code, mailing address, email address, driver's license, passport or other government-issued identification numbers, date of birth, gender, arrival and departure details, airline, hotel, or car.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
