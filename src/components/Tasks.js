import React from 'react';

const Tasks = ({ tasks, toggleTask }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li
          key={index}
          onClick={() => toggleTask(index)}
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
          }}
        >
          {task.text}
        </li>
      ))}
    </ul>
  );
};

export default Tasks;