angular.module('workout-app.services', [])

.factory('Workouts', function ($http) {

  var getAllWorkoutsForUser = function () {
    return $http({
      method: 'GET',
      url: '/workouts/:id' 
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getAllWorkouts = function() {
    return $http({
      method: 'GET',
      url: '/workouts'
    })
    .then(function(resp) {
      return resp.data;
    })
  };

  var addWorkout = function (newWorkout) {
    return $http({
      method: 'POST',
      url: '/workouts',
      data: newWorkout
    });
  };

  var getUser = function() {
    return $http({
      method: 'GET',
      url: '/users'
    })
    .then(function(resp) {
      return resp.data;
    })
  }

  var checkUser = function (username, password) {
    // return hashed password for that specific username, and check to see if it matches hashed version of entered password. will build out remaining functionality later.
    return $http({
      method: 'POST',
      url: '/signin',
      data: { username: username, password: password }
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (err) {
      console.log(err)
    })
  }
  
  var addUser = function (username, password) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: { username: username, password: password }
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (err) {
      console.log(err)
    })
  }
  return {
    getAllWorkoutsForUser: getAllWorkoutsForUser,
    getAllWorkouts: getAllWorkouts,
    addWorkout: addWorkout,
    getUser: getUser,
    checkUser: checkUser,
    addUser: addUser
  };

})

//TODO: add anna's calendar factory