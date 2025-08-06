import React from 'react'

function AccountDeletionBtn({handleDeletion}) {
  return (
    <button
    onClick={handleDeletion}
    className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md mt-4 text-white"
  >
    Delete Account
  </button>
  )
}

export default AccountDeletionBtn
