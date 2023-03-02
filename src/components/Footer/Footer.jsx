import React from "react";
import TaskFilter from "../TaskFilter/TaskFilter";
import "./Footer.css";
import PropTypes from "prop-types";

function Footer({ filtered, onFilterChange, count, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <div className="filters">
        <TaskFilter filtered={filtered} onFilterChange={onFilterChange} />
      </div>
      <button type="button" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  clearCompleted: () => {},
  count: 0,
};

Footer.propTypes = {
  clearCompleted: PropTypes.func,
  count: PropTypes.number,
};

export default Footer;
