angular.module('workout-app.services', [])
.controller('AuthController', function ($scope, Workouts) {
  angular.extend($scope, Workouts)
})

.controller('PostWorkoutController', function ($scope, Workouts) {
  angular.extend($scope, Workouts)

  $scope.weekStart =  moment().endOf('isoWeek').format("MMM Do");
  $scope.weekEnd = moment().endOf('isoWeek').format("MMM Do");

  // this used for the dragging functionality:
  $scope.onDropComplete = function (index, obj, evt, array) {
    var otherObj = array[index];
    var otherIndex = array.indexOf(obj);
    array[index] = obj;
    array[otherIndex] = otherObj;
  }

  // this array holds the local copy of all the workouts
  $scope.workoutsDatabase = [];
  $scope.loadDatabase = function () {
    fact.getWorkouts()
    .then(function (data) {
      $scope.workoutsDatabase = data;
    });
  }

  $scope.loadDatabase();
})
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

  ////////

  var blank = {
    type: "---",
    class: "workoutBlank"
  }

  var calendarTimes = {
    // Array(number of items).fill(blank)
    Monday: [blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank],
    Tuesday: [blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank],
    Wednesday: [blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank],
    Thursday: [blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank],
    Friday: [blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank],
    Saturday: [blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank],
    Sunday: [blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank, blank]
  }

  var workoutData = {
    cardio: ['running', 'walking', 'jogging'],
    weightlifting: ['arms', 'legs', 'full body']
  }

  // *** go back into database and update these fields
  var workoutFields = ['duration', 'calories', 'comment']

  var addNewElement = {
    Monday: { hidden: false },
    Tuesday: { hidden: false },
    Wednesday: { hidden: false },
    Thursday: { hidden: false },
    Friday: { hidden: false },
    Saturday: { hidden: false },
    Sunday: { hidden: false }
  }

  var allWorkouts = [
    ['Monday', new Date(), []],
    ['Tuesday', new Date(), []],
    ['Wednesday', new Date(), []],
    ['Thursday', new Date(), []],
    ['Friday', new Date(), []],
    ['Saturday', new Date(), []],
    ['Sunday', new Date(), []]
  ];

  var daysOfTheWeek = {
    'Monday' : 0,
    'Tuesday' : 1,
    'Wednesday' : 2,
    'Thursday' : 3,
    'Friday' : 4,
    'Saturday' : 5,
    'Sunday' : 6
  }


  var addWorkout = function (category, day) {
    console.log(type)
    if (type !== undefined) {
      var newWorkout = {
        datetime: new Date().toISOString,
        duration: 0,
        category: category,
        comment: null,
        calories: 0,
        year: moment().year(),
        week: moment().week(),
        day: day,
        hidden: false
      }
      postWorkout(newWorkout);

      allWorkouts[daysOfTheWeek[day]][2].push(newWorkout)
      calendarTimes[day].shift()
      calendarTimes[day].push(newWorkout)
    }
    // postWorkout(newWorkout)
  }

  var toggle = function (item) {
    item.hidden = !item.hidden
  }

  var createNew = function () {
    console.log('new workout!!!')
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

