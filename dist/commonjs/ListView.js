'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ListView = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualized = require('react-virtualized');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListView = exports.ListView = function (_React$Component) {
    _inherits(ListView, _React$Component);

    function ListView() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ListView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListView.__proto__ || Object.getPrototypeOf(ListView)).call.apply(_ref, [this].concat(args))), _this), _this.getColumnCount = function () {
            return _react2.default.Children.count(_this.props.children);
        }, _this.getRowCount = function () {
            return _this.props.data.length;
        }, _this.rowRenderer = function (_ref2) {
            var key = _ref2.key,
                style = _ref2.style,
                index = _ref2.index,
                isScrolling = _ref2.isScrolling,
                isVisible = _ref2.isVisible;

            // @TODO: use data structure defined by using DataField elements

            var fields = Object.keys(_this.props.data[index]);

            var children = _this.props.children;


            var rowContent = _react2.default.Children.map(children, function (field, idx) {

                return _react2.default.createElement(
                    'div',
                    { key: idx },
                    _react2.default.createElement(
                        'strong',
                        null,
                        field.props.label
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _this.props.data[index][field.props.field]
                    )
                );
            });

            // @TODO add support for custom "row"/list element
            return _react2.default.createElement(
                'div',
                { key: key, style: _extends({}, style, { borderBottom: '1px solid black' }) },
                _react2.default.createElement(
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

            return _react2.default.createElement(
                'div',
                { style: { height: '100%' } },
                _react2.default.createElement(
                    _reactVirtualized.CellMeasurer,
                    { cellRenderer: function cellRenderer(_ref3) {
                            var rowIndex = _ref3.rowIndex,
                                rest = _objectWithoutProperties(_ref3, ['rowIndex']);

                            return _this2.rowRenderer(_extends({ index: rowIndex }, rest));
                        }, rowCount: rowCount, columnCount: 1 },
                    function (_ref4) {
                        var getRowHeight = _ref4.getRowHeight;

                        return _react2.default.createElement(_reactVirtualized.List, {
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
}(_react2.default.Component);

process.env.NODE_ENV !== "production" ? ListView.propTypes = {
    // children: PropTypes.arrayOf(PropTypes.element),
    // single element OR array of elements (DataFields)
} : void 0;

ListView.defaultProps = {};

exports.default = ListView;