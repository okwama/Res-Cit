import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const PUT = async (
    req:NextResponse,
    { params }: { params: { id: string } }
) => {
const { id }  = params;

try {
   const body = await req.json()

   await prisma.order.update({
    where:{
        id  : id
    },
    data: {status: body },
});    
    return new NextResponse(
    JSON.stringify({ message    : "Order has been updated!" }),
    {status:200}
);

} catch (err) {
    console.log(err)
    return new NextResponse(
    JSON.stringify({ message    : "something went wrong" }),
    {status:500}
);
}

};