var db = require('../db');
var jwt = require('jwt-simple');

module.exports = {
  workouts: {
    get: function (req, res) {
      db.Workout.findAll({include: [db.User]})
        .then(function(workouts) {
          res.json(workouts);
        });
    },
    post: function (req, res) {
      db.User.findOrCreate({where: {username: req.body.username}})
        // findOrCreate returns multiple resutls in an array
        // use spread to assign the array to function arguments
        .spread(function(user, created) {
          db.Workout.create({
            UserId: user.id,
            duration: req.body.duration,
            datetime: req.body.datetime,
            category: req.body.category,
            comment: req.body.comment
          }).then(function(workout) {
            res.sendStatus(201);
          });
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
    post: function (req, res) {
      //remove
    },
    signin: function(req, res, next){
      var username = req.body.username;
      var password = req.body.password;

      db.User.find({where: {username: username}})
        .then(function (user) {
          if (!user) {
            //redirect seems to be disallowed here
            next(new Error('User doesn\'t exist!'));
          } else if (user.password !== password) {
            next(new Error('User or password is wrong'));
          }
          return user;
        })
        .then(function (user) {
          // create token to send back for auth
          if(user){
            var token = jwt.encode(user, 'hypnotoad');
            res.json({token: token});
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
          var token = jwt.encode(user, 'hypnotoad');
          res.json({token: token});
        })
        .catch(function (error) {
          next(error);
        });



        // check to see if user already exists
        //findUser({username: username})
        // findOrCreate returns multiple resutls in an array
        // use spread to assign the array to function arguments
        // .spread(function(user, created) {
        //   if (!created) { // if user already exists, redirect to signin
        //     res.redirect('/signin');
        //   } else if (created) {
        //     db.User.create({ //set password
        //       username: req.body.username,
        //       password: req.body.password
        //     });
        //     res.sendStatus(201);
        //   } else { // everything failed
        //     res.sendStatus(500);
        //   }
        // });

    }
  }
};
