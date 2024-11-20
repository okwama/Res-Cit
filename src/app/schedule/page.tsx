"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const SchedulePage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [orderId, setorderId] = useState("");


 const handleScheduleDelivery = async (e: React.FormEvent) => {
    e.preventDefault();
//Current ordr id
    const orderId = "orderId"; // This should be dynamically set based on your application's logic

    const deliveryDetails = {
        date,
        time,
        address,
        orderId: { connect: { id: orderId } } // Connect to the existing order
    };

    console.log(deliveryDetails)

    try {
        const response = await fetch("/api/schedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(deliveryDetails),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Failed to schedule delivery.");
        }

        const data = await response.json();
        toast.success(data.message); // Show success message
        router.push("/success"); // Redirect to a success page
    } catch (error) {
        toast.error("Failed to schedule delivery."); // Show error message
    }
    toast.success("Delivery scheduled successfully!"); // Temporary success message
    router.push("/"); // Redirect to the home page
};


  if (status === "loading") {
    return <p>Loading....</p>;
  }

  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center rounded">
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[100%] md:w-full lg:w-[60%] 2xl:w-1/2">
        <div className="relative h-1/3 w-full md:h-full md:w-1/2 rounded">
          <Image src="/maa.png" alt="Schedule Background" fill className="object-cover" />
        </div>
        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-indigo-950 text-xl xl:text-3xl">Schedule Your Delivery</h1>
          <p>Fill in the details below to schedule your delivery.</p>

          {/* Schedule Delivery Form */}
          <form onSubmit={handleScheduleDelivery} className="flex flex-col gap-4">
            <input
              type="date"
              placeholder="Delivery Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="time"
              placeholder="Delivery Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded"
            />

              <input
              type="text"
              placeholder="order IDs"
              value="cm3pzxf37000515l0l4pg7c0o"
              onChange={(e) => setorderId(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="p-4 bg-blue-500 text-white rounded-md">
              Schedule Delivery
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;