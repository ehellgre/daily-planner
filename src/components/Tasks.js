import React from 'react';

const Tasks = ({ tasks, toggleTask, removeTask }) => {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li className="task-list-item" key={index}>
          <span
            className={`task-list-item-text${task.completed ? ' completed' : ''}`}
            onClick={() => toggleTask(index)}
          >
            {task.text}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeTask(index);
            }}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tasks;