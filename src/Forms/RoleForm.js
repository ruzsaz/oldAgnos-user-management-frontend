import React, { useState } from 'react';
import SelectableList from '../SelectableList';
import { Button, Form } from "react-bootstrap";

function RoleForm({ content, users, token, onClose }) {

    const [form, setForm] = useState({ ...content, "oldName": content.name });
    const [del, setDel] = useState(false);

    function setField(field, value) {
        setForm({
            ...form,
            [field]: value
        })
    }

    function handleChange(event) {                
        const fieldName = event.target.id;
        const fieldVal = removeSpaceIfRequired(event.target, event.target.value);
        setField(fieldName, fieldVal);
    }

    function removeSpaceIfRequired(element, value) {
        if (element.getAttribute("specialrules") === "nospace") {
            return value.replace(/\s/g, '');
        }
        return value;
    }

    function handleDeleteChange(event) {
        setDel(event.target.checked);
    }

    async function save(data, callback) {

        const update = (data.oldName !== "");

        await fetch('/aum/role' + (update ? '/' + data.oldName : ''), {
            method: (update) ? (del) ? 'DELETE' : 'PUT' : 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(callback)
            .catch(error => console.log("error at saving"))
    }


    function submitForm(event) {
        event.preventDefault(event);
        save(form, () => onClose(true));
    }

    if (content === undefined) {
        return (
            <div>
                Unavailable
            </div>
        )
    }

    return (
        <Form onSubmit={submitForm} id="roleForm">

            <Form.Group controlId="name">
                <Form.Label>Role name</Form.Label>
                <Form.Control
                    specialrules="nospace"
                    type="text"
                    placeholder="rolename"
                    value={form.name}
                    onChange={handleChange}
                    disabled={del}
                />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="description"
                    defaultValue={content.description}
                    onChange={handleChange}
                    disabled={del}
                />
            </Form.Group>

            <Form.Group controlId="users">
                <Form.Label>Members</Form.Label>
                <SelectableList
                    src={users}
                    getSelected={() => form.users}
                    setSelected={v => setField("users", v)}
                    disabled={del}>
                </SelectableList>
            </Form.Group>

            {(form.oldName !== "") ? (
                <Form.Group controlId="delete">
                    <Form.Label>Delete role</Form.Label>
                    <Form.Check
                        type="checkbox"
                        label={"delete role " + form.name}
                        onChange={handleDeleteChange}
                        disabled={form.permanent}
                    />
                </Form.Group>
            ) : (<div></div>)}


            <Button variant="primary" type="submit" block>
                Submit
        </Button>
        </Form>
    );

};

export default RoleForm;