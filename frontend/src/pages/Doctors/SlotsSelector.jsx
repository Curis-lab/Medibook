import React from "react";

function SlotsSelector(slots) {
  const days = Object.values(slots);
  
  return (
    <div className="bg-amber-300 p-2 gap-6 flex flex-col">
      <div className="flex gap-2">
        {days.map((slot, index) => (
          <div key={index} className="flex gap-2">
            <span>{slot.day}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
      {days.map((slot, idx) => (
        <p key={idx} className="px-3 py-2 text-center  bg-white">
          {slot.startTime}
        </p>
      ))}
      </div>
    </div>
  );
}

export default SlotsSelector;
