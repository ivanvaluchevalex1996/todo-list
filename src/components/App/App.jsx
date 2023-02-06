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
    if (text.length !== 0 && text.length !== " ") {
      const obj = App.createTodoItem(text.trim());
      if (obj.label !== "" && obj.label.length !== 0) {
        this.setState(({ todoData }) => {
          const now = [...todoData];
          now.push(obj);
          return {
            todoData: now,
          };
        });
      }
    }
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData];
      newArr.map((el) => {
        const oldItem = el;
        if (oldItem.id === id) {
          oldItem.done = !oldItem.done;
        }
        return newArr;
      });
      return {
        todoData: newArr,
      };
    });
  };

  onToggleEdit = (id) => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData];
      newArr.map((el) => {
        const oldItem = el;
        if (oldItem.id === id) {
          oldItem.edit = !oldItem.edit;
        }
        return newArr;
      });
      return {
        todoData: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState((state) => {
      const now = state.todoData.filter((el) => el.id !== id);
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
