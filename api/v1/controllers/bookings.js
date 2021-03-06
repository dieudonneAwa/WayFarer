import Booking from '../models/bookingModel';

export default {
  async createBooking(req, res) {
    try {
      const { body } = req;
      if (!body.trip_id || !body.user_id || !body.bus_id) {
        return res.status(400).json({ status: 'error', error: 'Please provide all bookings infos' });
      }

      const booking = new Booking(req.body);
      const newBooking = await booking.save();

      return res.status(201).json({ status: 'Success', data: newBooking });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: 'Únable to create booking' });
    }
  },

  async getAllBookings(req, res) {
    try {
      const allBookings = await Booking.adminFindAll();
      if (!allBookings.length) {
        return res.status(404).send({ status: 'No bookings yet', data: [] });
      }
      return res.status(200).json({ status: 'Success', data: allBookings });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: 'Únable to get bookings' });
    }
  },

  async getOneBooking(req, res) {
    try {
      const bookingId = parseInt(req.params.bookingId, 10);
      const oneBooking = await Booking.findById(bookingId);
      return res.status(200).json({ status: 'Success', data: oneBooking });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: 'Únable to get booking' });
    }
  },

  async updateBooking(req, res) {
    const { bookingId } = req.params;
    if (bookingId == null) {
      return res.status(400).send({ status: 'error', error: 'A valid booking Id is required' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking.id) {
      return res.status(200).send({ status: 'error', error: 'booking not found' });
    }

    booking.trip_id = req.body.trip_id;
    booking.user_id = req.body.user_id;
    booking.bus_id = req.body.bus_id;
    booking.seat_number = req.body.seat_number;
    booking.created_on = req.body.created_on;

    try {
      const updatedBooking = await booking.update();
      return res.status(200).json({ status: 'Booking updated successfully', data: updatedBooking });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: 'Únable to update booking' });
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
      return res.status(500).json({ status: 'error', error: 'Únable to delete bookings' });
    }
  },
};
