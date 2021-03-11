import React from 'react';
import SelectableList from '../SelectableList';

function Form({ content, onSubmit }) {

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" id="oldName" name="oldName" value={content.name}></input>
      <div className="form-group">
        <label htmlFor="name">Username</label>
        <input className="form-control" id="name" defaultValue={content.name} />
      </div>
      <div className="form-group">
        <label htmlFor="realName">Real name</label>
        <input className="form-control" id="realName" defaultValue={content.realName} />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
          defaultValue={content.email}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" id="password"
        placeholder="not changed" />
      </div>

      <SelectableList src='/aums/roles' current={content.roles}>

      </SelectableList>

      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;