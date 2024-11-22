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
      router.push("/checkout");
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
        const data = await res.json();
        router.push(`/CheckoutPage/${data.id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col lg:flex-row text-indigo-950">
      {/* PRODUCTS CONTAINER */}
      <div className="flex flex-col gap-4 p-4 lg:w-2/3 2xl:w-1/2">
        {products.map((item) => (
          <div
            className="flex flex-col sm:flex-row items-center sm:items-start p-3 border border-gray-300 rounded-lg shadow-md gap-4"
            key={item.id}
          >
            {/* Product Image */}
            {item.img && (
              <Image
                src={item.img}
                alt={item.title}
                width={100}
                height={100}
                className="object-contain"
              />
            )}
            {/* Product Details */}
            <div className="flex flex-col flex-1 text-center sm:text-left">
              <h1 className="uppercase text-sm font-bold mb-2">
                {item.title} (x{item.quantity})
              </h1>
              <span className="text-gray-500">{item.optionTitle}</span>
            </div>
            {/* Product Price */}
            <h2 className="font-bold text-lg mb-2 sm:mb-0 sm:text-right">Ksh. {item.price}</h2>
            {/* Remove from Cart Button */}
            <button onClick={() => removeFromCart(item)}>
              <Image
                src="https://ik.imagekit.io/bja2qwwdjjy/trash%20(1)_C3ZG3vzL2.png"
                alt="Remove"
                width={35}
                height={35}
                className="cursor-pointer"
              />
            </button>
          </div>
        ))}
      </div>

      {/* PAYMENT CONTAINER */}
      <div className="flex flex-col gap-6 p-4 bg-fuchsia-50 rounded-lg lg:w-1/3 2xl:w-1/2 ">
        <div className="flex justify-between text-lg font-medium">
          <span>Subtotal ({totalItems} items)</span>
          <span>Ksh {totalPrice}</span>
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="flex justify-between text-xl font-bold">
          <span>TOTAL (VAT INCL)</span>
          <span>Ksh {totalPrice}</span>
        </div>
        <Image
          src="https://ik.imagekit.io/bja2qwwdjjy/Asset%201_yoafp2iSbQ.png"
          alt="Logo"
          width={1000}
          height={20}
          className="mx-auto max-w-full object-contain"
        />

        <div className="flex flex-col gap-4 mb-1">
          <button
            className="bg-customGreen text-indigo-950 p-3 rounded-md w-full hover:bg-green-600 transition"
            onClick={() => router.push("/checkout")}
          >
            HOME DELIVERY
          </button>
          {/* <button className="bg-customGreen text-indigo-950 p-3 rounded-md w-full hover:bg-green-600 transition">
            ROOM SERVICE
          </button> */}
          <button
            className="bg-customGreen text-indigo-950 p-3 rounded-md w-full hover:bg-green-600 transition"
            onClick={handleCheckout}
          >
            CHECKOUT
          </button>
          <button
            className="bg-customGreen text-indigo-950 p-3 rounded-md w-full hover:bg-green-600 transition mb-1"
            onClick={() => router.push("/schedule")}
          >
            SCHEDULE DELIVERY
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default CartPage;
