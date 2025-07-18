// src/components/IntervalSelector.js
import React from 'react';
import { useRecurrenceStore } from '../lib/store';

const IntervalSelector = ({ unit }) => {
  const { interval, setInterval } = useRecurrenceStore();
  return (
    <div className="flex items-center space-x-2 text-sm">
      <span className="text-slate-700">Every</span>
      <input
        type="number"
        value={interval}
        onChange={(e) => setInterval(parseInt(e.target.value, 10) || 1)}
        className="w-16 p-2 border border-slate-300 rounded-md text-center text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        min="1"
      />
      <span className="text-slate-700">{unit}{interval > 1 ? 's' : ''}</span>
    </div>
  );
};

export default IntervalSelector;
