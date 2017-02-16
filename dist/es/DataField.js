import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PropTypes } from 'react';

// works as a data container stores the user-specified properties (like width, label etc.)
export var DataField = function (_React$Component) {
    _inherits(DataField, _React$Component);

    function DataField() {
        _classCallCheck(this, DataField);

        return _possibleConstructorReturn(this, (DataField.__proto__ || _Object$getPrototypeOf(DataField)).apply(this, arguments));
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
}(React.Component);

process.env.NODE_ENV !== "production" ? DataField.propTypes = {
    // field/key in the dataset
    // can be empty for group DataField
    field: PropTypes.string,

    // field label can be simple string or custom React component
    // in the second case, the label component should implement this interface:
    // ({ rowIndex, columnIndex, rowData, fieldData, viewType: TABLE | LIST }) => ()
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

    // field content/value can be a string (all cells will have that value) or custom React component
    // similarly to the label prop, custom component should implement this interface:
    // ({ rowIndex, columnIndex, rowData, fieldData, viewType: TABLE | LIST }) => ()
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

    // whether this field groups other DataField sub-components
    group: PropTypes.bool.isRequired,

    // DataField can have children when it's a group and children can only be other DataField components
    // (@TODO: that are not groups themselves)
    /*
    children: PropTypes.oneOfType([
        ...
    ]),
    */

    // in case of TableView, we need to have explicit width values
    width: PropTypes.number
} : void 0;

DataField.defaultProps = {
    group: false
};

export default DataField;