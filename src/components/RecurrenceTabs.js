// src/components/RecurrenceTabs.js
import React from 'react';
import { useRecurrenceStore } from '../lib/store';

const RecurrenceTabs = () => {
  const { recurrenceType, setRecurrenceType } = useRecurrenceStore();
  const types = ['daily', 'weekly', 'monthly', 'yearly'];

  return (
    <div className="flex w-full bg-slate-100 rounded-lg p-1">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => setRecurrenceType(type)}
          className={`w-full py-2 px-1 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
            ${recurrenceType === type ? 'bg-white text-indigo-600 shadow-sm' : 'bg-transparent text-slate-600 hover:bg-slate-200'}`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default RecurrenceTabs;
