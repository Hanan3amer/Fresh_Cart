import React from 'react'

export default function Loading() {
  return (
    <div className='flex  items-center absolute top-0 right-0 left-0 bottom-0 bg-gray-200 bg-opacity-0.5'>

      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
    </div>
  )
}
