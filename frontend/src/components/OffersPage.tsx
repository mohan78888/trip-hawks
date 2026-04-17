
import React, { useState } from 'react';

const ALL_OFFERS = [
  {
    id: '1',
    category: 'Domestic',
    title: 'Fly to London at $500',
    description: 'Special weekend fares for all major cities to London. Limited seats available.',
    code: 'Any Thing ELSE',
    discount: 'FLAT $1,000 OFF',
    image: 'https://images.unsplash.com/photo-1572364769167-198dcb7b520c?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: 'bg-blue-600'
  },
  {
    id: '2',
    category: 'International',
    title: 'European Summer Sale',
    description: 'Book your dream European vacation now and save big on return tickets.',
    code: 'Any Thing ELSE',
    discount: 'UP TO 15% OFF',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=400',
    color: 'bg-indigo-600'
  },
  {
    id: '3',
    category: 'Bank',
    title: 'Card Cashback',
    description: 'Use your Any Bank Credit Card to get additional cashback on every flight.',
    code: 'Any thing Else',
    discount: '10% CASHBACK',
    image: 'https://images.unsplash.com/photo-1612351978641-ecdafe9caaa5?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: 'bg-emerald-600'
  },
  {
    id: '4',
    category: 'Domestic',
    title: 'Balli Calling - Special Offer',
    description: 'Unwind at the beaches with our special discounted Bali fares.',
    code: 'Any Think ELSE',
    discount: 'FLAT 20% OFF',
    image: 'https://plus.unsplash.com/premium_photo-1661878915254-f3163e91d870?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    title: 'CREDIT Card Instant Discount',
    description: 'Get an instant discount of up to $2,500 on international sectors.',
    code: 'CREDITFLY',
    discount: '$2,500 OFF',
    image: 'https://media.istockphoto.com/id/2170880601/photo/customer-making-contactless-payment-in-a-bakery-shop.webp?s=1024x1024&w=is&k=20&c=fdkqx8BnsFBEKhW0LockKo_VfXi4wXtIaWR-IrsNXkw=',
    color: 'bg-blue-500'
  },
  {
    id: '7',
    category: 'International',
    title: 'Amore Italy Package',
    description: 'Experience the magic of Rome, Venice, and Florence with our exclusive flight bundle.',
    code: 'ITALYLOVE',
    discount: 'FLAT 15% OFF',
    image: 'https://plus.unsplash.com/premium_photo-1661962292128-879bb496ce17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGl0YWx5fGVufDB8fDB8fHww',
    color: 'bg-red-600'
  },
  {
    id: '8',
    category: 'International',
    title: 'Discover China Deals',
    description: 'Walk the Great Wall and explore ancient temples. Special discounts on round trips.',
    code: 'CHINATOUR',
    discount: 'SAVE $500',
    image: 'https://images.unsplash.com/photo-1517309230475-6736d926b979?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0',
    color: 'bg-red-700'
  },
  {
    id: '17',
    category: 'Domestic',
    title: 'Singapore City Break',
    description: 'Discover the spectacular Gardens by the Bay and stunning skyline of Singapore.',
    code: 'SINGAFLY',
    discount: 'UP TO 10% OFF',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=400',
    color: 'bg-red-500'
  },
  {
    id: '18',
    category: 'Domestic',
    title: 'Bangkok Adventure',
    description: 'Experience vibrant street life, ornate shrines, and authentic Thai cuisine.',
    code: 'BKKTRIP',
    discount: 'FLAT $50 OFF',
    image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&q=80&w=400',
    color: 'bg-yellow-500'
  },
  {
    id: '19',
    category: 'Domestic',
    title: 'New York Explorer',
    description: 'Take a bite out of the Big Apple in NYC. Flights out now at massive discounts.',
    code: 'NYCMAGIC',
    discount: 'SAVE $250',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=400',
    color: 'bg-sky-600'
  },
  {
    id: '20',
    category: 'Domestic',
    title: 'Toronto Calling',
    description: 'Visit the CN Tower and explore the beautiful diversity of Toronto.',
    code: 'YYZDEAL',
    discount: 'FLAT $100 OFF',
    image: 'https://images.unsplash.com/photo-1588733103629-b77afe0425ce?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: 'bg-red-600'
  },
  {
    id: '21',
    category: 'Domestic',
    title: 'Sydney Harbor Holiday',
    description: 'Sun, surf, and the iconic Opera House! Sydney is waiting for you.',
    code: 'SYDNEYGO',
    discount: '10% CASHBACK',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=400',
    color: 'bg-blue-600'
  },
  {
    id: '22',
    category: 'Domestic',
    title: 'Paris Romance',
    description: 'Fall in love with the city of lights. Special couples fare available.',
    code: 'PARISLOVE',
    discount: '20% OFF FOR TWO',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400',
    color: 'bg-fuchsia-500'
  },
  {
    id: '23',
    category: 'Domestic',
    title: 'Kuala Lumpur Getaway',
    description: 'Witness the majesty of the Petronas Twin Towers. Book early for best fares.',
    code: 'KLPROMO',
    discount: 'SAVE $75',
    image: 'https://images.unsplash.com/photo-1562060726-e47264af32bd?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: 'bg-teal-500'
  },
  {
    id: '24',
    category: 'Domestic',
    title: 'Istanbul Crossroads',
    description: 'Where East meets West. Discover the rich history of Istanbul.',
    code: 'ISTANBULFARE',
    discount: '$120 OFF',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=400',
    color: 'bg-orange-600'
  },
  {
    id: '25',
    category: 'Domestic',
    title: 'Tokyo Neon Nights',
    description: 'Experience futuristic Tokyo, from Shibuya crossing to historic temples.',
    code: 'TOKYOTRIP',
    discount: 'SAVE $300',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=400',
    color: 'bg-pink-500'
  },
  {
    id: '26',
    category: 'Domestic',
    title: 'Seoul Soul',
    description: 'K-pop culture, palaces, and amazing food await you in Seoul.',
    code: 'SEOULFLY',
    discount: 'FLAT 15% OFF',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=400',
    color: 'bg-purple-600'
  },
  {
    id: '27',
    category: 'Domestic',
    title: 'Berlin Explorer 🇩🇪',
    description: 'Experience the rich history, art, and vibrant culture of Germany’s capital.',
    code: 'BERLINFLY',
    discount: 'SAVE $150',
    image: 'https://images.unsplash.com/photo-1560930950-5cc20e80e392?auto=format&fit=crop&q=80&w=400',
    color: 'bg-indigo-600'
  },
  {
    id: '28',
    category: 'Domestic',
    title: 'Amsterdam Canals',
    description: 'Discover the scenic canals, historic museums, and incredible architecture.',
    code: 'AMSTERFLY',
    discount: 'FLAT 12% OFF',
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&q=80&w=400',
    color: 'bg-orange-500'
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-slate-100 shadow-md group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="h-32 md:h-40 relative overflow-hidden shrink-0">
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <div className={`px-2.5 py-1 md:px-3 md:py-1 rounded-full text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest ${offer.color} shadow-sm`}>
                    {offer.discount}
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-1.5 mb-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                  {offer.category}
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">{offer.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-grow">
                  {offer.description}
                </p>
                
                <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3 border border-slate-100 group-hover:border-blue-100 transition-colors mt-auto">
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Use Code</span>
                    <span className="text-sm font-black text-blue-900 tracking-tight">{offer.code}</span>
                  </div>
                  <button className="text-blue-600 font-bold text-[10px] hover:text-blue-800 transition-colors">COPY</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Call-Only Section */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-6 md:gap-8 group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl -z-0"></div>
          
          <div className="shrink-0 relative z-10">
             <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-xl animate-float">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
             </div>
          </div>
          
          <div className="flex-grow text-center md:text-left relative z-10">
             <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Unlock Hidden "Call-Only" Deals</h2>
             <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
               Some premium airline inventory is strictly available via phone booking only. Save up to <span className="text-orange-500 font-black underline">$3,000 extra</span> on business and first-class travel.
             </p>
          </div>
           
          <div className="shrink-0 relative z-10">
             <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Priority Support Line</span>
                <a href="tel:18887918007" className="text-2xl font-black text-white hover:text-orange-500 transition-colors block mb-4">1888 791 8007</a>
                <div className="flex items-center justify-center gap-2 text-emerald-400 text-[10px] font-bold">
                   <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
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