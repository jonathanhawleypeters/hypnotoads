var Sequelize = require('sequelize');


var db = new Sequelize('hypnotoad', 'fred', 'fred', {
  host: 'postgres://rfkwziwgshgcto:q5c3fE6b6jcnOtagrsRwd18mce@ec2-54-225-81-90.compute-1.amazonaws.com:5432/dc6lmpr5fle6dc',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// we define the models we need using js--we don't need a schema file!
var User = db.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
  //pre-save, password hash
});

var Workout = db.define('Workout', {
  datetime: Sequelize.DATE,
  duration: Sequelize.INTEGER,
  category: Sequelize.STRING,
  comment: Sequelize.STRING,
  calories: Sequelize.INTEGER,
  year: Sequelize.INTEGER,
  week: Sequelize.INTEGER,
  day: Sequelize.INTEGER,
});

// puts a UserId column on each Message instance
// also gives us the `.setUser` method available
// after creating a new instance of Message
Workout.belongsTo(User);

// enables bi-directional associations between Users and Messages
User.hasMany(Workout);


User.sync(/*{force: true}*/);
Workout.sync(/*{force: true}*/);
// creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop any existing user and message tables and make new ones.

exports.User = User;
exports.Workout = Workout;
