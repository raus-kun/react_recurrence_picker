// src/app/page.js
"use client"; // Required for components with hooks

import RecurringDatePicker from '../components/RecurringDatePicker';

export default function Home() {
  return (
    <div className="bg-slate-100 min-h-screen w-full flex items-center justify-center p-4">
      <RecurringDatePicker />
    </div>
  );
}
