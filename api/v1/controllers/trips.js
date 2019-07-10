import jwt from 'jsonwebtoken';
import Trip from '../models/tripModel';

const createToken = async (trip) => {

  const tripObj = {
    id: trip.id,
    bus_id: trip.bus_id,
    origin: trip.origin,
    destination: trip.destination,
    trip_date: trip.trip_date,
    fare: trip.fare,
    status: trip.status,
  };
  const token = jwt.sign(tripObj, 'process.env.JWT_SECRET', '');
  return token;
};

export default {
  async createTrip(req, res) {
    try {
      const trip = new Trip(req.body);
      const token = createToken(trip);
      trip.token = token;
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

  async getOneTrip(req, res) {
    const tripId = parseInt(req.params.tripId, 10);
    try {
      const oneTrip = await Trip.findById(tripId);
      return res.status(200).json({ status: 'Success', data: oneTrip });
    } catch (error) {
      throw error;
    }
  },

  async updateTrip(req, res) {
    const { tripId } = req.params;
    if (tripId == null) {
      res.status(400).send({ status: 'error', errors: 'A valid trip Id is required' });
    }

    const trip = await Trip.findById(tripId);
    if (!trip.id) {
      res.status(200).send({ status: 'error', errors: 'trip not found' });
    }

    trip.bus_id = req.body.bus_id;
    trip.origin = req.body.origin;
    trip.destination = req.body.destination;
    trip.trip_date = req.body.trip_date;
    trip.fare = req.body.fare;
    trip.status = req.body.status;
    const updatedTrip = await trip.update();

    res.status(200).json({ data: updatedTrip, message: 'Trip updated successfully' });
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
