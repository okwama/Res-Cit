import { menu } from "@/data";
import Link from "next/link";
import React from "react";

const MenuPage = () => {
  return (
   <div className="p-4 lg:px-20 xl:px-40 h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-tangerine">
  {menu.map((category) => (
    <Link
      href={`/sub_menu/${category.slug}`}
      key={category.id}
      className="w-full h-64 bg-cover rounded-md flex flex-col justify-end"
      style={{ backgroundImage: `url(${category.img})` }}
    >
      <div className={`text-${category.color} bg-opacity-70 p-4 rounded-b-md`}>
        <h1 className="uppercase font-bold text-2xl">{category.title}</h1>
        {/* <p className="text-sm my-2">{category.desc}</p> */}
        <button className={`mt-2 bg-${category.color} text-${category.color === "black" ? "white" : "red-500"} py-2 px-4 rounded-md`}>
          Explore
        </button>
      </div>
    </Link>
  ))}
</div>
  );
};

export default MenuPage;