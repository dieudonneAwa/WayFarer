import jwt from 'jsonwebtoken';
import Booking from '../models/bookingModel';

const createTokenById = async (booking) => {
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
};
