import React, { useState, useEffect } from "react";
import "./customCalendarStyle.css";
import toast from "react-hot-toast";

const Calendar = ({ handleSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);

  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (clickedDate > new Date()) {
        handleSelectDate(clickedDate);
      } else {
        toast.error("Cannot select this dates");
      }
    };

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let paddingDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      paddingDays.push(null);
    }
    let daysArray = [...paddingDays];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    setDaysInMonth(daysArray);
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <>
      <div className="calendar mt-2">
        <div className="calendar-header">
          <div className="header-content">
            <div className="month-display">
              <div className="current-month mt-5">
                {currentDate
                  .toLocaleString("default", { month: "long" })
                  .toUpperCase()}
              </div>
              <div className="current-year">{currentDate.getFullYear()}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="calendar-days ">
            <button onClick={handlePrevMonth}>&lt;</button>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>

          <div className="calendar-days-of-week ">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="day-of-week">
                {d}
              </div>
            ))}
          </div>
        </div>

        <div className="calendar-grid">
          {daysInMonth.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${
                day !== null ? (isToday(day) ? "today" : "") : "empty"
              }`}
              onClick={() => handleDayClick(day)}
            >
              {day !== null ? day : ""}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Calendar;
