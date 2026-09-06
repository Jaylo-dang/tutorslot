import React from 'react';
import { TutorSlot, Subject } from '../types';

interface SlotCardProps {
  slot: TutorSlot;
  onSelectSlot: (slot: TutorSlot) => void;
}

const getSubjectTextColor = (subject: Subject): string => {
  switch (subject) {
    case 'Python':
      return 'text-indigo-600';
    case 'Statistics':
      return 'text-slate-600';
    case 'Machine Learning':
      return 'text-orange-600';
    case 'Finance Analytics':
      return 'text-emerald-600';
    case 'Strategy':
      return 'text-blue-600';
    default:
      return 'text-indigo-600';
  }
};

export const SlotCard: React.FC<SlotCardProps> = ({ slot, onSelectSlot }) => {
  const isBooked = !!slot.isBooked;
  const isFull = slot.seatsLeft <= 0 && !isBooked;

  const handleClick = () => {
    if (!isBooked && !isFull) {
      onSelectSlot(slot);
    }
  };

  return (
    <div
      id={`slot-card-${slot.id}`}
      onClick={handleClick}
      role={isBooked || isFull ? 'region' : 'button'}
      tabIndex={isBooked || isFull ? -1 : 0}
      aria-disabled={isBooked || isFull}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isBooked && !isFull) {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`bg-white rounded-lg p-4 flex flex-col justify-between relative group transition-all text-left select-none ${
        isBooked
          ? 'border-2 border-emerald-500 opacity-80 cursor-default shadow-xs'
          : isFull
          ? 'border border-slate-200 opacity-60 cursor-not-allowed bg-slate-50'
          : 'border border-slate-200 hover:border-indigo-400 cursor-pointer shadow-xs hover:shadow-sm'
      }`}
    >
      {/* Booked Badge */}
      {isBooked && (
        <div
          id={`slot-status-booked-${slot.id}`}
          className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs"
        >
          BOOKED {slot.bookingReference ? `· ${slot.bookingReference}` : ''}
        </div>
      )}

      {/* Card Content */}
      <div>
        <div
          className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${getSubjectTextColor(
            slot.subject
          )}`}
        >
          {slot.subject}
        </div>
        <h3
          id={`tutor-name-${slot.id}`}
          className="text-sm font-bold text-slate-900 leading-snug"
        >
          {slot.tutorName}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {slot.day}, {slot.startTime} ({slot.durationMinutes} min)
        </p>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between mt-4 border-t pt-2 border-slate-100">
        <span className="text-[10px] text-slate-400 italic">
          {slot.location}
        </span>

        {isBooked ? (
          <span className="text-[10px] font-bold text-slate-400">
            {slot.seatsLeft} {slot.seatsLeft === 1 ? 'seat left' : 'seats left'}
          </span>
        ) : isFull ? (
          <span className="text-[10px] font-bold text-slate-400">
            0 seats left
          </span>
        ) : (
          <span
            id={`seats-left-${slot.id}`}
            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              slot.seatsLeft === 1
                ? 'text-orange-600 bg-orange-50'
                : 'text-indigo-600 bg-indigo-50'
            }`}
          >
            {slot.seatsLeft} {slot.seatsLeft === 1 ? 'seat left' : 'seats left'}
          </span>
        )}
      </div>

      {/* Hover outline overlay from design */}
      {!isBooked && !isFull && (
        <div className="hidden group-hover:block absolute inset-0 rounded-lg pointer-events-none border-2 border-indigo-400/40" />
      )}
    </div>
  );
};
