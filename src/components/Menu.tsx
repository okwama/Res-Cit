"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CartIcon from './CartIcon';

const links = [

{ id: 1, title: "Homepage", url: "/"},
{ id: 2, title: "Menu", url: "/menu"},
{ id: 3, title: "Working Hours", url: "/"},
{ id: 4, title: "Contact", url: "/"},



];







const Menu = () => {
const [open,setOpen] = useState(false)

//Temporary user
const user = false
  return (
    <div>
      {! open ? (<Image src="/oopen.png" alt='' width={20} height={20} onClick={()=>setOpen(true)}/>
      ) : (
      <Image src="/close.png" alt='' width={20} height={20} onClick={()=>setOpen(false)}/>)}

      {open &&<div className='bg-customGreen text-indigo-950 absolute left-0 w-full top-24 h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl z-10'>
      {links.map((item) => (
        <Link href={item.url} key={item.id} onClick={()=>setOpen(false)}>
            {item.title}</Link>
        ))}

        
        <Link href={"/cart"} onClick={()=>setOpen(false)}>
        <CartIcon/>
        </Link>


      </div>}
    </div>
  )
}

export default Menu
