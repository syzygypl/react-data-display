import React, { PropTypes } from 'react';

// works as a data container stores the user-specified properties (like width, label etc.)
export class DataField extends React.Component {
    render() {
        const { field, label, content, group, width } = this.props;

        if (group) {
            // @TODO
            // validate that children elements are present and are indeed DataField
        }

        // regular (i.e. not group) DataField processing

        // check how to redner label and content parts

        return null;
    }
}

DataField.propTypes = {
    // field/key in the dataset
    // can be empty for group DataField
    field: PropTypes.string,

    // field label can be simple string or custom React component
    // in the second case, the label component should implement this interface:
    // ({ rowIndex, columnIndex, rowData, fieldData, viewType: TABLE | LIST }) => ()
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),

    // field content/value can be a string (all cells will have that value) or custom React component
    // similarly to the label prop, custom component should implement this interface:
    // ({ rowIndex, columnIndex, rowData, fieldData, viewType: TABLE | LIST }) => ()
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),

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
    width: PropTypes.number,
};

DataField.defaultProps = {
    group: false,
};

export default DataField;