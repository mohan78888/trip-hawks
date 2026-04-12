
import React from 'react';

const TrustBar: React.FC = () => {
  return (
    <div className="bg-slate-50 border-y border-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-4 animate-float">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h4 className="font-bold text-slate-800">100% Secure</h4>
            <p className="text-xs text-slate-500 mt-1">PCI-DSS Compliant payments</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-4 animate-float" style={{animationDelay: '1s'}}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h4 className="font-bold text-slate-800">24x7 Support</h4>
            <p className="text-xs text-slate-500 mt-1">Real human assistance</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-4 animate-float" style={{animationDelay: '2s'}}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
            </div>
            <h4 className="font-bold text-slate-800">Easy Refunds</h4>
            <p className="text-xs text-slate-500 mt-1">Instant wallet credit</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-4 animate-float" style={{animationDelay: '3s'}}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <h4 className="font-bold text-slate-800">Mobile First</h4>
            <p className="text-xs text-slate-500 mt-1">Book on the go</p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-12 text-center">
          <p className="text-slate-400 font-semibold uppercase tracking-widest text-xs mb-8">Our Airline Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40 hover:grayscale-0 transition-all">
            <img src="https://picsum.photos/seed/a1/100/40" alt="Partner 1" className="h-10" />
            <img src="https://picsum.photos/seed/a2/100/40" alt="Partner 2" className="h-10" />
            <img src="https://picsum.photos/seed/a3/100/40" alt="Partner 3" className="h-10" />
            <img src="https://picsum.photos/seed/a4/100/40" alt="Partner 4" className="h-10" />
            <img src="https://picsum.photos/seed/a5/100/40" alt="Partner 5" className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
