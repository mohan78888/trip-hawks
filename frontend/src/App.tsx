
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Offers from './components/Offers';
import TrustBar from './components/TrustBar';
import FlightResults from './components/FlightResults';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import PromotionalPopup from './components/PromotionalPopup';
import FlightDetails from './components/FlightDetails';
import CustomerService from './components/CustomerService';
import OffersPage from './components/OffersPage';
import TermsPage from './components/TermsPage';
import AboutPage from './components/AboutPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfUsePage from './components/TermsOfUsePage';
import CreditCardVerificationPage from './components/CreditCardVerificationPage';
import HotelsPage from './components/HotelsPage';
import ContactUsPage from './components/ContactUsPage';
import InternationalRoutes from './components/InternationalRoutes';
import Login from './components/Login';
import { SearchParams, Flight } from './types';
import { flightService } from './services/flightService';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';
const App: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [view, setView] = useState<'home' | 'login' | 'details' | 'customer-service' | 'offers' | 'terms' | 'hotels' | 'about' | 'privacy' | 'termsOfUse' | 'creditCardVerification' | 'contact'>('home');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [sortBy, setSortBy] = useState<'price' | 'fastest' | 'nonstop'>('price');
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    let timer: number;
    if (searchResults.length > 0 && !isSearching && view === 'home') {
      timer = window.setTimeout(() => {
        setShowPromo(true);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [searchResults, isSearching, view]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleSearch = async (params: SearchParams) => {
    setIsSearching(true);
    setSearchResults([]); 
    setSearchParams(params);
    setShowPromo(false);
    setView('home');
    
    try {
      // Call API to search flights
      const flights = await flightService.searchFlights(params);
      setSearchResults(flights);
      window.scrollTo({ top: 500, behavior: 'smooth' });
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to mock data
      const mockResults = flightService.getMockFlights(params);
      setSearchResults(mockResults);
    } finally {
      setIsSearching(false);
    }
  };

  const handleRouteClick = (from: string, to: string) => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 14);
    const dateStr = futureDate.toISOString().split('T')[0];
    
    handleSearch({
      from: from,
      to: to,
      date: dateStr,
      passengers: 1,
      travelClass: 'Economy'
    });
  };

  const handleLogoClick = () => {
    setView('home');
    setSearchParams(null);
    setSearchResults([]);
    setShowPromo(false);
    setSelectedFlight(null);
  };

  const handleBookClick = (flight: Flight) => {
    setSelectedFlight(flight);
    setView('details');
    setShowPromo(false);
  };

  const sortedFlights = useMemo(() => {
    const flights = [...searchResults];
    if (sortBy === 'price') {
      return flights.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'fastest') {
      return flights.sort((a, b) => a.durationMinutes - b.durationMinutes);
    } else if (sortBy === 'nonstop') {
      return flights.sort((a, b) => a.stops - b.stops);
    }
    return flights;
  }, [searchResults, sortBy]);

  const minPrice = useMemo(() => {
    if (searchResults.length === 0) return 0;
    return Math.min(...searchResults.map(f => f.price));
  }, [searchResults]);

  return (
<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div className="min-h-screen flex flex-col">
      <Navbar 
        onLoginClick={() => setView('login')} 
        onLogoClick={handleLogoClick} 
        onSupportClick={() => setView('customer-service')}
        onOffersClick={() => setView('offers')}
        onHotelsClick={() => setView('hotels')}
        activeView={view}
        showHotels={true}
      />
      
      <main className="flex-grow">
        {view === 'customer-service' ? (
          <CustomerService />
        ) : view === 'offers' ? (
          <OffersPage onBack={() => setView('home')} />
        ) : view === 'terms' ? (
          <TermsPage onBack={() => setView('home')} />
        ) : view === 'about' ? (
          <AboutPage onBack={() => setView('home')} />
        ) : view === 'privacy' ? (
          <PrivacyPolicyPage onBack={() => setView('home')} />
        ) : view === 'termsOfUse' ? (
          <TermsOfUsePage onBack={() => setView('home')} />
        ) : view === 'creditCardVerification' ? (
          <CreditCardVerificationPage onBack={() => setView('home')} />
        ) : view === 'hotels' ? (
          <HotelsPage />
        ) : view === 'contact' ? (
          <ContactUsPage onBack={() => setView('home')} />
        ) : view === 'login' ? (
          <Login onBack={() => setView('home')} />
        ) : view === 'details' && selectedFlight ? (
          <FlightDetails 
            flight={selectedFlight} 
            onBack={() => setView('home')} 
          />
        ) : (
          <>
            <Hero onSearch={handleSearch} isLoading={isSearching} />
            
            {isSearching && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-20 text-center">
                 <div className="inline-block w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                 <p className="text-slate-500 font-bold">Finding the best flights for you...</p>
              </div>
            )}

            {searchParams && searchResults.length > 0 && !isSearching && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      Flights from {searchParams?.from} to {searchParams?.to}
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">{searchResults.length} flights found • {searchParams?.date}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                    <button 
                      onClick={() => setSortBy('price')}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${sortBy === 'price' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Cheapest
                    </button>
                    <button 
                      onClick={() => setSortBy('fastest')}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${sortBy === 'fastest' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Fastest
                    </button>
                    <button 
                      onClick={() => setSortBy('nonstop')}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${sortBy === 'nonstop' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Non-stop
                    </button>
                  </div>
                </div>
                
                <FlightResults flights={sortedFlights} onBook={handleBookClick} />
              </div>
            )}

            {!searchParams && !isSearching && (
              <>
                <Offers onSeeAll={() => setView('offers')} />
                <InternationalRoutes onRouteClick={handleRouteClick} />
                <TrustBar />
                <div className="bg-slate-50 py-16 md:py-24 overflow-hidden">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                      <div className="md:w-1/2 relative z-10">
                        <div className="inline-block px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                          Premium Travel Partner
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                          Experience Premium Travel with <span className="text-purple-600">Tour Help Desk</span>
                        </h2>
                        <p className="text-slate-600 mb-10 text-lg leading-relaxed">
                          We redefine the way you travel. From seamless booking to exceptional in-flight service,
                          Tour Help Desk is your partner in exploring the world. Our deep-rooted commitment to security
                          and customer satisfaction makes us India's preferred travel partner.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                          <div className="flex flex-col gap-2">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-600 shadow-lg shadow-purple-50">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <span className="font-bold text-slate-800 text-sm">Lowest Prices</span>
                            <p className="text-xs text-slate-500">Best market rates guaranteed</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-600 shadow-lg shadow-purple-50">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <span className="font-bold text-slate-800 text-sm">24/7 Support</span>
                            <p className="text-xs text-slate-500">Always here when you need us</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-1/2 relative">
                        <img 
                          src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80&w=800" 
                          alt="Canada Tourism" 
                          className="rounded-[3rem] shadow-2xl relative z-10 w-full h-auto object-cover"
                        />
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl z-0"></div>
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl z-0"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </main>

      {showPromo && minPrice > 0 && <PromotionalPopup route={`${searchParams.from ? searchParams.from.split(',')[0] : ''} to ${searchParams.to ? searchParams.to.split(',')[0] : ''}`} minPrice={minPrice} onClose={() => setShowPromo(false)} />}
      <AIAssistant />
      <Footer 
        onLegalClick={() => setView('terms')} 
        onAboutClick={() => setView('about')} 
        onPrivacyClick={() => setView('privacy')}
        onTermsClick={() => setView('termsOfUse')}
        onCreditCardVerificationClick={() => setView('creditCardVerification')}
        onContactClick={() => setView('contact')}
      />
    </div>
    </ClerkProvider>
  );
};

export default App;
