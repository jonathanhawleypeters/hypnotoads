//TODO: CHECK ACTUAL NAMES FOR CONTROLLERS AND TEMPLATES

angular.module('workout-app', [
  // 'auth',
  // 'profile',
  // 'post-workout',
  'workout-app.services',
  'ngRoute',
  // 'feed'
])
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/signin', {
        templateUrl: 'auth/signin/signin.html',
        controller: 'AuthController',
        authenticate: false
      })
      .when('/signup', {
        templateUrl: 'auth/signup/signup.html',
        controller: 'AuthController',
        authenticate: false
      })
      // .when('/profile', {
      //   templateUrl: 'profile/profile.html',
      //   controller: 'ProfileController',
      //   authenticate: true
      // })
      .when('/postWorkout', {
        templateUrl: 'post/postWorkout.html',
        controller: 'PostWorkoutController',
        authenticate: true
      })
      //not built yet
      // .when('/feed', {
      //   templateUrl: 'feed/feed.html',
      //   controller: 'FeedController',
      //   authenticate: true
      // })
      .otherwise({
        redirectTo:'/profile'
      })
  });