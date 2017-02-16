'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataDisplay = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualized = require('react-virtualized');

var _TableView = require('./TableView.js');

var _TableView2 = _interopRequireDefault(_TableView);

var _ListView = require('./ListView.js');

var _ListView2 = _interopRequireDefault(_ListView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataDisplay = exports.DataDisplay = function (_React$Component) {
    _inherits(DataDisplay, _React$Component);

    function DataDisplay() {
        _classCallCheck(this, DataDisplay);

        return _possibleConstructorReturn(this, (DataDisplay.__proto__ || Object.getPrototypeOf(DataDisplay)).apply(this, arguments));
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
            var childComponent = _react2.default.Children.only(children);

            var viewComponent = void 0; // TableView | ListView

            // @TODO
            // consider validation by using (childComponent.type === TableView) rather than string comparison

            if (childComponent.type === _TableView2.default) {
                // data will be showed as a regular table
                // TableView-specific props
                var _props2 = this.props,
                    height = _props2.height,
                    fillParentHeight = _props2.fillParentHeight,
                    stickyColumns = _props2.stickyColumns,
                    showHeader = _props2.showHeader,
                    stickyHeader = _props2.stickyHeader,
                    scrollToColumn = _props2.scrollToColumn;


                viewComponent = _react2.default.cloneElement(childComponent, {
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
            } else if (childComponent.type === _ListView2.default) {
                // data will be showed as a list
                var _props3 = this.props,
                    _height = _props3.height,
                    _fillParentHeight = _props3.fillParentHeight,
                    _stickyColumns = _props3.stickyColumns,
                    _showHeader = _props3.showHeader,
                    _stickyHeader = _props3.stickyHeader,
                    _scrollToColumn = _props3.scrollToColumn;


                viewComponent = _react2.default.cloneElement(childComponent, {
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

            return _react2.default.createElement(
                'div',
                { style: { height: '100%' } },
                viewComponent
            );
        }
    }]);

    return DataDisplay;
}(_react2.default.Component);

process.env.NODE_ENV !== "production" ? DataDisplay.propTypes = {
    // Array with the data to be displayed in the table
    data: _react.PropTypes.array.isRequired,

    // Number of the sticky columns (e.g. - for 2 - first two columns will be sticky/fixed when scrolling horizontally)
    stickyColumns: _react.PropTypes.number.isRequired,

    // Whether the header (first row) should be displayed
    showHeader: _react.PropTypes.bool.isRequired,

    // Whether table header should be sticky/fixed when scrolling vertically
    stickyHeader: _react.PropTypes.bool.isRequired,

    // Fixed table height
    // **IMPORTANT**
    // When present, this prop has priority over fillParentHeight
    height: _react.PropTypes.number,

    // Fixed tablewidth 
    // **IMPORTANT**
    // When present, this prop has priority over fillParentWidth
    width: _react.PropTypes.number,

    // Whether table should fill its parent height/width
    // It's important to notice that this won't stretch the parent component, so the safe option is to use block element as a parent
    // This feature is based on react-virtualized AutoSizer, more info here:
    // https://github.com/bvaughn/react-virtualized/blob/master/docs/usingAutoSizer.md
    fillParentHeight: _react.PropTypes.bool.isRequired,
    fillParentWidth: _react.PropTypes.bool.isRequired,

    // Index of the row that should be on the top
    scrollToRow: _react.PropTypes.number.isRequired,

    // Index of the column that should be on the left
    scrollToColumn: _react.PropTypes.number.isRequired,

    // Whether to show placeholder in cells when scrolling
    // Useful when cells have complex render (e.g. graphs)
    showScrollPlaceholder: _react.PropTypes.bool.isRequired

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

exports.default = DataDisplay;