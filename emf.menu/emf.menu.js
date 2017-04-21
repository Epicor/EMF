/*
 * emf (Epicor Mobile Framework) 
 * version:1.0.12-dev.202 built: 21-04-2017
*/

if (typeof __ep_build_info === "undefined") {var __ep_build_info = {};}
__ep_build_info["menu"] = {"libName":"menu","version":"1.0.12-dev.202","built":"2017-04-21"};

(function() {
    'use strict';

    angular.module('ep.multi.level.menu', [
    'ngAnimate',
    'ep.templates',
    'ep.local.storage'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.accordion.menu
 * @description
 * Represents the accordion menu
 */
(function() {
    'use strict';

    angular.module('ep.accordion.menu', [
        'ngAnimate',
        'ep.templates',
        'ep.local.storage'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.action.set
 * @description
 * #ep.action.set
 * This is a complex component that provides action-menu/context-menu behavior.
 *
 * In order to make use of the action menu fuctionality, there needs to be one
 * instance of the `<ep-action-menu></ep-action-menu>` directive on the page.
 * This directive will render the menu; for desktop, it will provide regular popup,
 * on mobile device, it will consume full width on the bottom of the device.
 *
 * Each action menu will be described for an action owner using the the nesting
 * <pre>
 *      <ep-action-set>
 *          <ep-action-item title="myTitle" handler="myHandler"></ep-action-item>
 *          <ep-action-separator"></ep-action-separator>
 *          <ep-action-item title="myTitle2" handler="myHandler"></ep-action-item>
 *          <ep-action-item title="myTitle3" handler="myHandler"></ep-action-item>
 *      </ep-action-set>
 * </pre>
 *
 */
(function() {
    'use strict';

    angular.module('ep.action.set', [
    'ep.feature.detection',
    'ep.templates'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.dropdown
 * @description
 * Implements various dropdowns
 */
(function() {
    'use strict';

    angular.module('ep.dropdown', [
    'ep.templates',
    'ep.sysconfig'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.list
 * @description
 * A component to repesent list data on a mobile device.
 */
(function() {
    'use strict';

    angular.module('ep.list', [
    'ep.templates',
    'ep.sysconfig'
    ]);
})();

'use strict';
/**
 * @ngdoc overview
 * @name ep.menu.builder
 * @description
 * This is the dynamic popup/context menu builder
 * This will replace the ep-action-set; The SPA needs one instance of the <ep-dynamic-menu>
 * directive on the main index.html, this directive will respond to the $broadcast
 * of 'dynamicMenuCall' event.
 *
 * The <ep-context-menu> directive will use an instance of the menuBuilder (served up
 * from the epMenuBuilderFactory) to add/remove menu item actions and/or separators
 *
 */
angular.module('ep.menu.builder', [
    'ep.templates'
]);

/**
 * @ngdoc controller
 * @name ep.shell.controller:epShellMenuCtrl
 * @description
 * Represents shell's menu controller.
 */
(function() {
    'use strict';

    epShellMenuCtrl.$inject = ['$q', '$scope', 'epLocalStorageService', 'epMultiLevelMenuService', 'epUtilsService'];
    angular.module('ep.multi.level.menu').controller('epShellMenuCtrl', epShellMenuCtrl);

    var cache = {};
    /*@ngInject*/
    function epShellMenuCtrl($q, $scope, epLocalStorageService, epMultiLevelMenuService, epUtilsService) {

        $scope.onMenuOptions = function onMenuOptions() {

            $scope.menuOptions.onMenuInit = function(factory) {
                $scope.menuOptions.factory = factory;
            };
            $scope.onTopMenuClick = function topMenuClicked() {
                if ($scope.menuOptions.onTopMenuClick) {
                    $scope.menuOptions.onTopMenuClick();
                }
            };

            $scope.menu = {
                id: 'root',
                caption: $scope.menuOptions.title || 'Main Menu',
                menuitems: []
            };

            if ($scope.menuOptions.menuType !== 'accordion') {
                var arr = $scope.menuOptions.fnGetMenu || [];
                if (!angular.isArray(arr)) {
                    arr = [$scope.menuOptions.fnGetMenu];
                }
                if ($scope.includeEmbeddedMenu) {
                    var svc = epUtilsService.getService('epEmbeddedAppsService');
                    if (svc) {
                        arr.push(svc.retrieveAppsMenu);
                    }
                }
                $scope.count = arr.length;

                angular.forEach(arr, function(fn) {
                    $q.when(fn()).then(function(m) {
                        epMultiLevelMenuService.mergeMenus($scope.menu, m);
                        if (--$scope.count === 0) {
                            $scope.menuOptions.menu = $scope.menu;
                        }
                    });
                });
            } else {
               // The accordion menu passes a list of menu providers instead of a list of functions
                // Ensure that the providers object is an array
                if (!angular.isArray($scope.menuOptions.providers)) {
                    $scope.menuOptions.providers = [$scope.menuOptions.providers];
                }

                var providers = $scope.menuOptions.providers;
                $scope.count = providers.length;
                var keys = providers.map(function(p) { return p.getCacheKey(); });
                $scope.commitMenuState = function commitMenuState() {
                    keys
                        .forEach(function(key) {
                            var m = cache[key];
                            epLocalStorageService.update('menu.' + key, m);
                        });
                };
                var interval = ($scope.menuOptions.refreshInterval || 0) * 1000;
                var now = new Date().valueOf();
                providers.forEach(function(provider) {

                    var key = provider.getCacheKey();
                    provider.register(function() {
                        cache[key] = null;
                        epLocalStorageService.update('menu.' + key, null);
                    });
                    var cached = cache[key];
                    if (cached) {
                        // If we've read the menu out of memory, it doesn't need to be restored
                        merge(cached);
                    } else {
                        cached = epLocalStorageService.get('menu.' + key);
                        if (cached && cached._timestamp + interval > now) {
                            provider.restore(cached);
                            cache[key] = cached;
                            merge(cached);
                        } else {
                            var fetch = provider.get;
                            if (fetch) {
                                fetch().then(function(m) {
                                    m._timestamp = now;
                                    cache[key] = m;
                                    epLocalStorageService.update('menu.' + key, m);
                                    provider.restore(m);
                                    merge(m);
                                });
                            }
                        }
                    }
                });
            }
        };
        function merge(m) {
            epMultiLevelMenuService.mergeMenus($scope.menu, m);
            if (--$scope.count === 0) {
                $scope.menuOptions.menu = $scope.menu;
            }
        }
    }
})();

/**
* @ngdoc directive
* @name ep.shell.directive:epShellMenuDirective
* @restrict E
*
* @description
* Represents epShellMenuDirective directive
*
* @example
*/
(function() {
    'use strict';

    angular.module('ep.multi.level.menu').
    directive('epShellMenu', epShellMenuDirective);

    /*@ngInject*/
    function epShellMenuDirective() {
        return {
            restrict: 'E',
            controller: 'epShellMenuCtrl',
            templateUrl: 'src/components/ep.multi.level.menu/ep-shell-menu/ep-shell-menu.html',
            scope: {
                menuId: '=',
                menuOptions: '=',
                includeEmbeddedMenu: '='
            },
            compile: function() {
                return {
                    pre: function() { },
                    post: function($scope) {
                        $scope.$watch('menuOptions', function(newValue) {
                            if (newValue !== undefined) {
                                $scope.onMenuOptions();
                            }
                        });
                    }
                };
            }
        };
    }
})();

/**
 * @ngdoc object
 * @name ep.multi.level.menu.object:epMultiLevelMenuConstants
 * @description
 * Constants for epEmbeddedAppsConstants.
 * ep.embedded.apps constants
 */
(function() {
    'use strict';

    angular.module('ep.multi.level.menu').constant('epMultiLevelMenuConstants', {
        MLM_INITIALIZED_EVENT: 'MLM_INITIALIZED_EVENT',
        MLM_MENU_DATA_CHANGED: 'MLM_MENU_DATA_CHANGED',
        MLM_FAVORITES_CHANGED: 'MLM_FAVORITES_CHANGED',
        MLM_ITEM_CLICKED: 'MLM_ITEM_CLICKED',
        MLM_ITEM_EXPANDED: 'MLM_ITEM_EXPANDED'
    });
})();

/**
 * @ngdoc controller
 * @name ep.multilevel.menu.controller:epMultiLevelMenuCtrl
 * @description
 * Represents the epMultiLevelMenu controller for the
 * ep.multi.level.menu module, or specific for directive ep-multi-level-menu
 *
 * @example
 *
 */
(function() {
    'use strict';

    angular.module('ep.multi.level.menu').controller('epMultiLevelMenuCtrl',
        /*@ngInject*/
        ['$rootScope', '$scope', '$timeout', 'epMultiLevelMenuFactory', 'epMultiLevelMenuConstants', 'epMultiLevelMenuService', function($rootScope, $scope, $timeout, epMultiLevelMenuFactory, epMultiLevelMenuConstants, 
                 epMultiLevelMenuService) {

            // init the scope properties
            $scope.state = {
                searchTerm: '',
                searchType: 'item',
                lastSearchTerm: ''
            };

            $scope.searchResults = [];  //Current search results
            $scope.currentItems = [];   //Current items to display (can be menu or search results)
            $scope.multiLevelMenuHelper = null;

            var searchTimeout;

            // private clear controller results
            function clear() {
                $scope.searchResults = [];
                $scope.currentItems = [];
                $scope.state.lastSearchTerm = '';
            }

            // private set current items (search or menu)
            function setCurrentItems() {
                if ($scope.state.searchTerm) {
                    $scope.currentItems = $scope.searchResults;
                } else if ($scope.data && $scope.data.next) {
                    $scope.currentItems = $scope.data.next.menuitems;
                } else {
                    $scope.currentItems = [];
                }
            }

            /**
             * @ngdoc method
             * @name search
             * @methodOf ep.multilevel.menu.controller:epMultiLevelMenuCtrl
             * @public
             * @description
             * Handles the search request.   this will take the $scope.state.searchTerm from the
             * input box on the form populates local $scope.searchResults [] collection.
             * if $scope.state.searchType is provided, the menu.type can be used to refine the search
             * results by type, here 'menu' or 'item' can be used.
             */
            function search() {
                $scope.isRightToLeft = false;
                if (searchTimeout) {
                    $timeout.cancel(searchTimeout);
                }

                if (!$scope.menu || !$scope.menu.menuitems || !$scope.state.searchTerm) {
                    $scope.searchResults = [];
                    $scope.state.lastSearchTerm = '';
                    setCurrentItems();
                    return;
                }

                searchTimeout = $timeout(function() {
                    var results = [];

                    var term = $scope.state.searchTerm.toLowerCase();
                    var type = $scope.state.searchType ? $scope.state.searchType.toLowerCase() : '';

                    if ($scope.state.lastSearchTerm && term.indexOf($scope.state.lastSearchTerm) === 0) {
                        //search in our prior result set
                        searchKids($scope.searchResults, term, type, false, results);
                    } else {
                        searchKids($scope.menu.menuitems, term, type, true, results);
                    }
                    $scope.searchResults = results;
                    setCurrentItems();
                    $scope.state.lastSearchTerm = term;
                }, 250); // delay 250 ms in case user types too fast...
            }

            // private enum to search kids for local searchTerm
            function searchKids(menuitems, term, type, recursive, results) {
                angular.forEach(menuitems, function(kid) {
                    if (kid && kid.caption.toLowerCase().indexOf(term) !== -1) {
                        // if we are type checking, also check the system-set _type
                        if (type === '' || kid.type === type || kid._type === type) {
                            results.push(kid);
                        }
                    }
                    if (recursive && kid.menuitems) {
                        searchKids(kid.menuitems, term, type, recursive, results);
                    }
                });
            }
            /**
             * @ngdoc method
             * @name navigateExternal
             * @methodOf ep.multilevel.menu.controller:epMultiLevelMenuCtrl
             * @public
             * @description
             * Handles the navigate request.
             *
             * @param {object} mi - the menu item
             * @param {object} event - event object from UI
             */
            function navigateExternal(mi, event) {
                if (!mi) {
                    return;
                }
                if (mi._type === 'item' && mi.action && typeof mi.action === 'function') {
                    $scope.multiLevelMenuHelper.stampLastAccess(mi);
                    emitMenuEvent(epMultiLevelMenuConstants.MLM_ITEM_CLICKED, mi);
                    mi.actionExternal(mi);
                }

                if (event) { event.stopPropagation(); }
            }
            /**
             * @ngdoc method
             * @name navigate
             * @methodOf ep.multilevel.menu.controller:epMultiLevelMenuCtrl
             * @public
             * @description
             * Handles the navigate request.
             *
             * @param {object} mi the menu item
             * @param {bool} isHeader - is header clicked (backwards or top menu, otherwise triggered from item)
             * @param {object} ev - event object from UI
             */
            function navigate(mi, isHeader, ev) {
                if (!mi) {
                    return;
                }
                if (mi._type === 'menu') {
                    if (mi._id === 'topmenu') {
                        return;
                    }
                    //going to back to parent set 'left-to-right' animation,
                    //otherwise 'right-to-left'
                    $scope.isRightToLeft = (isHeader !== true);
                    $scope.data.next = mi;
                    $timeout(function() {
                        setCurrentItems();
                        $scope.$apply();
                    });
                }
                if (mi._type === 'item' && mi.action && typeof mi.action === 'function') {
                    $scope.multiLevelMenuHelper.stampLastAccess(mi);
                    emitMenuEvent(epMultiLevelMenuConstants.MLM_ITEM_CLICKED, mi);
                    mi.action(mi);
                }
                if (mi.isTop && isHeader && ev && $scope.onTopMenuClick) {
                    $scope.onTopMenuClick();
                }
            }

            /**
             * @ngdoc method
             * @name toggleFavorite
             * @methodOf ep.multilevel.menu.controller:epMultiLevelMenuCtrl
             * @public
             * @description
             * Handles the toggleFavorite request
             *
             * @param {object} mi the menu item
             * @param {object} event the click event that invoked toggleFavorite
             */
            function toggleFavorite(mi, event) {
                $scope.multiLevelMenuHelper.toggleFavorite(mi, event);
            }

            function emitMenuEvent(eventId, menuItem) {
                $rootScope.$emit(eventId, {
                    eventId: eventId,
                    menuId: $scope.menuId,
                    factory: $scope.multiLevelMenuHelper,
                    scope: $scope,
                    menuItem: menuItem
                });
            }

            // initialize the menus using the directive properties
            function initializeMenus(componentType) {
                // if they pass in the search-type directive property, set it on $scope.state
                // override the default searchType = 'item'
                if ($scope.searchType) {
                    $scope.state.searchType = $scope.searchType;
                }
                // now the transitionEnd event is wired up, we use the local mlmService to populate()
                // AKA, walk up and down the menu setting the _parent and _depth properties
                $scope.multiLevelMenuHelper = epMultiLevelMenuFactory.getMultiLevelMenuHelper($scope, componentType);
                $scope.multiLevelMenuHelper.populate($scope.menu);

                // now we set the data (with _parent and _depth properties) on scope and set the 'next' panel
                $scope.data = $scope.multiLevelMenuHelper.data;
                $scope.data.next = $scope.multiLevelMenuHelper.data.menu;
                // when we invoke navigate, this will add the animation class setting the initial
                // animation into effect
                $scope.navigate($scope.data.next);

                if ($scope.onMenuInit) {
                    //a callback to the outside to provide factory if needed...
                    $scope.onMenuInit({factory: $scope.multiLevelMenuHelper});
                }

                emitMenuEvent(epMultiLevelMenuConstants.MLM_INITIALIZED_EVENT);

                $scope.$watch('menu', function(newValue, oldValue) {
                    if (newValue && (!angular.equals(newValue, oldValue) || !$scope.data || !$scope.data.menu)) {
                        $scope.multiLevelMenuHelper.populate($scope.menu, true);
                        $scope.data = $scope.multiLevelMenuHelper.data;
                        $scope.data.next = $scope.multiLevelMenuHelper.data.menu;
                        setCurrentItems();
                        emitMenuEvent(epMultiLevelMenuConstants.MLM_MENU_DATA_CHANGED);
                    }
                });

                epMultiLevelMenuService.registerMenuFactory($scope.multiLevelMenuHelper);
                //TO DO: on scope destroy unregister
            }

            function doOrderByMenu(menu) {
                var sortFnValue = $scope.fnSort ? $scope.fnSort(menu) : undefined;
                return sortFnValue || menu.sort || menu.caption;
            }

            $scope.$watch('sortDisabled', function(newValue, oldValue) {
                if ((newValue === true || newValue === false) && !angular.equals(newValue, oldValue)) {
                    $scope.orderByMenu = (newValue === true) ? undefined : doOrderByMenu;
                }
            });

            $scope.orderByMenu = ($scope.sortDisabled === true) ? undefined : doOrderByMenu;
            $scope.clear = clear;
            $scope.setCurrentItems = setCurrentItems;
            $scope.navigate = navigate;
            $scope.navigateExternal = navigateExternal;
            $scope.toggleFavorite = toggleFavorite;
            $scope.search = search;
            $scope.initializeMenus = initializeMenus;
            $scope.emitMenuEvent = emitMenuEvent;
        }]
    );
})();

/**
* @ngdoc directive
* @name ep.multi.level.menu.directive:epMultiLevelMenu
* @restrict E
*
* @description
* Represents the ep.multi.level.menu directive
*
* Multi-level menu directive.
*
*   # menu {object} (required) - the object containing menu item properties.
*       menuitems {array} - array of menu items (nested sub menu items
*       caption {string} - menu caption (for menu tile)
*       hideFavorite {bool} - hide the favorite turning on/off (favorite star)
*       icon {string} - the icon next to menu (favorite must be off)
*       action {function} - function called when menu is pressed
*       captionClass {string} - additional user class for caption
*       tile {object} - settings for ep.tile when working with <ep-tiles-menu-favorites>
*       separator {object} - add separator on top of th menu item
*           # text {string} - (optional) separator text
*           # icon {string} - (optional) the icon next separator text
*           # isBottom {bool} - (optional) separtor to be displayed below the menu item
*
* @example
*/
(function() {
    'use strict';

    angular.module('ep.multi.level.menu').directive('epMultiLevelMenu', [
    '$timeout',
     function($timeout) {
         return {
             restrict: 'E',
             replace: true,
             controller: 'epMultiLevelMenuCtrl',
             templateUrl: 'src/components/ep.multi.level.menu/multi-level-menu.html',
             scope: {
                 menuId: '=',           // menuId used to save favorites to local storage
                 searchType: '=',
                 searchDisabled: '=',   // disable search input
                 sortDisabled: '=',     // disable sorting
                 iconDisabled: '=',     // disable icons on menu items
                 initFavorites: '=',    // initialize all favorites on very first time only
                 menu: '=',             // we take the menu as input parameter on the directive
                 onMenuInit: '&',       // this get fired upon menu initialization to provide factory
                 onFavoriteChange: '&', // fired upon favorite menu change
                 onTopMenuClick: '='    // event for topmost menu item click
             },
             compile: function() {
                 return {
                     pre: function() { },
                     post: function($scope) {
                         $timeout(function() {
                             $scope.initializeMenus('epMultiLevelMenu');
                         });
                     }
                 };
             }
         };
     }]);
})();

/**
 * @ngdoc service
 * @name ep.multi.level.menu.factory:epMultiLevelMenuFactory
 * @description
 * Service for the ep.multi.level.menu module
 * Represents the Multi level menu
 *
 * @example
 *
 */
(function() {
    'use strict';

    angular.module('ep.multi.level.menu').factory('epMultiLevelMenuFactory', [
    'epLocalStorageService',
    'epMultiLevelMenuService',
    'epMultiLevelMenuConstants',
    function(epLocalStorageService, epMultiLevelMenuService, epMultiLevelMenuConstants) {
        function getMultiLevelMenuHelper(scope, type) {
            return new multiLevelMenuHelper(scope, type);
        }
        return {
            getMultiLevelMenuHelper: getMultiLevelMenuHelper
        };

        function multiLevelMenuHelper(ctrlScope, componentType) {
            var depth = 0;
            var scope = ctrlScope; // scope from the controller
            var data = {
                menu: null, // all of the menu data
                favorites: null
            };

            /**
             * @ngdoc method
             * @name buildTree
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @private
             * @description
             * enumerate/walk up and down the menu.menuitems collection of
             * child menus and decorate the _parent/_depth properties
             * @param {array} menu - array of menu items
            */
            function buildTree(menu) {
                if (!menu.menuitems) {
                    menu.menuitems = [];
                }
                if (!menu._type) {
                    menu._type = menu.menuitems === null || menu.menuitems.length <= 0 ? 'item' : 'menu';
                    if (menu._type === 'item' && !menu._lastAccessed) {
                        menu._lastAccessed = getItemLastAccess(menu);
                    }
                }

                menu._depth = depth;
                angular.forEach(menu.menuitems, function(kid) {
                    if (componentType !== 'epAccordionMenu') {
                        // we cannot set the parent with the accordion menu because the menu data is serialized
                        // as JSON, and setting the parent causes a circular structure
                        kid._parent = menu;
                    }
                    depth++;
                    buildTree(kid);
                    depth--;
                });
            }

            /**
             * @ngdoc method
             * @name populate
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * walk up and down the menu.menuitems and set _depth/_parent properties
             * @param {object} menu - menu json source
             * @param {boolean} refresh - optional parameter if need to redraw the menu
            */
            function populate(menu, refresh) {
                if (menu) {
                    data.menu = angular.extend({}, menu);
                }
                if (data.menu) {
                    // mock up a "_parent" for the top most menu so our html can set the proper pointers.
                    data.menu._parent = { _id: 'topmenu', isTop: true };
                    // walk up and down the menu.menuitems and set _depth/_parent properties
                    buildTree(data.menu);
                    data.favorites = getFavorites();
                    data.next = data.menu;

                    if (!epLocalStorageService.get(getStoreKey())) {
                        //set initial favorites if this is the very first time running menu
                        epMultiLevelMenuService.findAllMenuItems(data.menu, function(m) {
                            if (!m.hideFavorite && (m.initFavorite || scope.initFavorites)) {
                                toggleFavorite(m);
                            }
                        });
                    }

                    if (refresh) {
                        scope.navigate(data.menu);
                    }
                }
            }

            /**
             * @ngdoc method
             * @name mergeMenu
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * merge menu items to top level children
             * @param {array} menuItems - array of menu items
             * @param {boolean} refresh - optional parameter if need to redraw the menu
            */
            function mergeMenu(menuItems, refresh) {
                data.menu = data.menu || {};
                mergeMenuItems(data.menu, menuItems);
                populate();
                if (refresh) {
                    scope.navigate(data.menu);
                }
            }

            /**
             * @ngdoc method
             * @name mergeMenuItems
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * merge menu items to top level children of menu object. Helper function which
             * does not affect internal data
             * @param {object} menu - main menu object
             * @param {array} menuItems - array of menu items to merge
             * @returns {object} merged menu object
            */
            function mergeMenuItems(menu, menuItems) {
                menu = menu || {};
                if (!menu.menuitems) {
                    menu.menuitems = [];
                }

                //avoid duplicates check by id or caption
                angular.forEach(menuItems, function(m) {
                    if (m.id) {
                        if (!findMenuItemById(m.id, menu)) {
                            menu.menuitems.push(m);
                        }
                    } else {
                        if (!epMultiLevelMenuService.findFirstMenuItem(menu, function(mm) {
                            return mm.caption === m.caption;
                        })) {
                            menu.menuitems.push(m);
                        }
                    }
                });
                return menu;
            }

            /**
             * @ngdoc method
             * @name setCurrentMenuParent
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * Handles the setCurrentMenuParent request
             *
             * @param {object} menuItem the menu item to set as current
           */
            function setCurrentMenuParent(menuItem) {
                if (menuItem) {
                    data.next = menuItem;
                }
            }
            /**
             * @ngdoc method
             * @name setCurrentMenuParentById
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * Handles the setCurrentMenuParentById request
             *
             * @param {object} id the menu item id to set as current
           */
            function setCurrentMenuParentById(id) {
                var mi = findMenuItemById(id);
                if (mi) {
                    setCurrentMenuParent(mi);
                }
            }
            /**
             * @ngdoc method
             * @name findMenuItemById
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * Handles the findMenuItemById request
             *
             * @param {object} id the id to search for
             * @param {object} root the parent menu to start the search
           */
            function findMenuItemById(id, root) {
                var fn = function(item) {
                    return (item.id === id);
                };
                return epMultiLevelMenuService.findFirstMenuItem((!root) ? data.menu : root, fn);
            }
            /**
             * @ngdoc method
             * @name resetCache
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * Resets only the menu content by clearing and re-populating.
            */
            function resetCache() {
                data.menu = null;
                data.favorites = null;
                data.next = null;
                scope.clear();
                return populate();
            }
            /**
             * @ngdoc method
             * @name clear
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * Clears all data - does not re-populate
            */
            function clear() {
                data.menu = null;
                data.favorites = null;
                data.next = null;
                scope.clear();
            }
            /**
             * @ngdoc method
             * @name toggleFavorite
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * Handles the toggleFavorite request
             *
             * @param {object} mi the menu item or menu id
             * @param {object} event the click event that invoked the toggleFavorite method
            */
            function toggleFavorite(mi, event) {
                var item = getMenuItemFromObj(mi);
                if (!item) {
                    return;
                }

                item.favorite = !item.favorite;

                var menuKey = getStoreKey(item);
                if (item.favorite) {
                    epLocalStorageService.update(menuKey, (mi._id || mi.id));
                } else {
                    epLocalStorageService.clear(menuKey);
                }

                data.favorites = getFavorites();

                if (scope.onFavoriteChange) {
                    scope.onFavoriteChange({ menuItem: mi, favorites: data.favorites });
                }
                if (event) { event.stopPropagation(); }
                scope.emitMenuEvent(epMultiLevelMenuConstants.MLM_FAVORITES_CHANGED);
            }
            /**
             * @ngdoc method
             * @name triggerAction
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * Trigger menu item's action
             *
             * @param {object} mi the menu item or menu id
            */
            function triggerAction(mi) {
                var item = getMenuItemFromObj(mi);
                if (!item) {
                    return;
                }
                if (item.action && typeof item.action === 'function') {
                    stampLastAccess(item);
                    scope.emitMenuEvent(epMultiLevelMenuConstants.MLM_ITEM_CLICKED, item);
                    item.action(item);
                }
            }
            /**
             * @ngdoc method
             * @name stampLastAccess
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * Stamp the last access for menu item
             *
             * @param {object} mi the menu item or menu id
            */
            function stampLastAccess(mi) {
                var item = getMenuItemFromObj(mi);
                if (!item) {
                    return;
                }
                var menuKey = getStoreKey(item, true);
                mi._lastAccessed = moment().toISOString();
                epLocalStorageService.update(menuKey, mi._lastAccessed);
            }
            /**
             * @ngdoc method
             * @name getItemLastAccess
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * Retrieve the last access for menu item
             *
             * @param {object} mi the menu item or menu id
            */
            function getItemLastAccess(mi, forceRetrieve) {
                var ret;
                var item = getMenuItemFromObj(mi);
                if (!item) {
                    return;
                }

                if (forceRetrieve !== true && item._lastAccessed) {
                    return item._lastAccessed;
                }

                var menuKey = getStoreKey(item, true);
                var date = epLocalStorageService.get(menuKey);
                if (date) {
                    var m = moment(date);
                    if (m.isValid()) {
                        ret = m.toDate();
                    }
                }
                return ret;
            }

            /**
             * @ngdoc method
             * @name getMenuItemFromObj
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @private
             * @description
             * Get menu item from object or menu id
             *
             * @param {object} mi the menu item or menu id
            */
            function getMenuItemFromObj(mi) {
                var item = mi;
                if (angular.isString(mi)) {
                    item = findMenuItemById(mi);
                }
                return item;
            }

            /**
             * @ngdoc method
             * @name findByIdFavorites
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @private
             * @description
             * Finds id for favorites (matching id or _id)
            */
            function findByIdFavorites(id) {
                return epMultiLevelMenuService.findFirstMenuItem(data.menu,
                    function fnMatchId(item) {
                        return item._id ? (item._id === id) : (item.id === id);
                    });
            }

            /**
             * @ngdoc method
             * @name getFavorites
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * Handles the getFavorites request
            */
            function getFavorites() {
                var favList = epMultiLevelMenuService.findAllMenuItems(data.menu, function(i) { return !!i.favorite; });

                var userKey = getStoreKey();
                var savedItems = epLocalStorageService.get(userKey) || {};

                angular.forEach(savedItems, function(itemId) {
                    if (!_.find(favList, function(listItem) {
                        return listItem.id === itemId;
                    })) {
                        var savedFav = findByIdFavorites(itemId);
                        if (savedFav) {
                            savedFav.favorite = true;
                            favList.push(savedFav);
                        }
                    }
                });
                return favList;
            }
            /**
             * @ngdoc method
             * @name clearFavorites
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * Handles the clearFavorites request
            */
            function clearFavorites() {
                data.favorites = null;
                var userKey = getStoreKey();
                epLocalStorageService.clear(userKey);
                scope.emitMenuEvent(epMultiLevelMenuConstants.MLM_FAVORITES_CHANGED);
            }

            /**
             * @ngdoc method
             * @name getStoreKey
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @private
             * @description
             * Get storage key for the whole menu or menu item
            */
            function getStoreKey(item, lastAccess) {
                //we have to replace '.' in menuId or itemId for local storage
                var userKey = 'emf.multi-level-menu.' + (scope.menuId || '').replace(/\./g, '-');
                userKey += lastAccess ? '.lastaccess' : '.favorite';
                if (item) {
                    var mId = ((item._id ? item._id : item.id) || '').replace(/\./g, '-');
                    userKey = userKey + '.' + mId;
                }
                return userKey;
            }

            /**
             * @ngdoc method
             * @name getMenuId
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * Get menu ID of the menu list
            */
            function getMenuId() {
                return scope.menuId;
            }

            /**
             * @ngdoc method
             * @name setSortFunction
             * @methodOf ep.multi.level.menu.factory:epMultiLevelMenuFactory
             * @public
             * @description
             * Set sort function to do custom sorting
             *
             * @param {object} function to be called for sorting. Menu object passed to this function.
           */
            function setSortFunction(fnSort) {
                scope.fnSort = fnSort;
            }

            return {
                getMenuId: getMenuId,
                data: data,
                populate: populate,
                resetCache: resetCache,
                clearFavorites: clearFavorites,
                setCurrentMenuParent: setCurrentMenuParent,
                setCurrentMenuParentById: setCurrentMenuParentById,
                findMenuItemById: findMenuItemById,
                toggleFavorite: toggleFavorite,
                stampLastAccess: stampLastAccess,
                getItemLastAccess: getItemLastAccess,
                triggerAction: triggerAction,
                clear: clear,
                mergeMenu: mergeMenu,
                mergeMenuItems: mergeMenuItems,
                setSortFunction: setSortFunction
            };
        }
    }]);
})();

/**
 * @ngdoc service
 * @name ep.multi.level.menu.service:epMultiLevelMenuService
 * @description
 *  Multi-menu-level service. Provides generic functions for manipulating menu
 *  data object. Note that while the MLM Factory works with an instance of a directive,
 *  MLM Service works with any given menu data.
 */
(function() {
    'use strict';

    angular.module('ep.multi.level.menu').service('epMultiLevelMenuService', [
    function() {

        var factories = {};  //Currently registered MLM factories

        /* ------------- Public Methods ----------------------> */
        /**
         * @ngdoc method
         * @name findFirstMenuItem
         * @methodOf ep.multi.level.menu.service:epMultiLevelMenuService
         * @public
         * @description
         * find menu item satisfying a criteria specified by given function
         * @param {string} root - start search from this node
         * @param {function} fn - criteria function must evaluate to true/false
        */
        function findFirstMenuItem(root, fn) {
            var foundItem = fn(root) ? root : null;
            if (!foundItem) {
                angular.forEach(root.menuitems, function(item) {
                    if (!foundItem) {
                        foundItem = findFirstMenuItem(item, fn);
                    }
                });
            }
            return foundItem;
        }

        /**
         * @ngdoc method
         * @name findMenuItemById
         * @methodOf ep.multi.level.menu.service:epMultiLevelMenuService
         * @public
         * @description
         * Handles the findMenuItemById request
         *
         * @param {object} id the id to search for
         * @param {object} root the parent menu to start the search
       */
        function findMenuItemById(id, root) {
            var fn = function(item) {
                return (item.id === id);
            };
            return findFirstMenuItem(root, fn);
        }

        function fnIterateLevel(root, fn, results) {
            angular.forEach(root.menuitems, function(item) {
                if (fn(item)) {
                    results.push(item);
                }
                fnIterateLevel(item, fn, results);
            });
        }

        /**
         * @ngdoc method
         * @name findAllMenuItems
         * @methodOf ep.multi.level.menu.service:epMultiLevelMenuService
         * @private
         * @description
         * find all menu items satisfying a criteria specified by given function
         * @param {object} menu - menu object
         * @param {function} fn - criteria function must evaluate to true/false
        */
        function findAllMenuItems(menu, fn) {
            var results = [];
            fnIterateLevel(menu, fn, results);
            return results;
        }

        /**
        * @ngdoc method
        * @name mergeMenuItems
        * @methodOf ep.multi.level.menu.service:epMultiLevelMenuService
        * @public
        * @description
        * Merge menu with menu items
        *
        * @param {object} menu - represents the main menu into which menu items are merged
        * @param {object} menuItems - menu items that are merged into the menu
        */
        function mergeMenuItems(menu, menuItems) {
            if (!menu.menuitems) {
                menu.menuitems = [];
            }
            _.each(menuItems, function(m) {
                var pm = null;
                if (m.menuitems && m.menuitems.length) {
                    pm = findMenuItemById(menu, m.id);
                }
                if (pm) {
                    mergeMenuItems(pm, m.menuitems);
                } else {
                    menu.menuitems.push(m);
                }
            });
        }

        /**
        * @ngdoc method
        * @name mergeMenus
        * @methodOf ep.multi.level.menu.service:epMultiLevelMenuService
        * @public
        * @description
        * Merge menu with other menus (from menu providers)
        *
        * @param {object} menu - represents the main menu into which menu items are merged
        * @param {object} menus - array of other menus that are merged into the main menu
        */
        function mergeMenus(menu, menus) {
            if (menus && menu) {
                _.each(menus, function(m) {
                    if (m && m.Menu) {
                        mergeMenuItems(menu, m.Menu.menuitems);
                    } else if (m && m.menuitems) {
                        mergeMenuItems(menu, m.menuitems);
                    }
                });
            }
        }

        /**
         * @ngdoc method
         * @name registerMenuFactory
         * @methodOf ep.multi.level.menu.service:epMultiLevelMenuService
         * @public
         * @description
         * Internal usage only. Register MLM factory when it is created
         *
         * @param {object} factory - the factory to register
       */
        function registerMenuFactory(factory) {
            if (factory && factory.getMenuId()) {
                factories[factory.getMenuId()] = factory;
            }
        }

        /**
         * @ngdoc method
         * @name getMenuFactory
         * @methodOf ep.multi.level.menu.service:epMultiLevelMenuService
         * @public
         * @description
         * Find registerd MLM factory by ID
         *
         * @param {string} menuId - menu id
       */
        function getMenuFactory(menuId) {
            return factories[menuId];
        }

        //TO DO: add iterateMenuItems()
        return {
            registerMenuFactory: registerMenuFactory,
            getMenuFactory: getMenuFactory,
            mergeMenuItems: mergeMenuItems,
            mergeMenus: mergeMenus,
            findMenuItemById: findMenuItemById,
            findFirstMenuItem: findFirstMenuItem,
            findAllMenuItems: findAllMenuItems
        };
    }]);
})();

/**
 * @ngdoc directive
 * @name ep.multi.level.menu.directive:epAccordionMenu
 * @restrict E
 *
 * @description
 * Represents the ep.accordion.menu directive
 *
 * Accordion menu directive.
 *
 *   # menu {object} (required) - the object containing menu item properties.
 *       menuitems {array} - array of menu items (nested sub menu items
 *       caption {string} - menu caption (for menu tile)
 *       hideFavorite {bool} - hide the favorite turning on/off (favorite star)
 *       icon {string} - the icon next to menu (favorite must be off)
 *       action {function} - function called when menu is pressed
 *       captionClass {string} - additional user class for caption
 *       tile {object} - settings for ep.tile when working with <ep-tiles-menu-favorites>
 *       separator {object} - add separator on top of th menu item
 *           # text {string} - (optional) separator text
 *           # icon {string} - (optional) the icon next separator text
 *           # isBottom {bool} - (optional) separator to be displayed below the menu item
 *
 * @example
 */
(function() {
    'use strict';

    angular.module('ep.accordion.menu').directive('epAccordionMenu',
        /*@ngInclude*/
        ['$timeout', function($timeout) {
            return {
                restrict: 'E',
                replace: true,
                controller: 'epMultiLevelMenuCtrl',
                templateUrl: 'src/components/ep.accordion.menu/ep-accordion-menu_template.html',
                scope: {
                    menuId: '=',           // menuId used to save favorites to local storage
                    searchType: '=',
                    searchDisabled: '=',   // disable search input
                    sortDisabled: '=',     // disable sorting
                    iconDisabled: '=',     // disable icons on menu items
                    initFavorites: '=',    // initialize all favorites on very first time only
                    menu: '=',             // we take the menu as input parameter on the directive
                    onMenuInit: '&',       // this get fired upon menu initialization to provide factory
                    onFavoriteChange: '&', // fired upon favorite menu change
                    onExpand: '=',         // fired when the menu item is expanded/collapsed
                    onTopMenuClick: '=',    // event for topmost menu item click
                    searchResultsHeader: '=',
                    favoritesHeader: '=',
                    mainHeader: '=',
                    commitMenuState: '='
                },
                link: {
                    pre: function() {
                    },
                    post: function($scope) {

                        $scope.searchResultsHeader = $scope.searchResultsHeader || 'Search Results';
                        $scope.favoritesHeader = $scope.favoritesHeader || 'Favorites';
                        $scope.mainHeader = $scope.mainHeader || '';
                        $timeout(function() {
                            $scope.initializeMenus('epAccordionMenu');
                        });

                        //on arrow down then select the first node of the search results
                        $scope.onKeydown = function(e) {
                            var key = e.keyCode;
                            var target = $(e.target);

                            if (key === 40) {
                                target.parents().nextAll().filter(':visible')
                                    .not('.ep-menu-header').find('.container-fluid')
                                    .first().focus();
                            }
                        };
                    }
                }
            };
        }])
        .directive('epAccordionMenuItem',
            /*@ngInclude*/
            function() {
                return {
                    restrict: 'E',
                    replace: true,
                    templateUrl: 'src/components/ep.accordion.menu/ep-accordion-menu-item_template.html',
                    scope: {
                        item: '=',
                        navigate: '=',
                        navigateExternal: '=',
                        toggleFavorite: '=',
                        hideDescription: '=',
                        onExpand: '=',
                        commitMenuState: '='
                    },
                    /*ngInject*/
                    controller: ['$rootScope', '$scope', 'epFeatureDetectionService', function($rootScope, $scope, epFeatureDetectionService) {
                        $scope.isMobile = false;
                        epFeatureDetectionService.initialize()
                            .then(function(features) {
                                //if the app is running packaged up for mobile then disallow several things through the UI to open external
                                if (features.platform.app.toLowerCase() === 'cordova') {
                                    $scope.isMobile = true;
                                }
                            });

                        $scope.$watch('item.isExpanded', function(val) {
                            if (val !== undefined) {
                                if ($scope.onExpand) { $scope.onExpand($scope.item); }
                                if ($scope.commitMenuState) { $scope.commitMenuState(); }
                            }
                        });

                        $scope.onKeydown = function(item, e) {
                            var key = e.keyCode;
                            var target = $(e.target);

                            switch (key) {
                                case 13: // Enter key
                                    item.isExpanded = !item.isExpanded;
                                    break;
                                case 37: // Left key
                                    item.isExpanded = false;
                                    break;
                                case 39: // Right key
                                    item.isExpanded = true;
                                    break;
                                case 38: // arrow up
                                    if (target.parents().prevAll().filter(':visible').first().parent()
                                        .hasClass('ep-accordion-expanded')) {
                                        target.parents().prevAll().filter(':visible').first().focus();
                                    } else {
                                        target.parents().prevAll().filter(':visible')
                                            .not('.ep-menu-header').first()
                                            .find('.container-fluid, .form-control')
                                            .focus();
                                    }
                                    break;
                                case 40: // arrow down
                                    if (target.parent().hasClass('ep-accordion-expanded')) {
                                        target.next().find('.container-fluid')
                                            .first().focus();
                                    } else {
                                        target.parents().nextAll().filter(':visible')
                                            .find('.container-fluid')
                                            .first().focus();
                                    }
                                    break;
                            }
                        };
                    }]
                };
            });
})();

/**
     * @ngdoc directive
     * @name ep.action.set.directive:epActionItem
     * @restrict E
     * @requires ep.action.set.directive:epActionSet
     *
     * @description
     * Represents the action menu item
     * - title: the text presented on the action popup
     * - handler: the function called when the action item is clicked
     * - icon: the icon
     *
     * @example
     * <pre>
     *      <ep-action-set >
     *          <ep-action-item title="First Item" handler="angular.noop" icon=""></ep-action-item>
     *          <ep-action-item title="Second Item" handler="angular.noop" icon=""></ep-action-item>
     *      </ep-action-set>
     * </pre>
     */
(function() {
    'use strict';

    angular.module('ep.action.set').directive('epActionItem', [
    '$document',
    'actionSetFactory',
    function($document, actionSetFactory) {
        return {
            restrict: 'E',
            scope: {
                handler: '=',
                title: '@',
                trigger: '@',
                type: '@',
                params: '=',
                actionSwitch: '=switch',
                actionSwitchParams: '=switchParams',
                actionSwitchResult: '=switchResult',
                //            bindTo: '=',
                //            insertTo: '=',
                icon: '@'
            },
            //require : '^epActionSet',
            link: function(scope, iElement, iAttrs) {
                var scopeCopy = {
                    handler: scope.handler,
                    title: scope.title,
                    trigger: scope.trigger,
                    type: scope.type,
                    params: scope.params,
                    actionSwitch: scope.actionSwitch,
                    actionSwitchParams: scope.actionSwitchParams,
                    actionSwitchResult: scope.actionSwitchResult
                };
                scope.$destroy();
                scope = null;
                actionSetFactory.registerAction(iElement, scopeCopy, 'default' in iAttrs);
                iElement.remove();
            }
        };
    }]);
})();


/**
 * @ngdoc controller
 * @name ep.action.set.controller:epActionMenuCtrl
 * @description
 * Represents the epActionMenu controller.
 *      This controller invokes the action.handler on click event
 *
 */
(function() {
    'use strict';

    angular.module('ep.action.set').controller('epActionMenuCtrl', [
    '$scope',
    '$document',
    function($scope, document) {
        var vm = this;
        vm.closeMenu = closeMenu;
        vm.invokeAction = invokeAction;

        // closes the Action menu popup
        function closeMenu() {
            vm.actions = null;
            if (!$scope.$root.$$phase) {
                $scope.$apply();
            }
            document.off('click.actionMenu');
        }

        // invoke the action's handler function
        function invokeAction(evt, action) {
            action.handler.call(vm, action.callback);
            closeMenu();
            evt.stopPropagation();
            evt.preventDefault();
        }
        // listen for the $broadcast of 'actionMenuCall'
        $scope.$on('actionMenuCall', function(evt, val) {
            vm.actions = val.actions;

            // if position is fixed we are running on small width devices. Just skip this statement
            // if not, set css position of actionMenu
            if (vm.menu.css('position') !== 'fixed') {
                vm.menu.css({ left: val.event.clientX + 'px', top: val.event.clientY + 'px' });
            }
            document.on('click.actionMenu', function() {
                closeMenu();
            });
            //added for passing unit tests
            if (!$scope.$root.$$phase) {
                $scope.$apply();
            }
        });
    }]);
})();

/**
     * @ngdoc directive
     * @name ep.action.set.directive:epActionMenu
     * @restrict E
     *
     * @description
     * Represents the action menu directive.
     * There needs to be one instance of this directive to exist on the page
     * in order for the `<ep-action-set>` elements to be properly rendered.
     *
     * @example
     * <pre>
     *  <ep-action-menu></ep-action-menu>
     * </pre>
     */
(function() {
    'use strict';

    angular.module('ep.action.set').directive('epActionMenu',
    function() {
        return {
            restrict: 'E',
            replace: true,
            controller: 'epActionMenuCtrl',
            controllerAs: 'actionMenuCtrl',
            templateUrl: 'src/components/ep.action.set/action-menu/action-menu.html',
            link: function(scope, el) {
                scope.actionMenuCtrl.menu = el;
            }
        };
    });
})();

/**
     * @ngdoc directive
     * @name ep.action.set.directive:epActionSeparator
     * @restrict E
     * @requires ep.action.set.directive:epActionSet
     *
     * @description
     * Represents the action menu separator
     *
     * @example
     * <pre>
     *   <ep-action-set >
     *       <ep-action-item title="First Item" handler="angular.noop"></ep-action-item>
     *       <ep-action-separator></ep-action-separator>
     *       <ep-action-item title="Second Item" handler="angular.noop"></ep-action-item>
     *       <ep-action-item title="Third Item" handler="angular.noop"></ep-action-item>
     *   </ep-action-set>
     * </pre>
     */
(function() {
    'use strict';

    angular.module('ep.action.set').directive('epActionSeparator', [
    '$document',
    function() {
        return {
            restrict: 'E',
            require: '^epActionSet',
            link: function(scope, iElement) {
                var actionOwner = $(iElement).parent();
                var actions = actionOwner.data('actions') || [];
                actions.push({ type: 'separator' });
                iElement.remove();
            }
        };
    }]);
})();

/**
 * @ngdoc controller
 * @name ep.action.set.controller:epActionSetCtrl
 * @description
 * Represents the epActionSetCtrl controller.
 *      This controller provides the onActionCallerClick event
 *
 *
 * @example
 *
 */
(function() {
    'use strict';

    angular.module('ep.action.set').controller('epActionSetCtrl', [
    '$scope',
    function($scope) {
        // find the right action and broadcast the actionMenuCall
        $scope.onActionCallerClick = function(evt) {
            var $target = $(evt.target).closest('.ep-interactivity-sign');
            // here we need to come back later and use guid/factory to serve up the
            // actions object
            var actions = $target.parent().data('actions');
            $scope.$root.$broadcast('actionMenuCall', { event: evt, actions: actions });
            evt.preventDefault();
            evt.stopPropagation();
        };
    }]);
})();

/**
     * @ngdoc directive
     * @name ep.action.set.directive:epActionSet
     * @restrict E
     *
     * @description
     * Represents the action set
     *
     * @example
     * <pre>
     *   <ep-action-set position="right-center">
     *       <ep-action-item title="First Item" handler="angular.noop"></ep-action-item>
     *       <ep-action-item title="Second Item" handler="angular.noop"></ep-action-item>
     *   </ep-action-set>
     * </pre>
     */
(function() {
    'use strict';

    angular.module('ep.action.set').directive('epActionSet', [
    '$compile',
    'epFeatureDetectionService',
    function($compile, epFeatureDetectionService) {
        return {
            restrict: 'E',
            scope: {
                position: '=',
                bindTo: '=',
                insertTo: '='
            },
            controller: 'epActionSetCtrl',
            compile: function(elem, attrs) {
                var positionClass = '';
                //Positioning is one of weakneses of this directive. Positioning and other CSS conflicts are expected.
                //This topic is #1 subject for improvements
                elem.parent().addClass('ep-relative').addClass('ep-action-owner');
                positionClass = 'ep-actionset-right-down';
                if (epFeatureDetectionService.browserIsMobile() === false && attrs.position) {
                    switch (attrs.position) {
                        case 'absolute-right-bottom':
                            positionClass = 'ep-actionset-right-bottom';
                            break;
                        case 'right-bottom':
                            positionClass = 'ep-actionset-right-down';
                            break;
                        case 'right-center':
                            positionClass = 'ep-actionset-right-center';
                            break;
                    }
                }
                elem.addClass('ep-actionset');
                elem.addClass(positionClass);
                //Also we can add posibility to render this actions like :
                //1.toolbar with buttons
                //2.Silent mode. 'Foreign' DOM element as trigger
                elem.append($('<div class="ep-interactivity-sign" ' +
                    'ng-controller="epActionSetCtrl" ng-click="onActionCallerClick($event)">' +
                    //'<div class="ep-interactivity-sign-inner-ctr">' +
                    '<span class="fa fa-ellipsis-h"></span></div></div>'));
                return {
                    pre: function() {
                    },
                    post: function(scope) {
                        if (scope.bindTo) {
                            scope.bindTo.append(elem);
                            scope.bindTo.addClass('ep-relative').addClass('ep-action-owner');
                        }
                        scope.$destroy();
                        scope = null;
                    }
                };
            }
        };
    }]);
})();

/**
 * @ngdoc service
 * @name ep.action.set.factory:actionSetFactory
 * @description
 * Provides Epicor Mobile Framework action set factory
 *       this factory will provide registerAction fuction to
 *
 * @example
 *       actionSetFactory.registerAction(iElement, scopeCopy, 'default' in iAttrs);
 *
 */
(function() {
    'use strict';

    angular.module('ep.action.set').factory('actionSetFactory', [
    function() {
        /**
        * @ngdoc method
        * @name registerAction
        * @methodOf ep.action.set.factory:actionSetFactory
        * @public
        * @description
        * Registers the ActionSet collection of Action items
        *
        * @param {object} element The DOM element that contains info about the action
        * @param {object} scope The current scope
        */
        function registerAction(element, scope) {
            if (scope.handler === null) {
                return;
            }

            // here actionOwner is the ep-action-set element
            var actionOwner = $(element).parent();
            // this 'data' object on the actionOwner needs to be rethought..
            // come back to this later, an spin up a guid and use a service to
            // store for us the guid / actionObj --- consume this in action-set_controller
            var actions = actionOwner.data('actions') || [];
            var actionObj = {
                title: scope.title,
                type: 'action',
                icon: scope.icon
            };
            if (scope.actionSwitch) {
                actionObj.switch = scope.actionSwitch;
                actionObj.switchParams = scope.actionSwitchParams;
                actionObj.switchResult = scope.actionSwitchResult;
            }

            if (Array.isArray(scope.params)) {
                var bf = function() {
                    scope.handler.apply(element, arguments[0]);
                };
                actionObj.handler = bf.bind(actionOwner, scope.params);
            } else {
                if (scope.handler) {
                    actionObj.handler = scope.handler.bind(actionOwner, scope.params);
                }
            }

            // now we add the actions onto the actionOwner DOM
            actions.push(actionObj);
            actionOwner.data('actions', actions);
        }

        return {
            registerAction: registerAction,
        };
    }]);
})();

/**
     * @ngdoc directive
     * @name ep.action.set.directive:epDynamicActionSet
     * @restrict E
     *
     * @description
     * Represents the dynamic action menu item
     * - ep-dynamic-action-set-provider: the object that contains an instance of the dynamic action set
     * - ep-dynamic-action-set-params: the parameters passed into the dynamic action set
     * - ep-dynamic-action-set-bind-to: optional
     * - ep-dynamic-action-set-insert-to: optional
     * - ep-dynamic-action-set-injections: optional
     *
     * @example
     * <div ep-dynamic-action-set ep-dynamic-action-set-provider="actionSetProvider"
     *      ep-dynamic-action-set-params="['option', model]">
     * </div>
     */
(function() {
    'use strict';

    angular.module('ep.action.set').directive('epDynamicActionSet', [
    '$compile',
    '$rootScope',
    function($compile, $scope) {
        return {
            restrict: 'EA',
            scope: {
                provider: '=epDynamicActionSetProvider',
                actionParams: '=epDynamicActionSetParams',
                //when using from $compile there might be cases when we have element we want actions bind to
                //in this case pass it using bindTo
                //defaut behavior is assume that directive is used as attribute and bind actions to container element
                bindTo: '=epDynamicActionSetBindTo',
                insertTo: '=epDynamicActionSetInsrtTo',
                injections: '=epDynamicActionSetInjections'
            },
            link: function(scope, iElement) {
                var isAttribute = typeof scope.bindTo === 'undefined' || scope.bindTo === null;

                if (!scope.provider) {
                    return;
                }
                scope.provider.actionSet.apply(isAttribute, iElement, $scope, scope, $compile);
                scope.$destroy();
                scope = null;
            }
        };
    }]);
})();

/**
 * @ngdoc service
 * @name ep.action.set.factory:dynamicActionSetFactory
 * @description
 * Provides Epicor Mobile Framework dynamic action set factory
 *       this factory will provide getDynamicActionSet() fuction to serve
 *       up new DynamicActionSet object
 *
 * @example
 *      var actionSet = dynamicActionSetFactory.getDynamicActionSet('myActionSet'});
 *
 */
(function() {
    'use strict';

    angular.module('ep.action.set').factory('dynamicActionSetFactory', [
    function() {
        /**
        * @ngdoc method
        * @name getDynamicActionSet
        * @methodOf ep.action.set.factory:dynamicActionSetFactory
        * @public
        * @description
        * Registers the ActionSet collection of Action items
        *
        * @param {string} name The name of the action set
        * @param {function} onCreateActionSet The function that will be invoked when the action set is creaed
        */
        function getDynamicActionSet(name, onCreateActionSet) {
            return new DynamicActionSet(name, onCreateActionSet);
        }
        return {
            getDynamicActionSet: getDynamicActionSet
        };

        /**
        * @ngdoc object
        * @name ep.action.set.object:DynamicActionSet
        * @private
        * @description
        * Represents the instance of the DynamicActionSet collection of Action items
        *
        * @param {string} name The name of the action set
        * @param {function} onCreateActionSet The function that will be invoked when the action set is creaed
        */
        function DynamicActionSet(name, onCreateActionSet) {
            this.name = name;
            this.onCreateActionSet = onCreateActionSet;
            var actions = [];
            var actionSetScope;
            var compile;
            var args;
            var actionSetElement;

            /**
            * @ngdoc method
            * @name addAction
            * @methodOf ep.action.set.object:DynamicActionSet
            * @public
            * @description
            * Adds a new item to the ActionSet collection of Action items
            *
            * @param {string} title The title of the action item
            * @param {function} handler The function that will be invoked when the action is clicked
            * @param {object} props The properties for the action item
            */
            function addAction(title, handler, props) {
                var actionObj = new DynamicAction(title, handler, props);
                validate(actionObj);
                actions.push(actionObj);
            }
            function validate(actionObj) {
                if (!(actionObj.title &&
                    actionObj.title.length > 0)) {
                    throw new Error('Title for the action is required!');
                }
            }

            /**
            * @ngdoc method
            * @name removeAction
            * @methodOf ep.action.set.object:DynamicActionSet
            * @public
            * @description
            * Remove an item from the ActionSet collection of Action items
            *
            * @param {string} title The title of the action item
            */
            function removeAction(title, makeLast) {
                var found = false;
                for (var i = 0; i < actions.length; i++) {
                    if (actions[i].title === title) {
                        actions.splice(i, makeLast ? actions.length - i : 1);
                        found = true;
                        break;
                    }
                }
                if (found) {
                    if (actionSetElement) {
                        actionSetElement.remove();
                    }
                    /*jshint validthis: true */
                    this.apply.apply(this, args);
                }
            }

            /**
            * @ngdoc method
            * @name appendAction
            * @methodOf ep.action.set.object:DynamicActionSet
            * @public
            * @description
            * Adds a new item to the ActionSet collection of Action items
            *
            * @param {string} title The title of the action item
            * @param {function} handler The function that will be invoked when the action is clicked
            * @param {object} props The properties for the action item
            * @param {string} icon The icon for the action item
            */
            function appendAction(title, handler, props, icon) {
                for (var i = 0; i < actions.length; i++) {
                    if (actions[i].title === title) {
                        return;
                    }
                }

                var actionObj = new DynamicAction(title, handler, props, icon);
                validate(actionObj);
                actions.push(actionObj);
                if (actionSetElement) {
                    actionSetElement.remove();
                }
                /*jshint validthis: true */
                this.apply.apply(this, args);
            }

            function apply(ignoreApplyCheck, element, $rootScope, scope, $compile) {
                var html = [];
                args = arguments;
                compile = $compile;
                //applied = false,
                if (!ignoreApplyCheck || angular.isFunction(onCreateActionSet) &&
                    !onCreateActionSet(element, scope)) {
                    return;
                }
                html.push('<ep-action-set position="right-bottom" bind-to="bindTo" insert-to="insertTo">');
                actionSetScope = $rootScope.$new(true);
                for (var i = 0; i < actions.length; i++) {
                    html.push(actions[i].build(i, actionSetScope));
                }
                html.push('</ep-action-set>');

                actionSetScope.bindTo = scope.bindTo || element;
                actionSetScope.params = scope.actionParams;
                actionSetScope.bindTo.data('actions', null);
                actionSetElement = $compile(html.join(''))(actionSetScope);
            }

            return {
                addAction: addAction,
                apply: apply,
                removeAction: removeAction,
                appendAction: appendAction
            };
        }
        /**
        * @ngdoc object
        * @name ep.action.set.object:DynamicAction
        * @private
        * @description
        * Represents the instance of the DynamicAction item
        *
        * @param {string} title The title of the action item
        * @param {function} handler The function that will be invoked when the action is clicked
        * @param {object} props The properties for the action item
        * @param {string} icon The icon for the action item
        */
        function DynamicAction(title, handler, props, icon) {
            this.title = title;
            this.handler = handler;
            var propHtml = [];
            var name;
            if (props) {
                for (name in props) {
                    if (props.hasOwnProperty(name)) {
                        propHtml.push(name + '="' + props[name] + '"');
                    }
                }
            }
            this.apply = function(element, $rootScope, scope, $compile) {
                var innerScope = $rootScope.$new(true);
                var template = '<ep-action-item title="' + this.title +
                    'icon="' + icon + '" ' +
                  '" handler="handler" params="params" bind-to="bindTo" insert-to="insertTo" ' +
                  propHtml.join(' ') + '></ep-action-item>';
                innerScope.handler = typeof this.handler === 'function' ? this.handler : scope[this.handler];
                innerScope.params = scope.actionParams;
                innerScope.bindTo = scope.bindTo || element;
                innerScope.insertTo = scope.provider.insertTo;
                innerScope.injections = scope.injections;
                $compile(template)(innerScope);
            };
            this.build = function(index, scope) {
                scope['fnc' + index] = this.handler;
                return '<ep-action-item title="' + this.title +
                    '" icon="' + icon + '" ' +
                  '" handler="fnc' + index + '" params="params" bind-to="bindTo" insert-to="insertTo" ' +
                    propHtml.join(' ') + '></ep-action-item>';
            };
        }
    }]);
})();

/**
 * @ngdoc controller
 * @name ep.dropdown.controller:epDropdownBtnCtrl
 * @description
 * Represents the epDropdown controller for the
 * ep.dropdown module, or for specific ep-dropdownbtn directive
 *
 * @example
 *
 */
(function() {
    'use strict';

    epDropdownBtnCtrl.$inject = ['$scope', '$timeout'];
    angular.module('ep.dropdown')
        .controller('epDropdownBtnCtrl', epDropdownBtnCtrl);

    /*@ngInject*/
    function epDropdownBtnCtrl($scope, $timeout) {
        $scope.menuClick = function(item, evt) {
            if (evt.target.checked === undefined) {
                item.checked = !item.checked;
            } else {
                $timeout(function() {
                    $(evt.target).prop('checked', item.checked);
                });
            }
            if (item.action) {
                item.action(item);
            }
            evt.preventDefault();
            evt.stopPropagation();
        };
    }
}());

/**
* @ngdoc directive
* @name ep.dropdown.directive:epDropdownBtn
* @restrict E
*
* @description
* Represents the dropdown button directive
*
* @example
*/
(function() {
    'use strict';

    angular.module('ep.dropdown').
    directive('epDropdownBtn', epDropdownBtn);

    /*@ngInject*/
    function epDropdownBtn() {
        return {
            restrict: 'E',
            controller: 'epDropdownBtnCtrl',
            scope: {
                menu: '=',
                icon: '='
            },
            templateUrl: 'src/components/ep.dropdown/ep-dropdown-btn/ep-dropdown-btn.html',
        };
    }
}());

/**
 * @ngdoc directive
 * @name ep.list:epList
 * @restrict EA
 *
 * @description
 * Represents list with grouping
 * - data: list array
 * - handler: handler function when clicks on a list item.
 * - mainTitle: main title to display on list
 * - subTitle: sub title to display on list just below main title.
 * - additionalTitle: additional title to display on list just below sub title.
 * - id: value to be displayed on right side of the list.
 * - groupBy: groupBy field name by which the list has to be grouped.
 * - groupByType: 'sdate' - string date format like '1910-01-01T00:00:00' (otherwise string)
 * - subHeader: (true/false) shows sub header with filter/sort/add buttons just below the search component.
 * - arrow: (true/false) whether to show arrow on right side of list or not.
 * - statuses: additional list fields that needs to be displayed on right side of the list.
 * - filter: handler function on click of filter button in sub header section of the list
 * - sort: handler function on click of sort button in sub header section of the list.
 * - add: handler function on click of add button in sub header section of the list.
 * - useVirtualScrolling: (true/false) uses 
 * - showDirectory
 * - vsRenderBufferSize
 * - vsRowLineCount
 * - vsLatch
 * @example
 *  <pre>
 *      <ep-list data="['Bname', 'Cname', 'Aname'"></ep-list>
 *  </pre>
 */
(function() {
    'use strict';

    epListDirective.$inject = ['$filter', '$timeout', 'epListService'];
    angular.module('ep.list').directive('epList', epListDirective);

    function epListDirective($filter, $timeout, epListService) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                data: '=',
                handler: '&',
                mainTitle: '@',
                id: '@',
                filter: '&',
                sort: '&',
                add: '&',
                init: '=',
                selectMarkField: '@',
                selectMarkFieldValue: '=',

                subTitle: '=',
                formatSubtitle: '=',

                additionalTitle: '=',
                formatAdditionalTitle: '=',

                statuses: '=',
                formatStatusPeriod: '=',
                getStatusClass: '=',
                formatStatusText: '=',
                formatStatusSource: '=',
                
                groupBy: '@',
                groupByType: '@',
                subHeader: '@',
                showArrow: '=',
                
                icon: '@',
                showInRed: '@',
                hideAdd: '@',
                sortBy: '@',
                
                useVirtualScrolling: '=',
                
                itemContentTemplate: '@',
                showDirectory: '=',
                vsRenderBufferSize: '@',
                vsRowLineCount: '@',
                vsLatch: '@',
                options: '='
            },
            templateUrl: 'src/components/ep.list/ep-list.html',
            link: function(scope) {
                scope.localId = _.uniqueId('epList');
                scope.items = { count: 0 };
                scope.originalData = scope.data;
                
                scope.vsRenderBufferSize = (scope.vsRenderBufferSize && JSON.parse(scope.vsRenderBufferSize)) || 50;
                scope.vsRowLineCount = (scope.vsRowLineCount && JSON.parse(scope.vsRowLineCount)) || 2;
                scope.vsItemSize = scope.vsRowLineCount * 30;
                scope.vsLatch = angular.isString(scope.vsLatch) ? (scope.vsLatch.toLowerCase() === 'true') : false;
                scope.arrow = (scope.showArrow !== false);
                scope.searchType = 'text';
                scope.searchPrompt = '';
                scope.itemContentTemplate = scope.itemContentTemplate || 'defaultItemContentTemplate';
                scope.filterState = {};
                
                scope.initData = function() {

                    scope.listData = $filter('orderBy')(scope.data, scope.groupBy);
                    if (scope.sortBy && scope.sortBy !== '') {
                        scope.listData = _.sortBy(scope.listData, scope.sortBy).reverse();
                    }

                    if (scope.groupBy && scope.groupBy !== '') {
                        if (scope.groupByType && scope.groupByType === 'sdate') {
                            scope.searchPrompt = 'Search by year or month-year...';
                            scope.searchType = 'sdate';
                            scope.listData = _.sortBy(scope.listData, function(d) {
                                return d[scope.groupBy] || '';
                            }).reverse();
                            scope.showDirectory = false;
                            scope.directory = epListService.getDirectoryByDate(scope.listData, scope.groupBy);
                        } else {
                            scope.directory = epListService.getDirectory(scope.listData, scope.groupBy);
                        }
                    }

                    scope.origListData = angular.extend([], scope.listData);
                    scope.items.count = scope.data.length;
                    if(scope.init){
                        scope.init(scope);
                    }
                }
                //scope.initData();

                scope.filterByName = function(obj) {
                    if (scope.searchFilter) {
                        return (obj[scope.groupBy].toLowerCase() || '').indexOf(scope.searchFilter.toLowerCase()) === 0;
                    }
                    return true;
                }

                function applyTextSearchFilter(searchValue) {
                    if (searchValue) {
                        var firstLetter = epListService.getDirectoryKey(searchValue);
                        if (firstLetter !== scope.prevFirstLetter) {
                            scope.selectedDirectoryEntry = _.find(scope.directory, function(m) {
                                return m.letter === firstLetter && m.disabled === false;
                            });
                            if (!scope.selectedDirectoryEntry) {
                                //no such first letter in directory - default to 'all'
                                scope.selectedDirectoryEntry = scope.directory['__all__'];
                                scope.filteredData = [];
                            } else {
                                scope.filteredData = scope.origListData.slice(
                                    scope.selectedDirectoryEntry.index,
                                    scope.selectedDirectoryEntry.nextIndex);
                            }
                            scope.filtered = true;
                            scope.searchFilter = searchValue;
                            $timeout(function() {
                                scope.$broadcast('vsRepeatTrigger');
                            });
                        } else {
                            $timeout(function() {
                                scope.searchFilter = searchValue;
                            });
                        }
                        scope.prevFirstLetter = firstLetter;
                    } else {
                        //if search is blank - we are not in filtering mode
                        scope.filtered = false;
                        scope.searchFilter = '';
                        scope.prevFirstLetter = '';
                        $timeout(function() {
                            scope.$broadcast('vsRepeatTrigger');
                        });
                    }
                }

                function applyStrDateSearchFilter(searchValue) {
                    var filtered = false;
                    if (searchValue) {
                        var year = NaN;
                        if (searchValue.length === 4) {
                            //search by year
                            year = parseInt(searchValue);
                        }
                        if (!isNaN(year)) {
                            //search by year - find all groups in this year
                            var groups = _.filter(scope.directory, function(m) {
                                return m.year === searchValue;
                            });
                            if (groups.length) {
                                var filteredData = [];
                                angular.forEach(groups, function(group) {
                                    filteredData = filteredData.concat(scope.origListData.slice(group.index, group.nextIndex));
                                });
                                filtered = true;
                                scope.filteredData = filteredData;
                                scope.filtered = true;
                                $timeout(function() {
                                    scope.$broadcast('vsRepeatTrigger');
                                });
                            }
                        } else {
                            var directoryEntry = _.find(scope.directory, function(m) {
                                return m.groupDisplay.indexOf(searchValue) === 0;
                            });
                            if (directoryEntry) {
                                scope.selectedDirectoryEntry = directoryEntry;
                                filtered = true;
                                scope.filteredData = scope.origListData.slice(directoryEntry.index,
                                    directoryEntry.nextIndex);
                                scope.filtered = true;
                                $timeout(function() {
                                    scope.$broadcast('vsRepeatTrigger');
                                });
                            }
                        }
                    }
                    if (!filtered)
                    {
                        //if search is blank - we are not in filtering mode
                        scope.filtered = false;
                        scope.searchFilter = '';
                        $timeout(function() {
                            scope.$broadcast('vsRepeatTrigger');
                        });
                    }
                }

                function applySearchFilter(searchValue) {
                    if (scope.searchType === 'sdate') {
                        applyStrDateSearchFilter(searchValue);
                    } else {
                        applyTextSearchFilter(searchValue);
                    }
                }

                var throttleSearch = _.throttle(applySearchFilter, 200);
                scope.$watch('listSearch', function(newValue, oldValue) {
                    if (newValue !== undefined && newValue !== oldValue && !scope.goingToDirectory) {
                        throttleSearch(newValue);
                    }
                    scope.goingToDirectory = false;
                });
                
                scope.goToDirectory = function(directoryEntry) {
                    if (scope.listSearch) {
                        //we are going to directory, clear the search but avoid watch kicking in
                        scope.goingToDirectory = true;
                        scope.listSearch = '';
                    }
                    scope.filteredData = scope.origListData.slice(directoryEntry.index, directoryEntry.nextIndex);
                    scope.selectedDirectoryEntry = directoryEntry;
                    scope.filtered = true;
                    scope.searchFilter = '';
                    scope.prevFirstLetter = directoryEntry.letter;

                    $timeout(function() {
                        scope.$broadcast('vsRepeatTrigger');
                    });
                };

                scope.$watch('data', function(newValue) {
                    if (newValue) {
                        scope.initData();
                    }
                });

                scope.$watch('groupBy', function(newValue, oldValue) {
                    if (newValue && newValue !== oldValue) {
                        scope.initData();
                    }
                });

                scope.$watch('sortBy', function(newValue, oldValue) {
                    if (newValue && newValue !== oldValue) {
                        scope.initData();
                    }
                });

                scope.$on('$destroy', function() {
                    if (scope.shellSizeChangeEvent) {
                        scope.shellSizeChangeEvent();
                    }
                });

            }
        };
    }
})();

/**
 * @ngdoc service
 * @name ep.list:epListService
 * @description
 * Provides methods for dislaying list with groups.
 *
 * @example
 *
 */
(function() {
    'use strict';

    epListService.$inject = ['$filter', '$timeout'];
    angular.module('ep.list').factory('epListService', epListService);

    /*@ngInject*/
    function epListService($filter, $timeout) {
        var alphabet = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '@'];

        /**
         * @ngdoc method
         * @name getGroupedList
         * @methodOf ep.list:epListService
         * @public
         * @param {Array} listData - list of items to display
         * @param {String} groupBy - field name by which the list has to be grouped
         * @description
         * To group the list based on groupBy Value
         */
        function getGroupedList(listData, groupBy) {
            return _.groupBy(listData, function(row){ 
                var datum = row[0];
                return (!isNaN(datum)) ? '#' : datum.toUpperCase();
            });
        }
        
        /**
         * @ngdoc method
         * @name getDirectoryKey
         * @methodOf ep.list:epListService
         * @public
         * @param {String} value - value to use when getting the directory key
         * @description
         * Returns the directory key for a given string value.
         */
        function getDirectoryKey(value){
            var key = value ? value.substr(0, 1).toUpperCase() : '';
            if(key < 'A') { key = alphabet[0]; }
            if(key > 'Z') { key = alphabet[alphabet.length -1]; }
            return key;
        }

        /**
         * @ngdoc method
         * @name getDirectory
         * @methodOf ep.list:epListService
         * @public
         * @param {Array} listData - list of items to display
         * @param {String} groupBy - field name by which the list has to be grouped
         * @description
         * To group the list based on groupBy Value
         */
        function getDirectory(listData, groupBy){

            // A comparison function to tell us if we're still iterating through the same section of the data
            var compare = function(directoryLetter, itemFirstLetter){
                if(directoryLetter === '#'){
                    return itemFirstLetter < 'A';
                }
                if (directoryLetter === '@'){
                    return true;
                } 
                return directoryLetter === itemFirstLetter;
            }


            var allKey = '__all__';
            //keys - group keys that have been processed

            var keys = {};
            var groupKey;
            var groupDisplay;
            //directory that is returned
            var dir = {};

            var previousItem;
            var totalItems = listData.length;

            //create an entry for the 'all' records '*'
            dir[allKey] = {
                sort: 0,
                isAll: true,
                letter: '*',
                dirKey: allKey,
                index: 0,
                prevIndex: 0,
                nextIndex: totalItems,
                disabled: false
            };
            
            //create entry for each alphabet letter (disabled), we will enable when we find data
            alphabet.forEach(function(letter, idx) {
                dir[letter] = {
                    sort: idx + 1,
                    letter: letter,
                    groupDisplay: letter,
                    index: 0,
                    prevIndex: 0,
                    disabled: true
                };
            });

            var previousItem;
            var currentLetter = '';
            var previousLetter = '';

            for (var itemIndex = 0; itemIndex < totalItems; itemIndex++) {
                var data = listData[itemIndex];
                var groupValue = data[groupBy] || '';
                currentLetter = getDirectoryKey(groupValue);
                if (!compare(previousLetter, currentLetter)) {
                    //we come here whenever the data group value goes to the next letter
                    previousLetter = currentLetter;
                    var dirEntry = dir[currentLetter];
                    if (previousItem) {
                        previousItem.nextIndex = itemIndex;
                    }
                    dirEntry.index = itemIndex;
                    dirEntry.dirKey = groupValue;
                    dirEntry.prevIndex = previousItem ? previousItem.index : 0;
                    dirEntry.nextIndex = totalItems;
                    dirEntry.data = data;
                    dirEntry.disabled = false;
                    dir[groupValue] = previousItem = dirEntry;
                    delete dir[currentLetter];
                }
            };
            return dir;
        }

        function getDirectoryByDate(listData, groupBy) {
            //keys - group keys that have been processed
            var keys = {};
            var groupKey;
            var groupDisplay;
            //directory that is returned
            var dir = {};
            var dirKey;
            var previousItem;

            var totalItems = listData.length;

            for (var i = 0; i < totalItems; i++) {
                dirKey = listData[i][groupBy];
                groupKey = (dirKey || '').substr(0, 7);
                groupDisplay = groupKey;
                if (groupKey.length === 0) {
                    groupKey = '@';
                }
                if (!keys[groupKey]) {
                    keys[groupKey] = true;
                    var prevIndex = previousItem ? previousItem.index : 0;
                    if (previousItem) {
                        previousItem.nextIndex = i;
                    }
                    var year = '';
                    var month = '';
                    if (groupKey === '@') {
                        groupDisplay = 'No Date';
                        year = '0000';
                        month = '00';
                    } else {
                        var fetchDate = groupKey.split('-');
                        groupDisplay = fetchDate[1] + '-' + fetchDate[0];
                        year = fetchDate[0];
                        month = fetchDate[1];
                    }
                    var curItem = {
                        letter: groupKey, groupDisplay: groupDisplay, dirKey: dirKey,
                        year: year, month: month,
                        index: i, prevIndex: prevIndex, nextIndex: totalItems,
                        previous: previousItem, next: undefined, data: listData[i]
                    };
                    dir[dirKey] = previousItem = curItem;
                    if (previousItem) {
                        previousItem.next = curItem;
                    }
                }
            }
            return dir;
        }

        return {
            getGroupedList: getGroupedList,
            getDirectory: getDirectory,
            getDirectoryKey: getDirectoryKey,
            getDirectoryByDate: getDirectoryByDate
        };
    }
})();

(function() {
'use strict';

/**
 * @ngdoc controller
 * @name ep.menu.builder.controller:epContextMenuCtrl
 * @description
 * Represents the epContextMenu controller for the
 * ep.menu.builder module, or for specific ep-context-menu directive
 *
 *
 */
    epContextMenuCtrl.$inject = ['$scope'];
    angular.module('ep.menu.builder')
        .controller('epContextMenuCtrl', epContextMenuCtrl);

    /*@ngInject*/
    function epContextMenuCtrl($scope) {
        /*jshint validthis:true */
        var vm = this;
        vm.onDynamicMenuCall = onDynamicMenuCall;

        /**
         * @ngdoc method
         * @name myFunction
         * @methodOf ep.menu.builder.controller:epContextMenuCtrl
         * @private
         * @description
         * Handles the broadcast of DynamicMenuCall event
         */
        function onDynamicMenuCall(event) {
            if (angular.isUndefined(vm.epContextMenuBuilder)) {
                return;
            }
            $scope.$root.$broadcast('dynamicMenuCall', {
                event: event,
                builder: vm.epContextMenuBuilder,
                context: vm.epMenuOptionContext,
            });
            event.preventDefault();
            event.stopPropagation();
        }
    }
}());

(function() {
'use strict';
/**
* @ngdoc directive
* @name ep.menu.builder.directive:epContextMenu
* @restrict E
*
* @description
* Represents the ep.menu.builder directive
*
* @example <ep-context-menu
            ep-context-menu-builder="myBuilder"
            ep-menu-option-context="myCurrentNode"
            ep-context-menu-icon="fa fa-meh-o"
            ep-context-menu-position="right-center">
            </ep-context-menu>
*/
angular.module('ep.menu.builder').
    directive('epContextMenu', epContextMenuDirective);

    /*@ngInject*/
    function epContextMenuDirective() {
        return {
            restrict: 'EA',
            controller: 'epContextMenuCtrl',
            controllerAs:'contextMenuCtrl',
            templateUrl: 'src/components/ep.menu.builder/context.menu/ep-context-menu.html',
            scope: {
            },
            bindToController: {
                epContextMenuBuilder: '=',
                epMenuOptionContext: '=',
                epContextMenuIcon: '@',
                epContextMenuPosition: '@'
            },
            link: function(scope, el, attr) {
                //Context menu icon decided here
                var iconClass = angular.isUndefined(attr.epContextMenuIcon) ?
                                    'fa fa-ellipsis-v' : attr.epContextMenuIcon;
                angular.element(el[0].querySelector('.ep-context-menu')).addClass(iconClass);

                //Context menu position decided here
                var positionClass = 'ep-actionset-right-down';
                if (attr.epContextMenuPosition) {
                    switch (attr.epContextMenuPosition) {
                        case 'absolute-right-bottom':
                            positionClass = 'ep-actionset-right-bottom';
                            break;
                        case 'right-bottom':
                            positionClass = 'ep-actionset-right-down';
                            break;
                        case 'right-center':
                            positionClass = 'ep-actionset-right-center';
                            break;
                    }
                }
                angular.element(el[0].querySelector('.ep-actionset')).addClass(positionClass);

                //Available position attribute values :
                // 1. ep-actionset-right-bottom
                // 2. ep-actionset-right-down
                // 3. ep-actionset-right-center
            }
        };
    }
}());

(function() {
'use strict';

/**
 * @ngdoc controller
 * @name ep.menu.builder.controller:epDynamicMenuCtrl
 * @description
 * Represents the epDynamicMenu controller for the
 * ep.menu.builder module, or for specific ep-dynamic-menu directive
 *
 * @example
 *
 */
    epDynamicMenuCtrl.$inject = ['$scope', '$document'];
    angular.module('ep.menu.builder')
        .controller('epDynamicMenuCtrl', epDynamicMenuCtrl);

    /*@ngInject*/
    function epDynamicMenuCtrl($scope, $document) {
        /*jshint validthis:true */
        var vm = this;
        vm.closeMenu = closeMenu;
        vm.invokeAction = invokeAction;

        // closes the Action menu popup
        function closeMenu() {
            vm.menuItems = null;
            if (!$scope.$root.$$phase) {
                $scope.$apply();
            }
            $document.off('click.actionMenu');
        }

        // invoke the menuItem's action handler function
        function invokeAction(event, menuItem, context) {
            if (angular.isFunction(menuItem.action)) {
                menuItem.action(context);
            }
            closeMenu();
            event.stopPropagation();
            event.preventDefault();
        }

        $scope.$on('dynamicMenuCall', function(event, args) {
            if (angular.isUndefined(args.builder)) { return; }
            if (angular.isFunction(args.builder.beforeShowMenu)) {
                args.builder.beforeShowMenu(args.context);
            }
            // use the menuBuilder to serve up the collection of menu items
            vm.menuItems = angular.isFunction(args.builder.menuItems) ? args.builder.menuItems() : null;
            vm.context = args.context || null;

            // if position is fixed we are running on small width devices. Just skip this statement
            // if not, set css position of actionMenu
            if (vm.element.css('position') !== 'fixed') {
                vm.element.css({ left: args.event.clientX + 'px', top: args.event.clientY + 'px' });
            }
            $document.on('click.actionMenu', function() {
                closeMenu();
            });
            //added for passing unit tests
            if (!$scope.$root.$$phase) {
                $scope.$apply();
            }
        });
    }
}());

(function() {
'use strict';
/**
* @ngdoc directive
* @name ep.menu.builder.directive:epDynamicMenu
* @restrict E
*
* @description
* Represents the ep.menu.builder directive
*
* @example <ep-dynamic-menu></ep-dynamic-menu>
*/
angular.module('ep.menu.builder').
    directive('epDynamicMenu', epDynamicMenuDirective);

    /*@ngInject*/
    function epDynamicMenuDirective() {
        return {
            restrict: 'E',
            replace: true,
            controller: 'epDynamicMenuCtrl',
            controllerAs: 'dynamicMenuCtrl',
            templateUrl: 'src/components/ep.menu.builder/dynamic.menu/ep-dynamic-menu.html',
            link: function(scope, el) {
                // at link, we set the current element onto the controller vm
                // we use this on full screen mode to set the position of dynamic menu based on the position of parent
                scope.dynamicMenuCtrl.element = el;
            }
        };
    }
}());

(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name ep.menu.builder.factory:epMenuBuilderFactory
     * @description
     * Factory service for the ep.menu.builder module
     * This factory will serve up an instance of the menuBuilder
     *
     * @example
     *
     */
    epMenuBuilderFactory.$inject = ['$filter'];
    angular.module('ep.menu.builder').
        factory('epMenuBuilderFactory', epMenuBuilderFactory);

    /*@ngInject*/
    function epMenuBuilderFactory($filter) {
        /**
         * @ngdoc method
         * @name getMenuBuilder
         * @methodOf ep.menu.builder.factory:epMenuBuilderFactory
         * @public
         * @description
         * serves up a new instance of the menuBuilder
         */
        function getMenuBuilder() {
            var items = [];

            /**
             * @ngdoc method
             * @name setItem
             * @methodOf ep.menu.builder.object:menuBuilder
             * @public
             * @description
             * sets menu item onto instance of the menuBuilder
             */
            function setItem(menuItem) {
                var foundItem = $filter('filter')(items, { caption: menuItem.caption }, true)[0];
                var idx = items.indexOf(foundItem);
                // if we add an untyped item assume it's an action
                if (angular.isUndefined(menuItem.type) && angular.isFunction(menuItem.action)) {
                    menuItem.type = 'action';
                }
                if (idx === -1) {
                    items.push(menuItem);
                } else {
                    items[idx] = angular.extend(items[idx], menuItem);
                }
            }

            /**
             * @ngdoc method
             * @name removeItem
             * @methodOf ep.menu.builder.object:menuBuilder
             * @public
             * @description
             * removes menu item from instance of the menuBuilder
             */
            function removeItem(menuItem) {
                var foundItem = $filter('filter')(items, { caption: menuItem.caption }, true)[0];
                var idx = items.indexOf(foundItem);
                if (idx !== -1) {
                    var spliceAtIndex = idx;
                    var itemsToRemove = 1;

                    if (items[idx - 1] && items[idx - 1].type === 'separator') {
                        spliceAtIndex = idx - 1;
                        itemsToRemove = 2;
                    } else if (items[idx + 1] && items[idx + 1].type === 'separator') {
                        spliceAtIndex = idx;
                        itemsToRemove = 2;
                    }
                    items.splice(spliceAtIndex, itemsToRemove);
                }
            }

            /**
             * @ngdoc method
             * @name getItems
             * @methodOf ep.menu.builder.object:menuBuilder
             * @public
             * @description
             * returns collection of menu item from instance of the menuBuilder
             */
            function getItems() {
                return angular.copy(items);
            }

            /**
             * @ngdoc method
             * @name addSeparator
             * @methodOf ep.menu.builder.object:menuBuilder
             * @public
             * @description
             * adds the separator between menu items where needed
             */
            function addSeparator() {
                items.push({ type: 'separator' });
            }

            /**
             * @ngdoc service
             * @name ep.menu.builder.object:menuBuilder
             * @description
             * menuBuilder instance for the ep.menu.builder module
             */
            return {
                setMenuItem: setItem,
                removeMenuItem: removeItem,
                menuItems: getItems,
                addSeparator: addSeparator
            };
        }

        return {
            getMenuBuilder: getMenuBuilder
        };
    }
}());

//# sourceMappingURL=emf.menu.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/ep.multi.level.menu/ep-shell-menu/ep-shell-menu.html',
    "<div ng-controller=epShellMenuCtrl><ep-multi-level-menu ng-if=\"menuOptions.menuType !== 'accordion'\" menu=menuOptions.menu menu-id=menuId search-disabled=menuOptions.searchDisabled sort-disabled=menuOptions.sortDisabled icon-disabled=menuOptions.iconDisabled init-favorites=menuOptions.initFavorites on-top-menu-click=onTopMenuClick on-menu-init=menuOptions.onMenuInit(factory)></ep-multi-level-menu><ep-accordion-menu ng-if=\"menuOptions.menuType === 'accordion'\" menu=menuOptions.menu menu-id=menuId main-header=\"menuOptions.title || 'Menu'\" favorites-header=\"menuOptions.favoritesHeader || 'Favorites'\" search-results-header=\"menuOptions.searchResultsHeader || 'Search Results'\" search-disabled=menuOptions.searchDisabled sort-disabled=menuOptions.sortDisabled icon-disabled=menuOptions.iconDisabled init-favorites=menuOptions.initFavorites on-top-menu-click=onTopMenuClick on-expand=menuOptions.onExpand commit-menu-state=commitMenuState on-menu-init=menuOptions.onMenuInit(factory)></ep-accordion-menu></div>"
  );


  $templateCache.put('src/components/ep.multi.level.menu/multi-level-menu.html',
    "<div class=ep-mlm-container ng-class=\"{'ep-left-to-right': !isRightToLeft, 'ep-right-to-left': isRightToLeft}\"><form class=ep-mlm-search ng-hide=searchDisabled><input class=\"form-control ep-mlm-search-input\" placeholder=Search ng-model=state.searchTerm ng-change=search() ng-focus=\"isRightToLeft = false\"> <span class=ep-mlm-search-cancel ng-show=state.searchTerm><i class=\"fa fa-times\" ng-click=\"state.searchTerm=''\"></i></span></form><div ng-if=data.next class=\"ep-mlm-content ep-fadein-animation\"><div ng-hide=state.searchTerm class=ep-mlm-header ng-class=\"{ 'pointer': data.next._parent._id !== 'topmenu'}\" ng-click=\"navigate(data.next._parent, true, $event)\"><span ng-if=\"data.next._parent._id !== 'topmenu'\" class=\"ep-mlm-back-button pull-left fa fa-lg fa-caret-left\"></span> <span>{{data.next.caption}}</span></div><div ng-show=state.searchTerm class=ep-mlm-header><span>Search Results</span></div><ul><li ng-repeat=\"mi in currentItems | orderBy:orderByMenu\" class=\"ep-mlm-item clearfix ep-repeat-animation\"><div ng-if=\"mi.separator && !mi.separator.isBottom\" class=\"ep-mlm-separator ep-mlm-separator-top {{mi.separator.class}}\"><i ng-if=mi.separator.icon class=\"ep-mlm-separator-icon fa fa-lg pull-left {{mi.separator.icon}}\"></i><div ng-if=mi.separator.text class=ep-mlm-separator-text>{{mi.separator.text}}</div></div><i ng-if=\"mi.icon && !iconDisabled\" class=\"ep-mlm-icon fa fa-lg pull-left {{mi.icon}}\"></i><div class=\"pull-left clearfix ep-mlm-item-div\" ng-class=\"{ 'ep-mlm-item-div-icon': mi.icon }\" ng-click=\"navigate(mi, false, $event)\"><div class=\"ep-mlm-item-text pull-left {{mi.captionClass}}\" title={{mi.caption}}>{{mi.caption}}</div></div><i ng-if=\"(mi._type === 'item' && mi.hideFavorite !== true)\" class=\"ep-mlm-favorite fa fa-lg pull-right\" ng-click=\"toggleFavorite(mi, $event)\" ng-class=\"{ 'fa-star-o': !mi.favorite, 'fa-star text-warning': mi.favorite}\"></i> <i ng-if=\"mi._type === 'menu'\" class=\"ep-mlm-submenu fa fa-lg fa-caret-right pull-right\" ng-click=\"navigate(mi, false, $event)\"></i><div ng-if=\"mi.separator && mi.separator.isBottom\"><br><div class=\"ep-mlm-separator ep-mlm-separator-top {{mi.separator.class}}\"><i ng-if=mi.separator.icon class=\"ep-mlm-separator-icon fa fa-lg pull-left {{mi.separator.icon}}\"></i><div ng-if=mi.separator.text class=ep-mlm-separator-text>{{mi.separator.text}}</div></div></div></li></ul><uib-alert class=\"ep-mlm-alert ep-fadein-animation\" ng-show=\"state.searchTerm && (!currentItems || currentItems.length === 0)\" type=warning>The term \"{{state.searchTerm}}\" did not match any menu items.</uib-alert></div></div>"
  );


  $templateCache.put('src/components/ep.accordion.menu/ep-accordion-menu-item_template.html',
    "<div class=\"clearfix list-group-item\" ng-class=\"{ 'ep-accordion-expanded': item.isExpanded && item.menuitems.length, 'ep-accordion-expanded-odd' : item._depth%2 == 1, 'ep-accordion-expanded-even': item._depth%2 == 0}\"><div class=\"clearfix container-fluid\" id=mnu_{{item.id}} ng-keydown=\"($event.which === 13 && item.menuitems.length === 0)? navigate(item, false, $event) : onKeydown(item, $event)\" role=group tabindex=-1 ng-click=\"item.isExpanded = !item.isExpanded\"><div id=menuItem class=\"list-group-item row\" ng-class=\"{ 'ep-accordion-expanded': item.isExpanded && item.menuitems.length, 'ep-accordion-expanded-odd' : item._depth%2 == 1, 'ep-accordion-expanded-even': item._depth%2 == 0}\" ng-if=\"!(item.menuitems && item.menuitems.length)\" ng-click=\"navigate(item, false, $event)\" tabindex=-1><!-- Menu item caption/text --><span class=\"clearfix ep-vertical-align-center\"><span class=\"pull-left col-xs-10 {{item.captionClass}}\" title={{item.caption}} ng-bind=item.caption></span><!--Open in new window--> <i class=\"fa fa-lg fa-external-link pull-left\" ng-if=!isMobile ng-click=\"navigateExternal(item, $event)\"></i><!-- Favorite icon --><!-- Favorite icon --> <i ng-if=\"(item.hideFavorite !== true)\" class=\"fa fa-lg col-xs-2 pull-left\" ng-click=\"toggleFavorite(item, $event)\" ng-class=\"{ 'fa-star-o': !item.favorite, 'fa-star text-warning': item.favorite }\"></i></span></div><div class=\"ep-submenu-header list-group-item row\" ng-class=\"{ 'ep-accordion-expanded': item.isExpanded && item.menuitems.length, 'ep-accordion-expanded-odd' : item._depth%2 == 1, 'ep-accordion-expanded-even': item._depth%2 == 0}\" ng-if=item.menuitems.length tabindex=-1><!-- Menu item caption/text --><span class=\"clearfix ep-vertical-align-center\"><span class=\"pull-left col-xs-10 {{item.captionClass}}\" title={{item.caption}} ng-bind=item.caption></span><!-- Expand icon --> <i class=\"fa fa-lg col-xs-2\" ng-class=\"{ 'fa-caret-right': !item.isExpanded, 'fa-caret-down': item.isExpanded }\"></i></span></div></div><div class=col-xs-12 ng-click=\"navigate(item, false, $event)\" ng-if=\"item.description && (!item.menuitems.length || !item.isExpanded) && !hideDescription\"><div class=ep-accordion-menu-desc><sup class=text-info ng-bind=item.description></sup></div></div><!-- Sub-menu --><div class=list-group-submenu ng-class=\"{'collapsed': !item.isExpanded }\" id=mnu_children ng-if=\"item.isExpanded && item.menuitems.length\"><ep-accordion-menu-item ng-repeat=\"child in item.menuitems | orderBy:orderByMenu\" item=child hide-description=hideDescription commit-menu-state=commitMenuState navigate=navigate navigate-external=navigateExternal toggle-favorite=toggleFavorite></ep-accordion-menu-item></div></div>"
  );


  $templateCache.put('src/components/ep.accordion.menu/ep-accordion-menu_template.html',
    "<div id=MainMenu class=ep-accordion-menu><form class=ep-mlm-search ng-hide=searchDisabled><input type=search class=\"form-control ep-mlm-search-input\" placeholder=Search ng-model=state.searchTerm ng-change=search() ng-keydown=onKeydown($event) ng-focus=\"isRightToLeft = false\" tabindex=-1> <span class=ep-mlm-search-cancel ng-show=state.searchTerm><i class=\"fa fa-times\" ng-click=\"state.searchTerm=''\"></i></span></form><div ng-show=state.searchTerm><div class=\"bg-primary ep-menu-header\"><span ng-bind=searchResultsHeader></span></div><div class=\"list-group panel\"><ep-accordion-menu-item ng-repeat=\"item in currentItems | orderBy:orderByMenu\" id={{item.id}} hide-description=false item=item navigate=navigate navigate-external=navigateExternal toggle-favorite=toggleFavorite></ep-accordion-menu-item></div></div><div ng-show=!state.searchTerm><div class=\"bg-primary ep-menu-header\" ng-if=\"data.favorites && data.favorites.length\"><span ng-bind=favoritesHeader></span></div><div class=\"list-group panel\"><ep-accordion-menu-item ng-repeat=\"item in data.favorites | orderBy:orderByMenu\" id={{item.id}} hide-description=false item=item navigate=navigate navigate-external=navigateExternal toggle-favorite=toggleFavorite tabindex=-1></ep-accordion-menu-item></div><div class=\"bg-primary ep-menu-header\"><span ng-bind=mainHeader></span></div><div class=\"list-group panel\"><ep-accordion-menu-item ng-repeat=\"item in menu.menuitems | orderBy:orderByMenu\" id={{item.id}} hide-description=true commit-menu-state=commitMenuState item=item navigate=navigate navigate-external=navigateExternal toggle-favorite=toggleFavorite on-expand=onExpand tabindex=-1></ep-accordion-menu-item></div></div></div>"
  );


  $templateCache.put('src/components/ep.action.set/action-menu/action-menu.html',
    "<div id=ep-actions-menu-ctr ng-show=actionMenuCtrl.actions><ul class=\"dropdown-menu ep-actions-menu list-unstyled noselect\" role=menu><li ng-repeat=\"action in actionMenuCtrl.actions\" ng-if=\"!action.switch || action.switch(action.switchParams) == action.switchResult\" ng-switch=action.type ng-class=\"{'hidden': action.switch != null && action.switch == false}\"><a ng-switch-when=action class=ep-actions-menu-item ng-click=\"actionMenuCtrl.invokeAction($event, action)\"><span class=\"icon {{action.icon}}\"></span><span>{{::action.title}}</span></a><div ng-switch-when=separator class=ep-actions-menu-item-separator></div></li><li class=ep-actions-menu-item-mobile><a class=\"ep-actions-menu-item edd-red separate\" ng-click=actionMenuCtrl.close()><span class=\"icon icon-clear\"></span><span>Close</span></a></li></ul></div>"
  );


  $templateCache.put('src/components/ep.dropdown/ep-dropdown-btn/ep-dropdown-btn.html',
    "<!--This is a partial for the ep-dropdown directive --><div class=ep-dropdown-btn><div class=row><div class=col-lg-12><div class=button-group><button type=button class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=dropdown><span ng-class=\"icon ? icon : 'glyphicon glyphicon-cog'\"></span> <span class=caret></span></button><ul class=dropdown-menu><li ng-repeat=\"item in menu\" ng-hide=\"item.visible === false\"><a href=# ng-click=\"menuClick(item, $event)\" class=small tabindex=-1><input type=checkbox class=ep-dropdown-btn-chk ng-model=\"item.checked\">&nbsp;{{item.caption}}</a></li></ul></div></div></div></div>"
  );


  $templateCache.put('src/components/ep.list/ep-list.html',
    "<div class=ep-list-container><script id=defaultItemContentTemplate type=text/ng-template><div class=\"ep-list-item-text ep-pad-left-10\">\r" +
    "\n" +
    "            <div class=\"ep-list-item-title ep-crm-text-ellipsis\">{{ obj[mainTitle] }}</div>\r" +
    "\n" +
    "            <div ng-if=\"subTitle\" class=\"ep-list-item-sub-title ep-crm-text-ellipsis\">{{formatSubtitle(subTitle, obj)}}</div>\r" +
    "\n" +
    "            <div ng-if=\"additionalTitle\" class=\"ep-list-item-additional-title ep-crm-text-ellipsis\">{{formatAdditionalTitle(additionalTitle, obj)}}</div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"ep-list-item-details text-right ep-pad-right-10\">\r" +
    "\n" +
    "            <span class=\"ep-crm-text-ellipsis\">{{obj[id]}}</span>\r" +
    "\n" +
    "            <div ng-if=\"statuses\" class=\"ep-list-item-status  ep-crm-text-ellipsis\">\r" +
    "\n" +
    "                <div class=\"status-period ep-crm-text-ellipsis\">{{formatStatusPeriod(statuses, obj)}}</div>\r" +
    "\n" +
    "                <div class=\"status status-text ep-crm-text-ellipsis{{getStatusTextClass(statuses, obj)}}\">{{formatStatusText(statuses, obj)}}</div>\r" +
    "\n" +
    "                <div class=\"status-source text-success ep-crm-text-ellipsis\">{{formatStatusSource(statuses, obj)}}</div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"ep-list-item-decorator\">\r" +
    "\n" +
    "            <div class=\"ep-list-arrow\" ng-if=\"arrow\"><i class=\"ep-cicrm-right-chevron\"></i></div>\r" +
    "\n" +
    "            <div class=\"ep-margin-right-15 text-primary\" ng-if=\"selectMarkField && obj[selectMarkField] == selectMarkFieldValue\"\r" +
    "\n" +
    "                ng-class=\"{'ep-margin-top-10':subTitle && !additionalTitle, 'ep-margin-top-15': additionalTitle}\"><i class=\"fa fa-check\"></i></div>\r" +
    "\n" +
    "        </div></script><script id=listItemTemplate type=text/ng-template><div ng-if=\"groupBy && directory[obj[groupBy]] && directory[obj[groupBy]].data === obj\" class=\"ep-dir-divider ep-group-heading\"><b>{{directory[obj[groupBy]].groupDisplay}}</b></div>\r" +
    "\n" +
    "        <div class=\"ep-list-item-content ep-pad-vert-10\" ng-include=\"itemContentTemplate\"></div></script><!--Calling filter list component for search option--><ep-filter-list search-by=listSearch count=\"filtered ? filterState.filterResult.length : items.count\" search-prompt=searchPrompt></ep-filter-list><!--Header as optional--><div class=ep-list-sub-header ng-if=\"subHeader == 'true'\"><label ng-click=filter()>Filter</label><label ng-click=sort()>Sort</label><span class=\"pull-right ep-pad-right-20 text-primary\" ng-hide=\"hideAdd == 'true'\" ng-click=add()><i class=\"fa fa-plus\" aria-hidden=true></i></span></div><!-- Alphabet Selector --><div class=ep-list-directory ng-class=\"{'ep-header-visible':subHeader == 'true'}\" ng-if=\"showDirectory && groupBy\"><div class=ep-list-directory-item ng-repeat=\"(id,dir) in directory | epOrderObjectBy:'sort'\"><a ng-if=\"dir.letter === '*'\" class=ep-list-directory-item-enabled ng-click=goToDirectory(dir)><i class=\"fa fa-asterisk\"></i></a> <span ng-if=\"(dir.letter !== '*') && dir.disabled\" class=text-muted>{{dir.letter}}</span> <a ng-if=\"(dir.letter !== '*') && !dir.disabled\" class=ep-list-directory-item-enabled ng-class=\"{ 'text-danger': selectedDirectoryEntry.letter === dir.letter && filtered }\" ng-click=goToDirectory(dir)>{{dir.letter}}</a></div></div><div ng-if=useVirtualScrolling><ul class=ep-list ng-class=\"{'ep-header-visible':subHeader == 'true'}\" ng-if=!filtered id={{localId}} vs-repeat={{vsItemSize}} vs-excess={{vsRenderBufferSize}} vs-options=\"{ latch: {{vsLatch}} }\"><li ng-repeat=\"obj in listData track by $index\" ng-click=handler(obj) class=ep-list-item ng-include=\"'listItemTemplate'\"></li></ul><ul class=ep-list ng-class=\"{'ep-header-visible':subHeader == 'true'}\" ng-if=filtered id={{localId}} vs-repeat={{vsItemSize}} vs-excess={{vsRenderBufferSize}} vs-options=\"{ latch: {{vsLatch}} }\"><li ng-repeat=\"obj in (filterState.filterResult = (filteredData | filter:filterByName))\" ng-click=handler(obj) class=ep-list-item ng-include=\"'listItemTemplate'\"></li></ul></div><div ng-if=!useVirtualScrolling><ul class=ep-list ng-class=\"{'ep-header-visible':subHeader == 'true'}\" ng-if=!filtered id={{localId}}><li ng-repeat=\"obj in listData track by $index\" ng-click=handler(obj) class=ep-list-item ng-include=\"'listItemTemplate'\"></li></ul><ul class=ep-list ng-class=\"{'ep-header-visible':subHeader == 'true'}\" ng-if=filtered id={{localId}}><li ng-repeat=\"obj in (filterState.filterResult = (filteredData | filter:filterByName))\" ng-click=handler(obj) class=ep-list-item ng-include=\"'listItemTemplate'\"></li></ul></div></div>"
  );


  $templateCache.put('src/components/ep.menu.builder/context.menu/ep-context-menu.html',
    "<span class=\"ep-relative ep-context-menu-owner\"><span class=\"ep-actionset ep-interactivity-context-menu\"><span class=ep-context-menu ng-click=contextMenuCtrl.onDynamicMenuCall($event)></span></span></span>"
  );


  $templateCache.put('src/components/ep.menu.builder/dynamic.menu/ep-dynamic-menu.html',
    "<div id=ep-dynamic-menu ng-show=dynamicMenuCtrl.menuItems><ul class=\"dropdown-menu ep-actions-menu list-unstyled noselect\" role=menu><li ng-repeat=\"menuItem in dynamicMenuCtrl.menuItems\" ng-switch=menuItem.type><a ng-switch-when=action class=ep-actions-menu-item ng-click=\"dynamicMenuCtrl.invokeAction($event, menuItem, dynamicMenuCtrl.context)\"><span class=\"icon {{menuItem.icon}}\"></span><span>{{::menuItem.caption}}</span></a><div ng-switch-when=separator class=ep-actions-menu-item-separator></div></li><li class=ep-actions-menu-item-mobile><a class=\"ep-actions-menu-item edd-red separate\" ng-click=dynamicMenuCtrl.closeMenu()><span class=\"icon icon-clear\"></span><span>Close</span></a></li></ul></div>"
  );

}]);
