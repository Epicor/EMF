/*
 * emf (Epicor Mobile Framework) 
 * version:1.0.10-dev.517 built: 09-02-2017
*/

if (typeof __ep_build_info === "undefined") {var __ep_build_info = {};}
__ep_build_info["tiles"] = {"libName":"tiles","version":"1.0.10-dev.517","built":"2017-02-09"};

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
 * - mainTitle: main title to display on list
 * - subTitle: sub title to display on list just below main title.
 * - additionalTitle: additional title to display on list just below sub title.
 * - id: value to be displayed on right side of the list.
 * - filter: handler function on click of filter button in sub header section of the list
 * - sort: handler function on click of sort button in sub header section of the list.
 * - add: handler function on click of add button in sub header section of the list.
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
                id: '@',
                filter: '&',
                sort: '&',
                add: '&',
                subTitle: '@',
                additionalTitle: '@',
                groupBy: '@',
            },
            templateUrl: 'src/components/ep.contacts.list/contacts_list.html',
            link: function(scope) {
                if (scope.groupBy == 'true') {
                    scope.nameList = epContactsListService.getGroupedList(scope.data, scope.mainTitle);
                }
                else {
                    scope.nameList = scope.data;
                }
                scope.filterVal = [];
                scope.items = { count: 0 };
                scope.indexKeys = epContactsListConstants.CONTACTS_LIST_INDEXES;
                scope.smallIndexKeys = epContactsListConstants.CONTACTS_LIST_INDEXES_SMALL;

                scope.setTitles = scope.subTitle.split(' ');
               
                $(window).resize(function() {
                    epContactsListService.toggleIndexes();
                });
                epContactsListService.toggleIndexes();
                scope.getDetails = function(obj) {
                    return obj;
                };

                scope.$watch('contactListSearch', function(term) {
                    var val = $filter('filter')(scope.data, term);
                    scope.items.count = val.length;
                });

                scope.goToLink = function(key, index) {
                    var container = $('.ep-contacts-list');
                    //on smaller devices, go to next available list group on clicking the dots.
                    if (key === '.') { //only on smaller devices
                        var prevKey = scope.smallIndexKeys[index - 1];
                        var nextKey = scope.smallIndexKeys[index + 1];
                        //get the keys in between prevkey and nextkey
                        var betweenKeys = scope.indexKeys.substring(scope.indexKeys.indexOf(prevKey) + 1,
                            scope.indexKeys.indexOf(nextKey));
                        for (var i = 0; i < betweenKeys.length; i++) {
                            var scrollToElem = $('#list-group-' + betweenKeys[i]);
                            if (scrollToElem.length) {
                                container.animate({
                                    scrollTop: scrollToElem.offset().top - container.offset().top +
                                        container.scrollTop() - 90
                                });
                                break;
                            }
                        }
                        return;
                    }

                    //hash index will scroll to numbers list
                    key = (key === '#') ? '1' : key;
                    var scrollToElem = $('#list-group-' + key);
                    if (scrollToElem.length) {
                        container.animate({
                            scrollTop: scrollToElem.offset().top - container.offset().top + container.scrollTop() - 90
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
        function getGroupedList(listData, mainTitle) {
            var listName = [];
            var sortedlist = _.sortBy(listData, function (obj) { return obj[mainTitle].toLowerCase(); });
            var groupedObj = {};
            var itemGroup = [];
            var currAlphabet = '';
            var prevAlphabet = '';
            for (var i = 0; i < sortedlist.length; i++) {
                currAlphabet = sortedlist[i][mainTitle].substring(0, 1).toUpperCase();

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

        $scope.$watch('menuId', function(newValue, oldValue) {
            if (newValue && newValue !== oldValue) {

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

//# sourceMappingURL=emf.tiles.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

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


  $templateCache.put('src/components/ep.color.tile/ep-color-tile.html',
    "<!-- Color Tile Component --><div class=\"ep-color-tile ep-align-container {{colorclass}}\" ng-style=\"{'background-color': color}\"><h3>{{title}}</h3><h5>{{description}}</h5><small>{{fineprint}}</small><div class=\"ep-color-tile-icon ep-align-content ep-align-vcenter\"><i class=\"fa {{icon}}\"></i></div></div>"
  );


  $templateCache.put('src/components/ep.contacts.list/contacts_list.html',
    "<div class=ep-contacts-list-container><!--Calling filter list component for search option--><ep-filter-list search-by=contactListSearch count=items.count></ep-filter-list><!--Header as optional--><div class=ep-contact-sub-header><label class=ep-contact-sub-header-label ng-click=filter()>Filter</label><label class=ep-contact-sub-header-label ng-click=sort()>Sort</label><span class=pull-right style=padding-right:5% ng-click=add()><i class=\"fa fa-plus-square-o fa-2x\" aria-hidden=true style=color:#129ff4></i></span></div><!--List area--><div class=ep-contacts-list><div class=ep-contacts-list-inner ng-if=\"groupBy=='true'\"><div ng-repeat=\"(key, value) in nameList\"><div class=ep-group-heading ng-if=\"filterVal.length > 0\" id=\"list-group-{{key == '#' ? 1 : (key | uppercase)}}\">{{key | uppercase}}</div><ul><li ng-repeat=\"obj in filterVal = (value | filter: contactListSearch)\" ng-click=handler(obj)><div class=\"row mainTitle\"><div class=col-xs-7><label>{{ obj[mainTitle] }}</label></div><div class=\"col-xs-3 text-right\">{{obj[id]}}</div></div><div class=\"pull-right ep-contact-list-arrow\" ng-class=\"{'ep-contact-list-subtitle-arrow':subTitle && !additionalTitle, 'ep-contact-list-maintitle-arrow': !subTitle && !additionalTitle, 'ep-contact-list-additionalTitle-arrow': additionalTitle}\"><i class=\"fa fa-angle-right fa-2x\"></i></div><div ng-if=subTitle class=subTitle><span ng-show=\"{{obj[setTitles[0]].length>=1}}\">{{obj[setTitles[0]]}}</span><span ng-show=\"{{obj[setTitles[1]].length>=1}}\"><span ng-show=\"{{obj[setTitles[0]].length>=1}}\">,&nbsp</span>{{obj[setTitles[1]]}}</span><span ng-show=\"{{obj[setTitles[2]].length>=1}}\"><span ng-show=\"{{obj[setTitles[0]].length>=1}} || {{obj[setTitles[1]].length>=1}}\">,&nbsp</span>{{obj[setTitles[2]]}}</span></div><div class=additionalTitle ng-if=additionalTitle>{{obj[additionalTitle]}}</div></li></ul></div></div><div class=ep-contacts-list-inner ng-if=\"groupBy=='false'\"><ul><li ng-repeat=\"obj in nameList | filter: contactListSearch\" ng-click=handler(obj)><div class=\"row mainTitle\"><div class=col-xs-7><label>{{ obj[mainTitle] }}</label></div><div class=\"col-xs-3 text-right\">{{obj[id]}}</div></div><div class=\"pull-right ep-contact-list-arrow\" ng-class=\"{'ep-contact-list-subtitle-arrow':subTitle && !additionalTitle, 'ep-contact-list-maintitle-arrow': !subTitle && !additionalTitle, 'ep-contact-list-additionalTitle-arrow': additionalTitle}\"><i class=\"fa fa-angle-right fa-2x\"></i></div><div ng-if=subTitle class=subTitle><span ng-show=\"{{obj[setTitles[0]].length>=1}}\">{{obj[setTitles[0]]}}</span><span ng-show=\"{{obj[setTitles[1]].length>=1}}\"><span ng-show=\"{{obj[setTitles[0]].length>=1}}\">,&nbsp</span>{{obj[setTitles[1]]}}</span><span ng-show=\"{{obj[setTitles[2]].length>=1}}\"><span ng-show=\"{{obj[setTitles[0]].length>=1}} || {{obj[setTitles[1]].length>=1}}\">,&nbsp</span>{{obj[setTitles[2]]}}</span></div><div class=additionalTitle ng-if=additionalTitle>{{obj[additionalTitle]}}</div></li></ul></div></div><!--Index--><ul ng-if=\"groupBy=='true'\" class=\"ep-index-list large-index-list\" ng-hide=contactListSearch><li ng-repeat=\"(key, value) in nameList\" ng-click=goToLink(key)>{{key}}</li></ul><!--Index for smaller device screen--><ul ng-if=\"groupBy=='true'\" class=\"ep-index-list small-index-list\" ng-hide=contactListSearch><li ng-repeat=\"key in smallIndexKeys track by $index\" ng-click=\"goToLink(key, $index)\"><span ng-if=\"key == '.'\" class=\"fa fa-circle\"></span> <span ng-if=\"key !='.'\">{{key}}</span></li></ul></div>"
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

}]);
