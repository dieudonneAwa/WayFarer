import jwt from 'jsonwebtoken';
import Booking from '../models/bookingModel';

const createTokenById = async (booking) => {
  // const booking = await Booking.findById(bookingId);

  const newBooking = {
    id: booking.id,
    trip_id: booking.trip_id,
    user_id: booking.user_id,
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
};
