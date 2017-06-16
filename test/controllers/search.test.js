var app = require('../../app');
var request = require('supertest')(app);
var config = require('../../config');

describe('test/controllers/search.test.js', function () {
  it('should redirect to google search', function (done) {
    request.get('/search').query({q: 'node'})
      .expect(302)
      .end(function (err, res) {
        res.headers['location'].should.equal('https://www.google.com.au/#hl=en-au&q=site:'+ config.domainname + '+node');
        done(err);
      });
  });
});
