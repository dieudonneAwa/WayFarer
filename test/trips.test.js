import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';
import Trip from '../api/v1/models/tripModel';
import { createUser, deleteUsers }  from '../api/v1/db/seeds/tests';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

const trip = {
  id: 1,
  bus_id: 1,
  origin: 'Lagos',
  destination: 'Abuja',
  trip_date: 'NOW()',
  fare: 5000.0,
  status: 1.00,
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

describe('Trips', () => {
  it('POST /api/v1/trips/: Should create a new trip.', (done) => {
    const newTrip = Object.assign({}, trip);
    newTrip.token = adminToken;
    chai
      .request(app)
      .post('/api/v1/trips')
      .send(newTrip)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('id').eql(newTrip.id);
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
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
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
        res.body.data.should.have.property('id').eql(trip.id);
        done();
      });
  });

  it('PATCH /api/v1/trips/:tripId Should update a trip object', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${trip.id}`)
      .send({
        id: trip.id,
        bus_id: 1,
        origin: 'Yola',
        destination: 'Abuja',
        trip_date: 'now()',
        fare: 5000.0,
        status: 1.00,
        token: adminToken,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('message').eql('Trip cancelled successfully');
        done();
      });
  });

  it('DELETE /api/v1/trips/:id Should delete a trip object', (done) => {
    // Trip.delete(trip.id);
    const myTrip = Object.assign({}, trip);
    myTrip.token = adminToken;
    chai
      .request(app)
      .delete(`/api/v1/trips/${trip.id}`)
      .send(myTrip)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
