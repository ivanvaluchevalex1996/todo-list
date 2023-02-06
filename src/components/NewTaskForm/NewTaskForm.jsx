/* eslint-disable react/destructuring-assignment */
import React from "react";
import "./NewTaskForm.css";

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { label: "" };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { addItem } = this.props;
    addItem(this.state.label);
    this.setState({
      label: "",
    });
  };

  onLableChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  render() {
    const { label } = this.state;
    console.log("1");
    return (
      <header className="header">
        <form className="header" onSubmit={this.onSubmit}>
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLableChange}
            value={label}
          />
        </form>
      </header>
    );
  }
}

export default NewTaskForm;
