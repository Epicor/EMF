/*
 * emf (Epicor Mobile Framework) 
 * version:1.0.13-dev.47 built: 25-07-2017
*/

if (typeof __ep_build_info === "undefined") {var __ep_build_info = {};}
__ep_build_info["embedded.apps"] = {"libName":"embedded.apps","version":"1.0.13-dev.47","built":"2017-07-25"};

'use strict';
/**
 * @ngdoc overview
 * @name ep.embedded.apps
 * @description
 * Provides services for embedded application hosting
 */
angular.module('ep.embedded.apps', ['ep.templates', 'ep.sysconfig', 'ep.utils']);

'use strict';
/**
    * @ngdoc directive
    * @name ep.href.directive.directive:epHrefDirective
    * @restrict A
    * @description
    * This directive will allow you to change views withing an EMF application, similar to a normal html <a> tag.
    * @example
    * // This will take you to the home view of the currently running app
    * <a ep-embedded-apps-href="home">Home</a>
    * // This will take you to the home view of a specified app
    * <a ep-embedded-apps-href="home" ep-href-app-id="myOther.app">Home</a>
    * // use on button tags is OK too
    * <button ep-embedded-apps-href="home">Home</button>
*/
angular.module('ep.embedded.apps').directive('epEmbeddedAppsHref', [
    '$log',
    'epEmbeddedAppsService',
    function($log, epEmbeddedAppsService) {
        return {
            restrict: 'A',
            scope: {},
            link: function(scope, element, attr) {
                if (element[0].tagName === 'A' || element[0].tagName === 'BUTTON') {
                    // Make sure that the regular href exists and is blank so that browsers behave as users expect
                    if (element[0].tagName === 'A') { attr.$set('href', ''); }
                    if (attr.epHrefAppId) {
                        // Change view using specified app id
                        bindClick();
                    } else {
                        // Change view using app id of the currently running app
                        var cfgKeys = Object.keys(epEmbeddedAppsService.configs);
                        for (var i = 0; i < cfgKeys.length; i++) {
                            var cfg = epEmbeddedAppsService.configs[cfgKeys[i]];
                            if (cfg.isRunning) {
                                attr.$set('epHrefAppId', cfg.id);
                                bindClick();
                                break;
                            }
                        }
                    }
                } else {
                    $log.warn('ep-embedded-apps-href can only be used on an <a> or <button> tag');
                }
                function bindClick() {
                    scope.clickHandler = element.bind('click', function() {
                        epEmbeddedAppsService.goToView(attr.epHrefAppId, attr.epHref);
                    });
                    scope.$on('$destroy', function() {
                        element.unbind('click', scope.clickHandler);
                    });
                }
            }
        };
    }]);

/**
* @ngdoc directive
* @name ep.modaldialog.directive:epmodaldialog
* @restrict E
*
* @description
* Represents the dialog pane (confirmation) directive. For internal use from epModalDialogService
*
*/
(function() {
    'use strict';

    epEmbeddedAppsLoader.$inject = ['$http', '$log', '$q', '$compile', '$timeout', '$templateCache', 'epEmbeddedAppsCacheService', 'epEmbeddedAppsProvider'];
    angular.module('ep.embedded.apps').
    directive('epEmbeddedAppsLoader', epEmbeddedAppsLoader);

    /*@ngInject*/
    function epEmbeddedAppsLoader($http, $log, $q, $compile, $timeout, $templateCache,
        epEmbeddedAppsCacheService, epEmbeddedAppsProvider) {
        return {
            scope: {
                'config': '=',
                'onComplete': '&'
            },
            link: function(scope, element) {
                var childScope;

                function clearContent() {
                    if (childScope) {
                        childScope.$destroy();
                        childScope = null;
                    }
                    element.html('');
                }

                function loadTemplate(url) {
                    var deferred = $q.defer();
                    var resourceId = 'view:' + url;
                    var view;
                    if (!epEmbeddedAppsCacheService.scriptCache.get(resourceId)) {
                        $http.get(url, { cache: $templateCache }).
                            then(function(result) {
                                epEmbeddedAppsCacheService.scriptCache.put(resourceId, result.data);
                                deferred.resolve(result.data);
                            }, function(data) {
                                $log.error('Error loading template "' + url + '": ' + data);
                                deferred.reject(data);
                            });
                    } else {
                        view = epEmbeddedAppsCacheService.scriptCache.get(resourceId);
                        $timeout(function() {
                            deferred.resolve(view);
                        }, 0);
                    }
                    return deferred.promise;
                }

                scope.$watch('config.id', function() {
                    var config = scope.config;
                    if (config && config.id) {
                        epEmbeddedAppsProvider.load(config).then(function() {

                            var viewId = config.activeViewId || config.startViewId;
                            var templateUrl = epEmbeddedAppsProvider.getAppPath(config.id,
                                config.views[viewId].templateUrl);

                            return loadTemplate(templateUrl);

                        }).then(function(template) {
                            childScope = scope.$new();
                            element.html(template);
                            var content = element.contents();
                            var linkFn = $compile(content);

                            linkFn(childScope);

                            if (scope.onComplete) {
                                scope.onComplete();
                            }
                        });
                    } else {
                        clearContent();
                    }
                });
            }
        };
    }
})();

'use strict';
/**
 * @ngdoc service
 * @name ep.embedded.apps.service:epEmbeddedAppsService
 * @description
 * service for the ep.feature.detection module
 * This service detects features available on the client
 *
 * @example
 *
 */
