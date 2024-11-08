import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";

const Navbar = () => {
  const user = false;
  return (
    <div className="h-12 text-indigo-950 p-4 flex items-center justify-between border-b-2 border-b-customGreen uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contact</Link>
      </div>
          {/* LOGO */}
<div className="flex justify-center items-center text-xl md:font-bold flex-1">
  <Link href="/">
    <Image 
      src="https://ik.imagekit.io/bja2qwwdjjy/Artboard%201@1.5x_sHGlLMjLB.png?updatedAt=1730979703401" 
      alt="logo" 
      width={50} 
      height={15} 
      objectFit="contain" 
    />
  </Link>
</div>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-bggreen px-1 rounded-md">
          {/* <Image src="/phone.png" alt="" width={20} height={20} /> */}
          <Link href="/register">Sign up</Link>
        </div>
        <UserLinks/>
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;