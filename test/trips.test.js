import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import Trip from '../api/v1/models/tripModel';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Trips', () => {
  const trip = {
    id: 1,
    bus_id: 1,
    origin: 'Lagos',
    destination: 'Abuja',
    trip_date: 'NOW()',
    fare: 5000.0,
    status: 1.00,
  };
  it('POST /api/v1/trips/: Should create a new trip.', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .send(trip)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET /api/v1/trips Should get all trips.', (done) => {
    chai
      .request(app)
      .get('/api/v1/trips')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET /api/v1/trips/:tripId Should get a particular trip', (done) => {
    chai
      .request(app)
      .get(`/api/v1/trips/${trip.id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('PATCH /api/v1/trips/:tripId Should update a trip object', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${trip.id}`)
      .send({
        bus_id: 1,
        origin: 'Yola',
        destination: 'Abuja',
        trip_date: 'now()',
        fare: 5000.0,
        status: 1.00,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('DELETE /api/v1/trips/:id Should delete a trip object', (done) => {
    // Trip.delete(trip.id);
    chai
      .request(app)
      .delete(`/api/v1/trips/${trip.id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
