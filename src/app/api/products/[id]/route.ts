import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


// [id] PRODUCTS
// GET SINGLE PRODUCT
export const GET = async (
    req:NextResponse,
    { params }: { params: { id: string } }
) => {
const { id }  = params;

try {
   const product = await prisma.product.findUnique({
    where:{
        id  : id
    },
});    
    return new NextResponse(JSON.stringify(product),{status:200});
  } catch (err) {
    console.log(err)
    return new NextResponse(
    JSON.stringify({ message    : "something went wrong" }),
    {status:500}
);
}

};