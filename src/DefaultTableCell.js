import React, { Component } from 'react';

const DefaultTableCell = ({ cellValue, rowIndex, columnIndex }) => {
    return (
        <div style={{ padding: '5px' }}>
            {cellValue}
        </div>
    );
}

export default DefaultTableCell;