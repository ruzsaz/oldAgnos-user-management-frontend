import { Container, Row, Col, Form } from "react-bootstrap";
import React from 'react';

function SelectableList({ src, getSelected, setSelected, disabled }) {

    function handleChange(event) {
        const element = event.target.value;
        if (event.target.checked) {
            setSelected([...getSelected(), element]);
        } else {
            setSelected(getSelected().filter(e => e !== element));
        }
    }

    return (

        <Container>
            <Row xs lg={4}>
                {src.map(group =>
                    <Col key={group.name}>
                        <Form.Check
                            id={"groupElement_" + group.name}
                            type="checkbox"                            
                            value={group.name}
                            label={group.name}
                            defaultChecked={getSelected().some(e => e === group.name)}
                            onChange={handleChange}
                            disabled={disabled} />
                    </Col>
                )}
            </Row>
        </Container>

    )
}

export default SelectableList;