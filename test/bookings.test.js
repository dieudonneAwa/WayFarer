import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';
import Booking from '../api/v1/models/bookingModel';

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

describe('Bookings', () => {
  it('POST /api/v1/bookings: Should create a new booking object.', (done) => {

    chai
      .request(app)
      .post('/api/v1/bookings')
      .send(booking)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('seat_number');
      }); done();
  });

  it('GET /api/v1/bookings Should get all bookings.', (done) => {
    chai
      .request(app)
      .get('/api/v1/bookings')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET /api/v1/bookings/:id Should get a particular booking', (done) => {
    chai
      .request(app)
      .get(`/api/v1/bookings/${booking.id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
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
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('DELETE /api/v1/bookings/:bookingId Should delete a booking object', (done) => {
    Booking.delete(booking.id);
    chai
      .request(app)
      .delete(`/api/v1/bookings/${booking.id}`)
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.a('object');
        done();
      });
  });
});
