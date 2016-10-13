/*
 * emf (Epicor Mobile Framework) 
 * version:1.0.10-dev.52 built: 13-10-2016
*/

if (typeof __ep_build_info === "undefined") {var __ep_build_info = {};}
__ep_build_info["utilities"] = {"libName":"utilities","version":"1.0.10-dev.52","built":"2016-10-13"};

(function() {
  'use strict';
    angular.module('ep.file', []);
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
 * @name ep.console
 * @description
 * This is the module that provides access to log entries displayed in a console dialog.
 */
(function() {
    'use strict';

    angular.module('ep.console', [
        'ep.templates',
        'ep.sysconfig',
        'ep.modaldialog'
    ]);
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
                epUtilsService.getService('epDataGridService').then(function(svc) {                    
                    if (svc) {
                        epDataGridService = svc;
                    }
                });
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

//# sourceMappingURL=emf.utilities.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/ep.photo.browser/ep-photo-browser.html',
    "<!--This is a partial for the ep-photo-browser directive --><div class=content ng-controller=epPhotoBrowserCtrl><ng-gallery images=images show-preview=showPreview></ng-gallery></div>"
  );


  $templateCache.put('src/components/ep.signature/ep-signature.html',
    "<!--This is a partial for the ep-signature directive --><div id=signature_parent style=\"min-height: 100px\"><div id=signature style=\"background-color: #ffffffff\"></div></div><div class=row><div class=col-xs-3><button id=clearButton class=\"btn btn-primary\" ng-disabled=!isEnabled tabindex=-1 ng-click=reset()>Clear</button></div><div class=\"col-xs-6 text-center\"><strong ng-bind=acknowledgeText></strong></div><div class=col-xs-3><button ng-click=accept() tabindex=-1 type=submit id=saveButton ng-disabled=\"!isEnabled || !acceptIsEnabled\" class=\"btn btn-success pull-right\">Accept</button></div></div>"
  );


  $templateCache.put('src/components/ep.filter.list/filter_list.html',
    "<div class=\"ep-search-list-container vertical-align\"><input ng-model=searchBy placeholder=Search class=form-control id=ep-search-list><label for=ep-search-list class=\"glyphicon glyphicon-search\" rel=tooltip title=search></label></div>"
  );

}]);
