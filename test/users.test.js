import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid';
import app from '../src/server';
import User from '../models/userModel';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Users', () => {
  it('GET /users Should get all user.', (done) => {
    chai
      .request(app)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('GET /users/:id Should get a particular user', (done) => {
    const user = {
      id: uuid.v4(),
      first_name: 'Awa',
      last_name: 'Dieudonne Mbuh',
      username: 'Awa',
      email: 'awa@gmail.com',
      password: '123',
    };
    const userId = User.save(user).id;
    chai
      .request(app)
      .get(`/users/${userId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('PATCH /users/:id Should update a user object', (done) => {
    const user = {
      id: uuid.v4(),
      first_name: 'Awa',
      last_name: 'Dieudonne Mbuh',
      username: 'Awa',
      email: 'awa@gmail.com',
      password: '123',
    };
    const userId = User.save(user).id;
    chai
      .request(app)
      .patch(`/users/${userId}`)
      .send({
        id: uuid.v4(),
        first_name: 'Awa',
        last_name: 'Dieudonne Mbuh',
        username: 'Awa',
        email: 'awadieudone@gmail.com',
        password: '123',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('DELETE /users/:id Should delete a user object', (done) => {
    const user = {
      id: uuid.v4(),
      first_name: 'Awa',
      last_name: 'Dieudonne Mbuh',
      username: 'Awa',
      email: 'awadieudone@gmail.com',
      password: '123',
    };
    const userId = User.save(user).id;
    chai
      .request(app)
      .delete(`/users/${userId}`)
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.a('object');
        done();
      });
  });
});
