'use strict';
/**
 * @ngdoc overview
 * @name ep.login
 * @description
 * Provides simple login/logout directive
 * depends on ep.token, ep.templates
 */
angular.module('ep.login', [
    'ep.token',
    'ep.templates'
]);

'use strict';
/**
 * @ngdoc overview
 * @name ep.templates
 * @description
 * Provides module stub to inject html templates.
 * the ngtemplates grunt task will build the html
 * templates into $templateCache against named module
 */
angular.module('ep.templates', []);

'use strict';
/**
 * @ngdoc overview
 * @name ep.token
 * @description
 * Provides epicor token auth login/logout services
 */
angular.module('ep.token', []);

'use strict';

/**
 * @ngdoc controller
 * @name ep.login.controller:epLoginCtrl
 * @description
 * Represents the login controller.
 * This controller negotiates the login/logout requests with the token factory
 *
 * @example
 *
 */
angular.module('ep.login').controller('epLoginCtrl', [
    '$scope',
    '$stateParams',
    '$state',
    'tokenFactory',
    function($scope, $stateParams, $state, tokenFactory) {
        $scope.cancelPath = $stateParams.cancelPath || 'home';
        $scope.user = tokenFactory.getToken();
        $scope.status = '';
        $scope.$watch(function($scope) {
            $scope.hasToken = tokenFactory.hasToken();
            return (tokenFactory.hasToken());
        });

        /**
         * @ngdoc method
         * @name login
         * @methodOf ep.login.controller:epLoginCtrl
         * @public
         * @description
         * Handles the login request using the current user object from $scope
         * the tokenFactory returns a promise, so the controller will
         * need to handle success or error
         */
        $scope.login = function() {
            $scope.hasError = false;
            $scope.status = '';

            // verify input prompts are populated
            if (!$scope.user ||
                !$scope.user.hasOwnProperty('username') ||
                !$scope.user.hasOwnProperty('password') ||
                !$scope.user.username ||
                !$scope.user.password) {
                    $scope.hasError = true;
                    $scope.status = 'Please fill required fields.';
                   return;
            }

            // ask the token factory to provide success/error promise
            tokenFactory.login($scope.user)
              .success(function() {
                  //this callback will be called asynchronously
                  //when the response is available
                  $scope.hasToken = true;
                  $state.go('home');
              }).
              error(function(data, status, headers, config) {
                  //called asynchronously if an error occurs
                  //or server returns response with an error status.
                  var restServer = (config !== undefined && config !== null) ? config.url : '';
                  $scope.status = 'Login Failure at: ' + restServer;
                  $scope.hasError = true;
              });
        };

        /**
         * @ngdoc method
         * @name logout
         * @methodOf ep.login.controller:epLoginCtrl
         * @public
         * @description
         * Handles the logout request using the tokenFactory
         */
        $scope.logout = function() {
            tokenFactory.logout();
            $scope.user = {};
            $scope.hasToken = false;
        };
    }
]);

'use strict';
/**
     * @ngdoc directive
     * @name ep.login.directive:epLogin
     * @restrict E
     *
     * @description
     * Represents the login dialog directive
     *
     * @example
     */
angular.module('ep.login').directive('epLogin',
    function() {
        return {
            restrict: 'E',
            controller: 'epLoginCtrl',
            templateUrl: 'src/components/ep.login/login.html',
        };
    });

'use strict';

/**
 * @ngdoc object
 * @name ep.token.object:tokenConfig
 * @description
 * Provider for tokenConfig.
 * Gets configuration options from tokenConfig.json or default
 */
angular.module('ep.token').provider('tokenConfig',
    function() {
        var jsonReadStatus;
        var config = {
            /**
            * @ngdoc property
            * @name restUri
            * @propertyOf ep.token.object:tokenConfig
            * @public
            * @description
            * Represents the URI for the REST service that provides the token auth login
            */
            restUri: 'https://localhost/ICE3/TokenResource.svc/',
            /**
            * @ngdoc property
            * @name tokenId
            * @propertyOf ep.token.object:tokenConfig
            * @public
            * @description
            * Represents the Id for the cookie that will store username and token
            */
            tokenId: 'epicor.token.auth'
        };

        //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
        //In our case, the "service" is the environment configuration object
        //The $get is called automatically when AngularJS encounters a DI.
        //
        // also knowing despite the (use $http instead of $.ajax) rules on the EMF coders styleguide
        // There is a problem: $http is an asynchronous call, so its not guaranteed that the
        // data will be returned with the values read from the sysconfig.json.
        // To get around we have to make $http a sync call, which is not possible.
        this.$get = function() {
            var q = $.ajax({
                type: 'GET',
                url: 'sysconfig.json',
                cache: false,
                async: false,
                contentType: 'application/json'
            });

            jsonReadStatus = q.status;
            if (q.status === 200) {
                var sysconfig = angular.fromJson(q.responseText);
                if (sysconfig.hasOwnProperty('ep_token_config')) {
                    angular.extend(config, sysconfig.ep_token_config);
                }
            }

            return config;
        };
    });

