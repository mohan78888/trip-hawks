
import React, { useState } from 'react';

const ALL_OFFERS = [
  {
    id: '1',
    category: 'Domestic',
    title: 'Fly to Mumbai at $2,999',
    description: 'Special weekend fares for all major cities to Mumbai. Limited seats available.',
    code: 'MUMFLY',
    discount: 'FLAT $1,000 OFF',
    image: 'https://images.unsplash.com/photo-1570160897040-30430ade221e?auto=format&fit=crop&q=80&w=400',
    color: 'bg-blue-600'
  },
  {
    id: '2',
    category: 'International',
    title: 'European Summer Sale',
    description: 'Book your dream European vacation now and save big on return tickets.',
    code: 'EUROSUMMER',
    discount: 'UP TO 15% OFF',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=400',
    color: 'bg-indigo-600'
  },
  {
    id: '3',
    category: 'Bank',
    title: 'HDFC Card Cashback',
    description: 'Use your HDFC Bank Credit Card to get additional cashback on every flight.',
    code: 'HDFCHAWK',
    discount: '10% CASHBACK',
    image: 'https://images.unsplash.com/photo-1589758438368-2151aa2914f9?auto=format&fit=crop&q=80&w=400',
    color: 'bg-emerald-600'
  },
  {
    id: '4',
    category: 'Domestic',
    title: 'Goa Calling - Special Offer',
    description: 'Unwind at the beaches with our special discounted Goa fares.',
    code: 'BEACHGOA',
    discount: 'FLAT 20% OFF',
    image: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&q=80&w=400',
    color: 'bg-orange-500'
  },
  {
    id: '5',
    category: 'International',
    title: 'Dubai Gateway Deal',
    description: 'Free visa processing and flight discount for Dubai bookings.',
    code: 'DXBFLY',
    discount: 'VISA + $3,000 OFF',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400',
    color: 'bg-blue-900'
  },
  {
    id: '6',
    category: 'Bank',
    title: 'ICICI Instant Discount',
    description: 'Get an instant discount of up to $2,500 on international sectors.',
    code: 'ICICIFLY',
    discount: '$2,500 OFF',
    image: 'https://images.unsplash.com/photo-1601597111158-2fcee29a4a04?auto=format&fit=crop&q=80&w=400',
    color: 'bg-blue-500'
  }
];

interface OffersPageProps {
  onBack: () => void;
}

const OffersPage: React.FC<OffersPageProps> = ({ onBack }) => {
  const [filter, setFilter] = useState('All');

  const filteredOffers = filter === 'All' 
    ? ALL_OFFERS 
    : ALL_OFFERS.filter(o => o.category === filter);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Premium Hero */}
      <section className="bg-blue-900 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-800/20 -skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors mb-8 font-bold text-sm uppercase tracking-widest"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">Tour Help Desk Exclusives</h1>
              <p className="text-blue-100 text-lg font-medium leading-relaxed">
                Hand-picked travel deals, bank offers, and seasonal discounts curated by our travel experts. Book early and save big.
              </p>
            </div>
            <div className="hidden lg:block w-32 h-32 bg-orange-500 rounded-[2.5rem] flex items-center justify-center text-white rotate-12 animate-float">
               <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.2c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" fill="currentColor"/></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-3 shadow-xl flex flex-wrap gap-2 inline-flex border border-slate-100">
          {['All', 'Domestic', 'International', 'Bank'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all ${filter === f ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {f} Offers
            </button>
          ))}
        </div>
      </div>

      {/* Offers Grid */}
      <section className="max-w-7xl mx-auto px-4 mt-10 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-md md:shadow-lg group hover:shadow-xl md:hover:shadow-2xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-500">
              <div className="h-32 md:h-48 relative overflow-hidden">
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-2 left-2 md:top-4 md:left-4">
                  <div className={`px-2.5 py-1 md:px-4 md:py-1.5 rounded-full text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest ${offer.color} shadow-md md:shadow-lg`}>
                    {offer.discount}
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-8">
                <div className="flex items-center gap-2 mb-2 md:mb-3 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                  {offer.category}
                </div>
                <h3 className="text-base md:text-xl font-bold text-slate-900 mb-2 md:mb-3 group-hover:text-blue-600 transition-colors">{offer.title}</h3>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-4 md:mb-8">
                  {offer.description}
                </p>
                
                <div className="flex items-center justify-between bg-slate-50 rounded-xl md:rounded-2xl p-3 md:p-4 border border-slate-100 group-hover:border-blue-100 transition-colors">
                  <div>
                    <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Use Code</span>
                    <span className="text-sm md:text-lg font-black text-blue-900 tracking-tight">{offer.code}</span>
                  </div>
                  <button className="text-blue-600 font-black text-[10px] md:text-xs hover:underline decoration-2 underline-offset-4">COPY CODE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Call-Only Section */}
      <section className="max-w-7xl mx-auto px-4 mt-24">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-0"></div>
          
          <div className="shrink-0 relative z-10">
             <div className="w-24 h-24 bg-orange-500 rounded-[2rem] flex items-center justify-center text-white shadow-2xl animate-float">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
             </div>
          </div>
          
          <div className="flex-grow text-center md:text-left relative z-10">
             <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Unlock Hidden "Call-Only" Deals</h2>
             <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
               Some premium airline inventory is strictly available via phone booking only. Save up to <span className="text-orange-500 font-black underline">$4,000 extra</span> on business and first-class travel.
             </p>
          </div>
          
          <div className="shrink-0 relative z-10">
             <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">Priority Support Line</span>
                <a href="tel:18887918007" className="text-3xl font-black text-white hover:text-orange-500 transition-colors block mb-6">1888 791 8007</a>
                <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-bold">
                   <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                   Expert Agents Online Now
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 text-center">
         <div className="max-w-2xl mx-auto px-4">
            <h4 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-8">Trust in Every Mile</h4>
            <p className="text-xl font-bold text-slate-600 italic leading-relaxed">
              "Tour Help Desk offers aren't just about discounts; they're about the value of a premium experience. I saved $5,000 on my family trip to Dubai using their bank offer!"
            </p>
            <p className="mt-6 text-slate-900 font-black">Rajiv Mehra, Hawk Platinum Member</p>
         </div>
      </section>
    </div>
  );
};

export default OffersPage;