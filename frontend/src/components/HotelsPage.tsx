
import React, { useEffect, useState } from 'react';
import { Hotel } from '../types';

const MOCK_HOTELS: Hotel[] = [
  {
    id: 'h1',
    name: 'Fairmont Royal York',
    location: 'Toronto, Ontario',
    rating: 4.8,
    reviewsCount: 3240,
    pricePerNight: 28500,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    tags: ['Luxury Stay', 'City Center', 'Iconic']
  },
  {
    id: 'h2',
    name: 'The Ritz-Carlton, Vancouver',
    location: 'Vancouver, BC',
    rating: 4.9,
    reviewsCount: 1850,
    pricePerNight: 42000,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    tags: ['Spa & Wellness', 'Harbour View', 'Modern Luxury']
  },
  {
    id: 'h3',
    name: 'Fairmont Banff Springs',
    location: 'Banff, Alberta',
    rating: 5.0,
    reviewsCount: 5600,
    pricePerNight: 55000,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
    tags: ['Mountain Resort', 'Castle Style', 'Premium']
  },
  {
    id: 'h4',
    name: 'Four Seasons Hotel Montreal',
    location: 'Montreal, Quebec',
    rating: 4.7,
    reviewsCount: 1120,
    pricePerNight: 35000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    tags: ['Designer Decor', 'Gastronomy', 'Chic']
  }
];

