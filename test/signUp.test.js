import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Sign Up', () => {
  it('POST /api/v1/auth/signup/: Should create a new user account.', (done) => {
    const user = {
      first_name: 'Awa',
      last_name: 'Dieudonne Mbuh',
      username: 'Awa',
      email: 'l@gmail.com',
      password: '123',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
