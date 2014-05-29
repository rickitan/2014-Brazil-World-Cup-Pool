var _ = require('underscore');
var async = require('async');
var User = require('../models/User');


exports.index = function(req, res) {
    res.render('quiniela/index', {
        title: 'Quiniela'
    });
};

exports.rankings = function(req, res) {
  res.render('rankings', {
    title: 'Rankings'
  });
};


exports.userRankings = function(req, res) {
  User.find({admin: {$ne: true}}).select("email name points _id").sort({points: -1}).exec(function(err, users){
    res.json(users);
  })
};