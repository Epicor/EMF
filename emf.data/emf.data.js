/*
 * emf (Epicor Mobile Framework) 
 * version:1.0.10-dev.85 built: 21-10-2016
*/

if (typeof __ep_build_info === "undefined") {var __ep_build_info = {};}
__ep_build_info["data"] = {"libName":"data","version":"1.0.10-dev.85","built":"2016-10-21"};

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
            showLoginDialog: showLoginDialog
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

//# sourceMappingURL=emf.data.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/ep.token/ep-login/login.html',
    "<div class=thumbnail><div ng-if=\"showTitle !== false\" class=caption><h3 ng-hide=hasToken><span class=\"icon icon-enter\"></span> Login</h3><h3 ng-show=hasToken><span class=\"icon icon-exit\"></span> Logout</h3><hr></div><form role=form><div ng-if=\"showLabels === false\" class=input-group><span class=input-group-addon><i class=\"fa fa-user fa-fw\"></i></span> <input tabindex=1 id=user-name name=username required class=form-control ng-model=user.username placeholder=\"user name\"></div><div ng-if=\"showLabels !== false\" class=form-group><label for=user-name class=\"col-sm-2 control-label\">User:</label><div><input tabindex=1 id=user-name name=username required class=form-control ng-model=user.username placeholder=\"user name\"></div></div><div ng-if=\"showLabels === false\" class=form-group><div class=input-group><span class=input-group-addon><i class=\"fa fa-key fa-fw\"></i></span> <input tabindex=2 id=user-password name=password required class=form-control type=password placeholder=password ng-model=\"user.password\"></div></div><div ng-if=\"showLabels !== false\" class=form-group><label for=user-password class=\"col-sm-2 control-label\">Password:</label><div><input tabindex=2 id=user-password name=password required class=form-control type=password placeholder=password ng-model=\"user.password\"></div></div></form><div class=\"alert alert-danger\" id=validationSummary role=alert ng-show=hasError>{{status}}</div><div><button ng-if=\"showCancel !== false\" type=button class=\"btn btn-default\" ng-click=cancel()>Cancel</button> <button type=button class=\"btn btn-primary\" ng-hide=hasToken ng-click=login()>Login</button> <button type=button class=\"btn btn-primary\" ng-show=hasToken ng-click=logout()>Logout</button></div></div>"
  );


  $templateCache.put('src/components/ep.search/search.html',
    "<div><header class=reverse><div class=searchControl><form role=form ng-submit=runSearch(searchText)><input type=search placeholder=\"Enter your search terms...\" ng-model=searchText ng-change=\"changeSearch()\"> <span class=input-group-btn><button class=\"btn btn-default\" type=button><span class=\"icon icon-search\"></span></button></span> <button ng-click=runSearch(searchText) ng-disabled=!searchText>search</button></form><div class=\"alert alert-danger\" id=validationSummary role=alert ng-show=hasError>{{status}}</div></div></header><section><div ng-show=enterpriseSearch.searchText><p ng-show=enterpriseSearch.searching>Searching for the following terms: '{{enterpriseSearch.searchText}}' ...</p><p ng-show=enterpriseSearch.searchError>{{enterpriseSearch.searchError}}</p></div><ul ng-if=enterpriseSearch.searchResults class=searchResults><li ng-repeat=\"searchResult in enterpriseSearch.searchResults track by $index\" class=searchResultCategory><b>Category: {{searchResult.label | uppercase}}</b><br><ul ng-if=searchResult.results><li ng-repeat=\"result in searchResult.results\" class=searchResult><span class=searchResultHeader ng-class=searchResult.label>{{result.label | uppercase}} - {{result.companyContext}} - {{result.keyTag}}</span><br><div ng-if=result.fields><span ng-repeat=\"field in result.fields\" class=searchResultField>{{field.alias}}: {{field.FieldValue}},</span></div></li></ul></li></ul></section></div>"
  );


  $templateCache.put('src/components/ep.table/table.html',
    "<table class=table ng-class=\"{'table-striped' : striped}\"><tr><th ng-repeat=\"oneTh in headers track by $index\">{{oneTh}}</th></tr><tr ng-show=isLoading><td colspan={{colCount}}><div class=\"progress progress-striped active\"><div class=progress-bar role=progressbar aria-valuenow=1 aria-valuemin=0 aria-valuemax=1 style=\"width: 100%\"></div></div></td></tr><tr ng-show=loadError><td colspan={{colCount}}><p class=\"text-danger text-center\"><i class=\"fa fa-exclamation-triangle\"></i> {{loadError}}</p></td></tr><tr ng-repeat=\"row in data\" class=ep-table-row ng-class=\"{ 'info': row.$isSelected }\" ng-click=selectRow(row,$event) ng-dblclick=onDblClick(row,$event)><td ng-repeat=\"cell in props track by $index\" class=ep-table-cell>{{row[cell]}}</td></tr></table>"
  );

}]);
