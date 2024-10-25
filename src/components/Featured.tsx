import { featuredProducts } from '@/data'
import Image from 'next/image'
import React from 'react'

const Featured = () => {
  return (
    <div className=' w-screen overflow-x-auto-scrol text-indigo-950'>
      {/* WRAPPER */}
      <div className='w-max flex'>
        {/* SINGLE ITEM */}
        {
          featuredProducts.map((item) => (
          <div key={item.id} 
          className='w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-bggreen md:w-[50vw] xl:w-[33vw] xl:h-[90vh]'>
          {/* IMAGE CONATINER */}
          {item.img && (
            <div className='relative flex-1 w-full '>
            <Image src={item.img}
             alt=""
              fill className='object-contain'/>
          </div>
        )}
          {/* TEXT CONATINER */}
          <div className='flex-1 flex flex-col items-center justify-center text-center gap-4'>
            <h1 className='text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl'>{item.title}</h1>
            <p className='p-4 2xl:p-8'>{item.desc}</p>
            <span className='text-xl font-bold'>KSh{item.price}</span>
            <button className='bg-customGreen text-indigo-950 p-2 rounded-md'>Place Order</button>
          </div>
        </div>))}
      </div>
    </div>
  )
}

export default Featured
