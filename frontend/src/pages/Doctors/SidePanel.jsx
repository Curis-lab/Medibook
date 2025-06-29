import React from 'react'
import {BASE_URL, token} from '../../config';
import {toast} from 'react-toastify';

function SidePanel() {
  const bookingHandler = async()=>{
    try{
    const res =   await fetch(`${BASE_URL}/bookings/checkout-session/685601d9a7206c468dd3d3f5`,{
        method: 'POST',
        headers:{
          Authentication: `Bearer ${token}`,
        }
      });
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.message, 'Please try again .')
      }
      if(data.session.url){
        window.location.href = data.session.url;
      }
    }catch(error){
      toast.error(error.message);
    }
  }
  return (
    <div className="w-1/2 p-3 lg:p-5 rounded-md">
    <div className="flex items-center justify-between">
        <p className="text__parag mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-black font-bold">500 USD</span>
    </div>
    <div className="mt-[30px]">
        <p className="text__parag mt-0 font-semibold text-black">Available Time Slots:</p>
        <ul className="mt-3">
            <li className="flex items-center justify-between mb-2">
                <p className="text-[15px] leading-6 text-black font-semibold">Sunday</p>
                <p className="text-[15px] leading-6 text-black font-semibold">4:00 PM - 5:00 PM</p>
            </li>
        </ul>
    </div>
    <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">Book Appointment</button>
    </div>
  )
}

export default SidePanel