angular.module('ep.embedded.apps').service('epEmbeddedAppsShellService', [
    '$rootScope',
    '$location',
    '$log',
    '$timeout',
    'epEmbeddedAppsConstants',
    'epEmbeddedAppsProvider',
    'epUtilsService',
    function($rootScope, $location, $log, $timeout, epEmbeddedAppsConstants, epEmbeddedAppsProvider, epUtilsService) {
        var epShellService;
        var fnGotoView;

        function loadIfReady(fn) {
            if (epEmbeddedAppsProvider.state && epEmbeddedAppsProvider.state.loadComplete) {
                fn();
            } else {
                $timeout(function() {
                    loadIfReady(fn);
                }, 250);
            }
        }

        function init() {
            epShellService = epUtilsService.getService('epShellService');
            if (epShellService) {
                $rootScope.$on(epEmbeddedAppsConstants.CONFIG_LOADED_EVENT, function(event, data) {
                    fnGotoView = data.goToView;
                    setupShellConfigs(data.configs);
                });

                $rootScope.$on(epEmbeddedAppsConstants.APPLICATION_LOADED_EVENT, function(event, data) {
                    var scope = data.scope;
                    var config = scope.appConfig;
                    if (config.name) {
                        epShellService.setPageTitle(config.name);
                    }
                    //save shell state on entering into embedded app and then call restore on exit
                    epShellService.saveState();
                    setupApplicationShellOptions(scope, config);
                });

                $rootScope.$on(epEmbeddedAppsConstants.APPLICATION_EXIT_EVENT, function() {
                    epShellService.restoreState();
                });

                $rootScope.$on(epEmbeddedAppsConstants.VIEW_LOADED_EVENT, function(event, data) {
                    var scope = data.scope;
                    var config = scope.appConfig;
                    var view = config.views[data.viewId];
                    if (view) {
                        loadIfReady(function() {
                            setupViewShellOptions(scope, config, view);
                        });
                    }
                });
            }
        }

        function setupApplicationShellOptions($scope, config) {
            if (config.epShellNavBar) {
                if (config.epShellNavBar.hideHostButtons) {
                    epShellService.updateNavbarButtons([]);
                }
                if (config.epShellNavBar.closeButton) {
                    var btn = config.epShellNavBar.closeButton;
                    epShellService.addNavbarButtons([
                        {
                            id: btn.id || 'ep.embedded.app_closeApp',
                            title: btn.title || 'Close application and return home.',
                            icon: btn.icon || 'fa-times',
                            action: function() {
                                $location.url('/home');
                            }
                        }]);
                }
            }
        }

        function setupViewShellOptions($scope, config, view) {
            // for backwards compat
            if (view.sidebarOptions && !view.sidebarSettings) {
                view.sidebarSettings = view.sidebarOptions;
            }
            // inject the new sidebar template
            if (view.sidebarSettings) {
                epShellService.disableLeftSidebar();
                if (view.sidebarSettings.left) {
                    epShellService.enableLeftSidebar();
                    if (view.sidebarSettings.left.templateUrl) {
                        var leftSidebarUrl = $scope.embeddedAppsService.getAppPath(config.id,
                            view.sidebarSettings.left.templateUrl);
                        epShellService.setLeftTemplate('<div ng-include="\'' + leftSidebarUrl + '\'"></div>');
                    } else if (view.sidebarSettings.left.template) {
                        epShellService.setLeftTemplate(view.sidebarSettings.left.template);
                    }
                }

                epShellService.disableRightSidebar();
                if (view.sidebarSettings.right) {
                    epShellService.enableRightSidebar();
                    if (view.sidebarSettings.right.templateUrl) {
                        var rightSidebarUrl = $scope.embeddedAppsService.getAppPath(config.id,
                            view.sidebarSettings.right.templateUrl);
                        epShellService.setRightTemplate('<div ng-include="\'' + rightSidebarUrl + '\'"></div>');
                    } else if (view.sidebarSettings.right.template) {
                        epShellService.setRightTemplate(view.sidebarSettings.right.template);
                    }
                }
            } else {
                epShellService.disableLeftSidebar();
                epShellService.disableRightSidebar();
            }
            if (view.viewSettings) {
                var viewSettings = view.viewSettings;
                var defaultBrandTarget = epEmbeddedAppsProvider.getAppRoute(config.id, config.startViewId);
                if (viewSettings.small) {
                    if (config.startupInShell && !viewSettings.small.brandTarget) {
                        viewSettings.small.brandTarget = defaultBrandTarget;
                    }
                    angular.forEach(viewSettings.small, function(val, key) {
                        epShellService.__state.viewSettings.small[key] = val;
                    });
                }
                if (viewSettings.large) {
                    if (config.startupInShell && !viewSettings.large.brandTarget) {
                        viewSettings.large.brandTarget = defaultBrandTarget;
                    }
                    angular.forEach(viewSettings.large, function(val, key) {
                        epShellService.__state.viewSettings.large[key] = val;
                    });
                }
                if (!viewSettings.small && !viewSettings.large) {
                    if (config.startupInShell && !viewSettings.brandTarget) {
                        viewSettings.brandTarget = defaultBrandTarget;
                    }
                    angular.forEach(viewSettings, function(val, key) {
                        epShellService.__state.viewSettings.small[key] = val;
                        epShellService.__state.viewSettings.large[key] = val;
                    });
                }
                epShellService.__setCurrentModeFlags();
            }
        }

        function setupShellConfigs(configs) {
            var appStartup;
            if (!epShellService.isHomeLocation()) {
                return;
            }
            if (configs) {
                //check if we need to add application buttons to shell Navigation Bar
                angular.forEach(configs, function(app) {
                    if (app.epShellNavBar && app.epShellNavBar.applicationButton) {
                        var btn = app.epShellNavBar.applicationButton;
                        epShellService.addNavbarButtons([
                            {
                                id: 'ep.embedded.app_' + app.id,
                                title: btn.title || app.name,
                                icon: btn.icon || app.icon,
                                action: function() {
                                    fnGotoView(app.id);
                                }
                            }]);
                    }
                    if (app.startupInShell) {
                        appStartup = app;
                    }
                });
            }
            if (appStartup) {
                fnGotoView(appStartup.id);
            }
        }

        function initialize() {
        }

        $timeout(function() {
            init();
        });

        return {
            initialize: initialize,
            setupShellConfigs: setupShellConfigs
        };
    }]);

