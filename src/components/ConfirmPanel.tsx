import React, { useEffect } from 'react';
import { TutorSlot } from '../types';

interface ConfirmPanelProps {
  slot: TutorSlot | null;
  isOpen: boolean;
  onConfirm: (slot: TutorSlot) => void;
  onCancel: () => void;
}

export const ConfirmPanel: React.FC<ConfirmPanelProps> = ({
  slot,
  isOpen,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen || !slot) {
    return null;
  }

  return (
    <div
      id="confirm-panel-backdrop"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-panel-title"
    >
      <div
        id="confirm-panel-container"
        className="bg-white rounded-xl shadow-2xl w-full max-w-[400px] p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-5">
          <h2
            id="confirm-panel-title"
            className="text-lg font-bold text-slate-900 mb-1"
          >
            Book this session?
          </h2>
          <p className="text-xs text-slate-500">
            This action will reserve your seat for the following slot:
          </p>
        </div>

        {/* 2-column slot metadata grid */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-100">
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <span className="text-slate-400">Tutor:</span>
            <span
              id="confirm-slot-tutor"
              className="font-bold text-slate-800 text-right truncate"
            >
              {slot.tutorName}
            </span>

            <span className="text-slate-400">Subject:</span>
            <span className="font-bold text-indigo-600 text-right">
              {slot.subject}
            </span>

            <span className="text-slate-400">Time:</span>
            <span className="font-bold text-slate-800 text-right">
              {slot.day}, {slot.startTime} ({slot.durationMinutes} min)
            </span>

            <span className="text-slate-400">Platform:</span>
            <span className="font-bold text-slate-800 text-right italic text-xs">
              {slot.location}
            </span>

            <span className="text-slate-400">Availability:</span>
            <span className="font-bold text-slate-800 text-right text-xs">
              {slot.seatsLeft} {slot.seatsLeft === 1 ? 'seat left' : 'seats left'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            id="cancel-booking-btn"
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 bg-slate-100 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors cursor-pointer text-center"
          >
            Cancel
          </button>
          <button
            id="confirm-booking-btn"
            type="button"
            onClick={() => onConfirm(slot)}
            className="flex-1 py-3 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all cursor-pointer text-center"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
