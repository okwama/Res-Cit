"use client"

import { OrderType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";






const OrdersPage = () => {
    const {data:session,status} = useSession();

    const router = useRouter()


     if(status==="unauthenticated"){
      router.push("/");
    }

    const { isPending, error, data } = useQuery({
      queryKey: ['Orders'],
      queryFn: () =>
        fetch('http://localhost:3000/api/orders').then(
          (res) => res.json(),
        ),
    })
  
    if (isPending || status==="loading") return 'Loading...'

    console.log(data)
    return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: OrderType)=>(
            <tr className="text-sm md:text-base bg-bggreen"key={item.id}>
            <td className="hidden md:block py-6 px-1">{item.id}</td>
            <td className="py-6 px-1">{item.createdAt.toString().slice(0, 10)}</td>
            <td className="py-6 px-1">{item.price}</td>
            <td className="hidden md:block py-6 px-1">
              {item.products[0].title}
              {/* {item.products?.[0]?.title ?? 'No products'} */}

            </td>
              {
              session?.user.isAdmin ? (
                <td>
                  <form className="flex items-center justify-center gap-4">
                  <input 
                placeholder={item.status} className="p-2 ring-1 ring-customGreen rounded-md"
                />
                <button className="bg-customGreen p-2 rounded-full">
                  <Image src="/edit.png" alt="" width={20} height={20}/>
                </button>
                </form>
                </td>
            ) :(
              <td className="py-6 px-1">{item.status}</td>
              )}
          </tr>
        ))}
       </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;