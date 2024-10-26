import { pizzas } from '@/data'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
const CategoryPage = () => {
  return (
    <div className='flex flex-wrap text-indigo-950'>
      {pizzas.map(item=>(
        <Link className='w-full h-[60vh] border-b-2 border-r-2 border-customGreen sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-bggreen' href={`/product/${item.id}`} key={item.id}>
          {/* IMAGE CONTAINER */}
          {item.img && (
          
          <div className="relative h-[80%]">
            <Image src={item.img} alt="" fill className='object-contain'/>
          </div>
          )}
          
          {/* TEXT CONTAINER */}
          <div className='flex items-center justify-between font-bold '>
            <h1 className='text-2xl uppercase p-2'>{item.title}</h1>
            <h2 className='group-hover:hidden text-xl'>KSh{item.price}</h2>
            <button className='hidden group-hover:block uppercase bg-customGreen text-indigo-950 p-2 rounded-md'>Order</button>


          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage
