import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';
import Bus from '../api/v1/models/busModel';
import Trip from '../api/v1/models/tripModel';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Buses ', () => {
  const bus = {
    id: 2,
    number_plate: 'CM 785 SW',
    manufacturer: 'Ford',
    model: 'V8',
    year: '1980',
    capacity: 5,
  };
  it('POST /api/v1/buses Should register a bus', (done) => {
    chai
      .request(app)
      .post('/api/v1/buses')
      .send(bus)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET /api/v1/buses Should get all buses', (done) => {
    chai
      .request(app)
      .get('/api/v1/buses')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET /api/v1/buses/:bus_id Should get a particular bus', (done) => {
    chai
      .request(app)
      .get(`/api/v1/buses/${bus.id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('PATCH /api/v1/buses/:bus_id Should update a bus object', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/buses/${bus.id}`)
      .send({
        id: 1,
        number_plate: 'CM 785 SW',
        manufacturer: 'Ford',
        model: 'V8',
        year: '1980-7-4',
        capacity: 5,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('DELETE /api/v1/buses/:bus_id Should delete a bus object', (done) => {
    Trip.delete(1);
    chai
      .request(app)
      .delete(`/api/v1/buses/${bus.id}`)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
