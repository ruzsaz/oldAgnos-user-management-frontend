import React from "react";
import Item from './Item.js';
import { Table } from "react-bootstrap";



function URList({ data, valListAccessor, onElementClick }) {

    return (
        <Table bordered hover size="sm" >
            <tbody>
                {data.map(entry =>
                    <Item
                        key={entry.name}
                        name={entry.name}
                        value={entry[valListAccessor].sort().join(', ')}
                        showModal={() => { onElementClick(entry) }}>
                    </Item>
                )}
            </tbody>
        </Table>
    )
}

export default URList;