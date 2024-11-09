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
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]); // Track selected orders
  const router = useRouter();

  const queryClient = useQueryClient();

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

  // Mutation to update order status
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order Status Updated");
    },
  });

  // Mutation to delete selected orders
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await Promise.all(
        selectedOrders.map((id) =>
          fetch(`http://localhost:3000/api/orders/${id}`, {
            method: "DELETE",
          })
        )
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      setSelectedOrders([]);
      toast.success("Selected orders deleted");
    },
  });

  // Handle order selection
  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  // Handle delete action
  const handleDeleteSelectedOrders = () => {
    if (selectedOrders.length === 0) {
      toast.error("No orders selected");
      return;
    }
    deleteMutation.mutate();
  };

  // Handle update status form submission
  const handleStatusUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const status = (e.currentTarget.elements[0] as HTMLInputElement).value;
    updateStatusMutation.mutate({ id, status });
  };

  // Handle confirm order action
  const handleConfirmOrder = (orderId: string) => {
    router.push(`/cart?order=${orderId}`);
  };

  if (isLoading || status === "loading") return <div>Loading...</div>;
  if (error) return <div>Error loading orders</div>;

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      {/* Delete Selected Orders Button */}
      <button
        onClick={handleDeleteSelectedOrders}
        className="bg-red-500 text-white p-2 rounded-md mb-4"
        disabled={deleteMutation.isPending}
      >
        Delete Selected Orders
      </button>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-3">
          <thead>
            <tr className="text-left">
              <th>Select</th>
              <th className="hidden md:block">Order ID</th>
              <th>Date</th>
              <th>Price</th>
              <th className="hidden md:block">Products</th>
              <th>Status</th>
              <th className="hidden md:block">Table Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: OrderType) => (
              <tr
                key={item.id}
                className={`${
                  item.status !== "delivered" ? "bg-orange-100" : ""
                } shadow-md focus:ring-2 bg-green-200 p-4`} // Card styling for each row
              >
                <td>
                  <input className="items-center justify-center"
                    type="checkbox"
                    checked={selectedOrders.includes(item.id)}
                    onChange={() => toggleOrderSelection(item.id)}
                  />
                </td>
                <td className="hidden md:block py-6 px-1">{item.id}</td>
                <td className="py-6 px-1">{item.createdAt.toString().slice(0, 10)}</td>
                <td className="py-6 px-1">{item.price}</td>
                <td className="hidden md:block py-6 px-1">
                  {item.products && item.products.length > 0
                    ? item.products[0]?.title
                    : "No product available"}
                </td>
                {session?.user.isAdmin ? (
                  <td>
                    <form
                      className="flex items-center gap-4"
                      onSubmit={(e) => handleStatusUpdate(e, item.id)}
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
                <td>
                  <button
                    onClick={() => handleConfirmOrder(item.id)}
                    className="bg-customGreen text-indigo-950 p-2 rounded-md"
                  >
                    Confirm Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
