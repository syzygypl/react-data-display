import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PropTypes } from 'react';
import { AutoSizer } from 'react-virtualized';

import TableView from './TableView.js';
import ListView from './ListView.js';

export var DataDisplay = function (_React$Component) {
    _inherits(DataDisplay, _React$Component);

    function DataDisplay() {
        _classCallCheck(this, DataDisplay);

        return _possibleConstructorReturn(this, (DataDisplay.__proto__ || _Object$getPrototypeOf(DataDisplay)).apply(this, arguments));
    }

    _createClass(DataDisplay, [{
        key: 'render',
        value: function render() {
            // common props for both TableView and ListView
            var _props = this.props,
                data = _props.data,
                width = _props.width,
                fillParentWidth = _props.fillParentWidth,
                scrollToRow = _props.scrollToRow,
                showScrollPlaceholder = _props.showScrollPlaceholder;


            var children = this.props.children;

            // we assume that there's just one child component
            var childComponent = React.Children.only(children);

            var viewComponent = void 0; // TableView | ListView

            // @TODO
            // consider validation by using (childComponent.type === TableView) rather than string comparison

            if (childComponent.type === TableView) {
                // data will be showed as a regular table
                // TableView-specific props
                var _props2 = this.props,
                    height = _props2.height,
                    fillParentHeight = _props2.fillParentHeight,
                    stickyColumns = _props2.stickyColumns,
                    showHeader = _props2.showHeader,
                    stickyHeader = _props2.stickyHeader,
                    scrollToColumn = _props2.scrollToColumn;


                viewComponent = React.cloneElement(childComponent, {
                    data: data,
                    fixedHeight: height,
                    fillParentHeight: fillParentHeight,
                    fixedWidth: width,
                    fillParentWidth: fillParentWidth,
                    stickyColumns: stickyColumns,
                    showHeader: showHeader,
                    stickyHeader: stickyHeader,
                    showScrollPlaceholder: showScrollPlaceholder
                });
            } else if (childComponent.type === ListView) {
                // data will be showed as a list
                var _props3 = this.props,
                    _height = _props3.height,
                    _fillParentHeight = _props3.fillParentHeight,
                    _stickyColumns = _props3.stickyColumns,
                    _showHeader = _props3.showHeader,
                    _stickyHeader = _props3.stickyHeader,
                    _scrollToColumn = _props3.scrollToColumn;


                viewComponent = React.cloneElement(childComponent, {
                    data: data,
                    fixedHeight: _height,
                    fillParentHeight: _fillParentHeight,
                    fixedWidth: width,
                    fillParentWidth: fillParentWidth,
                    stickyColumns: _stickyColumns,
                    showHeader: _showHeader,
                    stickyHeader: _stickyHeader,
                    showScrollPlaceholder: showScrollPlaceholder
                });
            } else {
                // throw error, when child components are neither TableView or ListView
                throw new Error("Child component of DataDisplay can only be TableView or ListView");
            }

            return React.createElement(
                'div',
                { style: { height: '100%' } },
                viewComponent
            );
        }
    }]);

    return DataDisplay;
}(React.Component);

process.env.NODE_ENV !== "production" ? DataDisplay.propTypes = {
    // Array with the data to be displayed in the table
    data: PropTypes.array.isRequired,

    // Number of the sticky columns (e.g. - for 2 - first two columns will be sticky/fixed when scrolling horizontally)
    stickyColumns: PropTypes.number.isRequired,

    // Whether the header (first row) should be displayed
    showHeader: PropTypes.bool.isRequired,

    // Whether table header should be sticky/fixed when scrolling vertically
    stickyHeader: PropTypes.bool.isRequired,

    // Fixed table height
    // **IMPORTANT**
    // When present, this prop has priority over fillParentHeight
    height: PropTypes.number,

    // Fixed tablewidth 
    // **IMPORTANT**
    // When present, this prop has priority over fillParentWidth
    width: PropTypes.number,

    // Whether table should fill its parent height/width
    // It's important to notice that this won't stretch the parent component, so the safe option is to use block element as a parent
    // This feature is based on react-virtualized AutoSizer, more info here:
    // https://github.com/bvaughn/react-virtualized/blob/master/docs/usingAutoSizer.md
    fillParentHeight: PropTypes.bool.isRequired,
    fillParentWidth: PropTypes.bool.isRequired,

    // Index of the row that should be on the top
    scrollToRow: PropTypes.number.isRequired,

    // Index of the column that should be on the left
    scrollToColumn: PropTypes.number.isRequired,

    // Whether to show placeholder in cells when scrolling
    // Useful when cells have complex render (e.g. graphs)
    showScrollPlaceholder: PropTypes.bool.isRequired

} : void 0;

DataDisplay.defaultProps = {
    data: [],

    stickyColumns: 0,

    showHeader: true,
    stickyHeader: false,

    fillParentHeight: true,
    fillParentWidth: true,

    scrollToRow: 0,
    scrollToColumn: 0,

    showScrollPlaceholder: false
};

export default DataDisplay;