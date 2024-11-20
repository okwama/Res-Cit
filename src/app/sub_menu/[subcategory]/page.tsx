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
          href={`/menu/${sub_category.slug}`}
          key={sub_category.id as React.Key}
          className="flex flex-col w-1/2 md:w-1/3 sm:w-1/2 lg:h-[250px] h-[150px] bg-cover p-2 overflow-hidden relative rounded-md"
          
        >
          <div className="absolute inset-0 bg-customGreen opacity-0"></div> {/* Tint overlay */}
          <div className="lg:px-20 xl:px-40 h-auto flex flex-wrap items-center overflow-hidden rounded-md">
             {/* <Image src={`url(${sub_category.img})`} alt='' height={130} width={130}/> */}
             <Image src={sub_category.img || '/place.png'} alt='' height={170} width={170} />
          </div>

          <div className={`text-${sub_category.img} w-full flex flex-col relative z-10`}>
            <h1 className="uppercase font-bold text-sm p-2">{sub_category.title}</h1>
            {/* <p className="whitespace-wrap text-sm my-8">{sub_category.desc}</p> */}

          </div>
          
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;