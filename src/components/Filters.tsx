import React from 'react';
import { Subject, DayOfWeek } from '../types';
import { SUBJECT_OPTIONS, DAY_OPTIONS } from '../data/mockData';

interface FiltersProps {
  selectedSubjects: Subject[];
  selectedDays: DayOfWeek[];
  onToggleSubject: (subject: Subject) => void;
  onToggleDay: (day: DayOfWeek) => void;
  onClearFilters: () => void;
}

export const Filters: React.FC<FiltersProps> = ({
  selectedSubjects,
  selectedDays,
  onToggleSubject,
  onToggleDay,
  onClearFilters,
}) => {
  const hasActiveFilters = selectedSubjects.length > 0 || selectedDays.length > 0;

  return (
    <nav
      id="tutorslot-filters"
      className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col justify-center gap-2.5 flex-shrink-0 shadow-xs z-10"
      aria-label="Filter slots"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-2.5">
        {/* Row 1: Subject */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase w-16 shrink-0">
            Subject
          </span>
          <div
            id="subject-chips-container"
            className="flex flex-wrap gap-1.5 sm:gap-2 items-center flex-1"
            role="group"
            aria-label="Filter by subject"
          >
            {SUBJECT_OPTIONS.map((subject) => {
              const isSelected = selectedSubjects.includes(subject);
              return (
                <button
                  key={subject}
                  id={`filter-subject-${subject.toLowerCase().replace(/\s+/g, '-')}`}
                  type="button"
                  onClick={() => onToggleSubject(subject)}
                  aria-pressed={isSelected}
                  className={`px-3 py-1.5 sm:py-1 text-xs rounded-full border transition-colors cursor-pointer select-none font-medium min-h-[34px] flex items-center justify-center ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white font-semibold shadow-2xs'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 active:bg-slate-300'
                  }`}
                >
                  {subject}
                </button>
              );
            })}
          </div>

          {hasActiveFilters && (
            <button
              id="clear-filters-btn"
              type="button"
              onClick={onClearFilters}
              className="ml-auto text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline cursor-pointer px-1 py-1 min-h-[34px] flex items-center shrink-0"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Row 2: Day */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase w-16 shrink-0">
            Day
          </span>
          <div
            id="day-chips-container"
            className="flex flex-wrap gap-1 sm:gap-1.5 items-center"
            role="group"
            aria-label="Filter by day"
          >
            {DAY_OPTIONS.map((day) => {
              const isSelected = selectedDays.includes(day);
              return (
                <button
                  key={day}
                  id={`filter-day-${day.toLowerCase()}`}
                  type="button"
                  onClick={() => onToggleDay(day)}
                  aria-pressed={isSelected}
                  className={`min-w-[40px] sm:w-12 py-1.5 sm:py-1 text-xs text-center rounded border transition-colors cursor-pointer select-none min-h-[34px] flex items-center justify-center ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-bold shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 active:bg-slate-200'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
