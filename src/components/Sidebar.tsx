// Sidebar.tsx
import React, { FC } from 'react';
import Link from "next/link";
import CartIcon from './CartIcon';
import UserLinks from './UserLinks';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void; 
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed top-0 right-0 h-1/2 bg-customGreen shadow-lg transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
      <button onClick={onClose} className="p-4">Close</button>
      <nav className="flex flex-col p-4">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        {/* <Link href="/">Contact</Link> */}
        {/* <CartIcon/> */}
        <UserLinks/>
        <Link href="/register">Register</Link>
        {/* Add more links as needed */}
      </nav>
    </div>
  );
};

export default Sidebar;