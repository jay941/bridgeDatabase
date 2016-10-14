angular.module('MyApp', ['ngResource','ngDialog', 'ngMessages', 'switcher','ngFileUpload', 'ngAnimate', 'toastr', 'ui.router', 'satellizer'])
.config(function ($stateProvider, $urlRouterProvider, $authProvider) {

    /**
     * Helper auth functions
     */
    var skipIfLoggedIn = function ($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    };

    var loginRequired = function ($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    };

    /**
     * App routes
     */
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('profile', {
        url: '/profile?param?n',
        templateUrl: 'partials/profile.html',
        controller: 'projectCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      })

      .state('project', {
            url: '/project?param?n?ProKey',
            templateUrl: 'partials/project.html',
						controller:'projectCtrl'

        })
        .state('project.database', {
            url: '/database',
            templateUrl: 'partials/database.html',
						controller:'submitController'

        })
        .state('project.storage', {
            url: '/storage',
            templateUrl: 'partials/storage.html',
						controller:'storeCtrl'

        });

    $urlRouterProvider.otherwise('/');

    /**
     *  Satellizer config
     */
    $authProvider.google({
						url: 'http://localhost:3000/auth/google',
						clientId:'134360643986-a3cr3godmdkgo1p0lbg13gea8kah439q.apps.googleusercontent.com',
						redirectUri: 'http://localhost:3000/profile'

				});


});