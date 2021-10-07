const should = require('chai').should();
const request = require('supertest');
let server;

beforeEach(function () {
  server = require('../server');
});
afterEach(function () {
  server.close();
});
// sample 1 (Ashburn,VA) : /39.00149/-77.51559
// Sample 2 (Birmingham ,AL) : /33.52080/-86.80270
//Sample 3 Invalid cordinates.

const ashburnVa = `/39.00149/-77.51559`;
const birminghamAL = `/33.52080/-86.80270`;
const invalidLoc = `/-87643/90`;

describe('Weather Service works as expected if it', () => {
  it('responds to /', function testWeather(done) {
    request(server)
      .get(birminghamAL)
      .end(function(err,res) {
        console.log(res.body);
        res.body.should.have.property('Temperature');
        done();
      });
  });

  it('responds to /', function testWeather(done) {
    request(server)
      .get(ashburnVa)
      .end(function(err,res) {
        console.log(res.body);
        res.body.should.have.property('Temperature');
        done();
      });
  });

  it('responds to /', function testWeather(done) {
    request(server)
      .get(invalidLoc)
      .end(function(err,res) {
        console.log(res.body);
        res.body.cod.should.equal('400');
        done();
      });
  });

});