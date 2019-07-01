import { assert } from 'chai';
import server from '../src/server';

describe('Server', () => {
  it('Server: It should return My Server', (done) => {
    assert.equal(server(), 'My Server');
    done();
  });
});