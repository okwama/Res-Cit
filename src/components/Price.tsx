"use client"

import React, { useEffect, useState } from 'react'
type Props = {
    price: number;
    id: number;
    options?: { title: string; additionalPrice: number }[];
};
const Price = ({price,id,options}: Props) => {
const [total, setTotal] = useState(price);
const [quantity, setQuantiy] = useState(1);
const [selected, setSelected] = useState(0);


useEffect(() => {
setTotal(
    quantity * (options ? price + options[selected].additionalPrice : price)
 );
}, [quantity, selected, options, price]);
 return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold'>KSh{total.toFixed(2)}</h2>

      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {options?.map((option, index)=>(
            <button key={option.title} 
            className='min-w-[6rem] p-2 ring-1 ring-customGreen rounded-md'
            style={{

               background: selected === index ? "rgb(168 180 158)" : "white",
               color: selected === index ? "bggreen" : "customGreen",
            }}
            
            onClick={()=>setSelected(index)}
            >{option.title}</button>
        ))}
      </div>

      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className=" flex justify-between items-center">
      {/* QUANTITY   */}
       <div className="flex justify-between w-full p-3 ring-1 ring-customGreen">
        <span>Quantity</span>
        <div className=' flex gap-4 items-center'>
         <button onClick={()=>setQuantiy((prev) => (prev > 1 ? prev-1 : 1))}>
         {'-'}</button>
         <span>{quantity}</span>
         <button onClick={()=>setQuantiy(prev => (prev < 9 ? prev + 1 : 9))} >
         {'+'}</button>
        </div>
       </div>
       {/* CART BUTTON */}
       <button className="uppercase w-56 bg-customGreen text-indigo-950 ring-1 ring-customGreen p-3 "> Add to Cart</button>
      </div>
    </div>
  );
};

export default Price
