import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid';
import app from '../src/server';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Sign Up', () => {
  it('POST /auth/signup/: Should create a new user account.', (done) => {
    const user = {
      id: uuid.v4(),
      first_name: 'Awa',
      last_name: 'Dieudonne Mbuh',
      username: 'Awa',
      email: 'awa@gmail.com',
      password: '123',
    };
    chai
      .request(app)
      .post('/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
});