'use strict';
/**
 * @ngdoc service
 * @name ep.token.factory:tokenFactory
 * @description
 * Provides token auth login/logout behaviors
 *
 * **note:**    requires local tokenConfig.json file with restUri property to describe
 *              location for token auth rest server
 *
 * @example
 *
 */
angular.module('ep.token').factory('tokenFactory', [
   '$cookieStore',
   '$http',
   'tokenConfig',
    function($cookieStore, $http, tokenConfig) {
        /**
         * @ngdoc method
         * @name login
         * @methodOf ep.token.factory:tokenFactory
         * @public
         * @description
         * Login to the token auth server and save the token in the cookie store
         *
         * @param {object} user The object that represents the user
         * @returns {Promise} A promise that returns the token if resolved,
         *      or an appropriate login exception if rejected
         */
        function login(user) {
            // return the http promise so the caller can also handle the success/error
            return fetchToken(user).success(function(data) {
                // here is where we want to scrape off the 'Bearer' and put this onto our cookieStore
                parseToken(data);
                $cookieStore.put(tokenConfig.tokenId, user);
            }).error(function() {
                // error handling
                // $cookieStore.put(tokenConfig.tokenId, user);
            });
        }

        /**
         * @ngdoc method
         * @name logout
         * @methodOf ep.token.factory:tokenFactory
         * @public
         * @description
         * removes the current token from cookie store
         */
        function logout() {
            $cookieStore.remove(tokenConfig.tokenId);
        }
        /**
         * @ngdoc method
         * @name getToken
         * @methodOf ep.token.factory:tokenFactory
         * @public
         * @description
         * Gets the current token
         *
         * @returns {object} object that represents current token
         */
        function getToken() {
            return $cookieStore.get(tokenConfig.tokenId);
        }

        /**
         * @ngdoc method
         * @name hasToken
         * @methodOf ep.token.factory:tokenFactory
         * @public
         * @description
         * Checks if service has a current token
         *
         * @returns {boolean} value if there exists current token
         */
        function hasToken() {
            var user = getToken();
            return user !== undefined && !angular.equals({}, user);
        }

        // private function to return the $http promise
        // sets the header and fires the post request.
        function fetchToken(user) {
            $http.defaults.headers.post = user;
            return $http.post(tokenConfig.restUri, {});
        }

        // private function to consume the bearer from json
        function parseToken(data) {
            if (data && data.hasOwnProperty('bearer')) {
                $cookieStore.put(tokenConfig.tokenId, data);
            }
        }

        return {
            login: login,
            logout: logout,
            getToken: getToken,
            hasToken: hasToken
        };
    }]);

//# sourceMappingURL=app.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/ep.login/login.html',
    "<div class=thumbnail><div class=caption><h3 ng-hide=hasToken><span class=\"icon icon-enter\"></span> Login</h3><h3 ng-show=hasToken><span class=\"icon icon-exit\"></span> Logout</h3><hr></div><form role=form><div class=form-group><label for=user-name class=\"col-sm-2 control-label\">User:</label><div><input class=form-control id=user-name value={{::user.username}} ng-model=user.username placeholder=username required></div></div><div class=form-group><label for=user-password class=\"col-sm-2 control-label\">Password:</label><div><input type=password class=form-control id=user-password value={{::user.password}} ng-model=user.password placeholder=password required></div></div></form><hr><p></p><div class=\"alert alert-danger\" id=validationSummary role=alert ng-show=hasError>{{status}}</div><div><a class=\"btn btn-default\" ui-sref={{::cancelPath}}>Cancel</a> <button type=button class=\"btn btn-primary\" ng-hide=hasToken ng-click=login()>Login</button> <button type=button class=\"btn btn-primary\" ng-show=hasToken ng-click=logout()>Logout</button></div></div>"
  );

}]);
