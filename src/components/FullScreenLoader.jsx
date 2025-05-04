import React from 'react'
import "./FullScreenLoader.css"
const FullScreenLoader = () => {
  return (
    <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
        <div className='three-body'>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
        </div>
    </div>
  )
}

export default FullScreenLoader