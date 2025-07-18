// src/lib/store.js
import { create } from 'zustand';
import { format, addDays, startOfDay, getDate } from 'date-fns';
import { generateRecurrenceDates } from './date-generator';

const initialRecurrenceState = {
  recurrenceType: 'daily',
  interval: 1,
  daysOfWeek: { 0: false, 1: true, 2: false, 3: false, 4: false, 5: false, 6: false },
  monthlyConfig: {
    type: 'dayOfMonth',
    dayOfMonth: new Date().getDate(),
    weekOrder: 'first',
    dayOfWeek: 1,
  },
  startDate: startOfDay(new Date()),
  endDate: null,
  generatedDates: [],
};

export const useRecurrenceStore = create((set, get) => ({
  ...initialRecurrenceState,

  setRecurrenceType: (type) => set({ recurrenceType: type, interval: 1 }),
  setInterval: (interval) => set({ interval: Math.max(1, interval) }),
  toggleDayOfWeek: (dayIndex) => set((state) => ({
    daysOfWeek: { ...state.daysOfWeek, [dayIndex]: !state.daysOfWeek[dayIndex] },
  })),
  setMonthlyConfig: (config) => set((state) => ({
    monthlyConfig: { ...state.monthlyConfig, ...config },
  })),
  setStartDate: (date) => set({ startDate: date ? startOfDay(date) : null }),
  setEndDate: (date) => set({ endDate: date ? startOfDay(date) : null }),
  
  generateDates: () => {
    const dates = generateRecurrenceDates(get());
    set({ generatedDates: dates });
  },
  
  getSummary: () => {
    const { recurrenceType, interval, daysOfWeek, monthlyConfig, startDate } = get();
    if (!startDate) return "Select a start date";

    switch (recurrenceType) {
      case 'daily':
        return `Every ${interval > 1 ? `${interval} days` : 'day'}`;
      case 'weekly':
        const selectedDays = Object.entries(daysOfWeek)
          .filter(([, isSelected]) => isSelected)
          .map(([dayIndex]) => format(addDays(new Date('2023-01-01'), parseInt(dayIndex)), 'EEE'))
          .join(', ');
        return `Every ${interval > 1 ? `${interval} weeks` : 'week'} on ${selectedDays || 'no days selected'}`;
      case 'monthly':
        if (monthlyConfig.type === 'dayOfMonth') {
          return `Every ${interval > 1 ? `${interval} months` : 'month'} on day ${monthlyConfig.dayOfMonth}`;
        } else {
          const week = monthlyConfig.weekOrder.charAt(0).toUpperCase() + monthlyConfig.weekOrder.slice(1);
          const day = format(addDays(new Date('2023-01-01'), monthlyConfig.dayOfWeek), 'EEEE');
          return `Every ${interval > 1 ? `${interval} months` : 'month'} on the ${week} ${day}`;
        }
      case 'yearly':
        return `Every ${interval > 1 ? `${interval} years` : 'year'} on ${format(startDate, 'MMMM d')}`;
      default:
        return "No recurrence";
    }
  },
}));
