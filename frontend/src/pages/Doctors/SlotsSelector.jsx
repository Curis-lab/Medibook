import React, { useState } from "react";

function SlotsSelector({ slots, handleDisabled, setAcceptAppointmentDate }) {
  const [selectedDay, setSelectedDay] = useState(slots[0].day);
  const [selectedTime, setSelectedTime] = useState("");

  const days = [...new Set(slots.map(slot => slot.day))];
  const timeSlots = slots.filter(slot => slot.day === selectedDay);

  const selectDay = (day) => {
    setSelectedDay(day);
    setSelectedTime("");
    handleDisabled(true);
  };

  const selectTime = (time) => {
    setSelectedTime(time);
    handleDisabled(false);
  };
  //format of the date
  //'monday'+'00:35'+'12'+'2012'
console.log(setAcceptAppointmentDate);
  return (
    <div className="bg-[#f5f8fb] p-[15px] rounded-md gap-6 flex flex-col min-w-[400px]">
      <div className="flex gap-2">
        {days.map((day) => (
          <div 
            key={day}
            onClick={() => selectDay(day)}
            className="flex gap-2"
          >
            <span className={`p-1 rounded-[5px] ${selectedDay === day ? "bg-[#9095c9] text-[#fff]" : ""}`}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {timeSlots.map((slot) => (
          <div
            key={slot.startTime}
            onClick={() => selectTime(slot.startTime)}
            className={`px-3 py-2 text-center rounded-md ${
              selectedTime === slot.startTime ? "bg-[#259ee3]" : "bg-[#b4bac5]"
            }`}
          >
            {slot.startTime} - {slot.endTime}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlotsSelector;
