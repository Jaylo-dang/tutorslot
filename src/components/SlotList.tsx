import React from 'react';
import { TutorSlot } from '../types';
import { SlotCard } from './SlotCard';
import { CalendarX2 } from 'lucide-react';

interface SlotListProps {
  slots: TutorSlot[];
  onSelectSlot: (slot: TutorSlot) => void;
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
}

export const SlotList: React.FC<SlotListProps> = ({
  slots,
  onSelectSlot,
  onClearFilters,
  hasActiveFilters,
}) => {
  return (
    <div id="slot-list-section" className="px-4 py-4 sm:px-6 sm:py-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h2
            id="slot-list-heading"
            className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500"
          >
            Available Sessions ({slots.length})
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">
            Click card to reserve
          </span>
        </div>

        {slots.length === 0 ? (
          <div
            id="no-slots-match-message"
            className="bg-white border border-dashed border-slate-300 rounded-lg p-8 text-center my-4"
          >
            <CalendarX2 className="w-8 h-8 text-slate-400 mx-auto mb-2" aria-hidden="true" />
            <p
              id="no-slots-text"
              className="text-sm sm:text-base font-semibold text-slate-800 mb-1"
            >
              No slots match these filters this week
            </p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mb-3">
              Try adjusting your subject or day filters to see other tutoring times.
            </p>
            {hasActiveFilters && onClearFilters && (
              <button
                id="reset-filters-empty-btn"
                type="button"
                onClick={onClearFilters}
                className="inline-flex items-center justify-center min-h-[36px] px-4 py-1.5 text-xs font-semibold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 cursor-pointer transition-colors"
              >
                Reset all filters
              </button>
            )}
          </div>
        ) : (
          <div
            id="slots-cards-container"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {slots.map((slot) => (
              <SlotCard key={slot.id} slot={slot} onSelectSlot={onSelectSlot} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
