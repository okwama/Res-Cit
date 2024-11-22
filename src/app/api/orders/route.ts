import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

// Define the type for order products
interface OrderProductInput {
  productId: string; 
  quantity: number;  
}

// Helper function for JSON responses
const jsonResponse = (data: any, status: number) =>
  new NextResponse(JSON.stringify(data), { status });

// API endpoint to handle orders
export const GET = async (req: NextRequest) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderProducts: {
          include: {
            product: {  // Include the related Product data
              select: {
                id: true,
                title: true,  // Select title from the Product model
                price: true,
              },
            },
          },
        },
      },
    });
    // Return the fetched orders
    return jsonResponse(orders, 200);
  } catch (err) {
    console.error("Error fetching orders:", err);

    if (err instanceof Error) {
      return jsonResponse({ message: `Error: ${err.message}` }, 500);
    }

    return jsonResponse({ message: "Something went wrong while fetching orders!" }, 500);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    // Parse the request body
    const body = await req.json();
    
    // Validate the request body to ensure it contains the necessary fields
    if (!body.price || !body.status || !body.orderProducts || !Array.isArray(body.orderProducts)) {
      return jsonResponse({ message: "Invalid order data. Please check the provided fields." }, 400);
    }

    const orderProducts: OrderProductInput[] = body.orderProducts;

    // Use userEmail from the request body or null for guest orders
    const userEmail = body.userEmail || null; // Allow null for guest orders

    // Get tableNo from the request body or default to 1 if not provided
    const tableNo = body.tableNo || 1; // Default to 1 if not provided

    // Log the received order data for debugging (can be removed in production)
    console.log("Received order data:", body);

    // Create a new order in the Order table split
    const order = await prisma.order.create({
      data: {
        price: body.price, 
        status: body.status, 
        userEmail: userEmail, // Use null if no userEmail is provided
        tableNo: tableNo, // Set the table number
        orderProducts: {
          create: orderProducts.map((product) => ({
            productId: product.productId, 
            quantity: product.quantity,
          })),
        },
      },
    });

    // Return the created order with a 201 status code
    return jsonResponse(order, 201);
  } catch (err) {
    console.error("Error creating order:", err);
    // ADD PUT FOR ADD ORDER
    // Provide a more detailed error message if needed
    if (err instanceof Error) {
      return jsonResponse({ message: `Error: ${err.message}` }, 500);
    }
    
    // Generic fallback error message
    return jsonResponse({ message: "Something went wrong while processing the order!" }, 500);
  }
};