import React from 'react';
import { BookedSession } from '../types';

interface MyWeekStripProps {
  bookedSessions: BookedSession[];
}

export const MyWeekStrip: React.FC<MyWeekStripProps> = ({ bookedSessions }) => {
  return (
    <section
      id="my-week-strip"
      className="bg-indigo-50 border-b border-indigo-100 px-4 sm:px-6 py-2.5 sm:py-3 flex-shrink-0"
      aria-label="My week booked sessions"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <span
            id="my-week-heading"
            className="text-xs font-bold uppercase tracking-wider text-indigo-500"
          >
            My Week
          </span>
          {bookedSessions.length > 0 && (
            <span
              id="my-week-count"
              className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full"
            >
              {bookedSessions.length}
            </span>
          )}
        </div>

        {bookedSessions.length === 0 ? (
          <p
            id="my-week-empty"
            className="text-xs sm:text-sm text-slate-500 italic"
          >
            No sessions booked yet this week.
          </p>
        ) : (
          <div id="my-week-list" className="flex flex-wrap items-center gap-2">
            {bookedSessions.map((session) => (
              <div
                key={session.bookingReference}
                id={`booked-session-${session.bookingReference}`}
                className="flex items-center gap-2 bg-white border border-indigo-200 px-3 py-1 rounded-md shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                <span className="text-xs font-semibold text-slate-800">
                  {session.subject} ({session.day} {session.startTime})
                </span>
                <span
                  id={`booking-ref-${session.bookingReference}`}
                  className="text-[10px] text-slate-400 font-mono font-medium border-l pl-2 border-slate-200"
                >
                  {session.bookingReference}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
