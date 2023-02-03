import React from "react";
import Task from "../Task/Task";
import "./TaskList.css";

function TaskList({ todos, onDeleted, onToggleDone, addItem }) {
  const elem = todos.map((item) => (
    <Task
      key={item.id}
      label={item.label}
      date={item.date}
      onDeleted={() => {
        onDeleted(item.id);
      }}
      onToggleDone={() => {
        onToggleDone(item.id);
      }}
      done={item.done}
      addItem={addItem}
    />
  ));
  return <ul className="todo-list">{elem}</ul>;
}

export default TaskList;
