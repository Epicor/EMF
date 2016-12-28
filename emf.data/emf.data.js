/*
 * emf (Epicor Mobile Framework) 
 * version:1.0.10-dev.363 built: 27-12-2016
*/

if (typeof __ep_build_info === "undefined") {var __ep_build_info = {};}
__ep_build_info["data"] = {"libName":"data","version":"1.0.10-dev.363","built":"2016-12-27"};

(function() {
    'use strict';

    angular.module('ep.token', [
        'ep.sysconfig',
        'ep.utils'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.data.model
 * @description
 * This module provides a mechanism for storing and retrieving data that can be accessed from anywhere on the scope.
 */
(function() {
    'use strict';
    angular.module('ep.data.model', ['ep.utils']);
})();

/**
 * @ngdoc overview
 * @name ep.odata
 * @description
 * Provides epicor odata query services
 * to use, DI the ep.odata module and reference the 'odataQueryFactory' factory
 */
(function() {
    'use strict';

    angular.module('ep.odata', []);
})();

/**
 * @ngdoc overview
 * @name ep.search
 * @description
 * Provides the search directive
 * depends on ep.token, ep.templates
 */
(function() {
    'use strict';

    angular.module('ep.search', [
    'ep.token',
    'ep.templates'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.table
 * @description
 * Module for the ep.table.
 */
(function() {
    'use strict';

    angular.module('ep.table', [
        'ep.templates'
    ]);
})();

'use strict';
/**
 * @ngdoc overview
 * @name ep.binding
 * @description
 * ep binding
 */
angular.module('ep.binding', [
    'ep.templates',
    'ep.sysconfig'
]);

'use strict';
(function() {
    angular.module('ep.token')
        .service('epErpRestService', ['$http', '$resource', 'epTokenService', function ($http, $resource, epTokenService) {
            var serverUrl = '';

            function call(method, path, query) {
                var tkn = epTokenService.getToken();
                if (!tkn) {
                    return;
                }
                var url = serverUrl + (path ? path : '');
                return $resource(url, query, {
                    get: {
                        method: 'GET', headers: {
                            'Authorization': 'Bearer ' + tkn.token.AccessToken,
                            'Content-Type': 'application/json'
                        }
                    }
                });
            }

            function patch(svc, data) {
                var tkn = epTokenService.getToken();
                if (!tkn || !serverUrl) {
                    return;
                }

                var d = data;
                if (data && !angular.isString(data)) {
                    d = JSON.stringify(data);
                    //data = data.replace(/,(?=[^,]*$)/, '');
                }
                return $http({
                    method: 'PATCH',
                    dataType: 'json',
                    data: d,
                    headers: {
                        'Authorization': 'Bearer ' + tkn.token.AccessToken,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    url: serverUrl + svc,
                }).success(function(response) {
                    console.log('updated ' + svc + ' ' + response);
                }).error(function(response) {
                    console.log(response);
                    return false;
                });
            }

            return {
                setUrl: function(url) {
                    serverUrl = url;
                },
                get: function(path, query) {
                    return call('GET', path, query).get();
                },
                post: function() {
                    //POST and other methods TO BE Implemented when needed
                },
                patch: patch
            }
        }])
})();
(function() {
'use strict';

/**
 * @ngdoc controller
 * @name ep.token.controller:epLoginViewCtrl
 * @description
 * Represents the epLoginViewCtrl controller for the epLoginViewDirective
 *
 * @example
 *
 */
    epLoginViewCtrl.$inject = ['$q', '$scope', 'epUtilsService', 'epModalDialogService', 'epTokenService'];
    angular.module('ep.token')
        .controller('epLoginViewCtrl', epLoginViewCtrl);

    /*@ngInject*/
    function epLoginViewCtrl($q, $scope, epUtilsService, epModalDialogService, epTokenService) {

        $scope.settings = {
            username: '',
            password: '',
            serverName: '',
            serverUrl: '',
            tokenUrl: '',
            token: {}
        };

        epUtilsService.copyProperties($scope.options, $scope.settings);

        $scope.loginUser = function() {
            if ($scope.options.fnOnLogin) {
                var result = $scope.options.fnOnLogin($scope.settings);
                if (result && result.hasError) {
                    $scope.hasError = true;
                    $scope.status = result.status;
                }
                return;
            }

            epModalDialogService.showProgress({ title: 'Logging in', message: '' });
            if ($scope.settings.username === '' || $scope.settings.password === '') {
                $scope.hasError = true;
                $scope.status = $scope.settings.username === '' ?
                    'Oops.. There\'s no user name there!' : 'Oops.. You forgot to type your password!';
                epModalDialogService.hide();
                return;
            } else if ($scope.settings.serverName === '') {
                $scope.hasError = true;
                $scope.status = 'Oops... Don\'t forget to type the Server.';
                epModalDialogService.hide();
                return;
            }

            var svc = epTokenService.resolveServerUrl($scope.settings.serverName);
            $scope.settings.serverUrl = svc.serverUrl;
            $scope.settings.tokenUrl = svc.tokenUrl;
            var tokenUser = {
                username: $scope.settings.username,
                password: $scope.settings.password,
                serverUrl: $scope.settings.serverUrl,
                serverName: svc.serverName
            };
            var tokenOptions = { restUri: $scope.settings.tokenUrl };
            //if demo user skip token access
            if ($scope.settings.username.toLowerCase() === 'demo' &&
                $scope.settings.password.toLowerCase() === 'demo' &&
                $scope.settings.serverName.toLowerCase() === 'demo') { //demo user
                    tokenOptions.debug = true;
                    tokenOptions.timeout = '10000';
            }
            epTokenService.login(tokenUser, tokenOptions).success(function(data) {
                $scope.accessToken = data.AccessToken;
                try {
                    $scope.settings.token = epTokenService.getToken();
                    if (!$scope.settings.token) {
                        return;
                    }
                    $scope.options.username = $scope.settings.username;
                    $scope.options.serverName = $scope.settings.serverName;
                    if ($scope.options.fnOnGetToken) {
                        $q.when($scope.options.fnOnGetToken($scope.settings)).then(function(message) {
                            if (message && angular.isString(message)) {
                                $scope.hasError = true;
                                $scope.status = message;
                                return;
                            }
                            if ($scope.options.fnOnSuccess) {
                                $scope.options.fnOnSuccess($scope.settings);
                            }
                        }, function(message) {
                            $scope.hasError = true;
                            $scope.status = message;
                            return;
                        });
                    } else if ($scope.options.fnOnSuccess) {
                        $scope.options.fnOnSuccess($scope.settings);
                    }
                } catch (err) {
                    alert(err.message);
                }
            }).error(function(data, status, headers, config) {
                var restServer = (config !== undefined && config !== null) ? config.url : '';
                $scope.hasError = true;
                $scope.status = (status == 401 ?
                    'Please review the user or password.' : 'We couldn\'t connect to the server. Please review it.');
            });
            epModalDialogService.hide();
        };

        $scope.passwordKeyPress = function(keyEvent) {
            $scope.hasError = false;
            $scope.status = '';
            var key = typeof event.which === 'undefined' ? event.keyCode : event.which;
            (key === 13) ? $scope.loginUser() : false;
        }

        $scope.clearWarning = function() {
            $scope.hasError = false;
            $scope.status = '';
        }

        $scope.showServer = function() {
            $scope.showServerName = !$scope.showServerName;
        }
    }
}());

(function() {
'use strict';
/**
* @ngdoc directive
* @name ep.token.directive:epLoginView
* @restrict E
*
* @description
* Represents the epLoginView directive
*
*   The following are attributes (parameters) for the directive:
*   # options {object} (required) - the object containing login options
*       username {string} - can provide the user name
*       password {string} - can provide the user password
*       serverName {string} - the server name to connect (e.g. myMachine.myDomain/myErpServer)
*       fnOnGetToken {function} - callback when we successfully received a token. This function can return
*               either promise/reject or plain string error message
*       fnOnSuccess {function} - callback when we successfully logged in - if fnOnGetToken() did not error
*       fnOnLogin {function} - callback to completely override login action
*       customImage {string} - optional url to custom image for the background image
*       showSettingsButton {bool} - optional setting to show/hide settings button (shown by default)
*
* @example
*/
angular.module('ep.token').
    directive('epLoginView', epLoginViewDirective);

    /*@ngInject*/
    function epLoginViewDirective() {
        return {
            restrict: 'E',
            templateUrl: 'src/components/ep.token/ep-login-view/ep-login-view.html',
            controller: 'epLoginViewCtrl',
            scope: {
                options: '='
            }
        };
    }
}());

/**
 * @ngdoc controller
 * @name ep.login.controller:epLoginCtrl
 * @description
 * Represents the login controller.
 * This controller negotiates the login/logout requests with the token factory.
 *
 * @example
 *
 */

(function() {
    'use strict';

    epLoginCtrl.$inject = ['$scope', 'epTokenService'];
    angular.module('ep.token')
        .controller('epLoginCtrl', epLoginCtrl);

    /*@ngInject*/
    function epLoginCtrl($scope, epTokenService) {
        var tkn = epTokenService.getToken();
        $scope.user = tkn ? tkn.user : {};
        $scope.status = '';
        $scope.$watch(function($scope) {
            $scope.hasToken = epTokenService.hasToken();
            return (epTokenService.hasToken());
        });

        /**
         * @ngdoc method
         * @name login
         * @methodOf ep.login.controller:epLoginCtrl
         * @private
         * @description
         * Handles the login request using the current user object from $scope
         * the epTokenService returns a promise, so the controller will
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
            epTokenService.login($scope.user)
              .success(function() {
                  //this callback will be called asynchronously
                  //when the response is available
                  $scope.hasToken = true;
                  if ($scope.onLoginSuccess) {
                      $scope.onLoginSuccess($scope.user);
                  }
              }).
              error(function(data, status, headers, config) {
                  //called asynchronously if an error occurs
                  //or server returns response with an error status.
                  var restServer = (config !== undefined && config !== null) ? config.url : '';
                  $scope.status = 'Login Failure at: ' + restServer;
                  $scope.hasError = true;
                  if ($scope.onLoginFail) {
                      $scope.onLoginFail($scope.status);
                  }
              });
        };

        /**
         * @ngdoc method
         * @name logout
         * @methodOf ep.login.controller:epLoginCtrl
         * @private
         * @description
         * Handles the logout request using the epTokenService
         */
        $scope.logout = function() {
            epTokenService.logout();
            $scope.user = {};
            $scope.hasToken = false;
        };

        /**
         * @ngdoc method
         * @name cancel
         * @methodOf ep.login.controller:epLoginCtrl
         * @private
         * @description
         * Handles the logout request using the epTokenService
         */
        $scope.cancel = function() {
            if ($scope.onLoginCancel) {
                $scope.onLoginCancel();
            }
        };
    }
})();

/**
* @ngdoc directive
* @name ep.tile.directive:epTile
* @restrict E
*
* @description
* Represents the login dialog directive
*
* @example
*/
(function() {
    'use strict';

    angular.module('ep.token').
    directive('epLogin', epLoginDirective);

    /*@ngInject*/
    function epLoginDirective() {
        return {
            restrict: 'E',
            controller: 'epLoginCtrl',
            templateUrl: 'src/components/ep.token/ep-login/login.html',
            scope: {
                showTitle: '=',      // (true/false) show title above the controls
                showLabels: '=',     // (true/false) hide labels in line with entry text control
                showCancel: '=',     // (true/false) hide cancel button
                onLoginFail: '&',    // this get fired upon login failure
                onLoginSuccess: '&', // this get fired upon login success
                onLoginCancel: '&'   // this get fired upon login cancel
            }
        };
    }
})();

/**
 * @ngdoc object
 * @name ep.token.object:epTokenConfig
 * @description
 * Provider for epTokenConfig.
 * Gets configuration options from sysconfig
 */
(function() {
    'use strict';

    angular.module('ep.token').provider('epTokenConfig',
    function() {
        var config = {
            /**
            * @ngdoc property
            * @name restUri
            * @propertyOf ep.token.object:epTokenConfig
            * @public
            * @description
            * Represents the URI for the REST service that provides the token auth login
            */
            restUri: 'https://localhost/ICE3/TokenResource.svc/',
            /**
            * @ngdoc property
            * @name tokenId
            * @propertyOf ep.token.object:epTokenConfig
            * @public
            * @description
            * Represents the Id for the cookie that will store username and token
            */
            tokenId: 'emf.token.auth',
            /**
            * @ngdoc property
            * @name timeout
            * @propertyOf ep.token.object:epTokenConfig
            * @public
            * @description
            * Set timeout of the token in seconds. This can override the actual token timeout if it is smaller
            */
            timeout: 0,
            /**
            * @ngdoc property
            * @name warnExpire
            * @propertyOf ep.token.object:epTokenConfig
            * @public
            * @description
            * Should we give a warning on token expiration with renewal option
            */
            warnExpire: true,
            /**
            * @ngdoc property
            * @name warnExpireDuration
            * @propertyOf ep.token.object:epTokenConfig
            * @public
            * @description
            * How many seconds prior to expiration should we warn the user
            */
            warnExpireDuration: 60,
            /**
            * @ngdoc property
            * @name storePassword
            * @propertyOf ep.token.object:epTokenConfig
            * @public
            * @description
            * Store the password for renewal
            */
            storePassword: true,
            /**
            * @ngdoc property
            * @name autoRenew
            * @propertyOf ep.token.object:epTokenConfig
            * @public
            * @description
            * Auto renew token if renewal warning turned off
            */
            autoRenew: false,
            /**
            * @ngdoc property
            * @name debug
            * @propertyOf ep.token.object:epTokenConfig
            * @public
            * @description
            * If debug is on, the token service is not invoked and dummy results returned
            */
            debug: false
        };

        this.$get = ['epSysConfig', function(epSysConfig) {
            epSysConfig.mergeSection('ep.token', config);
            return config;
        }];
    });
})();

(function() {
    'use strict';
    /**
     * @ngdoc service
     * @name ep.token.factory:epTokenService
     * @description
     * Provides token auth login/logout behaviors. The service is configurable. There is baked in
     * logic some of which can be overriden by options or callbacks. For example if the http.post
     * request needs to be different, one can provide a callback that will do its own request.
     * Most options are configurable either from local sysconfig.json or through the login() function
     *
     * TO DO: currently storing token in the local storage because android issues with $cookies.
     * we want to make it configurable or read a setting from sysconfig whether it is hybrid or not.
     *
     * @example
     *
     */
    epTokenService.$inject = ['$http', '$q', '$timeout', 'epTokenConfig', 'epUtilsService', 'epModalDialogService', 'epLocalStorageService'];
    angular.module('ep.token').
        service('epTokenService', epTokenService);

    /*@ngInject*/
    function epTokenService($http, $q, $timeout,
        epTokenConfig, epUtilsService, epModalDialogService, epLocalStorageService) {
        var state = {
            tokenTimeoutPromise: undefined,
            options: {}
        };

        /**
         * @ngdoc method
         * @name login
         * @methodOf ep.token.factory:epTokenService
         * @public
         * @description
         * Login to the token auth server and save the token in the cookie store
         *
         * @param {user} user The object that represents the user (must have username and password props)
         * @param {object} options - (these override sysconfig settings)
         * <pre>
         *      restUri {string} - Represents the URI for the REST service that provides the token auth login
         *      timeout {int} - token timeout (in seconds). Note you can only decrease token lifetime set by server
         *      warnExpire {bool} - (default true) - show dialog when token is about to expire
         *      warnExpireDuration {int} - (default 60) seconds prior to expiration to show warning dialog
         *      warnExpireDialogOptions {object} - override options for the warning dialog such as title, message
         *      storePassword {bool} - (default true) keep credentials for token renewal
         *      autoRenew {bool} - (default false) - auto renew token (if warnExpire = false)
         *      fnFetchToken {function} - custom fetch token function that should return promise with token object
         *      fnRenewToken {function} - custom renew token function
         * </pre>
         * @returns {Promise} A promise that returns the token if resolved,
         *      or an appropriate login exception if rejected
         */
        function login(user, options) {
            state.options = {};
            epUtilsService.copyProperties(epTokenConfig, state.options);
            epUtilsService.copyProperties(options, state.options);
            return doLogin(user, state.options.restUri);
        }

        /**
         * @ngdoc method
         * @name logout
         * @methodOf ep.token.factory:epTokenService
         * @public
         * @description
         * removes the current token from cookie store
         */
        function logout() {
            epLocalStorageService.update(epTokenConfig.tokenId, undefined);
            //$cookies.remove(epTokenConfig.tokenId);
            if (state.tokenTimeoutPromise) {
                $timeout.cancel(state.tokenTimeoutPromise);
            }
        }
        /**
         * @ngdoc method
         * @name showLoginDialog
         * @methodOf ep.token.factory:epTokenService
         * @public
         * @description
         * Show login dialog
         *
         * @param {user} user The object that represents the user (must have username and password props)
         * @param {object} options - same options as in login()
         * @param {object} dialogOptions - (optional) epModalDialogService.showCustomDialog() dialog options
         */
        function showLoginDialog(user, options, dialogOptions) {
            var dlg = {
                title: 'Login',
                closeButton: true,
                templateOptions: {
                    template: '<ep-login show-title="false" on-login-cancel="config.onLoginCancel()"></ep-login>'
                },
                onLoginCancel: function() {
                    epModalDialogService.hide();
                }
            };
            epUtilsService.copyProperties(dialogOptions, dlg);
            epModalDialogService.showCustomDialog(dlg);
        }
        /**
         * @ngdoc method
         * @name getToken
         * @methodOf ep.token.factory:epTokenService
         * @public
         * @description
         * Gets the current token
         *
         * @returns {object} object that represents current token
         */
        function getToken() {
            //return $cookies.getObject(epTokenConfig.tokenId);
            var tkn = epLocalStorageService.get(epTokenConfig.tokenId);
            if (tkn && tkn.expiresInSecs) {
                var secs = getExpiresIn(tkn);
                if (!secs) {
                    logout();
                    tkn = null;
                }
            }
            return tkn;
        }

        /**
         * @ngdoc method
         * @name getExpiresIn
         * @methodOf ep.token.factory:epTokenService
         * @public
         * @description
         * Returns in how many seconds token will expire
         * @param {object} token - token to be checked. If ommited then retrievd from storage
         * @returns {int} number of secs
         */
        function getExpiresIn(token) {
            var tkn = token || getToken();
            var ret = 0;
            if (tkn) {
                var dateNow = new Date();
                ret = tkn.expiresUTC - dateNow.getTime();
                if (ret <= 0) {
                    ret = 0;
                } else {
                    ret = Math.floor(ret / 1000);
                }
            }
            return ret;
        }

        /**
         * @ngdoc method
         * @name hasToken
         * @methodOf ep.token.factory:epTokenService
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

        /**
         * @ngdoc method
         * @name renewToken
         * @methodOf ep.token.factory:epTokenService
         * @public
         * @description
         * Renew token requests new token. storePassword option must be enabled.
         */
        function renewToken() {
            var tkn = getToken();
            if (state.options.fnRenewToken) {
                state.options.fnRenewToken(tkn);
            } else if (tkn && tkn.user) {
                doLogin(tkn.user, tkn.uri);
            }
        }

        /**
         * @ngdoc method
         * @name resolveServerUrl
         * @methodOf ep.token.factory:epTokenService
         * @public
         * @param {string} server - server name. can be with or without http prefix
         * @param {string} svc - optional token service. defaults to 'TokenResource.svc'
         *        if svc = '' then no service is appended; otherwise the value passed in
         * @description
         * Utility function to resolve server url.
         *
         * @returns {object} returns an object with following properties:
         *      prefix - the 'http", 'https' prefix
         *      serverName - server name without ending '/' and without prefix
         *      serverUrl - server url like 'https://ServerName'
         *      tokenUrl - token url like 'https://ServerName/svc'
         */
        function resolveServerUrl(server, svc) {
            var serverName = epUtilsService.ensureEndsWith(server, '/');
            serverName = serverName.substring(0, serverName.length - 1);

            var svr = serverName.toLowerCase().trim();
            var prefix = 'https://';
            if (svr.indexOf('https://') === 0) {
                prefix = 'https://';
                serverName = serverName.substring(prefix.length);
            } else if (svr.indexOf('http://') === 0) {
                prefix = 'http://';
                serverName = serverName.substring(prefix.length);
            }
            var svcAppend = '';
            if (svc !== '') {
                svcAppend = (!svc) ? '/TokenResource.svc' : '/' + svc;
            }
            return {
                prefix: prefix,
                serverName: serverName,
                serverUrl: prefix + serverName,
                tokenUrl: prefix + serverName + svcAppend
            };
        }

        // private function to return the $http promise
        // sets the header and fires the post request.
        function fetchToken(user, uri) {
            var options = {
                headers: {
                    'username': user.username,
                    'password': user.password,
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            var url = epUtilsService.ensureEndsWith(uri, '/'); //need for Chrome
            return $http.post(url, null, options);
        }

        // allow manager/Epicor123 to login without the real token for now
        // TODO:  need to remove this debug logic when ICE returns real token
        function backdoorLogin(user, uri) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            };
            var token = {
                TokenType: 'Bearer',
                AccessToken: 'mySampleTokenDataValue'
            };
            writeCookie(token, user, uri);
            deferred.resolve(token);
            return promise;
        }

        // private function to save cookie
        function writeCookie(data, user, uri) {
            var tkn = (data && data.AccessToken && data.TokenType === 'Bearer') ? data : undefined;
            var expiresInSecs = (tkn && data.ExpiresIn) ? data.ExpiresIn : state.options.timeout;
            if (state.options.timeout && state.options.timeout < expiresInSecs) {
                expiresInSecs = state.options.timeout;
            }
            var dateNow = new Date();
            var dateExp = new Date(dateNow);
            dateExp.setTime(dateExp.getTime() + expiresInSecs * 1000);
            //var options = expiresInSecs ? { expires: dateExp } : {};
            //$cookies.putObject(epTokenConfig.tokenId, {
            //    uri: uri,
            //    user: user,
            //    token: tkn,
            //    createdUTC: dateNow.getTime(),
            //    expiresUTC: dateExp.getTime(),
            //    expiresInSecs: expiresInSecs
            //}, options);
            epLocalStorageService.update(epTokenConfig.tokenId, {
                uri: uri,
                user: user,
                token: tkn,
                createdUTC: dateNow.getTime(),
                expiresUTC: dateExp.getTime(),
                expiresInSecs: expiresInSecs
            });

            doSetTimeout(expiresInSecs);
        }

        // private function upon service initialization
        function init() {
            if (state.tokenTimeoutPromise) {
                $timeout.cancel(state.tokenTimeoutPromise);
            }
            var exp = getExpiresIn();
            if (exp) {
                doSetTimeout(exp);
            } else {
                //remove token if it has expired
                logout();
            }
        }

        // private function to login
        function doLogin(user, restUri) {
            logout();
            var uri = restUri || state.options.restUri;
            if (state.options.debug) {
                return backdoorLogin(user, uri);
            }
            var fnFetch = state.options.fnUserFetchToken || fetchToken;
            // return the http promise so the caller can also handle the success/error
            return fnFetch(user, uri).success(function(data) {
                // here is where we want to scrape off the 'Bearer' and put this onto our cookieStore
                writeCookie(data, user, uri);
            }).error(function() {
                // error handling
            });
        }

        // private function to renew token
        function doRenewToken(tkn) {
            if (state.options.fnRenewToken) {
                state.options.fnRenewToken(tkn);
            } else if (tkn && tkn.user) {
                doLogin(tkn.user, tkn.uri);
            }
        }

        /**
         * @ngdoc method
         * @name doSetTimeout
         * @methodOf ep.token.factory:epTokenService
         * @private
         * @description
         * Set timeout when to bring up expiration warning or auto renewal
         */
        function doSetTimeout(expiresInSecs) {
            if (state.tokenTimeoutPromise) {
                $timeout.cancel(state.tokenTimeoutPromise);
            }

            if (!state.options.warnExpire && !state.options.autoRenew) {
                return;
            }

            var dialogExpires = (expiresInSecs > state.options.warnExpireDuration) ?
                (expiresInSecs - state.options.warnExpireDuration) : expiresInSecs;
            dialogExpires -= 5; //some cushion to make the renewal call
            state.tokenTimeoutPromise = $timeout(function() {
                var tkn = getToken();
                if (tkn) {
                    var expiresIn = getExpiresIn();
                    if (state.options.warnExpire) {
                        var dlg = {
                            title: 'Expiration Notice',
                            message: 'Your session is about to expire in {timer} seconds...',
                            autoClose: expiresIn,
                            icon: 'fa fa-warning fa-4x',
                            buttons: [
                                {
                                    text: 'Continue',
                                    action: function() {
                                        doRenewToken(tkn);
                                    }
                                },
                                {
                                    text: 'Log Out',
                                    action: function() {
                                        logout();
                                    }
                                }
                            ],
                            fnDefaultAction: function() {
                                logout();
                            }
                        };
                        epUtilsService.copyProperties(state.options.warnExpireDialogOptions, dlg);
                        epModalDialogService.showMessage(dlg);
                    } else if (state.options.autoRenew) {
                        doRenewToken(tkn);
                    }
                }
            }, dialogExpires * 1000);
        }

        init();

        return {
            login: login,
            logout: logout,
            getToken: getToken,
            hasToken: hasToken,
            getExpiresIn: getExpiresIn,
            renewToken: renewToken,
            showLoginDialog: showLoginDialog,
            resolveServerUrl: resolveServerUrl
        };
    }
}());

/**
 * @ngdoc overview
 * @name ep.data.model:epDataModelService
 * @description
 * # A simple service to manage the transactional data store.
 *
 * Main module of the application.
 */

(function() {
    'use strict';

    angular.module('ep.data.model')
        //Application Initialization
        .factory('epDataModelService', [
            'epUtilsService',
            function(epUtilsService) {

                var transactions = {};
                var models = {};

                /**
                 * @ngdoc method
                 * @name beginTransaction
                 * @methodOf ep.data.model:epDataModelService
                 * @description
                 * This will begin a transaction on a specific model based on the model ID passed in.
                 */
                function beginTransaction(id) {
                    transactions[id] = epUtilsService.merge({}, models[id]);
                }

                /**
                 * @ngdoc method
                 * @name commitTransaction
                 * @methodOf ep.data.model:epDataModelService
                 * @description
                 * This will commit a transaction on a specific model based on the model ID passed in.
                 */
                function commitTransaction(id) {
                    delete transactions[id];
                }

                /**
                 * @ngdoc method
                 * @name rollbackTransaction
                 * @methodOf ep.data.model:epDataModelService
                 * @description
                 * This will rollback a transaction on a specific model based on the model ID passed in.
                 */
                function rollbackTransaction(id) {
                    // We need to merge the original data back into the active model.
                    // We can't simply assign the model to the data in the transaction because
                    // there might be references to internal portions of the model in use elsewhere
                    // and changes to those references wouldn't get rolled back.
                    epUtilsService.merge(models[id], transactions[id]);
                    delete transactions[id];
                }

                /**
                 * @ngdoc method
                 * @name getModel
                 * @methodOf ep.data.model:epDataModelService
                 * @description
                 * This will return the data model based on the model ID passed in.
                 */
                function getModel(id) {
                    models[id] = models[id] || {};
                    return models[id];
                }

                /**
                 * @ngdoc method
                 * @name clearModel
                 * @methodOf ep.data.model:epDataModelService
                 * @description
                 * This will remove any data in the model.
                 */
                function clearModel(id) {
                    Object.keys(models[id]).forEach(function(key) {
                        delete models[id][key];
                    });
                    return models[id];
                }

                return {
                    beginTransaction: beginTransaction,
                    commitTransaction: commitTransaction,
                    rollbackTransaction: rollbackTransaction,
                    getModel: getModel,
                    clearModel: clearModel
                };
            }
        ]);
})();

/**
 * @ngdoc service
 * @name ep.odata.factory:odataQueryFactory
 * @description
 * Provides odata query phrase composition behaviors.   This should be used as a helper
 * object to compose the paramOptions object to be consumed on the
 * [Angular $resource](https://docs.angularjs.org/api/ngResource/service/$resource) service
 *
 *
 * @example
 * Below is some sample usage:
 *
 *  > this example invokes the GET request against someResource; the Angular $resource service
 *  > accepts paramDefaults object constructed using the odataQueryFactory;
 *  > this Request
 *
 *     return someResource.query(odataQueryFactory.setType('Kpis')
 *              .setTop(15).
 *              .setOrderBy('name')
 *              .setFilter({
 *                  DataSource: params.server,
 *                  Catalog: params.catalog,
 *                  Cube: params.cube
 *               })
 *               .compose(), success);
 *
 * >  results the following properties.
 *
 *         {
 *             type: 'Kpis'
 *             $top: 15,
 *             $orderby: 'name',
 *             $filter: 'DataSource eq 'x' and Catalog eq 'x' and Cube eq 'x',
 *         }
 *

 */
(function() {
    'use strict';

    angular.module('ep.odata').factory('odataQueryFactory',
    function() {
        var odataObject = {};

        ///**
        //* @ngdoc method
        //* @name getCommaSeparatedPropValue
        //* @methodOf ep.odata.factory:odataQueryFactory
        //* @description
        //* @private
        //* Gets the comma separated property value
        //*
        //* @param {object} params The object that represents the Parameters to parse at runtime
        //* @param {boolean} isOrderBy The object that represents the user
        //* @returns {string} the comma separated property value
        //*/
        function getCommaSeparatedPropValue(params, isOrderBy) {
            var propValue = '';
            // handle when params is single string value
            if (typeof params === 'string') {
                propValue = params;
                params = null;
            }
            // handle when params is string[] array
            if (params && params.constructor.toString().indexOf('Array') > 1) {
                var idx;
                for (idx = 0; idx < params.length; idx++) {
                    propValue += (propValue === '' ? '' : ',') + params[idx];
                }
                params = null;
            }
            // handle when params is object with name/value properties
            if (params) {
                for (var i in params) {
                    if (params.hasOwnProperty(i)) {
                        propValue += (propValue === '' ? '' : ',') + i;
                        if (isOrderBy && params[i]) {
                            propValue += ' desc';
                        }
                    }
                }
            }
            return propValue;
        }

        /**
        * @ngdoc method
        * @name setType
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the REST service type
        *
        * @param {string} serviceName The REST service type
        * @returns {this} to allow for method chaining
        */
        function setType(serviceName) {
            if (typeof serviceName === 'string') {
                odataObject.type = serviceName;
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }
        /**
        * @ngdoc method
        * @name setTop
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the $top oData property
        *
        * @param {int} value The value to set as $top oData property
        * @returns {this} to allow for method chaining
        */
        function setTop(value) {
            if (!isNaN(value) && parseInt(Number(value)) === value) {
                odataObject.$top = value;
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }
        /**
        * @ngdoc method
        * @name setSkip
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the $skip oData property
        *
        * @param {int} value The value to set as $skip oData property
        * @returns {this} to allow for method chaining
        */
        function setSkip(value) {
            if (!isNaN(value) && parseInt(Number(value)) === value) {
                odataObject.$skip = value;
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }
        /**
        * @ngdoc method
        * @name setOrderBy
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the $orderby oData property
        *
        * @param {object} params The column names to set as $orderby property.
        * params can be string, [string], or { string: value, string: value}
        * @returns {this} to allow for method chaining
        */
        function setOrderBy(params) {
            var orderby = getCommaSeparatedPropValue(params, true);
            if (orderby !== '') {
                odataObject.$orderby = orderby;
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }
        /**
        * @ngdoc method
        * @name setSelect
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the $select oData property
        *
        * @param {object} params The column names to set as $select property.
        * params can be string, [string], or { string: value, string: value}
        * @returns {this} to allow for method chaining
        */
        function setSelect(params) {
            var select = getCommaSeparatedPropValue(params);
            if (select !== '') {
                odataObject.$select = select;
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }
        /**
        * @ngdoc method
        * @name setExpands
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the $expand oData property
        *
        * @param {object} params The column names to set as $expand property.
        * params can be string, [string], or { string: value, string: value}
        * @returns {this} to allow for method chaining
        */
        function setExpands(params) {
            var expand = getCommaSeparatedPropValue(params);
            if (expand !== '') {
                odataObject.$expand = expand;
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }

        /**
        * @ngdoc method
        * @name setFilter
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the $filter oData property
        *
        * @param {object} params The object that represents the collection of  column names / values.
        * This provides only the most basic filter options, (comparison operater = eq; logical operator = and)
        * @returns {this} to allow for method chaining
        */
        function setFilter(params) {
            if (params) {
                for (var i in params) {
                    if (params.hasOwnProperty(i) && params[i]) {
                        odataObject.$filter = ((odataObject && odataObject.$filter) ?
                            (odataObject.$filter + ' and ') : '') +
                            i + ' eq \'' + params[i] + '\'';
                    }
                }
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }

        /**
        * @ngdoc method
        * @name setWhere
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the where clause value onto $filter oData property
        *
        * @param {object} arg0 The object that represents the first argument in the where clause
        * @param {string} compareOp The comparison operator.  >, gt, >=, ge, <, lt, <=, le,
        *       =, ==, eq, !=, <>, ne, endswith, startswith, contains,
        *       day, month, year, second, minute, hour,
        *       math (see math params)
        * @param {object} arg1 The object that repesents the second argument in the where clause
        * @param {object} params (optional) { or : true } to include 'or' logical operator.
        * { not: true} to include negative logical operator.
        * {   mathOperand: number, (mathOperand and the second argument need to both be numbers)
        *     mathFunction: string, (+, -, *, /, %, etc)
        *     mathCompareOp: string (>, gt, >=, ge, <, lt, <=, le, =, ==, eq, !=, <>, ne)
        * };
        * @returns {this} to allow for method chaining
        */
        function setWhere(arg0, compareOp, arg1, params) {
            var validCompOps = {
                '>': 'gt', '>=': 'ge',
                '<': 'lt', '<=': 'le',
                '=': 'eq', '==': 'eq',
                '!=': 'ne', '<>': 'ne',
            };
            // reset the comparison operator
            compareOp = (validCompOps[compareOp]) || compareOp;
            // init the logical operators (and, or, not)
            var notOp = '';
            var logicalOp = (params && 'or' in params && params.or) ? ' or ' : ' and ';
            // init the tickmark seperator t
            var tickMark = (angular.isString(arg1) || isNaN(arg1)) ? '\'' : '';
            if (arg0 !== null && arg0 !== undefined && arg1 !== null && arg1 !== undefined) {
                switch (compareOp) {
                    case 'math':
                        if (!params || !('mathOperand' in params) ||
                            !('mathFunction' in params) ||
                            !('mathCompareOp' in params)) {
                            throw 'Malformed math operation; params object must contain mathOperand, ' +
                                'mathFunction, and mathCompareOp properties';
                        }
                        if (isNaN(arg1) || isNaN(params.mathOperand)) {
                            throw 'The second argument and mathOperand for math functions needs to be a number';
                        }
                        compareOp = (validCompOps[params.mathCompareOp] || params.mathCompareOp);
                        arg0 = arg0 + ' ' + params.mathFunction + ' ' + params.mathOperand;
                        break;
                    case 'endswith':            // handle the startswith/endswith functions
                    case 'startswith':
                        arg0 = compareOp + '(' + arg0 + ',\'' + arg1 + '\')';
                        compareOp = 'eq';
                        arg1 = 'true';
                        tickMark = '';
                        notOp = (params && 'not' in params && params.not) ? 'not ' : '';
                        break;
                    case 'contains':            // handle the contains function
                        arg0 = 'indexof(' + arg0 + ',\'' + arg1 + '\')';
                        compareOp = (params && 'not' in params && params.not) ? 'lt ' : 'gt';
                        arg1 = '0';
                        tickMark = '';
                        break;
                    case 'day':                 // handle date / time functions
                    case 'month':
                    case 'year':
                    case 'second':
                    case 'minute':
                    case 'hour':
                        if (isNaN(arg1) && parseInt(Number(arg1)) !== arg1) {
                            throw 'The second argument for date/time functions needs to be an integer';
                        }
                        arg0 = compareOp + '(' + arg0 + ')';
                        compareOp = 'eq';
                        break;
                }
                // now lets append all this good stuff onto the current $filter property
                odataObject.$filter = ((odataObject && odataObject.$filter) ? (odataObject.$filter + logicalOp) : '') +
                    notOp + arg0 + ' ' + compareOp + ' ' + tickMark + arg1 + tickMark;
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }

        /**
        * @ngdoc method
        * @name setWhereCustom
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the custom where clause value onto $filter oData property
        *
        * @param {object} expression - The object that represents the where clause
        * @param {bool} isOr (optional) to include 'or' logical operator, otherwise 'and' is applied.
        * @returns {this} to allow for method chaining
        */
        function setWhereCustom(expression, isOr) {
            var logicalOp = (isOr) ? ' or ' : ' and ';
            odataObject.$filter = ((odataObject && odataObject.$filter) ? (odataObject.$filter + logicalOp) : '') +
                expression;
            /*jshint validthis: true */
            return this;
        }

        // returns the fully resolved oData object
        /**
        * @ngdoc method
        * @name compose
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Returns the fully resolved oData object
        *
        * @returns {odataObject} to be used on $resource requests
        */
        function compose() {
            var returnObj = $.extend({}, odataObject);  // create a shallow copy of our odata object
            odataObject = {};                           // reset our local copy
            return returnObj;                           // send back the shallow copy
        }

        return {
            setType: setType,
            setTop: setTop,
            setSkip: setSkip,
            setOrderBy: setOrderBy,
            setSelect: setSelect,
            setExpands: setExpands,
            setFilter: setFilter,
            setWhere: setWhere,
            setWhereCustom: setWhereCustom,
            compose: compose
        };
    });
})();

/**
 * @ngdoc object
 * @name ep.search.object:searchConfig
 * @description
 * Provider for searchConfig.
 * Gets configuration options from searchConfig.json or default
 */
(function() {
    'use strict';

    angular.module('ep.search').provider('searchConfig',
    function() {
        var config = {
            /**
            * @ngdoc property
            * @name searchUri
            * @propertyOf ep.search.object:searchConfig
            * @public
            * @description
            * Represents the URI for the Enterprise Search WCF service
            */
            searchUri: 'https://localhost/EES/EpicorERP/search.xml'
        };

        //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
        //In our case, the "service" is the environment configuration object
        //The $get is called automatically when AngularJS encounters a DI.
        //
        //we use the epSysConfig provider to perform the $http read against sysconfig.json
        this.$get = ['epSysConfig', function(epSysConfig) {
            epSysConfig.mergeSection('ep.search', config);
            return config;
        }];
    });
})();


/**
 * @ngdoc controller
 * @name ep.search.controller:epSearchCtrl
 * @description
 * Represents the search controller.
 * This controller negotiates the search requests with the Enterprise Search
 * server
 *
 * @example
 *
 */
(function() {
    'use strict';

    angular.module('ep.search').controller('epSearchCtrl', [
    '$scope',
    'searchService', searchController]);

    function searchController($scope, searchService) {
        $scope.enterpriseSearch = {};
        $scope.enterpriseSearch.searching = false;
        $scope.enterpriseSearch.searchResults = null;
        $scope.enterpriseSearch.status = '';

        /**
        * @ngdoc method
        * @name changeSearch
        * @methodOf ep.search.controller:epSearchCtrl
        * @public
        * @description
        * Handles the search request using the current user object from $scope
        * the epTokenService returns a promise, so the controller will
        * need to handle success or error
        */
        $scope.enterpriseSearch.changeSearch = function() {
            var searchText = $scope.enterpriseSearch.searchText;
            if (searchText === '') {
                $scope.enterpriseSearch.searchResults = null;
                $scope.enterpriseSearch.status = '';
            }
        };

        /**
        * @ngdoc method
        * @name runSearch
        * @methodOf ep.search.controller:epSearchCtrl
        * @public
        * @description
        * Handles the search request using the current user object from $scope
        * the epTokenService returns a promise, so the controller will
        * need to handle success or error
        */
        $scope.enterpriseSearch.runSearch = function(searchText) {

            if (searchText === '') {
                return;
            }

            $scope.enterpriseSearch.searching = true;
            $scope.enterpriseSearch.searchResults = [];
            $scope.enterpriseSearch.status = '';
            $scope.enterpriseSearch.hasError = false;

            searchService
                    .search(searchText, 0, 100)
                    .then(
                        function(response) {
                            $scope.enterpriseSearch.searching = false;
                            $scope.enterpriseSearch.searchResults = response;
                        },
                        function(response) {
                            $scope.enterpriseSearch.status = 'An error occurred: ' + response.status;
                            $scope.enterpriseSearch.searching = false;
                            $scope.enterpriseSearch.hasError = true;
                        });
        };
    }
})();

/**
 * @ngdoc directive
 * @name ep.search.directive:epSearch
 * @restrict E
 *
 * @description
 * Represents the search dialog directive
 *
 * @example
 */
(function() {
    'use strict';

    angular.module('ep.search').directive('epSearch',
    function() {
        return {
            restrict: 'E',
            replace: true,
            controller: 'epSearchCtrl',
            templateUrl: 'src/components/ep.search/search.html'
        };
    });
})();

/**
 * @ngdoc service
 * @name ep.search.factory:searchService
 * @description
 * Provides access to Enterprise Search
 *
 * **note:**    requires local searchConfig.json file with searchUri property to describe
 *              location for the Enterprise Search server
 *
 * @example
 *
 */
(function() {
    'use strict';

    angular.module('ep.search').factory('searchService', [
   '$http',
   'searchConfig',
    function($http, searchConfig) {
        /**
         * @ngdoc method
         * @name search
         * @methodOf ep.search.factory:searchService
         * @public
         * @description
         * Run a search against Enterprise Search
         *
         * @param {string} searchText The text being searched for
         * @param {int} start The starting page number
         * @param {int} pageSize The number of items returned per page
         * @returns {Promise} A promise that returns the search results if
         *    resolved, or an appropriate search exception if rejected
         */
        function search(searchText, start, pageSize) {
            /**
            * search() responds with promise instance
            * Intercept the initial response to parse the data items
            */
            // return the http promise so the caller can also handle the success/error
            return runSearch(searchText, start, pageSize)
              .then(
                function(data) {
                    return transformESResultsToJSON(data);
                }, function() {
                    // error handling
                });
        }

        // private function to return the $http promise
        // fires the get request.
        function runSearch(searchText, start, pageSize) {
            var url = searchConfig.searchUri +
              '?locale=' + ((navigator.language) ? navigator.language : navigator.userLanguage) +
                      '&preservenulls=' + false +
                      '&likeLinkFormat=EWAUrl' +
                      '&callback=JSON_CALLBACK';

            var cacheControl = new Date().valueOf();
            var params = '&q=' + searchText +
                '&start=' + start +
                '&cache=' + cacheControl.toString() +
                '&pageSize=' + pageSize;

            return $http.get(url + params);
        }

        // private function to consume the search xml results and return json
        function transformESResultsToJSON(response) {
            var jsonData = {};

            if (response && response.hasOwnProperty('data')) {
                var data = response.data;
                var xmlDoc = $.parseXML(data);
                var $xml = $(xmlDoc);

                $xml.find('[primaryTable]').each(function() {
                    var results = [];

                    $(this).find('[companyName]').each(function() {
                        var result = {
                            location: this.getAttribute('location') || '',
                            label: this.getAttribute('label') || '',
                            companyContext: this.getAttribute('companyName'),
                            keyTag: this.getAttribute('keyTag'),
                            fields: []
                        };

                        $('*', this).each(function(j, node) {
                            var field = {};
                            for (var i = 0, len = node.attributes.length; i < len; i++) {
                                field[node.attributes[i].nodeName] = node.attributes[i].nodeValue;
                            }
                            field.FieldName = node.nodeName;
                            field.FieldValue = node.textContent;

                            result.fields.push(field);
                        });

                        results.push(result);
                    });

                    jsonData[this.nodeName] = {
                        label: this.getAttribute('label'),
                        primaryTable: this.getAttribute('primaryTable'),
                        results: results
                    };
                });
            }

            return jsonData;
        }

        return {
            search: search
        };
    }]);
})();

/**
 * @ngdoc controller
 * @name ep.table.controller:epTableCtrl
 * @description
 * Represents the table controller.
 *
 * @example
 *
 */
(function() {
    'use strict';

    angular.module('ep.table').controller('epTableCtrl', [
    '$scope',
    function($scope) {

        $scope.isLoading = true;
        $scope.headers = $scope.columnHeaders ? $scope.columnHeaders.split(',')
            .map(function(c) { return c.trim(); }) : [];
        $scope.colCount = $scope.headers.length;
        $scope.props = $scope.columnHeaders ? $scope.columnProperties.split(',')
            .map(function(c) { return c.trim(); }) : [];

        $scope.isLoading = false;
        $scope.selectRow = function(row, $event) {
            if ($scope.trackSelectedRow) {
                $scope.data.selectedRow = row;
                $scope.data.forEach(function(dr) { dr.$isSelected = false; });
                row.$isSelected = true;
                if ($scope.onSelectRow) {
                    $scope.onSelectRow({ 'row': row, '$event': $event });
                }
            }
        };
        if ($scope.trackSelectedRow && $scope.data && $scope.data.length) {
            $scope.selectRow($scope.data[0]);
        }
        $scope.$watch('data', function() {
            if ($scope.trackSelectedRow && $scope.data && $scope.data.length && !$scope.data.selectedRow) {
                $scope.selectRow($scope.data[0]);
            }
        });
        $scope.onDblClick = function(row, $event) {
            if ($scope.data && $scope.data.length && $scope.onDoubleClickRow) {
                $scope.onDoubleClickRow({ 'row': row, '$event': $event });
            }
        };
    }
    ]);
})();

/**
     * @ngdoc directive
     * @name ep.table.directive:epTable
     * @restrict E
     *
     * @description
     * This component displays a table of data.
     *
     * @example
     */
(function() {
    'use strict';

    angular.module('ep.table').directive('epTable',
    function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '=',
                columnHeaders: '@',
                columnProperties: '@',
                trackSelectedRow: '=',
                striped: '=',
                onSelectRow: '&',
                onDoubleClickRow: '&',
            },
            controller: 'epTableCtrl',
            templateUrl: 'src/components/ep.table/table.html'
        };
    });
})();

(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.customization.directive:epCustomization
    * @restrict E
    *
    * @description
    * Represents the ep.customization directive
    *
    * @example
    */
    epBindingEditorDirective.$inject = ['$location', 'epBindingFactory', 'epUtilsService'];
    angular.module('ep.binding').directive('epBindingEditor', epBindingEditorDirective);

    /*@ngInject*/
    function epBindingEditorDirective($location, epBindingFactory, epUtilsService) {
        return {
            restrict: 'E',
            templateUrl: 'src/components/ep.binding/controls/ep-binding-editor.html',
            scope: {
                epBinding: '=',
                column: '='
            },
            link: function(scope, element, attrs) {
                var bindingFactory;

                //This will be set by eBindingFactory
                scope.epBindingInfo = {
                    value: undefined, kind: 'ep-editor-control'
                };

                scope.state = {
                    column: {
                        editor: 'auto',
                        updatable: true
                    },
                    epBinding: {}
                };

                scope.$watch('epBinding', function(newValue, oldValue) {
                    if (newValue !== undefined) {
                        if (bindingFactory) {
                            bindingFactory.changeBinding(newValue);
                        } else {
                            bindingFactory = new epBindingFactory(scope, newValue, scope.epBindingInfo);
                        }
                        if (scope.state.column.caption === undefined ||
                            scope.state.epBinding.column !== scope.epBindingInfo.epBinding.column ||
                            scope.state.epBinding.view !== scope.epBindingInfo.epBinding.view) {
                            scope.state.column.caption = scope.epBindingInfo.epBinding.column;
                        }
                        scope.state.epBinding.view = scope.epBindingInfo.epBinding.view;
                        scope.state.epBinding.column = scope.epBindingInfo.epBinding.column;
                    }
                });

                scope.$watch('column', function(newValue, oldValue) {
                    if (newValue !== undefined) {
                        //TO DO!!!!
                        var col = {};
                        epUtilsService.copyProperties(scope.state.column, col);
                        epUtilsService.copyProperties(scope.column, col);
                        scope.state.column = col;
                    }
                });
            }
        }
    }
}());

(function() {
'use strict';
/**
* @ngdoc directive
* @name ep.binding.directive:epBinding
* @restrict E
*
* @description
* Represents the ep.binding directive
*
* @example
*/
    epBindingPaginationDirective.$inject = ['$rootScope', 'epBindingService', 'epTransactionFactory'];
angular.module('ep.binding').
    directive('epBindingPagination', epBindingPaginationDirective);

    /*@ngInject*/
    function epBindingPaginationDirective($rootScope, epBindingService, epTransactionFactory) {
        return {
            restrict: 'E',
            templateUrl: 'src/components/ep.binding/controls/ep-binding-pagination.html',
            scope: {
                epBinding: '='
            },
            link: function(scope, element, attrs) {
                scope.state = {};
                scope.view = null;
                scope.totalItems = 0;
                scope.currentPage = 0;

                function onViewInit(view) {
                    if (view && view.hasData()) {
                        scope.view = view;
                        scope.record = view.dataRow();
                        scope.totalItems = view.data().length;
                        scope.currentPage = view.row() + 1;
                        scope.maxSize = 10;
                    } else {
                        scope.view = null;
                        scope.totalItems = 0;
                        scope.currentPage = 0;
                    }
                }

                $rootScope.$on('EP_BINDING_VIEW_ADDED', function(event, data) {
                    if (scope.state.epBinding && data.viewId === scope.state.epBinding.view) {
                        onViewInit(epTransactionFactory.current().view(scope.state.epBinding.view));
                    }
                });

                $rootScope.$on('EP_BINDING_VIEW_ROW_CHANGED', function(event, data) {
                    if (scope.state.epBinding && data.viewId === scope.state.epBinding.view) {
                        scope.currentPage = data.view.row() + 1;
                    }
                });

                scope.$watch('epBinding', function(newValue, oldValue) {
                    if (newValue !== undefined) {
                        scope.state.epBinding = epBindingService.parseBinding(newValue);
                        var view = epTransactionFactory.current().view(scope.state.epBinding.view);
                        if (view) {
                            onViewInit(view);
                        }
                    }
                });

                scope.onPageChange = function() {
                    if (scope.view) {
                        scope.view.row(scope.currentPage - 1);
                    }
                }
            }
        };
    }
}());


(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.customization.directive:epCustomization
    * @restrict E
    *
    * @description
    * Represents the ep.customization directive
    *
    * @example
    */
    epBindingRecordEditorDirective.$inject = ['$log', '$location', 'epBindingFactory', 'epCustomizationService', 'epUtilsService'];
    angular.module('ep.binding').directive('epBindingRecordEditor', epBindingRecordEditorDirective);

    /*@ngInject*/
    function epBindingRecordEditorDirective($log, $location,
        epBindingFactory, epCustomizationService, epUtilsService) {
        return {
            restrict: 'E',
            templateUrl: 'src/components/ep.binding/controls/ep-binding-record-editor.html',
            scope: {
                epBinding: '=',
                options: '=',
                isreadonly: '=',
                onInit: '='
            },
            link: function(scope, element, attrs) {
                if (!attrs.id) {
                    $log.warn('ep-binding-record-editor must have an id for customization');
                    return;
                }

                scope.state = {
                    id: attrs.id
                };

                //epCustomizationInfo must be declared on scope for customization engine
                scope.epCustomizationInfo = {
                    kind: 'ep-record-editor',
                    id: scope.state.id,
                    scope: scope,
                    url: $location.url(),
                    data: undefined,
                    index: undefined,
                    ctrl: {
                        epBinding: scope.epBinding,
                        factory: undefined
                    },
                    api: {
                        onCustomizeActivate: function(on) {
                            scope.isCustomizeActive = (on === true);
                            scope.activeClass = scope.isCustomizeActive ? 'ep-customize-active' : '';
                            scope.epCustomizationInfo.ctrl.factory.enableEditorsDrag(on, on);
                        }
                    }
                };

                scope.onInitThis = function(factory) {
                    scope.state.factory = factory;
                    scope.epCustomizationInfo.ctrl.factory = factory;
                    if (scope.onInit) {
                        scope.onInit(factory);
                    }
                }

                scope.$watch('options', function(newValue, oldValue) {
                    if (newValue !== undefined && !angular.equals(newValue, oldValue)) {
                        if (scope.options.columns && scope.options.columns.length) {
                            var customProps = epCustomizationService.getCustomization(scope.state.id);

                            if (customProps) {
                                angular.forEach(customProps, function(v, n) {
                                    var col = _.find(scope.options.columns, function(c) {
                                        return c.columnIndex === n;
                                    });
                                    if (!col) {
                                        scope.options.columns.push(v);
                                    } else {
                                        var valid = v.validation;
                                        //v.validation = undefined;
                                        epUtilsService.copyProperties(v, col);
                                        if (valid) {
                                            var xxx;
                                            try {
                                                var fff;
                                                eval('fff = function(ctx, ev, value) { ' + valid + '}');
                                                col.fnOnFldValidate = fff;
                                            } catch (err) {

                                            }
                                        }
                                    }
                                });
                                if (scope.state.factory) {
                                    scope.state.factory.draw();
                                }
                            }
                        }
                    }
                }, true);
            }
        }
    }
}());


(function() {
'use strict';

/**
 * @ngdoc controller
 * @name ep.customize.controller:salesrepCtrl
 * @description
 * Represents the salesrep controller for the
 * ep.customize module, or for specific  directive
 *
 * @example
 *
 */
    epBindingSelectorCtrl.$inject = ['$scope', '$timeout', 'epTransactionFactory'];
    angular.module('ep.binding')
        .controller('epBindingSelectorCtrl', epBindingSelectorCtrl);

    /*@ngInject*/
    function epBindingSelectorCtrl($scope, $timeout, epTransactionFactory) {
        var scope = $scope;

        if (!scope.config) {
            scope.config = { binding: '' };
        }

        scope.views = [];
        scope.columns = [];

        $scope.meta = {
            view: '',
            column: '',
            preview: ''
        };

        var viewsList = epTransactionFactory.current().views();
        angular.forEach(viewsList, function(v) {
            scope.views.push({
                label: v,
                value: v
            });
        });

        if (scope.views.length) {
            $scope.meta.view = scope.views[0].value;
        }

        scope.viewList = {
            caption: 'View',
            name: 'View',
            editor: 'select',
            updatable: true,
            list: scope.views,
            sizeClass: 'col-lg-12',
            fnOnChange: function(ev, ctx) {
                scope.columns = [];
                var viewId = ctx.fnGetCurrentValue();
                onViewChange(viewId);
            }
        };

        scope.columnList = {
            caption: 'Columns',
            name: 'Columns',
            editor: 'select',
            updatable: true,
            list: undefined,
            sizeClass: 'col-lg-12',
            fnOnChange: function(ev, ctx) {
                var column = ctx.fnGetCurrentValue();
                scope.config.binding = '[' + scope.meta.view + '].[' + scope.meta.column + ']';
            }
        };

        function onViewChange(viewId) {
            var cols = [];
            scope.meta.column = '';
            scope.meta.preview = '';
            scope.config.binding = '[' + viewId + ']';

            scope.loadingColumns = true;
            $timeout(function() {
                var view = epTransactionFactory.current().view(viewId);
                if (view.hasData()) {
                    var record = view.dataRow();
                    angular.forEach(record, function(v, n) {
                        cols.push({
                            label: n,
                            value: n
                        });
                    });
                    scope.meta.preview = JSON.stringify(record, null, '    ');
                }
                scope.columns = cols;
                scope.columnList.list = scope.columns;
                scope.loadingColumns = false;
            });
        }

        scope.columnBinding = {
            caption: 'ep-binding',
            sizeClass: 'col-lg-12',
            editor: 'text',
            updatable: true,
            readonly: true,
            placeholder: ''
        };

        if (viewsList.length) {
            onViewChange(viewsList[0]);
        }
    }
}());

(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.customization.directive:epCustomization
    * @restrict E
    *
    * @description
    * Represents the ep.customization directive
    *
    * @example
    */
    epBindingTableDirective.$inject = ['$location', '$timeout', 'epBindingFactory', 'epCustomizationService'];
    angular.module('ep.binding').directive('epBindingTable', epBindingTableDirective);

    /*@ngInject*/
    function epBindingTableDirective($location, $timeout, epBindingFactory, epCustomizationService) {
        return {
            restrict: 'E',
            templateUrl: 'src/components/ep.binding/controls/ep-binding-table.html',
            scope: {
                epBinding: '=',
                columns: '=',
                trackSelectedRow: '=',
                onSelectRow: '&',
                onDoubleClickRow: '&'

            },
            link: function(scope, element, attrs) {
                //This will be set by eBindingFactory
                scope.epBindingInfo = {
                    value: undefined
                };

                scope.state = {
                    id: attrs.id,
                    data: undefined,
                    columns: []
                };

                var cols = scope.columns.split(',');
                angular.forEach(cols, function(c) {
                    scope.state.columns.push({
                        name: c,
                        caption: c
                    });
                });

                scope.dblClickRow = function(row) {
                    if (scope.onDoubleClickRow) {
                        scope.onDoubleClickRow({ 'row': row });
                    }
                }

                function applyCustomization() {
                    //apply custom props
                    var customProps = epCustomizationService.getCustomization(scope.state.id);
                    angular.forEach(customProps, function(c, n) {
                        if (c.isCustom) {
                            scope.state.columns.push(c);
                        } else {
                            if (c.hidden) {
                                var theColumn = _.find(scope.state.columns, function(cc) {
                                    return cc.name === n;
                                });
                                if (theColumn) {
                                    theColumn.hidden = c.hidden;
                                }
                            } else if (c.caption) {
                                var theColumn = _.find(scope.state.columns, function(cc) {
                                    return cc.name === n;
                                });
                                if (theColumn) {
                                    theColumn.caption = c.caption;
                                }
                            }
                        }
                    });
                }

                function getMetaList(headers) {
                    var arr = [];
                    angular.forEach(scope.state.columns, function(c) {
                        if (c.hidden !== true) {
                            arr.push(headers ? c.caption : c.name);
                        }
                    });
                    return arr.join(',');
                }

                function setHeadersAndMeta() {
                    scope.headers = getMetaList(true);
                    scope.dataColumns = getMetaList(false);
                }

                scope.$watch('epBinding', function(newValue, oldValue) {
                    if (newValue !== undefined) {
                        var callbacks = {
                            onViewReady: function(view) {
                                scope.state.data = scope.epBindingInfo.view.data();
                                scope.ready = true;
                            }
                        };
                        scope.state.bindingFactory = new epBindingFactory(scope, newValue, scope.epBindingInfo, true,
                            callbacks);
                        applyCustomization();
                        setHeadersAndMeta();
                    }
                });

                //epCustomizationInfo must be declared on scope for customization engine
                scope.epCustomizationInfo = {
                    kind: 'ep-table',
                    id: scope.state.id,
                    scope: scope,
                    url: $location.url(),
                    data: undefined,
                    index: undefined,
                    ctrl:{
                        epBinding: scope.epBinding,
                        factory: undefined,
                        columns: scope.state.columns,
                    },
                    api: {
                        onCustomizeActivate: function(on) {
                            scope.isCustomizeActive = (on === true);
                            scope.activeClass = scope.isCustomizeActive ? 'ep-customize-active' : '';
                        },
                        onColumnAdd: function(newColumn) {
                            scope.state.columns.push(newColumn);
                            setHeadersAndMeta();
                            scope.ready = false;
                            $timeout(function() {
                                scope.ready = true;
                            });
                        },
                        onColumnRemove: function(col) {
                            scope.state.columns = _.without(scope.state.columns, col);
                            setHeadersAndMeta();
                            scope.ready = false;
                            $timeout(function() {
                                scope.ready = true;
                            });
                        },
                        onChange: function(mode) {
                            setHeadersAndMeta();
                            scope.ready = false;
                            $timeout(function() {
                                scope.ready = true;
                            });
                        }
                    }
                };
            }
        }
    }
}());

/**
* @ngdoc directive
* @name ep.binding.directive:epBindingModelDirective
* @restrict A
*
* @description
* A directive that allows setting a ep-binding-model attribute on a control to replace ng-model.
* ng-model must be set to "ep"
*
* @example
* <input type="text" ng-model="ep" ep-binding-model="'[customer].[CustID]'" />
*/
(function() {
    'use strict';

    epBindingModelDirective.$inject = ['epBindingFactory'];
    angular.module('ep.binding').
    directive('epBindingModel', epBindingModelDirective);

    /*@ngInject*/
    function epBindingModelDirective(epBindingFactory) {
        return {
            restrict: 'A',
            require: '?ngModel',
            scope: true,
            link: function(scope, element, attrs, ngModel) {
                var bindingFactory;

                if (!ngModel) { return; }

                //This will be set by eBindingFactory
                scope.epBindingInfo = { value: undefined, kind: 'ep-binding-model' };

                scope.$watch(attrs.epBindingModel, function(newValue) {
                    if (newValue !== undefined) {
                        if (bindingFactory) {
                            bindingFactory.changeBinding(newValue);
                        } else {
                            bindingFactory = new epBindingFactory(scope, newValue, scope.epBindingInfo, false,
                                {
                                    onValueChanged: function(value) { scope[attrs.ngModel] = value; }
                                });
                        }
                    }
                });

                //Outward (from control to bound object)
                ngModel.$parsers.unshift(function(value) {
                    scope.epBindingInfo.value = value;
                    return value;
                });
            }
        };
    }
})();


/**
* @ngdoc directive
* @name ep.binding.directive:epBindingScopeDirective
* @restrict E
*
* @description
* A directive that sets a scope on the markup withing which epDataView will be accessible
*/
(function() {
    'use strict';

    epBindingScopeDirective.$inject = ['$compile', 'epBindingFactory'];
    angular.module('ep.binding').
    directive('epBindingScope', epBindingScopeDirective);

    /*@ngInject*/
    function epBindingScopeDirective($compile, epBindingFactory) {
        return {
            restrict: 'E',
            replace: false,
            scope: true,
            compile: function(element, attrs) {

                return {
                    pre: function(scope, iElement) {
                        var bindingFactory;

                        //This will be set by eBindingFactory
                        scope.epBindingInfo = {};
                        var viewAlias = attrs['aliasView'];

                        scope.$watch(attrs['epBinding'], function(newValue) {
                            if (newValue !== undefined) {
                                if (bindingFactory) {
                                    bindingFactory.changeBinding(newValue);
                                } else {
                                    bindingFactory = new epBindingFactory(scope, newValue, scope.epBindingInfo, false,
                                        {
                                            onRowChanged: function(record) {
                                                scope[viewAlias] = record;
                                            }
                                        }, true);
                                    viewAlias = viewAlias || scope.epBindingInfo.epBinding.view;
                                    scope.epb = scope.epBindingInfo;
                                    if (viewAlias) {
                                        scope[viewAlias] = scope.epBindingInfo.record;
                                    }
                                }
                            }
                        });
                    }
                };
            }
        };
    }

})();


(function() {
    'use strict';
    /**
     * @ngdoc service
     * @name ep.binding.factory:epBindingFactory
     * @description
     * Factory service for the ep.binding module
     * Creates an instance for epBinding that provides events and properties on epBindingInfo object that
     * can be used to tie the control to data
     *
     * @example
     *
     */
    epBindingFactory.$inject = ['$rootScope', '$timeout', 'epBindingService', 'epTransactionFactory'];
    angular.module('ep.binding').
        factory('epBindingFactory', epBindingFactory);

    /*@ngInject*/
    function epBindingFactory($rootScope, $timeout, epBindingService, epTransactionFactory) {
        var factoryInstance = function(scope, theBinding, epBindingInfo, readOnly, callbacksFuncs, trackBufferRecord) {

            var state;
            var watches = {};

            function init(binding) {
                var callbacks = callbacksFuncs || {};

                state = {
                    trackBufferRecord: trackBufferRecord,
                    scope: scope,
                    epBinding: epBindingService.parseBinding(binding),
                    bi: {}
                };

                var bi = state.bi = epBindingInfo || scope.epBindingInfo || {};
                bi.epBinding = state.epBinding;
                bi.columnName = state.epBinding.column;
                bi.viewId = state.epBinding.view;
                bi.view = undefined;
                bi.record = undefined;
                bi.rec = undefined;
                bi.value = undefined;
                bi.trx = epTransactionFactory.current();

                function setValueFromBoundRecord() {
                    if (state.epBinding.column) {
                        bi.value = bi.record[state.epBinding.column];
                        if (callbacks.onValueChanged) {
                            callbacks.onValueChanged(bi.value);
                        }
                    }
                }

                function trackBufferRec(record) {
                    if (!state.trackBufferRecord) {
                        return;
                    }

                    //In case a buffer record in between UI and Data View
                    bi.rec = undefined;
                    $timeout(function() {
                        bi.rec = angular.extend({}, record);
                        if (callbacks.onRowChanged) {
                            callbacks.onRowChanged(bi.rec);
                        }
                    });

                    if (!watches.bufferRecord) {
                        watches.bufferRecord = scope.$watch('epBindingInfo.rec', function(newValue, oldValue) {
                            if (newValue && oldValue && newValue !== oldValue) {
                                for (var id in newValue) {
                                    if (newValue.hasOwnProperty(id) && newValue[id] !== undefined) {
                                        if (!angular.equals(newValue[id], oldValue[id])) {
                                            bi.view.columnValue(id, newValue[id]);
                                        }
                                    }
                                }
                            }
                        }, true);
                    }
                }

                function onViewInit(view) {
                    if (view && view.hasData()) {
                        bi.view = view;
                        if (callbacks.onViewReady) {
                            callbacks.onViewReady(view);
                        }
                        if (view.hasData()) {
                            onRowChange(view);
                        }
                    }
                }

                function onRowChange(view) {
                    bi.record = view.dataRow();
                    trackBufferRec(bi.record);

                    if (!state.trackBufferRecord && callbacks.onRowChanged) {
                        callbacks.onRowChanged(bi.record);
                    }
                    setValueFromBoundRecord();
                }

                var view = epTransactionFactory.current().view(state.epBinding.view);
                if (!view) {
                    watches.main = $rootScope.$on('EP_BINDING_VIEW_ADDED', function(event, data) {
                        if (data.viewId === state.epBinding.view) {
                            onViewInit(epTransactionFactory.current().view(state.epBinding.view));
                        }
                    });
                } else {
                    onViewInit(view);
                }

                watches.onViewRowChanged = $rootScope.$on('EP_BINDING_VIEW_ROW_CHANGED', function(event, data) {
                    if (data.viewId === state.epBinding.view) {
                        onRowChange(data.view);
                    }
                });

                if (state.epBinding.column) {
                    if (readOnly !== true) {
                        //outward direction (save local change to view)
                        watches.bindingValue = scope.$watch('epBindingInfo.value', function(newValue, oldValue) {
                            if (newValue !== oldValue && bi.record && state.epBinding.column) {
                                bi.view.columnValue(state.epBinding.column, newValue);
                            }
                        });
                    }

                    //inward direction (reflect view change to local)
                    watches.bindingRecord = scope.$watch('epBindingInfo.record.' + state.epBinding.column,
                        function(newValue, oldValue) {
                            if (newValue !== oldValue && bi.record && state.epBinding.column &&
                                bi.record[state.epBinding.column] !== bi.value) {
                                setValueFromBoundRecord();
                            }
                        });
                }
            }

            /**
             * @ngdoc method
             * @name changeBinding
             * @methodOf ep.binding.factory:epBindingFactory
             * @public
             * @description
             * change existing binding
             */
            function changeBinding(binding) {
                //TO DO::validate that new binding is valid
                freeze();
                init(binding);
            }

            /**
             * @ngdoc method
             * @name epBinding
             * @methodOf ep.binding.factory:epBindingFactory
             * @public
             * @description
             * get current binding
             */
            function epBinding() {
                return state.epBinding;
            }

            /**
             * @ngdoc method
             * @name freeze
             * @methodOf ep.binding.factory:epBindingFactory
             * @public
             * @description
             * freeze current binding's events (when changing binding)
             */
            function freeze() {
                angular.forEach(watches, function(w) {
                    w();
                })
            }

            init(theBinding);

            return {
                epBinding: epBinding,
                changeBinding: changeBinding,
                freeze: freeze
            };
        }
        return factoryInstance;
    }
}());

/**
* @ngdoc directive
* @name ep.record.editor.directive:epDateConvert
* @restrict E
*
* @description
* an epBinding filter that can be used to retrieve a value from data view. scope must be
* provided as a parameter through "this" keyword
*
* @example
* <p>Address:{{'customer.Address1' | epBinding:this}}</p>
*
*/
(function() {
    'use strict';

    angular.module('ep.binding').
      filter('epBinding',
      /*@ngInject*/
      ['epBindingFactory', '$log', '$rootScope', function(epBindingFactory, $log, $rootScope) {
          var bindingProperty = '___epBindings';

          var filter = function(epColumnBinding, scope) {
              //The trick here is to create on scope a store to keep epBindingFactory
              //objects for each unique binding
              if (!scope[bindingProperty])
              {
                  scope[bindingProperty] = {};
              }
              var obj = scope[bindingProperty][epColumnBinding];
              if (!obj) {
                  obj = { column: epColumnBinding, epBindingInfo: { kind: 'ep-binding-filter', value: undefined } };
                  scope[bindingProperty][epColumnBinding] = obj;
                  obj.tempScope = scope.$new(false, scope);
                  //$log.warn('creating filter:' + epColumnBinding);
                  obj.bindingFactory = new epBindingFactory(scope, epColumnBinding, obj.epBindingInfo, true, {
                      onValueChanged: function(val) {
                          obj.value = val;
                      }
                  });
                  obj.eventColumn = $rootScope.$on('EP_BINDING_COLUMN_VALUE_CHANGED', function(event, data) {
                      if (data.viewId === obj.epBindingInfo.epBinding.view) {
                          obj.epBindingInfo.value = data.newValue;
                      }
                  });
                  obj.tempScope.$on('$destroy', function() {
                      obj.eventColumn();
                  });
              }
              return obj.epBindingInfo.value;
          };
          return filter;
      }]
    );
})();


(function() {
    'use strict';
    /**
     * @ngdoc service
     * @name ep.binding.service:epBindingService
     * @description
     * Service for the ep.binding module
     * Helper methods for epBinding
     *
     * @example
     * var binding = epBindingService.parseBinding('[customer].[CustID]')
     *
     */
    epBindingService.$inject = ['$rootScope', '$log', 'epModalDialogService', 'epUtilsService', 'epTransactionFactory'];
    angular.module('ep.binding').
        service('epBindingService', epBindingService);

    /*@ngInject*/
    function epBindingService($rootScope, $log, epModalDialogService, epUtilsService, epTransactionFactory) {
        var logWatches = {};

        /**
         * @ngdoc method
         * @name parseBinding
         * @methodOf ep.binding.factory:epBindingService
         * @public
         * @description
         * open dialog with select binding
         */
        function selectBinding(fnOnSelect) {
            epModalDialogService.showCustomDialog({
                title: 'Data Binding',
                templateUrl: 'src/components/ep.binding/controls/ep-binding-selector.html',
                icon: 'fa fa-cogs fa-2x',
                binding: '',
                buttons: [
                    {
                        text: 'Ok',
                        action: function(cfg) {
                            fnOnSelect(cfg.binding);
                        }
                    },
                    {
                        text: 'Cancel',
                        isCancel: true,
                    }

                ]
            });
        }

        /**
         * @ngdoc method
         * @name parseBinding
         * @methodOf ep.binding.factory:epBindingService
         * @public
         * @description
         * parse binding passed as string into view and column
         */
        function parseBinding(binding) {
            var ret;
            if (!binding) {
                return ret;
            }
            if (angular.isString(binding)) {
                var b = binding.trim();
                ret = {
                    view: b,
                    column: ''
                }
                if (b.indexOf('[') === 0 && (b.lastIndexOf(']') === b.length - 1)) {
                    var matches = b.match(/\[(.*?)\]/g);
                    if (matches.length > 1) {
                        ret = {
                            view: matches[0].replace('[', '').replace(']', ''),
                            column: matches[1].replace('[', '').replace(']', '')
                        }
                    } else if (matches.length === 1) {
                        ret.view = matches[0].replace('[', '').replace(']', '');
                    }
                } else {
                    var parts = b.split('.');
                    if (parts.length) {
                        ret = {
                            view: parts[0],
                            column: parts[1]
                        }
                    }
                }
            } else {
                ret = binding
            }
            return ret;
        }

        /**
         * @ngdoc method
         * @name logBindingEvents
         * @methodOf ep.binding.factory:epBindingService
         * @public
         * @description
         * turn on/off binding events log
         */
        function logBindingEvents(onOff) {
            if (onOff && !logWatches.onViewRowChanged) {
                logWatches.onViewRowChanged = $rootScope.$on('EP_BINDING_VIEW_ADDED', function(event, data) {
                    $log.warn('[EP_BINDING_VIEW_ADDED] ViewId:' + data.viewId);
                });
                logWatches.onViewRowChanged = $rootScope.$on('EP_BINDING_VIEW_ROW_CHANGED', function(event, data) {
                    $log.warn('[EP_BINDING_VIEW_ROW_CHANGED] ViewId:' + data.viewId + ';Row:' + data.view.row() +
                        ';PrevRow:' + data.prevRow);
                });
                logWatches.onViewRowChanged = $rootScope.$on('EP_BINDING_COLUMN_VALUE_CHANGED', function(event, data) {
                    var v = epTransactionFactory.current().view(data.viewId);
                    var vstate = v.__state;
                    var info = 'ViewId:' + data.viewId + ';Row:' + data.row + ';Old Value:' + data.oldValue +
                        ';New value:' + data.newValue +
                        ';isDirty:' + v.isDirty() + ';isModified:' + v.isModified() +
                        ';Modified rows:' + Object.keys(vstate.modifiedRows).length;
                    $log.warn('[EP_BINDING_COLUMN_VALUE_CHANGED] ' + info);
                    angular.forEach(vstate.modifiedRows, function(idx) {
                        $log.info('  row:' + idx + ';state:' + vstate.modified[idx].state +
                            ';columns:' + JSON.stringify(vstate.modified[idx].columns));
                    })
                });
            }
            if (!onOff) {
                angular.forEach(logWatches, function(w) {
                    w();
                });
            }
        }

        return {
            selectBinding: selectBinding,
            parseBinding: parseBinding,
            logBindingEvents: logBindingEvents
        };
    }
}());

(function() {
    'use strict';
    /**
     * @ngdoc service
     * @name ep.binding.factory:epDataViewFactory
     * @description
     * Factory for epDataViewFactory. Creates an instance of a data view.
     *
     * @example
     *
     */

    epDataViewFactory.$inject = ['$rootScope', 'epUtilsService'];
    angular.module('ep.binding').
        factory('epDataViewFactory', epDataViewFactory);

    /*@ngInject*/
    function epDataViewFactory($rootScope, epUtilsService) {
        var factoryInstance = function(viewId, viewData) {
            var state = {};
            var _view = this;

            function init(_id, _data) {
                state.id = _id;
                state.data = _data;
                state.row = state.data && state.data.length ? 0 : -1;
                state.isDirty = false;
                state.isModified = false;
                state.modified = Array(state.data.length);
                state.modifiedRows = {};
                state.original = epUtilsService.merge({}, state.data);
            }

            /**
             * @ngdoc method
             * @name id
             * @methodOf ep.binding.factory:epDataViewFactory
             * @public
             * @description
             * returns id of the view
             */
            function id() {
                return state.id;
            }

            /**
             * @ngdoc method
             * @name data
             * @methodOf ep.binding.factory:epDataViewFactory
             * @public
             * @description
             * returns data array of the view
             */
            function data() {
                return state.data;
            }

            /**
             * @ngdoc method
             * @name dataRow
             * @methodOf ep.binding.factory:epDataViewFactory
             * @public
             * @description
             * returns current data row of the view
             */
            function dataRow() {
                if (state.row < 0) {
                    return null;
                }
                return state.data[state.row];
            }

            /**
             * @ngdoc method
             * @name hasData
             * @methodOf ep.binding.factory:epDataViewFactory
             * @public
             * @description
             * returns true if view has at least one data row
             */
            function hasData() {
                return (state.data && state.data.length);
            }

            /**
             * @ngdoc method
             * @name row
             * @methodOf ep.binding.factory:epDataViewFactory
             * @public
             * @description
             * returns current row index or sets a new current row by index
             */
            function row(index) {
                if (index !== undefined) {
                    var oldRow = state.row;
                    state.row = index;
                    $rootScope.$emit('EP_BINDING_VIEW_ROW_CHANGED', {
                        viewId: state.id,
                        view: this,
                        prevRow: oldRow
                    });
                }
                return state.row;
            }

            /**
             * @ngdoc method
             * @name columnValue
             * @methodOf ep.binding.factory:epDataViewFactory
             * @public
             * @description
             * returns or sets specified column's value
             */
            function columnValue(column, value) {
                var record = state.data[state.row];
                if (arguments.length > 1) {
                    var oldValue = record[column];
                    if (record[column] !== value) {
                        record[column] = value;
                        state.isDirty = true;

                        var rowIdx = state.row; //nned to handle deleted or new

                        var mod = state.modified[rowIdx] || { state: 'M', columns: {} };
                        if (Object.keys(mod.columns).length > 0 && record[column] === state.original[rowIdx][column]) {
                            delete mod.columns[column];
                        } else {
                            mod.columns[column] = value;
                        }
                        mod.state = Object.keys(mod.columns).length > 0 ? 'M' : '';
                        state.modified[rowIdx] = mod.state === '' ? undefined : mod;

                        state.modifiedRows[rowIdx] = rowIdx;
                        if (mod.state === '') {
                            delete state.modifiedRows[rowIdx];
                        }
                        state.isModified = Object.keys(state.modifiedRows).length > 0;

                        $rootScope.$emit('EP_BINDING_COLUMN_VALUE_CHANGED', {
                            viewId: state.id,
                            row: state.row,
                            newValue: value,
                            oldValue: oldValue
                        });
                    }
                }
                return record[column];
            }

            /**
             * @ngdoc method
             * @name rollback
             * @methodOf ep.binding.factory:epDataViewFactory
             * @public
             * @description
             * rollback current view changes
             */
            function rollback() {
                state.data = epUtilsService.merge({}, state.original);
                state.isDirty = false;
                state.isModified = false;
                state.modifiedRows = {};
            }

            /**
             * @ngdoc method
             * @name isModified
             * @methodOf ep.binding.factory:epDataViewFactory
             * @public
             * @description
             * returns true if view has been modified
             */
            function isModified() {
                return state.isModified;
            }

            /**
             * @ngdoc method
             * @name isDirty
             * @methodOf ep.binding.factory:epDataViewFactory
             * @public
             * @description
             * returns true if view been edited
             */
            function isDirty() {
                return state.isDirty;
            }

            /**
             * @ngdoc method
             * @name modifiedRows
             * @methodOf ep.binding.factory:epDataViewFactory
             * @public
             * @description
             * returns modified rows
             */
            function modifiedRows() {
                var ret = [];
                angular.forEach(Object.keys(state.modifiedRows), function(idx) {
                    ret.push(state.data[idx]);
                })
                return ret;
            }

            /**
             * @ngdoc method
             * @name rowModified
             * @methodOf ep.binding.factory:epDataViewFactory
             * @public
             * @description
             * returns modified row by its index
             */
            function rowModified(idx) {
                var index = idx == undefined ? state.row : idx;
                return (state.modified[index] !== undefined && state.modified[index].state === 'M');
            }

            init(viewId, viewData);

            return {
                __state: state, //internal usage only
                id: id,
                data: data,
                dataRow: dataRow,
                row: row,
                hasData: hasData,
                columnValue: columnValue,
                isModified: isModified,
                isDirty: isDirty,
                modifiedRows: modifiedRows,
                rowModified: rowModified,
                rollback: rollback
            };

        }
        return factoryInstance;
    }

}());

(function() {
    'use strict';
    /**
     * @ngdoc service
     * @name ep.binding.factory:epTransactionFactory
     * @description
     * Factory for epTransactionFactory
     *
     * @example
     *
     */
    epTransactionFactory.$inject = ['$rootScope', 'epDataViewFactory'];
    angular.module('ep.binding').
        factory('epTransactionFactory', epTransactionFactory);

    /*@ngInject*/
    function epTransactionFactory($rootScope, epDataViewFactory) {
        var factoryInstance = function(trxId) {
            var _id = trxId;
            var _views = {};

            /**
             * @ngdoc method
             * @name id
             * @methodOf ep.binding.factory:epTransactionFactory
             * @public
             * @description
             * returns id of the transaction
             */
            function id() {
                return _id;
            }

            /**
             * @ngdoc method
             * @name addView
             * @methodOf ep.binding.factory:epTransactionFactory
             * @public
             * @description
             * add a view to the transaction
             */
            function add(id, data) {
                //To do check if exists already
                var v = _views[id] = new epDataViewFactory(id, data);
                $rootScope.$emit('EP_BINDING_VIEW_ADDED', {
                    viewId: id
                });
                if (v.data() && v.data().length) {
                    //TO DO: call api
                    $rootScope.$emit('EP_BINDING_VIEW_ROW_CHANGED', {
                        viewId: v.id(),
                        view: v
                    });
                }
                return _views[id];
            }

            /**
             * @ngdoc method
             * @name view
             * @methodOf ep.binding.factory:epTransactionFactory
             * @public
             * @description
             * returns a data view by view id
             */
            function view(id) {
                return _views[id];
            }

            /**
             * @ngdoc method
             * @name views
             * @methodOf ep.binding.factory:epTransactionFactory
             * @public
             * @description
             * get views (list of names)
             */
            function views() {
                var ret = [];
                angular.forEach(_views, function(v, n) {
                    ret.push(n);
                });
                return ret;
            }

            /**
             * @ngdoc method
             * @name rollback
             * @methodOf ep.binding.factory:epTransactionFactory
             * @public
             * @description
             * rollback all views
             */
            function rollback() {
                var ret = [];
                angular.forEach(_views, function(v) {
                    v.rollback();
                });
                return ret;
            }

            return {
                id: id,
                add: add,
                //remove: remove,
                view: view,
                views: views,
                rollback: rollback
            };
        }

        //------------------------------------------------>>>>>
        var currentTrx;

        /**
         * @ngdoc method
         * @name newTransaction
         * @methodOf ep.binding.factory:epTransactionFactory
         * @public
         * @description
         * Create a new transaction
         */
        function newTransaction(id) {
            return new factoryInstance(id);
        }

        /**
         * @ngdoc method
         * @name current
         * @methodOf ep.binding.factory:epTransactionFactory
         * @public
         * @description
         * Returns current transaction
         */
        function current() {
            if (!currentTrx) {
                currentTrx = newTransaction('default');
            }
            return currentTrx;
        }
        //------------------------------------------------>>>>>

        return {
            current: current,
            newTransaction: newTransaction
        };
    }
}());

//# sourceMappingURL=emf.data.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/ep.token/ep-login-view/ep-login-view.html',
    "<!--This is a partial for the ep-login-view directive --><div class=\"ep-login-view container-fluid\"><div class=ep-login-background><div class=ep-background-image ng-if=!settings.customImage></div><img class=ep-background-custom-image ng-if=settings.customImage ng-src={{settings.customImage}} alt=\"\"></div><div class=ep-login-up-box><div class=\"ep-login-box center-block\"><form class=form-group><div class=form-group><p class=ep-login-text><b>Please enter your credentials to sign in.</b></p><div class=input-group><span class=input-group-addon><i class=\"fa fa-user fa-fw\"></i></span> <input clearable name=username ng-keypress=clearWarning() id=username class=form-control ng-model=settings.username placeholder=\"User Name\"></div><br><div class=input-group><span class=input-group-addon><i class=\"fa fa-lock fa-fw\"></i></span> <input type=password clearable ng-keypress=passwordKeyPress($event) name=password id=password class=form-control ng-model=settings.password placeholder=\"Password\"></div><br><div ng-show=showServerName class=input-group><span class=input-group-addon><i class=\"fa fa-server fa-fw\"></i></span> <input spellcheck autocorrect=false clearable name=servername id=serverValue class=form-control ng-model=settings.serverName placeholder=\"Server\"></div><br><div ng-if=status class=\"text-center alert alert-warning\"><label>{{status}}</label><br></div><div><button ng-if=\"options.showSettingsButton !== false\" class=\"btn btn-default pull-left\" ng-click=showServer()><i class=\"fa fa-cog fa-fw\"></i></button> <button type=submit class=\"btn btn-primary pull-right\" ng-click=loginUser()>Log in</button></div></div></form></div></div></div>"
  );


  $templateCache.put('src/components/ep.token/ep-login/login.html',
    "<div class=thumbnail><div ng-if=\"showTitle !== false\" class=caption><h3 ng-hide=hasToken><span class=\"icon icon-enter\"></span> Login</h3><h3 ng-show=hasToken><span class=\"icon icon-exit\"></span> Logout</h3><hr></div><form role=form><div ng-if=\"showLabels === false\" class=input-group><span class=input-group-addon><i class=\"fa fa-user fa-fw\"></i></span> <input tabindex=1 id=user-name name=username required class=form-control ng-model=user.username placeholder=\"user name\"></div><div ng-if=\"showLabels !== false\" class=form-group><label for=user-name class=\"col-sm-2 control-label\">User:</label><div><input tabindex=1 id=user-name name=username required class=form-control ng-model=user.username placeholder=\"user name\"></div></div><div ng-if=\"showLabels === false\" class=form-group><div class=input-group><span class=input-group-addon><i class=\"fa fa-key fa-fw\"></i></span> <input tabindex=2 id=user-password name=password required class=form-control type=password placeholder=password ng-model=\"user.password\"></div></div><div ng-if=\"showLabels !== false\" class=form-group><label for=user-password class=\"col-sm-2 control-label\">Password:</label><div><input tabindex=2 id=user-password name=password required class=form-control type=password placeholder=password ng-model=\"user.password\"></div></div></form><div class=\"alert alert-danger\" id=validationSummary role=alert ng-show=hasError>{{status}}</div><div><button ng-if=\"showCancel !== false\" type=button class=\"btn btn-default\" ng-click=cancel()>Cancel</button> <button type=button class=\"btn btn-primary\" ng-hide=hasToken ng-click=login()>Login</button> <button type=button class=\"btn btn-primary\" ng-show=hasToken ng-click=logout()>Logout</button></div></div>"
  );


  $templateCache.put('src/components/ep.search/search.html',
    "<div><header class=reverse><div class=searchControl><form role=form ng-submit=runSearch(searchText)><input type=search placeholder=\"Enter your search terms...\" ng-model=searchText ng-change=\"changeSearch()\"> <span class=input-group-btn><button class=\"btn btn-default\" type=button><span class=\"icon icon-search\"></span></button></span> <button ng-click=runSearch(searchText) ng-disabled=!searchText>search</button></form><div class=\"alert alert-danger\" id=validationSummary role=alert ng-show=hasError>{{status}}</div></div></header><section><div ng-show=enterpriseSearch.searchText><p ng-show=enterpriseSearch.searching>Searching for the following terms: '{{enterpriseSearch.searchText}}' ...</p><p ng-show=enterpriseSearch.searchError>{{enterpriseSearch.searchError}}</p></div><ul ng-if=enterpriseSearch.searchResults class=searchResults><li ng-repeat=\"searchResult in enterpriseSearch.searchResults track by $index\" class=searchResultCategory><b>Category: {{searchResult.label | uppercase}}</b><br><ul ng-if=searchResult.results><li ng-repeat=\"result in searchResult.results\" class=searchResult><span class=searchResultHeader ng-class=searchResult.label>{{result.label | uppercase}} - {{result.companyContext}} - {{result.keyTag}}</span><br><div ng-if=result.fields><span ng-repeat=\"field in result.fields\" class=searchResultField>{{field.alias}}: {{field.FieldValue}},</span></div></li></ul></li></ul></section></div>"
  );


  $templateCache.put('src/components/ep.table/table.html',
    "<table class=table ng-class=\"{'table-striped' : striped}\"><tr><th ng-repeat=\"oneTh in headers track by $index\">{{oneTh}}</th></tr><tr ng-show=isLoading><td colspan={{colCount}}><div class=\"progress progress-striped active\"><div class=progress-bar role=progressbar aria-valuenow=1 aria-valuemin=0 aria-valuemax=1 style=\"width: 100%\"></div></div></td></tr><tr ng-show=loadError><td colspan={{colCount}}><p class=\"text-danger text-center\"><i class=\"fa fa-exclamation-triangle\"></i> {{loadError}}</p></td></tr><tr ng-repeat=\"row in data\" class=ep-table-row ng-class=\"{ 'info': row.$isSelected }\" ng-click=selectRow(row,$event) ng-dblclick=onDblClick(row,$event)><td ng-repeat=\"cell in props track by $index\" class=ep-table-cell>{{row[cell]}}</td></tr></table>"
  );


  $templateCache.put('src/components/ep.binding/controls/ep-binding-editor.html',
    "<ep-editor-control drag-enabled=false column=state.column value=epBindingInfo.value></ep-editor-control>"
  );


  $templateCache.put('src/components/ep.binding/controls/ep-binding-pagination.html',
    "<!--This is a partial for the ep-binding directive --><div class=ep-binding><uib-pagination previous-text=&lsaquo; next-text=&rsaquo; items-per-page=1 total-items=totalItems ng-model=currentPage ng-change=onPageChange() max-size=maxSize class=pagination-sm boundary-link-numbers=true rotate=false></uib-pagination></div>"
  );


  $templateCache.put('src/components/ep.binding/controls/ep-binding-record-editor.html',
    "<ep-binding-scope ep-binding=epBinding><ep-record-editor options=options record=epb.rec isreadonly=readonly size-class=sizeClass on-init=onInitThis(factory) class={{activeClass}}></ep-record-editor></ep-binding-scope>"
  );


  $templateCache.put('src/components/ep.binding/controls/ep-binding-selector.html',
    "<!--This is a partial for the ep-binding directive --><div class=ep-binding-selector ng-controller=epBindingSelectorCtrl><div class=\"panel panel-default\"><div class=\"panel-heading panel-heading-small\"><ul class=\"nav nav-tabs\"><li class=active><a data-toggle=pill href=.binding>Binding</a></li><li><a data-toggle=pill href=.preview>Data Preview</a></li></ul></div><div class=panel-body><div class=\"tab-content ep-padding-bottom\"><div class=\"binding tab-pane fade in active\"><ep-editor-control column=viewList value=meta.view></ep-editor-control><div ng-if=meta.view><div class=text-center ng-show=loadingColumns><i class=\"fa fa-spinner fa-spin fa-2x\"></i><label>loading columns...</label></div><div ng-hide=loadingColumns><ep-editor-control column=columnList value=meta.column></ep-editor-control></div></div><ep-editor-control column=columnBinding value=config.binding></ep-editor-control></div><div class=\"preview tab-pane fade\"><textarea class=\"form-control alert-info\" ng-model=meta.preview style=\"min-height: 400px; min-width: 300px\"></textarea></div></div></div></div><!--<ep-editor-control column=\"viewList\" value=\"meta.view\"></ep-editor-control>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div ng-if=\"meta.view\">\r" +
    "\n" +
    "                        <div class=\"text-center\" ng-show=\"loadingColumns\">\r" +
    "\n" +
    "                            <i class=\"fa fa-spinner fa-spin fa-2x\"></i><label>loading columns...</label>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div ng-hide=\"loadingColumns\">\r" +
    "\n" +
    "                            <ep-editor-control column=\"columnList\" value=\"meta.column\"></ep-editor-control>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <ep-editor-control column=\"columnBinding\" value=\"config.binding\"></ep-editor-control>--></div>"
  );


  $templateCache.put('src/components/ep.binding/controls/ep-binding-table.html',
    "<ep-table ng-if=ready data=state.data track-selected-row=trackSelectedRow column-headers={{headers}} column-properties={{dataColumns}} striped=true class={{activeClass}} on-select-row=onSelectRow($row) on-double-click-row=dblClickRow($row)></ep-table>"
  );


  $templateCache.put('src/components/ep.binding/ep-binding.html',
    "<!--This is a partial for the ep-binding directive --><div class=ep-binding></div>"
  );

}]);
