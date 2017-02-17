import React, { PropTypes } from 'react';
import { AutoSizer, List, CellMeasurer } from 'react-virtualized'; 


export class ListView extends React.Component {

    getColumnCount = () => {
        return React.Children.count(this.props.children);
    }

    getRowCount = () => {
        return this.props.data.length;
    }

    // for now, simple renderer w/o subheaders
    rowRenderer = ({
        key,
        style,
        index,
        isScrolling,
        isVisible,
    }) => {
        // @TODO: use data structure defined by using DataField elements

        const fields = Object.keys(this.props.data[index]);

        const { children } = this.props;

        const rowContent = React.Children.map(children, (field, idx) => {

            return (
                <div key={idx}> 
                    <strong>{field.props.label}</strong>
                    <div>
                        {this.props.data[index][field.props.field]}
                    </div>
                </div>
            )
        });

        // @TODO add support for custom "row"/list element
        return (
            <div key={key} style={{...style, borderBottom: '1px solid black' }}> 
                <div style={{ padding: '10px 0' }}>
                    {rowContent}
                </div>
            </div>
        );
    }

    render() {

        const {
            fillParentWidth,
            fillParentHeight,
            fixedHeight,
            fixedWidth,
            style,
            className,
        } = this.props;

        const rowCount = this.getRowCount();


        const containerStyle = {
            height: fixedHeight || '100%', 
            ...style,
        };

        return (
            <div style={containerStyle} className={className}>
                <CellMeasurer cellRenderer={({ rowIndex, ...rest }) => this.rowRenderer({ index: rowIndex, ...rest })} rowCount={rowCount} columnCount={1}>
                    {({ getRowHeight }) => {
                        return (
                            <List
                                height={250}
                                rowCount={rowCount}
                                rowHeight={getRowHeight}
                                rowRenderer={this.rowRenderer}
                                width={500}
                            />
                        )
                    }}

                </CellMeasurer>
            </div>
        );
    }
}

ListView.propTypes = {
    // children: PropTypes.arrayOf(PropTypes.element),
    // single element OR array of elements (DataFields)

    // add support for using custom className and styles for the container
    className: PropTypes.string,
    style: PropTypes.object,
};

ListView.defaultProps = {
};

export default ListView;