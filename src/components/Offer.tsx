import Image from 'next/image'
import React from 'react'

const Offer = () => {
  return (
    <div className='bg-indigo-950 h-screen flex flex-col md:flex-row'>
      {/* TEXT CONATINER */}
      <div className='flex-1 flex flex-col justify-center items-center text-center gap-8 p-6'>

        <h1 className='text-bggreen text-5xl font-bold xl:text-6xl'>Wait Time</h1>
        <p className='text-bggreen  xl:text-xl'>We're commited to great food, great coffee, great service, an experience that will make your time with us fabulous. All visuals are serving suggestions only.</p>
        <button className='bg-customGreen text-indigo-950 rounded-md py-3 px-6'>Cancel Order</button>
      </div>

      {/* IMAGE CONATINER */}      
      <div className='flex-1 w-full relative'>
        <Image src="/offerProduct.png" alt="" fill className='object-contain'/>
      </div>
    </div>
  )
}

export default Offer
