import { useState } from 'react'
import '../App.css';

function Welcome() {

  return (
    <>
      <h1 className="font-semibold lato">MINO</h1>
      <button className="m-4 text-blue hover:before:bg-blueborder-blue-500 relative h-[50px] w-40 overflow-hidden border border-blue-500 bg-white px-3 text-blue-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-blue-500 before:transition-all before:duration-500 hover:text-white hover:shadow-blue-500 hover:before:left-0 hover:before:w-full"><span className="relative z-10">Swipe</span></button>
    </>
  )
}

export default Welcome
