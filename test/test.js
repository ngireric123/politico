import chai from 'chai';
import chaiHttp from 'chai-http';
import host from '../index';

const should = chai.should();
const expect = chai.expect();
chai.use(chaiHttp);


describe('POST Political party', () => {
	it('it should CREATE a party', (done) => {
		chai.request(host)
		.post('/api/v1/parties')
		.send({
			name: "PL",
			hqaddress: "KG23",
			logourl: "jmfk.jpg"
		})

		.end((err, res) => {
			res.should.have.status(201);
			res.body.should.be.a('object');
			done();
		});
	});
});

describe('GET all Political parties', () => {
	it('It should show the list of registered political parties', (done) => {
		chai.request(host)
		.get('/api/v1/parties')

		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			done();
		});
	});
});
