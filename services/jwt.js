'use strict';

var jwt = require('jsonwebtoken');
var moment = require('moment');
var secret = 'Secret_Key1-2-3.';

exports.createtoken = function (user) {
    var payload = {
        sub: user.userId,
        name: user.username,
        email: user.email,
    };
    return jwt.encode(payload, secret);
};