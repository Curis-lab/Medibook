import React from 'react'

function Error({errMessage}) {
  return (
    <div className="flex items-center justify-center w-screen h-dvh">
      <h3 className="text-primary text-[30px] leading-[30px] font-semibold">{errMessage}</h3>
    </div>
  )
}

export default Error
