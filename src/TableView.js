import React, { PropTypes } from 'react';
import { AutoSizer, MultiGrid } from 'react-virtualized'; 

// styles from react-virtualized example
const STYLE = {
  border: '1px solid #ddd',
  overflow: 'hidden'
};

const STYLE_BOTTOM_LEFT_GRID = {
  borderRight: '1px solid #aaa',
  backgroundColor: '#f7f7f7',
  boxShadow: '2px 2px 2px #ccc',
};

const STYLE_BOTTOM_RIGHT_GRID = {
};

const STYLE_TOP_LEFT_GRID = {
  borderBottom: '1px solid #aaa',
  borderRight: '1px solid #aaa',
  fontWeight: 'bold',
  boxShadow: '2px 2px 2px #ccc',
};

const STYLE_TOP_RIGHT_GRID = {
  borderBottom: '1px solid #aaa',
  fontWeight: 'bold',
};

// To understand what's going on in the component, start with render() method
// In short, we take the data defined on the DataField inside TableView and use 
// components provided by react-virtualized.

export class TableView extends React.Component {

    // whether or not an element is a group DataField
    isGroupDataField = (element) => element.props && element.props.group && element.props.children;

    // @TODO: add validation:
    // - all child components should be of type DataField
    // - all should have width property declared and if not, should be group with valid DataFields
    // - validation should run only in the DEV mode
    getTableWidth = () => {

        // Default behaviour:
        // just calculate sum of all of DataField components

        const children = this.props.children;

        const getWidthProp = element => element.props.width || 0;
        const isGroup = element => this.isGroupDataField(element);

        // array with the width props values in DataField components
        // in case when DataField is a group (<DataField group>) and has nested other DataFields components
        // iterate over the nested DataFields and sum their widths
        const widthValues = React.Children.map(
            children,
            dataField => (
                isGroup(dataField)
                    ? React.Children.map(dataField.props.children, getWidthProp)
                    : getWidthProp(dataField)
            )
        )

        // sum all values to get the total width
        const totalWidth = widthValues.reduce((prev, curr) => prev + curr, 0);

        return totalWidth;

        // @TODO
        // User-controlled behaviour:
        // width is supplied by the user to the DataDisplay component and then used here
    }

    // @TODO: add support for nested DataFields
    getColumnDataField = (columnIndex) => {

        const { children } = this.props;
        const dataField = React.Children.toArray(children)[columnIndex];

        return dataField;
    }

    // @TODO: add flatten argument for nested DataFields
    getDataFieldElements = () => {
    // getDataFieldElements = (flatten = false) => {
        const { children } = this.props;

        const dataFields = React.Children.map(children, child => child);

        return dataFields;
    }

    // @TODO: add counting for nested DataFields
    getColumnCount = () => {
        const { children } = this.props;

        /*
        const columns = React.Children.map(children, (child) => (
            this.isGroupDataField(child) ? React.Children.count(child) : 1
        ));
        return columns.reduce((curr, prev) => curr + prev, 0);
        */

        return React.Children.count(children);
    }

    getRowCount = () => {
        const { data, showHeader } = this.props;

        return showHeader ? data.length + 1 : data.length;
    }

    // for now, w/o group columns
    getColumnWidth = ({ index }) => {
        const dataField = this.getColumnDataField(index);

        return dataField.props.width;
    }

    // for now, simple renderer w/o subheaders
    cellRenderer = ({
        key,
        columnIndex,
        rowIndex,
        isScrolling,
        isVisible,
        style,
    }) => {
        // use label and content values/components to render header and regular cells

        const { children, data, showScrollPlaceholder, showHeader } = this.props;

        // DataField component describing this cell 
        const dataFieldElement = this.getColumnDataField(columnIndex);
        // @TODO: add validation for presence of the field prop && key in the data
        const fieldKey = dataFieldElement.props.field;

        const content = showHeader && rowIndex === 0 ? dataFieldElement.props.label : (showHeader ? data[rowIndex - 1][fieldKey] : data[rowIndex][fieldKey]);


        // header & subheaders

        /*
        if (showHeader && rowIndex === 0) {
            // render header (label)
            // first, let's check how the label prop is defined on the DataField component for this column

            console.log('dataField');
            console.log(dataField);
        }
        */

        // if no custom content/cell/header component is passed from the user, use the default one
        // like DefaultCell/DefaultContentCell/DefaultHeaderCell


        return (
            <div
                className={''}
                key={key}
                style={style}
            >
                <div style={{ padding: '5px' }}>
                    {/*{columnIndex}, {rowIndex}*/}
                    {content}
                </div>
            </div>
        )
    }

    render() {
        const {
            fillParentWidth,
            fillParentHeight,
            fixedHeight,
            fixedWidth,

            fixedColumns,
            fixedHeader,

            className,
            style,

            styleHeader,
            styleHeaderSticky,
            styleContent,
            styleContentSticky,
        } = this.props;

        const columnCount = this.getColumnCount();
        const rowCount = this.getRowCount();

        const containerStyle = {
            height: fixedHeight || '100%', 
            ...style,
        };

        return (
            <div style={containerStyle} className={className}>
            <AutoSizer disableHeight={!fillParentHeight || !!fixedHeight} disableWidth={!fillParentWidth || !!fixedWidth}>
                {({ width = fixedWidth, height = fixedHeight }) => { 
                    return (
                        <MultiGrid
                            fixedColumnCount={fixedColumns}
                            fixedRowCount={fixedHeader ? 1 : 0}
                            cellRenderer={this.cellRenderer}
                            columnWidth={this.getColumnWidth}
                            columnCount={columnCount}
                            height={height}
                            rowHeight={40}
                            rowCount={rowCount}
                            style={STYLE}
                            styleBottomLeftGrid={styleContentSticky || STYLE_BOTTOM_LEFT_GRID}
                            styleBottomRightGrid={styleContent || STYLE_BOTTOM_RIGHT_GRID}
                            styleTopLeftGrid={styleHeaderSticky || STYLE_TOP_LEFT_GRID}
                            styleTopRightGrid={styleHeader || STYLE_TOP_RIGHT_GRID}
                            width={width}
                        />
                    )
              }}
            </AutoSizer>
            </div>
        );
    }
}

TableView.propTypes = {
    // how many columns should be fixed/sticky (counting from the left)
    fixedColumns: PropTypes.number.isRequired,

    // whether the table header should be fixed/sticky
    fixedHeader: PropTypes.bool.isRequired,

    // children: PropTypes.arrayOf(PropTypes.element),
    // single element OR array of elements (DataFields)

    // add support for using custom className and styles for the container
    className: PropTypes.string,
    style: PropTypes.object,

    styleHeader: PropTypes.object,
    styleHeaderSticky: PropTypes.object,
    styleContent: PropTypes.object,
    styleContentSticky: PropTypes.object,
};

TableView.defaultProps = {
    fixedColumns: 0,
    fixedHeader: true,
};

export default TableView;