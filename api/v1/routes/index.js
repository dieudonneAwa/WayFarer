import express from 'express';
import Signup from '../controllers/auth/signup';
import Signin from '../controllers/auth/signin';
import Trip from '../controllers/trips';
import Booking from '../controllers/bookings';
import Bus from '../controllers/buses';

const router = express.Router();

router.get('/', (req, res) => res.send({ message: 'Welcome to my API' }));

// authentications routes
router.post('/api/v1/auth/signup', Signup.signUp);
router.post('/api/v1/auth/signin', Signin.login);

// trips routes
router.post('/api/v1/trips', Trip.createTrip);
router.get('/api/v1/trips', Trip.getAllTrips);
router.get('/api/v1/trips/:tripId', Trip.getOneTrip);
router.patch('/api/v1/trips/:tripId', Trip.updateTrip);
router.delete('/api/v1/trips/:tripId', Trip.deleteTrip);

// bookings routes
router.post('/api/v1/bookings', Booking.createBooking);
router.get('/api/v1/bookings', Booking.getAllBookings);
router.get('/api/v1/bookings/:bookingId', Booking.getOneBooking);
router.patch('/api/v1/bookings/:bookingId', Booking.updateBooking);
router.delete('/api/v1/bookings/:bookingId', Booking.deleteBooking);

// buses routes
router.post('/api/v1/buses', Bus.addBus);
router.get('/api/v1/buses', Bus.getAllBuses);
router.get('/api/v1/buses/:busId', Bus.getOneBus);
router.patch('/api/v1/buses/:busId', Bus.updatebus);
router.delete('/api/v1/buses/:busId', Bus.deleteBus);

export default router;
