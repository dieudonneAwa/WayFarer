import jwt from 'jsonwebtoken';
import Trip from '../models/tripModel';

const addTripById = async (tripId) => {
  const trip = await Trip.findById(tripId);

  const addedTrip = {
    id: trip.id,
    bus_id: trip.bus_id,
    origin: trip.origin,
    destination: trip.destination,
    trip_date: trip.trip_date,
    fare: trip.fare,
    status: trip.status,
  };
  const token = jwt.sign(addedTrip, 'process.env.JWT_SECRET', '');
  addedTrip.token = token;
  return addedTrip;
};

export default {
  async createTrip(req, res) {
    try {
      const trip = new Trip(req.body);
      const newTrip = await trip.save();

      return res.status(201).json({ status: 'Success', data: newTrip })
    } catch (error) {
      throw error;
    }
  },

  async getAllTrips(req, res) {
    const allTrips = await Trip.findAll({});
    if (!allTrips.length) {
      return res.status(200).send({ data: [], message: 'No Trips yet' });
    }
    return res.status(200).json({ status: 'Success', data: allTrips });
  },
};
