import React, { useState } from "react";

function SlotsSelector(slots) {
  const slotsArray = Object.values(slots);
  const [slotTimes, setSlotTimes] = useState([slotsArray[0]]);
  const [selectedDay, setSelectedDay] = useState(slotsArray[0].day);
  const [selectedTime, setSelectedTime] = useState(slotsArray[0].startTime);

  function clickDay(findDay) {
    const findDaySlots = slotsArray.filter((slot) => slot.day === findDay);
    setSlotTimes(findDaySlots);
    setSelectedDay(findDay);
  }

  return (
    <div className="bg-[#f5f8fb] p-[15px] rounded-md gap-6 flex flex-col min-w-[400px]">
      <div className="flex gap-2">
        {[...new Set(slotsArray.map((slot) => slot.day))].map((day, index) => (
          <div onClick={() => clickDay(day)} key={index} className="flex gap-2">
            <span
              className={`${
                selectedDay === day ? "bg-[#9095c9] text-[#fff]" : ""
              } p-1 rounded-[5px]`}
            >
              {day[0].toUpperCase() + day.slice(1)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {slotTimes.map((slots, idx) => (
          <div key={idx} onClick={()=>setSelectedTime(slots.startTime)} className={`px-3 py-2 text-center rounded-md ${selectedTime === slots.startTime ? 'bg-[#259ee3]':'bg-[#b4bac5]'}`}>
            {slots.startTime} - {slots.endTime}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlotsSelector;
