var mailer        = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config        = require('../config');
var util          = require('util');
var logger = require('./logger');
var transporter     = mailer.createTransport(smtpTransport(config.mail_opts));
var SITE_ROOT_URL = 'http://' + config.host;
var async = require('async')

/**
 * Send an email
 * @param {Object} data 
 */
var sendMail = function (data) {
  if (config.debug) {
    return;
  }

  // 5 times retry
  async.retry({times: 5}, function (done) {
    transporter.sendMail(data, function (err) {
      if (err) {
        //log it 
        logger.error('send mail error', err, data);
        return done(err);
      }
      return done()
    });
  }, function (err) {
    if (err) {
      return logger.error('send mail finally error', err, data);
    }
    logger.info('send mail success', data)
  })
};
exports.sendMail = sendMail;

/**
 * Send email for activation
 * @param {String} who receiver
 * @param {String} token for reset password --- token
 * @param {String} name receipt name
 */
exports.sendActiveMail = function (who, token, name) {
  var from    = util.format('%s <%s>', config.name, config.mail_opts.auth.user);
  var to      = who;
  var subject = config.name + ' Registration Activate';
  var html    = '<p>Hi: ' + name + '</p>' +
    '<p>To complete registration on ' + config.name + ', please complete below </p>' +
    '<a href  = "' + SITE_ROOT_URL + '/active_account?key=' + token + '&name=' + name + '">Activate</a>' +
    '<p>If you did not register on ' + config.name + ', please disregard this message.</p>' +
    '<p>' + config.name + '</p>';

  exports.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  });
};

/**
 * reset 
 * @param {String} who to receive email
 * @param {String} token token
 * @param {String} name 
 */
exports.sendResetPassMail = function (who, token, name) {
  var from = util.format('%s <%s>', config.name, config.mail_opts.auth.user);
  var to = who;
  var subject = config.name + ' Password Reset';
  var html = '<p>Hi:' + name + '</p>' +
    '<p>We received the request to reset your ' + config.name + ' password, please complete it asap!</p>' +
    '<a href="' + SITE_ROOT_URL + '/reset_pass?key=' + token + '&name=' + name + '">Reset Password</a>' +
    '<p>If you did not request on ' + config.name + ', please disregard this email.</p>' +
    '<p>' + config.name + '</p>';

  exports.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  });
};
