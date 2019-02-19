import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import host from '../index';

chai.should();
chai.expect();
chai.use(chaiHttp);

describe('Home page', () => {
  it('it should open the index', (done) => {
    chai.request(host)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
