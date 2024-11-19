
import { MenuType } from "@/types/types";
import Link from "next/link";
import React from "react";

const getData =  async () => {
  const res = await fetch (`http://localhost:3000/api/categories`,{
    cache:"no-store"
  })

  if(!res.ok){
    throw new Error("Failed!");
  }
  return res.json()
}

const SubMenuPage = async () => {
  const menu: MenuType = await getData();
  
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-auto flex flex-wrap items-center overflow-hidden ">
      {menu.map((sub_category) => (
        <Link
          href={`/sub_menu/${sub_category.slug}`}
          key={sub_category.id as React.Key}
          className="flex flex-col w-full md:w-1/3 h-1/3 bg-cover p-4 overflow-hidden relative"
          style={{ backgroundImage: `url(${sub_category.img})` }}
        >
          <div className="absolute inset-0 bg-customGreen opacity-0"></div> {/* Tint overlay */}
          <div className={`text-${sub_category.color} w-full flex flex-col relative z-10`}>
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

export default SubMenuPage;