import React from 'react'
import logo from '@/assets/prc-logo.png'

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <img src={logo} className='h-40 md:h-1/2 w-auto' alt="" />
    </div>
  )
}

export default Loading
