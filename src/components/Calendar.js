import React, { useState } from 'react';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const generateCalendar = (date) => {
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    const startDay = monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1;
    startDate.setDate(startDate.getDate() - startDay);

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

  const getWeekNumber = (date) => {
    const targetDate = new Date(date.valueOf());
    const firstDayOfYear = new Date(targetDate.getFullYear(), 0, 1);
    const dayOfWeek = targetDate.getDay();
    const firstThursdayOfYear = firstDayOfYear.getDate() - firstDayOfYear.getDay() + 4;

    targetDate.setDate(targetDate.getDate() - dayOfWeek + 4);

    return Math.floor(((targetDate - new Date(targetDate.getFullYear(), 0, firstThursdayOfYear)) / 86400000 + 1) / 7) + 1;
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      const weekNumber = getWeekNumber(calendarDays[i]);
      const row = (
        <tr key={i}>
          <td className="week-number">{weekNumber}</td>
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
            <th>Wk</th>
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