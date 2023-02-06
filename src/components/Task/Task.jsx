import React from "react";
import { formatDistanceToNow } from "date-fns";
import "./Task.css";
import PropTypes from "prop-types";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      text: props.label,
    };
  }

  onEditClick = () => {
    // стейт принимается для того, если вдруг операция асинхронная, чтобы было окончательное значение стейта + чтобы можно было переключать с true/false
    this.setState((state) => ({
      isEditMode: !state.isEditMode,
    }));
  };

  render() {
    const { isEditMode, text } = this.state;
    const { date, onDeleted, onToggleDone, done } = this.props;

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
            this.setState({
              text: e.target.value,
            });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              this.setState({
                isEditMode: !isEditMode,
              });
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
            <button type="button" className="icon icon-edit" onClick={this.onEditClick} />
            <button type="button" className="icon icon-destroy" onClick={onDeleted} />
          </div>
        </div>
      </li>
    );
  }
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