const DESTINATIONS = [
  { name: 'Toronto', image: 'https://images.unsplash.com/photo-1503197979108-c824168d51a8?auto=format&fit=crop&q=80&w=300' },
  { name: 'Vancouver', image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&q=80&w=300' },
  { name: 'Banff', image: 'https://images.unsplash.com/photo-1534430480872-3498386e7a56?auto=format&fit=crop&q=80&w=300' },
  { name: 'Montreal', image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&q=80&w=300' }
];

const HotelsPage: React.FC = () => {
  const [destination, setDestination] = useState('Toronto, Canada');
  const [isLoading, setIsLoading] = useState(false);
  const [hideSearchBar, setHideSearchBar] = useState(false);

  const handleUpdate = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  useEffect(() => {
    const onScroll = () => {
      const isNarrow = window.innerWidth < 1024;
      setHideSearchBar(isNarrow && window.scrollY > 80);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans">
      
      {/* 1. Sticky Search Bar */}
      <div
        className={`sticky top-[72px] md:top-[76px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300 overflow-hidden ${
          hideSearchBar ? 'max-h-0 py-0 opacity-0 pointer-events-none' : 'max-h-[520px] py-3 md:py-4 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6">
          <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap items-stretch md:items-center gap-3 md:gap-4 bg-white border border-slate-200 rounded-2xl p-2 md:p-3 shadow-lg">
            <div className="flex-grow w-full md:w-full lg:w-auto lg:flex-1 min-w-0 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
              </span>
              <input 
                type="text" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where are you staying?"
                className="w-full pl-12 pr-4 py-2.5 md:py-3 bg-transparent outline-none font-bold text-sm md:text-base text-slate-800"
              />
            </div>
            <div className="h-8 w-px bg-slate-200 hidden lg:block shrink-0"></div>
            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-48">
               <input type="date" className="w-full px-4 py-2.5 md:py-3 bg-transparent outline-none font-bold text-sm" defaultValue="2024-12-15" />
            </div>
            <div className="h-8 w-px bg-slate-200 hidden lg:block shrink-0"></div>
            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-48">
               <input type="date" className="w-full px-4 py-2.5 md:py-3 bg-transparent outline-none font-bold text-sm" defaultValue="2024-12-20" />
            </div>
            <div className="h-8 w-px bg-slate-200 hidden lg:block shrink-0"></div>
            <div className="w-full md:flex-1 md:min-w-[200px] lg:w-56">
              <select className="w-full px-4 py-3 bg-transparent outline-none font-bold text-sm appearance-none cursor-pointer">
                <option>2 Adults, 1 Room</option>
                <option>1 Adult, 1 Room</option>
              </select>
            </div>
            <button 
              onClick={handleUpdate}
              className="w-full md:w-full lg:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-100 md:order-last lg:order-none"
            >
              {isLoading ? 'Updating...' : 'Search'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Hero / Destination Intro Section */}
      <section className="relative min-h-[480px] md:min-h-[520px] h-auto md:h-[520px] lg:h-[600px] overflow-hidden flex items-center py-10 md:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-10 lg:gap-12 relative z-10">
          <div>
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              Exclusive Canadian Collection
            </span>
            <h1 className="font-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-[1.1]">
              Luxury Hotels <br /> in <span className="text-blue-600">Canada</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-lg leading-relaxed mb-8">
              Experience the pinnacle of hospitality from the rugged peaks of Banff to the urban elegance of Toronto. Your sanctuary awaits.
            </p>
            <div className="flex gap-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/face${i}/100/100`} className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                ))}
              </div>
              <p className="text-sm font-bold text-slate-400 mt-2">Trusted by 12,000+ travelers</p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/5 rounded-[4rem] blur-2xl group-hover:bg-blue-600/10 transition-all"></div>
            <img 
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200" 
              alt="Canada Luxury" 
              className="w-full h-[240px] sm:h-[320px] md:h-[380px] lg:h-[500px] object-cover rounded-3xl md:rounded-[3rem] shadow-2xl relative z-10"
            />
            <div className="absolute inset-0 bg-white/10 rounded-[3rem] mix-blend-overlay z-20"></div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-0"></div>
      </section>

      {/* 3. Results Header (Filters & Sort) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-100 pb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Luxury Hotels in {destination}</h2>
            <p className="text-slate-400 text-sm font-bold mt-1 uppercase tracking-widest">Showing {MOCK_HOTELS.length} Premium Results</p>
          </div>
          <div className="flex items-center gap-4 mt-6 md:mt-0">
             <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
               Filters
             </button>
             <div className="relative group">
               <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                 Sort by: Price
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
               </button>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Hotel Listing Cards (Main Content) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
        <div className="grid grid-cols-1 gap-3 md:gap-8">
          {MOCK_HOTELS.map((hotel) => (
            <div key={hotel.id} className="group bg-white rounded-xl md:rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-lg md:hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row">
              {/* Left: Image */}
              <div className="md:w-1/3 h-32 md:h-auto overflow-hidden relative">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-2 left-2 md:top-4 md:left-4">
                   <div className="bg-white/95 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-lg flex items-center gap-1 shadow-md">
                      <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      <span className="font-bold text-xs md:text-sm text-slate-900">{hotel.rating}</span>
                   </div>
                </div>
              </div>

              {/* Center: Info */}
              <div className="flex-1 p-3 md:p-6 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-blue-600 text-[9px] md:text-[10px] font-black uppercase tracking-widest">{hotel.location}</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                  <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">{hotel.reviewsCount}+ Reviews</span>
                </div>
                <h3 className="font-luxury text-lg md:text-2xl font-bold mb-2 md:mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">{hotel.name}</h3>
                <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
                  {hotel.tags.map((tag, idx) => (
                    <span key={idx} className="bg-slate-50 text-slate-500 text-[7px] md:text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 md:px-2 md:py-1 rounded-md border border-slate-100">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 text-[10px] md:text-xs leading-relaxed max-w-sm">
                  Experience world-class hospitality with stunning views and bespoke services designed for the elite traveler.
                </p>
              </div>

              {/* Right: Price & CTA */}
              <div className="md:w-1/4 p-3 md:p-6 bg-slate-50 flex flex-col justify-center items-center md:items-end border-t md:border-t-0 md:border-l border-slate-100">
                   <div className="text-center md:text-right mb-2 md:mb-4">
                     <span className="text-[7px] md:text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Starting from</span>
                     <div className="flex items-baseline gap-1">
                        <span className="text-[9px] md:text-[10px] font-bold text-slate-400">USD</span>
                        <span className="text-lg md:text-2xl font-black text-blue-900">${hotel.pricePerNight.toLocaleString()}</span>
                     </div>
                     <span className="text-[8px] md:text-[9px] font-bold text-slate-400 block mt-0.5">per night</span>
                   </div>
                   <button className="w-full bg-blue-600 text-white text-xs md:text-sm font-black px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100 active:scale-95 group-hover:scale-105">
                     View Rooms
                   </button>
                   <p className="mt-2 md:mt-3 text-[7px] md:text-[8px] font-bold text-emerald-600 uppercase tracking-widest">Free Cancellation</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Experience / Gallery Section */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-luxury text-4xl md:text-5xl font-bold mb-4">Experience Luxury Across Canada</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">From coastal resorts to high-altitude sanctuaries, discover the diversity of Canadian luxury.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-96 group overflow-hidden rounded-[2.5rem]">
              <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Resort" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                <span className="text-white font-black uppercase tracking-widest text-lg">Mountain Resorts</span>
              </div>
            </div>
            <div className="relative h-96 group overflow-hidden rounded-[2.5rem]">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="City" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                <span className="text-white font-black uppercase tracking-widest text-lg">City Luxury</span>
              </div>
            </div>
            <div className="relative h-96 group overflow-hidden rounded-[2.5rem]">
              <img src="https://images.unsplash.com/photo-1503197979108-c824168d51a8?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Scenic" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                <span className="text-white font-black uppercase tracking-widest text-lg">Scenic Retreats</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Story / Visual Section */}
      <section className="relative h-[500px] flex items-center justify-center text-center px-6">
         <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Luxury Tourist Hotel" />
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
         </div>
         <div className="relative z-10 max-w-3xl">
            <h2 className="font-luxury text-4xl md:text-5xl text-white font-bold mb-6">A Journey Beyond Destinations</h2>
            <p className="text-blue-50 text-xl font-light italic leading-relaxed">
              "True luxury is found in the quiet moments of elegance and the profound comfort of a space that feels like home, yet looks like a masterpiece."
            </p>
         </div>
      </section>

      {/* 7. Explore More Destinations */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900">Explore More Luxury Destinations</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest mt-1">Find your next sanctuary</p>
          </div>
          <button className="text-blue-600 font-black text-sm uppercase tracking-widest hover:underline">View All Cities</button>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-8 custom-scrollbar">
          {DESTINATIONS.map((dest, i) => (
            <div key={i} className="min-w-[280px] group cursor-pointer">
              <div className="relative h-80 rounded-[2rem] overflow-hidden mb-4 shadow-lg group-hover:shadow-2xl transition-all">
                <img src={dest.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={dest.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-white text-2xl font-black">{dest.name}</h4>
                  <button className="text-white/0 group-hover:text-white/100 transition-all text-xs font-black uppercase tracking-widest mt-2 flex items-center gap-2">
                    Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Elegant Footer (Local to Section or handled globally) */}
      <div className="bg-slate-50 border-t border-slate-100 py-12 text-center">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Tour Help Desk Premium Collection</p>
         <div className="flex justify-center gap-6 mb-8">
            {['Privacy', 'Security', 'Refunds', 'Support'].map(item => (
              <span key={item} className="text-xs font-bold text-slate-500 hover:text-blue-600 cursor-pointer">{item}</span>
            ))}
         </div>
         <p className="text-xs text-slate-400">&copy; 2024 Tour Help Desk Ltd. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HotelsPage;
