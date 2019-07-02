import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid';
import app from '../src/server';
import Bus from '../models/busModel';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Buses ', () => {
  it('POST /buses Should register a bus', (done) => {
    const bus = {
      id: uuid.v4(),
      number_plate: 'CM 785 SW',
      manufacturer: 'Ford',
      model: 'V8',
      year: '1980',
      capacity: 5,
    };
    chai
      .request(app)
      .post('/buses')
      .send(bus)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET /buses Should get all buses', (done) => {
    chai
      .request(app)
      .get('/buses')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('GET /buses/:id Should get a particular bus', (done) => {
    const bus = {
      id: uuid.v4(),
      number_plate: 'CM 785 SW',
      manufacturer: 'Ford',
      model: 'V8',
      year: '1980',
      capacity: 5,
    };
    const busId = Bus.createBus(bus).id;
    chai
      .request(app)
      .get(`/buses/${busId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('PATCH /buses/:id Should update a bus object', (done) => {
    const bus = {
      id: uuid.v4(),
      number_plate: 'CM 785 SW',
      manufacturer: 'Ford',
      model: 'V8',
      year: '1980',
      capacity: 5,
    };
    const busId = Bus.createBus(bus).id;
    chai
      .request(app)
      .patch(`/buses/${busId}`)
      .send({
        id: uuid.v4(),
        number_plate: 'CM 785 SW',
        manufacturer: 'Ford',
        model: 'V8',
        year: '1980',
        capacity: 5,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('DELETE /buses/:id Should delete a bus object', (done) => {
    const bus = {
      id: uuid.v4(),
      number_plate: 'CM 785 SW',
      manufacturer: 'Ford',
      model: 'V8',
      year: '1980',
      capacity: 5,
    };
    const busId = Bus.save(bus).id;
    chai
      .request(app)
      .delete(`/buses/${busId}`)
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.a('object');
        done();
      });
  });
});
