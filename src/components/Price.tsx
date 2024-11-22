"use client";

import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const { addToCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (Array.isArray(product.options) && product.options.length) {
      setTotal(
        quantity * product.price + product.options[selected].additionalPrice
      );
    } else {
      setTotal(quantity * product.price);
    }
  }, [quantity, selected, product]);

  const handleCart = async () => {
    const orderData = {
      title: product.title,
      price: total,
      status: "pending",
      orderProducts: [
        {
          productId: product.id,
          title: product.title,
          quantity,
        },
      ],
    };

    try {
      console.log("Sending order data:", orderData);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create order: ${errorText}`);
      }

      const createdOrder = await response.json();
      console.log("Order created:", createdOrder);

      addToCart({
        id: product.id,
        title: product.title,
        img: product.img,
        price: total,
        ...(Array.isArray(product.options) && product.options.length && {
          optionTitle: product.options[selected].title,
        }),
        quantity,
      });

      toast.success("Product added to the cart and order created!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating order:", error);
        toast.error(`Failed to add to cart and create order: ${error.message}`);
      } else {
        console.error("An unknown error occurred:", error);
        toast.error("An unexpected error occurred while creating the order.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="text-2xl font-bold">Ksh {total}</h2>

      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {Array.isArray(product.options) &&
          product.options.map((option, index) => (
            <button
              key={option.title}
              className={`min-w-[6rem] p-2 ring-1 rounded-md ${
                selected === index
                  ? "bg-red-500 text-white"
                  : "bg-white text-red-500 ring-red-500"
              }`}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ))}
      </div>

      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full p-3 ring-1 ring-customGreen">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
              {"<"}
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) => Math.min(9, prev + 1))}>
              {">"}
            </button>
          </div>
        </div>

        {/* CART BUTTON */}
        <button
          className="uppercase w-56 bg-customGreen text-indigo-950 p-3 ring-1 ring-customGreen"
          onClick={handleCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;