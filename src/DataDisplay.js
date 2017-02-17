import React, { PropTypes } from 'react';
import { AutoSizer } from 'react-virtualized';

import TableView from './TableView.js';
import ListView from './ListView.js';


export class DataDisplay extends React.Component {
    render() {
        // common props for both TableView and ListView
        const { data, width, fillParentWidth, scrollToRow, showScrollPlaceholder, style, className } = this.props;

        const children = this.props.children;

        // we assume that there's just one child component
        const childComponent = React.Children.only(children);

        let viewComponent; // TableView | ListView

        // @TODO
        // consider validation by using (childComponent.type === TableView) rather than string comparison

        if (childComponent.type === TableView) {
            // data will be showed as a regular table
            // TableView-specific props
            const { height, fillParentHeight, stickyColumns, showHeader, stickyHeader, scrollToColumn } = this.props;

            viewComponent = React.cloneElement(
                childComponent,
                {
                    data,
                    fixedHeight: height,
                    fillParentHeight,
                    fixedWidth: width,
                    fillParentWidth,
                    stickyColumns,
                    showHeader,
                    stickyHeader,
                    showScrollPlaceholder,
                }
            );
        }

        else if (childComponent.type === ListView) {
            // data will be showed as a list
            const { height, fillParentHeight, stickyColumns, showHeader, stickyHeader, scrollToColumn } = this.props;

            viewComponent = React.cloneElement(
                childComponent,
                {
                    data,
                    fixedHeight: height,
                    fillParentHeight,
                    fixedWidth: width,
                    fillParentWidth,
                    stickyColumns,
                    showHeader,
                    stickyHeader,
                    showScrollPlaceholder,
                }
            );
        }

        else {
            // throw error, when child components are neither TableView or ListView
            throw new Error("Child component of DataDisplay can only be TableView or ListView");
        }

        const containerStyle = {
            height: '100%', 
            ...style,
        };

        return (
            <div style={containerStyle} className={className}>
                {viewComponent}
            </div>
        );
    }
}

DataDisplay.propTypes = {
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
    showScrollPlaceholder: PropTypes.bool.isRequired,

    // @TODO: add custom validation for children elements
    // children: 

    // add support for using custom className and styles for the container
    style: PropTypes.object,
    className: PropTypes.string,
};


DataDisplay.defaultProps = {
    data: [],

    stickyColumns: 0,

    showHeader: true,
    stickyHeader: false,

    fillParentHeight: true,
    fillParentWidth: true,

    scrollToRow: 0,
    scrollToColumn: 0,

    showScrollPlaceholder: false,
};

export default DataDisplay;