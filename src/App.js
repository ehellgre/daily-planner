import React, { useState } from 'react';
import Calendar from './components/Calendar';
import Tasks from './components/Tasks';
import './style.css';

function App() {
  const [tasks, setTasks] = useState({});
  const [input, setInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const addTask = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const dateKey = formatDate(selectedDate);
    const newTasks = { ...tasks };

    if (newTasks[dateKey]) {
      newTasks[dateKey].push({ text: input, completed: false });
    } else {
      newTasks[dateKey] = [{ text: input, completed: false }];
    }

    setTasks(newTasks);
    setInput('');
  };

  const toggleTask = (index) => {
    const dateKey = formatDate(selectedDate);
    const newTasks = { ...tasks };
    newTasks[dateKey][index].completed = !newTasks[dateKey][index].completed;
    setTasks(newTasks);
  };

  const dateKey = formatDate(selectedDate);
  const currentDateTasks = tasks[dateKey] || [];

  return (
    <div className="App">
      <h1>Daily Planner</h1>
      <Calendar onSelectDate={setSelectedDate} />
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <Tasks tasks={currentDateTasks} toggleTask={toggleTask} />
    </div>
  );
}

export default App;
