var controller = require('./controllers');
var router = require('express').Router();
//Utils
var utils = require('./utils.js');

//Connect controller methods to their corresponding routes
router.get('/workouts', utils.checkUser, controller.workouts.get);

router.post('/workouts', utils.checkUser, controller.workouts.post);

router.get('/users', utils.checkUser, controller.users.get);

router.post('/signin', controller.users.signin);

router.post('/signup', controller.users.signup);


module.exports = router;

