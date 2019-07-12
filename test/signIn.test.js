import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Sign In', () => {
  it('POST /api/v1/auth/signin/: Should log a user in.', (done) => {
    const user = {
      email: 'm@gmail.com',
      password: '123',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
