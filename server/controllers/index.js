var db = require('../db');
var utils = require('../utils.js');
var jwt = require('jwt-simple');

module.exports = {
  workouts: {
    //get all workouts from db?
    user: function (req, res) {
      //should filter for users
      var id = req.url.replace('/workouts/', '');
      db.Workout.findAll({where: {UserId: id}})
        .then(function(workouts) {
          res.json(workouts);
        })
        .catch(function(error){
          console.error(error);
        });
    },

    all: function (req, res) {
      db.Workout.findAll()
        .then(function (workouts) {
          res.json(workouts);
        })
        .catch(function(error){
          console.error(error);
        });
    },

    add: function (req, res) {
      //should just be create
      db.User.find({where: {username: req.user.username}})
        // findOrCreate returns multiple resutls in an array
        // use spread to assign the array to function arguments
        .then(function(user) {
          db.Workout.create({
            UserId: user.id,
            duration: req.body.duration,
            datetime: req.body.datetime,
            category: req.body.category,
            comment: req.body.comment,
            calories: req.body.calories,
            year: req.body.year,
            week: req.body.week,
            day: req.body.day
          })
          .then(function(workout) {
            res.sendStatus(201);
          })
          .catch(function(error){
            console.error(error);
          });
        });
    },
    delete: function (req, res) {
      var id = req.url.replace('/workouts/', '');
      db.Workout.destroy({where: {id: id}})
        .then(function(workout){
          res.json(workout);
        })
        .catch(function(error){
          console.error(error);
        });
    }
  },

  users: {
    get: function (req, res) {
      db.User.findAll()
        .then(function(users) {
          res.json(users);
        });
    },

    signin: function(req, res, next){
      var username = req.body.username;
      var password = req.body.password;

      db.User.find({where: {username: username}})
        .then(function (user) {
          if (!user) {
            next(new Error('username not found'));
          } else {
            if (user.password === password) { //hashing later
              res.json({ token: jwt.encode(user, 'mE2bNdyu2p') });
            } else {
              next(new Error('password does not match'));
            }
          }
        })
        .catch(function (error) {
          next(error);
        });
    },

    signup: function(req, res, next){

      //rework this logic to find, then create
      var username = req.body.username;
      var password = req.body.password;

      db.User.find({where: {username: username}})
        .then(function (user) {
          if (user) {
            //redirect seems to be disallowed here
            next(new Error('User already exists!'));
          } else {
            // make a new user if not one
            return db.User.create({
              username: username,
              password: password
            });
          }
        })
        .then(function (user) {
          // create token to send back for auth
          res.json({ token: jwt.encode(user, 'mE2bNdyu2p') });
        })
        .catch(function (error) {
          next(error);
        });
    }
  }
};
