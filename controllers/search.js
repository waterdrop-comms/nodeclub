var config = require('../config');

exports.index = function (req, res, next) {
  var q = req.query.q;
  q = encodeURIComponent(q);
  res.redirect('https://www.google.com.au/#hl=en-au&q=site:' + config.domainname + '+' + q);
};