'use strict';

/**
 * @ngdoc object
 * @name ep.embedded.apps.object:epEmbeddedAppsConstants
 * @description
 * Constants for epEmbeddedAppsConstants.
 * ep.embedded.apps constants
    * <pre>
    *      CONFIG_LOADED_EVENT - event when app package config has been loaded
    *      APPLICATION_LOADED_EVENT - event when package application has been loaded
    *      VIEW_LOADED_EVENT - event when app package view is loaded
    *      APPLICATION_EXIT_EVENT - event when app package application exits
    *  </pre>
 */
angular.module('ep.embedded.apps').constant('epEmbeddedAppsConstants', {
    CONFIG_LOADED_EVENT: 'EMBEDDED_CONFIG_LOADED_EVENT',
    APPLICATION_LOADED_EVENT: 'EMBEDDED_APPLICATION_LOADED_EVENT',
    VIEW_LOADED_EVENT: 'EMBEDDED_VIEW_LOADED_EVENT',
    APPLICATION_EXIT_EVENT: 'EMBEDDED_APPLICATION_EXIT_EVENT',
});

'use strict';
/**
     * @ngdoc directive
     * @name ep.modaldialog.directive:epmodaldialog
     * @restrict E
     *
     * @description
     * Represents the dialog pane (confirmation) directive. For internal use from epModalDialogService
     *
     */
angular.module('ep.embedded.apps').directive('epEmbeddedApps',
    /*@ngInject*/
    ['$document', '$log', '$rootScope', '$routeParams', '$location', '$timeout', 'epEmbeddedAppsService', 'epEmbeddedAppsCacheService', 'epEmbeddedAppsConstants', function(
        $document,
        $log,
        $rootScope,
        $routeParams,
        $location,
        $timeout,
        epEmbeddedAppsService,
        epEmbeddedAppsCacheService,
        epEmbeddedAppsConstants) {
        return {
            restrict: 'E',
            templateUrl: 'src/components/ep.embedded.apps/embedded-apps.html',
            link: function($scope) {
                var state = epEmbeddedAppsService.state;
                $scope.showSplash = false;

                function build(appId) {

                    var config = epEmbeddedAppsService.configs[appId];
                    if (config) {
                        var view;
                        if (state.viewId) {
                            view = config.views[state.viewId];
                        } else {
                            view = config.views[config.startViewId];
                        }
                        if (view) {
                            view.parent = config;
                            config.activeViewId = state.viewId;
                            $scope.currentView = view;

                            if (view.routeParams) {
                                // the routeParams are virtualized so that every param is named p0 through p5
                                // this is the collection of actual routeParam names
                                var params = view.routeParams.split('/').map(function(p) {
                                    return p.substring(1, p.length);
                                });

                                // reify the virtual parameters into the actual parameter names & values
                                var paramIdx = 0;
                                angular.forEach(params, function(p) {
                                    if (p) {
                                        $routeParams[p] = $routeParams['p' + paramIdx];
                                        delete $routeParams['p' + paramIdx];
                                        paramIdx++;
                                    }
                                });
                            }

                        }

                        if (!config.initialized && config.splash) {
                            $timeout(function() {
                                $scope.showSplash = true;
                            });
                            $scope.showApp = false;
                            var start = new Date();

                            $scope.onLoaderComplete = function() {
                                // show the splash screen for a minimum of 2 seconds...
                                var remaining = Math.max(2000 - (new Date() - start), 0);
                                config.initialized = true;

                                $timeout(function() {
                                    $scope.showSplash = false;
                                    $scope.showApp = true;
                                    $scope.$apply();
                                }, remaining);
                            };
                        } else {
                            $scope.showApp = true;
                            config.onComplete = null;
                            config.initialized = true;
                        }

                        $scope.appConfig = config;
                        $scope.embeddedAppsService = epEmbeddedAppsService;

                        if (config.isRunning !== true) {
                            config.isRunning = true; //flag that app is running
                            var appRoute = epEmbeddedAppsService.getAppRoute('');
                            if (!config.locationHdl) {
                                config.locationHdl = $rootScope.$on('$locationChangeStart', function() {
                                    if (config.locationHdl && $location.url().indexOf(appRoute) !== 0) {
                                        $rootScope.$on('$destroy', config.locationHdl);
                                        config.locationHdl = null;
                                        config.isRunning = false;
                                        $rootScope.$emit(epEmbeddedAppsConstants.APPLICATION_EXIT_EVENT, {
                                            scope: $scope,
                                            viewId: state.viewId
                                        });

                                        // Remove all of the stylesheets added by the embedded app.
                                        config.resources.links.forEach(function(url, idx) {
                                            var linkId = 'link_' + idx;
                                            var link = $document[0].getElementById(linkId);
                                            if (link) {
                                                $document[0].getElementsByTagName('head')[0].removeChild(link);
                                                $log.debug('Unloading link: ' + url);
                                            }
                                            epEmbeddedAppsCacheService.linkCache.remove(linkId);
                                        });

                                        $timeout(function() {
                                            $scope.$apply();
                                        });
                                    }
                                });
                            }

                            $timeout(function() {
                                $scope.$emit(epEmbeddedAppsConstants.APPLICATION_LOADED_EVENT, {
                                    scope: $scope,
                                    viewId: state.viewId
                                });
                                $scope.$apply();
                            });
                        }
                        $timeout(function() {
                            $scope.$emit(epEmbeddedAppsConstants.VIEW_LOADED_EVENT, {
                                scope: $scope,
                                viewId: state.viewId
                            });
                            $scope.$apply();
                        });
                    }
                }

                $rootScope.$watch(function() {
                    return epEmbeddedAppsService.state.loadComplete;
                }, function(complete) {
                    if (complete) {
                        state.appId = $routeParams.appId;
                        if ($routeParams.viewId) {
                            state.viewId = $routeParams.viewId;
                        }
                        build(state.appId);
                    }
                });
            }
        };
    }]);

