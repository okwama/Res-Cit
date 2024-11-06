
import { ProductType } from '@/types/types';
import Image from 'next/image';
import React, { Suspense } from 'react';

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }
  return res.json();
};

const Featured = async () => {
  const featuredProducts: ProductType[] = await getData();

  return (
    <div className="w-screen overflow-x-auto text-indigo-950">
      {/* Wrapper */}
      <div className="w-max flex">
        {/* Single Item */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-bggreen md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* Image Container */}
            {item.img && (
              <div className="relative flex-1 w-full">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            {/* Text Container */}
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                {item.title}
              </h1>
              <p className="p-4 2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">KSh {item.price}</span>
              <button className="bg-customGreen text-indigo-950 p-2 rounded-md hover:bg-green-600">
                Place Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
