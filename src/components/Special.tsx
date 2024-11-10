"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'


const data = [
  {id:1,
    title:"Welcome to Macaash delicious universe",
    image:"/new.jpg",
  },
  {id:2,
    title:"Welcome to CJ's delicious universe",
    image:"/slide2.png",
  },
  {id:3,
    title:"Welcome to CJ's delicious universe",
    image:"/gift.jpg",
  },

];

const Special = () => {
const [currentSlide, setCurrentSlide] = useState(0)


  // useEffect(() => {
  //   const interval = setInterval( 
  //     () => setCurrentSlide((prev ) => (prev == data.length -1 ? 0 : prev + 1 )), 2000);
  //  return () => clearInterval(interval);
  // },[]);

  return (
    <div className='flex flex-col lg:h-[calc(60vh-6rem)] md:h-[calc(60vh-6rem)] sm:h-[calc(10vh-6rem)] lg:flex-row bg-bggreen mt-6'>
      {/* TEXT CONTAINER */}
      <div className='flex-1 flex items-center justify-center flex-col gap-8 text-indigo-950 font-bold '>
        <h1 className='text-5xl lg:text-5xl text-center uppercase p-4  md:p-10 md:text-6xl xl:text-7xl'>
          {data[currentSlide].title}
        </h1>
        {/* <button  className="bg-customGreen text-indigo-950 py-2 px-8"
        onClick={() => window.location.href='/menu'}>
          Place Order</button> */}
      </div>



      {/* IMAGE CONTAINER */}
     <div className='flex-row relative lg:h-0 '>
      {/* <Image src={data[currentSlide].image} alt="" fill className='object-cover'/> */}
     </div>


    </div>
  )
}

export default Special