'use strict';

/**
 * @ngdoc object
 * @name ep.shell.object:epShellConfig
 * @description
 * Provider for epShellConfig.
 * Gets configuration options from sysconfig.json or default
 */
angular.module('ep.embedded.apps')
    .service('epEmbeddedAppsCacheService', [
        '$cacheFactory',
        function($cacheFactory) {

            var scriptCache = $cacheFactory('scriptCache', {
                capacity: 200
            });

            var linkCache = $cacheFactory('linkCache', {
                capacity: 200
            });

            return {
                scriptCache: scriptCache,
                linkCache: linkCache
            };
        }])

    .provider('epEmbeddedAppsProvider', [
        '$controllerProvider',
        '$provide',
        '$compileProvider',
        '$filterProvider',
        function($controllerProvider, $provide, $compileProvider, $filterProvider) {
            var regModules = ['ng'];

            var sysconfig = {
                rootRoute: 'app',
                path: 'apps',
                provider: 'sysconfig',
                applications: [],
                hostAppModule: ''
            };

            var modules = {};
            var providers = {
                $controllerProvider: $controllerProvider,
                $compileProvider: $compileProvider,
                $filterProvider: $filterProvider,
                $provide: $provide
            };
            var moduleCache = [];

            moduleCache.push = function(value) {
                if (this.indexOf(value) === -1) {
                    Array.prototype.push.apply(this, arguments);
                }
            };

            function moduleExists(moduleName) {
                try {
                    angular.module(moduleName);
                } catch (e) {
                    if (/No module/.test(e)) {
                        return false;
                    }
                }
                return true;
            }

            function getRequires(module) {
                var requires = [];
                angular.forEach(module.requires, function(requireModule) {
                    if (regModules.indexOf(requireModule) === -1) {
                        requires.push(requireModule);
                    }
                });
                return requires;
            }

            function invoke($log, queue, providers) {
                var i;
                var ii;
                var invokeQueue;
                for (invokeQueue = queue, i = 0, ii = queue.length; i < ii; i++) {
                    var invokeArgs = queue[i];
                    var provider;

                    if (providers.hasOwnProperty(invokeArgs[0])) {
                        provider = providers[invokeArgs[0]];
                    } else {
                        return $log.error('unsupported provider ' + invokeArgs[0]);
                    }
                    var entityRegistrar = provider[invokeArgs[1]];
                    var entityArgs = invokeArgs[2];

                    entityRegistrar.apply(provider, entityArgs);
                }
            }

            function register($log, $injector, providers, registerModules) {
                var k;
                var moduleName;
                var moduleFn;
                if (registerModules) {
                    var runBlocks = [];

                    var hostAppDependencies = [];
                    if (sysconfig.hostAppModule) {
                        hostAppDependencies = getRequires(angular.module(sysconfig.hostAppModule));
                    }
                    providers.$injector = $injector;
                    for (k = registerModules.length - 1; k >= 0; k--) {
                        moduleName = registerModules[k];
                        if (angular.moduleRequiresLoading[moduleName] ||
                            (hostAppDependencies.length && hostAppDependencies.indexOf(moduleName) === -1)) {
                            regModules.push(moduleName);
                            moduleFn = angular.module(moduleName);
                            runBlocks = runBlocks.concat(moduleFn._runBlocks);
                            try {
                                invoke($log, moduleFn._invokeQueue, providers);
                                invoke($log, moduleFn._configBlocks, providers);
                            } catch (e) {
                                if (e.message) {
                                    e.message += ' from ' + moduleName;
                                }
                                $log.error(e.message);
                                throw e;
                            }

                            angular.moduleRequiresLoading[moduleName] = false;
                        }
                        registerModules.pop();
                    }

                    angular.forEach(runBlocks, function(fn) {
                        try {
                            $injector.invoke(fn);
                        } catch (e) {
                            $log.error(e);
                        }
                    });
                }
                return null;
            }

            function getAppPath() {
                var _args = _.flatten(arguments, true);
                var path = sysconfig.path;
                angular.forEach(_args, function(arg) {
                    path += '/' + arg;
                });
                return path;
            }

            function getAppRoute() {
                var _args = _.flatten(arguments, true);
                var route = '/' + sysconfig.rootRoute;
                angular.forEach(_args, function(arg) {
                    route += '/' + arg;
                });
                return route;
            }

            var activeConfig;

            function getAppPackageService(config, $timeout) {
                // this active config switching needs work-- it's causing a problem where the wrong application is routed to. see EMA-855
                activeConfig = config;
                return ['$location', function appPackageService($location) {
                    var data = {};

                    function getLocalAppPath() {
                        return getAppPath(activeConfig.id, arguments);
                    }

                    function getLocalAppRoute() {
                        return getAppRoute(activeConfig.id, arguments);
                    }

                    function goToView(viewId) {
                        $location.url(getLocalAppRoute(viewId));
                    }

                    function executeResource(method, name, value, cacheKey, reload) {
                        if (cacheKey !== undefined && cacheKey !== null && !reload && data[cacheKey]) {
                            return $timeout(function() {
                                return data[cacheKey];
                            });
                        }
                        //var url = settings.appServerUrl + 'api/' + name;
                        //return $http[method](url, value).then(function(result) {
                        //    if (cacheKey !== undefined && cacheKey !== null) {
                        //        data[cacheKey] = result.data;
                        //    }
                        //    return result.data;
                        //});
                    }

                    var resource = {
                        get: function(name, cacheKey, reload) {
                            return executeResource('get', name, '', cacheKey, reload);
                        },

                        post: function(name, value, cacheKey, reload) {
                            return executeResource('post', name, value, cacheKey, reload);
                        },

                        put: function(name, value, cacheKey, reload) {
                            return executeResource('put', name, value, cacheKey, reload);
                        },

                        'delete': function(name, value, cacheKey, reload) {
                            return executeResource('delete', name, '', cacheKey, reload);
                        }
                    };

                    function getConfig() {
                        return activeConfig;
                    }

                    return {
                        getConfig: getConfig,
                        resource: resource,
                        data: data,
                        goToView: goToView,
                        getAppPath: getLocalAppPath,
                        getAppRoute: getLocalAppRoute
                    };

                }];
            }

            var state = {
                loadComplete: false
            };

            this.$get = [
                '$timeout', '$document', '$http', '$injector', '$log', '$q',
                'epEmbeddedAppsCacheService', 'epSysConfig', 'epUtilsService',
                function($timeout, $document, $http, $injector, $log, $q,
                         epEmbeddedAppsCacheService, epSysConfig, epUtilsService) {

                    function load(config) {
                        var deferredLoad = $q.defer();
                        var resourceId = 'module: ' + config.id;
                        modules[config.id] = config;

                        if (!config) {
                            var errorText = 'Module not configured';
                            $log.error(errorText);
                            throw errorText;
                        }

                        function loadLinks(urls, onLoadLink) {
                            urls.forEach(function(url, idx) {
                                var linkId = 'link_' + idx;
                                if (url && !epEmbeddedAppsCacheService.linkCache.get(linkId)) {
                                    var linkElement = $document[0].createElement('link');
                                    linkElement.setAttribute('id', linkId);
                                    linkElement.rel = 'stylesheet';
                                    linkElement.href = url;
                                    linkElement.type = 'text/css';
                                    $document[0].head.appendChild(linkElement);
                                    epEmbeddedAppsCacheService.linkCache.put(linkId, 1);

                                    $timeout(function() {
                                        onLoadLink('Link: ' + url);
                                    });
                                }
                            });
                        }

                        // Load all of the resources required by the app package
                        function loadResources(onLoadScript, onLoadLink, onLoadComplete) {
                            state.loadComplete = false;

                            // loads a list of scripts and resolves once they have all completed loading
                            function loadScriptList(list) {
                                var deferred = $q.defer();
                                var remaining = list.length;
                                if (remaining === 0) {
                                    deferred.resolve();
                                }
                                // decrement the remaining # of scripts and resolves once it reaches 0;
                                function dec() {
                                    remaining--;
                                    if (remaining < 1) {
                                        deferred.resolve();
                                    }
                                }

                                // queue up each script in the list
                                list.forEach(function(url) {
                                    epUtilsService.loadScript(url, epEmbeddedAppsCacheService.scriptCache).then(
                                        function(id) {
                                            onLoadScript(id);
                                        }).then(dec, dec);
                                });
                                return deferred.promise;
                            }

                            (function(orig) {
                                angular.moduleRequiresLoading = {};
                                angular.module = function() {
                                    if (arguments.length > 1) {
                                        angular.moduleRequiresLoading[arguments[0]] = true;
                                    }
                                    return orig.apply(null, arguments);
                                };
                            })(angular.module);
                            // Load all of the third party scripts first
                            var thirdPartyScripts = (config.resources.scripts.thirdParty || []).map(function(url) {
                                return getAppPath(config.id, url);
                            });
                            loadScriptList(thirdPartyScripts).then(function() {
                                // next get the module script syncronously
                                var url = config.resources.scripts.module;
                                if (url) {
                                    return epUtilsService.loadScript(
                                        getAppPath(config.id, url), epEmbeddedAppsCacheService.scriptCache).then(
                                        function(id) {
                                            onLoadScript(id);
                                        });
                                }
                            }).then(function() {
                                // finally load the rest of the app's scripts
                                var appScripts = config.resources.scripts.app.map(function(url) {
                                    return getAppPath(config.id, url);
                                });
                                return loadScriptList(appScripts);
                            }).then(onLoadComplete);

                            // load all of the css
                            var urls = config.resources.links.map(function(url) {
                                return getAppPath(config.id, url);
                            });
                            loadLinks(urls, onLoadLink);
                        }

                        function loadDependencies(moduleId, allDependencyLoad) {

                            if (regModules.indexOf(moduleId) > -1) {
                                return allDependencyLoad();
                            }

                            var loadedModule = angular.module(moduleId);
                            var requires = getRequires(loadedModule);

                            function onModuleLoad(moduleLoaded) {
                                if (moduleLoaded) {

                                    var index = requires.indexOf(moduleLoaded);
                                    if (index > -1) {
                                        requires.splice(index, 1);
                                    }
                                }
                                if (requires.length === 0) {
                                    $timeout(function() {
                                        allDependencyLoad(moduleId);
                                    });
                                }
                            }

                            var requireNeeded = getRequires(loadedModule);
                            angular.forEach(requireNeeded, function(requireModule) {

                                moduleCache.push(requireModule);

                                if (moduleExists(requireModule)) {
                                    return onModuleLoad(requireModule);
                                }

                                var requireModuleConfig = modules[requireModule];
                                if (requireModuleConfig) {
                                    loadResources(function() {

                                    }, function() {

                                    }, function() {
                                        loadDependencies(requireModule, function requireModuleLoaded(name) {
                                            onModuleLoad(name);
                                        });
                                    });
                                } else {
                                    $log.warn('module [' + requireModule + '] not loaded and not configured');
                                    onModuleLoad(requireModule);
                                }
                                return null;
                            });

                            if (requireNeeded.length === 0) {
                                onModuleLoad();
                            }
                            return null;
                        }

                        if (epEmbeddedAppsCacheService.scriptCache.get(resourceId)) {
                            $log.debug('AppPackage ' + config.id + ' already loaded.');
                            activeConfig = config;
                            deferredLoad.resolve(config.id);
                            // load all of the css links
                            // even though the module has already been loaded, we still need to reload the css
                            // since it gets removed from the page when the package is unloaded.
                            var urls = config.resources.links.map(function(url) {
                                return getAppPath(config.id, url);
                            });
                            loadLinks(urls, function(id) {
                                $log.debug('Loaded ' + id);
                            });
                        } else {

                            loadResources(
                                // onLoadScript
                                function(id) {
                                    $log.debug('Loaded ' + id);
                                },

                                //onLoadLink
                                function(id) {
                                    $log.debug('Loaded ' + id);
                                },

                                //onLoadComplete
                                function() {
                                    moduleCache.push(config.id);
                                    loadDependencies(config.id, function() {
                                        angular.module(config.id).factory('appPackageService',
                                            getAppPackageService(config, $timeout, $http));
                                        register($log, $injector, providers, angular.copy(moduleCache));
                                        epEmbeddedAppsCacheService.scriptCache.put(resourceId, config);
                                        $timeout(function() {
                                            deferredLoad.resolve(config.id);
                                            state.loadComplete = true;
                                        });
                                    });
                                });
                        }
                        return deferredLoad.promise;
                    }

                    function getConfig() {
                        epSysConfig.mergeSection('ep.embedded.apps', sysconfig);

                        if (!sysconfig.path) {
                            sysconfig.path = 'apps';
                        }
                        if (!sysconfig.rootRoute) {
                            sysconfig.rootRoute = 'app';
                        }
                        return sysconfig;
                    }

                    sysconfig = getConfig();

                    return {
                        settings: sysconfig,
                        load: load,
                        modules: modules,
                        getAppPath: getAppPath,
                        getAppRoute: getAppRoute,
                        state: state
                    };
                }];
        }
    ]);

