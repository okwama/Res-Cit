import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect"; // Ensure this is correctly importing the Prisma client

// API endpoint to schedule a delivery
export const POST = async (req: NextRequest) => {
  try {
    const { date, time, address, orderId } = await req.json(); // Ensure orderId is included

    // Basic validation
    if (!date || !time || !address || !orderId) {
      return new NextResponse(
        JSON.stringify({ message: "All fields are required." }),
        { status: 400 }
      );
    }

    // Create the delivery record
    const scheduledDelivery = await prisma.delivery.create({
      data: {
        date: new Date(date), // Ensure date is a Date object
        time,
        address,
        order: { connect: { id: orderId } } // Connect to the existing order
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Delivery scheduled successfully!", delivery: scheduledDelivery }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error scheduling delivery:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error." }),
      { status: 500 }
    );
  }
};