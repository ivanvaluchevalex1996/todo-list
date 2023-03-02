import React, { useState } from "react";
import TaskList from "../TaskList/TaskList";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import Footer from "../Footer/Footer";
import "./App.css";
import { nanoid } from "nanoid";

function App() {
  const createTodoItem = (label) => ({
    label,
    done: false,
    edit: false,
    id: nanoid(),
    date: new Date(),
  });

  const filterTask = (items, allActiveDone) => {
    switch (allActiveDone) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  const onToggleProperty = (arr, id, propName) =>
    arr.map((el) => (el.id === id ? { ...el, [propName]: !el[propName] } : el));

  const [data, setData] = useState([
    createTodoItem("Drink"),
    createTodoItem("Sing"),
    createTodoItem("Ping"),
  ]);

  // const [filterState, setFilterState] = [""];
  const [filtered, setFiltered] = useState("all");

  const addItem = (text) => {
    if (text.trim()) {
      const obj = createTodoItem(text);
      const now = [...data, obj];
      setData([...now]);
    }
  };

  const deleteItem = (id) => {
    const now = data.filter((el) => el.id !== id);
    setData(now);
  };

  const onToggleDone = (id) => {
    setData(onToggleProperty(data, id, "done"));
  };
  const onToggleEdit = (id) => {
    setData(onToggleProperty(data, id, "edit"));
  };

  const onFilterChange = (name) => {
    setFiltered(name);
  };

  const clearCompleted = () => {
    const now = data.filter((el) => !el.done);
    setData(now);
  };

  const visibleItems = filterTask(data, filtered);
  const leftItems = data.filter((el) => !el.done).length;
  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <section className="main">
        <TaskList
          todos={visibleItems}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onToggleEdit={onToggleEdit}
          addItem={addItem}
        />
        <Footer
          filtered={filtered}
          onFilterChange={onFilterChange}
          count={leftItems}
          clearCompleted={clearCompleted}
          todos={visibleItems}
        />
      </section>
    </section>
  );
}

export default App;
