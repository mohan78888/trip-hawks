// Flight API Service
import { Flight, SearchParams } from '../types';

// In dev: Vite proxies /api → localhost:5000
// In production: VITE_API_URL must be set to deployed backend URL
const getApiBase = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) return `${apiUrl}/api`;
  return '/api';
};

export const flightService = {
  async searchFlights(params: SearchParams): Promise<Flight[]> {
    try {
      const response = await fetch(`${getApiBase()}/flights/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      return data.flights || [];
    } catch (error) {
      console.error('Flight search error:', error);
      throw error;
    }
  },

  getMockFlights(params: SearchParams): Flight[] {
    return [
      {
        id: '1',
        airline: 'Hawk Air',
        airlineLogo: 'https://picsum.photos/seed/sky/100/100',
        departureTime: '06:00 AM',
        arrivalTime: '08:30 AM',
        duration: '2h 30m',
        durationMinutes: 150,
        origin: params.from.substring(0, 3).toUpperCase(),
        destination: params.to.substring(0, 3).toUpperCase(),
        price: 4500 + Math.floor(Math.random() * 2000),
        stops: 0,
        class: params.travelClass
      },
      {
        id: '2',
        airline: 'BlueJet',
        airlineLogo: 'https://picsum.photos/seed/blue/100/100',
        departureTime: '10:15 AM',
        arrivalTime: '12:45 PM',
        duration: '2h 30m',
        durationMinutes: 150,
        origin: params.from.substring(0, 3).toUpperCase(),
        destination: params.to.substring(0, 3).toUpperCase(),
        price: 5200 + Math.floor(Math.random() * 2000),
        stops: 0,
        class: params.travelClass
      },
      {
        id: '3',
        airline: 'Global Wings',
        airlineLogo: 'https://picsum.photos/seed/global/100/100',
        departureTime: '02:00 PM',
        arrivalTime: '05:30 PM',
        duration: '3h 30m',
        durationMinutes: 210,
        origin: params.from.substring(0, 3).toUpperCase(),
        destination: params.to.substring(0, 3).toUpperCase(),
        price: 3800 + Math.floor(Math.random() * 2000),
        stops: 1,
        class: params.travelClass
      },
      {
        id: '4',
        airline: 'Hawk Air',
        airlineLogo: 'https://picsum.photos/seed/sky/100/100',
        departureTime: '08:00 PM',
        arrivalTime: '10:15 PM',
        duration: '2h 15m',
        durationMinutes: 135,
        origin: params.from.substring(0, 3).toUpperCase(),
        destination: params.to.substring(0, 3).toUpperCase(),
        price: 6100 + Math.floor(Math.random() * 2000),
        stops: 0,
        class: params.travelClass
      }
    ];
  }
};
