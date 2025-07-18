// src/components/MonthlyOptions.js
import React from 'react';
import { useRecurrenceStore } from '../lib/store';
import { getDate, getDay } from 'date-fns';

const MonthlyOptions = () => {
    const { monthlyConfig, setMonthlyConfig, startDate } = useRecurrenceStore();
    const dayOfMonth = startDate ? getDate(startDate) : 1;
    const dayOfWeek = startDate ? getDay(startDate) : 1;
    const weekOfMonth = startDate ? Math.ceil(getDate(startDate) / 7) : 1;
    
    const weekOrderOptions = ['first', 'second', 'third', 'fourth', 'last'];
    const dayOfWeekOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const handleTypeChange = (type) => {
        if (type === 'dayOfMonth') {
            setMonthlyConfig({ type, dayOfMonth });
        } else {
            setMonthlyConfig({ type, weekOrder: weekOrderOptions[weekOfMonth-1] || 'first', dayOfWeek });
        }
    };

    return (
        <div className="space-y-4 text-sm">
            <div className="flex items-center space-x-4">
                <input type="radio" id="dayOfMonth" name="monthlyType"
                    checked={monthlyConfig.type === 'dayOfMonth'}
                    onChange={() => handleTypeChange('dayOfMonth')}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="dayOfMonth" className="flex items-center space-x-2 text-slate-700">
                    <span>On day</span>
                     <input
                        type="number"
                        value={monthlyConfig.dayOfMonth}
                        onChange={(e) => setMonthlyConfig({ dayOfMonth: parseInt(e.target.value, 10) })}
                        className="w-16 p-2 border border-slate-300 rounded-md text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        min="1" max="31"
                        disabled={monthlyConfig.type !== 'dayOfMonth'}
                    />
                </label>
            </div>
            <div className="flex items-center space-x-4">
                 <input type="radio" id="dayOfWeek" name="monthlyType"
                    checked={monthlyConfig.type === 'dayOfWeek'}
                    onChange={() => handleTypeChange('dayOfWeek')}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="dayOfWeek" className="flex items-center space-x-2 text-slate-700">
                    <span>On the</span>
                    <select 
                        value={monthlyConfig.weekOrder} 
                        onChange={e => setMonthlyConfig({ weekOrder: e.target.value })}
                        className="p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        disabled={monthlyConfig.type !== 'dayOfWeek'}
                    >
                        {weekOrderOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <select 
                        value={monthlyConfig.dayOfWeek} 
                        onChange={e => setMonthlyConfig({ dayOfWeek: parseInt(e.target.value, 10) })}
                        className="p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        disabled={monthlyConfig.type !== 'dayOfWeek'}
                    >
                        {dayOfWeekOptions.map((day, i) => <option key={i} value={i}>{day}</option>)}
                    </select>
                </label>
            </div>
        </div>
    );
};

export default MonthlyOptions;
