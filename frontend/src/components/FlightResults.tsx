
import React from 'react';
import { Flight } from '../types';

interface FlightResultsProps {
  flights: Flight[];
  onBook: (flight: Flight) => void;
}

const FlightResults: React.FC<FlightResultsProps> = ({ flights, onBook }) => {
  const minPrice = Math.min(...flights.map(f => f.price));

  return (
    <div className="space-y-4">
      {flights.map((flight) => {
        const isCheapest = flight.price === minPrice;
        return (
          <div 
            key={flight.id} 
            className={`group relative bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
              isCheapest ? 'border-orange-200 ring-1 ring-orange-100' : 'border-slate-100'
            }`}
          >
            {isCheapest && (
              <div className="absolute -top-3 left-6 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm z-10">
                Cheapest Deal
              </div>
            )}

            <div className="p-4 md:p-5 flex flex-col md:flex-row items-center gap-4 md:gap-6">
              {/* Airline */}
              <div className="flex items-center gap-3 w-full md:w-1/4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 shrink-0">
                   <img src={flight.airlineLogo} alt={flight.airline} className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors text-sm md:text-base">{flight.airline}</h4>
                  <p className="text-[10px] md:text-xs text-slate-400 font-medium">{flight.class}</p>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-center justify-between gap-4 md:gap-6 flex-grow w-full md:w-auto">
                <div className="text-center md:text-left min-w-[70px]">
                  <span className="text-lg md:text-xl font-bold text-slate-900">{flight.departureTime}</span>
                  <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-0.5">{flight.origin}</p>
                </div>

                <div className="flex flex-col items-center flex-grow px-4">
                  <span className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-tighter">{flight.duration}</span>
                  <div className="w-full h-[2px] bg-slate-100 relative rounded-full">
                    <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full border-2 border-slate-200 bg-white -translate-y-1/2"></div>
                    <div className="absolute top-1/2 right-0 w-2 h-2 rounded-full border-2 border-slate-200 bg-white -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 group-hover:scale-125 transition-transform">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.2c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z"/>
                      </svg>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-500 mt-2 uppercase tracking-widest">{flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop`}</span>
                </div>

                <div className="text-center md:text-right min-w-[70px]">
                  <span className="text-lg md:text-xl font-bold text-slate-900">{flight.arrivalTime}</span>
                  <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-0.5">{flight.destination}</p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="w-full md:w-1/5 flex flex-row md:flex-col items-center justify-between md:justify-center border-t md:border-t-0 md:border-l border-slate-50 pt-3 md:pt-0 md:pl-6">
                <div className="mb-0 md:mb-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase">USD</span>
                    <span className="text-xl md:text-2xl font-black text-blue-900">${flight.price.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-left md:text-center">Per Adult</p>
                </div>
                <button 
                  onClick={() => {
                    if (flight.bookingLink) {
                      window.open(flight.bookingLink, '_blank');
                    } else {
                      onBook(flight);
                    }
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 md:px-8 py-2 md:py-2.5 text-sm md:text-base rounded-xl transition-all shadow-lg shadow-orange-100 active:scale-95 group-hover:scale-105"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlightResults;
