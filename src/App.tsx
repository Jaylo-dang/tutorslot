import React, { useState, useMemo } from 'react';
import { Subject, DayOfWeek, TutorSlot, BookedSession } from './types';
import {
  CURRENT_WEEK_DATE_RANGE,
  INITIAL_SLOTS,
} from './data/mockData';
import { Header } from './components/Header';
import { MyWeekStrip } from './components/MyWeekStrip';
import { Filters } from './components/Filters';
import { SlotList } from './components/SlotList';
import { ConfirmPanel } from './components/ConfirmPanel';

export default function App() {
  const [slots, setSlots] = useState<TutorSlot[]>(INITIAL_SLOTS);
  const [bookedSessions, setBookedSessions] = useState<BookedSession[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [selectedSlotForBooking, setSelectedSlotForBooking] = useState<TutorSlot | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  // Toggle subject filter
  const handleToggleSubject = (subject: Subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  // Toggle day filter
  const handleToggleDay = (day: DayOfWeek) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedSubjects([]);
    setSelectedDays([]);
  };

  // Open confirmation panel on card tap
  const handleSelectSlot = (slot: TutorSlot) => {
    if (slot.isBooked || slot.seatsLeft <= 0) return;
    setSelectedSlotForBooking(slot);
    setIsConfirmOpen(true);
  };

  // Close confirmation panel
  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
    setSelectedSlotForBooking(null);
  };

  // Confirm booking
  const handleConfirmBooking = (slotToBook: TutorSlot) => {
    // Generate reference like TS-4821
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const bookingReference = `TS-${randomCode}`;

    // Update slot: mark as booked and decrease seats left by 1
    setSlots((prevSlots) =>
      prevSlots.map((slot) => {
        if (slot.id === slotToBook.id) {
          return {
            ...slot,
            isBooked: true,
            bookingReference,
            seatsLeft: Math.max(0, slot.seatsLeft - 1),
          };
        }
        return slot;
      })
    );

    // Add to My week booked sessions
    const newBookedSession: BookedSession = {
      slotId: slotToBook.id,
      bookingReference,
      tutorName: slotToBook.tutorName,
      subject: slotToBook.subject,
      day: slotToBook.day,
      startTime: slotToBook.startTime,
      durationMinutes: slotToBook.durationMinutes,
      location: slotToBook.location,
    };

    setBookedSessions((prev) => [newBookedSession, ...prev]);

    // Close panel
    setIsConfirmOpen(false);
    setSelectedSlotForBooking(null);
  };

  // Filter slots immediately with no page reload
  const filteredSlots = useMemo(() => {
    return slots.filter((slot) => {
      const matchesSubject =
        selectedSubjects.length === 0 || selectedSubjects.includes(slot.subject);
      const matchesDay = selectedDays.length === 0 || selectedDays.includes(slot.day);
      return matchesSubject && matchesDay;
    });
  }, [slots, selectedSubjects, selectedDays]);

  const hasActiveFilters = selectedSubjects.length > 0 || selectedDays.length > 0;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* 1) Header */}
      <Header dateRange={CURRENT_WEEK_DATE_RANGE} />

      <main className="w-full flex-1 flex flex-col">
        {/* 2) My week strip */}
        <MyWeekStrip bookedSessions={bookedSessions} />

        {/* 3) Filter row */}
        <Filters
          selectedSubjects={selectedSubjects}
          selectedDays={selectedDays}
          onToggleSubject={handleToggleSubject}
          onToggleDay={handleToggleDay}
          onClearFilters={handleClearFilters}
        />

        {/* 4) Slot list (with cards) & 7) Empty filter state */}
        <SlotList
          slots={filteredSlots}
          onSelectSlot={handleSelectSlot}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </main>

      {/* 5) & 6) Confirmation Panel */}
      <ConfirmPanel
        slot={selectedSlotForBooking}
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmBooking}
        onCancel={handleCloseConfirm}
      />
    </div>
  );
}
