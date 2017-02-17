import React from 'react';
import { DataDisplay, DataField, TableView, ListView } from '../index';

const data = [
    {id: 'id-1', name: 'name-1', test: 'test-1'},
    {id: 'id-2', name: 'name-2', test: 'test-2'},
    {id: 'id-3', name: 'name-3', test: 'test-3'},
    {id: 'id-4', name: 'name-4', test: 'test-4'},
    {id: 'id-5', name: 'name-5', test: 'test-5'},
    // more items
];

export default class App extends React.Component {
    render() {
        return (
            <DataDisplay data={data} height={200}>
                <TableView fixedColumns={1}>
                {/*<ListView>*/}
                    <DataField field="id" label="ID" width={100} />
                    <DataField field="name" label="NAME" width={150} />
                    <DataField field="test" label="TEST" width={250} />
                    <DataField field="test" label="TEST (again)" width={200} />
                {/*<ListView>*/}
                </TableView>
            </DataDisplay>
        );
    }
}
