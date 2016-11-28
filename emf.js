/*
 * emf (Epicor Mobile Framework) 
 * version:1.0.10-dev.238 built: 28-11-2016
*/

var __ep_build_info = { emf : {"libName":"emf","version":"1.0.10-dev.238","built":"2016-11-28"}};

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
 * @name ep.animation
 * @description
 * A module containing the animation directive.
 */
(function() {
    'use strict';

    angular.module('ep.animation', [
    'ep.templates',
    'ep.sysconfig'
    ]);
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

(function() {
	'use strict';
    /**
     * @ngdoc overview
     * @name ep.cache
     * @description
     * Provides in-memory and persistent cache mechanism
     */
    angular.module('ep.cache', ['ep.indexeddb', 'ep.sysconfig']);
})();

'use strict';
/**
 * @ngdoc overview
 * @name ep.card
 * @description
 * card component
 */
angular.module('ep.card', [
    'ep.templates',
    'ep.sysconfig'
]);

/**
 * @ngdoc overview
 * @name ep.chart
 * @description
 * charts using C3 charting library
 */
(function() {
    'use strict';

    angular.module('ep.chart', [
        'ep.templates',
        'ep.sysconfig'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.color.selector
 * @description
 * Provides the color selector
 *
 * Note: Include css/colorpicker.css and js/bootstrap-colorpicker-module.js in html file from lib/bower/angular-bootstrap-colorpicker.
 * The JS file should be included before including emf.js
 */
(function() {
    'use strict';

    angular.module('ep.color.selector', [
        'ep.templates'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.color.tile
 * @description
 * This is the module for the color tile.
 */
(function() {
    'use strict';

    angular.module('ep.color.tile', []);
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
 * @name ep.contacts.list
 * @description
 * Provides the contact list directive
 */
(function() {
    'use strict';

    angular.module('ep.contacts.list', []);
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

'use strict';
/**
 * @ngdoc overview
 * @name ep.modaldialog
 * @description
 * Provides epicor modal dialo services
 */
angular.module('ep.datagrid', ['ep.templates', 'ep.dropdown']);

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
 * @name ep.dynamic.directive
 * @description
 * This is the dynamic directive builder module
 */
(function() {
    'use strict';

    angular.module('ep.dynamic.directive', [
    'ep.templates',
    'ep.sysconfig'
    ]);
})();

'use strict';
/**
 * @ngdoc overview
 * @name ep.embedded.apps
 * @description
 * Provides services for embedded application hosting
 */
angular.module('ep.embedded.apps', ['ep.templates', 'ep.sysconfig', 'ep.utils']);

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
 * Created by brent on 3/24/16.
 */
(function() {
  'use strict';
    angular.module('ep.file', []);
})();

/**
 * @ngdoc overview
 * @name ep.filter.list
 * @description
 * Provides a filter input to a list
 */
(function() {
    'use strict';

    angular.module('ep.filter.list', []);
})();

/**
 * @ngdoc overview
 * @name ep.icon.selector
 * @description
 * Provides the font awsome icon selector
 */
(function() {
    'use strict';

    angular.module('ep.icon.selector', []);
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

(function() {
	'use strict';
    angular.module('ep.indexeddb', []);
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
 * @name ep.multi.level.menu
 * @description
 * Represents the Multi level menu
 */
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
 * @name ep.odata
 * @description
 * Provides epicor odata query services
 * to use, DI the ep.odata module and reference the 'odataQueryFactory' factory
 */
(function() {
    'use strict';

    angular.module('ep.odata', []);
})();

'use strict';
/**
 * @ngdoc overview
 * @name ep.photo.browser
 * @description
 * browsing the photos
 */
angular.module('ep.photo.browser', [
    'ep.templates',
    'ep.sysconfig'
]);

'use strict';
/**
 * @ngdoc overview
 * @name ep.record.editor
 * @description
 * record editor creates controls by metadata
 */
angular.module('ep.record.editor', [
    'ep.feature.detection',
    'ep.templates',
    'ep.sysconfig',
    'ep.include'
]);

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

'use strict';
/**
 * @ngdoc overview
 * @name ep.signature
 * @description
 * signature capture component
 */
angular.module('ep.signature', [
    'ep.templates',
    'ep.sysconfig'
]);

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
 * @name ep.tabbar
 * @description
 * tabbar components
 */
(function() {
    'use strict';

    angular.module('ep.tabbar', [
    'ep.templates',
    'ep.sysconfig'
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

    angular.module('ep.theme', [
        'ep.templates',
        'ep.local.storage',
        'ep.sysconfig',
        'ep.application'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.tile
 * @description
 * standard tile for favorites, etc
 */
(function() {
    'use strict';

    angular.module('ep.tile', [
        'ep.templates',
        'ep.sysconfig',
        'ep.application',
        'ep.utils',
        'ep.include'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.tiles.panel
 * @description
 * A panel with display of tiles (favorites, etc)
 */
(function() {
    'use strict';

    angular.module('ep.tiles.panel', [
        'ep.templates',
        'ep.sysconfig',
        'ep.tile'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.token
 * @description
 * Provides epicor token auth login/logout services
 */
(function() {
    'use strict';

    angular.module('ep.token', [
        'ep.sysconfig',
        'ep.utils'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.ui.range.slider
 * @description
 * This is the range slider directive
 */
(function() {
    'use strict';

    angular.module('ep.ui.range.slider', [
    'ep.templates',
    'ep.sysconfig',
    'ngTouch'
    ]);
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
                    controller: ['$rootScope', '$scope', function($rootScope, $scope) {
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
* @ngdoc directive
* @name ep.animation.directive:epAnimation
* @restrict E
*
* @description
* Represents the ep.animation directive
*
* @example
*/
(function() {
    'use strict';

    angular.module('ep.animation').directive('epAnimation',
    function() {
        function link($scope, elem, attrs) {

            $scope.$watch(function() {
                return $scope.options;
            }, function(options) {
                if (options) {
                    var id = attrs.id;
                    var $body = angular.element('body');
                    var $animationStyle = angular.element('#animationStyle');

                    if (!$animationStyle.length) {
                        var el = document.createElement('style');

                        $body.append(el);
                        $animationStyle = angular.element(el);
                        $animationStyle.attr('id', 'animationStyle');
                    }

                    var content = $animationStyle.get(0).textContent;

                    if (!id) {
                        id = attrs.id = _.uniqueId(elem[0].nodeName);
                    }
                    var exp = '';
                    var regex;
                    if (options.show) {
                        exp = '#' + id + '.ng-hide-remove {.*}';
                        regex = new RegExp(exp, 'gim');
                        content = content.replace(regex, '');
                        content += '\r\n#' + id + '.ng-hide-remove { animation: ' +
                            (options.show.duration || '0.5s') + ' ' +
                            options.show.animation + ' ' +
                            (options.show.easing || 'ease') + '; }';
                    }
                    if (options.hide) {
                        exp = '#' + id + '.ng-hide-add {.*}';
                        regex = new RegExp(exp, 'gim');
                        content = content.replace(regex, '');
                        content += '\r\n#' + id + '.ng-hide-add { animation: ' +
                            (options.hide.duration || '0.5s') + ' ' +
                            options.hide.animation + ' ' +
                            (options.hide.easing || 'ease') + '; }';
                    }
                    if (options.enter) {
                        exp = '#' + id + '.ng-enter-active {.*}';
                        regex = new RegExp(exp, 'gim');
                        content = content.replace(regex, '');
                        content += '\r\n#' + id + '.ng-enter-active { animation: ' +
                            (options.enter.duration || '0.5s') + ' ' +
                            options.enter.animation + ' ' +
                            (options.enter.easing || 'ease') + '; }';

                    }
                    if (options.leave) {
                        exp = '#' + id + '.ng-leave-active {.*}';
                        regex = new RegExp(exp, 'gim');
                        content = content.replace(regex, '');
                        content += '\r\n#' + id + '.ng-leave-active { animation: ' +
                            (options.leave.duration || '0.5s') + ' ' +
                            options.leave.animation + ' ' +
                            (options.leave.easing || 'ease') + '; }';

                    }
                    $animationStyle.html(content);
                }
            });
        }

        return {
            restrict: 'A',
            scope: {
                'options': '='
            },
            link: link
        };
    });
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
                if (__ep_build_info) {
                    config.emfBuildInfo = __ep_build_info;
                }

                config.getEmfLibPath = function (libName) {
                    var ret = './lib/bower/emf';
                    if (config.emfBuildInfo[libName] && libName !== 'emf') {
                        ret = './lib/bower/emf/emf.' + config.emfBuildInfo[libName].libName
                    }
                    return ret;
                }
                config.getAssetsPath = function(libName, fileName) {
                    var ret = config.getEmfLibPath(libName) + '/assets';
                    if (fileName) {
                        ret += '/' + fileName;
                    }
                    return ret;
                }

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
            FastClick.attach(document.body);
            this.state.messages.push('FastClick attached.');
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

(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name ep.cache.service:epCacheService
     * @description
     * Service for the ep.cache module
     * This service provides convinient caching using epIndexedDBService
     *
     * @example
     *
     */
    epCacheService.$inject = ['$log', '$q', '$rootScope', 'epIndexedDbService', 'epShellConstants', 'epShellConfig'];
    angular.module('ep.cache')
        .service('epCacheService', epCacheService);

    /*@ngInject*/
    function epCacheService($log, $q, $rootScope, epIndexedDbService, epShellConstants, epShellConfig) {
        var cacheStore = {};
        //define the cache database
        epIndexedDbService.createSchema('ep-cache-db')
            .defineVersion(1, function(db) {
                var cacheTable = db.createObjectStore('ep-cache', { keyPath: 'key' });
                cacheTable.createIndex('cacheId', 'cacheId', { unique: false });
            });

        function reify(val) {
            if (angular.isFunction(val)) {
                return val.apply(null);
            } else {
                return val;
            }
        }

        /**
         * @ngdoc method
         * @name getCache
         * @methodOf ep.cache.service:epCacheService
         * @public
         * @description
         * Get the in-memory cache with the given Id
         * @param {string|Function} cacheId - the id of the cache where the data will be stored/read or a function returning the same

         * @returns {Object} An object that represents the isolated cache
         */
        function getCache(cacheId) {
            cacheId = reify(cacheId);
            cacheStore[cacheId] = cacheStore[cacheId] || {};
            return cacheStore[cacheId];
        }

        /**
         * @ngdoc method
         * @name cacheServiceCall
         * @methodOf ep.cache.service:epCacheService
         * @public
         * @description
         * Memoize the result of a service call using a custom key
         * @param {string|Function} cacheId - the id of the cache where the data will be stored/read or a function returning the same
         * @param {string|Function} key - the key to cache the result under or a function returning the same
         * @param {Function} getDataFromService - a function that returns the data that should be cached, or a promise that
         * resolves the same
         * @param {boolean} reset - a flag indicating whether the value should be returned from the service instead
         * of from cache
         * @returns {Object} Returns a promise that resolves with either the data from the cache or the
         * (potentially transformed) result from the service
         */
        function cacheServiceCall(cacheId, key, getDataFromService, reset) {

            var cache = getCache(cacheId);
            key = reify(key);

            var deferred = $q.defer();
            if (reset) {
                resolveServiceCall(deferred, key, null, getDataFromService);
            } else {
                var data = cache[key];
                if (!data) {
                    getPersistedCacheValue(key).then(function(result) {
                        if (result) {
                            cache[key] = result;
                            $log.debug('Resolving service call data from persistent cache "' + cacheId + '" for key "' + key + '".');
                            deferred.resolve(result);
                        } else {
                            $log.debug('Cached record "' + key + '" not found in persistent cache');
                            resolveServiceCall(deferred, key, cacheId, getDataFromService);
                        }
                    }, function() {
                        $log.debug('An error occurred while retrieving cached record for key: "' + key + '".');
                        resolveServiceCall(deferred, key, cacheId, getDataFromService);
                    });
                } else {
                    $log.debug('Resolving service call data from cache "' + cacheId + '" for key "' + key + '".');
                    deferred.resolve(data);
                }
            }
            return deferred.promise;
        }

        function resolveServiceCall(deferred, key, cacheId, getDataFromService) {

            function finalize(result) {
                if (cacheId) {
                    cacheData(cacheId, key, result);
                }
                return result;
            }

            $log.debug('Invoking service call for key "' + key + '".');
            // ...then invoke the service method
            var invocationResult = getDataFromService(key);
            // if the service returned a promise
            if (invocationResult.then) {
                // ..then we need to wait for resolution
                invocationResult.then(function(result) {
                    // and store the result in the cache (by calling finalize)
                    deferred.resolve(finalize(result));
                }, function(err) {
                    $log.warn('An error occurred while invoking service call with key "' + key + '". ' + err);
                    deferred.reject(err);
                });
            } else {
                // otherwise it's just a regular value and it can be cached & returned immediately
                deferred.resolve(finalize(invocationResult));
            }
        }

        function getPersistedCacheValue(key) {
            return epIndexedDbService.openDatabase('ep-cache-db', 1).then(function(db) {
                var store = db.getObjectStore('ep-cache');
                return store.get(key).then(function(cacheEntry) {
                    return cacheEntry && cacheEntry.value;
                })
            });
        }

        function savePersistedCacheValue(key, cacheId, value) {
            var cacheEntry = { key: key, cacheId: cacheId, value: value };
            return epIndexedDbService.openDatabase('ep-cache-db', 1).then(function(db) {
                var store = db.getObjectStore('ep-cache');
                return store.put(cacheEntry);
            })
        }

        /**
         * @ngdoc method
         * @name deleteAllCaches
         * @methodOf ep.cache.service:epCacheService
         * @public
         * @description
         * Clears all cached data
         */
        function deleteAllCaches() {
            Object.keys(cacheStore).forEach(function(cacheId) {
                deleteCache(cacheId);
            });
            epIndexedDbService.deleteDatabase('ep-cache-db');
        }

        /**
         * @ngdoc method
         * @name deleteCache
         * @methodOf ep.cache.service:epCacheService
         * @public
         * @description
         * Clears a cache with the given id
         * @param {string|Function} cacheId - the id of the cache to be deleted or a function returning the same
         */
        function deleteCache(cacheId) {
            cacheId = reify(cacheId);
            if (cacheStore[cacheId]) {
                delete cacheStore[cacheId];
                $log.debug('Cache "' + cacheId + '" deleted from memory cache.');
            }
            epIndexedDbService.openDatabase('ep-cache-db', 1).then(function(db) {
                db.getObjectStore('ep-cache').deleteByIndex('cacheId', cacheId);
                $rootScope.$emit(epShellConstants.SHELL_CACHE_DELETED_EVENT, { cacheId: cacheId });
                $log.debug('Cache "' + cacheId + '" deleted from database cache.');
            });
        }

        /**
         * @ngdoc method
         * @name deleteCacheKey
         * @methodOf ep.cache.service:epCacheService
         * @public
         * @description
         * Clears data with the given key from the cache with the given id
         * @param {string|Function} cacheId - the id of the cache where the data will be removed or a function returning the same
         * @param {string|Function} key - the key to the data that will be removed from the cache
         */
        function deleteCacheKey(cacheId, key) {
            var cache = getCache(cacheId);
            key = reify(key);
            if (cache && cache[key]) {
                delete cache[key];
            }
            epIndexedDbService.openDatabase('ep-cache-db', 1).then(function(db) {
                db.getObjectStore('ep-cache').delete(key);
                $log.debug('Value with key "' + key + '" deleted from database.');
            });
            $rootScope.$emit(epShellConstants.SHELL_CACHE_DATA_DELETED_EVENT, { cacheId: reify(cacheId), key: key });
        }

        /**
         * @ngdoc method
         * @name getCachedData
         * @methodOf ep.cache.service:epCacheService
         * @public
         * @description
         * Returns the data with the given key from the cache with the given id
         * @param {string|Function} cacheId - the id of the cache where the data is stored or a function returning the same
         * @param {string|Function} key - the key to the data that will be returned from the cache
         * @param {Object} [defaultValue] - optional value to store and return in case the value is not available in the cache.
         */
        function getCachedData(cacheId, key, defaultValue) {
            var cache = getCache(cacheId);
            var data = cache[key];
            if (angular.isUndefined(data)) {
                data = (cache[key] = defaultValue);
            }
            return data;
        }

        /**
         * @ngdoc method
         * @name cacheData
         * @methodOf ep.cache.service:epCacheService
         * @public
         * @description
         * Stores the data with the given key in the cache with the given id
         * @param {string|Function} cacheId - the id of the cache where the data will be stored or a function returning the same
         * @param {string|Function} key - the key to the data that will be stored in the cache
         * @param {Object} data - the data that will be stored in the cache
         */
        function cacheData(cacheId, key, data) {
            if (epShellConfig.options.enableCache) {
                var cache = getCache(cacheId);
                key = reify(key);
                cache[key] = data;
                savePersistedCacheValue(key, cacheId, data).then(function() {
                    $log.debug('Cached value with key:"' + key + '" in cache: "' + cacheId + '".');
                    $rootScope.$emit(epShellConstants.SHELL_DATA_CACHED_EVENT,
                        { cacheId: reify(cacheId), key: key, data: data });
                }, function(e) {
                    $log.warn('Unable to open cache database: ' + e);
                });
            }
        }

        return {
            cacheServiceCall: cacheServiceCall,
            deleteAllCaches: deleteAllCaches,
            deleteCache: deleteCache,
            deleteCacheKey: deleteCacheKey,
            getCachedData: getCachedData,
            cacheData: cacheData
        }
    }
})();

'use strict';
/**
* @ngdoc directive
* @name ep.card.directive:epCard
* @restrict E
*
* @description
* This component contains a card that has wrapping text, title and responsive image.
*
* @example
<doc:example module="ep.card">
    <doc:source>
      <ep-card>
            <ep-card-block contrast="false">
                <div>
                    <img src="http://byteclub.fr/img/logo-angularjs.svg" alt='Card image cap' class='card-responsive' />
                </div>
            </ep-card-block>
            <ep-card-title><h2><font color="blue">Ep Card Demo</font> <a href="http://www.google.com">search</a></h2></ep-card-title>
            <ep-card-block contrast="true">
                <p>We can place a rich html description to each card within the ep-card-block</p>
                <ol>
                    <li>Title: content of title can be customized to contain every valid html tag and custom directives</li>
                    <li>Image: allows resizing of image within the card </li>
                    <li>Block: content of block can be customized to contain every valid html tag and custom directives</li>
                </ol>

                <button class="btn-primary">Sample Button in HTML</button>
            </ep-card-block>
        </ep-card>
    </doc:source>
</doc:example>
*/
var app = angular.module('ep.card');
app.directive('epCard',
    function() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'src/components/ep.card/ep-card-template.html'
        };
	});

app.directive('epCardBlock',
    function() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'src/components/ep.card/ep-card-block-template.html',
            link: function($scope, element, attributes) {
                if (attributes.contrast === 'true') {
                    element[0].className = element[0].className + ' card-block-contrast';
                }
            }
        };
	});

app.directive('epCardTitle',
    function() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'src/components/ep.card/ep-card-title-template.html'
        };
	});


(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.chart.directive:epChartC3
    * @restrict E
    *
    * @description
    * Represents the epChartC3 directive - charts using C3.JS library
    *
    * The chart is drawn each time chartData is changed. chartData is of following structure:
    *
    *  {
    *      chartType: {one of defined chart types},
    *      xAxis: {
    *          label: {xAxis label},
    *          type: {xAxis type}
    *      },
    *      yAxis: {
    *          label: {yAxis label},
    *          type: {yAxis type}
    *      },
    *      data: {
    *          xValues: [],
    *          yValues: [[],[],...[]]
    *      },
    *      dateUnit: {'year'/'month'/'week'/'day'},      
    *   };
    *
    *   The following chart types are supported:
    *   'LineChart','SplineChart','ScatterChart','BubbleChart','StackedAreaChart','ColumnChart','HorizontalBarChart',
    *   'LineAndBarChart''PieChart','DoughnutChart'
    *
    *   data must be prepared as follows:
    *      for pie/donut charts:
    *          dataX : [ [v1.x, v1.y], [v2.x, v2.y],...[vN.x, vN.y] ]
    *          dataY: undefined
    *      for all others:
    *          dataX : [xLabel, v1.x, v2.x,...vN.x]
    *          dataY : [
    *                      [yLabel_1, v1.y, v2.y,...vN.y],
    *                      [yLabel_2, v1.y, v2.y,...vN.y],
    *                      ...
    *                      [yLabel_N, v1.y, v2.y,...vN.y],
    *                  ]
    *
    *   other settings:
    *       height : 'view' | 'window' | integer (px) | function | element | selector 
    *                this defines how the chart height is calculated. The width is responsive to the container
    *       heightOffset: 0 ( 25 - default) - an offset to the calculated height
    *       legend: (bool) - (default - true) display legend option
    *       zoom: (bool) - (default - true) display zoom option for appropriate charts
    *       stacked: (bool) - (default - true) display stacked option for appropriate charts
    *
    *       showOptions: (bool) - (default - true) display options on top of the chart
    *       autoHideLegends: (bool) - (default - true) auto hide legend when height is smaller than certain threshold 
    *       legendHiddenText: (bool) - (default - [legend hidden]) text to display when legend is auto hidden
    *
    *
    *   Events:
    *       CHART_HAS_RESIZED_EVENT - fired after chart resize
    *       CHART_RESIZE_EVENT - this event will cause chart to resize
    *
    * @example
    *
    *      <ep-chart-c3 settings="chartData"></ep-chart-c3>
    */
    epChartC3Directive.$inject = ['$log', '$timeout', '$rootScope', 'epShellService', 'epShellConstants', 'epChartConstants'];
    angular.module('ep.chart').
        directive('epChartC3', epChartC3Directive);

    /*@ngInject*/
    function epChartC3Directive($log, $timeout, $rootScope, epShellService, epShellConstants, epChartConstants) {
        var baseChart = {
            ctype: 'bar'
        };

        var chartTypes = {
            'LineChart': _.extend(_.clone(baseChart),
                { name: 'Line', value: 'LineChart', ctype: 'line' }),
            'SplineChart': _.extend(_.clone(baseChart),
                { name: 'Spline', value: 'SplineChart', ctype: 'spline' }),
            'ScatterChart': _.extend(_.clone(baseChart),
                { name: 'Scatter', value: 'ScatterChart', ctype: 'scatter' }),
            'BubbleChart': _.extend(_.clone(baseChart),
                { name: 'Bubble', value: 'BubbleChart', ctype: 'scatter', point: true, color: true }),
            'StackedAreaChart': _.extend(_.clone(baseChart),
                {
                    name: 'Stacked Area', value: 'StackedAreaChart', ctype: 'area-spline', isStacked: true,
                    isArea: true, stackable: true
                }),
            'ColumnChart': _.extend(_.clone(baseChart),
                { name: 'Column', value: 'ColumnChart', ctype: 'bar', color: true, stackable: true }),
            'HorizontalBarChart': _.extend(_.clone(baseChart),
                {
                    name: 'Horizontal Bar', value: 'HorizontalBarChart', ctype: 'bar', rotated: true, color: true,
                    stackable: true
                }),
            'LineAndBarChart': _.extend(_.clone(baseChart),
                { name: 'Line and Bar', value: 'LineAndBarChart', ctype: 'bar' }),
            'PieChart': _.extend(_.clone(baseChart),
                { name: 'Pie', value: 'PieChart', ctype: 'pie', legend: true, category: 'pie' }),
            'DoughnutChart': _.extend(_.clone(baseChart),
                { name: 'Doughnut', value: 'DoughnutChart', ctype: 'donut', legend: true, category: 'pie' })
        };

        var colors = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896',
            '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22',
            '#dbdb8d', '#17becf', '#9edae5'];

        var cSubChartMinHeight = 400;
        var cLegendHeightMin = 350;

        function getChart(type) {
            return chartTypes[type] || baseChart;
        }

        function getChartWidth(scope) {
            return angular.element(scope.state.chartElement).width();
        }

        function getHeight(scope) {
            var chartEl = angular.element(scope.state.theElement);
            //window option is default
            var newHeight = $(window).height() - chartEl.offset().top;
            var hh = scope.settings.height;
            if (hh === 'view' || hh === undefined) {
                var vc = angular.element('#viewContainer');
                if (vc.length) {
                    newHeight = vc.height() - chartEl.offset().top;
                }
            } else if (angular.isNumber(hh)) {
                newHeight = hh;
            } else if (angular.isFunction(hh)) {
                newHeight = hh();
            } else if (angular.isString(hh) || hh instanceof HTMLElement) {
                //selector passed
                var el = $(hh);
                if (el.length) {
                    newHeight = el.outerHeight(true);
                }
            }
            var heightOffset = (scope.settings.showOptions !== false) ? - 25 : 30;
            if (angular.isFunction(scope.settings.heightOffset)) {
                heightOffset = scope.settings.heightOffset(newHeight);
            } else {
                heightOffset = (scope.settings.heightOffset ? scope.settings.heightOffset : heightOffset);
            }
            newHeight += heightOffset;
            return newHeight;
        }

        function setHeight(scope, isResize) {
            var ctrlHeight = getHeight(scope);
            var chartEl = angular.element(scope.state.chartElement);
            if (chartEl && chartEl.length) {
                chartEl.height(ctrlHeight);
            }
            if (isResize && scope.state.chart) {
                scope.state.chart.resize({
                    height: ctrlHeight
                });
                //Let the world know that chart has resized
                $rootScope.$emit(epChartConstants.CHART_HAS_RESIZED_EVENT, {
                    settings: scope.settings,
                    id: scope.state.chartId
                });
            }
            scope.state.chartHeight = ctrlHeight;
            scope.state.chartWidth = chartEl.width();
        }

        function drawChart(scope) {
            //wait until the directive element is visible then draw...
            //this makes sure the height is calculated right...
            var waitAndDraw = function() {
                if (!$(scope.state.theElement).is(':visible')) {
                    $timeout(function() {
                        waitAndDraw(scope)
                    }, 200);
                } else {
                    doDrawChart(scope)
                }
            };

            try {
                waitAndDraw();
            } catch (ex) {
                $log.error(ex);
                epShellService.hideProgressIndicator();
            }
        }

        function doDrawChart(scope) {
            scope.menuLegends = undefined;

            epShellService.showProgressIndicator();

            var settings = scope.settings;
            setHeight(scope, false);

            var xAxisHeight = 140;
            var isDateX = (settings.xAxis.type === 'date');
            var chart = getChart(settings.chartType);
            var isMultiYdata = (settings.data.yValues && settings.data.yValues.length > 1);

            scope.state.chartType = chart;
            scope.state.optStackedDisplay = (settings.stacked !== false) && isMultiYdata && chart.stackable;
            scope.state.optDataFmtDisplay = (chart.category === 'pie');
            scope.state.optZoomDisplay = (settings.zoom !== false) && (chart.category !== 'pie' && !chart.rotated);

            scope.state.legendSupported = (settings.legend !== false) && (chart.legend === true || isMultiYdata);
            scope.state.optLegendListDisplay = scope.state.optLegendDisplay = scope.state.legendSupported;
            var legendCount = chart.category === 'pie' ?
                scope.settings.data.xValues.length : scope.settings.data.yValues.length;
            scope.state.criteriaHideLegend = (scope.settings.autoHideLegends !== false) &&
                ((legendCount > 50) || (scope.state.chartHeight < cLegendHeightMin));
            if (scope.state.criteriaHideLegend) {
                scope.state.optLegend = false;
                scope.state.optLegendDisplay = false;
            }

            function calcBubbleRadius(d) {
                if (d.index === 0) { return 0; }

                var total = 0;
                angular.forEach(settings.data.yValues, function(arr) {
                    total += arr[d.index + 1];
                });
                var ret = (d.value / total) * 30;
                if (ret < 2) {
                    ret = 2;
                }
                return Math.round(ret);
            }

            var fnColor;
            if (!isMultiYdata && chart.color) {
                fnColor = function(color, d) {
                    return colors[d.index % colors.length];
                };
            }

            var ctypes;
            var columns = [];
            if (chart.category === 'pie') {
                columns = settings.data.xValues;
                //TO DO: optimize pie charts with dates
                if (isDateX) {
                    //check if they are really dates besides the 'others'
                    var processDates = false;
                    if (settings.data.xValues.length <= 1) {
                        processDates = true;
                    } else if (angular.isDate(settings.data.xValues[0][0]) ||
                        angular.isDate(settings.data.xValues[1][0])) {
                        processDates = true;
                    }
                    if (processDates) {
                        columns = [];
                        angular.forEach(settings.data.xValues, function(v) {
                            if (angular.isDate(v[0])) {
                                var d = moment(v[0]).format('YYYY, MMMM DD');
                                columns.push([d, v[1]]);
                            } else {
                                columns.push(v);
                            }
                        });
                    }
                }
            } else {
                if (chart.value === 'LineAndBarChart' && settings.data.yValues.length >= 2) {
                    //Line and bar we only display first two y-series
                    var lineLabel = settings.data.yValues[0][0];
                    ctypes = {};
                    ctypes[lineLabel] = 'line';
                    columns.push(settings.data.yValues[0]);
                    columns.push(settings.data.yValues[1]);
                } else {
                    angular.forEach(settings.data.yValues, function(arr) {
                        columns.push(arr);
                    });
                }
            }

            var formatX;
            //var formatX = isDateX ? '%Y-%m-%d' : undefined;
            if (isDateX) {
                xAxisHeight = 80;
                formatX = '%Y-%m-%d';
                if (settings.dateUnit === 'year') {
                    formatX = '%Y';
                } else if (settings.dateUnit === 'month') {
                    formatX = '%Y-%m';
                    //dateFmt    = function(d) {
                    //    return moment(d).format('mm-yy')
                    //}
                }
            } else {
                if (chart.category !== 'pie') {
                    //if string type, find longest
                    var x15 = _.find(settings.data.xValues, function(s) {
                        return (s ? s.length : 0) > 15;
                    });
                    if (!x15) {
                        xAxisHeight = 100;
                    }
                    if (scope.state.chartHeight < 200) {
                        xAxisHeight = 80;
                    }
                }

                formatX = function(x) {
                    var charsTrim = scope.state.chartHeight < 200 ? 10 : 20;
                    var ret = settings.data.xValues[x + 1];
                    if (ret && ret.length > charsTrim) {
                        ret = ret.substring(0, charsTrim) + '...';
                    }
                    return ret;
                };
            }

            var xDataCol;
            var xType = isDateX && chart.category !== 'pie' ? 'timeseries' : 'category';
            if (xType === 'timeseries') {
                columns.push(settings.data.xValues);
                xDataCol = settings.data.xValues[0];
            }

            var point;
            if (chart.value === 'BubbleChart') {
                //For bubble chart we calculate radius based on ratio of Y-axes
                point = {
                    r: isMultiYdata ? calcBubbleRadius : 15
                };
            }

            var g = {
                bindto: scope.state.chartElement[0],
                data: {
                    x: xDataCol,
                    columns: columns,
                    type: chart.ctype,
                    types: ctypes,
                    color: fnColor
                },
                point: point,
                axis: {
                    rotated: (chart.rotated === true),
                    x: {
                        type: xType,
                        tick: {
                            rotate: 75,
                            multiline: false,
                            format: formatX
                        },
                        height: xAxisHeight,
                        label: {
                            text: settings.xAxis.label,
                            position: (chart.rotated !== true) ? 'outer-center' : 'outer-middle'
                        }
                    },
                    y: {
                        label: {
                            text: settings.yAxis.label,
                            position: (chart.rotated !== true) ? 'outer-middle' : 'outer-center'
                        }
                    }
                },
                bar: {
                    width: {
                        ratio: 0.8
                        //max: 30
                    }
                },
                pie: {
                    label: {
                        format: function(value, ratio) {
                            if (scope.state.optDataFmt === 'percent') {
                                return (ratio * 100).toFixed(2) + '%';
                            }
                            return value;
                        }
                    }
                },
                donut: {
                    label: {
                        format: function(value, ratio) {
                            if (scope.state.optDataFmt === 'percent') {
                                return (ratio * 100).toFixed(2) + '%';
                            }
                            return value;
                        }
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: true
                    }
                },
                legend: {
                    show: scope.state.legendSupported && scope.state.optLegend
                    //position: (chart.category === 'pie') ? 'right' : undefined,
                    //item: {
                    //    onclick: scope.onChartLegendClick
                    //}
                },
                zoom: {
                    enabled: scope.state.optZoomDisplay && scope.state.optZoom
                },
                subchart: {
                    show: scope.state.optZoomDisplay && scope.state.optZoom &&
                        (scope.state.chartHeight > cSubChartMinHeight)
                },
                onrendered: function() {
                    onRendered(scope);
                }
            };

            scope.state.chart = c3.generate(g);
        }

        function onRendered(scope) {
            $timeout(function() {
                scope.state.whenRendered = new Date();
                epShellService.hideProgressIndicator();
            });
        }

        function onResizeEvent(scope) {
            if (scope.state.$chartElement.is(':visible')) {
                $timeout.cancel(scope.state.timeoutResize);
                scope.state.timeoutResize = $timeout(function() {
                    var changed = false;
                    var width = getChartWidth(scope);
                    if (Math.abs(width - scope.state.chartWidth) > 20) {
                        scope.state.chartWidth = width;
                        changed = true;
                    }

                    var ctrlHeight = getHeight(scope);
                    if (Math.abs(ctrlHeight - scope.state.chartHeight) > 20) {
                        changed = true;
                    }
                    if (changed) {
                        scope.checkShowLegendOption();
                    }
                    setHeight(scope, true);
                }, 250);
            }
        }

        function postCompile($scope, iElement) {
            $scope.state = {
                theElement: iElement,
                chartElement: angular.element(iElement).find('#chartc3'),
                $chartElement: angular.element(angular.element(iElement).find('#chartc3')),
                chart: null,
                chartId: $scope.settings.id || $scope.$id,
                chartHeight: -1,
                selectAllLegend: true,

                optStacked: 'grouped',
                optStackedDisplay: false,
                optLegendListDisplay: false,
                optLegendDisplay: false,
                optLegend: true,
                optDataFmtDisplay: false,
                optDataFmt: 'percent',
                optZoomDisplay: false,
                optZoom: false
            };

            $scope.$watch('settings', function(newValue) {
                if (newValue) {
                    $scope.optZoom = false; //always reset zoom
                    drawChart($scope);
                }
            });

            $scope.fnOptStackedChanged = function() {
                var groups = [];
                if ($scope.state.optStacked === 'stacked') {
                    angular.forEach($scope.state.chart.data(), function(d) {
                        groups.push(d.id);
                    });
                }
                $scope.state.chart.groups([groups]);
            };

            ///-------------- LEGENDS ------------------------------->>>>>>>>>

            $scope.fnOptLegendChanged = function(bySizeCondition) {
                $scope.state.optLegend = !$scope.state.optLegend;
                epShellService.showProgressIndicator();
                if ($scope.state.optLegend) {
                    $scope.state.chart.legend.show();
                } else {
                    $scope.state.chart.legend.hide();
                }
                if (!bySizeCondition) {
                    $scope.state.previousOptLegend = false;
                }
            };
            $scope.fnOnLegendList = function() {
                if ($scope.menuLegends === undefined) {
                    $scope.menuLegends = [];
                    var menu = [];
                    var colors = $scope.state.chart.data.colors();

                    angular.forEach($scope.state.chart.data(), function(d) {
                        menu.push({
                            id: d.id,
                            caption: d.id,
                            checked: true,
                            color: colors[d.id] + '',
                            style: { backgroundColor: colors[d.id].toString() }
                        });
                    });
                    $scope.menuLegends = menu;
                    $scope.updateMenuLegendState();
                } else {
                    if ($scope.state.whenRendered > $scope.state.whenMenuLegendState) {
                        $scope.updateMenuLegendState();
                    }
                }
            };
            $scope.fnOnLegendChanged = function(item) {
                item.checked = !item.checked;
                $scope.state.chart.toggle(item.id);
            };

            $scope.fnLegendSelectAllChanged = function() {
                var arr = [];
                angular.forEach($scope.menuLegends, function(m) {
                    arr.push(m.id);
                    m.checked = $scope.state.selectAllLegend;
                });
                if (!$scope.state.selectAllLegend) {
                    $scope.state.chart.hide(arr);
                } else {
                    $scope.state.chart.show(arr);
                }
            };
            $scope.updateMenuLegendState = function() {
                //Upon chart render we call this method to sync chart legends with our custom legends
                if ($scope.menuLegends) {
                    //this approach does not work when legend is not displayed on chart on small devices
                    //var hiddenItems = $scope.state.$chartElement.find('.c3-legend-item-hidden');
                    //we have to hack into internal C3 stuff (internal.isTargetToShow)
                    angular.forEach($scope.menuLegends, function(m) {
                        m.checked = $scope.state.chart.internal.isTargetToShow(m.id);
                    });
                    $scope.state.whenMenuLegendState = new Date();
                }
            };

            ///<<<<<<<<<<<<<<<<-------------- LEGENDS -------------------------------

            $scope.fnOptDataFmtChanged = function() {
                $scope.state.chart.show();
            };

            $scope.fnOptZoomChanged = function() {
                $scope.state.chart.destroy();
                drawChart($scope);
                $scope.state.optZoomTip = ($scope.state.chartHeight > cSubChartMinHeight);
                if ($scope.state.optZoomTip) {
                    $timeout(function() {
                        $scope.state.optZoomTip = false;
                    }, 7000);
                }
            };

            $scope.checkShowLegendOption = function() {
                if ($scope.state.legendSupported && $scope.settings.autoHideLegends !== false) {
                    //media query has met condition and hidden
                    //var isLegendHidden = (angular.element($scope.state.theElement.find('.ep-opt-legend')).css('display') === 'none');
                    var legendCount = $scope.state.chartType.category === 'pie' ?
                        $scope.settings.data.xValues.length : $scope.settings.data.yValues.length;
                    $scope.state.criteriaHideLegend =
                        (legendCount > 50 || $scope.state.chartHeight < cLegendHeightMin);
                    if ($scope.state.criteriaHideLegend) {
                        $scope.state.optLegendDisplay = false;
                        if ($scope.state.optLegend) {
                            $scope.state.previousOptLegend = true;
                            $scope.fnOptLegendChanged(true);
                        }
                    } else {
                        $scope.state.optLegendDisplay = true;
                        if (!$scope.state.optLegend && $scope.state.previousOptLegend) {
                            $scope.fnOptLegendChanged(true);
                        }
                        $scope.state.previousOptLegend = false;
                    }
                }
            };

            epShellService.registerViewEvent('ep-resize-chart' + $scope.$id,
                epShellConstants.SHELL_SIZE_CHANGE_EVENT, function() {
                    onResizeEvent($scope);
                });

            //Watch for an outside event to resize. If chartId is passed than chart will
            //resize only if chartId is matched
            $rootScope.$on(epChartConstants.CHART_RESIZE_EVENT, function(chartId) {
                if (angular.isString(chartId) && (!chartId || chartId === $scope.state.chartId)) {
                    onResizeEvent($scope);
                }
            });
        }

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.chart/ep-chart-c3.html',
            scope: {
                'settings': '='
            },
            compile: function() {
                return {
                    pre: angular.noop,
                    post: postCompile
                };
            }
        };
    }
}());

/**
 * @ngdoc object
 * @name ep.chart.object:epChartConstants
 * @description
 * Constants for epChartConstants.
 * ep.chart constants
 */
(function() {
    'use strict';

    angular.module('ep.chart').constant('epChartConstants', {
        CHART_RESIZE_EVENT: 'EP_CHART_RESIZE_EVENT',
        CHART_HAS_RESIZED_EVENT: 'EP_CHART_HAS_RESIZED_EVENT'
    });
})();

/**
 * @ngdoc directive
 * @name ep.color.selector:epColorSelector
 * @restrict EA
 *
 * @description
 * Represents color selector
 *
 * Note: Include css/colorpicker.css and js/bootstrap-colorpicker-module.js in index file from lib/bower/angular-bootstrap-colorpicker.
 * 'colorpicker.module' must be added to the application modules list
 * The JS file should be included before including emf.js
 *
 * @property {object} ngModel:object
 * This is the model object to store the selected color.
 *
 * @property {string} position:string
 * This is the position of the color selector dropdown. Allowed values are top, right, bottom, left. Default is bottom.
 *
 * @property {numeric} size:numeric
 * This is the size of color selector dropdown in pixels. Example values 200, 300 etc...Default is 100.
 *
 * @property {boolean} closeOnSelect:boolean
 * This is a boolean property determines whether to close the color picker on selection. Default is false.
 *
 * @property {string} width:string
 * This is the width of entire color selector component. Example values 500px, 80% etc...Default is 100%.
 *
 * @property {boolean} applyColorToBtn:boolean
 * This is a boolean property which decides whether selected color should be applied to the button which opens up the color picker. Default is false.
 *
 * @property {string} icon:string
 * This is the name of the font awesome icon to be displayed on color picker dropdown.
 *
 * @example
 *  <pre>
 *      <ep-color-selector ng-model="obj.color"></ep-color-selector>
 *  </pre>
 */
(function() {
    'use strict';

    angular.module('ep.color.selector').directive('epColorSelector', epColorSelectorDirective);

    function epColorSelectorDirective() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngModel: '=',
                position: '@',
                size: '@',
                closeOnSelect: '@',
                width: '@',
                applyColorToBtn: '@',
                icon: '@'
            },
            templateUrl: 'src/components/ep.color.selector/color_selector.html'
        };
    }
})();

/**
* @ngdoc directive
* @name ep.color.tile.directive:epColorTile
* @restrict E
*
* @description
* This component displays a square tile with a title, description and an icon and allows you to set the color of the tile using either a CSS class or an HTML color keyword/hex value.
 *
 * @property {string} title:string
 *  This property sets the title of the tile.
 *  <br/><br/>
 *  title="My Tile Title"
 *
 * @property {string} description:string
 *  This property sets the description of the tile.
 *  <br/><br/>
 *  description="My Tile Description"
 *
 * @property {string} fineprint:string
 *  This property sets the fine print of the tile.
 *  <br/><br/>
 *  fineprint="My Tile Fine Print"
 *
 * @property {string} icon:string
 *  This property sets the icon of the tile.  This needs to be set to a font-awesome icon string.
 *  <br/><br/>
 *  icon="fa-cogs"
 *
 * @property {string} color:string
 *  This property set the color of the tile.
 *  <br/><br/>
 *  color="red"
 *
 * @example
<doc:example module="ep.color.tile">
    <doc:source>
      <ep-color-tile title="My Tile Title" description="This is the description for the tile." fineprint="This is the fine print for the tile." icon="fa-arrows" color="deepskyblue">
      </ep-color-tile>
  </doc:source>
</doc:example>

*/
(function() {
    'use strict';

    angular.module('ep.color.tile').directive('epColorTile',
        function() {
            return {
                restrict: 'E',
                scope: {
                    title: '@',
                    description: '@',
                    fineprint: '@',
                    icon: '@',
                    color: '@',
                    colorclass: '@'
                },
                templateUrl: 'src/components/ep.color.tile/ep-color-tile.html',
            };
        });
})();

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

    epConsoleService.$inject = ['$log', 'epUtilsService'];
    angular.module('ep.console').
    service('epConsoleService', epConsoleService);

    /*@ngInject*/
    function epConsoleService($log, epUtilsService) {

        /**
         * @private
         * @description
         * the array for storing all log messages
         */
        var logMessages = [];

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
 * @ngdoc object
 * @name ep.contacts.list:epContactsListConstants
 * @description
 * Constants for epContactsListConstants.
 * ep.constacts.list constants
 * Events:
    * <pre>
    *   CONTACTS_LIST_INDEXES - indexes displayed default.
    *   CONTACTS_LIST_INDEXES_SMALL - indexes displayed if contacts list container height is < 430px
    * </pre>
 */
(function() {
    'use strict';

    angular.module('ep.contacts.list').constant('epContactsListConstants', {
        CONTACTS_LIST_INDEXES: '#ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        CONTACTS_LIST_INDEXES_SMALL: '#A.E.H.L.O.S.V.Z',
        CONTACTS_LIST_INDEXES_BREAKPOINT: 430,
        CONTACTS_LIST_INDEXES_HIDDEN_BREAKPOINT: 180
    });
})();

/**
 * @ngdoc directive
 * @name ep.contacts.list:epContactsList
 * @restrict EA
 *
 * @description
 * Represents contacts list with alphabet indexes on right side
 * - data: contacts list array
 * - handler: handler function when clicks on a contact.
 *
 * @example
 *  <pre>
 *      <ep-contacts-list data="['Bname', 'Cname', 'Aname'"></ep-contacts-list>
 *  </pre>
 */
(function() {
    'use strict';

    epContactsListDirective.$inject = ['$filter', '$timeout', 'epContactsListService', 'epContactsListConstants'];
    angular.module('ep.contacts.list').directive('epContactsList', epContactsListDirective);

    function epContactsListDirective($filter, $timeout, epContactsListService, epContactsListConstants) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                data: '=',
                handler: '&',
                mainTitle: '@',
                subTitle: '@',
                id: '@'
            },
            templateUrl: 'src/components/ep.contacts.list/contacts_list.html',
            link: function(scope) {
                scope.nameList = epContactsListService.getGroupedList(scope.data);

                scope.indexKeys = epContactsListConstants.CONTACTS_LIST_INDEXES;
                scope.smallIndexKeys = epContactsListConstants.CONTACTS_LIST_INDEXES_SMALL;

                $(window).resize(function() {
                    epContactsListService.toggleIndexes();
                });
                epContactsListService.toggleIndexes();


                scope.getDetails = function(obj) {
                    return obj;
                };

                scope.goToLink = function(id) {
                    if (id === '.') {
                        return;
                    }
                    var container = $('.ep-contacts-list');

                    //hash index will scroll to numbers list
                    id = (id === '#') ? '1' : id;
                    var scrollToElem = $('#list-group-' + id);
                    if (scrollToElem.length) {
                        container.animate({
                            scrollTop: scrollToElem.offset().top - container.offset().top + container.scrollTop() - 50
                        });
                    }
                };

            }
        };
    }
})();

/**
 * @ngdoc service
 * @name ep.contacts.list:epContactsListService
 * @description
 * Provides methods for dislaying contacts list with indexes.
 *
 * @example
 *
 */
(function() {
    'use strict';

    epContactsListService.$inject = ['$filter', '$timeout', 'epContactsListConstants'];
    angular.module('ep.contacts.list').factory('epContactsListService', epContactsListService);

    function epContactsListService($filter, $timeout, epContactsListConstants) {

        /**
         * @ngdoc method
         * @name getGroupedList
         * @methodOf ep.contacts.list:epContactsListService
         * @public
         * @param {Array} listData - list of contacts to display
         * @description
         * To group the contacts list based on alphabets
         */
        function getGroupedList(listData) {
            var listName = [];
            var sortedlist = _.sortBy(listData, 'Name');
            var groupedObj = {};
            var itemGroup = [];
            var currAlphabet = '';
            var prevAlphabet = '';
            for (var i = 0; i < sortedlist.length; i++) {
                currAlphabet = sortedlist[i].Name.substring(0, 1).toUpperCase();

                //if a number, make group name as #
                if (!isNaN(currAlphabet)) {
                    currAlphabet = '#';
                }
                if (currAlphabet !== prevAlphabet && prevAlphabet !== '') {
                    groupedObj[prevAlphabet] = itemGroup;
                    itemGroup = [];
                }
                itemGroup.push(sortedlist[i]);

                if (i === (sortedlist.length - 1)) {
                    groupedObj[currAlphabet] = itemGroup;
                    itemGroup = [];
                }
                prevAlphabet = currAlphabet;

            }
            return groupedObj;
        }

        /**
         * @ngdoc method
         * @name toggleIndexes
         * @methodOf ep.contacts.list:epContactsListService
         * @public
         * @description
         * To toggle index list based on the contacts container height
         */
        function toggleIndexes() {
            $timeout(function() {
                var mainContainerHeight = $('.ep-contacts-list').height();
                var indexesLength = 0;
                var indexItemHeight = 0;
                if (mainContainerHeight < epContactsListConstants.CONTACTS_LIST_INDEXES_HIDDEN_BREAKPOINT) {
                    $('.ep-index-list').hide();
                } else if (mainContainerHeight < epContactsListConstants.CONTACTS_LIST_INDEXES_BREAKPOINT) {
                    $('.ep-index-list.large-index-list').hide();
                    $('.ep-index-list.small-index-list').show();
                    indexesLength = $('.ep-index-list.small-index-list li').length;
                } else {
                    $('.ep-index-list.small-index-list').hide();
                    $('.ep-index-list.large-index-list').show();
                    indexesLength = $('.ep-index-list.large-index-list li').length;
                }
                //adjust index list height based on the list container height
                indexItemHeight = parseInt(mainContainerHeight / indexesLength);
                $('.ep-index-list li').css('line-height', indexItemHeight + 'px');
            });
        }

        return {
            getGroupedList: getGroupedList,
            toggleIndexes: toggleIndexes
        };
    }
})();

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

'use strict';
/**
 * @ngdoc service
 * @name ep.datagrid.factory:epDataGridDirectiveFactory
 * @description
 * Factory that provides interface access to the instance of ep.datagrid directive.
 * This factory is created by the directive and exposed though it's 'ep-data-grid-on-init' event
 *
 * @example
 *  directive:
 *         <ep-data-grid ep-data-grid-on-init="ongridInit(factory)"></ep-data-grid>
 *
 *  controller:
 *        scope.ongridInit = function(factory) {
 *           scope.gridFactory = factory;
 *        };
 *
 */
angular.module('ep.datagrid').factory('epDataGridDirectiveFactory', [
    function() {
        var count = 0;
        var epDataGridDirectiveFactory = function(directiveScope) {
            var scope = directiveScope;
            count++;
            var id = 'epdatagrid' + count.toString();

            function createGrid() {
                scope.createGrid();
            }

            function setGridOptions(options) {
                scope.setGridOptions(options);
            }

            function getGridOptions() {
                return scope.options;
            }

            function release() {
                if (scope.state.dataTable) {
                    scope.state.dataTable.fnDestroy(true);
                    scope.state.dataTable = null;
                }
            }

            function refreshData() {
                scope.refreshData();
            }

            function draw(mode) {
                scope.draw(mode);
            }

            function updateOption(name, value) {
                scope.options[name] = value;
            }

            function resizeTable(force) {
                scope.resizeTable(force);
            }

            function activateRow(row) {
                if (row) {
                    scope.activateRow(row);
                }
            }

            function activateNthRow(rowIndex) {
                scope.activateNthRow(rowIndex, false);
            }

            function updateTableState(isActiveRecord) {
                if (isActiveRecord) {
                    scope.updateTableEditStateActiveRow();
                } else {
                    scope.updateTableEditState();
                }
            }

            function isTableCreated() {
                return !!scope.state.dataTable;
            }

            function activeRow() {
                return scope.state.activeRow;
            }

            function activeRecord() {
                return scope.state.activeRecord;
            }

            function activeCell() {
                return scope.state.activeCell;
            }

            function scrollToRow(row) {
                scope.scrollToRow(row);
            }

            function appendRow(rowData) {
                scope.appendRow(rowData);
            }

            function getPrevRow(currentRow) {
                return scope.getPrevNextRow(-1, currentRow);
            }

            function getNextRow(currentRow) {
                return scope.getPrevNextRow(1, currentRow);
            }

            function isValidRow(row) {
                return scope.isValidRow(row);
            }

            function setRowEditMode(row, mode) {
                scope.setRowEditMode(row, mode);
            }

            function callPreviousGetData() {
                scope.callPreviousGetData();
            }

            function updateRow(data, node, col, redraw) {
                scope.grDataTable().fnUpdate(data, node, col, redraw);
            }

            function dataTable() {
                return scope.grDataTable();
            }

            function api() {
                return scope.grApi();
            }

            function getRowByColumnValue(colIndex, val) {
                return scope.getRowByColumnValue(colIndex, val);
            }

            function toggleFilter() {
                scope.toggleFilter();
            }

            function showFilter() {
                scope.showFilter();
            }

            function isFilterShown() {
                return scope.state.filterShowFlag;
            }

            function setDataSource(ds, refreshData) {
                scope.setDataSource(ds, refreshData);
            }

            function updateSummaryRow() {
                scope.updateSummaryRow();
            }

            function formatNumber(data, col) {
                return scope.formatNumber(data, col);
            }

            return {
                id: id,
                setGridOptions: setGridOptions,
                getGridOptions: getGridOptions,
                createGrid: createGrid,
                activeRecord: activeRecord,
                activeRow: activeRow,
                activeCell: activeCell,
                refreshData: refreshData,
                draw: draw,
                release: release,
                updateOption: updateOption,
                resizeTable: resizeTable,
                activateRow: activateRow,
                activateNthRow: activateNthRow,
                getPrevRow: getPrevRow,
                getNextRow: getNextRow,
                isValidRow: isValidRow,
                scrollToRow: scrollToRow,
                appendRow: appendRow,
                updateTableState: updateTableState,
                isTableCreated: isTableCreated,
                setRowEditMode: setRowEditMode,
                callPreviousGetData: callPreviousGetData,
                updateRow: updateRow,
                dataTable: dataTable,
                api: api,
                getRowByColumnValue: getRowByColumnValue,
                toggleFilter: toggleFilter,
                showFilter: showFilter,
                isFilterShown: isFilterShown,
                setDataSource: setDataSource,
                updateSummaryRow: updateSummaryRow,
                formatNumber: formatNumber
            };
        };
        return epDataGridDirectiveFactory;
    }
]);

'use strict';
/**
* @ngdoc directive
* @name ep.datagrid.directive:epDataGridFilterRow
* @restrict E
*
* @description
* The directive implements a special filter row inserted into the header of the
* datagrid to enable filtering
* (For internal ep.datagrid directive usage only)
*
*/
angular.module('ep.datagrid').directive('epDataGridFilterRow', [
    function() {

        function hideFilterRow(scope) {
            //hide filter row - reset values, return changed flag
            var bChanged = false;
            angular.forEach(scope.state.filterEditors, function(f) {
                if (!f.hidden && f.value !== '') {
                    bChanged = true;
                    f.value = '';
                }
                f.operator = '*';
                f.operatorText = '';
            });
            return bChanged;
        }

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.datagrid/datagrid-filter/datagrid-filter-row.html',
            controller: ['$scope', function($scope) {
                if (!$scope.state.filterEditors) {
                    //Filter data has not been defined yet...

                    var fEditors = [];
                    var tHead = $scope.grApi().table().header();
                    var firstHeaderRow = $('tr', tHead);
                    var tHeadCols = $(firstHeaderRow).find('th');

                    var filters = $scope.state.filterExpressions;

                    $(tHeadCols).each(function(i, el) {
                        var $item = $(el);

                        var ctx = null;
                        if ($item.width && $item.text()) {
                            //Find column to header relation
                            var col = $scope.grFindColumnByCellIndex($item.context.cellIndex);
                            if (col !== null) {
                                var value = '';
                                var operator = '';
                                if (filters) {
                                    // restore any existing filter values
                                    var filterExpr = _.find(filters, function(expr) {
                                        return expr.ColName === col.sName;
                                    });
                                    if (filterExpr) {
                                        value = filterExpr.Value;
                                        operator = filterExpr.Operator;
                                    }
                                }
                                operator = operator || '*';
                                var sType = 'text';
                                if (col.userColumnDef.sType === 'integer' || col.userColumnDef.sType === 'decimal') {
                                    sType = 'number';
                                }
                                ctx = {
                                    name: col.sName,
                                    type: sType,
                                    value: value,
                                    operator: operator,
                                    operatorText: (operator === '*') ? '' : operator,
                                };
                            }
                        }
                        if (!ctx) {
                            ctx = {
                                hidden: true,
                                name: 'hidden',
                                className: 'fixed sorting_disabled ep-hide-filter-col',
                                value: null
                            };
                        }
                        fEditors.push(ctx);
                    });
                    $scope.state.filterEditors = fEditors;
                    $scope.state.filterFunctions = {};

                    $scope.state.isFilterOn = true;
                    $scope.state.filterCriteria = '';

                    $scope.$watch('state.filterShowFlag', function(newValue, oldValue) {
                        if (newValue === false && oldValue === true && $scope.onHideFilter) {
                            var changedFilter = hideFilterRow($scope);
                            $scope.onHideFilter(changedFilter);
                        }
                        $scope.resizeTable();
                    });

                    $scope.fnFilterOpChange = function(ctx) {
                        var operators = ['*', '=', '<>', '>', '>=', '<', '<='];
                        var index = 0;
                        for (var idx = 0; idx < operators.length; idx++) {
                            if (operators[idx] === ctx.operator) {
                                index = idx;
                                break;
                            }
                        }
                        if (index + 1 >= operators.length) {
                            index = 0;
                        } else {
                            index = index + 1;
                        }
                        ctx.operator = operators[index];
                        ctx.operatorText = (ctx.operator === '*') ? '' : ctx.operator;
                        if ($scope.onChangeFilter && ctx.value !== '') {
                            $scope.onChangeFilter(ctx);
                        }
                    };

                    $scope.fnFilterBlur = function(ctx) {
                        if ($scope.onChangeFilter && ctx.value !== '') {
                            $scope.onChangeFilter(ctx);
                        }
                    };

                    $scope.fnFilterKeyUp = function(ctx, e) {
                        if ($scope.onChangeFilter && e.keyCode === 13 ||
                            (e.keyCode !== 9 && ctx.value === '')) {
                            if ($scope.onChangeFilter) {
                                $scope.onChangeFilter(ctx);
                            }
                        }
                    };

                    $scope.state.filterFunctions.getFilterExpressions = function() {
                        var fExpr = [];
                        if ($scope.state.filterShowFlag && $scope.state.filterEditors) {
                            angular.forEach($scope.state.filterEditors, function(ctx) {
                                if (!ctx.hidden && ctx.value !== '') {
                                    if (ctx.name && ctx.operator) {
                                        var expr = {
                                            ColName: ctx.name,
                                            Operator: ctx.operator,
                                            Value: ctx.value
                                        };
                                        fExpr.push(expr);
                                    }
                                }
                            });
                        }
                        $scope.state.filterExpressions = fExpr;
                        return fExpr;
                    };
                }
            }]
        };
    }
]);

'use strict';
/**
* @ngdoc directive
* @name ep.datagrid.directive:epDataGridFilterToggle
* @restrict E
*
* @description
* The directive implements a filter toggle button for the datagrid to
* enable/disable filtering.
* Works only when showToggleFilterButton option is set.
* (For internal ep.datagrid directive usage only)
*/
angular.module('ep.datagrid').directive('epDataGridFilterToggle', [
    function() {
        return {
            restrict: 'E',
            replace: true,
            template: '<div><a class="btn btn-default btn-sm ep-center-item fa fa-filter" ' +
                      'ng-click="toggleFilter()" ></a></div>',
            controller: [function() {}]
        };
    }
]);

/**
*/
(function() {
    'use strict';

    angular.module('ep.datagrid').
    directive('epDataGridSummaryRow', epDataGridSummaryRowDirective);

    /*@ngInject*/
    function epDataGridSummaryRowDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.datagrid/datagrid-summary/datagrid-summary-row.html',
            link: function(scope, element) {
                scope.state.summaryRow = {
                    theElement: element,
                    columns: [{}]
                };

                if (scope.state.dataTable) {
                    var cols = [];
                    scope.iterateHeaderColumns(function(item, col) {
                        if (col) {
                            cols.push({
                                name: col.sName,
                                value: undefined,
                                col: col
                            });
                        } else {
                            cols.push({
                                hidden: true,
                                name: 'hidden',
                                className: 'ep-hide-summary-col',
                                value: undefined,
                            });
                        }
                    });
                    scope.state.summaryRow.columns = cols;
                }
            }
        };
    }
})();

'use strict';
/**
* @ngdoc directive
* @name ep.datagrid.directive:epDataGrid
* @restrict E
*
* @description
* The directive a data grid based on DataTables library
*
* The usage in html is:
*        <ep-data-grid ep-data-grid-on-init="ongridInit(factory)"></ep-data-grid>
*
* or with options:
*        <ep-data-grid ep-data-grid-pptions="gridOptions" ep-data-grid-on-init="ongridInit(factory)"></ep-data-grid>

The controller code must provide the options in active scope or set them using factory.setGridOptions(options):

    $scope.dataGridOptions = {
        gridFactory: null,               //after directive initialization will expose directive's factory of methods
        metadata: undefined,             //metadata for columns and combos
        allowSearchInput: true,          //do we allow search input
        allowFiltering: true,            //do we allow filtering
        retrieveDataOnCreate: true,      //should we call fnGetServerData upon creation
        startRowIndex: null,             //activate row with this index upon start (0 - first row, etc)
        startSearchValue: null           //some starting search value
        startSearchIndex: null           //starting search column index
        startSearchExactMatch: false     //is starting search an exact match
        ordering: true                   //is sorting allowed (by default true)
        orderColumn: null                //initial order column index or name or '$first' (first col)
        showEditIndicator: false         //show edit indicator (by default false)
        showToggleFilterButton: false    //show internal filter button (by default false)
        pageLength: 50                   //default page length (how many records in a page)
        tableHeight: null                //fixed table height (used only if fnOnCalcTableHeight is undefined)
        enableCellHighlight: true        //enable the highlighting of cell on cell click
        disableRecordInfo: false         //disable display of record info
        filterExpressions: null          //initial filter expressions
        enableSummaryRow: false          //enable summary row processing

        //static table options:
        staticMode: false                //is static datatable (by default false)
        dataSource: null                 //data source as json rows array

        //hierarchy child grid options:
        isChildGrid: false              //is it a child grid (by default false)
        childGridOptions:               //datagrid options for the child table

        //header and footer options:
        showConfigButton                //show the config button (by default false)
        showHeaderSection               //show the header section (by default false)
        showFooterSection               //show the footer section (by default false)
        headerSectionTemplate           //header section html template
        headerSectionTemplateUrl        //header section html template url
        headerSectionController         //header section controller function
        footerSectionTemplate           //footer section html template
        footerSectionTemplateUrl        //footer section html template url
        footerSectionController         //footer section controller function

    };

Through gridFactory the controller will have access to functions exposed by the directive (running in isolated scope).

The call back functions are:
    fnGetServerData(parameters) {} -- fetches actual data for display.
    fnOnTableInitComplete() - called after table initialized, after refresh, data fetched
    fnOnTableEditState(activeRecord)
    fnOnRenderGridCell(ret, type, row, meta, col, ret)
    fnUpdateRecordsInfo(scope.recordsInfo, plainTextInfo) -- custom display of record information
    fnOnCreatedRow(row, data)
    fnOnGridRowDoubleClick(row)
    fnOnCalcTableHeight(ret, tableBodyOffset)
    fnExpandCollapseChildGrid(e, row, scope)
    fnSetRowIndicator(row, scope)
    fnOnActivateRow(activeRecord, activeRow);
    fnShowProgressIndicator()
    //hierarchy child table events:
    fnOnSummaryUpdate() - called to update summary row for each column that has summary defined
    fnExpandCollapseChildGrid()
    fnSetRowIndicator()


Column Metadata Properties:
Column = {
    sTitle      - (string) column caption
    sDataType   - (string) column data type (string/int/bool/decimal/datetime)
    mData       - (int) the index in data array to which this column is bound
    bVisible    - (bool) (default = true) is column visible
    orderable   - (bool) (default = true) is column sortable
    width       - (int) column width pixels. ('' - ignored) - Examples: 100, 200, (in pexels)
    widthFactor - (decimal) column width factor if width not provided. (<=0 ignored) - Examples: 0.5, 2.0, etc
    canSelectCells - (bool) (default = false) column cells can be selected,
    sClass      - (string) add user class on the column
    align       - 'left'/'right'/'center'
    oFormat     - formatting object
    summarize   - (optional) summarize the column
    fnOnSummaryUpdate - (optional) summarization function if summary row is enabled.
}
==========================================================================================*/

angular.module('ep.datagrid').directive('epDataGrid', [
    '$timeout',
    '$compile',
    '$sce',
    '$log',
    '$window',
    '$rootScope',
    'epUtilsService',
    'epFeatureDetectionService',
    'epDataGridDirectiveFactory',
    'epDataGridService',
    function($timeout, $compile, $sce, $log, $window, $rootScope,
        epUtilsService, epFeatureDetectionService, epDataGridDirectiveFactory, epDataGridService) {
        var rowIndicator = 'fa fa-play';
        var editIndicator = 'fa fa-square';
        var checkedIndicator = 'fa-check-square-o';
        var uncheckedIndicator = 'fa-square-o';
        var editInProgressIndicator = 'fa fa-edit';
        var features = epFeatureDetectionService.getFeatures();

        function getNewState() {
            var state = {
                gridFactory: null,
                scope: null,
                tableElement: null,
                linkElement: null,
                dataTable: null,
                filterShowFlag: false,
                filterRow: null,
                filterEditors: null,
                filterExpressions: [],
                allowSearchInput: true,
                searchValue: '',
                recordsInfo: '',
                gridLoadPrms: {},
                dataRetrieveInProcess: false,
                metadata: undefined,
                ordering: true,  //is ordering-sorting allowed,
                activeRow: null,
                activeRecord: null,
                activeCell: null,
                pageLength: 50,
                tableHeight: null,
                staticMode: false,
                dataSource: null,
                isChildGrid: false,
                headerSection: '',
                footerSection: ''
            };
            return state;
        }

        // >>>>>---------------- Drill Through --------------------------------------->>>>>>

        $window.performDrillThrough = function(event) {
            /// <summary>
            ///   Fires the fnOnPerformDrillThrough callback action of the data grid, by sending the data of the clicked cell.
            ///   Param event: onclick event data.
            /// </summary>

            // Since this is an ordinary click event, we need to get the scope from the element
            var clickedElement = angular.element(event.target);
            var scope = clickedElement.scope();

            if (scope.options.fnOnPerformDrillThrough) {

                var cell = clickedElement.closest('td');
                var cellIndexInfo = scope.grApi().cell(cell).index();

                // The column index in cellIndexInfo does not correspond to the same one in the metadata object.
                // Let's find the correct one
                var columnIndex = -1;
                var columnMetadata;
                if (cellIndexInfo.column >= 0) {
                    _.any(scope.options.metadata.columns, function(column) {
                        // Substract the two hidden columns
                        if (column.mData === cellIndexInfo.column - 2) {
                            columnMetadata = column;
                            // This is the actual index that corresponds to the data record
                            columnIndex = columnMetadata.mData;
                        }
                    });
                }

                // We should not get here if the column is not drillable, but double check just in case
                if (columnMetadata && columnMetadata.sIsDrillable === 'True' && columnIndex >= 0) {

                    var row = scope.grGetRowNodeByIndex(cellIndexInfo.row);
                    var rowData = scope.state.dataTable.fnGetData(row);
                    var cellData = rowData[columnIndex];

                    // Fire the callback function
                    scope.options.fnOnPerformDrillThrough(
                        cellData,
                        rowData,
                        columnMetadata,
                        columnIndex,
                        cellIndexInfo.row);
                }
            }
        };

        function renderDrillThrough() {
            return '<i class="drill-icon" onclick="performDrillThrough(event);"></i>';
        }

        // <<<<<---------------- Drill Through ---------------------------------------<<<<<<

        // >>>>>----------------  Cell Rendering --------------------------------------->>>>>>

        $window.onExternalLinkClick = onExternalLinkClick;

        function onExternalLinkClick(link, event) {
            var $link = angular.element(link);
            var href = $link.attr('href');

            var onclick = function() {
                $window.open(href, '_blank');
            };

            switch (features.platform.app) {
                case 'NWJS':
                    onclick = function() {
                        var gui = require('nw.gui');
                        gui.Shell.openExternal(href);
                    };
                    break;
                case 'Cordova':
                    onclick = function() {
                        $window.open(href, '_system');
                    };
                    break;
            }
            if ($link.attr('target') === '_blank') {
                onclick();
                event.preventDefault();
            }
        }

        function renderBizDataPhone(data) {
            if (data && _.isString(data)) {
                return '<a class=\"fa fa-phone inline-link\" onclick="onExternalLinkClick(this, event)"' +
                    ' target="_blank" href=\"tel:' + data + '\">&nbsp;&nbsp;' + data + '</a>';
            }
            return data;
        }

        function renderBizDataAddress(data) {
            if (data && _.isString(data)) {
                return '<a class=\"fa fa-map-marker inline-link\" onclick="onExternalLinkClick(this, event)"' +
                    ' target="_blank" href=\"http://maps.google.com/maps?q=' + data + '\">&nbsp;&nbsp;' + data + '</a>';
            }
            return data;
        }

        function renderBizDataEmail(data) {
            if (data && _.isString(data)) {
                return '<a class=\"fa fa-envelope inline-link\" onclick="onExternalLinkClick(this, event)"' +
                    ' target="_blank" href=\"mailto:' + data + '\">&nbsp;&nbsp;' + data + '</a>';
            }
            return data;
        }

        function renderBizDataUrl(data, row, col) {
            if (data && _.isString(data)) {
                var href = data;
                if (col.userColumnDef.stringFormat) {
                    href = epUtilsService.strFormat(col.userColumnDef.stringFormat, href);
                }
                //if string does not start with 'http' or 'https' then append
                var v1 = data.trim().toLowerCase();
                if (v1.substr(0, 4) !== 'http') {
                    href = 'http://' + v1;
                }
                if (col.userColumnDef.urlLabel) {
                    data = col.userColumnDef.urlLabel;
                }
                return '<a class=\"fa fa-globe inline-link\" target="_blank" href=\"' + href +
                    '\">&nbsp;&nbsp;' + data + '</a>';
            }
            return data;
        }

        function renderDateFormat(data, row, col) {
            if (data === undefined) {
                return null;
            }
            var format = col.userColumnDef.oFormat.FormatString || 'M/d/yyyy';
            if (format && data) {
                var wrappedDate = moment(data);
                if (wrappedDate.isValid()) {
                    format = format.toUpperCase().replace('HH:MM', 'HH:mm');
                    return wrappedDate.format(format);
                }
            }
            return data;
        }

        function renderBoolean(data, row, col, isGroup) {
            var format = col.userColumnDef.sFormatString;
            if (format === 'yes-no') {
                var ret = data ? 'yes' : 'no';
                return '<span>' + ret + '</span>';
            }
            var sColIndex = col.userColumnDef.bUpdatable ? 'mdata="' + col.mData + '"' : '';
            var sCheckedClass = data ? checkedIndicator : uncheckedIndicator;
            if (isGroup) {
                return '<span class="checkbox-display fa fa-lg ' + sCheckedClass + '"' + sColIndex + '></span>';
            }
            return '<div class="inline checkbox-display-container"><span class="ep-center-item checkbox-display' +
                ' fa fa-lg ' + sCheckedClass + '"' + sColIndex + '></span></div>';
        }

        function renderCurrency(data, row, col, isGroup) {
            var val = parseFloat(data);
            if (!isNaN(val)) {
                var colDef = col.userColumnDef;
                if (colDef.oFormat && colDef.oFormat.NumberFormatInfo &&
                    colDef.oFormat.NumberFormatInfo.NumeralJSFormat) {
                    data = numeral(val).format(colDef.oFormat.NumberFormatInfo.NumeralJSFormat);
                } else {
                    var numDecimalDigits = (colDef.oFormat && colDef.oFormat.NumberFormatInfo) ?
                        colDef.oFormat.NumberFormatInfo.CurrencyDecimalDigits : 2;
                    data = val.toFixed(numDecimalDigits);
                }
            }
            return isGroup ? '<span>' + data + '</span>' : '<div class="right-align"><span>' + data + '</span></div>';
        }

        function renderDecimal(data, row, col, isGroup) {
            data = formatDecimal(data, col);
            return isGroup ? '<span>' + data + '</span>' : '<div class="right-align"><span>' + data + '</span></div>';
        }

        function renderInteger(data, row, col, isGroup) {
            data = formatInt(data, col);
            return isGroup ? '<span>' + data + '</span>' : '<div class="right-align"><span>' + data + '</span></div>';
        }

        function renderRowIndicator() {
            return "<span><i class='row-indicator text-primary'></i></span>";
        }

        function renderEditIndicator() {
            return "<span><i class='edit-indicator text-danger'></i></span>";
        }

        function renderSelectCell(data, row, col, isGroup, settings, scope) {
            var colDef = col.userColumnDef;
            var displayValue = scope.state.metadata.combos[colDef.sBaseType] ?
                scope.state.metadata.combos[colDef.sBaseType][data] : '';
            return (displayValue !== undefined) ? displayValue : data;
        }

        function renderGroup(data, row, col, isGroup, settings) {
            var ret = '';
            var colDef = col.userColumnDef;
            var skipEmpty = (colDef.groupWrap && (data === undefined || data === null ||
                (angular.isString(data) && !data)));
            if (!skipEmpty) {
                if (colDef.sRenderSubType && renderers[colDef.sRenderSubType]) {
                    var rd = renderers[colDef.sRenderSubType](data, row, col, true);
                    if (rd === null || rd === undefined) {
                        rd = '';
                    }
                    ret += rd;
                } else if (data !== null && data !== undefined) {
                    ret += '<span>' + data + '</span>';
                } else {
                    ret += '<span></span>';
                }
            }

            angular.forEach(colDef.groupMembers, function(dc) {
                var colMember = _.find(settings.aoColumns, function(c) {
                    return c.mData === dc;
                });
                var dd = row[dc];
                var colMemberDef = colMember.userColumnDef;
                skipEmpty = (colMemberDef.groupWrap && (dd === undefined ||
                    dd === null || (angular.isString(dd) && !dd)));
                if (!skipEmpty) {
                    if (ret) {
                        ret += '<br/>';
                    }
                    if (colMember && colMemberDef.sRenderType && renderers[colMemberDef.sRenderType]) {
                        var rd = renderers[colMemberDef.sRenderType](dd, row, colMember, true);
                        if (rd === null || rd === undefined) {
                            rd = '';
                        }
                        ret += rd;
                    } else if (dd !== null && dd !== undefined) {
                        ret += '<span>' + dd + '</span>';
                    } else {
                        ret += '<span></span>';
                    }
                }
            });
            return '<div>' + ret + '</div>';
        }

        var renderers = {
            'group': renderGroup,
            'bool': renderBoolean,
            'date': renderDateFormat,
            'phone': renderBizDataPhone,
            'address': renderBizDataAddress,
            'email': renderBizDataEmail,
            'url': renderBizDataUrl,
            'currency': renderCurrency,
            'integer': renderInteger,
            'decimal': renderDecimal,
            'select': renderSelectCell,
            'rowIndicator': renderRowIndicator,
            'editIndicator': renderEditIndicator
        };

        var rendererDrillSupport = {
            'group': false,
            'bool': false,
            'date': true,
            'phone': true,
            'address': true,
            'email': true,
            'url': true,
            'currency': true,
            'integer': true,
            'decimal': true,
            'select': false,
            'rowIndicator': false,
            'editIndicator': false
        };

        function renderGridCell(scope, data, type, row, meta) {
            data = (data !== null) ? data : '';
            var ret = data;

            var col = meta.settings.aoColumns[meta.col];

            if (col && col.userColumnDef) {
                var colDef = col.userColumnDef;

                if (renderers[colDef.sRenderType]) {
                    ret = renderers[colDef.sRenderType](data, row, col, false, meta.settings, scope);
                }

                // Render the drill through only for drillable columns with data
                if (colDef.sIsDrillable === 'True' && data &&  data !== '') {
                    // And without a renderer or with a supported renderer
                    if (typeof colDef.sRenderType === 'undefined' || rendererDrillSupport[colDef.sRenderType]) {
                        ret = renderDrillThrough() + ret;
                   }
                }
            }

            if (scope.options.fnOnRenderGridCell) {
                ret = scope.options.fnOnRenderGridCell(ret, type, row, meta, col, ret);
            }

            return ret;
        }

        // <<<<----------------  Cell Rendering ---------------------------------------<<<<<<

        function formatDecimal(data, col) {
            var ret = data;
            var val = parseFloat(ret);
            if (!isNaN(val)) {
                var colDef = col.userColumnDef;
                var hasNumFmt = colDef.oFormat && colDef.oFormat.NumberFormatInfo;
                if (hasNumFmt && colDef.oFormat.NumberFormatInfo.NumeralJSFormat) {
                    ret = numeral(val).format(colDef.oFormat.NumberFormatInfo.NumeralJSFormat);
                } else {
                    var numDecimalDigits = (hasNumFmt) ?
                        colDef.oFormat.NumberFormatInfo.NumberDecimalDigits : 2;
                    ret = val.toFixed(numDecimalDigits);
                }

                if (!isNaN(ret) && hasNumFmt && colDef.oFormat.NumberFormatInfo.RemoveTrailingZeros) {
                    //Following line removes trailing zeros
                    ret = parseFloat(ret);
                }
            }
            return ret;
        }

        function formatInt(data) {
            var val = parseInt(data);
            if (!isNaN(val)) {
                data = val;
            }
            return data;
        }

        function destroyGrid(scope) {
            if (scope.state && scope.state.$table) {
                scope.state.$table.off('click').off('dblclick');
            }

            var dt = scope.grApi();
            if (dt) {
                try {
                    dt.destroy(true);
                } catch (e) {
                    $log.error(e, 'failed to destroy the grid - exception from DataTables');
                }
            }
            if (scope.state && scope.state.tableElement.length) {
                scope.state.tableElement.empty();
            }
        }

        function getDataFromServer(scope, searchTerm, sortColIdx, sortDir, append, showIndicator, forceRefresh) {
            if (scope.state.staticMode === true) { return; }

            if (scope.state.dataRetrieveInProcess === true || !scope.state.dataTable) {
                return;
            }

            scope.state.dataRetrieveInProcess = true;

            var viewState = scope.state; //for compatability with grid service source code
            //var metadata = scope.options.metadata;
            var prms = viewState.gridLoadPrms;

            if (searchTerm !== prms.previousPrms.searchTerm || forceRefresh) {
                prms.iPageNumber = 1;
            }

            prms.previousPrms.searchTerm = searchTerm;
            prms.previousPrms.sortColIdx = sortColIdx;
            prms.previousPrms.sortDir = sortDir;

            prms.previousCall = {
                append: append,
                showIndicator: showIndicator,
                forceRefresh: forceRefresh
            };

            var gridSettings = scope.state.dataTable.fnSettings();

            if (!append || forceRefresh) {
                prms.iDisplayStart = 0;
                prms.iDisplayLength = scope.state.pageLength * prms.iPageNumber;
                prms.iLoadedRecordLength = 0;
                prms.iTotalRecords = 0;
            }

            if (showIndicator) {
                scope.showProgressIndicator();
            }

            prms.previousPrms.iDisplayStart = prms.iDisplayStart;
            prms.previousPrms.iDisplayLength = prms.iDisplayLength;

            //These are passed to the server must be in this format
            var gridPrms = {
                iDisplayStart: prms.iDisplayStart,
                iDisplayLength: prms.iDisplayLength,
                sSearch: searchTerm,
                iSortCol: sortColIdx,
                sSortDir: sortDir,
                sEcho: '1',
                bFilterOn: scope.state.filterShowFlag,
                sFilterCriteria: scope.state.filterExpressions,
                bForceRefresh: forceRefresh || false,
                childGridId: (scope.state.metadata && scope.state.metadata.gridId) ? scope.state.metadata.gridId : '',
                childGridArgValues: scope.options.childGridArgValues,
                parentKey: scope.options.parentKey
            };

            function afterDataReturn(result) {
                scope.state.dataRetrieveInProcess = false;

                scope.findElement('#loadMoreDownRow').addClass('disabled').off('click');

                if (result && result.Success && scope.state.dataTable) {
                    if (showIndicator) {
                        scope.hideProgressIndicator();
                    }
                    gridSettings = scope.state.dataTable.fnSettings();

                    var loadedRecs = (result && result.aaData) ? result.aaData.length : 0;
                    if (!append || forceRefresh) {
                        prms.iLoadedRecordLength = loadedRecs;
                        scope.state.dataTable.fnClearTable();
                    } else {
                        prms.iLoadedRecordLength += loadedRecs;
                    }

                    gridSettings._iRecordsTotal = result ? result.iTotalRecords : 0;
                    prms.iTotalRecords = gridSettings._iRecordsDisplay = result ? result.iTotalDisplayRecords : 0;
                    gridSettings._iDisplayLength = prms.iLoadedRecordLength;

                    viewState.isLoadingMore = true;
                    viewState.isDataLoaded = result.iTotalDisplayRecords > 0;

                    viewState.totalViewRecords = result ? result.iTotalDisplayRecords : 0;
                    viewState.hasRecords = viewState.totalViewRecords > 0;
                    viewState.retrievingData = false;
                    var scroller = scope.findElement('.dataTables_scrollBody');
                    var scrollPos = scroller.scrollTop();
                    if (loadedRecs) {
                        scope.state.dataTable.fnAddData(result.aaData);
                    }

                    scroller.scrollTop(scrollPos);
                    prms.iDisplayStart += result.aaData.length;
                    prms.iDisplayStart = Math.min(result.iTotalDisplayRecords, prms.iDisplayStart);

                    var loadMoreLink;
                    viewState.configureGridActions = function() {
                        viewState.atTheEnd = (result.iTotalDisplayRecords - prms.iLoadedRecordLength) === 0;

                        if (!viewState.atTheEnd) {
                            // Set up the 'load more' link
                            loadMoreLink = scope.findElement('#loadMoreDownRow');
                            if (!loadMoreLink.length) {
                                // TODO: More oportunity for Angular templates
                                var loadingText = '<table width="100%"><td><hr /></td><td class="load-more-cell">' +
                                    '<span class="load-more-indicator fa fa-arrow-down"></span>  Load More  ' +
                                    '<span class="load-more-indicator fa fa-arrow-down"></span></td><td><hr />' +
                                    '</td></table>';
                                loadMoreLink = $("<tr class='loading-row' id='loadMoreDownRow'><td colspan='" +
                                    viewState.visColCount + "'><div class='load-more'><a>" + loadingText +
                                    '</a></div></td></tr>');
                                scope.state.dataTable.append(loadMoreLink);
                            }
                            loadMoreLink.off('click')
                                .removeClass('disabled')
                                .on('click', function() {
                                    prms.iPageNumber++;
                                    scope.findElement('.load-more-cell')
                                        .empty()
                                        .addClass('fa fa-spinner fa-2x fa-pulse');

                                    var pPrms = viewState.gridLoadPrms.previousPrms;
                                    getDataFromServer(scope, pPrms.searchTerm, pPrms.sortColIdx, pPrms.sortDir,
                                        true, false, false);
                                });
                            //$timeout(function() {
                            //    var visGridWidth = scope.findElement('#tblGridView_info').width();
                            //    scope.findElement('.load-more').width(visGridWidth);
                            //});
                        }

                        onTableInitComplete(scope);
                    };

                    viewState.configureGridActions();
                }
                if (showIndicator) {
                    scope.hideProgressIndicator();
                }
            }

            $timeout(function() {
                //TO DO!!!!
                //scope.showProgress = (scope.findElement('.load-more-cell.fa-spinner').length === 0);
            });

            var returnData = scope.options.fnGetServerData(gridPrms);
            if (returnData.then !== undefined) {
                returnData.then(afterDataReturn);
            } else {
                afterDataReturn(returnData);
            }
        }

        function setRenderingType(scope, col) {
            if (!col.sRenderType) {
                if (col.sBizType) {
                    if (col.sBizType === 'phone' || col.sBizType === 'address' || col.sBizType === 'email' ||
                        col.sBizType === 'url' || col.sBizType === 'currency') {
                        col.sRenderType = col.sBizType;
                    }
                }
                var tp = col.sType;
                if (tp === 'date') {
                    col.sRenderType = 'date';
                } else if (tp === 'bool') {
                    col.sRenderType = 'bool';
                }
                if (col.sControlType && col.sControlType.toLowerCase() === 'epicombo') {
                    col.sRenderType = 'select';
                }
                if (tp === 'integer') {
                    col.sRenderType = 'integer';
                }
                if (tp === 'decimal') {
                    col.sRenderType = 'decimal';
                }
                if (col.groupMembers && col.sRenderType !== 'group') {
                    col.sRenderSubType = col.sRenderType;
                    col.sRenderType = 'group';
                }
            }
            col.mRender = scope.renderGridCell;
        }

        function createGridColumns(scope, metadata, insertBefore) {
            var columns = [];
            var iIndex = 0;

            var fnAddColumn = function(c) {

                if (c.oFormat === undefined) {
                    c.oFormat = {};
                }

                if (c.sDataType === undefined) {
                    c.sDataType = 'System.String';
                }

                if (!c.sType) {
                    c.sType = epDataGridService.resolveDataType(c.sDataType);
                }
                setRenderingType(scope, c);

                var bVisible = ((c.bVisible === undefined || c.bVisible === true) && (c.bHideInGrid !== true));

                var orderable = false;
                if (scope.state.ordering) {
                    if (c.orderable === undefined) {
                        orderable = (c.bSortable === undefined) ? true : c.bSortable;
                    } else {
                        orderable = c.orderable;
                    }
                }

                //determine optimized column width
                var sWidth = '120px';
                if (c.sName === 'editIndicator' || c.sName === 'rowIndicator') {
                    sWidth = '';
                } else if (c.width && angular.isNumber(c.width)) {
                    sWidth = c.width + 'px';
                } else if (c.widthFactor && angular.isNumber(c.widthFactor)) {
                    sWidth = parseInt(120 * parseFloat(c.widthFactor)) + 'px';
                } else if (c.oFormat.MaxLength) {
                    sWidth = Math.max(Math.min(c.oFormat.MaxLength * 3, 400), 120) + 'px';
                }

                var sClass = (c.sClass ? c.sClass + ' ' : '');
                sClass += 'data-col-' + iIndex;

                if (c.canSelectCells === true) {
                    scope.state.canSelectCells = true;
                    sClass += ' selectable';
                }
                if (c.align && (c.align === 'right' || c.align === 'left' || c.align === 'center')) {
                    sClass += ' dt-' + c.align;
                }

                var title = c.sTitle;
                if (c.sIsDrillable === 'True') {
                    title = '<i class="drill-header"></i>' + title;
                    sClass += ' drill-cell';
                }

                var column = {
                    iIndex: iIndex,
                    targets: [iIndex],
                    name: c.sName,
                    title: title || '',
                    visible: bVisible,
                    className: sClass,
                    data: (c.mData === undefined) ? -1 : c.mData,
                    orderable: orderable,
                    render: scope.renderGridCell,
                    userWidth: sWidth,
                    userColumnDef: c
                };
                columns.push(column);
                iIndex++;
            };

            angular.forEach(insertBefore, function(c) {
                fnAddColumn(c);
            });
            angular.forEach(metadata.columns, function(c) {
                fnAddColumn(c);
            });
            return columns;
        }

        function createGrid(scope) {

            var metadata = scope.options.metadata;

            var insertBeforeCols = [
                {
                    sName: 'rowIndicator',
                    sTitle: '',
                    bVisible: true,
                    sClass: 'fixed i-row',
                    orderable: false,
                    sRenderType: 'rowIndicator',
                    align: 'center'
                },
                {
                    sName: 'editIndicator',
                    sTitle: '',
                    bVisible: !!scope.options.showEditIndicator,
                    sClass: 'fixed i-edit',
                    orderable: false,
                    sRenderType: 'editIndicator',
                    align: 'center'
                }
            ];

            scope.state.filterEditors = null;
            scope.state.gridColumns = createGridColumns(scope, metadata, insertBeforeCols);

            scope.state.gridLoadPrms = {
                iPageNumber: 1,
                iDisplayStart: 0,
                iDisplayLength: scope.state.pageLength,
                iLoadedRecordLength: 0,
                iTotalRecords: 0,
                previousPrms: {
                    sortColIdx: -1,
                    sortDir: '',
                    searchTerm: '',
                    iDisplayStart: 0,
                    iDisplayLength: scope.state.pageLength
                }
            };

            if (scope.options.enableSummaryRow) {
                var tFoot = scope.findElement('.ep-dg-grid-table.table');
                angular.element(tFoot).append('<tfoot><th></th></tfoot>');
                //scope.state.tFootElement = scope.findElement('.ep-dg-grid-table tfoot');
            }

            if (scope.state.staticMode === true) {
                var order = [];
                if (scope.state.ordering) {
                    var col = scope.grGetMetaColumn(scope.options.orderColumn);
                    if (col) {
                        order = [[col.iIndex, 'asc']];
                    } else if (scope.options.orderColumn === '$first') {
                        var icol = (scope.options.showEditIndicator === true) ? 2 : 1;
                        order = [[icol, 'asc']];
                    }
                }
                scope.state.options = {
                    'data': scope.state.dataSource,
                    'paging': true,
                    'ordering': scope.state.ordering,
                    'bDestroy': true,
                    'bServerSide': false,
                    'order': order,
                    'bProcessing': false,
                    'pageLength': scope.state.pageLength,
                    'bAutoWidth': true,
                    'columns': scope.state.gridColumns,
                    'sScrollY': scope.calcTableHeight(), // + 'px',
                    'sScrollX': '100%',
                    'sScrollXInner': (scope.options.isChildGrid) ? '90%' : '100%',
                    'sDom': 'rtip',
                    'infoCallback': function(settings, start, end, max, total, pre) {
                        return !scope.options.disableRecordInfo ?
                            infoCallback(scope, settings, start, end, max, total, pre) : '';
                    },
                    'createdRow': function(row, data) {
                        if (scope.options.fnOnCreatedRow) {
                            scope.options.fnOnCreatedRow(row, data);
                        }
                    },
                    'initComplete': function() {
                        $timeout(function() {
                            onTableInitComplete(scope);
                        });
                    },
                    'fnFooterCallback': function(nRow) {
                        footerCallback(scope, nRow);
                    }
                };
            } else {
                scope.state.options = {
                    'bDestroy': true,
                    'bServerSide': false,
                    'ordering': false, //we are doing our own ordering...
                    'order': [],
                    'bProcessing': false,
                    'pageLength': scope.state.pageLength,
                    'bAutoWidth': true,
                    'columns': scope.state.gridColumns,
                    'sScrollY': scope.calcTableHeight(), // + 'px',
                    'sScrollX': '100%',
                    'sScrollXInner': (scope.options.isChildGrid) ? '90%' : '100%',
                    'scrollCollapse': false,
                    'sDom': 'rti',
                    'bDeferRender': true,
                    'infoCallback': function(settings, start, end, max, total, pre) {
                        return !scope.options.disableRecordInfo ?
                            infoCallback(scope, settings, start, end, max, total, pre) : '';
                    },
                    'createdRow': function(row, data) {
                        if (scope.options.fnOnCreatedRow) {
                            scope.options.fnOnCreatedRow(row, data);
                        }
                    },
                    'fnFooterCallback': function(nRow) {
                        footerCallback(scope, nRow);
                    }
                };
            }

            scope.state.dataTable = $(scope.state.tableElement).dataTable(scope.state.options);

            $timeout(function() {
                angular.forEach(scope.state.gridColumns, function(c) {
                    if (c.userWidth) {
                        scope.findElement('.data-col-' + c.iIndex).css('min-width', c.userWidth)
                            .css('width', c.userWidth);
                    }
                });

                scope.state.visColCount = _.filter(scope.state.gridColumns, function(c) { return c.visible; }).length;

                scope.setInitialFilters();

                if (scope.state.staticMode !== true) {
                    //set the initial sorting information for the server
                    var sSortDir = 'asc';
                    var iSortCol = -1;
                    if (scope.state.ordering) {
                        //determine initial ordering column
                        var col = null;
                        if (scope.options.orderColumn === '$first') {
                            var fi = (scope.options.showEditIndicator === true) ? 2 : 1;
                            col = scope.grFindColumnByCellIndex(fi);

                        } else {
                            col = scope.grGetColumn(scope.options.orderColumn);
                        }
                        if (col) {
                            iSortCol = col.mData;
                        }
                    }
                    getDataFromServer(scope, '', iSortCol, sSortDir, false, false, false);
                }
                scope.resizeTable(false);

                // bind the click event to activate the row, or enable editors if already activated
                scope.state.$table.on('click', scope.tableCellClick);
                scope.state.$table.on('dblclick', scope.tableCellDblClick);

                if (epFeatureDetectionService.hasTouchEvents()) {
                    //disable double-tap to zoom into table when double click is active
                    scope.state.$table.css('touch-action', 'manipulation');
                }

                if (scope.state.allowSearchInput) {
                    //Configure search events

                    var lastAppliedSearchTerm = '';
                    if (scope.options.startSearchValue) {
                        scope.state.searchValue = scope.options.startSearchValue;
                    }

                    scope.applySearch = function(searchTerm) {
                        if (lastAppliedSearchTerm !== searchTerm && (searchTerm || lastAppliedSearchTerm)) {
                            lastAppliedSearchTerm = searchTerm;
                            if (scope.state.staticMode === true) {
                                scope.grApi().search(scope.state.searchValue).draw();
                            } else {
                                getDataFromServer(scope, scope.state.searchValue, 0, 'asc', false, true, false);
                            }
                        }
                    };

                    // Track the initial value of the editor - not sure if this is still needed?
                    scope.findElement('#searchInput').each(function() {
                        this.initVal = this.value;
                    });

                    scope.fnOnSearchFocus = function() {
                        if (scope.searchInputClass) {
                            scope.searchInputClass = '';
                            scope.state.searchValue = '';
                        }
                    };

                    scope.fnOnSearchBlur = function() {
                        var val = scope.state.searchValue;
                        if (val === '') {
                            scope.searchInputClass = 'search_init';
                            scope.state.searchValue = (scope.options.startSearchValue) ?
                                '' : scope.state.searchInitVal;
                        } else if (scope.options.startSearchValue && !scope.startSearchBlur &&
                            scope.options.startSearchValue === val) {
                            //we dont want to search on first blur
                            scope.startSearchBlur = true;
                            return;
                        }

                        $timeout(function() {
                            scope.applySearch(scope.state.searchValue);
                        }, 200);

                        scope.applySearch(scope.state.searchValue);
                    };
                    scope.clearSearch = function() {
                        scope.applySearch(scope.state.searchValue = '');
                    };

                    scope.fnOnSearchKeyUp = function(ev) {
                        var currentTerm = scope.state.searchValue;
                        if (ev.keyCode === 13 || currentTerm === '') {
                            scope.applySearch(currentTerm);
                        }
                    };

                    scope.fnOnSearchChange = function() {
                        var currentTerm = scope.state.searchValue;
                        if (currentTerm === '') {
                            scope.applySearch(currentTerm);
                        }
                    };
                }
            });
        }

        function footerCallback(scope, nRow) {
            if (scope.options.enableSummaryRow) {
                if (!scope.state.summaryRow || !scope.state.summaryRow.theElement) {
                    angular.element(nRow).empty().append(
                        $compile('<ep-data-grid-summary-row></ep-data-grid-summary-row>')(scope));
                }
                $timeout(function() {
                    scope.updateSummaryRow();
                    scope.resizeTable(false);
                });
            }
        }

        function infoCallback(scope, settings, start, end, max, total, pre) {
            var ret = '';
            if (scope.state.staticMode === true) {
                ret = scope.recordsInfo = pre;
            } else {
                var iLoaded = settings._iDisplayLength;
                var iTotal = settings._iRecordsTotal;
                if (total > 0 && (iLoaded > scope.viewState.gridLoadPrms.iLoadedRecordLength)) {
                    iTotal += (iLoaded - scope.viewState.gridLoadPrms.iLoadedRecordLength);
                }
                var startNum = total ? 1 : 0;
                ret = scope.recordsInfo = epUtilsService.strFormat('Showing {0}records {1} to {2} of {3}',
                    (scope.state.gridLoadPrms.previousPrms.searchTerm ? '<strong>filtered</strong> ' : ''),
                    startNum, iLoaded, iTotal);
            }
            if (scope.options.fnUpdateRecordsInfo) {
                scope.options.fnUpdateRecordsInfo(scope.recordsInfo);
                ret = '';
            }
            return ret;
        }

        function onTableInitComplete(scope) {
            var table = scope.grApi();
            if (scope.state.ordering && scope.state.staticMode !== true) {
                var cols = scope.grColumns();
                table.columns().eq(0).each(function(index) {
                    var column = table.column(index);
                    var col = _.find(cols, function(cc) {
                        return cc.idx === column.index();
                    });
                    if (col && col.orderable) {
                        setHeader(scope, column.header(), col);
                    }
                });
            }

            //TO DO: currently config button only works with search enabled
            //if (scope.options.showConfigButton === true && !scope.state.allowSearchInput) {
            //    var tHead = table.column(0).header();
            //    if ($(tHead).find('ep-dropdown-btn').length === 0) {
            //        angular.element(tHead).append(
            //            $compile('<ep-dropdown-btn menu="configmenu" icon=""></ep-dropdown-btn>')(scope));
            //    }
            //}

            if (scope.options.showToggleFilterButton) {
                var colIdx = scope.grGetCellIndexByColumn('rowIndicator');
                if (colIdx >= 0) {
                    var tHead = table.column(colIdx).header();
                    if ($(tHead).find('.fa-filter').length === 0) {
                        angular.element(tHead).append(
                            $compile('<ep-data-grid-filter-toggle></ep-data-grid-filter-toggle>')(scope));
                    }
                }
            }

            $timeout(function() {
                if (scope.state.dataTable) {
                    scope.state.dataTable.fnAdjustColumnSizing(false);
                }
            }, 200);

            if (scope.state.allowSearchInput) {
                var $body = scope.state.linkElement.closest('.modal-body');
                if ($body.length) {
                    var gs = scope.findElement('.ep-dg-grid-search');
                    gs.width($body.width() - 20);
                }
            }

            var startRowIndex = -1;
            if (scope.options.startRowIndex || scope.options.startRowIndex === 0) {
                startRowIndex = scope.options.startRowIndex;
            } else if (scope.state.allowSearchInput && scope.options.startSearchValue &&
                !scope.state.startSearchCompleted && scope.options.startSearchIndex >= 0) {
                scope.state.startSearchCompleted = true; //search only on initial load

                var searchColIndex = scope.grGetCellIndexByColumn(scope.options.startSearchIndex);
                if (searchColIndex !== -1) {
                    var search = scope.options.startSearchValue.toString().toLowerCase();
                    var rIdx = _.find(table.rows().eq(0), function(rowIdx) {
                        var d = table.cell(rowIdx, searchColIndex).data();

                        if (scope.options.startSearchExactMatch) {
                            if (d === scope.options.startSearchValue) {
                                return true;
                            }
                            if (d || d === 0) {
                                return (d.toString().toLowerCase() === search);
                            }
                            return d === scope.options.startSearchValue;
                        }
                        if (d || d === 0) {
                            return (d.toString().toLowerCase().indexOf(search) >= 0);
                        }
                        return d === scope.options.startSearchValue;

                    });
                    if (rIdx || rIdx === 0) {
                        startRowIndex = rIdx;
                    }
                }
            }

            scope.state.$table.removeClass('table-hover');

            if (scope.state.allowSearchInput) {
                $timeout(function() {
                    scope.findElement('.ep-dg-search-input').focus();
                });
            }

            if (scope.options.fnOnTableInitComplete) {
                scope.options.fnOnTableInitComplete();
            }

            //If search row was enabled it must be set
            if (startRowIndex > -1) {
                if (!scope.activateNthRow(startRowIndex, true)) {
                    startRowIndex = -1;
                }
            } else if (!scope.state.activeRow) {
                //if active row has not been defined (by user event) then set it
                scope.activateFirstRow();
            }
        }

        function setHeader(scope, hdr, col) {
            var state = scope.state;

            var $hdr = $(hdr);
            $hdr.removeClass('sorting_disabled').addClass('sorting');
            $hdr.off('click');
            $hdr.on('click', function() {
                var dir = $hdr.hasClass('sorting_asc') ? 'desc' : 'asc';
                getDataFromServer(scope, state.gridLoadPrms.previousPrms.searchTerm, col.mData, dir,
                    false, true, false);
            });

            if (col.mData === state.gridLoadPrms.previousPrms.sortColIdx) {
                //remove sorting from all headers and then add new sorting
                scope.findElement('th').removeClass('sorting_desc').removeClass('sorting_asc');
                var dir = state.gridLoadPrms.previousPrms.sortDir || 'asc';
                $hdr.addClass('sorting_' + dir);
            }
        }

        function getBoolOption(opt, dflt) {
            return (opt === undefined || (opt !== true && opt !== false)) ? dflt : opt;
        }

        function linkDirective(scope, element) {
            scope.state = getNewState();
            scope.state.gridFactory = new epDataGridDirectiveFactory(scope);

            scope.state.userGridId = ((scope.epDataGridOptions) ? scope.epDataGridOptions.dataTableId : '') || '';
            scope.state.dataGridId = scope.state.gridFactory.id;

            scope.options = {};
            scope.state.scope = scope;
            scope.state.linkElement = element;

            scope.state.tableElement = element.find('.ep-dg-grid-table:first-child');

            scope.state.$table = angular.element(scope.state.tableElement);
            // We need to set the table id property explicitly instead of waiting for it to get
            // set as part of the compilation process because the datatables library gets confused
            // by identical ids otherwise.
            scope.state.$table.attr('id', 'tbl_' + scope.state.dataGridId);
            scope.viewState = scope.state;

            scope.$on('$destroy', scope.onScopeDestroy);

            scope.setGridOptions = function(options) {
                scope.options = options;
                scope.options.gridFactory = scope.state.gridFactory;
                scope.state.userGridId = options.dataTableId || scope.state.userGridId;
                scope.state.isChildGrid = (options.isChildGrid === true);
                scope.state.ordering = (scope.options.ordering === undefined) ?
                    scope.state.ordering : scope.options.ordering;

                scope.state.allowSearchInput = (scope.options.allowSearchInput === undefined) ?
                    scope.state.allowSearchInput : scope.options.allowSearchInput;

                if (options.allowFiltering !== false) {
                    if (options.filterExpressions) {
                        scope.state.filterExpressions = options.filterExpressions;
                    }
                }

                scope.state.staticMode = (scope.options.staticMode === true);
                scope.state.dataSource = scope.options.dataSource;

                if (scope.options.pageLength && angular.isNumber(scope.options.pageLength)) {
                    scope.state.pageLength = scope.options.pageLength;
                }
                if (scope.options.tableHeight && angular.isNumber(scope.options.tableHeight)) {
                    scope.state.tableHeight = scope.options.tableHeight;
                }
                if (options.metadata !== undefined && !angular.equals(options.metadata, scope.state.metadata)) {
                    scope.state.metadata = options.metadata;
                    if (!scope.options.createGridByFactoryOnly) {
                        createGrid(scope);
                    }
                }
                if (options.showHeaderSection) {
                    if (options.headerSectionTemplate) {
                        var tx1 = options.headerSectionTemplate;
                        scope.state.headerSectionTemplate = angular.isString(tx1) ? $sce.trustAsHtml(tx1) : tx1;
                    } else if (options.headerSectionTemplateUrl) {
                        scope.state.headerSectionTemplateUrl = options.headerSectionTemplateUrl;
                    }
                }
                if (options.showFooterSection) {
                    if (options.footerSectionTemplate) {
                        var tx2 = options.footerSectionTemplate;
                        scope.state.footerSectionTemplate = angular.isString(tx2) ? $sce.trustAsHtml(tx2) : tx2;
                    } else if (options.footerSectionTemplateUrl) {
                        scope.state.footerSectionTemplateUrl = options.footerSectionTemplateUrl;
                    }
                }

                var showHeaderSection = getBoolOption(options.showHeaderSection, false);
                var showFooterSection = getBoolOption(options.showFooterSection, false);
                scope.configmenu = [
                {
                    caption: 'Filter',
                    checked: false,
                    enabled: scope.options.allowFiltering,
                    action: function() {
                        scope.toggleFilter();
                    }
                }, {
                    caption: 'Header',
                    checked: options.showHeaderSection,
                    visible: showHeaderSection,
                    action: function() {
                        scope.options.showHeaderSection = !scope.options.showHeaderSection;
                        scope.resizeTable(false);
                    }
                }, {
                    caption: 'Footer',
                    checked: options.showFooterSection,
                    visible: showFooterSection,
                    action: function() {
                        scope.options.showFooterSection = !scope.options.showFooterSection;
                        scope.resizeTable(false);
                    }
                }, {
                    caption: 'Summary',
                    checked: options.enableSummaryRow,
                    visible: (options.enableSummaryRow === true),
                    action: function() {
                        if (scope.options.enableSummaryRow) {
                            scope.state.displaySummaryRow = !getBoolOption(scope.state.displaySummaryRow, true);
                            var summaryRow = scope.grApi().table().footer();
                            if (scope.state.displaySummaryRow) {
                                $(summaryRow).show();
                            } else {
                                $(summaryRow).hide();
                            }
                            scope.resizeTable(false);
                        }
                    }
                }
                ];

                if (showHeaderSection) {
                    if (options.headerSectionController) {
                        scope.headerSectionController = options.headerSectionController;
                    } else {
                        scope.headerSectionController = function() { };
                    }
                }
                if (showFooterSection) {
                    if (options.footerSectionController) {
                        scope.footerSectionController = options.footerSectionController;
                    } else {
                        scope.footerSectionController = function() { };
                    }
                }
            };

            scope.onScopeDestroy = function() {
                if (scope.shellSizeChangeEvent) {
                    scope.shellSizeChangeEvent();
                }
            };

            scope.createGrid = function() {
                if (scope.state.dataTable) {
                    destroyGrid(scope);
                    scope.state.dataTable = null;

                    if (scope.state.$table.length) {
                        //grid is destroyed. Now recreate table element and remove old one
                        var clonedTable = scope.state.$table.clone();
                        scope.state.$table.empty();
                        scope.state.$table.remove();
                        scope.state.summaryRow = undefined;

                        scope.state.tableElement = clonedTable;
                        scope.state.$table = angular.element(scope.state.tableElement);
                        scope.state.$table.prependTo('#tblArea_' + scope.state.dataGridId);
                    }
                }
                createGrid(scope);
            };

            scope.$watch('epDataGridOptions', function(newValue) {
                if (newValue) {
                    scope.setGridOptions(newValue);
                }
            });

            //Private methods
            scope.grDataTable = function() {
                /// <summary>
                ///   Get data table from grid
                /// </summary>
                return scope.state.dataTable.dataTable();
            };
            scope.grData = function() {
                /// <summary>
                ///   Get data table from grid
                /// </summary>
                var $tbl = scope.grDataTable();
                return $tbl.fnGetData();
            };
            scope.grApi = function() {
                /// <summary>
                ///   Get data table api
                /// </summary>
                return scope.grDataTable().api();
            };
            scope.grColumns = function() {
                /// <summary>
                ///   Get grid table columns
                /// </summary>
                var $tbl = scope.grDataTable();
                return $tbl.fnSettings().aoColumns;
            };
            scope.grGetRowNodeByIndex = function(rowIndex) {
                /// <summary>
                ///   Get grid row DOM element by row Index
                /// </summary>
                var $row = scope.grApi().row(rowIndex);
                return ($row === null) ? null : $row.node();
            };
            scope.grGetCellIndexByColumn = function(column) {
                /// <summary>
                ///   Find cell index by column mData
                /// </summary>
                var col = scope.grGetColumn(column);
                return col ? col.idx : -1;
            };
            scope.grGetColumn = function(column) {
                /// <summary>
                ///   Find column index by column (index or column name)
                /// </summary>
                if (!column && column !== 0) {
                    return null;
                }
                var columns = scope.grColumns();
                var isName = angular.isString(column);
                var col = null;
                if (isName) {
                    col = _.find(columns, function(c) { return c.sName === column; });
                } else {
                    col = _.find(columns, function(c) { return c.mData === column; });
                }
                return col;
            };
            scope.grGetMetaColumn = function(column) {
                /// <summary>
                ///   Find column (in meta column def) index by column (index or column name)
                ///   Used when table is not available yet
                /// </summary>
                if (!column && column !== 0) {
                    return null;
                }
                var columns = scope.state.gridColumns;
                var isName = angular.isString(column);
                var col = null;
                if (isName) {
                    col = _.find(columns, function(c) { return c.name === column; });
                } else {
                    col = _.find(columns, function(c) { return c.data === column; });
                }
                return col;
            };
            scope.grFindColumnByCellIndex = function(cellIndex) {
                var columns = scope.grColumns();
                return _.find(columns, function(c) { return c.nTh.cellIndex === cellIndex; });
            };

            scope.getRowByColumnValue = function(colIndex, val) {
                //RowID_r
                var row = null;
                var cellIndex = scope.grGetCellIndexByColumn(colIndex);
                if (cellIndex !== -1) {
                    var table = scope.grApi();
                    var rowIndex = $.inArray(val, table.column(cellIndex).data());
                    row = scope.state.dataTable.find('tbody tr')[rowIndex];
                }
                return row;
            };

            scope.iterateHeaderColumns = function(fnIterate) {
                /// <summary>
                ///   Iterate by header columns and call fnIterate(item,col) where item is the header item
                /// </summary>
                var tHead = scope.grApi().table().header();
                var firstHeaderRow = $('tr', tHead);
                var tHeadCols = $(firstHeaderRow).find('th');

                $(tHeadCols).each(function(i, el) {
                    var $item = $(el);
                    var col;
                    if ($item.width && $item.text()) {
                        //Find column to header relation
                        col = scope.grFindColumnByCellIndex($item.context.cellIndex);
                    }
                    fnIterate($item, col);
                });
            };

            scope.calcTableHeight = function() {
                /// <summary>
                ///   Attempts to measure the table to fit into the panel body.
                /// </summary>
                var ret = 0;
                if (scope.state.$table.length) {
                    ret = $(scope.state.linkElement).height();
                    if (ret === 0 && scope.state.linkElement[0].parentNode) {
                        ret = $(scope.state.linkElement[0].parentNode).height();
                    }
                    var tableBodyOffset = scope.findElement('.dataTables_scrollBody').offset();
                    if (scope.options.fnOnCalcTableHeight) {
                        ret = scope.options.fnOnCalcTableHeight(ret, tableBodyOffset);
                    } else if (scope.state.tableHeight && angular.isNumber(scope.state.tableHeight)) {
                        ret = scope.state.tableHeight;
                    } else if (scope.options.tableHeight === 'view') {
                        //special processing for shell views - on shell view resize
                        var vc = angular.element('#viewContainer');
                        if (vc.length) {
                            if (!scope.shellSizeChangeEvent) {
                                scope.shellSizeChangeEvent = $rootScope.$on('SHELL_SIZE_CHANGE_EVENT', function() {
                                    scope.resizeTable(true);
                                });
                            }
                            ret = vc.height() - (tableBodyOffset || { top: 130 }).top - 40;
                            if (scope.options.fnOnCalcTableHeight) {
                                ret = scope.options.fnOnCalcTableHeight(ret, tableBodyOffset);
                            }
                        }
                    }

                    if (scope.options.showFooterSection) {
                        var ft = scope.findElement('.ep-datagrid-footer-section');
                        if (ft.length) {
                            ret -= $(ft).height();
                        }
                    }
                    if (scope.options.enableSummaryRow && scope.state.dataTable &&
                        (scope.state.displaySummaryRow !== false)) {
                        var summaryRow = scope.grApi().table().footer();
                        if (summaryRow) {
                            ret -= $(summaryRow).height();
                        }
                    }
                }
                return ret;
            };
            scope.findInTable = function(selector) {
                return scope.state.tableElement.find(selector);
            };
            scope.findElement = function(selector) {
                return scope.state.linkElement.find(selector);
            };
            scope.renderGridCell = function(data, type, row, meta) {
                return renderGridCell(scope, data, type, row, meta);
            };

            scope.tableCellClick = function(e) {
                ///<summary>
                /// Activates the row being clicked on.
                ///</summary>
                scope.tableCellClicked(e, false);
            };

            scope.tableCellDblClick = function(e) {
                ///<summary>
                /// Activates the row being clicked on.
                ///</summary>
                scope.tableCellClicked(e, true);
            };

            scope.tableCellClicked = function(e, isDoubleClick) {
                ///<summary>
                /// Activates the row being clicked on.
                ///</summary>
                var row = e.target;
                var dg = $(row).closest('.ep-data-grid');
                if (!dg.length || $(dg).attr('id') !== scope.state.dataGridId) {
                    //check if event belongs to this table...
                    return;
                }

                while (row && row !== this) {
                    if (row.nodeName === 'TR' && row.parentNode && row.parentNode.nodeName === 'TBODY') {
                        scope.activateCell(e, row);
                        scope.activateRow(row);
                        if (isDoubleClick && scope.options.fnOnGridRowDoubleClick) {
                            scope.options.fnOnGridRowDoubleClick(row);
                        } else if (scope.options.fnOnCheckBoxClick) {
                            scope.processCheckBoxGridClick(e.target, row);
                        }
                        break;
                    }
                    row = row.parentNode;
                }

                if (scope.options.fnExpandCollapseChildGrid) {
                    scope.options.fnExpandCollapseChildGrid(e, row, scope);
                }

            };

            scope.processCheckBoxGridClick = function(eventTarget, row) {
                ///<summary>
                /// Process check box clicked directly in grid. Only supported in updatable multi-row update grid
                /// Should consider making a directive for checkbox
                ///</summary>
                var state = scope.state;
                if (scope.options.fnOnCheckBoxClick && row && state.activeRow) {
                    var target = $(eventTarget);
                    if (target.hasClass && target.hasClass('checkbox-display') && target.attr('mdata')) {
                        state.activeRecord = state.dataTable.fnGetData(state.activeRow);
                        var cell = target.closest('td');
                        if (state.activeRecord && cell) {
                            var mData = parseInt(target.attr('mdata'));
                            if (!isNaN(mData)) {
                                var col = _.find(scope.state.gridColumns, function(c) { return c.mData === mData; });
                                if (col) {
                                    scope.options.fnOnCheckBoxClick(state.activeRecord, col);
                                }
                            }
                        }
                    }
                }
            };

            scope.activateCell = function(e, row) {
                ///Internal function to set active cell from table cell click event
                if (!e || !e.target || (scope.state.canSelectCells !== true)) {
                    return;
                }

                scope.findInTable('td.info').removeClass('info').removeClass('activeCell');
                var cell = angular.element($(e.target).closest('td'));
                if (cell && cell.length && cell.hasClass('selectable')) {
                    var cellRow = cell.closest('tr');
                    if (cellRow.length && cellRow[0] === row) {
                        //make sure the cell is in our row
                        if (!cell.hasClass('fixed')) {
                            //Show selected column by adding bootstrap 'info' class.
                            cell.addClass('info activeCell');
                        }
                        var columnIndex = cellRow.children().index(cell);
                        scope.state.activeCell = { 'index': columnIndex, 'cell': cell };
                    }
                }
            };

            scope.activateFirstRow = function() {
                //var nTop = scope.state.dataTable.find('tbody tr:first')[0];
                //scope.activateRow(scope, nTop);
                scope.activateNthRow(0, false);
            };

            scope.activateNthRow = function(rowIndex, scrollToRow) {
                var row = scope.grGetRowNodeByIndex(rowIndex);
                if (row) {
                    scope.activateRow(row);
                    $timeout(function() {
                        angular.element(row).trigger('click');
                        if (scrollToRow) {
                            var sb = scope.state.linkElement.find('.dataTables_scrollBody');
                            sb.animate({
                                scrollTop: $(row).prop('offsetTop') - sb.height() / 2
                            }, 100);
                        }
                    }, 100);
                }
                return row;
            };

            scope.getPrevNextRow = function(mode, curRow) {
                if (mode !== 1 && mode !== -1) {
                    return null;
                }

                var row1 = (curRow === undefined) ? scope.state.activeRow : curRow;
                var row2 = (mode === 1) ? $(row1).next() : $(row1).prev();
                if (row2 && row2.length) {
                    var theRow = row2.get(0);
                    if (angular.element(theRow).find('.row-alert').length) {
                        //skip the error row
                        return scope.getPrevNextRow(mode, theRow);
                    }
                    if (theRow.id === 'loadMoreDownRow') {
                        return null;
                    }
                    return theRow;
                }
                return null;
            };

            scope.activateRow = function(row) {
                /// <summary>
                ///   Sets the 'active' class on the given row and saves it in the grid state.
                ///   Deactivates all other rows.
                /// </summary>
                var state = scope.state;

                if (state.prevActiveRowSet === row) {
                    return;
                }

                if (state.activeRow) {
                    var $row = angular.element(state.activeRow);
                    $row.removeClass('active').find('.row-indicator').removeClass(rowIndicator);
                }

                /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers */
                if (!row || row._DT_RowIndex === undefined) {
                    return;
                }

                if (scope.isValidRow(row)) {
                    state.activeRow = row;
                    state.activeRecord = state.dataTable.fnGetData(row);

                    if (scope.options.fnOnActivateRow) {
                        scope.options.fnOnActivateRow(state.activeRecord, state.activeRow);
                    }

                    scope.updateTableEditState();

                    angular.element(row).addClass('active').find('.row-indicator').addClass(rowIndicator);
                    if (scope.options.fnSetRowIndicator) {
                        scope.options.fnSetRowIndicator(row, scope);
                    }
                } else {
                    $log.debug('scope.activateRow(row) - trying to activate an invalid row');
                    state.activeRow = null;
                    state.activeRecord = null;
                    scope.updateTableEditState();
                }
                state.prevActiveRowSet = state.activeRow;
            };

            scope.scrollToRow = function(row) {
                var r = angular.element(row ? row : scope.state.activeRow);
                if (r) {
                    $timeout(function() {
                        var scroller = scope.findElement('.dataTables_scrollBody');
                        var scrollPos = r.offset().top - scroller.offset().top;
                        scroller.scrollTop(scrollPos);
                    });
                }
            };

            scope.updateTableEditState = function() {
                ///<summary>
                /// Updates the table cells that have had
                ///  edits that have not been committed.
                ///</summary>
                var state = scope.state;
                var $row = angular.element(state.activeRow);

                if (!state.dataTable.find($row).length) {
                    scope.activateFirstRow();
                    $row = angular.element(state.activeRow);
                }

                scope.findInTable('.row-indicator').removeClass(rowIndicator);
                state.dataTable.find('tr.active').removeClass('active');

                var rows = state.dataTable.find('tr');
                rows.find('td').removeClass('edit-pending');
                rows.find('.edit-indicator').removeClass(editIndicator).removeClass(editInProgressIndicator);

                if (scope.options.fnOnTableEditState) {
                    scope.options.fnOnTableEditState();
                }

                $row.addClass('active').find('.row-indicator').addClass(rowIndicator);
            };

            scope.updateTableEditStateActiveRow = function() {
                ///<summary>
                /// Updates the table active row that have had edits that have not been committed.
                ///</summary>
                if (scope.state.activeRow === null || scope.state.activeRecord === null) {
                    return;
                }

                var $row = $(scope.state.activeRow);

                var ri = $row.find('.row-indicator');
                $(ri).removeClass(rowIndicator);
                $row.find('tr.active').removeClass('active');

                ri.removeClass(editIndicator).removeClass(editInProgressIndicator);

                if (scope.options.fnOnTableEditState) {
                    scope.options.fnOnTableEditState(scope.state.activeRecord);
                }

                ri.addClass(rowIndicator);
            };

            scope.setRowEditMode = function(row, mode) {
                var $row = angular.element(row);
                if (mode === 'edit') {
                    $row.find('.edit-indicator').addClass(editIndicator);
                }
            };

            scope.appendRow = function(rowData) {
                var settings = scope.state.dataTable.fnSettings();
                settings._iDisplayLength++;
                var newRowIdx = scope.state.dataTable.fnAddData(rowData, true)[0];

                var rows = scope.state.dataTable.find('tr');
                var $newRow = $(rows.get(newRowIdx + 1));
                return $newRow;
            };

            scope.isValidRow = function(row) {
                if (row) {
                    var $row = angular.element(row);
                    if ($row && $row.index && scope.state.dataTable.fnGetData(row)) {
                        return true;
                    }
                }
                return false;
            };

            scope.resizeTable = function(force) {
                /// <summary>
                ///   Resizes the table and invokes the DataTables api to retrieve more records, if necessary.
                /// </summary>
                if (scope.state.$table && scope.state.$table.is(':visible')) {
                    $timeout.cancel(scope.resizeTimeout);
                    scope.resizeTimeout = $timeout(function() {
                        if (scope.state.dataTable) {
                            var tableHeight = scope.calcTableHeight();

                            var settings = scope.state.dataTable.fnSettings();
                            var tableHeightPx = tableHeight + 'px';

                            //only trigger this if the vertical height has changed to load rows.
                            if (settings && settings.oScroll && (force || settings.oScroll.sY !== tableHeightPx)) {
                                settings.oScroll.sY = tableHeightPx;
                                scope.findElement('.dataTables_scrollBody').height(tableHeight);
                            }
                        }
                    }, 300);
                }
            };

            scope.refreshData = function() {
                if (scope.state.dataTable) {
                    var prms = scope.state.gridLoadPrms.previousPrms;
                    getDataFromServer(scope, prms.searchTerm, prms.sortColIdx, prms.sortDir, false, false, true);
                }
            };

            scope.draw = function(mode) {
                var tbl = scope.grApi();
                if (tbl) {
                    tbl.draw(mode);
                }
            };

            scope.setDataSource = function(ds, refreshData) {
                //Only for static Mode. Set datasource
                if (scope.state.staticMode === true) {
                    scope.state.dataSource = (!ds || ds.length === 0) ? null : ds ;
                    if (refreshData && scope.state.dataTable) {
                        scope.state.dataTable.fnClearTable();
                        scope.state.dataTable.fnAddData(scope.state.dataSource);
                    }
                }
            };

            scope.callPreviousGetData = function() {
                if (scope.state.dataTable) {
                    var prms = scope.state.gridLoadPrms.previousPrms;
                    var previousCall = scope.state.gridLoadPrms.previousCall;
                    getDataFromServer(scope, prms.searchTerm, prms.sortColIdx, prms.sortDir,
                        previousCall.append, previousCall.showEditIndicator, false);
                }
            };

            scope.showProgressIndicator = function() {
                if (scope.options.fnShowProgressIndicator) {
                    scope.options.fnShowProgressIndicator();
                }
                //else {
                //    //TO DO!!!!
                //}
            };

            scope.hideProgressIndicator = function() {
                if (scope.options.fnHideProgressIndicator) {
                    scope.options.fnHideProgressIndicator();
                }
                //else {
                //    //TO DO!!!
                //}
            };

            scope.sumColumn = function(index) {
                var intVal = function(i) {
                    return typeof i === 'string' ?
                        i.replace(/[\$,]/g, '') * 1 :
                        typeof i === 'number' ?
                        i : 0;
                };
                return scope.grApi().column(index).data()
                    .reduce(function(a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
            };

            scope.formatNumber = function(data, col) {
                if (col.userColumnDef.sType === 'decimal') {
                    data = formatDecimal(data, col);
                } else if (col.userColumnDef.sType === 'integer') {
                    data = formatInt(data);
                }
                return data;
            };

            scope.updateSummaryRow = function() {
                if (!scope.options.enableSummaryRow) { return; }
                angular.forEach(scope.state.summaryRow.columns, function(c) {
                    c.value = undefined;
                    if (c.col) {
                        if (c.col.userColumnDef.summarize) {
                            c.value = scope.formatNumber(scope.sumColumn(c.col.iIndex), c.col);
                        } else {
                            var fn = c.col.userColumnDef.fnOnSummaryUpdate || scope.options.fnOnSummaryUpdate;
                            if (fn) {
                                fn(c);
                            }
                        }
                    }
                });
            };

            // >>>>------------------ Filter ---------------------------------->

            scope.createFilter = function() {
                if (scope.findElement('.ep-datagrid-filter-row').length === 0) {
                    var tHead = scope.grApi().table().header();
                    angular.element(tHead).append(
                        $compile('<ep-data-grid-filter-row></ep-data-grid-filter-row>')(scope));
                    return true;
                }
                return false;
            };

            scope.showFilter = function() {
                scope.createFilter();
                scope.state.filterShowFlag = true;
            };

            scope.hideFilter = function() {
                scope.state.filterShowFlag = false;
            };

            scope.toggleFilter = function() {
                if (scope.createFilter()) {
                    scope.state.filterShowFlag = true;
                } else {
                    scope.state.filterShowFlag = (scope.state.filterShowFlag === undefined) ?
                        true : !scope.state.filterShowFlag;
                }
                scope.configmenu[0].checked = scope.state.filterShowFlag;
            };

            scope.getFilterState = function() {
                if (scope.state.filterFunctions) {
                    scope.state.filterFunctions.getFilterExpressions();
                }
            };

            scope.setInitialFilters = function() {
                scope.getFilterState();
                var isFilterOn = !!(scope.state.filterExpressions && scope.state.filterExpressions.length);
                if (isFilterOn) {
                    scope.showFilter();
                    //restore filter state
                    //TO DO: may be replace with getFilterState() call
                    //var filters = _.map(scope.state.filterExpressions, function(filter) { return filter; });
                    //scope.state.filterCriteria = JSON.stringify(filters);
                } else {
                    scope.getFilterState();
                }
            };

            scope.onHideFilter = function(changedFilter) {
                if (changedFilter) {
                    scope.applyFilter();
                }
            };

            scope.onChangeFilter = function() {
                scope.applyFilter();
            };

            scope.applyFilter = function() {
                if (scope.state.filterTimeout) {
                    $timeout.cancel(scope.state.filterTimeout);
                }
                scope.state.filterTimeout = $timeout(function() {
                    scope.getFilterState();
                    var prms = scope.state.gridLoadPrms.previousPrms;
                    getDataFromServer(scope, prms.searchTerm, prms.sortColIdx, prms.sortDir, false, true, false);
                }, 200); // delay 200 ms
            };

            if (scope.epDataGridOnInit) {
                scope.epDataGridOnInit({ factory: scope.state.gridFactory });
            }
        }

        return {
            restrict: 'E',
            templateUrl: 'src/components/ep.datagrid/datagrid.html',
            scope: {
                epDataGridOptions: '=',
                epDataGridOnInit: '&'
            },
            link: linkDirective,
        };
    }
]);

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
    epDataGridService.$inject = ['epModalDialogService', 'epUtilsService'];
angular.module('ep.datagrid').
    service('epDataGridService', epDataGridService);

    /*@ngInject*/
    function epDataGridService(epModalDialogService, epUtilsService) {

        /**
         * @ngdoc method
         * @name showGridDialog
         * @methodOf ep.datagrid.service:epDataGridService
         * @public
         * @param {object} dialogOptions - set/override dialog options
         * @param {object} gridOptions - set/override datagrid options
         * @param {object} dataSet - array of data records
         * @description
         * Show dialog with data grid. Note that this dialog displays static data.
         */
        function showGridDialog(dialogOptions, gridOptions, dataSet) {

            var datagridOptions = {
                tableHeight: 300,
                pageLength: 20,
                staticMode: true,
                fnUpdateRecordsInfo: function(status) {
                    modalDialogOptions.statusBarText = status;
                }
            };
            epUtilsService.copyProperties(gridOptions, datagridOptions);

            var modalDialogOptions = {
                size: 'large',
                title: '',
                templateUrl: 'src/components/ep.datagrid/datagrid-dialog.html',
                icon: 'fa fa-cogs fa-2x',
                onDataGrid: function onDataGrid(factory) {
                    factory.setGridOptions(datagridOptions);
                    factory.setDataSource(dataSet, true);
                },
                statusBar: true,
                buttons: [
                    {
                        isCancel: true,
                        id: 'cancel_btn',
                        text: 'Cancel'
                    }
                ]
            };
            epUtilsService.copyProperties(dialogOptions, modalDialogOptions);

            epModalDialogService.showCustomDialog(modalDialogOptions);
        }

        /**
         * @ngdoc method
         * @name resolveDataType
         * @methodOf ep.datagrid.service:epDataGridService
         * @public
         * @param {string} sDataType - data type for grid column
         * @description
         * Resolve data type acceptable for datagrid
         */
        function resolveDataType(sDataType) {
            var sType = 'string';
            var tp = sDataType.toLowerCase();
            if (tp.indexOf('system.') === 0) {
                tp = tp.substr(7);
            }
            if (tp === 'datetime') {
                sType = 'date';
            } else if (tp === 'bool' || tp === 'boolean') {
                sType = 'bool';
            } else if (tp === 'int' || tp === 'integer' || tp === 'int32' || tp === 'int64' ||
                tp === 'long' || tp === 'int16') {
                sType = 'integer';
            }
            if (tp === 'double' || tp === 'decimal' || tp === 'float') {
                sType = 'decimal';
            }
            return sType;
        }

        return {
            showGridDialog: showGridDialog,
            resolveDataType: resolveDataType
        };
    }
}());

(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.datagrid.directive:epDataGridJson
    * @restrict E
    *
    * @description
    * The directive for simple static datagrid - wrapper based on ep.datagrid
    *
    * The usage in html is:
    *        <ep-data-grid-json options="" column-names="" column-props="" data=""></ep-data-grid-json>
    *
    * @description
    *   # options (object) - optional. These are the usual datagrid options if you need to overwrite defaults. If columns are set
    *                        through metadata property they take precedence.
    *   # columnNames (string) - list of comma separated column names (e.g. 'Type,Customer,Amount'). Can also be an array
    *   # columnProps (dictionary) - optional dictionary to specify extra column properties via index key. E.g.
    *           $scope.columnProps = {
    *               0: { sTitle: 'My Message'},  //set title to column with index 0
    *               2: { sDataType: 'DateTime' }
    *           };
    *      column properties are the same as on ep.datagrid
    *   # data {array) - json array of datarows
    *
    * @example
    *
    */
    epDataGridJsonDirective.$inject = ['$compile', '$log', 'epUtilsService'];
    angular.module('ep.datagrid').
        directive('epDataGridJson', epDataGridJsonDirective);

    /*@ngInject*/
    function epDataGridJsonDirective($compile, $log, epUtilsService) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.datagrid/ep.datagrid.json/ep-datagrid-json.html',
            scope: {
                options: '=',
                columnNames: '=',
                columnProps: '=',
                data: '=',
                onGridInit: '&'
            },
            compile: function() { return {
                pre: function($scope) {
                    $scope.state = {};

                    $scope.state.datagridOptions = {
                        tableHeight: 300,
                        pageLength: 20,
                        staticMode: true,
                        metadata: {}
                    };
                    epUtilsService.copyProperties($scope.options, $scope.state.datagridOptions);

                    $scope.detectType = function(i) {
                        var r = _.find($scope.data, function(row) {
                            return (row[i] !== undefined && row[i] !== null);
                        });
                        var tp = typeof r[i];
                        if (tp === 'number') {
                            return 'int';
                        }
                        return 'string';
                    };

                    $scope.setMeta = function() {
                        $scope.state.columnNames = $scope.columnNames || '';
                        if ($scope.state.columnNames && angular.isString($scope.state.columnNames)) {
                            $scope.state.columnNames = $scope.state.columnNames.split(',');
                        } else {
                            $scope.state.columnNames = [];
                        }

                        var hasData = ($scope.data && angular.isArray($scope.data) && $scope.data.length);

                        if ($scope.state.columnNames.length === 0 && hasData) {
                            var row = $scope.data[0];
                            $scope.state.columnNames = [];
                            for (var j = 0; j < row.length; j++) {
                                $scope.state.columnNames.push('Column ' + j);
                            }
                        }

                        var isMetaDefined = ($scope.options && $scope.options.metadata &&
                            $scope.options.metadata.columns);
                        if (!isMetaDefined) {
                            var dataColumns = [];
                            for (var i = 0; i < $scope.state.columnNames.length; i++) {
                                var name = $scope.state.columnNames[i];
                                var col = {
                                    mData: i,
                                    sName: name,
                                    sTitle: name,
                                };
                                if ($scope.columnProps) {
                                    var cProp = $scope.columnProps[i];
                                    if (cProp) {
                                        epUtilsService.copyProperties(cProp, col);
                                    }
                                }
                                if (!col.sDataType && hasData) {
                                    col.sDataType = $scope.detectType(i);
                                }
                                dataColumns.push(col);
                            }
                            $scope.state.datagridOptions.metadata.columns = dataColumns;
                        }
                    };

                    $scope.onDataGrid = function onDataGrid(factory) {
                        $scope.state.factory = factory;
                        $scope.setMeta();
                        $scope.state.factory.setGridOptions($scope.state.datagridOptions);
                        $scope.state.factory.setDataSource($scope.data, true);
                        if ($scope.options) {
                            $scope.options.factory = factory;
                        }
                        if ($scope.onGridInit) {
                            $scope.onGridInit(factory);
                        }
                    };

                    $scope.$watch('columnNames', function(newValue, oldValue) {
                        if (newValue && newValue !== oldValue) {
                            $scope.setMeta();
                            $scope.state.factory.setGridOptions($scope.state.datagridOptions);
                            $scope.state.factory.createGrid();
                        }
                    });
                    //$scope.$watch('columnProps', function(newValue, oldValue) {
                    //    if (newValue && newValue !== oldValue) {
                    //    }
                    //});
                    $scope.$watch('data', function(newValue, oldValue) {
                        if (newValue && newValue !== oldValue) {
                            $scope.state.factory.setDataSource($scope.data, true);
                        }
                    });
                }
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
 * @ngdoc controller
 * @name ep.dynamic.directive.controller:epDynamicDirectiveCtrl
 * @description
 * Represents the epDynamicDirective controller for the
 * ep.dynamic.directive module, or for specific ep-dynamic-directive directive
 *
 * @example
 *
 */
(function() {
    'use strict';

    angular.module('ep.dynamic.directive').controller('epDynamicDirectiveCtrl', [
    '$scope',
    'epDynamicDirectiveService',
    function($scope, epDynamicDirectiveService) {
        var vm = this;
        vm.scope = $scope;
        $scope.$watch(function() { return vm.directiveInfo; }, renderDirective);

        function renderDirective() {
            vm.compiled = epDynamicDirectiveService.build(vm.directiveInfo.name,
                vm.directiveInfo.scopeProperties, vm.scope);
            if (vm.element) {
                vm.element.html(vm.compiled);
            }
        }

        renderDirective();
    }
    ]);
})();

/**
* @ngdoc directive
* @name ep.dynamic.directive.directive:epDynamicDirective
* @restrict E
*
* @description
* Represents the ep.dynamic.directive directive
*
* @example
*/
(function() {
    'use strict';

    angular.module('ep.dynamic.directive').directive('epDynamicDirective',
    function() {
        return {
            restrict: 'E',
            controller: 'epDynamicDirectiveCtrl',
            controllerAs: 'dynamicDirective',
            bindToController: true,
            scope: {
                directiveInfo: '='
            },
            compile: function() {
                return {
                    pre: function(scope, iElement) {
                        scope.dynamicDirective.element = iElement;
                    },
                    post: function(scope, iElement) {
                        if (scope.dynamicDirective.compiled !== null) {
                            iElement.append(scope.dynamicDirective.compiled);
                        }
                    }
                };
            }
        };
    });
})();

/**
 * @ngdoc service
 * @name ep.dynamic.directive.service:epDynamicDirectiveService
 * @description
 * Service for the ep.dynamic.directive module
 * This is the dynamic directive builder module
 *
 * @example
 *
 */
(function() {
    'use strict';

    angular.module('ep.dynamic.directive').service('epDynamicDirectiveService', [
    '$rootScope',
    '$compile',
    function($rootScope, $compile) {
        var templates = {};
        /**
         * @ngdoc method
         * @name build
         * @methodOf ep.dynamic.directive.service:epDynamicDirectiveService
         * @public
         * @description
         * builds the dynamic directive
         */
        this.build = function(directiveName, scopeProps, parentScope, skipScopeCreation) {
            var newScope = skipScopeCreation ? parentScope || $rootScope :
                parentScope ? parentScope.$new() : $rootScope.$new();
            angular.extend(newScope, scopeProps);

            var template = this.getTemplate(directiveName);
            if (template) {
                return $compile(template)(newScope);
            }
            return null;
        };
        /**
        * @ngdoc method
        * @name registerTemplate
        * @methodOf ep.dynamic.directive.service:epDynamicDirectiveService
        * @public
        * @description
        * registers the html template for the dynamic created directive
        */
        this.registerTemplate = function(template) {
            if (!templates[template.id]) {
                templates[template.id] = template.value;
            }
        };
        /**
        * @ngdoc method
        * @name getTemplate
        * @methodOf ep.dynamic.directive.service:epDynamicDirectiveService
        * @public
        * @description
        * gets the html template for the dynamic created directive
        */
        this.getTemplate = function(id) {
            return templates[id];
        };
    }]);
})();

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
angular.module('ep.embedded.apps').directive('epEmbeddedAppsLoader', [
    '$http',
    '$log',
    '$q',
    '$compile',
    '$timeout',
    'epEmbeddedAppsCacheService',
    'epEmbeddedAppsProvider',
    function($http, $log, $q, $compile, $timeout, epEmbeddedAppsCacheService, epEmbeddedAppsProvider) {
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
                        $http.get(url).
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
    }]);

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
                                return epUtilsService.loadScript(
                                    getAppPath(config.id, url), epEmbeddedAppsCacheService.scriptCache).then(
                                    function(id) {
                                        onLoadScript(id);
                                    });
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
                    } else if (window.require !== undefined && (require('nw.gui') && process)) {
                        features.platform = {
                            app: 'NWJS',
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
                                name: browserName,
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
 * @ngdoc service
 * @name ep.file:epFileService
 * @description
 * Service for the ep.file module
 * Provides functions for file module
 *
 * @example
 */
(function() {
    'use strict';

    epFileService.$inject = ['$q', '$log', '$window', 'epLocalStorageService', 'epFeatureDetectionService', 'epFileConstants'];
    angular.module('ep.file')
    //TODO: consider converting this constant into a sysconfig value
        .constant('epFileConstants', {
            'namespace': 'persistentData'
        })
        .service('epFileService', /*@ngInject*/ epFileService);

    function epFileService($q, $log, $window, epLocalStorageService, epFeatureDetectionService, epFileConstants) {

        var storageSystems = {
            'localStorage': 0,
            'fileStorage': 1
        };

        var domErrors = {
            DeviceNotReadyError: 'The device is not ready for file operations',
            FileSystemNotReady: 'The file system is not ready to accept operations.',
            IndexSizeError: 'The index is not in the allowed range (e.g, thrown in a range object).',
            HierarchyRequestError: 'The node tree hierarchy is not correct.',
            WrongDocumentError: 'The object is in the wrong document.',
            InvalidCharacterError: 'The string contains invalid characters.',
            NoModificationAllowedError: 'The object can not be modified.',
            NotFoundError: 'The object can not be found here.',
            NotSupportedError: 'The operation is not supported.',
            InvalidStateError: 'The object is in an invalid state.',
            SyntaxError: 'The string did not match the expected pattern.',
            InvalidModificationError: 'The object can not be modified in this way.',
            NamespaceError: 'The operation is not allowed by Namespaces in XML.',
            InvalidAccessError: 'The object does not support the operation or argument.',
            TypeMismatchError: 'The type of the object does not match the expected type.',
            SecurityError: 'The operation is insecure.',
            NetworkError: 'A network error occurred.',
            AbortError: 'The operation was aborted.',
            URLMismatchError: 'The given URL does not match another URL.',
            QuotaExceededError: 'The quota has been exceeded.',
            TimeoutError: 'The operation timed out.',
            InvalidNodeTypeError: 'The node is incorrect or has an incorrect ancestor for this operation.',
            DataCloneError: 'The object can not be cloned.'
        };

        var fileErrors = {
            1: 'File not found.',
            2: 'Security error.',
            3: 'Operation aborted error.',
            4: 'File or Directory not readable error.',
            5: 'Encoding error.',
            6: 'No modifications allowed error.',
            7: 'Invalid state error.',
            8: 'Syntax error.',
            9: 'Invalid modification.',
            10: 'Storage quota exceeded.',
            11: 'Type mismatch error.',
            12: 'Path exists error.'
        };

        var fileSystem = storageSystems.localStorage;

        function failWith(deferred, url) {
            return function(error) {
                var errDesc;
                if (error.name) {
                    errDesc = domErrors[error.name];
                } else if (error.code) {
                    errDesc = fileErrors[error.code];
                } else {
                    errDesc = error;
                }
                var msg = 'LocalFileSystem failure: ' + errDesc + ' [ ' + url;
                if (error.name) {
                    msg += ': ' + error.name;
                }
                msg += ' ]';
                $log.error(msg);
                deferred.reject(msg);
            };
        }

        /**
         * @ngdoc method
         * @name load
         * @methodOf ep.file:epFileService
         * @public
         * @param {string} path (optional) the device file system directory to use when loading the file (defaults to the application's data directory)
         * @param {string} filename the name of the file to load
         * @description
         * Loads an object from persistent storage. On cordova apps the file
         * is loaded from the application's data directory by default. On browser based apps,
         * the data is stored in localStorage. The path parameter is optional, defaulting to the
         */
        function load(path, filename) {
            return loadText(path, filename).then(function(text) {
                return angular.fromJson(text);
            });
        }

        /**
         * @ngdoc method
         * @name load
         * @methodOf ep.file:epFileService
         * @public
         * @param {string} path (optional) the device file system directory to use when loading the file (defaults to the application's data directory)
         * @param {string} filename the name of the file to load
         * @description
         * Loads text from persistent storage. On cordova apps the file
         * is loaded from the application's data directory by default. On browser based apps,
         * the data is stored in localStorage. The path parameter is optional, defaulting to the
         */
        function loadText(path, filename) {
            var graph;
            var deferred = $q.defer();
            var filePath;

            if (fileSystem === storageSystems.localStorage) {
                if (!filename) {
                    filename = path;
                    path = epFileConstants.namespace;
                }
                filePath = path + '.' + filename;
                graph = epLocalStorageService.get(filePath);
                if (!graph) {
                    failWith(deferred, filename)({code: 1});
                } else {
                    $log.debug('Successfully loaded ' + filePath + ' from LocalStorage.');
                    deferred.resolve(graph);
                }
            } else {
                if (!filename) {
                    filename = path;
                    path = $window.cordova.file.dataDirectory;
                }
                $window.resolveLocalFileSystemURL(path + filename,
                    function(fileEntry) {
                        fileEntry.file(function(file) {
                            var reader = new FileReader();
                            // when the object graph is saved, it is enclosed in an array
                            // to satisfy the Blob interface. When it is read, the function
                            // returns it as an array with one member.
                            reader.onloadend = function() {
                                deferred.resolve(this.result);
                            };
                            reader.readAsText(file);
                        }, failWith(deferred, filename));
                    }, failWith(deferred, filename));
            }

            return deferred.promise;
        }

        /**
         * @ngdoc method
         * @name save
         * @methodOf ep.file:epFileService
         * @public
         * @param {object} graph to save to the file system.
         * @param {string} path (optional) the device file system directory to use when saving the file (defaults to the application's data directory)
         * @param {string} filename the name of the file to load
         * @description
         * Saves an object to persistent storage. On cordova apps the file
         * is saved in the application's data directory by default. On browser based apps,
         * the data is stored in localStorage.
         */
        function save(graph, path, filename) {
            return saveText(angular.toJson(graph), path, filename);
        }

        /**
         * @ngdoc method
         * @name save
         * @methodOf ep.file:epFileService
         * @public
         * @param {string} text to save to the file system.
         * @param {string} path (optional) the device file system directory to use when saving the file (defaults to the application's data directory)
         * @param {string} filename the name of the file to load
         * @param {string} type {optional} the mime type with which to save the file
         * @description
         * Saves text to persistent storage. On cordova apps the file
         * is saved in the application's data directory by default. On browser based apps,
         * the data is stored in localStorage.
         */
        function saveText(text, path, filename, type) {
            var deferred = $q.defer();
            try {
                var filePath = '';
                if (!type) {
                    type = 'text/plain';
                }
                if (fileSystem === storageSystems.localStorage) {
                    if (!filename) {
                        filename = path;
                        path = epFileConstants.namespace;
                    }
                    filePath = path + '.' + filename;
                    epLocalStorageService.update(filePath, text);
                    $log.debug('Successfully saved ' + filePath + ' to LocalStorage.');
                    deferred.resolve();
                } else {
                    if (!filename) {
                        filename = path;
                        path = $window.cordova.file.dataDirectory;
                    }
                    $window.resolveLocalFileSystemURL(path, function(directoryEntry) {
                        directoryEntry.getFile(filename, {create: true}, function(fileEntry) {
                            fileEntry.createWriter(function(writer) {

                                // onwriteend is only called if the file was sucessfully written
                                // so the promised is resolved without any return value.
                                writer.onwriteend = function() {
                                    $log.debug('Successfully wrote file: ' + filename);
                                    deferred.resolve();
                                };
                                writer.onerror = function(err) {
                                    fail(deferred, {code: err.toString()});
                                };
                                // the blob interface expects the object graph to be inside an array
                                // so the graph gets stringified, then set as the only element in the array
                                var blob = new Blob([text], {type: type});
                                writer.write(blob);

                            }, failWith(deferred, filename));
                        }, failWith(deferred, filename));
                    }, failWith(deferred, filename));
                }
            } catch (e) {
                failWith(deferred, filename)(e);
            }
            return deferred.promise;
        }

        /**
         * @ngdoc method
         * @name fileExists
         * @methodOf ep.file:epFileService
         * @public
         * @description
         * This function returns a promise that resolves with a boolean
         * parameter that indicates if the file was found in the backing store.
         * On cordova based apps, the dataDirectory is searched for the given file,
         * and on browser apps, the localStorage is queried.
         */
        function fileExists(path, filename) {
            var deferred = $q.defer();
            try {
                if (fileSystem === storageSystems.fileStorage) {
                    if (!filename) {
                        filename = path;
                        path = $window.cordova.file.dataDirectory;
                    }
                    $window.resolveLocalFileSystemURL(path + filename,
                        function() {
                            deferred.resolve(true);
                        }, function(err) {
                            if (err.code === 1) {
                                deferred.resolve(false);
                            } else {
                                failWith(deferred, filename)(err);
                            }
                        });
                } else {
                    if (!filename) {
                        filename = path;
                        path = epFileConstants.namespace;
                    }
                    var filePath = path + '.' + filename;
                    deferred.resolve(!!epLocalStorageService.get(filePath));
                }
            } catch (e) {
                failWith(deferred, filename)(e);
            }
            return deferred.promise;
        }
        /**
         * @ngdoc method
         * @name getFilePath
         * @methodOf ep.file:epFileService
         * @public
         * @description
         * This function returns a string that indicates the full path
         * to the given file.
         */
        function getFilePath(filename) {
            if (fileSystem === storageSystems.fileStorage) {
                return $window.cordova.file.dataDirectory + filename;
            } else {
                return epFileConstants.namespace + '.' + filename;
            }
        }
        /**
         * @ngdoc method
         * @name remove
         * @methodOf ep.file:epFileService
         * @public
         * @description
         * This function returns a promise that resolves if the file was successfully deleted.
         */
        function remove(filename) {
            var deferred = $q.defer();
            try {
                if (fileSystem === storageSystems.localStorage) {
                    epLocalStorageService.clear(epFileConstants.namespace + '.' + filename);
                    deferred.resolve();
                } else {
                    $window.resolveLocalFileSystemURL($window.cordova.file.dataDirectory + filename,
                        function(fileEntry) {
                            fileEntry.remove();
                            deferred.resolve();
                        }, function(err) {
                            failWith(deferred, filename)(err);
                        });
                }
            } catch (e) {
                failWith(deferred, filename)(e);
            }
            return deferred.promise;
        }

        if (epFeatureDetectionService.getFeatures().platform.app !== 'Cordova') {
            fileSystem = storageSystems.localStorage;
            $log.debug('LocalStorage system selected.');
        } else {
            $log.debug('FileStorage system selected.');
            fileSystem = storageSystems.fileStorage;
        }

        return {
            load: load,
            loadText: loadText,
            save: save,
            saveText: saveText,
            getFilePath: getFilePath,
            fileExists: fileExists,
            remove: remove
        };
    }
})();

/**
 * @ngdoc directive
 * @name ep.filter.list.directive:epFilterList
 * @restrict E
 *
 * @description
 * Represents the filter list input directive
 *
 * @example
 * <pre>
        <ep-filter-list search-by=filter1.firstname></ep-filter-list>
        <ul>
            <li ng-repeat="name in nameList | filter: filter1">{{name.firstname}} {{name.lastname}}</li>
        </ul>
 * </pre>
 */
(function() {
    'use strict';

    angular.module('ep.filter.list').directive('epFilterList',
    function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                searchBy: '='
            },
            templateUrl: 'src/components/ep.filter.list/filter_list.html'
        };
    });
})();

/**
 *
 */
(function() {
    'use strict';
    angular.module('ep.hybrid.barcode', []);
})();

/**
 * @ngdoc service
 * @name ep.hybrid.barcode:epHybridBarcodeService
 * @description
 * Service for accessing Cordova Barcode plugin. This will scan a barcode and recognize the UPC code and format.
 *
 * Note: Include cordova.js script file in html file and add
 * {@link https://www.npmjs.com/package/cordova-plugin-barcodescanner cordova barcodescanner plugin} into app.
 *
 * @example
    <example module="TestApp">
     <file name="index.html">
	     <div ng-controller="SampleCtrl">
            <div class="panel-body">
                <p>{{barCodeNumber}}</p>
                <p>{{barCodeFormat}}</p>
                <button class="btn btn-primary btn-block" ng-click="scanBarcode()">Scan</button>
            </div>
	      </div>
     </file>
     <file name="script.js">
     	angular.module('TestApp', ['ep.hybrid.barcode'])
     		.controller('SampleCtrl',['$scope', '$log', 'epHybridBarcodeService',
	     		function($scope, epHybridBarcodeService) {
                    $scope.scanBarcode = function() {
                        epHybridBarcodeService.scan(
				            onSuccess,
                            onFail
			            );
                    };

                    function onSuccess(result) {
                        if (!result.cancelled) {
                            $scope.barCodeNumber = 'Number: ' + result.text;
                            $scope.barCodeFormat = 'Format: ' + result.format;
                            $scope.$apply();
                        }
                    }

                    function onFail(message) {
                        $log.debug('Failed: ' + message);
                    }
            }]);
     </file>
   </example>
 */
(function() {
    'use strict';

    epHybridBarcodeService.$inject = ['$rootScope'];
    angular.module('ep.hybrid.barcode')
        .service('epHybridBarcodeService', /*@ngInject*/ epHybridBarcodeService);

    function epHybridBarcodeService($rootScope) {

        /**
         * @ngdoc method
         * @name scan
         * @methodOf ep.hybrid.barcode:epHybridBarcodeService
         * @public
         * @param {function} successCallback - function called on success of API call
         * @param {function} errorCallback - function called on error of API call
         * @description
         * To scan the barcode
         */
        function scan(successCallback, errorCallback) {
            cordova.plugins.barcodeScanner.scan(
                function(result) {
                    $rootScope.$apply(successCallback(result));
                },
                function(error) {
                    $rootScope.$apply(errorCallback(error));
                }
			);
        }

        return {
            scan: scan
        };
    }

})();

/**
 *
 */
(function() {
  'use strict';
    angular.module('ep.hybrid.calendar', []);
})();

/**
 * @ngdoc service
 * @name ep.hybrid.calendar:epHybridCalendarService
 * @description
 * Service for accessing Cordova Calendar plugin. This allows you to manipulate the native calendar.
 *
 * Note: Include cordova.js script file in html file and add
 * {@link https://www.npmjs.com/package/cordova-plugin-calendar cordova calendar plugin} into app.
 *
 * @example
   <example module="TestApp">
     <file name="index.html">
	     <div ng-controller="SampleCtrl">
            <div class="panel-body">
            </div>
	      </div>
     </file>
     <file name="script.js">
     	angular.module("TestApp", ["ep.hybrid.calendar"])
     		.controller("SampleCtrl",["$scope", "$log", "epHybridCalendarService",
	     		function($scope, epHybridCalendarService) {
                    // create a calendar (iOS only for now)
                    epHybridCalendarService.createCalendar('calendar name',onSuccess,onFail);

                    // delete a calendar (iOS only for now)
                    epHybridCalendarService.deleteCalendar('calendar name',onSuccess,onFail);

                    //create an event
                    epHybridCalendarService.createEvent(
                        {
                            title: 'Event Title',
                            location: 'Home',
                            notes: 'notes about this event',
                            startDate: new Date(2016, 0, 15, 18, 30, 0, 0, 0),
                            endDate: new Date(2016, 1, 17, 12, 0, 0, 0, 0)
                        },
                        onSuccess,
                        onFail
                    );

                    //find an event
                    epHybridCalendarService.findEvent(
                        {
                            title: 'Event Title',
                            location: 'Home',
                            notes: 'notes about this event',
                            startDate: new Date(2016, 0, 15, 18, 30, 0, 0, 0),
                            endDate: new Date(2016, 1, 17, 12, 0, 0, 0, 0)
                        },
                        onSuccess,
                        onFail
                    );

                    //delete an event
                    epHybridCalendarService.deleteEvent(
                        {
                            title: 'Event Title',
                            location: 'Home',
                            notes: 'notes about this event',
                            startDate: new Date(2016, 0, 15, 18, 30, 0, 0, 0),
                            endDate: new Date(2016, 1, 17, 12, 0, 0, 0, 0)
                        },
                        onSuccess,
                        onFail
                    );

                    //open calendar
                    epHybridCalendarService.openCalendar();

                    // list all events in a date range (only supported on Android for now)
                    epHybridCalendarService.listEvents(startDate,endDate,onSuccess,onFail);

                    // list all calendar names - returns this JS Object to the success callback: [{"id":"1", "name":"first"}, ..]
                    epHybridCalendarService.listCalendars(onSuccess,onFail);

                    function onSuccess(message) {
                        $log.debug("Success: " + message);
                    }

                    function onFail(message) {
                        $log.debug("Failed: " + message);
                    }
            }]);
     </file>
   </example>
 */
(function() {
    'use strict';

    epHybridCalendarService.$inject = ['$rootScope'];
    angular.module('ep.hybrid.calendar')
        .service('epHybridCalendarService', /*@ngInject*/ epHybridCalendarService);

    function epHybridCalendarService($rootScope) {

        /**
         * @ngdoc method
         * @name openCalendar
         * @methodOf ep.hybrid.calendar:epHybridCalendarService
         * @public
         * @description
         * To open calendar
         */
        function openCalendar() {
            window.plugins.calendar.openCalendar();
        }

        /**
         * @ngdoc method
         * @name createCalendar
         * @methodOf ep.hybrid.calendar:epHybridCalendarService
         * @public
         * @param {function} successCallback - function called on success of API call
         * @param {function} errorCallback - function called on error of API call
         * @param {string} name - name of the calendar
         * @description
         * To create a calendar. Only works on iOS devices.
         */
        function createCalendar(successCallback, errorCallback, name) {
            window.plugins.calendar.createCalendar(
                name,
                function(message) {
                    $rootScope.$apply(successCallback(message));
                },
                function(message) {
                    $rootScope.$apply(errorCallback(message));
                }
			);
        }

        /**
         * @ngdoc method
         * @name deleteCalendar
         * @methodOf ep.hybrid.calendar:epHybridCalendarService
         * @public
         * @param {function} successCallback - function called on success of API call
         * @param {function} errorCallback - function called on error of API call
         * @param {string} name - name of the calendar
         * @description
         * To delete a calendar. Only works on iOS devices.
         */
        function deleteCalendar(successCallback, errorCallback, name) {
            window.plugins.calendar.deleteCalendar(
                name,
                function(message) {
                    $rootScope.$apply(successCallback(message));
                },
                function(message) {
                    $rootScope.$apply(errorCallback(message));
                }
			);
        }

        /**
         * @ngdoc method
         * @name createEvent
         * @methodOf ep.hybrid.calendar:epHybridCalendarService
         * @public
         * @param {function} successCallback - function called on success of API call
         * @param {function} errorCallback - function called on error of API call
         * @param {object} details - details to create event
         * @param {string} details.title - Title of the event
         * @param {string} details.location - Location of the event
         * @param {string} details.notes - Notes of the event
         * @param {date} details.startDate - Event start date
         * @param {date} details.endDate - Event end date
         * @description
         * To create a calendar event silently
         */
        function createEvent(successCallback, errorCallback, details) {
            window.plugins.calendar.createEvent(
                details.title, details.location, details.notes, details.startDate, details.endDate,
                function(message) {
                    $rootScope.$apply(successCallback(message));
                },
                function(message) {
                    $rootScope.$apply(errorCallback(message));
                }
			);
        }

        /**
         * @ngdoc method
         * @name createEventWithOptions
         * @methodOf ep.hybrid.calendar:epHybridCalendarService
         * @public
         * @param {function} successCallback - function called on success of API call
         * @param {function} errorCallback - function called on error of API call
         * @param {object} details - details object of the event. properties same as createEvent's details param.
         * @param {object} options - options to create event
         * @param {integer} options.firstReminderMinutes - first reminder minutes
         * @param {integer} options.secondReminderMinutes - second reminder minutes
         * @param {string} options.recurrence - recurrence. supported are: daily, weekly, monthly, yearly
         * @param {date} options.recurrenceEndDate - recurrence end date, leave null to add events into infinity and beyond
         * @param {integer} options.recurrenceInterval - recurrence interval
         * @param {url} options.url - url
         * @description
         * To create a calendar event with options
         */
        function createEventWithOptions(successCallback, errorCallback, details, options) {
            var calOptions = window.plugins.calendar.getCalendarOptions();

            if (options.firstReminderMinutes) {
                calOptions.firstReminderMinutes = options.firstReminderMinutes;
            }
            if (options.secondReminderMinutes !== null) {
                calOptions.secondReminderMinutes = options.secondReminderMinutes;
            }
            if (options.recurrence) {
                calOptions.recurrence = options.recurrence;
            }
            if (options.recurrenceEndDate) {
                calOptions.recurrenceEndDate = options.recurrenceEndDate;
            }
            if (options.recurrenceInterval) {
                calOptions.recurrenceInterval = options.recurrenceInterval;
            }
            if (options.url) {
                calOptions.url = options.url;
            }
            window.plugins.calendar.createEventWithOptions(
                details.title, details.location, details.notes, details.startDate, details.endDate,
                calOptions,
                function(message) {
                    $rootScope.$apply(successCallback(message));
                },
                function(message) {
                    $rootScope.$apply(errorCallback(message));
                }
			);
        }

        /**
         * @ngdoc method
         * @name modifyEvent
         * @methodOf ep.hybrid.calendar:epHybridCalendarService
         * @public
         * @param {function} successCallback - function called on success of API call
         * @param {function} errorCallback - function called on error of API call
         * @param {object} details - details object of the event. properties same as createEvent's details param.
         * @description
         * To modify calendar event. Works only on iOS.
         */
        function modifyEvent(successCallback, errorCallback, details) {
            window.plugins.calendar.modifyEvent(
                details.title, details.location, details.notes, details.startDate, details.endDate,
                details.newTitle, details.newLocation, details.newNotes, details.newStartDate, details.newEndDate,
                function(message) {
                    $rootScope.$apply(successCallback(message));
                },
                function(message) {
                    $rootScope.$apply(errorCallback(message));
                }
			);
        }

        /**
         * @ngdoc method
         * @name findEvent
         * @methodOf ep.hybrid.calendar:epHybridCalendarService
         * @public
         * @param {function} successCallback - function called on success of API call
         * @param {function} errorCallback - function called on error of API call
         * @param {object} details - details object of the event. properties same as createEvent's details param.
         * @description
         * To find calendar event
         */
        function findEvent(successCallback, errorCallback, details) {
            window.plugins.calendar.findEvent(
                details.title, details.location, details.notes, details.startDate, details.endDate,
                function(message) {
                    $rootScope.$apply(successCallback(message));
                },
                function(message) {
                    $rootScope.$apply(errorCallback(message));
                }
			);
        }

        /**
         * @ngdoc method
         * @name deleteEvent
         * @methodOf ep.hybrid.calendar:epHybridCalendarService
         * @public
         * @param {function} successCallback - function called on success of API call
         * @param {function} errorCallback - function called on error of API call
         * @param {object} details - details object of the event. properties same as createEvent's details param.
         * @description
         * To delete calendar events
         */
        function deleteEvent(successCallback, errorCallback, details) {
            window.plugins.calendar.deleteEvent(
                details.title, details.location, details.notes, details.startDate, details.endDate,
                function(message) {
                    $rootScope.$apply(successCallback(message));
                },
                function(message) {
                    $rootScope.$apply(errorCallback(message));
                }
			);
        }

        /**
         * @ngdoc method
         * @name listEvents
         * @methodOf ep.hybrid.calendar:epHybridCalendarService
         * @public
         * @param {function} successCallback - function called on success of API call
         * @param {function} errorCallback - function called on error of API call
         * @param {date} startDate - start date
         * @param {date} endDate - end date
         * @description
         * To list events in a range. Only works in Android devices
         */
        function listEvents(successCallback, errorCallback, startDate, endDate) {
            window.plugins.calendar.listEventsInRange(
                startDate,
                endDate,
                function(message) {
                    $rootScope.$apply(successCallback(message));
                },
                function(message) {
                    $rootScope.$apply(errorCallback(message));
                }
			);
        }

        /**
         * @ngdoc method
         * @name listCalendars
         * @methodOf ep.hybrid.calendar:epHybridCalendarService
         * @public
         * @param {function} successCallback - function called on success of API call
         * @param {function} errorCallback - function called on error of API call
         * @description
         * To list calendars
         */
        function listCalendars(successCallback, errorCallback) {
            window.plugins.calendar.listCalendars(
                function(message) {
                    $rootScope.$apply(successCallback(message));
                },
                function(message) {
                    $rootScope.$apply(errorCallback(message));
                }
			);
        }

        return {
            openCalendar: openCalendar,
            createCalendar: createCalendar,
            deleteCalendar: deleteCalendar,
            createEvent: createEvent,
            createEventWithOptions: createEventWithOptions,
            modifyEvent: modifyEvent,
            findEvent: findEvent,
            deleteEvent: deleteEvent,
            listCalendars: listCalendars,
            listEvents: listEvents
        };
    }

})();


/**
 *
 */
(function() {
  'use strict';
    angular.module('ep.hybrid.contacts', []);
})();

/**
 * @ngdoc service
 * @name ep.hybrid.contacts:epHybridContactsService
 * @description
 * Service for accessing Cordova contacts plugin. This will select a contact from device and display the information.
 *
 * Note: Include cordova.js script file in html file and add
 * {@link https://www.npmjs.com/package/cordova-plugin-contacts cordova contacts plugin} into app
 *
 * @example
    <example module="TestApp">
     <file name="index.html">
	     <div ng-controller="SampleCtrl">
            <div class="panel-body">
                <button class="btn btn-block btn-primary" ng-click="pickContact()">
                Pick a Contact from Phone
                </button>
                <div class="card" ng-if="selectedContact != undefined">
                    <div>Name: {{selectedContact.name.formatted}}</div>
                    <div ng-repeat="phone in selectedContact.phoneNumbers">
                        Phone {{ $index + 1 }}: {{phone.value}}
                    </div>
                    <div ng-repeat="email in selectedContact.emails">
                        Email {{ $index + 1 }}: {{email.value}}
                    </div>
                </div>
            </div>
	      </div>
     </file>
     <file name="script.js">
     	angular.module("TestApp", ["ep.hybrid.contacts"])
     		.controller("SampleCtrl",["$scope", "$log", "epHybridContactsService",
                function($scope, epHybridContactsService) {
                    $scope.pickContact = function() {
                        epHybridContactsService.pickContact(
                            onSuccess,
                            onFail
                        );
                    }

                    function onSuccess(result) {
                        $scope.selectedContact = result;
                        $scope.$apply();
                    }

                    function onFail(message) {
                        $log.debug("Pick contacts failed: " + message);
                    }
            }]);
     </file>
   </example>

 */
(function() {
    'use strict';

    epHybridContactsService.$inject = ['$rootScope', '$log'];
    angular.module('ep.hybrid.contacts')
        .service('epHybridContactsService', /*@ngInject*/ epHybridContactsService);

    function epHybridContactsService($rootScope, $log) {

        /**
         * @ngdoc method
         * @name pickContact
         * @methodOf ep.hybrid.contacts:epHybridContactsService
         * @public
         * @param {function} successCallback - function called on success of API call
         * @param {function} errorCallback - function called on error of API call
         * @description
         * To select a contact from the contacts list
         */
        function pickContact(successCallback, errorCallback) {

            if (!navigator.contacts) {
                $log.debug('Cordova contacts not available.');
                return;
            }
            navigator.contacts.pickContact(
                function(result) {
                    $rootScope.$apply(successCallback(result));
                },
                function(error) {
                    $rootScope.$apply(errorCallback(error));
                }
			);
        }

        return {
            pickContact: pickContact
        };
    }

})();

/**
 *
 */
(function() {
  'use strict';
    angular.module('ep.hybrid.device', []);
})();

/**
 * @ngdoc service
 * @name ep.hybrid.device:epHybridDeviceService
 * @description
 * Service for accessing Cordova device plugin. This will fetch the details about the device.
 *
 * Note: Include cordova.js script file in html file and add
 * {@link https://www.npmjs.com/package/cordova-plugin-device cordova device plugin} into app
 *
 * @example
    <example module="TestApp">
     <file name="index.html">
	     <div ng-controller="SampleCtrl">
	     	  <div class="panel-body">
                    Model: {{ deviceModel }}<br>
                    Platform: {{ devicePlatform }}<br>
                    Device ID: {{ deviceId }}<br>
                    Version: {{ deviceVersion }}<br>
              </div>
	      </div>
     </file>
     <file name="script.js">
     	angular.module("TestApp", ["ep.hybrid.device"])
     		.controller("SampleCtrl",["$scope", "epHybridDeviceService",
	     		function($scope, epHybridDeviceService) {
                    $scope.deviceModel = epHybridDeviceService.getModel();
                    $scope.devicePlatform = epHybridDeviceService.getPlatform();
                    $scope.deviceId = epHybridDeviceService.getUUID();
                    $scope.deviceVersion = epHybridDeviceService.getVersion();
	     		}]);
     </file>
   </example>
 */
(function() {
    'use strict';

    epHybridDeviceService.$inject = ['$log', '$window'];
    angular.module('ep.hybrid.device')
        .service('epHybridDeviceService', /*@ngInject*/ epHybridDeviceService);

    function epHybridDeviceService($log, $window) {

        /**
         * @ngdoc method
         * @name getPlatform
         * @methodOf ep.hybrid.device:epHybridDeviceService
         * @public
         * @description
         * To get the OS of the device
         * @returns {string} Operating System name.
         */
        function getPlatform() {
            if (!isDevicePluginAvailable()) {
                return;
            }
            return $window.device.platform;
        }

        /**
         * @ngdoc method
         * @name getModel
         * @methodOf ep.hybrid.device:epHybridDeviceService
         * @public
         * @description
         * To get the model of the device
         * @returns {string} model name.
         */
        function getModel() {
            if (!isDevicePluginAvailable()) { return; }
            return $window.device.model;
        }

        /**
         * @ngdoc method
         * @name getUUID
         * @methodOf ep.hybrid.device:epHybridDeviceService
         * @public
         * @description
         * To get the UUID of the device
         * @returns {string} Device's UUID.
         */
        function getUUID() {
            if (!isDevicePluginAvailable()) { return; }
            return $window.device.uuid;
        }

        /**
         * @ngdoc method
         * @name getVersion
         * @methodOf ep.hybrid.device:epHybridDeviceService
         * @public
         * @description
         * To get OS version of the device
         * @returns {string} Operating System version.
         */
        function getVersion() {
            if (!isDevicePluginAvailable()) { return; }
            return $window.device.version;
        }

        /**
         * @ngdoc method
         * @name isDevicePluginAvailable
         * @methodOf ep.hybrid.device:epHybridDeviceService
         * @private
         * @description
         * To check the cordova device plugin availability
         * @returns {Boolean} true or false based on the device plugin availablity.
         */
        function isDevicePluginAvailable() {
            if (!$window.device) {
                $log.debug('Device plugin not available');
                return false;
            }
            return true;
        }

        return {
            getModel: getModel,
            getPlatform: getPlatform,
            getUUID: getUUID,
            getVersion: getVersion,
            isDevicePluginAvailable: isDevicePluginAvailable
        };
    }

})();

/**
 *
 */
(function() {
    'use strict';
    angular.module('ep.hybrid.emailcomposer', []);
})();

/**
 * @ngdoc service
 * @name ep.hybrid.emailcomposer:epHybridEmailComposerService
 * @description
 * Service for accessing Cordova Email Composer plugin. This provides access to the standard interface that manages the editing and sending an email.
 *
 * Note: Include cordova.js script file in html file and add
 * {@link https://www.npmjs.com/package/cordova-plugin-email cordova email plugin} into app
 *
 * @example
 <example module="TestApp">
 <file name="index.html">
 <div ng-controller="SampleCtrl">
 <div class="panel-body">
 <div><button class="btn btn-primary btn-block" ng-click="sendEmail()">Send An Email</button></div>
 </div>
 </div>
 </file>
 <file name="script.js">
 angular.module('TestApp', ['ep.hybrid.emailcomposer'])
 .controller('SampleCtrl',['$scope', '$log', 'epHybridEmailComposerService',
 function($scope, epHybridEmailComposerService) {

                    $scope.sendEmail = function() {
                        try {
                            epHybridPhotoService.getPicture(
                                onSuccess,
                                onFail,
                                {
                                    quality: 50,
                                    destinationType: Camera.DestinationType.DATA_URL, sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                    correctOrientation: true
                                }
                            );
                        }
                        catch (err) {
                            console.log(err.message);
                        }
                    }

                    function onSuccess(imageData) {
                        try {
                            epHybridEmailComposerService.draftAnEmail({
                                subject: 'EpicApp',
                                body: '<h3>EpicApp Test File Attached</h3>' +
                                '<p>EpicApp Test: ' + '</p>',
                                isHtml: true,
                                attachments: ['base64:image.png//' + imageData]
                            });
                        }
                        catch (ex) {
                            console.log(ex);
                        }
                    }

                    function onFail(message) {
                        console.log("Failed because: " + message);
                    }
     </file>
   </example>
 */
(function() {
    'use strict';

    epHybridEmailComposerService.$inject = ['$log'];
    angular.module('ep.hybrid.emailcomposer')
        .service('epHybridEmailComposerService', /*@ngInject*/ epHybridEmailComposerService);

    function epHybridEmailComposerService($log) {

        /**
         * @ngdoc method
         * @name isEmailAvailable
         * @methodOf ep.hybrid.emailcomposer:epHybridEmailComposerService
         * @private
         * @description
         * To check the availability of cordova email composer plugin.
         * @returns {Boolean} true or false based on the availablity of email composer plugin .
         */
        function isEmailAvailable() {
            var emailAvailable;
            try {
                cordova.plugins.email.isAvailable(
                    function(isAvailable) {
                        emailAvailable = isAvailable;
                    }
                );
            } catch (ex) {
                emailAvailable = false;
                $log.debug('Email service not available' + ex);
            }
            return emailAvailable;
        }

        /**
         * @ngdoc method
         * @name draftAnEmail
         * @methodOf ep.hybrid.emailcomposer:epHybridEmailComposerService
         * @public
         * @param {object} settings - Options to configure the Action Sheet
         * @param {object} settings.to - Array of strings i.e. Email addresses for TO field
         * @param {object} settings.cc - Array of strings i.e. Email addresses for CC field
         * @param {object} settings.bcc - Array of strings i.e. Email addresses for BCC field
         * @param {string} settings.subject - Subject of the email
         * @param {string} settings.body - Email body (for HTML, set isHtml to true)
         * @param {boolean} settings.isHtml - Indicats if the body is HTML or plain text
         * @param {object} settings.attachments - Array of strings i.e. File paths that needs to be attached
         * @description
         * Opens an Email draft with the provided inputs. After opening the draft the user can edit, delete or send an email.
         */

        function draftAnEmail(settings) {
            try {
                cordova.plugins.email.isAvailable(
                    /*jshint validthis:true */
                    function(isAvailable) {
                        if (isAvailable) {
                            var defaults = {
                                to: [],
                                cc: [],
                                bcc: [],
                                subject: '[No Subject]',
                                body: '',
                                isHtml: false,
                                attachments: [],
                                app: 'gmail'
                            };
                            var emailSettings = angular.extend(defaults, settings);
                            if (!angular.isArray(emailSettings.attachments)) {
                                emailSettings.attachments = [emailSettings.attachments];
                            }
                            cordova.plugins.email.open(emailSettings, function(e) {
                                $log.error('An error occurred while attempting to launch the email application.' + e);
                            });
                        } else {
                            $log.warn('Email functionality is not available.');
                        }
                    }, function() {
                        $log.warn('Email functionality is not available.');
                    });
            }
            catch (ex) {
                $log.error('An error occurred while attempting to launch the email application. ' + ex);
            }
        }

        return {
            isEmailAvailable: isEmailAvailable,
            draftAnEmail: draftAnEmail
        };
    }

})();


/**
 *
 */
(function() {
  'use strict';
    angular.module('ep.hybrid.flashlight', []);
})();

/**
 * @ngdoc service
 * @name ep.hybrid.flashlight:epHybridFlashlightService
 * @description
 * Service for accessing Cordova flashlight plugin ({@link https://www.npmjs.com/package/cordova-plugin-flashlight cordova-plugin-flashlight})
 * @example
     <example module="TestApp">
     <file name="index.html">
	     <div ng-controller="SampleCtrl">
            <div class="panel-body">
                <div><button class="btn btn-success btn-block" ng-click="on()">On</button></div> &nbsp
                <div><button class="btn btn-danger btn-block" ng-click="off()">Off</button></div>
            </div>
	      </div>
     </file>
     <file name="script.js">
     	angular.module("TestApp", ["ep.hybrid.flashlight"])
     		.controller("SampleCtrl",["$scope", "epHybridFlashlightService",
                function($scope, epHybridFlashlightService) {
                    // Allows to switch on the flashlight
                    $scope.on = function() {
                        epHybridFlashlightService.flashOn();
                    }

                    // Allows to switch off the flashlight
                    $scope.off = function() {
                        epHybridFlashlightService.flashOff();
                    }
            }]);
     </file>
   </example>
 */
(function() {
    'use strict';

    epHybridFlashlightService.$inject = ['$log'];
    angular.module('ep.hybrid.flashlight')
        .service('epHybridFlashlightService', /*@ngInject*/ epHybridFlashlightService);

    function epHybridFlashlightService($log) {

        /**
         * @ngdoc method
         * @name flashOn
         * @methodOf ep.hybrid.flashlight:epHybridFlashlightService
         * @public
         * @description
         * Allows you to switch the flashlight / torch of the device on.
         */
        function flashOn() {
            window.plugins.flashlight.available(function(isAvailable) {
                if (isAvailable) {
                    // switch on
                    window.plugins.flashlight.switchOn();
                } else {
                    $log.debug('Flashlight not available on this device');
                }
            });

            document.addEventListener('backbutton', function() {
                // pass exitApp as callbacks to the switchOff method
                window.plugins.flashlight.switchOff(exitApp, exitApp);
            }, false);
        }

        /**
         * @ngdoc method
         * @name flashOff
         * @methodOf ep.hybrid.flashlight:epHybridFlashlightService
         * @public
         * @description
         * Allows you to switch the flashlight / torch of the device off.
         */
        function flashOff() {
            // switch off
            window.plugins.flashlight.switchOff();
        }

        function exitApp() {
            navigator.app.exitApp();
        }

        return {
            flashOn: flashOn,
            flashOff: flashOff
        };
    }

})();

/**
 *
 */
(function() {
  'use strict';
    angular.module('ep.hybrid.geolocation', []);
})();

/**
 * @ngdoc service
 * @name ep.hybrid.geolocation:epHybridGeolocationService
 * @description
 * Service for accessing Cordova Geolocation plugin ({@link https://www.npmjs.com/package/cordova-plugin-geolocation cordova-plugin-geolocation})
 * @requires {@link https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places}
 * @example
   <example module="TestApp">
     <file name="index.html">
	     <div ng-controller="SampleCtrl">
            <div class="panel-body">
                <div>
                    <button type="button" class="btn btn-primary btn-block" ng-click="showMap()">Show Multiple Locations</button>
                </div> &nbsp
                <div>
                    <input type="text" id="start" class="form-control" ng-keypress="addNeedClickClass()" value="" placeholder="Choose starting point" />
                    <input type="text" id="end" class="form-control" ng-keypress="addNeedClickClass()" value="" placeholder="Choose destination" />
                </div>
                <div id="map"></div>
            </div>
	      </div>
     </file>
     <file name="script.js">
     	angular.module("TestApp", ["ep.hybrid.geolocation"])
     		.controller("SampleCtrl",["$scope", "epHybridGeolocationService",
                function($scope, epHybridGeolocationService) {

                    //Specially this method need to be included while using autocomplete textboxes in ios devices
                    $scope.addNeedClickClass = function() {
                        $('.pac-container').bind('touchstart', function(event) {
                        event.target.classList.add('needsclick');
                        });
                    };

                    epHybridGeolocationService.getGeolocation(
                        onSucess,
                        onError,
                        { timeout: 10000, enableHighAccuracy: true }
                     );

                function onSucess(position) {
                        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                        //Elements assigned to variables
                        var element = document.getElementById('map');
                        var start = document.getElementById('start');
                        var end = document.getElementById('end');

                        //To get/show map
                        var map = epHybridGeolocationService.showMap(latLng, element);

                        //Adds marker on map
                        epHybridGeolocationService.addMarker(latLng, map);

                        //Get the from and to autocomplete inputs and show direction
                        epHybridGeolocationService.autocompleteAndAssociatedActions(map, start, end);

                        //Adds multiple markers on map, based on the given locations
                        $scope.showMultipleLocations = function()
                        {

                            //locations as list of Objects with name, latitude and longitude of the locations
                            var locations = [
                                ['Bondi Beach', -33.890542, 151.274856],
                                ['Coogee Beach', -33.923036, 151.259052],
                                ['Cronulla Beach', -34.028249, 151.157507]
                            ];

                            //Or locations as a list of strings with names of locations
                            //var locations = ['Bondi Beach', 'Coogee Beach',...];

                            epHybridGeolocationService.addMultipleMarkers(locations, map);
                        }
                }

                function onError(error) {
                    console.log("Showing map failed: " + error);
                }
            }]);
     </file>
   </example>
 */
(function() {
    'use strict';

    epHybridGeolocationService.$inject = ['$rootScope', '$log'];
    angular.module('ep.hybrid.geolocation')
        .service('epHybridGeolocationService', /*@ngInject*/ epHybridGeolocationService);

    function epHybridGeolocationService($rootScope, $log) {

        var directionsDisplay;
        var marker;

        /**
         * @ngdoc method
         * @name getGeolocation
         * @methodOf ep.hybrid.geolocation:epHybridGeolocationService
         * @public
         * @param {function} successCallback - function called on success of API call
         * @param {function} errorCallback - function called on error of API call
         * @param {object} options - Cordova Geolocation Plugin options
         * @param {boolean} options.enableHighAccuracy - Indicates the application would like to receive the best possible results
         * @param {number} options.timeout - Represents the maximum length of time (in milliseconds) the device is allowed to take in order to return a position
         * @param {number} options.maximumAge - Indicates the maximum age in milliseconds of a possible cached position that is acceptable to return
         * @description
         * To get geolocation
         */
        function getGeolocation(successCallback, errorCallback, options) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    $rootScope.$apply(successCallback(position));
                },
                function(error) {
                    $rootScope.$apply(errorCallback(error));
                },
                options
			);
        }

        /**
         * @ngdoc method
         * @name showMap
         * @methodOf ep.hybrid.geolocation:epHybridGeolocationService
         * @public
         * @param {object} latLng - Includes latitude and longitude
         * @param {object} element - Element to display map on
         * @description
         * To show map
         */
        function showMap(latLng, element) {
            var mapOptions =
                    {
                        zoom: 16,
                        center: latLng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                    };
            try {
                var map = new google.maps.Map(element, mapOptions);
                return map;
            }
            catch (error) {
                $log.debug('Error: ' + error);
            }
        }

        /**
         * @ngdoc method
         * @name addMarker
         * @methodOf ep.hybrid.geolocation:epHybridGeolocationService
         * @public
         * @param {object} latLng - Includes latitude and longitude
         * @param {object} map - Map on which the marker need to be placed
         * @description
         * To show marker/pin on map
         */
        function addMarker(latLng, map) {
            //To remove previous markers
            if (marker) {
                marker.setMap(null);
            }

            //To add new marker
            marker = new google.maps.Marker({
                position: latLng,
                animation: google.maps.Animation.DROP
            });
            if (!latLng || !map) {
                return;
            } else {
                map.setCenter(latLng);
                marker.setMap(map);
            }
        }

        /**
         * @ngdoc method
         * @name addMultipleMarkers
         * @methodOf ep.hybrid.geolocation:epHybridGeolocationService
         * @public
         * @param {object} locations - Includes list of locations (Example: locations = ['Bondi Beach', ...] or locations = ['Bondi Beach', -33.890542, 151.274856], ...) where the pins need to be placed
         * @param {object} map - Map on which the markers need to be placed
         * @description
         * To show multiple markers/pins on map
         */
        function addMultipleMarkers(locations, map) {

            if (!locations || locations.length === 0) {
                return;
            }

            var infowindow = new google.maps.InfoWindow({
                maxWidth: 160
            });

            var bounds = new google.maps.LatLngBounds();
            var geocoder = new google.maps.Geocoder();

            if (angular.isString(locations[0])) {
                // Add the markers on map for the list of locations containing names
                locations.forEach(function(location) {
                    geocoder.geocode({
                        'address': location
                    }, function(results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            var marker = new google.maps.Marker({
                                position: results[0].geometry.location,
                                map: map
                            });

                            google.maps.event.addListener(marker, 'click', (function(marker) {
                                return function() {
                                    // because formatted_address does not conform with jscs rules - turn them off here
                                    // jscs:disable
                                    infowindow.setContent(results[0].formatted_address);
                                    // jscs:enable
                                    infowindow.open(map, marker);
                                };
                            })(marker));

                            bounds.extend(results[0].geometry.location);
                            //  Fit the bounds to map
                            map.fitBounds(bounds);
                        } else {
                            $log.debug('Geocode of ' + location + ' return ' + status);
                        }
                    });
                });
            }

            function mapClick(marker, index, locations, map) {
                infowindow.setContent(locations[index][0]);
                infowindow.open(map, marker);
            }
            if (angular.isObject(locations[0])) {
                // Add the markers on map, for the list of locations containing names and respective latitude and longitude
                for (var i = 0; i < locations.length; i++) {

                    if (angular.isArray(locations[i])) {
                        try {
                            var latLng = new google.maps.LatLng(locations[i][1], locations[i][2]);

                            var marker = new google.maps.Marker({
                                position: latLng,
                                map: map
                            });

                            google.maps.event.addListener(marker, 'click', mapClick
                                .bind(null, marker, i, locations, map));

                            bounds.extend(latLng);
                            //  Fit the bounds to map
                            map.fitBounds(bounds);
                        }
                        catch (e) {
                            $log.error('Something went wrong. Please provide valid location addresses. Error: ' + e);
                        }
                    } else {
                        $log.debug('Location address is not valid');
                    }
                }
            }
        }

        /**
         * @ngdoc method
         * @name calculateAndDisplayRoute
         * @methodOf ep.hybrid.geolocation:epHybridGeolocationService
         * @public
         * @param {string} start - Place Id of origin
         * @param {string} end - Place Id of destination
         * @description
         * To calculate the route/direction from the inputs
         */
        function calculateAndDisplayRoute(start, end) {
            //Return if start/end is not present
            if (!start || !end) {
                return;
            }

            //Receives direction requests and returns computed results
            var directionsService = new google.maps.DirectionsService();
            marker.setMap(null);
            directionsService.route({
                origin: { 'placeId': start },
                destination: { 'placeId': end },
                travelMode: google.maps.TravelMode.DRIVING
            }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    $log.error('Directions request failed : Not a valid location for driving');
                    return;
                }
            });
        }

        /**
         * @ngdoc method
         * @name autocompleteAndAssociatedActions
         * @methodOf ep.hybrid.geolocation:epHybridGeolocationService
         * @public
         * @param {object} map - Map on which the marker need to be placed
         * @param {object} originInput - Origin element to enable autocomplete
         * @param {object} destinationInput - Destination element to enable autocomplete
         * @description
         * To autocomplete inputs returning place predictions and performing required actions
         */
        function autocompleteAndAssociatedActions(map, originInput, destinationInput) {
            var start;
            var end;

            if (directionsDisplay !== undefined) {
                directionsDisplay.setMap(null);
            }

            directionsDisplay = new google.maps.DirectionsRenderer();

            directionsDisplay.setMap(map);//Set Map

            if (originInput) {
                //Autocomplete and actions on Origin textbox
                var origin = new google.maps.places.Autocomplete(originInput);
                google.maps.event.addListener(origin, 'place_changed', function() {
                    var from = origin.getPlace();
                    // because palce_id does not conform with jscs rules - turn them off here
                    // jscs:disable
                    start = from.place_id;
                    // jscs:enable

                    $rootScope.$watch('start', function() {
                        console.log('origin:' + start);
                    });

                    addMarker(from.geometry.location, map);
                    calculateAndDisplayRoute(start, end);
                });
            }

            if (destinationInput) {
                //Autocomplete and actions on destination textbox
                var destination = new google.maps.places.Autocomplete(destinationInput);
                google.maps.event.addListener(destination, 'place_changed', function() {
                    var to = destination.getPlace();
                    // because palce_id does not conform with jscs rules - turn them off here
                    // jscs:disable
                    end = to.place_id;
                    // jscs:enable

                    $rootScope.$watch('end', function() {
                        console.log('destination:' + end);
                    });

                    addMarker(to.geometry.location, map);
                    calculateAndDisplayRoute(start, end);
                });
            }
        }

        return {
            getGeolocation: getGeolocation,
            showMap: showMap,
            addMarker: addMarker,
            addMultipleMarkers: addMultipleMarkers,
            calculateAndDisplayRoute: calculateAndDisplayRoute,
            autocompleteAndAssociatedActions: autocompleteAndAssociatedActions
        };
    }

})();

/**
 *
 */
(function() {
    'use strict';
    angular.module('ep.hybrid.gpstracker', []);
})();

/**
 * @ngdoc service
 * @name ep.hybrid.gpstracker:epHybridGPSTrackerService
 * @description
 * Service for accessing Cordova foreground and background geolocation service
 *
 *
 * @example
    <example module="TestApp">
     <file name="index.html">
	     <div ng-controller="SampleCtrl">
            <div class="panel-body">
            </div>
	      </div>
     </file>
     <file name="script.js">
     	angular.module('TestApp', ['ep.hybrid.gpstracker'])
     		.controller('SampleCtrl',['$scope', '$log', 'epHybridGPSTrackerService',
	     		function($scope, epHybridGPSTrackerService) {  }]);
     </file>
   </example>
 */
(function(backgroundGeolocation) {
    'use strict';

    epHybridGPSTrackerService.$inject = ['$rootScope', '$log'];
    angular.module('ep.hybrid.gpstracker')
        .service('epHybridGPSTrackerService', /*@ngInject*/ epHybridGPSTrackerService);

    function epHybridGPSTrackerService($rootScope, $log) {

        var gpsConfigured = false;

        /**
         * @ngdoc method
         * @name background
         * @methodOf ep.hybrid.gpstracker:epHybridGPSTrackerService
         * @public
         * @param {function} successCallback - function called on success of API call
         * @param {function} errorCallback - function called on error of API call
         * @description
         * To get geolocation
         */
        function background(successCallback, errorCallback, options) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    $rootScope.$apply(successCallback(position));
                },
                function(error) {
                    $rootScope.$apply(errorCallback(error));
                },
                options
			);
        }

        function configureGPSTracking() {
            /*
             * This callback will be executed every time a geolocation is recorded in the background.
             */
            var callbackFn = function(position) {
                //write the lat / long
                console.log('[js] BackgroundGeolocation callback:  ' + position.latitude + ',' + position.longitude);

                /*
                 IMPORTANT:  We must execute the finish method here to inform the native plugin that we are finished,
                 and the background-task may be completed. IF YOU DON'T, ios will CRASH YOUR APP for spending
                 too much time in the background.
                 */
                backgroundGeolocation.finish();
            };

            var failureFn = function(error) {
                $log.error('Error capturing geolocation - ' + error.message);
            };

            // If we're not running in the browser, then turn on the geolocation service
            //if (window.backgroundGeolocation) {
                //setup geolocation tracking settings
                backgroundGeolocation.configure(callbackFn, failureFn, {
                    desiredAccuracy: 0, //set to 10 for best performance / battery power consumption
                    stationaryRadius: 0, //if inside of 10 meters it will not track
                    distanceFilter: 0, //only send every 3 meters
                    debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                    stopOnTerminate: false, // <-- enable this to clear background location settings when the app terminates

                });

                //turn ON the background-geolocation system if the track GPS setting is turned on.
                backgroundGeolocation.start();
            //} else {
            //    $log.debug('No background geolocation service is available.');
            //}
        }

        function startGPSTracking() {
            var bg = backgroundGeolocation;
            console.log(bg);
            //if (!gpsConfigured && window.backgroundGeoLocation) {
                $log.info('GPS background tracking started.');
                gpsConfigured = true;
                configureGPSTracking();
            //}
        }

        function stopGPSTracking() {
            //if (gpsConfigured && window.backgroundGeoLocation) {
                $log.info('GPS background tracking stopped.');
                gpsConfigured = false;
                backgroundGeolocation.stop();
            //}
        }

        return {
            background: background,
            startGPSTracking: startGPSTracking,
            stopGPSTracking: stopGPSTracking
        };
    }

})(window.backgroundGeolocation);

/**
 *
 */
(function() {
  'use strict';
    angular.module('ep.hybrid.media', []);
})();

/**
 * @ngdoc service
 * @name ep.hybrid.media:epHybridMediaService
 * @description
 * Service for accessing Cordova Media plugin
 *
 * @example
   <example module="TestApp">
     <file name="index.html">
	     <div ng-controller="SampleCtrl">
            <div class="panel-body">
                <div><button class="btn btn-primary btn-block" ng-click="playMusic()">Let's Jam!</button></div> &nbsp
                <div><button class="btn btn-primary btn-block" ng-click="stopMusic()">Stop</button></div>
            </div>
	      </div>
     </file>
     <file name="script.js">
     	angular.module("TestApp", ["ep.hybrid.media"])
     		.controller("SampleCtrl",["$scope", "$log", "epHybridMediaService",
                function($scope, epHybridMediaService) {
                    var audioUrl = "http://www.sounddogs.com/sound-effects/2217/mp3/410647_SOUNDDOGS__wo.mp3";

                    $scope.playMusic = function() {
                        epHybridMediaService.playAudio(audioUrl);
                    }

                    $scope.stopMusic = function() {
                        epHybridMediaService.stopAudio(audioUrl);
                    }
            }]);
     </file>
   </example>
 */
(function() {
    'use strict';

    angular.module('ep.hybrid.media')
        .service('epHybridMediaService', /*@ngInject*/ epHybridMediaService);

    function epHybridMediaService() {

        var myMedia = null;
        /**
         * @ngdoc method
         * @name playAudio
         * @methodOf ep.hybrid.media:epHybridMediaService
         * @public
         * @param {url} url - url to media file
         * @description
         * To play the media music
         */
        function playAudio(url) {
           myMedia = new Media(url,
               // success callback
               function() {
                   console.log('playAudio():Audio Success');
               },
               // error callback
               function(err) {
                   console.log('playAudio():Audio Error: ' + err);
               }
           );
            // Play audio
            myMedia.play();
        }

        /**
         * @ngdoc method
         * @name stopAudio
         * @methodOf ep.hybrid.media:epHybridMediaService
         * @public
         * @description
         * To stop the media music
         */
        function stopAudio() {
            //stop the audio
            if (myMedia !== null) {
                myMedia.stop();
            }
        }
        return {
            playAudio: playAudio,
            stopAudio: stopAudio
        };
    }
})();

/**
 *
 */
(function() {
  'use strict';
    angular.module('ep.hybrid.network', []);
})();

/**
 * @ngdoc service
 * @name ep.hybrid.network:epHybridNetworkService
 * @description
 * Service for accessing Cordova Network-Information plugin
 *
 * Note: Include cordova.js script file in html file and add
 * {@link https://www.npmjs.com/package/cordova-plugin-network-information cordova network information plugin} into app.
 *
 * @example
   <example module="TestApp">
     <file name="index.html">
	    <div class="ep-fullscreen" id="network">
            <div class="panel panel-default">
                <div class="panel-heading ep-align-center">
                    <span class="ep-ci-network-status fa-2x text-warning"></span> Internet Status
                </div>
                <div class="panel-body ep-align-center" style="margin-left:5px">
                    {{status}}
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading ep-align-center">
                    <span class="ep-ci-network-status fa-2x text-warning"></span> Internet Type
                </div>
                <div class="panel-body ep-align-center" style="margin-left:5px">
                    {{type}}
                </div>
            </div>
        </div>
     </file>
     <file name="script.js">
     	angular.module('TestApp', ['ep.hybrid.network'])
     		.controller('networkCtrl',['$scope', '$log', 'epHybridMediaService',
                function($scope, epHybridNetworkService){
                    function checkStatus() {
                     var type = epHybridNetworkService.checkConnection();
                     if (type == epNetworkStatus.Unknown || type == epNetworkStatus.None) {
                        $scope.status = "OFF";
                        $scope.type = type;
                      }
                      else {
                        $scope.status = "ON";
                        $scope.type = type;
                     }
                }
            }]);
     </file>
   </example>
 */
(function() {
    'use strict';

    angular.module('ep.hybrid.network')
        .constant('epNetworkStatus', {
            Unknown: 'unknown',
            Ethernet: 'ethernet',
            Wifi: 'wifi',
            Cell2g: '2g',
            Cell3g: '3g',
            Cell4g: '4g',
            Cell: 'cellular',
            None: 'none'
        })

        .service('epHybridNetworkService', /*@ngInject*/ epHybridNetworkService);

    function epHybridNetworkService() {
        /**
         * @ngdoc method
         * @name checkConnection
         * @methodOf ep.hybrid.network:epHybridNetworkService
         * @public
         * @description
         * To check the internet connection and status
         */
        function checkConnection() {
            return navigator.connection.type;
        }
        return {
            checkConnection: checkConnection
        };
    }
})();

/**
 *
 */
(function() {
  'use strict';
    angular.module('ep.hybrid.photo', []);
})();

/**
 * @ngdoc service
 * @name ep.hybrid.photo:epHybridPhotoService
 * @description
 * Service for accessing Cordova camera plugin. This will allow to take picture from camera
 * or to select a picture from photo library.
 *
 * Note: Include cordova.js script file in html file and add
 * {@link https://www.npmjs.com/package/cordova-plugin-camera cordova camera plugin} into app.
 *
 * @example
   <example module="TestApp">
     <file name="index.html">
	     <div ng-controller="SampleCtrl">
            <div class="panel-body">
                <img id="pictureImage" class="full-image img-thumbnail" src="">
                <div><button class="btn btn-primary btn-block" ng-click="takePicture()">Take Picture</button></div> &nbsp
                <div><button class="btn btn-primary btn-block" ng-click="loadPicture()">Load from Photo Library</button></div>
            </div>
	      </div>
     </file>
     <file name="script.js">
     	angular.module("TestApp", ["ep.hybrid.photo"])
     		.controller("SampleCtrl",["$scope", "$log", "epHybridPhotoService",
	     		function($scope, epHybridPhotoService) {
                    $scope.takePicture = function() {
                        epHybridPhotoService.getPicture(
                            onSuccess,
                            onFail,
                            { quality: 50, destinationType: Camera.DestinationType.DATA_URL, correctOrientation: true }
                        );
                    };

                    $scope.loadPicture = function() {
                        epHybridPhotoService.getPicture(
                            onSuccess,
                            onFail,
                            {
                                quality: 50,
                                destinationType: Camera.DestinationType.DATA_URL, sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                correctOrientation: true
                            }
                        );
                    };

                    function onSuccess(imageData) {
                        var image = document.getElementById('pictureImage');
                        image.src = "data:image/jpeg;base64," + imageData;
                    }

                    function onFail(message) {
                        $log.debug('Failed because: ' + message);
                    }
            }]);
     </file>
   </example>

 */
(function() {
    'use strict';

    epHybridPhotoService.$inject = ['$rootScope'];
    angular.module('ep.hybrid.photo')
        .service('epHybridPhotoService', /*@ngInject*/ epHybridPhotoService);

    function epHybridPhotoService($rootScope) {

        /**
         * @ngdoc method
         * @name getPicture
         * @methodOf ep.hybrid.photo:epHybridPhotoService
         * @public
         * @param {function} successCallback - function called on success of API call
         * @param {function} errorCallback - function called on error of API call
         * @param {object} options - Cordova Camera Plugin options. This will override camera.CameraOptions object of cordova
         * @param {number} options.quality - Quality of the saved image, expressed as a range of 0-100
         * @param {DestinationType} options.destinationType - The format of the return value. This is a static enum property of Camera
         * <pre>
         *      Camera.DestinationType.DATA_URL - Return base64 encoded string
         *      Camera.DestinationType.FILE_URI - Default. Return file uri (content://media/external/images/media/2 for Android)
         *      Camera.DestinationType.NATIVE_URI - Return native uri (eg. asset-library://... for iOS)
         * </pre>
         * @param {PictureSourceType} options.sourceType - Set the source of the picture. This is a static enum property of Camera.
         * <pre>
         *      Camera.PictureSourceType.PHOTOLIBRARY - Choose image from picture library
         *      Camera.PictureSourceType.CAMERA - Take picture from camera
         * </pre>
         * @param {Boolean} options.allowEdit - Allow simple editing of image before selection.
         * @param {EncodingType} options.encodingType - Choose the returned image file's encoding.
         * <pre>
         *      Camera.EncodingType.JPEG - Return JPEG encoded image
         *      Camera.EncodingType.PNG - Return PNG encoded image
         * </pre>
         * @param {number} options.targetWidth - Width in pixels to scale image. Must be used with targetHeight. Aspect ratio remains constant.
         * @param {number} options.targetHeight - Height in pixels to scale image. Must be used with targetWidth. Aspect ratio remains constant.
         * @param {MediaType} options.mediaType - Set this option when PictureSourceType is PHOTOLIBRARY.
         * <pre>
         *      Camera.MediaType.PICTURE - Allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType
         *      Camera.MediaType.VIDEO - Allow selection of video only, ONLY RETURNS URL
         *      Camera.MediaType.ALLMEDIA - Allow selection from all media types
         * </pre>
         * @param {Boolean} options.correctOrientation - Rotate the image to correct for the orientation of the device during capture.
         * @param {Boolean} options.saveToPhotoAlbum - Save the image to the photo album on the device after capture.
         * @param {CameraPopoverOptions} options.popoverOptions - iOS-only options that specify popover location in iPad.
         * @param {Direction} options.cameraDirection - Choose the camera to use (front- or back-facing).
         * <pre>
         *      Camera.Direction.BACK - Use the back-facing camera
         *      Camera.Direction.FRONT - Use the front-facing camera
         * </pre>
         * @description
         * To take picture using camera or load photos from gallery
         */
        function getPicture(successCallback, errorCallback, options) {
            navigator.camera.getPicture(
				function(imageData) {
					$rootScope.$apply(successCallback(imageData));
				},
				function(error) {
					$rootScope.$apply(errorCallback(error));
				},
				options
			);
        }

        return {
            getPicture: getPicture
        };
    }

})();

/**
 *
 */
(function() {
  'use strict';
    angular.module('ep.hybrid.vibration', []);
})();

/**
 * @ngdoc service
 * @name ep.hybrid.vibration:epHybridVibrationService
 * @description
 * Service for accessing Cordova vibration plugin. This will make the device vibrate for 3 seconds.
 *
 * Note: Include cordova.js script file in html file and add
 * {@link https://www.npmjs.com/package/cordova-plugin-vibration cordova vibration plugin} into app.
 *
 * @example
   <example module="TestApp">
     <file name="index.html">
	     <div ng-controller="SampleCtrl">
            <div class="panel-body">
                <div><button class="btn btn-primary" style="width:100%" ng-click="vibration()">Vibrate me!</button></div> &nbsp
            </div>
	      </div>
     </file>
     <file name="script.js">
     	angular.module("TestApp", ["ep.hybrid.vibration"])
     		.controller("SampleCtrl",["$scope", "$log", "epHybridVibrationService",
                function($scope, epHybridVibrationService) {
                    var sec = 3000;
                    $scope.vibration = function() {
                        epHybridVibrationService.vibrateDevice(sec);
                    }
            }]);
     </file>
   </example>
 */
(function() {
    'use strict';

    angular.module('ep.hybrid.vibration')
        .service('epHybridVibrationService', /*@ngInject*/ epHybridVibrationService);
    function epHybridVibrationService() {

        /**
        * @ngdoc method
        * @name vibrateDevice
        * @methodOf ep.hybrid.vibration:epHybridVibrationService
        * @public
        * @param {sec} sec - number of seconds device to vibrate
        * @description
        * Make the device to vibrate
        */
        function vibrateDevice(sec) {
            navigator.vibrate([sec]);
        }

        return {
            vibrateDevice: vibrateDevice
        };
    }

})();

/**
 * @ngdoc directive
 * @name ep.icon.selector:epIconSelector
 * @restrict EA
 *
 * @description
 * Represents fontawesome icon selector
 *
 * @property {string} width:string
 * This is the width of entire icon selector component. Example values 500px, 80% etc...Default is 100%.
 *
 * @property {string} iconListWidth:string
 * This is the width of icon selector drop down menu. Example values 200px, 300px etc...Default is 295px.
 *
 * @property {string} iconListHeight:string
 * This is the maximum height of icon selector list in the drop down menu. Example values 200px, 300px etc...Default is 400px.
 *
 * @example
 *  <pre>
 *      <ep-icon-selector></ep-icon-selector>
 *  </pre>
 */
(function() {
    'use strict';

    epIconSelectorDirective.$inject = ['epIconSelectorService'];
    angular.module('ep.icon.selector').directive('epIconSelector', epIconSelectorDirective);

    function epIconSelectorDirective(epIconSelectorService) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngModel: '=',
                width: '@',
                iconListWidth: '@',
                iconListHeight: '@'
            },
            templateUrl: 'src/components/ep.icon.selector/icon_selector.html',
            link: function(scope) {

                //read icons from fontawesome css file
                scope.icons = epIconSelectorService.getIconList();

                scope.selectIcon = function(icon) {
                    scope.ngModel = 'fa-' + icon;
                };

            }
        };
    }
})();

/**
 * @ngdoc service
 * @name ep.icon.selector:epIconSelectorService
 * @description
 * Provides methods for getting the icon classes from icon css file.
 *
 * @example
 *
 */
(function() {
    'use strict';

    angular.module('ep.icon.selector').factory('epIconSelectorService', epIconSelectorService);

    function epIconSelectorService() {

        /**
         * @ngdoc method
         * @name getIconList
         * @methodOf ep.icon.selector:epIconSelectorService
         * @public
         * @description
         * To read the icon classes from icon css file.
         */
        function getIconList() {
            var icons = $.map($.map(document.styleSheets, function(s) {
                if (s.href && s.href.endsWith('font-awesome.min.css')) {
                    return s;
                }
                return null;
            })[0].rules, function(r) {
                if (r.cssText.indexOf('::before { content: ') > 0) {
                    var multipleCSS = [];
                    var count = (r.cssText.match(/::before/g) || []).length;
                    if (count > 1) {
                        multipleCSS = r.cssText.split(',');
                        for (var i = 0; i < multipleCSS.length; i++) {
                            var css = multipleCSS[i].trim();
                            multipleCSS[i] = css.substring(4, css.indexOf('::'));
                        }
                        return multipleCSS;
                    }
                    return r.cssText.substring(4, r.cssText.indexOf('::'));
                }
                return null;
            });

            return icons;
        }
        return {
            getIconList: getIconList
        };
    }
})();

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
 * Created by brent on 10/12/16.
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name ep.indexeddb.service:epIndexedDbService
     * @description
     * Service for the ep.indexeddb module
     * This service provides an interface to cache data on device
     *
     * @example
     *
     */
    epIndexedDbService.$inject = ['$log', '$q', '$window'];
    angular.module('ep.indexeddb')
        .service('epIndexedDbService', epIndexedDbService);

    var schemas = {};
    var openDatabaseMap = {};

    function Schema(name) {
        this.name = name;
        this.versions = [];
        this.versionDefinitionFuncs = {};
    }
    Schema.prototype.defineVersion = function(version, definitionFunc) {
        this.versions.push(version);
        this.versionDefinitionFuncs['version ' + version] = definitionFunc;
    };
    Schema.prototype.upgrade = function(db, version) {
        var upgradeFunc = this.versionDefinitionFuncs['version ' + version];
        if (upgradeFunc) {
            upgradeFunc(db);
        }
    };

    function DatabaseWrapper($log, $q, db) {
        this.$log = $log;
        this.$q = $q;
        this.db = db;
    }
    DatabaseWrapper.prototype.getObjectStore = function(objectStoreName) {
        return new ObjectStoreWrapper(this.$log, this.$q, this.db, objectStoreName);
    };

    var proto = {
        get: function(key) {
            return this._execute('readonly', function(store) {
                return store.get(key);
            });
        },
        getAll: function() {
            return this._execute('readonly', function(store) {
                return store.getAll();
            });
        },
        getAllKeys: function() {
            return this._execute('readonly', function(store) {
                return store.getAllKeys();
            });
        },
        clear: function() {
            return this._execute('readwrite', function(store) {
                return store.clear();
            });
        },
        count: function() {
            return this._execute('readonly', function(store) {
                return store.count;
            });
        }
    };
    function ObjectStoreWrapper($log, $q, db, name) {
        this.$log = $log;
        this.$q = $q;
        this.db = db;
        this.name = name;
    }
    ObjectStoreWrapper.prototype._execute = function(mode, activity) {
        var self = this;
        var deferred = self.$q.defer();
        var transaction = this.db.transaction(self.name, mode);
        transaction.oncomplete = function() {
            self.$log.debug('Transaction completed on ' + self.name);
        };
        transaction.onerror = function(e) {
            self.$log.warn('Transaction error occurred on ' + self.name + '. ' + e);
            deferred.reject(e)
        };

        var store = transaction.objectStore(self.name);
        var request = activity(store);
        request.onsuccess = function(e) {
            var result = e && e.target && e.target.result;
            deferred.resolve(result);
        };
        request.onerror = function(e) {
            self.$log.warn('Request error occurred on ' + self.name + '. ' + e);
            deferred.reject(e);
        };

        return deferred.promise;
    };
    ObjectStoreWrapper.prototype.openCursor = function() {
        var self = this;
        var deferred = $q.defer();
        var objectStore = self.db.transaction(this.name, 'readwrite').objectStore(self.name);
        var cursorRequest = objectStore.openCursor();
        cursorRequest.onsuccess = function(e) {
            var cursor = e.target.result;
            if (cursor) {
                deferred.notify(cursor.value);
                cursor.continue();
            } else {
                deferred.resolve();
            }
        };
        cursorRequest.onerror = function(e) {
            deferred.reject(e);
        };
        return deferred.promise;
    };
    ObjectStoreWrapper.prototype.openKeyCursor = function(keyRange, direction) {
        var self = this;
        var deferred = $q.defer();
        var objectStore = self.db.transaction(this.name, 'readwrite').objectStore(self.name);
        var cursorRequest = objectStore.openKeyCursor(keyRange, direction);
        cursorRequest.onsuccess = function(e) {
            var cursor = e.target.result;
            if (cursor) {
                deferred.notify(cursor.value);
                cursor.continue();
            } else {
                deferred.resolve();
            }
        };
        cursorRequest.onerror = function(e) {
            deferred.reject(e);
        };
        return deferred.promise;
    };
    ObjectStoreWrapper.prototype.delete = function(key) {
        return this._execute('readwrite', function(store) {
            return store.delete(key);
        });
    };
    ObjectStoreWrapper.prototype.put = function(value) {
        return this._execute('readwrite', function(store) {
            return store.put(value);
        });
    };
    ObjectStoreWrapper.prototype.add = function(value) {
        return this._execute('readwrite', function(store) {
            return store.add(value);
        })
    };
    ObjectStoreWrapper.prototype.index = function(name) {
        var self = this;
        return this._execute('readonly', function(store) {
            return new IndexWrapper(self.$log, self.$q, self.db, store.index(name), name);
        });
    };
    ObjectStoreWrapper.prototype.deleteByIndex = function(indexName, indexValue) {
        var self = this;
        var deferred = self.$q.defer();
        var trans = self.db.transaction(self.name, 'readwrite');
        var store = trans.objectStore(self.name);
        var idx = store.index(indexName);
        var deleteRequest = idx.openKeyCursor(IDBKeyRange.only(indexValue));
        deleteRequest.onsuccess = function() {
            var cursor = deleteRequest.result;
            if (cursor) {
                store.delete(cursor.primaryKey);
                cursor.continue();
                deferred.notify();
            } else {
                deferred.resolve(true);
            }
        };
        deleteRequest.onerror = function(e) {
            deferred.reject(e);
        };
        return deferred.promise;
    };
    ObjectStoreWrapper.prototype.queryByIndex = function(indexName, indexValue) {
        var self = this;
        var deferred = self.$q.defer();
        var trans = self.db.transaction(self.name, 'readwrite');
        var store = trans.objectStore(self.name);
        var idx = store.index(indexName);
        var result = [];
        var request = idx.openKeyCursor(IDBKeyRange.only(indexValue));
        request.onsuccess = function() {
            var cursor = request.result;
            if (cursor) {
                var getRequest = store.get(cursor.primaryKey);
                getRequest.onsuccess = function(e) {
                    var row = e && e.result && e.result.target;
                    result.push(row);
                    cursor.continue();
                    deferred.notify(row);
                };
                getRequest.onerror = function() {
                    self.$log.warn('An error occurred while executing query ' + indexName + '=' + indexValue);
                    cursor.continue();
                }
            } else {
                deferred.resolve(result);
            }
        };
        request.onerror = function(e) {
            deferred.reject(e);
        };
        return deferred.promise;
    };

    angular.extend(ObjectStoreWrapper.prototype, proto);

    function IndexWrapper($log, $q, db, index, name) {
        this.$q = $q;
        this.$log = $log;
        this.db = db;
        this.index = index;
        this.name = name;
    }
    IndexWrapper.prototype._execute = function(mode, activity) {
        var self = this;
        var deferred = self.$q.defer();

        var request = activity(self.index);
        request.onsuccess = function(e) {
            var result = e && e.target && e.target.result;
            deferred.resolve(result);
        };
        request.onerror = function(e) {
            self.$log.warn('Request error occurred on ' + self.name + '. ' + e);
            deferred.reject(e);
        };

        return deferred.promise;
    };
    IndexWrapper.prototype.openCursor = function() {
        var self = this;
        var deferred = $q.defer();
        var cursorRequest = self.index.openCursor();
        cursorRequest.onsuccess = function(e) {
            var cursor = e.target.result;
            if (cursor) {
                deferred.notify(cursor.value);
                cursor.continue();
            } else {
                deferred.resolve();
            }
        };
        cursorRequest.onerror = function(e) {
            deferred.reject(e);
        };
        return deferred.promise;
    };
    IndexWrapper.prototype.openKeyCursor = function() {
        var self = this;
        var deferred = $q.defer();
        var cursorRequest = self.index.openCursor();
        cursorRequest.onsuccess = function(e) {
            var cursor = e.target.result;
            if (cursor) {
                deferred.notify(cursor.value);
                cursor.continue();
            } else {
                deferred.resolve();
            }
        };
        cursorRequest.onerror = function(e) {
            deferred.reject(e);
        };
        return deferred.promise;
    };
    angular.extend(IndexWrapper.prototype, proto);

    /*@ngInject*/
    function epIndexedDbService($log, $q, $window) {

        var indexedDB = $window.indexedDB || $window.mozIndexedDB || $window.webkitIndexedDB || $window.msIndexedDB;

        /**
         * @ngdoc method
         * @name createSchema
         * @methodOf ep.indexeddb.service:epIndexedDbService
         * @public
         * @description
         * Create a new database schema
         * @param {string} databaseName - the name of the database to create
         * @returns {Schema} The newly created schema object.
         */
        function createSchema(databaseName) {
            schemas[databaseName] = new Schema(name);
            return schemas[databaseName];
        }

        /**
         * @ngdoc method
         * @name closeDatabase
         * @methodOf ep.indexeddb.service:epIndexedDbService
         * @public
         * @description
         * Closes an open database
         * @param {string} id - the id of the database to close
         */
        function closeDatabase(id) {
            delete openDatabaseMap[id]
        }

        /**
         * @ngdoc method
         * @name openDatabase
         * @methodOf ep.indexeddb.service:epIndexedDbService
         * @public
         * @description
         * Opens a database that has been previously defined.
         * @param {string} id - the id of the database to open
         * @param {number} version - version of the database to open
         * @returns {Promise} A promise that resolves with a DatabaseWrapper instance when the database is opened,
         * or rejected on failure
         */
        function openDatabase(id, version) {
            var deferred = $q.defer();
            if (openDatabaseMap[id]) {
                deferred.resolve(openDatabaseMap[id]);
            } else {
                var openRequest = indexedDB.open(id, version);
                openRequest.onsuccess = function() {
                    var db = openRequest.result;
                    var wrapper = new DatabaseWrapper($log, $q, db);
                    openDatabaseMap[id] = wrapper;
                    deferred.resolve(wrapper);
                };
                openRequest.onerror = function(event) {
                    deferred.reject(event);
                };
                openRequest.onblocked = function() {
                    deferred.reject('Unable to open database. The request is blocked.');
                };
                openRequest.onupgradeneeded = function(event) {
                    var db = event.target.result;
                    var schema = schemas[id];
                    if (!schema) {
                        deferred.reject('No database schema with the name ' + id + ' has been defined.');
                    } else {
                        // call each schema upgrade function from the old version to the new version in order
                        for (var v = event.oldVersion; v <= event.newVersion; v++) {
                            schema.upgrade(db, v);
                        }
                    }
                };
            }
            return deferred.promise;
        }
        /**
         * @ngdoc method
         * @name deleteDatabase
         * @methodOf ep.indexeddb.service:epIndexedDbService
         * @public
         * @description
         * Deletes a database that has been previously defined.
         * @param {string} id - the id of the database to delete
         * @returns {Promise} A promise that resolves once the database is deleted, or rejected on failure.
         */
        function deleteDatabase(id) {
            var deferred = $q.defer();
            var deleteRequest = indexedDB.deleteDatabase(id);
            deleteRequest.onsuccess = function() {
                deferred.resolve(true);
            };
            deleteRequest.onerror = function(event) {
                deferred.reject(event);
            };
            return deferred.promise;
        }

        return {
            createSchema: createSchema,
            openDatabase: openDatabase,
            closeDatabase: closeDatabase,
            deleteDatabase: deleteDatabase
        };
    }
})();

/**
 * @ngdoc controller
 * @name ep.list.controller:epListCtrl
 * @description
 * Represents the epList controller for the
 * ep.list module, or for specific ep-list directive
 *
 * @example
 *
 */
(function() {
    'use strict';

    epListCtrl.$inject = ['$scope'];
    angular.module('ep.list')
        .controller('epListCtrl', epListCtrl);

    /*@ngInject*/
    function epListCtrl($scope) {
        $scope.dummy = '';
    }
})();

/**
* @ngdoc directive
* @name ep.list.directive:epList
* @restrict E
*
* @description
* Represents the ep.list directive
*
* @example
*/
(function() {
    'use strict';

    angular.module('ep.list').
    directive('epList', epListDirective);

    /*@ngInject*/
    function epListDirective() {
        return {
            restrict: 'E',
            controller: 'epListCtrl',
            templateUrl: 'src/components/ep.list/ep-list.html'
        };
    }
})();

/**
* @ngdoc directive
* @name ep.list.directive:epList
* @restrict E
*
* @description
* Represents the ep.list directive
*
* @example
*/
(function() {
    'use strict';

    angular.module('ep.list').
    factory('epList', epListService);

    /*@ngInject*/
    function epListService() {
        return {};
    }
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
            getOrAdd: getOrAdd,
            clear: clear
        };
    }]);
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
 *  # Show exception
 *      try { throw new Error("Test Exception"); } catch (ex) { epModalDialogService.showException({}, ex); }
 *
 *  # Show custom exception with different options
 *      var options = { statusBar: true, statusBarText: 'This is status', closeButton: true, title: 'Exception title', status: 'error', message: 'Server exception message',
 *                      messageDetails: 'some trace info. this can be long at times',
 *                      buttons: [{ id: 'okButton', type: "default", text: "Ok", action: function() { alert('ok'); }}]};
 *      epModalDialogService.showException(options)
 *
 *  # Show message box
 *      epModalDialogService.showMessageBox({ title: 'Message Box Sample', message: "Hello world", });
 *
 *  # Show custom dialog
 *       epModalDialogService.showCustomDialog({
 *          templateUrl: "src/components/ep.modaldialog/modals/modaldialog-error.html",
 *          title: 'This is a custom dialog (error template)', status: 'warning', message: "Hello world" });
 *
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
    epModalDialogService.$inject = ['$sce', '$uibModal', '$compile', '$rootScope', '$timeout', '$interval', '$injector', 'epLocalStorageService'];
    angular.module('ep.modaldialog').service('epModalDialogService', epModalDialogService);

    /*@ngInject*/
    function epModalDialogService($sce, $uibModal, $compile, $rootScope, $timeout, $interval, $injector,
                                  epLocalStorageService) {

        /**
         * @private
         * @description
         * default settings for confirmation (pane dialog)
         */
        var defaultConfig = {
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
            //timerPromise: null,
            //autoClosePromise: null,
            paneScope: null
        };
        angular.copy(defaultConfig, dialogState.config);

        // @private
        var currentModalInstance = null;

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
         * </pre>
         */
        function showCustomDialog(options) {
            var cfg = options; //for compatability with show()

            hide(); // hide dialog pane if it was open

            if (checkRememberMe(cfg) === 1) {
                return;
            }

            cfg._isModalDialog = true;
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

                        currentModalInstance = $uibModalInstance;
                        $scope.config = cfg;

                        //For compatibility of just templateUrl (without templateOptions)
                        if (cfg.templateUrl && !cfg.templateOptions) {
                            cfg.templateOptions = {
                                templateUrl: cfg.templateUrl
                            };
                        }

                        // for compatibility with the "helpTemplateUrl" form without helpTemplateOptions
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
                            $injector.invoke(cfg.controller, currentModalInstance,
                                {'$scope': $scope, '$uibModalInstance': $uibModalInstance});
                        }

                        $scope.btnclick = function(btn, action) {
                            var prevCfg = {};
                            copyProperties(dialogState.config, prevCfg);

                            var result = onButtonClick($scope.config, btn, action);
                            if (result !== -1) {
                                $timeout(function() {
                                    release(prevCfg);
                                    if (action === 'fnCancelAction' || (btn && btn.isCancel)) {
                                        $uibModalInstance.dismiss('cancel');
                                    } else {
                                        $uibModalInstance.close(!result ? 0 : result);
                                    }
                                });
                            }
                        };

                        function onKeydown(evt) {
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
                                        release();
                                        $uibModalInstance.dismiss('cancel');
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
                    }]
            });
        }

        /**
         * @ngdoc method
         * @name hide
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * Hides any modal dialog currently in operation by this service.
         */
        function hide() {
            release();
            dialogState.isVisible = false;
            if (currentModalInstance) {
                currentModalInstance.close(0);
                currentModalInstance = null;
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

            // reset the config object to default values.
            var cfg = {};

            copyProperties(defaultConfig, cfg);

            // override default values with values provided.
            copyProperties(options, cfg);

            if (checkRememberMe(cfg)) {
                hide();
                return;
            }

            dialogState.isVisible = true;

            if (!angular.element('body .ep-modaldialog.ep-modaldialog-pane').length) {
                dialogState.paneScope = $rootScope.$new();
                dialogState.paneScope.dialogState = dialogState;
                dialogState.paneScope.btnclick = function(btn) {
                    hide();
                    onButtonClick(dialogState.config, btn);
                };
                angular.element(document.body).append($compile('<epmodaldialog></epmodaldialog>')(
                    dialogState.paneScope));
            }

            cfg._isModalDialog = false;
            setCommonOptions(cfg);

            if (dialogState.paneScope) {
                //update the panel scope
                dialogState.paneScope.config = cfg;
            }
        }

        /**
         * @name setCommonOptions
         * @private
         * @description
         * Sets options common both to a dialog and a .
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
                    hide();
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
                cfg.spinnerIconClass = cfg.showTimer ? 'fa-circle-o-notch' : 'fa-spinner';
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

        return {
            showMessage: showMessage,
            showConfirm: showConfirm,
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
        ['$rootScope', '$scope', '$timeout', 'epMultiLevelMenuFactory', 'epMultiLevelMenuConstants', 'epMultiLevelMenuService', function($rootScope, $scope, $timeout, epMultiLevelMenuFactory,
                 epMultiLevelMenuConstants, epMultiLevelMenuService) {
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

'use strict';

/**
 * @ngdoc controller
 * @name ep.photo.browser.controller:epPhotoBrowserCtrl
 * @description
 * Represents the epPhotoBrowser controller for the
 * ep.photo.browser module, or for specific ep-photo-browser directive
 *
 * @example
 *
 */
angular.module('ep.photo.browser').controller('epPhotoBrowserCtrl', [
    '$scope','epPhotoBrowserService',
    function($scope, epPhotoBrowserService) {
        epPhotoBrowserService.getImages().then(function(images) {
            $scope.images = images;
        });
    }
]);


'use strict';
/**
* @ngdoc directive
* @name ep.photo.browser.directive:epPhotoBrowser
* @restrict E
* @description
* This component displays thumbnail image gallery.
* Images can be imported from external url or passing base 64 format or fetching from device gallery
* On click of the image, it will enlarge in the preview mode
* Navigating to images can be done by using next or Previous button
* Swiping left or right on the image will navigate to next or previous image
* Rotation of images can be done by clicking play button in the preview mode
* By setting the attribute show-preview as true, it will skip image gallery view and directly navigate to preview mode with rotating the images by default
* @example
<doc:example module="ep.photo.browser">
    <doc:source>
      <ep-photo-browser show-preview="true">
      </ep-photo-browser>
  </doc:source>
</doc:example>
*/
angular.module('ep.photo.browser').directive('epPhotoBrowser',
    ['epPhotoBrowserService', function(epPhotoBrowserService) {
        function link($scope) {
            $scope.active = epPhotoBrowserService.active;
            $scope.slides = epPhotoBrowserService.slides;
            $scope.imageFiles = epPhotoBrowserService.imageFiles;
        }
        return {
            link: link,
            restrict: 'E',
            controller: 'epPhotoBrowserCtrl',
            templateUrl: 'src/components/ep.photo.browser/ep-photo-browser.html',
            scope: { showPreview: '@' }
        };
    }]);

'use strict';
/**
 * @ngdoc service
 * @name ep.photo.browser.factory:epPhotoBrowserFactory
 * @description
 * Factory service for the ep.photo.browser module
 * browsing the photos
 * @example
 */
angular.module('ep.photo.browser').factory('epPhotoBrowserFactory', [
    function() {
        /**
         * @ngdoc method
         * @name publicMethod
         * @methodOf ep.photo.browser.factory:epPhotoBrowserFactory
         * @public
         * @description
         * sample public method stub
         */
        function publicMethod() {
            // do something
            return true;
        }
        return {
            publicMethod: publicMethod
        };
    }]);

/**
 * @ngdoc service
 * @name ep.photo.browser.service:epPhotoBrowserService
 * @description
 * Service for accessing photo browser
 *
 * @example
 *
 */
(function() {
    'use strict';
angular.module('ep.photo.browser').service('epPhotoBrowserService', ['$q',
    function($q) {

        var images = [];
        var imageFiles = [];
        /**
        * @ngdoc method
        * @name getImages
        * @methodOf ep.photo.browser.service:epPhotoBrowserService
        * @public
        * @description
        * This asynchronous method enables image url passed as input
        */
        function getImages() {
            var deferred = $q.defer();
            deferred.resolve(images);
            return deferred.promise;
        }
        /**
        * @ngdoc method
        * @name showDeviceImage
        * @methodOf ep.photo.browser.service:epPhotoBrowserService
        * @public
        * @description
        * This enables when user wants to access device sd card and import images from device gallery
        */
        function showDeviceImage() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        /**
        * @ngdoc method
        * @name onDeviceReady
        * @methodOf ep.photo.browser.service:epPhotoBrowserService
        * @public
        * @description
        * This enables when user wants to access device sd card and import images from device gallery
        */
        function onDeviceReady() {
        window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function onFileSystemSuccess(fileSystem) {
                window.console.log(cordova.file.externalRootDirectory);
                var directoryReader = fileSystem.createReader();
                directoryReader.readEntries(function(entries) {
                    var i;
                    for (i = 0; i < entries.length; i++) {
                        if (entries[i].name === 'DCIM') {
                            var dcimReader = entries[i].createReader();
                            dcimReader.readEntries(onGetDCIM, false);
                            break;
                        }
                    }
                }, function() {
                    window.console.log('fail');
                });
            });
        }
        /**
        * @ngdoc method
        * @name getFileContentAsBase64
        * @methodOf ep.photo.browser.service:epPhotoBrowserService
        * @public
        * @description
        * This enables to read the file as base64 format
        */
        function getFileContentAsBase64(path, callback) {
            window.resolveLocalFileSystemURL(path, gotFile, failMsg);
            function failMsg() {
                window.Console.log('file not found');
            }
            function gotFile(fileEntry) {

                fileEntry.file(function(file) {
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        var content = this.result;
                        callback(content);
                    };

                    reader.readAsDataURL(file);
                });
            }
        }
        /**
        * @ngdoc method
        * @name onGetDCIM
        * @methodOf ep.photo.browser.service:epPhotoBrowserService
        * @public
        * @description
        * This enables to read the entries inside the DCIM folder and find the Camera folder in device
        */
        function onGetDCIM(entries) {
            var i;
            for (i = 0; i < entries.length; i++) {
                if (entries[i].name === 'Camera') {
                    var mediaReader = entries[i].createReader();
                    mediaReader.readEntries(onGetFileNames, false);
                    break;
                }
                window.console.log('the entries name' + entries[i].name);
            }
        }
        /**
        * @ngdoc method
        * @name onGetFileNames
        * @methodOf ep.photo.browser.service:epPhotoBrowserService
        * @public
        * @description
        * This enables to read the entries inside the Camera folder and filter the image files
        */
        function onGetFileNames(entries) {
            var i;
            for (i = 0; i < entries.length; i++) {
                if (/\.(jpe?g|png|gif|bmp)$/i.test(entries[i].name)) {

                    var imagePath = entries[i].fullPath.substr(1);
                    var path = cordova.file.externalRootDirectory + imagePath;
                    images.push({ thumb: path, img: path });
                }
            }
        }
        return {
            imageFiles: imageFiles,
            getFileContentAsBase64: getFileContentAsBase64,
            onGetDCIM: onGetDCIM,
            onGetFileNames: onGetFileNames,
            images: images,
            getImages: getImages,
            showDeviceImage: showDeviceImage
        };
    }]);
})();

/**
* @ngdoc directive
* @name ep.record.editor.directive:epCheckboxEditor
* @restrict E
*
* @description
* Checkbox editor used by ep-record-editor or ep-editor-control
*/
(function() {
    'use strict';

    angular.module('ep.record.editor').
    directive('epCheckboxEditor', epCheckboxEditorDirective);

    /*@ngInject*/
    function epCheckboxEditorDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.record.editor/editors/ep-checkbox-editor.html',
            scope: {
                'ctx': '=',
                'value': '=',
                'options': '='
            },
            compile: function() {
                return {
                    pre: function($scope) {
                        var ctx = $scope.ctx;

                        //set size class smaller for check box
                        ctx.fnSetSizeClass('col-xs-12 col-sm-4 col-md-3 col-lg-2');
                        ctx.checkBoxSize = ctx.checkBoxSize || '2x';

                        if (ctx.updatable) {
                            ctx.toggleValue = function(c, ev) {
                                if ($scope.value !== undefined && !ctx.disabled) {
                                    var newVal = !$scope.value;
                                    ctx.fnSetCurrentValue(newVal, false);

                                    if (ctx.fnValidate && ctx.updatable) {
                                        ctx.fnValidate(ctx.col, this, ev);
                                    }
                                }
                            };
                        }
                        ctx.checked = ctx.value ? 'checked' : '';
                        $scope.handleKey = function($event) {
                            if ($event.which === 32) {
                                $scope.ctx.toggleValue($scope.ctx);
                            }
                        };
                    }
                };
            }
        };
    }
})();

/**
* @ngdoc directive
* @name ep.record.editor.directive:epDateConvert
* @restrict E
*
* @description
*/
(function() {
    'use strict';

    angular.module('ep.record.editor').
    directive('epDateConvert', epDateConvertDirective);

    /*@ngInject*/
    function epDateConvertDirective() {
        //This directive is used to convert string to date between temp input and record
        //we need this because date angular bootstrap and input 'date' for native dates work
        //only if date object is bound to control. But our record stores ISO string date
        //so we have temp control with date object which we edit and pass result to hidden
        //control bound to actual record.
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                if (!ngModel) { return; }

                var mode = attrs.epDateConvert;

                if (mode === 'toString') {
                    //transform date to string
                    ngModel.$parsers.unshift(function(value) {
                        var dd = null;
                        if (value !== undefined) {
                            var m = moment(value);
                            var fmt = scope.ctx.isDateTime ? 'YYYY-MM-DDT00:00:00' : 'YYYY-MM-DD';
                            dd = m.isValid() ? m.format(fmt) : null;
                        }
                        var vCur = scope.ctx.fnGetCurrentValue();
                        if (vCur !== dd) {
                            scope.ctx.fnSetCurrentValue(dd);
                        }
                        return value;
                    });

                    ngModel.$viewChangeListeners.push(function() {
                        if (ngModel.$modelValue === undefined) {
                            //this happens during edit when date becomes invalid (modelValue undefined)
                            scope.ctx.isInvalidDateSet = true;
                            scope.value = undefined;
                        }
                    });
                }
                if (mode === 'toDate') {
                    //transform ISO string date to date object
                    ngModel.$formatters.push(function(value) {
                        if (angular.isString(value)) {
                            var md = moment(value);
                            scope.ctx.dateValue = md.isValid() ? md.toDate() : null;
                        } else {
                            if (scope.ctx.isInvalidDateSet === true) {
                                scope.ctx.isInvalidDateSet = false;
                            } else {
                                scope.ctx.dateValue = angular.isDate(value) ? value : null;
                            }
                        }
                        return value;
                    });
                }
            }
        };
    }
})();


/**
* @ngdoc directive
* @name ep.record.editor.directive:epDateEditor
* @restrict E
*
* @description
* @description
* Date editor used by ep-record-editor or ep-editor-control
*/
(function() {
    'use strict';

    epDateEditorDirective.$inject = ['epFeatureDetectionService'];
    angular.module('ep.record.editor').
    directive('epDateEditor', epDateEditorDirective);

    /*@ngInject*/
    function epDateEditorDirective(epFeatureDetectionService) {
        var isDateInputSupported = epFeatureDetectionService.inputSupportsType('date');

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.record.editor/editors/ep-date-editor.html',
            scope: {
                'ctx': '=',
                'value': '=',
                'options': '='
            },
            compile: function() {
                return {
                    pre: function($scope) {
                        var ctx = $scope.ctx;
                        var col = ctx.col;

                        ctx.useDateInput = isDateInputSupported; //activate browser native date entry

                        var format = col.oFormat.FormatString;
                        ctx.format = format;
                        ctx.dateOptions = {};

                        if (!ctx.useDateInput) {
                            var reg;
                            if (format) {
                                reg = /[A-Z]|[a-z]/;
                                ctx.dateSeparator = _.find(ctx.format, function(c) {
                                    return c && !reg.test(c);
                                });
                            }
                            if (!ctx.dateSeparator) {
                                var dd = new Date().toLocaleDateString();
                                reg = /[0-9]|[' ']/;
                                ctx.dateSeparator = _.find(dd, function(c) {
                                    return c && c.charCodeAt(0) !== 8206 && !reg.test(c);
                                });
                            }

                            ctx.fnDateOpen = function($event) {
                                if (!ctx.disabled) {
                                    $event.preventDefault();
                                    $event.stopPropagation();
                                    ctx.dateOpened = true;
                                }
                            };
                            ctx.fnDateKeyDown = function($event) {
                                var k = $event.keyCode;
                                if (k === 8 || k === 9 || k === 16 || k === 33 || k === 34 ||
                                    k === 35 || k === 36 || k === 37 || k === 38 || k === 39 || k === 40) {
                                    return true;
                                }
                                if ($event.ctrlKey) {
                                    return true; //for Copy/Paste etc.
                                }
                                if (ctx.disabled) {
                                    $event.preventDefault();
                                    return false;
                                }
                                if (ctx.dateSeparator && $event.char) {
                                    //with date separator check for it or [0-9]
                                    var sepCode = ctx.dateSeparator;
                                    if ($event.char === sepCode) {
                                        //prevent more than 2 date separators
                                        if (angular.isString($event.target.value) &&
                                            $event.target.value.split(sepCode).length > 2) {
                                            $event.preventDefault();
                                            return false;
                                        }
                                        return true;
                                    }
                                    if (/[0-9]/.test($event.char)) {
                                        return true;
                                    }
                                } else if ($event.char) {
                                    //without date separator we will allow all non-alphanumerics
                                    if (!(/[A-Z]|[a-z]/.test($event.char))) {
                                        return true;
                                    }
                                } else {
                                    //uncontrolled because we cannot trust key code
                                    if (k < 65 || k > 90) {
                                        return true;
                                    }
                                }
                                $event.preventDefault();
                                return false;
                            };
                        }
                    }
                };
            }
        };
    }
})();


(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.editor.directive:epEditorControl
    * @restrict E
    * @scope
    *
    * @description
    * Represents the ep.editor.control directive
    * This directive allows using editors standalone without ep-record-editor
    * Please note that the controls must be under class="row" for proper sizing
    *
    * @param {object} column - the following are properties of the column:
        # editor {string} - 'number' | 'text' | 'multiline' | 'date' | 'checkbox' | 'select' | 'image' | 'custom'
            if 'auto' or blank then editor will be detected from value
        # editorDirective {string} - directive name as in html for custom editor
        # bizType {string} - 'phone' | 'address' | 'email' | 'url' | 'password'
        # columnIndex - data ordinal index (data array index) or property name
        # seq {int} - (optional) sequence index for ordering
        # required {bool} - is entry required
        # requiredFlag {bool} - should we display required flag
        # name {string} - column name (optional)
        # caption {string} - caption
        # placeholder {string} - applicable to text input
        # justification {string} - 'right' | 'left' | 'center'
        # visible {bool}  - visible
        # updatable {bool}  - updatable
        # nullable {bool}  - nullable
        # list {array}  - array of items for drop down (editor = 'select' ) [{ label, value }]
        # sizeClass {string} - editor size class (bootstrap column sizes like col-md-6, col-lg-8, etc)
        # sizeClassTarget {object} - if string then acts like selector of closest ancestor and sets size
        #                   class to this element. if node is passed then sets size class on it.
        #
        # checkBoxSize {string}  - applicable to checkbox only (for now). Can be '1x', '2x', '3x'
        # style {string} - sets inline styling. eg. '{ "color" : "red", "margin" : "0px" }
        # oFormat {object}
        #   - MaxLength {int}
        #   -
        # buttons {array} - array of button objects that conatin properties:
            text {string} - button text
            style {string} - button class
            position {string} - 'pre' or 'post'
            seq {int} - button sequence
            action {function} - function action that is invoked on click
            type {string} - 'btn' - if button, otherwise a link
        # imageHeight {int} - image height for image editor
        # imageWidth {int} - image width for image editor
        # fnOnFldValidate(ctx, event, inputValue, originalValue) - callback function on validation
        # fnOnChange(ctx, event) - callback function on change
        # fnOnBlur(ctx, event) - callback function on change
    *
    * @param {object} value - the value binding for the editor
    * @param {bool} isDropEnabled - is drop enabled for the editor
    * @param {bool} isDragEnabled - is drag enabled for the editor
    *
    * @example
    *   HTML:
    *   <div class="row">
    *       <ep-editor-control column="column" value="valueText"></ep-editor-control>
    *   </div>
    *
    *   Script:
    *   $scope.column = {
    *       caption: 'My Caption',
    *       editor: 'text',
    *       updatable: true,
    *       placeholder: 'Enter text here...'
    *   };
    *   $scope.valueText = 'My Text';
    */
    epEditorControlDirective.$inject = ['$log', '$timeout', '$window', '$compile', '$q', 'epUtilsService'];
    angular.module('ep.record.editor').
        directive('epEditorControl', epEditorControlDirective);

    /*@ngInject*/
    function epEditorControlDirective($log, $timeout, $window, $compile, $q, epUtilsService) {

        var defaultSizeClass = 'col-xs-12 col-sm-8 col-md-6 col-lg-3';

        var defaultFormat = {
            FieldType: 0,
            MaxLength: 30
        };

        function doValidation(ctx, ev, focus) {
            if (!ctx.col.fnOnFldValidate) {
                return;
            }
            if (getRecordEditor(ctx.control.scope)) {
                var re = getRecordEditor(ctx.control.scope);
                re.doValidation(ctx.control.scope.options.recordEditor.state, ctx, ev, focus);
            } else {
                ctx.isInvalid = false;
                var newValue = ctx.control.scope.value;
                $q.when(ctx.col.fnOnFldValidate(ctx, ev, newValue)).then(function(result) {
                    if (result === false) {
                        ctx.isInvalid = true;
                    }
                    if (focus) {
                        ctx.fnSetFocus();
                    }
                    $timeout(function() {
                        ctx.fnDoValidations();
                    });
                });
            }
            $timeout(function() {
                ctx.fnDoValidations();
            });
        }

        function getEditorByValue(v) {
            var tp = typeof v;
            if (tp === 'number') {
                return 'number';
            } else if (tp === 'boolean') {
                return 'checkbox';
            } else if (tp === 'date') {
                return 'date';
            } else if (tp === 'string') {
                var reg = /\d{4}-\d{2}-\d{2}['T']/;
                if (v && v.match(reg)) {
                    return 'date';
                }
            }
            return 'text';
        }

        function addSizeClass(el, sClass) {
            if (el) {
                $(el).removeClass(function(index, css) {
                    return (css.match(/(^|\s)col-((lg)|(xs)|(sm)|(md))\S+/g) || []).join(' ');
                });
                el.addClass(sClass);
            }
        }

        function createContext(scope) {
            //creates editor context based on metadata
            var col = scope.column || {};
            col.oFormat = col.oFormat || defaultFormat;

            //determine editor
            var edt = 'text';
            if (!col.editor || col.editor === 'auto') {
                if (scope.value !== undefined && scope.value !== null) {
                    edt = getEditorByValue(scope.value);
                    scope.editorValueType = typeof scope.value;
                }
            } else {
                edt = col.editor;
            }
            var editor = (edt || 'text').trim().toLowerCase();

            var name = col.name || col.caption || col.columnIndex;
            var ctx = {
                recordEditorState: undefined,
                editorContainer: scope.state.iElement,
                control: {
                    scope: scope
                },
                col: col,
                editor: editor,
                name: editor + '_' + name + scope.$id,
                columnIndex: col.columnIndex,
                required: col.required || (editor === 'number' && !col.nullable), //all number's except Nullable are required
                requiredFlag: col.requiredFlag,  //to display the required flag
                bizType: col.bizType,
                label: col.caption || name || '',
                maxlength: col.oFormat.MaxLength,
                justification: col.justification,
                hidden: col.hidden,
                updatable: col.updatable,
                disabled: !col.updatable,
                nullable: col.nullable,
                displayInvalid: col.flagInvalid || true,
                buttons: col.buttons || [],
                imageWidth: (col.imageWidth ? col.imageWidth : 0),
                imageHeight: (col.imageHeight ? col.imageHeight : 0),
                isInvalid: false,
                placeholder: col.placeholder,
                size: col.size,
                style: col.style,
                checkBoxSize: col.checkBoxSize
            };

            if (col.style && angular.isString(col.style)) {
                try {
                    var xStyle =  scope.$eval(col.style);
                    ctx.style = xStyle;
                } catch (err) {
                    $log.error('Error in ep-editor-control styling. Error: ' + err.message + '\nStyle: ' + col.style);
                }
            }

            //TO DO - validate buttons pre/post seq etc
            if (ctx.editor === 'template') {
                var newScope = scope.$new(false, scope);
                ctx.templateOptions = col.templateOptions || {
                    template: col.template,
                    templateScope: newScope
                };
                scope.editorDirective = '<ep-include options="ctx.templateOptions" user-data="ctx"></ep-include>';

                newScope.$watch('value', function(newValue, oldValue) {
                    if (newValue !== undefined && ctx.updatable && ctx.readonly !== true) {
                        scope.value = newValue;
                    }
                });
            } else {
                var directive = ctx.editor === 'custom' ? col.editorDirective : ('ep-' + ctx.editor + '-editor');
                scope.editorDirective = '<' + directive + ' ctx=ctx value=value />';
            }

            ctx.fnSetSizeClass = function(sizeClass) {
                var sClass = col.sizeClass || sizeClass || defaultSizeClass;
                var isSet = true;
                if (col.sizeClassTarget) {
                    if (angular.isString(col.sizeClassTarget)) {
                        $timeout(function() {
                            var el = $(scope.state.iElement).closest(col.sizeClassTarget);
                            addSizeClass(el, sClass);
                        });
                    } else if (col.sizeClassTarget instanceof HTMLElement) {
                        addSizeClass($(col.sizeClassTarget), sClass);
                    } else {
                        isSet = false;
                    }
                }
                if (!col.sizeClassTarget || !isSet) {
                    ctx.sizeClass = sClass;
                }
            };
            ctx.fnSetSizeClass();

            ctx.fnSetFocus = function() {
                var edt = ctx.fnGetEditorElement();
                if (edt) {
                    angular.element(edt).focus();
                }
            };

            ctx.fnGetCurrentValue = function() {
                return ctx.control.scope.value;
            };

            ctx.fnSetCurrentValue = function(val, focus) {
                var edt = ctx.fnGetEditorElement();
                if (val !== undefined) {
                    if (ctx.fnGetCurrentValue() !== val) {
                        ctx.control.scope.value = val;
                        //because we set value programatically, set dirty
                        if (edt) {
                            angular.element(edt).addClass('ng-dirty');
                        }
                        if (ctx.updatable) {
                            doValidation(ctx, {}, true);
                        }
                        ctx.fnOnChange({}, ctx);
                    }
                }
                if (focus) {
                    ctx.fnSetFocus();
                }
            };

            ctx.fnGetEditorElement = function() {
                var editor = null;
                if (ctx.editorContainer) {
                    editor = angular.element(ctx.editorContainer).find('.form-control.editor');
                }
                return editor;
            };

            ctx.fnOnChange = function($event) {
                if (ctx.col.fnOnChange) {
                    $timeout(function() {
                        ctx.col.fnOnChange($event, ctx);
                    });
                }
            };

            ctx.fnBlur = function onBlur(ev) {
                var state = scope.ctx.recordEditorState;
                if (state) {
                    state.lastFocused = { Col: ctx.col, Ctx: ctx, Event: ev };
                }
                if (ctx.updatable) {
                    if (angular.element(ev.currentTarget).hasClass('ng-dirty')) {
                        doValidation(ctx, ev, false);
                    }
                }
                if (ctx.col.fnOnBlur) {
                    ctx.col.fnOnBlur(ev, ctx);
                }
                return true;
            };

            //This function checks invalid status from angular and field validation to highlight invalid
            ctx.fnDoValidations = function() {
                ctx.invalidFlag = false;
                if (ctx.displayInvalid && ctx.editorContainer) {
                    var state = scope.ctx.recordEditorState;
                    var showAllInvalidFields = (state && state.showAllInvalidFields);
                    var editor = angular.element(ctx.editorContainer).find('.form-control.editor');
                    if (editor.length) {
                        //TO DO: check in angular if we can remove the 'ng-invalid-remove'/'ng-dirty-add' check
                        var isInvalid = ctx.isInvalid || ((editor.hasClass('ng-invalid') &&
                            !editor.hasClass('ng-invalid-remove')) || editor.hasClass('ng-valid-remove'));
                        var isDirty = (editor.hasClass('ng-dirty') || editor.hasClass('ng-dirty-add') ||
                            showAllInvalidFields);
                        ctx.invalidFlag = (isInvalid && isDirty);
                    } else if (ctx.toggleValue) {
                        //special checkbox case:
                        ctx.invalidFlag = ctx.isInvalid;
                    }
                }
                return false;
            };

            //Configure BizType buttons
            if (ctx.bizType && (ctx.bizType === 'phone' || ctx.bizType === 'address' ||
                ctx.bizType === 'email' || ctx.bizType === 'url')) {
                var btnHref = '';
                var btnStyle = '';
                var btnType = 'href-input';

                switch (ctx.bizType) {
                    case 'address':
                        btnHref = 'http://maps.google.com/maps?q={0}';
                        btnStyle = 'fa fa-map-marker';
                        break;

                    case 'phone':
                        btnHref = 'tel:{0}';
                        btnStyle = 'fa fa-phone';
                        break;

                    case 'email':
                        btnHref = 'mailto:{0}';
                        btnStyle = 'fa fa-envelope';
                        break;

                    case 'url':
                        btnHref = '';
                        btnStyle = 'fa fa-globe';
                        btnType = 'href-func';
                        ctx.fnGetHref = function() {
                            var v = ctx.fnGetCurrentValue();
                            if (col.stringFormat) {
                                // example stringFormat = 'http://somewhere.com/{0}';
                                v = epUtilsService.strFormat(col.stringFormat, v);
                            }
                            if (v) {
                                //if string does not start with 'http' or 'https' then append
                                var v1 = v.trim().toLowerCase();
                                if (v1.substr(0, 4) !== 'http') {
                                    v = 'http://' + v;
                                }
                            }
                            return v;
                        };
                        break;
                }
                if (btnStyle) {
                    ctx.buttons.push({
                        type: btnType,
                        text: '',
                        href: btnHref,
                        style: btnStyle,
                        seq: 2,
                        position: 'pre',
                    });
                }
            }

            if (ctx.buttons.length) {
                ctx.fnBtnClick = function(btn) {
                    if (btn.type === 'btn') {
                        btn.action(ctx);
                    } else {
                        var v = ctx.fnGetCurrentValue();
                        if (v) {
                            var url = '';
                            switch (btn.type) {
                                case 'href':
                                    url = btn.href;
                                    break;
                                case 'href-input':
                                    url = epUtilsService.strFormat(btn.href, v);
                                    break;
                                case 'href-func':
                                    url = ctx.fnGetHref();
                                    break;
                            }
                            if (btn.type === 'href') {
                                $window.open(url, '_blank');
                            } else {
                                $window.open(url);
                            }
                        }
                    }
                };
            }
            scope.ctx = ctx;
            if (getRecordEditorState(scope)) {
                var state = getRecordEditorState(scope);
                var ctrl = state.controls[ctx.columnIndex];
                ctrl.controlCtx = ctx;
                ctx.recordEditorState = state;
                ctx.seq = ctrl.seq;
            }

            var target = angular.element(scope.state.iElement).find('#xtemplate');
            target.empty().append($compile(scope.editorDirective)(scope));
        }

        function getRecordEditorState(scope) {
            return (scope.options && scope.options.recordEditor) ? scope.options.recordEditor.state : null;
        }
        function getRecordEditor(scope) {
            return (scope.options && scope.options.recordEditor) ? scope.options.recordEditor : null;
        }

        // <-----------------Private methods

        return {
            restrict: 'E,A',
            templateUrl: 'src/components/ep.record.editor/editors/ep-editor-control.html',
            replace: true,
            link: function(scope, element) {
                scope.state = {
                    iElement: element
                };

                scope.$watch('column', function(newValue) {
                    if (newValue !== undefined) {
                        createContext(scope);
                    }
                });

                scope.$watch('value', function(newValue) {
                    if (newValue !== undefined) {
                        if (!scope.editorValueType &&
                            (!scope.column || !scope.column.editor || scope.column.editor === 'auto'))
                        {
                            createContext(scope);
                        }
                    }
                });

                scope.handleDrop = function(drop) {
                    var state = scope.ctx.recordEditorState;
                    if (state) {
                        var ctrlDrop = state.controls[scope.ctx.columnIndex];
                        var ctrlDragged = state.controls[drop.dragItem.columnIndex];
                        if (ctrlDrop !== ctrlDragged) {

                            var indexThis = ctrlDrop.seq;
                            var indexDropped = ctrlDragged.seq;
                            //save
                            if (ctrlDrop.origSeq === undefined) {
                                ctrlDrop.origSeq = indexThis;
                            }
                            if (ctrlDragged.origSeq === undefined) {
                                ctrlDragged.origSeq = indexDropped;
                            }
                            if (ctrlDrop.origSeq !== ctrlDrop.seq) {
                                delete ctrlDrop.origSeq;
                            }
                            if (ctrlDragged.origSeq !== ctrlDragged.seq) {
                                delete ctrlDragged.origSeq;
                            }

                            if (ctrlDragged.seq >= ctrlDrop.seq) {
                                ctrlDragged.seq = ctrlDrop.seq;
                                angular.forEach(state.controls, function(c) {
                                    if (c.seq > ctrlDrop.seq) {
                                        c.seq++;
                                    }
                                });
                                ctrlDrop.seq++;
                            } else {
                                angular.forEach(state.controls, function(c) {
                                    if (c.seq < ctrlDrop.seq) {
                                        c.seq--;
                                    }
                                });
                                ctrlDragged.seq = ctrlDrop.seq - 1;
                            }

                            if (state.fnOnDragDrop) {
                                state.fnOnDragDrop(scope.ctx, drop.dragItem);
                            }

                            scope.$apply();
                        }
                    }
                };
                //scope.leaveHandler = function(drop) {
                //};
                //scope.overHandler = function(drop) {
                //};
            },
            scope: {
                column: '=',
                value: '=',
                options: '=',
                isDragEnabled: '=',
                isDropEnabled: '='
            }
        };
    }
}());


/**
* @ngdoc directive
* @name ep.record.editor.directive:epImageEditor
* @restrict E
*
* @description
*/
(function() {
    'use strict';

    angular.module('ep.record.editor').
    directive('epImageEditor', epImageEditorDirective);

    /*@ngInject*/
    function epImageEditorDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.record.editor/editors/ep-image-editor.html',
            scope: {
                'ctx': '=',
                'value': '=',
                'options': '='
            }
        };
    }
})();

/**
* @ngdoc directive
* @name ep.record.editor.directive:epMultilineEditor
* @restrict E
*
* @description
* @description
* Multiline editor used by ep-record-editor or ep-editor-control
*/
(function() {
    'use strict';

    angular.module('ep.record.editor').
    directive('epMultilineEditor', epMultilineEditorDirective);

    /*@ngInject*/
    function epMultilineEditorDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.record.editor/editors/ep-multiline-editor.html',
            scope: {
                'ctx': '=',
                'value': '=',
                'options': '='
            },
            compile: function() {
                return {
                    pre: function($scope) {
                        var ctx = $scope.ctx;
                        //set size class larger for multiline
                        ctx.fnSetSizeClass('col-xs-12 col-sm-12 col-md-8 col-lg-8');
                    }
                };
            }

        };
    }
})();

/**
* @ngdoc directive
* @name ep.record.editor.directive:epNumberEditor
* @restrict E
*
* @description
* @description
* Number editor used by ep-record-editor or ep-editor-control
*/
(function() {
    'use strict';

    angular.module('ep.record.editor').
    directive('epNumberEditor', epNumberEditorDirective);

    /*@ngInject*/
    function epNumberEditorDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.record.editor/editors/ep-number-editor.html',
            scope: {
                'ctx': '=',
                'value': '=',
                'options': '='
            },
            compile: function() {
                return {
                    pre: function($scope) {
                        var ctx = $scope.ctx;
                        var col = ctx.col;
                        if (ctx.editor === 'number') {
                            var fmt = col.oFormat;
                            if (!fmt) {
                                col.oFormat = fmt = {
                                    Min: -99999999999,
                                    Max: 99999999999
                                };
                            }

                            if (fmt.Min || fmt.Min === 0) {
                                ctx.min = fmt.Min;
                                //TO DO: rework AllowNegative to be Min=0
                                if (fmt.AllowNegative === false && fmt.Min < 0) {
                                    ctx.min = 0;
                                }
                            }
                            if (fmt.Max || fmt.Max === 0) {
                                ctx.max = fmt.Max;
                            }
                            if (fmt.NumberFormatInfo || (fmt.Decimals !== undefined)) {
                                //to do : negatives mask!!!
                                var dec = 0;
                                if (fmt.Decimals !== undefined) {
                                    dec = fmt.Decimals;
                                } else {
                                    dec = fmt.NumberFormatInfo.NumberDecimalDigits || 0;
                                }
                                if (dec < 0) {
                                    dec = 0;
                                }
                                if (dec === 0) {
                                    ctx.pattern = '^NEG(\\d+)$';
                                } else {
                                    ctx.pattern =
                                        '^NEG(\\d+)([\'.\'](\\d){0,DEC})?$'.replace('DEC', dec.toString());
                                }
                                if (fmt.AllowNegative || false) {
                                    ctx.pattern = ctx.pattern.replace('NEG', '([-]?)');
                                } else {
                                    ctx.pattern = ctx.pattern.replace('NEG', '');
                                }
                            }
                        }
                    }
                };
            }
        };
    }
})();

/**
* @ngdoc directive
* @name ep.record.editor.directive:epSelectEditor
* @restrict E
*
* @description
* @description
* Select editor used by ep-record-editor or ep-editor-control
*/
(function() {
    'use strict';

    angular.module('ep.record.editor').
    directive('epSelectEditor', epSelectEditorDirective);

    /*@ngInject*/
    function epSelectEditorDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.record.editor/editors/ep-select-editor.html',
            scope: {
                'ctx': '=',
                'value': '=',
                'options': '='
            },
            compile: function() {
                return {
                    pre: function($scope) {
                        $scope.$watch('ctx.col.list', function() {

                            var ctx = $scope.ctx;
                            ctx.options = [];
                            if (ctx.col.list) {
                                ctx.options = angular.extend([], ctx.col.list);
                                angular.forEach(ctx.options, function(item) {
                                    item.getIsSelected = function() {
                                        return item.value === $scope.value;
                                    };
                                });
                            }

                            // add an 'empty' value for fields that are not required.
                            if (!ctx.required && !_.find(ctx.options, function(o) { return !o.value; })) {
                                if (!ctx.options) {
                                    ctx.options = [];
                                }
                                ctx.options.unshift({
                                    label: '', value: null, getIsSelected: function() {
                                        return !$scope.value;
                                    }
                                });
                            }

                        });
                    }
                };
            }
        };
    }
})();

/**
* @ngdoc directive
* @name ep.record.editor.directive:epTextEditor
* @restrict E
*
* @description
* @description
* Text editor used by ep-record-editor or ep-editor-control
*/
(function() {
    'use strict';

    angular.module('ep.record.editor').
    directive('epTextEditor', epTextEditorDirective);

    /*@ngInject*/
    function epTextEditorDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.record.editor/editors/ep-text-editor.html',
            scope: {
                'ctx': '=',
                'value': '=',
                'options': '='
            }
        };
    }
})();

/**
 * @ngdoc object
 * @name ep.record.editor.object:epRecordEditorConfig
 * @description
 * Provider for epRecordEditorConfig.
 * Gets configuration options from sysconfig.json or default
 */
(function() {
    'use strict';

    angular.module('ep.record.editor').provider('epRecordEditorConfig',
        function() {
            var config = {
                /**
                * @ngdoc property
                * @name sampleProperty
                * @propertyOf ep.record.editor.object:epRecordEditorConfig
                * @public
                * @description
                * Represents the sampleProperty
                */
                sampleProperty: false,
            };

            //we use the epSysConfig provider to perform the $http read against sysconfig.json
            //epSysConfig.mergeSection() function merges the defaults with sysconfig.json settings
            this.$get = ['epSysConfig', function(epSysConfig) {
                epSysConfig.mergeSection('ep.record.editor', config);
                return config;
            }];
        });
})();

(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.record.editor.directive:epRecordEditor
    * @restrict E
    * @scope
    *
    * @description
    * Used to display/edit record controls of a provided record
    *
    * @param {object} record - binding to a record
    * @param {bool} isReadOnly - set true if editing will not be allowed
    * @param {string} sizeClass - default size class for all editors (bootstrap column size col-md-6, etc)
    * @param {function} onInit - callback when control has initialized. Provides factory
    * @param {object} options - are used to setup the directive. Options are shown in example below. Refer
    *                           to ep-editor-control directive for definition of column metadata. Factory is
    *                           also set on the options object
    *
    * @example
    *   HTML:
    *
    *   <recordeditor id="recordViewEditors" options="options" record="activeRecord" is-read-only="expression" />
    *
    *   Script:
    *
    *    scope.recordEditorOptions = {
    *        columns: columns,       //metadata for columns - array of columns
    *        columnTemplate: {}      //properties to be applied on all columns
    *        factory: null,          //after directive initialization will expose factory to this control
    *        flagInvalid: false,     //flag controls when invalid (changes border color)
    *        dragAndDrop: false,     //drag and drop allowed
    *        dragEnabled: false,     //drag allowed
    *        dropEnabled: false,     //drop allowed
    *    };
    */
    epRecordEditorDirective.$inject = ['$timeout', '$q', 'epRecordEditorFactory', 'epUtilsService'];
    angular.module('ep.record.editor').
        directive('epRecordEditor', epRecordEditorDirective);

    /*@ngInject*/
    function epRecordEditorDirective($timeout, $q, epRecordEditorFactory, epUtilsService) {
        // Private methods ------------------>

        function getNewState() {
            var state = {
                scope: null,
                linkElement: null,
                formElement: null,
                controls: null,
                activeRecord: undefined,
                rowData: {},
                isReadOnly: false,
                lastInputs: {},
                isDataArray: false,
                dragEnabled: false,
                dropEnabled: false
            };
            return state;
        }

        function selectFirstControl(scope) {
            //TODO: This selects the first input element, even if there's a select element before it
            var controls = _.filter(scope.state.linkElement.find('.editor'), function(el) {
                return !$(el).attr('disabled');
            });

            if (controls.length) {
                var first = $(controls[0]);
                first.focus();
            }
        }

        function selectFirstInvalidControl(scope) {
            //TODO: This selects the first input element, even if there's a select element before it
            if (scope.state.controls) {
                var ctx;
                var ctrlFirst = _.find(scope.state.controls, function(ctrl) {
                    ctx = ctrl.getControlCtx();
                    return (ctx.isInvalid);
                });
                if (ctrlFirst) {
                    ctx.fnSetFocus();
                }
            }
        }

        function selectFocusedControl(scope) {
            if (scope.state.lastFocused && scope.state.lastFocused.Event.originalEvent &&
                scope.state.lastFocused.Event.originalEvent.target) {
                scope.state.lastFocused.Event.originalEvent.target.focus();
                return true;
            }
            return false;
        }

        function doValidation(state, ctx, ev, focus) {
            var dc = ctx.columnIndex;
            if (state.activeRecord[dc] !== undefined) {
                var originalValue = state.rowData[dc];
                //We call the field validation if input value has changed compared to original
                //and it is not the same as previously entered
                if (state.lastInputs[dc]) {
                    originalValue = state.lastInputs[dc];
                }
                var inputValue = state.activeRecord[dc];
                if (state.lastInputs[dc] === inputValue) {
                    return;
                } //prevent calling if last input was same
                state.lastInputs[dc] = inputValue;
                if (compareValues(originalValue, inputValue)) {
                    ctx.isInvalid = false;
                    $q.when(ctx.col.fnOnFldValidate(ctx, ev, inputValue, originalValue)).then(function(result) {
                        if (result === false) {
                            ctx.isInvalid = true;
                        }
                        if (focus) {
                            ctx.fnSetFocus();
                        }
                    });
                }
            }
        }

        function getEditorByValue(v) {
            var tp = typeof v;
            if (tp === 'number') {
                return 'number';
            } else if (tp === 'boolean') {
                return 'checkbox';
            } else if (tp === 'date') {
                return 'date';
            } else if (tp === 'string') {
                var reg = /\d{4}-\d{2}-\d{2}['T']/;
                if (v && v.match(reg)) {
                    return 'date';
                }
            }
            return 'text';
        }

        function doDraw(scope, bForceRedraw) {
            if (scope.state.controls !== null && !bForceRedraw) {
                return; //unless force redraw, we should not recreate
            }

            //Prepare columns
            var hasCols = scope.options && angular.isArray(scope.options.columns);
            if (!scope.state.isDataArray && !hasCols && scope.record) {
                var columns = [];
                if (scope.options && scope.options.columns && angular.isString(scope.options.columns)) {
                    var colNames = scope.options.columns.split(',');
                    angular.forEach(colNames, function(c) {
                        columns.push({
                            columnIndex: c,
                            editor: 'auto', // getEditorByValue(scope.record[c]),
                            updatable: true
                        });
                    });
                } else {
                    angular.forEach(scope.record, function(v, n) {
                        columns.push({
                            columnIndex: n,
                            editor: 'auto', //getEditorByValue(v),
                            updatable: true
                        });
                    });
                }
                scope.state.columns = columns;
            } else {
                scope.state.columns = hasCols ? scope.options.columns : [];
            }
            if (scope.options && scope.options.columnTemplate && scope.state.columns) {
                angular.forEach(scope.state.columns, function(c) {
                    epUtilsService.copyProperties(scope.options.columnTemplate, c, false);
                });
            }

            if (scope.state.columns && scope.record) {
                angular.forEach(scope.state.columns, function(c) {
                    if (!c.editor && c.columnIndex) {
                        c.editor = getEditorByValue(scope.record[c.columnIndex]);
                    }
                });
            }

            if (!scope.state.columns || !scope.state.columns.length) {
                return;
            }

            createContext(scope);

            // TODO: Fix this ugly hack
            $timeout(function() {
                selectFirstControl(scope);
            }, 250);

            if (scope.state.isReadOnly) {
                scope.setReadOnly();
            }
        }

        function createContext(scope) {
            //to pass as options to control editors
            scope.state.options = {
                recordEditor: {
                    state: scope.state,
                    doValidation: doValidation
                }
            };

            var controls = {};
            var iIndex = -1;
            _.each(_.filter(scope.state.columns,
                function(c) { return (c.columnIndex >= 0 || c.columnIndex); }),
                function(col) {

                iIndex++;
                var iVisibleIndex = iIndex;
                if (col.seq || col.seq === 0) {
                    iVisibleIndex = col.seq;
                } else if (col.columnIndex && !angular.isString(col.columnIndex)) {
                    iVisibleIndex = col.columnIndex;
                }

                var editor = (col.editor || 'text').trim().toLowerCase();
                var ctrl = {
                    col: col,
                    editor: editor,
                    seq: iVisibleIndex,
                    visibleIndex: ('000' + iVisibleIndex).substr(-3, 3), // <- so that it's sortable as a string
                    columnIndex: col.columnIndex,
                    options: scope.state.options
                };
                ctrl.getControlCtx = function() {
                    return ctrl.controlCtx;
                };
                controls[col.columnIndex] = ctrl;
            });
            scope.state.controls = controls;
        }

        function checkRecordType(scope) {
            if (scope.record) {
                scope.state.isDataArray = angular.isArray(scope.record);
            } else {
                scope.state.isDataArray = !scope.options || (scope.options.isDataArray !== false);
            }
        }

        function compareValues(original, input) {
            ///<summary>
            /// Compares the value of an input control
            /// to the value in underlying local store.
            ///</summary>
            ///<returns type='bool'>True if there is a change</returns>
            if (!original) {
                // if the original evaluates to 'false'
                // then check if the input value is changed
                return !!input;
            }
            if (input === null && original === null) {
                return false;
            }
            if ((input === null && original !== null) || (input !== null && original === null)) {
                return true;
            }
            return (original.toString() !== input.toString());
        }

        // <-----------------Private methods

        return {
            restrict: 'E,A',
            require: '?^form', //may be used outside a form
            templateUrl: 'src/components/ep.record.editor/ep-record-editor.html',
            replace: true,
            link: function(scope, element, iAttrs, formCtrl) {
                scope.state = getNewState();

                scope.state.factory = new epRecordEditorFactory(scope);

                if (scope.options) {
                    scope.options.factory = scope.state.factory;
                }

                scope.state.scope = scope;
                scope.state.linkElement = element;
                scope.state.formElement = formCtrl;
                checkRecordType(scope);

                scope.$watch('isReadOnly', function(newValue) {
                    if (newValue !== undefined) {
                        scope.state.isReadOnly = newValue;
                        $timeout(function() {
                            scope.setReadOnly();
                        })
                    }
                });

                scope.$watch('record', function(newValue) {
                    if (newValue && scope.state.activeRecord !== newValue) {
                        checkRecordType(scope);
                        scope.state.lastInputs = {};
                        scope.state.activeRecord = newValue;

                        //store a copy for reset
                        scope.state.rowData = scope.extendRecord(scope.state.activeRecord);

                        if (!scope.state.columns || !scope.state.columns.length) {
                            doDraw(scope, false);
                        }
                        if (scope.state.columns && scope.state.columns.length) {
                            scope.state.factory.setPristine();
                        }
                    }
                });

                scope.$watch('options', function(newValue, oldValue) {
                    if (newValue) {
                        //Expose this directive's scope to outside caller
                        newValue.factory = scope.state.factory;
                        if (angular.equals(newValue, oldValue)) {
                            if (scope.options) {
                                if (scope.options.dragAndDrop !== undefined) {
                                    scope.state.dragEnabled = scope.options.dragAndDrop === true;
                                    scope.state.dropEnabled = scope.state.dragEnabled;
                                } else if (scope.options.dragEnabled !== undefined) {
                                    scope.state.dragEnabled = scope.options.dragEnabled === true;
                                } else if (scope.options.dropEnabled !== undefined) {
                                    scope.state.dropEnabled = scope.options.dropEnabled === true;
                                }
                            }
                            if (!scope.state.columns || !scope.state.columns.length) {
                                checkRecordType(scope);
                                doDraw(scope, false);
                            }
                        }
                    }
                });

                scope.$watch('sizeClass', function(newValue, oldValue) {
                    if (scope.state.controls && newValue !== undefined) {
                        $timeout(function() {
                            angular.forEach(scope.state.controls, function(ctrl) {
                                var ctx = ctrl.getControlCtx();
                                if (ctx) {
                                    ctx.fnSetSizeClass(newValue || '');
                                }
                            });
                        })
                    }
                });

                scope.extendRecord = function(record) {
                    return jQuery.extend(scope.state.isDataArray ? [] : {}, record);
                };

                scope.redraw = function() {
                    doDraw(scope, true);
                };

                // When the local scope is destroyed, be sure to clean up the events
                scope.$on(
                    '$destroy',
                    function() {
                        //clean up events and buffers
                        scope.state.controls = null;
                    }
                );

                // Interface (public) methods: -->

                scope.doDraw = function() {
                    doDraw(scope, true);
                };

                scope.setReadOnly = function() {
                    //set readonly attribute to all updatable controls
                    if (scope.state.controls) {
                        _.each(scope.state.controls, function(ctrl) {
                            var ctx = ctrl.getControlCtx();
                            if (ctx.updatable) {
                                ctx.readonly = scope.state.isReadOnly;
                            }
                        });
                    }
                };

                scope.recEdtSelectControl = function(mode) {
                    if (mode === 'first') {
                        selectFirstControl(scope);
                    } else if (mode === 'focused') {
                        selectFocusedControl(scope);
                    } else if (mode === 'focusedOrFirst') {
                        if (selectFocusedControl(scope) === false) {
                            selectFirstControl(scope);
                        }
                    } else if (mode === 'invalid') {
                        selectFirstInvalidControl(scope);
                    } else {
                        selectFirstControl(scope);
                    }
                };

                if (scope.onInit) {
                    scope.onInit({ factory: scope.state.factory });
                }

                scope.compareValues = compareValues;

            },
            scope: {
                options: '=',
                record: '=',
                isReadOnly: '=',
                sizeClass: '=',
                onInit: '&'
            }
        };
    }
}());


(function() {
'use strict';
/**
 * @ngdoc service
 * @name ep.record.editor.factory:epRecordEditorFactory
 * @description
 * Factory service for the ep.record.editor module
 * record editor creates controls by metadata
 *
 * @example
 *
 */
angular.module('ep.record.editor').
    factory('epRecordEditorFactory', epRecordEditorFactory);

    /*@ngInject*/
    function epRecordEditorFactory() {
        var epRecordEditorFactoryInstance = function(directiveScope) {
            var scope = directiveScope;
            var id = 'recordEditor' + scope.$id;

            /**
             * @ngdoc method
             * @name getEnteredData
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Get the entered data information
            */
            function getEnteredData() {
                ///<summary>
                /// Get the results of record entry
                ///</summary>
                var ret = {
                    editsDetected: false,
                    changedColumns: [],
                    record: scope.state.activeRecord
                };

                if (scope.state.columns) {
                    var columns = scope.state.columns;
                    for (var idx = 0; idx < columns.length; idx++) {
                        var col = columns[idx];
                        var dataColumn = col.columnIndex;
                        var inputValue;
                        if (scope.state.activeRecord) {
                            inputValue = scope.state.activeRecord[dataColumn];
                        }
                        if (inputValue === undefined) {
                            if (col.editor === 'text') {
                                inputValue = '';
                            } else if (col.editor === 'number') {
                                inputValue = 0;
                            }
                        }

                        if (inputValue !== undefined) {
                            var originalValue = scope.state.rowData[dataColumn];
                            if (scope.compareValues(originalValue, inputValue)) {
                                ret.changedColumns.push({
                                    rowIndex: scope.state.rowIndex, columnIndex: dataColumn,
                                    originalValue: originalValue, newValue: inputValue
                                });
                                ret.editsDetected = true;
                            }
                        } else if (col.editor === 'date') {
                            ret.editsDetected = true;
                            ret.invalidEntry = true;
                        }
                    }
                }
                return ret;
            }

            /**
             * @ngdoc method
             * @name resetEditors
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Reset the editors to original values
            */
            function resetEditors() {
                var columns = scope.state.columns;
                for (var idx = 0; idx < columns.length; idx++) {
                    var col = columns[idx];
                    scope.state.activeRecord[col.columnIndex] = scope.state.rowData[col.columnIndex];
                }

                setPristine();
                scope.recEdtSelectControl('first');
            }

            /**
             * @ngdoc method
             * @name clearEditors
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Clear all values
            */
            function clearEditors() {
                if (scope.state.controls) {
                    _.each(scope.state.controls, function(ctrl) {
                        var ctx = ctrl.getControlCtx();
                        var emptyVal = '';
                        if (ctx.editor === 'number') {
                            emptyVal = 0;
                        } else if (ctx.editor === 'checkbox') {
                            emptyVal = false;
                        }
                        scope.state.activeRecord[ctx.columnIndex] = emptyVal;
                    });
                }
            }

            /**
             * @ngdoc method
             * @name setPristine
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Set record editor as pristine (clear dirty and invalid flags)
            */
            function setPristine() {
                if (scope.state.formElement) {
                    scope.state.formElement.$setPristine();
                }
                scope.state.lastInputs = {};
                scope.state.showAllInvalidFields = false;

                if (scope.state.controls) {
                    angular.forEach(scope.state.controls, function(ctrl) {
                        var ctx = ctrl.getControlCtx();
                        if (ctx) {
                            ctx.isInvalid = false;
                        }
                    });
                }
            }

            /**
             * @ngdoc method
             * @name setReadOnly
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Set record editor in read-only state
             *
             * @param {bool} readOnly - true - turn on; false - turn off
            */
            function setReadOnly(readOnly) {
                ///set specified readonly state to updatable fields
                scope.state.isReadOnly = readOnly;
                scope.setReadOnly();
            }

            /**
             * @ngdoc method
             * @name draw
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Force a redraw
            */
            function draw() {
                scope.doDraw(scope, true);
            }

            /**
             * @ngdoc method
             * @name setRecord
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Force set record even if it has not changed, resetting original copy and redrawing and setting pristine
             * @param {object} record - record as array or object
            */
            function setRecord(record) {
                var rec = (record) ? record : scope.state.activeRecord;
                scope.state.lastInputs = {};
                scope.state.activeRecord = rec;
                scope.state.rowData = scope.extendRecord(rec); //store a copy for reset
                setPristine();
            }

            /**
             * @ngdoc method
             * @name setRecordWithoutOriginal
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Set record without changing the original values
             * @param {object} record - record as array or object
            */
            function setRecordWithoutOriginal(record) {
                if (record && scope.state.activeRecord !== record) {
                    scope.state.activeRecord = record;
                }
            }

            /**
             * @ngdoc method
             * @name selectControl
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Select control by specified mode
             * @param {string} mode - 'first','invalid'
            */
            function selectControl(mode) {
                scope.recEdtSelectControl(mode);
            }

            /**
             * @ngdoc method
             * @name validate
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Perform validation
             * @param {bool} showAllInvalidFields - highlight all invalid fields
             * @param {bool} focusOnFirstInvalid - focus on first invalid field
            */
            function validate(showAllInvalidFields, focusOnFirstInvalid) {
                ///<summary>
                /// Validate user input record entry
                ///</summary>
                var ret = {
                    invalidEntry: false,
                    requiredFields: false,
                    invalidFieldValidation: false
                };

                if (scope.state.controls) {
                    scope.state.linkElement.find('.form-control.editor').each(function() {
                        var editor = $(this);
                        if (editor.length) {
                            if (editor.hasClass('ng-invalid')) {
                                ret.invalidEntry = true;
                                if (editor.hasClass('ng-invalid-required')) {
                                    ret.requiredFields = true;
                                }
                            }
                        }
                    });

                    var epInvalid = _.find(scope.state.controls, function(ctrl) {
                        var ctx = ctrl.getControlCtx();
                        return ctx.isInvalid;
                    });
                    if (epInvalid) {
                        ret.invalidEntry = true;
                        ret.invalidFieldValidation = true;
                    }
                }
                if (ret.requiredFields) {
                    //this will be combination of various flags
                    ret.invalidEntry = true;
                }
                scope.state.showAllInvalidFields = showAllInvalidFields || false;

                if (ret.invalidEntry && (focusOnFirstInvalid || false)) {
                    selectControl('invalid');
                }

                return ret;
            }

            /**
             * @ngdoc method
             * @name resetCombo
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Reset combo for specified column
             * @param {bool} column - column
             * @param {array} list - new list of items
            */
            function resetCombo(column, list) {
                if (!list) { return; }
                //reset column combo. if column is string then by columnName otherwise by columnIndex
                var ctx = getColumnContext(scope, column);
                if (ctx && ctx.col.list) {
                    ctx.options = angular.extend([], ctx.col.list);
                    angular.forEach(ctx.options, function(item) {
                        item.getIsSelected = function() {
                            return item.value === ctx.fnGetCurrentValue();
                        };
                    });
                }
            }

            /**
             * @ngdoc method
             * @name getColumnContext
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Get column context
             * @param {object} column - column name or column index
            */
            function getColumnContext(column) {
                if (column === null || !scope.state.columns)
                {
                    return null;
                }
                var ctrl = _.find(scope.state.controls, function(ctrl) {
                    var ctx = ctrl.getControlCtx();
                    return (ctx.col && ctx.columnIndex === column);
                });
                if (ctrl) {
                    return ctrl.getControlCtx();
                }
                return null;
            }

            function getColumns() {
                return scope.state.columns;
            }

            function getOptions() {
                return scope.options;
            }

            function getState() {
                return scope.state;
            }

            function enableEditorsDrag(enableDrag, enableDrop) {
                scope.state.dragEnabled = enableDrag;
                scope.state.dropEnabled = enableDrop;
            }

            return {
                id: id,
                getEnteredData: getEnteredData,
                resetEditors: resetEditors,
                clearEditors: clearEditors,
                setPristine: setPristine,
                setReadOnly: setReadOnly,
                draw: draw,
                setRecord: setRecord,
                setRecordWithoutOriginal: setRecordWithoutOriginal,
                selectControl: selectControl,
                validate: validate,
                resetCombo: resetCombo,
                getColumnContext: getColumnContext,
                getColumns: getColumns,
                getOptions: getOptions,
                getState: getState,
                enableEditorsDrag: enableEditorsDrag
            };
        };
        return epRecordEditorFactoryInstance;
    }
}());

(function() {
'use strict';
/**
* @ngdoc filter
* @name ep.record.editor.filter:epRecordEditor
* @restrict E
*
* @description
* Represents the ep.record.editor filter
*
* @example
*/
angular.module('ep.record.editor').
    filter('epOrderObjectBy', epOrderObjectByFilter);

    /*@ngInject*/
    function epOrderObjectByFilter() {
        return function(items, field, reverse) {
            var filtered = _.map(items, _.identity);
            var director = reverse ? -1 : 1;
            filtered.sort(function(a, b) {
                return (a[field] > b[field] ? director : -director);
            });
            return filtered;
        };
    }
}());

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
                    sidebar: {},
                    small: {
                        animateViewContainer: true,
                        autoActivateSidebar: false,
                        showLeftSidebar: false,
                        enableLeftSidebar: true,
                        showLeftToggleButton: false,
                        showRightToggleButton: false,
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
                        btn.action();
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
                    }
                    else {
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
                                    epUtilsService.getService('epEmbeddedAppsService', true).then(function(epEmbeddedAppsService) {
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
                mode.autoActivateSidebar = mode.autoActivateSidebar !== false;

                shellState.showLeftToggleButton = mode.enableLeftSidebar;
                shellState.enableLeftSidebar = mode.enableLeftSidebar;
                shellState.showRightToggleButton = mode.enableRightSidebar;
                shellState.enableRightSidebar = mode.enableRightSidebar;
                shellState.showNavbar = mode.showNavbar;
                shellState.showFooter = mode.showFooter;
                shellState.showHomeButton = mode.showHomeButton;
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
                shellState.viewSettings[shellState.mediaMode].brandHTML = shellState.brandHTML;

                if (viewScope) {
                    $timeout(function() {
                        $compile(angular.element('#apptitle').contents())(viewScope);
                    });
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
                shellState.footerHTML = angular.isString(html) ? $sce.trustAsHtml(html) : html;
                shellState.viewSettings[shellState.mediaMode].footerHTML = shellState.footerHTML;

                if (viewScope) {
                    $timeout(function() {
                        $compile(angular.element('#footerElement').contents())(viewScope);
                    });
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

    angular.module('ep.shell').directive('epShellSidebar', [
    '$rootScope',
    '$routeParams',
    'epSidebarService',
    'epShellService',
    'epShellConstants',
    'epFeatureDetectionService',
    function($rootScope, $routeParams,
        epSidebarService, epShellService, epShellConstants, epFeatureDetectionService) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: 'src/components/ep.shell/sidebar/sidebar.html',
            controller: ['$scope', function($scope) {
                function init() {
                    $scope.platform = epFeatureDetectionService.getFeatures().platform;
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
    }
    ]);
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
 *  This property will allow you to designate a left or right sidebar template URL.
 *  <br/><br/>
 *  sidebarsettings='{"left": {"templateUrl": "/home-lsidebar.html"}, "right": {"templateUrl": "/home-rsidebar.html"}'

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
                            var expr = $parse(propertyExpr);

                            def[property] = expr(scope);
                            scope.$watch(propertyExpr, function(newVal) {
                                def[property] = newVal;
                            });

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

'use strict';
/**
 * @ngdoc directive
 * @name ep.signature.directive:epSignature
 * @restrict E
 *
 * @description
 * This component displays the section for getting the signature from the user. Upon accepting , the signature will be displayed on the four corners. Test
 *
 * @example
 <doc:example module="ep.signature">
 <doc:source>
 <ep-signature></ep-signature>
 </doc:source>
 </doc:example>
 */
angular.module('ep.signature').directive('epSignature',
    /*@ngInject*/
    ['$timeout', '$document', '$q', function($timeout, $document, $q) {

        function drawText(ctx, text, x, y) {
            if (text) {
                ctx.strokeText(text, x, y);
                ctx.fillText(text, x, y);
            }
        }

        // Adds the text ($scope.ulText, $scope.llText, etc) to the corners of the canvas
        function stampText($scope, $canvas) {
            var ctx = $canvas[0].getContext('2d');
            var canvasHeight = $canvas.attr('height');
            var canvasWidth = $canvas.attr('width');
            ctx.shadowColor = '';
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
            var ulTxt = $scope.ulText;
            var llTxt = $scope.llText;
            var urTxt = $scope.urText;
            var lrTxt = $scope.lrText;

            var ulx = 10;
            var uly = 10;
            var urx = canvasWidth - ctx.measureText(urTxt).width - 30;
            var ury = 10;
            var llx = 10;
            var lly = canvasHeight - 5;
            var lrx = canvasWidth - ctx.measureText(lrTxt).width - 30;
            var lry = canvasHeight - 5;

            ctx.font = '8pt Courier New';
            ctx.fillStyle = '#000';
            drawText(ctx, ulTxt, ulx, uly);
            drawText(ctx, llTxt, llx, lly);
            drawText(ctx, urTxt, urx, ury);
            drawText(ctx, lrTxt, lrx, lry);
        }

        function resizeCanvasToDataUrl($scope, $canvas) {
            var deferred = $q.defer();
            var width = $scope.imageSizeWidth;
            var height = $scope.imageSizeHeight;
            var workingImg = new Image();
            workingImg.onload = function() {
                var workingCanvas = $document[0].createElement('canvas');
                workingCanvas.width = width;
                workingCanvas.height = height;
                var workingCtx = workingCanvas.getContext('2d');
                workingCtx.fillStyle = '#fff';
                workingCtx.fillRect(0, 0, width, height);
                workingCtx.drawImage(workingImg, 0, 0, width, height);
                stampText($scope, $(workingCanvas));
                deferred.resolve(workingCanvas.toDataURL('image/jpeg', 1.0));
            };
            workingImg.onerror = function(err) {
                deferred.reject(err);
            };
            workingImg.src = $canvas[0].toDataURL();

            return deferred.promise;
        }

        function link($scope, $element) {
            $scope.initialized = false;
            $scope.isEnabled = false;
            $scope.drawText = false;
            $scope.initialize = function() {
                if (!$scope.initialized) {
                    var sigOptions = {
                        'background-color': '#fffff',
                        'color': '#000'
                    };
                    var sigcomp = $element.find('#signature').jSignature(sigOptions);
                    $timeout(function() {
                        sigcomp.resize();
                    }, 200);

                    $element.find('#signature').bind('change', function() {
                        // This needs to go to the end of the event stack, hence the timeout
                        $timeout(function() {
                            $scope.sig = $element.find('#signature').jSignature('getData');
                            $scope.isEnabled = !!$scope.sig;
                        }, 0);
                    });
                    $scope.initialized = true;
                }
            };

            $scope.accept = function() {
                if (angular.isDefined($scope.sig) && (!$scope.onBeforeAccept ||
                    $scope.onBeforeAccept($scope) !== false)) {
                    $scope.isEnabled = false;
                    $scope.drawText = true;
                    $timeout(function() {

                        var $canvas = $('canvas.jSignature');
                        var canvas = $canvas[0];
                        if ($scope.imageSizeWidth || $scope.imageSizeHeight) {
                            if (angular.isString($scope.imageSizeWidth)) {
                                $scope.imageSizeWidth =
                                    $scope.imageSizeWidth ? parseInt($scope.imageSizeWidth) : 0;
                            }
                            if (angular.isString($scope.imageSizeHeight)) {
                                $scope.imageSizeHeight = $scope.imageSizeHeight ? parseInt($scope.imageSizeHeight) : 0;
                            }
                            var currentAspect = parseInt($canvas.attr('width')) / parseInt($canvas.attr('height'));
                            if ($scope.imageSizeWidth && !$scope.imageSizeHeight) {
                                $scope.imageSizeHeight = Math.floor($scope.imageSizeWidth / currentAspect);
                            } else if ($scope.imageSizeHeight && !$scope.imageSizeWidth) {
                                $scope.imageSizeWidth = Math.floor($scope.imageSizeHeight * currentAspect);
                            }
                            resizeCanvasToDataUrl($scope, $canvas).then(
                                function(dataUrl) {
                                    $scope.onAccept(dataUrl.replace('data:image/jpeg;base64,', ''));
                                });
                        } else {
                            stampText($scope, $canvas);
                            $scope.onAccept(canvas.toDataURL('image/jpeg', 1.0).replace('data:image/jpeg;base64,', ''));
                        }

                    });
                }
            };

            $scope.reset = function() {
                $scope.setButton = false;
                $scope.isEnabled = true;
                $element.find('#signature').jSignature('reset');

            };

            $scope.signatureControls = {
                reset: $scope.reset
            };

            $scope.initialize();
        }

        return {
            restrict: 'E',
            scope: {
                sig: '=?',
                signatureControls: '=?',
                onBeforeAccept: '=',
                onAccept: '=',
                acceptIsEnabled: '=',
                backgroundColor: '@',
                color: '@',
                acknowledgeText: '@',
                ulText: '@',
                urText: '@',
                llText: '@',
                lrText: '@',
                height: '@',
                imageSizeWidth: '@',
                imageSizeHeight: '@'
                // create property for label here and fetch from API
            },
            templateUrl: 'src/components/ep.signature/ep-signature.html',
            link: link
        };
    }]);

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
 * @ngdoc controller
 * @name ep.tabbar.controller:epTabbarCtrl
 * @description
 * Represents the epTabbar controller for the
 * ep.tabbar module, or for specific ep-tabbar directive
 *
 * @example
 *
 */
(function() {
    'use strict';

    angular.module('ep.tabbar').controller('epTabbarCtrl', [
    function() {
    }
    ]);
})();

/**
* @ngdoc directive
* @name ep.tabbar.directive:epTabbar
* @restrict E
*
* @description
* This component displays a bar at the bottom of the view with buttons that contain text and/or an icon.
* The icons can be configured to display
* on the top, bottom, left, or right of the text.
*
* @example
<doc:example module="ep.tabbar">
    <doc:source>
      <ep-tabbar>
      </ep-tabbar>
  </doc:source>
</doc:example>
*/
(function() {
    'use strict';

    angular.module('ep.tabbar').directive('epTabbar',
    ['epTabbarService', function(epTabbarService) {

        function link($scope) {
            $scope.state = epTabbarService.state;
            $scope.executeButton = function(icon) {
                icon.action();
            };
        }

        return {
            restrict: 'E',
            controller: 'epTabbarCtrl',
            templateUrl: 'src/components/ep.tabbar/ep-tabbar.html',
            link: link
        };
    }]);
})();

/**
 * @ngdoc service
 * @name ep.tabbar.service:epTabbarService
 * @description
 * Service for the ep.tabbar module
 * tabbar components test
 *
 * @example
 *
 */
(function() {
    'use strict';

    angular.module('ep.tabbar').service('epTabbarService', [
    function() {

        var state = {
            labelAlignment: 'top',
            tabbarAlignment: 'bottom',
            iconAlignment: 'top',
            labelText: 'bottom',
            tabs: []
        };
        /**
        * @ngdoc method
        * @name addTab
        * @methodOf ep.tabbar.service:epTabbarService
        * @public
        * @description
        * This adds a new tab to the tab bar.
        * @example
        * epTabbarService.addTab({
        *   id: 'settings',
        *   icon: 'fa fa-cog',
        *   text: 'Settings',
        *   action: function() { showSettings(); }
        * });
        */
        function addTab(tab) {
            state.tabs.push(tab);
        }

        /**
        * @ngdoc method
        * @name enableTopTabbar
        * @methodOf ep.tabbar.service:epTabbarService
        * @public
        * @description
        * This enables the tabbar docked at the top of the screen.
        */
        function enableTopTabbar() {
            state.tabbarAlignment = 'top';
        }
        /**
        * @ngdoc method
        * @name enableBottomTabbar
        * @methodOf ep.tabbar.service:epTabbarService
        * @public
        * @description
        * This enables the tabbar docked at the bottom of the screen.
        */
        function enableBottomTabbar() {
            state.tabbarAlignment = 'bottom';
        }
        /**
        * @ngdoc method
        * @name showIconsOnLeft
        * @methodOf ep.tabbar.service:epTabbarService
        * @public
        * @description
        * This shows tabbar with the icons on the left and description on the right.
        */
        function showIconsOnLeft() {
            state.labelAlignment = 'left';
            state.iconAlignment = 'left';
            state.labelText = 'left';
        }
        /**
        * @ngdoc method
        * @name showIconsOnTop
        * @methodOf ep.tabbar.service:epTabbarService
        * @public
        * @description
        * This shows tabbar with the icons on the top and description on the bottom.
        */
        function showIconsOnTop() {
            state.labelAlignment = 'top';
            state.iconAlignment = 'top';
            state.labelText = 'Bottom';
        }
        /**
         * @ngdoc method
         * @name removeTab
         * @methodOf ep.tabbar.service:epTabbarService
         * @public
         * @description
         * This removes the selected tab from the tabbar.
         *
         * @param {string} id represents the selected tab id to remove
         */
        function removeTab(id) {
            state.tabs = _.reject(state.tabs, function(icon) { return icon.id === id; });
        }

        return {
            enableTopTabbar: enableTopTabbar,
            enableBottomTabbar: enableBottomTabbar,
            showIconsOnLeft: showIconsOnLeft,
            showIconsOnTop: showIconsOnTop,
            removeTab: removeTab,
            addTab: addTab,
            state: state
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
                if (bodyEl.length && bodyEl.attr("class")) {
                    //remove all previous ep_theme_* classes
                    var classList = bodyEl.attr("class").split(/\s+/);
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

/**
 * @ngdoc object
 * @name ep.tile.object:epTileConfig
 * @description
 * Provider for epTileConfig.
 * Gets configuration options from sysconfig.json or default
 */
(function() {
    'use strict';

    angular.module('ep.tile').provider('epTileConfig',
    function() {
        var config = {
            bingTile: {
                bingImageArchiveUrl: 'http://www.bing.com/HPImageArchive.aspx?format=rss&idx=0&mkt=en-US',
                bingProxyUrl: '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=',
                bingNumberOfImages: 5,
                liveSettings: {
                    dataDelay: 7000,
                    dataDirection: 'horizontal',
                    dataMode: 'carousel'
                }
            },
            imageTile: {
                liveSettings: {
                    dataDelay: 5000,
                    dataDirection: 'vertical',
                    dataMode: 'carousel'
                }
            }
        };

        this.$get = ['epSysConfig', function(epSysConfig) {
            epSysConfig.mergeSection('ep.tile', config);
            return config;
        }];
    });
})();

/**
 * @ngdoc controller
 * @name ep.tile.controller:epTileCtrl
 * @description
 * Represents the epTile controller for the
 * ep.tile module, or for specific ep-tile directive
 *
 * @example
 *
 */

(function() {
    'use strict';

    epTileCtrl.$inject = ['$scope', '$timeout', '$http', '$q', '$log', 'epTileConfig', 'epUtilsService', 'epApplicationConfig'];
    angular.module('ep.tile')
        .controller('epTileCtrl', epTileCtrl);

    /*@ngInject*/
    function epTileCtrl($scope, $timeout, $http, $q, $log, epTileConfig, epUtilsService, epApplicationConfig) {

        /**
            * @ngdoc method
            * @name retrieveBing
            * @methodOf ep.tile.controller:epTileCtrl
            * @public
            * @description
            * Retrieves the image of the day information from Bing
            *
            * @param {int} numImages - number of images to retrieve
            */
        /**
            * @ngdoc method
            * @name retrieveBing
            * @methodOf ep.tile.controller:epTileCtrl
            * @public
            * @description
            * Retrieves the image of the day information from Bing
            *
            * @param {int} numImages - number of images to retrieve
            */
        function retrieveBing(numImages) {
            var deferred = $q.defer();

            var imgPath = epApplicationConfig.getAssetsPath('shell', 'ep.tile/bing');
            var fnError = function onError(message) {
                $log.error('Error parsing retrieving bing images: ' + message);
                var imgs = { images: [] };
                for (var i = 1; i < 6; i++) {
                    imgs.images.push({
                        src: imgPath + i + '.jpg',
                        title: 'Bing Image of the day (offline)'
                    });
                }
                deferred.resolve(imgs);
            };

            try {
                var url = epTileConfig.bingTile.bingImageArchiveUrl + '&n=' + numImages;
                $http.jsonp(epTileConfig.bingTile.bingProxyUrl + encodeURIComponent(url))
                .success(function(data) {
                    if (data && data.responseData && data.responseData.feed && data.responseData.feed.entries &&
                        data.responseData.feed.entries.length) {
                        var ret = { images: [] };
                        angular.forEach(data.responseData.feed.entries, function(p) {
                            ret.images.push({
                                src: 'http://www.bing.com' + p.link,
                                title: p.title
                            });
                        });
                        deferred.resolve(ret);
                    } else {
                        var msg = 'unknown response failure';
                        if (data && data.responseStatus) {
                            msg = 'status - ' + data.responseStatus;
                        }
                        if (data && data.responseDetails) {
                            msg += ' ' + data.responseDetails;
                        }
                        fnError(msg);
                    }
                }).error(function(data, status) {
                    fnError('$http status - ' + status);
                });
            } catch (err) {
                fnError(err.message);
            }
            return deferred.promise;
        }

        function getSize(val, suffix) {
            var ret = '';
            var sizes = ['half', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
            if (angular.isNumber(val)) {
                var idx = -1;
                if (val >= 0 && val < 1) {
                    idx = 0;
                } else if (val >= 1 && val <= 10) {
                    idx = Math.round(val);
                }
                if (idx !== -1) {
                    ret = ' ' + sizes[idx] + suffix;
                }
            }
            return ret;
        }

        function setImages(images) {
            if (images) {
                var idx = 0;
                angular.forEach(images, function(img) {
                    $scope.state.images.push({
                        src: img.src,
                        title: img.title || $scope.tile.footer,
                        index: idx,
                        data: img
                    });
                    idx++;
                });
            }
        }

        $scope.initializeTile = function() {
            var isLive = false;
            var tile = $scope.tile;
            if (!tile) {
                $log.error('tile object must be defined for ep.tile directive');
                return;
            }

            var width = tile.width !== undefined ? tile.width : $scope.width;
            var height = tile.height !== undefined ? tile.height : $scope.height;

            $scope.state.tileClass = '';
            $scope.state.images = [];

            if (tile.type === 'custom') {
                $scope.state.templateOptions = tile.templateOptions;
            } else if (tile.type === 'image' || tile.type === 'bing') {
                isLive = true; //by default images are live
                if (width === undefined) {
                    width = (tile.type === 'image') ? 2 : 3;
                }
                if (height === undefined) {
                    height = 2;
                }
                $scope.state.templateUrl = 'src/components/ep.tile/ep-tile-templates/ep-tile-image.html';
                $scope.state.liveSettings = (tile.type === 'bing') ? epTileConfig.bingTile.liveSettings :
                    epTileConfig.imageTile.liveSettings;
                if (tile.liveSettings) {
                    epUtilsService.copyProperties(tile.liveSettings, $scope.state.liveSettings);
                }

                if (tile.type === 'bing') {
                    retrieveBing(epTileConfig.bingTile.bingNumberOfImages).then(function(bing) {
                        setImages(bing.images);
                    });
                } else {
                    if (tile.liveSettings) {
                        epUtilsService.copyProperties();
                    }
                    setImages(tile.images);
                }
            } else {
                if (width === undefined) {
                    width = 2;
                }
                $scope.state.templateUrl = 'src/components/ep.tile/ep-tile-templates/ep-tile-menu.html';
            }

            if (isLive && tile.isLive !== false) {
                $scope.state.optionsClass += 'ep-live-tile';
            }

            if (tile.tileClass) {
                $scope.state.tileClass += ' ' + tile.tileClass;
            }

            $scope.state.tileClass += getSize(width, '-wide');
            $scope.state.tileClass += getSize(height, '-tall');

            var len;
            if (tile.caption) {
                len = tile.caption.length;
                if (len > 30) {
                    $scope.state.optionsClass += ' ep-tile-opt-cap-30';
                } else if (len > 15) {
                    $scope.state.optionsClass += ' ep-tile-opt-cap-15';
                }
            }
            if (tile.description) {
                len = tile.description.length;
                if (len > 40) {
                    $scope.state.optionsClass += ' ep-tile-opt-desc-40';
                } else if (len > 20) {
                    $scope.state.optionsClass += ' ep-tile-opt-desc-20';
                }
            }
            if (tile.icon) {
                $scope.state.optionsClass += ' ep-tile-opt-icon';
            }
            if (tile.closeButton !== false) {
                $scope.state.optionsClass += ' ep-tile-opt-close-btn';
            }

            $scope.state.color = tile.color || $scope.color || '';

            $scope.state.closeAction = function(tile, $event) {
                $event.stopPropagation();
                if (tile.closeAction) {
                    tile.closeAction(tile, $event);
                }
            };

            $scope.state.action = function(tile, $event) {
                if (tile.action) {
                    var imageIndex;
                    var imageObject;
                    if (tile.type === 'image') {
                        var img = angular.element($scope.state.tileElement).find('.ha .active img');
                        if (img && img.length) {
                            var idx = angular.element(img).attr('image-index');
                            if (idx !== '') {
                                imageIndex = parseInt(idx);
                                imageObject = $scope.state.images[imageIndex].data;
                            }
                        }
                    }
                    tile.action(tile, $event, imageIndex, imageObject);
                }
            };

            $timeout(function() {
                angular.element($scope.state.tileElement).find('.ep-live-tile .live-tile').liveTile();
            }, 1000);
        };

        $scope.$watch('sizeMode', function(newValue) {
            $scope.state.sizeMode = (newValue === 'container') ? 'ep-tile-size-container' : 'ep-tile-size-responsive';
        });

        $scope.$watch('color', function(newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
                if (!($scope.tile && $scope.tile.color)) {
                    $scope.state.color = (newValue || '');
                }
            }
        });

        $scope.$watch('tile', function(newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
                $scope.initializeTile();
            }
        });

    }
})();

/**
* @ngdoc directive
* @name ep.tile.directive:epTile
* @restrict E
*
* @description
* Represents the ep.tile directive
* Tiles are based on metroJS tile library.
*
*   The following are attributes (parameters) for the directive:
*   # tile {object} (required) - the object containing tile properties. Some properties
*     can override the directive params.
*       type {string} - 'menu'|'image'|'bing'|'custom'
*       width, height, color, liveSettings - can override directive params
*       isLive {bool} - set live tile (by default on for image tiles)
*       tileClass {string} - additional tile style classes
*       caption {string} - menu caption (for menu tile)
*       description {string} - menu description (for menu tile)
*       footer {string} - footer text
*       action {function} - function to be called when clicked
*       closeButton {bool} close action (by default close button is shown)
*       images {array} - array of image objects [{ src, title }]
*       icon {string} - icon set in the menu tile caption area
*       contentIcon {string} - icon set in the content area
*       templateOptions - template options for custom tile (type must be 'custom')
*           # template - plain HTML
*           # templateUrl - template url
*           # templateCtrl - template controller function
*           # templateScope - template scope
*
*   # color {string} - any standard metrojs color ('blue', 'yellow', 'mango', 'violet', etc)
*       amber, blue, brown, cobalt, crimson, cyan, emerald, green, indigo, lime, magenta, mango,
*       mauve, olive, orange, pink, purple, red, sienna, steel, teal, violet, yellow
*   # size-mode {string} - 'container' tiles will be as wide as container
*   # width {int} - width in tiles 0.5, 1, 2,...10
*   # height {int} - height in tiles 0.5, 1, 2,...10
*   # live-settings {object} -
*       dataMode: 'carousel',
*       dataDirection: 'horizontal',
*       dataDelay: '7000'
*
* @example
*/
(function() {
    'use strict';

    epTileDirective.$inject = ['$timeout'];
    angular.module('ep.tile').
    directive('epTile', epTileDirective);

    /*@ngInject*/
    function epTileDirective($timeout) {
        return {
            restrict: 'E',
            controller: 'epTileCtrl',
            templateUrl: 'src/components/ep.tile/ep-tile.html',
            scope: {
                tile: '=',
                color: '=',
                sizeMode: '=',
                width: '=',  //0.5 - 10
                height: '=', //0.5 - 10
                liveSettings: '='
            },
            link: function(scope, element) {
                scope.state = {
                    optionsClass: '',
                    tileElement: element,
                    templateUrl: '',
                    images: [],
                    closeAction: undefined,
                    sizeMode: 'ep-tile-size-responsive',
                    color: '',
                    liveSettings: {
                        dataMode: 'carousel',
                        dataDirection: 'horizontal',
                        dataDelay: '7000'
                    },
                    templateOptions: {}
                };
                $timeout(function() {
                    scope.initializeTile();
                });
            }
        };
    }
})();

/**
 * @ngdoc controller
 * @name ep.tiles.panel.controller:epTilesMenuFavoritesCtrl
 * @description
 * Represents the epTilesMenuFavoritesCtrl controller for the
 * epTilesMenuFavorites directive
 */
(function() {
    'use strict';

    epTilesMenuFavoritesCtrl.$inject = ['$rootScope', '$scope', '$timeout', 'epMultiLevelMenuConstants', 'epMultiLevelMenuService', 'epUtilsService'];
    angular.module('ep.tiles.panel')
        .controller('epTilesMenuFavoritesCtrl', epTilesMenuFavoritesCtrl);

    /*@ngInject*/
    function epTilesMenuFavoritesCtrl($rootScope, $scope, $timeout,
        epMultiLevelMenuConstants, epMultiLevelMenuService, epUtilsService) {

        $scope.getFooter = function(menuFactory, menuItem) {
            var footer = 'Last Accessed: ';
            var lastAccess = menuFactory.getItemLastAccess(menuItem);
            if (lastAccess) {
                footer += moment(lastAccess).calendar();
            } else {
                footer += 'never';
            }
            return footer;
        };

        $scope.createItem = function(menuFactory, menu) {
            $scope.fnCloseAction = function(tile) {
                var m = menuFactory.findMenuItemById(tile.id);
                if (m) { menuFactory.toggleFavorite(m); }
            };

            var footer = $scope.getFooter(menuFactory, menu);
            var theTile = {
                id: menu.id,
                closeAction: $scope.fnCloseAction,
                icon: $scope.menuIcon || menu.icon || 'fa fa-dashboard',
                caption: menu.caption,
                description: menu.description,
                type: 'menu',
                footer: footer,
                menuItem: menu,
                sort: menu.caption,
                color: menu.color
            };
            if (menu.tile) {
                epUtilsService.copyProperties(menu.tile, theTile);
            }
            theTile.action = function() {
                menuFactory.triggerAction(menu);
            };

            return theTile;
        };

        $scope.onMenuChange = function(event, data) {
            if ($scope.menuId !== data.menuId) {
                return;
            }
            var menuFactory = data.factory;
            var items = [];
            angular.forEach(menuFactory.data.favorites, function(menu) {
                items.push($scope.createItem(menuFactory, menu));
            });
            $scope.state.list = items;
        };

        $scope.onFavoritesChange = function(event, data) {
            //remove or add items to the list
            if ($scope.menuId !== data.menuId) {
                return;
            }

            if (!$scope.state.list) {
                $scope.state.list = [];
            }

            var menuFactory = data.factory;
            var favs = menuFactory.data.favorites;
            var removeItems = [];
            angular.forEach($scope.state.list, function(item) {
                var itemInFavs = _.find(favs, function(menu) {
                    return menu === item.menuItem;
                });
                if (!itemInFavs) {
                    removeItems.push(item);
                }
            });
            angular.forEach(removeItems, function(rem) {
                var idx = _.findIndex($scope.state.list, function(item) {
                    return item === rem;
                });
                if (idx !== -1) {
                    $scope.state.list.splice(idx, 1);
                }
            });
            angular.forEach(favs, function(menu) {
                var menuInList = _.find($scope.state.list, function(item) {
                    return menu === item.menuItem;
                });
                if (!menuInList) {
                    $scope.state.list.push($scope.createItem(menuFactory, menu));
                }
            });
        };

        $scope.onMenuItemClicked = function(event, data) {
            if ($scope.menuId !== data.menuId) {
                return;
            }

            if ($scope.state.list && data.menuItem) {
                var menuFactory = data.factory;
                var item = _.find($scope.state.list, function(m) {
                    return m.id === data.menuItem.id;
                });
                if (item) {
                    item.footer = $scope.getFooter(menuFactory, data.menuItem);
                }
            }
        };
        $rootScope.$on(epMultiLevelMenuConstants.MLM_INITIALIZED_EVENT, $scope.onMenuChange);
        $rootScope.$on(epMultiLevelMenuConstants.MLM_MENU_DATA_CHANGED, $scope.onMenuChange);
        $rootScope.$on(epMultiLevelMenuConstants.MLM_FAVORITES_CHANGED, $scope.onFavoritesChange);
        $rootScope.$on(epMultiLevelMenuConstants.MLM_ITEM_CLICKED, $scope.onMenuItemClicked);

        $scope.$watch('menuId', function(newValue) {
            if (newValue) {

                $scope.menuFactory = epMultiLevelMenuService.getMenuFactory(newValue);
                if ($scope.menuFactory) {
                    $scope.$watch($scope.menuFactory.data, function() {
                        var event = {
                            eventId: epMultiLevelMenuConstants.MLM_MENU_DATA_CHANGED,
                            menuId: $scope.menuId,
                            factory: $scope.menuFactory,
                        };
                        $scope.onMenuChange(epMultiLevelMenuConstants.MLM_MENU_DATA_CHANGED, event);
                    });
                }
            }
        });

        $scope.prepareBeforeList = function() {
            var beforeList = [];
            if ($scope.bing) {
                beforeList.push({
                    id: 'bing-image-of-the-day',
                    sort: '__abing',
                    type: 'bing',
                    width: $scope.bingWidth || 3,
                    height: $scope.bingHeight || 2,
                });
            }
            if ($scope.beforeList) {
                angular.forEach($scope.beforeList, function(item) {
                    beforeList.push(item);
                });
            }
            $scope.state.beforeList = beforeList;
        };

        $scope.$watch('bing', function(newValue, oldValue) {
            if ((newValue === true || newValue === false) && newValue !== oldValue) {
                $scope.prepareBeforeList();
            }
        });

        $scope.$watch('beforeList', function(newValue, oldValue) {
            if (newValue && oldValue !== newValue) {
                $scope.prepareBeforeList();
            }
        });

        $scope.$watch('afterList', function(newValue) {
            if (newValue) {
                var afterList = [];
                angular.forEach(newValue, function(item) {
                    afterList.push(item);
                });
                $scope.state.afterList = afterList;
            }
        });
    }
})();

/**
* @ngdoc directive
* @name ep.tiles.panel.directive:epTilesMenuFavorites
* @restrict E
*
* @description
* Represents the menu favorites tiles panel directive. Links to them menu favorites by means
* of unique menu-id
*
*   The following are attributes (parameters) for the directive:
*   # menu-id {string} (required) - the unique menu identifier
*   # before-items {array} - array of tiles to be placed in front of menu list
*   # after-items {array} - array of tiles to be placed after the menu list
*   # size-mode {string} - 'container' tiles will be as wide as container
*   # color {string} - any standard metrojs color ('blue', 'yellow', 'mango', 'violet', etc)
*   # bing {bool} - include built-in bing tile (with bing image of the day)
*   # width {int} - width in tiles 0.5, 1, 2,...10
*   # height {int} - height in tiles 0.5, 1, 2,...10
*   # bingWidth {int} - (optional) width of Bing Tile
*   # bingHeight {int} - (optional) height of Bing Tile
* @example
*
*     <ep-tiles-menu-favorites menu-id="'ep.test-tiles'"></ep-tiles-menu-favorites>
*
*/
(function() {
    'use strict';

    angular.module('ep.tiles.panel').
    directive('epTilesMenuFavorites', epTilesMenuFavoritesDirective);

    /*@ngInject*/
    function epTilesMenuFavoritesDirective() {
        return {
            restrict: 'E',
            controller: 'epTilesMenuFavoritesCtrl',
            template: '<ep-tiles-panel list=state.list before-list=state.beforeList after-list=state.afterList ' +
                'color=color size-mode=sizeMode width=width height=height disable-sort=disableSort></ep-tiles-panel>',
            scope: {
                menuId: '=',
                beforeList: '=',
                afterList: '=',
                sizeMode: '=',
                color: '=',
                bing: '=',
                menuIcon: '=',
                width: '=',
                height: '=',
                bingHeight: '=',
                bingWidth: '=',
                disableSort: '='
            },
            link: function(scope, element) {
                scope.state = {
                    theElement: element,
                    list: [],
                    beforeList: [],
                    afterList: []
                };
                scope.prepareBeforeList();
            }
        };
    }
})();

/**
 * @ngdoc controller
 * @name ep.tiles.panel.controller:epTilesPanelCtrl
 * @description
 * Represents the epTilesPanel controller for the
 * ep.tiles.panel module, or for specific ep-tiles-panel directive
 *
 * @example
 *
 */
(function() {
    'use strict';

    epTilesPanelCtrl.$inject = ['$scope'];
    angular.module('ep.tiles.panel')
        .controller('epTilesPanelCtrl', epTilesPanelCtrl);

    /*@ngInject*/
    function epTilesPanelCtrl($scope) {
        var tileColors = [
             'amber', 'blue', 'brown', 'cobalt', 'crimson', 'cyan',
             'magenta', 'lime', 'indigo', 'green', 'emerald',
             'mango', 'mauve', 'olive', 'orange', 'pink', 'red',
             'sienna', 'steel', 'teal', 'violet', 'yellow'
        ];

        function doSort(tile) {
            return tile.sort || tile.caption;
        }

        $scope.sortList = $scope.disableSort !== true ? doSort : undefined;

        $scope.initColors = function() {
            $scope.state.tileColor = '';
            if (typeof $scope.color === 'function') {
                $scope.state.tileColor = '';
                $scope.state.colorFunc = function(tile) {
                    return $scope.color(tile);
                };
            } else if ($scope.color === 'mix' || $scope.color === 'random') {
                $scope.state.tileColor = '';

                var shuffledColors = _.shuffle(tileColors);

                $scope.state.colorIndex = -1;
                $scope.state.colorFunc = function(tile) {
                    if (!tile.color) {
                        if ($scope.color === 'random') {
                            tile.color = shuffledColors[$scope.state.colorIndex++ % tileColors.length];
                        } else {
                            tile.color = tileColors[$scope.state.colorIndex++ % tileColors.length];
                        }
                    }
                    return '';
                };
            } else if ($scope.color && angular.isString($scope.color)) {
                $scope.state.tileColor = $scope.color;
            }
        };

        $scope.$watch('color', function(newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
                $scope.initColors();
            }
        });

        $scope.$watch('list', function(newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
                $scope.initColors();
            }
        });
        $scope.$watch('beforeList', function(newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
                $scope.initColors();
            }
        });
        $scope.$watch('afterList', function(newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
                $scope.initColors();
            }
        });
        $scope.$watch('disableSort', function(newValue, oldValue) {
            if ((newValue === true || newValue === false) && newValue !== oldValue) {
                $scope.sortList = $scope.disableSort !== true ? doSort : undefined;
            }
        });
    }
})();

/**
* @ngdoc directive
* @name ep.tiles.panel.directive:epTilesPanel
* @restrict E
*
* @description
* Represents the ep.tiles.panel directive
*
*   The following are attributes (parameters) for the directive:
*   # list {array} (optional) - the main array (list) of tile objects
*   # beforeList {array} (optional) - the array (list) of tile objects placed before the main list
*   # afterList {array} (optional) - the array (list) of tile objects placed after the main list
*   # color {string} - any standard metrojs color ('blue', 'yellow', 'mango', 'violet', etc)
*       amber, blue, brown, cobalt, crimson, cyan, emerald, green, indigo, lime, magenta, mango,
*       mauve, olive, orange, pink, purple, red, sienna, steel, teal, violet, yellow
*
*       'random'/'mix' - random or mixed colors will be assigned to tiles in this panel
*   # color {function} - pass a function that will return a color to be assigned to the tile
*   # size-mode {string} - 'container' tiles will be as wide as container
*   # width {int} - width in tiles 0.5, 1, 2,...10
*   # height {int} - height in tiles 0.5, 1, 2,...10
*
* @example
*   <ep-tiles-panel list=state.list color="'blue'" size-mode=""></ep-tiles-panel>
*
*   <ep-tiles-panel list=state.list color="'random'" size-mode="'container'"></ep-tiles-panel>
*/
(function() {
    'use strict';

    angular.module('ep.tiles.panel').
    directive('epTilesPanel', epTilesPanelDirective);

    /*@ngInject*/
    function epTilesPanelDirective() {
        return {
            restrict: 'E',
            controller: 'epTilesPanelCtrl',
            templateUrl: 'src/components/ep.tiles.panel/ep-tiles-panel.html',
            scope: {
                list: '=',
                beforeList: '=',
                afterList: '=',
                color: '=',
                sizeMode: '=',
                width: '=',
                height: '=',
                disableSort: '='
            },
            link: function(scope, element) {
                scope.state = {
                    tilePanelElement: element,
                    list: [],
                    beforeList: [],
                    afterList: [],
                    tileColor: '',
                    colorFunc: undefined
                };
                scope.initColors();
            }
        };
    }
})();

'use strict';
(function() {
    angular.module('ep.token')
        .service('epErpRestService', ['$resource', 'epTokenService', function ($resource, epTokenService) {
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
            return {
                setUrl: function (url) {
                    serverUrl = url;
                },
                get: function (path, query) {
                    return call('GET', path, query).get();
                },
                post: function () {
                    //POST and other methods TO BE Implemented when needed
                }
            };
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
    epLoginViewCtrl.$inject = ['$scope', 'epUtilsService', 'epModalDialogService', 'epTokenService'];
    angular.module('ep.token')
        .controller('epLoginViewCtrl', epLoginViewCtrl);

    /*@ngInject*/
    function epLoginViewCtrl($scope, epUtilsService, epModalDialogService, epTokenService) {

        $scope.settings = {
            username: '',
            password: '',
            serverName: '',
            serverUrl: '',
            tokenUrl: '',
            token: {}
        };

        epUtilsService.copyProperties($scope.options, $scope.settings);

        $scope.showHelp = function() {
            epModalDialogService.showCustomDialog(
                {
                    title: 'Help',
                    templateUrl: 'app/templates/help-template.html',
                    size: 'fullscreen',
                    closeButton: true,
                    helpfile: 'app/helpfiles/Records-help.html'
                }
            );
        };

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
                $scope.status = $scope.settings.username === '' ? 'Oops.. There\'s no user name there!' : 'Oops.. You forgot to type your password!';
                epModalDialogService.hide();
                return;
            } else if ($scope.settings.serverName === '') {
                $scope.hasError = true;
                $scope.status = 'Oops... Don\'t forget to type the Server.';
                epModalDialogService.hide();
                return;
            }

            //remove last '/'
            var serverName = epUtilsService.ensureEndsWith($scope.settings.serverName, '/');
            serverName = serverName.substring(0, serverName.length - 1);

            var svr = serverName.toLowerCase().trim();
            var prefix = (svr.indexOf('https://') === 0 || svr.indexOf('http://') === 0) ? '' : 'https://';
            $scope.settings.serverUrl = prefix + serverName;
            $scope.settings.tokenUrl = $scope.settings.serverUrl + '/TokenResource.svc/';

            var tokenUser = {
                username: $scope.settings.username,
                password: $scope.settings.password,
                serverUrl: $scope.settings.serverUrl
            };
            var tokenOptions = { restUri: $scope.settings.tokenUrl };
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
                        var result = $scope.options.fnOnGetToken($scope.settings);
                        if (result && result.hasError) {
                            $scope.hasError = true;
                            $scope.status = result.status;
                            return;
                        }
                    }
                    if ($scope.options.fnOnSuccess) {
                        $scope.options.fnOnSuccess($scope.settings);
                    }
                } catch (err) {
                    alert(err.message);
                }
            }).error(function(data, status, headers, config) {
                var restServer = (config !== undefined && config !== null) ? config.url : '';
                $scope.hasError = true;
                $scope.status = (status == 401 ? "Please review the user or password." : "We couldn\'t connect to the server. Please review it.");
            });
            epModalDialogService.hide();
        };

        $scope.passwordKeyPress = function(keyEvent) {
            $scope.hasError = false;
            $scope.status = '';
            var key = typeof event.which === "undefined" ? event.keyCode : event.which;
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
*       fnOnGetToken {function} - callback when we successfully received a token
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
            controller: 'epTokenCtrl',
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
        function resolveServerUrl(server, svc){
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


(function() {
    'use strict';

    angular.module('ep.ui.range.slider').controller('epRangeSliderCtrl', [
    '$scope',
    function($scope) {
        var handle;
        var axisClickX;
        var handleWidth;
        var lastX;
        var minHandleX = 0;
        var maxHandleX = 0;
        var isHandleClicked;
        var axisWidth;

        function positionRange(pos) {
            $scope.range.css('left', pos + 'px');
        }

        function positionHandle(handleType, pos) {
            var handle = handleType === 'left' ? $scope.minHandle : $scope.maxHandle;
            handle.css('left', pos + 'px');
        }

        function processRangeDrag(swipeCoords, evt) {
            var diff;
            var evtCoords = getEventCoordinates(evt);
            var minHandleLeftPos = parseInt($scope.minHandle.css('left'));
            var maxHandleLeftPos = parseInt($scope.maxHandle.css('left'));

            axisWidth = $scope.axis.width();
            if (lastX === null || lastX === undefined) {
                lastX = axisClickX;
            }

            if (swipeCoords.x > lastX) {
                diff = evtCoords.x - lastX;
                if ((maxHandleLeftPos + handleWidth) >= axisWidth) {
                    return;
                }
                positionRange(parseInt($scope.range.css('left')) + diff);
                minHandleX = minHandleLeftPos + diff;
                maxHandleX = maxHandleLeftPos + diff;
                positionHandle('left', minHandleX);
                positionHandle('right', maxHandleX);
            } else {
                diff = lastX - evtCoords.x;
                if (minHandleLeftPos <= 0) {
                    return;
                }
                positionRange(parseInt($scope.range.css('left')) - diff);
                minHandleX = minHandleLeftPos - diff;
                maxHandleX = maxHandleLeftPos - diff;
                positionHandle('left', minHandleX);
                positionHandle('right', maxHandleX);
            }
            $scope.rangeMin = minHandleLeftPos === 1 ? $scope.min :
                getHandleValue(minHandleLeftPos);
            $scope.rangeMax = getHandleValue(maxHandleLeftPos + handleWidth);
            lastX = swipeCoords.x;
            $scope.$digest();
        }
        function processHandleDrag(swipeCoords, evt) {
            var diff;
            var newPos;
            var evtCoords = getEventCoordinates(evt);
            var isMinHandle = handle.is('.js-handle-min');
            var width;

            if (maxHandleX === 0 || isNaN(maxHandleX)) {
                maxHandleX = axisWidth - handleWidth;
            }

            if (lastX === null || lastX === undefined) {
                lastX = axisClickX;
            }

            if (swipeCoords.x > lastX) {
                diff = evtCoords.x - lastX;
                newPos = parseInt(handle.css('left')) + diff;
                if ((newPos) > axisWidth) {
                    return;
                }
                if (isMinHandleHitMaxHandle()) {
                    return;
                }
                if (!isMinHandle && (newPos + handleWidth) >= axisWidth) {
                    return;
                }
                width = isMinHandle ? $scope.range.width() - diff : $scope.range.width() + diff;
            } else {
                diff = lastX - evtCoords.x;
                newPos = (parseInt(handle.css('left')) || maxHandleX) - diff;
                if (newPos <= 0) {
                    return;
                }
                if (isMaxHandleHitMinHandle()) {
                    return;
                }
                width = isMinHandle ? $scope.range.width() + diff : $scope.range.width() - diff;
            }

            if (isMinHandle) {
                minHandleX = newPos;
                $scope.rangeMin = newPos === 1 ? $scope.min :
                    getHandleValue(newPos);
            } else {
                maxHandleX = newPos;
                $scope.rangeMax = newPos + handleWidth >= axisWidth ? $scope.max :
                    getHandleValue(newPos + handleWidth);
            }

            $scope.range.css({ left: (minHandleX + handleWidth) + 'px', width: width });
            positionHandle(isMinHandle ? 'left' : 'right', newPos);
            lastX = swipeCoords.x;
            $scope.$digest();

            function isMinHandleHitMaxHandle() {
                return isMinHandle && newPos >= maxHandleX - handleWidth;
            }

            function isMaxHandleHitMinHandle() {
                return !isMinHandle && minHandleX + handleWidth >= newPos;
            }
        }
        function getEventCoordinates(evt) {
            var res = { x: 0, y: 0 };
            if (evt.originalEvent && evt.originalEvent instanceof TouchEvent) {
                res.x = evt.originalEvent.changedTouches[0].clientX;
                res.y = evt.originalEvent.changedTouches[0].clientY;
            } else if (evt.originalEvent && evt.originalEvent instanceof MouseEvent) {
                res.x = evt.clientX;
                res.y = evt.clientY;
            }
            return res;
        }
        function onMouseUp(evt) {
            var trg = $(evt.target);
            if (!(trg.is('.ep-range-slide-handle') ||
                trg.is('.ep-range-ctr') ||
                trg.is('.ep-range-slider-value-axis'))) {
                $scope.axis.trigger('touchend');
                $(document.body).off('mouseup', onMouseUp);
            }
            $scope.axis.removeClass('ep-range-handle-drag').removeClass('ep-range-drag');
            isHandleClicked = false;
            evt.stopPropagation();
        }

        $scope.value = 0;
        $scope.touch = true;
        $scope.rangeMax = $scope.max;
        $scope.rangeMin = $scope.min;
        $scope.steps = [25, 50, 75];
        $scope.$watch('rangeMin', onRangeMinChange);
        $scope.$watch('rangeMax', onRangeMaxChange);

        $scope.toggleRangeInputMode = function() {
            axisWidth = axisWidth || $scope.axis.width();
            handleWidth = handleWidth || $scope.minHandle.outerWidth();
            $scope.touch = !$scope.touch;
        };
        function onRangeMaxChange() {
            if ($scope.touch) {
                return;
            }
            var max = parseInt($scope.rangeMax);
            if (max > $scope.max) {
                max = $scope.max;
                $scope.rangeMax = max;
            }

            maxHandleX = (((max - $scope.min) / ($scope.max - $scope.min)) * axisWidth) - handleWidth;
            positionHandle('right', maxHandleX);
            $scope.range.css({ left: minHandleX + handleWidth, width: maxHandleX - minHandleX - handleWidth });
        }

        function onRangeMinChange() {
            if ($scope.touch) {
                return;
            }
            var min = parseInt($scope.rangeMin);
            if (min < $scope.min) {
                min = $scope.min;
                $scope.rangeMin = min;
            }
            minHandleX = (((min - $scope.min) / ($scope.max - $scope.min)) * axisWidth);

            positionHandle('left', minHandleX);
            if (maxHandleX === 0) {
                maxHandleX = axisWidth - handleWidth;
            }
            $scope.range.css({ left: minHandleX + handleWidth, width: maxHandleX - minHandleX - handleWidth });
        }

        $scope.onSwipe = function(coords, evt) {
            if (isHandleClicked) {
                processHandleDrag(coords, evt);
            } else {
                processRangeDrag(coords, evt);
            }
            evt.stopPropagation();
        };

        $scope.onAxisClick = function(evt) {
            var target = $(evt.target);
            axisClickX = getEventCoordinates(evt).x;
            axisWidth = $scope.axis.width();
            $scope.axisWithAndX = axisWidth + ', ' + $scope.axis.position().left;
            if (target.is('.ep-range-slide-handle')) {
                handle = target;
                handleWidth = handle.outerWidth();
                $scope.axis.addClass('ep-range-handle-drag').removeClass('ep-range-drag');
                isHandleClicked = true;
            } else if (target.is('.ep-range-ctr') || target.is('.ep-range')) {
                $scope.axis.addClass('ep-range-drag').removeClass('ep-range-handle-drag');
            }
            $(document.body).mouseup(onMouseUp);
            evt.stopPropagation();
        };

        $scope.swipeStart = function() {
            $scope.axis.parent().addClass('active');
        };
        $scope.swipeEnd = function() {
            $scope.axis.parent().removeClass('active');
            lastX = axisClickX = null;
        };

        function getHandleValue(pos) {
            var percent = pos / axisWidth;
            $scope.newPoint = Math.ceil($scope.min + (percent * ($scope.max - $scope.min)));
            return $scope.newPoint;
        }

        function getSelection() {
            return { min: $scope.rangeMin, max: $scope.rangeMax };
        }
        function clearRange() {
            $scope.rangeMin = $scope.min;
            $scope.rangeMax = $scope.max;
        }

        $scope.out.getSelection = getSelection;
        $scope.out.clear = clearRange;

    }
    ]);
})();

/**
* @ngdoc directive
* @name ep.ui.range.slider.directive:epRangeSlider
* @restrict E
*
* @description
* Represents the ep.ui.range.slider directive
*
* @example
*/
(function() {
    'use strict';

    angular.module('ep.ui.range.slider').directive('epRangeSlider', [
    '$swipe',
    function($swipe) {
        return {
            restrict: 'E',
            controller: 'epRangeSliderCtrl',
            templateUrl: 'src/components/ep.ui.range.slider/ep-range-slider.html',
            scope: {
                min: '=',
                max: '=',
                out: '='
            },
            compile: function() {
                return function(scope, ele) {
                    scope.container = ele.parent();
                    scope.min = scope.min || 0;
                    scope.minHandle = scope.container.find('.js-handle-min');
                    scope.maxHandle = scope.container.find('.js-handle-max');
                    scope.range = scope.container.find('.ep-range-ctr');
                    //scope.rangeFrame = scope.container.find('.range-frame');
                    scope.axis = scope.container.find('.ep-range-slider-value-axis');
                    scope.axis.mousedown(scope.onAxisClick);
                    scope.axis.bind('touchstart', scope.onAxisClick);
                    $swipe.bind(scope.axis, {
                        move: scope.onSwipe,
                        start: scope.swipeStart,
                        end: scope.swipeEnd
                    });
                };
            }
        };
    }]);
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
         * @param {bool} override - if false, then existing properties in source are not overriden
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
                        copyProperties(source[propName], destination[propName]);
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
            }
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

//# sourceMappingURL=app.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/ep.accordion.menu/ep-accordion-menu-item_template.html',
    "<div class=\"clearfix list-group-item\" ng-class=\"{ 'ep-accordion-expanded': item.isExpanded && item.menuitems.length, 'ep-accordion-expanded-odd' : item._depth%2 == 1, 'ep-accordion-expanded-even': item._depth%2 == 0}\"><div class=\"clearfix container-fluid\" id=mnu_{{item.id}} ng-keydown=\"($event.which === 13 && item.menuitems.length === 0)? navigate(item, false, $event) : onKeydown(item, $event)\" role=group tabindex=-1 ng-click=\"item.isExpanded = !item.isExpanded\"><div id=menuItem class=\"list-group-item row\" ng-class=\"{ 'ep-accordion-expanded': item.isExpanded && item.menuitems.length, 'ep-accordion-expanded-odd' : item._depth%2 == 1, 'ep-accordion-expanded-even': item._depth%2 == 0}\" ng-if=\"!(item.menuitems && item.menuitems.length)\" ng-click=\"navigate(item, false, $event)\" tabindex=-1><!-- Menu item caption/text --><span class=\"clearfix ep-vertical-align-center\"><span class=\"pull-left col-xs-10 {{item.captionClass}}\" title={{item.caption}} ng-bind=item.caption></span><!--Open in new window--> <i class=\"fa fa-lg fa-external-link pull-left\" ng-click=\"navigateExternal(item, $event)\"></i><!-- Favorite icon --><!-- Favorite icon --> <i ng-if=\"(item.hideFavorite !== true)\" class=\"fa fa-lg col-xs-2 pull-left\" ng-click=\"toggleFavorite(item, $event)\" ng-class=\"{ 'fa-star-o': !item.favorite, 'fa-star text-warning': item.favorite }\"></i></span></div><div class=\"ep-submenu-header list-group-item row\" ng-class=\"{ 'ep-accordion-expanded': item.isExpanded && item.menuitems.length, 'ep-accordion-expanded-odd' : item._depth%2 == 1, 'ep-accordion-expanded-even': item._depth%2 == 0}\" ng-if=item.menuitems.length tabindex=-1><!-- Menu item caption/text --><span class=\"clearfix ep-vertical-align-center\"><span class=\"pull-left col-xs-10 {{item.captionClass}}\" title={{item.caption}} ng-bind=item.caption></span><!-- Expand icon --> <i class=\"fa fa-lg col-xs-2\" ng-class=\"{ 'fa-caret-right': !item.isExpanded, 'fa-caret-down': item.isExpanded }\"></i></span></div></div><div class=col-xs-12 ng-click=\"navigate(item, false, $event)\" ng-if=\"item.description && (!item.menuitems.length || !item.isExpanded) && !hideDescription\"><div class=ep-accordion-menu-desc><sup class=text-info ng-bind=item.description></sup></div></div><!-- Sub-menu --><div class=list-group-submenu ng-class=\"{'collapsed': !item.isExpanded }\" id=mnu_children ng-if=\"item.isExpanded && item.menuitems.length\"><ep-accordion-menu-item ng-repeat=\"child in item.menuitems | orderBy:orderByMenu\" item=child hide-description=hideDescription commit-menu-state=commitMenuState navigate=navigate navigate-external=navigateExternal toggle-favorite=toggleFavorite></ep-accordion-menu-item></div></div>"
  );


  $templateCache.put('src/components/ep.accordion.menu/ep-accordion-menu_template.html',
    "<div id=MainMenu class=ep-accordion-menu><form class=ep-mlm-search ng-hide=searchDisabled><input type=search class=\"form-control ep-mlm-search-input\" placeholder=Search ng-model=state.searchTerm ng-change=search() ng-keydown=onKeydown($event) ng-focus=\"isRightToLeft = false\" tabindex=-1></form><div ng-show=state.searchTerm><div class=\"bg-primary ep-menu-header\"><span ng-bind=searchResultsHeader></span></div><div class=\"list-group panel\"><ep-accordion-menu-item ng-repeat=\"item in currentItems | orderBy:orderByMenu\" id={{item.id}} hide-description=false item=item navigate=navigate navigate-external=navigateExternal toggle-favorite=toggleFavorite></ep-accordion-menu-item></div></div><div ng-show=!state.searchTerm><div class=\"bg-primary ep-menu-header\" ng-if=\"data.favorites && data.favorites.length\"><span ng-bind=favoritesHeader></span></div><div class=\"list-group panel\"><ep-accordion-menu-item ng-repeat=\"item in data.favorites | orderBy:orderByMenu\" id={{item.id}} hide-description=false item=item navigate=navigate navigate-external=navigateExternal toggle-favorite=toggleFavorite tabindex=-1></ep-accordion-menu-item></div><div class=\"bg-primary ep-menu-header\"><span ng-bind=mainHeader></span></div><div class=\"list-group panel\"><ep-accordion-menu-item ng-repeat=\"item in menu.menuitems | orderBy:orderByMenu\" id={{item.id}} hide-description=true commit-menu-state=commitMenuState item=item navigate=navigate navigate-external=navigateExternal toggle-favorite=toggleFavorite on-expand=onExpand tabindex=-1></ep-accordion-menu-item></div></div></div>"
  );


  $templateCache.put('src/components/ep.action.set/action-menu/action-menu.html',
    "<div id=ep-actions-menu-ctr ng-show=actionMenuCtrl.actions><ul class=\"dropdown-menu ep-actions-menu list-unstyled noselect\" role=menu><li ng-repeat=\"action in actionMenuCtrl.actions\" ng-if=\"!action.switch || action.switch(action.switchParams) == action.switchResult\" ng-switch=action.type ng-class=\"{'hidden': action.switch != null && action.switch == false}\"><a ng-switch-when=action class=ep-actions-menu-item ng-click=\"actionMenuCtrl.invokeAction($event, action)\"><span class=\"icon {{action.icon}}\"></span><span>{{::action.title}}</span></a><div ng-switch-when=separator class=ep-actions-menu-item-separator></div></li><li class=ep-actions-menu-item-mobile><a class=\"ep-actions-menu-item edd-red separate\" ng-click=actionMenuCtrl.close()><span class=\"icon icon-clear\"></span><span>Close</span></a></li></ul></div>"
  );


  $templateCache.put('src/components/ep.card/ep-card-block-template.html',
    "<div class=card-block ng-transclude></div>"
  );


  $templateCache.put('src/components/ep.card/ep-card-template.html',
    "<div><section class=ep-card><div class=\"card card-inverse card-primary text-center\" ng-transclude></div></section></div>"
  );


  $templateCache.put('src/components/ep.card/ep-card-title-template.html',
    "<div class=card-title ng-transclude></div>"
  );


  $templateCache.put('src/components/ep.card/ep-card.html',
    "<!--This is a partial for the ep-card directive --><div class=ep-card></div>"
  );


  $templateCache.put('src/components/ep.chart/ep-chart-c3-legends.html',
    "<div class=\"ep-chart-c3-legends form-group\"><span><label class=checkbox-inline><input type=checkbox ng-model=state.selectAllLegend ng-change=fnLegendSelectAllChanged()>All</label></span><div ng-repeat=\"item in menuLegends\"><button type=button class=\"btn btn-sm btn-block\" ng-class=\"{'ep-legend-off': item.checked !== true}\" ng-style=item.style ng-model=item.checked uib-btn-checkbox ng-click=fnOnLegendChanged(item)>{{item.caption}}</button></div></div>"
  );


  $templateCache.put('src/components/ep.chart/ep-chart-c3.html',
    "<div class=ep-chart-c3 ep-chart-id=state.chartId><div class=\"ep-chart-options form-group\" ng-if=\"settings.showOptions !== false\"><div class=checkbox><div ng-if=state.optLegendListDisplay class=\"ep-c3-legend-btn btn-group\" dropdown><button id=split-button type=button class=\"btn btn-default btn-sm\" uib-popover-template=\"'src/components/ep.chart/ep-chart-c3-legends.html'\" popover-placement=bottom-left popover-title=Legend popover-trigger=\"\" ng-click=fnOnLegendList()>Legend</button></div><span ng-if=state.optStackedDisplay><label class=radio-inline><input name=optradio type=radio value=grouped ng-model=state.optStacked ng-change=fnOptStackedChanged()>Grouped</label><label class=radio-inline><input name=optradio type=radio value=stacked ng-model=state.optStacked ng-change=fnOptStackedChanged()>Stacked</label></span> <span ng-if=state.optDataFmtDisplay><label class=radio-inline><input name=optradio type=radio value=percent ng-model=state.optDataFmt ng-change=fnOptDataFmtChanged()>Percent</label><label class=radio-inline><input name=optradio type=radio value=value ng-model=state.optDataFmt ng-change=fnOptDataFmtChanged()>Value</label></span> <span ng-if=state.optZoomDisplay style=\"margin-left: 10px\"><label class=checkbox-inline><input type=checkbox ng-model=state.optZoom ng-change=fnOptZoomChanged()>Zoom</label></span> <span ng-if=\"state.optZoomDisplay && state.optZoom && state.optZoomTip\" ng-click=\"state.optZoomTip = false\" class=\"well ep-fadein-animation\" style=\"margin-left: 10px\">to zoom-in select an area on the lower chart; to zoom-out double click on the lower chart.</span> <span ng-if=state.optLegendDisplay style=\"margin-left: 5px\" class=ep-opt-legend><label class=checkbox-inline><a ng-click=fnOptLegendChanged()>{{state.optLegend ? 'Hide legend' : 'Show legend' }}</a></label></span> <span ng-if=\"!state.optLegendDisplay && state.criteriaHideLegend && state.legendSupported && settings.legendHiddenText !== ''\" class=ep-opt-legend-hidden><label class=checkbox-inline>{{settings.legendHiddenText || '[legend hidden]'}}</label></span></div></div><div class=ep-chart-div><div id=chartc3></div></div></div>"
  );


  $templateCache.put('src/components/ep.color.selector/color_selector.html',
    "<div class=\"ep-color-selector-container vertical-align\" ng-style=\"{ 'width': width }\"><div class=input-group><input class=form-control value=\"{{ngModel}}\"><div class=input-group-btn><button type=button class=\"btn btn-default dropdown-toggle\" colorpicker colorpicker-parent=true ng-attr-colorpicker-close-on-select=\"{{closeOnSelect == 'true' ? '' : undefined}}\" colorpicker-position=\"{{position ? position : 'bottom'}}\" colorpicker-size=\"{{size ? size : 100}}\" ng-model=ngModel ng-style=\"applyColorToBtn == 'true' && {'background-color': ngModel}\"><span class=\"fa {{icon ? icon : 'fa-eyedropper'}}\"></span></button></div></div></div>"
  );


  $templateCache.put('src/components/ep.color.tile/ep-color-tile.html',
    "<!-- Color Tile Component --><div class=\"ep-color-tile ep-align-container {{colorclass}}\" ng-style=\"{'background-color': color}\"><h3>{{title}}</h3><h5>{{description}}</h5><small>{{fineprint}}</small><div class=\"ep-color-tile-icon ep-align-content ep-align-vcenter\"><i class=\"fa {{icon}}\"></i></div></div>"
  );


  $templateCache.put('src/components/ep.contacts.list/contacts_list.html',
    "<div class=ep-contacts-list-container><div class=\"ep-list-search-container vertical-align\"><input ng-model=contactListSearch placeholder=Search class=form-control id=ep-contacts-list-search><label for=ep-contacts-list-search class=\"glyphicon glyphicon-search\" rel=tooltip title=search></label></div><div class=ep-contacts-list><div class=ep-contacts-list-inner><div ng-repeat=\"(key, value) in nameList\"><div class=ep-group-heading ng-if=\"filterVal.length > 0\" id=\"list-group-{{key == '#' ? 1 : (key | uppercase)}}\">{{key | uppercase}}</div><ul><li ng-repeat=\"obj in filterVal = (value | filter: contactListSearch)\" ng-click=handler(obj)><div>{{ obj[mainTitle] }} <span class=ep-contact-list-id>{{obj[id]}}</span></div><div class=ep-contact-list-arrow><i class=\"fa fa-angle-right fa-2x\"></i></div><div>{{obj[subTitle]}}</div></li></ul></div></div></div><ul class=\"ep-index-list large-index-list\" ng-hide=contactListSearch><li ng-repeat=\"key in indexKeys\" ng-click=goToLink(key)>{{key}}</li></ul><ul class=\"ep-index-list small-index-list\" ng-hide=contactListSearch><li ng-repeat=\"key in smallIndexKeys track by $index\" ng-click=goToLink(key)><span ng-if=\"key == '.'\" class=\"fa fa-circle\"></span> <span ng-if=\"key !='.'\">{{key}}</span></li></ul></div>"
  );


  $templateCache.put('src/components/ep.datagrid/datagrid-dialog.html',
    "<div class=\"form-group ep-datagrid-dialog\" ng-class=config.gridClass><ep-data-grid ep-data-grid-on-init=config.onDataGrid(factory)></ep-data-grid></div>"
  );


  $templateCache.put('src/components/ep.datagrid/datagrid-filter/datagrid-filter-row.html',
    "<tr id=rowFilter class=ep-datagrid-filter-row ng-show=\"state.filterShowFlag === true\"><th ng-repeat=\"ctx in state.filterEditors\" class=ep-datagrid-filter-header ng-class=ctx.className><div ng-if=\"ctx.hidden !== true\"><div class=\"ep-datagrid-filter-group input-group\"><span class=\"ep-datagrid-filter-op input-group-addon fa-stack fa-lg\" ng-click=fnFilterOpChange(ctx)><i class=\"ep-datagrid-filter-op-icon fa fa-circle-thin fa-stack-2x\"></i> <i class=\"ep-datagrid-filter-text fa-stack-1x fa\" ng-class=\"{'fa-asterisk': ctx.operator === '*', '': ctx.operator !== '*' }\" operator={{ctx.operator}} col={{ctx.columnIndex}} id=filterOp_{{ctx.columnIndex}}>{{ctx.operatorText}}</i></span> <input class=\"col-md-8 form-control editor\" style=\"color: black\" ng-model=ctx.value type={{ctx.type}} col={{ctx.columnIndex}} colname={{ctx.columnName}} operator={{ctx.operator}} id=filterInput_{{ctx.columnIndex}} ng-blur=fnFilterBlur(ctx) ng-keyup=\"fnFilterKeyUp(ctx, $event)\" name=\"filterInput_{{ctx.columnIndex}}\"></div></div></th></tr>"
  );


  $templateCache.put('src/components/ep.datagrid/datagrid-summary/datagrid-summary-row.html',
    "<th ng-repeat=\"ctx in state.summaryRow.columns\" class=ep-dg-summary-col ng-class=ctx.className><div ng-if=ctx.value>{{ctx.value}}</div><div ng-if=ctx.valueList ng-repeat=\"v in ctx.valueList\">{{v.value}}</div></th>"
  );


  $templateCache.put('src/components/ep.datagrid/datagrid.html',
    "<div class=ep-data-grid id={{state.dataGridId}} ng-class=\"{'ep-data-grid-child' : state.isChildGrid}\"><div class=\"ep-dg-grid-search clearfix\" ng-show=state.allowSearchInput ng-class=\"(options.showConfigButton === true) ? 'input-group' : ''\"><span ng-show=\"options.showConfigButton === true\" class=\"ep-dg-config input-group-addon\"><ep-dropdown-btn menu=configmenu icon=\"\"></ep-dropdown-btn></span> <input class=\"ep-dg-search-input form-control input-sm pull-left\" name=search type=search placeholder=Search ng-class=searchInputClass ng-model=state.searchValue ng-init=fnOnSearchBlur() ng-blur=fnOnSearchBlur($event) ng-focus=fnOnSearchFocus($event) ng-keyup=fnOnSearchKeyUp($event) ng-change=\"fnOnSearchChange($event)\"> <span class=\"ep-dg-search-icon-overlay pull-right\" ng-class=\"{'invisible': state.searchValue + '' === ''}\" ng-click=clearSearch()><i class=\"fa fa-lg fa-times\"></i></span></div><div ng-if=options.showHeaderSection class=\"panel-footer ep-datagrid-header-section\" ng-controller=headerSectionController><div ng-if=state.headerSectionTemplate ng-bind-html=state.headerSectionTemplate></div><div ng-if=state.headerSectionTemplateUrl ng-include=state.headerSectionTemplateUrl></div></div><div id=tblArea_{{state.dataGridId}} class=ep-dg-grid-table-area><table id=tbl_{{state.dataGridId}} cellpadding=0 cellspacing=0 border=0 class=\"ep-dg-grid-table table table-bordered table-hover\" fixed-header></table><div class=ep-dg-progressIndicator ng-show=showProgress><span class=\"fa fa-spinner fa-pulse fa-5x\"></span></div></div><div ng-if=options.showFooterSection class=\"panel-footer ep-datagrid-footer-section\" ng-controller=footerSectionController><div ng-if=state.footerSectionTemplate ng-bind-html=state.footerSectionTemplate></div><div ng-if=state.footerSectionTemplateUrl ng-include=state.footerSectionTemplateUrl></div></div></div>"
  );


  $templateCache.put('src/components/ep.datagrid/ep.datagrid.json/ep-datagrid-json.html',
    "<div class=\"form-group ep-datagrid-simple\" ng-class=gridClass><ep-data-grid ep-data-grid-on-init=onDataGrid(factory)></ep-data-grid></div>"
  );


  $templateCache.put('src/components/ep.dropdown/ep-dropdown-btn/ep-dropdown-btn.html',
    "<!--This is a partial for the ep-dropdown directive --><div class=ep-dropdown-btn><div class=row><div class=col-lg-12><div class=button-group><button type=button class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=dropdown><span ng-class=\"icon ? icon : 'glyphicon glyphicon-cog'\"></span> <span class=caret></span></button><ul class=dropdown-menu><li ng-repeat=\"item in menu\" ng-hide=\"item.visible === false\"><a href=# ng-click=\"menuClick(item, $event)\" class=small tabindex=-1><input type=checkbox class=ep-dropdown-btn-chk ng-model=\"item.checked\">&nbsp;{{item.caption}}</a></li></ul></div></div></div></div>"
  );


  $templateCache.put('src/components/ep.embedded.apps/embedded-apps.html',
    "<div id=appHost><div id=splash ng-if=appConfig.splash ng-show=showSplash ep-animation options=appConfig.splash.transition><div id=splashContainer ng-include=\"getEmbeddedAppPath(appConfig.id, appConfig.splash.templateUrl)\"></div></div><div id=appContent ng-show=showApp ep-animation options=currentView.transition><ep-embedded-apps-loader config=appConfig on-complete=onLoaderComplete()></ep-embedded-apps-loader></div></div>"
  );


  $templateCache.put('src/components/ep.filter.list/filter_list.html',
    "<div class=\"ep-search-list-container vertical-align\"><input ng-model=searchBy placeholder=Search class=form-control id=ep-search-list><label for=ep-search-list class=\"glyphicon glyphicon-search\" rel=tooltip title=search></label></div>"
  );


  $templateCache.put('src/components/ep.icon.selector/icon_selector.html',
    "<div class=ep-icon-selector-container ng-style=\"{ 'width': width }\"><div class=input-group><input class=form-control ng-model=ngModel><div class=input-group-btn><button type=button class=\"btn btn-default dropdown-toggle\" data-toggle=dropdown aria-expanded=false><span class=\"fa {{ngModel}}\"></span></button><div class=\"dropdown-menu dropdown-menu-right\" role=menu ng-style=\"{ 'width': iconListWidth }\"><div class=\"icon-filter-field vertical-align text-center\"><input class=form-control placeholder=\"Type to filter\" ng-model=filteredIcon></div><ul class=icon-list ng-style=\"{ 'max-height': iconListHeight }\"><li ng-repeat=\"icon in icons | orderBy | filter: filteredIcon\" ng-click=selectIcon(icon)><span class=\"fa fa-{{icon}}\"></span>fa-{{icon}}</li></ul></div></div></div></div>"
  );


  $templateCache.put('src/components/ep.list/ep-list.html',
    "<!--This is a partial for the ep-list directive --><div class=ep-list><ul id={{config.id}}><li ng-repeat=\"item in config.items\"></li></ul></div>"
  );


  $templateCache.put('src/components/ep.menu.builder/context.menu/ep-context-menu.html',
    "<span class=\"ep-relative ep-context-menu-owner\"><span class=\"ep-actionset ep-interactivity-context-menu\"><span class=ep-context-menu ng-click=contextMenuCtrl.onDynamicMenuCall($event)></span></span></span>"
  );


  $templateCache.put('src/components/ep.menu.builder/dynamic.menu/ep-dynamic-menu.html',
    "<div id=ep-dynamic-menu ng-show=dynamicMenuCtrl.menuItems><ul class=\"dropdown-menu ep-actions-menu list-unstyled noselect\" role=menu><li ng-repeat=\"menuItem in dynamicMenuCtrl.menuItems\" ng-switch=menuItem.type><a ng-switch-when=action class=ep-actions-menu-item ng-click=\"dynamicMenuCtrl.invokeAction($event, menuItem, dynamicMenuCtrl.context)\"><span class=\"icon {{menuItem.icon}}\"></span><span>{{::menuItem.caption}}</span></a><div ng-switch-when=separator class=ep-actions-menu-item-separator></div></li><li class=ep-actions-menu-item-mobile><a class=\"ep-actions-menu-item edd-red separate\" ng-click=dynamicMenuCtrl.closeMenu()><span class=\"icon icon-clear\"></span><span>Close</span></a></li></ul></div>"
  );


  $templateCache.put('src/components/ep.modaldialog/modals/modaldialog-custom.html',
    "<div class=\"ep-modaldialog ep-modaldialog-custom\"><div class=\"modal-header ep-padding-none\"><span class=close ng-show=config.closeButton><a class=\"fa fa-times fa-lg ep-navbar-button\" data-dismiss=modal aria-label=Close ng-click=\"btnclick({isCancel: true})\"></a></span> <span class=help ng-show=config.helpTemplateOptions><a class=\"fa fa-question-circle fa-lg ep-navbar-button\" ng-click=helpButtonClick()></a></span><h4 id=dialogTitle class=\"bg-primary modal-title ep-margin-none clearfix\"><span class=\"ep-dlg-title-icon {{config.icon}}\"></span> <span class=ep-dlg-title ng-bind=config.fnGetTitle()></span></h4></div><div class=modal-body><form id=dialogForm name=dialogForm><uib-alert ng-show=showHelp type=info close=closeHelp()><ep-include options=config.helpTemplateOptions></ep-include></uib-alert><!--<div ng-include=\"config.templateUrl\"></div>--><ep-include options=config.templateOptions></ep-include><div class=\"ep-dlg-rememberMe col-md-10\" ng-show=config.rememberMe><div class=form-group><div class=\"row col-md-1\"><input tabindex=1 id=cbxRemember class=form-control type=checkbox ng-model=config.rememberMeValue></div><label class=\"col-md-10 control-label\">Do not show this message again</label></div></div></form></div><div class=modal-footer ng-show=\"config.buttons && config.buttons.length\"><div class=ep-dlg-buttons><button ng-repeat=\"btn in config.buttons\" id={{btn.id}} tabindex=\"$index + 100\" data-dismiss=modal ng-hide=btn.hidden ng-disabled=\"btn.isPrimary && !dialogForm.$valid\" class=\"btn btn-{{btn.type}} {{config.btnBlock == true ? 'btn-block':''}}\" ng-click=btnclick(btn)><i ng-if=btn.icon ng-class=btn.icon></i> &nbsp;{{btn.text}}</button></div></div><div class=ep-dlg-status ng-show=config.statusBar><h4 class=\"bg-primary modal-title\"><span ng-if=!config.statusBarTextHTML ng-bind=config.statusBarText></span> <span ng-if=config.statusBarTextHTML ng-bind-html=config.statusBarTextHTML></span></h4></div></div>"
  );


  $templateCache.put('src/components/ep.modaldialog/modals/modaldialog-error.html',
    "<!--Custom Dialog Error Template--><div class=ep-modaldialog-error ng-controller=epModalDialogErrorCtrl><section ng-if=config.callFnHideModalError ng-hide=config.fnHideModalError()></section><div class=\"alert clearfix ep-dialog-alert\" ng-class=config.statusClass><table class=ep-dlg-bodytable><tr><td><span ng-if=config.showSpinner class=\"ep-dlg-icon fa-stack fa-2x\"><i class=\"ep-dlg-spinner-icon fa fa-spin fa-stack-2x\" ng-class=config.spinnerIconClass></i> <i ng-if=config.showTimer class=\"ep-dlg-spinner-text fa fa-stack-1x {{config.spinnerTextClass}}\" ng-class=config.spinnerTextClass>{{config.countDown}}</i></span> <span ng-if=!config.showSpinner class=ep-dlg-icon><i class=\"fa fa-3x\" ng-class=config.statusIcon></i></span></td><td><span class=ep-dlg-message ng-class=config.messageClass ng-bind=config.fnGetMessage()></span></td></tr></table></div><div class=ep-message-details ng-show=config.messageDetails><a href=\"\" ng-click=\"config.showDetails = !config.showDetails;\">{{config.showDetails ? 'Hide details': 'Show details'}}</a><div ng-show=config.showDetails><textarea ng-model=config.messageDetails ng-readonly=true disabled></textarea></div></div></div>"
  );


  $templateCache.put('src/components/ep.modaldialog/modals/modaldialog-pane.html',
    "<div class=\"ep-modaldialog ep-modaldialog-pane ep-ease-animation ep-hide-fade\" ng-hide=!dialogState.isVisible><div class=ep-dlg-container ng-class=config.containerClass><div class=\"ep-dlg-center clearfix\"><span class=\"ep-dlg-icon pull-left\" ng-class=config.iconClass style=\"margin-right: 10px; margin-top: 5px\"><span ng-if=config.showSpinner class=\"ep-dlg-icon fa-stack fa-2x\"><i class=\"ep-dlg-spinner-icon fa fa-spin fa-stack-2x\" ng-class=config.spinnerIconClass></i> <i ng-if=config.showTimer class=\"ep-dlg-spinner-text fa fa-stack-1x\" ng-class=config.spinnerTextClass>{{config.countDown}}</i></span> <i ng-if=!config.showSpinner ng-class=config.icon></i></span><div class=pull-left><span class=ep-dlg-title ng-class=config.titleClass ng-bind=config.fnGetTitle()></span><p class=ep-dlg-message ng-class=config.messageClass ng-bind=config.fnGetMessage()></p><div class=\"ep-dlg-rememberMe form-group\" ng-show=config.rememberMe><div class=checkbox><input tabindex=1 id=cbxRemember type=checkbox ng-model=config.rememberMeValue><label>Do not show this message again</label></div></div><!--<div class=\"ep-dlg-progress-indicator\" ng-show=\"config.showProgress\"><span class=\"fa fa-pulse fa-spinner fa-5x\" ng-class=\"config.progressClass\"></span></div>--><!--<div class=\"ep-dlg-progress-indicator\" ng-show=\"config.showProgress && config.showTimer\"><span ng-class=\"config.timerClass\">{{config.countDown}}</span></div>--><div class=ep-dlg-buttons><button ng-repeat=\"btn in config.buttons\" id=btn.id tabindex=\"$index + 100\" data-dismiss=modal ng-hide=btn.hidden class=\"btn btn-{{btn.type}} btn-sm\" ng-click=btnclick(btn)><i ng-if=btn.icon ng-class=btn.icon></i> &nbsp;{{btn.text}}</button></div></div></div></div></div>"
  );


  $templateCache.put('src/components/ep.multi.level.menu/ep-shell-menu/ep-shell-menu.html',
    "<div ng-controller=epShellMenuCtrl><ep-multi-level-menu ng-if=\"menuOptions.menuType !== 'accordion'\" menu=menuOptions.menu menu-id=menuId search-disabled=menuOptions.searchDisabled sort-disabled=menuOptions.sortDisabled icon-disabled=menuOptions.iconDisabled init-favorites=menuOptions.initFavorites on-top-menu-click=onTopMenuClick on-menu-init=menuOptions.onMenuInit(factory)></ep-multi-level-menu><ep-accordion-menu ng-if=\"menuOptions.menuType === 'accordion'\" menu=menuOptions.menu menu-id=menuId main-header=\"menuOptions.title || 'Menu'\" favorites-header=\"menuOptions.favoritesHeader || 'Favorites'\" search-results-header=\"menuOptions.searchResultsHeader || 'Search Results'\" search-disabled=menuOptions.searchDisabled sort-disabled=menuOptions.sortDisabled icon-disabled=menuOptions.iconDisabled init-favorites=menuOptions.initFavorites on-top-menu-click=onTopMenuClick on-expand=menuOptions.onExpand commit-menu-state=commitMenuState on-menu-init=menuOptions.onMenuInit(factory)></ep-accordion-menu></div>"
  );


  $templateCache.put('src/components/ep.multi.level.menu/multi-level-menu.html',
    "<div class=ep-mlm-container ng-class=\"{'ep-left-to-right': !isRightToLeft, 'ep-right-to-left': isRightToLeft}\"><form class=ep-mlm-search ng-hide=searchDisabled><input class=\"form-control ep-mlm-search-input\" placeholder=Search ng-model=state.searchTerm ng-change=search() ng-focus=\"isRightToLeft = false\"></form><div ng-if=data.next class=\"ep-mlm-content ep-fadein-animation\"><div ng-hide=state.searchTerm class=ep-mlm-header ng-class=\"{ 'pointer': data.next._parent._id !== 'topmenu'}\" ng-click=\"navigate(data.next._parent, true, $event)\"><span ng-if=\"data.next._parent._id !== 'topmenu'\" class=\"ep-mlm-back-button pull-left fa fa-lg fa-caret-left\"></span> <span>{{data.next.caption}}</span></div><div ng-show=state.searchTerm class=ep-mlm-header><span>Search Results</span></div><ul><li ng-repeat=\"mi in currentItems | orderBy:orderByMenu\" class=\"ep-mlm-item clearfix ep-repeat-animation\"><div ng-if=\"mi.separator && !mi.separator.isBottom\" class=\"ep-mlm-separator ep-mlm-separator-top {{mi.separator.class}}\"><i ng-if=mi.separator.icon class=\"ep-mlm-separator-icon fa fa-lg pull-left {{mi.separator.icon}}\"></i><div ng-if=mi.separator.text class=ep-mlm-separator-text>{{mi.separator.text}}</div></div><i ng-if=\"mi.icon && !iconDisabled\" class=\"ep-mlm-icon fa fa-lg pull-left {{mi.icon}}\"></i><div class=\"pull-left clearfix ep-mlm-item-div\" ng-class=\"{ 'ep-mlm-item-div-icon': mi.icon }\" ng-click=\"navigate(mi, false, $event)\"><div class=\"ep-mlm-item-text pull-left {{mi.captionClass}}\" title={{mi.caption}}>{{mi.caption}}</div></div><i ng-if=\"(mi._type === 'item' && mi.hideFavorite !== true)\" class=\"ep-mlm-favorite fa fa-lg pull-right\" ng-click=\"toggleFavorite(mi, $event)\" ng-class=\"{ 'fa-star-o': !mi.favorite, 'fa-star text-warning': mi.favorite}\"></i> <i ng-if=\"mi._type === 'menu'\" class=\"ep-mlm-submenu fa fa-lg fa-caret-right pull-right\" ng-click=\"navigate(mi, false, $event)\"></i><div ng-if=\"mi.separator && mi.separator.isBottom\"><br><div class=\"ep-mlm-separator ep-mlm-separator-top {{mi.separator.class}}\"><i ng-if=mi.separator.icon class=\"ep-mlm-separator-icon fa fa-lg pull-left {{mi.separator.icon}}\"></i><div ng-if=mi.separator.text class=ep-mlm-separator-text>{{mi.separator.text}}</div></div></div></li></ul><uib-alert class=\"ep-mlm-alert ep-fadein-animation\" ng-show=\"state.searchTerm && (!currentItems || currentItems.length === 0)\" type=warning>The term \"{{state.searchTerm}}\" did not match any menu items.</uib-alert></div></div>"
  );


  $templateCache.put('src/components/ep.photo.browser/ep-photo-browser.html',
    "<!--This is a partial for the ep-photo-browser directive --><div class=content ng-controller=epPhotoBrowserCtrl><ng-gallery images=images show-preview=showPreview></ng-gallery></div>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-checkbox-editor.html',
    "<section class=\"ep-editor-checkbox ep-center-item editor\" tabindex=0 ng-keyup=handleKey($event) ng-click=ctx.toggleValue(ctx,$event) ng-hide=ctx.fnDoValidations()><span ng-class=\"{'fa-square-o': !value, 'fa-check-square-o': value}\" class=\"fa fa-{{ctx.checkBoxSize}}\"></span></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-date-editor.html',
    "<section><input id=dd_{{ctx.name}} ng-model=value ep-date-convert=toDate ng-hide=\"true\"><div class=\"input-group date datepicker\" id=dp_{{ctx.name}} ng-if=!ctx.useDateInput><span class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'pre' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span> <input size=16 ep-date-convert=toString id={{ctx.name}} name={{ctx.name}} ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly class=\"form-control editor\" ng-hide=ctx.fnDoValidations() ng-model=ctx.dateValue ng-change=ctx.fnOnChange($event) ng-blur=ctx.fnBlur($event) pattern={{ctx.pattern}} ng-keydown=ctx.fnDateKeyDown($event) uib-datepicker-popup={{ctx.format}} data-container=body datepicker-options111={{ctx.dateOptions}} placeholder={{ctx.format}} ng-pattern={{ctx.pattern}} is-open=\"ctx.dateOpened\"> <span class=input-group-addon ng-click=ctx.fnDateOpen($event) ng-style=\"{ 'cursor': ctx.disabled ? 'not-allowed' : 'pointer' }\"><a ng-if=!ctx.disabled><i class=\"fa fa-calendar\"></i></a> <i ng-if=ctx.disabled class=\"fa fa-calendar\"></i></span> <span class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'post'}\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span></div><div class=\"input-group date\" id=dp_{{ctx.name}} ng-if=\"ctx.useDateInput === true\"><span class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'pre' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span> <input size=16 type=date ep-date-convert=toString id={{ctx.name}} name={{ctx.name}} ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly class=\"form-control editor\" ng-hide=ctx.fnDoValidations(this) ng-model=ctx.dateValue ng-change=ctx.fnOnChange($event) ng-blur=\"ctx.fnBlur($event)\"> <span class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'post'}\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span></div></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-editor-control.html',
    "<div class=\"ep-editor-control {{ctx.sizeClass}}\" ng-hide=ctx.hidden ep-drop-area drop-enabled=\"isDropEnabled === true\" drop-handler=handleDrop drop-item-types=typeEditorCtrl ng-style=ctx.style><fieldset class=\"form-group ep-record-editor-container\" ng-class=\"{'has-error': ctx.invalidFlag}\" ep-draggable drag-enabled=\"isDragEnabled === true\" drag-item=ctx drag-item-type=\"'typeEditorCtrl'\"><label class=ep-editor-label for={{ctx.name}}>{{ctx.label}}<span ng-if=ctx.requiredFlag class=\"required-indicator text-danger fa fa-asterisk\"></span></label><section id=xtemplate></section></fieldset></div>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-image-editor.html',
    "<section><img alt={{ctx.label}} id={{ctx.name}} ng-src={{value}} width={{ctx.imageWidth}} height=\"{{ctx.imageHeight}}\"></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-multiline-editor.html',
    "<section><div ng-class=\"{'input-group': ctx.buttons && ctx.buttons.length > 0 }\"><span class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'pre' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span><textarea id={{ctx.name}} name={{ctx.name}} ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly ng-model=value ng-change=ctx.fnOnChange($event) ng-blur=ctx.fnBlur($event) class=\"form-control editor\" ng-hide=ctx.fnDoValidations() maxlength={{ctx.maxlength}} ng-style=\"{'text-align': ctx.justification }\"></textarea><span class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'post' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span></div></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-number-editor.html',
    "<section><div ng-class=\"{'input-group': ctx.buttons && ctx.buttons.length > 0 }\"><span class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'pre' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span> <input id={{ctx.name}} ng-cloak name={{ctx.name}} type=number ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly ng-model=value ng-change=ctx.fnOnChange($event) ng-blur=ctx.fnBlur($event) class=\"form-control editor\" ng-style=\"{ 'text-align': ctx.justification }\" maxlength={{ctx.maxlength}} min={{ctx.min}} max={{ctx.max}} ng-hide=ctx.fnDoValidations() pattern=\"{{ctx.pattern}}\"> <span class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'post' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span></div></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-select-editor.html',
    "<section><div ng-class=\"{'input-group': ctx.buttons && ctx.buttons.length > 0 }\"><span class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'pre' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span><select class=\"form-control editor\" id={{ctx.name}} name={{ctx.name}} ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly ng-change=ctx.fnOnChange($event) ng-blur=ctx.fnBlur($event) ng-hide=ctx.fnDoValidations() ng-model=value><option ng-repeat=\"opt in ctx.options\" label={{opt.label}} value={{opt.value}} ng-selected=opt.getIsSelected()>{{opt.label}}</option></select><span class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'post'}\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span></div></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-text-editor.html',
    "<section><div ng-class=\"{'input-group': ctx.buttons && ctx.buttons.length > 0 }\"><span class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'pre' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span> <input id={{ctx.name}} ng-cloak name={{ctx.name}} type={{ctx.type}} placeholder={{ctx.placeholder}} ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly ng-model=value ng-change=ctx.fnOnChange($event) ng-blur=ctx.fnBlur($event) class=\"form-control editor\" ng-hide=ctx.fnDoValidations() maxlength={{ctx.maxlength}} ng-style=\"{ 'text-align': ctx.justification }\"> <span class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'post'}\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span></div></section>"
  );


  $templateCache.put('src/components/ep.record.editor/ep-record-editor.html',
    "<div class=\"row ep-record-editor\"><ep-editor-control ng-repeat=\"(key, ctrl) in state.controls | epOrderObjectBy:'seq'\" class=ep-record-editor-column column=ctrl.col value=state.activeRecord[ctrl.columnIndex] options=ctrl.options is-drag-enabled=state.dragEnabled is-drop-enabled=state.dropEnabled></ep-editor-control></div>"
  );


  $templateCache.put('src/components/ep.search/search.html',
    "<div><header class=reverse><div class=searchControl><form role=form ng-submit=runSearch(searchText)><input type=search placeholder=\"Enter your search terms...\" ng-model=searchText ng-change=\"changeSearch()\"> <span class=input-group-btn><button class=\"btn btn-default\" type=button><span class=\"icon icon-search\"></span></button></span> <button ng-click=runSearch(searchText) ng-disabled=!searchText>search</button></form><div class=\"alert alert-danger\" id=validationSummary role=alert ng-show=hasError>{{status}}</div></div></header><section><div ng-show=enterpriseSearch.searchText><p ng-show=enterpriseSearch.searching>Searching for the following terms: '{{enterpriseSearch.searchText}}' ...</p><p ng-show=enterpriseSearch.searchError>{{enterpriseSearch.searchError}}</p></div><ul ng-if=enterpriseSearch.searchResults class=searchResults><li ng-repeat=\"searchResult in enterpriseSearch.searchResults track by $index\" class=searchResultCategory><b>Category: {{searchResult.label | uppercase}}</b><br><ul ng-if=searchResult.results><li ng-repeat=\"result in searchResult.results\" class=searchResult><span class=searchResultHeader ng-class=searchResult.label>{{result.label | uppercase}} - {{result.companyContext}} - {{result.keyTag}}</span><br><div ng-if=result.fields><span ng-repeat=\"field in result.fields\" class=searchResultField>{{field.alias}}: {{field.FieldValue}},</span></div></li></ul></li></ul></section></div>"
  );


  $templateCache.put('src/components/ep.shell/feedback/feedback_dialog.html',
    "<div class=form-group><label>{{config.summaryLabel}} <span class=\"required-indicator text-danger fa fa-asterisk\"></span></label><input class=form-control ng-model=config.feedback.summary ng-required=\"true\"></div><div class=form-group><label>{{config.descriptionLabel}} <span class=\"required-indicator text-danger fa fa-asterisk\"></span></label><textarea class=form-control ng-model=config.feedback.description ng-required=true></textarea></div><div class=form-group><label>{{config.customerNameLabel}}</label><input class=form-control ng-model=\"config.feedback.customerName\"></div><div class=form-group><label>{{config.customerEmailLabel}}</label><input class=form-control ng-model=\"config.feedback.customerEmail\"></div>"
  );


  $templateCache.put('src/components/ep.shell/shell.html',
    "<div><section ng-controller=epShellCtrl class=ep-shell ng-cloak><div ng-show=state.showProgressIndicator class=ep-progress-idicator><span class=\"fa fa-spin fa-spinner fa-pulse fa-5x\"></span></div><nav class=\"ep-main-navbar navbar-sm navbar-default navbar-fixed-top\" ng-class=\"{hidden: !state.showNavbar, 'cordova-padding': platform.app === 'Cordova'}\" ng-style=\"{border: 'none', 'padding-left': '4px' }\"><div class=\"container-fluid clearfix\"><ul class=\"navbar-nav nav\" style=\"float: none\"><!--Left hand side buttons--><li><a id=leftMenuToggle class=\"pull-left fa fa-bars fa-2x ep-navbar-button left-button\" ng-click=toggleLeftSidebar() ng-class=\"{'hidden': !state.showLeftToggleButton}\"></a></li><li><a id=homebutton href=#/home class=\"pull-left fa fa-home fa-2x ep-navbar-button left-button\" ng-class=\"{'hidden': !state.showHomeButton}\" tabindex=-1></a></li><li ng-repeat=\"button in leftNavButtons | orderBy:'index':true\" index={{button.index}} ng-class=\"{'hidden': button.hidden}\"><a id=navbtn_{{button.id}} ng-if=\"button.type === 'button'\" title={{button.title}} class=\"pull-left fa {{button.icon}} fa-2x ep-navbar-button left-button\" ng-click=state.executeButton(button,$event) ng-mousedown=state.buttonMouseDown(button) ng-class=\"{'disabled': state.freezeNavButtons  || button.enabled === false}\"></a> <a id=navbtn_{{button.id}} ng-if=\"button.type === 'select'\" title={{button.title}} class=\"pull-left ep-navbar-button left-button dropdown-toggle\" data-toggle=dropdown aria-expanded=false ng-class=\"{'disabled': state.freezeNavButtons  || button.enabled === false}\"><i class=\"fa {{button.icon}} fa-2x\"></i><span ng-bind=button.title style=\"padding-right: 5px\"></span><span class=caret></span></a><ep-include class=\"pull-left ep-navbar-button left-button\" ng-if=\"button.type === 'template'\" options=button.options user-data=button></ep-include><ul ng-if=\"button.type === 'select'\" class=dropdown-menu ng-class=\"{ 'align-right': button.right, 'disabled': state.freezeNavButtons || button.enabled === false }\" role=menu><li ng-repeat=\"opt in button.options\" ng-class=\"{ 'divider': opt.type==='separator' }\" role={{opt.type}}><a ng-if=\"opt.type !== 'separator' && opt.type !== 'checked'\" ng-click=state.executeButton(opt,$event) ng-mousedown=state.buttonMouseDown(opt)><span class=ep-navmenu-item><i class=\"ep-navmenu-item-icon fa fa-fw {{opt.icon}}\"></i><span class=ep-navmenu-item-text>{{opt.title}}</span></span></a> <a ng-if=\"opt.type !== 'separator' && opt.type === 'checked'\" ng-click=state.executeButton(opt,$event) ng-mousedown=state.buttonMouseDown(button)><span class=ep-navmenu-item><input type=checkbox class=ep-dropdown-btn-chk ng-model=\"opt.checked\"><span class=ep-navmenu-item-text ng-bind=opt.title></span></span></a></li></ul></li><li id=brandItem ng-hide=\"state.showBrand === false\" ng-class=\"{'ep-center-brand': state.centerBrand}\"><a id=apptitle ng-cloak=\"\" ng-if=state.brandTarget ng-class=\"{'ep-center-brand': state.centerBrand}\" class=navbar-brand ng-href=#{{(state.brandTarget)}} ng-bind-html=state.brandHTML></a> <span id=apptitle ng-cloak=\"\" ng-if=!state.brandTarget ng-class=\"{'ep-center-brand': state.centerBrand}\" class=navbar-brand ng-bind-html=state.brandHTML></span></li><li class=right-button ng-class=\"{'hidden': !state.showRightToggleButton }\"><a id=rightMenuToggle class=\"pull-left fa fa-bars fa-2x ep-navbar-button\" ng-click=toggleRightSidebar() ng-class=\"{'hidden': !state.showRightToggleButton }\"></a></li><!--Right hand side buttons--><li ng-repeat=\"button in rightNavButtons | orderBy:'index':true\" ng-class=\"{'hidden': button.hidden, 'disabled': state.freezeNavButtons  || button.enabled === false}\" class=right-button index={{button.index}}><a id=navbtn_{{button.id}} ng-if=\"button.type === 'button'\" title={{button.title}} class=\"fa {{button.icon}} fa-2x ep-navbar-button\" ng-click=state.executeButton(button,$event) ng-mousedown=state.buttonMouseDown(button)></a> <a id=navbtn_{{button.id}} ng-if=\"button.type === 'select'\" title={{button.title}} class=\"ep-navbar-button dropdown-toggle\" data-toggle=dropdown aria-expanded=false><i class=\"fa {{button.icon}} fa-2x\"></i><span ng-bind=button.title style=\"padding-right: 5px\"></span><span class=caret></span></a><ep-include class=ep-navbar-button ng-if=\"button.type === 'template'\" options=button.options user-data=button></ep-include><ul ng-if=\"button.type === 'select'\" class=\"dropdown-menu dropdown-menu-right\" ng-class=\"{ 'align-right': button.right, 'disabled': state.freezeNavButtons || button.enabled === false }\" role=menu><li ng-repeat=\"opt in button.options\" ng-class=\"{ 'divider': opt.type==='separator' }\" role={{opt.type}}><a ng-if=\"opt.type !== 'separator' && opt.type !== 'checked'\" ng-click=state.executeButton(opt,$event) ng-mousedown=state.buttonMouseDown(button)><span class=ep-navmenu-item><i class=\"ep-navmenu-item-icon fa fa-fw {{opt.icon}}\"></i><span class=ep-navmenu-item-text ng-bind=opt.title></span></span></a> <a ng-if=\"opt.type !== 'separator' && opt.type === 'checked'\" ng-click=state.executeButton(opt,$event) ng-mousedown=state.buttonMouseDown(button)><span class=ep-navmenu-item><input type=checkbox class=ep-dropdown-btn-chk ng-model=\"opt.checked\"><span class=ep-navmenu-item-text ng-bind=opt.title></span></span></a></li></ul></li></ul></div></nav><!--SIDE NAVIGATION--><ep-shell-sidebar><!--<div ng-transclude></div>--><div class=ep-fullscreen><div ng-view class=\"ep-fullscreen ep-anim-speed-{{state.animationSpeed}} {{state.animationIn}} {{state.animationOut}} ep-view{{options.enableViewAnimations? ' ep-view-transition' : ''}}\" ng-class=state.viewAnimation></div></div></ep-shell-sidebar><div class=\"navbar navbar-xsm navbar-default navbar-fixed-bottom\" ng-class=\"{hidden: !state.showFooter}\" role=navigation id=mainfooter style=\"color: white; padding-top: 4px; padding-left: 5px\"><a class=pull-left style=\"color: white\" ng-if=state.footerTarget ng-href={{state.footerTarget}}><sup id=footerElement ng-bind-html=state.footerHTML></sup></a> <sup ng-if=!state.footerTarget id=footerElement ng-bind-html=state.footerHTML></sup></div><span class=ep-shell-feedback-btn id=feedbackbutton ng-if=state.enableFeedback ng-click=sendFeedback()><i class=\"fa fa-bullhorn\"></i> Give Feedback</span></section></div>"
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


  $templateCache.put('src/components/ep.signature/ep-signature.html',
    "<!--This is a partial for the ep-signature directive --><div id=signature_parent style=\"min-height: 100px\"><div id=signature style=\"background-color: #ffffffff\"></div></div><div class=row><div class=col-xs-3><button id=clearButton class=\"btn btn-primary\" ng-disabled=!isEnabled tabindex=-1 ng-click=reset()>Clear</button></div><div class=\"col-xs-6 text-center\"><strong ng-bind=acknowledgeText></strong></div><div class=col-xs-3><button ng-click=accept() tabindex=-1 type=submit id=saveButton ng-disabled=\"!isEnabled || !acceptIsEnabled\" class=\"btn btn-success pull-right\">Accept</button></div></div>"
  );


  $templateCache.put('src/components/ep.tabbar/ep-tabbar.html',
    "<!--Tab Bar Components --><div class=ep-tabbar><ul id=tabbar class=\"navbar nav-pills navbar-default\" ng-class=\"{'navbar-fixed-bottom':state.tabbarAlignment=='bottom', 'navbar-fixed-top':state.tabbarAlignment!='bottom'}\"><li ng-repeat=\"icon in state.tabs\" class=ep-tabbar-contents ng-class=\"{'ep-tabbar-list':state.iconAlignment=='left'}\"><a ng-click=executeButton(icon) class=ep-tabbar-content-color><i class={{icon.icon}}></i><label id=testing2 class=testLabel ng-hide=\"state.labelAlignment=='top'\" ng-class=\"{'ep-tabbar-label':state.labelText=='left'}\">{{icon.text}}</label><p id=testing1 class=testP ng-hide=\"state.labelAlignment!='top'\">{{icon.text}}</p></a></li></ul></div>"
  );


  $templateCache.put('src/components/ep.table/table.html',
    "<table class=table ng-class=\"{'table-striped' : striped}\"><tr><th ng-repeat=\"oneTh in headers track by $index\">{{oneTh}}</th></tr><tr ng-show=isLoading><td colspan={{colCount}}><div class=\"progress progress-striped active\"><div class=progress-bar role=progressbar aria-valuenow=1 aria-valuemin=0 aria-valuemax=1 style=\"width: 100%\"></div></div></td></tr><tr ng-show=loadError><td colspan={{colCount}}><p class=\"text-danger text-center\"><i class=\"fa fa-exclamation-triangle\"></i> {{loadError}}</p></td></tr><tr ng-repeat=\"row in data\" class=ep-table-row ng-class=\"{ 'info': row.$isSelected }\" ng-click=selectRow(row,$event) ng-dblclick=onDblClick(row,$event)><td ng-repeat=\"cell in props track by $index\" class=ep-table-cell>{{row[cell]}}</td></tr></table>"
  );


  $templateCache.put('src/components/ep.tile/ep-tile-templates/ep-tile-image.html',
    "<!--This is a partial for the ep-tile-image --><div data-mode={{state.liveSettings.dataMode}} data-direction={{state.liveSettings.dataDirection}} data-delay={{state.liveSettings.dataDelay}} class=\"accent live-tile\" ng-class=state.tileClass><div ng-repeat=\"img in state.images\"><img class=full ng-src={{img.src}} alt=\"\" image-index=\"{{img.index}}\"> <span ng-if=\"tile.hideFooter !== false\" class=\"tile-title accent\" style=\"padding: 4px; background-color: gray\">{{img.title}}</span></div></div>"
  );


  $templateCache.put('src/components/ep.tile/ep-tile-templates/ep-tile-menu.html',
    "<!--This is a partial for the ep-tile-menu --><div class=\"live-tile accent\" ng-class=state.tileClass><div class=\"well ep-tile-container\"><span ng-if=\"tile.closeButton !== false\" class=ep-tile-close-button><i class=\"fa fa-times\" ng-click=\"state.closeAction(tile, $event)\"></i></span><h5 ng-if=\"tile.caption !== undefined\" class=\"ep-tile-caption-panel btn-primary clearfix\"><span ng-if=tile.icon class=\"ep-tile-icon fa-lg {{tile.icon}}\"></span> <span class=\"ep-tile-caption tile-caption\">{{tile.caption}}</span></h5><p class=\"ep-tile-description text-primary\">{{tile.description}}</p><div ng-if=tile.contentIcon class=\"ep-content-icon ep-align-content ep-align-vcenter\"><i class=\"fa {{tile.contentIcon}} fa-3x\"></i></div></div><span ng-if=\"tile.footer !== undefined\" class=\"tile-title accent\">{{tile.footer}}</span></div>"
  );


  $templateCache.put('src/components/ep.tile/ep-tile.html',
    "<!--This is a partial for the ep-tile directive --><div class=\"ep-tile {{state.sizeMode}} {{state.color}}\" ng-class=state.optionsClass><div ng-if=\"tile.type !== 'custom'\" ng-click=\"state.action(tile, $event)\" class=ep-tile-container ng-include=state.templateUrl></div><div ng-if=\"tile.type === 'custom'\" class=\"live-tile accent {{state.color}}\" ng-class=state.tileClass><span ng-if=\"tile.closeButton !== false\" class=ep-tile-close-button><i class=\"fa fa-times\" ng-click=\"state.closeAction(tile, $event)\"></i></span><div ng-click=\"state.action(tile, $event)\" class=ep-tile-container><ep-include options=tile.templateOptions user-data=tile></ep-include></div></div></div>"
  );


  $templateCache.put('src/components/ep.tiles.panel/ep-tiles-panel.html',
    "<!--This is a partial for the ep-tiles-panel directive --><div class=\"ep-tiles-panel tiles tile-group {{state.tileColor}}\" style=\"margin: 0px\"><ep-tile ng-if=\"beforeList && beforeList.length\" class=\"ep-tiles-before-list ep-repeat-animation\" ng-class=state.colorFunc(item) tile=item ng-repeat=\"item in beforeList | orderBy:sortList\" size-mode=sizeMode width=width height=height></ep-tile><ep-tile class=\"ep-tiles-list ep-repeat-animation\" ng-class=state.colorFunc(item) tile=item ng-repeat=\"item in list | orderBy:sortList\" size-mode=sizeMode width=width height=height></ep-tile><ep-tile ng-if=\"afterList && afterList.length\" class=\"ep-tiles-after-list ep-repeat-animation\" ng-class=state.colorFunc(item) tile=item ng-repeat=\"item in afterList | orderBy:sortList\" size-mode=sizeMode width=width height=height></ep-tile></div>"
  );


  $templateCache.put('src/components/ep.token/ep-login-view/ep-login-view.html',
    "<!--This is a partial for the ep-login-view directive --><div class=\"ep-login-view container-fluid\"><div class=ep-login-background><div class=ep-background-image ng-if=!settings.customImage></div><img class=ep-background-custom-image ng-if=settings.customImage ng-src={{settings.customImage}} alt=\"\"></div><div class=ep-login-up-box><div class=\"ep-login-box center-block\"><form class=form-group><div class=form-group><p class=ep-login-text><b>Please enter your credentials to sign in.</b></p><div class=input-group><span class=input-group-addon><i class=\"fa fa-user fa-fw\"></i></span> <input clearable name=username ng-keypress=clearWarning() id=username class=form-control ng-model=settings.username placeholder=\"User Name\"></div><br><div class=input-group><span class=input-group-addon><i class=\"fa fa-lock fa-fw\"></i></span> <input type=password clearable ng-keypress=passwordKeyPress($event) name=password id=password class=form-control ng-model=settings.password placeholder=\"Password\"></div><br><div ng-show=showServerName class=input-group><span class=input-group-addon><i class=\"fa fa-server fa-fw\"></i></span> <input spellcheck autocorrect=false clearable name=servername id=serverValue class=form-control ng-model=settings.serverName placeholder=\"Server\"></div><br><div ng-if=status class=\"text-center alert alert-warning\"><label>{{status}}</label><br></div><div><button ng-if=\"options.showSettingsButton !== false\" class=\"btn btn-default pull-left\" ng-click=showServer()><i class=\"fa fa-cog fa-fw\"></i></button> <button type=submit class=\"btn btn-primary pull-right\" ng-click=loginUser()>Log in</button></div></div></form></div></div></div>"
  );


  $templateCache.put('src/components/ep.token/ep-login/login.html',
    "<div class=thumbnail><div ng-if=\"showTitle !== false\" class=caption><h3 ng-hide=hasToken><span class=\"icon icon-enter\"></span> Login</h3><h3 ng-show=hasToken><span class=\"icon icon-exit\"></span> Logout</h3><hr></div><form role=form><div ng-if=\"showLabels === false\" class=input-group><span class=input-group-addon><i class=\"fa fa-user fa-fw\"></i></span> <input tabindex=1 id=user-name name=username required class=form-control ng-model=user.username placeholder=\"user name\"></div><div ng-if=\"showLabels !== false\" class=form-group><label for=user-name class=\"col-sm-2 control-label\">User:</label><div><input tabindex=1 id=user-name name=username required class=form-control ng-model=user.username placeholder=\"user name\"></div></div><div ng-if=\"showLabels === false\" class=form-group><div class=input-group><span class=input-group-addon><i class=\"fa fa-key fa-fw\"></i></span> <input tabindex=2 id=user-password name=password required class=form-control type=password placeholder=password ng-model=\"user.password\"></div></div><div ng-if=\"showLabels !== false\" class=form-group><label for=user-password class=\"col-sm-2 control-label\">Password:</label><div><input tabindex=2 id=user-password name=password required class=form-control type=password placeholder=password ng-model=\"user.password\"></div></div></form><div class=\"alert alert-danger\" id=validationSummary role=alert ng-show=hasError>{{status}}</div><div><button ng-if=\"showCancel !== false\" type=button class=\"btn btn-default\" ng-click=cancel()>Cancel</button> <button type=button class=\"btn btn-primary\" ng-hide=hasToken ng-click=login()>Login</button> <button type=button class=\"btn btn-primary\" ng-show=hasToken ng-click=logout()>Logout</button></div></div>"
  );


  $templateCache.put('src/components/ep.ui.range.slider/ep-range-slider.html',
    "<div class=ep-range-slider-ctr><div ng-show=touch><div class=ep-range-slider-value-ctr ng-click=toggleRangeInputMode()>{{rangeMin}} - {{rangeMax}}</div><div class=ep-range-slider-value-axis><div class=ep-range-ctr><div class=ep-range></div></div><div class=\"ep-range-slide-handle ep-range-slide-handle-min js-handle-min\"></div><div class=\"ep-range-slide-handle ep-range-slide-handle-max js-handle-max\"></div></div><div class=ep-range-steps-ctr><span class=\"ep-range-step ep-range-step-{{::step}}\" ng-repeat=\"step in steps\"></span></div></div><div ng-show=!touch><input class=\"form-control ep-range-input-min\" name=tbMin ng-model=rangeMin ng-model-options=\"{ debounce: 500 }\"><label for=tbMax>and</label><input class=\"form-control ep-range-input-max\" name=tbMax ng-model=rangeMax ng-model-options=\"{ debounce: 500 }\"><div class=range-slider-mode-toggle-ctr><small class=ep-range-slider-toggle-mode ng-click=toggleRangeInputMode()>Switch to slider</small></div></div></div>"
  );


  $templateCache.put('src/components/ep.viewmodal/ep-viewmodal.html',
    "<!--This is a partial for the ep-viewmodal directive --><div class=ep-viewmodal ng-class=\"{'ep-viewmodal-show': options.showViewModal, 'ep-viewmodal-peek': peek}\"><div class=\"ep-viewmodal-header modal-header bg-primary modal-title\"><i class=\"pull-left ep-padding-top\" ng-class=\"'fa fa-lg ' + options.lefticon\" ng-if=options.lefticon></i><h5>{{options.title}} <span ng-if=peek class=text-warning><strong>(Peek Mode)</strong></span> <i class=pull-right ng-show=options.showCloseButton><a class=\"fa fa-times fa-2x ep-viewmodal-icon\" ng-click=closeClick()></a></i> <i class=pull-right><a class=\"fa fa-eye fa-2x ep-viewmodal-icon\" ng-click=peekClick()></a></i></h5></div><div class=ep-viewmodal-body ng-hide=peek ng-transclude></div></div>"
  );

}]);
