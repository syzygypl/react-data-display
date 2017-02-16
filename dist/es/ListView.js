import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PropTypes } from 'react';
import { AutoSizer, List, CellMeasurer } from 'react-virtualized';

export var ListView = function (_React$Component) {
    _inherits(ListView, _React$Component);

    function ListView() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ListView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListView.__proto__ || _Object$getPrototypeOf(ListView)).call.apply(_ref, [this].concat(args))), _this), _this.getColumnCount = function () {
            return React.Children.count(_this.props.children);
        }, _this.getRowCount = function () {
            return _this.props.data.length;
        }, _this.rowRenderer = function (_ref2) {
            var key = _ref2.key,
                style = _ref2.style,
                index = _ref2.index,
                isScrolling = _ref2.isScrolling,
                isVisible = _ref2.isVisible;

            // @TODO: use data structure defined by using DataField elements

            var fields = _Object$keys(_this.props.data[index]);

            var children = _this.props.children;


            var rowContent = React.Children.map(children, function (field, idx) {

                return React.createElement(
                    'div',
                    { key: idx },
                    React.createElement(
                        'strong',
                        null,
                        field.props.label
                    ),
                    React.createElement(
                        'div',
                        null,
                        _this.props.data[index][field.props.field]
                    )
                );
            });

            // @TODO add support for custom "row"/list element
            return React.createElement(
                'div',
                { key: key, style: _extends({}, style, { borderBottom: '1px solid black' }) },
                React.createElement(
                    'div',
                    { style: { padding: '10px 0' } },
                    rowContent
                )
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // for now, simple renderer w/o subheaders


    _createClass(ListView, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                fillParentWidth = _props.fillParentWidth,
                fillParentHeight = _props.fillParentHeight,
                fixedHeight = _props.fixedHeight,
                fixedWidth = _props.fixedWidth;


            var rowCount = this.getRowCount();

            return React.createElement(
                'div',
                { style: { height: '100%' } },
                React.createElement(
                    CellMeasurer,
                    { cellRenderer: function cellRenderer(_ref3) {
                            var rowIndex = _ref3.rowIndex,
                                rest = _objectWithoutProperties(_ref3, ['rowIndex']);

                            return _this2.rowRenderer(_extends({ index: rowIndex }, rest));
                        }, rowCount: rowCount, columnCount: 1 },
                    function (_ref4) {
                        var getRowHeight = _ref4.getRowHeight;

                        return React.createElement(List, {
                            height: 250,
                            rowCount: rowCount,
                            rowHeight: getRowHeight,
                            rowRenderer: _this2.rowRenderer,
                            width: 500
                        });
                    }
                )
            );
        }
    }]);

    return ListView;
}(React.Component);

process.env.NODE_ENV !== "production" ? ListView.propTypes = {
    // children: PropTypes.arrayOf(PropTypes.element),
    // single element OR array of elements (DataFields)
} : void 0;

ListView.defaultProps = {};

export default ListView;