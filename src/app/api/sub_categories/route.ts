import prisma from "@/utils/connect";
import { NextResponse } from "next/server"

// FETCH ALL CATEGORIES
export const GET = async () => {
    try{



const sub_categories = await prisma.subCategory.findMany()
return new NextResponse(JSON.stringify(sub_categories),
{ status: 200 }
);

    }catch(err){
    console.log(err);
    console.error("Error fetching categories:", err);
    return new NextResponse(JSON.stringify({message:"something went wrong"}),
    { status: 500 }
   );
 }
};
export const POST = () => {

    return new NextResponse("Hello", {status: 200})

}