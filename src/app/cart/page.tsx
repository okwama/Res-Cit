"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/login");
    } else {
      try {
        const res = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Not Paid!",
            userEmail: session.user.email,
          }),
        });
        const data =await res.json()
        router.push(`/pay/${data.id}`)
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-indigo-950 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {/* SINGLE ITEM */}
        <hr/>
        {products.map((item) => (
          
          <div className="flex items-center justify-between mb-4" key={item.id}>
            {item.img && (
              <Image src={item.img} alt="" width={100} height={100} />
            )}
            <div className="">
              <h1 className="uppercase text-xl font-bold">
                {item.title} x{item.quantity}
              </h1>
              <span>{item.optionTitle}</span>
            </div>
            <h2 className="font-bold">Ksh {item.price}</h2>
            <span
              className="cursor-pointer"
              onClick={() => removeFromCart(item)}>
              X
            </span><hr/>
            </div>
        ))}<hr/>
        
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center md:h-1/2 lg:h-full lg:w-1/2 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({totalItems} items)</span>
          <span className="">Ksh {totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">Ksh</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL(VAT INCL)</span>
          <span className="font-bold">Ksh {totalPrice}</span>
        </div>
        <Image src="https://ik.imagekit.io/bja2qwwdjjy/Asset%201_yoafp2iSbQ.png?updatedAt=1721116147261" alt="" layout="contain" width={1000} height={20}></Image>

        <button
          className="bg-customGreen text-indigo-950 p-3 rounded-md  self-end"
          onClick={handleCheckout}
        >
          
          CHECKOUT
        </button>
        <p className="text-sm text-gray-600">
          *Please note that payment will be processed securely
          {/* <Image src="https://ik.imagekit.io/bja2qwwdjjy/Asset%201_yoafp2iSbQ.png?updatedAt=1721116147261" alt="" layout="contain" width={1000} height={20}></Image> */}
        </p>
      </div>
    </div>
  );
};

export default CartPage;