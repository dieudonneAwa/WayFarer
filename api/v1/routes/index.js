import express from 'express';
import Signup from '../controllers/auth/signup';
import Signin from '../controllers/auth/signin';
import Trip from '../controllers/trips';
import Booking from '../controllers/bookings';
import Bus from '../controllers/buses';
import auth from '../helpers/auth';

const router = express.Router();

router.get('/', (req, res) => res.send({ message: 'Welcome to my API' }));

// authentications routes
router.post('/auth/signup', Signup.signUp);
router.post('/auth/signin', Signin.login);

// trips routes
router.post('/trips', auth.verifyToken, auth.verifyAdmin, Trip.createTrip);
router.get('/trips', Trip.getAllTrips);
router.get('/trips/:tripId', Trip.getOneTrip);
router.patch('/trips/:tripId', auth.verifyToken, auth.verifyAdmin, Trip.updateTrip);
router.delete('/trips/:tripId', auth.verifyToken, auth.verifyAdmin, Trip.deleteTrip);

// bookings routes
router.post('/bookings', auth.verifyToken, Booking.createBooking);
router.get('/bookings', auth.verifyToken, auth.verifyAdmin, Booking.getAllBookings);
router.get('/bookings/:bookingId', auth.verifyToken, auth.verifyAdmin, Booking.getOneBooking);
router.patch('/bookings/:bookingId', auth.verifyToken, Booking.updateBooking);
router.delete('/bookings/:bookingId', auth.verifyToken, Booking.deleteBooking);

// buses routes
router.post('/buses', auth.verifyToken, auth.verifyAdmin, Bus.addBus);
router.get('/buses', Bus.getAllBuses);
router.get('/buses/:busId', Bus.getOneBus);
router.patch('/buses/:busId', auth.verifyToken, auth.verifyAdmin, Bus.updatebus);
router.delete('/buses/:busId', auth.verifyToken, auth.verifyAdmin, Bus.deleteBus);

export default router;
