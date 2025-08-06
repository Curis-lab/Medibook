import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { CiCloudSun } from "react-icons/ci";
function SelectTimeSlot() {
  const [selected, setSelected] = useState();

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }
  return (
    <div className="flex gap-2">
      <div>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          footer={footer}
          className="shadow-lg bg-paper p-[10px] rounded-lg"
        />
      </div>
      <div className="p-2 flex flex-col gap-[30px] bg-paper rounded-lg shadow-lg">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between w-[700px] items-center">
            <div className="flex">
              <CiCloudSun className="text-2xl" />
              <div>
                <h1>Morning</h1>
                <p>9:00 AM to 12:00 PM</p>
              </div>
            </div>
            <div>+ Add Slots</div>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                "9:00 AM",
                "9:10 AM",
                "9:20 AM",
                "9:30 AM",
                "9:40 AM",
                "9:50 AM",
                "10:00 AM",
                "10:10 AM",
                "10:20 AM",
                "10:30 AM",
              ].map((time, index) => (
                <button
                  key={index}
                  key={time}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                    time === "10:10 AM"
                      ? "bg-blue-500 text-white"
                      : "border border-gray-300 hover:border-blue-500"
                  }`}
                >
                  <input
                    type="radio"
                    className="form-radio"
                    name="timeslot"
                    defaultChecked={time === "10:10 AM"}
                  />
                  <span>{time}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between w-[700px] items-center">
            <div className="flex">
              <CiCloudSun className="text-2xl" />
              <div>
                <h1>Evening</h1>
                <p>12:00 AM to 5:00 PM</p>
              </div>
            </div>
            <div>+ Add Slots</div>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                "12:00 PM",
                "12:30 PM",
                "1:00 PM",
                "1:30 PM",
                "2:00 PM",
                "2:30 PM",
                "3:00 PM",
                "3:30 PM",
                "4:00 PM",
                "4:30 PM",
              ].map((time, index) => (
                <button
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                    time === "10:10 AM"
                      ? "bg-blue-500 text-white"
                      : "border border-gray-300 hover:border-blue-500"
                  }`}
                >
                  <input
                    type="radio"
                    className="form-radio"
                    name="timeslot"
                    defaultChecked={time === "10:10 AM"}
                  />
                  <span>{time}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectTimeSlot;
