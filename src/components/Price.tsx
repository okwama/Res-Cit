"use client"

import { ProductType } from '@/types/types';
import { useCartStore } from '@/utils/store';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Price = ({product}: {product:ProductType}) => {
const [total, setTotal] = useState(product.price);
const [quantity, setQuantiy] = useState(1);
const [selected, setSelected] = useState(0);

const {addToCart}= useCartStore()

useEffect(() => {
 if(product.options?.length){
setTotal(quantity * product.price + product.options[selected].additionalPrice );

 }

}, [quantity, selected, product]);

const handleCart=()=>{
  addToCart(
    { id: product.id, 
      title: product.title,
      img: product.img,
      price: total, 
      ...(product.options?.length && {
        optionTitle: product.options[selected].title,
      }), 
      quantity: quantity,
    })
  // console.log("added to cart", product);
  toast.success("product added to Cart")
}
  

 return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold'>KSh{total}</h2>

      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {product.options?.length && 
         product.options?.map((option, index)=>(
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
       <button 
       className="uppercase w-56 bg-customGreen text-indigo-950 ring-1 ring-customGreen p-3"
       onClick={handleCart}> 
       Add to Cart</button>
      </div>
    </div>
  );
};

export default Price
