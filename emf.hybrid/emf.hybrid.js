/*
 * emf (Epicor Mobile Framework) 
 * version:1.0.14-dev.77 built: 22-08-2017
*/

if (typeof __ep_build_info === "undefined") {var __ep_build_info = {};}
__ep_build_info["hybrid"] = {"libName":"hybrid","version":"1.0.14-dev.77","built":"2017-08-22"};

(function() {
    'use strict';

    angular.module('ep.hybrid', ['ep.templates']);
})();

/**
 * @ngdoc service
 * @name ep.hybrid:epHybridBarcodeService
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
     	angular.module('TestApp', ['ep.hybrid'])
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
    angular.module('ep.hybrid')
        .service('epHybridBarcodeService', /*@ngInject*/ epHybridBarcodeService);

    function epHybridBarcodeService($rootScope) {

        /**
         * @ngdoc method
         * @name scan
         * @methodOf ep.hybrid:epHybridBarcodeService
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
 * @ngdoc service
 * @name ep.hybrid:epHybridCalendarService
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
     	angular.module("TestApp", ["ep.hybrid"])
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
    angular.module('ep.hybrid')
        .service('epHybridCalendarService', /*@ngInject*/ epHybridCalendarService);

    function epHybridCalendarService($rootScope) {

        /**
         * @ngdoc method
         * @name openCalendar
         * @methodOf ep.hybrid:epHybridCalendarService
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
         * @methodOf ep.hybrid:epHybridCalendarService
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
         * @methodOf ep.hybrid:epHybridCalendarService
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
         * @methodOf ep.hybrid:epHybridCalendarService
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
         * @methodOf ep.hybrid:epHybridCalendarService
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
         * @methodOf ep.hybrid:epHybridCalendarService
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
         * @methodOf ep.hybrid:epHybridCalendarService
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
         * @methodOf ep.hybrid:epHybridCalendarService
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
         * @methodOf ep.hybrid:epHybridCalendarService
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
         * @methodOf ep.hybrid:epHybridCalendarService
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
 * @ngdoc service
 * @name ep.hybrid:epHybridContactsService
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
     	angular.module("TestApp", ["ep.hybrid"])
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
    angular.module('ep.hybrid')
        .service('epHybridContactsService', /*@ngInject*/ epHybridContactsService);

    function epHybridContactsService($rootScope, $log) {

        /**
         * @ngdoc method
         * @name pickContact
         * @methodOf ep.hybrid:epHybridContactsService
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
 * @ngdoc service
 * @name ep.hybrid:epHybridDeviceService
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
     	angular.module("TestApp", ["ep.hybrid"])
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
    angular.module('ep.hybrid')
        .service('epHybridDeviceService', /*@ngInject*/ epHybridDeviceService);

    function epHybridDeviceService($log, $window) {

        /**
         * @ngdoc method
         * @name getPlatform
         * @methodOf ep.hybrid:epHybridDeviceService
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
         * @methodOf ep.hybrid:epHybridDeviceService
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
         * @methodOf ep.hybrid:epHybridDeviceService
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
         * @methodOf ep.hybrid:epHybridDeviceService
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
         * @methodOf ep.hybrid:epHybridDeviceService
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
 * @ngdoc service
 * @name ep.hybrid:epHybridEmailComposerService
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
 angular.module('TestApp', ['ep.hybrid'])
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
    angular.module('ep.hybrid')
        .service('epHybridEmailComposerService', /*@ngInject*/ epHybridEmailComposerService);

    function epHybridEmailComposerService($log) {

        /**
         * @ngdoc method
         * @name isEmailAvailable
         * @methodOf ep.hybrid:epHybridEmailComposerService
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
         * @methodOf ep.hybrid:epHybridEmailComposerService
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
 * @ngdoc service
 * @name ep.hybrid:epHybridFlashlightService
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
     	angular.module("TestApp", ["ep.hybrid"])
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
    angular.module('ep.hybrid')
        .service('epHybridFlashlightService', /*@ngInject*/ epHybridFlashlightService);

    function epHybridFlashlightService($log) {

        /**
         * @ngdoc method
         * @name flashOn
         * @methodOf ep.hybrid:epHybridFlashlightService
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
         * @methodOf ep.hybrid:epHybridFlashlightService
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
 * @ngdoc service
 * @name ep.hybrid:epHybridGeolocationService
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
     	angular.module("TestApp", ["ep.hybrid"])
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
    angular.module('ep.hybrid')
        .service('epHybridGeolocationService', /*@ngInject*/ epHybridGeolocationService);

    function epHybridGeolocationService($rootScope, $log) {

        var directionsDisplay;
        var marker;

        /**
         * @ngdoc method
         * @name getGeolocation
         * @methodOf ep.hybrid:epHybridGeolocationService
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
         * @methodOf ep.hybrid:epHybridGeolocationService
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
         * @methodOf ep.hybrid:epHybridGeolocationService
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
         * @methodOf ep.hybrid:epHybridGeolocationService
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
         * @methodOf ep.hybrid:epHybridGeolocationService
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
         * @methodOf ep.hybrid:epHybridGeolocationService
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
 * @ngdoc service
 * @name ep.hybrid:epHybridGPSTrackerService
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
     	angular.module('TestApp', ['ep.hybrid'])
     		.controller('SampleCtrl',['$scope', '$log', 'epHybridGPSTrackerService',
	     		function($scope, epHybridGPSTrackerService) {  }]);
     </file>
   </example>
 */
(function(backgroundGeolocation) {
    'use strict';

    epHybridGPSTrackerService.$inject = ['$rootScope', '$log'];
    angular.module('ep.hybrid')
        .service('epHybridGPSTrackerService', /*@ngInject*/ epHybridGPSTrackerService);

    function epHybridGPSTrackerService($rootScope, $log) {

        var gpsConfigured = false;

        /**
         * @ngdoc method
         * @name background
         * @methodOf ep.hybrid:epHybridGPSTrackerService
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
 * @ngdoc service
 * @name ep.hybrid:epHybridMediaService
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
     	angular.module("TestApp", ["ep.hybrid"])
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

    angular.module('ep.hybrid')
        .service('epHybridMediaService', /*@ngInject*/ epHybridMediaService);

    function epHybridMediaService() {

        var myMedia = null;
        /**
         * @ngdoc method
         * @name playAudio
         * @methodOf ep.hybrid:epHybridMediaService
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
         * @methodOf ep.hybrid:epHybridMediaService
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
 * @ngdoc service
 * @name ep.hybrid:epHybridNetworkService
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
     	angular.module('TestApp', ['ep.hybrid'])
     		.controller('networkCtrl',['$scope', '$log', 'epHybridMediaService',
                function($scope, epHybridNetworkService) {
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

    angular.module('ep.hybrid')
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
         * @methodOf ep.hybrid:epHybridNetworkService
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
 * @ngdoc service
 * @name ep.hybrid:epHybridPhotoService
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
     	angular.module("TestApp", ["ep.hybrid"])
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
    angular.module('ep.hybrid')
        .service('epHybridPhotoService', /*@ngInject*/ epHybridPhotoService);

    function epHybridPhotoService($rootScope) {

        /**
         * @ngdoc method
         * @name getPicture
         * @methodOf ep.hybrid:epHybridPhotoService
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
 * @ngdoc service
 * @name ep.hybrid:epHybridVibrationService
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
     	angular.module("TestApp", ["ep.hybrid"])
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

    angular.module('ep.hybrid')
        .service('epHybridVibrationService', /*@ngInject*/ epHybridVibrationService);
    function epHybridVibrationService() {

        /**
        * @ngdoc method
        * @name vibrateDevice
        * @methodOf ep.hybrid:epHybridVibrationService
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

//# sourceMappingURL=emf.hybrid.min.js.map
