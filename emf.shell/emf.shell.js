/*
 * emf (Epicor Mobile Framework) 
 * version:1.0.12-dev.381 built: 30-06-2017
*/

if (typeof __ep_build_info === "undefined") {var __ep_build_info = {};}
__ep_build_info["shell"] = {"libName":"shell","version":"1.0.12-dev.381","built":"2017-06-30"};

if (!epEmfGlobal) {
    var epEmfGlobal = {
        epModules: [],

        initialize: function() {
            (function(orig) {
                angular.module = function() {
                    if (arguments.length > 1 && arguments[0].indexOf('ep.') === 0) {
                        epEmfGlobal.epModules.push(arguments[0]);
                    }
                    return orig.apply(null, arguments);
                }
            })(angular.module);
        }
    };
    epEmfGlobal.initialize();
}

/**
 * @ngdoc overview
 * @name ep.templates
 * @description
 * This module provides the stub to inject HTML templates.
 * The ngtemplates grunt task will build the HTML templates into $templateCache against the named module.
 */
(function() {
   'use strict';
    angular.module('ep.templates', []);
})();

/**
 * @ngdoc overview
 * @name ep.theme
 * @description
 * This service returns a list of themes installed in the \css\themes directory
 */
(function() {
    'use strict';

    angular.module('ep.sysconfig', []);
})();

/**
 * @ngdoc overview
 * @name ep.utils
 * @description
 * Provides emf utilities
 */
(function() {
    'use strict';
    angular.module('ep.utils', []);
})();

/**
 * @ngdoc overview
 * @name ep.application
 * @description
 * Contains some basic information about the application
 */
