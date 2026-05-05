import { Toast } from 'flowbite-react'
import React from 'react'
import { FaTelegramPlane } from 'react-icons/fa'

const Toaster = ({ showtoast, visible }) => {
  return (
    <div
      className={`fixed z-[999] right-10 bottom-4 transition-all duration-300 ease-in-out bg-idi-800 text-white rounded-full drop-shadow-md shadow-idi-300 ${
        showtoast ? "block" : "hidden"
      } ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <Toast className="bg-transparent rounded-full drop-shadow-md shadow-idi-400">
        <FaTelegramPlane className="h-5 w-5 text-white bg-transparent" />
        <div className="pl-4 text-sm font-normal text-white">
          Konten berhasil ditambahkan.
        </div>
      </Toast>
    </div>
  )
}

export default Toaster
