import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { CiCloudSun } from "react-icons/ci";
import FormInput from "../profile/FormInput";
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {editDoctorProfile} from '../../../../apis/doctor';
import {toast} from 'react-toastify';

function SelectTimeSlot() {
  const queryClient = useQueryClient();
  const {mutate: updateSlot} = useMutation({
    mutationFn: async(data)=> await editDoctorProfile({
      "timeSlots":data
    }),
    onSuccess: (res)=>{
      queryClient.invalidateQueries({queryKey: ['doctor']});
      if(res.ok){
        toast.success('Upload time slot successfully')
      }
    }
  })

  const [selected, setSelected] = useState();
  const [slotForm, setSlotForm] = useState({
    day:'',
    startTime: "",
    endTime: "",
  });

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }

  const handleSubmitTimeSlot = () => {
    if (!selected || !slotForm.startTime || !slotForm.endTime) {
      toast.error('Please fill all fields');
      return;
    }
    updateSlot(slotForm);
  };

  return (
    <div className="flex gap-2">
      <div>
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={(day) => {
            setSlotForm((prev) => ({
              ...prev,
              day: day,
            }));
            setSelected(day);
          }}
          footer={footer}
          className="shadow-lg bg-paper p-[10px] rounded-lg"
        />
      </div>
      <div>
        <div className="flex gap-3">
          <FormInput
            type="time"
            name="startTime"
            value={slotForm.startTime}
            onChange={(e) => {
              setSlotForm((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
          />

          <FormInput
            type="time"
            name="endTime"
            value={slotForm.endTime}
            onChange={(e) => {
              setSlotForm((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
          />
          <button
            onClick={handleSubmitTimeSlot}
            className="bg-blue-400 px-2 py-1 rounded-[4px] w-[250px]"
          >
            Add Slot
          </button>
        </div>
        <div>
          History of Slot
        </div>
      </div>
    </div>
  );
}

export default SelectTimeSlot;
