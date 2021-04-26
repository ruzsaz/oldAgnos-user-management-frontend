import React, { useState } from 'react';
import SelectableList from '../SelectableList';
import { Button, Form } from "react-bootstrap";

function UserForm({ content, roles, onClose }) {

    const [form, setForm] = useState({ ...content, "oldName": content.name });
    const [deleteUser, setDeleteUser] = useState(false);

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
        setDeleteUser(event.target.checked);
    }

    async function saveUser(userData, callback) {

        const update = (userData.oldName !== "");

        await fetch('/aums/user' + (update ? '/' + userData.oldName : ''), {
            method: (update) ? (deleteUser) ? 'DELETE' : 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(callback)
            .catch(error => console.log("error at saving"))
    }


    function submitForm(event) {
        event.preventDefault(event);
        saveUser(form, () => onClose(true));
    }

    if (content === undefined) {
        return (
            <div>
                Unavailable
            </div>
        )
    }

    return (
        <Form onSubmit={submitForm} id="userForm">

            <input type="hidden" id="oldName" name="oldName" value={content.name}></input>

            <Form.Group controlId="name">
                <Form.Label>Username</Form.Label>
                <Form.Control
                specialrules="nospace"
                    type="text"
                    placeholder="username"
                    value={form.name}
                    onChange={handleChange}
                    disabled={deleteUser}
                />
            </Form.Group>

            <Form.Group controlId="realName">
                <Form.Label>Real Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Real Name"
                    defaultValue={content.realName}
                    onChange={handleChange}
                    disabled={deleteUser}
                />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="user@example.com"
                    defaultValue={content.email}
                    onChange={handleChange}
                    disabled={deleteUser}
                />
            </Form.Group>

            <Form.Group controlId="plainPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder={content.name === undefined ? "set password" : "not changed"}
                    onChange={handleChange}
                    disabled={deleteUser}
                />
            </Form.Group>

            <Form.Group controlId="roles">
                <Form.Label>Group membership</Form.Label>
                <SelectableList
                    src={roles}
                    getSelected={() => form.roles}
                    setSelected={v => setField("roles", v)}
                    disabled={deleteUser}>
                </SelectableList>
            </Form.Group>

            {(form.oldName !== "") ? (
                <Form.Group controlId="delete">
                    <Form.Label>Delete user</Form.Label>
                    <Form.Check
                        type="checkbox"
                        label={"delete user " + form.name}
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

export default UserForm;