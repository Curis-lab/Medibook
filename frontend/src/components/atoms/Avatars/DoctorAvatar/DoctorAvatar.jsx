import React from 'react'

function DoctorAvatar({photo}) {
  return (
    <figure className="max-w-[200px] max-h-[200px]">
      <img
        src={photo}
        alt="doctor photo"
        className="w-full h-full object-cover"
      />
    </figure>
  )
}

export default DoctorAvatar
