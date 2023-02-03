import React from "react";
import "./TaskFilter.css";
import PropTypes from "prop-types";

class TaskFilter extends React.Component {
  buttons = [
    { label: "All", name: "all" },
    { label: "Active", name: "active" },
    { label: "Done", name: "done" },
  ];

  render() {
    const { filtered, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filtered === name;
      const clazz = isActive ? "selected" : "button";

      return (
        <button
          type="button"
          key={name}
          className={`${clazz}`}
          onClick={() => {
            onFilterChange(name);
          }}
        >
          {label}
        </button>
      );
    });

    return <div className="filters">{buttons}</div>;
  }
}

TaskFilter.defaultProps = {
  onFilterChange: "all",
};
TaskFilter.propTypes = {
  onFilterChange: PropTypes.func,
};

export default TaskFilter;
