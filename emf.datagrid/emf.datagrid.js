/*
 * emf (Epicor Mobile Framework) 
 * version:1.0.24-dev.7 built: 07-11-2017
*/

if (typeof __ep_build_info === "undefined") {var __ep_build_info = {};}
__ep_build_info["datagrid"] = {"libName":"datagrid","version":"1.0.24-dev.7","built":"2017-11-07"};

'use strict';
/**
 * @ngdoc overview
 * @name ep.modaldialog
 * @description
 * Provides epicor modal dialo services
 */
angular.module('ep.datagrid', ['ep.templates', 'ep.dropdown']);

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
                    //only focus the field if we are on a non touch device because it causes the keyboard to popup
                    //on touch devices which can be an annoying user experience.
                    if (!epFeatureDetectionService.hasTouchEvents()) {
                        scope.findElement('.ep-dg-search-input').focus();
                    }
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

//# sourceMappingURL=emf.datagrid.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

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

}]);
