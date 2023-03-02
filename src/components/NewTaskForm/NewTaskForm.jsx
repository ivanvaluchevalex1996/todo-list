import React, { useState } from "react";
import "./NewTaskForm.css";

function NewTaskForm(props) {
  const { addItem } = props;
  const [label, setLabel] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    addItem(label);
    setLabel("");
  };

  const onLableChange = (e) => {
    setLabel(e.target.value);
  };
  return (
    <header className="header">
      <form className="header" onSubmit={onSubmit}>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={onLableChange}
          value={label}
        />
      </form>
    </header>
  );
}

export default NewTaskForm;
