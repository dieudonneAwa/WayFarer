import jwt from 'jsonwebtoken';
import Booking from '../models/bookingModel';

const createTokenById = (booking) => {
  const newBooking = {
    id: booking.id,
    trip_id: booking.trip_id,
    user_id: booking.user_id,
    bus_id: booking.bus_id,
    trip_date: booking.trip_date,
    seat_number: booking.trip_date,
    first_name: booking.first_name,
    last_name: booking.last_name,
    email: booking.email,
    created_on: booking.created_on,
  };

  const token = jwt.sign(newBooking, 'process.env.JWT_SECRET', '');
  return token;
};

export default {
  async createBooking(req, res) {
    try {
      const booking = new Booking(req.body);
      booking.token = createTokenById(booking);
      const newBooking = await booking.save();

      return res.status(201).json({ status: 'Success', data: newBooking });
    } catch (error) {
      throw error;
    }
  },

  async getAllBookings(req, res) {
    const allBookings = await Booking.adminFindAll();
    if (!allBookings.length) {
      return res.status(200).send({ status: 'No bookings yet', data: [] });
    }
    return res.status(200).json({ status: 'Success', data: allBookings });
  },

  async getOneBooking(req, res) {
    const bookingId = parseInt(req.params.bookingId, 10);
    try {
      const oneBooking = await Booking.findById(bookingId);
      return res.status(200).json({ status: 'Success', data: oneBooking });
    } catch (error) {
      throw error;
    }
  },

  async updateBooking(req, res) {
    const { bookingId } = req.params;
    if (bookingId == null) {
      res.status(400).send({ status: 'error', error: 'A valid booking Id is required' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking.id) {
      res.status(200).send({ status: 'error', error: 'booking not found' });
    }

    booking.trip_id = req.body.trip_id;
    booking.user_id = req.body.user_id;
    booking.bus_id = req.body.bus_id;
    booking.created_on = req.body.created_on;

    try {
      const updatedBooking = await booking.update();
      res.status(200).json({ status: 'Booking updated successfully', data: updatedBooking });
    } catch (error) {
      throw error;
    }
  },

  async deleteBooking(req, res) {
    const bookingId = parseInt(req.params.bookingId, 10);
    
    if (!bookingId || Number.isNaN(bookingId)) {
      return res.status(400).send({ status: 'error', error: 'Invalid booking id' });
    }
    
    try {
      const booking = await Booking.findById(bookingId);
      const emptyBooking = await Booking.delete(booking.id);
      return res.status(204).json({ status: 'Success', data: emptyBooking });
    } catch (error) {
      throw error;
    }
  },
};
