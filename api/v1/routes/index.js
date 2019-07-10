import express from 'express';
import Signup from '../controllers/auth/signup';
import Signin from '../controllers/auth/signin';
import Trip from '../controllers/trips';
import Booking from '../controllers/bookings';
import Bus from '../controllers/buses';

const router = express.Router();

router.get('/', (req, res) => res.send({ message: 'Welcome to my API' }));

// authentications routes
router.post('/auth/signup', Signup.signUp);
router.post('/auth/signin', Signin.login);

// trips routes
router.post('/trips', Trip.createTrip);
router.get('/trips', Trip.getAllTrips);
router.get('/trips/:tripId', Trip.getOneTrip);
router.patch('/trips/:tripId', Trip.updateTrip);
router.delete('/trips/:tripId', Trip.deleteTrip);

// bookings routes
router.post('/bookings', Booking.createBooking);
router.get('/bookings', Booking.getAllBookings);
router.get('/bookings/:bookingId', Booking.getOneBooking);
router.patch('/bookings/:bookingId', Booking.updateBooking);
router.delete('/bookings/:bookingId', Booking.deleteBooking);

// buses routes
router.post('/buses', Bus.addBus);
router.get('/buses', Bus.getAllBuses);
router.get('/buses/:busId', Bus.getOneBus);
router.patch('/buses/:busId', Bus.updatebus);
router.delete('/buses/:busId', Bus.deleteBus);

export default router;
