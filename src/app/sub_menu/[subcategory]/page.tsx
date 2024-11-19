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
    <div className="p-4 lg:px-20 xl:px-40 h-auto flex flex-wrap items-center overflow-hidden ">
      {products.map((sub_category) => (
        <Link
          href={`/menu/coffee`}
          key={sub_category.id as React.Key}
          className="flex flex-col w-full md:w-1/3 h-1/3 bg-cover p-4 overflow-hidden relative"
          style={{ backgroundImage: `url(${sub_category.img})` }}
        >
          <div className="absolute inset-0 bg-customGreen opacity-0"></div> {/* Tint overlay */}
          <div className={`text-${sub_category.img} w-full flex flex-col relative z-10`}>
            <h1 className="uppercase font-bold text-3xl">{sub_category.title}</h1>
            <p className="whitespace-wrap text-sm my-8">{sub_category.desc}</p>
            <button className="md:block bg-customGreen text-indigo-950 py-2 px-4 rounded-md">
              Explore Sub Menus
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;