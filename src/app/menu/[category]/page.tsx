import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
import { ProductType } from '@/types/types';

const getData =  async (category: string) => {
  const res = await fetch(`http://localhost:3000/api/products?cat=${category}`, {
    cache: "no-store"
  })

  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json()
}

type Props = {
  params: { category: string }
}

const CategoryPage = async ({ params }: Props) => {
  const { category } = await params; // Await the params here

  const products: ProductType[] = await getData(category);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 text-indigo-950">
  {products.map((item) => (
    <Link
      href={`/product/${item.id}`}
      key={item.id}
      className="border-2 border-customGreen rounded-lg shadow-lg p-4 flex group transition-all hover:shadow-xl hover:scale-[1.02]"
    >
      {/* IMAGE CONTAINER */}
      {item.img && (
        <div className="w-1/3 flex items-center justify-center">
          <Image
            src={item.img}
            alt={item.title || "Product Image"}
            height={150}
            width={150}
            className="object-contain rounded-md"
          />
        </div>
      )}

      {/* TEXT CONTAINER */}
      <div className="w-2/3 flex flex-col justify-between ml-4">
        {/* Title */}
        <h1 className="text-sm lg:text-base uppercase font-bold">{item.title}</h1>

        {/* Description */}
        <p className="text-[12px] lg:text-sm text-gray-600 mt-1 line-clamp-3">
          {item.desc}
        </p>

        {/* Price */}
        <h2 className="text-sm lg:text-base text-red-400 mt-2">KSh. {item.price}</h2>

        {/* Button */}
        <button className="uppercase bg-customGreen text-indigo-950 p-2 rounded-md w-24 text-xs lg:text-sm mt-4">
          Order
        </button>
      </div>
    </Link>
  ))}
</div>

  );
};

export default CategoryPage;