'use strict';
/**
 * @ngdoc service
 * @name ep.embedded.apps.service:epEmbeddedAppsService
 * @description
 * service for the ep.feature.detection module
 * This service detects features available on the client
 *
 * @example
 *
 */
angular.module('ep.embedded.apps').service('epEmbeddedAppsService', [
    '$rootScope',
    '$http',
    '$q',
    '$log',
    '$location',
    '$window',
    'epUtilsService',
    'epEmbeddedAppsProvider',
    'epEmbeddedAppsConstants',
    'epEmbeddedAppsShellService',
    'epEmbeddedAppsCacheService',
    function($rootScope, $http, $q, $log, $location, $window, epUtilsService,
        epEmbeddedAppsProvider, epEmbeddedAppsConstants, epEmbeddedAppsShellService, epEmbeddedAppsCacheService) {

        var configs = {};
        var state = {
            appId: '',
            viewId: '',
            loaded: false
        };

        var packages = [];
        var loadedCount = 0;

        function initialize(forceConfigureShell) {
            var deferred = $q.defer();
            epUtilsService.wait(
            function() {
                return state.loading !== true;
            }, 30, 250,
            function() {
                loadConfigurations(forceConfigureShell).then(function(result) {
                    deferred.resolve(result);
                });
            });
            return deferred.promise;
        }

        function loadConfigurations(forceConfigureShell) {
            var deferred = $q.defer();

            packages = [];
            loadedCount = 0;

            // We only ever want to load the configuration files once, so check if it's already loaded
            if (state.loadComplete) {
                if (forceConfigureShell === true) {
                    setupShellOnStartup();
                }
                deferred.resolve(true);
            } else {
                loadConfigurationsFromService(deferred);
            }

            return deferred.promise;
        }

        function getAppsFromConfig() {
            var ret = {
                Success: true,
                apps: epEmbeddedAppsProvider.settings.applications
            };

            var deferred = $q.defer();
            deferred.resolve(ret);
            return deferred.promise;
        }

        function getApplications() {
            var provider = epEmbeddedAppsProvider.settings.provider;
            if (provider && provider !== 'sysconfig') {
                var customProvider = epUtilsService.getService(provider);
                if (customProvider) {
                    return customProvider.getApps();
                }
                return [];
            }
            return getAppsFromConfig();
        }

        function loadStartupService(config) {
            var deferred = $q.defer();
            var url = null;
            if (epUtilsService.hasProperty(config, 'resources.scripts.startup')) {
                url = epEmbeddedAppsProvider.getAppPath(config.id, config.resources.scripts.startup);
            }
            if (!(url && config.resources.scripts.startup)) {
                deferred.resolve(true);
            } else {
                epUtilsService.loadScript(url, epEmbeddedAppsCacheService.scriptCache).
                   then(function() {
                       try {
                           var injector = angular.injector([config.id + '-startup', 'ng', 'ngRoute']);
                           var svc = injector.get('appStartupService');
                           if (svc) {
                               config.state.startupService = svc;
                           }
                       } catch (e) {
                           $log.warn(
                               'startup service [appStartupService] was not executed for embedded application: ' +
                               config.id);
                       }
                       deferred.resolve(true);
                   }, function() {
                       $log.warn(
                           'startup service [appStartupService] was not loaded for embedded application: ' +
                           config.id);
                       deferred.resolve(false);
                   });
            }

            return deferred.promise;
        }

        function loadConfigurationsFromService(deferred) {
            state.loading = true;
            var svc = epUtilsService.getService('epEmbeddedAppsService');

            getApplications('config').then(function(data) {
                try {
                    if (data && data.Success) {
                        packages = data.apps;
                        loadedCount = 0;
                        packages.forEach(function(pkg) {
                            var appPkgPath = epEmbeddedAppsProvider.getAppPath(pkg, 'AppPackage.json');
                            $http.get(appPkgPath).then(function(response) {
                                var config = response.data;
                                $log.debug('Parsing AppPackage.config file: ' + appPkgPath);
                                config.state = {}; //to keep all internal stuff
                                configs[config.id] = config;
                                $log.debug('AppPackage name: ' + config.name);
                                var tileSize = config.tileSize ? config.tileSize.split('x') : ['2', '1'];
                                if (tileSize && tileSize.length === 2) {
                                    var sizes = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
                                        'eight', 'nine', 'ten'];
                                    try {
                                        config.tileSize = {
                                            width: parseInt(tileSize[0]),
                                            height: parseInt(tileSize[1])
                                        };
                                        config.tileClass = (sizes[config.tileSize.width] || 'two') + '-wide ' +
                                            (sizes[config.tileSize.height] || 'one') + '-tall';
                                    } catch (e) {
                                        $log.warn('Invalid value in tileSize property: ' + config.tileSize);
                                    }
                                }

                                //Provide easy access to embedded apps service from app packages
                                //mostly needed for startup script
                                config.epEmbeddedAppsService = svc;

                                //Set default menu (unless disabled)
                                if (!config.menu || config.menu.disabled !== true) {
                                    config.state.menu = {
                                        caption: 'root',
                                        menuitems: [
                                            {
                                                caption: config.name,
                                                description: config.description || config.name,
                                                id: 'pkg_' + config.id,
                                                _id: 'pkg_' + config.id,
                                                version: config.version || '',
                                                action: function() {
                                                    if (config.launchInTab) {
                                                        var url = './Index.html#' +
                                                            getAppRoute(config.id, config.startViewId, '');
                                                        $window.open(url);
                                                    } else {
                                                        goToView(config.id);
                                                    }
                                                }
                                            }
                                        ]
                                    };
                                }

                                loadStartupService(config).then(function() {
                                    // construct an object out of the view array so that views can be accessed
                                    // by ID without having to search through the array for them
                                    config.views = epUtilsService.mapArray(config.views, 'id');
                                    config.initialized = false;
                                    increment(deferred);
                                });
                            },
                                function(err) {
                                    increment(deferred);
                                    $log.error('Failed retrieving AppPackage.config file: ' + appPkgPath);
                                    $log.error(err);
                                });
                        });
                        state.loadComplete = !packages.length;
                    } else {
                        $log.warn('Unable to load app package definition files.');
                    }

                } catch (ex) {
                    state.loading = false;
                    $log.error(ex);
                    deferred.reject(ex);
                }
            });
        }

        // tracks the number of configuration files to load,
        // and resolves the promise once they're all done
        function increment(deferred) {

            if (++loadedCount === packages.length) {
                $rootScope.$emit(epEmbeddedAppsConstants.CONFIG_LOADED_EVENT, {
                    configs: configs,
                    goToView: goToView
                });

                state.loading = false;
                state.loadComplete = true;
                deferred.resolve(true);
            }
        }

        function getAppPath() {
            return epEmbeddedAppsProvider.getAppPath(arguments);
        }

        function getAppRoute() {
            return epEmbeddedAppsProvider.getAppRoute(arguments);
        }

        function goToView(configId, viewId) {
            var config = configs[configId];
            if (config) {
                $location.url(getAppRoute(config.id, viewId || config.startViewId));
            }
        }

        function setupShellOnStartup() {
            epEmbeddedAppsShellService.setupShellConfigs(configs);
        }

        //------------ Startup Menu ---------->

        function traverseMenu(root, prefixId) {
            if (root.id) {
                root._id = prefixId + root.id;
            }
            angular.forEach(root, function(item) {
                if (item.id) {
                    item._id = prefixId + item.id;
                }
            });
            if (root.menuitems) {
                traverseMenu(root.menuitems, prefixId);
            }
        }

        function afterSvcMenu(config, menu, merge, deferred, process) {
            config.state.menu = menu;
            if (menu) {
                traverseMenu(config.state.menu, 'pkg_' + config.id + '_');
                merge.push(config.state.menu);
            }
            process.menuToComplete--;
            if (process.menuToComplete < 1) {
                deferred.resolve(merge);
            }
        }

        /**
        * @ngdoc method
        * @name retrieveAppsMenu
        * @methodOf ep.embedded.apps.service:epEmbeddedAppsService
        * @public
        * @description
        * Retrieves (collects) menu from all embedded aplications.
        * @returns {object} a promise of array with menus from all embedded aplications
        */
        function retrieveAppsMenu() {
            var merge = [];
            var configsMenuStartup = [];

            var deferred = $q.defer();

            if (!state.loadComplete) {
                 epUtilsService.wait(
                    function() {
                        return state.loadComplete;
                    }, 30, 250,
                    function() {
                        retrieveAppsMenu().then(function(result) {
                            deferred.resolve(result);
                        });
                    });
                return deferred.promise;
            }

            angular.forEach(configs, function(config) {
                if (!config.menu || config.menu.disabled !== true) {
                    if (config.state.startupService && config.state.startupService.getMenu) {
                        configsMenuStartup.push(config);
                    } else if (config.state.menu) {
                        merge.push(config.state.menu);
                    }
                }
            });

            if (configsMenuStartup && configsMenuStartup.length) {
                var process = { menuToComplete: configsMenuStartup.length };
                angular.forEach(configsMenuStartup, function(config) {
                    var menu = config.state.startupService.getMenu(config);
                    if (menu) {
                        if (menu.then) {
                            menu.then(function(result) {
                                afterSvcMenu(config, result, merge, deferred, process);
                                $log.debug('Retrieved menu from app package: ' + config.id);
                                var menuCount = (
                                    result &&
                                    result.Menu &&
                                    result.Menu.menuitems ? result.Menu.menuitems.length : 0);
                                $log.debug('Found ' + menuCount + ' root menu items');
                            });
                        } else {
                            afterSvcMenu(config, menu, merge, deferred, process);
                        }
                    }
                });
            } else {
                deferred.resolve(merge);
            }
            return deferred.promise;
        }

        /**
        * @ngdoc method
        * @name currentAppsMenu
        * @methodOf ep.embedded.apps.service:epEmbeddedAppsService
        * @public
        * @description
        * Returns currently loaded menu from all embedded applications
        * @returns {Array} array of menus from all embedded applications
        */
        function currentAppsMenu() {
            var merge = [];
            angular.forEach(configs, function(config) {
                if (config.state.menu) {
                    merge.push(config.state.menu);
                }
            });
            return merge;
        }

        /**
        * @ngdoc method
        * @name buildAppViewsMenu
        * @methodOf ep.embedded.apps.service:epEmbeddedAppsService
        * @public
        * @description
        * Build menu with menu items for each view of the specified application
        * @param {object} config - the config of specified app
        * @param {bool} all - add all views (not just the ones with captions)
        * @returns {Array} array of object with Menu
        */
        function buildAppViewsMenu(config, all) {
            // build navigation
            var ret = [];
            if (config && config.views) {
                var menuItems = [];
                angular.forEach(config.views, function(view) {
                    if (view.caption || all) {
                        var c = all ? (view.caption || view.name || view.id) : view.caption;
                        menuItems.push({
                            id: 'pkg_' + config.id + '_' + view.id,
                            _id: 'pkg_' + config.id + '_' + view.id,
                            caption: c,
                            description: view.description,
                            icon: view.icon || 'fa fa-list-alt',
                            color: view.tileColor,
                            action: function() {
                                goToView(config.id, view.id);
                            }
                        });
                    }
                });
                var menu = {};
                if (menuItems.length) {
                    menu = {
                        caption: 'root',
                        id: 'root',
                        menuitems: [
                            {
                                caption: config.name,
                                id: 'pkg_' + config.id,
                                menuitems: menuItems
                            }
                        ]
                    };
                } else if (!config.menu || config.menu.disabled !== true) {
                    menu = config.state.menu;
                }
                ret = {
                    Menu: menu
                };
            }
            return ret;
        }

        return {
            initialize: initialize,
            state: state,
            loadConfigurations: loadConfigurations,
            configs: configs,
            getAppPath: getAppPath,
            getAppRoute: getAppRoute,
            setupShellOnStartup: setupShellOnStartup,
            currentAppsMenu: currentAppsMenu,
            retrieveAppsMenu: retrieveAppsMenu,
            buildAppViewsMenu: buildAppViewsMenu,
            goToView: goToView
        };
    }]);

//# sourceMappingURL=emf.embedded.apps.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/ep.embedded.apps/embedded-apps.html',
    "<div id=appHost><div id=splash ng-if=appConfig.splash ng-show=showSplash ep-animation options=appConfig.splash.transition><div id=splashContainer ng-include=\"getEmbeddedAppPath(appConfig.id, appConfig.splash.templateUrl)\"></div></div><div id=appContent ng-show=showApp ep-animation options=currentView.transition><ep-embedded-apps-loader config=appConfig on-complete=onLoaderComplete()></ep-embedded-apps-loader></div></div>"
  );

}]);
