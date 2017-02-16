# react-data-display
(Work in Progress/Experimental) Small library based on the react-virtualized for displaying data in different ways (e.g. regular table or list)

## Notes

Build configuration is yet to be added

## Basic Usage Example

```jsx
import React from 'react';
import { DataDisplay, DataField, TableView, ListView } from 'react-data-display';

const data = [
    {id: 'id-1', name: 'name-1', test: 'test-1'},
    {id: 'id-2', name: 'name-2', test: 'test-2'},
    {id: 'id-3', name: 'name-3', test: 'test-3'},
    {id: 'id-4', name: 'name-4', test: 'test-4'},
    {id: 'id-5', name: 'name-5', test: 'test-5'},
    // more items
];

export class DataTableExample extends React.Component {
    render() {
        return (
            <DataDisplay data={data} height={200}>
                <TableView fixedColumns={1}>
                    <DataField field="id" label="ID" width={100} />
                    <DataField field="name" label="NAME" width={150} />
                    <DataField field="test" label="TEST" width={250} />
                    <DataField field="test" label="TEST (again)" width={200} />
                </TableView>
            </DataDisplay>
        );
    }
}

export class DataListExample extends React.Component {
    render() {
        return (
            <DataDisplay data={data} height={200}>
                <ListView>
                    <DataField field="id" label="ID" />
                    <DataField field="name" label="NAME" />
                    <DataField field="test" label="TEST" />
                    <DataField field="test" label="TEST (again)" />
                </ListView>
            </DataDisplay>
        );
    }
}

```
