import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
import { ProductType } from '@/types/types';

const getData =  async (category: string) => {
  const res = await fetch(`http://localhost:3000/api/sub_categories?cat=${category}`, {
    cache: "no-store"
  })

  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json()
}

type Props = {
  params: { sub_category: string }
}

const CategoryPage = async ({ params }: Props) => {
  const { sub_category } = await params; // Await the params here

  const products: ProductType[] = await getData(sub_category);
  return (

    <div className="p-4 lg:px-20 xl:px-40 h-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {products.map((sub_category) => (
    <Link
      href={`/menu/${sub_category.slug}`}
      key={sub_category.id as React.Key}
      className="flex flex-col items-center bg-white rounded-md shadow-md overflow-hidden relative group"
    >
      {/* Tint overlay */}
      <div className="absolute inset-0 bg-customGreen opacity-0 group-hover:opacity-20 transition-opacity"></div>

      {/* Image Section */}
      <div className="w-full h-40 md:h-48 lg:h-56 flex items-center justify-center">
        <Image
          src={sub_category.img || '/place.png'}
          alt={sub_category.title || 'Default Image'}
          layout="intrinsic"
          width={300} // Set a reasonable width for better scaling
          height={300}
          className="object-cover rounded-t-md"
        />
      </div>

      {/* Text Section */}
      <div className="w-full p-2 text-center mt-1">
        <h1 className="uppercase font-bold text-sm md:text-base">{sub_category.title}</h1>
        {/* Uncomment the description if needed */}
        {/* <p className="text-xs md:text-sm mt-1 text-gray-500">{sub_category.desc}</p> */}
      </div>
    </Link>
  ))}
</div>

  );
};

export default CategoryPage;