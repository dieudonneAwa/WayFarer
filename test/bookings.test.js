import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';
import Booking from '../api/v1/models/bookingModel';
import { createUser, deleteUsers }  from '../api/v1/db/seeds/tests';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

const booking = {
  id: 1,
  trip_id: 1,
  user_id: 1,
  bus_id: 1,
  seat_number: 1,
  created_on: 'NOW()',
};
const user = {
  id: 1,
  first_name: 'me',
  last_name: 'you',
  username: 'we',
  email: 'weall@email.com',
  is_admin: false,
  password: '12345678',
};
const admin = {
  id: 2,
  first_name: 'John',
  last_name: 'Doe',
  username: 'Doe',
  email: 'john@email.com',
  is_admin: true,
  password: '12345678',
};
let userToken = '';
let adminToken = '';

before(async () =>{
  userToken = await createUser(user);
  adminToken = await createUser(admin);
});

after(async () => {
  await deleteUsers();
});

describe('Bookings', () => {
  it('POST /api/v1/bookings: Should create a new booking object.', (done) => {
    const newBooking = Object.assign({}, booking);
    newBooking.token = userToken;
    chai
      .request(app)
      .post('/api/v1/bookings')
      .send(newBooking)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('seat_number');
        done();
      });
  });
  it('POST /api/v1/bookings: Should return error if no token provided.', (done) => {
    chai
      .request(app)
      .post('/api/v1/bookings')
      .send(booking)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Unauthorized Access');
        done();
      });
  });
  it('GET /api/v1/bookings Should get all bookings.', (done) => {
    const newBooking = Object.assign({}, booking);
    newBooking.token = adminToken;
    chai
      .request(app)
      .get('/api/v1/bookings')
      .send(newBooking)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });
  it('GET /api/v1/bookings/:id Should get a particular booking', (done) => {
    const newBooking = Object.assign({}, booking);
    newBooking.token = adminToken;
    chai
      .request(app)
      .get(`/api/v1/bookings/${booking.id}`)
      .send(newBooking)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('id').eql(booking.id);
        done();
      });
  });
  it('PATCH /api/v1/bookings/:id Should update a booking object', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/bookings/${booking.id}`)
      .send({
        id: 2,
        trip_id: 1,
        user_id: 1,
        bus_id: 1,
        created_on: '2019-5-1',
        token: userToken,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('DELETE /api/v1/bookings/:bookingId Should delete a booking object', (done) => {
    Booking.delete(booking.id);
    const newBooking = Object.assign({}, booking);
    newBooking.token = userToken;
    chai
      .request(app)
      .delete(`/api/v1/bookings/${booking.id}`)
      .send(newBooking)
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.a('object');
        done();
      });
  });
});
