import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import db from '../api/v1/db';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

const user = {
  email: 'l@gmail.com',
  password: '123',
};

before(async () => {
  const params = ['awa', 'Mbuh', 'awa', user.email, false, user.password];
  const { rows } = await db.query(`INSERT INTO users 
            (first_name, last_name, username, email, is_admin, password) 
            VALUES 
            ($1, $2, $3, $4, $5, $6) RETURNING *`, params);
});

describe('Sign In', () => {
  it('POST /api/v1/auth/signin/: Should log a user in.', (done) => {
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
