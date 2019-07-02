import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid';
import app from '../src/server';
import Booking from '../models/bookingModel';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Bookings', () => {
  it('POST /bookings: Should create a new booking object.', (done) => {
    const booking = {
      id: uuid.v4(),
      trip_id: '1',
      user_id: '1',
      created_on: '20/6/19',
    };
    chai
      .request(app)
      .post('/bookings')
      .send(booking)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET /bookings Should get all bookings.', (done) => {
    chai
      .request(app)
      .get('/bookings')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('GET /bookings/:id Should get a particular booking', (done) => {
    const booking = {
      id: uuid.v4(),
      trip_id: '1',
      user_id: '1',
      created_on: '20/6/19',
    };
    const bookingId = Booking.book(booking).id;
    chai
      .request(app)
      .get(`/bookings/${bookingId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('PATCH /bookings/:id Should update a booking object', (done) => {
    const booking = {
      id: uuid.v4(),
      trip_id: '1',
      user_id: '1',
      created_on: '20/6/19',
    };
    const bookingId = Booking.book(booking).id;
    chai
      .request(app)
      .patch(`/bookings/${bookingId}`)
      .send({
        id: uuid.v4(),
        trip_id: '2',
        user_id: '1',
        created_on: '20/6/19',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('DELETE /bookings/:id Should delete a booking object', (done) => {
    const booking = {
      id: uuid.v4(),
      trip_id: '1',
      user_id: '1',
      created_on: '20/6/19',
    };
    const bookingId = Booking.book(booking).id;
    chai
      .request(app)
      .delete(`/bookings/${bookingId}`)
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.a('object');
        done();
      });
  });
});
