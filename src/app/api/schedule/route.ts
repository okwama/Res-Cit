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

    // Log the incoming data for debugging
    console.log("Scheduling delivery with data:", { date, time, address, orderId });

    // Create the delivery record
    const scheduledDelivery = await prisma.delivery.create({
      data: {
        date: new Date(date), // Ensure the date is in a valid format
        time,
        address,
        order: {
          connect: {
            id: orderId // Correctly pass orderId as a string
          }
        }
      }
    });

    return new NextResponse(
      JSON.stringify({ message: "Delivery scheduled successfully!", delivery: scheduledDelivery }),
      { status: 201 }
    );
  } catch (error) {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      console.error("Error scheduling delivery:", error.message,);
      return new NextResponse(
        JSON.stringify({ message: "Internal server error.", error: error.message }),
        { status: 500 }
      );
    } else {
      // Handle unexpected error types
      console.error("Unexpected error scheduling delivery:", error);
      return new NextResponse(
        JSON.stringify({ message: "Internal server error." }),
        { status: 500 }
      );
    }
  }
};