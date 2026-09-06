import React from 'react';
import { Calendar } from 'lucide-react';

interface HeaderProps {
  dateRange: string;
}

export const Header: React.FC<HeaderProps> = ({ dateRange }) => {
  return (
    <header
      id="tutorslot-header"
      className="h-16 flex items-center justify-between px-4 sm:px-6 bg-slate-900 text-white flex-shrink-0 border-b border-slate-800 shadow-sm"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-2 sm:gap-4">
          <h1
            id="tutorslot-title"
            className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2"
          >
            TutorSlot
          </h1>
          <span
            id="tutorslot-subtitle"
            className="text-slate-400 text-xs sm:text-sm font-normal hidden xs:inline sm:inline"
          >
            Business AI Master's (Cohort 2024)
          </span>
        </div>

        <div
          id="tutorslot-daterange-badge"
          className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-1.5 shrink-0"
        >
          <span className="hidden sm:inline text-slate-400">Current Week:</span>
          <span className="font-semibold text-slate-200">{dateRange}</span>
        </div>
      </div>
    </header>
  );
};
