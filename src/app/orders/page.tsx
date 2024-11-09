"use client";

import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Ensure the component is mounted before using useRouter
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirect to home if user is not authenticated and only if the component is mounted
  useEffect(() => {
    if (status === "unauthenticated" && isMounted) {
      router.push("/");
    }
  }, [status, isMounted, router]);

  // Fetch orders using react-query
  const { isLoading, error, data } = useQuery<OrderType[]>({
    queryKey: ["orders"],
    queryFn: () => fetch("http://localhost:3000/api/orders", { method: "GET" }).then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  // Mutation to update order status
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order Status Updated");
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;

    mutation.mutate({ id, status });
  };

  // Check for loading state or errors
  if (isLoading || status === "loading") return <div>Loading...</div>;
  if (error) return <div>Error loading orders</div>;

  // Safely access `data` to ensure it's not undefined
  if (!data || data.length === 0) {
    return <div>No orders found.</div>;
  }

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
            <th className="hidden md:block">Table Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: OrderType) => (
            <tr key={item.id} className={`${item.status !== "delivered" && "bg-red-200"}`}>
              <td className="hidden md:block py-6 px-1">{item.id}</td>
              <td className="py-6 px-1">{item.createdAt.toString().slice(0, 10)}</td>
              <td className="py-6 px-1">{item.price}</td>
              <td className="hidden md:block py-6 px-1">
                {item.orderProducts && item.orderProducts.length > 0
                  ? item.orderProducts[0]?.product?.title || "No product available"
                  : "No products"}
              </td>
              {session?.user.isAdmin ? (
                <td>
                  <form
                    className="flex items-center justify-center gap-4"
                    onSubmit={(e) => handleUpdate(e, item.id)}
                  >
                    <input
                      placeholder={item.status}
                      className="p-2 ring-1 ring-customGreen rounded-md"
                    />
                    <button type="submit" className="bg-customGreen p-2 rounded-full">
                      <Image src="/edit.png" alt="Edit" width={20} height={20} />
                    </button>
                  </form>
                </td>
              ) : (
                <td className="py-6 px-1">{item.status}</td>
              )}
              <td className="py-6 px-1">{item.tableNo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Action Buttons */}
      <div className="mt-4">
        <button className="bg-customGreen text-indigo-950 p-2 rounded-md mr-4">Add Item</button>
        <button className="bg-customGreen text-indigo-950 p-2 rounded-md float-right">Confirm Order</button>
      </div>
    </div>
  );
};

export default OrdersPage;
