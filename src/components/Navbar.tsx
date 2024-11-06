"use client"
import React, { useState } from 'react';
import Menu from './Menu';
import Link from "next/link";
import Image from 'next/image';
import CartIcon from './CartIcon';
import UserLinks from './UserLinks';
import Sidebar from './Sidebar'; // Import the Sidebar component

const Navbar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className='h-12 bg-customGreen text-indigo-950 p-4 flex items-center justify-between border-b-2 border-b-customGreen uppercase md:h-24 lg:px-20 xl:px-40'>
      {/* Mobile Menu Button */}
      <button className='md:hidden' onClick={toggleSidebar}>
        Menu
      </button>

      {/* Logo */}
      <div className='md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer'>
        <CartIcon/>
        <Link href="/">
          <Image src="https://ik.imagekit.io/bja2qwwdjjy/_Pngtree_user%20login%20or%20authenticate%20icon_5056093_yg98dGG8w.png?updatedAt=1730925285632"
           alt="Logo" className="h-8" width="50" height="100" />
        </Link>
      </div>

      {/* Sidebar for mobile */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* LEFT LINKS - Always visible on larger screens */}
      <div className='hidden md:flex gap-4 flex-1'>
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contact</Link>
      </div>

      {/* RIGHT LINKS - Always visible on larger screens */}
      <div className='hidden md:flex gap-4 items-center justify-end flex-1'>
        <Link href="/">Contact</Link>
        <CartIcon />
        <UserLinks />
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
};

export default Navbar;