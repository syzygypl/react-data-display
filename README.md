# react-data-display

This is a **work in progress**, API **will** most likely change.

`react-data-display` is build upon fantastic `react-virtualized` library. We provide simple and clear abstraction layer
for defining the data model and data presentation layer. You describe your data using `DataField` components, provide data
to the `DataDisplay` component and use preferred view component (at this point `TableView` and `ListView` components are available).

Plans for the very near future:

* add support for nested `<DataField>` components ("subheaders")
* improve `<ListView>` implementation
* improve everything regarding width/height (fixed values and auto-sizing/filling the parent component sizes)
* add simple default styles
* add support for style customization
* implement support for custom label and content/"cell" components
* implement redux-connected version of the `<DataDisplay>`

Later improvements:

* make generic `View` component that `TableView` and `ListView` (and later possibly other) can inherit. Such component
would contain common logic/utils, e.g. for processing `<DataField>` components

* improve build setup (esp. for npm publishing)

## Notes

Build configuration is copied from the react-virtualized.

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
