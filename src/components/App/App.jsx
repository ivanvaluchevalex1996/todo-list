import React from "react";
import TaskList from "../TaskList/TaskList";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import Footer from "../Footer/Footer";
import "./App.css";
import { nanoid } from "nanoid";

class App extends React.Component {
  static createTodoItem = (label) => ({
    label,
    done: false,
    edit: false,
    id: nanoid(),
    date: new Date(),
  });

  static filterTask(items, allActiveDone) {
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
  }

  // функция чтобы не прописывать дважды одно и то же по типу el.done = !el.done, el.edit = !el.edit
  // в стейте нельзя менять старй массив, пользуемся map, он создает новый
  static onToggleProperty(arr, id, propName) {
    return arr.map((el) => (el.id === id ? { ...el, [propName]: !el[propName] } : el));
  }

  constructor(props) {
    super(props);

    this.state = {
      todoData: [
        App.createTodoItem("Drink"),
        App.createTodoItem("Sing"),
        App.createTodoItem("Ping"),
      ],
      filterState: "",
    };
  }

  addItem = (text) => {
    if (text.trim()) {
      const obj = App.createTodoItem(text.trim());
      this.setState(({ todoData }) => {
        const now = [...todoData, obj];
        return {
          todoData: now,
        };
      });
    }
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: App.onToggleProperty(todoData, id, "done"),
    }));
  };

  onToggleEdit = (id) => {
    this.setState(({ todoData }) => ({
      todoData: App.onToggleProperty(todoData, id, "edit"),
    }));
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const now = todoData.filter((el) => el.id !== id);
      return {
        todoData: now,
      };
    });
  };

  onFilterChange = (filterState) => {
    this.setState({ filterState });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const now = todoData.filter((el) => !el.done);
      return {
        todoData: now,
      };
    });
  };

  render() {
    const { todoData, filterState } = this.state;
    const visibleItems = App.filterTask(todoData, filterState);
    const leftItems = todoData.filter((el) => !el.done).length;
    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.onToggleEdit}
            addItem={this.addItem}
          />
          <Footer
            filtered={filterState}
            onFilterChange={this.onFilterChange}
            count={leftItems}
            clearCompleted={this.clearCompleted}
            todos={visibleItems}
          />
        </section>
      </section>
    );
  }
}
// asdgit
export default App;
