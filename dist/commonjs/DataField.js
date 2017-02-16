'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataField = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// works as a data container stores the user-specified properties (like width, label etc.)
var DataField = exports.DataField = function (_React$Component) {
    _inherits(DataField, _React$Component);

    function DataField() {
        _classCallCheck(this, DataField);

        return _possibleConstructorReturn(this, (DataField.__proto__ || Object.getPrototypeOf(DataField)).apply(this, arguments));
    }

    _createClass(DataField, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                field = _props.field,
                label = _props.label,
                content = _props.content,
                group = _props.group,
                width = _props.width;


            if (group) {}
            // @TODO
            // validate that children elements are present and are indeed DataField


            // regular (i.e. not group) DataField processing

            // check how to redner label and content parts

            return null;
        }
    }]);

    return DataField;
}(_react2.default.Component);

process.env.NODE_ENV !== "production" ? DataField.propTypes = {
    // field/key in the dataset
    // can be empty for group DataField
    field: _react.PropTypes.string,

    // field label can be simple string or custom React component
    // in the second case, the label component should implement this interface:
    // ({ rowIndex, columnIndex, rowData, fieldData, viewType: TABLE | LIST }) => ()
    label: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),

    // field content/value can be a string (all cells will have that value) or custom React component
    // similarly to the label prop, custom component should implement this interface:
    // ({ rowIndex, columnIndex, rowData, fieldData, viewType: TABLE | LIST }) => ()
    content: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),

    // whether this field groups other DataField sub-components
    group: _react.PropTypes.bool.isRequired,

    // DataField can have children when it's a group and children can only be other DataField components
    // (@TODO: that are not groups themselves)
    /*
    children: PropTypes.oneOfType([
        ...
    ]),
    */

    // in case of TableView, we need to have explicit width values
    width: _react.PropTypes.number
} : void 0;

DataField.defaultProps = {
    group: false
};

exports.default = DataField;