"use client"
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useCartStore } from '@/utils/store';

const CartIcon = () => {
  const{totalItems}   = useCartStore();

  return (
    <Link href="/cart" className='flex items-center gap-1'>
      <div className='relative w-8 h-8 md:w-5 md:h-3'>
        <Image src="/cart.png" alt="" width={50} height={45}/>
      </div>
      <span>Cart ({totalItems})</span>
    </Link>
  );
};

export default CartIcon
