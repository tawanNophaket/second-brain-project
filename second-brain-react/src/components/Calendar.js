import { useState } from "react";

const Calendar = ({ events, setEvents }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [eventInput, setEventInput] = useState("");
  const [eventDate, setEventDate] = useState("");

  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const addEvent = () => {
    if (eventInput.trim() && eventDate) {
      setEvents([...events, { text: eventInput.trim(), date: eventDate }]);
      const selectedDate = new Date(eventDate);
      setCurrentMonth(selectedDate.getMonth());
      setCurrentYear(selectedDate.getFullYear());
      setEventInput("");
      setEventDate("");
    }
  };

  const prevMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const nextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    const calendarDays = [];

    // Headers
    const days = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
    days.forEach((day) =>
      calendarDays.push(
        <div key={day} className="header">
          {day}
        </div>
      )
    );

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`}></div>);
    }

    // Days
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(i).padStart(2, "0")}`;
      const dayEvents = events.filter((e) => e.date === dateStr);
      const isCurrentDay =
        i === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      calendarDays.push(
        <div key={i} className={isCurrentDay ? "current-day" : ""} data-day={i}>
          {i}
          {dayEvents.map((e, idx) => (
            <p key={idx}>{e.text}</p>
          ))}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="section active">
      <h1>ปฏิทิน</h1>
      <div id="calendar-controls">
        <button onClick={prevMonth}>เดือนก่อนหน้า</button>
        <span id="month-year">
          {monthNames[currentMonth]} {currentYear + 543}
        </span>
        <button onClick={nextMonth}>เดือนถัดไป</button>
      </div>
      <div id="calendar">{renderCalendar()}</div>
      <input
        type="text"
        value={eventInput}
        onChange={(e) => setEventInput(e.target.value)}
        placeholder="พิมพ์เหตุการณ์..."
      />
      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <button onClick={addEvent}>เพิ่มเหตุการณ์</button>
    </div>
  );
};

export default Calendar;
