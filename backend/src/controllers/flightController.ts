import { Request, Response } from 'express';

// Simulated Flight Search
export const searchFlights = async (req: Request, res: Response) => {
  try {
    const { from, to, date, passengers, travelClass } = req.body;

    console.log('🔍 Flight search request:', { from, to, date, passengers, travelClass });

    if (!from || !to || !date) {
      return res.status(400).json({ 
        message: 'Please provide origin, destination, and date' 
      });
    }

    // Dynamic Mock Flights Generation
    const airlines = [
      { name: 'Emirates', logo: 'https://picsum.photos/seed/emirates/100/100' },
      { name: 'Qatar Airways', logo: 'https://picsum.photos/seed/qatar/100/100' },
      { name: 'Delta Airlines', logo: 'https://picsum.photos/seed/delta/100/100' },
      { name: 'Hawk Air Premium', logo: 'https://picsum.photos/seed/hawk/100/100' },
      { name: 'Singapore Airlines', logo: 'https://picsum.photos/seed/singapore/100/100' },
      { name: 'British Airways', logo: 'https://picsum.photos/seed/british/100/100' },
      { name: 'Air France', logo: 'https://picsum.photos/seed/france/100/100' },
      { name: 'Lufthansa', logo: 'https://picsum.photos/seed/lufthansa/100/100' }
    ];

    const flights = Array.from({ length: 12 }).map((_, i) => {
      const airline = airlines[Math.floor(Math.random() * airlines.length)];
      const dh = Math.floor(Math.random() * 12) + 1; // Departure hour (1-12)
      const dm = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
      const isAM = Math.random() > 0.5;
      
      const durationHours = Math.floor(Math.random() * 8) + 2; // 2 to 9 hours
      const durationMins = Math.floor(Math.random() * 4) * 15;
      const totalMins = durationHours * 60 + durationMins;

      // Approximate arrival time
      let ah = dh + durationHours;
      let aIsAM = isAM;
      if (ah >= 12) {
         if (ah > 12) ah -= 12;
         aIsAM = !aIsAM;
      }
      
      const pad = (n: number) => n.toString().padStart(2, '0');
      const depString = `${pad(dh)}:${pad(dm)} ${isAM ? 'AM' : 'PM'}`;
      const arrString = `${pad(ah)}:${pad(durationMins)} ${aIsAM ? 'AM' : 'PM'}`;

      return {
        id: (i + 1).toString(),
        airline: airline.name,
        airlineLogo: airline.logo,
        departureTime: depString,
        arrivalTime: arrString,
        duration: `${durationHours}h ${durationMins > 0 ? durationMins + 'm' : ''}`.trim(),
        durationMinutes: totalMins,
        origin: from.substring(0, 3).toUpperCase(),
        destination: to.substring(0, 3).toUpperCase(),
        price: 150 + Math.floor(Math.random() * 150) + (airline.name.includes('Premium') ? 43 : 0),
        stops: Math.random() > 0.7 ? 1 : 0,
        class: travelClass || 'Economy',
        baggage: Math.random() > 0.5 ? '20 KG' : '15 KG',
        refundable: Math.random() > 0.4
      };
    });

    console.log(`✅ Returning ${flights.length} mock flights`);

    res.json({
      success: true,
      flights,
      count: flights.length,
      source: 'mock-data',
      searchParams: { from, to, date, passengers, travelClass }
    });

  } catch (error) {
    console.error('❌ Flight search error:', error);
    res.status(500).json({ 
      message: 'Error searching flights',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get flight details by ID
export const getFlightDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Mock flight details 
    const flight = {
      id,
      airline: 'Hawk Air',
      airlineLogo: 'https://picsum.photos/seed/sky/100/100',
      departureTime: '06:00 AM',
      arrivalTime: '08:30 AM',
      duration: '2h 30m',
      durationMinutes: 150,
      origin: 'NYC',
      destination: 'LON',
      price: 198,
      stops: 0,
      class: 'Economy',
      baggage: '15 KG',
      refundable: true
    };

    res.json({ success: true, flight });
  } catch (error) {
    console.error('Flight details error:', error);
    res.status(500).json({ message: 'Error fetching flight details' });
  }
};
