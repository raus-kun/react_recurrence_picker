// src/components/DayOfWeekSelector.js
import React from 'react';
import { useRecurrenceStore } from '../lib/store';

const DayOfWeekSelector = () => {
  const { daysOfWeek, toggleDayOfWeek } = useRecurrenceStore();
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="flex justify-between space-x-1">
      {dayLabels.map((label, index) => (
        <button
          key={index}
          onClick={() => toggleDayOfWeek(index)}
          aria-pressed={daysOfWeek[index]}
          className={`w-9 h-9 rounded-full font-semibold text-sm transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            ${daysOfWeek[index] ? 'bg-indigo-600 text-white scale-110' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default DayOfWeekSelector;
