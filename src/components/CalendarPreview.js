// src/components/CalendarPreview.js
import React, { useState } from 'react';
import { useRecurrenceStore } from '../lib/store';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarPreview = () => {
  const { generatedDates } = useRecurrenceStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startingDayIndex = getDay(monthStart);
  const calendarGrid = Array(startingDayIndex).fill(null).concat(daysInMonth);

  const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))} className="p-1 rounded-full hover:bg-slate-200">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h3 className="font-semibold text-slate-800 text-sm">{format(currentMonth, 'MMMM yyyy')}</h3>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 rounded-full hover:bg-slate-200">
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center text-xs text-slate-500 font-medium">
        {dayLabels.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-y-1 mt-2">
        {calendarGrid.map((day, index) => (
          <div key={index} className="flex justify-center items-center h-8">
            {day && (
              <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold
                ${isSameDay(day, new Date()) ? 'text-indigo-600' : 'text-slate-700'}
                ${generatedDates.some(d => isSameDay(d, day)) ? 'bg-indigo-500 text-white' : ''}
              `}>
                {format(day, 'd')}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPreview;
