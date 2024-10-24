import React from 'react'
import Menu from './Menu'
import Link from "next/link";
import Image from 'next/image';
import CartIcon from './CartIcon';

const Navbar = () => {
  const user = false
  return (
    <div className='h-12 text-indigo-950 p-4 flex items-center justify-between border-b-2 border-b-customGreen'>
      {/* LEFT LINKS */}
      <div className='hidden md:flex gap-4'>
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contact</Link>
      </div>



      {/* {Logo} */}
      <div>
        <Link href="/">
        <Image src="/log.png" alt="" className="h-8" width="50" height="100" />
        </Link>
      </div>

      {/* {Mobile Menu} */}
      <div className='md:hidden'>
        <Menu/>
    </div>
    {/* RIGHT LINKS */}
    <div className='hidden md:flex gap-4'>
        {!user ? (<Link href="/login">Login</Link>) :(
        <Link href="/orders">Orders</Link>)}
       <CartIcon/>
      </div>

    </div>
  )
}

export default Navbar
