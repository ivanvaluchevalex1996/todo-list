import React, { useState } from "react";
import "./NewTaskForm.css";

function NewTaskForm(props) {
  const { addItem } = props;
  const [label, setLabel] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    addItem(label);
    setLabel("");
  };

  const onLabelChange = (e) => {
    setLabel(e.target.value);
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
        <input type="number" className="new-todo-form__timer" placeholder="Min" />
        <input type="number" className="new-todo-form__timer" placeholder="Sec" />
        <button type="submit" style={{ display: "none" }} />
      </form>
    </header>
  );
}

export default NewTaskForm;
// import React, { useState } from "react";
// import "./NewTaskForm.css";

// function NewTaskForm(props) {
//   const { addItem } = props;
//   const [label, setLabel] = useState("");

//   const onSubmit = (event) => {
//     event.preventDefault();
//     addItem(label);
//     setLabel("");
//   };

//   const onLabelChange = (e) => {
//     setLabel(e.target.value);
//   };
//   return (
//     <header className="header">
//       <form className="header" onSubmit={onSubmit}>
//         <h1>todos</h1>
//         <input
//           className="new-todo"
//           placeholder="What needs to be done?"
// onChange={onLabelChange}
// value={label}
//         />
//       </form>
//     </header>
//   );
// }

// export default NewTaskForm;
