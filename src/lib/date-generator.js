// src/lib/date-generator.js
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  startOfMonth,
  endOfMonth,
  getDay,
  isSameDay,
  isBefore,
  isAfter,
} from 'date-fns';

export function generateRecurrenceDates(config) {
  const {
    recurrenceType,
    interval,
    daysOfWeek,
    monthlyConfig,
    startDate,
    endDate,
  } = config;

  if (!startDate) return [];

  const dates = [];
  // If an end date exists, add 1 day to it to make the range inclusive.
  const finalEndDate = endDate ? addDays(endDate, 1) : addYears(startDate, 5);
  const occurrencesLimit = 500;

  if (recurrenceType === 'daily') {
    let current = startDate;
    while (isBefore(current, finalEndDate) && dates.length < occurrencesLimit) {
      dates.push(current);
      current = addDays(current, interval);
    }
    return dates;
  }

  if (recurrenceType === 'yearly') {
      let candidateDate = startDate;
      while(isBefore(candidateDate, finalEndDate) && dates.length < occurrencesLimit) {
          dates.push(candidateDate);
          candidateDate = addYears(candidateDate, interval);
      }
      return dates.sort((a,b) => a - b);
  }

  if (recurrenceType === 'weekly') {
      let weekCounter = 0;
      while(dates.length < occurrencesLimit) {
           const weekStart = addWeeks(startDate, weekCounter * interval);
           let addedInWeek = false;
           // Safety break to prevent infinite loops in complex cases
           if (isAfter(weekStart, finalEndDate)) break;

           for(let i = 0; i < 7; i++) {
               const dayInWeek = addDays(weekStart, i);
               if(!isBefore(dayInWeek, finalEndDate)) {
                   // Exit the inner loop if we are past the end date
                   break;
               }
               if(!isBefore(dayInWeek, startDate) && daysOfWeek[getDay(dayInWeek)]) {
                   if (dates.length < occurrencesLimit && !dates.some(d => isSameDay(d, dayInWeek))) {
                      dates.push(dayInWeek);
                      addedInWeek = true;
                   }
               }
           }
           weekCounter++;
           // Safety break for extremely long ranges
           if (weekCounter > (52 * 10)) break; // 10 years of weeks
      }
      return dates.sort((a,b) => a - b);
  }
  
  if (recurrenceType === 'monthly') {
      let monthDate = startOfMonth(startDate);
      while(isBefore(monthDate, finalEndDate) && dates.length < occurrencesLimit) {
          let targetDate;
          if (monthlyConfig.type === 'dayOfMonth') {
              targetDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), monthlyConfig.dayOfMonth);
          } else { // 'dayOfWeek'
              const firstDayOfMonth = startOfMonth(monthDate);
              let firstMatchingDay = firstDayOfMonth;
              while (getDay(firstMatchingDay) !== monthlyConfig.dayOfWeek) {
                  firstMatchingDay = addDays(firstMatchingDay, 1);
              }

              if (monthlyConfig.weekOrder === 'last') {
                  const lastDayOfMonth = endOfMonth(monthDate);
                  let lastMatchingDay = lastDayOfMonth;
                  while(getDay(lastMatchingDay) !== monthlyConfig.dayOfWeek) {
                      lastMatchingDay = addDays(lastMatchingDay, -1);
                  }
                  targetDate = lastMatchingDay;
              } else {
                  const weekMultipliers = { first: 0, second: 1, third: 2, fourth: 3 };
                  targetDate = addWeeks(firstMatchingDay, weekMultipliers[monthlyConfig.weekOrder]);
              }
          }
          
          if (targetDate.getMonth() === monthDate.getMonth() && !isBefore(targetDate, startDate) && isBefore(targetDate, finalEndDate)) {
              if (dates.length < occurrencesLimit) {
                 dates.push(targetDate);
              }
          }
          monthDate = addMonths(monthDate, interval);
      }
      return dates.sort((a,b) => a - b);
  }

  return [];
}
