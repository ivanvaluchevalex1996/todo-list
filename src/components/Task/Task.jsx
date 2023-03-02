import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import "./Task.css";
import PropTypes from "prop-types";

function Task(props) {
  const { date, onDeleted, onToggleDone, done, label } = props;
  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(label);
  const onEditClick = () => {
    setIsEditMode((el) => !el);
  };

  let classStyle = "";
  if (done === true) {
    classStyle += "completed";
  }

  if (isEditMode) {
    return (
      <input
        autoFocus
        className="editing"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsEditMode(!isEditMode);
          }
        }}
      />
    );
  }

  return (
    <li className={classStyle}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
        <label>
          <span
            className="description"
            onClick={onToggleDone}
            onKeyDown={onToggleDone}
            role="button"
            tabIndex="0"
          >
            {text}
          </span>
          <span className="created">{`created ${formatDistanceToNow(date)} ago`}</span>
        </label>
        <div className="button">
          <button type="button" className="icon icon-edit" onClick={onEditClick} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
      </div>
    </li>
  );
}
Task.defaultProps = {
  onToggleDone: () => {},
  onDeleted: () => {},
};
// если функция определена в самом компоненте, как onEditClick, указывать ее в PropTypes не нужно
Task.propTypes = {
  onToggleDone: PropTypes.func,
  onDeleted: PropTypes.func,
};

export default Task;
