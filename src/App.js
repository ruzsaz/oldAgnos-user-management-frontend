import './App.css';
import React from "react";
import Panel from './Panel'
import { useHistory } from "react-router-dom";

function App() {

  const update = true;
  let history = useHistory();

  async function handleSubmit(userObject, oldName) {    

    try {
    await fetch('/aums/user' + (update ? '/' + oldName : ''), {
      method: (update) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObject),
    })
  } catch (error) {
    console.log("error at saving")
  }
    //.then(response => { alert(response); return response.json(); });
    console.log(history);
    history.push('/index.js');
  }

  function onUserEditSubmit(event) {
    console.log('ffff')
    event.preventDefault(event);
    const user = {};
    const oldName = event.target.oldName.value;
    user.name = event.target.name.value;
    user.email = event.target.email.value;
    user.realName = event.target.realName.value;
    user.plainPassword = event.target.password.value;
    user.permanent = false;
    console.log(event.target);
    const options = Array.from(event.target.getElementsByClassName('selectableList'));    
    user.roles = options.filter(a => a.checked).map(a => a.name);
    console.log(oldName, user, user.name)
    handleSubmit(user, oldName);
  };

  return (
    <div className="App">

      <Panel title="Users" src='/aums/users' onSubmit={onUserEditSubmit}>

      </Panel>

    </div>
  );
}

export default App;
