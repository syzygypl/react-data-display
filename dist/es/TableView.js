import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PropTypes } from 'react';
import { AutoSizer, MultiGrid } from 'react-virtualized';

// styles from react-virtualized example
var STYLE = {
    border: '1px solid #ddd',
    overflow: 'hidden'
};
var STYLE_BOTTOM_LEFT_GRID = {
    borderRight: '2px solid #aaa',
    backgroundColor: '#f7f7f7'
};
var STYLE_TOP_LEFT_GRID = {
    borderBottom: '2px solid #aaa',
    borderRight: '2px solid #aaa',
    fontWeight: 'bold'
};
var STYLE_TOP_RIGHT_GRID = {
    borderBottom: '2px solid #aaa',
    fontWeight: 'bold'
};

// To understand what's going on in the component, start with render() method
// In short, we take the data defined on the DataField inside TableView and use 
// components provided by react-virtualized.

export var TableView = function (_React$Component) {
    _inherits(TableView, _React$Component);

    function TableView() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TableView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TableView.__proto__ || _Object$getPrototypeOf(TableView)).call.apply(_ref, [this].concat(args))), _this), _this.isGroupDataField = function (element) {
            return element.props && element.props.group && element.props.children;
        }, _this.getTableWidth = function () {

            // Default behaviour:
            // just calculate sum of all of DataField components

            var children = _this.props.children;

            var getWidthProp = function getWidthProp(element) {
                return element.props.width || 0;
            };
            var isGroup = function isGroup(element) {
                return _this.isGroupDataField(element);
            };

            // array with the width props values in DataField components
            // in case when DataField is a group (<DataField group>) and has nested other DataFields components
            // iterate over the nested DataFields and sum their widths
            var widthValues = React.Children.map(children, function (dataField) {
                return isGroup(dataField) ? React.Children.map(dataField.props.children, getWidthProp) : getWidthProp(dataField);
            });

            // sum all values to get the total width
            var totalWidth = widthValues.reduce(function (prev, curr) {
                return prev + curr;
            }, 0);

            return totalWidth;

            // @TODO
            // User-controlled behaviour:
            // width is supplied by the user to the DataDisplay component and then used here
        }, _this.getColumnDataField = function (columnIndex) {
            var children = _this.props.children;

            var dataField = React.Children.toArray(children)[columnIndex];

            return dataField;
        }, _this.getDataFieldElements = function () {
            // getDataFieldElements = (flatten = false) => {
            var children = _this.props.children;


            var dataFields = React.Children.map(children, function (child) {
                return child;
            });

            return dataFields;
        }, _this.getColumnCount = function () {
            var children = _this.props.children;

            /*
            const columns = React.Children.map(children, (child) => (
                this.isGroupDataField(child) ? React.Children.count(child) : 1
            ));
            return columns.reduce((curr, prev) => curr + prev, 0);
            */

            return React.Children.count(children);
        }, _this.getRowCount = function () {
            var _this$props = _this.props,
                data = _this$props.data,
                showHeader = _this$props.showHeader;


            return showHeader ? data.length + 1 : data.length;
        }, _this.getColumnWidth = function (_ref2) {
            var index = _ref2.index;

            var dataField = _this.getColumnDataField(index);

            return dataField.props.width;
        }, _this.cellRenderer = function (_ref3) {
            var key = _ref3.key,
                columnIndex = _ref3.columnIndex,
                rowIndex = _ref3.rowIndex,
                isScrolling = _ref3.isScrolling,
                isVisible = _ref3.isVisible,
                style = _ref3.style;

            // use label and content values/components to render header and regular cells

            var _this$props2 = _this.props,
                children = _this$props2.children,
                data = _this$props2.data,
                showScrollPlaceholder = _this$props2.showScrollPlaceholder,
                showHeader = _this$props2.showHeader;

            // DataField component describing this cell 

            var dataFieldElement = _this.getColumnDataField(columnIndex);
            // @TODO: add validation for presence of the field prop && key in the data
            var fieldKey = dataFieldElement.props.field;

            var content = showHeader && rowIndex === 0 ? dataFieldElement.props.label : showHeader ? data[rowIndex - 1][fieldKey] : data[rowIndex][fieldKey];

            /*
            if (showHeader && rowIndex === 0) {
                // render header (label)
                // first, let's check how the label prop is defined on the DataField component for this column
                 console.log('dataField');
                console.log(dataField);
            }
            */

            return React.createElement(
                'div',
                {
                    className: {},
                    key: key,
                    style: style
                },
                content
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // whether or not an element is a group DataField


    // @TODO: add validation:
    // - all child components should be of type DataField
    // - all should have width property declared and if not, should be group with valid DataFields
    // - validation should run only in the DEV mode


    // @TODO: add support for nested DataFields


    // @TODO: add flatten argument for nested DataFields


    // @TODO: add counting for nested DataFields


    // for now, w/o group columns


    // for now, simple renderer w/o subheaders


    _createClass(TableView, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                fillParentWidth = _props.fillParentWidth,
                fillParentHeight = _props.fillParentHeight,
                fixedHeight = _props.fixedHeight,
                fixedWidth = _props.fixedWidth,
                fixedColumns = _props.fixedColumns,
                fixedHeader = _props.fixedHeader;


            var columnCount = this.getColumnCount();
            var rowCount = this.getRowCount();

            return React.createElement(
                'div',
                { style: fixedHeight ? { height: fixedHeight } : { height: '100%' } },
                React.createElement(
                    AutoSizer,
                    { disableHeight: !fillParentHeight || !!fixedHeight, disableWidth: !fillParentWidth || !!fixedWidth },
                    function (_ref4) {
                        var _ref4$width = _ref4.width,
                            width = _ref4$width === undefined ? fixedWidth : _ref4$width,
                            _ref4$height = _ref4.height,
                            height = _ref4$height === undefined ? fixedHeight : _ref4$height;

                        return React.createElement(MultiGrid, {
                            fixedColumnCount: fixedColumns,
                            fixedRowCount: fixedHeader ? 1 : 0,
                            cellRenderer: _this2.cellRenderer,
                            columnWidth: _this2.getColumnWidth,
                            columnCount: columnCount,
                            height: height,
                            rowHeight: 40,
                            rowCount: rowCount,
                            style: STYLE,
                            styleBottomLeftGrid: STYLE_BOTTOM_LEFT_GRID,
                            styleTopLeftGrid: STYLE_TOP_LEFT_GRID,
                            styleTopRightGrid: STYLE_TOP_RIGHT_GRID,
                            width: width
                        });
                    }
                )
            );
        }
    }]);

    return TableView;
}(React.Component);

process.env.NODE_ENV !== "production" ? TableView.propTypes = {
    // how many columns should be fixed/sticky (counting from the left)
    fixedColumns: PropTypes.number.isRequired,

    // whether the table header should be fixed/sticky
    fixedHeader: PropTypes.bool.isRequired

} : void 0;

TableView.defaultProps = {
    fixedColumns: 0,
    fixedHeader: true
};

export default TableView;