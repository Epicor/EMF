/*
 * emf (Epicor Mobile Framework) 
 * version:1.0.12-dev.136 built: 03-04-2017
*/

if (typeof __ep_build_info === "undefined") {var __ep_build_info = {};}
__ep_build_info["utilities"] = {"libName":"utilities","version":"1.0.12-dev.136","built":"2017-04-03"};

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

(function() {
	'use strict';
    angular.module('ep.indexeddb', []);
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
    epFileService.$inject = ['$q', '$log', '$window', 'epFeatureDetectionService', 'epFileConstants', 'epIndexedDbService', 'epLocalStorageService'];
    angular.module('ep.file')
        //TODO: consider converting this constant into a sysconfig value
        .constant('epFileConstants', {
            'namespace': 'persistentData'
        })
        .service('epFileService', /*@ngInject*/ epFileService);

    function epFileService($q, $log, $window, epFeatureDetectionService,
        epFileConstants, epIndexedDbService, epLocalStorageService) {

        var storageSystems = {
            'localStorage': 0,
            'fileStorage': 1,
            'indexedDB': 2
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

        var storageSystem = storageSystems.localStorage;

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

            switch (storageSystem) {
                case storageSystems.fileStorage:
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
                    break;
                case storageSystems.indexedDB:
                    if (!filename) {
                        filename = path;
                        path = '';
                    }
                    epIndexedDbService.openDatabase('ep-file-db', 1).then(function(db) {
                        var store = db.getObjectStore('ep-file');
                        store.get(filename).then(function(fileEntry) {
                            if (fileEntry) {
                                deferred.resolve(fileEntry.value);
                            } else {
                                failWith(deferred, filename);
                            }
                        })
                    });
                    break;
                case storageSystems.localStorage:
                    if (!filename) {
                        filename = path;
                        path = epFileConstants.namespace;
                    }
                    filePath = path + '.' + filename;
                    graph = epLocalStorageService.get(filePath);
                    if (!graph) {
                        failWith(deferred, filename)({ code: 1 });
                    } else {
                        $log.debug('Successfully loaded ' + filePath + ' from LocalStorage.');
                        deferred.resolve(graph);
                    }
                    break;
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
                switch (storageSystem) {
                    case storageSystems.fileStorage:
                        if (!filename) {
                            filename = path;
                            path = $window.cordova.file.dataDirectory;
                        }
                        $window.resolveLocalFileSystemURL(path, function(directoryEntry) {
                            directoryEntry.getFile(filename, { create: true }, function(fileEntry) {
                                fileEntry.createWriter(function(writer) {

                                    // onwriteend is only called if the file was sucessfully written
                                    // so the promised is resolved without any return value.
                                    writer.onwriteend = function() {
                                        $log.debug('Successfully wrote file: ' + filename);
                                        deferred.resolve();
                                    };
                                    writer.onerror = function(err) {
                                        fail(deferred, { code: err.toString() });
                                    };
                                    // the blob interface expects the object graph to be inside an array
                                    // so the graph gets stringified, then set as the only element in the array
                                    var blob = new Blob([text], { type: type });
                                    writer.write(blob);
                                }, failWith(deferred, filename));
                            }, failWith(deferred, filename));
                        }, failWith(deferred, filename));
                        break;
                    case storageSystems.indexedDB:
                        if (!filename) {
                            filename = path;
                            path = '';
                        }
                        var fileEntry = { filename: filename, value: text };
                        epIndexedDbService.openDatabase('ep-file-db', 1).then(function(db) {
                            db.getObjectStore('ep-file').put(fileEntry).then(function() {
                                $log.debug('Saved ' + filename + ' to indexedDB');
                                deferred.resolve();
                            }, failWith(deferred, filename))
                        })
                        break;
                    case storageSystems.localStorage:
                        if (!filename) {
                            filename = path;
                            path = epFileConstants.namespace;
                        }
                        filePath = path + '.' + filename;
                        epLocalStorageService.update(filePath, text);
                        $log.debug('Successfully saved ' + filePath + ' to LocalStorage.');
                        deferred.resolve();
                        break;
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
                switch (storageSystem) {
                    case storageSystems.fileStorage:
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
                        break;
                    case storageSystems.indexedDB:
                        if (!filename) {
                            filename = path;
                            path = '';
                        }
                        epIndexedDbService.openDatabase('ep-file-db', 1).then(function(db) {
                            var store = db.getObjectStore('ep-file');
                            store.get(filename).then(function(fileEntry) {
                                if (fileEntry) {
                                    deferred.resolve(true);
                                } else {
                                    deferred.resolve(false);
                                }
                            })
                        });
                        break;
                    case storageSystems.localStorage:
                        if (!filename) {
                            filename = path;
                            path = epFileConstants.namespace;
                        }
                        var filePath = path + '.' + filename;
                        deferred.resolve(!!epLocalStorageService.get(filePath));
                        break;
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
            switch (storageSystem) {
                case storageSystems.fileStorage:
                    return $window.cordova.file.dataDirectory + filename;
                    break;
                case storageSystems.indexedDB:
                    return filename;
                    break;
                case storageSystems.localStorage:
                    return epFileConstants.namespace + '.' + filename;
                    break;
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
                switch (storageSystem) {
                    case storageSystems.fileStorage:
                        $window.resolveLocalFileSystemURL($window.cordova.file.dataDirectory + filename,
                            function(fileEntry) {
                                fileEntry.remove();
                                deferred.resolve();
                            }, function(err) {
                                failWith(deferred, filename)(err);
                            });
                        break;
                    case storageSystems.indexedDB:
                        epIndexedDbService.openDatabase('ep-file-db', 1).then(function(db) {
                            var store = db.getObjectStore('ep-file');
                            store.delete(filename).then(function() {
                                deferred.resolve();
                            }, failWith(deferred, filename));
                        });
                        break;
                    case storageSystems.localStorage:
                        epLocalStorageService.clear(epFileConstants.namespace + '.' + filename);
                        deferred.resolve();
                        break;
                }
            } catch (e) {
                failWith(deferred, filename)(e);
            }
            return deferred.promise;
        }

        /**
         * @ngdoc method
         * @name setStorageSystem
         * @methodOf ep.file:epFileService
         * @public
         * @description
         * This function sets the system to use when working with files.
         * Valid values are 'localStorage', 'indexedDB', and 'fileStorage'
         * File storage is only available if the current running context is
         * cordova or electron.
         */
        function setStorageSystem(system) {
            initialize(system);
        }
        /**
         * @ngdoc method
         * @name getStorageSystem
         * @methodOf ep.file:epFileService
         * @public
         * @description
         * This function returns the currently selected file system.
         * Possible values are 'localStorage', 'indexedDB', and 'fileStorage'.
         */
        function getStorageSystem() {
            var sys = '';
            switch (storageSystem) {
                case storageSystems.localStorage: sys = 'localStorage'; break;
                case storageSystems.indexedDB: sys = 'indexedDB'; break;
                case storageSystems.fileStorage: sys = 'fileStorage'; break;
            }
            return sys;
        }

        function setSystemToFileStorage() {
            storageSystem = storageSystems.fileStorage;
        }

        function setSystemToIndexedDb() {
            epIndexedDbService.createSchema('ep-file-db')
                .defineVersion(1, function(db) {
                    db.createObjectStore('ep-file', { keyPath: 'filename' });
                });
            $log.debug('IndexedDB system selected.');
            storageSystem = storageSystems.indexedDB;
        }

        function setSystemToLocalStorage() {
            $log.debug('LocalStorage system selected.');
            storageSystem = storageSystems.localStorage;
        }

        function initialize(manualSelection) {
            if (!manualSelection) {
                if (epFeatureDetectionService.getFeatures().platform.app === 'Cordova') {
                    setSystemToLocalStorage();
                } else {
                    try {
                        setSystemToIndexedDb();
                    } catch (err) {
                        $log.warn(err);
                        setSystemToLocalStorage();
                    }
                }
            } else {
                switch (manualSelection.toLowerCase()) {
                    case 'localstorage': setSystemToLocalStorage(); break;
                    case 'indexeddb':
                        try {
                            setSystemToIndexedDb();
                        } catch (err) {
                            $log.warn(err);
                            setSystemToLocalStorage();
                        }
                        break;
                    case 'filestorage': setSystemToFileStorage(); break;
                    default:
                        $log.warn('Unable to set file storage system to ' + manualSelection + '.');
                        setSystemToLocalStorage();
                        break;
                }
            }
        }
        initialize();

        return {
            load: load,
            loadText: loadText,
            save: save,
            saveText: saveText,
            getFilePath: getFilePath,
            fileExists: fileExists,
            remove: remove,
            setStorageSystem: setStorageSystem,
            getStorageSystem: getStorageSystem
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
                searchBy: '=',
                count: '=',
                changeHandler: '='
            },
            templateUrl: 'src/components/ep.filter.list/filter_list.html',
            link: function(scope) {
                scope.clearSearch = function() {
                    scope.searchBy = '';
                    scope.showRemove = false;
                }
            }
        };
    });
})();

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
    epIndexedDbService.$inject = ['$log', '$q', '$window', '$timeout'];
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
        this.db.onerror = this.logError;
    }
    DatabaseWrapper.prototype.getObjectStore = function(objectStoreName) {
        return new ObjectStoreWrapper(this.$log, this.$q, this.db, objectStoreName);
    };

    DatabaseWrapper.prototype.logError = function(e){
        this.$log.error('An IndexedDB error has occured: ' + e);
    }

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
            deferred.reject(e);
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
    function epIndexedDbService($log, $q, $window, $timeout) {

        var indexedDB = $window.indexedDB ||
                        $window.mozIndexedDB ||
                        $window.webkitIndexedDB ||
                        $window.msIndexedDB ||
                        $window.shimIndexedDB;

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
            delete openDatabaseMap[id];
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
                var cancellationToken = $timeout(function() {
                    $log.warn('Database ' + id + ' v' + version + ' could not be opened. ' +
                        'This is possibly due to a conflict between two or more open tabs.');
                    
                    deferred.reject('Timeout reached while waiting for database ' + id +' to open.');
                }, 1500);
                openRequest.onsuccess = function() {
                    var db = openRequest.result;
                    var wrapper = new DatabaseWrapper($log, $q, db);
                    openDatabaseMap[id] = wrapper;
                    $timeout.cancel(cancellationToken);
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
                            deferred.resolve(result);
                        } else {
                            resolveServiceCall(deferred, key, cacheId, getDataFromService);
                        }
                    }, function() {
                        resolveServiceCall(deferred, key, cacheId, getDataFromService);
                    });
                } else {
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

            // ...then invoke the service method
            var invocationResult = getDataFromService(key);
            // if the service returned a promise
            if (invocationResult.then) {
                // ..then we need to wait for resolution
                invocationResult.then(function(result) {
                    // and store the result in the cache (by calling finalize)
                    deferred.resolve(finalize(result));
                }, function(err) {
                    $log.warn('An error occurred while invoking service call with key ' + key + '. ' + err);
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
            }, function(err){
                $log.warn('An error occured that prevented data from being retreived from the cache. ' +
                    'This is probably caused by two or more open tabs sending contending commands to ' +
                    'the underlying database. If this warning occurs frequently, then it could temporarily ' +
                    'degrade performance of the application.');
            });
        }

        function savePersistedCacheValue(key, cacheId, value) {
            var cacheEntry = { key: key, cacheId: cacheId, value: value };
            return epIndexedDbService.openDatabase('ep-cache-db', 1).then(function(db) {
                var store = db.getObjectStore('ep-cache');
                return store.put(cacheEntry);
            }, function(err){
                $log.warn('An error occured that prevented data from being stored in the cache. ' +
                    'This is probably caused by two or more open tabs sending contending commands to ' +
                    'the underlying database. If this warning occurs frequently, then it could temporarily ' +
                    'degrade performance of the application.');
            });
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
            }
            epIndexedDbService.openDatabase('ep-cache-db', 1).then(function(db) {
                db.getObjectStore('ep-cache').deleteByIndex('cacheId', cacheId);
                $rootScope.$emit(epShellConstants.SHELL_CACHE_DELETED_EVENT, { cacheId: cacheId });
            }, function(err){
                $log.error(err);
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

//# sourceMappingURL=emf.utilities.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/ep.photo.browser/ep-photo-browser.html',
    "<!--This is a partial for the ep-photo-browser directive --><div class=content ng-controller=epPhotoBrowserCtrl><ng-gallery images=images show-preview=showPreview></ng-gallery></div>"
  );


  $templateCache.put('src/components/ep.signature/ep-signature.html',
    "<!--This is a partial for the ep-signature directive --><div id=signature_parent style=\"min-height: 100px\"><div id=signature style=\"background-color: #ffffff\"></div></div><div class=row><div class=col-xs-3><button id=clearButton class=\"btn btn-primary\" ng-disabled=!isEnabled tabindex=-1 ng-click=reset()>Clear</button></div><div class=\"col-xs-6 text-center\"><strong ng-bind=acknowledgeText></strong></div><div class=col-xs-3><button ng-click=accept() tabindex=-1 type=submit id=saveButton ng-disabled=\"!isEnabled || !acceptIsEnabled\" class=\"btn btn-success pull-right\">Accept</button></div></div>"
  );


  $templateCache.put('src/components/ep.filter.list/filter_list.html',
    "<div class=ep-search-list-container><div class=row><div class=col-xs-10><span class=\"ep-cicrm-search ep-pad-left-10\"></span> <input id=searchinput class=\"search-query form-control\" ng-focus=\"showRemove=true\" ng-model=searchBy placeholder=Search ng-change=\"changeHandler(searchBy)\"> <span class=\"ep-cicrm-delete text-danger\" ng-if=showRemove ng-click=clearSearch()></span></div><div class=\"col-xs-2 result-count-container text-center\"><div>{{count}}</div><div>Results</div></div></div></div>"
  );

}]);
