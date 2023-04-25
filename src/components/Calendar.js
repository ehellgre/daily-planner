import React, { useState } from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const generateCalendar = (date) => {
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - monthStart.getDay());

    const calendarDays = [];
    let currentDate = startDate;

    while (currentDate <= monthEnd || currentDate.getDay() !== 0) {
      calendarDays.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return calendarDays;
  };

  const calendarDays = generateCalendar(selectedDate);

  const selectDate = (date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  const changeMonth = (offset) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setSelectedDate(newDate);
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      const row = (
        <tr key={i}>
          {calendarDays.slice(i, i + 7).map((date, index) => (
            <td key={index} onClick={() => selectDate(date)}>
              {date.getDate()}
            </td>
          ))}
        </tr>
      );
      rows.push(row);
    }
    return rows;
  };

  return (
    <div>
      <h2>
        {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
      </h2>
      <button onClick={() => changeMonth(-1)}>Previous</button>
      <button onClick={() => changeMonth(1)}>Next</button>
      <table>
        <thead>
          <tr>
            {daysOfWeek.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;