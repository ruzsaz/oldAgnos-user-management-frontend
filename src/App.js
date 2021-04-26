import './App.scss';
import React, { useState, useEffect, Fragment } from "react";
import URList from './URList';
import { Modal, Card } from "react-bootstrap";
import UserForm from './Forms/UserForm';
import RoleForm from './Forms/RoleForm';
import Login from './login';


function App() {

    const [token, setToken] = useState(undefined);
    const [reloadIfChanged, setReloadRequired] = useState(true);
    const [userList, setUserList] = useState(undefined);
    const [roleList, setRoleList] = useState(undefined);
    const [selectedUser, setSelectedUser] = useState(undefined);
    const [selectedRole, setSelectedRole] = useState(undefined);

    const userSrc = "/aum/users";
    const emptyUser = {
        "name": "",
        "email": "",
        "realName": "",
        "plainPassword": "",
        "permanent": false,
        "roles": []
    }
    const emptyRole = {
        "name": "",
        "description": "",
        "permanent": false,
        "users": []
    }


    const roleSrc = "/aum/roles";


    function handleCloseModal(forceReload) {
        setSelectedUser(undefined);
        setSelectedRole(undefined);
        if (forceReload) {
            requestReload();
        }
    };

    function onUserClick(user) {
        setSelectedUser(user);
    }

    function onRoleClick(role) {
        setSelectedRole(role);
    }

    function requestReload() {
        setReloadRequired(!reloadIfChanged);
    }

    // User, Groups download and sort function
    async function fetchData(src, token, setResult, comparision) {
        try {
            const response = await fetch(src, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            if (response.ok) {
                const body = await response.json();
                if (comparision) {
                    body.sort(comparision);
                }
                setResult(body)
            } else {
                console.error(src + ' not found.');
                setToken(undefined);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Load users' data
    useEffect(() => {
        fetchData(userSrc, token, setUserList, (a, b) => (a.name > b.name) ? 1 : -1);
    }, [userSrc, reloadIfChanged, token]);

    // Load roles' data
    useEffect(() => {
        fetchData(roleSrc, token, setRoleList, (a, b) => (a.name > b.name) ? 1 : -1);
    }, [roleSrc, reloadIfChanged, token]);

    if (token === undefined) {
        return (
            <Login setTokenFunction={setToken} />
        )
    }

    // Loading... message before data arrived
    if (userList === undefined || roleList === undefined) {
        return (
            <p>Loading...</p>
        )
    }



    return (
        <Fragment>

            <div className="App">

                <Card>
                    <Card.Header>Users</Card.Header>
                    <Card.Body>
                        <URList data={userList} valListAccessor="roles" onElementClick={onUserClick} />
                        <Card.Link href="#" onClick={() => { onUserClick(emptyUser) }}>Add new user</Card.Link>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header>Roles</Card.Header>
                    <Card.Body>
                        <URList data={roleList} valListAccessor="users" onElementClick={onRoleClick} />
                        <Card.Link href="#" onClick={() => { onRoleClick(emptyRole) }}>Add new role</Card.Link>
                    </Card.Body>
                </Card>

            </div>

            <Modal animation={false} backdrop="static" size="lg" keyboard="false" show={selectedUser !== undefined} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{(selectedUser && selectedUser.name) ? 'Modify user ' + selectedUser.name : 'Create new user'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserForm content={selectedUser} roles={roleList} token={token} onClose={handleCloseModal} />
                </Modal.Body>
            </Modal>

            <Modal animation={false} backdrop="static" size="lg" keyboard="false" show={selectedRole !== undefined} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{(selectedRole && selectedRole.name) ? 'Modify role ' + selectedRole.name : 'Create new role'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RoleForm content={selectedRole} users={userList} token={token} onClose={handleCloseModal} />
                </Modal.Body>
            </Modal>

        </Fragment>
    );
}

export default App;