(function() {
    'use strict';

    angular.module('ep.application', [
        'ep.templates',
        'ep.sysconfig'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.feature.detection
 * @description
 * This module detects features available on the client.
 */
(function() {
    'use strict';

    angular.module('ep.feature.detection', [
    'ep.templates'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.local.storage
 * @description
 * Provides local storage property bag
 */
(function() {
    'use strict';

    angular.module('ep.local.storage', [
        'ep.sysconfig'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.theme
 * @description
 * This service returns a list of themes installed in the \css\themes directory
 */
(function() {
    'use strict';

    angular.module('ep.theme', [
        'ep.templates',
        'ep.local.storage',
        'ep.sysconfig',
        'ep.application'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.viewmodal
 * @description
 * Provides a view modal dialog inside of a view that will not change the route.
 */
(function() {
    'use strict';

    angular.module('ep.viewmodal', [
        'ep.templates',
        'ep.sysconfig'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.drag.drop
 * @description
 * Provides emf drag drop capability
 * HTML 5 provides native drag and drop functionality. In most cases the functionality provided by this API is enough
 *  to stick with default API. But if we look at angularjs directives we can find that it provides a number of façade
 *  directives that makes easier implementing some feature and makes code shorter and elegant. So our first intention
 *  was to create simple directive that can add corresponding attributes and attach event handlers in the background
 *  and make it easier for developer to add features in declarative way – assign ep-draggable attribute and make some
 *  element draggable. Of course we can use html5 draggable attribute and make element draggable, but, there is one
 *  more reason to use our implementation. HTML5 provides dataTransfer object for storing information about current
 *  operation and pass values to drop handlers. But, this objects is string based key/value store. So we can’t store
 *  objects in this store. In my opinion it’s bad because it adds additional amount of work for serializing and
 *  deserializing of objects. And in some cases it can be very inefficient when we have collection of objects as value
 *  of some property of serializing object.
 */
(function() {
    'use strict';

    angular.module('ep.drag.drop', [
        'ep.templates'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.include
 * @description
 * A generic directive that allows to include HTML (or file with HTML) template anywhere with additional options of running in own or given scope and passing a controller function
 */
(function() {
    'use strict';

    angular.module('ep.include', [
        'ep.templates'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.console
 * @description
 * This is the module that provides access to log entries displayed in a console dialog.
 */
(function() {
    'use strict';

    angular.module('ep.console', [
        'ep.templates',
        'ep.sysconfig'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.modaldialog
 * @description
 * This module provides access to all the modal dialog services.
 */
(function() {
    'use strict';

    angular.module('ep.modaldialog', ['ep.templates']);
})();

/**
 * @ngdoc overview
 * @name ep.shell
 * @description
 * Provides epicor shell
 */
(function() {
    'use strict';

    angular.module('ep.shell', [
        'ngRoute',
        'ngAnimate',
        'ui.bootstrap',
        'ep.templates',
        'ep.feature.detection',
        'ep.local.storage',
        'ep.include',
        'ep.theme',
        'ep.utils',
        'ep.sysconfig',
        'ep.application',
        'ep.modaldialog',
        'ep.console'
    ]);
})();

/**
 * @ngdoc object
 * @name ep.sysconfig.config:epSysConfig
 * @description
 * Provider for epSysConfig.
 * Gets configuration options from sysconfig.json
 */
(function() {
    'use strict';

    angular.module('ep.sysconfig').provider('epSysConfig',
    function() {
        var jsonReadStatus;
        var sysconfig = {};

        //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
        //In our case, the "service" is the environment configuration object
        //The $get is called automatically when AngularJS encounters a DI.
        //
        // also knowing despite the (use $http instead of $.ajax) rules on the EMF coders styleguide
        // There is a problem: $http is an asynchronous call, so its not guaranteed that the
        // data will be returned with the values read from the sysconfig.json.
        // To get around we have to make $http a sync call, which is not possible.
        this.$get = ['$log', function($log) {
            var q = $.ajax({
                type: 'GET',
                url: 'sysconfig.json',
                cache: false,
                async: false,
                contentType: 'application/json'
            });

            jsonReadStatus = q.status;
            if (q.status === 200) {
                try {
                    sysconfig = angular.fromJson(q.responseText);
                }
                catch (e) {
                    $log.warn('Error parsing sysconfig: ' + e.message);
                }
            }

            /**
            * @ngdoc method
            * @name optionBool
            * @methodOf ep.sysconfig.config:epSysConfig
            * @public
            * @description
            * Return section of sysconfig requested by id
            * @param {string} id - section id/name
            */
            function section(id) {
                if (sysconfig.hasOwnProperty(id)) {
                    return sysconfig[id];
                }
                return undefined;
            }

            /**
            * @ngdoc method
            * @name optionBool
            * @methodOf ep.sysconfig.config:epSysConfig
            * @public
            * @description
            * Get boolean value of an option
            * @param {bool} optionValue - raw option value
            * @param {bool} defaultValue - default value if option is undefined
            */
            function optionBool(optionValue, defaultValue) {
                if (optionValue === true || optionValue === false) {
                    return optionValue;
                }
                return defaultValue;
            }

            /**
            * @ngdoc method
            * @name mergeSection
            * @methodOf ep.sysconfig.config:epSysConfig
            * @public
            * @description
            * Merge section of sysconfig requested by id into passed config object
            * Return sysconfig section
            * @param {string} id - section id/name
            * @param {object} config - config object into which to merge requested section
            */
            function mergeSection(id, config) {
                var ret;
                if (sysconfig.hasOwnProperty(id)) {
                    ret = sysconfig[id];
                    if (config) {
                        copyProperties(sysconfig[id], config);
                    }
                }
                return ret;
            }

            /**
            * @ngdoc method
            * @name copyProperties
            * @methodOf ep.sysconfig.config:epSysConfig
            * @public
            * @description
            * Copies properties from source to dest
            * The property is copied only if source property is not null
            * This is useful to copy new properties values over default object
            * but only when new property is provided.
            * @returns {object} copied object
            */
            function copyProperties(source, dest) {
                if (!source || !dest) {
                    return;
                }
                angular.forEach(source, function(value, propName) {
                    if (source[propName] !== null) {
                        if (angular.isArray(source[propName])) {
                            dest[propName] = source[propName];
                        } else if (angular.isObject(source[propName])) {
                            if (!angular.isObject(dest[propName])) {
                                dest[propName] = {};
                            }
                            copyProperties(source[propName], dest[propName]);
                        } else {
                            dest[propName] = source[propName];
                        }
                    }
                });
            }

            return {
                sysconfig: sysconfig,
                section: section,
                mergeSection: mergeSection,
                optionBool: optionBool,
                copyProperties: copyProperties
            };
        }];
    });
})();

/**
 * @ngdoc object
 * @name ep.utils.object:utilsConfig
 * @description
 * Provider for utilsConfig.
 * Gets configuration options from sysconfig.json or default
 */
(function() {
    'use strict';

    angular.module('ep.utils').provider('utilsConfig',
    function() {
        var config = {
            /**
            * @ngdoc property
            * @name debug
            * @propertyOf ep.utils.object:utilsConfig
            * @public
            * @description
            * Represents the debug mode
            */
            debug: false,
        };

        //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
        //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
        //In our case, the "service" is the environment configuration object
        //The $get is called automatically when AngularJS encounters a DI.
        //
        //we use the epSysConfig provider to perform the $http read against sysconfig.json
        this.$get = ['epSysConfig', function(epSysConfig) {
            epSysConfig.mergeSection('ep.utils', config);
            return config;
        }];
    });
})();

/**
 * Created by brent on 4/28/16.
 */
(function() {
    'use strict';
    // TODO: Implement commentary
    angular.module('ep.utils').filter('tel', function() {
        return function(tel) {
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country;
            var area;
            var number;

            switch (value.length) {
                case 10: // +1PPP####### -> C (PPP) ###-####
                    country = 1;
                    area = value.slice(0, 3);
                    number = value.slice(3);
                    break;

                case 11: // +CPPP####### -> CCC (PP) ###-####
                    country = value[0];
                    area = value.slice(1, 4);
                    number = value.slice(4);
                    break;

                case 12: // +CCCPP####### -> CCC (PP) ###-####
                    country = value.slice(0, 3);
                    area = value.slice(3, 5);
                    number = value.slice(5);
                    break;

                default:
                    return tel;
            }

            if (country === 1) {
                country = '';
            }

            number = number.slice(0, 3) + '-' + number.slice(3);

            return (country + ' (' + area + ') ' + number).trim();
        };
    });
})();

/**
 * @ngdoc service
 * @name ep.utils.service:epUtilsService
 * @description
 * Provides Epicor Mobile Framework Utility functions
 *
 * @example
 *       var str = epUtilsService.strFormat('The first name is: {0} and the last name {1}','Michael','Jackson');
 *       //results in 'The first name is: Michael and the last name Jackson'
 *
 */
(function() {
    'use strict';
    epUtilsService.$inject = ['$document', '$log', '$q', '$timeout'];
    angular.module('ep.utils')
        .service('epUtilsService', epUtilsService);
    /*@ngInject*/
    function epUtilsService($document, $log, $q,  $timeout) {
        /**
         * @ngdoc method
         * @name strFormat
         * @methodOf ep.utils.service:epUtilsService
         * @public
         * @description
         * Formats the string in the same way as .NET strFormat('first argument is {0}, second is {1}', 'arg1', 'arg2')
         * will result in 'first argument is arg1, second is arg2'
         * @example
         *   var str = epUtilsService.strFormat('The first name is: {0} and the last name {1}','Michael','Jackson');
         * @returns {string} string with combined arguments
         */
        function strFormat(str) {
            if (!str || arguments.length < 1) {
                return '';
            }
            var ret = str;
            if (arguments.length > 1) {
                var tempArgs = arguments;
                ret = ret.replace(/\{\d+}/g, function(match) {
                    var index = +match.slice(1, -1);
                    var arg = null;

                    if (index + 1 < tempArgs.length) {
                        arg = tempArgs[index + 1];
                    }
                    return arg;
                });
            }
            return ret;
        }

        /**
         * @ngdoc method
         * @name supportsDragAndDrop
         * @methodOf ep.utils.service:epUtilsService
         * @public
         * @description
         * Constructs an object out of an array by using
         * the idAccessor to map each item to a property name.
         * The idAccessor can be either a string or a function.
         * If it's a string then it must refer to a property name
         * that exists on each item of the array.
         * If it's a function then the function must exist on each
         * item of the array. The result of the property/function
         * must yield either a unique string value or a function that yields
         * a unique string value for each item of the array.
         * @returns {object} return a map object
         */
        function mapArray(arr, idAccessor) {
            var result = {};
            arr.forEach(function(obj) {
                var id;
                var idVal;

                if (angular.isString(idAccessor)) {
                    idVal = obj[idAccessor];
                } else if (angular.isFunction(idAccessor)) {
                    idVal = idAccessor(obj);
                } else {
                    throw new Error('mapArray called with an invalid idAccessor.');
                }
                if (angular.isFunction(idVal)) {
                    id = idVal();
                } else {
                    id = idVal;
                }
                result[id] = obj;
            });
            return result;
        }

        /**
         * @ngdoc method
         * @name copyProperties
         * @methodOf ep.utils.service:epUtilsService
         * @public
         * @description
         * Copies properties from source to destination
         * The property is copied only if source property is not null
         * This is useful to copy new properties values over default object
         * but only when new property is provided.
         * @param {object} source - object source from which properties are copied
         * @param {object} destination - object target to which properties are copied
         * @param {boolean} override - if false, then existing properties in source are not overriden
         * @returns {object} copied object
         */
        function copyProperties(source, destination, override) {
            if (!source || !destination) {
                return source || destination;
            }
            angular.forEach(source, function(value, propName) {
                if (source[propName] !== null) {
                    if (angular.isArray(source[propName])) {
                        destination[propName] = source[propName];
                    } else if (angular.isObject(source[propName])) {
                        if (!angular.isObject(destination[propName])) {
                            destination[propName] = {};
                        }
                        copyProperties(source[propName], destination[propName], override);
                    } else {
                        if (override !== false || (destination[propName] === undefined)) {
                            destination[propName] = source[propName];
                        }
                    }
                }
            });
        }

        /**
         * @ngdoc method
         * @name ensureStartsWith
         * @methodOf ep.utils.service:epUtilsService
         * @public
         * @description
         * Ensures that a string starts with a given beginning
         * @returns {string} result
         * @example
         *       var str = epUtilsService.ensureStartsWith('root','/');
         *       //results in '/root'

         */
        function ensureStartsWith(beginning, str) {
            if (str && str.indexOf(beginning) !== 0) {
                return beginning + str;
            }
            return str || '';
        }

        /**
         * @ngdoc method
         * @name ensureEndsWith
         * @methodOf ep.utils.service:epUtilsService
         * @public
         * @description
         * Ensures that a string ends with a given ending
         * @returns {string} result
         * @example
         *       var str = epUtilsService.ensureEndsWith('root','/');
         *       //results in 'root/'

         */
        function ensureEndsWith(str, ending) {
            if (str && str.lastIndexOf(ending) !== str.length - ending.length) {
                return str + ending;
            }
            return str || '';
        }

        /**
         * @ngdoc method
         * @name makePath
         * @methodOf ep.utils.service:epUtilsService
         * @public
         * @description
         * Creates path by concatenation of input arguments which can be strings, array of
         * strings or arguments object passed from another function
         * @returns {string} path
         * @example
         *   var str = epUtilsService.makePath('root','dir1','dir2');
         *   //result: '/root/dir1/dir2'
         *
         *   var str = utilsService.makePath('root', ['dir1', 'dir2'], ['dir3', 'dir4'], 'dir5');
         *   //result: '/root/dir1/dir2/dir3/dir4/dir5';
         *
         */
        function makePath() {
            var path = '';
            var _args = _.flatten(arguments, true);
            if (_args && _args.length === 1 && angular.isObject(_args[0]) && _args[0].length === 0) {
                return path; //special case when caller passed arguments and arguments were empty
            }
            angular.forEach(_args, function(arg) {
                path += '/' + arg;
            });
            return path;
        }

        /**
         * @ngdoc method
         * @name loadScript
         * @methodOf ep.utils.service:epUtilsService
         * @public
         * @description
         * Adds a new script element to the page with the given url,
         * optionally checking/adding the script to a given cache
         * @returns {Promise} a promise that resolves or rejects depending on the result
         * of adding the script to the page.
         */
        function loadScript(url, cache) {
            var deferred = $q.defer();
            var scriptId = 'script:' + url;
            var scriptElement;
            if (url && cache.get(scriptId)) {
                deferred.resolve(scriptId + ' from cache');
            } else {
                scriptElement = $document[0].createElement('script');
                scriptElement.src = url;
                scriptElement.onload = function() {
                    deferred.resolve(scriptId);
                };
                scriptElement.onerror = function(e) {
                    $log.error('Error loading url: [' + url + ']');
                    deferred.reject(e, scriptId);
                };
                $document[0].documentElement.appendChild(scriptElement);
                cache.put(scriptId, 1);
            }

            return deferred.promise;
        }

        /**
         * @ngdoc method
         * @name hasProperty
         * @methodOf ep.utils.service:epUtilsService
         * @public
         * @description
         * Check if an object has a nested property. For
         * @param {object} obj - object whose nested property we want to check
         * @param {string} property - nested property. Nesting through dot. Eg. 'propA.propAA'
         * @returns {boolean} true if object has a nested property
         * @example
         *   var obj = { propA: { propAA: { propAAA: 'something' }}};
         *   var result = epUtilsService.hasProperty(obj,'propA.propAA.propAAA');
         *   //result: true
         */
        function hasProperty(obj, property) {
            var o = obj;
            if (!angular.isObject(obj)) {
                return false;
            }
            if (!angular.isString(property) || !property) {
                return false;
            }
            return !_.find(property.split('.'), function(prop) {
                var ret = o.hasOwnProperty(prop);
                if (ret) {
                    o = o[prop];
                }
                return !ret;
            });
        }

        /**
         * @ngdoc method
         * @name wait
         * @methodOf ep.utils.service:epUtilsService
         * @public
         * @description
         * Wait for a condition to be accomplished by performing iterative calls at
         * given interval. Alternative to deferred results.
         * @param {function} fnCondition - function that represents condition. Must return true/false
         * @param {int} attempts - how many max attempts can be performed
         * @param {int} interval - interval in ms between each new attempt
         * @param {function} fnExecute - function that is executed when condition is met
         * @param {function} fnFail - optional function that is executed when condition is not met after all attempts
         * @example
         *   wait( function() { return state; }, 10, 250, function() { alert('complete'); });
         */
        function wait(fnCondition, attempts, interval, fnExecute, fnFail) {
            attempts--;
            if (attempts >= 0) {
                if (fnCondition()) {
                    fnExecute();
                } else {
                    $timeout(function() {
                        wait(fnCondition, attempts, interval, fnExecute, fnFail);
                    }, interval);
                }
            } else if (fnFail) {
                fnFail();
            }
        }

        function baseMerge(dst, objs, deep) {
            for (var i = 0, ii = objs.length; i < ii; ++i) {
                var obj = objs[i];
                if (!_.isObject(obj) && !_.isFunction(obj)) {
                    continue;
                }
                var keys = _.union(Object.keys(obj), Object.keys(dst));
                for (var j = 0, jj = keys.length; j < jj; j++) {
                    var key = keys[j];
                    var src = obj[key];

                    if (deep && _.isObject(src)) {
                        if (_.isDate(src)) {
                            dst[key] = new Date(src.valueOf());
                        } else if (_.isRegExp(src)) {
                            dst[key] = new RegExp(src);
                        } else if (src.nodeName) {
                            dst[key] = src.cloneNode(true);
                        } else if (_.isElement(src)) {
                            dst[key] = src.clone();
                        } else if (_.isNull(src)) {
                            dst[key] = null;
                        } else if (_.isUndefined(src)) {
                            dst[key] = undefined;
                        } else {
                            if (!_.isObject(dst[key])) {
                                dst[key] = _.isArray(src) ? [] : {};
                            }
                            baseMerge(dst[key], [src], true);
                        }
                    } else {
                        dst[key] = src;
                    }
                }
            }

            return dst;
        }

        /**
         * @ngdoc method
         * @name merge
         * @methodOf ep.utils.service:epUtilsService
         * @public
         * @description
         * Deeply extends the destination object `dst` by copying own enumerable properties from the `src` object(s)
         * to `dst`. You can specify multiple `src` objects. If you want to preserve original objects, you can do so
         * by passing an empty object as the target: `var object = epUtilsService.merge({}, object1, object2)`. This
         * function differs from the angular.merge function in that undefined values in the source object will cause
         * the corresponding property in the dst object to be deleted/undefined.

         *
         * @param {Object} dst Destination object.
         * @returns {Object} Reference to `dst`.
         */
        function merge(dst) {
            return baseMerge(dst, Array.prototype.slice.call(arguments, 1), true);
        }

        /**
         * @ngdoc method
         * @name getService
         * @methodOf ep.utils.service:epUtilsService
         * @public
         * @description
         * Retrieve an angular injector for a specified service name
         * @param {string} name - name of injected service
         * @param {string} defer - if result is to be defered by timeout. Ocassionally needed
         *    when angular is not fully loaded.
         * @returns {Object} Returns requested service injector
         */
        function getService(name, defer) {
            var fn = function() {
                var ret;
                try {
                    ret = angular.element('html').injector().get(name);
                } catch (e) {
                    $log.error('Failed to retrieve requested service:' + name + '\nDetails:' + e.message);
                }
                return ret;
            };
            if (defer) {
                var deferred = $q.defer();
                $timeout(function() {
                    var svc = fn();
                    deferred.resolve(svc);
                });
                return deferred.promise;
            }
            return fn();
        }

        return {
            copyProperties: copyProperties,
            ensureEndsWith: ensureEndsWith,
            ensureStartsWith: ensureStartsWith,
            hasProperty: hasProperty,
            loadScript: loadScript,
            makePath: makePath,
            mapArray: mapArray,
            merge: merge,
            strFormat: strFormat,
            wait: wait,
            getService: getService
        };
    }
})();

/**
 * @ngdoc object
 * @name ep.application.object:epApplicationConfig
 * @description
 * Provider for epApplicationConfig.
 * Gets configuration options from sysconfig.json or default
 */
(function() {
    'use strict';

    angular.module('ep.application').provider('epApplicationConfig',
        function() {
            var config = {
                /**
                * @ngdoc property
                * @name id
                * @propertyOf ep.application.object:epApplicationConfig
                * @public
                * @description
                * Application identifier, corresponds to folder name
                */
                id: '',
                /**
                * @ngdoc property
                * @name type
                * @propertyOf ep.application.object:epApplicationConfig
                * @public
                * @description
                * Application type - 'webapp' or 'hybridmobileapp'
                */
                type: 'webapp',
                /**
                * @ngdoc property
                * @name generatorEMF
                * @propertyOf ep.application.object:epApplicationConfig
                * @public
                * @description
                * what version of emf generator was used
                */
                generatorEMF: '',
                /**
                * @ngdoc property
                * @name libPath
                * @propertyOf ep.application.object:epApplicationConfig
                * @public
                * @description
                * path to libs
                */
                libPath: './lib',
                /**
                * @ngdoc property
                * @name assetsPath
                * @propertyOf ep.application.object:epApplicationConfig
                * @public
                * @description
                * path to assets
                */
                assetsPath: './lib/bower/emf/assets',

                /**
                * @ngdoc property
                * @name emfBuildInfo
                * @propertyOf ep.application.object:epApplicationConfig
                * @public
                * @description
                * This information about libraries that are built
                */
                emfBuildInfo: {}
            };

            //we use the epSysConfig provider to perform the $http read against sysconfig.json
            //epSysConfig.mergeSection() function merges the defaults with sysconfig.json settings
            this.$get = ['epSysConfig', function(epSysConfig) {
                epSysConfig.mergeSection('ep.application', config);
                if (!config.libPath) {
                    config.libPath = './lib';
                }
                // jscs:disable
                if (__ep_build_info) {
                    config.emfBuildInfo = __ep_build_info;
                }
                // jscs:enable

                config.getEmfLibPath = function(libName) {
                    var ret = './lib/bower/emf';
                    if (config.emfBuildInfo[libName] && libName !== 'emf') {
                        ret = './lib/bower/emf/emf.' + config.emfBuildInfo[libName].libName;
                    }
                    return ret;
                };
                config.getAssetsPath = function(libName, fileName) {
                    var ret = config.getEmfLibPath(libName) + '/assets';
                    if (fileName) {
                        ret += '/' + fileName;
                    }
                    return ret;
                };

                return config;
            }];
        });
})();

/**
 * @ngdoc overview
 * @name epApplicationLoader
 * @description
 * Provides script that loads angular application on devices. This replaces the ng-app='someModuleId'
 * This script makes sure that angular bootstraping is done after the device is ready and document is loaded
 * The html root element on index page must have the module id declared as
 * <html ep-module-id='someModuleId'>
 * The following has to be included in the head section
 * <script type='text/javascript'>epApplicationLoader.initialize();</script>
 */
(function() {
    'use strict';

    var epApplicationLoader = {
        state: {
            moduleId: '',
            contentLoaded: false,
            deviceDetected: false,
            messages: ['Initializing application.'],
            debugMode: false
        },
        // Application Constructor
        initialize: function() {
            this.state.moduleId = document.getElementsByTagName('html')[0].getAttribute('ep-ng-app');
            if (this.state.moduleId) {
                var dbg = document.getElementsByTagName('html')[0].getAttribute('ep-debug');
                this.state.debugMode = (dbg === '1' || dbg === 'true');
                document.addEventListener('deviceready', this.onDeviceReady, false);
                window.addEventListener('load', this.onLoad, false);
            }
        },
        // deviceready Event Handler
        onDeviceReady: function() {
            epApplicationLoader.state.deviceDetected = true;
            epApplicationLoader.state.messages.push('The device is ready.');
            epApplicationLoader.bootstrapApp();
        },
        // load Event Handler
        onLoad: function() {
            epApplicationLoader.state.contentLoaded = true;
            epApplicationLoader.state.messages.push('onLoad event is triggered.');

            //sometimes this onLoad fires faster than the onDeviceReady so in that case we need to bootstrap angular
            if (epApplicationLoader.state.deviceDetected) {
                epApplicationLoader.doTheBootstrap();
            }

            //if we are running as a web page the onDeviceReady will never fire so we bootstrap
            if (!window.cordova) {
                epApplicationLoader.state.messages.push('No device detected, executing a manual bootstrap.');
                epApplicationLoader.bootstrapApp();
            }
        },

        /*
         =====================================================================================================
         MAIN bootstrapping function.
         =====================================================================================================
         */
        bootstrapApp: function() {
            epApplicationLoader.debugOutput(function() {
                if (!epApplicationLoader.state.contentLoaded) {
                    epApplicationLoader.state.messages.push('Waiting for DOM to load.');
                    document.addEventListener('DOMContentLoaded', function() {
                        epApplicationLoader.doTheBootstrap();
                    });
                } else {
                    epApplicationLoader.doTheBootstrap();
                }
            });
        },

        doTheBootstrap: function() {
            var state = epApplicationLoader.state;
            state.contentLoaded = true;
            if (state.moduleId) {
                epApplicationLoader.attachFastClick();
                state.messages.push('Bootstrapping epApplicationLoader...');
                angular.bootstrap(document, [state.moduleId]);
                state.messages.push('Application successfully bootstrapped.');
            }
        },

        attachFastClick: function() {
            if (typeof module === 'undefined') {
                FastClick.attach(document.body);
                this.state.messages.push('FastClick attached.');
            }
        },

        debugOutput: function(continuation) {
            if (this.state.debugMode) {
                angular.element('body').append('<div id="messages"></div>');
                var messageBlock = angular.element('#messages');
                messageBlock.append('<button id="continueButton" class="btn btn-default">Continue</button>');
                this.state.messages.forEach(function(msg) {
                    messageBlock.append(angular.element('<p>' + msg + '</p>'));
                });
                angular.element('#continueButton').on('click', function() {
                    continuation();
                });
            } else {
                continuation();
            }
        }
    };

    epApplicationLoader.initialize();
})();

/**
 * @ngdoc service
 * @name ep.feature.detection.service:epFeatureDetectionService
 * @description
 * This service detects features available on the client.
 *
 * @example
 *
 */
(function() {
    'use strict';

    angular.module('ep.feature.detection').service('epFeatureDetectionService', [
    '$log',
    '$q',
    function($log, $q) {
        var mediaRegistry;
        var initialized = false;
        var supportedInputTypes = {};
        /**
         * @private
         * @description
         * features holds a set of features determined once during initialization
         */
        var features = {
            browserIsMobile: undefined,
            supportsDragAndDrop: undefined,
            transitionEvent: null,
            touchEvents: false,
            platform: {}
        };

        /*  ----- Public Functions -------> */

        /**
        * @ngdoc method
        * @name browserIsMobile
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * Detects if function is being executed on common mobile device
        *
         */
        function browserIsMobile() {
            if (features.browserIsMobile === undefined) {
                features.browserIsMobile = (function(a) {
                    if (typeof browserIsMobile.result !== 'undefined') {
                        return browserIsMobile.result;
                    }
                    var res = false;
                    // http://detectmobilebrowsers.com way to check browser
                    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|iPhone|iPad|iPod|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                        res = true;
                    }
                    browserIsMobile.result = res;
                    return res;
                })(navigator.userAgent || navigator.vendor || window.opera);
            }
            return features.browserIsMobile;
        }

        /**
        * @ngdoc method
        * @name supportsDragAndDrop
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * Detects if current document node contains 'draggable'
        *
        * @returns {boolean} true when current document node contains 'draggable'
        */
        function supportsDragAndDrop() {
            if (features.supportsDragAndDrop === undefined) {
                features.supportsDragAndDrop = 'draggable' in document.createElement('span');
            }
            return features.supportsDragAndDrop;
        }
        /**
        * @ngdoc method
        * @name getAnimationEvent
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * Detects the name of the "animationEnd" event based on browser caps
        *
        * @returns {string} the name of the animationEnd event for the current browser
        */
        function getAnimationEvent() {
            return features.animationEvent;
        }
        /**
        * @ngdoc method
        * @name getTransitionEvent
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * Detects the name of the "transitionEnd" event based on browser caps
        *
        * @returns {string} the name of the transitionEnd event for the current browser
        */
        function getTransitionEvent() {
            return features.transitionEvent;
        }

        /**
        * @ngdoc method
        * @name getFeatures
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * provides an object with platform settings as follows:
        * {
        *   browserIsMobile
        *   supportsDragAndDrop
        *   transitionEvent
        *   touchEvents
        *   platform = {
        *       app: 'Web',
        *       os: os,
        *       browser: { name, fullVersion, majorVersion, appName, userAgent }
        *   }
        * }
        *
        * @returns {object} containing features settings
        */
        function getFeatures() {
            return features;
        }

        /**
        * @ngdoc method
        * @name hasTouchEvent
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * Detects if touch events are supported
        *
        * @returns {boolean} true when touch events are supported
        */
        function hasTouchEvents() {
            return features.touchEvents;
        }

        /**
        * @ngdoc method
        * @name registerMediaQuery
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * Registers handlers to respond to CSS media queries being matched
        *
        * @param {integer} width The width used to trigger the media query functions.
        * @param {function} match OPTIONAL: If supplied, triggered when a media query matches.
        * @param {function} unmatch OPTIONAL: If supplied, triggered when a media query transitions from matched to unmatched state.
        * @param {function} setup OPTIONAL: If supplied, triggered once, when the handler is registered.
        */
        function registerMediaQuery(width, match, unmatch, setup) {
            mediaRegistry = 'screen and (min-width: ' + width + 'px)';

            enquire.register(mediaRegistry, {
                match: match,
                unmatch: unmatch,
                setup: setup,
                deferSetup: true
            });
        }
        /**
        * @ngdoc method
        * @name unregisterMediaQuery
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * deregisters the handlers to no longer respond to CSS media queries
        *
        * @param {integer} width OPTIONAL: The width used to trigger the media query functions.
        */
        function unregisterMediaQuery(width) {
            var registry = width ? 'screen and (min-width: ' + width + 'px)' : mediaRegistry;
            enquire.unregister(registry);
        }

        /**
        * @ngdoc method
        * @name inputSupportsType
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * Detects if input supports HTML5 type like 'date', 'number', etc
        *
        */
        function inputSupportsType(type) {
            var ret = false;
            if (type) {
                var st = supportedInputTypes[type];
                if (st !== true && st !== false) {
                    var test = document.createElement('input');
                    try {
                        test.type = type;
                    } catch (e) { }
                    if (test.type === type) {
                        ret = true;
                    }
                    supportedInputTypes[type] = ret;
                } else {
                    ret = st;
                }
            }
            return ret;
        }

        /*  ----- Private Functions -------> */

        /**
        * @ngdoc method
        * @name whichTransitionEvent
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @private
        * @description
        * Detects transition events
        *
        * @returns {object|null} transitions object
        */
        function whichTransitionEvent() {
            var t;
            var el = document.createElement('fakeelement');
            var transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }

            return null;
        }

        /**
        * @ngdoc method
        * @name whichAnimationEvent
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @private
        * @description
        * Detects animation events
        *
        * @returns {object|null} animations object
        */
        function whichAnimationEvent() {
            var a;
            var el = document.createElement('fakeelement');
            var animations = {
                'animation': 'animationend',
                'OAnimation': 'oanimationend',
                'MSAnimation': 'MSAnimationEnd',
                'MozAnimation': 'mozAnimationEnd',
                'WebkitAnimation': 'webkitAnimationEnd'
            };

            for (a in animations) {
                if (el.style[a] !== undefined) {
                    return animations[a];
                }
            }

            return null;
        }

        /**
        * @ngdoc method
        * @name initialize
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @private
        * @description
        * One time service initialization to detect static features
        */
        function initialize() {
            var deferred = $q.defer();
            if (initialized) {
                deferred.resolve(features);
            } else {

                features.browserIsMobile = browserIsMobile();
                features.supportsDragAndDrop = supportsDragAndDrop();
                features.transitionEvent = whichTransitionEvent();
                features.animationEvent = whichAnimationEvent();
                features.touchEvents = ('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0);

                try {
                    if (window.cordova) {
                        $log.debug('epFeatureDetectionService: Detected cordova application.');
                        features.platform = {
                            app: 'Cordova'
                        };

                        document.addEventListener('deviceready', function() {
                            if (window.device) {
                                features.platform.os = window.device.platform;
                            } else {
                                features.platform.os = 'Unknown';
                            }
                            initialized = true;
                            deferred.resolve(features);
                        }, false);
                    } else if ((window.process) && (process.versions.electron)) {
                        features.platform = {
                            app: 'Electron',
                            os: process.platform
                        };
                        deferred.resolve(features);
                    } else {
                        var nAgt = navigator.userAgent;
                        var browserName = navigator.appName;
                        var fullVersion = '' + parseFloat(navigator.appVersion);
                        var majorVersion = parseInt(navigator.appVersion, 10);
                        var nameOffset = -1;
                        var verOffset = -1;
                        var ix = -1;

                        // In Opera, the true version is after 'Opera' or after 'Version'
                        if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
                            browserName = 'Opera';
                            fullVersion = nAgt.substring(verOffset + 6);
                            if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                                fullVersion = nAgt.substring(verOffset + 8);
                            }
                        } else if ((verOffset = nAgt.indexOf('OPR/')) !== -1) {
                            //The newer versions of Opera have OPR
                            browserName = 'Opera';
                            fullVersion = nAgt.substring(verOffset + 4);
                            if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                                fullVersion = nAgt.substring(verOffset + 8);
                            }
                        } else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
                            // In MSIE, the true version is after 'MSIE' in userAgent
                            browserName = 'Microsoft Internet Explorer';
                            fullVersion = nAgt.substring(verOffset + 5);
                        } else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
                            // In Chrome, the true version is after 'Chrome'
                            browserName = 'Chrome';
                            fullVersion = nAgt.substring(verOffset + 7);
                        } else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
                            // In Safari, the true version is after 'Safari' or after 'Version'
                            browserName = 'Safari';
                            fullVersion = nAgt.substring(verOffset + 7);
                            if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                                fullVersion = nAgt.substring(verOffset + 8);
                            }
                        } else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
                            // In Firefox, the true version is after 'Firefox'
                            browserName = 'Firefox';
                            fullVersion = nAgt.substring(verOffset + 8);
                        } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
                        (verOffset = nAgt.lastIndexOf('/'))) {
                            // In most other browsers, 'name/version' is at the end of userAgent
                            browserName = nAgt.substring(nameOffset, verOffset);
                            fullVersion = nAgt.substring(verOffset + 1);
                            if (browserName.toLowerCase() === browserName.toUpperCase()) {
                                browserName = navigator.appName;
                            }
                        }
                        if ((ix = fullVersion.indexOf(';')) !== -1) {
                            // trim the fullVersion string at semicolon/space if present
                            fullVersion = fullVersion.substring(0, ix);
                        }
                        if ((ix = fullVersion.indexOf(' ')) !== -1) {
                            fullVersion = fullVersion.substring(0, ix);
                        }
                        majorVersion = parseInt('' + fullVersion, 10);
                        if (isNaN(majorVersion)) {
                            fullVersion = '' + parseFloat(navigator.appVersion);
                            majorVersion = parseInt(navigator.appVersion, 10);
                        }

                        var os = 'Unknown OS';
                        if (navigator.appVersion.indexOf('Win') !== -1) {
                            os = 'Windows';
                        }
                        if (navigator.appVersion.indexOf('Mac') !== -1) {
                            os = 'MacOS';
                        }
                        if (navigator.appVersion.indexOf('X11') !== -1) {
                            os = 'UNIX';
                        }
                        if (navigator.appVersion.indexOf('Linux') !== -1) {
                            os = 'Linux';
                        }

                        features.platform = {
                            app: 'Web',
                            os: os,
                            browser: {
                                name: browserName || '',
                                fullVersion: fullVersion,
                                majorVersion: majorVersion,
                                appName: navigator.appName,
                                userAgent: navigator.userAgent
                            }
                        };
                        deferred.resolve(features);
                    }
                    initialized = true;
                } catch (ex) {
                    deferred.reject(ex);
                    console.log(ex.message);
                }
            }
            return deferred.promise;
        }

        initialize();

        return {
            initialize: initialize,
            browserIsMobile: browserIsMobile,
            supportsDragAndDrop: supportsDragAndDrop,
            getAnimationEvent: getAnimationEvent,
            getTransitionEvent: getTransitionEvent,
            hasTouchEvents: hasTouchEvents,
            getFeatures: getFeatures,
            registerMediaQuery: registerMediaQuery,
            unregisterMediaQuery: unregisterMediaQuery,
            inputSupportsType: inputSupportsType
        };
    }]);
})();

/**
 * @ngdoc object
 * @name ep.local.storage.object:epLocalStorageConfig
 * @description
 * Provider for epLocalStorageConfig.
 * Gets configuration options from sysconfig.json or default
 */
(function() {
    'use strict';

    angular.module('ep.local.storage').provider('epLocalStorageConfig',
    [function() {
        var config = {
            /**
            * @ngdoc property
            * @name settings
            * @propertyOf ep.local.storage.object:epLocalStorageConfig
            * @public
            * @description
            * Represents the default local storage settings
            */
            settings: {},
            /**
            * @ngdoc property
            * @name settingsID
            * @propertyOf ep.local.storage.object:epLocalStorageConfig
            * @public
            * @description
            * Represents the default key for localStorage
            */
            settingsID: 'emfSettings'
        };

        //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
        //In our case, the "service" is the environment configuration object
        //The $get is called automatically when AngularJS encounters a DI.
        //
        //we use the epSysConfig provider to perform the $http read against sysconfig.json
        this.$get = ['epSysConfig', function(epSysConfig) {
            epSysConfig.mergeSection('ep.local.storage', config);
            return config;
        }];
    }]);
})();

/**
 * @ngdoc service
 * @name ep.local.storage.service:epLocalStorageService
 * @description
 * Local storage service
 *
 * @example
 *
 *    >      epLocalStorageService.update('emf.key', 'newValue');
 *    >      alert('value = ' + epLocalStorageService.get('emf.key');
 */
(function() {
    'use strict';

    angular.module('ep.local.storage').service('epLocalStorageService', [
    'epLocalStorageConfig',
    function(epLocalStorageConfig) {
        var settings = angular.extend({}, epLocalStorageConfig.settings);

        //  This routine parses a path string in the form of 'object.property'
        //  and adds, updates or deletes the value at that settings location.
        //  If value is undefined, it's assumed that the property will be removed
        //  from the settings object
        function setValueAtPath(obj, key, value) {
            var head = _.first(key);
            var tail = _.rest(key);

            // recurse until we're on the last part of the path and set it's value;
            if (tail.length) {
                // default the sub-object as an empty object if it isn't
                // created yet.
                obj[head] = obj[head] || {};
                // continue to recurse using the subobject and the rest of the path
                setValueAtPath(obj[head], tail, value);
            } else {
                // No more path parts left in the key, so set or delete the value.
                if (value === undefined) {
                    delete obj[head];
                } else {
                    obj[head] = value;
                }
            }
        }

        //  This is the function that corresponds with the above function and returns
        //  instead of setting them.
        function getValueAtPath(obj, key) {
            var head = _.first(key);
            var tail = _.rest(key);

            // recurse until we're on the last part of the path and get it's value;
            if (tail.length) {
                // default the sub-object as an empty object if it isn't
                // created yet.
                obj[head] = obj[head] || {};
                // continue to recurse using the subobject and the rest of the path
                return getValueAtPath(obj[head], tail);
            } else {
                // No more path parts left in the key, so get the value.
                return obj[head];
            }
        }

        function commit() {
            // Applies any changes that have been made to the settings
            /*jshint validthis: true */
            localStorage.setItem(epLocalStorageConfig.settingsID, JSON.stringify(settings));
        }
        /* ------------- Public Methods ----------------------> */
        /**
        * @ngdoc method
        * @name clear
        * @methodOf ep.local.storage.service:epLocalStorageService
        * @public
        * @description
        * This clears either a single key or all of the local storage.
        * If no key is passed in, all of the settings will be cleared,
        * otherwise only the item at the path location is removed.
        *
        * @param {string} key represents the key that will be removed from the localCache
        */
        function clear(key) {
            if (key) {
                var path = key.split('.');
                // restore the individual setting to the corresponding value in
                // the default settings
                var defaultSetting = getValueAtPath(epLocalStorageConfig.settings, path);
                /*jshint validthis: true */
                setValueAtPath(settings, path, defaultSetting);
            } else {
                localStorage.removeItem(epLocalStorageConfig.settingsID);
                settings = angular.extend({}, epLocalStorageConfig.settings);
            }
            /*jshint validthis: true */
            commit();
        }

        /**
        * @ngdoc method
        * @name get
        * @methodOf ep.local.storage.service:epLocalStorageService
        * @public
        * @description
        * This routine parses a path string in the form of 'object.property'
        * and retrieves the value at that settings location.
        *
        * @param {string} key represents the key that will be used to retrieve from the localCache
        */
        function get(key) {
            if (!key) { return undefined; }
            /*jshint validthis: true */
            return getValueAtPath(settings, key.split('.'));
        }
        /**
        * @ngdoc method
        * @name init
        * @methodOf ep.local.storage.service:epLocalStorageService
        * @public
        * @description
        * This initializes local storage.
        * It will take seed data from sysconfig.json / epLocalStorageConfig.settings
        */
        function init() {
            // Read the settings from the local storage.
            var settingsSrc = localStorage.getItem(epLocalStorageConfig.settingsID);
            if (settingsSrc) {
                /*jshint validthis: true */
                settings = JSON.parse(settingsSrc);
            }
        }
        /**
        * @ngdoc method
        * @name update
        * @methodOf ep.local.storage.service:epLocalStorageService
        * @public
        * @description
        * This routine parses a key string in the form of 'object.property'
        * and adds, updates or deletes the value at that settings location.
        * If value is undefined, it's assumed that the property will be removed
        * from the settings object
        *
        * @param {string} key represents the key that will be stored on the localCache
        * @param {string} value represents the value that will be stored on the localCache
        *
        */
        function update(key, value) {
            /*jshint validthis: true */
            setValueAtPath(settings, key.split('.'), value);
            commit();
        }

        /**
        * @ngdoc method
        * @name merge
        * @methodOf ep.local.storage.service:epLocalStorageService
        * @public
        * @description
        * This applies only to objects. When we want to merge onto existing object new
        * or existing properties
        * @param {string} key represents the key that will be stored on the localCache
        * @param {object} value represents the object that will be merged onto data stored on the localCache
        */
        function merge(key, value) {
            /*jshint validthis: true */
            var val = get(key);
            if (val) {
                angular.extend(val, value);
            } else {
                val = value;
            }
            update(key, val)
        }

        /**
        * @ngdoc method
        * @name getOrAdd
        * @methodOf ep.local.storage.service:epLocalStorageService
        * @public
        * @description
        * This routine is a combination of two calls "get(key)" and a
        * subsequent "update(key,value)" if the key is missing.
        * If the key is found value is returned, if not found, the supplied value
        * is added under this key.
        *
        * @param {string} key represents the key that will be stored on the localCache
        * @param {string} value represents the value that will be stored on the localCache
        *
        */
        function getOrAdd(key, value) {
            var ret = get(key);
            if (ret === undefined) {
                update(key, value);
                ret = value;
            }
            return ret;
        }

        //call just once to initialize
        init();

        return {
            get: get,
            update: update,
            merge: merge,
            getOrAdd: getOrAdd,
            clear: clear
        };
    }]);
})();

/**
 * @ngdoc object
 * @name ep.theme.object:epThemeConfig
 * @description
 * Provider for epThemeConfig.
 * Gets configuration options from sysconfig.json or default
 */
(function() {
    'use strict';

    angular.module('ep.theme').provider('epThemeConfig',
    function() {
        ///Themes provided by emf assets
        var assetsThemes = [
			{ 'name': 'bootstrap', 'cssFilename': 'bootstrap.min.css' },
			{ 'name': 'cerulum', 'cssFilename': 'cerulum.min.css' },
			{ 'name': 'cosmo', 'cssFilename': 'cosmo.min.css' },
			{ 'name': 'cyborg', 'cssFilename': 'cyborg.min.css' },
			{ 'name': 'darkly', 'cssFilename': 'darkly.min.css' },
			{ 'name': 'epicormobile', 'cssFilename': 'epicormobile.min.css' },
			{ 'name': 'flatly', 'cssFilename': 'flatly.min.css' },
			{ 'name': 'journal', 'cssFilename': 'journal.min.css' },
			{ 'name': 'paper', 'cssFilename': 'paper.min.css' },
			{ 'name': 'sandstone', 'cssFilename': 'sandstone.min.css' },
			{ 'name': 'slate', 'cssFilename': 'slate.min.css' },
			{ 'name': 'spacelab', 'cssFilename': 'spacelab.min.css' },
			{ 'name': 'superhero', 'cssFilename': 'superhero.min.css' },
			{ 'name': 'united', 'cssFilename': 'united.min.css' },
			{ 'name': 'yeti', 'cssFilename': 'yeti.min.css' }
        ];

        var config = {
            /**
            * @ngdoc property
            * @name id
            * @propertyOf ep.theme.object:epThemeConfig
            * @public
            * @description
            * Identifier by which selected theme is stored
            */
            id: '',

            /**
            * @ngdoc property
            * @name disableTheming
            * @propertyOf ep.theme.object:epThemeConfig
            * @public
            * @description
            * Disable theming
            */
            disableTheming: false,

            /**
            * @ngdoc property
            * @name themes
            * @propertyOf ep.theme.object:epThemeConfig
            * @public
            * @description
            * The default path to theme css files. You can also specify 'emf' and then internal themes
            * in assets will be loaded
            */
            defaultPath: '',

            /**
            * @ngdoc property
            * @name themes
            * @propertyOf ep.theme.object:epThemeConfig
            * @public
            * @description
            * The path to theme override css files. The override for each theme has to be located
            * in this fiolder and have name <original theme file name>_custom.css
            */
            customPath: '',

            /**
            * @ngdoc property
            * @name themes
            * @propertyOf ep.theme.object:epThemeConfig
            * @public
            * @description
            * Represents the collection of available themes
            */
            themes: [
                { 'name': 'bootstrap', 'cssFilename': 'bootstrap.min.css' },
                { 'name': 'flatly', 'cssFilename': 'flatly.min.css' }
            ],

            /**
            * @ngdoc property
            * @name appendThemes
            * @propertyOf ep.theme.object:epThemeConfig
            * @public
            * @description
            * Append extra themes on top of existing emf themes
            */
            appendThemes: [],

            /**
            * @ngdoc property
            * @name theme
            * @propertyOf ep.theme.object:epThemeConfig
            * @public
            * @description
            * Represents the default theme
            */
            defaultTheme: 'flatly',

            /**
            * @ngdoc property
            * @name provider
            * @propertyOf ep.theme.object:epThemeConfig
            * @public
            * @description
            * Should we persist the theme using local storage
            */
            persist: true,

            /**
            * @ngdoc property
            * @name provider
            * @propertyOf ep.theme.object:epThemeConfig
            * @public
            * @description
            * Represents name of provider service - if need to implement custom
            * provider of themes
            */
            provider: ''

        };

        //This $get, is kinda confusing - it does not return the provider, but it returns the 'service'.
        //In our case, the "service" is the environment configuration object
        //The $get is called automatically when AngularJS encounters a DI.
        //
        //we use the epSysConfig provider to perform the $http read against sysconfig.json
        this.$get = ['epSysConfig', 'epApplicationConfig', function(epSysConfig, epApplicationConfig) {
            var sysCfg = epSysConfig.mergeSection('ep.theme', config);
            if (config.defaultPath === 'emf') {
                config.defaultPath = epApplicationConfig.getAssetsPath('shell', 'ep.theme/themes');
                if (!angular.isArray(sysCfg.themes) || sysCfg.themes.length < 1) {
                    //set to default full list of themes only if no themes were provided
                    config.themes = assetsThemes;
                }
            }
            if (config.appendThemes && angular.isArray(config.appendThemes)) {
                //append extra themes
                angular.forEach(config.appendThemes, function(th) {
                    var old = _.find(config.themes, function(t) { return t.name === th.name; });
                    if (old) {
                        old.cssFilename = th.cssFilename || old.cssFilename;
                    } else {
                        config.themes.push(th);
                    }
                });
            }
            return config;
        }];
    });
})();

/**
    * @ngdoc directive
    * @name ep.theme.directive:epThemeHref
    * @restrict A
    * @description
    * This directive is used to set style link for EMF application
    * @example
    * <link rel="stylesheet" type="text/css" ep-theme-href="" />
*/
(function() {
    'use strict';

    angular.module('ep.theme').directive('epThemeHref', [
    '$log',
    '$rootScope',
    'epThemeService',
    'epThemeConstants',
    function($log, $rootScope, epThemeService, epThemeConstants) {
        function setHref(attr, element) {
            var href = '';
            var th;
            if (epThemeService.disableTheming() !== true) {
                th = epThemeService.theme();
                if (th) {
                    href = th.cssPath;
                }
            }
            if (attr.href !== href) {
                //add ep_theme_[theme.name] class to the body element
                var bodyEl = $('body');
                if (bodyEl.length && bodyEl.attr('class')) {
                    //remove all previous ep_theme_* classes
                    var classList = bodyEl.attr('class').split(/\s+/);
                    for (var i = 0; i < classList.length; i++) {
                        if (classList[i].indexOf('ep_theme_') === 0) {
                            bodyEl.removeClass(classList[i]);
                        }
                    }
                }
                if (bodyEl.length) {
                    bodyEl.addClass('ep_theme_' + th.name);
                }

                attr.$set('href', href);
                angular.element('#epThemeCustomHref').remove();
                if (th) {
                    var hrefCustom = epThemeService.getCustomThemeCss(th);
                    if (hrefCustom) {
                        var customEl =
                            angular.element('<link id="epThemeCustomHref" rel="stylesheet" type="text/css" href="' +
                            hrefCustom + '" />');
                        customEl.insertAfter(element);
                    }
                }
            }
        }
        return {
            restrict: 'A',
            scope: {},
            link: function(scope, element, attr) {
                if (element[0].tagName === 'LINK') {
                    epThemeService.initialize(false).then(function() {
                        setHref(attr, element);
                    });
                    $rootScope.$on(epThemeConstants.THEME_CHANGE_EVENT, function() {
                        setHref(attr, element);
                    });
                    $rootScope.$on(epThemeConstants.STATE_CHANGE_EVENT, function() {
                        setHref(attr, element);
                    });
                } else {
                    $log.warn('ep-theme-href can only be used on an <link> tag');
                }
            }
        };
    }]);
})();

/**
 * @ngdoc object
 * @name ep.theme.object:epThemeConstants
 * @description
 * Constants for epThemeConstants.
 * ep.theme constants
    * <pre>
    *      THEME_CHANGE_EVENT - event when theme is changed
    *      STATE_CHANGE_EVENT - event when state is changed (on/off)
    *  </pre>
 */
(function() {
    'use strict';

    angular.module('ep.theme').constant('epThemeConstants', {
        THEME_CHANGE_EVENT: 'EP_THEME_CHANGE_EVENT',
        STATE_CHANGE_EVENT: 'EP_THEME_STATE_CHANGE_EVENT',
    });
})();

(function() {
    'use strict';
    /**
     * @ngdoc service
     * @name ep.theme.service:epThemeService
     * @description
     * Service for the ep.theme module
     * This service returns a list of themes installed in the \css\themes directory.
     * Upon theme change epThemeConstants.THEME_CHANGE_EVENT is broadcasted
     *
     * @example
     *
     */
    epThemeService.$inject = ['$q', '$log', '$rootScope', 'epThemeConfig', 'epThemeConstants', 'epLocalStorageService', 'epUtilsService'];
    angular.module('ep.theme').service('epThemeService', epThemeService);

    /*@ngInject*/
    function epThemeService($q, $log, $rootScope,
        epThemeConfig, epThemeConstants, epLocalStorageService, epUtilsService) {

        var _localStorageId;
        var _theme;
        var _themes;
        var _initialized;
        var _initializedProvider;
        var _defaultTheme;

        /**
         * @ngdoc method
         * @name initialize
         * @methodOf ep.theme.service:epThemeService
         * @public
         * @param {boolean} refresh - if true force refresh of list
         * @param {boolean} sysconfig - if true initializes static sysconfig list
         * @description
         * Initializes themes reading from provider
         */
        function initialize(refresh, sysconfig) {
            if ((!_initialized || refresh) && epThemeConfig.disableTheming !== true) {
                _initialized = true;

                var storedTheme = epLocalStorageService.get(_localStorageId);
                var provider = epThemeConfig.provider;
                if (provider && provider !== 'sysconfig' && sysconfig !== true) {
                    try {
                        var customProvider = epUtilsService.getService(provider);

                        var th = $q.when(customProvider.getThemes(refresh));
                        th.then(function(themes) {
                            if (!themes || themes.length === 0) {
                                _initialized = false;
                            } else {
                                if (!_initializedProvider) {
                                    _initializedProvider = true;
                                    init(themes);
                                }
                                _themes = themes;
                                setItemsFullPath();
                                theme(isPersisting() ? storedTheme : _theme);
                            }
                        });
                        return th;
                    } catch (e) {
                        $log.warn('Custom themes provider not found or failed: ' + provider);
                    }
                }
                setItemsFullPath();
                theme(isPersisting() ? storedTheme : _theme);
            }
            var deferred = $q.defer();
            deferred.resolve(_themes);
            return deferred.promise;
        }

        /**
         * @ngdoc method
         * @name getThemes
         * @methodOf ep.theme.service:epThemeService
         * @public
         * @description
         * Gets the collection of themes from the epThemeConfig / sysconfig.json
         */
        function getThemes() {
            return _themes;
        }

        /**
        * @ngdoc method
        * @name getTheme
        * @methodOf ep.theme.service:epThemeService
        * @public
        * @param {string} name - name of the theme to find
        * @description
        * Gets the theme by name
        */
        function getTheme(name) {
            return _.find(_themes, function(t) { return t.name === name; });
        }

        /**
        * @ngdoc method
        * @name theme
        * @methodOf ep.theme.service:epThemeService
        * @public
        * @param {object} newTheme - theme item or theme name to set. Can be omiited to return current
        * @description
        * sets the theme by name. Upon change epThemeConstants.THEME_CHANGE_EVENT is broadcasted
        * returns current theme
        */
        function theme(newTheme) {
            if (newTheme) {
                var _old = _theme;
                var _key = angular.isObject(newTheme) ? newTheme.name : newTheme;
                if (_key) {
                    _theme = _.find(_themes, function(t) { return t.name.toLowerCase() === _key.toLowerCase(); });
                }

                // if the one that is set is not found then default it back
                if (!_theme) {
                    _theme = _old;
                    if (!_theme) {
                        _theme = _.find(_themes, function(t) { return t.name === 'bootstrap'; });
                    }
                }

                if (_theme && (!_old || _old.name !== _theme.name)) {
                    $rootScope.$emit(epThemeConstants.THEME_CHANGE_EVENT, _theme);
                }

                if (isPersisting()) {
                    // set the current theme back onto the epLocalStorage service
                    epLocalStorageService.update(_localStorageId, _theme);
                }
            }
            return _theme;
        }

        /**
         * @ngdoc method
         * @name defaultTheme
         * @methodOf ep.theme.service:epThemeService
         * @public
         * @description
         * Returns default theme from the epThemeConfig / sysconfig.json
         */
        function defaultTheme() {
            return _defaultTheme;
        }

        /**
         * @ngdoc method
         * @name reset
         * @methodOf ep.theme.service:epThemeService
         * @public
         * @description
         * Reset to default theme from the epThemeConfig / sysconfig.json
         */
        function reset() {
            theme(_defaultTheme);
        }

        /**
        * @ngdoc method
        * @name disableTheming
        * @methodOf ep.theme.service:epThemeService
        * @public
        * @param {boolean} onOff - if true theming is turned on, if false set as off
        * @description
        * return true if theming is disabled
        * can also turn on/off theming
        */
        function disableTheming(onOff) {
            if (onOff !== undefined) {
                if (onOff === true && epThemeConfig.disableTheming === true) {
                    epThemeConfig.disableTheming = false;
                    initialize();
                }
                if (epThemeConfig.disableTheming !== onOff) {
                    epThemeConfig.disableTheming = onOff;
                    $rootScope.$emit(epThemeConstants.STATE_CHANGE_EVENT, onOff);
                }
            }
            return epThemeConfig.disableTheming === true;
        }

        /**
        * @ngdoc method
        * @name theme
        * @methodOf ep.theme.service:epThemeService
        * @public
        * @param {object} theme - theme item or theme name to set. Can be omiited to return current
        * @description
        * sets the theme by name. Upon change epThemeConstants.THEME_CHANGE_EVENT is broadcasted
        * returns current theme
        */
        function getCustomThemeCss(theme) {
            if (epThemeConfig.customPath) {
                var key = angular.isObject(theme) ? theme.name : theme;
                var th = getTheme(key);
                if (th) {
                    var customFile = th.cssFilename.replace('.css', '.custom.css');
                    return getFilePath(epThemeConfig.customPath, customFile);
                }
            }
            return '';
        }

        /**
        * @ngdoc method
        * @name setItemsFullPath
        * @methodOf ep.theme.service:epThemeService
        * @private
        * @description
        * Sets full path to cssPath property to all theme items
        */
        function setItemsFullPath() {
            angular.forEach(_themes, function(t) {
                setItemFullPath(t);
            });
        }

        /**
        * @ngdoc method
        * @name getFilePath
        * @methodOf ep.theme.service:epThemeService
        * @private
        * @description
        * Gets full path
        */
        function getFilePath(path, fileName) {
            var ret = '';
            var p = path;
            if (p && fileName) {
                p = p.trim();
                if (p.lastIndexOf('/') === p.length - 1) {
                    p = p.substr(0, p.length - 1);
                }
                ret = p + '/' + fileName;
            } else {
                ret = fileName;
            }
            return ret;
        }

        /**
        * @ngdoc method
        * @name setItemFullPath
        * @methodOf ep.theme.service:epThemeService
        * @private
        * @description
        * Sets full path to cssPath property to given item
        */
        function setItemFullPath(item) {
            item.cssPath = getFilePath(epThemeConfig.defaultPath, item.cssFilename);
        }

        /**
        * @ngdoc method
        * @name init
        * @methodOf ep.theme.service:epThemeService
        * @private
        * @description
        * Some things to do at startup
        */
        function init(themeList) {
            _localStorageId = (epThemeConfig.id || 'emf') + '.theme.current';
            //_themes = epThemeConfig.themes;
            _themes = (themeList && themeList.length) ? themeList : epThemeConfig.themes;

            if (_themes.length > 1) {
                _theme = _.find(_themes, function(t) {
                    return t.name.toLowerCase() === epThemeConfig.defaultTheme.toLowerCase();
                });
            }

            _defaultTheme = {};
            if (!_theme) {
                _theme = _themes[0];
            } else {
                angular.copy(_theme, _defaultTheme);
            }

            if (isPersisting()) {
                _theme = epLocalStorageService.getOrAdd(_localStorageId, _defaultTheme);
            }
            if (!_theme && _defaultTheme && _defaultTheme.name) {
                _theme = _defaultTheme;
            }

            setItemsFullPath(); //make sure path is set
            if (_theme) {
                setItemFullPath(_theme);
            }
        }

        /**
        * @ngdoc method
        * @name init
        * @methodOf ep.theme.service:epThemeService
        * @private
        * @description
        * Should themes be persisted through local storage
        */
        function isPersisting() {
            return (_themes.length > 1 && epThemeConfig.persist);
        }

        init();

        return {
            initialize: initialize,
            getThemes: getThemes,
            getTheme: getTheme,
            theme: theme,
            reset: reset,
            defaultTheme: defaultTheme,
            disableTheming: disableTheming,
            getCustomThemeCss: getCustomThemeCss
        };
    }
}());

(function() {
'use strict';

/**
 * @ngdoc controller
 * @name ep.viewmodal.controller:epViewmodalCtrl
 * @description
 * This this similar to the ep.modaldialog however it allows you to define a modal wrapper inside of your view that is
 * overlays the view instead of popping up on top of it.  This gives you more flexibility for the content that is displayed
 * and also has a nice animation effect from the top to the bottom.
 *
 * @example
 *
 */
    epViewmodalCtrl.$inject = ['$scope'];
    angular.module('ep.viewmodal')
        .controller('epViewmodalCtrl', epViewmodalCtrl);

    /*@ngInject*/
    function epViewmodalCtrl($scope) {
        $scope.peek = false;

        //click event to close the viewmodal
        $scope.closeClick = function() {
            //reset peek mode
            $scope.peek = false;

            var closeModal = true;

            if ($scope.options.onClose) {
                closeModal = $scope.options.onClose($scope.options);
            }

            //close
            $scope.options.showViewModal = !closeModal;
        };

        $scope.peekClick = function() {
            $scope.peek = !$scope.peek;
        };
    }
}());

(function() {
'use strict';
/**
* @ngdoc directive
* @name ep.viewmodal.directive:epViewmodal
* @restrict E
*
* @description
* This directive can be used to display a full screen modal within your view controller.  This is different than the
 * modal dialog because it can be used in conjunction with a modal dialog.  The view modal can share your view controller
 * and be invoked directly from your view controller by setting the options.showViewModal = true.
*
* @example
*/
angular.module('ep.viewmodal').
    directive('epViewmodal', epViewmodalDirective);

    /*@ngInject*/
    function epViewmodalDirective() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            controller: 'epViewmodalCtrl',
            templateUrl: 'src/components/ep.viewmodal/ep-viewmodal.html',
            scope: {
                'options': '='
            },
            link: function(scope) {
                scope.options = {
                    showCloseButton: true
                };
            }
        };
    }
}());

/**
 * @ngdoc service
 * @name ep.drag.drop.factory:dragOperationFactory
 * @description
 * Serves up an instance of the dragOperation
 *
 * @example
 *
 */
(function() {
    'use strict';

    angular.module('ep.drag.drop').factory('dragOperationFactory', [
    function() {
        /**
         * @ngdoc method
         * @name getDragOperation
         * @methodOf ep.drag.drop.factory:dragOperationFactory
         * @public
         * @description
         * Serves up an instance of the dragOperation
         *
         * @returns {object} object that represents the drag operation
         *
         */
        function getDragOperation(scope) {
            //save drag parameters for use from dropArea
            var dragOperation = {};
            dragOperation.dropCallback = scope.dropCallback;
            dragOperation.dragStart = scope.dragStart;
            dragOperation.dropCallbackParams = scope.dropCallbackParams;
            dragOperation.dragItem = scope.dragItem;
            dragOperation.dragItemType = scope.dragItemType;
            return dragOperation;
        }

        return {
            getDragOperation: getDragOperation
        };
    }]);
})();

/**
     * @ngdoc directive
     * @name ep.drag.drop.directive:epDraggable
     * @restrict A
     *
     * @description
     * Represents the draggable attribue and properties
     *
     * >    dragItemType is required and we always should pass a value for it to correctly handle drop operation in
     * drop-area directive. There isn’t restricted list of allowed values for this value. You can use any value, but
     *  don’t forget add this value to dropItemTypes attribute of drop-area directive. We’ll talk about this attribute
     *  later.
     * >    dragItem contains an object that’s used as a model for item that is being dragged. There might be cases
     * when we need some object to use in drop operation. This object will be used for as this context in dropHandler
     * of drop-area directive.
     * >    dropCallback and dropCallbackParams attributes are just helper attributes. see drop-area directive.
     * >    'ep-drag-active' class is set on the element when drag starts and is removed when drag ends
     */
(function() {
    'use strict';

    angular.module('ep.drag.drop').directive('epDraggable', [
        'dragOperationFactory',
        function(dragOperationFactory) {
            return {
                restrict: 'A',
                scope: {
                    //There might be cases when we want to handle drop not at the epDropArea side
                    //In this case we pass dropCallback that will be called from drop handler function in epDropArea.
                    //It also helpful when we have generic drop handler for multiple epDropAreas, that expects some parameter
                    //In this case the drop area as just a proxy for us to call dropCallback with required parameter
                    dropCallback: '=dropCallback',
                    dragStart: '=dragStart',
                    dropCallbackParams: '=dropCallbackParams',
                    //dragged item's base object. For example OLAPEntity
                    dragItem: '=dragItem',
                    //used for deciding whether the dropArea should handle drop with this kind of dragged item
                    dragItemType: '=dragItemType',
                    //by default enabled. You can disable by setting false
                    dragEnabled: '='
                },
                compile: function(elem, attrs) {
                    if (!attrs.draggable) {
                        elem.attr('draggable', 'true');
                    }
                    return function(scope, ele) {
                        if (!scope.dragItemType) {
                            throw new Error('Dragged item type is not specified!');
                        }

                        scope.$watch('dragEnabled', function(newValue) {
                            if (newValue !== undefined) {
                                ele.attr('draggable', newValue === false ? 'false' : 'true');
                            }
                        });

                        ele.on('dragstart', function(evt) {
                            evt.stopPropagation();
                            evt.originalEvent.dataTransfer.setData('Text', evt.target.textContent);
                            evt.originalEvent.dataTransfer.dropEffect = 'move';
                            var dragOperation = dragOperationFactory.getDragOperation(scope);
                            var getDragOperation = function() {
                                return dragOperation;
                            };
                            if (angular.isFunction(dragOperation.dragStart)) {
                                dragOperation.dragStart(evt, dragOperation.dragItem);
                            }
                            $(evt.target).addClass('ep-drag-active');
                            scope.$root.$broadcast('startDraging', getDragOperation);
                        });

                        ele.on('dragend', function(evt) {
                            evt.stopPropagation();
                            evt.preventDefault();
                            $(evt.target).removeClass('ep-drag-active');
                            var dragOperation = dragOperationFactory.getDragOperation(scope);
                            if (angular.isFunction(dragOperation.dropCallback)) {
                                dragOperation.dropCallback();
                            }
                        });
                    };
                }
            };
        }]);
})();

/**
 * @ngdoc controller
 * @name ep.drag.drop.controller:epDropAreaCtrl
 * @description
 * Represents the drop area controller.
 *
 * @example
 *
 */
(function() {
    'use strict';

    epDropAreaCtrl.$inject = ['$scope'];
    angular.module('ep.drag.drop')
        .controller('epDropAreaCtrl', epDropAreaCtrl);

    /*@ngInject*/
    function epDropAreaCtrl($scope) {
        //Place the main closure function on the scope for access from directive
        $scope.register = register;

        /**
         * @ngdoc method
         * @name register
         * @methodOf ep.drag.drop.controller:epDropAreaCtrl
         * @public
         * @description
         * Registers a dom element to act as drop down area and sets all further
         * events. It acts as a closure for the element and its attributes, since they may be
         * more than one drop-area element within single scope
         */
        function register(ele, attrs) {
            var getDragOperationFnc;
            var evStartDragging;
            var dropEnabled;
            var dropHighlight = true;

            function onDragStart(scope, dragOperationGetter) {
                getDragOperationFnc = dragOperationGetter;
            }

            /**
             * @ngdoc method
             * @name onDrop
             * @methodOf ep.drag.drop.controller:epDropAreaCtrl
             * @private
             * @description
             * checks if dragItem type is allowed to be dropped
             */
            function isValidDragType(dragItemType) {
                var droppables = attrs.dropItemTypes.split(',');
                if (Array.isArray(droppables) && droppables.length > 1) {
                    if (droppables.indexOf(dragItemType) === -1) {
                        return false;
                    }
                } else {
                    if (attrs.dropItemTypes !== dragItemType) {
                        return false;
                    }
                }
                return true;
            }

            /**
             * @ngdoc method
             * @name onDrop
             * @methodOf ep.drag.drop.controller:epDropAreaCtrl
             * @public
             * @description
             * handles the onDrop event. If dropHandler is supplied it is called as dropHandler(item,dropElement)
             */
            function onDrop(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                $(ele).removeClass('ep-drop-active ep-drop-highlight');
                var dragOperation = getDragOperationFnc();
                if (!isValidDragType(dragOperation.dragItemType)) {
                    return;
                }
                if ($scope[attrs.dropHandler]) {
                    /*jshint validthis:true */
                    $scope[attrs.dropHandler].call(dragOperation.dragItem || this, dragOperation, ele);
                }
            }

            /**
             * @ngdoc method
             * @name onDragOver
             * @methodOf ep.drag.drop.controller:epDropAreaCtrl
             * @public
             * @description
             * handles the onDragOver event
             */
            function onDragOver(evt) {
                // TODO Add visual feedback on drag to show whether this area support this kind of drop
                evt.stopPropagation();
                evt.preventDefault();

                var dragOperation = getDragOperationFnc();
                if (isValidDragType(dragOperation.dragItemType)) {
                    $(ele).addClass('ep-drop-active');
                    if (dropHighlight) {
                        $(ele).addClass('ep-drop-highlight');
                    }
                }

                if ($scope[attrs.overHandler]) {
                    /*jshint validthis:true */
                    var item = dragOperation.dragItem || this;
                    /*jshint validthis:true */
                    $scope[attrs.overHandler].call(item, dragOperation, evt);
                }
            }

            /**
             * @ngdoc method
             * @name onDragLeave
             * @methodOf ep.drag.drop.controller:epDropAreaCtrl
             * @public
             * @description
             * handles the onDragLeave event
             */
            function onDragLeave(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                $(ele).removeClass('ep-drop-active ep-drop-highlight');
                if ($scope[attrs.overHandler]) {
                    var dragOperation = getDragOperationFnc();
                    /*jshint validthis:true */
                    var item = dragOperation.dragItem || this;
                    /*jshint validthis:true */
                    $scope[attrs.overHandler].call(item, dragOperation, evt);
                }
            }

            /**
             * @ngdoc method
             * @name setupEvents
             * @methodOf ep.drag.drop.controller:epDropAreaCtrl
             * @public
             * @description
             * Configures drag drop HTML5 events
             */
            function setupEvents(onOff) {
                dropEnabled = onOff;
                if (onOff) {
                    evStartDragging = $scope.$on('startDraging', onDragStart);
                    ele.on('drop', onDrop);
                    ele.on('dragover', onDragOver);
                    ele.on('dragleave', onDragLeave);
                } else {
                    if (evStartDragging) {
                        evStartDragging();
                    }
                    ele.off('drop');
                    ele.off('dragover');
                    ele.off('dragleave');
                }
            }

            $scope.$watch(attrs.dropHighlight, function(value) {
                if (value === true || value === false) {
                    dropHighlight = value;
                }
            });

            if (attrs.dropEnabled === undefined) {
                //if we dont have an attribute (compatibility)
                setupEvents(true);
            } else {
                //watch the dropEnabled attribute to turn off/on events
                $scope.$watch(attrs.dropEnabled, function(value) {
                    if (value === undefined && dropEnabled === undefined) {
                        //Very first time if attribute value is undefined default to true
                        setupEvents(true);
                    }
                    if ((value === true || value === false) && (value !== dropEnabled)) {
                        setupEvents(value);
                    }
                });
            }
        }
    }
})();

'use strict';
/**
     * @ngdoc directive
     * @name ep.drag.drop.directive:epDropArea
     * @restrict A
     *
     * @param {bool} dropEnabled - is drop area enabled (by default enabled)
     * @param {string} dropHandler - name of handler to be called upon drop
     * @param {string} overHandler - name of handler to be called upon over
     * @param {string} leaveHandler - name of handler to be called upon leave
     * @param {bool} dropHighlight - should we highlight drop area (by default enabled)
     *
     * @description
     * Represents the drop area directive
     *
     * >    dropItemTypes is a string attribute that can contain comma separated list of item types that can be
     * dropped to this area. This value will be used by ep-drop-area directive to check whether this drop is
     * supported by this area.
     * >     dropHandler,leaveHandler,overHandler attributes are attributes that pass names of the functions acting
     * as callbacks on the active scope
     * >    'ep-drop-active' class is set on the element when drop area is active
     *
     * @example
     */

angular.module('ep.drag.drop').directive('epDropArea', [
function() {
    return {
        restrict: 'A',
        controller: 'epDropAreaCtrl',
        controllerAs: 'dropCtrl',
        //scope cannot be isolated to be able to place directly on another directive
        scope: false,
        compile: function() {
            return function(scope, ele, attrs) {
                //register element and set it up for drop area
                scope.register(ele, attrs);
            };
        }
    };
}]);

(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.include.directive:epInclude
    * @restrict E
    *
    * @description
    * Represents the ep.include directive. Allows including templates of direct HTML or file with HTML
    * and optionally to assign template controller and scope
    *   The following are attributes that can be set:
    *   # template {string} - direct HTML to be included
    *   # templateUrl {string} - file link to HTML that is to be included
    *   # templateCtrl {function} - controller function
    *   # templateScope {object} - scope to be applied for the template
    *   # templateStyle {string} - sets inline styling. eg. '{ "color" : "red", "margin" : "0px" }
    *   # userData {object} - pass anything you want here to consume by the template. Will be set as userData on the template scope
    *   # options {object} - an object containing all of the above properties. Note: if options are used then
    *       the other attributes are not applied.
    *
    * @example
    *

    *   <ep-include template="template"></ep-include>
    *
    *   <ep-include template="template" template-ctrl="templateCtrl" template-scope="templateScope"></ep-include>
    *
    */
    epIncludeDirective.$inject = ['$compile', '$log'];
    angular.module('ep.include').
        directive('epInclude', epIncludeDirective);

    /*@ngInject*/
    function epIncludeDirective($compile, $log) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="ep-include"></div>',
            scope: {
                options: '=',
                template: '=',
                templateUrl: '=',
                templateCtrl: '=',
                templateScope: '=',
                templateStyle: '=',
                userData: '='
            },
            compile: function() {

                function setWithScope($scope, options) {
                    if (!options.template && !options.templateUrl) {
                        angular.element($scope.state.iElement).empty();
                        $scope.state.template = '';
                        return;
                    }

                    var sDiv = '<div class="ep-include"';
                    if (options.templateCtrl) {
                        var ctrlName = '_epIncludeController' + $scope.$id;
                        $scope.state.templateScope[ctrlName] = options.templateCtrl;
                        sDiv = '<div ng-controller="' + ctrlName + '"';
                    }
                    var html = sDiv;
                    if (options.templateStyle) {
                        try {
                            $scope.state.templateScope._templateStyle_ = angular.isString(options.templateStyle) ?
                                $scope.$eval(options.templateStyle) : options.templateStyle;
                        } catch (err) {
                            $log.error('error evaluating style:' + err.message);
                        }
                        html += ' ng-style="_templateStyle_" ';
                    }
                    if (options.template) {
                        html += '>' + options.template + '</div>';
                    } else if (options.templateUrl) {
                        html += ' ng-include="\'' + options.templateUrl + '\'"></div>';
                    } else {
                        html += '></div>';
                    }
                    var target = angular.element($scope.state.iElement);
                    target.empty().append($compile(html)($scope.state.templateScope));
                    $scope.state.template = html;
                }

                function configure($scope, options) {
                    $scope.state.templateScope = options.templateScope || $scope;
                    if (options.userData || $scope.userData) {
                        $scope.state.templateScope.userData = $scope.userData ? $scope.userData : options.userData;
                    }
                    setWithScope($scope, options);
                }

                return {
                    pre: function($scope, iElement) {
                        $scope.state = {
                            iElement: iElement,
                            template: undefined,
                            templateScope: undefined
                        };

                        //determine where do we read options from
                        var _options = ($scope.options) ? $scope.options : $scope;

                        configure($scope, _options);
                        if ($scope.options) {
                            $scope.$watch('options', function(newValue, oldValue) {
                                if (newValue !== oldValue) {
                                    configure($scope, $scope.options || {});
                                }
                            });
                        } else {
                            //when options are set though direct attributes we allow watching over template changes
                            $scope.$watchGroup(['template', 'templateUrl', 'templateCtrl', 'templateScope'],
                                function(newValues, oldValues) {
                                    for (var i = 0; i < newValues.length; i++) {
                                        if (newValues[i] !== oldValues[i]) {
                                            configure($scope, $scope);
                                            break;
                                        }
                                    }
                                });
                            }
                        $scope.$watch('userData', function(newValue, oldValue) {
                            if (newValue && newValue !== oldValue) {
                                $scope.state.templateScope.userData = $scope.userData;
                            }
                        });

                    }
                };
            }
        };
    }
}());

/**
 * @ngdoc object
 * @name ep.console.object:epConsoleConfig
 * @description
 * This is the provider for epConsoleConfig.
 * It gets the configuration options from sysconfig.json or default.
 */
(function() {
    'use strict';

    angular.module('ep.console').provider('epConsoleConfig',
    function() {
        var config = {
        };

        //we use the epSysConfig provider to perform the $http read against sysconfig.json
        this.$get = ['epSysConfig', function(epSysConfig) {
            epSysConfig.mergeSection('ep.console', config);
            return config;
        }];
    });
})();

/**
 * @ngdoc service
 * @name ep.console.service:epConsoleService
 * @description
 * This is the service for the ep.console module which provides access to log entries displayed in a console dialog.
 * This service requires datatables library in order to present the log entries to the user.
 *
 * @example
 *      $log.error('my test error!'); //record your error
 *      $log.warn('my test warning!'); //record your warning
 *      $log.info('my test information!'); //record your info message
 *      ....
 *      epConsoleService.showLog(); //display dialog with log entries
 *      ....
 *      epConsoleService.showLog({title: 'My log entries' }); //override dialog options
 *
 */
(function() {
    'use strict';

    epConsoleService.$inject = ['$log', 'epUtilsService', 'epConsoleConfig'];
    angular.module('ep.console').
    service('epConsoleService', epConsoleService);

    /*@ngInject*/
    function epConsoleService($log, epUtilsService, epConsoleConfig) {

        /**
         * @private
         * @description
         * the array for storing all log messages
         */
        var logMessages = [];


        /**
         * @private
         * @description
         * max messages to store
         */
        var maxCount = epConsoleConfig.maxCount || 1000;

        /**
         * @ngdoc method
         * @name init
         * @methodOf ep.console.service:epConsoleService
         * @private
         * @description
         * This is the internal initialization routine that gets kicked off when this module is created.
         */
        function init() {
            // Creating instances of log object
            $log.getInstance = function(context) {
                return {
                    log: enhanceLogging($log.log, context, 'info'),
                    info: enhanceLogging($log.info, context, 'info'),
                    warn: enhanceLogging($log.warn, context, 'warning'),
                    debug: enhanceLogging($log.debug, context, 'debug'),
                    error: enhanceLogging($log.error, context, 'error')
                };
            };

            $log.log = enhanceLogging($log.log, '', 'info');
            $log.info = enhanceLogging($log.info, '', 'info');
            $log.warn = enhanceLogging($log.warn, '', 'warning');
            $log.debug = enhanceLogging($log.debug, '', 'debug');
            $log.error = enhanceLogging($log.error, '', 'error');
        }

        /**
         * @ngdoc method
         * @name enhanceLogging
         * @methodOf ep.console.service:epConsoleService
         * @private
         * @description
         * This method will enhance the log for showing messages with datestamp in the browser console
         * as well as storing messages in an array.
         */
        function enhanceLogging(loggingFunc, context, type) {
            return function() {
                var modifiedArguments = [].slice.call(arguments);
                var timestamp = moment().format();
                loggingFunc.apply(null, modifiedArguments);
                
                if (logMessages.length > maxCount + 100) {
                    //prevent excess messages
                    logMessages.splice(0, 100);
                }
                logMessages.push({message: modifiedArguments[0], type: type, timestamp: timestamp, context: context});
            };
        }

        /**
         * @ngdoc method
         * @name clearLog
         * @methodOf ep.console.service:epConsoleService
         * @public
         * @description
         * This method clears all the log messages.
         */
        function clearLog() {
            logMessages.length = 0;
        }

        /**
         * @ngdoc method
         * @name showLog
         * @methodOf ep.console.service:epConsoleService
         * @public
         * @param {object} dialogOptions - set/override dialog options
         * @description
         * This method will show a dialog box with all of the log entries.
         */
        function showLog(dialogOptions) {
            var epDataGridService;
            if (angular.module('ep.datagrid')) {
                epDataGridService = epUtilsService.getService('epDataGridService');
            }
            if (!epDataGridService) {
                $log.warn('ep.datagrid module is not available for console. Verify that it is included');
                return;
            }

            var modalDialogOptions = {
                size: 'fullscreen',
                windowClass: 'ep-console-dialog',
                title: 'Console log output',
                icon: 'fa fa-cogs fa-2x',
                buttons: [
                    {
                        isCancel: false,
                        id: 'clear_btn',
                        value: 'clear',
                        text: 'Clear logs',
                        action: function() {
                            clearLog();
                        }
                    },
                    {
                        isDefault: false,
                        text: 'Ok',
                        type: 'primary'
                    }
                ]
            };
            epUtilsService.copyProperties(dialogOptions, modalDialogOptions);

            var timeFmt = { FormatString: 'MM/DD/YY hh:mm:ss' };
            var gridOptions = {
                metadata: {
                    columns: [
                        { sName: 'icon', sTitle: '', width: 10, orderable: false, align: 'center' },
                        { mData: 0, sName: 'message', sTitle: 'Message' },
                        { mData: 1, sName: 'type', sTitle: 'Type', widthFactor: 0.6 },
                        {
                            mData: 2, sName: 'timestamp', sTitle: 'TimeStamp', sDataType: 'DateTime',
                            oFormat: timeFmt
                        },
                        { mData: 3, sName: 'context', sTitle: 'Context' }
                    ]
                },
                fnOnRenderGridCell: function(data, type, row, meta, col, currentReturn) {
                    var ret = currentReturn;
                    if (col && col.userColumnDef && col.sName === 'icon') {
                        if (row[1] === 'error') {
                            ret = '<div class=\'fa fa-lg fa-exclamation-circle ep-console-error\'></div>';
                        } else if (row[1] === 'warning') {
                            ret = '<div class=\'fa fa-lg fa-exclamation-circle ep-console-warning\'></div>';
                        } else {
                            ret = '<div class=\'fa fa-lg fa-info ep-console-info\'></div>';
                        }
                    }
                    return ret;
                }
            };

            var dataSet = messages().map(function(msg) {
                return _.values(msg);
            });
            epDataGridService.showGridDialog(modalDialogOptions, gridOptions, dataSet);
        }

        /**
         * @ngdoc method
         * @name messages
         * @methodOf ep.console.service:epConsoleService
         * @public
         * @description
         * This method will return an array of log entries.
         */
        function messages() {
            return logMessages;
        }
        /**
         * @ngdoc method
         * @name restoreLog
         * @methodOf ep.console.service:epConsoleService
         * @public
         * @description
         * This method will assign the log messages to the given values.
         * This is useful for apps that persist their log messages
         */
        function restoreLog(messages) {
            logMessages = messages;
        }

        /**
         * @ngdoc method
         * @name hasLog
         * @methodOf ep.console.service:epConsoleService
         * @public
         * @description
         * This method will return true if there are any entries in the log.
         */
        function hasLog() {
            return messages().length > 0;
        }

        /**
         * @ngdoc method
         * @name initialize
         * @methodOf ep.console.service:epConsoleService
         * @public
         * @description
         * This method will initialize the logging.
         */
        function initialize() {
            //this currently does nothing but expose initialize method to kick-off the service
        }

        init();

        return {
            initialize: initialize,
            messages: messages,
            restoreLog: restoreLog,
            hasLog: hasLog,
            clearLog: clearLog,
            showLog: showLog
        };
    }
})();

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

    angular.module('ep.modaldialog').directive('epmodaldialog', [
    function() {
        return {
            restrict: 'E',
            templateUrl: 'src/components/ep.modaldialog/modals/modaldialog-pane.html',
            replace: true,
            compile: function() {
                return {
                    pre: function() {
                    },
                    post: function($scope) {
                        $scope.config = ($scope.dialogState) ? $scope.dialogState.config : {}; //To be same as modals
                    }
                };
            }
        };
    }]);
})();

/**
 * @ngdoc service
 * @name ep.modaldialog.factory:epModalDialogService
 * @description
 * Provides Standard and Custom Modal Dialogs
 *
 *      Buttons are set by default in each dialog. The buttons option is an array of button objects.
 *      The button object has following properties:
 *          id: button identifier
 *          text: button caption
 *          action: function(options, btn) {} if function returns -1 then dialog does not close.
 *          type: optional bootstrap style (set as btn-{type})
 *          icon: optional button icon
 *          hidden: optional hide
 *
 * @example
 * Below is some sample usage:
 *
 *  # Show a message
 *      epModalDialogService.showMessage({ message: 'hello world!', title: 'title', fnDefaultAction: function() {alert('test');} });
 *
 *  # Show confirmation (yes/no)
 *      epModalDialogService.showConfirm({ message: 'Would you like to exit?', title: 'Confirmation''hello world!', fnDefaultAction: function() {alert('exit confirmed');} });
 *
 *  # Show progress message
 *      epModalDialogService.showProgress({ message: 'hello world!', title: 'title', icon: 'fa fa-clock-o fa-4x', autoClose: 2000, fnDefaultAction: function() {alert('progess completed');} });
 *
 *  # Show loading message
 *      epModalDialogService.showLoading({ message: 'hello world!', title: 'title', autoClose: 2000, fnDefaultAction: function() {alert('loading completed');} });
 *
 *  # Show exception
 *      try { throw new Error('Test Exception'); } catch (ex) { epModalDialogService.showException({}, ex); }
 *
 *  # Show custom exception with different options
 *      var options = { statusBar: true, statusBarText: 'This is status', closeButton: true, title: 'Exception title', status: 'error', message: 'Server exception message',
 *                      messageDetails: 'some trace info. this can be long at times',
 *                      buttons: [{ id: 'okButton', type: 'default', text: 'Ok', action: function() { alert('ok'); }}]};
 *      epModalDialogService.showException(options)
 *
 *  # Show message box
 *      epModalDialogService.showMessageBox({ title: 'Message Box Sample', message: 'Hello world', });
 *
 *  # Show custom dialog
 *       epModalDialogService.showCustomDialog({
 *          templateUrl: 'src/components/ep.modaldialog/modals/modaldialog-error.html',
 *          title: 'This is a custom dialog (error template)', status: 'warning', message: 'Hello world' });
 *
 *  # Show modal form
 *       epModalDialogService.showModalForm({
 *          templateUrl: 'src/components/ep.modaldialog/modals/modaldialog-error.html',
 *          title: 'This is a custom dialog (error template)', status: 'warning', message: 'Hello world' });
 */
(function() {
    'use strict';
    /**
     * @ngdoc service
     * @name ep.datagrid.service:epDataGridService
     * @description
     * Service for the ep.datagrid module
     * Provides commnon functions for data grid
     *
     * @example
     *
     */
    epModalDialogService.$inject = ['$sce', '$uibModal', '$uibModalStack', '$compile', '$rootScope', '$timeout', '$interval', '$injector', 'epLocalStorageService'];
    angular.module('ep.modaldialog').service('epModalDialogService', epModalDialogService);

    /*@ngInject*/
    function epModalDialogService($sce, $uibModal, $uibModalStack, $compile, $rootScope, $timeout,
        $interval, $injector, epLocalStorageService) {

        /**
         * @private
         * @description
         * default settings for confirmation (pane dialog)
         */
        var defaultConfig = {
            dialogTypeClass: 'ep-message-dialog',
            containerClass: 'bg-primary',
            title: 'Title',
            titleClass: 'text-warning',
            message: 'Message',
            messageClass: '',
            icon: 'fa fa-info-circle fa-4x',
            iconClass: '',
            showProgress: false,
            autoClose: 0,
            fnDefaultAction: null,
            fnCancelAction: null,
            fnButtonAction: null,
            buttons: [{text: 'Ok', isDefault: true}],
            btnBlock: false
        };

        // @private
        var dialogState = {
            isVisible: false,
            config: {},
            isModal: false,
            paneScope: null
        };

        // @private
        // list of open dialogs
        var dialogs = [];

        // @private
        // current open dialog
        var currentDialog = null;

        // @private
        // prefix for dialogs RememberMe option. Must end with a dot '.'
        var dialogStoragePrefix = 'emf.dialogs.dialogId.';

        /**
         * @ngdoc method
         * @name showMessage
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * Shows the standard message dialog.
         * @param {object} options - optional settings as follows:
         * <pre>
         *      message - the message to display
         *      title - title (header)
         *      icon - font awesome icon class
         *      status - warning\error\information
         *      buttons - list of buttons (refer to buttons description at service documentation)
         *      fnDefaultAction - function applied to default button if buttons are not supplied
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      autoClose - time in milliseconds to autoclose
         *      titleClass, iconClass, contentClass - optional classes applied to respective areas
         *  </pre>
         */
        function showMessage(options) {
            var cfg = {
                showProgress: false,
                dialogTypeClass: 'ep-message-pane',
                icon: 'fa fa-info-circle fa-4x'
            };

            setPaneStatus(options, cfg);

            copyProperties(options, cfg);

            show(cfg);
        }

        /**
         * @ngdoc method
         * @name showConfirm
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * Show a standard message dialog with Yes/No button set.
         * @param {object} options - optional settings as follows:
         * <pre>
         *      message - the message to display
         *      title - title (header)
         *      icon - font awesome icon class
         *      status - warning\error\information
         *      buttons - list of buttons (refer to buttons description at service documentation)
         *      fnDefaultAction - function applied to default button if buttons are not supplied or isDefault = true
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      autoClose - time in seconds to autoclose
         *      titleClass, iconClass, contentClass - optional classes applied to respective areas
         * </pre>
         */
        function showConfirm(options) {
            var cfg = {
                showProgress: false,
                dialogTypeClass: 'ep-confirm-dialog',
                icon: 'fa  fa-question-circle fa-4x',
                buttons: [{
                    text: 'Yes', isDefault: true,
                    action: (options ? options.fnDefaultAction : null)
                },
                    {
                        text: 'No', isCancel: true,
                        action: (options ? options.fnCancelAction : null)
                    }]
            };

            setPaneStatus(options, cfg);

            copyProperties(options, cfg);
            show(cfg);
        }

        /**
         * @ngdoc method
         * @name showProgress
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * Shows the standard progress dialog with the message text.
         * @param {object} options - optional settings as follows:
         * <pre>
         *      message - the message to display
         *      title - title (header)
         *      icon - font awesome icon class
         *      status - warning\error\information
         *      buttons - list of buttons (refer to buttons description at service documentation)
         *      fnDefaultAction - function applied to default button if buttons are not supplied
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      autoClose - time in seconds to autoclose
         *      titleClass, iconClass, contentClass - optional classes applied to respective areas
         * </pre>
         */
        function showProgress(options) {
            var cfg = {
                showProgress: true,
                dialogTypeClass: 'ep-progress-dialog',
                icon: 'fa fa-clock-o fa-4x',
                buttons: []
            };
            copyProperties(options, cfg);

            show(cfg);
        }

        /**
         * @ngdoc method
         * @name showLoading
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * Shows the standard loading dialog with the message text.
         * @param {object} options - optional settings as follows:
         * <pre>
         *      message - the message to display
         *      title - title (header)
         *      icon - font awesome icon class
         *      status - warning\error\information
         *      buttons - list of buttons (refer to buttons description at service documentation)
         *      fnDefaultAction - function applied to default button if buttons are not supplied
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      autoClose - time in seconds to autoclose
         *      titleClass, iconClass, contentClass - optional classes applied to respective areas
         * </pre>
         */
        function showLoading(options) {
            var cfg = {
                showLoading: true,
                showProgress: true,
                dialogTypeClass: 'ep-loading-dialog',
                icon: 'fa fa-clock-o fa-4x',
                buttons: []
            };
            copyProperties(options, cfg);

            show(cfg);
        }

        /**
         * @ngdoc method
         * @name showException
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * Shows the standard exception dialog.
         * @param {object} options - optional settings as follows:
         * <pre>
         *      all options from showCustomDialog() and additional:
         *      message - the message to display
         *      title - the title (header)
         *      icon - font awesome icon class
         *      messageDetails - message details to display (hidden if blank)
         *      status - warning\error\information
         *      fnDefaultAction - function applied to default button if buttons are not supplied or isDefault = true
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      btnBlock - block the buttons
         * </pre>
         * @param {object} ex - Error object thrown by javascript. Optional - not used for server exceptions
         */
        function showException(options, ex) {
            var cfg = {
                templateUrl: 'src/components/ep.modaldialog/modals/modaldialog-error.html',
                title: 'Exception',
                icon: '',
                status: 'error',
                statusClass: 'alert-danger',
                statusIcon: 'fa fa-3x fa-warning',
                message: '',
                messageDetails: '',
                btnBlock: false,
                buttons: [{
                    id: 'btnOk', text: 'Ok', isDefault: true, type: 'primary',
                    action: (options ? options.fnDefaultAction : null)
                }]
            };

            if (ex && ex instanceof Error) {
                cfg.message = ex.message;
                cfg.messageDetails = ex.stack;
            }

            if (options && options.status) {
                var status = options.status.toLowerCase();
                switch (status) {
                    case 'warning':
                        cfg.statusClass = 'alert-warning';
                        cfg.statusIcon = 'fa fa-3x fa-warning';
                        break;
                    case 'error':
                        cfg.statusClass = 'alert-danger';
                        cfg.statusIcon = 'fa fa-3x fa-warning';
                        break;
                    case 'information':
                    case 'info':
                        cfg.statusClass = 'alert-info';
                        cfg.statusIcon = 'fa fa-3x fa-info';
                        break;
                }
            }

            copyProperties(options, cfg);

            return showCustomDialog(cfg).result;
        }

        /**
         * @ngdoc method
         * @name showModalForm
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * Shows a modal form
         * @param {object} options - optional settings as follows:
         * <pre>
         *      all options from showCustomDialog() and additional:
         *      title - the title (header)
         *      icon - font awesome icon class
         *      fnDefaultAction - function applied to default button if buttons are not supplied or isDefault = true
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      btnBlock - block the buttons
         * </pre>
         * @param {object} ex - Error object thrown by javascript. Optional - not used for server exceptions
         */
        function showModalForm(options) {
            var cfg = {
                stackable: true,
                kind: 'modal-form',
                title: 'Modal Form',
                icon: '',
                size: 'fullscreen',
                closeButton: true,
                buttons: [{
                    id: 'btnOk', text: 'Ok', isDefault: true, type: 'primary'
                }]
            };

            copyProperties(options, cfg);

            return showCustomDialog(cfg).result;
        }

        /**
         * @ngdoc method
         * @name showMessageBox
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * Shows a traditional message box.
         * @param {object} options - settings neccessary to display dialog:
         * <pre>
         *      all options from showCustomDialog() and additional:
         *      message - the message to display
         *      title - the title (header)
         *      messageDetails - message details to display (hidden if blank)
         *      status - warning\error\information
         *      statusIcon - font awesome icon class (set by default from status)
         *      statusClass - class for status area (set by default from status)
         *      fnDefaultAction - function applied to default button if buttons are not supplied or isDefault: true set
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      btnBlock - block the buttons
         * </pre>
         */
        function showMessageBox(options) {
            var cfg = {
                templateUrl: 'src/components/ep.modaldialog/modals/modaldialog-error.html',
                title: '',
                icon: '',
                status: 'information',
                statusClass: 'alert-info',
                statusIcon: 'fa fa-3x fa-info',
                message: '',
                messageDetails: '',
                btnBlock: false,
                buttons: [{
                    id: 'btnOk', text: 'Ok', isDefault: true, type: 'primary',
                    action: (options ? options.fnDefaultAction : null)
                }]
            };

            if (options && options.status) {
                var status = options.status.toLowerCase();
                switch (status) {
                    case 'warning':
                        cfg.statusClass = 'alert-warning';
                        cfg.statusIcon = 'fa fa-3x fa-warning';
                        break;
                    case 'error':
                        cfg.statusClass = 'alert-danger';
                        cfg.statusIcon = 'fa fa-3x fa-warning';
                        break;
                    case 'information':
                    case 'info':
                        cfg.statusClass = 'alert-info';
                        cfg.statusIcon = 'fa fa-3x fa-info';
                        break;
                }
            }

            copyProperties(options, cfg);

            return showCustomDialog(cfg).result;
        }

        /**
         * @ngdoc method
         * @name showCustomDialog
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * Shows a custom dialog based on a template URL.
         * @param {object} options - settings neccessary to display custom dialog:
         * <pre>
         *      templateOptions -
         *          # templateUrl - url to template html for custom dialog's container
         *          # template - the template html for custom dialog's container
         *          # templateScope - the template scope
         *          # templateCtrl - the template controller
         *      templateUrl - the url template html for custom dialog's container (for compatability - should use templateOptions)
         *      helpTemplateOptions - (optional)
         *          # helpTemplateUrl - url to template html for custom dialog's help content
         *          # template - the template html for custom dialog's help content
         *          # templateScope - the template scope for the custom dialog's help content
         *          # templateCtrl - the help template controller
         *      controller- the controller to execute when showing the dialog (default null)
         *      size - 'small'/'large'/'fullscreen'/'' (default)
         *      icon - font awesome icon class (icon in the header)
         *      backdrop - set true if dialog can closed on background click (default false)
         *      buttons - list of buttons (refer to buttons description at service documentation)
         *      fnDefaultAction - function applied to default button if buttons are not supplied or button has isDefault = true
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      statusBar - set true to display status bar (default false)
         *      statusBarText - the text to display in status bar. Can be HTML. (default empty)
         *      closeButton - set true to display close button (default false)
         *      windowClass - set class to the dialog window
         *      btnBlock - block the buttons
         *      stackable - if true this dialog is stackable (other dialogs can be hosted in it)
         * </pre>
         */
        function showCustomDialog(options) {
            var cfg = options; //for compatability with show()

            //Hide if previous dialog was not stackable
            hide('non-stackable');

            if (checkRememberMe(cfg) === 1) {
                return;
            }

            cfg._isModalDialog = true;
            dialogState.isModal = true;
            setCommonOptions(cfg);

            //In case someone wants to set status bar text from within modal dialog
            cfg.setStatusBarText = function(text) {
                cfg.statusBarTextHTML = angular.isString(text) ?
                    $sce.trustAsHtml(text) : text;
            };

            cfg.setStatusBarText(cfg.statusBarText);

            var winClass = 'ep-modal-window';
            winClass += (cfg.size === 'fullscreen') ? ' ep-fullscreen' : ' ep-responsive';
            if (cfg.windowClass) {
                winClass += ' ' + cfg.windowClass;
            }

            return $uibModal.open({
                windowClass: winClass,
                keyboard: false,
                size: (cfg.size === 'small' ? 'sm' : (cfg.size === 'large' ? 'lg' : '')),
                backdrop: cfg.backdrop === false ? false : cfg.backdrop || false,
                templateUrl: 'src/components/ep.modaldialog/modals/modaldialog-custom.html',
                controller: ['$scope', '$uibModalInstance', '$document', '$timeout',
                    function($scope, $uibModalInstance, $document, $timeout) {

                        dialogs.push({
                            isModal: true,
                            scope: $scope,
                            cfg: cfg,
                            modalInstance: $uibModalInstance
                        });
                        currentDialog = dialogs[dialogs.length - 1];

                        $scope.config = cfg;
                        $scope.modalInstance = $uibModalInstance;

                        //For compatibility of just templateUrl (without templateOptions)
                        if (cfg.templateUrl && !cfg.templateOptions) {
                            cfg.templateOptions = {
                                templateUrl: cfg.templateUrl
                            };
                        }

                        // for compatibility with the 'helpTemplateUrl' form without helpTemplateOptions
                        if (cfg.helpTemplateUrl || cfg.helpTemplate) {
                            cfg.helpTemplateOptions = cfg.helpTemplateOptions || {};
                            cfg.helpTemplateOptions.templateUrl =
                                cfg.helpTemplateOptions.templateUrl || cfg.helpTemplateUrl;
                            cfg.helpTemplateOptions.template =
                                cfg.helpTemplateOptions.template || cfg.helpTemplate;
                        }

                        if (cfg.helpTemplateOptions) {
                            if (!cfg.helpTemplateOptions.templateScope) {
                                cfg.helpTemplateOptions.templateScope = $scope;
                            }
                            $scope.helpButtonClick = function() {
                                $scope.showHelp = !$scope.showHelp;
                            };
                            $scope.closeHelp = function() {
                                $scope.showHelp = false;
                            };
                        }

                        if (cfg.templateOptions && !cfg.templateOptions.templateScope) {
                            cfg.templateOptions.templateScope = $scope;
                        }

                        if (cfg.controller) {
                            $injector.invoke(cfg.controller, $scope.modalInstance,
                                {'$scope': $scope, '$uibModalInstance': $uibModalInstance});
                        }

                        $scope.btnclick = function(btn, action) {
                            var prevCfg = {};
                            copyProperties(dialogState.config, prevCfg);

                            var result = onButtonClick($scope.config, btn, action);
                            if (result !== -1) {
                                $timeout(function() {
                                    //release(prevCfg);
                                    if (action === 'fnCancelAction' || (btn && btn.isCancel)) {
                                        closeCurrentDialog(true);
                                    } else if ($scope.config.stackable !== true) {
                                        closeCurrentDialog(false, result);
                                    } else {
                                        release();
                                    }
                                });
                            }
                        };

                        function onKeydown(evt) {
                            if ($scope.modalInstance !== currentDialog.modalInstance) {
                                return;
                            }
                            if (evt.which === 13 || evt.which === 27) {
                                var processed = true;
                                var btn = _.find(cfg.buttons, function(btn) {
                                    return (evt.which === 13) ? btn.isDefault : btn.isCancel;
                                });
                                if (btn) {
                                    $scope.btnclick(btn);
                                } else if (evt.which === 13 && cfg.fnDefaultAction) {
                                    $scope.btnclick(null, 'fnDefaultAction');
                                } else if (evt.which === 27 && cfg.fnCancelAction) {
                                    $scope.btnclick(null, 'fnCancelAction');
                                } else if (evt.which === 27) {
                                    $timeout(function() {
                                        closeCurrentDialog(true);
                                    });
                                } else {
                                    processed = false;
                                }
                                if (processed) {
                                    evt.preventDefault();
                                    evt.stopPropagation();
                                }
                            }
                        }

                        $document.on('keydown', onKeydown);

                        $scope.$on('$destroy', function() {
                            $document.off('keydown', onKeydown);
                        });

                        $timeout(function() {
                            var footerHeight = $('.ep-modal-footer').innerHeight();
                            var headerHeight = $('.ep-modal-header').innerHeight() + 5;
                            var statusBarHeight = $('.ep-dlg-status h4').innerHeight();

                            if ($scope.config.statusBar === true) {
                                var totalFooterHeight = footerHeight + statusBarHeight;
                                $('.ep-modal-area').css({
                                    paddingBottom: totalFooterHeight + 'px',
                                    paddingTop: headerHeight + 'px'
                                });
                                $('.ep-modal-footer').css({ 'bottom': statusBarHeight + 'px' });
                            } else {
                                $('.ep-modal-area').css({
                                    paddingBottom: footerHeight + 'px',
                                    paddingTop: headerHeight + 'px'
                                });
                            }
                        });
                    }]
            });
        }

        /**
         * @ngdoc method
         * @name hide
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * Hides any current dialog in operation by this service.
         * @param {string} mode - optional mode:
         *  # 'all' - closes all open dialogs
         *  # 'panel' - closes only if current dialog is a panel
         *  # 'modal' - closes only if current dialog is a modal
         *  # 'modal-form' - closes only if current dialog is a modal-form
         *  # 'current' - closes current dialog
         *  # 'non-stackable' - close only if current modal is not stackable
         */
        function hide(mode) {
            var md = (mode || '').toLowerCase();
            if (md === 'all') {
                release();
                $uibModalStack.dismissAll();
                currentDialog = undefined;
                dialogs = [];
                dialogState.isVisible = false;
                dialogState.isModal = false;
            } else if (md === 'panel') {
                if (currentDialog && currentDialog.isModal !== true) {
                    closeCurrentDialog();
                }
            } else if (md === 'modal') {
                if (currentDialog && currentDialog.isModal === true) {
                    closeCurrentDialog();
                }
            } else if (md === 'modal-form') {
                if (currentDialog && currentDialog.isModal === true && currentDialog.cfg.kind === 'modal-form') {
                    closeCurrentDialog();
                }
            } else if (md === 'current') {
                closeCurrentDialog();
            } else if (md === 'non-stackable') {
                //close only if the current dialog is non-stackable
                if (currentDialog && (currentDialog.cfg.stackable !== true)) {
                    closeCurrentDialog();
                }
            } else {
                if (currentDialog && currentDialog.isModal === true && currentDialog.cfg.kind === 'modal-form') {
                    //by default we do not close modal forms. You have to select 'modal-form'
                    return;
                }
                closeCurrentDialog();
            }
        }

        /**
         * @ngdoc method
         * @name clearRememberMe
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * Clears the RememberMe cached flag for a specific dialog or all dialogs.
         */
        function clearRememberMe(dialogId) {
            if (dialogId) {
                epLocalStorageService.clear(dialogStoragePrefix + dialogId);
            } else {
                //clear all dialog settings
                epLocalStorageService.clear(dialogStoragePrefix.substr(0, dialogStoragePrefix.length - 1));
            }
        }

        /* Private Functions */

        /**
         * @name copyProperties
         * @private
         * @description
         * Copies properties from source to dest.
         */
        function copyProperties(source, dest) {
            if (!source || !dest) {
                return;
            }
            angular.forEach(source, function(value, propName) {
                if (source[propName] !== null) {
                    if (angular.isArray(source[propName])) {
                        dest[propName] = source[propName];
                    } else if (angular.isObject(source[propName])) {
                        copyProperties(source[propName], dest[propName]);
                    } else {
                        dest[propName] = source[propName];
                    }
                }
            });
        }

        /**
         * @name show
         * @private
         * @description
         * Shows the panel dialog (confirmation).
         * @param {object} options - optional settings as follows:
         * <pre>
         *      message - the message to display
         *      title - title (header)
         *      icon - font awesome icon class
         *      buttons - list of buttons
         *      fnDefaultAction - function applied to default button if buttons are not supplied
         *      autoClose - time in seconds to autoclose
         *      titleClass, iconClass, contentClass - optional classes applied to respective areas
         * </pre>
         */
        function show(options) {
            release();

            //Hide if previous dialog was not stackable
            hide('non-stackable');

            // reset the config object to default values.
            var cfg = {};

            copyProperties(defaultConfig, cfg);

            // override default values with values provided.
            copyProperties(options, cfg);

            if (checkRememberMe(cfg)) {
                hide('current');
                return;
            }

            dialogState.isVisible = true;
            dialogState.isModal = false;

            //Just in case - make sure panel is created
            checkCreatePaneElement();

            cfg._isModalDialog = false;
            setCommonOptions(cfg);

            if (dialogState.paneScope) {
                //update the panel scope
                dialogState.paneScope.config = cfg;
            }

            dialogs.push({
                isModal: false,
                scope: dialogState.paneScope,
                cfg: cfg,
                modalInstance: undefined
            });
            currentDialog = dialogs[dialogs.length - 1];
        }

        /**
         * @name setCommonOptions
         * @private
         * @description
         * Sets options common both to a dialog and pane
         */
        function setCommonOptions(cfg) {
            dialogState.config = cfg;

            if (cfg.buttons && cfg.buttons.length) {
                angular.forEach(cfg.buttons, function(btn) {
                    //set default button style
                    if (!btn.type) {
                        if (cfg._isModalDialog && btn.isDefault === true) {
                            btn.type = 'primary';
                        } else if (cfg._isModalDialog && btn.isCancel === true) {
                            btn.type = 'warning';
                        } else {
                            btn.type = 'default';
                        }
                    }
                });
            }

            if (cfg.autoClose) {
                cfg.messageHasTimer = (cfg.message.indexOf('{timer}') >= 0);
                cfg.titleHasTimer = (cfg.title.indexOf('{timer}') >= 0);

                cfg.autoClosePromise = $timeout(function() {
                    if ((cfg.autoClosePromise !== null) && cfg.fnDefaultAction) {
                        cfg.fnDefaultAction();
                    }
                    hide('current');
                }, cfg.autoClose * 1000);

                cfg.countDown = cfg.autoClose;

                //check if we need an interval for seconds countdown:
                if (cfg.messageHasTimer || cfg.titleHasTimer || cfg.showTimer) {
                    cfg.timerPromise = $interval(function() {

                        cfg.countDown--;

                        if (cfg.countDown <= 0) {
                            $interval.cancel(cfg.timerPromise);
                            cfg.timerPromise = null;
                        }
                    }, 1000, 0);
                }

                cfg.spinnerTextClass = (cfg.countDown < 100) ? 'ep-timer-large-font' : 'ep-timer-small-font';
            }

            cfg.showSpinner = (cfg.showTimer || cfg.showProgress);
            if (cfg.showSpinner) {
                cfg.spinnerIconClass = cfg.showTimer ? 'fa-circle-o-notch' : 'fa-spinner fa-pulse';
            }

            cfg.fnGetMessage = function() {
                if (cfg.messageHasTimer) {
                    var repl = (cfg.countDown !== undefined && cfg.countDown !== null) ? cfg.countDown : '';
                    return cfg.message.replace('{timer}', repl);
                }
                return cfg.message;
            };
            cfg.fnGetTitle = function() {
                if (cfg.titleHasTimer) {
                    var repl = (cfg.countDown !== undefined && cfg.countDown !== null) ? cfg.countDown : '';
                    return cfg.title.replace('{timer}', repl);
                }
                return cfg.title;
            };
        }

        /*
         * @name onButtonClick
         * @private
         * @description
         * when button is clicked processing
         */
        function onButtonClick(cfg, btn, action) {
            var result = 0;
            var btnRemId = '';
            if (btn) {
                if (btn.action) {
                    result = btn.action(cfg, btn);
                    btnRemId = btn.text;
                } else if (btn.isDefault === true && cfg.fnDefaultAction) {
                    result = cfg.fnDefaultAction(cfg, btn);
                    btnRemId = 'fnDefaultAction';
                } else if (btn.isCancel === true && cfg.fnCancelAction) {
                    result = cfg.fnCancelAction(cfg, btn);
                    btnRemId = 'fnCancelAction';
                } else if (cfg.fnButtonAction) {
                    result = cfg.fnButtonAction(cfg, btn);
                    btnRemId = btn.text;
                } else {
                    btnRemId = btn.text;
                }
            } else if (action) {
                if (action === 'fnDefaultAction' && cfg.fnDefaultAction) {
                    result = cfg.fnDefaultAction(cfg);
                    btnRemId = 'fnDefaultAction';
                } else if (action === 'fnCancelAction' && cfg.fnCancelAction) {
                    result = cfg.fnCancelAction(cfg);
                    btnRemId = 'fnCancelAction';
                }
            }

            if (cfg.rememberMeValue && cfg.dialogId && btnRemId) {
                //need button id.
                epLocalStorageService.update(dialogStoragePrefix + cfg.dialogId, btnRemId);
            }
            return result;
        }

        /*
         * @name checkRememberMe
         * @private
         * @description
         * checks if rememeberMe action is to be invoked
         */
        function checkRememberMe(cfg) {
            cfg.rememberMeValue = false;
            if (cfg.rememberMe && !cfg.dialogId) {
                cfg.rememberMe = false;
            }

            if (cfg.rememberMe && cfg.dialogId && epLocalStorageService.get(dialogStoragePrefix + cfg.dialogId)) {
                var actionFound = false;
                var btnRemId = epLocalStorageService.get(dialogStoragePrefix + cfg.dialogId);
                if (btnRemId === 'fnDefaultAction' && cfg.fnDefaultAction) {
                    actionFound = true;
                    cfg.fnDefaultAction(cfg);
                } else if (btnRemId === 'fnCancelAction' && cfg.fnCancelAction) {
                    actionFound = true;
                    cfg.fnCancelAction(cfg);
                } else {
                    var b = null;
                    angular.forEach(cfg.buttons, function(btn) {
                        if (btn.text === btnRemId) {
                            b = btn;
                        }
                    });
                    if (b) {
                        if (b.action) {
                            actionFound = true;
                            b.action(cfg, b);
                        } else if (b.fnButtonAction) {
                            actionFound = true;
                            b.fnButtonAction(cfg, b);
                        }
                    }
                }

                if (!actionFound) {
                    return -1;
                }
                return 1;
            }
            return 0;
        }

        /**
         * @name setPaneStatus
         * @private
         * @description
         * Sets the status for the panel dialogs.
         */
        function setPaneStatus(options, cfg) {
            if (options && options.status) {
                var status = options.status.toLowerCase();
                cfg.titleClass = (status === 'warning') ? 'text-warning' :
                    ((status === 'error') ? 'text-danger' : 'text-success');
                cfg.icon = (status === 'warning' || status === 'error') ? 'fa fa-4x fa-warning' :
                    'fa fa-4x fa-check';
            }
        }

        /**
         * @name release
         * @private
         * @description
         * Releases timeouts and intervals
         */
        function release(config) {
            var cfg = config ? config : dialogState.config;
            if (cfg.autoClosePromise) {
                $timeout.cancel(cfg.autoClosePromise);
                cfg.autoClosePromise = null;
            }
            if (cfg.timerPromise) {
                $interval.cancel(cfg.timerPromise);
                cfg.timerPromise = null;
            }
        }

        function closeCurrentDialog(isCancel, result) {
            release();
            dialogState.isVisible = false;

            if (currentDialog && currentDialog.isModal) {
                var instance = currentDialog.modalInstance;
                if (instance) {
                    if (isCancel) {
                        instance.dismiss('cancel');
                    } else {
                        instance.close(!result ? 0 : result);
                    }
                }
            }
            dialogs.pop();
            currentDialog = (dialogs.length) ? dialogs[dialogs.length - 1] : undefined;
        }

        /**
         * @name checkCreatePaneElement
         * @private
         * @description
         * Check if panel element has been created in the DOM, if not creates it
         */
        function checkCreatePaneElement() {
            if (!angular.element('body .ep-modaldialog.ep-modaldialog-pane').length) {
                dialogState.paneScope = $rootScope.$new();
                dialogState.paneScope.dialogState = dialogState;
                dialogState.paneScope.btnclick = function(btn) {
                    hide('panel');
                    onButtonClick(dialogState.config, btn);
                };
                angular.element(document.body).append($compile('<epmodaldialog></epmodaldialog>')(
                    dialogState.paneScope));
            }
        }

        /**
         * @name init
         * @private
         * @description
         * Called on service start-up
         */
        function init() {
            angular.copy(defaultConfig, dialogState.config);
            checkCreatePaneElement();
        }

        //initialize the service
        init();

        return {
            showModalForm: showModalForm,
            showMessage: showMessage,
            showConfirm: showConfirm,
            showLoading: showLoading,
            showProgress: showProgress,
            showException: showException,
            showMessageBox: showMessageBox,
            showCustomDialog: showCustomDialog,
            hide: hide,
            clearRememberMe: clearRememberMe,
            state: dialogState
        };

    }

}());

/**
 * @ngdoc controller
 * @name ep.modaldialog.controller:epModalDialogErrorCtrl
 * @description
 * Represents the a controller for the modaldialog-error.html template.
 * This controller will set up the max width of the message
 *
 */
(function() {
    'use strict';

    angular.module('ep.modaldialog').controller('epModalDialogErrorCtrl', [
    '$scope',
    function($scope) {
        var cfg = $scope.config;
        cfg.callFnHideModalError = true;
        //This will handle big server exception HTML errors, setting max-width of the
        //error message. callFnHideModalError to prevent multiple times calling (perf)
        cfg.fnHideModalError = function() {
            var elMsg = angular.element('.ep-dlg-message');
            var elBody = angular.element('.ep-modaldialog-error');
            if (elMsg.length && elBody.length) {
                if (elMsg.length && elMsg[0].clientWidth > elBody[0].clientWidth) {
                    elMsg.css('max-width', elBody[0].clientWidth - 70);
                    cfg.callFnHideModalError = false;
                }
            }
        };
    }
    ]);
})();

/**
 * @ngdoc service
 * @name ep.shell.service:epShellFeedbackService
 * @description
 * Service for the ep.shell module
 * This service provides user feedback from the ep.shell
 */
(function() {
    'use strict';

    angular.module('ep.shell').service('epShellFeedbackService', [
    'epModalDialogService',
    function(epModalDialogService) {

        /**
         * @ngdoc method
         * @name afterSuccessSubmit
         * @methodOf ep.shell.service:epShellFeedbackService
         * @private
         * @description
         * Called after successful submit. Displays a dialog.
         */
        function afterSuccessSubmit() {
            //TO DO: Shell Resources
            var resources = {
                strings: {
                    FeedbackResponse:
                    'We appreciate your feedback! We review these items regularly to help us improve the product.',
                    FeedbackTitle:
                    'Thank You!'
                }
            };
            epModalDialogService.showMessageBox({
                message: resources.strings.FeedbackResponse,
                title: resources.strings.FeedbackTitle,
                status: 'info'
            });
        }

        /*  ----- Public Functions -------> */

        /**
         * @ngdoc method
         * @name showForm
         * @methodOf ep.shell.service:epShellFeedbackService
         * @public
         * @description
         * Shows feedback submission form. Must pass a callback function fnOnSubmit parameter
         * which will be invoked upon submit
         */
        function showForm(fnOnSubmit) {
            var feedback = {
                summary: '',
                description: '',
                customerName: '',
                customerEmail: ''
            };
            epModalDialogService.showCustomDialog({
                title: 'Submit Feedback',
                templateUrl: 'src/components/ep.shell/feedback/feedback_dialog.html',
                icon: 'fa fa-bullhorn fa-2x',
                feedback: feedback,
                summaryLabel: 'Summary',
                descriptionLabel: 'Description',
                customerNameLabel: 'Customer Name',
                customerEmailLabel: 'Customer Email',
                buttons: [
                    {
                        id: 'btnSubmit',
                        isPrimary: true,
                        text: 'Submit',
                        action: function() {
                            if (fnOnSubmit) {
                                var ret = fnOnSubmit(feedback);
                                if (ret.then) {
                                    ret.then(function(result) {
                                        if (result.Success) {
                                            afterSuccessSubmit();
                                        }
                                    });
                                } else {
                                    afterSuccessSubmit();
                                }
                            }
                        }
                    },
                    {
                        id: 'btnCancel',
                        isCancel: true,
                        text: 'Cancel'
                    }
                ]
            });
        }
        return {
            showForm: showForm
        };
    }]);
})();

/**
 * @ngdoc object
 * @name ep.shell.object:epShellConstants
 * @description
 * Constants for epShellConstants.
 * ep.shell constants
 * Events:
    * <pre>
    *   SHELL_SIZE_CHANGE_EVENT - event shell size is changed
    *   SHELL_STATE_CHANGE_EVENT - event shell state changes
    *   SHELL_NAV_BUTTONS_CHANGED_EVENT - event when nav buttons change
    *   SHELL_VIEW_SIZE_CHANGE_EVENT - view container size change
    * </pre>
 */
(function() {
    'use strict';

    angular.module('ep.shell').constant('epShellConstants', {
        //EVENT NAMES:
        SHELL_SIZE_CHANGE_EVENT: 'SHELL_SIZE_CHANGE_EVENT',
        SHELL_STATE_CHANGE_EVENT: 'SHELL_STATE_CHANGE_EVENT',
        SHELL_NAV_BUTTONS_CHANGED_EVENT: 'SHELL_NAV_BUTTONS_CHANGED_EVENT',
        SHELL_VIEW_SIZE_CHANGE_EVENT: 'SHELL_VIEW_SIZE_CHANGE_EVENT',
        SHELL_VIEW_CHANGE_EVENT: 'SHELL_VIEW_CHANGE_EVENT',

        SHELL_CACHE_CREATED_EVENT: 'SHELL_CACHE_CREATED_EVENT',
        SHELL_CACHE_DELETED_EVENT: 'SHELL_CACHE_DELETED_EVENT',
        SHELL_DATA_CACHED_EVENT: 'SHELL_DATA_CACHED_EVENT',
        SHELL_CACHE_DATA_DELETED_EVENT: 'SHELL_CACHE_DATA_DELETED_EVENT',
        //SIZE CONSTANTS:
        SIDEBARWIDTH: 250,
        NAVBARHEIGHT: 40,
        FOOTERHEIGHT: 25,
        MEDIA_MODE_LARGE: 'large',
        MEDIA_MODE_SMALL: 'small',
        MEDIA_SIZE_BREAKPOINT: 801
    });
})();

/**
* @ngdoc controller
* @name ep.shell.controller:epShellCtrl
* @description
* Represents the main shell controller.
*/
(function() {
    'use strict';
    angular.module('ep.shell')
        .directive('myTouchstart', function() {
            return function(scope, element, attr) {
                element.bind('touchstart', function() {
                    scope.$apply(attr.myTouchstart);
                });
            };
        })
        .controller('epShellCtrl',
            /*@ngInject*/
            ['$location', '$rootScope', '$route', '$scope', 'epShellConfig', 'epShellService', 'epLocalStorageService', 'epShellFeedbackService', 'epShellConstants', 'epThemeConstants', function($location, $rootScope, $route, $scope, epShellConfig, epShellService, epLocalStorageService,
                  epShellFeedbackService, epShellConstants, epThemeConstants) {

            // Any logic that requires the immediate use of the emaService or the EmaRestService needs to be executed inside the "init" call in the controller.
            // If the logic is already inside an event handler
            function init() {
                // get the epShellService state so it can be used in the views
                $scope.state = epShellService.__state;
                $scope.options = epShellConfig.options;

                //toggle sidebar event function
                $scope.toggleLeftSidebar = function() {
                    epShellService.toggleLeftSidebar();
                };
                //toggle sidebar event function
                $scope.toggleRightSidebar = function() {
                    epShellService.toggleRightSidebar();
                };
                //Swipe right 0-20% of the width of screen to pull left sidebar
                $scope.showSwipeLeftSidebar = function() {
                    var touchStart = $scope.findXTouch;
                    var screenWidth = screen.width;
                    var touchStartPercent = (touchStart / screenWidth) * 100;
                    if (touchStartPercent <= 10 && $scope.state.enableLeftSidebar) {
                        epShellService.toggleLeftSidebar();
                    }
                };
                //Swipe left 80-100% of the width of screen to pull right sidebar
                $scope.showSwipeRightSidebar = function() {
                    var touchStart = $scope.findXTouch;
                    var screenWidth = screen.width;
                    var touchStartPercent = (touchStart / screenWidth) * 100;
                    if (touchStartPercent >= 90 && $scope.state.enableRightSidebar) {
                        epShellService.toggleRightSidebar();
                    }
                };
                $scope.getTouchXPoint = function() {
                    $scope.findXTouch = epShellService.executeLeftSidebar(event);
                    return $scope.findXTouch;
                };
                //Close left sidebar on swipping right on left sidebar
                $scope.closeLeftSidebar = function() {
                    epShellService.hideLeftSidebar();
                };
                //Close right sidebar on swipping left on right sidebar
                $scope.closeRightSidebar = function() {
                    epShellService.hideRightSidebar();
                };

                if (epShellConfig.options.enableViewAnimations) {
                    epShellService.initViewBackground();
                }
                $scope.rightNavButtons = epShellService.getNavbarButtons().filter(function(b) {
                    return !b.left;
                });
                $scope.leftNavButtons = epShellService.getNavbarButtons().filter(function(b) {
                    return b.left;
                });

                $rootScope.$on(epShellConstants.SHELL_NAV_BUTTONS_CHANGED_EVENT, function() {
                    $scope.rightNavButtons = epShellService.getNavbarButtons().filter(function(b) {
                        return !b.left;
                    });
                    $scope.leftNavButtons = epShellService.getNavbarButtons().filter(function(b) {
                        return b.left;
                    });
                });
                if (epShellConfig.options.enableViewAnimations) {
                    $rootScope.$on(epThemeConstants.THEME_CHANGE_EVENT, function() {
                        epShellService.initViewBackground();
                    });
                }
                $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
                    epShellService.clearInfo();
                    epShellService.cleanupViewEvents();

                    if (epShellConfig.options.enableViewAnimations && currRoute &&
                        currRoute.$$route && prevRoute && prevRoute.$$route) {
                        if (currRoute.$$route.index > prevRoute.$$route.index) {
                            epShellService.viewAnimation('ep-slide-left');
                        } else if (prevRoute.$$route.index > currRoute.$$route.index) {
                            epShellService.viewAnimation('ep-slide-right');
                        }

                    }
                });

                //launch help event function
                $scope.launchHelp = function() {
                    $location.url('/help');
                };

                $scope.sendFeedback = function() {
                    epShellFeedbackService.showForm($scope.state.fnOnFeedback);
                };
            }

            try {
                $rootScope.$watch('initComplete', function(complete) {
                    if (complete) {
                        init();
                    }
                });
            } catch (ex) {
                console.log(ex);
            }
        }]
    );
})();

/**
     * @ngdoc directive
     * @name ep.shell.directive:epshell
     * @restrict E
     *
     * @description
     * Represents the shell directive
     *
     * @example
     * usage. place on main index page as:
     * <body>
     *   <epshell><div ng-view></div></epshell>
     * </body>
     */
(function() {
    'use strict';

    angular.module('ep.shell').directive('epShell', [
    function() {
        return {
            restrict: 'E,A',
            replace: true,
            transclude: true,
            templateUrl: 'src/components/ep.shell/shell.html'
        };
    }
    ]);
})();

/**
 * @ngdoc object
 * @name ep.shell.object:epShellConfig
 * @description
 * Provider for epShellConfig.
 * Gets configuration options from sysconfig.json or default
 */
(function() {
    'use strict';

    angular.module('ep.shell').provider('epShellConfig',
        /*@ngInject*/
        ['$routeProvider', function($routeProvider) {
            var routeProviderReference = $routeProvider;

            var config = {
                options: {
                    pageTitle: 'Epicor Mobile',
                    brandHTML: 'Epicor Mobile Framework <sup>2.0</sup>',
                    enableFeedback: true,
                    includeEmbeddedApps: false,
                    enableViewAnimations: true,
                    enableCache: true
                },

                /**
                 * @ngdoc property
                 * @name routes
                 * @propertyOf ep.shell.object:epShellConfig
                 * @public
                 * @description
                 * routes is the rounting configuration. example:
                 * routes : [
                 *    { route: '/home', url: './main-application/views/homeview.html', controller: 'HomeCtrl' },
                 *    { route: '/login', url: './main-application/views/loginview.html', controller: 'LoginCtrl', isDefault: true }
                 * ]
                 */
                routes: [],

                /**
                 * @ngdoc property
                 * @name homeRoute
                 * @propertyOf ep.shell.object:epShellConfig
                 * @public
                 * @description
                 * This is the route defined as the home route
                 */
                homeRoute: undefined,

                /**
                 * @ngdoc property
                 * @name defaultRoute
                 * @propertyOf ep.shell.object:epShellConfig
                 * @public
                 * @description
                 * This is the route defined as the default route, to which we fallback on any
                 * invalid route. Typically the login page
                 */
                defaultRoute: undefined

            };

            //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
            //In our case, the "service" is the environment configuration object
            //The $get is called automatically when AngularJS encounters a DI.
            //
            // also knowing despite the (use $http instead of $.ajax) rules on the EMF coders styleguide
            // There is a problem: $http is an asynchronous call, so its not guaranteed that the
            // data will be returned with the values read from the sysconfig.json.
            // To get around we have to make $http a sync call, which is not possible.
            this.$get = ['epSysConfig', function(epSysConfig) {
                epSysConfig.mergeSection('ep.shell', config);

                config.options.enableFeedback = epSysConfig.optionBool(config.options.enableFeedback, false);
                config.options.enableViewAnimations = epSysConfig.optionBool(config.options.enableViewAnimations, true);
                config.options.enableCache = epSysConfig.optionBool(config.options.enableCache, true);
                angular.forEach(config.routes, function(r) {
                    routeProviderReference.when(r.route, {
                        index: r.index,
                        templateUrl: r.url,
                        controller: r.controller,
                        reloadOnSearch: (r.reloadOnSearch === undefined) ? true : r.reloadOnSearch,
                        transitions: r.transitions
                    });
                    if (r.isDefault === true) {
                        routeProviderReference.otherwise({redirectTo: r.route});
                        config.defaultRoute = r;
                    }
                    if (r.isHome === true) {
                        config.homeRoute = r;
                    }
                });

                if (!config.homeRoute) {
                    config.homeRoute = config.defaultRoute;
                }

                if (config.options.includeEmbeddedApps) {

                    //For now this is good enough, consider using injection of embedded apps service
                    //to retrieve rootRoute
                    var sectionEmbedded = epSysConfig.section('ep.embedded.apps');
                    var rootRoute = '/' + (sectionEmbedded.rootRoute || 'app') + '/:appId/:viewId/';

                    routeProviderReference.when(rootRoute, {
                        templateUrl: 'src/components/ep.shell/views/ep-shell-embedded-apps-container.html'
                    });

                    routeProviderReference.when(rootRoute + ':p0', {
                        templateUrl: 'src/components/ep.shell/views/ep-shell-embedded-apps-container.html'
                    });
                    routeProviderReference.when(rootRoute + ':p0/:p1', {
                        templateUrl: 'src/components/ep.shell/views/ep-shell-embedded-apps-container.html'
                    });
                    routeProviderReference.when(rootRoute + ':p0/:p1/:p2', {
                        templateUrl: 'src/components/ep.shell/views/ep-shell-embedded-apps-container.html'
                    });
                    routeProviderReference.when(rootRoute + ':p0/:p1/:p2/:p3', {
                        templateUrl: 'src/components/ep.shell/views/ep-shell-embedded-apps-container.html'
                    });
                    routeProviderReference.when(rootRoute + ':p0/:p1/:p2/:p3/:p4', {
                        templateUrl: 'src/components/ep.shell/views/ep-shell-embedded-apps-container.html'
                    });
                }

                return config;
            }];
        }]);
})();

/**
 * @ngdoc service
 * @name ep.shell.service:epShellService
 * @description
 * Service for the ep.shell
 * This service provides functions for interaction with the ep.shell
 * The ep-shell directive is the core item that needs to be present on the page
 * and epShellService.init() must be called from application initialization
 *
 * @example
 *  The main page (like index.html) should contain nothing but the shell directive like so:
 *
 *  <body>
 *        <ep-shell><div ng-view></div></ep-shell>
 *  </body>
 *
 *  The application run code should initialize the shell like so:
 *
 *   angular.module('test-app', ['ep.shell'])
 *   .run(function(epShellService) {
 *       epShellService.init();
 *   });
 *
 */
(function() {
    'use strict';

    angular.module('ep.shell').service('epShellService',
        /*@ngInject*/
        ['$compile', '$document', '$location', '$q', '$rootScope', '$sce', '$timeout', 'epUtilsService', 'epFeatureDetectionService', 'epShellConfig', 'epShellConstants', 'epSidebarService', 'epThemeService', function($compile, $document, $location, $q, $rootScope, $sce, $timeout,
                 epUtilsService, epFeatureDetectionService,
                 epShellConfig, epShellConstants, epSidebarService, epThemeService) {

            //console service is optional...
            try {
                if (angular.module('ep.console')) {
                    epUtilsService.getService('epConsoleService', true).then(function(epConsoleService) {
                        if (epConsoleService) {
                            epConsoleService.initialize();
                        }
                    });
                }
            } catch (e) { }

            $rootScope.shellServiceInitComplete = false;

            /**
             * @private
             * @description
             * Holds the current shell state. Almost all settings are here
             */
            var shellState = {
                showProgressIndicator: false,
                progressIndicatorlevel: 0,
                enableFeedback: false,
                enableEmbeddedApps: true,
                fnOnFeedback: undefined,
                suspend: false,
                showBrand: true,
                brandHTML: 'Mobile Access <sup>2.0</sup>',
                brandTarget: '',
                footerHTML: '',
                footerTarget: '',
                freezeNavButtons: false,
                viewContainerScope: null,
                viewSettings: {
                    sidebar: {
                        left: {
                            enabled: true,
                            showToggleButton: true,
                            toggleIcon: 'fa-bars'
                        },
                        right: {
                            enabled: true,
                            showToggleButton: true,
                            toggleIcon: 'fa-bars'
                        }
                    },
                    small: {
                        animateViewContainer: true,
                        autoActivateSidebar: false,
                        showLeftSidebar: false,
                        enableLeftSidebar: true,
                        showLeftToggleButton: false,
                        showRightToggleButton: false,
                        leftToggleButtonIcon: 'fa-bars',
                        rightToggleButtonIcon: 'fa-bars',
                        showNavbar: false,
                        showFooter: false,
                        showHomeButton: false,
                        showBrand: false,
                        centerBrand: true
                    },
                    large: {
                        animateViewContainer: true,
                        autoActivateSidebar: true,
                        showLeftSidebar: false,
                        enableLeftSidebar: true,
                        showLeftToggleButton: false,
                        showRightToggleButton: false,
                        leftToggleButtonIcon: 'fa-bars',
                        rightToggleButtonIcon: 'fa-bars',
                        showNavbar: false,
                        showFooter: false,
                        showHomeButton: false,
                        showBrand: false,
                        centerBrand: false
                    }
                },
                pageTitle: '',
                colorScheme: {},
                mediaMode: epShellConstants.MEDIA_MODE_SMALL,
                date: {
                    weekday: 'Tuesday',
                    month: 'October',
                    day: 21
                },
                viewDimensions: {
                    offset: {top: 0, left: 0},
                    size: {width: 0, height: 0}
                },
                infoMessage: '',
                infoIcon: 'fa fa-3x fa-warning',
                executeButton: function(btn,evt) {
                    shellState.navButtonClicked = null;
                    if (btn.confirm) {
                        btn.confirm(btn.action);
                    } else if (shellState.freezeNavButtons !== true && btn.enabled !== false) {
                        if (btn.type === 'checked') {
                            if (evt.target.checked === undefined) {
                                btn.checked = !btn.checked;
                            } else {
                                $timeout(function() {
                                    $(evt.target).prop('checked', btn.checked);
                                });
                            }
                        }
                        btn.action(btn,evt);
                        if (btn.type === 'checked') {
                            evt.preventDefault();
                            evt.stopPropagation();
                        }
                    }
                },
                buttonMouseDown: function(btn) {
                    //record buttonClicked (for ng-blur events). it will be dismissed after real click.
                    shellState.navButtonClicked = btn;
                },
                momentumScrollingEnabled: true,
                allowVerticalScroll: true,
                //Stores the nav button that is clicked on mouse down event. This state is cleared on actual click event.
                //Useful for blur processing
                navButtonClicked: null,
                viewModalOptions: {}
            };

            /**
             * @private
             * @description
             * After saveState() is called, savedState contains certain properties of current shell state
             * that are needed to restore later.
             */
            var savedState = {};

            /**
             * @private
             * @description
             * Contains the navigation buttons array
             */
            var navbarButtons = [];

            /**
             * @private
             * @description
             * Contains the bound view events
             */
            var boundViewEvents = {};

            /**
             * @private
             * @description
             * Certain things we initialize at the first reference of the service
             */
            function initialize() {
                //setup the epFeatureDetectionService enquireService registration at 800 px so that we can
                //perform Javascript operations when the UI goes into large / small mode
                epFeatureDetectionService.registerMediaQuery(epShellConstants.MEDIA_SIZE_BREAKPOINT, function() {
                    shellState.mediaMode = epShellConstants.MEDIA_MODE_LARGE;
                    notifyStateChanged('setMediaMode');
                    toggleLeftSidebarBackdrop();
                }, function() {
                    shellState.mediaMode = epShellConstants.MEDIA_MODE_SMALL;
                    notifyStateChanged('setMediaMode');
                    toggleLeftSidebarBackdrop();
                });

                //Any time the size of the shell window changes fire an event to the views
                function sendResizeEvent() {
                    if (isMediaModeLarge()) {
                        showLeftSidebar();
                    } else {
                        hideLeftSidebar();
                    }
                    notifySizeChanged('size');
                }

                //this is to ensure it only happens one time
                var lazySendResize = _.debounce(sendResizeEvent, 100);
                angular.element(window).on('resize', lazySendResize);
                $timeout(sendResizeEvent, 100);
                $rootScope.$on('$routeChangeSuccess', sendResizeEvent);

                setPageTitle(epShellConfig.options.pageTitle);
                setBrandHTML(epShellConfig.options.brandHTML);
                setFooterHTML(epShellConfig.options.footerHTML);

                if (epShellConfig.options.includeEmbeddedApps !== undefined) {
                    if (epShellConfig.options.includeEmbeddedApps) {
                        $rootScope.$watch('initComplete', function(complete) {
                            if (complete) {
                                //place here whatever needs to be initialized after initComplete
                                if (angular.module('ep.embedded.apps')) {
                                    epUtilsService.getService('epEmbeddedAppsService', true)
                                        .then(function(epEmbeddedAppsService) {
                                        if (epEmbeddedAppsService) {
                                            epEmbeddedAppsService.initialize();
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            }

            /**
             * @private
             * @description
             * Set flags depending on current mode (small or large)
             */
            function setCurrentModeFlags(viewScope) {
                var mode = shellState.viewSettings[shellState.mediaMode];
                var left = shellState.viewSettings.sidebar.left || {
                    showToggleButton: true, enabled: false,
                    toggleButtonIcon: 'fa-bars'
                };
                if(left.enabled === undefined){
                    left.enabled = mode.enableLeftSidebar;
                }
                var right = shellState.viewSettings.sidebar.right || {
                    showToggleButton: true, enabled: false,
                    toggleButtonIcon: 'fa-bars'
                };
                if(right.enabled === undefined){
                    right.enabled = mode.enableRightSidebar;
                }

                mode.autoActivateSidebar = mode.autoActivateSidebar !== false;

                shellState.showLeftToggleButton = left.showToggleButton !== false && mode.enableLeftSidebar;
                shellState.enableLeftSidebar = left.enabled !== false;
                shellState.showRightToggleButton = right.showToggleButton !== false && mode.enableRightSidebar;
                shellState.enableRightSidebar = right.enabled !== false;
                shellState.showNavbar = mode.showNavbar;
                shellState.showFooter = mode.showFooter;
                shellState.showHomeButton = mode.showHomeButton;
                shellState.leftToggleButtonIcon = left.toggleButtonIcon || 'fa-bars';
                shellState.rightToggleButtonIcon = right.toggleButtonIcon || 'fa-bars';
                shellState.showBrand = mode.showBrand;
                shellState.centerBrand = mode.centerBrand;
                shellState.autoActivateSidebar = mode.autoActivateSidebar;
                shellState.viewContainerScope = viewScope;
                shellState.enableFeedback = (epShellConfig.options.enableFeedback && mode.enableFeedback === true);
                shellState.animationIn = mode.animationIn;
                shellState.animationOut = mode.animationOut;
                shellState.animationSpeed = mode.animationSpeed;

                if (shellState.showBrand && mode.brandHTML) {
                    if (mode.brandHTML) {
                        setBrandHTML(mode.brandHTML, viewScope);
                    }
                    if (mode.brandTarget) {
                        setBrandTarget(mode.brandTarget);
                    }
                }
                if (shellState.showFooter) {
                    if (mode.footerHTML) {
                        setFooterHTML(mode.footerHTML, viewScope);
                    }
                    if (mode.footerTarget) {
                        setFooterTarget(mode.footerTarget);
                    }
                }
                if (mode.autoActivateSidebar) {
                    if (mode.enableLeftSidebar && (isMediaModeLarge() || shellState.suspend)) {
                        showLeftSidebar();
                    } else {
                        hideLeftSidebar();
                    }
                }

                hideRightSidebar(false);
                shellState.allowVerticalScroll = !!mode.allowVerticalScroll;
                shellState.animateViewContainer = mode.animateViewContainer !== false;
                shellState.momentumScrollingEnabled = mode.momentumScrollingEnabled !== false;
                notifyStateChanged();
            }

            /**
             * @private
             * @description
             * Set or Get the viewSettings
             */
            function viewSettings(settings) {
                if (settings !== undefined) {
                    shellState.viewSettings = settings;
                }
                return shellState.viewSettings;
            }

            //--------  Public Functions ----------------------->>>>

            /**
             * @ngdoc method
             * @name init
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Initialization of the shell. To be called by application upon start-up
             */
            function init() {
                window.addEventListener('load', function() {
                    FastClick.attach(document.body);
                }, false);

                $timeout(epThemeService.initialize, 200);

                var windowWidth = $(window).width();
                shellState.mediaMode = windowWidth >= epShellConstants.MEDIA_SIZE_BREAKPOINT ?
                    epShellConstants.MEDIA_MODE_LARGE : epShellConstants.MEDIA_MODE_SMALL;
                // initialize the sidebar as "shown" if we're in large mode, otherwise false.
                shellState.showSidebar = isMediaModeLarge();
                $rootScope.initComplete = true;
            }

            /**
             * @ngdoc method
             * @name saveState
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * save current shell state for later usage by restoreState(). Used by embedded applications to store
             * shell state when embedded app is started and then to restore back when exiting embedded app
             * @returns {object} saved state data
             */
            function saveState() {
                savedState = {
                    pageTitle: getPageTitle(),
                    brandHTML: getBrandHTML(),
                    navbarButtons: angular.extend([], navbarButtons)
                };
                return savedState;
            }

            /**
             * @ngdoc method
             * @name restoreState
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Used in conjunction with saveState(). This method will restore some properties
             * of shell state to what they were at the time of saveState() call.
             * @param {object} state - optional parameter that contains saved state data. If not
             * provided, internal saved state data will be used
             */
            function restoreState(state) {
                var oldState = (state) ? state : savedState;
                if (oldState && oldState !== {}) {
                    if (oldState.navbarButtons) {
                        updateNavbarButtons(oldState.navbarButtons);
                    }
                    if (oldState.pageTitle) {
                        setPageTitle(oldState.pageTitle);
                    }
                    if (oldState.brandHTML) {
                        setBrandHTML(oldState.brandHTML, oldState.viewContainerScope);
                    }
                }
            }

            /**
             * @ngdoc method
             * @name showProgressIndicator
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Show progress indicator in the middle of the current view of the shell
             */
            function showProgressIndicator() {
                shellState.showProgressIndicator = true;
                shellState.progressIndicatorlevel++;
            }

            /**
             * @ngdoc method
             * @name hideProgressIndicator
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Hides progress indicator. Since showProgressIndicator() are stackable (queue)
             * the hideProgressIndicator() will decrement the show calls and will actually hide when bottom of
             * queue is reached.
             * @param {boolean} immediate - optional parameter - if true the progress indicator is stopped
             * immediately, otherwise after a timeout
             */
            function hideProgressIndicator(immediate) {
                shellState.progressIndicatorlevel--;
                shellState.progressIndicatorlevel = Math.max(shellState.progressIndicatorlevel, 0);
                if (shellState.progressIndicatorlevel === 0) {
                    if (immediate) {
                        shellState.showProgressIndicator = false;
                    } else {
                        $timeout(function() {
                            shellState.showProgressIndicator = false;
                        });
                    }
                }
            }

            /**
             * @ngdoc method
             * @name resetProgressIndicator
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Hides and resets progress indicator. Since showProgressIndicator() are stackable (queue)
             * the hideProgressIndicator() will decrement the show calls and will actually hide when bottom of
             * queue is reached. This method allows to hide immediately, reseeting the queue.
             */
            function resetProgressIndicator() {
                shellState.progressIndicatorlevel = 0;
                hideProgressIndicator(true);
            }

            /**
             * @ngdoc method
             * @name getMediaMode
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Returns the current media mode: MEDIA_MODE_LARGE or MEDIA_MODE_SMALL (epShellConstants)
             * @returns {string} current media mode: MEDIA_MODE_LARGE or MEDIA_MODE_SMALL (epShellConstants)
             */
            function getMediaMode() {
                return shellState.mediaMode;
            }

            /**
             * @ngdoc method
             * @name isMediaModeLarge
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Checks if the current media mode is MEDIA_MODE_LARGE (epShellConstants)
             */
            function isMediaModeLarge() {
                return shellState.mediaMode === epShellConstants.MEDIA_MODE_LARGE;
            }

            /**
             * @ngdoc method
             * @name themingDisabled
             * @methodOf ep.shell.service:epShellService
             * @public
             * @param {boolean} onOff - if true theming is turned on, if false set as off
             * @description
             * Returns the state of theming flag as set by sysconfig.json. True - if theming is disabled.
             * Can also be used to turn off and on theming in the shell by passing the disabled parameter
             * @returns {boolean} current media mode: MEDIA_MODE_LARGE or MEDIA_MODE_SMALL (epShellConstants)
             */
            function themingDisabled(onOff) {
                return epThemeService.disableTheming(onOff);
            }

            function registerViewEvent(id, eventName, callback) {
                // clean up the old event if there is one
                if (boundViewEvents[id]) {
                    boundViewEvents[id]();
                }

                // register the given event in the boundViewEvents collection.
                boundViewEvents[id] = $rootScope.$on(eventName, callback);
            }

            function cleanupViewEvents() {
                // clean up any events that have been registered.
                _.each(boundViewEvents, function(unregister) {
                    unregister();
                });
                boundViewEvents = {};
            }

            /**
             * @ngdoc method
             * @name setInfo
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Set the Info Message view overlay, that will cover the current view
             * @param {string} icon - icon to be displayed
             * @param {string} message - icon to be displayed
             */
            function setInfo(icon, message) {
                shellState.infoIcon = icon;
                shellState.infoMessage = message;
            }

            /**
             * @ngdoc method
             * @name clearInfo
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Clears the Info Message view overlay, that covers the current view.
             */
            function clearInfo() {
                shellState.infoIcon = '';
                shellState.infoMessage = '';
            }

            /**
             * @ngdoc method
             * @name setPageTitle
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Set the title of the page on the browser
             */
            function setPageTitle(val) {
                shellState.pageTitle = val;
                $document[0].title = shellState.pageTitle;
            }

            /**
             * @ngdoc method
             * @name initViewBackground
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Set the the background color of the view for an animation
             */
            function initViewBackground() {
                if (epShellConfig.options.enableViewAnimations !== false) {
                    $('#viewStyle').remove();
                    var color = $('body').css('background-color');
                    var opaqueColor = getOpaqueColor(color);
                    var style = '.view { background-color: ' + opaqueColor + '; }';
                    $('head').append('<style id="viewStyle">' + style + '</style>');
                }
            }

            /**
             * @ngdoc method
             * @name getOpaqueColor
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Get the fully opaque color for the given color
             */
            function getOpaqueColor(color) {
                var newVals;
                if (color.indexOf('rgb') === 0) {
                    var numbers = color.replace('rgb', '').replace('a', '').replace('(', '').replace(')', '');
                    var vals = numbers.split(',').map(function(v) {
                        return v.trim();
                    });

                    if (vals.length === 4) {
                        vals[3] = '1';
                    } else if (vals.length === 3) {
                        vals.push('1');
                    }

                    newVals = vals.join(', ');
                }
                //else {
                //  TODO: support parsing hex code
                //}
                return 'rgba(' + newVals + ')';
            }

            /**
             * @ngdoc method
             * @name getPageTitle
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Get the title of the page (from shell state)
             * @returns {string} page title
             */
            function getPageTitle() {
                return shellState.pageTitle;
            }

            /**
             * @ngdoc method
             * @name toggleBrand
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Toggles the display of the brand in the shell
             */
            function toggleBrand() {
                shellState.showBrand = !shellState.showBrand;
                shellState.viewSettings[shellState.mediaMode].showBrand = shellState.showBrand;
            }

            /**
             * @ngdoc method
             * @name showBrand
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Turns on and off the display of the brand in the shell
             * @param {boolean} onOff - if true brand is turned on, if false set as off
             */
            function showBrand(onOff) {
                shellState.showBrand = (onOff === undefined) ? true : onOff;
                shellState.viewSettings[shellState.mediaMode].showBrand = shellState.showBrand;
            }

            /**
             * @ngdoc method
             * @name setBrandHTML
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Sets the branding HTML.
             * @param {string} html - branding html
             * @param {object} viewScope - (optional) The scope to use when compiling the html as a template
             */
            function setBrandHTML(html, viewScope) {
                shellState.brandHTML = angular.isString(html) ? $sce.trustAsHtml(html) : html;
                if (viewScope) {
                    $timeout(function() {
                        var el = angular.element('#apptitle');
                        if(shellState.titleScope){
                            shellState.titleScope.$destroy();
                            shellState.titleScope = null;
                        }

                        shellState.titleScope = viewScope.$new();
                        var content = $compile(html)(shellState.titleScope);
                        if(content.length){
                            el.empty();
                            el.append(angular.element(content));
                        } else {
                            shellState.viewSettings[shellState.mediaMode].brandHTML = shellState.brandHTML;
                        }
                    });
                } else {
                    shellState.viewSettings[shellState.mediaMode].brandHTML = shellState.brandHTML;
                }
            }

            /**
             * @ngdoc method
             * @name setBrandTarget
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Sets the branding target url.
             * @param {string} target - url to follow when clicking on the brand
             */
            function setBrandTarget(target) {

                shellState.brandTarget = target;
                shellState.viewSettings[shellState.mediaMode].brandTarget = shellState.brandTarget;
            }

            /**
             * @ngdoc method
             * @name centerBrand
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Turns on and off the centering of the brand in the navbar
             * @param {boolean} onOff - if true brand centering is turned on, if false set as off
             */
            function centerBrand(onOff) {
                shellState.centerBrand = (onOff === undefined) ? true : onOff;
                shellState.viewSettings[shellState.mediaMode].centerBrand = shellState.centerBrand;
            }

            /**
             * @ngdoc method
             * @name getBrandHTML
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Returns the branding html. (The html returned is compiled by $sce)
             * @returns {string} brand html
             */
            function getBrandHTML() {
                return shellState.brandHTML;
            }

            /**
             * @ngdoc method
             * @name getBrandTarget
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Returns the branding target. (The url followed when clicking on the brand link.)
             * @returns {string} brand target
             */
            function getBrandTarget() {
                return shellState.brandTarget;
            }

            /**
             * @ngdoc method
             * @name setFooterHTML
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Sets the footer HTML.
             * @param {string} html - footer html
             * @param {object} viewScope - (optional) The scope to use when compiling the html as a template
             */
            function setFooterHTML(html, viewScope) {
                if (viewScope) {
                    $timeout(function(){
                        var el = angular.element('#footerElement');
                        if(shellState.footerScope){
                            shellState.footerScope.$destroy();
                            shellState.footerScope = null;
                        }

                        shellState.footerScope = viewScope.$new();
                        var content = $compile(html)(shellState.footerScope);
                        if(content.length) {
                            el.empty();
                            el.append(angular.element(content));
                        } else {
                            shellState.footerHTML = angular.isString(html) ? $sce.trustAsHtml(html) : html;
                            shellState.viewSettings[shellState.mediaMode].footerHTML = shellState.footerHTML;
                        }
                    });
                } else {
                    shellState.footerHTML = angular.isString(html) ? $sce.trustAsHtml(html) : html;
                    shellState.viewSettings[shellState.mediaMode].footerHTML = shellState.footerHTML;
                }
            }

            /**
             * @ngdoc method
             * @name getBrandHTML
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Returns the branding html. (The html returned is compiled by $sce)
             * @returns {string} brand html
             */
            function getFooterHTML() {
                return shellState.footerHTML;
            }

            /**
             * @ngdoc method
             * @name setFooterTarget
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Sets the footer target url.
             * @param {string} target - url to follow when clicking on the footer
             */
            function setFooterTarget(target) {
                shellState.footerTarget = target;
                shellState.viewSettings[shellState.mediaMode].footerTarget = shellState.footerTarget;
            }

            /**
             * @ngdoc method
             * @name getFooterTarget
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Returns the footer target. (The url followed when clicking on the footer link.)
             * @returns {string} footer target
             */
            function getFooterTarget() {
                return shellState.footerTarget;
            }

            function notifyShellButtonsChanged(event) {
                navbarButtons = _.sortBy(navbarButtons, function(btn) {
                    return btn.index;
                });
                $rootScope.$emit(epShellConstants.SHELL_NAV_BUTTONS_CHANGED_EVENT, event);

                $timeout(function() {
                    $rootScope.$apply();
                });
            }

            function suspend() {
                shellState.suspend = true;
            }

            function resume() {
                shellState.suspend = false;
            }

            /**
             * @ngdoc method
             * @name feedbackCallback
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Set the callback function for Feedback which is called after the feedback form is displayed
             * and user data is entered. The applicatio will then do whatever it nneds to do to forward the
             * feedback appropriately.
             */
            function feedbackCallback(fnOnFeedback) {
                //set or get feedback callback function which will do actual submission of user data.
                //Function must return a promise.
                if (fnOnFeedback !== undefined) {
                    shellState.fnOnFeedback = fnOnFeedback;
                }
                return shellState.fnOnFeedback;
            }

            /**
             * @ngdoc method
             * @name enableFeedback
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Enable the feedback button functionality (by default on, can be overriden by sysconfig)
             * @param {bool} onOff - turn feature on / off
             */
            function enableFeedback(onOff) {
                epShellConfig.options.enableFeedback = onOff;
            }

            /**
             * @ngdoc method
             * @name enableViewFeedback
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Enable the feedback button on current view
             * @param {bool} onOff - turn feedback on / off on current view
             */
            function enableViewFeedback(onOff) {
                if (epShellConfig.options.enableFeedback) {
                    shellState.enableFeedback = onOff;
                }
            }

            /**
             * @ngdoc method
             * @name toggleViewFeedback
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Toggle the feedback button on current view
             */
            function toggleViewFeedback() {
                if (epShellConfig.options.enableFeedback) {
                    shellState.enableFeedback = !shellState.enableFeedback;
                }
            }

            function notifyStateChanged(event) {
                $rootScope.$emit(epShellConstants.SHELL_STATE_CHANGE_EVENT, event);
            }

            function notifySizeChanged(event) {
                // use timeout to wait until the animation is complete before publishing the resize event
                $timeout(function() {
                    $rootScope.$emit(epShellConstants.SHELL_SIZE_CHANGE_EVENT, event);
                }, 310);
            }

            /**
             * @ngdoc method
             * @name hideHomeButton
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Hide home button (can be overridden by viewcontainer options)
             */
            function hideHomeButton() {
                if (shellState.showHomeButton) {
                    shellState.showHomeButton = false;
                    notifyShellButtonsChanged('hideHomeButton');
                }
            }

            /**
             * @ngdoc method
             * @name showHomeButton
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Show home button (can be overriden by viewcontainer options)
             */
            function showHomeButton() {
                if (!shellState.showHomeButton) {
                    shellState.showHomeButton = true;
                    notifyShellButtonsChanged('showHomeButton');
                }
            }

            /**
             * @ngdoc method
             * @name hideLeftToggleButton
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Hide the left panel toggle button
             */
            function hideLeftToggleButton() {
                if (shellState.showLeftToggleButton) {
                    shellState.showLeftToggleButton = false;
                    notifyShellButtonsChanged('hideLeftToggleButton');
                }
            }

            /**
             * @ngdoc method
             * @name showLeftToggleButton
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Show the left panel toggle button
             */
            function showLeftToggleButton() {
                if (!shellState.showLeftToggleButton) {
                    shellState.showLeftToggleButton = true;
                    notifyShellButtonsChanged('showLeftToggleButton');
                }
            }

            /**
             * @ngdoc method
             * @name hideRightToggleButton
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Hide the right panel toggle button
             */
            function hideRightToggleButton() {
                if (shellState.showRightToggleButton) {
                    shellState.showRightToggleButton = false;

                    notifyShellButtonsChanged('hideRightToggleButton');
                }
            }

            /**
             * @ngdoc method
             * @name showLeftToggleButton
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Show the right panel toggle button
             */
            function showRightToggleButton() {
                if (!shellState.showRightToggleButton) {
                    shellState.showRightToggleButton = true;

                    notifyShellButtonsChanged('showRightToggleButton');
                }
            }

            /**
             * @ngdoc method
             * @name toggleLeftSidebar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Toggle left side bar
             */
            function toggleLeftSidebar() {
                shellState.showLeftSidebar = !shellState.showLeftSidebar;
                shellState.viewSettings[shellState.mediaMode].showLeftSidebar = shellState.showLeftSidebar;
                toggleLeftSidebarBackdrop();

                notifySizeChanged(shellState.showLeftSidebar ? 'showLeftSidebar' : 'hideLeftSidebar');
            }

            /**
             * @ngdoc method
             * @name showLeftSidebar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Show left side bar
             */
            function showLeftSidebar() {
                if (!shellState.showLeftSidebar) {
                    shellState.showLeftSidebar = true;
                    shellState.viewSettings[shellState.mediaMode].showLeftSidebar = true;

                    notifySizeChanged('showLeftSidebar');
                }
            }

            /**
             * @ngdoc method
             * @name hideLeftSidebar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Hide left side bar
             */
            function hideLeftSidebar() {
                if (shellState.showLeftSidebar) {
                    shellState.showLeftSidebar = false;
                    shellState.viewSettings[shellState.mediaMode].showLeftSidebar = false;
                    shellState.showViewContainerBackdrop = false;

                    notifySizeChanged('hideLeftSidebar');
                }
            }

            /**
             * @ngdoc method
             * @name disableLeftSidebar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Disable left side bar
             */
            function disableLeftSidebar() {
                if (shellState.enableLeftSidebar) {
                    shellState.enableLeftSidebar = false;
                    shellState.viewSettings.large.enableLeftSidebar = false;
                    shellState.viewSettings.small.enableLeftSidebar = false;

                    hideLeftSidebar();
                    hideLeftToggleButton();
                    notifyStateChanged('disableLeftSidebar');
                }
            }

            /**
             * @ngdoc method
             * @name enableLeftSidebar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Enable left side bar
             */
            function enableLeftSidebar() {
                if (!shellState.enableLeftSidebar) {
                    shellState.enableLeftSidebar = true;
                    shellState.viewSettings.large.enableLeftSidebar = true;
                    shellState.viewSettings.small.enableLeftSidebar = true;

                    if (isMediaModeLarge() && shellState.viewSettings[getMediaMode()].autoActivateSidebar) {
                        showLeftSidebar();
                    }
                    showLeftToggleButton();
                    notifyStateChanged('enableLeftSidebar');
                }
            }

            /**
             * @ngdoc method
             * @name executeLeftSidebar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * get coordinates for the swipe event
             */
            function executeLeftSidebar(event) {
                return event.touches[0].clientX;
            }

            /**
             * @ngdoc method
             * @name clearLeftSidebar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Clear content of the left side bar
             */
            function clearLeftSidebar() {
                epSidebarService.clearLeftSidebar();
            }

            /**
             * @ngdoc method
             * @name toggleRightSidebar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Toggle the right side bar
             */
            function toggleRightSidebar() {
                shellState.showRightSidebar = !shellState.showRightSidebar;
                shellState.viewSettings[shellState.mediaMode].showRightSidebar = shellState.showRightSidebar;
                toggleRightSidebarBackdrop();

                notifySizeChanged(shellState.showRightSidebar ? 'showRightSidebar' : 'hideRightSidebar');

            }

            /**
             * @ngdoc method
             * @name showRightSidebar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Show the right side bar
             */
            function showRightSidebar() {
                if (!shellState.showRightSidebar) {
                    shellState.showRightSidebar = true;
                    shellState.viewSettings[shellState.mediaMode].showRightSidebar = true;

                    notifyStateChanged('showRightSidebar');
                }
            }

            /**
             * @ngdoc method
             * @name toggleLeftSidebarBackdrop
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Toggles backdrop on view container while toggling the left sidebar
             */
            function toggleLeftSidebarBackdrop() {
                if (shellState.showLeftSidebar && getMediaMode() === epShellConstants.MEDIA_MODE_SMALL) {
                    hideRightSidebar();
                    shellState.showViewContainerBackdrop = true;
                } else {
                    if (!shellState.showRightSidebar) {
                        shellState.showViewContainerBackdrop = false;
                    }
                }
            }

            /**
             * @ngdoc method
             * @name toggleRightSidebarBackdrop
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Toggles backdrop on view container while toggling the right sidebar
             */
            function toggleRightSidebarBackdrop() {
                if (shellState.showRightSidebar) {
                    if (getMediaMode() === epShellConstants.MEDIA_MODE_SMALL) {
                        hideLeftSidebar();
                    }
                    shellState.showViewContainerBackdrop = true;
                } else {
                    shellState.showViewContainerBackdrop = false;
                }
            }

            /**
             * @ngdoc method
             * @name hideRightSidebar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Hide the right side bar
             */
            function hideRightSidebar() {
                if (shellState.showRightSidebar) {
                    shellState.showRightSidebar = false;
                    shellState.viewSettings[shellState.mediaMode].showRightSidebar = false;
                    shellState.showViewContainerBackdrop = false;

                    notifySizeChanged('hideRightSidebar');
                }
            }

            /**
             * @ngdoc method
             * @name disableRightSidebar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Disable the right side bar
             */
            function disableRightSidebar() {
                if (shellState.enableRightSidebar) {
                    shellState.enableRightSidebar = false;
                    shellState.viewSettings.large.enableRightSidebar = false;
                    shellState.viewSettings.small.enableRightSidebar = false;

                    hideRightSidebar();
                    hideRightToggleButton();
                    notifyStateChanged('disableRightSidebar');
                }
            }

            /**
             * @ngdoc method
             * @name enableRightSidebar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Enable the right side bar
             */
            function enableRightSidebar() {
                if (!shellState.enableRightSidebar) {
                    shellState.enableRightSidebar = true;
                    shellState.viewSettings.large.enableRightSidebar = true;
                    shellState.viewSettings.small.enableRightSidebar = true;

                    showRightToggleButton();
                    notifyStateChanged('enableRightSidebar');
                }
            }

            /**
             * @ngdoc method
             * @name clearRightSidebar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Clear the content of the right side bar
             */
            function clearRightSidebar() {
                epSidebarService.clearRightSidebar();
            }

            /**
             * @ngdoc method
             * @name getShowLeftSidebar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Returns visibility flag of left side bar
             * @returns {boolean} true if left bar is visible
             */
            function getShowLeftSidebar() {
                return shellState.showLeftSidebar;
            }

            /**
             * @ngdoc method
             * @name getShowRightSidebar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Returns visibility flag of right side bar
             * @returns {boolean} true if right bar is visible
             */
            function getShowRightSidebar() {
                return shellState.showRightSidebar;
            }

            /**
             * @ngdoc method
             * @name setLeftTemplate
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Set the left sidabar html
             * @param {string} html - html of template to be loaded in left sidebar
             */
            function setLeftTemplate(html) {
                epSidebarService.setLeftTemplate(html);
            }

            /**
             * @ngdoc method
             * @name setRightTemplate
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Set the right sidabar html
             * @param {string} html - html of template to be loaded in right sidebar
             */
            function setRightTemplate(html) {
                epSidebarService.setRightTemplate(html);
            }

            /**
             * @ngdoc method
             * @name setLeftTemplateUrl
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Set the left sidabar html
             * @param {string} url - url of template to be loaded in left sidebar
             */
            function setLeftTemplateUrl(url) {
                epSidebarService.setLeftTemplateUrl(url);
            }

            /**
             * @ngdoc method
             * @name setRightTemplateUrl
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Set the right sidabar html
             * @param {string} url - url of template to be loaded in right sidebar
             */
            function setRightTemplateUrl(url) {
                epSidebarService.setRightTemplateUrl(url);
            }

            /**
             * @ngdoc method
             * @name hideNavbar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Hide navigation bar
             */
            function hideNavbar() {
                if (shellState.showNavbar) {
                    shellState.showNavbar = false;
                    notifyStateChanged('hideNavbar');
                }
            }

            /**
             * @ngdoc method
             * @name showNavbar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Show navigation bar
             */
            function showNavbar() {
                if (!shellState.showNavbar) {
                    shellState.showNavbar = true;
                    notifyStateChanged('showNavbar');
                }
            }

            /**
             * @ngdoc method
             * @name toggleNavbar
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Toggle show/hide navigation bar
             */
            function toggleNavbar() {
                if (!shellState.showNavbar) {
                    shellState.showNavbar = true;
                    notifyStateChanged('showNavbar');
                } else {
                    shellState.showNavbar = false;
                    notifyStateChanged('hideNavbar');
                }
            }

            /**
             * @ngdoc method
             * @name hideFooter
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Hide Footer
             */
            function hideFooter() {
                if (shellState.showFooter) {
                    shellState.showFooter = false;
                    notifyStateChanged('hideFooter');
                }
            }

            /**
             * @ngdoc method
             * @name showFooter
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Show Footer
             */
            function showFooter() {
                if (!shellState.showFooter) {
                    shellState.showFooter = true;
                    notifyStateChanged('showFooter');
                }
            }

            /**
             * @ngdoc method
             * @name toggleFooter
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Toggle show/hide Footer
             */
            function toggleFooter() {
                if (!shellState.showFooter) {
                    shellState.showFooter = true;
                    notifyStateChanged('showFooter');
                } else {
                    shellState.showFooter = false;
                    notifyStateChanged('hideFooter');
                }
            }

            //---------> Navbar Buttons--------------->>>>>>

            /**
             * @ngdoc method
             * @name iterateNavbarButton
             * @methodOf ep.shell.service:epShellService
             * @private
             * @description
             * Iterate through buttons and call func(button, index). If func returns
             * true, then notifyShellButtonsChanged(eventName) is called
             * @param {array} arrIds - an array of button id's
             * @param {string} eventName - event name passed to notifyShellButtonsChanged
             * @param {function} func - function called for each matched button id
             */
            function iterateNavbarButton(arrIds, eventName, func) {
                //you can pass one or more id's seperated by comma
                var hasFound = false;
                if (arrIds !== undefined) {
                    _.each(arrIds, function(arg) {
                        var idx = _.findIndex(navbarButtons, function(value) {
                            return value.id === arg;
                        });
                        if (idx !== -1 && func(navbarButtons[idx], idx)) {
                            hasFound = true;
                        }
                    });
                }
                if (hasFound) {
                    notifyShellButtonsChanged(eventName);
                }
            }

            /**
             * @ngdoc method
             * @name clearNavbarButtons
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Clear (delete) navigation buttons
             */
            function clearNavbarButtons() {
                navbarButtons = [];
                notifyShellButtonsChanged('clearNavbarButtons');
            }

            /**
             * @ngdoc method
             * @name updateNavbarButtons
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Update navigation buttons. Old buttons are cleared.
             * @param {array} buttons - an array of button objects
             */
            function updateNavbarButtons(buttons) {
                navbarButtons = [];
                addNavbarButtons(buttons);
                notifyShellButtonsChanged('updateNavbarButtons');
            }

            /**
             * @ngdoc method
             * @name addNavbarButtons
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Add navigation buttons. They will be merged with existing buttons, but without duplication
             */
            function addNavbarButtons(buttons) {
                if (!angular.isArray(buttons)) {
                    buttons = [buttons];
                }
                var btns = _.union(navbarButtons, buttons);
                btns.forEach(function(btn) {
                    if (!btn.type) {
                        btn.type = 'button';
                    }
                });
                navbarButtons = _.uniq(btns, false, function(value) {
                    return value.id || value.title;
                });
                notifyShellButtonsChanged('addNavbarButtons');
            }

            /**
             * @ngdoc method
             * @name deleteNavbarButton
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Delete navigation button(s). Buttons are removed from the list for matched button id's
             * @param {object} buttons - an array/arguments of button id's
             * @example
             * deleteNavbarButton('myButton1', 'myButton2');
             * deleteNavbarButton(['myButton1', 'myButton2']);
             */
            function deleteNavbarButton() {
                var args = _.flatten(arguments, true);
                iterateNavbarButton(args, 'deleteNavbarButton', function(b, idx) {
                    navbarButtons.splice(idx, 1);
                    return true;
                });
            }

            /**
             * @ngdoc method
             * @name getNavbarButtons
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Return all navigation buttons - the current array of buttons is returned
             * @returns {Array} array of button objects
             */
            function getNavbarButtons() {
                return navbarButtons;
            }

            /**
             * @ngdoc method
             * @name getNavbarButton
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Return navigation button - for matched button id
             * @returns {object} button object or null
             */
            function getNavbarButton(id) {
                return _.find(navbarButtons, function(btn) {
                    return btn.id === id;
                });
            }

            /**
             * @ngdoc method
             * @name hideNavbarButton
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Hide navigation button(s). Buttons are hidden for matched button id's
             * @param {object} buttons - an array/arguments of button id's
             * @example
             * hideNavbarButton('myButton1', 'myButton2');
             * hideNavbarButton(['myButton1', 'myButton2']);
             */
            function hideNavbarButton() {
                //you can pass one or more id's seperated by comma
                var args = _.flatten(arguments, true);
                iterateNavbarButton(args, 'hideNavbarButton', function(b) {
                    b.hidden = true;
                    return true;
                });
            }

            /**
             * @ngdoc method
             * @name showNavbarButton
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Show navigation button(s). Buttons are made visible for matched button id's
             * @param {object} buttons - an array/arguments of button id's
             * @example
             * showNavbarButton('myButton1', 'myButton2');
             * showNavbarButton(['myButton1', 'myButton2']);
             */
            function showNavbarButton() {
                //you can pass one or more id's seperated by comma
                var args = _.flatten(arguments, true);
                iterateNavbarButton(args, 'showNavbarButton', function(b) {
                    if (b.fnVisible && angular.isFunction(b.fnVisible)) {
                        b.hidden = !b.fnVisible();
                    } else if (b.enabled && angular.isFunction(b.enabled)) {
                        //Obsolete - enabled should not be used for show/hide!!!
                        //Only temporary for EMA
                        b.hidden = !b.enabled();
                    } else {
                        b.hidden = false;
                    }
                    return true;
                });
            }

            /**
             * @ngdoc method
             * @name enableNavbarButton
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Enable navigation button(s). Buttons are made visible for matched button id's
             * @param {object} buttons - an array/arguments of button id's
             * @example
             * enableNavbarButton('myButton1', 'myButton2');
             * enableNavbarButton(['myButton1', 'myButton2']);
             */
            function enableNavbarButton() {
                //you can pass one or more id's seperated by comma
                var args = _.flatten(arguments, true);
                iterateNavbarButton(args, 'enableNavbarButton', function(b) {
                    b.enabled = true;
                    return true;
                });
            }

            /**
             * @ngdoc method
             * @name disableNavbarButton
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Disable navigation button(s). Buttons are made visible for matched button id's
             * @param {object} buttons - an array/arguments of button id's
             * @example
             * disableNavbarButton('myButton1', 'myButton2');
             * disableNavbarButton(['myButton1', 'myButton2']);
             */
            function disableNavbarButton() {
                //you can pass one or more id's seperated by comma
                var args = _.flatten(arguments, true);
                iterateNavbarButton(args, 'disableNavbarButton', function(b) {
                    b.enabled = false;
                    return true;
                });
            }

            /**
             * @ngdoc method
             * @name hideAllNavbarButtons
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Hide all navigation buttons. All user buttons in are made hidden in Navbar
             */
            function hideAllNavbarButtons() {
                _.each(navbarButtons, function(btn) {
                    hideNavbarButton(btn.id);
                });
                notifyShellButtonsChanged('hideNavbarButton');
            }

            /**
             * @ngdoc method
             * @name showAllNavbarButtons
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Show all navigation buttons. All user buttons in are made visible in Navbar
             */
            function showAllNavbarButtons() {
                _.each(navbarButtons, function(btn) {
                    showNavbarButton(btn.id);
                });
                notifyShellButtonsChanged('hideNavbarButton');
            }

            /**
             * @ngdoc method
             * @name disableNavbarButtons
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Disable/Enable all navigation buttons.
             * @param {boolean} onOff - disable or enable flag
             */
            function disableNavbarButtons(onOff) {
                shellState.freezeNavButtons = onOff;
            }

            /**
             * @ngdoc method
             * @name navbarButtonClicked
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Get the button that was clicked - it is available in the time interval between the mouse down and
             * click events. Useful for 'on-blur' processing.
             */
            function navbarButtonClicked() {
                return shellState.navButtonClicked;
            }

            //<<<<<--------------- Navbar Buttons --------------------------

            /**
             * @ngdoc method
             * @name momentumScrollingEnabled
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Enable/disable momentum scrolling
             * @param {boolean} onOff - disable or enable flag
             */
            function momentumScrollingEnabled(onOff) {
                if (onOff !== undefined) {
                    shellState.momentumScrollingEnabled = onOff;
                }
                return shellState.momentumScrollingEnabled;
            }

            /**
             * @ngdoc method
             * @name allowVerticalScroll
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Enable/disable vertical scrolling
             * @param {boolean} onOff - disable or enable flag
             */
            function allowVerticalScroll(onOff) {
                if (onOff !== undefined) {
                    shellState.allowVerticalScroll = onOff;
                }
                return shellState.allowVerticalScroll;
            }

            /**
             * @ngdoc method
             * @name viewAnimation
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Set the current route to view animation
             * @param {string} animation - current animation route
             */
            function viewAnimation(animation) {
                if (animation !== undefined) {
                    shellState.viewAnimation = epShellConfig.options.enableViewAnimations ? animation : '';
                }
                return shellState.viewAnimation;
            }

            /**
             * @ngdoc method
             * @name getViewDimensions
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Get current view dimensions
             */
            function getViewDimensions() {
                return shellState.viewDimensions;
            }

            /**
             * @ngdoc method
             * @name isHomeLocation
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Returns true if we are on home location
             */
            function isHomeLocation() {
                return (epShellConfig.homeRoute && epShellConfig.homeRoute.route === $location.url());
            }

            /**
             * @ngdoc method
             * @name goHome
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Go to home location
             */
            function goHome() {
                if (epShellConfig.homeRoute) {
                    $location.url(epShellConfig.homeRoute.route);
                }
            }

            /**
             * @ngdoc method
             * @name setViewModal
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Set modal view overlay, that will cover the current view
             * @param {object} modalOptions - modal options (refer to ep.viewmodal)
             */
            function setViewModal(modalOptions) {
                shellState.viewModalOptions = modalOptions || {};
            }
            /**
             * @ngdoc method
             * @name enableViewModal
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Enable or disable shell operated view modal
             * @param {bool} onOff - turn on/off with true/false
             */
            function enableViewModal(onOff) {
                shellState.enableViewModal = (onOff !== false);
            }
            /**
             * @ngdoc method
             * @name showViewModal
             * @methodOf ep.shell.service:epShellService
             * @public
             * @description
             * Enable or disable shell operated view modal
             * @param {bool} onOff - display/hide with true/false
             */
            function showViewModal(onOff) {
                if (shellState.viewModalOptions) {
                    shellState.viewModalOptions.showViewModal = (onOff !== false);
                }
            }

            initialize();

            return {
                // --- For internal module usage only --->
                __state: shellState,
                __setCurrentModeFlags: setCurrentModeFlags,
                __viewSettings: viewSettings,
                // <-------------------------------------------
                init: init,
                saveState: saveState,
                restoreState: restoreState,
                // Progress Indicator
                showProgressIndicator: showProgressIndicator,
                hideProgressIndicator: hideProgressIndicator,
                resetProgressIndicator: resetProgressIndicator,
                // Events
                registerViewEvent: registerViewEvent,
                cleanupViewEvents: cleanupViewEvents,
                notifyStateChanged: notifyStateChanged,
                notifyShellButtonsChanged: notifyShellButtonsChanged,
                notifySizeChanged: notifySizeChanged,
                // General Settings
                setPageTitle: setPageTitle,
                initViewBackground: initViewBackground,
                getPageTitle: getPageTitle,
                toggleBrand: toggleBrand,
                showBrand: showBrand,
                setBrandHTML: setBrandHTML,
                getBrandHTML: getBrandHTML,
                setBrandTarget: setBrandTarget,
                getBrandTarget: getBrandTarget,
                centerBrand: centerBrand,
                setInfo: setInfo,
                clearInfo: clearInfo,
                suspend: suspend,
                resume: resume,
                getMediaMode: getMediaMode,
                isMediaModeLarge: isMediaModeLarge,
                getViewDimensions: getViewDimensions,
                momentumScrollingEnabled: momentumScrollingEnabled,
                allowVerticalScroll: allowVerticalScroll,
                themingDisabled: themingDisabled,
                enableFeedback: enableFeedback,
                enableViewFeedback: enableViewFeedback,
                toggleViewFeedback: toggleViewFeedback,
                feedbackCallback: feedbackCallback,
                showHomeButton: showHomeButton,
                hideHomeButton: hideHomeButton,
                //Sidebar functions
                hideLeftToggleButton: hideLeftToggleButton,
                showLeftToggleButton: showLeftToggleButton,
                hideRightToggleButton: hideRightToggleButton,
                showRightToggleButton: showRightToggleButton,
                toggleLeftSidebar: toggleLeftSidebar,
                showLeftSidebar: showLeftSidebar,
                hideLeftSidebar: hideLeftSidebar,
                disableLeftSidebar: disableLeftSidebar,
                enableLeftSidebar: enableLeftSidebar,
                clearLeftSidebar: clearLeftSidebar,
                toggleRightSidebar: toggleRightSidebar,
                showRightSidebar: showRightSidebar,
                hideRightSidebar: hideRightSidebar,
                enableRightSidebar: enableRightSidebar,
                disableRightSidebar: disableRightSidebar,
                clearRightSidebar: clearRightSidebar,
                getShowLeftSidebar: getShowLeftSidebar,
                getShowRightSidebar: getShowRightSidebar,
                setLeftTemplate: setLeftTemplate,
                setRightTemplate: setRightTemplate,
                setLeftTemplateUrl: setLeftTemplateUrl,
                setRightTemplateUrl: setRightTemplateUrl,
                executeLeftSidebar: executeLeftSidebar,
                //Navigation bar functions
                showNavbar: showNavbar,
                hideNavbar: hideNavbar,
                toggleNavbar: toggleNavbar,
                //Footer
                showFooter: showFooter,
                hideFooter: hideFooter,
                toggleFooter: toggleFooter,
                setFooterHTML: setFooterHTML,
                getFooterHTML: getFooterHTML,
                setFooterTarget: setFooterTarget,
                getFooterTarget: getFooterTarget,
                //Nav Buttons
                clearNavbarButtons: clearNavbarButtons,
                updateNavbarButtons: updateNavbarButtons,
                addNavbarButtons: addNavbarButtons,
                deleteNavbarButton: deleteNavbarButton,
                getNavbarButtons: getNavbarButtons,
                getNavbarButton: getNavbarButton,
                showNavbarButton: showNavbarButton,
                hideNavbarButton: hideNavbarButton,
                showAllNavbarButtons: showAllNavbarButtons,
                hideAllNavbarButtons: hideAllNavbarButtons,
                enableNavbarButton: enableNavbarButton,
                disableNavbarButton: disableNavbarButton,
                disableNavbarButtons: disableNavbarButtons,
                navbarButtonClicked: navbarButtonClicked,
                viewAnimation: viewAnimation,
                isHomeLocation: isHomeLocation,
                goHome: goHome,
                toggleLeftSidebarBackdrop: toggleRightSidebarBackdrop,
                toggleRightSidebarBackdrop: toggleRightSidebarBackdrop,

                setViewModal: setViewModal,
                enableViewModal: enableViewModal,
                showViewModal: showViewModal
            };
        }]
    );
})();

/**
     * @ngdoc directive
     * @name ep.shell.directive:epShellSidebar
     * @restrict E
     *
     * @description
     * Represents the shell sidebar directive. For internal epShell usage only
     */
(function() {
    'use strict';

    angular.module('ep.shell').directive('epShellSidebar',
        /*@ngInject */
        ['$rootScope', '$routeParams', 'epSidebarService', 'epShellService', 'epShellConstants', 'epFeatureDetectionService', function($rootScope, $routeParams, epSidebarService, epShellService,
                 epShellConstants, epFeatureDetectionService) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                templateUrl: 'src/components/ep.shell/sidebar/sidebar.html',
                controller: ['$scope', function($scope) {
                    function init() {
                        $scope.platform = epFeatureDetectionService.getFeatures().platform;
                        //set browserName - it is used to shell.html to set ep-browser class
                        var browserName = 'all';
                        if ($scope.platform && $scope.platform.browser && $scope.platform.browser.name) {
                            browserName = ($scope.platform.browser.name).toLowerCase();
                        }
                        $scope.browserName = browserName;
                        $scope.shellState = epShellService.__state;
                        $scope.sidebarState = epSidebarService.state;

                        $scope.menuId = $routeParams.menuId;
                        $scope.dismissRightSidebar = function() {
                            if (!$scope.shellState.suspend) {
                                epShellService.hideRightSidebar();
                            }
                        };

                        $scope.dismissLeftSidebar = function() {
                            if (epShellService.getMediaMode() === epShellConstants.MEDIA_MODE_SMALL &&
                                !$scope.shellState.suspend) {
                                epShellService.hideLeftSidebar();
                            }
                        };

                        var dismissSidebars = function() {
                            $scope.dismissRightSidebar();
                            $scope.dismissLeftSidebar();
                        };
                        // this event is bound programmatically so that it doesn't
                        // participate in the ng-click lifecycle (which causes sporadic
                        // problems with click events on child elements)
                        $('#viewContainerBackdrop').bind('click', dismissSidebars);
                    }

                    $rootScope.$watch('initComplete', function(initComplete) {
                        if (initComplete) {
                            init();
                        }
                    });
                }]
            };
        }]
    );
})();

'use strict';
angular.module('ep.shell').service('epSidebarService', [
    '$compile',
     function($compile) {
         var viewContainerScope = null;

         var state = {
             leftTemplate: null,
             rightTemplate: null
         };

         function clearLeftSidebar() {
             angular.element('.ep-sidebar-nav.ep-sidebar-nav-left').empty();
         }

         function clearRightSidebar() {
             angular.element('.ep-sidebar-nav.ep-sidebar-nav-right').empty();
         }

         function clear() {
             clearLeftSidebar();
             clearRightSidebar();
         }

         function setScope(val) {
             viewContainerScope = val;
         }

         function setLeftTemplateUrl(val, updateIfChanged) {
             setLeftTemplate("<div ng-include='\"" + val + "\"'></div>", updateIfChanged);
         }

         function setRightTemplateUrl(val, updateIfChanged) {
             setRightTemplate("<div ng-include='\"" + val + "\"'></div>", updateIfChanged);
         }

         function setLeftTemplate(val, updateIfChanged) {
             if (updateIfChanged === true && state.leftTemplate === val) {
                 return;
             }
             state.leftTemplate = val;
             var target = angular.element('.ep-sidebar-nav.ep-sidebar-nav-left');
             target
                 .empty()
                 .append($compile(val)(viewContainerScope));
         }

         function setRightTemplate(val, updateIfChanged) {
             if (updateIfChanged === true && state.rightTemplate === val) {
                 return;
             }
             state.rightTemplate = val;
             var target = angular.element('.ep-sidebar-nav.ep-sidebar-nav-right');
             target
                 .empty()
                 .append($compile(val)(viewContainerScope));
         }

         return {
             clear: clear,
             clearLeftSidebar: clearLeftSidebar,
             clearRightSidebar: clearRightSidebar,
             state: state,
             setScope: setScope,
             setLeftTemplateUrl: setLeftTemplateUrl,
             setRightTemplateUrl: setRightTemplateUrl,
             setLeftTemplate: setLeftTemplate,
             setRightTemplate: setRightTemplate
         };
     }
]);

/**
 * @ngdoc directive
 * @name ep.shell.directive:epShellViewContainer
 * @restrict E
 *
 * @description
 * This represents the view containers that are used to display content inside of the shell.  The following properties
 * can be used to control the behavior of the view declaratively.
 *
 * @property {object} sidebarsettings:object
 *  This property will allow you to designate a left or right sidebar template URL, enabled property, and toggleButtonIcon
 *  <br/><br/>
 *  sidebarsettings='{"left": {"templateUrl": "/home-lsidebar.html", "enabled": true, "toggleButtonIcon": "fa-ellipses"}, "right": {"templateUrl": "/home-rsidebar.html"}'

 * @property {object} sidebarsettings:templateUrl:string
 *  This property will allow you to declaratively set the template to use for the left/right sidebars
 *  <br/><br/>
 *  sidebarsettings='{"left": {"templateUrl": "/home-lsidebar.html", "enabled": true, "toggleButtonIcon": "fa-ellipses"}, "right": {"templateUrl": "/home-rsidebar.html"}'

 * @property {object} sidebarsettings:toggleButtonIcon:string
 *  This property will allow you to declaratively set the icon for the left/right sidebar toggle buttons. Defaults to "fa-bars".
 *  <br/><br/>
 *  sidebarsettings='{"left": {"templateUrl": "/home-lsidebar.html", "enabled": true, "toggleButtonIcon": "fa-ellipses"}, "right": {"templateUrl": "/home-rsidebar.html"}'

 * @property {object} sidebarsettings:enabled:boolean
 *  This property will allow you to declaratively enable and disable the left and right sidebars. Defaults to true.
 *  <br/><br/>
 *  sidebarsettings='{"left": {"templateUrl": "/home-lsidebar.html", "enabled": true, "toggleButtonIcon": "fa-ellipses"}, "right": {"templateUrl": "/home-rsidebar.html"}'

 * @property {object} smallmodesettings:object
 *  This property will allow you to designate options on how the view behaves in small mode (800px or below).
 *  <br/><br/>
 *  smallmodesettings='{[mode setting options]}'

 * @property {object} largemodesettings:object
 *  This property will allow you to designate options on how the view behaves in large mode (800px or above).
 *  <br/><br/>
 *  largemodesettings='{[mode setting options]}'

 * @property {boolean} modesetting:enableLeftSidebar:boolean
 * This mode setting controls whether the left sidebar will be shown in the view.
 *  <br/><br/>
 *  smallmodesettings='{"enableLeftSidebar"=true/false}'
 *  <br/>
 *  largemodesettings='{"enableLeftSidebar"=true/false}'

 * @property {boolean} modesetting:enableRightSidebar:boolean
 * This mode setting controls whether the right sidebar will be shown in the view.
 *  <br/><br/>
 *  smallmodesettings='{"enableRightSidebar"=true/false}'
 *  <br/>
 *  largemodesettings='{"enableRightSidebar"=true/false}'

 * @property {boolean} modesetting:autoActivateSidebar:boolean
 * This mode setting controls whether the left sidebar will be automatically shown in the view in large mode (800px or above).
 *  <br/><br/>
 *  largemodesettings='{"autoActivateSidebar"=true/false}'

 * @property {boolean} modesetting:showNavbar:boolean
 * This mode setting controls whether the navigation bar will be shown in the view.
 *  <br/><br/>
 *  smallmodesettings='{"showNavbar"=true/false}'
 *  <br/>
 *  largemodesettings='{"showNavbar"=true/false}'

 * @property {boolean} modesetting:showHomeButton:boolean
 * This mode setting controls whether the home button will be shown on the navigation bar.
 *  <br/><br/>
 *  smallmodesettings='{"showHomeButton"=true/false}'
 *  <br/>
 *  largemodesettings='{"showHomeButton"=true/false}'

 * @property {boolean} modesetting:showBrand:boolean
 * This mode setting controls whether the brand text will be shown on the navigation bar.
 *  <br/><br/>
 *  smallmodesettings='{"showBrand"=true/false}'
 *  <br/>
 *  largemodesettings='{"showBrand"=true/false}'

 * @property {boolean} modesetting:centerBrand:boolean
 * This mode setting controls what brand text will be in the center of the view on the navigation bar.
 *  <br/><br/>
 *  smallmodesettings='{"centerBrand"=true/false}'
 *  <br/>
 *  largemodesettings='{"centerBrand"=true/false}'

 * @property {boolean} modesetting:animateViewContainer:boolean
 * This mode setting controls whether the view will participate in the animation.
 *  <br/><br/>
 *  smallmodesettings='{"animateViewContainer"=true/false}'
 *  <br/>
 *  largemodesettings='{"animateViewContainer"=true/false}'

 * @property {boolean} modesetting:allowVerticalScroll:boolean
 * This mode setting controls whether the view will allow vertical scrolling beyond the displayed content.
 *  <br/><br/>
 *  smallmodesettings='{"allowVerticalScroll"=true/false}'
 *  <br/>
 *  largemodesettings='{"allowVerticalScroll"=true/false}'

 * @property {string} modesetting:animationIn:string
 * This mode setting sets an animation to the page when it is displayed. Allowed valued are slide-left, slide-right, slide-up and slide-down
 *  <br/><br/>
 *  smallmodesettings='{"animationIn"="slide-left/slide-right/slide-up/slide-down/fade-in"}'
 *  <br/>
 *  largemodesettings='{"animationIn"="slide-left/slide-right/slide-up/slide-down/fade-in"}'

 * @property {string} modesetting:animationOut:string
 * This mode setting sets an animation to the page when it goes off from display. Allowed valued are slide-left, slide-right, slide-up and slide-down
 *  <br/><br/>
 *  smallmodesettings='{"animationOut"="slide-left/slide-right/slide-up/slide-down/fade-out"}'
 *  <br/>
 *  largemodesettings='{"animationOut"="slide-left/slide-right/slide-up/slide-down/fade-out"}'

 * @property {string} modesetting:animationSpeed:string
 * This mode setting sets an animation speed. Allowed valued are 250, 500, 750, 1000, 1250. All values are in milliseconds
 *  <br/><br/>
 *  smallmodesettings='{"animationSpeed"="250/500/750/1000/1250"}'
 *  <br/>
 *  largemodesettings='{"animationSpeed"="250/500/750/1000/1250"}'

 */
(function() {
    'use strict';

    angular.module('ep.shell').directive('epShellViewContainer',
        /*ngInject*/
        ['$location', '$log', '$parse', '$rootScope', '$timeout', 'epShellService', 'epSidebarService', 'epViewContainerService', 'epShellConstants', 'epViewCacheService', function($location, $log, $parse, $rootScope, $timeout, epShellService, epSidebarService,
            epViewContainerService, epShellConstants, epViewCacheService) {

            function setSidebarSettings(sidebar, updateIfChanged) {
                if (sidebar.left) {
                    if (sidebar.left.template) {
                        epSidebarService.setLeftTemplate(sidebar.left.template, updateIfChanged);
                    } else if (sidebar.left.templateUrl) {
                        epSidebarService.setLeftTemplateUrl(sidebar.left.templateUrl, updateIfChanged);
                    }
                }
                if (sidebar.right) {
                    if (sidebar.right.template) {
                        epSidebarService.setRightTemplate(sidebar.right.template, updateIfChanged);
                    } else if (sidebar.right.templateUrl) {
                        epSidebarService.setRightTemplateUrl(sidebar.right.templateUrl, updateIfChanged);
                    }
                }
            }

            function bindScopeProperty(scope, def, property, immediate) {
                if (def[property]) {
                    if (scope[def[property]] && angular.isFunction(scope[def[property]])) {
                        if (immediate) {
                            // invoke the function immediately
                            def[property] = scope[def[property]]();
                        } else {
                            def[property] = scope[def[property]];
                        }
                    } else {
                        try {
                            var propertyExpr = def[property];
                            if (propertyExpr !== true && propertyExpr !== false) {
                                var expr = $parse(propertyExpr);
                                def[property] = expr(scope);
                                scope.$watch(propertyExpr, function(newVal) {
                                    def[property] = newVal;
                                });
                            }
                        } catch (e) {
                            $log.error('An error occurred while trying to parse the ' +
                                '"' + property + '" property of the button ' + def.id + '.' + e.message);
                        }
                    }
                }
            }

            return {
                restrict: 'E',
                transclude: true,
                replace: false,
                templateUrl: 'src/components/ep.shell/view-container/view-container.html',
                scope: {
                    'sidebarsettings': '@',
                    'smallmodesettings': '@',
                    'largemodesettings': '@'
                },
                compile: function() {
                    var currentMode = '';
                    return {
                        pre: function($scope, $elem, $attrs) {
                            $scope.state = epShellService.__state;
                            epShellService.clearInfo();
                            // media mode is either "large" or "small" depending on the horizontal resolution
                            // by default the breakpoint is @ 800px
                            currentMode = epShellService.getMediaMode();

                            // Share scope with the current sidebar
                            epSidebarService.setScope($scope);

                            // parse the setting that control the view and sidebar
                            var viewSettings = {
                                sidebar: $scope.sidebarsettings ? JSON.parse($scope.sidebarsettings) : {},
                                small: $scope.smallmodesettings ? JSON.parse($scope.smallmodesettings) : {},
                                large: $scope.largemodesettings ? JSON.parse($scope.largemodesettings) : {}
                            };
                            viewSettings = epShellService.__viewSettings(viewSettings);

                            if (viewSettings[currentMode]) {
                                epShellService.__setCurrentModeFlags($scope);
                            }

                            if (viewSettings.sidebar) {
                                setSidebarSettings(viewSettings.sidebar, false);
                            }

                            //setting classes for animation in and out
                            $scope.state.animationIn = 'ep-' + $scope.state.animationIn + '-in';
                            $scope.state.animationOut = 'ep-' + $scope.state.animationOut + '-out';
                            //setting animation speed to ng-view dynamically
                            $scope.state.animationSpeed = $scope.state.animationSpeed || '500';

                            if (epViewContainerService.state.cleanup) {
                                epViewContainerService.state.cleanup();
                            }

                            epViewContainerService.state.cleanup =
                                $rootScope.$on(epShellConstants.SHELL_STATE_CHANGE_EVENT, function() {
                                    if (currentMode !== epShellService.getMediaMode()) {
                                        currentMode = epShellService.getMediaMode();
                                        if (viewSettings[currentMode]) {
                                            epShellService.__setCurrentModeFlags();
                                        }
                                        if (viewSettings.sidebar) {
                                            setSidebarSettings(viewSettings.sidebar, true);
                                        }
                                        $timeout(function() {
                                            $scope.$apply();
                                        });
                                    }
                                });
                            function bindButtonAttributes(scope, def) {
                                // wire up the "action" function on the view's controller
                                bindScopeProperty(scope, def, 'action', false);
                                // wire up the "confirm" function, if it exists.
                                bindScopeProperty(scope, def, 'confirm', false);
                                // The "hidden" property is evaluated immediately
                                bindScopeProperty(scope, def, 'hidden', true);
                                // The "enabled" property is also evaluated immediately.
                                bindScopeProperty(scope, def, 'enabled', true);
                            }
                            function configureButton(scope, def) {
                                if (!def.type) {
                                    def.type = 'button';
                                }
                                if (def.persist === undefined) {
                                    //The default is for buttons not to persist when changing views
                                    def.persist = false;
                                }
                                if (scope && def.type === 'button') {
                                    bindButtonAttributes(scope, def);
                                } else if (scope && def.type === 'select' && def.options && def.options.length) {
                                    // Wire up the options
                                    def.options.forEach(function(optBtn) {
                                        configureButton(scope, optBtn);
                                    });
                                }
                            }
                            var buttonDefs = Object.keys($attrs).filter(function(key) {
                                return key.indexOf('btn') === 0;
                            }).map(function(key) {
                                var def;
                                try {
                                    def = JSON.parse($attrs[key]);
                                } catch (e) {
                                    $log.error('An error occurred while trying to parse the ' +
                                        'button definitions for the current view.' + e.message);
                                }
                                // if the id hasn't been specified, use the attribute name
                                if (!def.id) {
                                    def.id = key;
                                }
                                configureButton($scope.$parent, def);
                                return def;
                            });

                            //First lets remove all non-persisting buttons defined on views
                            var btns = epShellService.getNavbarButtons();
                            var deleteIds = btns.filter(function(btn) {
                                return btn.persist !== undefined && btn.persist === false;
                            }).map(function(btn) {
                                return btn.id;
                            });
                            if (deleteIds.length) {
                                epShellService.deleteNavbarButton(deleteIds);
                            }
                            //Now lets add the new buttons defined on views
                            if (buttonDefs.length) {
                                epShellService.updateNavbarButtons(buttonDefs);
                            }

                            $timeout(function() {
                                $rootScope.$emit(epShellConstants.SHELL_VIEW_CHANGE_EVENT, viewSettings);
                            });
                        },
                        post: function($scope) {
                            $scope.showFromCache = true;
                            $scope.cacheKey = $location.url().replace('/', '-');
                            $scope.hasCacheKey = epViewCacheService.hasCachedView($scope.cacheKey);
                            if ($scope.showFromCache) {
                                var unBind = $rootScope.$on('$routeChangeStart', function(event, newRoute, oldRoute) {
                                    if ($scope.showFromCache && oldRoute) {
                                        $scope.cacheKey = oldRoute.$$route.originalPath.replace('/', '-');
                                        epViewCacheService.addViewToCache($scope.cacheKey,
                                            '#viewTemplate', oldRoute.scope);
                                    }
                                    unBind();
                                });
                            }
                        }
                    };
                }
            };
        }]).factory('epViewCacheService',
        /*ngInject*/
        function epViewCacheService() {
            var viewCache = {};

            function addViewToCache(key, selector, scope) {
                var nodeSource = $(selector);
                if (nodeSource.length) {
                    viewCache[key] = {node: nodeSource, scope: scope};
                }
            }

            function removeViewFromCache(key) {
                delete viewCache[key];
            }

            function getViewFromCache(key) {
                return viewCache[key];
            }

            function hasCachedView(key) {
                return !!viewCache[key];
            }

            return {
                addViewToCache: addViewToCache,
                removeViewFromCache: removeViewFromCache,
                getViewFromCache: getViewFromCache,
                hasCachedView: hasCachedView
            };
        })
        .directive('epCachedView',
            /*ngInject*/
            ['$rootScope', '$timeout', '$compile', 'epViewCacheService', function epCachedView($rootScope, $timeout, $compile, epViewCacheService) {
                /*@ngInject*/
                epCachedViewController.$inject = ['$scope'];
                function epCachedViewController($scope) {
                    var cache = epViewCacheService.getViewFromCache($scope.key);
                    $timeout(function() {
                        var targetNode = $('#epCacheTarget-' + $scope.key);
                        cache.scope.hasCacheKey = false;
                        var content = $compile(cache.node)(cache.scope);
                       targetNode.replaceWith(content);
                    });
                }
                return {
                    restrict: 'E',
                    replace: true,
                    controller: epCachedViewController,
                    template: '<div class="ep-fullscreen" id="epCacheTarget-{{key}}"></div>',
                    scope: {
                        key: '='
                    }
                };
            }]);
})();

/**
 * @ngdoc service
 * @name ep.shell.service:epViewContainerService
 * @description
 * Service for the epViewContainerService
 * This service provides access to current Container's state
 *
 */
(function() {
    'use strict';

    angular.module('ep.shell').service('epViewContainerService', [
    '$rootScope',
    '$timeout',
    'epShellService',
    'epShellConstants',
     function($rootScope, $timeout, epShellService, epShellConstants) {
         var state = {
             cleanup: null
         };

         function measureElement(selector) {
             var el = $(selector);
             return {
                 width: el.width(),
                 height: el.height()
             };
         }

         // calculates the size of a navbar group by summing the element widths,
         // and taking the max value of their heights.
         function measureNavbarGroup(selector) {
             var sizes = [];
             $(selector).each(function(idx, b) {
                 sizes.push(measureElement(b));
             });
             return {
                 width: (sizes.map(function(sz) { return sz.width; })
                     .reduce(function(a, b) { return a + Math.max(0, b); }, 0) || 0) + 20,
                 height: (Math.max(sizes.map(function(btn) { return btn.height; })) || 0)
             };
         }

         // TODO: Consider making this async
         function calculateDimensions(eventType) {
             var shellState = epShellService.__state;
             var $window = $(window);
             var offset = {
                 top: shellState.showNavbar ? epShellConstants.NAVBARHEIGHT : 0,
                 left: (shellState.showLeftSidebar && epShellService.isMediaModeLarge()) ?
                     epShellConstants.SIDEBARWIDTH : 0
             };
             var footerHeight = (shellState.showFooter ? epShellConstants.FOOTERHEIGHT : 0);
             var windowSize = {
                 width: $window.width(),
                 height: $window.height()
             };
             var vcSize = {
                 width: windowSize.width - offset.left,
                 height: windowSize.height - offset.top - footerHeight
             };

             var dim = {
                 offset: offset,
                 size: vcSize,
                 navbar: {
                     height: offset.top,
                     width: windowSize.width,
                     buttonGroup: {
                         left: measureNavbarGroup('.left-button'),
                         right: measureNavbarGroup('.right-button')
                     },
                     brand: measureElement('.navbar-brand')
                 },
                 footer: {
                     height: footerHeight,
                     width: windowSize.width
                 }
             };

             var maxBrandWidth = windowSize.width - (dim.navbar.buttonGroup.left.width +
                 dim.navbar.buttonGroup.right.width);
             // TODO: Additional logic to handle "unbalanced" navbars needs to be implemented
             // $('.navbar-brand').css('max-width', maxBrandWidth + 'px');
             if (dim.navbar.brand.width > maxBrandWidth) {
                 dim.navbar.brand.width = maxBrandWidth;
             }

             var curr = shellState.viewDimensions;
             var triggerEvent = curr.size.width !== dim.size.width ||
                                 curr.size.height !== dim.size.height ||
                                 curr.offset.top !== dim.offset.top ||
                                 curr.offset.left !== dim.offset.left;

             shellState.viewDimensions = dim;
             if (triggerEvent) {
                 $rootScope.$emit(epShellConstants.SHELL_VIEW_SIZE_CHANGE_EVENT, dim, eventType);
             }
         }

         $rootScope.$on(epShellConstants.SHELL_SIZE_CHANGE_EVENT, function() {
             calculateDimensions('size');
         });

         return {
             state: state,
             calculateDimensions: calculateDimensions
         };
     }
    ]);
})();

//# sourceMappingURL=emf.shell.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/ep.viewmodal/ep-viewmodal.html',
    "<!--This is a partial for the ep-viewmodal directive --><div class=ep-viewmodal ng-class=\"{'ep-viewmodal-hide': !options.showViewModal, 'ep-viewmodal-peek': peek}\"><div class=\"ep-viewmodal-header modal-header bg-primary modal-title\"><i class=\"pull-left ep-padding-top\" ng-class=\"'fa fa-lg ' + options.lefticon\" ng-if=options.lefticon></i><h5>{{options.title}} <span ng-if=peek class=text-warning><strong>(Peek Mode)</strong></span> <i class=pull-right ng-show=options.showCloseButton><a class=\"fa fa-times fa-2x ep-viewmodal-icon\" ng-click=closeClick()></a></i> <i class=pull-right><a class=\"fa fa-eye fa-2x ep-viewmodal-icon\" ng-click=peekClick()></a></i></h5></div><div class=ep-viewmodal-body ng-hide=peek ng-transclude></div></div>"
  );


  $templateCache.put('src/components/ep.modaldialog/modals/modaldialog-custom.html',
    "<div id=modaldialog class=\"ep-modaldialog ep-modaldialog-custom\"><div id=dialog-header class=\"modal-header ep-modal-header ep-padding-none\"><span class=close ng-show=config.closeButton><a class=\"fa fa-times fa-lg ep-navbar-button\" data-dismiss=modal aria-label=Close ng-click=\"btnclick({isCancel: true})\"></a></span> <span class=help ng-show=config.helpTemplateOptions><a class=\"fa fa-question-circle fa-lg ep-navbar-button\" ng-click=helpButtonClick()></a></span><h4 id=dialogTitle class=\"bg-primary modal-title ep-margin-none clearfix\"><span class=\"ep-dlg-title-icon {{config.icon}}\"></span> <span class=ep-dlg-title ng-bind=config.fnGetTitle()></span></h4></div><div id=dialog-area class=\"modal-body ep-modal-area\"><form id=dialogForm name=dialogForm><uib-alert ng-show=showHelp type=info close=closeHelp()><ep-include options=config.helpTemplateOptions></ep-include></uib-alert><!--<div ng-include=\"config.templateUrl\"></div>--><ep-include options=config.templateOptions></ep-include><div class=\"ep-dlg-rememberMe col-md-10\" ng-show=config.rememberMe><div class=form-group><div class=\"row col-md-1\"><input tabindex=1 id=cbxRemember class=form-control type=checkbox ng-model=config.rememberMeValue></div><label class=\"col-md-10 control-label\">Do not show this message again</label></div></div></form></div><div id=dialog-footer class=\"modal-footer ep-modal-footer\" ng-show=\"config.buttons && config.buttons.length\"><div class=ep-dlg-buttons><button ng-repeat=\"btn in config.buttons\" id={{btn.id}} tabindex=\"$index + 100\" data-dismiss=modal ng-hide=btn.hidden ng-disabled=\"btn.isPrimary && !dialogForm.$valid\" class=\"btn btn-{{btn.type}} {{config.btnBlock == true ? 'btn-block':''}}\" ng-click=btnclick(btn)><i ng-if=btn.icon ng-class=btn.icon></i> &nbsp;{{btn.text}}</button></div></div><div id=dialog-status class=ep-dlg-status ng-show=config.statusBar><h4 class=\"bg-primary modal-title\"><span ng-if=!config.statusBarTextHTML ng-bind=config.statusBarText></span> <span ng-if=config.statusBarTextHTML ng-bind-html=config.statusBarTextHTML></span></h4></div></div>"
  );


  $templateCache.put('src/components/ep.modaldialog/modals/modaldialog-error.html',
    "<!--Custom Dialog Error Template--><div id=modal-error class=\"ep-modaldialog-error ep-error-dialog\" ng-controller=epModalDialogErrorCtrl><section ng-if=config.callFnHideModalError ng-hide=config.fnHideModalError()></section><div class=\"alert clearfix ep-dialog-alert\" ng-class=config.statusClass><table class=ep-dlg-bodytable><tr><td><span ng-if=config.showSpinner class=\"ep-dlg-icon fa-stack fa-2x\"><i class=\"ep-dlg-spinner-icon fa fa-spin fa-stack-2x\" ng-class=config.spinnerIconClass></i> <i ng-if=config.showTimer class=\"ep-dlg-spinner-text fa fa-stack-1x {{config.spinnerTextClass}}\" ng-class=config.spinnerTextClass>{{config.countDown}}</i></span> <span ng-if=!config.showSpinner class=ep-dlg-icon><i class=\"fa fa-3x\" ng-class=config.statusIcon></i></span></td><td><span class=ep-dlg-message ng-class=config.messageClass ng-bind=config.fnGetMessage()></span></td></tr></table></div><div class=ep-message-details ng-show=config.messageDetails><a href=\"\" ng-click=\"config.showDetails = !config.showDetails;\">{{config.showDetails ? 'Hide details': 'Show details'}}</a><div ng-show=config.showDetails><textarea ng-model=config.messageDetails ng-readonly=true disabled></textarea></div></div></div>"
  );


  $templateCache.put('src/components/ep.modaldialog/modals/modaldialog-pane.html',
    "<div class=\"ep-modaldialog ep-modaldialog-pane ep-ease-animation ep-hide-fade\" ng-hide=!dialogState.isVisible><div class=ep-dlg-container ng-class=\"[config.dialogTypeClass, config.containerClass]\"><div class=\"ep-dlg-center clearfix\"><span ng-if=!config.showLoading class=\"ep-dlg-icon pull-left\" ng-class=config.iconClass style=\"margin-right: 10px; margin-top: 5px\"><span ng-if=config.showSpinner class=\"ep-dlg-icon fa-stack fa-2x\"><i class=\"ep-dlg-spinner-icon fa fa-spin fa-stack-2x\" ng-class=config.spinnerIconClass></i> <i ng-if=config.showTimer class=\"ep-dlg-spinner-text fa fa-stack-1x\" ng-class=config.spinnerTextClass>{{config.countDown}}</i></span> <i ng-if=!config.showSpinner ng-class=config.icon></i></span><div ng-class=\"{'pull-left': !config.showLoading}\"><span class=ep-dlg-title ng-class=config.titleClass ng-bind=config.fnGetTitle()></span> <span class=\"ep-dlg-icon fa-stack fa-2x\" ng-if=config.showLoading><i class=\"ep-dlg-spinner-icon fa fa-spin fa-stack-2x fa-spinner fa-pulse\"></i></span><p class=ep-dlg-message ng-class=config.messageClass ng-bind=config.fnGetMessage()></p><div class=\"ep-dlg-rememberMe form-group\" ng-show=config.rememberMe><div class=checkbox><input tabindex=1 id=cbxRemember type=checkbox ng-model=config.rememberMeValue><label>Do not show this message again</label></div></div><!--<div class=\"ep-dlg-progress-indicator\" ng-show=\"config.showProgress\"><span class=\"fa fa-pulse fa-spinner fa-5x\" ng-class=\"config.progressClass\"></span></div>--><!--<div class=\"ep-dlg-progress-indicator\" ng-show=\"config.showProgress && config.showTimer\"><span ng-class=\"config.timerClass\">{{config.countDown}}</span></div>--><div class=ep-dlg-buttons ng-if=\"config.buttons && config.buttons.length > 0\"><button ng-repeat=\"btn in config.buttons\" id=btn.id tabindex=\"$index + 100\" data-dismiss=modal ng-hide=btn.hidden class=\"btn btn-{{btn.type}} btn-sm\" ng-click=btnclick(btn)><i ng-if=btn.icon ng-class=btn.icon></i> &nbsp;{{btn.text}}</button></div></div></div></div></div>"
  );


  $templateCache.put('src/components/ep.shell/feedback/feedback_dialog.html',
    "<div class=form-group><label>{{config.summaryLabel}} <span class=\"required-indicator text-danger fa fa-asterisk\"></span></label><input class=form-control ng-model=config.feedback.summary ng-required=\"true\"></div><div class=form-group><label>{{config.descriptionLabel}} <span class=\"required-indicator text-danger fa fa-asterisk\"></span></label><textarea class=form-control ng-model=config.feedback.description ng-required=true></textarea></div><div class=form-group><label>{{config.customerNameLabel}}</label><input class=form-control ng-model=\"config.feedback.customerName\"></div><div class=form-group><label>{{config.customerEmailLabel}}</label><input class=form-control ng-model=\"config.feedback.customerEmail\"></div>"
  );


  $templateCache.put('src/components/ep.shell/shell.html',
    "<div><section ng-controller=epShellCtrl class=\"ep-shell ep-browser-{{browserName}}\" ng-cloak><div ng-show=state.showProgressIndicator class=ep-progress-indicator><span class=\"fa fa-spin fa-spinner fa-pulse fa-5x\"></span></div><nav class=\"ep-main-navbar navbar-sm navbar-default navbar-fixed-top\" ng-class=\"{hidden: !state.showNavbar, 'cordova-padding': platform.app === 'Cordova'}\" ng-style=\"{border: 'none', 'padding-left': '4px' }\"><div class=\"container-fluid clearfix\"><ul class=\"navbar-nav nav\" style=\"float: none\"><!--Left hand side buttons--><li><a id=leftMenuToggle class=\"pull-left fa {{state.leftToggleButtonIcon}} fa-2x ep-navbar-button left-button\" ng-click=toggleLeftSidebar() ng-class=\"{'hidden': !state.showLeftToggleButton}\"></a></li><li><a id=homebutton href=#/home class=\"pull-left fa fa-home fa-2x ep-navbar-button left-button\" ng-class=\"{'hidden': !state.showHomeButton}\" tabindex=-1></a></li><li ng-repeat=\"button in leftNavButtons | orderBy:'index':true\" index={{button.index}} ng-class=\"{'hidden': button.hidden}\"><a id=navbtn_{{button.id}} ng-if=\"button.type === 'button'\" title={{button.title}} class=\"pull-left fa {{button.icon}} fa-2x ep-navbar-button left-button\" ng-click=state.executeButton(button,$event) ng-mousedown=state.buttonMouseDown(button) ng-class=\"{'disabled': state.freezeNavButtons  || button.enabled === false}\"><span ng-if=button.badge class=\"ep-badge {{button.badge.cssClass}}\" ng-bind=button.badge.value></span></a> <a id=navbtn_{{button.id}} ng-if=\"button.type === 'select'\" title={{button.title}} class=\"pull-left ep-navbar-button left-button dropdown-toggle\" data-toggle=dropdown aria-expanded=false ng-class=\"{'disabled': state.freezeNavButtons  || button.enabled === false}\"><i class=\"fa {{button.icon}} fa-2x\"></i> <span ng-bind=button.title style=\"padding-right: 5px\"></span> <span class=caret></span> <span ng-if=button.badge class=\"ep-badge {{button.badge.cssClass}}\" ng-bind=button.badge.value></span></a><ep-include class=\"pull-left ep-navbar-button left-button\" ng-if=\"button.type === 'template'\" options=button.options user-data=button></ep-include><ul ng-if=\"button.type === 'select'\" class=dropdown-menu ng-class=\"{ 'align-right': button.right, 'disabled': state.freezeNavButtons || button.enabled === false }\" role=menu><li ng-repeat=\"opt in button.options\" ng-class=\"{ 'divider': opt.type==='separator' }\" role={{opt.type}}><a ng-if=\"opt.type !== 'separator' && opt.type !== 'checked'\" ng-click=state.executeButton(opt,$event) ng-mousedown=state.buttonMouseDown(opt)><span class=ep-navmenu-item><i class=\"ep-navmenu-item-icon fa fa-fw {{opt.icon}}\"></i> <span class=ep-navmenu-item-text>{{opt.title}}</span> <span ng-if=opt.badge class=\"ep-badge {{opt.badge.cssClass}}\" ng-bind=opt.badge.value></span></span></a> <a ng-if=\"opt.type !== 'separator' && opt.type === 'checked'\" ng-click=state.executeButton(opt,$event) ng-mousedown=state.buttonMouseDown(button)><span class=ep-navmenu-item><input type=checkbox class=ep-dropdown-btn-chk ng-model=\"opt.checked\"> <span class=ep-navmenu-item-text ng-bind=opt.title></span> <span ng-if=opt.badge class=\"ep-badge {{opt.badge.cssClass}}\" ng-bind=opt.badge.value></span></span></a></li></ul></li><li id=brandItem ng-hide=\"state.showBrand === false\" ng-class=\"{'ep-center-brand': state.centerBrand}\"><a id=apptitle ng-cloak=\"\" ng-if=state.brandTarget ng-class=\"{'ep-center-brand': state.centerBrand}\" class=navbar-brand ng-href=#{{(state.brandTarget)}} ng-bind-html=state.brandHTML></a> <span id=apptitle ng-cloak=\"\" ng-if=!state.brandTarget ng-class=\"{'ep-center-brand': state.centerBrand}\" class=navbar-brand ng-bind-html=state.brandHTML></span></li><li class=right-button ng-class=\"{'hidden': !state.showRightToggleButton }\"><a id=rightMenuToggle class=\"pull-left fa {{state.rightToggleButtonIcon}} fa-2x ep-navbar-button\" ng-click=toggleRightSidebar() ng-class=\"{'hidden': !state.showRightToggleButton }\"></a></li><!--Right hand side buttons--><li ng-repeat=\"button in rightNavButtons | orderBy:'index':true\" ng-class=\"{'hidden': button.hidden, 'disabled': state.freezeNavButtons  || button.enabled === false}\" class=right-button index={{button.index}}><a id=navbtn_{{button.id}} ng-if=\"button.type === 'button'\" title={{button.title}} class=\"fa {{button.icon}} fa-2x ep-navbar-button\" ng-click=state.executeButton(button,$event) ng-mousedown=state.buttonMouseDown(button)><span ng-if=button.badge class=\"ep-badge {{button.badge.cssClass}}\" ng-bind=button.badge.value></span></a> <a id=navbtn_{{button.id}} ng-if=\"button.type === 'select'\" title={{button.title}} class=\"ep-navbar-button dropdown-toggle\" data-toggle=dropdown aria-expanded=false><i class=\"fa {{button.icon}} fa-2x\"></i> <span ng-bind=button.title style=\"padding-right: 5px\"></span> <span class=caret></span> <span ng-if=button.badge class=\"ep-badge {{button.badge.cssClass}}\" ng-bind=button.badge.value></span></a><ep-include class=ep-navbar-button ng-if=\"button.type === 'template'\" options=button.options user-data=button></ep-include><ul ng-if=\"button.type === 'select'\" class=\"dropdown-menu dropdown-menu-right\" ng-class=\"{ 'align-right': button.right, 'disabled': state.freezeNavButtons || button.enabled === false }\" role=menu><li ng-repeat=\"opt in button.options\" ng-class=\"{ 'divider': opt.type==='separator' }\" role={{opt.type}}><a ng-if=\"opt.type !== 'separator' && opt.type !== 'checked'\" ng-click=state.executeButton(opt,$event) ng-mousedown=state.buttonMouseDown(button)><span class=ep-navmenu-item><i class=\"ep-navmenu-item-icon fa fa-fw {{opt.icon}}\"></i> <span class=ep-navmenu-item-text ng-bind=opt.title></span> <span ng-if=opt.badge class=\"ep-badge {{button.badge.cssClass}}\" ng-bind=opt.badge.value></span></span></a> <a ng-if=\"opt.type !== 'separator' && opt.type === 'checked'\" ng-click=state.executeButton(opt,$event) ng-mousedown=state.buttonMouseDown(button)><span class=ep-navmenu-item><input type=checkbox class=ep-dropdown-btn-chk ng-model=\"opt.checked\"> <span class=ep-navmenu-item-text ng-bind=opt.title></span> <span ng-if=opt.badge class=\"ep-badge {{button.badge.cssClass}}\" ng-bind=opt.badge.value></span></span></a></li></ul></li></ul></div></nav><!--SIDE NAVIGATION--><ep-shell-sidebar><!--<div ng-transclude></div>--><div class=ep-fullscreen ng-if=\"options.enableViewAnimations !== false\"><div ng-view class=\"ep-fullscreen {{'ep-anim-speed-' + state.animationSpeed}} {{state.animationIn}} {{state.animationOut}} ep-view ep-view-transition\" ng-class=state.viewAnimation></div></div><div class=ep-fullscreen ng-if=\"options.enableViewAnimations === false\"><div ng-view class=\"ep-fullscreen ep-view\"></div></div></ep-shell-sidebar><div class=\"navbar navbar-xsm navbar-default navbar-fixed-bottom\" ng-class=\"{hidden: !state.showFooter}\" role=navigation id=mainfooter style=\"color: white; padding-top: 4px; padding-left: 5px\"><a class=pull-left style=\"color: white\" ng-if=state.footerTarget ng-href={{state.footerTarget}}><sup id=footerElement ng-bind-html=state.footerHTML></sup></a> <sup ng-if=!state.footerTarget id=footerElement ng-bind-html=state.footerHTML></sup></div><span class=ep-shell-feedback-btn id=feedbackbutton ng-if=state.enableFeedback ng-click=sendFeedback()><i class=\"fa fa-bullhorn\"></i> Give Feedback</span></section></div>"
  );


  $templateCache.put('src/components/ep.shell/sidebar/sidebar.html',
    "<div class=ep-shell-container ng-controller=epShellCtrl ng-class=\"{ 'nav-padding': shellState.showNavbar, 'footer-padding': shellState.showFooter}\"><!-- Backdrop to disable view container when sidebars are on --><div ng-swipe-right=showSwipeLeftSidebar($event) ng-swipe-left=showSwipeRightSidebar() id=viewContainerBackdrop ng-class=\"{'ep-view-container-backdrop': shellState.showViewContainerBackdrop}\"></div><!-- Left Sidebar --><div id=leftSidebar ng-show=\"shellState.showLeftSidebar && shellState.enableLeftSidebar\" class=\"ep-sidebar-nav ep-sidebar-nav-left well ep-ease-animation\" ng-class=\"{'ep-with-navbar': shellState.showNavbar, 'ep-with-footer': shellState.showFooter, 'cordova-ios': platform.app==='Cordova' && platform.os=='mac'}\" ng-click=dismissRightSidebar() ng-swipe-left=closeLeftSidebar()></div><div id=viewPlaceholder class=\"ep-view-placeholder ep-fullscreen\" ng-transclude><!--VIEW CONTENT HERE--></div><!-- Right Sidebar --><div id=rightSidebar ng-show=\"shellState.showRightSidebar && shellState.enableRightSidebar\" class=\"ep-sidebar-nav ep-sidebar-nav-right well ep-ease-animation\" ng-swipe-right=closeRightSidebar()></div></div>"
  );


  $templateCache.put('src/components/ep.shell/view-container/view-container.html',
    "<div id=viewContainer ng-controller=epShellCtrl my-touchstart=getTouchXPoint() ng-swipe-right=showSwipeLeftSidebar() ng-swipe-left=showSwipeRightSidebar() class=ep-view-container ng-class=\"{ 'ep-with-navbar': !!state.showNavbar,\r" +
    "\n" +
    "                                    'ep-with-footer': !!state.showFooter,\r" +
    "\n" +
    "                                    'ep-ease-animation': !!state.animateViewContainer,\r" +
    "\n" +
    "                                    'ep-scroll-y': !!state.allowVerticalScroll,\r" +
    "\n" +
    "                                    'ep-momentum-scrolling-enabled': !!state.momentumScrollingEnabled }\"><div id=viewMessage class=ep-container-message ng-if=state.infoMessage ng-style=\"{'width': state.viewDimensions.size.width + 'px', 'height': state.viewDimensions.size.height + 'px'}\"><p class=\"ep-container-message-text ep-center-item\"><i class={{state.infoIcon}}></i><br>{{state.infoMessage}}</p></div><ep-viewmodal ng-if=\"state.enableViewModal !== false && state.viewModalOptions && state.viewModalOptions.templateOptions\" options=state.viewModalOptions title=state.viewModalOptions.title><ep-include options=state.viewModalOptions.templateOptions></ep-include></ep-viewmodal><!--<ep-cached-view ng-if=\"showFromCache && hasCacheKey\" key=\"cacheKey\"></ep-cached-view>--><!--\r" +
    "\n" +
    "    <div class=\"ep-fullscreen\" ng-if=\"!showFromCache || !hasCacheKey\" id=\"viewTemplate\" ng-transclude></div>\r" +
    "\n" +
    "--><div class=ep-fullscreen id=viewTemplate ng-transclude></div></div>"
  );


  $templateCache.put('src/components/ep.shell/views/ep-shell-embedded-apps-container.html',
    "<ep-shell-view-container smallmodesettings=\"{ &quot;showNavbar&quot;: true, &quot;showFooter&quot;: false, &quot;enableLeftSidebar&quot;: true, &quot;enableRightSidebar&quot;: false, &quot;showHomeButton&quot;: false, &quot;showBrand&quot;: true,  &quot;animateViewContainer&quot;: false, &quot;allowVerticalScroll&quot;: true }\" largemodesettings=\"{ &quot;showNavbar&quot;: true, &quot;showFooter&quot;: false, &quot;enableLeftSidebar&quot;: true, &quot;enableRightSidebar&quot;: false, &quot;showHomeButton&quot;: false, &quot;showBrand&quot;: true,  &quot;animateViewContainer&quot;: false, &quot;allowVerticalScroll&quot;: true }\"><ep-embedded-apps></ep-embedded-apps></ep-shell-view-container>"
  );

}]);
