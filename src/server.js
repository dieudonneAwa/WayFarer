import express from 'express';
import bodyParser from 'body-parser';
import Signup from '../auth/signup';
import Signin from '../auth/signin';
import Trip from '../controllers/trips';
import Booking from '../controllers/bookings';
import Bus from '../controllers/buses';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req, res) => res.send({ message: 'Welcome to my API' }));
app.post('/auth/signup', Signup.signUp);
app.post('/auth/signin', Signin.login);
app.post('/trips', Trip.createTrip);
app.get('/trips', Trip.getAllTrips);
app.patch('/trips/:tripId', Trip.updateTrip);
app.delete('/trips/:tripId', Trip.deleteTrip);
app.post('/bookings', Booking.createBooking);
app.get('/bookings', Booking.getAllBookings);
app.delete('/bookings/:bookingId', Booking.deleteBooking);
app.post('/buses', Bus.addBus);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));

export default app;
