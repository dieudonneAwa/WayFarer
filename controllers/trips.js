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

      return res.status(201).json({ status: 'Success', data: newTrip });
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

  async updateTrip(req, res) {
    const tripId = parseInt(req.params.tripId, 10);

    if (!tripId || Number.isNaN(tripId)) {
      return res.status(400).send({ errors: { tripId: 'A valid trip Id is required' } });
    }

    const trip = await Trip.findById(tripId);
    if (!tripId || Number.isNaN(tripId)) {
      return res.status(400).send({ status: 'error', error: 'A valid trip Id is required' });
    }

    try {
      const updatedTrip = await trip.update();
      return res.status(200).json({ data: updatedTrip, message: 'Trip updated' });
    } catch (error) {
      throw error;
    }
  },

  async deleteTrip(req, res) {
    const tripId = parseInt(req.params.tripId, 10);

    if (!tripId || Number.isNaN(tripId)) {
      return res.status(400).send({ status: 'error', error: 'A valid trip Id is required' });
    }

    try {
      await Trip.delete(tripId);
      return res.status(200).json({ status: 'Trip deleted!', data: [] });
    } catch (error) {
      throw error;
    }
  }
};
