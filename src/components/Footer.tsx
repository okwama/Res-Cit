import React from 'react'
import Link from "next/link";
import Image from 'next/image';
const Footer = () => {
  return (
    <div className='h-12 md:h-24 p-4 lg:p-20 xl:px-40 text-indigo-900 flex items-center justify-between'>
  <Link href="/"> 
  <Image src="/log.png" alt="" className="h-8" width="50" height="100" />
  </Link>
  <p>© 2023 CJ's. All Rights Reserved</p>
</div>
  )
}

export default Footer
