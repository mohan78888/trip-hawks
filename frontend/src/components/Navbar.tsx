import React, { useState, useEffect, useRef } from 'react';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";
interface NavbarProps {
  onLoginClick: () => void;
  onLogoClick: () => void;
  onSupportClick: () => void;
  onOffersClick: () => void;
  onHotelsClick: () => void;
  activeView?: string;
  showHotels?: boolean;
}

type MobileCategory = 'hotels' | 'flights' | 'packages' | 'cars' | 'cruises';

const Navbar: React.FC<NavbarProps> = ({ 
  onLoginClick, 
  onLogoClick, 
  onSupportClick, 
  onOffersClick, 
  onHotelsClick, 
  activeView,
  showHotels = true 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hideMobileCategoryStrip, setHideMobileCategoryStrip] = useState(false);

  const isMobileMenuOpenRef = useRef(isMobileMenuOpen);
  isMobileMenuOpenRef.current = isMobileMenuOpen;

  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const stripHiddenRef = useRef(false);
  const scrollLockUntilRef = useRef(0);
  const rafScrollRef = useRef<number | null>(null);

  const getMobileActiveCategory = (): MobileCategory => {
    if (activeView === 'hotels') return 'hotels';
    if (activeView === 'offers') return 'packages';
    if (activeView === 'home' || activeView === 'details') return 'flights';
    return 'flights';
  };

  const mobileActive = getMobileActiveCategory();

  useEffect(() => {
    const setStripHidden = (next: boolean) => {
      if (stripHiddenRef.current === next) return;
      stripHiddenRef.current = next;
      setHideMobileCategoryStrip(next);
      // Ignore scroll events briefly after toggling — expanding/collapsing the strip shifts layout and can bounce scrollY.
      scrollLockUntilRef.current = Date.now() + 380;
    };

    const runScroll = () => {
      rafScrollRef.current = null;
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 1024;
      const menuOpen = isMobileMenuOpenRef.current;

      setIsScrolled(currentScrollY > 20);

      if (now < scrollLockUntilRef.current) {
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (!isMobile) {
        if (stripHiddenRef.current) setStripHidden(false);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (menuOpen) {
        if (!stripHiddenRef.current) setStripHidden(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollYRef.current;
      const absDelta = Math.abs(delta);

      // Stronger dead zone — small touch jitter won’t flip the strip.
      if (absDelta < 14) {
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const scrollingDown = delta > 0;

      if (currentScrollY <= 48) {
        if (stripHiddenRef.current) setStripHidden(false);
      } else if (scrollingDown && currentScrollY > 96) {
        if (!stripHiddenRef.current) setStripHidden(true);
      } else if (!scrollingDown) {
        if (stripHiddenRef.current) setStripHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    const handleScroll = () => {
      if (rafScrollRef.current != null) return;
      rafScrollRef.current = window.requestAnimationFrame(runScroll);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setStripHidden(false);
      }
      lastScrollYRef.current = window.scrollY;
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    runScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafScrollRef.current != null) {
        window.cancelAnimationFrame(rafScrollRef.current);
        rafScrollRef.current = null;
      }
    };
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md py-3 shadow-lg border-slate-200/60' 
          : 'bg-white py-5 border-transparent shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 flex items-center justify-between relative">
        <div className="flex items-center gap-3 sm:gap-6 md:gap-10 lg:gap-14 min-w-0 flex-1">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0 min-w-0"
            onClick={() => { onLogoClick(); setIsMobileMenuOpen(false); }}
          >
            {/* Beautiful Hawk Bird Logo */}
            <div className={`transition-all duration-500 flex items-center justify-center ${
              isScrolled ? 'scale-90' : 'scale-100'
            } group-hover:scale-110`}>
              <img 
                src="/trip-hawks-logo.png" 
                alt="Tour Help Desk logo" 
                className={`object-contain transition-all duration-500 ${
                  isScrolled ? 'h-12 w-auto md:h-14' : 'h-14 w-auto md:h-16 lg:h-20'
                }`}
              />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-slate-900 truncate max-w-full sm:max-w-none">
              Tour Help Desk
            </span>
          </div>

          {/* Nav Links Desktop */}
          <div className="hidden lg:flex items-center gap-10">
            <button 
              onClick={onLogoClick} 
              className={`text-sm font-bold uppercase tracking-widest transition-all hover:translate-y-[-1px] active:translate-y-0 ${activeView === 'home' ? 'text-purple-600' : 'text-slate-500 hover:text-purple-600'}`}
            >
              Flights
            </button>
            <button 
              onClick={onOffersClick} 
              className={`text-sm font-bold uppercase tracking-widest transition-all hover:translate-y-[-1px] active:translate-y-0 ${activeView === 'offers' ? 'text-purple-600' : 'text-slate-500 hover:text-purple-600'}`}
            >
              Offers
            </button>
            {showHotels && (
              <button 
                onClick={onHotelsClick} 
                className={`text-sm font-bold uppercase tracking-widest transition-all hover:translate-y-[-1px] active:translate-y-0 ${activeView === 'hotels' ? 'text-purple-600' : 'text-slate-500 hover:text-purple-600'}`}
              >
                Hotels
              </button>
            )}
            <a 
              href="#" 
              className="text-sm font-bold text-slate-300 cursor-not-allowed uppercase tracking-widest"
              onClick={(e) => e.preventDefault()}
            >
              Cars
            </a>
            <button 
              onClick={onSupportClick} 
              className={`text-sm font-bold uppercase tracking-widest transition-all hover:translate-y-[-1px] active:translate-y-0 ${activeView === 'customer-service' ? 'text-purple-600' : 'text-slate-500 hover:text-purple-600'}`}
            >
              Customer Service
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-slate-600 hover:text-purple-600 font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:bg-slate-50">
                  Login
                </button>
              </SignInButton>
              <div className="h-6 w-px bg-slate-200 mx-1"></div>
              <SignUpButton mode="modal">
                <button className={`font-black text-sm px-7 py-3 rounded-2xl transition-all active:scale-95 shadow-lg ${
                  isScrolled 
                    ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-100' 
                    : 'bg-slate-900 text-white hover:bg-purple-600 shadow-slate-200'
                }`}>
                  Sign Up Free
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-10 h-10 border border-slate-200" } }} />
            </SignedIn>
          </div>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden p-2 text-slate-600 hover:text-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-200 rounded-lg ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {/* Mobile: Priceline-style category icon strip (below header) */}
      <div
        className={`lg:hidden border-t border-slate-100 bg-white transition-[max-height,opacity] duration-300 ease-out overflow-hidden ${
          hideMobileCategoryStrip || isMobileMenuOpen ? 'max-h-0 opacity-0 pointer-events-none border-transparent' : 'max-h-28 md:max-h-40 opacity-100'
        }`}
      >
        <div className={`flex overflow-x-auto scrollbar-hide px-3 sm:px-4 md:px-8 gap-2 md:gap-4 justify-evenly md:justify-center max-w-7xl mx-auto transition-all duration-300 ${
          hideMobileCategoryStrip ? 'py-0' : 'py-2.5 md:py-3.5'
        }`}>
          {showHotels && (
            <button
              type="button"
              onClick={() => {
                onHotelsClick();
                setIsMobileMenuOpen(false);
              }}
              className="flex flex-1 flex-col items-center gap-1 md:gap-1.5 min-w-[3.8rem] max-w-[5.5rem] py-1"
            >
              <span
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
                  mobileActive === 'hotels'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'border-2 border-blue-500/80 text-blue-600 bg-white'
                }`}
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              <span className={`text-[9px] md:text-[10px] font-bold tracking-tight ${mobileActive === 'hotels' ? 'text-blue-700' : 'text-slate-600'}`}>Hotels</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              onLogoClick();
              setIsMobileMenuOpen(false);
            }}
            className="flex flex-1 flex-col items-center gap-1 md:gap-1.5 min-w-[3.8rem] max-w-[5.5rem] py-1"
          >
            <span
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
                mobileActive === 'flights'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'border-2 border-blue-500/80 text-blue-600 bg-white'
              }`}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                />
              </svg>
            </span>
            <span className={`text-[9px] md:text-[10px] font-bold tracking-tight ${mobileActive === 'flights' ? 'text-blue-700' : 'text-slate-600'}`}>Flights</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onOffersClick();
              setIsMobileMenuOpen(false);
            }}
            className="flex flex-1 flex-col items-center gap-1 md:gap-1.5 min-w-[3.8rem] max-w-[5.5rem] py-1"
          >
            <span
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
                mobileActive === 'packages'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'border-2 border-blue-500/80 text-blue-600 bg-white'
              }`}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </span>
            <span className={`text-[9px] md:text-[10px] font-bold tracking-tight ${mobileActive === 'packages' ? 'text-blue-700' : 'text-slate-600'}`}>Packages</span>
          </button>

          <span className="flex flex-1 flex-col items-center gap-1 md:gap-1.5 min-w-[3.8rem] max-w-[5.5rem] py-1 opacity-45 pointer-events-none" aria-disabled>
            <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-slate-300 text-slate-400 flex items-center justify-center bg-slate-50">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.256 2.256 0 00-1.94-.654H15.75m-9 0H8.625c-.621 0-1.125.504-1.125 1.125v3.5m9 0V9.375c0-.621-.504-1.125-1.125-1.125h-1.5a1.125 1.125 0 00-1.125 1.125v3.5m9 0H21"
                />
              </svg>
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 tracking-tight">Cars</span>
          </span>

          <span className="flex flex-1 flex-col items-center gap-1 md:gap-1.5 min-w-[3.8rem] max-w-[5.5rem] py-1 opacity-45 pointer-events-none" aria-disabled>
            <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-slate-300 text-slate-400 flex items-center justify-center bg-slate-50">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M4 14l2-7h12l2 7M4 14v4a1 1 0 001 1h2M4 14H2m18 0h2m-2 0v4a1 1 0 01-1 1h-2m-8-8h4m-4 4h8M8 21v-3m8 3v-3"
                />
              </svg>
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 tracking-tight">Cruises</span>
          </span>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full bg-white border-b border-slate-200 shadow-2xl py-6 px-6 flex flex-col gap-6 animate-in slide-in-from-top-2 duration-300">
          <button 
            onClick={() => { onLogoClick(); setIsMobileMenuOpen(false); }} 
            className={`text-left text-base font-bold uppercase tracking-widest transition-all ${activeView === 'home' ? 'text-purple-600' : 'text-slate-600 hover:text-purple-600'}`}
          >
            Flights
          </button>
          <button 
            onClick={() => { onOffersClick(); setIsMobileMenuOpen(false); }} 
            className={`text-left text-base font-bold uppercase tracking-widest transition-all ${activeView === 'offers' ? 'text-purple-600' : 'text-slate-600 hover:text-purple-600'}`}
          >
            Offers
          </button>
          {showHotels && (
            <button 
              onClick={() => { onHotelsClick(); setIsMobileMenuOpen(false); }} 
              className={`text-left text-base font-bold uppercase tracking-widest transition-all ${activeView === 'hotels' ? 'text-purple-600' : 'text-slate-600 hover:text-purple-600'}`}
            >
              Hotels
            </button>
          )}
          <a 
            href="#" 
            className="text-left text-base font-bold text-slate-300 cursor-not-allowed uppercase tracking-widest"
            onClick={(e) => e.preventDefault()}
          >
            Cars
          </a>
          <button 
            onClick={() => { onSupportClick(); setIsMobileMenuOpen(false); }} 
            className={`text-left text-base font-bold uppercase tracking-widest transition-all ${activeView === 'customer-service' ? 'text-purple-600' : 'text-slate-600 hover:text-purple-600'}`}
          >
            Customer Service
          </button>
          
          <div className="h-px w-full bg-slate-100 my-1 sm:hidden"></div>
          
          <div className="flex flex-col gap-3 sm:hidden">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full text-center text-slate-600 hover:text-purple-600 font-bold text-sm px-5 py-3 rounded-xl transition-all bg-slate-50 hover:bg-slate-100">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="w-full text-center font-black text-sm px-7 py-3 rounded-2xl transition-all active:scale-95 shadow-lg bg-purple-600 text-white hover:bg-purple-700 shadow-purple-100">
                  Sign Up Free
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className="flex justify-center py-2">
                <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-12 h-12" } }} />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
