import React, { useState } from "react";
import "./NewTaskForm.css";

function NewTaskForm(props) {
  const { addItem } = props;
  const [label, setLabel] = useState("");
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const onSubmit = (event) => {
    event.preventDefault();
    addItem(label, minute, second);
    setLabel("");
  };

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };
  const onMinuteChange = (e) => {
    setMinute(e.target.value);
  };
  const onSecondChange = (e) => {
    setSecond(e.target.value);
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="Task"
          onChange={onLabelChange}
          value={label}
        />
        <input
          type="number"
          min="0"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={onMinuteChange}
        />
        <input
          type="number"
          min="0"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={onSecondChange}
        />
        <button type="submit" className="button__form" />
      </form>
    </header>
  );
}

export default NewTaskForm;
