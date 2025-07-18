// src/components/RecurringDatePicker.js
import React, { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useRecurrenceStore } from '../lib/store';
import RecurrenceTabs from './RecurrenceTabs';
import IntervalSelector from './IntervalSelector';
import DayOfWeekSelector from './DayOfWeekSelector';
import MonthlyOptions from './MonthlyOptions';
import CalendarPreview from './CalendarPreview';

const RecurringDatePicker = () => {
    // Select state and actions from the store
    const { 
        startDate, 
        endDate, 
        setStartDate, 
        setEndDate, 
        generateDates,
        getSummary,
        recurrenceType,
    } = useRecurrenceStore();

    // Select individual state values that the effect depends on.
    // This is crucial to prevent infinite loops.
    const interval = useRecurrenceStore(state => state.interval);
    const daysOfWeek = useRecurrenceStore(state => state.daysOfWeek);
    const monthlyConfig = useRecurrenceStore(state => state.monthlyConfig);

    // This useEffect hook now has stable dependencies. It will only re-run
    // when one of these specific values actually changes.
    useEffect(() => {
        generateDates();
    }, [recurrenceType, interval, daysOfWeek, monthlyConfig, startDate, endDate, generateDates]);

    const renderOptions = () => {
        switch (recurrenceType) {
            case 'daily': return <IntervalSelector unit="day" />;
            case 'weekly': return (
                <div className="space-y-4">
                    <IntervalSelector unit="week" />
                    <DayOfWeekSelector />
                </div>
            );
            case 'monthly': return (
                <div className="space-y-4">
                    <IntervalSelector unit="month" />
                    <MonthlyOptions />
                </div>
            );
            case 'yearly': return <IntervalSelector unit="year" />;
            default: return null;
        }
    };
    
    return (
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-auto font-sans">
            <div className="p-5 border-b border-slate-200">
                <h2 className="font-semibold text-lg text-slate-800">Set Recurrence</h2>
                <p className="text-sm text-slate-500 mt-1">{getSummary()}</p>
            </div>
            <div className="p-5 space-y-6">
                <RecurrenceTabs />
                <div className="p-4 bg-slate-50 rounded-lg min-h-[100px]">
                    {renderOptions()}
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-600 mb-2">Date Range</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="text-xs text-slate-500">Starts</label>
                            <input 
                                type="date" 
                                value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                                onChange={e => setStartDate(e.target.value ? parseISO(e.target.value) : null)}
                                className="w-full p-2 pr-8 border border-slate-300 rounded-md text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                             <CalendarIcon className="absolute right-2 top-6 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <label className="text-xs text-slate-500">Ends (Optional)</label>
                            <input 
                                type="date" 
                                value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
                                onChange={e => setEndDate(e.target.value ? parseISO(e.target.value) : null)}
                                className="w-full p-2 pr-8 border border-slate-300 rounded-md text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                             <CalendarIcon className="absolute right-2 top-6 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-600 mb-2">Preview</h3>
                    <CalendarPreview />
                </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-b-xl flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400">
                    Cancel
                </button>
                <button className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Done
                </button>
            </div>
        </div>
    );
}

export default RecurringDatePicker;
