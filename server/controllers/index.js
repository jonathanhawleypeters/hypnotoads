var db = require('../db');

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

      db.User.findOrCreate({where: {username: req.body.username}})
        // findOrCreate returns multiple resutls in an array
        // use spread to assign the array to function arguments
        .spread(function(user, created) {
          db.User.create({
            username: req.body.username,
            password: req.body.password //replace
          });
          res.sendStatus(created ? 201 : 200);
        });
    }
  }
};
