import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid';
import app from '../src/server';
import Trip from '../models/tripModel';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Trips', () => {
  it('POST /trips/: Should create a new trip.', (done) => {
    const trip = {
      id: uuid.v4(),
      bus_id: 1,
      origin: 'Lagos',
      destination: 'Abuja',
      trip_date: '21/6/19',
      fare: 'N500',
      status: 1.00,
    };
    chai
      .request(app)
      .post('/trips')
      .send(trip)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET /trips Should get all trips.', (done) => {
    chai
      .request(app)
      .get('/trips')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('GET /trips/:id Should get a particular trip', (done) => {
    const trip = {
      id: uuid.v4(),
      bus_id: 1,
      origin: 'Lagos',
      destination: 'Abuja',
      trip_date: '21/6/19',
      fare: 'N500',
      status: 1.00,
    };
    const tripId = Trip.createTrip(trip).id;
    chai
      .request(app)
      .get(`/trips/${tripId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('PATCH /trips/:id Should update a trip object', (done) => {
    const trip = {
      id: uuid.v4(),
      bus_id: 1,
      origin: 'Lagos',
      destination: 'Abuja',
      trip_date: '21/6/19',
      fare: 'N500',
      status: 1.00,
    };
    const tripId = Trip.createTrip(trip).id;
    chai
      .request(app)
      .patch(`/trips/${tripId}`)
      .send({
        id: uuid.v4(),
        bus_id: 1,
        origin: 'Yola',
        destination: 'Abuja',
        trip_date: '21/6/19',
        fare: 'N5000',
        status: 1.00,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('DELETE /trips/:id Should delete a trip object', (done) => {
    const trip = {
      id: uuid.v4(),
      bus_id: 1,
      origin: 'Lagos',
      destination: 'Abuja',
      trip_date: '21/6/19',
      fare: 'N500',
      status: 1.00,
    };
    const tripId = Trip.createTrip(trip).id;
    chai
      .request(app)
      .delete(`/trips/${tripId}`)
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.a('object');
      });
  });
});
