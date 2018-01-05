'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../index');

const should = chai.should();

chai.use(chaiHttp);

describe('Courses', function() {
  it('should list all available courses on GET', function() {
    return chaiHttp.request(app)
      .get('/courses')
      .then(res => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.above(0);
      });
  });
});



